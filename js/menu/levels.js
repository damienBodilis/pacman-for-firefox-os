var levelSelected = 1;

//var difficultiesTab = ["EASY", "NORMAL", "HARD"];
//var difficultyTabTaille = 3;

function Levels() {
	theLevels = this;
	theLevels.bind();	
	this.hWallpaper = 10;
	this.taille=10;
}

Levels.prototype.bind = function() {
	$(canvas).on("click", function (e) {
		e.stopPropagation();
		theLevels.updateByClick(e);
	});

    $(canvas).on("mousemove", function (e) {
		e.stopPropagation();
		theLevels.mouseMouve(e);
	});
};

Levels.prototype.unbind = function() {
	$(canvas).unbind("click");
	$(canvas).unbind("mousemove");
};

Levels.prototype.updateByClick = function (event){
	var x = event.clientX;
	var y = event.clientY;
	
	var computed  = adaptCoords(x, y);
		//console.log("Le  X : " + computed.x);
		//console.log("Le  Y : " + computed.y);

	//Level1
	if (between(computed.x, 15, 33)){
		beepEnter.play();
	}
	
	//Level2
	if (between(computed.x, 40, 58)){
		beepEnter.play();
	}

	//on gère la difficulté
	if (between(computed.x, 65, 83)){
		beepEnter.play();
	}
	
	//on quitte
	if (between(computed.y, 77, 100)){
		beepCancel.play();
		this.unbind();
		currentObject = menu;
		menu.bind();
	}	
}

var menuSoundPlayed = {"level1":false,"level2":false,"level3":false,"exit":false};
Levels.prototype.mouseMouve = function(event){

	var computed  = adaptCoords(event.clientX, event.clientY);

	if (between(computed.x, 15, 33)){
		levelSelected = 1;
	if(menuSoundPlayed.level1 === false){
			beepMenu.play();
		}
		
	}
	
	if (between(computed.x, 40, 58)){
		levelSelected = 2;
		if(menuSoundPlayed.level2 === false){
			beepMenu.play();
		}
	}
	
	if (between(computed.x, 65, 83)){
		levelSelected = 3;
		if(menuSoundPlayed.level3 === false){
			beepMenu.play();
		}
	}

	if (between(computed.y, 77, 100)){
		levelSelected = 4;
		if(menuSoundPlayed.exit === false){
			beepMenu.play();
		}
	}
	

}


