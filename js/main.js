var isMenuOn = true;
var canvas = document.getElementById("menu");
var selectValue = 1;
var optionsData = new OptionStorage(); //l'objet qui set les options définies par le joueur.
var xhr;

var varProperties = 
	{
	  "menuMusic": "resources/sounds/pacman_menu_music.mp3",
	  "beepMenu": "resources/sounds/pacman_menu_beep.ogg",
	  "beepEnter": "resources/sounds/pacman_menu_next.ogg",
	  "beepCancel": "resources/sounds/pacman_menu_previous.ogg",
	  "coin": "resources/sounds/pacman_coinfull.mp3",
	  "wail": "resources/sounds/pacman_wail.mp3",
	  "eatFruit": "resources/sounds/pacman_eatfruit.wav",
	  "eatGhost": "resources/sounds/pacman_eatghost.wav",
	  "victoriousSong": "resources/sounds/pacman_winner.ogg",
	  "loseSong": "resources/sounds/pacman_death.wav",
	  "pacmanHand": "resources/img/menu_hand_title.png",
	  "wallpaperTitre" : "resources/img/title_bombers.png",
	  "winnerPersonnage": "resources/img/winner_pacman.png",
	  "level1": "resources/img/level1.png",
	  "level2": "resources/img/level2.png",
	  "level3": "resources/img/level3.png"
	}

//IMAGES du menu
var pacmanHand = new Image();
pacmanHand.src = varProperties.pacmanHand;
var wallpaper = new Image();
wallpaper.src = varProperties.wallpaperTitre;
var winnerPersonnage = new Image();
winnerPersonnage.src = varProperties.winnerPersonnage;
var level1 = new Image();
level1.src = varProperties.level1;
var level2 = new Image();
level2.src = varProperties.level2;
var level3 = new Image();
level3.src = varProperties.level3;
//==============

//AUDIO du menu
var menuMusic = new Audio(varProperties.menuMusic);
menuMusic.load();
var beepMenu = new Audio(varProperties.beepMenu);
beepMenu.load();
var beepEnter = new Audio(varProperties.beepEnter); //beepCancel
beepEnter.load();
var beepCancel = new Audio(varProperties.beepCancel); //beepCancel
beepCancel.load();
var chomp = new Audio(varProperties.chomp);
chomp.load();
var coin = new Audio(varProperties.coin);
coin.load();
var wail = new Audio(varProperties.wail);
wail.load();
var eatFruit = new Audio(varProperties.eatFruit);
eatFruit.load();
var eatGhost = new Audio(varProperties.eatGhost);
eatGhost.load();
var victoriousSong = new Audio(varProperties.victoriousSong);
victoriousSong.load();
var loseSong = new Audio(varProperties.loseSong);
loseSong.load();


//==============

// Handle keyboard controls
var keysDown = {};

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

addEventListener("keydown", function (e) {
	if (keysDown[e.keyCode] !== false) {
		keysDown[e.keyCode] = true;
	}
}, false);

var element = document.createElement('input');
	element.setAttribute("type", "text");
	element.setAttribute("id", "inputPlayer");
	document.body.appendChild(element);


var menu = new Menu();
var game;
var options;
var scores;
var levels;

var currentObject = menu;

var timeGlobal = new Date().getTime();
//var fpsFilter = 50;
var cptFrame = 0;
//Step renvoit une valeur timestamp renseignant à quel moment depuis "epoch" où il a été lancé
function menuStep() {
	var progress =  (new Date().getTime()) - timeGlobal;//on calcule le temps écoulé entre les deux moments
  	cptFrame += progress;
  	if(cptFrame > 33){
		currentObject.update(progress);
		cptFrame -= 33;
	}	
  
	timeGlobal = new Date().getTime();
	requestAnimationFrame(step);
}

function between(value, min, max) {
	return min < value && value < max;
}


