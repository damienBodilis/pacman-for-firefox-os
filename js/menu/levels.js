var levelSelected = 1;

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
	if (between(computed.x, 15, 33) && computed.y < 77){
		beepEnter.play();
		optionsData.saveLevel(0);
	}
	
	//Level2
	if (between(computed.x, 40, 58) && computed.y < 77){
		beepEnter.play();
		optionsData.saveLevel(1);
	}

	//on gère la difficulté
	if (between(computed.x, 65, 83) && computed.y < 77){
		beepEnter.play();
		optionsData.saveLevel(2);
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
	//console.log("Le  X : " + computed.x);
	//console.log("Le  Y : " + computed.y);
	
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

	if (between(computed.y, 83, 100)){
		levelSelected = 4;
		if(menuSoundPlayed.exit === false){
			beepMenu.play();
		}
	}
	

}


Levels.prototype.update = function () {
	if (keysDown[keys.left]) { // Player holding up
		if(levelSelected >1) {
			levelSelected--;
		}
		keysDown[keys.left] = false;
	}
	if (keysDown[keys.right]) { // Player holding down
		if(levelSelected < 4){
			levelSelected++;
		}
		keysDown[keys.right] = false;
	}
	
	if (keysDown[keys.space]) { // Player holding space
		if(1 <= levelSelected && levelSelected < 4) {
			optionsData.saveLevel(levelSelected - 1);
		} else if (levelSelected === 4) {
			beepCancel.play();
			this.unbind();
			currentObject = menu;
			menu.bind();
		}
		keysDown[keys.space] = false;
	}
	
	if (keysDown[keys.enter]) { // Player holding enter
		if(1 <= levelSelected && levelSelected < 4) {
			optionsData.saveLevel(levelSelected - 1);
		} else if (levelSelected === 4) {
			beepCancel.play();
			this.unbind();
			currentObject = menu;
			menu.bind();
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
		case 1: if(menuSoundPlayed.level1 === false){
					console.log("Test1");
					beepMenu.play();
					menuSoundPlayed.level1 = true;
					menuSoundPlayed.level2 = false;
					menuSoundPlayed.level3 = false;
					menuSoundPlayed.exit = false;
				}
				break;
		case 2: if(menuSoundPlayed.level2 === false){
					beepMenu.play();
					menuSoundPlayed.level1 = false;
					menuSoundPlayed.level2 = true;
					menuSoundPlayed.level3 = false;
					menuSoundPlayed.exit = false;
				}
				break;	
		case 3: if(menuSoundPlayed.level3 === false){
					beepMenu.play();
					menuSoundPlayed.level1 = false;
					menuSoundPlayed.level2 = false;
					menuSoundPlayed.level3 = true;
					menuSoundPlayed.exit = false;
				}
				break;
		case 4: if(menuSoundPlayed.exit === false){
					beepMenu.play();
					menuSoundPlayed.level1 = false;
					menuSoundPlayed.level2 = false;
					menuSoundPlayed.level3 = false;
					menuSoundPlayed.exit = true;
				}		
				break;				
	}


	
	this.render();
}

Levels.prototype.render = function () {
	//Création du menu
	ctx.clearRect(0, 0, screenWidth, screenHeight);
	ctx.fillStyle="black";
	ctx.fillRect(0,0,screenWidth,screenHeight);
	
	//ctx.drawImage(test, 0,this.hWallpaper+5, canvas.width, canvas.height );
	if (this.taille<30) {
		this.taille++;
	}
	ctx.fillStyle = "gray";
	ctx.font = "64px Pacman";
	ctx.textAlign = "center";
	ctx.textBaseline = "top";
	ctx.fillText("Levels", eval(screenWidth/2)+5 ,50+5);
	ctx.fillStyle = "white";
	ctx.fillText("Levels", eval(screenWidth/2) ,60);
	ctx.textAlign = "center";
	ctx.textBaseline = "center";
	
	//ctx.strokeRect(20,20,150,100);
	//var deltaX = Math.random() * 2;
	//var deltaY = Math.random() * 2;
	var selectedGrow = screenWidth / 10;
	var verticalPosition = screenHeight / 5 * 2;
	
	function drawLevelImage(level, levelId, x, isHover) {
		var selectedGrow = screenWidth / 18;
		var strokeWidth = 3;
		ctx.lineWidth = strokeWidth;
		var hoverRectStroke = "yellow";
		if(!isHover) { 
			selectedGrow = 0; 
			hoverRectStroke = "gray";
		}
		ctx.drawImage(level,x - selectedGrow / 2,verticalPosition - selectedGrow / 2,screenWidth/6 + selectedGrow,200+selectedGrow);
		ctx.strokeStyle = hoverRectStroke;
		ctx.strokeRect(x - selectedGrow / 2 - strokeWidth,verticalPosition - selectedGrow / 2- strokeWidth,screenWidth/6 + selectedGrow + strokeWidth*2,200+selectedGrow+ strokeWidth*2);
		strokeWidth = strokeWidth * 2;
		if(optionsData.loadLevel() == levelId) {
			ctx.strokeStyle ="blue";
			ctx.strokeRect(x - selectedGrow / 2 - strokeWidth,verticalPosition - selectedGrow / 2- strokeWidth,screenWidth/6 + selectedGrow + strokeWidth*2,200+selectedGrow+ strokeWidth*2);
		}
	}
	
	drawLevelImage(level1, 0, 50, levelSelected === 1);
	drawLevelImage(level2, 1, 125, levelSelected === 2);
	drawLevelImage(level3, 2, 200, levelSelected === 3);
	if(levelSelected === 4) {
		ctx.fillStyle = "yellow";
		ctx.font = this.taille-5+"px Pacman";
		ctx.fillText(" Exit ", screenWidth/2,screenHeight / 7 * 6.5);
	} else {
		ctx.fillStyle = "white";
		ctx.font = this.taille-15+"px Pacman";
		ctx.fillText(" Exit ", screenWidth/2,screenHeight / 7 * 6.5);
	}
}