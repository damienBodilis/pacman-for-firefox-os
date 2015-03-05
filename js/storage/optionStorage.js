var DIFFICULTE = {"EASY" : 0, "NORMAL" : 1, "HARD" : 2};
function OptionStorage (){
	if (localStorage) {
	  //on set les variables par dÈfaut
		
		if( localStorage['sound'] === undefined){
			localStorage['sound'] = "Yes";
		}
		if( localStorage['nickname'] === undefined){
			localStorage['nickname'] = "Player"
		}

		if( localStorage['difficulty'] === undefined){
			localStorage['difficulty'] = DIFFICULTE.NORMAL;
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
	  alert('votre systËème ne supporte pas locale storage.');
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


OptionStorage.prototype.saveDifficulty = function (value){
	localStorage['difficulty'] = value;

}

OptionStorage.prototype.loadDifficulty = function (){
	var difficulty = localStorage['difficulty'];
	if (!isNaN(difficulty) && 0 <= difficulty && difficulty < 3) {
		return difficulty;
	}
	return 0;
}

OptionStorage.prototype.saveLevel = function (value){
	localStorage['level'] = value;
}

OptionStorage.prototype.loadLevel = function (){
	var level = parseInt(localStorage['level']);
	if (!isNaN(level) && 0 <= level && level < 3) {
		return level;
	}
	return 0;
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
