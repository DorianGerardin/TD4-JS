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
		}
		this.maj_affichage();
	}

	changerTheme(theme) {
		for (var i = 0; i < 16; i++) {
			this.listeCases[i].img.src = "img/" + theme + "/" + theme + "_" + i + ".jpg";
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
			this.listeCases[i].img.id.substring(5);
			if (this.listeCases[i].id = i) {
				places++;
			}
		}
		message.innerHTML = "0 coups, " + places + "bien placé(s)"; 
	}


}