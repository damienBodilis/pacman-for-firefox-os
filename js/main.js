var selectValue = 1;
var optionsData = new OptionStorage(); //l'objet qui set les options définies par le joueur.
var nomFichierVariables = 'resources/variables.json';
//var COULEUR = {"BLANC" : 0, "NOIR" : 1, "ROUGE" : 2, "BLEU"   : 3, "VERT" : 4 };

//dŽbut de dŽfinition des variables
// CrŽation de l'objet XmlHttpRequest
xhr = getXMLHttpRequest();
// Chargement du fichier
xhr.open("GET", nomFichierVariables, false);
xhr.overrideMimeType("application/json");
xhr.send(null);
if(xhr.readyState != 4 || (xhr.status != 200 && xhr.status != 0)) // Code == 0 en local
throw new Error("Impossible to load \"" + nomFichierVariables + "\" (code HTTP : " + xhr.status + ").");
var varJsonProperties = xhr.responseText;
	
// Analyse des donnŽes
var varProperties = JSON.parse(varJsonProperties);


//IMAGES du menu
var bomberman = new Image();
bomberman.src = varProperties.mainTitre;
var wallpaper = new Image();
wallpaper.src = varProperties.wallpaperTitre;
var backgroundEnd = new Image();
backgroundEnd.src = varProperties.backgroundEnd;
var winnerPersonnage = new Image();
winnerPersonnage.src = varProperties.winnerPersonnage;
//==============

//AUDIO du menu
var musiqueMenu = new Audio(varProperties.mainTitreMusique);
musiqueMenu.load();
var beepMenu = new Audio(varProperties.menuSound);
beepMenu.load();
var beepEnter = new Audio(varProperties.beepEnter); //beepCancel
beepEnter.load();
var beepCancel = new Audio(varProperties.beepCancel); //beepCancel
beepCancel.load();
var victoriousSong = new Audio(varProperties.victoriousSong);
victoriousSong.load();
var loseSong = new Audio(varProperties.loseSong);
loseSong.load();
var drawSong = new Audio(varProperties.drawSong);
drawSong.load();
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

document.body.appendChild(canvas);
var element = document.createElement('input');
	element.setAttribute("type", "text");
	element.setAttribute("id", "inputPlayer");
	document.body.appendChild(element);

var menu = new Menu();

var game;
var options;
var scores;

var currentObject = menu;

var requestAnimFrame = (function() {
	return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function (callback) {
			window.setTimeout(callback, 33.0);
		};
})();

window.requestAnimationFrame = requestAnimFrame;

//var fps = 0;
//var now;
//var lastUpdate = (new Date)*1 -1;
//plus la valeur est grande, moins le FPS sera affecté par des changements rapides
//

var timeGlobal = new Date().getTime();
//var fpsFilter = 50;
var cptFrame = 0;
//Step renvoit une valeur timestamp renseignant à quel moment depuis "epoch" où il a été lancé
function step() {
  
	var progress =  (new Date().getTime()) - timeGlobal;//on calcule le temps écoulé entre les deux moments
  	cptFrame += progress;
  	if(cptFrame > 33){
		currentObject.update(progress);
		cptFrame -= 33;

	//var thisFrameFPS = 1000 / ((now=new Date()) - lastUpdate);
	//fps += (thisFrameFPS - fps) / fpsFilter;
	//lastUpdate = now;
	//console.log(fps.toFixed(1) + "fps");

	}	
  
	timeGlobal = new Date().getTime();
	requestAnimationFrame(step);
}
requestAnimationFrame(step);
