import Convert from "./Convert";

export default class Vector3 {

	static angleBetween(a, b) {
		var mag = a.magnitude() * b.magnitude();
		var dot = Vector3.dot(a, b);
		return Math.acos(dot / mag);
	}

	static lerp(a, b, t, v = new Vector3()) {
		v.set(
			a.x + t * (b.x - a.x),
			a.y + t * (b.y - a.y),
			a.z + t * (b.z - a.z)
		);
		return v;
	}

	static normalize(vector, v = new Vector3()) {
		var vec = vector.get(v);
		vec.normalize();
		return vec;
	}

	static magnitude(vector) {
		return Math.sqrt(Vector3.dot(vector, vector));
	}

	static add(a, b, v = new Vector3()) {
		v.set(a.x + b.x, a.y + b.y, a.z + b.z);
		return v;
	}

	static subtract(a, b, v = new Vector3()) {
		v.set(a.x - b.x, a.y - b.y, a.z - b.z);
		return v;
	}

	static multiply(a, scalar, v = new Vector3()) {
		v.set(a.x * scalar, a.y * scalar, a.z * scalar);
		return v;
	}

	static divide(a, scalar, v = new Vector3()) {
		v.set(a.x * scalar, a.y * scalar, a.z * scalar);
		return v;
	}

	static dot(a, b) {
		return a.x * b.x + a.y * b.y + a.z * b.z;
	}

	static cross(a, b, v = new Vector3()) {
		v.set(
			a.y * b.z - b.y * a.z,
			a.z * b.x - b.z * a.x,
			a.x * b.y - b.x * a.y);
		return v;
	}


	static dist(a, b) {
		var vec1 = a.x - b.x;
		var vec2 = a.y - b.y;
		var vec3 = a.z - b.z;
		return Math.sqrt((vec1 * vec1) + (vec2 * vec2) + (vec3 * vec3));
	}

	constructor(x = 0, y = 0, z = 0) {
		this.raw = [x,y,z];
	}

	get x () {
		return this.raw[0];
	}

	set x (value) {
		this.raw[0] = value;
	}

	get y () {
		return this.raw[1];
	}

	set y (value) {
		this.raw[1] = value;
	}

	get z () {
		return this.raw[2];
	}

	set z (value) {
		this.raw[2] = value;
	}

	get(v = new Vector3()) {
		v.set(this.x, this.y, this.z);
		return v;
	}

	set(x=0, y=0, z=0) {
		this.x = x;
		this.y = y;
		this.z = z;
	}

	multiply(scalar) {
		this.x = this.x * scalar;
		this.y = this.y * scalar;
		this.z = this.z* scalar;
	}

	add(v) {
		this.x = this.x + v.x;
		this.y = this.y + v.y;
		this.z = this.z + v.z;
	}

	subtract(v) {
		var n = new Vector3(v.x, v.y, v.z);
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
		this.z = -this.z;
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
		if (this.z > limit) {
			this.z = limit;
		} else if (this.z < 0 && this.z < limit) {
			this.z = -limit;
		}
	}

	limit(limit) {
		if (this.magnitude() > limit) {
			this.normalize();
			this.multiply(limit);
		}
	}

	rotate(degrees, pivotVector = new Vector3(), stabilize = false) {
		var mag = this.magnitude();
		var rads = Convert.degreesToRadians(degrees);
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
		return Math.sqrt(Vector3.dot(this, this));
	}

	normalize() {
		var m = this.magnitude();
		if (m > 0) {
			this.divide(m);
		}
	}

}
