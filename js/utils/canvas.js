var screenWidth = 305;
var screenHeight = 480;

// Create the canvas
var canvas = document.getElementById("menu");
//canvas.setAttribute("id", "game"); //utilisé par le Joystick
var ctx = canvas.getContext("2d");
canvas.width = screenWidth;
canvas.height = screenHeight;

var metrics = {
	width : 0,
	height : 0,
	cwidth : function () {	// computed width
		return metrics.width ;
	},
	cheight : function () { // computed height
		return metrics.height ;
	}
};

function stretch() {
	metrics.width = document.body.offsetWidth;
	metrics.height = document.body.offsetHeight;
	canvas.style.width = metrics.cwidth() + 'px';
	canvas.style.height = metrics.cheight() + 'px';
	console.log("stretch");
}

/*
function adaptCoords(x, y){
	return {
		x : canvas.width * x /metrics.width,
		y : canvas.height * y /metrics.height
	};
}
*/

function adaptCoords(x, y){
	return {
		x : x / canvas.width * 100,
		y : y / canvas.height * 100
	};
}