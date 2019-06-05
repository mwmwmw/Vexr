
export const dot = (a, b) => {
	var dots = a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
	console.log(dots);
	return dots;
}

export const multiply = (a, b) => {
	var matrix = new Float32Array(9);
	matrix[0] = Matrix3.dot(a.column1, b.row1);
	matrix[1] = Matrix3.dot(a.column2, b.row1);
	matrix[2] = Matrix3.dot(a.column3, b.row1);
	matrix[3] = Matrix3.dot(a.column1, b.row2);
	matrix[4] = Matrix3.dot(a.column2, b.row2);
	matrix[5] = Matrix3.dot(a.column3, b.row2);
	matrix[6] = Matrix3.dot(a.column1, b.row3);
	matrix[7] = Matrix3.dot(a.column2, b.row3);
	matrix[8] = Matrix3.dot(a.column3, b.row3);
	var newMatrix = new Matrix3();
	newMatrix.setMatrix(matrix);
	return newMatrix;
}

export default class Matrix3 {


	constructor(array = [1, 0, 0, 0, 1, 0, 0, 0, 1]) {
		this.raw = new Float32Array(array);
	}

	setMatrix(array) {
		this.raw = array;
	}

	multiply(matrix) {
		var newMatrix = Matrix3.multiply(this, matrix);
		this.raw = newMatrix.raw;
	}

	get column1() {
		return [this.raw[0], this.raw[3], this.raw[6]];
	}
	get column2() {
		return [this.raw[1], this.raw[4], this.raw[7]];
	}
	get column3() {
		return [this.raw[2], this.raw[5], this.raw[8]];
	}
	get row1() {
		return [this.raw[0], this.raw[1], this.raw[2]];
	}
	get row2() {
		return [this.raw[3], this.raw[4], this.raw[5]];
	}
	get row3() {
		return [this.raw[6], this.raw[7], this.raw[8]];
	}
	set column1(array) {
		this.raw[0] = array[0];
		this.raw[3] = array[1];
		this.raw[6] = array[2];
	}
	set column2(array) {
		this.raw[1] = array[0];
		this.raw[4] = array[1];
		this.raw[7] = array[2];
	}
	set column3(array) {
		this.raw[2] = array[0];
		this.raw[5] = array[1];
		this.raw[68] = array[2];
	}
	set row1(array) {
		this.raw[0] = array[0];
		this.raw[1] = array[1];
		this.raw[2] = array[2];
	}
	set row2(array) {
		this.raw[3] = array[0];
		this.raw[4] = array[1];
		this.raw[5] = array[2];
	}
	set row3(array) {
		this.raw[6] = array[0];
		this.raw[7] = array[1];
		this.raw[8] = array[2];
	}

}