var selectValue = 1;
//var optionsData = new OptionStorage(); //l'objet qui set les options d�finies par le joueur.
var xhr;
var nomFichierVariables = 'resources/variables.json';

//d�but de d�finition des variables
// Cr�ation de l'objet XmlHttpRequest
xhr = getXMLHttpRequest();
// Chargement du fichier
xhr.open("GET", nomFichierVariables, false);
xhr.overrideMimeType("application/json");
xhr.send(null);
if(xhr.readyState != 4 || (xhr.status != 200 && xhr.status != 0)) // Code == 0 en local
throw new Error("Impossible to load \"" + nomFichierVariables + "\" (code HTTP : " + xhr.status + ").");
var varJsonProperties = xhr.responseText;
	
// Analyse des donn�es
var varProperties = JSON.parse(varJsonProperties);


//IMAGES du menu
var pacman = new Image();
pacman.src = varProperties.mainTitre;
var wallpaper = new Image();
wallpaper.src = varProperties.wallpaperTitre;
var backgroundEnd = new Image();
backgroundEnd.src = varProperties.backgroundEnd;
var winnerPersonnage = new Image();
winnerPersonnage.src = varProperties.winnerPersonnage;
//==============

//AUDIO du menu
var beginningMusic = new Audio(varProperties.beginningMusic);
beginningMusic.load();
var menuMusic = new Audio(varProperties.menuMusic);
menuMusic.load();
var menuBeepSound = new Audio(varProperties.menuBeepSound);
menuBeepSound.load();
var beepEnter = new Audio(varProperties.beepEnter); //beepCancel
beepEnter.load();
var beepCancel = new Audio(varProperties.beepCancel); //beepCancel
beepCancel.load();
var siren = new Audio(varProperties.siren);
siren.load();
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

beginningMusic.play();
//beepMenu.play();
//beepMenu.play();
//beepEnter.play();
//beepCancel.play();
//victoriousSong.play();
//loseSong.play();
//chomp.play();
//eatFruit.play();