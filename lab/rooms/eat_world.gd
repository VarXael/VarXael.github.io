extends Room
## D4 Eat the world (Black Hole Project, 2019).
## Eat what is smaller than you to grow. Every object eaten carries a line of lore.

const WORLD := 4200.0
const KINDS := [
	# name, min r, max r, shape (0 circle, 1 square), lore
	["pebble", 3.0, 6.0, 0, ""],
	["button", 4.0, 7.0, 0, ""],
	["bolt", 5.0, 9.0, 1, ""],
	["key", 7.0, 11.0, 1, "A key. \"A door somewhere is waiting for this.\""],
	["teddy bear", 12.0, 18.0, 0, "A teddy bear. \"It reminds me of the one my mother bought me. I feel safer now.\""],
	["dog collar", 10.0, 15.0, 0, "A dog collar. \"I really want to find a dog.\""],
	["letter", 9.0, 14.0, 1, "A letter. \"Nobody wrote back.\""],
	["lamp", 16.0, 26.0, 0, "A lamp. \"It is so dark in here.\""],
	["chair", 22.0, 34.0, 1, "A chair. \"Someone waited here a long time.\""],
	["dog", 26.0, 36.0, 0, "A dog. \"You came back. Stay with me.\""],
	["bicycle", 34.0, 50.0, 1, "A bicycle. \"I never learned to ride one.\""],
	["car", 55.0, 80.0, 1, "A car. \"Everyone was always leaving.\""],
	["tree", 70.0, 110.0, 0, "A tree. \"It was here before any of them.\""],
	["house", 110.0, 170.0, 1, "A house. \"This is where the teddy bear lived.\""],
	["tower", 180.0, 260.0, 1, "A tower. \"From up here I could see everyone. Nobody looked up.\""],
]

var pos := Vector2.ZERO
var radius := 9.0
var things: Array = []
var said := ""
var said_t := 0.0
var zoom := 1.0
var eaten := 0
var lore_found := {}
var bump := 0.0


func info() -> Dictionary:
	return {"id": "D4", "family": "Bodies", "year": 2019, "title": "Eat the world",
		"law": "Eat what is smaller than you to grow. Everything you eat tells you something.",
		"how": "The hole drifts toward the mouse. Only things smaller than you can be eaten (outlined in ice); bigger ones (grey) push you back. Grow until you can swallow the tower."}


func reset() -> void:
	pos = Vector2(WORLD, WORLD) * 0.5
	radius = 9.0
	eaten = 0
	lore_found.clear()
	things.clear()
	zoom = 1.0
	for i in 900:
		var k: int = _pick_kind()
		var kd: Array = KINDS[k]
		var p := Vector2(randf_range(0, WORLD), randf_range(0, WORLD))
		if p.distance_to(pos) < 80.0 and kd[1] > 8.0:
			continue
		things.append({"p": p, "r": randf_range(kd[1], kd[2]), "k": k, "rot": randf() * TAU})


func _pick_kind() -> int:
	# many small things, few big ones
	var roll := randf()
	var idx := int(pow(roll, 2.6) * KINDS.size())
	return clampi(idx, 0, KINDS.size() - 1)


func tick(dt: float) -> void:
	said_t = maxf(0.0, said_t - dt)
	bump = maxf(0.0, bump - dt * 3.0)
	zoom = lerpf(zoom, clampf(14.0 / radius, 0.05, 1.4), dt * 1.5)
	var screen_c := size * 0.5
	var dir := (mouse() - screen_c) / zoom
	var speed := 160.0 + radius * 2.2
	if dir.length() > 8.0:
		pos += dir.normalized() * minf(speed, dir.length() * 3.0) * dt
	pos = pos.clamp(Vector2.ZERO, Vector2(WORLD, WORLD))
	var keep: Array = []
	for o in things:
		var d: float = o.p.distance_to(pos)
		if d < radius + o.r:
			if o.r < radius * 0.92:
				radius = sqrt(radius * radius + o.r * o.r * 0.55)
				eaten += 1
				var lore: String = KINDS[o.k][4]
				if lore != "":
					said = lore
					said_t = 3.5
					lore_found[o.k] = true
					sfx("blip", -6.0, 0.8)
				else:
					sfx("tick", -16.0, randf_range(0.8, 1.3))
				continue
			elif d < radius + o.r - 1.0:
				# too big: pushed out
				pos = o.p + (pos - o.p).normalized() * (radius + o.r)
				if bump <= 0.0:
					sfx("low", -14.0)
				bump = 1.0
		keep.append(o)
	things = keep
	if radius > 300.0:
		said = "\"There is nothing left. I am alone again.\""
		said_t = 4.0
		reset()


func paint() -> void:
	var c := size * 0.5
	draw_set_transform(c - pos * zoom, 0.0, Vector2(zoom, zoom))
	draw_rect(Rect2(Vector2.ZERO, Vector2(WORLD, WORLD)), Pal.a(Pal.INK, 0.08), false, 2.0 / zoom)
	var view := Rect2(pos - c / zoom, size / zoom).grow(300.0)
	for o in things:
		if not view.has_point(o.p):
			continue
		var small: bool = o.r < radius * 0.92
		var col := Pal.a(Pal.ICE, 0.75) if small else Pal.a(Pal.GREY, 0.45)
		var w := 1.5 / zoom
		if KINDS[o.k][3] == 1:
			var s: float = o.r * 1.4
			draw_set_transform(c - pos * zoom + o.p * zoom, o.rot, Vector2(zoom, zoom))
			draw_rect(Rect2(-s * 0.5, -s * 0.5, s, s), col, false, w)
			draw_set_transform(c - pos * zoom, 0.0, Vector2(zoom, zoom))
		else:
			draw_arc(o.p, o.r, 0.0, TAU, 24, col, w, true)
	draw_circle(pos, radius, Color(0, 0, 0))
	draw_arc(pos, radius + 3.0 / zoom + sin(t * 6.0) * 1.5 / zoom, 0.0, TAU, 48, Pal.a(Pal.AMBER, 0.85), 2.0 / zoom, true)
	draw_set_transform(Vector2.ZERO, 0.0, Vector2.ONE)
	if said_t > 0.0:
		text(said, Vector2(size.x * 0.5, size.y - 110), 20, Pal.a(Pal.INK, minf(1.0, said_t)), HORIZONTAL_ALIGNMENT_CENTER)


func status() -> String:
	var lore_total := 0
	for k in KINDS:
		if k[4] != "":
			lore_total += 1
	return "size %d    eaten %d    lore found %d / %d" % [int(radius), eaten, lore_found.size(), lore_total]
