

$(document).on('pagebeforeshow', '#home', function(){ 
	console.log("Init ********************************* Init");
	
	var startTime1 = moment("09:00:00 am", 'hh:mm:ss a');
	var endTime1 = moment("13:00:00 pm", 'hh:mm:ss a');
	
	var startTime2 = moment("09:00:00 am", 'hh:mm:ss a');
	var endTime2 = moment("13:00:00 pm", 'hh:mm:ss a');
	
	var output = "http://www.igsresearch.com/devel/vidreres/output";
	var output_timer = "http://www.igsresearch.com/devel/vidreres/outputtimer";
		
	var output_two = "http://www.igsresearch.com/devel/vidreres/output_two";
	var output_two_timer = "http://www.igsresearch.com/devel/vidreres/outputtimer_two";
	
	var timeFrames = 0;
	var timeSeconds = 0;
	var updateTimer = 0;
	var updateNeeded = false;
	
	var windowWidth = window.outerWidth;
	var windowHeight = window.outerHeight;
	
	var xScale = 1024 / windowWidth;
	var yScale = 1850 / windowHeight;
	
	//State: 0=Empty;1=on time;2=exceeded;3=extra exceeded;4=out of hours;5=selected
	var places = {
			'1' : {
				'position' : {'x':108 / xScale , 'y':777 / xScale},
				'occupied' : 0,
				'time'  : 0,
				'state' : 0,
				
			},
			'2' : {
				'position' : {'x':135 / xScale , 'y':793 / xScale},
				'occupied' : 0,
				'time'  : 0,
				'state' : 0
			},
			'3' : {
				'position' : {'x':161 / xScale , 'y':809 / xScale},
				'occupied' : 0,
				'time'  : 0,
				'state' : 0
			},
			'4' : {
				'position' : {'x':188 / xScale , 'y':824 / xScale},
				'occupied' : 0,
				'time'  : 0,
				'state' : 0
			},
			'5' : {
				'position' : {'x':214 / xScale , 'y':839 / xScale},
				'occupied' : 0,
				'time'  : 0,
				'state' : 0
			},
			'6' : {
				'position' : {'x':240 / xScale , 'y':856 / xScale},
				'occupied' : 0,
				'time'  : 0,
				'state' : 0
			},
			'7' : {
				'position' : {'x':266 / xScale , 'y':871 / xScale},
				'occupied' : 0,
				'time'  : 0,
				'state' : 0
			},
			'8' : {
				'position' : {'x':294 / xScale , 'y':887 / xScale},
				'occupied' : 0,
				'time'  : 0,
				'state' : 0
			},
			'9' : {
				'position' : {'x':320 / xScale , 'y':900 / xScale},
				'occupied' : 0,
				'time'  : 0,
				'state' : 0
			},
			'10' : {
				'position' : {'x':407 / xScale , 'y':950 / xScale},
				'occupied' : 0,
				'time'  : 0,
				'state' : 0
			},
			'11' : {
				'position' : {'x':433 / xScale , 'y':967 / xScale},
				'occupied' : 0,
				'time'  : 0,
				'state' : 0
			},
			'12' : {
				'position' : {'x':460 / xScale , 'y':980 / xScale},
				'occupied' : 0,
				'time'  : 0,
				'state' : 0
			},
			'13' : {
				'position' : {'x':485 / xScale , 'y':1000 / xScale},
				'occupied' : 0,
				'time'  : 0,
				'state' : 0
			},
			'14' : {
				'position' : {'x':512 / xScale , 'y':1014 / xScale},
				'occupied' : 0,
				'time'  : 0,
				'state' : 0
			},
			'15' : {
				'position' : {'x':540 / xScale , 'y':1030 / xScale},
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
	var cocheEmpty;
	var cocheGreen;
    var cocheRed;
    var cocheBlack;
    var cocheWhite;
    
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
	var cocheWidth = 30 / xScale;
	var cocheHeight = 60 / xScale;
	
	var cocheRotation = 0.85;
	var cocheRotation15 = 0.60;
	
	//HTML Container
	var container = document.getElementById('home');
	
	//Renderer
	var renderer = PIXI.autoDetectRenderer(windowWidth, windowHeight);
	$("#home").append(renderer.view);
	
	//Main Stage
	var stage = new PIXI.Container();
	stage.interactive = true;
	 
	//Hammer.js para zoom y pan
	var options;
	var hammertime = new Hammer(container, options);

	hammertime.get('pinch').set({ enable: true });
	hammertime.get('pan').set({ direction: Hammer.DIRECTION_ALL });
	
		//Pinch/pan variables
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
			scaleInit = transform.scale;
	        panInitX = transform.translateX;
	        panInitY = transform.translateY;
	        centerX = event.center.x;
	        centerY = event.center.y;
		}
		
		 var panStartHanlder = function (event) {
			 //console.log("transform.translateX: " + transform.translateX);
				panInitX = transform.translateX;
				panInitY = transform.translateY;
		 }

	 
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
			
			 //console.log("transform.translateX: " + transform.translateX + " panInitX: " + panInitX + " ev.deltaX: " + ev.deltaX);
			 
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

		    
			 var scale = scaleInit * ev.scale;
			 
			 var crtPointerPosX = centerX - panInitX;
			 var crtPointerPosY = centerY - panInitY;
			 
			 var finalPointerPosX = crtPointerPosX * ( scale / scaleInit );
			 var finalPointerPosY = crtPointerPosY * ( scale / scaleInit );
			 
			 
			 var transX = panInitX + crtPointerPosX - finalPointerPosX;
			 var transY = panInitY + crtPointerPosY - finalPointerPosY;
			 
			 if (scale < 1){
				 
				 transform.scale = 1;
				 
				 transform.translateX =  0;
				 transform.translateY =  0;
				 
			 } else {
				 
				 if (transX <= 0){
					 
					 var xLowerCorner = transX + (1024 / xScale * scale);
					 
//					 console.log("transX: " + transX 
//							 + "(windowWidth / xScale * scale):  " 
//							 + (1024 / xScale * scale) 
//							 + "xLowerCorner: " +  xLowerCorner
//							 + "(windowWidth/xScale): " + (1024/xScale));
					 
					 if (xLowerCorner < (1024/xScale)){
						 transX -= (xLowerCorner - (1024 / xScale));
					 }
					 console.log("transXnew: " + transX);
					 
					 transform.translateX = transX;
				 }
				 
				 
				 
				 if (transY <= 0){
					 var yLowerCorner = transY + (1850 / xScale * scale);
					 
					 if (yLowerCorner < (1850/xScale)){
						 transY -= (yLowerCorner - (1850 / xScale));
					 }
					 
					 transform.translateY = transY;
				 }
				 
				 transform.scale = scale;
			 }
			 
			 stage.scale.x = transform.scale;
			 stage.scale.y = transform.scale;
			 
			 stage.position.x =  transform.translateX;
			 stage.position.y =  transform.translateY;

	 };
	 
	 

	 
 
	 
	hammertime.on("pinch", onPinch);
	hammertime.on("pinchstart", pinchStartHanlder);

	hammertime.on("panmove", onPan);
	hammertime.on("panstart", panStartHanlder);

   
	
	function onAssetsLoaded()
	{
		 // Create textures from our images
		cocheEmpty = PIXI.loader.resources["images/car/empty.png"].texture;
	    cocheGreen = PIXI.loader.resources["images/car/on_time.png"].texture;
	    cocheRed = PIXI.loader.resources["images/car/exceded.png"].texture;
	    cocheBlack = PIXI.loader.resources["images/car/extra_exceded.png"].texture;
	    cocheWhite = PIXI.loader.resources["images/car/after_hours.png"].texture;
	    
		
		var background = new PIXI.Sprite(PIXI.loader.resources["images/map.jpg"].texture);
		stage.addChild(background);
		background.position.x = 0;
		background.position.y = 0;
		
		background.width = background.width / xScale;
		background.height = background.height / xScale;
		
		//Counter Text
		counterText = new PIXI.Text('0');
		counterText.x = 50;
		counterText.y = 85;
	    stage.addChild(counterText);
	 
	    createCars();
	    refreshPlaces()
	    refreshPlacesTwo()
		
		renderer.render(stage);
		requestAnimationFrame(animate);
	}
	
	
	function onButtonDown() {
		//alert("hola");
	    this.texture = cocheWhite;
	}
	
	function onButtonUp() {
	    this.texture = cocheWhite;
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
		
		//Check AfterHours
		var diaSemana = moment().weekday();
		
		if((diaSemana != 0) && (diaSemana != 6) ){
			//No es fin de semana
			var now = moment();
			var parkTime = false;
			var morning = false;
			
			//De 9 a 13
			if(now.isBetween(startTime1,endTime1)){
				morning = true;
				parkTime = true;
			} else if(now.isBetween(startTime2,endTime2)){
				morning = false;
				parkTime = true;
			} else {
				morning = false;
				parkTime = false;
			}
			
			if(parkTime){
				
				
			}
			
			
		}
		
		$.ajaxSetup({cache: false}); // fixes older IE caching bug

		//CheckTime
		$.get( output ).done(function( data ) {
			
		});
		
		
		//Check pos and status
		
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
					
					if(value==1){//Ocupado
						
						places[index]['status'] = value;
					}
					
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
		setCarColor(coche1a,1);
		setCarColor(coche2a,2);
		setCarColor(coche3a,3);
		setCarColor(coche4a,4);
		setCarColor(coche5a,5);
		setCarColor(coche6a,6);
		setCarColor(coche7a,7);
		setCarColor(coche8a,8);
		setCarColor(coche9a,9);
		setCarColor(coche10a,10);
		setCarColor(coche11a,11);
		setCarColor(coche12a,12);
		setCarColor(coche13a,13);
		setCarColor(coche14a,14);
		setCarColor(coche15a,15);
	}
	
	
	function setCarColor(coche,index){
		
		if(places[index]['occupied'] == 0){//Empty
			coche.texture = cocheEmpty;
		} else if (places[index]['occupied'] == 1){//On Time
			coche.texture = cocheGreen;
		} else if (places[index]['occupied'] == 2){//exceeded
			coche.texture = cocheRed;
		} else if(places[index]['occupied'] == 3){//Extra exceeded
			coche.texture = cocheBlack;
		} else if(places[index]['occupied'] == 4){//After hours
			coche.texture = cocheWhite;
		} else if(places[index]['occupied'] == 5){//Selected
			coche.texture = cocheWhite;
		} 
		
	}
	
	
function setCarColor15(coche,index){
		
		if(places[index]['occupied'] == 0){
			coche.texture = cocheEmpty;
		} else {
			coche.texture = cocheGreen;
		}
		
	}
	
});


	
