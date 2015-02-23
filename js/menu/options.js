var optionSelected = 1;

var colorTab = ["BLANC", "NOIR", "ROUGE", "BLEU", "VERT"];
var colorTabTaille = 4;


function Options() {
	theOptions = this;
	theOptions.bind();	
	
	this.hWallpaper = 170;
	this.taille=70;
}

Options.prototype.addButton = function () {
	document.getElementById("inputPlayer").style.display = "block";
	document.getElementById("inputPlayer").style.top = "50%";
	document.getElementById("inputPlayer").style.left = "60%";
	document.getElementById("inputPlayer").style.height = canvas.height/88+"%";
	document.getElementById("inputPlayer").style.width = canvas.width/35+"%";
}

Options.prototype.hideButton = function () {
	document.getElementById("inputPlayer").style.display = "none";
}

Options.prototype.submitNick = function () {
	var valueNick = document.getElementById("inputPlayer").value;
	optionsData.saveNickName(valueNick);

}

Options.prototype.bind = function() {
	binder.bind(canvas, "click", function (e) {
		e.stopPropagation();
		theOptions.updateByClick(e);
	}, false);

	binder.bind(canvas, "mousemove", function (e) {
		e.stopPropagation();
		theOptions.mouseMouve(e);
	}, false);
};

Options.prototype.unbind = function() {
	binder.unbind(canvas, "click");
	binder.unbind(canvas, "mousemove");
};

Options.prototype.updateByClick = function (event){
	var x = event.clientX;
	var y = event.clientY;
	
	var computed  = adaptCoords(x, y);
		//console.log("Le  X : " + computed.x);
		//console.log("Le  Y : " + computed.y);

	//on gère le son
	if (Math.round(computed.y) >= 175 && Math.round(computed.y) <= 315 ){
		beepEnter.play();
		if( optionsData.loadSound() === "Yes"){
				optionsData.saveSound("No");
				musiqueMenu.pause();
			}else if( optionsData.loadSound() === "No") {
				optionsData.saveSound("Yes");
				musiqueMenu.load();
				musiqueMenu.play();
			}
	}
	
		//on gère le nom du joueur
	if (Math.round(computed.y) >= 315 && Math.round(computed.y) <= 383 ){
		this.addButton();
		
	}



	//on gère la couleur du perso
	if (Math.round(computed.y) >= 383 && Math.round(computed.y) <= 455 ){

		beepEnter.play();
		if (optionSelected === 3 ){
			var i = optionsData.loadColor();
			//console.log(i);
			if(i >= colorTabTaille){
				i = 0; 
				optionsData.saveColor(i);
			}else {
				i++;
				optionsData.saveColor(i);
			}
		
		}
		
	}
	
	//on quitte
	if (Math.round(computed.y) >= 455 && Math.round(computed.y) <= 575 ){
		beepCancel.play();
		this.hideButton();
		this.unbind();
		currentObject = menu;
		menu.bind();

	}
	
}

var menuSoundPlayed = {"sound":false,"nickname":false,"color":false,"exit":false};
Options.prototype.mouseMouve = function(event){

	var computed  = adaptCoords(event.clientX, event.clientY);

	if (Math.round(computed.y) >= 175 && Math.round(computed.y) <= 315 ){
		optionSelected = 1;
	if(menuSoundPlayed.sound === false){
			beepMenu.play();
			this.hideButton();
			menuSoundPlayed.sound = true;
			menuSoundPlayed.nickname = false;
			menuSoundPlayed.color = false;
			menuSoundPlayed.exit = false;
		}
		
	}
	
	if (Math.round(computed.y) >= 315 && Math.round(computed.y) <= 383 ){
		optionSelected = 2;
		if(menuSoundPlayed.nickname === false){
			beepMenu.play();
			menuSoundPlayed.sound = false;
			menuSoundPlayed.nickname = true;
			menuSoundPlayed.color = false;
			menuSoundPlayed.exit = false;
		}
	}
	
	if (Math.round(computed.y) >= 383 && Math.round(computed.y) <= 455 ){

		optionSelected = 3;
		if(menuSoundPlayed.color === false){
			beepMenu.play();
			this.hideButton();
			menuSoundPlayed.sound = false;
			menuSoundPlayed.nickname = false;
			menuSoundPlayed.color = true;
			menuSoundPlayed.exit = false;
		}
	}

	if (Math.round(computed.y) >= 455 && Math.round(computed.y) <= 575 ){

		optionSelected = 4;
		if(menuSoundPlayed.exit === false){
			beepMenu.play();
			this.hideButton();
			menuSoundPlayed.sound = false;
			menuSoundPlayed.nickname = false;
			menuSoundPlayed.color = false;
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
				musiqueMenu.pause();
				beepEnter.play();
			}else if( optionsData.loadSound() === "No") {
				optionsData.saveSound("Yes");
				musiqueMenu.load();
				musiqueMenu.play();
				beepEnter.play();
			}
		
		}

		if (optionSelected === 3 ){
			var i = optionsData.loadColor();
			//console.log(i);
			if(i <= 0){
				i = colorTabTaille; 
				optionsData.saveColor(i);
				beepEnter.play();

			}else {
				i--;
				optionsData.saveColor(i);
				beepEnter.play();
			}
		
		}

		keysDown[keys.left] = false;
	}
	if (keysDown[keys.right]) { // Player holding right
		if (optionSelected === 1 ){
			if( optionsData.loadSound() === "Yes"){
				optionsData.saveSound("No");
				musiqueMenu.pause();
				beepEnter.play();
			}else if( optionsData.loadSound() === "No") {
				optionsData.saveSound("Yes");
				musiqueMenu.load();
				musiqueMenu.play();
				beepEnter.play();
			}
		
		}

		if (optionSelected === 3 ){
			var i = optionsData.loadColor();
			//console.log(i);
			if(i >= colorTabTaille){
				i = 0; 
				optionsData.saveColor(i);
				beepEnter.play();
			}else {
				i++;
				optionsData.saveColor(i);
				beepEnter.play();
			}

			//optionsData.saveColor(optionsData.loadColor()++]);
		
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
					menuSoundPlayed.color = false;
					menuSoundPlayed.exit = false;
				}
				break;
		case 2: if(menuSoundPlayed.nickname === false){
					beepMenu.play();
					menuSoundPlayed.sound = false;
					menuSoundPlayed.nickname = true;
					menuSoundPlayed.color = false;
					menuSoundPlayed.exit = false;
				}
				break;	
		case 3: if(menuSoundPlayed.color === false){
					beepMenu.play();
					menuSoundPlayed.sound = false;
					menuSoundPlayed.nickname = false;
					menuSoundPlayed.color = true;
					menuSoundPlayed.exit = false;
				}
				break;
		case 4: if(menuSoundPlayed.exit === false){
					beepMenu.play();
					menuSoundPlayed.sound = false;
					menuSoundPlayed.nickname = false;
					menuSoundPlayed.color = false;
					menuSoundPlayed.exit = true;
				}		
				break;				
	}


	
	this.render();
}

