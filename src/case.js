class Case {

	constructor(id) {
		this.img = document.getElementById("photo" + id);
		this.id = id;
		this.number;
	}

	setCursor(cursor) {
		document.getElementById("photo" + this.id).style.cursor = cursor;
	}

	getCursor() {
		this.img.style.cursor;
	}
}