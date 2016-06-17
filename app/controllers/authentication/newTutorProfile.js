// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

$.profile.add(Alloy.createController("centralView/profile", {
	closeNewTutorProfileScreen : closeNewTutorProfileScreen
}).getView());

function closeNewTutorProfileScreen() {
	Ti.API.info("closeNewTutorProfileScreen");
	$.profile.close();
}

$.profile.addEventListener('androidback', function() {
	Ti.API.info("back button has been pressed");
}); 