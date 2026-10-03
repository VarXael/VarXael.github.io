extends Room
## A2 The lamp builds the world (Sky Island GDD, 2022).
## Ground that is not lit does not exist. The lamp is leashed to the walker; fuel keeps ground built after the light moves on.

const TILE := 44.0
const LIGHT := 118.0
const LEASH := 230.0
const FUEL_TIME := 7.0
const MAPS := [
	[
		"........................",
		"........................",
		"..#####.................",
		"..#S###.................",
		"..#####.......#######...",
		"....###.......###E###...",
		"....####......#######...",
		".....####.......###.....",
		"......#####....####.....",
		"........######.###......",
		"..........#######.......",
		"........................",
		"........................",
	],
	[
		"........................",
		"..####..................",
		"..#S##..................",
		"..####...####...........",
		"...##....#..#...######..",
		"...##....#..#...##E###..",
		"...#######..#...######..",
		"............#.....##....",
		"............#####.##....",
		"................####....",
		"........................",
		"........................",
		"........................",
	],
	[
		"........................",
		"........................",
		"..###...........#####...",
		"..#S#...........##E##...",
		"..###...........#####...",
		"...#.............#......",
		"...#.............#......",
		"...#....###......#......",
		"...######.#......#......",
		"..........#.......#.....",
		"..........##########....",
		"........................",
		"........................",
	],
]

var level := 0
var ground: Array = []   # [row][col] -> bool (true = potential ground)
var fuel: Array = []     # [row][col] -> float seconds left
var start := Vector2.ZERO
var exit := Vector2.ZERO
var walker := Vector2.ZERO
var lamp := Vector2.ZERO
var tank := 100.0
var falls := 0
var falling := 0.0
var cleared := 0
var flash := 0.0
var origin := Vector2.ZERO


func info() -> Dictionary:
	return {"id": "A2", "family": "Perception", "year": 2022, "title": "The lamp builds the world",
		"law": "Ground that is not lit does not exist. Fuel left behind keeps it built.",
		"how": "WASD moves the walker. The lamp follows the mouse on a short leash. Hold the left button to pour fuel: fuelled ground stays built after the light moves on. Reach the amber exit."}


func reset() -> void:
	level = 0
	falls = 0
	cleared = 0
	_load(level)


func _load(n: int) -> void:
	var rows: Array = MAPS[n]
	ground.clear()
	fuel.clear()
	origin = (size - Vector2(24, 13) * TILE) * 0.5 + Vector2(0, 30)
	for r in rows.size():
		var g := []
		var fu := []
		var line: String = rows[r]
		for c in line.length():
			var ch := line[c]
			g.append(ch != ".")
			fu.append(0.0)
			if ch == "S":
				start = origin + Vector2(c + 0.5, r + 0.5) * TILE
			if ch == "E":
				exit = origin + Vector2(c + 0.5, r + 0.5) * TILE
		ground.append(g)
		fuel.append(fu)
	walker = start
	lamp = start
	tank = 100.0
	_fuel_start()


## The spawn is fuelled, so the walker never starts on ground that does not exist.
func _fuel_start() -> void:
	var sc := _cell(start)
	for dy in [-1, 0, 1]:
		for dx in [-1, 0, 1]:
			var x: int = sc.x + dx
			var y: int = sc.y + dy
			if y >= 0 and y < ground.size() and x >= 0 and x < 24 and ground[y][x]:
				fuel[y][x] = FUEL_TIME


func _cell(p: Vector2) -> Vector2i:
	var q := (p - origin) / TILE
	return Vector2i(floori(q.x), floori(q.y))


func _exists(p: Vector2) -> bool:
	var c := _cell(p)
	if c.y < 0 or c.y >= ground.size() or c.x < 0 or c.x >= 24:
		return false
	if not ground[c.y][c.x]:
		return false
	var centre := origin + (Vector2(c) + Vector2(0.5, 0.5)) * TILE
	return centre.distance_to(lamp) < LIGHT or fuel[c.y][c.x] > 0.0


