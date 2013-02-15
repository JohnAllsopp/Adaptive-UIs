//the functionality of the UI

var adaptiveUI = {

 	addEventHandlers: function (){
		//add event handlers to buttons
		var buttons = document.querySelectorAll('button')
		
		for (var i=0; i < buttons.length; i++) {
			buttons[i].addEventListener("click", adaptiveUI.tapButton, false)
		};
		
	},
	
	tapButton: function(event){
		//called when the user taps a button
		
		
		var numberTapped = event.target.innerHTML;
		var currentNumber = document.querySelector("output").innerHTML
		//currently entered number by the user

		if (numberTapped == "&lt;") {
			document.querySelector("output").innerHTML = currentNumber.substring(0, currentNumber.length - 1)
		}

		else if (numberTapped == "call") {		
		
		}		

		else {		
			document.querySelector("output").innerHTML = currentNumber + numberTapped
		}
		
		
		event.preventDefault()
		//don't submit
	}

}

window.addEventListener("load", adaptiveUI.addEventHandlers, false)