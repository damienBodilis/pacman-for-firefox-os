var menuSoundPlayed = {"game":false,"levels":false,"scores":false,"options":false};
function Menu() {
   	menuMusic.loop = true;
    menuMusic.volume=0.6;
	theMenu = this;
	this.bind();
	this.taille = 10;
	//this.hWallpaper = 800;

	if(optionsData.loadSound() === "No"){
		menuMusic.pause();
	}else {
		menuMusic.play();
	}

	menuSoundPlayed.game = true;
	menuSoundPlayed.levels = false;
	menuSoundPlayed.scores = false;
	menuSoundPlayed.options = false;
}

Menu.prototype.bind = function() {
	console.log("bind");
	$(canvas).on("click", function (e) {
		e.stopPropagation();
		theMenu.updateByClick(e);
	});

	$(canvas).on("mousemove", function (e) {
		e.stopPropagation();
		theMenu.mouseMouve(e);
	});
};

Menu.prototype.unbind = function() {
	$(canvas).unbind("click");
	$(canvas).unbind("mousemove");
};

Menu.prototype.launchGame = function () {
	this.unbind();
	$('#menu').css('display', 'none');
	$('#grid').css('display', 'block');
	$('#buttons').css('display', 'block');
	setupMap(optionsData.loadLevel() + 1);
	isMenuOn = false;
}

Menu.prototype.options = function () {
	this.unbind();
	options = new Options();
	
	currentObject = options;

}

Menu.prototype.scores = function () {
	this.unbind();
	scores = new Scores();
	
	currentObject = scores;

}

Menu.prototype.levels = function () {
	this.unbind();
	levels = new Levels();
	
	currentObject = levels;

}

Menu.prototype.exitGame = function () {
	this.bind();
	game = undefined;
	
	screenWidth = 305;
	screenHeight = 480;
	canvas.width = screenWidth;
	canvas.height = screenHeight;

	
	currentObject = menu;
	isMenuOn = true;
}


Menu.prototype.mouseMouve = function(event){

	var computed  = adaptCoords(event.clientX, event.clientY);
	
	if (between(computed.y, 30, 45)){
		selectValue = 1;
		if(menuSoundPlayed.game === false){
			beepMenu.play();
			menuSoundPlayed.game = true;
			menuSoundPlayed.levels = false;
			menuSoundPlayed.scores = false;
			menuSoundPlayed.options = false;
		}
		
	}
	
	if (between(computed.y, 50, 60)){
		selectValue = 2;
		if(menuSoundPlayed.levels === false){
			beepMenu.play();
			menuSoundPlayed.game = false;
			menuSoundPlayed.levels = true;
			menuSoundPlayed.scores = false;
			menuSoundPlayed.options = false;
		}
	}
	
	if (between(computed.y, 65, 73)){
		selectValue = 3;
		if(menuSoundPlayed.scores === false){
			beepMenu.play();
			menuSoundPlayed.game = false;
			menuSoundPlayed.levels = false;
			menuSoundPlayed.scores = true;
			menuSoundPlayed.options = false;
		}
	}
	
	if (between(computed.y, 75, 100)){
		selectValue = 4;
		if(menuSoundPlayed.options === false){
			beepMenu.play();
			menuSoundPlayed.game = false;
			menuSoundPlayed.levels = false;
			menuSoundPlayed.scores = false;
			menuSoundPlayed.options = true;
		}
		
	}

}

Menu.prototype.updateByClick = function (event){
	
	var computed  = adaptCoords(event.clientX, event.clientY);
	
	menuSoundPlayed.game = false;
	menuSoundPlayed.levels = false;
	menuSoundPlayed.scores = false;
	menuSoundPlayed.options = false;
	
	
	if (between(computed.y, 30, 45)){

		beepEnter.play();
		this.launchGame();

	}
	
	if (between(computed.y, 50, 60)){
		beepEnter.play();
		this.levels();
	}
	
	if (between(computed.y, 65, 73)){
		beepEnter.play();
		this.scores();
	}
	
	if (between(computed.y, 75, 100)){
		beepEnter.play();
		this.options();
	}
}

