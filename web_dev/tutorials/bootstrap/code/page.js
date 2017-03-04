(function() {
	window.onload = function() {
		setUp();
	}

	// function that sets up all contents of the web page
	function setUp() {
		loadImages();
	}

	// function that sets up all of the images
	function loadImages() {
		var row_count = 0;

		// each image is going to start with 'personal' 
		for(var i = 1; i < 10; i++) {
			var container_img = document.createElement("div");
			container_img.className = "col-sm-4";
			var my_img = document.createElement("img");
			// get the image
			my_img.src = "img/personal" + i + ".png";
			my_img.className = "gallery-photo photo-with-info";
			$(container_img).append(my_img);
			if((i + 2) % 3 == 0) {
				row_count++;
				var row = document.createElement("div");
				row.className = "row";
				row.id = "row-" + row_count;
				$("#my-photos").append(row);							
			} 
			$("#row-" + row_count).append(container_img);				
			
		}
	}
})();