var optionSelected = 1;

var difficultiesTab = ["EASY", "NORMAL", "HARD"];
var difficultyTabTaille = 3;

function Options() {
	theOptions = this;
	theOptions.bind();	
	//this.hWallpaper = 170;
	this.taille=10;
}

Options.prototype.addButton = function () {
	document.getElementById("inputPlayer").style.display = "block";
	document.getElementById("inputPlayer").style.top = "50%";
	document.getElementById("inputPlayer").style.left = "60%";
 // document.getElementById("inputPlayer").style.height = canvas.height/88+"%";
//	document.getElementById("inputPlayer").style.width = canvas.width/35+"%";
}

Options.prototype.hideButton = function () {
	document.getElementById("inputPlayer").style.display = "none";
}

Options.prototype.submitNick = function () {
	var valueNick = document.getElementById("inputPlayer").value;
	optionsData.saveNickName(valueNick);

}

Options.prototype.bind = function() {
	$(canvas).on("click", function (e) {
		e.stopPropagation();
		theOptions.updateByClick(e);
	});

    $(canvas).on("mousemove", function (e) {
		e.stopPropagation();
		theOptions.mouseMouve(e);
	});
};

Options.prototype.unbind = function() {
	$(canvas).unbind("click");
	$(canvas).unbind("mousemove");
};

Options.prototype.updateByClick = function (event){
	var x = event.clientX;
	var y = event.clientY;
	
	var computed  = adaptCoords(x, y);
		//console.log("Le  X : " + computed.x);
		//console.log("Le  Y : " + computed.y);

	//on gère le son
	if (between(computed.y, 30, 45)){
		beepEnter.play();
		if( optionsData.loadSound() === "Yes"){
				optionsData.saveSound("No");
				menuMusic.pause();
			}else if( optionsData.loadSound() === "No") {
				optionsData.saveSound("Yes");
				menuMusic.load();
				menuMusic.play();
			}
	}
	
		//on gère le nom du joueur
	if (between(computed.y, 50, 60)){
		this.addButton();	
	}

	//on gère la difficulté
	if (between(computed.y, 65, 73)){
		beepEnter.play();
		if (optionSelected === 3 ){
			var i = optionsData.loadDifficulty();
			if(i >= difficultyTabTaille){
				i = 0; 
				optionsData.saveDifficulty(i);
			}else {
				i++;
				optionsData.saveDifficulty(i);
			}
		}
	}
	
	//on quitte
	if (between(computed.y, 75, 100)){
		beepCancel.play();
		this.hideButton();
		this.unbind();
		currentObject = menu;
		menu.bind();

	}
	
}

var menuSoundPlayed = {"sound":false,"nickname":false,"difficulty":false,"exit":false};
Options.prototype.mouseMouve = function(event){

	var computed  = adaptCoords(event.clientX, event.clientY);

	if (between(computed.y, 30, 45)){
		optionSelected = 1;
	if(menuSoundPlayed.sound === false){
			beepMenu.play();
			this.hideButton();
			menuSoundPlayed.sound = true;
			menuSoundPlayed.nickname = false;
			menuSoundPlayed.difficulty = false;
			menuSoundPlayed.exit = false;
		}
		
	}
	
	if (between(computed.y, 50, 60)){
		optionSelected = 2;
		if(menuSoundPlayed.nickname === false){
			beepMenu.play();
			menuSoundPlayed.sound = false;
			menuSoundPlayed.nickname = true;
			menuSoundPlayed.difficulty = false;
			menuSoundPlayed.exit = false;
		}
	}
	
	if (between(computed.y, 65, 73)){
		optionSelected = 3;
		if(menuSoundPlayed.color === false){
			beepMenu.play();
			this.hideButton();
			menuSoundPlayed.sound = false;
			menuSoundPlayed.nickname = false;
			menuSoundPlayed.difficulty = true;
			menuSoundPlayed.exit = false;
		}
	}

	if (between(computed.y, 75, 100)){

		optionSelected = 4;
		if(menuSoundPlayed.exit === false){
			beepMenu.play();
			this.hideButton();
			menuSoundPlayed.sound = false;
			menuSoundPlayed.nickname = false;
			menuSoundPlayed.difficulty = false;
			menuSoundPlayed.exit = true;
		}
	}
	

}


