// Arguments passed into this controller can be accessed via the `$.args` object
// directly or:
var args = $.args;
var utils = require ("utils");
var network = require ("network");
var appKey = require ("appKey");

var user = Alloy.Globals.getData (appKey.USER, user);
if (user && user.phone) {
	$.phoneNoLabel.text = user.phone;
}

function onResendClick () {
	alert ("New OTP will be sent to your device");
}

function onSubmitClick () {
	Alloy.createController ("authentication/profileNavigator").getView ().open ();
	closeOTPScreen ();
}

function closeOTPScreen () {
	$.otpScreen.close ();
}

$.otpScreen.addEventListener ('androidback', function () {
	Ti.API.info ("you cannot go back");
});


//TODO : change submit button action by this function
function onSubmitClick11 () {
	var otp = ($.otpCodeField.value).trim ();
	if (otp.length == 6) {
		if (Titanium.Network.online) {
			utils.showLoading ();
			var requestData = {// email
				otp : otp,
			};
			//TODO : change url after server side work will be completed.
			network.postRequest ({
				type : "POST",
				url : Alloy.CFG.URL.login,
				requestData : requestData,
				requestHeaders : {
					"public-key" : "c8a1ad1332716aa15752422360e739a5",
					"token" : "72dd0dbc65b5e19d4b086c6f89b16203_123",
				},
				callBack : otpCallBack,
			});

		}
		else {
			alert ("Internet is not available");
		}
	}
	else {
		alert ("Please enter valid OTP number");
		return false;
	}
}

function otpCallBack (json) {
	var json = json || {};
	utils.hideLoading();
	if (json && (parseInt(json.status_code) == 200) && (!json.error)) {
		if (json.data) {
			/*if (json.data && json.data.user_type && json.data.user_type == "1") {
				Ti.API.info("student login");
				Alloy.Globals.setData(appKey.KEYS.USERTYPE, "student");
			} else {
				Ti.API.info("tutor login");
				Alloy.Globals.setData(appKey.KEYS.USERTYPE, "tutor");
			}

			setUserValues({
				full_name : json.data.full_name,
				email : json.data.email,
				user_type : json.data.user_type,
				phone : (json.data.phone) ? json.data.phone : "",
				user_id : json.data.id,
			});*/
		}

		/*var win = Alloy.createController("sliderContent/slider", {
			closeLoginScreen : closeLoginScreen
		}).getView();
		win.open();*/
		Ti.API.info("callBackForgetPassword successfully  "+JSON.stringify(res));
	} else {
		//json && !(_.isEmpty(json)) && alert(json.message);
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
