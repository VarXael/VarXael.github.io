extends Room
## C1 Damage per window (Brutal FPS, Notion, 2026).
## Brutes only die to 100 damage landed inside one 0.35 s window. A pistol alone cannot do it: synchronise sources.

const WINDOW := 0.35
const NEED := 100.0
const SHOT := 34.0
const SHOT_CD := 0.22
const NADE := 50.0
const FUSE := 1.0
const BLAST := 95.0

var player := Vector2.ZERO
var brutes: Array = []     # {p, hits:[{t,dmg}], hurt, r, speed}
var nades: Array = []      # {p, fuse}
var tracers: Array = []    # {a, b, life}
var bursts: Array = []     # {p, life, col}
var cd := 0.0
var kills := 0
var wave := 0
var overrun := 0.0
var nade_cd := 0.0


func info() -> Dictionary:
	return {"id": "C1", "family": "Death", "year": 2026, "title": "Damage per window",
		"law": "Enemies only die to enough damage inside one short window. Synchronise your sources.",
		"how": "Aim with the mouse, left click to fire (34 damage). Right click or G throws a grenade that blows after one second (50 damage). Only damage inside the same 0.35 s adds up, and 100 kills: time your shots to the blast."}


func reset() -> void:
	brutes.clear()
	nades.clear()
	tracers.clear()
	bursts.clear()
	kills = 0
	wave = 0
	overrun = 0.0
	_next_wave()


func _next_wave() -> void:
	wave += 1
	player = Vector2(size.x * 0.5, size.y - 150)
	for i in mini(1 + wave, 6):
		brutes.append({"p": Vector2(randf_range(size.x * 0.2, size.x * 0.8), randf_range(150, 260)), "hits": [], "hurt": 0.0,
			"r": 24.0, "speed": randf_range(14.0, 22.0) + wave * 2.0})


func _damage(b: Dictionary, dmg: float) -> void:
	b.hits.append({"t": t, "dmg": dmg})
	b.hurt = 1.0


func _sum(b: Dictionary) -> float:
	var s := 0.0
	for h in b.hits:
		s += h.dmg
	return s


func tick(dt: float) -> void:
	cd = maxf(0.0, cd - dt)
	nade_cd = maxf(0.0, nade_cd - dt)
	if overrun > 0.0:
		overrun -= dt
		if overrun <= 0.0:
			brutes.clear()
			wave = maxi(0, wave - 1)
			_next_wave()
		return
	if Input.is_mouse_button_pressed(MOUSE_BUTTON_LEFT) and cd <= 0.0:
		_fire()
	for n in nades:
		n.fuse -= dt
		if n.fuse <= 0.0:
			sfx("boom", -2.0)
			shake(9.0)
			bursts.append({"p": n.p, "life": 0.5, "col": Pal.AMBER, "r": BLAST})
			for b in brutes:
				if b.p.distance_to(n.p) < BLAST + b.r:
					_damage(b, NADE)
	nades = nades.filter(func(n): return n.fuse > 0.0)
	for b in brutes:
		b.hits = b.hits.filter(func(h): return t - h.t < WINDOW)
		b.hurt = maxf(0.0, b.hurt - dt * 4.0)
		b.p += (player - b.p).normalized() * b.speed * dt
		if _sum(b) >= NEED:
			b["dead"] = true
			kills += 1
			sfx("hit", 0.0, 0.7)
			sfx("rise", -8.0)
			bursts.append({"p": b.p, "life": 0.6, "col": Pal.RED, "r": 60.0})
		elif b.p.distance_to(player) < 40.0:
			overrun = 1.5
			sfx("fall")
			shake(10.0)
	brutes = brutes.filter(func(b): return not b.get("dead", false))
	if brutes.is_empty() and overrun <= 0.0:
		_next_wave()
	for tr in tracers:
		tr.life -= dt
	tracers = tracers.filter(func(x): return x.life > 0.0)
	for bu in bursts:
		bu.life -= dt
	bursts = bursts.filter(func(x): return x.life > 0.0)


func _fire() -> void:
	cd = SHOT_CD
	var aim := (mouse() - player).normalized()
	var end := player + aim * 1400.0
	var best_d := INF
	var target = null
	for b in brutes:
		var to: Vector2 = b.p - player
		var along := to.dot(aim)
		if along > 0.0 and (to - aim * along).length() < b.r and along < best_d:
			best_d = along
			target = b
	if target != null:
		end = player + aim * best_d
		_damage(target, SHOT)
		sfx("hit", -6.0, 1.3)
	sfx("tick", -8.0, 0.6)
	tracers.append({"a": player, "b": end, "life": 0.08})


func act(event: InputEvent) -> void:
	if pressed(event, [KEY_G], MOUSE_BUTTON_RIGHT) and nade_cd <= 0.0 and overrun <= 0.0:
		nade_cd = 0.6
		var target := mouse()
		if target.distance_to(player) > 420.0:
			target = player + (target - player).normalized() * 420.0
		nades.append({"p": target, "fuse": FUSE})
		sfx("blip", -10.0, 0.5)


func paint() -> void:
	for n in nades:
		var k: float = n.fuse / FUSE
		ring(n.p, BLAST, Pal.a(Pal.AMBER, 0.15 + (1.0 - k) * 0.35), 1.0)
		ring(n.p, BLAST * k, Pal.a(Pal.AMBER, 0.7), 2.0)
		draw_circle(n.p, 5.0, Pal.AMBER)
	for b in brutes:
		var s := _sum(b)
		var col := Pal.RED.lerp(Pal.INK, b.hurt * 0.6)
		draw_rect(Rect2(b.p - Vector2(b.r, b.r), Vector2(b.r, b.r) * 2.0), col)
		# the window: each hit is a segment that fades as it leaves the window
		var w := 90.0
		var x0: float = b.p.x - w * 0.5
		var y0: float = b.p.y - b.r - 16.0
		draw_rect(Rect2(x0, y0, w, 6), Pal.a(Pal.INK, 0.12))
		var x := x0
		for h in b.hits:
			var age: float = (t - h.t) / WINDOW
			var seg: float = w * h.dmg / NEED
			draw_rect(Rect2(x, y0, minf(seg, x0 + w - x), 6), Pal.a(Pal.AMBER if s >= NEED * 0.66 else Pal.ICE, 1.0 - age * 0.8))
			x += seg
		draw_line(Vector2(x0 + w, y0 - 3), Vector2(x0 + w, y0 + 9), Pal.a(Pal.INK, 0.6), 1.0)
	for tr in tracers:
		draw_line(tr.a, tr.b, Pal.a(Pal.ICE, tr.life / 0.08), 2.0)
	for bu in bursts:
		var k: float = bu.life
		ring(bu.p, bu.r * (1.2 - k), Pal.a(bu.col, k * 1.4), 3.0)
	draw_circle(player, 12.0, Pal.INK)
	draw_line(player, player + (mouse() - player).normalized() * 30.0, Pal.INK, 2.0)
	if overrun > 0.0:
		text("OVERRUN", Vector2(size.x * 0.5, size.y * 0.42), 22, Pal.a(Pal.RED, overrun), HORIZONTAL_ALIGNMENT_CENTER)


func status() -> String:
	return "wave %d    kills %d    window %.2f s, 100 to kill" % [wave, kills, WINDOW]
