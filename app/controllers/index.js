var appKey = require("appKey");

if (Alloy.Globals.getData(appKey.KEYS.LOGINSTATUS)) {
	var win = Alloy.createController("sliderContent/slider").getView();
	win.open();
}/* else if (!Alloy.Globals.getData(appKey.KEYS.TUTORPROFILEUPDATE) || Alloy.Globals.getData(appKey.KEYS.TUTORPROFILEUPDATE) == 'pending') {
	//TODO:  Need to be change with handling of student, organization and tutor
	// profile handling
	//Or Can remove this line as per functionality.
	Alloy.createController("authentication/tutorProfile").getView().open();
}*/ else {
	var win = Alloy.createController("authentication/login").getView();
	win.open();
}
