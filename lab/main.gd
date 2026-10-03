extends Node2D
## The Lab: one room per mechanic. Keys 1-8 change room, R restarts it, F1 hides the text.
## On the web, ?room=A2 opens a room directly and ?embed=1 hides the title (the page shows it).

const ROOMS := [
	["A2", "res://rooms/lamp.gd"],
	["B2", "res://rooms/grey_world.gd"],
	["B3", "res://rooms/snake_beat.gd"],
	["C1", "res://rooms/damage_window.gd"],
	["C3", "res://rooms/parry_death.gd"],
	["D4", "res://rooms/eat_world.gd"],
	["E1", "res://rooms/fall_through.gd"],
	["E3", "res://rooms/rewind_body.gd"],
]

var sounds: Dictionary = {}
var players: Array[AudioStreamPlayer] = []
var stage: Node2D
var room: Room
var index := 0
var embed := false
var show_text := true
var shake_amt := 0.0
var overlay_layer: CanvasLayer
var overlay: Node2D
var autotest := false


func _ready() -> void:
	randomize()
	sounds = Sfx.build()
	for i in 12:
		var p := AudioStreamPlayer.new()
		add_child(p)
		players.append(p)
	stage = Node2D.new()
	add_child(stage)
	overlay_layer = CanvasLayer.new()
	overlay_layer.layer = 10
	add_child(overlay_layer)
	overlay = Node2D.new()
	overlay_layer.add_child(overlay)
	overlay.draw.connect(_draw_overlay)

	var start := "A2"
	if OS.has_feature("web"):
		var q = JavaScriptBridge.eval("window.location.search", true)
		if q is String:
			for pair in q.trim_prefix("?").split("&"):
				var kv: PackedStringArray = pair.split("=")
				if kv.size() == 2 and kv[0] == "room":
					start = kv[1].to_upper()
				if kv.size() == 2 and kv[0] == "embed" and kv[1] == "1":
					embed = true
	for i in ROOMS.size():
		if ROOMS[i][0] == start:
			index = i
	load_room(index)
	autotest = "--autotest" in OS.get_cmdline_user_args()
	if autotest:
		var drv = load("res://test_driver.gd").new()
		add_child(drv)


func load_room(i: int) -> void:
	index = wrapi(i, 0, ROOMS.size())
	if room:
		room.queue_free()
	room = load(ROOMS[index][1]).new()
	stage.add_child(room)
	room.setup(self)


func play(name: String, db := 0.0, pitch := 1.0) -> void:
	if not sounds.has(name):
		return
	for p in players:
		if not p.playing:
			p.stream = sounds[name]
			p.volume_db = db
			p.pitch_scale = pitch
			p.play()
			return
	players[0].stream = sounds[name]
	players[0].play()


func shake(amount: float) -> void:
	shake_amt = maxf(shake_amt, amount)


func _process(dt: float) -> void:
	shake_amt = move_toward(shake_amt, 0.0, dt * 40.0)
	stage.position = Vector2(randf_range(-1, 1), randf_range(-1, 1)) * shake_amt
	overlay.queue_redraw()


func _unhandled_input(event: InputEvent) -> void:
	if event is InputEventKey and event.pressed and not event.echo:
		if event.keycode >= KEY_1 and event.keycode <= KEY_8:
			load_room(event.keycode - KEY_1)
		elif event.keycode == KEY_F1:
			show_text = not show_text
		elif event.keycode == KEY_R and not (room.info().get("uses_r", false)):
			room.setup(self)
		elif event.keycode == KEY_BACKSPACE:
			room.setup(self)


func _draw_overlay() -> void:
	var sz := get_viewport_rect().size
	var f := ThemeDB.fallback_font
	var inf := room.info()
	var dim := Pal.a(Pal.INK, 0.55)
	if show_text and not embed:
		overlay.draw_string(f, Vector2(40, 46), "THE LAB  /  %s  %s  /  first written %s" % [inf.get("id", ""), str(inf.get("family", "")).to_upper(), inf.get("year", "")], HORIZONTAL_ALIGNMENT_LEFT, -1, 13, dim)
		overlay.draw_string(f, Vector2(40, 84), inf.get("title", ""), HORIZONTAL_ALIGNMENT_LEFT, -1, 30, Pal.INK)
		overlay.draw_multiline_string(f, Vector2(40, 112), inf.get("law", ""), HORIZONTAL_ALIGNMENT_LEFT, sz.x * 0.6, 16, 2, Pal.ICE)
	if show_text:
		overlay.draw_multiline_string(f, Vector2(40, sz.y - 74), inf.get("how", ""), HORIZONTAL_ALIGNMENT_LEFT, sz.x - 80, 14, 2, Pal.a(Pal.INK, 0.78))
	overlay.draw_string(f, Vector2(40, sz.y - 26), room.status(), HORIZONTAL_ALIGNMENT_LEFT, -1, 13, Pal.AMBER)
	var nav := "1-8 rooms   %s restart   F1 text" % ("Backspace" if inf.get("uses_r", false) else "R")
	overlay.draw_string(f, Vector2(sz.x - 40 - 420, sz.y - 26), nav, HORIZONTAL_ALIGNMENT_RIGHT, 420, 12, dim)
	# room strip, top right
	var x := sz.x - 40.0
	for i in range(ROOMS.size() - 1, -1, -1):
		var id: String = ROOMS[i][0]
		var c := Pal.ICE if i == index else Pal.a(Pal.INK, 0.35)
		overlay.draw_string(f, Vector2(x - 36, 46), id, HORIZONTAL_ALIGNMENT_RIGHT, 36, 13, c)
		x -= 46.0
