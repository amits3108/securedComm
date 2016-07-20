// Arguments passed into this controller can be accessed via the `$.args` object
// directly or:
var args = $.args;
var appKey = require("appKey");
function submitClick() {
	setProfileUpdateStatus();
	var win = Alloy.createController("sliderContent/slider").getView();
	win.open();
}

function onTutorProfileOpen() {
	//$.profile.add(Alloy.createController("centralView/profile").getView());
}

function setProfileUpdateStatus() {
	//NOTE: completed : tutorProfile update is completed.
	//      pending : tutorProfile update is pending.
	Alloy.Globals.setData(appKey.KEYS.TUTORPROFILEUPDATE, 'completed');
}

function onAddCoursesClick() {
	Alloy.createController("authentication/addCourseDetail").getView().open();
}

var customTutionTypeTable = null;
function onTutionTypeClick() {
	if (!customTutionTypeTable) {
		customTutionTypeTable = require("customized/customUI").customDropDown({
			rowsArray : ["Home Tutor", "Tutor's Type", "Self Institution", "Educational Organisation"]
		});
		$.tutionTypeDropDown.add(customTutionTypeTable);
		$.tutionTypeDropDown.height = Titanium.UI.SIZE;
	} else {
		$.tutionTypeDropDown.remove(customTutionTypeTable);
		$.tutionTypeDropDown.height = 0;
		customTutionTypeTable = null;
	}
}
$.profile.addEventListener('androidback', closeProfileScreen);
function closeProfileScreen(e) {
	Ti.API.info("========profile===============");
	$.profile.close();
}
