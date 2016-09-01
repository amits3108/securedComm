var args = $.args;
var appKey = require("appKey");
var social = require("social");
var utils = require("utils");
var network = require("network");
//setValues();
$.idProofImage.hide();
$.secondIdProofImage.hide();
var LinkedInClick = function() {
	utils.accessLinkedInProfile();
};
var user = Alloy.Globals.getData(appKey.USER);
var user_id;
if (user && user.user_id)
	user_id = user.user_id;
getProfile();
//api.tutme.in/index.php/user/get_profile

//{"user":[{"id":"16","user_type":"1","email":"atutme57@gmail.com","full_name":"atutme57","dob":"0000-00-00","gender":null,"mobile":"4444422257","profile_pic":null}],"address":[],"courses":[],"subjects":[],"timings":[]},"message":"user complete profile","errors":"","status_code":200}
function getProfile() {
	Ti.API.error("getProfile");
	utils.showLoading();
	if (Titanium.Network.online) {
		network.postRequest({
			type : "GET",
			url : "api.tutme.in/index.php/user/get_profile/" + user_id, //"api.tutme.in/index.php/user/get_profile",
			requestData : {},
			requestHeaders : {
				"public-key" : "c8a1ad1332716aa15752422360e739a5",
				"token" : "72dd0dbc65b5e19d4b086c6f89b16203_123",
			},
			callBack : callBackGetProfile
		});

	} else {
		alert("Internet is not available");
	}
};
function callBackGetProfile(json) {
	Ti.API.info("get profile Callback : \n " + JSON.stringify(json));
	utils.hideLoading();
	if (json && (parseInt(json.status_code) == 200) && (!json.error)) {
		utils.setLoginStatus();
		if (json.data) {
			setValues({
				data : json.data
			});
			Ti.API.info("get profile Callback success: \n " + JSON.stringify(json.data));
		}
	} else {
		_.isEmpty(json) && alert("Unable to connect. Please try again later.");
		if (json && json.error) {
			if (json.message) {
				alert(json.message + "");
			} else {
				alert("Something went wrong, Please try again");
			}
		}
		Ti.API.error("error found");
	}
}

