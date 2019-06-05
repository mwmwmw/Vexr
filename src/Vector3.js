import {DegreesToRadians} from "./Convert";

/**
 * Resets the supplied Vector to 0.
 * @param v {Vector3}
 * @static
 */
export const reset = (v) => {
    v.set(0, 0, 0, 0);
}

/**
 * angleBetween() gets the angle between two vectors
 * @param a {Vector3}
 * @param b {Vector3}
 * @returns {number}
 * @static
 */
export const angleBetween = (a, b) => {
    var mag = a.magnitude() * b.magnitude();
    var dot = dot(a, b);
    return Math.acos(dot / mag);
}

/**
 * Linear interpolation between two vector locations
 * @param a {Vector3} Starting point
 * @param b {Vector3} Ending point
 * @param t {number} The ratio between the two points 0: Start. 1: End.
 * @param v {Vector3} [v= new Vector()] an optional reference instead of allocating a new vector
 * @returns {Vector3}
 * @static
 */
export const lerp = (a, b, t, v = new Vector3()) => {
    v.set(
        a.raw[0] + t * (b.raw[0] - a.raw[0]),
        a.raw[1] + t * (b.raw[1] - a.raw[1]),
        a.raw[2] + t * (b.raw[2] - a.raw[2])
    );
    return v;
}

/**
 * Normalize a Vector
 * @param vector {Vector3}
 * @param v {Vector3} [v= new Vector()] an optional reference instead of allocating a new vector
 * @returns {Vector3}
 * @static
 */
export const normalize = (vector, v = new Vector3()) => {
    var vec = vector.get(v);
    vec.normalize();
    return vec;
}

/**
 * Get the Magnitude of a vector
 * @param vector {Vector3}
 * @returns {number}
 * @static
 */
export const magnitude = (vector) => {
    return Math.sqrt(dot(vector, vector));
}

/**
 * Add two vectors
 * @param a {Vector3}
 * @param b {Vector3}
 * @param v {Vector3} [v= new Vector()] an optional reference instead of allocating a new vector
 * @returns {Vector3}
 * @static
 */
export const add = (a, b, v = new Vector3()) => {
    v.raw[0] = a.raw[0] + b.raw[0];
    v.raw[1] = a.raw[1] + b.raw[1];
    v.raw[2] = a.raw[2] + b.raw[2];
    return v;
}

export const subtract = (a, b, v = new Vector3()) => {
    v.raw[0] = a.raw[0] - b.raw[0];
    v.raw[1] = a.raw[1] - b.raw[1];
    v.raw[2] = a.raw[2] - b.raw[2];
    return v;
}

/**
 * Subtract two vectors
 * @param a {Vector3}
 * @param b {Vector3}
 * @param v {Vector3} [v= new Vector()] an optional reference instead of allocating a new vector
 * @returns {Vector3}
 * @static
 */
export const multiply = (a, scalar, v = new Vector3()) => {
    v.raw[0] = a.raw[0] * scalar;
    v.raw[1] = a.raw[1] * scalar;
    v.raw[2] = a.raw[2] * scalar;
    return v;
}

/**
 * Multiply two vectors
 * @param a {Vector3}
 * @param b {Vector3}
 * @param v {Vector3} [v= new Vector()] an optional reference instead of allocating a new vector
 * @returns {Vector3}
 * @static
 */
export const divide = (a, scalar, v = new Vector3()) => {
    scalar = 1 / scalar;
    v.raw[0] = a.raw[0] * scalar;
    v.raw[1] = a.raw[1] * scalar;
    v.raw[2] = a.raw[2] * scalar;
    return v;
}

/**
 * Gets the dot product of two vectors
 * @param a {Vector3}
 * @param b {Vector3}
 * @returns {number}
 * @static
 */
export const dot = (a, b) => {
    return a.raw[0] * b.raw[0] + a.raw[1] * b.raw[1] + a.raw[2] * b.raw[2];
}

/**
 * Get the cross product of two vectors
 * @param a {Vector3}
 * @param b {Vector3}
 * @param v {Vector3} [v= new Vector()] an optional reference instead of allocating a new vector
 * @returns {Vector3}
 */
export const cross = (a, b, v = new Vector3()) => {
    a.raw[0] = a.raw[1] * b.raw[2] - b.raw[1] * a.raw[2];
    a.raw[1] = a.raw[2] * b.raw[0] - b.raw[2] * a.raw[0];
    a.raw[2] = a.raw[0] * b.raw[1] - b.raw[0] * a.raw[1];
    return v;
}

/**
 * Get the distance between two vectors
 * @param a {Vector3}
 * @param b {Vector3}
 * @returns {number}
 */
