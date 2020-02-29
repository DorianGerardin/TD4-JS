class Game {

	constructor() {
		this.listeCases = new Array;
		for (var i = 0; i < 16; i++) {
			this.listeCases[i] = new Case(i);
			this.listeCases[i].number = i;
		}
		this.coups = 0;
		this.score = 0;
		this.actualTheme = "nombres";
	}


	// On mélange le taquin
	//Au départ il est résolu car il est dans une configuration initiale, donc on ajoute des événements aux clicks sur les cases
	melanger() {

		if (this.hasWon()) {
			for (let i = 0; i < this.listeCases.length; i++) {
			    this.listeCases[i].img.addEventListener('click', this.bougerCase_maj);
			}
		}

		// On met le taquin dans la configuration initiale (quand on mélange plusieurs fois de suite)
		this.initialiser();

		for (var i = 0; i < 200; i++) {
		
			let caseDeplacables = new Array;
			for (var j = 0; j < 16; j++) {
				let piece = this.listeCases[j];
				if (this.listeCases[j].getCursor() == "pointer") {
					caseDeplacables.push(this.listeCases[j]);
				}
			}

			let randomCase = Math.floor(Math.random() * (caseDeplacables.length));
		
			this.deplacerCase(caseDeplacables[randomCase].img.id);
		}
		this.coups = 0;
		this.maj_affichage();
		//Choix personnel de ranger la liste par ordre croissant des id de cases
		this.listeCases.sort(function(a, b) {return a.id - b.id});

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

		this.score = 0;

		if (this.hasWon()) {
			message.innerHTML = "BRAVO !! Puzzle résolu en " + this.coups + " coups !";
			for (let i = 0; i < this.listeCases.length; i++) {
				this.listeCases[i].setCursor("not-allowed");
				this.listeCases[i].img.removeEventListener('click', this.bougerCase_maj);
			}
			this.listeCases[15].img.src = "img/" + this.actualTheme + "/" + this.actualTheme + "_.jpg";

			}

		else {

			for (var i = 0; i < this.listeCases.length; i++) {
				if (this.listeCases[i].number == this.listeCases[i].id) {
					this.score++;
				}
			}
		
			message.innerHTML = this.coups + " coup(s), " + this.score + " bien placé(s)"; 
		}
	}

	changeCursor(number) {
		
		let piece = this.listeCases.find(element => element.number === number);
		let idPiece = piece.id;
	
		let blanc = this.listeCases.find(element => element.number === 15);
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

	deplacerCase(e) {
		if(e.target!==undefined) {
			e=e.target.id;
		}

		let piece = game.listeCases.find(element => element.img.id === e);
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

			this.coups = this.coups + 1;

			game.changeAllCursors();

		}
	}

	//Appelle deplacercase() avec la mise a jour d'affichage
	//Dans melanger(), on appelle deplacerCase, cela evite d'appeler maj_affichage() à chaque mélange
	bougerCase_maj = function(e) {
		game.deplacerCase(e);
		game.maj_affichage();	
	}.bind(this);


	hasWon() {
		let bool = true;
		for (var i = 0; i < this.listeCases.length; i++) {
			if (this.listeCases[i].number != this.listeCases[i].id) {
				bool = false;
				break;
			}
		}
		return bool;
	}

	//Met le taquin dans une configuration de victoire
	initialiser() {
		for (var i = 0; i < 16; i++) {
			this.listeCases[i] = new Case(i);
			this.listeCases[i].number = i;
			this.listeCases[i].img.src = "img/" + this.actualTheme + "/" + this.actualTheme + "_" + this.listeCases[i].number + ".jpg";
		}
		this.changeAllCursors();
	}



}