var utils = require("utils");
var validation = require("validation");


$.registerNow.addEventListener('click', function(e) {
	Ti.API.info("**************");
	openRegisterAsScreen();
});

function openRegisterAsScreen(params) {
	var win = Alloy.createController("authentication/registerAs", {
		params : params,
		closeLoginScreen : closeLoginScreen 
	}).getView();
	win.open();
}

function closeLoginScreen(){
	$.loginScreen.close();
}

function onLoginClick() {
	var user = {};
	var email = ($.emailAddress.value).trim();
	var password = $.password.value;
	var emailValid = validation.validateEmail({email :email });
	if (email.length > 1 && emailValid) {
		user.email = email.toLowerCase();
		if (password.length > 1) {
			var win = Alloy.createController("sliderContent/slider").getView();
			win.open();
			utils.setLoginStatus();
			closeLoginScreen();
			//Ti.App.Properties.setObject('user', user);
			/*if (Titanium.Network.online) {
			 } else {
			 alert("Internet is not available");
			 }*/
		} else {
			alert("Please enter password");
		}
	} else {
		alert("Please enter valid email address");
		return false;
	}
}