var utils = require("utils");
var validation = require("validation");
// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var student,
    tutorHome,
    homeTutor,
    organisationalInstitue,
    selfInstitute = false;
var dialog,
    dialog2,
    dialog3;

function registerAs() {
	var opts = {
		cancel : 3,
		options : ['Student', 'Tutor', 'Organisation', 'Cancel'],
		selectedIndex : 3,
		title : 'Register As'
	};
	dialog = Ti.UI.createOptionDialog(opts);
	dialog.addEventListener('click', function(e) {
		//var params;
		if (e.index == 0) {
			openSignUpScreen({
				userType : "student"
			});
		} else if (e.index == 1) {
			tutorSelection({
				userType : "tutor"
			});
		} else if (e.index == 2) {
			orgInstiuteSelection({
				userType : "organization"
			});
		}
	});
	dialog.show();
}

function tutorSelection(params) {
	var params = params || {};
	var opts2 = {
		cancel : 2,
		options : ['Tutor Home', 'Home Tutor', 'Cancel'],
		selectedIndex : 2,
		title : 'Register As'
	};
	dialog2 = Ti.UI.createOptionDialog(opts2);
	dialog2.addEventListener('click', function(e) {
		//params = params.userType;
		if (e.index == 0) {
			params = {
				userType : params.userType,
				tutorType : "homeTutor"
			};
			openSignUpScreen(params);
		} else if (e.index == 1) {
			params = {
				userType : params.userType,
				tutorType : "tutorHome"
			};
			openSignUpScreen(params);
		} else {

		}
	});
	dialog2.show();
}

function orgInstiuteSelection(params) {
	var params = params || {};
	var opts3 = {
		cancel : 2,
		options : ['Self Institute', 'Organisational Institue', 'Cancel'],
		selectedIndex : 2,
		title : 'Register As'
	};
	dialog3 = Ti.UI.createOptionDialog(opts3);
	dialog3.addEventListener('click', function(e) {
		if (e.index == 0) {
			params = {
				userType : params.userType,
				instituteType : "selfInstitute"
			};
			openSignUpScreen(params);
		} else if (e.index == 1) {
			params = {
				userType : params.userType,
				instituteType : "organisationalInstitue"
			};
			openSignUpScreen(params);
		} else {

		}
	});
	dialog3.show();
}

$.registerNow.addEventListener('click', function(e) {
	Ti.API.info("**************");
	registerAs();
});

function openSignUpScreen(params) {
	var win = Alloy.createController("authentication/signUp", {
		params : params
	}).getView();
	win.open();
}

function onLoginClick() {
	var user = {};
	var email = ($.emailAddress.value).trim();
	var password = $.password.value;
	var emailValid = validation.validateEmail({email :email });
	if (email.length > 1 && emailValid) {
		user.email = email.toLowerCase();
		if (password.length > 1) {
			var win = Alloy.createController("slider/slider").getView();
			win.open();
			utils.setLoginStatus();
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

function validateEmail(email) {
	var re = /^[a-zA-Z0-9]+([\.|\_|\-._%+-][a-zA-Z0-9]+)*@([^\W_]*)+([\.|\_|\-._%+-][a-zA-Z0-9]+)*[.]([a-zA-Z]{2,3}|[a-zA-Z]{2,3}[.][a-zA-Z]{2})$/;
	if (!re.test(email)) {
		return false;
	} else
		return true;
}
