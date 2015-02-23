var COULEUR = {"BLANC" : 0, "NOIR" : 1, "ROUGE" : 2, "BLEU"   : 3, "VERT" : 4 };
function OptionStorage (){
	if (localStorage) {
	  //on set les variables par dÈfaut
		
		if( localStorage['sound'] === undefined){
			localStorage['sound'] = "Yes";
		}
		if( localStorage['nickname'] === undefined){
			localStorage['nickname'] = "Player"
		}

		if( localStorage['color'] === undefined){
			localStorage['color'] = COULEUR.BLANC;
		}

		if( localStorage['scores'] === undefined){
			var setting = {"scores": [
        								{"nick": "Player","mount":"100"},
        								{"nick": "Player","mount":"100"},
        								{"nick": "Player","mount":"100"},
        								{"nick": "Player","mount":"100"},
        								{"nick": "Player","mount":"100"}
    								]
							};
			this.saveScores(setting);
		}

		if( localStorage['ipServer'] === undefined){
			localStorage['ipServer'] = "localhost";
		}		
		

	} else {
	  alert('votre système ne supporte pas locale storage.');
	  currentObject = menu;
	  optionsData = undefined;
	}
}

OptionStorage.prototype.saveSound = function (value){
	localStorage['sound'] = value;

}

OptionStorage.prototype.loadSound = function (){
	return localStorage['sound'];

}

OptionStorage.prototype.saveNickName = function (value){
	localStorage['nickname'] = value;

}

OptionStorage.prototype.loadNickName = function (){
	return localStorage['nickname'];

}

OptionStorage.prototype.saveColor = function (value){
	localStorage['color'] = value;

}

OptionStorage.prototype.loadColor = function (){
	return localStorage['color'];

}

OptionStorage.prototype.saveScores = function (value){
	localStorage['scores'] = JSON.stringify(value);

}

OptionStorage.prototype.loadScores = function (){
	return JSON.parse(localStorage['scores']);

}

OptionStorage.prototype.saveIpServer = function (value){
	localStorage['ipServer'] = value;

}

OptionStorage.prototype.loadIpServer = function (){
	return localStorage['ipServer'];

}
