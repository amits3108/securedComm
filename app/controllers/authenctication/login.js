var utils = require("utils");
// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var student,
    tutorHome,
    homeTutor,
    organisationalInstitue,
    selfInstitute = false;
/*var dialog,
 dialog2,
 dialog3;
 */
function registerAs() {
	var params;
	var opts = {
		cancel : 3,
		options : ['Student', 'Tutor', 'Organisation', 'Cancel'],
		selectedIndex : 3,
		destructive : 0,
		title : 'Register As'
	};
	var dialog = utils.createDailog(opts);
	dialog.show();
	dialog.addEventListener('click', function(e) {
		if (e.index == 0) {
			//student = "student";
			params = {
				student : "student"
			};
			openSignUpScreen(params);
		} else if (e.index == 1) {
			//dialog2.show();
			tutorSelection();
		} else if (e.index == 2) {
			//dialog3.show();
			orgInstiuteSelection();
		}
	});
}

function tutorSelection() {
	var params;
	var opts2 = {
		cancel : 2,
		options : ['Tutor Home', 'Home Tutor', 'Cancel'],
		selectedIndex : 2,
		destructive : 0,
		title : 'Register As'
	};
	var dialog2 = utils.createDailog(opts2).show();
	dialog2.addEventListener('click', function(e) {
		if (e.index == 0) {
			//homeTutor = "homeTutor";
			params = {
				homeTutor : "homeTutor"
			};
		} else if (e.index == 1) {
			//tutorHome = "tutorHome";
			params = {
				tutorHome : "tutorHome"
			};
		}
		openSignUpScreen(params);
	});
}

function orgInstiuteSelection() {
	var params;
	var opts3 = {
		cancel : 2,
		options : ['Self Institute', 'Organisational Institue', 'Cancel'],
		selectedIndex : 2,
		destructive : 0,
		title : 'Register As'
	};

	var dialog3 = utils.createDailog(opts3).show();
	dialog3.addEventListener('click', function(e) {
		if (e.index == 0) {
			//selfInstitute = "selfInstitute";
			params = {
				selfInstitute : "selfInstitute"
			};
		} else if (e.index == 1) {
			//organisationalInstitue = "organisationalInstitue";
			params = {
				organisationalInstitue : "organisationalInstitue"
			};
		}
		openSignUpScreen(params);

	});
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