Options.prototype.update = function () {
	if (keysDown[keys.up]) { // Player holding up
		this.hideButton();
		if(optionSelected >1) {
			optionSelected--;
		}
		keysDown[keys.up] = false;
	}
	if (keysDown[keys.down]) { // Player holding down
		this.hideButton();
		if(optionSelected < 4){
			optionSelected++;
		}
		keysDown[keys.down] = false;
	}
	if (keysDown[keys.left]) { // Player holding left
		if (optionSelected === 1 ){
			if( optionsData.loadSound() === "Yes"){
				optionsData.saveSound("No");
				menuMusic.pause();
				beepEnter.play();
			}else if( optionsData.loadSound() === "No") {
				optionsData.saveSound("Yes");
				menuMusic.load();
				menuMusic.play();
				beepEnter.play();
			}
		
		}

		if (optionSelected === 3 ){
			var difficulty = optionsData.loadDifficulty() - 1;
			optionsData.saveDifficulty(difficulty < 0 ? difficultiesTab.length - 1 : difficulty);
			beepEnter.play();
		}

		keysDown[keys.left] = false;
	}
	if (keysDown[keys.right]) { // Player holding right
		if (optionSelected === 1 ){
			if( optionsData.loadSound() === "Yes"){
				optionsData.saveSound("No");
				menuMusic.pause();
				beepEnter.play();
			}else if( optionsData.loadSound() === "No") {
				optionsData.saveSound("Yes");
				menuMusic.load();
				menuMusic.play();
				beepEnter.play();
			}
		
		}

		if (optionSelected === 3 ){

			optionsData.saveDifficulty((optionsData.loadDifficulty() + 1) % difficultiesTab.length);
			beepEnter.play();
		}
		keysDown[keys.right] = false;
	}
	
	if (keysDown[keys.space]) { // Player holding space

		if(optionSelected === 2){
			this.addButton();
		}
		
		if (optionSelected === 4 ){
			currentObject = menu;
			menu.bind();
			beepCancel.play();
			this.hideButton();
		}
		keysDown[keys.space] = false;
	}
	
	if (keysDown[keys.enter]) { // Player holding enter
		if(optionSelected === 2){
			this.hideButton();
			this.submitNick();
		}
		keysDown[keys.enter] = false;
	}
	
	if (keysDown[keys.escape]){
		beepCancel.play();
		this.unbind();
		currentObject = menu;
		menu.bind();
		this.hideButton();
		keysDown[keys.escape] = false;
	}

	//gestion du son au clavier
	switch(optionSelected) {
		case 1: if(menuSoundPlayed.sound === false){
					beepMenu.play();
					menuSoundPlayed.sound = true;
					menuSoundPlayed.nickname = false;
					menuSoundPlayed.difficulty = false;
					menuSoundPlayed.exit = false;
				}
				break;
		case 2: if(menuSoundPlayed.nickname === false){
					beepMenu.play();
					menuSoundPlayed.sound = false;
					menuSoundPlayed.nickname = true;
					menuSoundPlayed.difficulty = false;
					menuSoundPlayed.exit = false;
				}
				break;	
		case 3: if(menuSoundPlayed.difficulty === false){
					beepMenu.play();
					menuSoundPlayed.sound = false;
					menuSoundPlayed.nickname = false;
					menuSoundPlayed.difficulty = true;
					menuSoundPlayed.exit = false;
				}
				break;
		case 4: if(menuSoundPlayed.exit === false){
					beepMenu.play();
					menuSoundPlayed.sound = false;
					menuSoundPlayed.nickname = false;
					menuSoundPlayed.difficulty = false;
					menuSoundPlayed.exit = true;
				}		
				break;				
	}


	
	this.render();
}