Menu.prototype.update = function () {
	if (keysDown[keys.up]) { // Player holding up
		
		if(selectValue >1) {
			selectValue--;
		}
		keysDown[keys.up] = false;
	}
	if (keysDown[keys.down]) { // Player holding down
		
		if(selectValue < 4){

			selectValue++;
		}
		keysDown[keys.down] = false;
	}
	if (keysDown[keys.left]) { // Player holding left
		
		keysDown[keys.left] = false;
	}
	if (keysDown[keys.right]) { // Player holding right
		
		keysDown[keys.right] = false;
	}
	
	if (keysDown[keys.enter]) { // Player holding enter
		keysDown[keys.enter] = false;
	}
	
	if (keysDown[keys.space]) { // Player holding space
		if(selectValue === 1){
			beepEnter.play();
			this.launchGame();
		}
		
		if(selectValue === 2){
			beepEnter.play();
			this.levels();
		}
		
		if(selectValue === 3){
			beepEnter.play();
			this.scores();
		}
		
		if(selectValue === 4){
			beepEnter.play();
			this.options();
		}
		
		keysDown[keys.space] = false;
	}
	//gestion du son au clavier
	switch(selectValue) {
		case 1: if(menuSoundPlayed.game === false){
					beepMenu.play();
					menuSoundPlayed.game = true;
					menuSoundPlayed.levels = false;
					menuSoundPlayed.scores = false;
					menuSoundPlayed.options = false;
				}
				break;
		case 2: if(menuSoundPlayed.levels === false){
					beepMenu.play();
					menuSoundPlayed.game = false;
					menuSoundPlayed.levels = true;
					menuSoundPlayed.scores = false;
					menuSoundPlayed.options = false;
				}
				break;	
		case 3: if(menuSoundPlayed.scores === false){
					beepMenu.play();
					menuSoundPlayed.game = false;
					menuSoundPlayed.levels = false;
					menuSoundPlayed.scores = true;
					menuSoundPlayed.options = false;
				}
				break;
		case 4: if(menuSoundPlayed.options === false){
					beepMenu.play();
					menuSoundPlayed.game = false;
					menuSoundPlayed.levels = false;
					menuSoundPlayed.scores = false;
					menuSoundPlayed.options = true;
				}
				break;					
	}
	
	this.render();
}

Menu.prototype.render = function () {
	//Création du menu
//	ctx.fillRect(0,400,screenWidth,screenHeight);
	ctx.clearRect(0, 0, screenWidth, screenHeight);
	ctx.fillStyle="black";
	ctx.fillRect(0,0,screenWidth,screenHeight);
	/*if (this.hWallpaper>170) {
		this.hWallpaper-=15;
	}*/
	//ctx.drawImage(wallpaper, 0,this.hWallpaper+5, canvas.width, canvas.height-170 );
	if (this.taille<30) {
		this.taille++;
	}
	ctx.font = (this.taille*2)+"px Pacman";
	ctx.textAlign = "center";
	ctx.textBaseline = "top";
	ctx.fillStyle = "gray";
	ctx.fillText("Pacman", (screenWidth/2)+5 ,60 +5);
	ctx.fillStyle = "white";
	ctx.fillText("Pacman", screenWidth/2 ,60);
	
	ctx.font = this.taille-15+"px Pacman";
	ctx.textAlign = "center";
	ctx.textBaseline = "center";
	
	var deltaX = Math.random() * 5;
	var deltaY = Math.random() * 5;
	
	switch(selectValue) {
		case 1: ctx.fillStyle = "yellow";
				ctx.font = this.taille-5+"px Pacman";
				ctx.fillText(" New Game ", screenWidth/2 + deltaX,180 + deltaY);
				ctx.fillStyle = "white";
				ctx.font = this.taille-15+"px Pacman";
				ctx.fillText(" Levels ", screenWidth/2,250);
				ctx.fillText(" Scores ", screenWidth/2,320);
				ctx.fillText(" Options ", screenWidth/2,390);
				break;
				
		case 2: ctx.font = this.taille-15+"px Pacman";
				ctx.fillText(" New Game ", screenWidth/2,180);
				ctx.fillStyle = "yellow";
				ctx.font = this.taille-5+"px Pacman";
				ctx.fillText(" Levels ", screenWidth/2 + deltaX,250 + deltaY);
				ctx.fillStyle = "white";
				ctx.font = this.taille-15+"px Pacman";
				ctx.fillText(" Scores ", screenWidth/2,320);
				ctx.fillText(" Options ", screenWidth/2,390);
				break;
				
		case 3: ctx.font = this.taille-15+"px Pacman";
				ctx.fillText(" New Game ", screenWidth/2,180);
				ctx.fillText(" Levels ", screenWidth/2,250);
				ctx.fillStyle = "yellow";
				ctx.font = this.taille-5+"px Pacman";
				ctx.fillText(" Scores ", screenWidth/2 + deltaX,320 + deltaY);
				ctx.fillStyle = "white";
				ctx.font = this.taille-15+"px Pacman";
				ctx.fillText(" Options ", screenWidth/2,390);
				break;
				
		case 4: ctx.font = this.taille-15+"px Pacman";
				ctx.fillText(" New Game ", screenWidth/2,180);
				ctx.fillText(" Levels ", screenWidth/2,250);
				ctx.fillText(" Scores ", screenWidth/2,320);
				ctx.fillStyle = "yellow";
				ctx.font = this.taille-5+"px Pacman";
				ctx.fillText(" Options ", screenWidth/2 + deltaX,390 + deltaY);
				ctx.font = this.taille-15+"px Pacman";
				ctx.fillStyle = "white";
				break;						
	}
	
	ctx.font = "8px Pacman";
	ctx.textAlign = "center";
	ctx.textBaseline = "center";
	ctx.fillText("Credit : Miage d'EVRY", screenWidth/2 ,440);
	
	
}