extends Room
## B2 The Grey World (Project Circle, Todoist, 2025).
## Out of the beat, the colour and the song drain away until only the kick is left. Four actions on the beat bring it back.

const BPM := 100.0
const WINDOW := 0.11
const PROG := [0, 0, 5, 3]          # bass roots (semitones from A) per bar
const MELODY := [0, 3, 7, 10, 7, 3, 12, 10]

var beat_len := 60.0 / BPM
var last_beat := -1
var colour := 1.0
var grey := false
var misses := 0
var streak := 0
var idle_beats := 0
var acted_this_beat := false
var started := false
var best := 0
var hits: Array = []    # {t, ok}
var flash := 0.0
var orbit: Array = []


func info() -> Dictionary:
	return {"id": "B2", "family": "Rhythm", "year": 2025, "title": "The Grey World",
		"law": "Fall out of the beat and the colour drains away. Four actions on the beat bring it back.",
		"how": "Press Space or click on the beat, when the outer ring meets the circle. Two misses (or four silent beats) and the world goes grey: only the kick is left. Hit four in a row to bring it back."}


func reset() -> void:
	last_beat = -1
	colour = 1.0
	grey = false
	misses = 0
	streak = 0
	idle_beats = 0
	started = false
	hits.clear()
	orbit.clear()
	for i in 48:
		orbit.append({"a": randf() * TAU, "r": randf_range(150, 330), "s": randf_range(0.1, 0.5) * (1 if randf() < 0.5 else -1), "z": randf_range(1.5, 4.0)})


func _phase() -> float:
	return fmod(t, beat_len) / beat_len


func tick(dt: float) -> void:
	var n := int(t / beat_len)
	if n != last_beat:
		last_beat = n
		_on_beat(n)
	colour = move_toward(colour, 0.0 if grey else 1.0, dt * (0.9 if grey else 2.5))
	flash = maxf(0.0, flash - dt * 3.0)
	for h in hits:
		h.t += dt
	hits = hits.filter(func(h): return h.t < 0.7)
	for o in orbit:
		o.a += o.s * dt * (0.2 + colour)


func _on_beat(n: int) -> void:
	sfx("kick", -2.0)
	if started and not acted_this_beat:
		idle_beats += 1
		if idle_beats >= 4 and not grey:
			_miss()
			idle_beats = 0
	acted_this_beat = false
	# the song, only while there is colour
	if colour > 0.05:
		var vol := linear_to_db(colour)
		var bar := (n / 4) % PROG.size()
		var root: int = PROG[bar]
		sfx("bass", vol - 4.0, pow(2.0, root / 12.0))
		sfx("hat", vol - 6.0, 1.0)
		if n % 4 == 0:
			sfx("chord", vol - 8.0, pow(2.0, root / 12.0))
		var mel: int = MELODY[n % MELODY.size()]
		if n % 2 == 1:
			sfx("blip", vol - 14.0, pow(2.0, (mel + root) / 12.0) * 0.5)


func _miss() -> void:
	misses += 1
	streak = 0
	hits.append({"t": 0.0, "ok": false})
	sfx("low", -6.0)
	shake(4.0)
	if misses >= 2:
		grey = true


func act(event: InputEvent) -> void:
	if not pressed(event, [KEY_SPACE], MOUSE_BUTTON_LEFT):
		return
	acted_this_beat = true
	started = true
	idle_beats = 0
	var p := _phase()
	var off := minf(p, 1.0 - p) * beat_len
	if off <= WINDOW:
		streak += 1
		best = maxi(best, streak)
		flash = 1.0
		hits.append({"t": 0.0, "ok": true})
		sfx("tick", -6.0, 1.0 + minf(streak, 8) * 0.06)
		if grey and streak >= 4:
			grey = false
			misses = 0
			sfx("rise", -4.0)
	else:
		_miss()


func paint() -> void:
	var c := size * 0.5 + Vector2(0, 20)
	var R := minf(size.x, size.y) * 0.16
	var k := colour
	var ph := _phase()
	# the song as bars along the bottom: they flatten as the colour drains
	var bars := 64
	var bw := size.x / bars
	for i in bars:
		var amp := (sin(t * 3.0 + i * 0.7) * 0.5 + 0.5) * (cos(i * 1.3 + t) * 0.5 + 0.5)
		amp = amp * size.y * 0.22 * (0.04 + 0.96 * k) * (1.0 - 0.4 * ph)
		draw_rect(Rect2(i * bw, size.y - 120 - amp, bw - 3, amp), Pal.a(Pal.sat(Pal.AMBER, k), 0.28))
	# orbiting matter
	for o in orbit:
		var p: Vector2 = c + Vector2.from_angle(o.a) * o.r
		draw_circle(p, o.z, Pal.a(Pal.sat(Pal.ICE if o.r < 240 else Pal.AMBER, k), 0.15 + 0.5 * k))
	# beat circle and the incoming ring
	draw_circle(c, R * 0.92, Pal.a(Pal.sat(Pal.ICE, k), 0.07 + flash * 0.35))
	ring(c, R, Pal.a(Pal.sat(Pal.ICE, k), 0.9), 3.0)
	ring(c, R * (1.0 + (1.0 - ph) * 1.5), Pal.a(Pal.INK, 0.2 + (1.0 - ph) * 0.35), 1.5)
	for h in hits:
		var col := Pal.sat(Pal.AMBER, k) if h.ok else Pal.RED
		ring(c, R + h.t * 160.0, Pal.a(col, 1.0 - h.t / 0.7), 2.0)
	var label := "GREY WORLD   %d / 4" % mini(streak, 4) if grey else "streak %d" % streak
	text(label, c + Vector2(0, 8), 18, Pal.a(Pal.INK, 0.85), HORIZONTAL_ALIGNMENT_CENTER)


func status() -> String:
	return "misses %d    best streak %d    %s" % [misses, best, "only the kick is left" if grey else "in colour"]
