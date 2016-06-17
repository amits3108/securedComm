var args = $.args; 
var appKey = require("appKey");
var student,
    tutorHome,
    homeTutor,
    organisationalInstitue,
    selfInstitute = false;
var dialog,
    dialog2,
    dialog3;
var studentClick = function(e) {
	Alloy.Globals.setData(appKey.KEYS.USERTYPE, "student");
	openSignUpScreen({
		userType : "student"
	});
};
var tutorClick = function(e) {
	Alloy.Globals.setData(appKey.KEYS.USERTYPE, "tutor");
	tutorSelection({
		userType : "tutor"
	});
};

// Arguments passed into this controller can be accessed via the `$.args` object directly or:

function tutorSelection(params) {
	var params = params || {};
	var opts2 = {
		cancel : 3,
		options : ['Tutor Home', 'Home Tutor', 'Institute', 'Cancel'],
		selectedIndex : 3,
		title : 'Register As'
	};
	dialog2 = Ti.UI.createOptionDialog(opts2);
	dialog2.addEventListener('click', function(e) {
		//params = params.userType;
		if (e.index == 0) {
			params = {
				userType : params.userType,
				tutorType : "tutorHome"
			};
			openSignUpScreen(params);
		} else if (e.index == 1) {
			params = {
				userType : params.userType,
				tutorType : "homeTutor"
			};
			openSignUpScreen(params);
		} else if (e.index == 2) {
			orgInstiuteSelection({
				userType : "organisation"
			});
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

function openSignUpScreen(params) {
	var win = Alloy.createController("authentication/signUp", {
		params : params,
		closeRegisterAsScreen : closeRegisterAsScreen,
	}).getView();
	win.open();
	args && args.closeLoginScreen && args.closeLoginScreen();
	closeRegisterAsScreen();
}

function closeRegisterAsScreen(){
	$.registerAs.close();
}
