/* The start of a graph visualizer
 * 
 * Michael Wilson */

(function() {
	var number_of_nodes = 0;

	// keeps a list of edges
	var my_edges = [];

	// keeps a list of nodes
	var my_nodes = [];

	window.onload = function() {
		document.getElementById("create").onclick = makeGraph;
	}

	// function that makes the graph
	function makeGraph() {
		number_of_nodes = parseInt($("#node-input").val());
		idList = $("#node-set").val().split(",");		
		for(var i = 0; i < number_of_nodes; i++) {
			makeElement(i * 75, 0, "node", idList[i], 50);
			my_nodes.push({
				x:i * 75/2,
				y:25,
				id: idList[i]			
			});
		}
		var edgeList = document.createElement("input");
		edgeList.placeholder = "a-b,b-c,b-d";	
		edgeList.id = "edge-list";
		var edgeButton = document.createElement("button");
		edgeButton.innerHTML = "Make edges";
		edgeButton.onclick = makeEdges;
		var target = document.getElementById("controls");
		target.innerHTML = "";
		target.appendChild(edgeList);
		target.appendChild(edgeButton);
	}


	// function that creates edges
	function makeEdges() {
		$("#visualization").html("");
		var edges = $("#edge-list").val().split(",");
		var startX, endX, y;
		for(var i = 0; i < edges.length; i++) {
			var temp = edges[i].split("-");
			my_edges.push({
				src: temp[0],
				dest: temp[1]
			});

			// make the edge
			for(var j = 0; j < my_nodes.length; j++) {
				if(my_nodes[j]['id'] == temp[0] || my_nodes[j]['id'] == temp[1]) {
					// this is the source node
					if(my_nodes[j]['id'] == temp[0]) {
						startX = my_nodes[j].x + 50;
						y = my_nodes[j].y;
					} else {
						endX = my_nodes[j].x - 5;
					}
					makeElement(my_nodes[j].x , my_nodes[j].y, "node", my_nodes[j]['id'], 50);
				}
			}
			drawLine(startX, endX, y + 25);
		}		
	}

	// function that draws a line between two elements
	function drawLine(startX, endX, y) {
		// alert("startX: " + startX + "\nEndX: " + endX);
		for(var i = startX; i < endX; i+=10) {
			makeElement(i, y, "block", "", 10);
		}
	}

	// makes an element
	function makeElement(x, y, class_name, value, size) {
		var e = document.createElement("div");
		e.className = class_name;
		e.style.top = y + "px";
		e.style.left = x + "px";
		e.style.height = size + "px"
		e.style.width = size + "px";
		e.innerHTML = value;
		document.getElementById("visualization").appendChild(e);
	}

})();