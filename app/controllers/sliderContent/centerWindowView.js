var utils = require("utils");
var appKey = require("appKey");

exports.createCenterView = function() {
	//Include Lib
	var ui = require('XUI');
	Ti.API.info("CCEENNTTEERR");
	var args = null;
	var mainView = ui.createNView(args);

	Alloy.Globals.centralView = Ti.UI.createView({
		backgroundColor : "transparent",
		top : 0,
		bottom : 0,
	});
	mainView.add(Alloy.Globals.centralView);

	//Load Screen to be open
	if (Alloy.Globals.getData(appKey.KEYS.LOGINSTATUS)) {
		if (Alloy.Globals.getData(appKey.KEYS.USERTYPE) == "student") {
			utils.replaceCentralView({
				view : Alloy.createController("centralView/studentDashBoard").getView(),
				title : "Student DashBoard"
			});
		} else {
			utils.replaceCentralView({
				view : Alloy.createController("centralView/tutorDashBoard").getView(),
				title : "Tutor DashBoard"
			});
		}
	}
	/*utils.replaceCentralView({
	 view : Alloy.createController("centralView/profile").getView(),
	 title : "Profile"
	 });*/

	if (OS_ANDROID) {
		Alloy.Globals.navWindow = mainView;
		return mainView;
	} else {
		var navWin = Ti.UI.iOS.createNavigationWindow({
			top : 0,
			window : mainView,
			statusBarStyle : Ti.UI.iPhone.StatusBar.LIGHT_CONTENT,
		});
		Alloy.Globals.navWindow = mainView;
		return navWin;
	}
};
