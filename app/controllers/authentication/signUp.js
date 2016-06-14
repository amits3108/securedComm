// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var social = require("social");
var utils = require("utils");
var network = require("network");
var validation = require("validation");

function onSignUpOpen(params) {
	var params = params || {};
	Ti.API.info(JSON.stringify(params) + "========Params===============" + JSON.stringify(args));
}

function closeSignUpScreen(e) {
	Ti.API.info("========closeSignUpScreen===============" + JSON.stringify(e));
	$.signUpWin.close();
}

$.signUpWin.addEventListener('open', onSignUpOpen);
$.signUpWin.addEventListener('androidback', closeSignUpScreen);
$.login.addEventListener('click', closeSignUpScreen);

var linkedin = social.create({
	consumerSecret : "s7ZV7hViil2DaqPp",
	consumerKey : "75c5prnmkejwoe",
	site : 'linkedin'
});
$.linkedIn.addEventListener('click', function(e) {
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
});

// API call for registration
function register() {
	var user = {};
	var email = ($.emailAddress.value).trim();
	var emailValid = validation.validateEmail({
		email : email
	});
	var phone = validation.validateNumber({
		phone : $.phoneNo.value
	});
	Ti.API.info(phone+"             "+$.phoneNo.value);
	if ($.name.value.length > 1) {
		if (email.length > 1 && emailValid) {
			if (phone) {
				if ($.password.value.length > 1) {
					user.email = email.toLowerCase();
					var requestData = {// email, mobile, name, user_type,  password
						email : emailValid,
						mobile : phone,
						name : $.name.value,
						user_type : 1, //"student",
						//userDeviceToken : Alloy.Globals.getData("deviceId") || "",
						password : $.password.value
					};
					network.postRequest({
						type : "POST",
						url : Alloy.CFG.URL.register,
						requestData : requestData,
						requestHeaders : {
							//"Content-Type" : "application/json",
							"public-key" : "c8a1ad1332716aa15752422360e739a5",
							"token" : "72dd0dbc65b5e19d4b086c6f89b16203_123",//"79c74e91e49b623f6ea02435e2725"
						},
						callBack : callBack,
					});
				} else {
					alert("Please enter password");
				}
			} else {
				alert("Please enter Phone Number");
			}

		} else {
			alert("Please enter valid email address");
			return false;
		}
	} else {
		alert("Please enter valid name");
		return false;
	}
};

function callBack(json) {
	Ti.API.info("register callback : \n " + JSON.stringify(json));
	if (json && (parseInt(json.status) == 200) && (!json.error)) {
		//onRegisterClick();
		Ti.API.info("Register successfully");
	} else {
		//json && !(_.isEmpty(json)) && alert(json.message);
		_.isEmpty(json) && alert("Unable to complete registration. Please try again later.");
		Ti.API.error("error found");
	}
}

function onRegisterClick() {
	/*utils.setLoginStatus();
	 var win = Alloy.createController("sliderContent/slider").getView();
	 win.open();*/
	//register();
	openTutorProfile();
}

function openTutorProfile(){
	utils.setLoginStatus();
	Alloy.createController("authentication/tutorProfile").getView().open();
}

