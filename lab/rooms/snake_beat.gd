extends Room
## B3 Snake on the beat (Desktop note, 2022; Todoist, 2026).
## You can only turn when the song does: input is queued and taken on the next beat.

const W := 22
const H := 13

var bpm := 104.0
var last_beat := -1
var body: Array[Vector2i] = []
var dir := Vector2i(1, 0)
var queued := Vector2i.ZERO
var has_queue := false
var food := Vector2i(14, 6)
var pulse := 0.0
var best := 0
var dead := 0.0
var beat_clock := 0.0
var early := 0.0


func info() -> Dictionary:
	return {"id": "B3", "family": "Rhythm", "year": 2022, "title": "Snake on the beat",
		"law": "You can only turn when the song does.",
		"how": "Arrow keys or WASD queue a turn. The snake takes it on the next beat, never before. Every apple speeds the song up."}


func reset() -> void:
	bpm = 104.0
	body = [Vector2i(6, 6), Vector2i(5, 6), Vector2i(4, 6)]
	dir = Vector2i(1, 0)
	has_queue = false
	_place_food()
	dead = 0.0
	beat_clock = 0.0
	last_beat = -1


func _place_food() -> void:
	while true:
		food = Vector2i(randi() % W, randi() % H)
		if not body.has(food):
			return


func tick(dt: float) -> void:
	pulse = maxf(0.0, pulse - dt * 4.0)
	early = maxf(0.0, early - dt * 3.0)
	if dead > 0.0:
		dead -= dt
		if dead <= 0.0:
			reset()
		return
	beat_clock += dt
	var beat_len := 60.0 / bpm
	if beat_clock >= beat_len:
		beat_clock -= beat_len
		_step()


func _step() -> void:
	pulse = 1.0
	sfx("kick", -3.0)
	if has_queue and queued != -dir:
		dir = queued
	has_queue = false
	var head := body[0] + dir
	head = Vector2i(wrapi(head.x, 0, W), wrapi(head.y, 0, H))
	if body.has(head):
		dead = 1.2
		sfx("fall", -2.0)
		shake(8.0)
		return
	body.insert(0, head)
	if head == food:
		sfx("blip", -4.0, 1.0 + body.size() * 0.02)
		bpm = minf(160.0, bpm + 3.0)
		best = maxi(best, body.size())
		_place_food()
	else:
		body.pop_back()
		sfx("hat", -10.0)


func act(event: InputEvent) -> void:
	if not (event is InputEventKey and event.pressed and not event.echo):
		return
	var k: int = event.keycode
	var d := Vector2i.ZERO
	if k == KEY_UP or k == KEY_W: d = Vector2i(0, -1)
	elif k == KEY_DOWN or k == KEY_S: d = Vector2i(0, 1)
	elif k == KEY_LEFT or k == KEY_A: d = Vector2i(-1, 0)
	elif k == KEY_RIGHT or k == KEY_D: d = Vector2i(1, 0)
	if d != Vector2i.ZERO:
		queued = d
		has_queue = true
		early = 1.0


func paint() -> void:
	var cell := minf(size.x * 0.8 / W, (size.y - 260.0) / H)
	var o := Vector2((size.x - cell * W) * 0.5, 150.0)
	draw_rect(Rect2(o, Vector2(W, H) * cell), Pal.a(Pal.ICE, 0.08 + pulse * 0.3), false, 1.5)
	for y in H:
		for x in W:
			draw_rect(Rect2(o + (Vector2(x, y) + Vector2(0.5, 0.5)) * cell - Vector2(1, 1), Vector2(2, 2)), Pal.a(Pal.GREY, 0.2 + pulse * 0.15))
	var fp := o + Vector2(food) * cell
	draw_rect(Rect2(fp + Vector2(5, 5), Vector2(cell - 10, cell - 10)), Pal.AMBER)
	for i in body.size():
		var p := o + Vector2(body[i]) * cell
		var col := Pal.INK if i == 0 else Pal.a(Pal.ICE, 0.85 - 0.45 * float(i) / body.size())
		if dead > 0.0:
			col = Pal.a(Pal.RED, dead)
		draw_rect(Rect2(p + Vector2(2, 2), Vector2(cell - 4, cell - 4)), col)
	# the queued turn waits on the head, visibly, until the beat
	if has_queue:
		var hp := o + (Vector2(body[0]) + Vector2(0.5, 0.5)) * cell
		draw_line(hp, hp + Vector2(queued) * cell * 0.9, Pal.a(Pal.AMBER, 0.9), 3.0)
	# beat meter
	var beat_len := 60.0 / bpm
	var k := beat_clock / beat_len
	var mx := size.x * 0.5
	draw_rect(Rect2(mx - 120, 128, 240, 3), Pal.a(Pal.INK, 0.1))
	draw_rect(Rect2(mx - 120, 128, 240 * k, 3), Pal.a(Pal.ICE, 0.7))
	text("%d BPM" % int(bpm), Vector2(mx + 130, 134), 11, Pal.a(Pal.INK, 0.5))


func status() -> String:
	return "length %d    best %d" % [body.size(), best]
