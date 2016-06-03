var utils = require("utils");
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
	var win = Alloy.createController("authenctication/signUp", {
		params : params
	}).getView();
	win.open();
}

function onLoginClick() {
	var win = Alloy.createController("Main").getView();
	win.open();
}
