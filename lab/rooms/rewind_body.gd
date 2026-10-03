extends Room
## E3 Rewind the body (Todoist Notes, 2024).
## Strike, snap your body back to where the combo started, and strike again from there.
## Sentinels turn their shield toward you slowly: rewinding puts you behind their guard.

const DASH := 230.0
const DASH_TIME := 0.14
const TURN := 2.2          # shield turn speed, rad/s
const SHIELD := 1.15       # half-angle of the shield arc

var me := Vector2.ZERO
var origin := Vector2.ZERO
var dash_from := Vector2.ZERO
var dash_to := Vector2.ZERO
var dash_k := -1.0
var still := 0.0
var ghosts: Array = []      # {p, a}
var foes: Array = []        # {p, face, hp, flash, block}
var combo := 0
var best_combo := 0
var downs := 0
var hit_this_dash: Array = []
var msg := ""
var msg_t := 0.0


func info() -> Dictionary:
	return {"id": "E3", "family": "Space", "year": 2024, "title": "Rewind the body",
		"law": "Strike, then snap your body back to where you started, and strike again from there.",
		"uses_r": true,
		"how": "Click to dash-strike toward the mouse. Right click or R rewinds your body to where the combo started. Shields (ice arcs) turn toward you slowly: strike past a sentinel, rewind, and hit it from the side its shield just left."}


func reset() -> void:
	me = Vector2(size.x * 0.3, size.y * 0.6)
	origin = me
	ghosts.clear()
	foes.clear()
	combo = 0
	for i in 3:
		_spawn()


func _spawn() -> void:
	var p := Vector2(randf_range(size.x * 0.45, size.x * 0.85), randf_range(size.y * 0.3, size.y * 0.75))
	foes.append({"p": p, "face": (me - p).angle(), "hp": 3, "flash": 0.0, "block": 0.0})


func tick(dt: float) -> void:
	msg_t = maxf(0.0, msg_t - dt)
	for f in foes:
		var want: float = (me - f.p).angle()
		f.face = rotate_toward(f.face, want, TURN * dt)
		f.flash = maxf(0.0, f.flash - dt * 3.0)
		f.block = maxf(0.0, f.block - dt * 3.0)
	if dash_k >= 0.0:
		dash_k = minf(1.0, dash_k + dt / DASH_TIME)
		me = dash_from.lerp(dash_to, dash_k)
		for f in foes:
			if hit_this_dash.has(f) or me.distance_to(f.p) > 30.0:
				continue
			hit_this_dash.append(f)
			var incoming: float = (dash_from - f.p).angle()
			if absf(angle_difference(f.face, incoming)) < SHIELD:
				f.block = 1.0
				combo = 0
				sfx("clang", -4.0)
				shake(4.0)
			else:
				f.hp -= 1
				f.flash = 1.0
				combo += 1
				best_combo = maxi(best_combo, combo)
				sfx("hit", -2.0, 0.8 + combo * 0.08)
				shake(5.0)
		if dash_k >= 1.0:
			dash_k = -1.0
	else:
		still += dt
		if still > 1.2:
			origin = me
			combo = 0
	var alive: Array = []
	for f in foes:
		if f.hp <= 0:
			downs += 1
			msg = "down"
			msg_t = 0.8
			sfx("rise", -6.0)
		else:
			alive.append(f)
	foes = alive
	while foes.size() < 3:
		_spawn()
	for g in ghosts:
		g.a -= dt * 0.7
	ghosts = ghosts.filter(func(g): return g.a > 0.0)


func _strike() -> void:
	if dash_k >= 0.0:
		return
	if still > 1.2:
		origin = me
	still = 0.0
	dash_from = me
	var d := mouse() - me
	dash_to = me + d.limit_length(DASH)
	dash_to = dash_to.clamp(Vector2(20, 140), size - Vector2(20, 120))
	dash_k = 0.0
	hit_this_dash.clear()
	sfx("tick", -10.0, 0.5)


func _rewind() -> void:
	if dash_k >= 0.0 or me.distance_to(origin) < 4.0:
		return
	ghosts.append({"p": me, "a": 1.0})
	me = origin
	still = 0.0
	sfx("fall", -10.0, 2.0)


func act(event: InputEvent) -> void:
	if pressed(event, [], MOUSE_BUTTON_LEFT):
		_strike()
	elif pressed(event, [KEY_R], MOUSE_BUTTON_RIGHT):
		_rewind()


func paint() -> void:
	# combo origin
	draw_arc(origin, 16.0, 0.0, TAU, 32, Pal.a(Pal.ICE, 0.45), 1.5, true)
	draw_line(origin - Vector2(5, 0), origin + Vector2(5, 0), Pal.a(Pal.ICE, 0.45), 1.0)
	for g in ghosts:
		draw_rect(Rect2(g.p - Vector2(9, 9), Vector2(18, 18)), Pal.a(Pal.ICE, g.a * 0.45))
		draw_line(g.p, origin, Pal.a(Pal.ICE, g.a * 0.3), 1.0)
	for f in foes:
		var col := Pal.RED.lerp(Pal.INK, f.flash * 0.7)
		draw_circle(f.p, 22.0, col)
		var a0: float = f.face - SHIELD
		draw_arc(f.p, 32.0, a0, a0 + SHIELD * 2.0, 24, Pal.a(Pal.ICE, 0.55 + f.block * 0.45), 4.0 + f.block * 3.0, true)
		for i in 3:
			draw_rect(Rect2(f.p.x - 13 + i * 10, f.p.y - 46, 7, 4), Pal.AMBER if i < f.hp else Pal.a(Pal.GREY, 0.5))
	if dash_k >= 0.0:
		draw_line(dash_from, me, Pal.a(Pal.INK, 0.4), 6.0)
	draw_rect(Rect2(me - Vector2(9, 9), Vector2(18, 18)), Pal.INK)
	var aim := me + (mouse() - me).limit_length(DASH)
	draw_line(me, aim, Pal.a(Pal.INK, 0.12), 1.0)
	if combo > 1:
		text("COMBO %d" % combo, me + Vector2(0, -28), 14, Pal.AMBER, HORIZONTAL_ALIGNMENT_CENTER)
	if msg_t > 0.0:
		text(msg.to_upper(), Vector2(size.x * 0.5, size.y * 0.28), 20, Pal.a(Pal.AMBER, msg_t), HORIZONTAL_ALIGNMENT_CENTER)


func status() -> String:
	return "sentinels down %d    best combo %d" % [downs, best_combo]
