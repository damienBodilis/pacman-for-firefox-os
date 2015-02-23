var menuSoundPlayed = {"game":false,"scores":false,"options":false,"credit":false};
function Menu() {
   	menuMusic.loop = true;
  // 	menuMusic.volume=0.4;
	theMenu = this;
	this.bind();
	this.taille = 30;
	this.hWallpaper = 800;

	if(optionsData.loadSound() === "No"){
		menuMusic.pause();
	}else {
		//menuMusic.play();
	}

	menuSoundPlayed.game = true;
	menuSoundPlayed.scores = false;
	menuSoundPlayed.options = false;
	menuSoundPlayed.credit = false;
}

Menu.prototype.bind = function() {
	binder.bind(canvas, "click", function (e) {
		e.stopPropagation();
		theMenu.updateByClick(e);
	}, false);

	binder.bind(canvas, "mousemove", function (e) {
		e.stopPropagation();
		theMenu.mouseMouve(e);
	}, false);
};

Menu.prototype.unbind = function() {
	binder.unbind(canvas, "click");
	binder.unbind(canvas, "mousemove");
};

Menu.prototype.launchGame = function () {
	$('#menu').css('display', 'none');
	$('#grid').css('display', 'block');
	$('#buttons').css('display', 'block');
	
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


Menu.prototype.exitGame = function () {
	this.bind();
	game = undefined;
	
	screenWidth = 960;
	screenHeight = 640;
	canvas.width = screenWidth;
	canvas.height = screenHeight;

	
	currentObject = menu;
	
}


Menu.prototype.mouseMouve = function(event){

	var computed  = adaptCoords(event.clientX, event.clientY);

	if (Math.round(computed.y) >= 175 && Math.round(computed.y) <= 200 ){
		selectValue = 1;
		if(menuSoundPlayed.game === false){
			beepMenu.play();
			menuSoundPlayed.game = true;
			menuSoundPlayed.multijoueur = false;
			menuSoundPlayed.scores = false;
			menuSoundPlayed.options = false;
		}
		
	}
	
	if (Math.round(computed.y) >= 200 && Math.round(computed.y) <= 215 ){
		selectValue = 2;
		if(menuSoundPlayed.multijoueur === false){
			beepMenu.play();
			menuSoundPlayed.game = false;
			menuSoundPlayed.multijoueur = true;
			menuSoundPlayed.scores = false;
			menuSoundPlayed.options = false;
		}
	}
	
	if (Math.round(computed.y) >= 215 && Math.round(computed.y) <= 455 ){
		selectValue = 3;
		if(menuSoundPlayed.scores === false){
			beepMenu.play();
			menuSoundPlayed.game = false;
			menuSoundPlayed.multijoueur = false;
			menuSoundPlayed.scores = true;
			menuSoundPlayed.options = false;
		}
	}
	
	if (Math.round(computed.y) >= 455 && Math.round(computed.y) <= 575 ){
		selectValue = 4;
		if(menuSoundPlayed.options === false){
			beepMenu.play();
			menuSoundPlayed.game = false;
			menuSoundPlayed.multijoueur = false;
			menuSoundPlayed.scores = false;
			menuSoundPlayed.options = true;
		}
		
	}

}

Menu.prototype.updateByClick = function (event){
	
	var computed  = adaptCoords(event.clientX, event.clientY);
	
	menuSoundPlayed.game = false;
	menuSoundPlayed.scores = false;
	menuSoundPlayed.options = false;
	menuSoundPlayed.credit = false;
	
	if (Math.round(computed.y) >= 175 && Math.round(computed.y) <= 315 ){

		beepEnter.play();
		this.launchGame();

	}
	
	if (Math.round(computed.y) >= 315 && Math.round(computed.y) <= 383 ){
		beepEnter.play();
		//this.toto();
		this.launchGame();
	}
	
	if (Math.round(computed.y) >= 383 && Math.round(computed.y) <= 455 ){
		beepEnter.play();
		//this.scores();
		this.launchGame();
	}
	
	if (Math.round(computed.y) >= 455 && Math.round(computed.y) <= 575 ){
		beepEnter.play();
		//this.options();
		this.launchGame();
		
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
			//this.multiplayer();
		}
		
		if(selectValue === 3){
			beepEnter.play();
			//this.scores();
		}
		
		if(selectValue === 4){
			beepEnter.play();
			//this.options();
		}
		
		keysDown[keys.space] = false;
	}

	//gestion du son au clavier
	switch(selectValue) {
		case 1: if(menuSoundPlayed.game === false){
					menuBeepSound.play();
					menuSoundPlayed.game = true;
					menuSoundPlayed.scores = false;
					menuSoundPlayed.options = false;
					menuSoundPlayed.credit = false;
				}
				break;
		case 2: if(menuSoundPlayed.scores === false){
					menuBeepSound.play();
					menuSoundPlayed.game = false;
					menuSoundPlayed.scores = true;
					menuSoundPlayed.options = false;
					menuSoundPlayed.credit = false;
				}
				break;	
		case 3: if(menuSoundPlayed.options === false){
					menuBeepSound.play();
					menuSoundPlayed.game = false;
					menuSoundPlayed.scores = false;
					menuSoundPlayed.options = true;
					menuSoundPlayed.credit = false;
				}
				break;
		case 4: if(menuSoundPlayed.credit === false){
					menuBeepSound.play();
					menuSoundPlayed.game = false;
					menuSoundPlayed.scores = false;
					menuSoundPlayed.options = false;
					menuSoundPlayed.credit = true;
				}
				break;					
	}
	
	this.render();
}