func tick(dt: float) -> void:
	flash = maxf(0.0, flash - dt)
	# lamp follows the mouse, leashed to the walker
	var want := mouse()
	var off := want - walker
	if off.length() > LEASH:
		want = walker + off.normalized() * LEASH
	lamp = lamp.lerp(want, minf(1.0, dt * 10.0))
	# fuel
	for r in fuel.size():
		for c in 24:
			fuel[r][c] = maxf(0.0, fuel[r][c] - dt)
	var pouring := Input.is_mouse_button_pressed(MOUSE_BUTTON_LEFT) and tank > 0.0
	if pouring:
		tank = maxf(0.0, tank - dt * 30.0)
		var cc := _cell(lamp)
		for dy in [-1, 0, 1]:
			for dx in [-1, 0, 1]:
				var x: int = cc.x + dx
				var y: int = cc.y + dy
				if y >= 0 and y < fuel.size() and x >= 0 and x < 24 and ground[y][x]:
					var centre := origin + (Vector2(x, y) + Vector2(0.5, 0.5)) * TILE
					if centre.distance_to(lamp) < TILE * 1.2:
						fuel[y][x] = FUEL_TIME
	else:
		tank = minf(100.0, tank + dt * 9.0)
	# walker
	if falling > 0.0:
		falling -= dt
		if falling <= 0.0:
			walker = start
			lamp = start
			_fuel_start()
		return
	var mv := Vector2(Input.get_axis("ui_left", "ui_right"), Input.get_axis("ui_up", "ui_down"))
	if Input.is_key_pressed(KEY_A): mv.x -= 1
	if Input.is_key_pressed(KEY_D): mv.x += 1
	if Input.is_key_pressed(KEY_W): mv.y -= 1
	if Input.is_key_pressed(KEY_S): mv.y += 1
	if mv.length() > 1.0:
		mv = mv.normalized()
	walker += mv * 150.0 * dt
	if not _exists(walker):
		falls += 1
		falling = 0.7
		sfx("fall", -4.0)
		shake(6.0)
	elif walker.distance_to(exit) < TILE * 0.5:
		cleared += 1
		flash = 1.0
		sfx("rise")
		level = (level + 1) % MAPS.size()
		_load(level)


func paint() -> void:
	# a uniform faint grid everywhere, so the dark gives nothing away
	for r in 13:
		for c in 24:
			var p := origin + (Vector2(c, r) + Vector2(0.5, 0.5)) * TILE
			draw_rect(Rect2(p - Vector2(1, 1), Vector2(2, 2)), Pal.a(Pal.GREY, 0.18))
	for r in ground.size():
		for c in 24:
			var p := origin + Vector2(c, r) * TILE
			var centre := p + Vector2(TILE, TILE) * 0.5
			var d := centre.distance_to(lamp)
			var lit := d < LIGHT
			var f: float = fuel[r][c]
			if ground[r][c]:
				if lit:
					draw_rect(Rect2(p + Vector2(2, 2), Vector2(TILE - 4, TILE - 4)), Pal.a(Pal.ICE, 0.12 + 0.45 * (1.0 - d / LIGHT)))
				elif f > 0.0:
					draw_rect(Rect2(p + Vector2(2, 2), Vector2(TILE - 4, TILE - 4)), Pal.a(Pal.AMBER, 0.12 + 0.4 * f / FUEL_TIME))
				if lit and f > 0.0:
					draw_rect(Rect2(p + Vector2(2, 2), Vector2(TILE - 4, TILE - 4)), Pal.a(Pal.AMBER, 0.6), false, 1.5)
			elif lit:
				# the void, seen: a hatched edge
				draw_rect(Rect2(p + Vector2(6, 6), Vector2(TILE - 12, TILE - 12)), Pal.a(Pal.RED, 0.10 * (1.0 - d / LIGHT)), false, 1.0)
	# exit beacon is always faintly visible, so the player knows the direction
	var pulse := 0.5 + 0.5 * sin(t * 4.0)
	draw_rect(Rect2(exit - Vector2(9, 9), Vector2(18, 18)), Pal.a(Pal.AMBER, 0.35 + 0.5 * pulse), false, 2.0)
	ring(exit, 16.0 + pulse * 6.0, Pal.a(Pal.AMBER, 0.25))
	# light
	ring(lamp, LIGHT, Pal.a(Pal.ICE, 0.28), 1.0)
	draw_line(walker, lamp, Pal.a(Pal.INK, 0.15), 1.0)
	draw_circle(lamp, 6.0, Pal.INK)
	# walker
	if falling > 0.0:
		var k := falling / 0.7
		draw_rect(Rect2(walker - Vector2(7, 14) * k, Vector2(14, 18) * k), Pal.a(Pal.INK, k))
	else:
		draw_rect(Rect2(walker - Vector2(7, 14), Vector2(14, 18)), Pal.INK)
	# fuel tank
	var bx := size.x - 260.0
	var by := size.y - 98.0
	draw_rect(Rect2(bx, by, 220, 6), Pal.a(Pal.INK, 0.12))
	draw_rect(Rect2(bx, by, 220 * tank / 100.0, 6), Pal.AMBER)
	text("FUEL", Vector2(bx, by - 8), 11, Pal.a(Pal.INK, 0.6))
	if flash > 0.0:
		text("EXIT REACHED", Vector2(size.x * 0.5, size.y * 0.5 - 200), 18, Pal.a(Pal.AMBER, flash), HORIZONTAL_ALIGNMENT_CENTER)


func status() -> String:
	return "level %d / %d    exits %d    falls %d" % [level + 1, MAPS.size(), cleared, falls]
