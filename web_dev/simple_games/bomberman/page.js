(function() {
	'use strict';

	var timer = null;
	var GAME_SPEED = 1000;

	var BOMB_SWITCH = 500;
	var bomb_timer = null;

	var BOARD_WIDTH = 400;
	var BOARD_HEIGHT = 400;
	var explosion = [];
	var canvas;
	var ctx;

	var BAR_DISABLE = false;

	// keeps track of how long the animation should be running
	var BOMB_ANIMATION_TIME = 50;
	var explosion_timer = null;

	window.onload = function() {
		setGameState();
		document.addEventListener("keydown", movePlayer);
		//startTimer();
		canvas = document.getElementById("canvas");

		ctx = canvas.getContext("2d");

		canvas.height = BOARD_HEIGHT;
		canvas.width = BOARD_WIDTH;
		
		startBombTimer();
	}

	function setGameState() {
		makePlayer();
	}

	// this function generates a player
	function makePlayer() {
		var player = document.createElement("div");
		player.id = "player";
		player.style.left = BOARD_WIDTH / 2 + "px";
		player.style.top = BOARD_HEIGHT / 2 + "px";
		$("#game-board").append(player);		
	}

	function startTimer() {
		if(timer == null) {			
			timer = setInterval(generateEnemies, GAME_SPEED);
		} else {
			clearInterval(timer);
			timer = null;
		}
	}

	function startBombTimer() {
		if(bomb_timer == null) {			
			bomb_timer = setInterval(animateBomb, BOMB_SWITCH);
		} else {
			clearInterval(bomb_timer);
			bomb_timer = null;
		}
	}

	// function that animates the bomb
	function animateBomb() {
		var bomb_list = $(".bomb");
		for(var i = 0; i < bomb_list.length; i++) {
			var myCount = 0;
			var currValue = bomb_list[i].value;
			var x = parseInt(bomb_list[i].style.left);
			var y = parseInt(bomb_list[i].style.top);
			if(currValue % 2 == 1) {
				bomb_list[i].style.backgroundColor = "yellow";				
			}
			if(currValue % 2 == 0) {
				bomb_list[i].style.backgroundColor = "black";
			}
			if(currValue == 5) {
				if(explosion_timer == null)		{						
					explosion_timer = setInterval(function() {
						draw(x, y, myCount++);
					}, 
					30);
				}
				bomb_list[i].remove();	
			} else {
				bomb_list[i].value++;
			}
		}
	}

	function generateEnemies() {
		var className = "food";
		var color = "rgb(" + Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 256)+ ", " + Math.floor(Math.random() * 256) + ")";

		var x = Math.floor(Math.random() * parseInt($("#game-board").css("width")) - 10) + 10;
		var y = Math.floor(Math.random() * parseInt($("#game-board").css("height")) -10) + 10;
		//alert("x: " + x + "\ny: " + y);
		makeFood(className, color, x, y);
	}

	// makes food
	function makeFood(className, color, x, y, value) {
		// alert("x: " + x + "\ny: " + y);
		var food = document.createElement("div");
		food.className = className;
		food.style.backgroundColor = color;
		food.style.top = y + "px";
		food.style.left = x + "px";
		food.value = value;
		$("#game-board").append(food);
	}

	// allows for control movement of the player
	function movePlayer(e) {
		var x = parseInt($("#player").css("left"));
		var y = parseInt($("#player").css("top"));

		// move up
		if(e.keyCode == 40) {
			$("#player").css("top", 10 + parseInt($("#player").css("top")) + "px");
		} else if(e.keyCode == 38) {
			$("#player").css("top",parseInt($("#player").css("top")) - 10 + "px");
		} else if(e.keyCode == 37) {
			$("#player").css("left",parseInt($("#player").css("left")) - 10 + "px");
		} else if(e.keyCode == 39) {
			$("#player").css("left",parseInt($("#player").css("left")) + 10 + "px");
		} else if(e.keyCode == 32) {					
			if(!BAR_DISABLE) {
				makeFood("bomb", "black", x, y, 1);
			}
			BAR_DISABLE = true;
		}
	}

	// draws the explosion
	function draw(xPosition, yPosition, time) {	
		if(time < BOMB_ANIMATION_TIME) {
			var bomb = {
				x: xPosition,
				y: yPosition,
				xSpeed: (Math.random() - 0.5) * 10,
				ySpeed: (Math.random() - 0.5) * 10,
				size: 10
			}
			explosion.push(bomb);
			clearCanvas();
			for(var i = 0; i < explosion.length; i++) {
				updateBomb(explosion[i]);
				drawExplosion(explosion[i]);
			}
		} else {			
			explosion = [];
			clearInterval(explosion_timer);
			explosion_timer = null;			
			clearCanvas();
			BAR_DISABLE = false;			
		}	
	}

	// function that clears the canvas
	function clearCanvas() {
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);
	}

	// function that updates the explosion
	function drawExplosion(bomb) {
		ctx.fillStyle = "red";
		ctx.fillRect(bomb.x, bomb.y, bomb.size, bomb.size);
	}

	// updates the location of the bomb
	function updateBomb(bomb) {
		bomb.x += bomb.xSpeed;
		bomb.y += bomb.ySpeed;
		bomb.size *= 0.98;
	}
})();