Menu.prototype.render = function () {
	//Création du menu
	ctx.fillRect(0,400,screenWidth,screenHeight);
	ctx.fillStyle="black";
	ctx.fillRect(0,0,screenWidth,400);
	if (this.hWallpaper>170) {
		this.hWallpaper-=15;
		}
	//ctx.drawImage(wallpaper, 0,this.hWallpaper+5, canvas.width, canvas.height-170 );
	if (this.taille<90) {
		this.taille++;
	}
	ctx.font = this.taille*2+"px Pacman";
	ctx.textAlign = "center";
	ctx.textBaseline = "top";
	ctx.fillStyle = "gray";
	ctx.fillText("Pacman", eval(screenWidth/2)+5 ,60 +5);
	ctx.fillStyle = "white";
	ctx.fillText("Pacman", eval(screenWidth/2) ,60);
	
	//ctx.font = this.taille-15+"px Pacman";
	ctx.textAlign = "center";
	ctx.textBaseline = "center";
	
	switch(selectValue) {
		case 1: //ctx.drawImage(pacman,  screenWidth/4+60 , 260);
				ctx.font = this.taille-5+"px Pacman";
				ctx.fillText(" New Game ", screenWidth/2,180);
				ctx.font = this.taille-15+"px Pacman";
				ctx.fillText(" Scores ", screenWidth/2,250);
				ctx.fillText(" Options ", screenWidth/2,320);
				ctx.fillText(" Credit ", screenWidth/2,390);
				break;
		case 2: //ctx.drawImage(pacman,  screenWidth/4-18 , 330);
				ctx.font = this.taille-15+"px Pacman";
				ctx.fillText(" New Game ", screenWidth/2,250);
				ctx.font = this.taille-5+"px Pacman";
				ctx.fillText(" Scores ", screenWidth/2,320);
				ctx.font = this.taille-15+"px Pacman";
				ctx.fillText(" Options ", screenWidth/2,390);
				ctx.fillText(" Credit ", screenWidth/2,460);
				break;
		case 3: //ctx.drawImage(pacman,  screenWidth/3 , 400);
				ctx.font = this.taille-15+"px Pacman";
				ctx.fillText(" New Game ", screenWidth/2,250);
				ctx.fillText(" Scores ", screenWidth/2,320);
				ctx.font = this.taille-5+"px Pacman";
				ctx.fillText(" Options ", screenWidth/2,390);
				ctx.font = this.taille-15+"px Pacman";
				ctx.fillText(" Credit ", screenWidth/2,460);
				break;
		case 4: //ctx.drawImage(pacman,  screenWidth/3-20 , 470);
				ctx.font = this.taille-15+"px Pacman";
				ctx.fillText(" New Game ", screenWidth/2,250);
				ctx.fillText(" Scores ", screenWidth/2,320);
				ctx.fillText(" Options ", screenWidth/2,390);
				ctx.font = this.taille-5+"px Pacman";
				ctx.fillText(" Credit ", screenWidth/2,460);
				ctx.font = this.taille-15+"px Pacman";
				break;						
	}
	
	
}