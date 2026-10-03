extends Room
## E1 Fall through the floor (Notebook n9, 2018; Todoist, 2023).
## Hit the ground fast enough and you go through it, coming out upside down in the world on the other side.

const G := 1500.0
const JUMP := 560.0
const SLAM := 1500.0
const BREAK := 880.0        # landing speed that breaks through
const LEVEL_LEN := 5200.0

var x := 0.0
var y := 0.0                # height above the floor, in the current world (always >= 0)
var vy := 0.0
var world := 0              # 0 above, 1 below
var flip := 0.0
var cam := 0.0
var walls: Array = []       # {x, w, h, world}
var through := 0.0
var passes := 0
var finished := 0
var holding := false


func info() -> Dictionary:
	return {"id": "E1", "family": "Space", "year": 2018, "title": "Fall through the floor",
		"law": "Hit the ground hard enough and you come out the other side, upside down, in another world.",
		"how": "A and D move. Space jumps; hold it to go higher. S in the air slams down. Land fast enough and you break through into the other world. Each world has walls the other does not: switch to get past them."}


func reset() -> void:
	x = 80.0
	y = 0.0
	vy = 0.0
	world = 0
	flip = 0.0
	cam = 0.0
	passes = 0
	walls.clear()
	var wx := 600.0
	var w := 0
	while wx < LEVEL_LEN - 400.0:
		walls.append({"x": wx, "w": 34.0, "h": randf_range(170.0, 260.0), "world": w})
		wx += randf_range(420.0, 620.0)
		w = 1 - w if randf() < 0.7 else w


func _floor_y() -> float:
	return size.y * 0.56


func tick(dt: float) -> void:
	through = maxf(0.0, through - dt * 1.5)
	flip = move_toward(flip, float(world), dt * 3.0)
	var mv := 0.0
	if Input.is_key_pressed(KEY_A) or Input.is_key_pressed(KEY_LEFT): mv -= 1.0
	if Input.is_key_pressed(KEY_D) or Input.is_key_pressed(KEY_RIGHT): mv += 1.0
	var nx := x + mv * 260.0 * dt
	# walls of the current world block you, unless you clear them in the air
	for wl in walls:
		if wl.world == world and y < wl.h:
			if x <= wl.x - 12.0 and nx > wl.x - 12.0:
				nx = wl.x - 12.0
			if x >= wl.x + wl.w + 12.0 and nx < wl.x + wl.w + 12.0:
				nx = wl.x + wl.w + 12.0
	x = clampf(nx, 20.0, LEVEL_LEN)
	holding = Input.is_key_pressed(KEY_SPACE) and vy > 0.0
	var g := G * (0.45 if holding else 1.0)
	if y > 0.0 or vy > 0.0:
		vy -= g * dt
		y += vy * dt
		if y <= 0.0:
			var speed := -vy
			y = 0.0
			vy = 0.0
			if speed >= BREAK:
				world = 1 - world
				passes += 1
				through = 1.0
				sfx("boom", -4.0)
				sfx("fall", -8.0)
				shake(10.0)
				# come out the other side with some of the speed
				vy = speed * 0.35
				y = 1.0
			else:
				sfx("low", -14.0, 1.5)
	if x >= LEVEL_LEN - 10.0:
		finished += 1
		sfx("rise")
		reset()
	cam = lerpf(cam, x - size.x * 0.35, minf(1.0, dt * 6.0))


func act(event: InputEvent) -> void:
	if pressed(event, [KEY_S, KEY_DOWN]) and y > 20.0:
		vy = minf(vy, -SLAM)
		sfx("tick", -12.0, 0.5)
	if pressed(event, [KEY_SPACE, KEY_W, KEY_UP]) and y <= 0.0 and vy == 0.0:
		vy = JUMP
		y = 0.5
		sfx("tick", -10.0, 0.8)


func paint() -> void:
	var fy := _floor_y()
	var k := flip
	# the whole world turns over when you pass through
	var scale_y := cos(k * PI)
	if absf(scale_y) < 0.02:
		scale_y = 0.02
	draw_set_transform(Vector2(0, fy), 0.0, Vector2(1, scale_y))
	var col_above := Pal.ICE
	var col_below := Pal.AMBER
	# floor band
	draw_rect(Rect2(0, 0, size.x, 6), Pal.a(Pal.INK, 0.7))
	draw_rect(Rect2(0, 6, size.x, size.y), Pal.a(col_below, 0.05))
	draw_rect(Rect2(0, -size.y, size.x, size.y), Pal.a(col_above, 0.03))
	# walls: above-world walls rise up, below-world walls hang down
	for wl in walls:
		var sx: float = wl.x - cam
		if sx < -100.0 or sx > size.x + 100.0:
			continue
		var active: bool = wl.world == world
		if wl.world == 0:
			draw_rect(Rect2(sx, -wl.h, wl.w, wl.h), Pal.a(col_above, 0.75 if active else 0.18))
		else:
			draw_rect(Rect2(sx, 6, wl.w, wl.h), Pal.a(col_below, 0.75 if active else 0.18))
	# finish line
	var fx := LEVEL_LEN - cam
	draw_line(Vector2(fx, -size.y), Vector2(fx, size.y), Pal.a(Pal.INK, 0.4), 2.0)
	# the body, standing on whichever side is its world
	var px := x - cam
	var body_top := -y - 46.0 if world == 0 else y + 6.0
	draw_rect(Rect2(px - 11, body_top, 22, 40), Pal.INK)
	draw_set_transform(Vector2.ZERO, 0.0, Vector2.ONE)
	# landing speed gauge
	var speed := maxf(0.0, -vy)
	var gx := 40.0
	var gy := 160.0
	draw_rect(Rect2(gx, gy, 200, 6), Pal.a(Pal.INK, 0.1))
	draw_rect(Rect2(gx, gy, 200 * minf(1.0, speed / BREAK), 6), Pal.AMBER if speed >= BREAK else Pal.ICE)
	text("FALL SPEED", Vector2(gx, gy - 8), 11, Pal.a(Pal.INK, 0.55))
	text("WORLD ABOVE" if world == 0 else "WORLD BELOW", Vector2(size.x - 40, 160), 13, Pal.ICE if world == 0 else Pal.AMBER, HORIZONTAL_ALIGNMENT_RIGHT)
	if through > 0.0:
		text("THROUGH", Vector2(size.x * 0.5, size.y * 0.3), 26, Pal.a(Pal.AMBER, through), HORIZONTAL_ALIGNMENT_CENTER)


func status() -> String:
	return "distance %d / %d    passes %d    runs finished %d" % [int(x), int(LEVEL_LEN), passes, finished]
