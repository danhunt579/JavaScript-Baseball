"use strict";

var 
pitchOutcome = "",
inning = "t1",
hits = 0,
aHits = 0,
hHits = 0,
strikes = 0,		
balls = 0,
outs = 0,
walks = 0,
halfInning = 1,	//halfInnings max = 18 
base = 0,		//This is a variabale that records hits and walks,  right now only increment by one for single or bb four bases = 1 run
aRuns = 0,
hRuns = 0,
scoreDisplayed = false;

/*
halfInning starts at 1 in the top of the first, the away team leads off
Player is the home team
home team halfInning % 2 = 0 or event
away team halfInning % 2 = 1 or odd
*/

window.onload = load();

function main() {	
				
		if (halfInning > 18 && (aRuns != hRuns)) {
			showScore();

			if (aRuns > hRuns) {
				alert("The away team wins!\nAway Team: " + aRuns + "Home Team: " + hRuns + "\nPress f5 to play again.");
			} else {
				alert("The home team wins!\nAway Team: " + aRuns + "Home Team: " + hRuns  + "\nPress f5 to play again.");
			}
		}
			
		document.addEventListener("keydown", instructions);
		
	
		if (base == 4){
			strikes = 0;
			balls = 0;
			base = 3;
			
			if (halfInning % 2 == 0){
				hRuns++;
			} else {
				aRuns++;
				}
			}
			
		
		
		if (strikes > 2) {
			outs ++;
			strikes = 0;
			balls = 0;
			console.log("strikes" + strikes);
		}
		
		if (balls > 3) {
			base ++;
			strikes = 0;
			balls = 0;
			console.log("base: " + base);
		}
		
		if (outs > 2) {
			halfInning ++;
			outs = 0;
			strikes = 0;
			balls = 0;
			base = 0
		}
		// Determine the display for inning t or b + inning
		inning = Math.trunc((halfInning +1)/ 2);	
		if (halfInning %2 == 0) {
			inning = "b" + inning;
		}
		else {
			inning = "t" + inning;
		}
		
		switch (base) {
			case 0: {
				document.getElementById("first").style.display = "none";
				document.getElementById("second").style.display = "none";
				document.getElementById("third").style.display = "none";
				break;
			}
			case 1: {
				document.getElementById("first").style.display = "";
				document.getElementById("second").style.display = "none";
				document.getElementById("third").style.display = "none";
				break;
			}
			case 2: {
				document.getElementById("first").style.display = "";
				document.getElementById("second").style.display = "";
				document.getElementById("third").style.display = "none";
				break;
			}
			case 3: {
				document.getElementById("first").style.display = "";
				document.getElementById("second").style.display = "";
				document.getElementById("third").style.display = "";
				break;
			}
			default: {
				console.log("Too many bases.")
				break;
			}
		}
		
		
		document.getElementById("innings").innerHTML = inning;
		document.getElementById("outs").innerHTML = outs;
		document.getElementById("balls").innerHTML = balls;
		document.getElementById("strikes").innerHTML = strikes;
		scoreDisplayed = false;
		
		document.getElementById("pitch").addEventListener("click", pitchAnimation);
		document.getElementById("score").addEventListener("click", showScore);
		
		
} // End main

function showScore() {
	if (scoreDisplayed == false) {
		document.getElementById("innings").innerHTML = "";
		document.getElementById("outs").innerHTML = aRuns;
		document.getElementById("balls").innerHTML = "";
		document.getElementById("strikes").innerHTML = hRuns;
		scoreDisplayed = true;
	} else {
		document.getElementById("innings").innerHTML = inning;
		document.getElementById("outs").innerHTML = outs;
		document.getElementById("balls").innerHTML = balls;
		document.getElementById("strikes").innerHTML = strikes;	
		scoreDisplayed = false;
	}
}

