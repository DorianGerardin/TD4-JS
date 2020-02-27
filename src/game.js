class Game {

	constructor() {
		this.listeCases = new Array;
		for (var i = 0; i < 16; i++) {
			this.listeCases[i] = new Case(i);
		}
		this.coups = 0;
		this.score = 0;
		this.actualTheme = "nombres";
	}

	melanger() {
		this.listeCases.sort(function() {return Math.random() - 0.5});
		for (var i = 0; i < 16; i++) {
			let piece = this.listeCases[i];
			piece.img.src = "img/" + this.actualTheme + "/" + this.actualTheme + "_" + i + ".jpg";
			piece.number = i;
		}
		this.listeCases.sort(function(a, b) {return a.id - b.id});
		this.maj_affichage();
		this.changeAllCursors();
	}

	changerTheme(theme) {
		for (var i = 0; i < 16; i++) {
			this.listeCases[i].img.src = "img/" + theme + "/" + theme + "_" + this.listeCases[i].number + ".jpg";
		}
		this.actualTheme = theme;
		let modele = document.getElementById("photo16");
		modele.src = "img/" + theme + "/" + theme + "_" + "16" + ".jpg";
		this.maj_affichage();
	}

	solution_puzzle() {
		let solution = document.getElementById("solution");
		let jeu = document.getElementById("jeu");
		let modele = document.getElementById("modele");
		let melanger = document.getElementById("melanger");

		if (solution.value == "solution") {
			jeu.style.display = "none";
			modele.style.display = "flex";
			solution.value = "puzzle";
			melanger.disabled = true;
		}
		else if (solution.value == "puzzle") {
			jeu.style.display = "flex";
			modele.style.display = "none";
			solution.value = "solution";
			melanger.disabled = false;
		} 
	}

	maj_affichage() {
		let message = document.getElementById("message");
		let places = 0;
		for (var i = 0; i < this.listeCases.length; i++) {
			if (this.listeCases[i].number == this.listeCases[i].id) {
				places++;
			}
		}
		message.innerHTML = "0 coup(s), " + places + " bien placé(s)"; 
	}

	changeCursor(number) {
		
		let piece = game.listeCases.find(element => element.number === number);
		let idPiece = piece.id;
	
		let blanc = game.listeCases.find(element => element.number === 15);
		let idBlanc = blanc.id;
	
		if (idPiece == 0) {
			if (idPiece + 1 == idBlanc || idPiece + 4 == idBlanc) {
				piece.setCursor("pointer");
			}
			else piece.setCursor("not-allowed");
		}
		else if (idPiece == 3) {
			if (idPiece - 1 == idBlanc || idPiece + 4 == idBlanc) {
				piece.setCursor("pointer");
			}
			else piece.setCursor("not-allowed");
		}
		else if (idPiece == 12) {
			if (idPiece + 1 == idBlanc || idPiece - 4 == idBlanc) {
				piece.setCursor("pointer");
			}
			else piece.setCursor("not-allowed");
		}
		else if (idPiece == 15) {
			if (idPiece - 1 == idBlanc || idPiece - 4 == idBlanc) {
				piece.setCursor("pointer");
			}
			else piece.setCursor("not-allowed");
		}
	
		else if (idPiece == 4 || idPiece == 8) {
			if (idPiece + 1 == idBlanc || idPiece - 4 == idBlanc || idPiece + 4 == idBlanc) {
				piece.setCursor("pointer");
			}
			else piece.setCursor("not-allowed");
		}
		else if (idPiece == 1 || idPiece == 2) {
			if (idPiece - 1 == idBlanc || idPiece + 1 == idBlanc || idPiece + 4 == idBlanc) {
				piece.setCursor("pointer");
			}
			else piece.setCursor("not-allowed");
		}
		else if (idPiece == 7 || idPiece == 11) {
			if (idPiece - 1 == idBlanc || idPiece - 4 == idBlanc || idPiece + 4 == idBlanc) {
				piece.setCursor("pointer");
			}
			else piece.setCursor("not-allowed");
		}
		else if (idPiece == 13 || idPiece == 14) {
			if (idPiece + 1 == idBlanc || idPiece - 1 == idBlanc || idPiece - 4 == idBlanc) {
				piece.setCursor("pointer");
			}
			else piece.setCursor("not-allowed");
		}
	
		else if (idPiece + 1 == idBlanc || idPiece - 1 == idBlanc || idPiece - 4 == idBlanc || idPiece + 4 == idBlanc){
			piece.setCursor("pointer");
		}
	
		else {piece.setCursor("not-allowed");};
	
	}

	changeAllCursors() {
		for (let i = 0; i < this.listeCases.length; i++) {
			this.changeCursor(i);
		}
	}

	deplacerCase() {

		let piece = game.listeCases.find(element => element.img.id === this.id);
		if (piece.getCursor() == "pointer") {
			let nbPiece = piece.number;
			let pieceSrc = piece.img.src;

			let blanc = game.listeCases.find(element => element.number === 15);
			let nbBlanc = blanc.number;
			let blancSrc = blanc.img.src;

			let interSrc = piece.img.src;
			piece.img.src = blanc.img.src;
			blanc.img.src = interSrc;

			let interNb = nbPiece;
			piece.number = nbBlanc;
			blanc.number = interNb;
			
			game.maj_affichage();
			game.changeAllCursors();

		}
	}
}