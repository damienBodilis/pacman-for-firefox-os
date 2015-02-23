var scoreSelected = 1;


function Scores() {
	theScore = this;
	theScore.bind();
	
	this.hWallpaper = 170;
	this.taille=70;
}

Scores.prototype.bind = function() {
	binder.bind(canvas, "click", function (e) {
		e.stopPropagation();
		theScore.updateByClick(e);
	}, false);
};

Scores.prototype.unbind = function() {
	binder.unbind(canvas, "click");
};

Scores.prototype.updateByClick = function (event){
	
	var computed  = adaptCoords(event.clientX, event.clientY);
	//console.log("X : "+computed.x);
	//console.log("Y : "+computed.y);
	
	if ((Math.round(computed.x) >= 420 && Math.round(computed.x) <= 530) && (Math.round(computed.y) >= 440 && Math.round(computed.y) <= 480 )){
		beepCancel.play();
		this.unbind();
		currentObject = menu;
		menu.bind();

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
	ctx.fillText("Scores", eval(screenWidth/2)+5 ,50+5);
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.fillText("Scores", eval(screenWidth/2) ,50);
	
	ctx.font = this.taille-60+"px Pacman";
	ctx.textAlign = "center";
	ctx.textBaseline = "center";

	ctx.fillStyle = "yellow";
	//affichage du score
	var scores = optionsData.loadScores();
	for (var i = 0; i < scores.scores.length ; i++){
		ctx.fillText(scores.scores[i].nick +" "+ scores.scores[i].mount, eval(screenWidth/2) ,150 + i*50);
	}


	ctx.fillStyle = "rgb(250, 250, 250)";
	switch(scoreSelected) {
		case 1: ctx.drawImage(Pacman, screenWidth/3 + 70 , 450);
				ctx.fillText(" Exit ", screenWidth/2, 450);
				break;		
	}
	
	
}