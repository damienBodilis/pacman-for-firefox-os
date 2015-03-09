/* --- Init global variable -- */
var gameCanvas, context;
var difficulte = 2;
// For time
var lastTimeEatable, newTime, lastTime;
// Load event
window.addEventListener('load', function () {
    // Recovery of canvas
    gameCanvas = document.getElementById('grid');
    if (!gameCanvas) {
        consola.assert("Canvas recovery is impossible");
        return;
    }
    // Recovery of context
    context = gameCanvas.getContext('2d');
    if (!context) {
        console.assert("Context of cancas is impossible of recovery");
        return;
    }

    // add events listener for keyboard
    window.addEventListener("keydown", pacmanDirection, true);
    window.addEventListener("keyup", pacmanDirection, true);
    // create ghosts
    ghostContainer = new Array();
    ghostContainer.push(new GhostRed(152, 136, 0));
    ghostContainer.push(new GhostPink(152, 168, 1));
    ghostContainer.push(new GhostBlue(136, 168, 5));
    ghostContainer.push(new GhostOrange(168, 168, 8));

    // initialize ghost
    for(var i = 0; i < ghostContainer.length; ++i){
      ghostContainer[i].initialise();
    }

    runModeChanger();

    // Time for ghost
    lastTime = new Date();
    lastTime = lastTime.getTime();

    

	var stretch_ui_menu = stretch_ui("menu");
	var stretch_ui_grid = stretch_ui("grid");
	
	stretch_ui_menu();
	stretch_ui_grid();
	
	$(window).on('resize', stretch_ui_menu);	
	$(window).on('resize', stretch_ui_grid);

	var menu = new Menu();
	menu.update();
	
	// launch appli
    requestAnimationFrame(step);
	
}, true);

function stretch_ui(name) {
	return function () {
		var native_width = 305;
		var native_height = 480;
		
		var width = $('html').width();
		var height = $('html').height();
		
		var canvas = document.getElementById(name);
		var context = canvas.getContext('2d');
		
		canvas.width = width;
		canvas.height = height;
		context.scale(width/native_width, height/native_height);
	};
}

/* --- List of functions --- */

//modes functions

var modeTimes = [{ time: 0, changeTo: "scatter"}];

var modeChangeTimer = null;
var modeChangeTimerStartTime = null;


function runModeChanger(){
	difficulte = optionsData.loadDifficulty();
  console.log("coucou :");
  console.log(difficulte);
    modeChangeTimerStartTime = new Date().getSeconds();
    modeChangeTimer = setTimeout(function(){
        for(var i = 0; i < ghostContainer.length; ++i){
            if(ghostContainer[i].getMode() != "idle" && ghostContainer[i].getMode() != "leave"){
                ghostContainer[i].setMode(modeTimes[0].changeTo);
            }
        }

        modeTimes.shift();
        if(modeTimes.length > 0) {
            runModeChanger();
        }
        else if(difficulte == 0){
          modeTimes = [
          { time: 0, changeTo: "scatter"},
          { time: 7, changeTo: "scatter"},
          { time: 20, changeTo: "scatter"},
          { time: 7, changeTo: "scatter"},
          { time: 20, changeTo: "scatter"},
          { time: 5, changeTo: "scatter"},
          { time: 20, changeTo: "scatter"},
          { time: 5, changeTo: "scatter"},
          ];
        }
    		else if(difficulte == 1){
    			modeTimes = [
    			{ time: 0, changeTo: "scatter"},
    			{ time: 7, changeTo: "chase"},
    			{ time: 20, changeTo: "scatter"},
    			{ time: 7, changeTo: "chase"},
    			{ time: 20, changeTo: "scatter"},
    			{ time: 5, changeTo: "chase"},
    			{ time: 20, changeTo: "scatter"},
    			{ time: 5, changeTo: "chase"},
    			];
    		}
        else if(difficulte == 2){
          modeTimes = [
          { time: 0, changeTo: "chase"},
          { time: 7, changeTo: "chase"},
          { time: 20, changeTo: "chase"},
          { time: 7, changeTo: "chase"},
          { time: 20, changeTo: "chase"},
          { time: 5, changeTo: "chase"},
          { time: 20, changeTo: "chase"},
          { time: 5, changeTo: "chase"},
          ];
        }

    }, modeTimes[0].time * 1000);
}

function pauseModeChanger(){
    clearTimeout(modeChangeTimer);
	modeChangeTimerStartTime = new Date().getSeconds();
    var newTime = modeTimes[0].time - (new Date().getSeconds() - modeChangeTimerStartTime);
    if(newTime >= 0){
        modeTimes[0].time = newTime;
    } else {
        modeTimes[0].time = 0;
    }
}


// animation function
var fps = 60;
var now, delta;
var then = Date.now();
var interval = 1000/fps;

function step() {
	if(isMenuOn) {
		menuStep();
	} else {
		gameStep();
	}
}

function gameStep() {
    now = Date.now();
    delta = now - then;

    if (delta > interval) {
        then = now - (delta % interval);

        animate();
    }
	window.requestAnimationFrame(step);
}

var currentLevel;

function animate() {
  newTime = new Date();
  newTime = newTime.getTime();
  
  context.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
  var newLevel = optionsData.loadLevel() + 1;
  if(currentLevel !== newLevel) {
	setupMap(newLevel);
	currentLevel = newLevel;
  }
  map.draw();
  pacman.draw();

  // Draw ghosts
  for(var i = 0; i < ghostContainer.length; ++i){
    ghostContainer[i].draw();
  }

  // next animation
  if (map.end < 1) {
    alert("You win !\n" + "votre score est de : " + pacman.score);
	menuMusic.pause();
	victoriousSong.play();
    window.location.reload();
  } else if (pacman.life == 0) {
    // Loose game
    // Draw life of pacman
    document.getElementById('life').innerHTML = "0";
    alert("You loose !");
    window.location.reload();
  } else {
    for(var i = 0; i < ghostContainer.length; ++i){
      if ((pacman.getPositionX() == ghostContainer[i].getPositionX() && pacman.getPositionY() == ghostContainer[i].getPositionY())) {
        if(ghostContainer[i].eatable){
          pacman.score += 200;
		  eatGhost.volume=0.4;
		  eatGhost.play();
		  ghostContainer[i].hasBeenEaten();
        } else {
          // Lost life
		  loseSong.volume=0.4;
		  loseSong.play();
          pacman.life--;
          pacman.resetPosition();

          for(var i = 0; i < ghostContainer.length; ++i){
            ghostContainer[i].reset();
          }
        }
      }

    }
  }
}

// function called when user press key with keyboard
function pacmanDirection (e) {
    if(e.keyCode == 38) {
        pacman.setNextDirection("up");
    } else if(e.keyCode == 37) {
        pacman.setNextDirection("left");
    } else if(e.keyCode == 39) {
        pacman.setNextDirection("right");
    } else if(e.keyCode == 40) {
        pacman.setNextDirection("down");
    }
}

// Drag event (for phone)
var hammer_options = {};
$("#grid")
  .hammer(hammer_options)
  .on("dragleft", function(ev) {
    pacman.setNextDirection("left");
  }).on("dragright", function(ev) {
    pacman.setNextDirection("right");
  }).on("dragup", function(ev) {
    pacman.setNextDirection("up");
  }).on("dragdown", function(ev) {
    pacman.setNextDirection("down");
  });

// refresh function for animation
window.requestAnimationFrame = (function () {
  return (
          window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.oRequestAnimationFrame ||
          window.msRequestAnimationFrame ||
          function (callback) {
            window.setTimeout(callback, 1000 / 60);
          }
    );
})();
