extends Room
## C3 Parry death (Desktop note, 2023).
## See the killing blow coming and parry the instant it lands: your old body drops with your gear, and you go on without it.

const PARRY := 0.09        # seconds either side of the impact
const REACH := 330.0

enum S { IDLE, WINDUP, STRIKE, RECOVER }

var px := 0.0
var ground_y := 0.0
var ex := 0.0
var state := S.IDLE
var timer := 1.4
var windup := 1.0
var impact_at := 0.0
var feint := false
var gear := 3
var corpses: Array = []    # {x, gear}
var parried := 0
var deaths := 0
var msg := ""
var msg_t := 0.0
var slow := 0.0
var dead := 0.0
var blade := 0.0


func info() -> Dictionary:
	return {"id": "C3", "family": "Death", "year": 2023, "title": "Parry death",
		"law": "If you see death coming, you can parry it. Your body drops with all your gear, and you go on.",
		"how": "A and D move. The executioner winds up a killing blow: click the instant it lands to parry death. You leave a corpse holding your gear (amber); walk over it to take the gear back. Step out of reach to dodge, but you cannot win that way."}


func reset() -> void:
	ground_y = size.y * 0.66
	px = size.x * 0.36
	ex = size.x * 0.68
	gear = 3
	corpses.clear()
	parried = 0
	deaths = 0
	state = S.IDLE
	timer = 1.4
	dead = 0.0


func _say(s: String) -> void:
	msg = s
	msg_t = 1.4


func tick(dt: float) -> void:
	msg_t = maxf(0.0, msg_t - dt)
	if slow > 0.0:
		slow -= dt
		dt *= 0.25
	if dead > 0.0:
		dead -= dt
		if dead <= 0.0:
			gear = 3
			px = size.x * 0.36
			corpses.clear()
			state = S.IDLE
			timer = 1.2
		return
	var mv := 0.0
	if Input.is_key_pressed(KEY_A) or Input.is_key_pressed(KEY_LEFT): mv -= 1.0
	if Input.is_key_pressed(KEY_D) or Input.is_key_pressed(KEY_RIGHT): mv += 1.0
	px = clampf(px + mv * 190.0 * dt, 80.0, ex - 60.0)
	# pick gear back up from corpses
	for c in corpses:
		if c.gear > 0 and absf(c.x - px) < 22.0:
			gear += c.gear
			c.gear = 0
			sfx("blip", -6.0, 1.4)
			_say("gear recovered")
	timer -= dt
	match state:
		S.IDLE:
			blade = 0.0
			if timer <= 0.0:
				state = S.WINDUP
				windup = randf_range(0.7, 1.5)
				feint = randf() < 0.25
				timer = windup
				sfx("rise", -10.0, 0.6)
		S.WINDUP:
			blade = 1.0 - timer / windup
			if timer <= 0.0:
				if feint:
					feint = false
					windup = randf_range(0.35, 0.6)
					timer = windup
					_say("feint")
				else:
					state = S.STRIKE
					impact_at = t + 0.12
					timer = 0.12 + PARRY
		S.STRIKE:
			blade = 1.0 + (1.0 - clampf((impact_at - t) / 0.12, 0.0, 1.0))
			if timer <= 0.0:
				# the parry window has closed: the blow lands or whiffs
				if ex - px <= REACH:
					_die("you died")
				else:
					_say("out of reach")
					state = S.RECOVER
					timer = 0.8
		S.RECOVER:
			blade = maxf(0.0, blade - dt * 3.0)
			if timer <= 0.0:
				state = S.IDLE
				timer = randf_range(0.6, 1.4)


func _die(s: String) -> void:
	deaths += 1
	dead = 1.4
	_say(s)
	sfx("fall")
	shake(12.0)


func act(event: InputEvent) -> void:
	if not pressed(event, [KEY_SPACE], MOUSE_BUTTON_LEFT) or dead > 0.0:
		return
	if state == S.STRIKE and absf(t - impact_at) <= PARRY and ex - px <= REACH:
		parried += 1
		corpses.append({"x": px, "gear": gear})
		gear = 0
		px = maxf(80.0, px - 70.0)
		slow = 0.35
		state = S.RECOVER
		timer = 1.0
		_say("death parried")
		sfx("clang", -2.0)
		sfx("low", -6.0)
		shake(8.0)
	elif state == S.WINDUP or state == S.STRIKE:
		if ex - px <= REACH:
			_die("too early")


func paint() -> void:
	draw_line(Vector2(0, ground_y), Vector2(size.x, ground_y), Pal.a(Pal.INK, 0.25), 1.0)
	# reach marker
	draw_line(Vector2(ex - REACH, ground_y + 8), Vector2(ex - REACH, ground_y + 22), Pal.a(Pal.RED, 0.5), 1.0)
	text("reach", Vector2(ex - REACH + 6, ground_y + 22), 11, Pal.a(Pal.RED, 0.5))
	for c in corpses:
		draw_rect(Rect2(c.x - 18, ground_y - 8, 36, 8), Pal.a(Pal.GREY, 0.8))
		for i in c.gear:
			draw_rect(Rect2(c.x - 12 + i * 9, ground_y - 16, 6, 6), Pal.AMBER)
	# executioner
	var glow := 0.0
	if state == S.WINDUP:
		glow = blade
	elif state == S.STRIKE:
		glow = 1.0
	draw_rect(Rect2(ex - 22, ground_y - 110, 44, 110), Pal.RED.lerp(Pal.INK, glow * 0.25))
	draw_circle(Vector2(ex, ground_y - 126), 14.0, Pal.RED)
	# the blade: raised during wind-up, sweeps across on the strike
	var hand := Vector2(ex - 20, ground_y - 80)
	var ang := lerpf(-1.9, -0.2, clampf(blade, 0.0, 1.0))
	var length := 70.0
	if state == S.STRIKE:
		length = lerpf(70.0, REACH, clampf(blade - 1.0, 0.0, 1.0))
		ang = PI
	draw_line(hand, hand + Vector2.from_angle(ang) * length, Pal.a(Pal.INK, 0.9), 4.0)
	if state == S.WINDUP:
		ring(Vector2(px, ground_y - 40), 34.0 + (1.0 - blade) * 60.0, Pal.a(Pal.RED, 0.15 + blade * 0.5), 2.0)
	if state == S.STRIKE:
		ring(Vector2(px, ground_y - 40), 34.0, Pal.a(Pal.ICE, 0.95), 3.0)
	# you
	if dead > 0.0:
		draw_rect(Rect2(px - 18, ground_y - 8, 36, 8), Pal.a(Pal.RED, 0.8))
	else:
		draw_rect(Rect2(px - 12, ground_y - 64, 24, 64), Pal.INK)
		for i in gear:
			draw_rect(Rect2(px - 12 + i * 9, ground_y - 76, 6, 6), Pal.AMBER)
	if msg_t > 0.0:
		var col := Pal.AMBER if msg == "death parried" or msg == "gear recovered" else Pal.RED
		if msg == "feint" or msg == "out of reach":
			col = Pal.ICE
		text(msg.to_upper(), Vector2(size.x * 0.5, size.y * 0.3), 22, Pal.a(col, minf(1.0, msg_t)), HORIZONTAL_ALIGNMENT_CENTER)


func status() -> String:
	return "deaths parried %d    deaths %d    gear on you %d" % [parried, deaths, gear]