Levels.prototype.update = function () {
	if (keysDown[keys.up]) { // Player holding up
		if(levelSelected >1) {
			levelSelected--;
		}
		keysDown[keys.up] = false;
	}
	if (keysDown[keys.down]) { // Player holding down
		if(levelSelected < 4){
			levelSelected++;
		}
		keysDown[keys.down] = false;
	}
	if (keysDown[keys.left]) { // Player holding left
		if (levelSelected === 1 ){
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

		if (levelSelected === 3 ){
			beepEnter.play();
		}

		keysDown[keys.left] = false;
	}
	if (keysDown[keys.right]) { // Player holding right
		if (levelSelected === 1 ){
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

		if (levelSelected === 3 ){

			optionsData.saveDifficulty((optionsData.loadDifficulty() + 1) % difficultiesTab.length);
			beepEnter.play();
		}
		keysDown[keys.right] = false;
	}
	
	if (keysDown[keys.space]) { // Player holding space

		if(levelSelected === 2){
		}
		
		if (levelSelected === 4 ){
			currentObject = menu;
			menu.bind();
			beepCancel.play();
		}
		keysDown[keys.space] = false;
	}
	
	if (keysDown[keys.enter]) { // Player holding enter
		if(levelSelected === 2){
			this.submitNick();
		}
		keysDown[keys.enter] = false;
	}
	
	if (keysDown[keys.escape]){
		beepCancel.play();
		this.unbind();
		currentObject = menu;
		menu.bind();
		keysDown[keys.escape] = false;
	}

	//gestion du son au clavier
	switch(levelSelected) {
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

Levels.prototype.render = function () {
	//Création du menu
	ctx.clearRect(0, 0, screenWidth, screenHeight);
	ctx.fillStyle="white";
	ctx.fillRect(0,0,screenWidth,screenHeight);
	ctx.drawImage(test,50,150,screenWidth/6,180);
	ctx.drawImage(test2,125,150,screenWidth/6,180);
	ctx.drawImage(test3,200,150,screenWidth/6,180);
	//ctx.drawImage(test3,250,150,screenWidth/3,180);
	//ctx.drawImage(test,screenWidth/5 ,180,50,150);
	//ctx.drawImage(test2,screenWidth/3 ,180,50,150);
	//ctx.drawImage(test3,screenWidth ,180,50,150);
	

	//ctx.drawImage(test, 0,this.hWallpaper+5, canvas.width, canvas.height );
	if (this.taille<30) {
		this.taille++;
	}
	ctx.fillStyle = "gray";
	ctx.font = "64px Pacman";
	ctx.textAlign = "center";
	ctx.textBaseline = "top";
	ctx.fillText("Levels", eval(screenWidth/2)+5 ,50+5);
	ctx.fillStyle = "yellow";
	ctx.fillText("Levels", eval(screenWidth/2) ,60);
	ctx.textAlign = "center";
	ctx.textBaseline = "center";
	
	//ctx.strokeRect(20,20,150,100);
	//var deltaX = Math.random() * 2;
	//var deltaY = Math.random() * 2;
	//ctx.fillText(" Exit ", screenWidth/2 + deltaX,400 + deltaY);
	switch(levelSelected) {
		case 1: 
				ctx.fillStyle = "yellow";
				ctx.font = this.taille-5+"px Pacman";
				//ctx.fillText(" Sound : "+optionsData.loadSound()+"", screenWidth/2 /*+ deltaX*/,180 /*+ deltaY*/);
				ctx.fillStyle = "white";
				ctx.font = this.taille-15+"px Pacman";
				//ctx.fillText(" Nickname : <"+optionsData.loadNickName()+">", screenWidth/2,250);
				//ctx.fillText(" Difficulty : "+difficultiesTab[optionsData.loadDifficulty()]+"", screenWidth/2,320);
				//ctx.fillText(" Exit ", screenWidth/2,390);
				break;
		case 2: ctx.font = this.taille-15+"px Pacman";
				//ctx.fillText(" Sound : "+optionsData.loadSound()+"", screenWidth/2,180);
				ctx.fillStyle = "yellow";
				ctx.font = this.taille-5+"px Pacman";
				
				//ctx.fillText(" Nickname : <"+optionsData.loadNickName()+">", screenWidth/2 /*+ deltaX*/,250 /*+ deltaY*/);
				ctx.fillStyle = "white";
				ctx.font = this.taille-15+"px Pacman";
				//ctx.fillText(" Difficulty : "+difficultiesTab[optionsData.loadDifficulty()]+"", screenWidth/2,320);
				//ctx.fillText(" Exit ", screenWidth/2,390);
				break;	
		case 3: ctx.font = this.taille-15+"px Pacman";
				//ctx.fillText(" Sound : "+optionsData.loadSound()+"", screenWidth/2,180);
				//ctx.fillText(" Nickname : <"+optionsData.loadNickName()+">", screenWidth/2,250);
				ctx.fillStyle = "yellow";
				ctx.font = this.taille-5+"px Pacman";
				//ctx.fillText(" Difficulty : "+difficultiesTab[optionsData.loadDifficulty()]+"", screenWidth/2 /*+ deltaX*/,320/* + deltaY*/);
				ctx.fillStyle = "white";
				ctx.font = this.taille-15+"px Pacman";
				ctx.fillText(" Exit ", screenWidth/2,390);
				break;
		case 4: ctx.font = this.taille-15+"px Pacman";
				//ctx.fillText(" Sound : "+optionsData.loadSound()+"", screenWidth/2,180);
				//ctx.fillText(" Nickname : <"+optionsData.loadNickName()+">", screenWidth/2,250);
				//ctx.fillText(" Difficulty : "+difficultiesTab[optionsData.loadDifficulty()]+"", screenWidth/2,320);
				ctx.fillStyle = "yellow";
				ctx.font = this.taille-5+"px Pacman";
				ctx.fillText(" Exit ", screenWidth/2/* + deltaX*/,390/*+ deltaY*/);
				ctx.fillStyle = "white";
				break;				
	}
	
	
}