// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var appKey = require("appKey");
if (Alloy.Globals.getData(appKey.KEYS.USERTYPE) == "organisation") {
	//opening Institute Profile     
	$.profile.add(Alloy.createController("centralView/profileInstitute", {
		closeNewTutorProfileScreen : closeNewTutorProfileScreen
	}).getView());
} else {
	// 
	$.profile.add(Alloy.createController("centralView/profile", {
		closeNewTutorProfileScreen : closeNewTutorProfileScreen,
	}).getView());
}

function closeNewTutorProfileScreen() {
	Ti.API.info("closeNewTutorProfileScreen");
	$.profile.close();
}

$.profile.addEventListener('androidback', function() {
	Ti.API.info("back button has been pressed");
});
