var appKey = require("appKey");

if (Alloy.Globals.getData(appKey.KEYS.LOGINSTATUS)) {
	var win = Alloy.createController("sliderContent/slider").getView();
	win.open();
}else {
	var win = Alloy.createController("authentication/login").getView();
	win.open();
}

require("utils").getCourses();
require("utils").getSubjects();
require("utils").getTimings();