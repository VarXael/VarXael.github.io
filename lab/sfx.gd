class_name Sfx
## Every sound in the Lab is generated here at startup, so the project ships with no audio files.

const RATE := 22050


static func _wav(s: PackedFloat32Array) -> AudioStreamWAV:
	var w := AudioStreamWAV.new()
	w.format = AudioStreamWAV.FORMAT_16_BITS
	w.mix_rate = RATE
	w.stereo = false
	var data := PackedByteArray()
	data.resize(s.size() * 2)
	for i in s.size():
		data.encode_s16(i * 2, int(clampf(s[i], -1.0, 1.0) * 32000.0))
	w.data = data
	return w


static func _buf(seconds: float) -> PackedFloat32Array:
	var s := PackedFloat32Array()
	s.resize(int(seconds * RATE))
	return s


static func kick() -> AudioStreamWAV:
	var s := _buf(0.32)
	var ph := 0.0
	for i in s.size():
		var t := float(i) / RATE
		var f := 45.0 + 110.0 * exp(-t * 28.0)
		ph += TAU * f / RATE
		s[i] = sin(ph) * exp(-t * 9.0) * 0.95
	return _wav(s)


static func hat() -> AudioStreamWAV:
	var s := _buf(0.08)
	var prev := 0.0
	for i in s.size():
		var t := float(i) / RATE
		var n := randf_range(-1.0, 1.0)
		s[i] = (n - prev) * exp(-t * 70.0) * 0.35
		prev = n
	return _wav(s)


static func tone(freq: float, seconds: float, decay: float, shape := 0) -> AudioStreamWAV:
	var s := _buf(seconds)
	for i in s.size():
		var t := float(i) / RATE
		var p := fmod(t * freq, 1.0)
		var v := sin(TAU * p)
		if shape == 1:
			v = 4.0 * absf(p - 0.5) - 1.0  # triangle
		elif shape == 2:
			v = (1.0 if p < 0.5 else -1.0) * 0.5  # soft square
		var env := minf(1.0, t * 400.0) * exp(-t * decay)
		s[i] = v * env * 0.6
	return _wav(s)


static func chord(freqs: Array, seconds: float, decay: float) -> AudioStreamWAV:
	var s := _buf(seconds)
	for i in s.size():
		var t := float(i) / RATE
		var v := 0.0
		for f in freqs:
			v += sin(TAU * float(f) * t) + 0.3 * sin(TAU * float(f) * 2.0 * t)
		s[i] = v / float(freqs.size()) * minf(1.0, t * 200.0) * exp(-t * decay) * 0.45
	return _wav(s)


static func noise_burst(seconds: float, decay: float, lowpass: float) -> AudioStreamWAV:
	var s := _buf(seconds)
	var y := 0.0
	for i in s.size():
		var t := float(i) / RATE
		y += (randf_range(-1.0, 1.0) - y) * lowpass
		s[i] = y * exp(-t * decay) * 1.6
	return _wav(s)


static func sweep(f0: float, f1: float, seconds: float) -> AudioStreamWAV:
	var s := _buf(seconds)
	var ph := 0.0
	for i in s.size():
		var t := float(i) / RATE
		var k := t / seconds
		ph += TAU * lerpf(f0, f1, k) / RATE
		s[i] = sin(ph) * (1.0 - k) * 0.5
	return _wav(s)


static func build() -> Dictionary:
	return {
		"kick": kick(),
		"hat": hat(),
		"blip": tone(880.0, 0.14, 26.0),
		"tick": tone(1760.0, 0.05, 80.0),
		"bass": tone(110.0, 0.42, 6.0, 1),
		"chord": chord([220.0, 277.18, 329.63], 0.9, 3.0),
		"low": tone(70.0, 0.5, 6.0, 2),
		"hit": noise_burst(0.12, 30.0, 0.5),
		"boom": noise_burst(0.7, 5.0, 0.08),
		"clang": tone(1320.0, 0.25, 14.0, 2),
		"rise": sweep(220.0, 880.0, 0.35),
		"fall": sweep(660.0, 90.0, 0.45),
	}
