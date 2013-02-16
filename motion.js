//motion.js is a simple use of the devicemotion events of mobile device browsers
//when we detect that the device is shaking, we adapt the UI to make buttons easier to hit
//this is all done via CSS, all we do here is change the class of the containing form

var shakometer = {
	//this manages the shakometer stuff
	
	motionInterval: 500, 
	//set the interval in ms that you want to check for shaking over 
	//devicemotion events fire hundreds of times a second, and provcessing each one will chew battery life
	lastMotionEvent: 0, // as yet we've had none, keeps track of when we had the last motion event
	
	remainInState: 10000,
	//when a change in state is detected (from shaking to non shaking or the other way)
	//how long before we change the state of the UI in ms
	
	lastStateChange: 0, // time the state was last changed from shaking to non-shaking or the other way 
	
	start: function(){
		//start the shakometer
		window.addEventListener('devicemotion', shakometer.motionHandler, false)
	},
	
	stop: function(){
		//start the shakometer	
		window.removeEventListener('devicemotion', shakometer.motionHandler, false)		
	},
	
	wasShaken: function(acX, acY, acZ){
		
		//algorithm shamlessly ripped off from 
		//http://stackoverflow.com/questions/8310250/how-to-count-steps-using-an-accelerometer

		var threshold = 1.2; //vary this up and down to be more or less tolerant of shaking
		var deviceWasShaken = false;
		
		if ((acX > threshold) || (acX < threshold * -1)) {
			deviceWasShaken = true
		}
		if ((acY > threshold) || (acY < threshold * -1)) {
			deviceWasShaken = true
		}
		if ((acZ > threshold) || (acZ < threshold * -1)) {
			deviceWasShaken = true
		}

		return deviceWasShaken		
	},
	
	motionHandler: function (motionData){
		//an event handler for the deviceOrientation event
		var today = new Date();

		if((today.getTime() - shakometer.lastMotionEvent) > shakometer.motionInterval){	
			//we don't need to check for shakes all that frequently
			//devicemotion fires hundreds of times a second, sowe can save batter life by checking less frequently


			if (shakometer.wasShaken(motionData.acceleration.x, motionData.acceleration.y, motionData.acceleration.z)){
				
				//we know the device is shaking, but do we change the state yet?
				//check how long since we changed the state, and if this exceeds shakometer.remainInState then change it
				
				if((today.getTime() - shakometer.lastStateChange) > shakometer.remainInState){	
					
					shakometer.lastStateChange = today.getTime()
					//record when this state change ocurred
				
					if (document.body.classList) {
						document.body.classList.add("shaken")
						document.body.classList.remove("regular")
					}
					//we change the class name of the containing body, and so our shaken styles apply
			
					else {
						if (document.body.classList) {
							document.body.classList.add("regular")
							document.body.classList.remove("shaken")
						}
						//we change the class name of the containing form, and so our regular styles apply	
					}
				}
			}
			

			console.log(shakometer.wasShaken(motionData.acceleration.x, motionData.acceleration.y, motionData.acceleration.z) + " " + (today.getTime() - shakometer.lastMotionEvent))
			//for debugging
			
			shakometer.lastMotionEvent = today.getTime()

		}
	}

}

window.addEventListener("load", shakometer.start, false)
//add an event listener for the window load event, which installs the shakometer
