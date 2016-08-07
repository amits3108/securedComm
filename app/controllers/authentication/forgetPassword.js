// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var utils = require("utils");
var network = require("network");
var appKey = require("appKey");


function onSubmitClick(){
	var email = ($.emailAddress.value).trim();
	if (email.length > 1) {
		if (Titanium.Network.online) {
				utils.showLoading();
				var requestData = {// email
					username : email.toLowerCase(),
				};
				network.postRequest({
					type : "POST",
					url : Alloy.CFG.URL.login,  //TODO : change url after server side work will be completed.
					requestData : requestData,
					requestHeaders : {
						"public-key" : "c8a1ad1332716aa15752422360e739a5",
						"token" : "72dd0dbc65b5e19d4b086c6f89b16203_123",//"79c74e91e49b623f6ea02435e2725"
					},
					callBack : callBackForgetPassword,
				});

			} else {
				alert("Internet is not available");
			}
	} else {
		alert("Please enter valid email address");
		return false;
	}
}

function callBackForgetPassword(json){
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
