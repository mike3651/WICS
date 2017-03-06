(function() {
	'use strict';
	var timer = null;
	var bombTimer = null; 
	var bombLength = 4;

	// set up the limitations for the gameBounds
	var xBound = 500;
	var yBound = 500;

	// list of the grid pieces
	var gridPieces = new Array(xBound/10);
	var gridPieceArray = new Array(xBound/10 * yBound/10);

	// list of edges
	var edges = [];

	// startpoint
	var start =  {
		x: 0, 
		y: 0
	}

	// end point
	var end = {
		x: 400,
		y: 400
	}

	// function that creates a block
	// param x -> the xPosition to drop the element
	// param y -> the yPosition to drop the element
	// param name -> the Class name of this object
	function createBlock(x, y, name) {		
		// alert("x: " + x + "\ny: " + y);
		var e = document.createElement("div");
		e.className = name;
		e.value = 0;
		e.style.left = x + "px";
		e.style.top = y + "px";
		e.style.height = 10 + "px";
		e.style.width = 10 + "px";		
		document.getElementById("game-area").appendChild(e);
	}


	// id for the class of the bomb
	var id = 0;

	window.onload = function() {
		setUp();
		document.getElementById("game-area").focus();
		document.addEventListener("keydown", move);	
		animateBomb();			
	}	

	// sets up the objects in the game
	function setUp() {
		var player = document.createElement("div");
		player.id = "player";
		player.style.left = 350 + "px";
		player.style.top = 350 + "px";
		player.style.width = 10 + "px";
		player.style.height = 10 + "px";
		document.getElementById("game-area").appendChild(player);
//		setGrid();
	}

	// // function that sets up the grid
	// function setGrid() {
	// 	var i, j;
	// 	for(i = 0; i < xBound; i+=10) {		
	// 		gridPieces[i/10] = new Array(yBound/10);
	// 		for(j = 0; j < yBound; j += 10) {
	// 			//alert("Setting up a block at [" + i  +"][" + j + "]");
	// 			createBlock(i, j, "grid-piece"); 
	// 			gridPieces[i/10][j/10] = {
	// 										x: i,
	// 										y: j,
	// 										visited: false,											
	// 			myAdjacent: [gridPieces[i/10 + 1][j/10 + 1], 
	// 							gridPieces[i/10 + 1][j/10],
	// 							gridPieces[i/10][j/10 + 1]]
	// 									};
	// 		}	
	// 	}		
	// 	BFS();
	// }

	// function that performs BFS on the grid
	// function BFS() {
	// 	var queue = [];
	// 	var piece = gridPieces[0][0]
	// 	queue.push(gridPieces[0][0]);
	// 	if(piece.x == end.x && piece.y == end.y) 
	// 		return;

	// 	while(queue.length > 0) {
	// 		var e = queue.shift();
	// 		for(var i = 0; i < e.myAdjacent.length; i++) {
	// 			queue.push(e.myAdjacent[i]);
	// 		}
	// 	}

	// }


	// function that moves the character
	// e -> The event that occurred
	function move(e) {

		// get information on the characters position
		var player = document.getElementById("player");	

		var x = parseInt(player.style.left);
		var y = parseInt(player.style.top);
		
		var playerSize = parseInt(player.style.height);

		// get the information about the bounds of the board
		// var board = document.getElementById("game-area");
		// var topXBound = parseInt(board.style.left);
		// var topYBound = parseInt(board.style.top);

		// want to move the character over one full space
		// move right
		if(e.keyCode == 39) {
			player.style.left = x + playerSize + "px";
		}
		// move left
		else if(e.keyCode == 37) {
			player.style.left = x - playerSize + "px";
		}
		// move up
		else if(e.keyCode == 38) {
			player.style.top = y - playerSize + "px";
		}
		// move down
		else if(e.keyCode == 40) {
			player.style.top = y + playerSize + "px";
		} else if(e.keyCode == 32) {			
			createBlock(x, y, "bomb");
		}
	}
	
	// function that will 'animate' the bombs
	function animateBomb() {
		if(timer == null){
			setInterval(flash, 500);
		} else {
			clearInterval(timer);
			timer = null;
		}
 	}

 	// function that will cause the actual flash
 	function flash() {
 		var bombs = document.getElementsByClassName("bomb");
 		for(var i = 0; i < bombs.length; i++) {
 			var currBomb = bombs[i];
 			currBomb.value = currBomb.value + 1;
 			if(currBomb.value > 5) {
 				var x = parseInt(currBomb.style.left);
 				var y = parseInt(currBomb.style.top);
 				id++;
 				createBlock(x, y, "explosion" + id);
 				bombExplode(x, y, "explosion", id);
 				currBomb.remove();
 			} else if(currBomb.value % 2 == 0) {
 				currBomb.style.backgroundColor = "yellow";
 			} else {
 				currBomb.style.backgroundColor = "brown";
 			} 	
 		}
 	}

 	// function that deals with the bomb timing
 	function bombExplode(x, y, name, ID) {
 		var myTimer = 0;
 		var myID = ID;
 		if(bombTimer == null) {
 			setInterval(function(){explosion(x, y, name, myTimer++, myID)}, 300);
 		} else {
 			clearInterval(bombTimer);
 			bombTimer = null;
 		}
 	}

 	// function that deals with the animation of the explosion
 	function explosion(x, y, name, myTimer, id) { 		 		
 		//alert(myTimer);
 		if(myTimer < bombLength) {
	 		// makes right
	 		createBlock(x + myTimer * 10, y, name + id);
	 		// makes left
	 		createBlock(x - myTimer * 10, y, name + id);
	 		// makes up
	 		createBlock(x, y - myTimer * 10, name + id);
	 		// makes down
	 		createBlock(x, y + myTimer * 10, name + id);
 		} else {
 			deleteExplosion(id);
 		} 
 	}

 	// function that deletes all occurrence blocks of an explosion
 	// para id -> the unique ID of the blockset
 	function deleteExplosion(id) {
 		var mySet = document.getElementsByClassName("explosion" + id);
 		for(var i = 0; i < mySet.length; i++) {
 			mySet[i].remove();
 		}
 	}
})();