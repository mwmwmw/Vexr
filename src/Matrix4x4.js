import Vector3 from "./Vector3";


export const identity = () => {
    return new Float32Array([1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1])
}

export const dot = (c1, c2, c3, c4, r1, r2, r3, r4) => {
    return c1 * r1 + c2 * r2 + c3 * r3 + c4 * r4;
}

export const multiply = (a, b, outputMatrix = new Matrix4()) => {
    let matrix = new Float32Array(16);
    //let matrix = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    matrix[0] = Matrix4.dot(a.raw[0], a.raw[4], a.raw[8], a.raw[12], b.raw[0], b.raw[1], b.raw[2], b.raw[3]);
    matrix[1] = Matrix4.dot(a.raw[1], a.raw[5], a.raw[9], a.raw[13], b.raw[0], b.raw[1], b.raw[2], b.raw[3]);
    matrix[2] = Matrix4.dot(a.raw[2], a.raw[6], a.raw[10], a.raw[14], b.raw[0], b.raw[1], b.raw[2], b.raw[3]);
    matrix[3] = Matrix4.dot(a.raw[3], a.raw[7], a.raw[11], a.raw[15], b.raw[0], b.raw[1], b.raw[2], b.raw[3]);

    matrix[4] = Matrix4.dot(a.raw[0], a.raw[4], a.raw[8], a.raw[12], b.raw[4], b.raw[5], b.raw[6], b.raw[7]);
    matrix[5] = Matrix4.dot(a.raw[1], a.raw[5], a.raw[9], a.raw[13], b.raw[4], b.raw[5], b.raw[6], b.raw[7]);
    matrix[6] = Matrix4.dot(a.raw[2], a.raw[6], a.raw[10], a.raw[14], b.raw[4], b.raw[5], b.raw[6], b.raw[7]);
    matrix[7] = Matrix4.dot(a.raw[3], a.raw[7], a.raw[11], a.raw[15], b.raw[4], b.raw[5], b.raw[6], b.raw[7]);

    matrix[8] = Matrix4.dot(a.raw[0], a.raw[4], a.raw[8], a.raw[12], b.raw[8], b.raw[9], b.raw[10], b.raw[11]);
    matrix[9] = Matrix4.dot(a.raw[1], a.raw[5], a.raw[9], a.raw[13], b.raw[8], b.raw[9], b.raw[10], b.raw[11]);
    matrix[10] = Matrix4.dot(a.raw[2], a.raw[6], a.raw[10], a.raw[14], b.raw[8], b.raw[9], b.raw[10], b.raw[11]);
    matrix[11] = Matrix4.dot(a.raw[3], a.raw[7], a.raw[11], a.raw[15], b.raw[8], b.raw[9], b.raw[10], b.raw[11]);

    matrix[12] = Matrix4.dot(a.raw[0], a.raw[4], a.raw[8], a.raw[12], b.raw[12], b.raw[13], b.raw[14], b.raw[15]);
    matrix[13] = Matrix4.dot(a.raw[1], a.raw[5], a.raw[9], a.raw[13], b.raw[12], b.raw[13], b.raw[14], b.raw[15]);
    matrix[14] = Matrix4.dot(a.raw[2], a.raw[6], a.raw[10], a.raw[14], b.raw[12], b.raw[13], b.raw[14], b.raw[15]);
    matrix[15] = Matrix4.dot(a.raw[3], a.raw[7], a.raw[11], a.raw[15], b.raw[12], b.raw[13], b.raw[14], b.raw[15]);
    //console.log(outputMatrix);
    outputMatrix.setMatrix(matrix);
    return outputMatrix;
}

export const multiplyVector = (v3, matrix, v = new Vector3()) => {
    v.set(matrix[0] * v3.raw[0], matrix[1] * v3.raw[1], matrix[2] * v3.raw[2], matrix[3] * v3.raw[3],
        matrix[4] * v3.raw[0], matrix[5] * v3.raw[1], matrix[6] * v3.raw[2], matrix[7] * v3.raw[3],
        matrix[8] * v3.raw[0], matrix[9] * v3.raw[1], matrix[10] * v3.raw[2], matrix[11] * v3.raw[3],
        matrix[12] * v3.raw[0], matrix[13] * v3.raw[1], matrix[14] * v3.raw[2], matrix[15] * v3.raw[3]);
    return v;
}

export const translate = (v3) => {}

export const scale = (v3) => {}


export default class Matrix4 {

    constructor(array = Matrix4.identity()) {
        this.setMatrix(array);
    }

    setMatrix(array) {
        this.raw = array;
    }

    multiply(matrix) {
        multiply(this, matrix, this);
    }

    transpose() {
        var row1 = [this.raw[0], this.raw[1], this.raw[2], this.raw[3]];
        var row2 = [this.raw[4], this.raw[5], this.raw[6], this.raw[7]];
        var row3 = [this.raw[8], this.raw[9], this.raw[10], this.raw[11]];
        var row4 = [this.raw[12], this.raw[13], this.raw[14], this.raw[15]];

        this.raw[0] = row1[0];
        this.raw[4] = row1[1];
        this.raw[8] = row1[2];
        this.raw[12] = row1[3];

        this.raw[1] = row2[0];
        this.raw[5] = row2[1];
        this.raw[9] = row2[2];
        this.raw[13] = row2[3];

        this.raw[2] = row3[0];
        this.raw[6] = row3[1];
        this.raw[10] = row3[2];
        this.raw[14] = row3[3];

        this.raw[3] = row4[0];
        this.raw[7] = row4[1];
        this.raw[11] = row4[2];
        this.raw[15] = row4[3];

    }

}
