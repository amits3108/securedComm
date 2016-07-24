var utils = require("utils");
var validation = require("validation");
var network = require("network");
var appKey = require("appKey");

$.registerNow.addEventListener('click', function(e) {
	Ti.API.info("**************");
	openRegisterAsScreen();
});

function openRegisterAsScreen(params) {
	var win = Alloy.createController("authentication/registerAs", {
		params : params,
		closeLoginScreen : closeLoginScreen
	}).getView();
	win.open();
}

function closeLoginScreen() {
	$.loginScreen.close();
}

function onLoginClick() {
	//utils.Loading.showSpinner();
	var user = {};
	var email = ($.emailAddress.value).trim();
	var password = $.password.value;
	/*var emailValid = validation.validateEmail({
		email : email
	});*/
	if (email.length > 1 /*&& emailValid*/) {
		user.email = email.toLowerCase();
		if (password.length > 1) {
			/*var win = Alloy.createController("sliderContent/slider").getView();
			win.open();
			utils.setLoginStatus();
			closeLoginScreen();*/
			if (Titanium.Network.online) {
				var requestData = {// email, password
					username : email,
					password : password
				};
				network.postRequest({
					type : "POST",
					url : Alloy.CFG.URL.login,
					requestData : requestData,
					requestHeaders : {
						"public-key" : "c8a1ad1332716aa15752422360e739a5",
						"token" : "72dd0dbc65b5e19d4b086c6f89b16203_123",//"79c74e91e49b623f6ea02435e2725"
					},
					callBack : callBack,
				});

			} else {
				alert("Internet is not available");
			}
		} else {
			alert("Please enter password");
		}
	} else {
		alert("Please enter valid email address");
		return false;
	}
}

function callBack(json) {
	Ti.API.info("login callback : \n " + JSON.stringify(json));
	//utils.Loading.hideSpinner();
	if (json && (parseInt(json.status_code) == 200) && (!json.error)) {
		utils.setLoginStatus();
		if(json.data && json.data.user_type && json.data.user_type == 1 || "1"){
			Ti.API.info("student login");
			Alloy.Globals.setData(appKey.KEYS.USERTYPE, "student");
		}else{
			Ti.API.info("tutor login");
			Alloy.Globals.setData(appKey.KEYS.USERTYPE, "tutor");
		}
		
		setUserValues({
			full_name : json.data.full_name,
			email : json.data.email,
		});
		
		var win = Alloy.createController("sliderContent/slider",{
			closeLoginScreen : closeLoginScreen
		}).getView();
		win.open();
		/*setTimeout(function(){
			closeLoginScreen();	
		},1500);*/
		
		
		Ti.API.info("Register successfully");
	} else {
		//json && !(_.isEmpty(json)) && alert(json.message);
		_.isEmpty(json) && alert("Unable to complete registration. Please try again later.");
		if(json && json.error){
			if(json.message){
				alert(json.message+"");
			}else{
				alert("Something went wrong, Please try again");
			}
		}
		Ti.API.error("error found");
	}
}

function setUserValues(params) {
	var user = {};
	user.name = params.full_name;
	user.email = params.email;
	Alloy.Globals.setData(appKey.USER, user);
}