function load() {
	document.getElementById("marker").style.display = "none";
	document.getElementById("lf").style.display = "none";
	document.getElementById("cf").style.display = "none";
	document.getElementById("rf").style.display = "none";
	document.getElementById("third").style.display = "none";
	document.getElementById("second").style.display = "none";
	document.getElementById("first").style.display = "none";
	document.getElementById("home").style.display = "none";
	
	// The score keeping variables displayed on the top of the console
	document.getElementById("innings").innerHTML = inning;
	document.getElementById("outs").innerHTML = outs;
	document.getElementById("balls").innerHTML = balls;
	document.getElementById("strikes").innerHTML = strikes;
	instructionsStart();
	main();
}

function instructions(e) {
	if (e.keyCode == 113) {
	alert("Intstructions:\nClick on pitch for pitcher to pitch\nClick hit when ball is over plate\nBall will flash at plate if it is a hit.  Click run.\nBall will flash at position if it is caught. It is an out.\nPress f2 to see this any time.");
	}
}

function instructionsStart() {
	alert("Intstructions:\nClick on pitch for pitcher to pitch\nClick hit when ball is over plate\nBall will flash at plate if it is a hit.  Click run.\nBall will flash at position if it is caught. It is an out.\nPress f2 to see this any time.");
}


function pitchAnimation() {
	// This function is responsible for the animation of the pitch after the player hits "pitch"
	// After pitch is pressed, the browser decides if the pitch is to be in the strike zone or outside the strike zone
	// After the pitch animation begins, an event listener is added to the hit button
	// If the hit button is pressed at the same time as the red ball is in the home plate icon, a hit if in the zone or a strike if outside the zone
	document.getElementById("pitch").removeEventListener("click", pitchAnimation)   // Ensures that two balls can't be thrown at the same time
	var elem = document.getElementById("marker");	// this is the red ball
	var pos = 209;	// Starting x position of red ball
	var posY = 340;     // Starting y position of red ball
	var swing = false;	// Declare a boolean variable that keeps track of the hit button
	
	// Generate a random number from 1 to 10 that determines if a pitch is in the zone 70% of the time or else it is outside of the zone
	var random = Math.floor(0 + 9 * Math.random());
	if(random < 6) {
		var id = setInterval(frame, 10);  // In the zone
	} else {
		var id = setInterval(frame2, 10);	// Outside the zone
	} // On testing, about 70% of pitches came out as strikes and 30% as balls if no swing with random < 6
		
	function frame() {
		// Function if a pitch thrown is in the strike zone
		
		
		document.getElementById("hit").addEventListener("click", hitClick); // Adds event listener once to hit button when pitch is thrown
		
		if (pos == 370) { // The ball has reached the end
			clearInterval(id);
			document.getElementById("hit").removeEventListener("click", hitClick);
			elem.style.display = "none";
			strikes++;
			main();
		} else { 
			elem.style.display = "";  // Makes the ball visible
			pos++; // Moves the ball down the screen
			elem.style.top = pos + 'px';  // Concatenates the pos number to px for CSS
			if (swing == true && pos > 330 && pos < 350) {// If the hit button is pressed and the ball is in the pixel range from top of 330 & 336
				// Generate a random number between 1 & 10
				// 60% caught, 30% hit, 10% home run
				var randContact = Math.floor(0 + 10 * Math.random());  // Caught or hit
				//console.log("Random:" + randContact);
				switch(randContact) {
					case 0:
					case 1:
					case 2:
					case 3:
					case 4: {
						/********************Caught*************************************/
						clearInterval(id);
						document.getElementById("hit").removeEventListener("click", hitClick);
						document.getElementById("run").removeEventListener("click", runToFirst);
						document.getElementById("pitch").removeEventListener("click", pitchAnimation);
						document.getElementById("marker").style.display = "none";
						
						
						// Generate a random number to determine which position catches the ball
						var catchPosition = Math.floor(0 + 6 * Math.random());
						var x = 0;
						var BLINK_FREQ = 5;	//Number of times that you want to see blink
						
						switch(catchPosition) {
							case 0: {
								var blinkInterval = setInterval(caughtLF, 1000);

								function caughtLF() {
								document.getElementById("lf").style.display = "";
								setTimeout(offLF, 500);
								//Clear the interval after x times
								if (x >= (BLINK_FREQ - 1)) {
										clearInterval(blinkInterval);
									} // end if
									
								}
								function offLF() {
								document.getElementById("lf").style.display = "none";
								x++;			
								}
								break;
							} // End case 0
							case 1: {
								var blinkInterval = setInterval(caughtCF, 1000);

								function caughtCF() {
								document.getElementById("cf").style.display = "";
								setTimeout(offCF, 500);
								//Clear the interval after x times
								if (x >= (BLINK_FREQ - 1)) {
										clearInterval(blinkInterval);
									} // end if
									
								}
								function offCF() {
								document.getElementById("cf").style.display = "none";
								x++;			
								}
								break;
							} //End case 1
							
							
							case 2: {
								var blinkInterval = setInterval(caughtRF, 1000);

								function caughtRF() {
								document.getElementById("rf").style.display = "";
								setTimeout(offRF, 500);
								//Clear the interval after x times
								if (x >= (BLINK_FREQ - 1)) {
										clearInterval(blinkInterval);
									} // end if
									
								}
								function offRF() {
								document.getElementById("rf").style.display = "none";
								x++;			
								}
								break;
							} //End case 2
							
							case 3: {
								var blinkInterval = setInterval(caught3B, 1000);

								function caught3B() {
								document.getElementById("third").style.display = "";
								setTimeout(off3B, 500);
								//Clear the interval after x times
								if (x >= (BLINK_FREQ - 1)) {
										clearInterval(blinkInterval);
									} // end if
									
								}
								function off3B() {
								document.getElementById("third").style.display = "none";
								x++;			
								}
								break;
							} //End case 3
							
							case 4: {
								var blinkInterval = setInterval(caught2B, 1000);

								function caught2B() {
								document.getElementById("second").style.display = "";
								setTimeout(off2B, 500);
								//Clear the interval after x times
								if (x >= (BLINK_FREQ - 1)) {
										clearInterval(blinkInterval);
									} // end if
									
								}
								function off2B() {
								document.getElementById("second").style.display = "none";
								x++;			
								}
								break;
							} //End case 4
							
							case 5: {
								document.getElementById("marker").style.display = "none";
								var blinkInterval = setInterval(caught1B, 1000);

								function caught1B() {
								document.getElementById("first").style.display = "";
								setTimeout(off1B, 500);
								//Clear the interval after x times
								if (x >= (BLINK_FREQ - 1)) {
										clearInterval(blinkInterval);
									} // end if
									
								}
								function off1B() {
								document.getElementById("first").style.display = "none";
								x++;			
								}
								break;
							} //End case 5
							
							case 6: {
								alert("case6");
								break;
							}
							
							
							
						} // End switch(catchPosition)
						
						outs++;
						strikes = 0;
						balls = 0;
						setTimeout(main, 5000);
						break;						
					} // End case 4 from randContact
					case 5:
					case 6:
					case 7:
					case 8:
						//document.getElementById("pitch").removeEventListener("click", pitchAnimation)
						/****************Hit**************************************/
						clearInterval(id);
						contact();
						swing = false;			// Hit button no longer pressed
						base ++;
						balls = 0;
						strikes = 0;
						setTimeout(main, 3000);
						break;
					case 9: {
						clearInterval(id);
						document.getElementById("hit").removeEventListener("click", hitClick);
						document.getElementById("run").removeEventListener("click", runToFirst);
						document.getElementById("pitch").removeEventListener("click", pitchAnimation);
						document.getElementById("marker").style.display = "none";
						swing = false;
						alert("Home Run!");
						
						if (halfInning % 2 == 0) {
							hRuns += (base + 1);
						} else {
							aRuns += (base + 1);
						}
						
						base = 0;
						strikes = 0;
						balls = 0;
						swing = false;
						setTimeout(main, 1000);
						break;
					} //End of case 
					
					} // End contact function
				}  // End if(swing && pos)
			}// End of if else
					
		swing = false;	// Hit button no longer pressed	
		
		function contact() {
			document.getElementById("run").addEventListener("click", runToFirst)
			document.getElementById("run").addEventListener("click", clear)
			off();			
			pos = 330;
			document.getElementById("marker").style.top = pos + 'px';
			var x = 0;
			var BLINK_FREQ = 5;	//Number of times that you want to see blink
			var blinkInterval = setInterval(blink, 1000);

			function blink() {
			document.getElementById("marker").style.display = "";
			setTimeout(off, 500);
			//Clear the interval after x times
			if (x >= (BLINK_FREQ - 1)) {
					clearInterval(blinkInterval);
				} // end if
				
			}
			function off() {
			document.getElementById("marker").style.display = "none";
			x++;			
			}
			
			function clear() {
				clearInterval(blinkInterval);
			}
		} // End contact
		
	}// End frame()
	
	function frame2() { // This is for a pitch outside the zone
		var contact = Boolean(document.getElementById("marker").style.top == "330px");
		
		document.getElementById("hit").addEventListener("click", hitClick);
		if (pos == 370) {	// Ball has reached the end
			clearInterval(id);
			balls++;
			elem.style.display = "none";
			posY = 340;		// Resets posY to begining position so next pitch looks right
			elem.style.left = posY + 'px';
			main()
		} else {
			elem.style.display = "";	// Makes ball visible
			pos++;
			posY = posY + (posY * .0004);	// Adds Y postion for a ball not in the zone so, ball goes to right of plate
			elem.style.top = pos + 'px';
			elem.style.left = posY + 'px';
			if (swing == true) {  // Ball is not in zone and swung at
				strikes++;
				clearInterval(id);
				swing = false;				// Hit button no longer pressed
				posY = 340;
				elem.style.left = posY + 'px';
				elem.style.display = "none";
				main()
			}
					}
		swing = false;	// Hit button no longer pressed
		
	}		// End frame2()
	
	
	function hitClick() { // Keeps track of hit button once animation begins
		swing = true;
		document.getElementById("hit").removeEventListener("click", hitClick);
	}
	
}	// End pitchAnimation()

