var args = $.args;
var appKey = require("appKey");
var social = require("social");
var utils = require("utils");
setValues();
var LinkedInClick = function() {
	utils.accessLinkedInProfile();
};

function setValues() {
	var user = Ti.App.Properties.getObject('user');
	$.name.value = user.name;
	$.emailAddress.value = user.email;
	$.contactNo.value = user.phone;
};
// name,emailAddress,address_permanent,contactNo,aboutYourSelf,subjects
var onSubmit = function(e) {
	if (($.name.value.length > 0) && ($.emailAddress.value.length > 0) && ($.address_permanent.value.length > 0) /*&& ($.contactNo.value.length > 0) && ($.aboutYourSelf.length > 0) && ($.subjects.value.length > 0)*/) {
		if (!Alloy.Globals.getData(appKey.KEYS.REGISTRATIONCOMPLETE)) {
			utils.setRegistrationStatus();
			var win = Alloy.createController("sliderContent/slider").getView();
			win.open();
			args && args.closeNewTutorProfileScreen && args.closeNewTutorProfileScreen();
			// if (Titanium.Network.online) {
			//
			// // var requestData = {
			// // user[name] :"sandeep",
			// // user[email] : "sandeep@mailinator.com",
			// // user[dob] : "1989-10-04",
			// // user[gender] : "Male" ,
			// // user[mobile] : "1234543454" ,
			// // profile_pic : "",
			// // address[address] : "shastri nagar, bahadurgarh, haryana",
			// // address[city] : "bahadurgarh",
			// // address[zipcode] : "124507",
			// // tutor[experience] : "12" ,
			// // address_proof : ""
			// // tutor[medium] : "english",
			// // tutor[mobile_visibility] : "show/hide",
			// // tutor[linkedin_profile] : "/pardeepk" ,
			// // tutor[free_class_days] : "7",
			// // tutor[can_travel_distance] : "4",
			// // id_proof : "" ,
			// // tutor[tutor_type] : "1" ,
			// // tutor[courses] : "c1,c2,c3",
			// // tutor[subjects] : "s1,s2,s3",
			// // tutor[timings] : "9-10,11-13"
			// // };
			// network.postRequest({
			// type : "POST",
			// url : Alloy.CFG.URL.update_profile,
			// requestData : requestData,
			// requestHeaders : {
			// //"Content-Type" : "application/json",
			// "public-key" : "c8a1ad1332716aa15752422360e739a5",
			// "token" : "72dd0dbc65b5e19d4b086c6f89b16203_123",//"79c74e91e49b623f6ea02435e2725"
			// },
			// callBack : callBack,
			// });
			//
			// } else {
			// alert("Check Internet Connection");
			// }

		} else {
			alert("Profile updated successfully.");
		}
	} else {
		//alert('Please fill the details to complete your Registration.');
		alert('Please fill the name, email and permanent address field ');
	}
};
function callBack(json) {
	Ti.API.info("register callback : \n " + JSON.stringify(json));
	//utils.Loading.hideSpinner();
	if (json && (parseInt(json.status_code) == 200) && (!json.error)) {
		// var win = Alloy.createController("sliderContent/slider").getView();
		// win.open();
		// args && args.closeNewTutorProfileScreen && args.closeNewTutorProfileScreen();
		Ti.API.info("Register successfully");
	} else {
		//json && !(_.isEmpty(json)) && alert(json.message);
		_.isEmpty(json) && alert("Unable to complete registration. Please try again later.");
		Ti.API.error("error found");
	}
}

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

function onImageViewClick() {
	require('androidCameraDialogs').showDialogs({
		success : receiveImageCallBack
	});
}

function receiveImageCallBack(response) {
	Ti.API.info(" receiveImageCallBack " + JSON.stringify(response));
	//TODO: need to handle properly.
	$.userProfileImage.image = response.nativePath;
}