export const dist = (a, b) => {
    var vec1 = a.raw[0] - b.raw[0];
    var vec2 = a.raw[1] - b.raw[1];
    var vec3 = a.raw[2] - b.raw[2];
    return Math.sqrt((vec1 * vec1) + (vec2 * vec2) + (vec3 * vec3));
}

export const zero = new Vector3();

export default class Vector3 {

    /**
     * Creates a new Vector
     * @param x {number}
     * @param y {number}
     * @param z {number}
     * @param w {number}
     * @constructor
     */
    constructor(x = 0, y = 0, z = 0, w = 0) {
        this.raw = new Float32Array(4);
        this.raw[0] = x;
        this.raw[1] = y;
        this.raw[2] = z;
        this.raw[3] = w;
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
        return this.raw[2];
    }

    set z(value) {
        this.raw[2] = value;
    }

    get w() {
        return this.raw[3];
    }

    set w(value) {
        this.raw[3] = value;
    }

    /**
     * Copy this vector
     * @param v {Vector3} [v= new Vector()] an optional reference instead of allocating a new vector
     * @returns {Vector3}
     */
    get(v = new Vector3()) {
        v.set(this.raw[0], this.raw[1], this.raw[2], this.raw[3]);
        return v;
    }

    /**
     * Sets the vector to the values passed in
     * @param x {number}
     * @param y {number}
     * @param z {number}
     * @param w {number}
     */
    set(x = 0, y = 0, z = 0, w = 0) {
        this.raw[0] = x;
        this.raw[1] = y;
        this.raw[2] = z;
        this.raw[3] = w;
    }

    /**
     * Multiplies this vector by a scalar
     * @param scalar {number}
     */
    multiply(scalar) {
        multiply(this, scalar, this);
    }

    /**
     * Adds the vector passed in to this vector
     * @param v {Vector3}
     */
    add(v) {
        add(this, v, this);
    }

    /**
     * Subtracts the vector passed in from this vector
     * @param v {Vector3}
     */
    subtract(v) {
        subtract(this, v, this);
    }

    /**
     * Divides this vector by the scalar
     * @param scalar {Vector3}
     */
    divide(scalar) {
        divide(this, scalar, this);
    }

    /**
     * Inverts this vector
     */
    negate() {
        this.raw[0] = -this.raw[0];
        this.raw[1] = -this.raw[1];
        this.raw[2] = -this.raw[2];
    }

    /**
     * Clamps the vector components to the limit value
     * @param limit {number}
     */
    clamp(limit) {
        if (this.raw[0] > limit) {
            this.raw[0] = limit;
        } else if (this.raw[0] < 0 && this.raw[0] < limit) {
            this.raw[0] = -limit;
        }
        if (this.raw[1] > limit) {
            this.raw[1] = limit;
        } else if (this.raw[1] < 0 && this.raw[1] < limit) {
            this.raw[1] = -limit;
        }
        if (this.raw[2] > limit) {
            this.raw[2] = limit;
        } else if (this.raw[2] < 0 && this.raw[2] < limit) {
            this.raw[2] = -limit;
        }
    }

    /**
     * limits the vector magnitude to the limit value
     * @param limit {number} the maximum magnitude
     */
    limit(limit) {
        if (this.magnitude() > limit) {
            this.normalize();
            this.multiply(limit);
        }
    }

    /**
     * Rotate this vector
     * @param degrees {number} degrees to rotate the vector by
     * @param pivotVector {Vector3} [pivotVector= new Vector3()] The point that you want to rotate around (default 0,0)
     * @param stabilize {boolean} [stabilize = false] stabilize the rotation of the vector by maintaining it's magnitude
     */
    rotate(degrees, pivotVector = zero, stabilize = false) {
        if (stabilize) {
            var mag = this.magnitude();
        }
        var rads = DegreesToRadians(degrees);
        var cosineAngle = Math.cos(rads);
        var sineAngle = Math.sin(rads);
        this.raw[0] = (cosineAngle * (this.raw[0] - pivotVector.x)) + (sineAngle * (this.raw[1] - pivotVector.y)) + pivotVector.x;
        this.raw[1] = (cosineAngle * (this.raw[1] - pivotVector.y)) - (sineAngle * (this.raw[0] - pivotVector.x)) + pivotVector.y;
        if (stabilize) {
            this.normalize();
            this.multiply(mag);
        }
    }

    /**
     * The magnitude of this vector
     * @returns {number}
     */
    magnitude() {
        return Math.sqrt(dot(this, this));
    }

    /**
     * Normalize this vector
     */
    normalize() {
        var m = this.magnitude();
        if (m > 0) {
            this.divide(m);
        }
    }

}
