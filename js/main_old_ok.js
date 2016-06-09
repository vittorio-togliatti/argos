

$(document).on('pagebeforeshow', '#home', function(){ 
	console.log("Init ********************************* Init");
	var output = "http://www.igsresearch.com/devel/vidreres/output";
	var output_timer = "http://www.igsresearch.com/devel/vidreres/outputtimer";
		
	var output_two = "http://www.igsresearch.com/devel/vidreres/output_two";
	var output_two_timer = "http://www.igsresearch.com/devel/vidreres/outputtimer_two";
	
	var timeFrames = 0;
	var timeSeconds = 0;
	var updateTimer = 0;
	var updateNeeded = false;
	
	var windowWidth = window.innerWidth;
	var windowHeight = window.innerHeight;
	var xScale = 1024 / windowWidth;
	var yScale = 1850 / windowHeight;
	
	//State: 0=Empty;1=on time;2=exceeded;3=extra exceeded;4=out of hours;5=selected
	var places = {
			'1' : {
				'position' : {'x':13.8 * xScale , 'y':85.5 * yScale },
				'occupied' : 0,
				'time'  : 0,
				'state' : 0,
				
			},
			'2' : {
				'position' : {'x':17 * xScale , 'y':87.2 * yScale }, //3.2 * 1.7
				'occupied' : 0,
				'time'  : 0,
				'state' : 0
			},
			'3' : {
				'position' : {'x':20.2 * xScale , 'y':88.9 * yScale },
				'occupied' : 0,
				'time'  : 0,
				'state' : 0
			},
			'4' : {
				'position' : {'x':154 , 'y':230 },
				'occupied' : 0,
				'time'  : 0,
				'state' : 0
			},
			'5' : {
				'position' : {'x':164 , 'y':240 },
				'occupied' : 0,
				'time'  : 0,
				'state' : 0
			},
			'6' : {
				'position' : {'x':174 , 'y':250 },
				'occupied' : 0,
				'time'  : 0,
				'state' : 0
			},
			'7' : {
				'position' : {'x':184 , 'y':260 },
				'occupied' : 0,
				'time'  : 0,
				'state' : 0
			},
			'8' : {
				'position' : {'x':194 , 'y':270 },
				'occupied' : 0,
				'time'  : 0,
				'state' : 0
			},
			'9' : {
				'position' : {'x':204 , 'y':280 },
				'occupied' : 0,
				'time'  : 0,
				'state' : 0
			},
			'10' : {
				'position' : {'x':214 , 'y':290 },
				'occupied' : 0,
				'time'  : 0,
				'state' : 0
			},
			'11' : {
				'position' : {'x':224 , 'y':300 },
				'occupied' : 0,
				'time'  : 0,
				'state' : 0
			},
			'12' : {
				'position' : {'x':234 , 'y':310 },
				'occupied' : 0,
				'time'  : 0,
				'state' : 0
			},
			'13' : {
				'position' : {'x':244 , 'y':320 },
				'occupied' : 0,
				'time'  : 0,
				'state' : 0
			},
			'14' : {
				'position' : {'x':254 , 'y':330 },
				'occupied' : 0,
				'time'  : 0,
				'state' : 0
			},
			'15' : {
				'position' : {'x':264 , 'y':340 },
				'occupied' : 0,
				'time'  : 0,
				'state' : 0
			}
	}
	
	
	//State: 0=Empty;1=on time;2=exceeded;3=extra exceeded;4=out of hours;5=selected
	var places_two = {
			'1' : {
				'position' : {'x':124 , 'y':84 },
				'occupied' : 0,
				'time'  : 0,
				'state' : 0,
				
			},
			'2' : {
				'position' : {'x':134 , 'y':94 },
				'occupied' : 0,
				'time'  : 0,
				'state' : 0
			},
			'3' : {
				'position' : {'x':144 , 'y':104 },
				'occupied' : 0,
				'time'  : 0,
				'state' : 0
			},
			'4' : {
				'position' : {'x':154 , 'y':114 },
				'occupied' : 0,
				'time'  : 0,
				'state' : 0
			},
			'5' : {
				'position' : {'x':164 , 'y':124 },
				'occupied' : 0,
				'time'  : 0,
				'state' : 0
			},
			'6' : {
				'position' : {'x':174 , 'y':134 },
				'occupied' : 0,
				'time'  : 0,
				'state' : 0
			},
			'7' : {
				'position' : {'x':184 , 'y':144 },
				'occupied' : 0,
				'time'  : 0,
				'state' : 0
			},
			'8' : {
				'position' : {'x':194 , 'y':154 },
				'occupied' : 0,
				'time'  : 0,
				'state' : 0
			},
			'9' : {
				'position' : {'x':204 , 'y':164 },
				'occupied' : 0,
				'time'  : 0,
				'state' : 0
			}
	}
	
	
	
	
	//Load images
	PIXI.loader.add('images/car/empty.png');
	PIXI.loader.add('images/car/on_time.png');
	PIXI.loader.add('images/car/exceded.png');
	PIXI.loader.add('images/car/extra_exceded.png');
	PIXI.loader.add('images/car/after_hours.png');
	PIXI.loader.add('images/map.jpg').load(onAssetsLoaded);
	
	//Declare Textures
	var cocheGreen;
    var cocheRed;
    var cocheEmpty;
    
    //Declare Sprites
	var coche1;
	var coche2;
	var coche3;
	var coche4;
	var coche5;
	var coche6;
	var coche7;
	var coche8;
	var coche9;
	
	var coche1a;
	var coche2a;
	var coche3a;
	var coche4a;
	var coche5a;
	var coche6a;
	var coche7a;
	var coche8a;
	var coche9a;
	var coche10a;
	var coche11a;
	var coche12a;
	var coche13a;
	var coche14a;
	var coche15a;
	
	
	//Declare Text
	var counterText;
	
	//Declare Car Variables
	var cocheWidth = 30 * xScale /8;
	var cocheHeight = 60 * xScale /8;
	
	var cocheRotation = 0.85;
	var cocheRotation15 = 0.60;
	
	
	var renderer = PIXI.autoDetectRenderer(windowWidth, windowHeight);
	$("#home").append(renderer.view);
	
	var stage = new PIXI.Container();
	stage.interactive = true;
	 
//	stage
//     // events for drag start
//     .on('mousedown', onDragStart)
//     .on('touchstart', onDragStart)
//     // events for drag end
//     .on('mouseup', onDragEnd)
//     .on('mouseupoutside', onDragEnd)
//     .on('touchend', onDragEnd)
//     .on('touchendoutside', onDragEnd)
//     // events for drag move
//     .on('mousemove', onDragMove)
//     .on('touchmove', onDragMove);
     
	
	
	
	var container = document.getElementById('home');
	
	var currentScale = null;
	var options;
//	var options = {
//			  preventDefault: true
//			};
	var hammertime = new Hammer(container, options);

	hammertime.get('pinch').set({ enable: true });
	hammertime.get('pan').set({ direction: Hammer.DIRECTION_ALL });
	
	
		//Pinch variables
		var currentRatioX;
		var currentRatioY;
		var currentWidth
		var currentHeight;
		var startPinchX;
		var startPinchY;
		var tapCenterX;
		var tapCenterY;
		
		//test
			var centerX = 0;
			var	centerY = 0;
			var	scaleInit = 1;
			var panInitX = 0;
			var	panInitY = 0;
		// Save all current transform values like scale, translate etc.
		var transform = {};
		
		// Default values
		// In the end the image should be always centered (if not zoomed)
		transform.translateX = panInitX;
		transform.translateY = panInitY;
		transform.scale=1;
		
		
	
		var pinchStartHanlder = function (event) {
//			startPinchX = stage.position.x;
//			startPinchY = stage.position.y;
//			tapCenterX = event.center.x;
//			tapCenterY = event.center.y;
//			
//			currentRatioX = currentRatioX == null ? 1 : stage.scale.x;
//			currentRatioY = currentRatioY == null ? 1 : stage.scale.y;
			
			//test
			scaleInit = transform.scale;
	        panInitX = transform.translateX;
	        panInitY = transform.translateY;
	        centerX = event.center.x;
	        centerY = event.center.y;
		}
	
		var pinchEndHanlder = function (event) {
			startPinchX = null;
			startPinchY = null;
			tapCenterX = null;
			tapCenterY = null;
		}
	
	 var pinchInHanlder = function (event) {
		 //alert(JSON.stringify(event));
		 //currentWidth = currentWidth == null ? windowWidth : currentWidth;
		 //currentHeight = currentHeight == null ? windowHeight : currentHeight;
	
		 var scaleFactor = event.scale;
		 
		 
		 
		 if (scaleFactor < 1){
			 stage.scale.x = 1;
			 stage.scale.y = 1;
			 
			 stage.position.x =  0;
			 stage.position.y =  0;
		 } else {
			 var finalX = tapCenterX * currentRatioX / scaleFactor;
			 var finalY = tapCenterY * currentRatioY / scaleFactor;
			 
			 var deltaX = startPinchX - (tapCenterX - finalX);
			 var deltaY = startPinchY - (tapCenterY - finalY);
			 
			 // Scale the view appropriately to fill that dimension
			stage.scale.x = scaleFactor;
			stage.scale.y = scaleFactor;
			 
			 stage.position.x =  deltaX;
			 stage.position.y =  deltaY;
		 }
		 
			 
		
		 
	 };
	 
	 
	 
	 var pinchOutHandler = function (event) {
		 //test
		 var scale = scaleInit * event.scale;
		 
		 var crtPointerPosX = centerX - panInitX;
		 var crtPointerPosY = centerY - panInitY;
		 
		 var finalPointerPosX = crtPointerPosX * ( scale / scaleInit );
		 var finalPointerPosY = crtPointerPosY * ( scale / scaleInit );
		 
		 
		 var transX = panInitX + crtPointerPosX - finalPointerPosX;
		 var transY = panInitY + crtPointerPosY - finalPointerPosY;
		 
		 
		 transform.translateX = transX;
		 transform.translateY = transY;
		 transform.scale = scale;
		 
		 console.log("scaleInit: " + scaleInit + " event.scale: " + event.scale + " scale: " + scale + " crtPointerPosX: " + crtPointerPosX 
				 + " finalPointerPosX: " + finalPointerPosX + " transX: " + transX);
		 
		 stage.scale.x = transform.scale;
		 stage.scale.y = transform.scale;
		 
		 stage.position.x =  transform.translateX;
		 stage.position.y =  transform.translateY;
		 
		 
//		 var scaleFactor = event.scale;
//		 
//		 //alert(event.scale);
//		 
//		 var finalX = tapCenterX * currentRatioX / scaleFactor;
//		 var finalY = tapCenterY * currentRatioY / scaleFactor;
//		 
//		 //console.log("finalx: " + finalX + "tapCenterX: " + tapCenterX + "currentRatio: " + currentRatioX + "scaleFactor" +  scaleFactor);
//		 
//		 var deltaX = startPinchX - (tapCenterX - finalX);
//		 var deltaY = startPinchY - (tapCenterY - finalY);
//		 
//		 console.log("delta: " + deltaX + " startpinch: " + startPinchX + " tapCenter: " + tapCenterX + " finalX: " + finalX);
//		 
//		 stage.scale.x = scaleFactor;
//		 stage.scale.y = scaleFactor;
//		 
//		 stage.position.x =  deltaX;
//		 stage.position.y =  deltaY;
//		// renderer.resize(Math.ceil(windowWidth * currentRatio),Math.ceil(windowHeight * currentRatio));
		 
	 };
	 
	 
	 function onPan( ev ) {
			if ( ev.type == 'panstart' ) {
				console.log("transform.translateX: " + transform.translateX);
				panInitX = transform.translateX;
				panInitY = transform.translateY;
			}

			if ((((panInitX + ev.deltaX) + stage.width) > (renderer.width)) && ((panInitX + ev.deltaX) <= 0)){
				transform.translateX = panInitX + ev.deltaX;
			} 
			
			if ((((panInitY + ev.deltaY) + stage.height) > (renderer.height)) && ((panInitY + ev.deltaY) <= 0)){
				transform.translateY = panInitY + ev.deltaY;
			}
			
			 console.log("transform.translateX: " + transform.translateX + " panInitX: " + panInitX + " ev.deltaX: " + ev.deltaX);
			 //stage.scale.x = transform.scale;
			 //stage.scale.y = transform.scale;
			 
			 stage.position.x =  transform.translateX;
			 stage.position.y =  transform.translateY;
		}
	 
	 
	 
	 var onPinch = function (ev) {   
		    if ( ev.type == 'pinchstart' ) {
		    	scaleInit = transform.scale;
		        panInitX = transform.translateX;
		        panInitY = transform.translateY;
		        centerX = ev.center.x;
		        centerY = ev.center.y;
		    }

		    //test
			 var scale = scaleInit * ev.scale;
			 
			 var crtPointerPosX = centerX - panInitX;
			 var crtPointerPosY = centerY - panInitY;
			 
			 var finalPointerPosX = crtPointerPosX * ( scale / scaleInit );
			 var finalPointerPosY = crtPointerPosY * ( scale / scaleInit );
			 
			 
			 var transX = panInitX + crtPointerPosX - finalPointerPosX;
			 var transY = panInitY + crtPointerPosY - finalPointerPosY;
			 
//			 console.log("scaleInit: " + scaleInit 
//					 + " event.scale: " + ev.scale 
//					 + " scale: " + scale
//					 + " scaleInit: " + scaleInit 
//					 + " centerX: " + centerX 
//					 + " panInitX: " + panInitX 
//					 + " crtPointerPosX: " + crtPointerPosX 
//					 + " finalPointerPosX: " + finalPointerPosX 
//					 + " transX: " + transX);
			 
			 if (scale < 1){
				 
				 transform.scale = 1;
				 
				 transform.translateX =  0;
				 transform.translateY =  0;
				 
			 } else {
				 
				 if ( ((transX + stage.width) > (renderer.width * xScale)) && (transX <= 0)){
					 console.log("transX: " + transX 
							 + " stage.width: " + stage.width
							 + " renderer.width: " + (renderer.width * xScale))
					 transform.translateX = transX;
				 }
				 
				 if (((transY + stage.height) > (renderer.height  * yScale)) && (transY <= 0)){
					 console.log("transX: " + transX 
							 + " stage.width: " + stage.width
							 + " renderer.width: " + (renderer.height * yScale))
					 transform.translateY = transY;
				 }
				 
				 transform.scale = scale;
			 }
			 
			 stage.scale.x = transform.scale;
			 stage.scale.y = transform.scale;
			 
			 stage.position.x =  transform.translateX;
			 stage.position.y =  transform.translateY;

	 };
	 
	 
	 
	 
	 var dragPointX;
	 var dragPointY; 
	 
	 var panStartHanlder = function (event) {
//		 dragPointX = stage.position.x;
//		 dragPointY = stage.position.y;
		 
		 console.log("transform.translateX: " + transform.translateX);
			panInitX = transform.translateX;
			panInitY = transform.translateY;
	 }
	 
	 var panMoveHanlder = function (event) {
		 
		 var deltaX = event.deltaX;
		 var newPosX = dragPointX + deltaX;
		 
         if (((newPosX + stage.width) > (renderer.width)) && (newPosX <= 0)){
        	 	stage.position.x = newPosX;
         }
		
		 var deltaY = event.deltaY;
		 var newPosY = dragPointY + deltaY;
		 
		 if (((newPosY + stage.height) > (renderer.height)) && (newPosY <= 0)){
			 stage.position.y = newPosY;
		 }
		 

	 }
	 
	 var panEndHanlder = function (event) {
		 dragPointX = null;
		 dragPointY = null;
	 }
	 
	 
	hammertime.on("pinch", onPinch);
	hammertime.on("pinchstart", pinchStartHanlder);
//	hammertime.on("pinchend", pinchEndHanlder);
//	hammertime.on("pinchin", pinchInHanlder).on("pinchout", pinchOutHandler);
	
	 hammertime.on("panmove", onPan);
//	 
	hammertime.on("panstart", panStartHanlder);
//	hammertime.on("panmove", panMoveHanlder);
//	hammertime.on("panend", panEndHanlder);
   
	
//	function onDragStart(event)
//	{
//	    //alert("entra");
//	    // store a reference to the data
//	    // the reason for this is because of multitouch
//	    // we want to track the movement of this particular touch
//	    this.data = event.data;
//	    this.alpha = 0.5;
//	    this.dragging = true;
//	    this.dragPoint = this.data.getLocalPosition(this.parent);
//	}
//	
//	
//	function onDragEnd()
//	{
//	    this.alpha = 1;
//
//	    this.dragging = false;
//
//	    // set the interaction data to null
//	    this.data = null;
//	}

	
//	function onDragMove()
//	{
//	    if (this.dragging)
//	    {
//	        // need to get parent coords..
//	                var newPosition = this.data.getLocalPosition(this.parent);
//	                
//	                var posX = this.position.x;
//	                var deltaX = newPosition.x - this.dragPoint.x;
//	                var newPosX = posX + deltaX;
//	        
//	                var posY = this.position.y;
//	                var deltaY = newPosition.y - this.dragPoint.y;
//	                var newPosY = posY + deltaY;
//	        
//	        
//	                if (((newPosX + container.width) > (rendererWidth)) && (newPosX <= 0)){
//	                    //alert(newPosition.x - this.dragPoint.x + container.width);
//	                    // this.position.x += (newPosition.x - this.dragPoint.x);
//	                    this.position.x = newPosX;
//	                }
//	        
//	                if (((newPosY + container.height) > (rendererHeight)) && (newPosY <= 0)){
//	                    //alert(newPosition.x - this.dragPoint.x + container.width);
//	                    // this.position.x += (newPosition.x - this.dragPoint.x);
//	                    this.position.y = newPosY;
//	                }
//	        
//	               
//	                //this.position.y += (newPosition.y - this.dragPoint.y);
//	                this.dragPoint = newPosition;
//	    }
//	}
//	        
//	
	
	
	function onAssetsLoaded()
	{
		console.log("OnAssetsLoaded ********************************* OnAssetsLoaded");
		
		 // Create textures from our images
	    cocheGreen = PIXI.loader.resources["images/car/on_time.png"].texture;
	    cocheRed = PIXI.loader.resources["images/car/exceded.png"].texture;
	    cocheEmpty = PIXI.loader.resources["images/car/extra_exceded.png"].texture;
		
		//var background = PIXI.Sprite.fromImage("images/vidreres.jpg");
		var background = new PIXI.Sprite(PIXI.loader.resources["images/map.jpg"].texture);
		stage.addChild(background);
		background.position.x = 0;
		background.position.y = 0;
		
		background.width = windowWidth;
		background.height = windowHeight;
		
		//Counter Text
		counterText = new PIXI.Text('0');
		counterText.x = 50;
		counterText.y = 85;
	    stage.addChild(counterText);
	    
//	    stage.mousedown = stage.touchstart = function(data) {
//	    	this.dragging = true;
//	    	
//	    	
//	    }
	    
	    createCars();
	    refreshPlaces()
	    refreshPlacesTwo()
		
		renderer.render(stage);
		requestAnimationFrame(animate);
	}
	
	
	function onButtonDown() {
		//alert("hola");
	    this.texture = cocheRed;
	}
	
	function onButtonUp() {
	    this.texture = cocheRed;
	}



	function animate() {
		
		requestAnimationFrame(animate);

		timer();
		
	    // render the stage   
	    renderer.render(stage);
	}
	
	function timer(){
		timeFrames = timeFrames +1;
		
		if (timeFrames == 80){
			timeFrames = 0;
			timeSeconds = timeSeconds + 1;
			updateTimer = updateTimer + 1;
		}
		
		if (updateTimer == 10){
			updateTimer = 0;
			refreshPlaces()
			refreshPlacesTwo()
		}
		
		counterText.text = timeSeconds;
	}
	
	
//	function secs_to_time(seconds) {
//	    var sec_num = parseInt(seconds, 10); // don't forget the second param
//
//		var days = Math.floor(sec_num / 86400);
//		var hours = Math.floor((sec_num % 86400) / 3600);
//		var minutes = Math.floor(((sec_num % 86400) % 3600) / 60);
//		var seconds = ((sec_num % 86400) % 3600) % 60;
//
//	    if (hours   < 10) {hours   = "0"+hours;}
//	    if (minutes < 10) {minutes = "0"+minutes;}
//	    if (seconds < 10) {seconds = "0"+seconds;}
//	    
//		var time = seconds+'s';
//		if(minutes>0) {time = hours+'h '+minutes+'m '+seconds+'s';}
//		if(hours>0) {time = hours+'h '+minutes + "m "+seconds+'s';}
//		if(days>0) { time = days+'d '+hours+'h '+minutes+'m ';}
//
//	    return time;
//	}
	
	
	
	function refreshPlaces(){
		console.log("refreshPlaces ********************************* refreshPlaces");
		
		$.ajaxSetup({cache: false}); // fixes older IE caching bug
		
		$.get( output ).done(function( data ) {
			//Limpiamos los espacios
			data = $.trim(data.replace(/\s{2,}/g, ' '));	
			var numbersArray = data.split(' ');
			
			//alert(numbersArray);
			
			$.each(numbersArray, function(index, value) {
				index++;
				
				if(index<=15){
					//Controlar errores
					places[index]['occupied'] = value;
				}
				
			});
			
			refreshCars15();
		});
	}
	
	
	function refreshPlacesTwo(){
		console.log("refreshPlacesTwo ********************************* refreshPlacesTwo");
		
		$.ajaxSetup({cache: false}); // fixes older IE caching bug
		
		$.get( output_two ).done(function( data ) {
			//Limpiamos los espacios
			data = $.trim(data.replace(/\s{2,}/g, ' '));	
			var numbersArray = data.split(' ');
			
			//alert(numbersArray);
			
			$.each(numbersArray, function(index, value) {
				index++;
				
				if(index<=9){
					//Controlar errores
					places_two[index]['occupied'] = value;
				}
				
			});
			
			refreshCars();
		});
	}
	
	
	
	
	function createCars(){
		console.log("createCars ********************************* createCars");
		
		coche1 = new PIXI.Sprite(cocheGreen);
		stage.addChild(coche1);
		setCarAttributes(coche1,1);
		
		coche2 = new PIXI.Sprite(cocheGreen);
		stage.addChild(coche2);
		setCarAttributes(coche2,2);
		
		coche3 = new PIXI.Sprite(cocheGreen);
		stage.addChild(coche3);
		setCarAttributes(coche3,3);
		
		coche4 = new PIXI.Sprite(cocheGreen);
		stage.addChild(coche4);
		setCarAttributes(coche4,4);
		
		coche5 = new PIXI.Sprite(cocheGreen);
		stage.addChild(coche5);
		setCarAttributes(coche5,5);
		
		coche6 = new PIXI.Sprite(cocheGreen);
		stage.addChild(coche6);
		setCarAttributes(coche6,6);
		
		coche7 = new PIXI.Sprite(cocheGreen);
		stage.addChild(coche7);
		setCarAttributes(coche7,7);
		
		coche8 = new PIXI.Sprite(cocheGreen);
		stage.addChild(coche8);
		setCarAttributes(coche8,8);
		
		coche9 = new PIXI.Sprite(cocheGreen);
		stage.addChild(coche9);
		setCarAttributes(coche9,9);
		
		
		//Bloque de 15
		coche1a = new PIXI.Sprite(cocheGreen);
		stage.addChild(coche1a);
		setCarAttributes15(coche1a,1);
		
		coche2a = new PIXI.Sprite(cocheGreen);
		stage.addChild(coche2a);
		setCarAttributes15(coche2a,2);
		
		coche3a = new PIXI.Sprite(cocheGreen);
		stage.addChild(coche3a);
		setCarAttributes15(coche3a,3);
		
		coche4a = new PIXI.Sprite(cocheGreen);
		stage.addChild(coche4a);
		setCarAttributes15(coche4a,4);
		
		coche5a = new PIXI.Sprite(cocheGreen);
		stage.addChild(coche5a);
		setCarAttributes15(coche5a,5);
		
		coche6a = new PIXI.Sprite(cocheGreen);
		stage.addChild(coche6a);
		setCarAttributes15(coche6a,6);
		
		coche7a = new PIXI.Sprite(cocheGreen);
		stage.addChild(coche7a);
		setCarAttributes15(coche7a,7);
		
		coche8a = new PIXI.Sprite(cocheGreen);
		stage.addChild(coche8a);
		setCarAttributes15(coche8a,8);
		
		coche9a = new PIXI.Sprite(cocheGreen);
		stage.addChild(coche9a);
		setCarAttributes15(coche9a,9);
		
		coche10a = new PIXI.Sprite(cocheGreen);
		stage.addChild(coche10a);
		setCarAttributes15(coche10a,10);
		
		coche11a = new PIXI.Sprite(cocheGreen);
		stage.addChild(coche11a);
		setCarAttributes15(coche11a,11);
		
		coche12a = new PIXI.Sprite(cocheGreen);
		stage.addChild(coche12a);
		setCarAttributes15(coche12a,12);
		
		coche13a = new PIXI.Sprite(cocheGreen);
		stage.addChild(coche13a);
		setCarAttributes15(coche13a,13);
		
		coche14a = new PIXI.Sprite(cocheGreen);
		stage.addChild(coche14a);
		setCarAttributes15(coche14a,14);
		
		coche15a = new PIXI.Sprite(cocheGreen);
		stage.addChild(coche15a);
		setCarAttributes15(coche15a,15);
		
	}
	
	
	function setCarAttributes(cocheParam, index){
		//console.log("setCarAttributes ********************************* setCarAttributes");
		
		cocheParam.position.x = places_two[index]['position']['x'];
		cocheParam.position.y = places_two[index]['position']['y'];;
		cocheParam.width  = cocheWidth;
		cocheParam.height = cocheHeight;
		cocheParam.rotation = cocheRotation;
		
		
		cocheParam.interactive = true;
		
		cocheParam
	    .on('mousedown', onButtonDown)
	    .on('mouseup', onButtonUp)
	    .on('mouseupoutside', onButtonUp)
	    .on('touchstart', onButtonDown)
	    .on('touchend', onButtonUp)
	    .on('touchendoutside', onButtonUp);
	}
	
	function setCarAttributes15(cocheParam, index){
		//console.log("setCarAttributes15 ********************************* setCarAttributes15");
		
		cocheParam.position.x = places[index]['position']['x'];
		cocheParam.position.y = places[index]['position']['y'];;
		cocheParam.width  = cocheWidth;
		cocheParam.height = cocheHeight;
		cocheParam.rotation = cocheRotation15;
		
		cocheParam.interactive = true;
		
		cocheParam
	    .on('mousedown', onButtonDown)
	    .on('mouseup', onButtonUp)
	    .on('mouseupoutside', onButtonUp)
	    .on('touchstart', onButtonDown)
	    .on('touchend', onButtonUp)
	    .on('touchendoutside', onButtonUp);
	}
	
	function refreshCars(){
		setCarColor(coche1,1);
		setCarColor(coche2,2);
		setCarColor(coche3,3);
		setCarColor(coche4,4);
		setCarColor(coche5,5);
		setCarColor(coche6,6);
		setCarColor(coche7,7);
		setCarColor(coche8,8);
		setCarColor(coche9,9);
	}
	
	function refreshCars15(){
		setCarColor15(coche1a,1);
		setCarColor15(coche2a,2);
		setCarColor15(coche3a,3);
		setCarColor15(coche4a,4);
		setCarColor15(coche5a,5);
		setCarColor15(coche6a,6);
		setCarColor15(coche7a,7);
		setCarColor15(coche8a,8);
		setCarColor15(coche9a,9);
		setCarColor15(coche10a,10);
		setCarColor15(coche11a,11);
		setCarColor15(coche12a,12);
		setCarColor15(coche13a,13);
		setCarColor15(coche14a,14);
		setCarColor15(coche15a,15);
	}
	
	
	function setCarColor(coche,index){
		
		if(places_two[index]['occupied'] == 1){
			coche.texture = cocheRed;
		} else {
			coche.texture = cocheGreen;
		}
		
	}
	
	
function setCarColor15(coche,index){
		
		if(places[index]['occupied'] == 1){
			coche.texture = cocheRed;
		} else {
			coche.texture = cocheGreen;
		}
		
	}
	
});


	
