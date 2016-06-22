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
var customCoursesDropDownTable = null;
function onCoursesClick() {
	if (!customCoursesDropDownTable) {
		customCoursesDropDownTable = require("customized/customUI").customDropDown({
			rowsArray : ["B.Tech", "C language", "C++ language", "Java", "Computers"]
		});
		$.coursesDropDown.add(customCoursesDropDownTable);
		$.coursesDropDown.height = Titanium.UI.SIZE;
	} else {
		$.coursesDropDown.remove(customCoursesDropDownTable);
		$.coursesDropDown.height = 0;
		customCoursesDropDownTable = null;
	}
}

var customSubjectsDropDownTable = null;
function onSubjectClick() {
	if (!customSubjectsDropDownTable) {
		customSubjectsDropDownTable = require("customized/customUI").customDropDown({
			rowsArray : ["Physics", "Chemistry", "Math", "Social Science", "English"]
		});
		$.subjectsDropDown.add(customSubjectsDropDownTable);
		$.subjectsDropDown.height = Titanium.UI.SIZE;
	} else {
		$.subjectsDropDown.remove(customSubjectsDropDownTable);
		$.subjectsDropDown.height = 0;
		customSubjectsDropDownTable = null;
	}
}

var customBatchsDropDownTable = null;
function onBatchTimeClick() {
	if (!customBatchsDropDownTable) {
		customBatchsDropDownTable = require("customized/customUI").customDropDown({
			rowsArray : ["2pm-3pm", "3pm-4pm", "4pm-5pm", "5pm-6pm", "6pm-7pm"]
		});
		$.batchTimeDropDown.add(customBatchsDropDownTable);
		$.batchTimeDropDown.height = Titanium.UI.SIZE;
	} else {
		$.batchTimeDropDown.add(customBatchsDropDownTable);
		$.batchTimeDropDown.height = 0;
		customBatchsDropDownTable = null;
	}
}

// Checking the user type and showing field accordingly
//experience, label, canTravelTo, courses, subjects, sutaibleBatchTime
//alert(Alloy.Globals.getData(appKey.KEYS.USERTYPE));
if (Alloy.Globals.getData(appKey.KEYS.USERTYPE) == "student") {
	$.scrollContainer.remove($.experience);
	$.scrollContainer.remove($.experienceSap);
	$.scrollContainer.remove($.label);
	$.scrollContainer.remove($.labelSap);
	$.scrollContainer.remove($.canTravelTo);
	$.scrollContainer.remove($.canTravelToSap);
	$.scrollContainer.remove($.courses);
	$.scrollContainer.remove($.coursesSap);
	$.scrollContainer.remove($.subjects);
	$.scrollContainer.remove($.subjectsSap);
	$.scrollContainer.remove($.sutaibleBatchTime);
	$.scrollContainer.remove($.sutaibleBatchTimeSap);
}

function onImageViewClick(){
	require('androidCameraDialogs').showDialogs({
		success : receiveImageCallBack
	});
}

function receiveImageCallBack(response){
	Ti.API.info(" receiveImageCallBack "+JSON.stringify(response));
	//TODO: need to handle properly.
	$.userProfileImage.image = response.nativePath;
}
