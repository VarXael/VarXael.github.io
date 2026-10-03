class_name Room
extends Node2D
## A specimen room. Subclasses override info(), reset(), tick(dt), paint() and act(event).

var main: Node = null
var t := 0.0
var size := Vector2(1280, 720)


func setup(m: Node) -> void:
	main = m
	size = get_viewport_rect().size
	t = 0.0
	reset()


func _process(dt: float) -> void:
	size = get_viewport_rect().size
	t += dt
	tick(dt)
	queue_redraw()


func _draw() -> void:
	paint()


func _unhandled_input(event: InputEvent) -> void:
	act(event)


# ---- to override
func info() -> Dictionary:
	return {}


func reset() -> void:
	pass


func tick(_dt: float) -> void:
	pass


func paint() -> void:
	pass


func act(_event: InputEvent) -> void:
	pass


## One line shown bottom-left (score, counters).
func status() -> String:
	return ""


# ---- helpers
func sfx(name: String, db := 0.0, pitch := 1.0) -> void:
	if main:
		main.play(name, db, pitch)


func shake(amount: float) -> void:
	if main:
		main.shake(amount)


func mouse() -> Vector2:
	return get_local_mouse_position()


func pressed(event: InputEvent, keys: Array = [], button := -1) -> bool:
	if event is InputEventKey and event.pressed and not event.echo:
		return keys.has(event.keycode)
	if button >= 0 and event is InputEventMouseButton and event.pressed:
		return event.button_index == button
	return false


func text(s: String, pos: Vector2, fsize: int, col: Color, align := HORIZONTAL_ALIGNMENT_LEFT, width := -1.0) -> void:
	var f := ThemeDB.fallback_font
	var p := pos
	if align == HORIZONTAL_ALIGNMENT_CENTER and width < 0.0:
		width = 1000.0
		p.x -= 500.0
	elif align == HORIZONTAL_ALIGNMENT_RIGHT and width < 0.0:
		width = 1000.0
		p.x -= 1000.0
	draw_string(f, p, s, align, width, fsize, col)


func ring(c: Vector2, r: float, col: Color, w := 1.5) -> void:
	draw_arc(c, r, 0.0, TAU, maxi(24, int(r * 0.6)), col, w, true)
