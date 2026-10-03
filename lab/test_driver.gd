extends Node
## Automated pass: visits every room, feeds it input, and saves a screenshot.
##   Godot --path lab -- --autotest

var shot_dir := ""


func _ready() -> void:
	shot_dir = ProjectSettings.globalize_path("res://test_shots/")
	DirAccess.make_dir_recursive_absolute(shot_dir)
	_run()


func _key(code: int, down := true) -> void:
	var e := InputEventKey.new()
	e.keycode = code
	e.physical_keycode = code
	e.pressed = down
	Input.parse_input_event(e)


func _tap(code: int) -> void:
	_key(code, true)
	await get_tree().process_frame
	_key(code, false)


func _click(pos: Vector2, button := MOUSE_BUTTON_LEFT) -> void:
	var m := InputEventMouseMotion.new()
	m.position = pos
	Input.parse_input_event(m)
	Input.warp_mouse(pos)
	var e := InputEventMouseButton.new()
	e.button_index = button
	e.position = pos
	e.pressed = true
	Input.parse_input_event(e)
	await get_tree().process_frame
	e = e.duplicate()
	e.pressed = false
	Input.parse_input_event(e)


func _wait(s: float) -> void:
	await get_tree().create_timer(s).timeout


func _run() -> void:
	var main := get_parent()
	var sz := get_viewport().get_visible_rect().size
	for i in main.ROOMS.size():
		main.load_room(i)
		var id: String = main.ROOMS[i][0]
		await _wait(0.4)
		match id:
			"A2":
				Input.warp_mouse(sz * 0.5)
				_key(KEY_D)
				await _wait(0.6)
				_key(KEY_D, false)
			"B2":
				for k in 6:
					await _tap(KEY_SPACE)
					await _wait(0.6)
			"B3":
				await _tap(KEY_DOWN)
				await _wait(1.0)
				await _tap(KEY_RIGHT)
				await _wait(1.0)
			"C1":
				await _click(sz * Vector2(0.5, 0.3), MOUSE_BUTTON_RIGHT)
				await _wait(0.8)
				for k in 3:
					await _click(sz * Vector2(0.5, 0.3))
					await _wait(0.1)
			"C3":
				await _wait(1.6)
				await _click(sz * 0.5)
				await _wait(0.5)
			"D4":
				Input.warp_mouse(sz * Vector2(0.8, 0.5))
				await _wait(1.5)
			"E1":
				_key(KEY_D)
				await _tap(KEY_SPACE)
				await _wait(0.35)
				await _tap(KEY_S)
				await _wait(0.4)
				await _wait(0.6)
				_key(KEY_D, false)
			"E3":
				await _click(sz * Vector2(0.6, 0.55))
				await _wait(0.3)
				await _click(sz * 0.5, MOUSE_BUTTON_RIGHT)
				await _wait(0.2)
				await _click(sz * Vector2(0.62, 0.5))
				await _wait(0.4)
		await RenderingServer.frame_post_draw
		get_viewport().get_texture().get_image().save_png(shot_dir + "%d_%s.png" % [i + 1, id])
		print("ROOM %s ok: %s" % [id, main.room.status()])
	print("AUTOTEST DONE")
	get_tree().quit()
