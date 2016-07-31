var appKey = require("appKey");

if (Alloy.Globals.getData(appKey.KEYS.LOGINSTATUS)) {
	var win = Alloy.createController("sliderContent/slider").getView();
	win.open();
}else {
	var win = Alloy.createController("authentication/login").getView();
	win.open();
}
if (!Ti.App.Properties.hasProperty('user')) {
	Ti.App.Properties.setObject('user', {
		pkaccount : null,
		areaCode : null,
		deviceToken : null,
		endpointArn : null,
		email : null,
		password : null,
		groupid : null,
		phone : null
	});
}
require("utils").getCourses();
require("utils").getSubjects();
require("utils").getTimings();