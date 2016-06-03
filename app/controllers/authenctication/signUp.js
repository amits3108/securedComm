// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var social = require("social");
var utils = require("utils");
var network = require("network");
$.signUpWin.addEventListener('open', function(e) {
	var params = params || {};
	Ti.API.info("========Params===============" + JSON.stringify(args));
});
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

$.login.addEventListener('click', function(e) {
	var win = Alloy.createController("authenctication/login").getView();
	win.open();
});

// API call for registration
function register() {
	var requestData = {// email, mobile, name, user_type,  password
		email : $.emailAddress.value,
		mobile : $.phoneNo.value,
		name : $.name.value,
		user_type : "student",
		//userDeviceToken : Alloy.Globals.getData("deviceId") || "",
		password : $.password.value
	};
	network.postRequest({
		type : "POST",
		url : "api.tutme.in/user/register", //Alloy.CFG.URL.register,
		requestData : requestData,
		requestHeaders : {
			//"Content-Type" : "application/json",
			"public-key" : "c8a1ad1332716aa15752422360e739a5",
            "token" : "bd879c74e91e49b623f6ea02435e2725"
		},
		callBack : callBack,
	});
	
};

function callBack(json) {
	Ti.API.info("register callback : \n " + JSON.stringify(json));
	if (json && (parseInt(json.status) == 200) && (!json.error)) {
		/*utils.replaceCentralView({
			view : Alloy.createController("registrationprocess/OTPScreen").getView(),
		});*/
		Ti.API.info("goes to OTP screen");
	} else {
		//json && !(_.isEmpty(json)) && alert(json.message);
		_.isEmpty(json) && alert("Unable to complete registration. Please try again later.");
		Ti.API.info("error found");
	}
}

function onRegisterClick() {
	var win = Alloy.createController("Main").getView();
	win.open();
}