Options.prototype.render = function () {
	//Création du menu
	ctx.clearRect(0, 0, screenWidth, screenHeight);
	ctx.fillStyle="black";
	ctx.fillRect(0,0,screenWidth,screenHeight);
	//ctx.drawImage(wallpaper, 0,this.hWallpaper+5, canvas.width, canvas.height-170 );
	if (this.taille<30) {
		this.taille++;
	}
	ctx.fillStyle = "gray";
	ctx.font = "64px Pacman";
	ctx.textAlign = "center";
	ctx.textBaseline = "top";
	ctx.fillText("Options", eval(screenWidth/2)+5 ,50+5);
	ctx.fillStyle = "white";
	ctx.fillText("Options", eval(screenWidth/2) ,60);
	ctx.textAlign = "center";
	ctx.textBaseline = "center";
	
	//var deltaX = Math.random() * 2;
	//var deltaY = Math.random() * 2;
	//ctx.fillText(" Exit ", screenWidth/2 + deltaX,400 + deltaY);
	switch(optionSelected) {
		case 1: ctx.fillStyle = "yellow";
				ctx.font = this.taille-5+"px Pacman";
				ctx.fillText(" Sound : "+optionsData.loadSound()+"", screenWidth/2 /*+ deltaX*/,180 /*+ deltaY*/);
				ctx.fillStyle = "white";
				ctx.font = this.taille-15+"px Pacman";
				ctx.fillText(" Nickname : <"+optionsData.loadNickName()+">", screenWidth/2,250);
				ctx.fillText(" Difficulty : "+difficultiesTab[optionsData.loadDifficulty()]+"", screenWidth/2,320);
				ctx.fillText(" Exit ", screenWidth/2,390);
				break;
		case 2: ctx.font = this.taille-15+"px Pacman";
				ctx.fillText(" Sound : "+optionsData.loadSound()+"", screenWidth/2,180);
				ctx.fillStyle = "yellow";
				ctx.font = this.taille-5+"px Pacman";
				ctx.fillText(" Nickname : <"+optionsData.loadNickName()+">", screenWidth/2 /*+ deltaX*/,250 /*+ deltaY*/);
				ctx.fillStyle = "white";
				ctx.font = this.taille-15+"px Pacman";
				ctx.fillText(" Difficulty : "+difficultiesTab[optionsData.loadDifficulty()]+"", screenWidth/2,320);
				ctx.fillText(" Exit ", screenWidth/2,390);
				break;	
		case 3: ctx.font = this.taille-15+"px Pacman";
				ctx.fillText(" Sound : "+optionsData.loadSound()+"", screenWidth/2,180);
				ctx.fillText(" Nickname : <"+optionsData.loadNickName()+">", screenWidth/2,250);
				ctx.fillStyle = "yellow";
				ctx.font = this.taille-5+"px Pacman";
				ctx.fillText(" Difficulty : "+difficultiesTab[optionsData.loadDifficulty()]+"", screenWidth/2 /*+ deltaX*/,320/* + deltaY*/);
				ctx.fillStyle = "white";
				ctx.font = this.taille-15+"px Pacman";
				ctx.fillText(" Exit ", screenWidth/2,390);
				break;
		case 4: ctx.font = this.taille-15+"px Pacman";
				ctx.fillText(" Sound : "+optionsData.loadSound()+"", screenWidth/2,180);
				ctx.fillText(" Nickname : <"+optionsData.loadNickName()+">", screenWidth/2,250);
				ctx.fillText(" Difficulty : "+difficultiesTab[optionsData.loadDifficulty()]+"", screenWidth/2,320);
				ctx.fillStyle = "yellow";
				ctx.font = this.taille-5+"px Pacman";
				ctx.fillText(" Exit ", screenWidth/2/* + deltaX*/,390/*+ deltaY*/);
				ctx.fillStyle = "white";
				break;				
	}
	
	
}