function runToFirst() {
	document.getElementById("run").removeEventListener("click", runToFirst)
	//clearInterval(blinkInterval);
	document.getElementById("marker").style.display = "none";
	var elem = document.getElementById("first");
	elem.style.display = "";
	var x = 340;
	var y = 330;
	elem.style.left = x + "px";
	elem.style.top = y + 'px';
	var id = setInterval(frame, 10);
	
	function frame() {
		if (x == 453 || y== 230) {
			clearInterval(id);
		} else {
			elem.style.display = "";
			x = x + (1 * 1.12);
			y--;
			elem.style.left = x + 'px';
			elem.style.top = y + 'px';
		}
	}
}

function runToSecond() {
	document.getElementById("marker").style.display = "none";
	var elem = document.getElementById("first");
	elem.style.display = "";
	var x = 453;
	var y = 230;
	elem.style.left = x + "px";
	elem.style.top = y + 'px';
	var id = setInterval(frame, 10);
	
	function frame() {
		if (x == 343 || y== 135) {
			clearInterval(id);
		} else {
			elem.style.display = "";
			x = x - (1 * 1.16);
			y--;
			elem.style.left = x + 'px';
			elem.style.top = y + 'px';
		}
	}
}

function runToThird() {
	var elem = document.getElementById("first");
	elem.style.display = "";
	var x = 343;
	var y = 135;
	elem.style.left = x + "px";
	elem.style.top = y + 'px';
	var id = setInterval(frame, 10);
	
	function frame() {
		if (x == 230 || y== 230) {
			clearInterval(id);
		} else {
			elem.style.display = "";
			x = x - (1 * 1.20);
			y++;
			elem.style.left = x + 'px';
			elem.style.top = y + 'px';
		}
	}
}

function runToHome() {
	var elem = document.getElementById("first");
	elem.style.display = "";
	var x = 230;
	var y = 230;
	elem.style.left = x + "px";
	elem.style.top = y + 'px';
	var id = setInterval(frame, 10);
	
	function frame() {
		if (x == 340 || y== 330) {
			clearInterval(id);
		} else {
			elem.style.display = "";
			x = x + (1 * 1.10);
			y++;
			elem.style.left = x + 'px';
			elem.style.top = y + 'px';
		}
	}
}


/*
Things to improve:
don't allow spam hit button
Allow doubles & triples
animate base running for first to second & second to third
test end of game
*/