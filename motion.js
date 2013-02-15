var shakometer = {
	//this manages the shakometer stuff
	
	stepsTaken: 0, //how many steps have been taken
	motionInterval: 300, //200ms between motion events
	lastMotionEvent: 0, // as yet we've had none, keeps track of when we had the last motion event
	
	start: function(){
		//start the shakometer	
		window.addEventListener('devicemotion', shakometer.motionHandler, false)
		stepsTaken = 0		
	},
	
	stop: function(){
		//start the shakometer	
		window.removeEventListener('devicemotion', shakometer.motionHandler, false)		
	},
	
	wasShaken: function(acX, acY, acZ){
		
		//algorithm shamlessly ripped off from 
		//http://stackoverflow.com/questions/8310250/how-to-count-steps-using-an-accelerometer

		var threshold = 1.2;
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


			if (shakometer.wasShaken(motionData.acceleration.x, motionData.acceleration.y, motionData.acceleration.z)){
				document.querySelector('form').className = "shaken"
			}
			
			else {
				document.querySelector('form').className = "regular"
	
			}

			console.log(shakometer.stepsTaken + " " + (today.getTime() - shakometer.lastMotionEvent))
			shakometer.lastMotionEvent = today.getTime()

		}
	}

}

window.addEventListener("load", shakometer.start, false)
