// Arguments passed into this controller can be accessed via the `$.args` object
// directly or:
var args = $.args;
var appKey = require("appKey");
function submitClick() {
	setProfileUpdateStatus();
	var win = Alloy.createController("slider/slider").getView();
	win.open();
}

function onTutorProfileOpen() {

}

function setProfileUpdateStatus() {
	//NOTE: completed : tutorProfile update is completed.
	//      pending : tutorProfile update is pending.
	Alloy.Globals.setData(appKey.KEYS.TUTORPROFILEUPDATE, 'completed');
}
