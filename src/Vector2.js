import {DegreesToRadians} from "./Convert";

export const angleBetween = (a, b) => {
	var mag = a.magnitude() * b.magnitude();
	var dot = dot(a, b);
	return Math.acos(dot / mag);
}

export const lerp = (a, b, t) => {
	var x = a.x + t * (b.x - a.x);
	var y = a.y + t * (b.y - a.y);
	return new Vector2(x, y);
}

export const normalize = (vector) => {
	var vec = vector.get();
	vec.normalize();
	return vec;
}

export const magnitude = (vec) => {
	return Math.sqrt(dot(vec, vec));
}

export const add = (a, b) => {
	return new Vector2((a.x + b.x), (a.y + b.y));
}

export const subtract = (a, b) => {
	var n = new Vector2(b.x, b.y);
	n.negate();
	return add(a, n);
}

export const multiply = (a, scalar) => {
	return new Vector2(a.x * scalar, a.y * scalar);
}

export const divide = (a, scalar) => {
	scalar = 1 / scalar;
	return multiply(a, scalar);
}

export const dot = (a, b) => {
	return a.x * b.x + a.y * b.y;
}

export const dist = (a, b) => {
	var vec1 = a.x - b.x;
	var vec2 = a.y - b.y;
	return Math.sqrt((vec1 * vec1) + (vec2 * vec2));
}

export default class Vector2 {


	constructor(x = 0, y = 0) {
		this.raw = [x, y];
	}

	get x() {
		return this.raw[0];
	}

	set x(value) {
		this.raw[0] = value;
	}

	get y() {
		return this.raw[1];
	}

	set y(value) {
		this.raw[1] = value;
	}

	get z() {
		return 0;
	}

	get() {
		return new Vector2(this.x, this.y);
	}

	set(x = 0, y = 0) {
		this.x = x;
		this.y = y;
	}

	multiply(scalar) {
		this.x = this.x * scalar;
		this.y = this.y * scalar;
	}

	add(v) {
		this.x = this.x + v.x;
		this.y = this.y + v.y;
	}

	subtract(v) {
		var n = new Vector2(v.x, v.y);
		n.negate();
		this.add(n);
	}

	divide(scalar) {
		scalar = 1 / scalar;
		this.multiply(scalar)
	}

	negate() {
		this.x = -this.x;
		this.y = -this.y;
	}

	clamp(limit) {
		if (this.x > limit) {
			this.x = limit;
		} else if (this.x < 0 && this.x < limit) {
			this.x = -limit;
		}
		if (this.y > limit) {
			this.y = limit;
		} else if (this.y < 0 && this.y < limit) {
			this.y = -limit;
		}
	}

	limit(limit) {
		if (this.magnitude() > limit) {
			this.normalize();
			this.multiply(limit);
		}
	}

	rotate(degrees, pivotVector = new Vector2(0, 0), stabilize = false) {
		var mag = this.magnitude();
		var rads = DegreesToRadians(degrees);
		var cosineAngle = Math.cos(rads);
		var sineAngle = Math.sin(rads);
		this.x = (cosineAngle * (this.x - pivotVector.x)) + (sineAngle * (this.y - pivotVector.y)) + pivotVector.x;
		this.y = (cosineAngle * (this.y - pivotVector.y)) - (sineAngle * (this.x - pivotVector.x)) + pivotVector.y;
		if (stabilize) {
			this.normalize();
			this.multiply(mag);
		}
	}

	magnitude() {
		return Math.sqrt(dot(this, this));
	}

	normalize() {
		var m = this.magnitude();
		if (m > 0) {
			this.divide(m);
		}
	}

}