Options.prototype.render = function () {
	//Création du menu
	ctx.fillStyle="rgb(52,173,98)";
	ctx.fillRect(0,400,screenWidth,screenHeight);
	ctx.fillStyle="lightblue";
	ctx.fillRect(0,0,screenWidth,400);
	if (this.hWallpaper>180) {
		this.hWallpaper-=7;
		}
	ctx.drawImage(wallpaper, 0,this.hWallpaper+5, canvas.width, canvas.height-170 );
	if (this.taille<90) {
		this.taille++;
	}
	ctx.fillStyle = "gray";
	ctx.font = "64px Pacman";
	ctx.textAlign = "center";
	ctx.textBaseline = "top";
	ctx.fillText("Options", eval(screenWidth/2)+5 ,50+5);
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.fillText("Options", eval(screenWidth/2) ,50);
	
	ctx.font = "30px Test";
	ctx.textAlign = "center";
	ctx.textBaseline = "center";
	
	switch(optionSelected) {
		case 1: ctx.drawImage(pacman,  screenWidth/4+10 , 260);
				ctx.font = this.taille-35+"px Pacman";
				ctx.fillText(" Sound : "+optionsData.loadSound()+"", screenWidth/2,250);
				ctx.font = this.taille-60+"px Pacman";
				ctx.fillText(" Nickname : <"+optionsData.loadNickName()+">", screenWidth/2,320);
				ctx.fillText(" Color : "+colorTab[optionsData.loadColor()]+"", screenWidth/2,390);
				ctx.fillText(" Exit ", screenWidth/2,460);
				break;
		case 2: ctx.drawImage(pacman,  screenWidth/10 , 330);
				ctx.font = this.taille-60+"px Pacman";
				ctx.fillText(" Sound : "+optionsData.loadSound()+"", screenWidth/2,250);
				ctx.font = this.taille-35+"px Pacman";
				ctx.fillText(" Nickname : <"+optionsData.loadNickName()+">", screenWidth/2,320);
				ctx.font = this.taille-60+"px Pacman";
				ctx.fillText(" Color : "+colorTab[optionsData.loadColor()]+"", screenWidth/2,390);
				ctx.fillText(" Exit ", screenWidth/2,460);
				break;	
		case 3: ctx.drawImage(pacman,  screenWidth/4 - 20 , 400);
				ctx.font = this.taille-60+"px Pacman";
				ctx.fillText(" Sound : "+optionsData.loadSound()+"", screenWidth/2,250);
				
				ctx.fillText(" Nickname : <"+optionsData.loadNickName()+">", screenWidth/2,320);
				ctx.font = this.taille-35+"px Pacman";
				ctx.fillText(" Color : "+colorTab[optionsData.loadColor()]+"", screenWidth/2,390);
				ctx.font = this.taille-60+"px Pacman";
				ctx.fillText(" Exit ", screenWidth/2,460);
				break;
		case 4: ctx.drawImage(pacman,  screenWidth/3 +50 , 470);
				ctx.font = this.taille-60+"px Pacman";
				ctx.fillText(" Sound : "+optionsData.loadSound()+"", screenWidth/2,250);
				ctx.fillText(" Nickname : <"+optionsData.loadNickName()+">", screenWidth/2,320);
				ctx.fillText(" Color : "+colorTab[optionsData.loadColor()]+"", screenWidth/2,390);
				ctx.font = this.taille-35+"px Pacman";
				ctx.fillText(" Exit ", screenWidth/2,460);
				break;				
	}
	
	
}