function setValues(params) {
	var data = params.data;
	//   get profile response

	//{"user":[{"id":"16","user_type":"1","email":"atutme57@gmail.com","full_name":"atutme57","dob":"0000-00-00","gender":"","mobile":"8689665566","profile_pic":null}],
	//"address":[{"id":"34","user_id":"16","address":"New Colony","city":"Gurgaon","state":null,"country":null,"zipcode":"222555","coordinates":null,"created_on":"2016-08-11 11:08:52","updated_on":null}],
	//"courses":[],"subjects":[],"timings":[]}

	//
	var user = Alloy.Globals.getData(appKey.USER);
	if (data) {
		$.name.value = data.user[0].full_name;
		$.emailAddress.value = data.user[0].email;
		$.contactNo.value = data.user[0].mobile;
		$.address_permanent.value = data.address[0].address;
		$.city.value = data.address[0].city;
		$.cityPIN.value = data.address[0].zipcode;
		$.experience.value = "";
		$.preferredLanguage.value = "";
	}
};
// name,emailAddress,address_permanent,contactNo,aboutYourSelf,subjects
var onSubmit = function(e) {
	if (($.name.value.length > 0) && ($.emailAddress.value.length > 0) && ($.address_permanent.value.length > 0) /*&& ($.contactNo.value.length > 0) && ($.aboutYourSelf.length > 0) && ($.subjects.value.length > 0)*/) {
		//if (!Alloy.Globals.getData(appKey.KEYS.REGISTRATIONCOMPLETE)) {
		/*utils.setRegistrationStatus();

		 var win = Alloy.createController("sliderContent/slider").getView();
		 win.open();
		 args && args.closeNewTutorProfileScreen && args.closeNewTutorProfileScreen();*/
		Ti.API.error('Submitting the profile ');
		if (Titanium.Network.online) {
			utils.showLoading();
			var requestData = {
				user_id : user_id,
				user_name : $.name.value, //"sandeep",
				user_email : $.emailAddress.value, //"sandeep@mailinator.com",
				user_dob : ($.dateOfBirth.value) ? $.dateOfBirth.value : "1989-10-04",
				user_gender : "",
				user_mobile : $.contactNo.value, //"1234543454" ,
				user_profile_pic : "",
				address_address : $.address_permanent.value, //"shastri nagar, bahadurgarh, haryana",
				address_city : $.city.value,
				address_zipcode : $.cityPIN.value,
				tutor_experience : $.experience.value,
				tutor_address_proof : "",
				tutor_medium : $.preferredLanguage.value,
				tutor_mobile_visibility : "",
				tutor_linkedin_profile : "",
				tutor_free_class_days : "",
				tutor_can_travel_distance : "",
				tutor_id_proof : "",
				tutor_type : "",
				courses : "[]",
				subjects : "[]",
				timings : "[]"
			};
			network.postRequest({
				type : "POST",
				url : Alloy.CFG.URL.update_profile,
				requestData : requestData,
				requestHeaders : {
					"public-key" : "c8a1ad1332716aa15752422360e739a5",
					"token" : "72dd0dbc65b5e19d4b086c6f89b16203_123",
				},
				callBack : callBack,
			});

		} else {
			alert("Check Internet Connection");
		}

		//} else {
		//alert("Profile updated successfully.");
		//}
	} else {
		alert('Please fill the details to complete request.');
		//alert('Please fill the name, email and permanent address field ');
	}
};
function callBack(json) {
	Ti.API.info("register callback : \n " + JSON.stringify(json));
	utils.hideLoading();
	if (json && (parseInt(json.status_code) == 200) && (!json.error)) {
		if (!Alloy.Globals.getData(appKey.KEYS.REGISTRATIONCOMPLETE)) {
			var win = Alloy.createController("sliderContent/slider").getView();
			win.open();
			args && args.closeNewTutorProfileScreen && args.closeNewTutorProfileScreen();
			utils.setRegistrationStatus();
		} else {
			alert("Profile updated successfully.");
		}

		Ti.API.info("Register successfully: Enter into the slider screen");
	} else {
		//json && !(_.isEmpty(json)) && alert(json.message);
		_.isEmpty(json) && alert("Unable to complete request. Please try again later.");
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
	$.scrollContainer.remove($.contactNoSap);
	$.scrollContainer.remove($.canTravelTo);
	$.scrollContainer.remove($.canTravelToSap);
	$.scrollContainer.remove($.courses);
	$.scrollContainer.remove($.coursesSap);
	$.scrollContainer.remove($.subjects);
	$.scrollContainer.remove($.subjectsSap);
	$.scrollContainer.remove($.sutaibleBatchTime);
	$.scrollContainer.remove($.id_proof);
	$.scrollContainer.remove($.idProofSap);
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

function selectDate() {
	//Ti.API.error(utils.openCalender());
	var dob;
	var picker = Ti.UI.createPicker({
	});
	picker.showDatePickerDialog({
		value : new Date(), // some date
		callback : function(e) {
			if (e.cancel) {
				Ti.API.info('user canceled dialog');
			} else {
				Ti.API.info('value is: ' + e.value);
				Ti.API.info('lets see what this object is' + JSON.stringify(e));
				selectedDate = e.value;
				dob = String.formatDate(selectedDate, 'medium');
				Ti.API.info(dob);
				$.dateOfBirth.value = dob;
			}
		}
	});
	//$.dateOfBirth.value = utils.openCalender();
}

var HighestQualificationTypeClickArray = ['Doctorate', 'Post Graduate', 'Graduate', 'Senior Secondary', 'Higher Secondary', '5th to 10th', '1st to 4th', 'Cancel'];
function HighestQualificationTypeClick() {
	var qualificationDialog = Ti.UI.createOptionDialog({
		cancel : 0,
		options : HighestQualificationTypeClickArray,
		title : 'Highest Qualification',
		//selectedIndex : 0
	});
	qualificationDialog.show();
	qualificationDialog.addEventListener('click', function(e) {
		switch(e.index) {
		case 0 :
			$.qualification.value = HighestQualificationTypeClickArray[e.index];
			break;
		case 1 :
			$.qualification.value = HighestQualificationTypeClickArray[e.index];
			break;
		case 2 :
			$.qualification.value = HighestQualificationTypeClickArray[e.index];
			break;
		case 3 :
			$.qualification.value = HighestQualificationTypeClickArray[e.index];
			break;
		case 4 :
			$.qualification.value = HighestQualificationTypeClickArray[e.index];
			break;
		case 5 :
			$.qualification.value = HighestQualificationTypeClickArray[e.index];
			break;
		case 6 :
			//$.qualification.value = HighestQualificationTypeClickArray[e.index];
			break;
		default:
			break;
		}
		Ti.API.info('The button was clicked' + e.index);
	});
}

var languageArray = ['English', 'Hindi', 'Cancel'];
function languageTypeClick() {
	var languageDialog = Ti.UI.createOptionDialog({
		cancel : 2,
		options : languageArray,
		title : 'Preferred Language',
		//selectedIndex : 0
	});
	languageDialog.show();
	languageDialog.addEventListener('click', function(e) {
		switch(e.index) {
		case 0 :
			$.preferredLanguage.value = languageArray[e.index];
			break;
		case 1 :
			$.preferredLanguage.value = languageArray[e.index];
			break;
		case 2 :

			break;
		}
	});
}

function uploadIdProof() {
	Ti.API.info("asnfjlgkl");
	require('androidCameraDialogs').showDialogs({
		success : recieveIdProofCallback
	});
}

function recieveIdProofCallback(response) {
	Ti.API.info(" recieveIdProofCallback " + JSON.stringify(response));
	$.scrollContainer.add($.idProofImage);
	$.idProofImage.show();
	$.idProofImage.image = response.nativePath;
	$.idProofImage.height = 200;
	$.scrollContainer.height = Ti.UI.SIZE;
}


function recieveSecondIdProofCallback(response){
	Ti.API.info(" recieveIdProofCallback " + JSON.stringify(response));
	$.scrollContainer.add($.secondIdProofImage);
	$.secondIdProofImage.show();
	$.secondIdProofImage.image = response.nativePath;
	$.secondIdProofImage.height = 200;
	$.scrollContainer.height = Ti.UI.SIZE;
}
function addAnotherIdProof(){
	var dialog = Ti.UI.createAlertDialog({
    	cancel: 1,
    	buttonNames: ['Confirm', 'Cancel'],
    	message: 'Please upload the other side of id proof',
    	title: 'Tutme'
	});
	dialog.show();
	dialog.addEventListener('click',function(e){
    	if (e.index === e.source.cancel){
        	Ti.API.info('The cancel button was clicked');
    	}else{
    		require('androidCameraDialogs').showDialogs({
				success : recieveSecondIdProofCallback
			});
    	}
    	Ti.API.info('e.cancel: ' + e.cancel);
    	Ti.API.info('e.source.cancel: ' + e.source.cancel);
    	Ti.API.info('e.index: ' + e.index);
	});
}

