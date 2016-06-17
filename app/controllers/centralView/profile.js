var args = $.args;
var appKey = require("appKey");
var social = require("social");
var utils = require("utils");
var linkedin = social.create({
	consumerSecret : "s7ZV7hViil2DaqPp",
	consumerKey : "75c5prnmkejwoe",
	site : 'linkedin'
});
var accessLinkedInProfileDailog = Ti.UI.createAlertDialog({
	cancel : 1,
	buttonNames : ['Confirm', 'Cancel'],
	message : 'Tutme would like access your LinkedIn profile.',
	title : 'Tutme'
});

var accessLinkedInProfile = function(e) {
	accessLinkedInProfileDailog.show();
	accessLinkedInProfileDailog.addEventListener('click', function(e) {
		if (e.index === e.source.cancel) {
			Ti.API.info('The cancel button was clicked');
		} else {
			linkedin.getProfileLinkedin({
				message : "messageContent",
				success : function(e) {
					response = JSON.stringify(e);
					Ti.API.info(response.siteStandardProfileRequest + "****" + e.firstName + "response" + JSON.stringify(e));
				},
				error : function(e) {
					Ti.API.info("Error while posting" + JSON.stringify(e));
				}
			});
		}
	});
};
// name,emailAddress,address_permanent,contactNo,aboutYourSelf,subjects
var onSubmit = function(e) {
	if (($.name.value.length > 0) && ($.emailAddress.value.length > 0) && ($.address_permanent.value.length > 0) /*&& ($.contactNo.value.length > 0) && ($.aboutYourSelf.length > 0) && ($.subjects.value.length > 0)*/) {
		if (!Alloy.Globals.getData(appKey.KEYS.REGISTRATIONCOMPLETE)) {
			utils.setRegistrationStatus();
			var win = Alloy.createController("sliderContent/slider").getView();
			win.open();
			args && args.closeNewTutorProfileScreen && args.closeNewTutorProfileScreen();
		} else {
			alert("Profile updated successfully.");
		}
	} else {
		//alert('Please fill the details to complete your Registration.');
		alert('Please fill the name, email and permanent address field ');
	}
};

function onCoursesClick(){
	var customDropDownTable = require("customized/customUI").customDropDown({
		rowsArray : ["B.Tech","C language","C++ language","Java","Computers"]
	});
	$.coursesDropDown.add(customDropDownTable);
	$.coursesDropDown.height = Titanium.UI.SIZE;
}

function onSubjectClick(){
	var customDropDownTable = require("customized/customUI").customDropDown({
		rowsArray : ["Physics","Chemistry","Math","Social Science","English"]
	});
	$.subjectsDropDown.add(customDropDownTable);
	$.subjectsDropDown.height = Titanium.UI.SIZE;
} 

function onBatchTimeClick(){
	var customDropDownTable = require("customized/customUI").customDropDown({
		rowsArray : ["2pm-3pm","3pm-4pm","4pm-5pm","5pm-6pm","6pm-7pm"]
	});
	$.batchTimeDropDown.add(customDropDownTable);
	$.batchTimeDropDown.height = Titanium.UI.SIZE;
}
