// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var social = require("social");
var utils = require("utils");
var network = require("network");
var validation = require("validation");
var appKey = require("appKey");

function onSignUpOpen(params) {
	var params = params || {};
	//Ti.API.info(JSON.stringify(params) + "========Params===============" + JSON.stringify(args));
}

function closeSignUpScreen(e) {
	//Ti.API.info("========closeSignUpScreen===============" + JSON.stringify(e));
	$.signUpWin.close();
}

function openLoginScreen() {
	Alloy.createController("authentication/login").getView().open();
	closeSignUpScreen();
}

$.signUpWin.addEventListener('open', onSignUpOpen);
$.signUpWin.addEventListener('androidback', closeSignUpScreen);
$.login.addEventListener('click', openLoginScreen);

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
	openTutorProfile();
	//utils.Loading.showSpinner();
	// var user = {};
	// var email = ($.emailAddress.value).trim();
	// var emailValid = validation.validateEmail({
	// email : email
	// });
	// var phone = validation.validateNumber({
	// phone : $.phoneNo.value
	// });
	// Ti.API.info(phone + "             " + $.phoneNo.value);
	// if ($.name.value.length > 1) {
	// if (email.length > 1 && emailValid) {
	// if (phone) {
	// if ($.password.value.length > 1) {
	// user.email = email.toLowerCase();
	//
	// var user_type = null;
	// if (Alloy.Globals.getData(appKey.KEYS.USERTYPE) == "student") {
	// user_type = 1;
	// } else {
	// user_type = 2;
	// }
	//
	// if (Titanium.Network.online) {
	//
	// var requestData = {// email, mobile, name, user_type,  password
	// email : email,
	// mobile : $.phoneNo.value,
	// name : $.name.value,
	// user_type : user_type, //"student",
	// //userDeviceToken : Alloy.Globals.getData("deviceId") || "",
	// password : $.password.value
	// };
	// network.postRequest({
	// type : "POST",
	// url : Alloy.CFG.URL.register,
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
	// } else {
	// alert("Please enter password");
	// }
	// } else {
	// alert("Please enter Phone Number");
	// }
	//
	// } else {
	// alert("Please enter valid email address");
	// return false;
	// }
	// } else {
	// alert("Please enter valid name");
	// return false;
	// }
};

function callBack(json) {
	Ti.API.info("register callback : \n " + JSON.stringify(json));
	//utils.Loading.hideSpinner();
	if (json && (parseInt(json.status_code) == 200) && (!json.error)) {
		openTutorProfile();
		var user = Ti.App.Properties.getObject('user');
		user.name = $.name.value;
		user.email = ($.emailAddress.value).trim();
		user.phone = $.phoneNo.value;
		Ti.App.Properties.setObject('user', user);
		Ti.API.info("Register successfully");
	} else {
		//json && !(_.isEmpty(json)) && alert(json.message);
		_.isEmpty(json) && alert("Unable to complete registration. Please try again later.");
		Ti.API.error("error found");
	}
}

function onRegisterClick() {
	register();
	//openTutorProfile();
}

function openTutorProfile() {
	utils.setLoginStatus();
	var user = Ti.App.Properties.getObject('user');
	user.name = $.name.value;
	user.email = ($.emailAddress.value).trim();
	user.phone = $.phoneNo.value;
	Ti.App.Properties.setObject('user', user);
	Alloy.createController("authentication/newTutorProfile").getView().open();
	closeSignUpScreen();
}

