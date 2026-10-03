class_name Pal
## The Lab's colour language: grey (seen), ice (known), amber (committed), red (danger).

const VOID := Color(0.031, 0.035, 0.039)
const PANEL := Color(0.055, 0.063, 0.071)
const INK := Color(0.906, 0.902, 0.882)
const GREY := Color(0.42, 0.43, 0.45)
const ICE := Color(0.624, 0.847, 1.0)
const AMBER := Color(0.941, 0.651, 0.251)
const RED := Color(0.878, 0.325, 0.247)


static func a(c: Color, alpha: float) -> Color:
	return Color(c.r, c.g, c.b, clampf(alpha, 0.0, 1.0))


## Blend a colour toward its own grey; k = 1 keeps it, k = 0 fully grey.
static func sat(c: Color, k: float) -> Color:
	var g := c.r * 0.3 + c.g * 0.59 + c.b * 0.11
	return Color(lerpf(g, c.r, k), lerpf(g, c.g, k), lerpf(g, c.b, k), c.a)
