var scoreSelected = 1;


function Scores() {
	theScore = this;
	theScore.bind();
	
	//this.hWallpaper = 170;
	this.taille=10;
}

Scores.prototype.bind = function() {
	$(canvas).on("click", function (e) {
		e.stopPropagation();
		theScore.updateByClick(e);
	});

    $(canvas).on("mousemove", function (e) {
		e.stopPropagation();
		theScore.mouseMouve(e);
	});
};

Scores.prototype.unbind = function() {
	$(canvas).unbind("click");
	$(canvas).unbind("mousemove");
};


Scores.prototype.updateByClick = function (event){
	
	var computed  = adaptCoords(event.clientX, event.clientY);
	console.log("X : "+computed.x);
	console.log("Y : "+computed.y);
	
	if (between(computed.y, 80, 100)){
		scoreSelected = 1;
		beepCancel.play();
		this.unbind();
		currentObject = menu;
		menu.bind();

	}
	
}
var menuSoundPlayed = {"exit":false};
Scores.prototype.mouseMouve = function(event){

	var computed  = adaptCoords(event.clientX, event.clientY);
	
	if (between(computed.y, 0, 80)){
		if(menuSoundPlayed.exit === true){
			menuSoundPlayed.exit = false;
		}
	}
	if (between(computed.y, 80, 100)){
		scoreSelected = 1;
		if(menuSoundPlayed.exit === false){
			beepMenu.play();
			menuSoundPlayed.exit = true;
		}
	}
		
}

Scores.prototype.update = function () {
	if (keysDown[keys.up]) { // Player holding up
		
		if(selectValue >1) {
			selectValue--;
		}
		keysDown[keys.up] = false;
	}
	if (keysDown[keys.down]) { // Player holding down
		
		if(selectValue < 3){
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
	
	if (keysDown[keys.space]) { // Player holding space
		currentObject = menu;
		menu.bind();
		keysDown[keys.space] = false;
	}
	
	if (keysDown[keys.enter]) { // Player holding enter
		keysDown[keys.enter] = false;
	}
	
	if (keysDown[keys.escape]){
		this.unbind();
		currentObject = menu;
		menu.bind();
		keysDown[keys.escape] = false;
	}
	
	this.render();
}

Scores.prototype.render = function () {
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
	ctx.fillText("Scores", eval(screenWidth/2)+5 ,50+5);
	ctx.fillStyle = "white";
	ctx.fillText("Scores", eval(screenWidth/2) ,60);
	ctx.textAlign = "center";
	ctx.textBaseline = "center";
	ctx.font = this.taille-10+"px Pacman";


	ctx.fillStyle = "blue";
	//affichage du score
	var scores = optionsData.loadScores();
	for (var i = 0; i < scores.scores.length ; i++){
		ctx.fillText(scores.scores[i].nick +" "+ scores.scores[i].mount, eval(screenWidth/2) ,150 + i*50);
	}

	//ctx.fillStyle = "white";
	//var deltaX = Math.random() * 2;
	//var deltaY = Math.random() * 2;

	switch(scoreSelected) {
		case 1: ctx.fillStyle = "yellow";
				ctx.fillText(" Exit ", screenWidth/2 /*+ deltaX*/,400 /*+ deltaY*/);
				break;		
	}
	
	
}