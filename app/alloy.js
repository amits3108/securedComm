// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};
//Set Data In Application Local Storage
var setData = function(key, values) {
	Ti.API.info("setting " + key + " info");
	var stringified = JSON.stringify(values);
	Ti.App.Properties.setString(key, stringified);
};

//Get Data In Application Local Storage
var getData = function(key) {
	var stringifiedValue = Ti.App.Properties.getString(key, null);
	if (stringifiedValue) {
		return JSON.parse(stringifiedValue);
	} else {
		return null;
	}
};


// Alloy.CFG.themeColor = "#1BB4C6";
// Alloy.CFG.lightBlueColor ="#B2DAF6";
// Alloy.CFG.yellowColor = "#FFA835";
// Alloy.CFG.darkYellow = "#F1E500";

Alloy.CFG = {
	themeColor : "#1BB4C6",
	lightBlueColor : "#B2DAF6",
	yellowColor : "#FFA835",
	darkYellow : "#F1E500",
};

var platformHeight = OS_IOS ? Ti.Platform.displayCaps.platformHeight - 20 : Ti.Platform.displayCaps.platformHeight;
var os_version = Ti.Platform.version;

Alloy.Globals.platformWidth = Ti.Platform.displayCaps.platformWidth;
Alloy.Globals.platformHeight = platformHeight;
Alloy.Globals.setData = setData;
Alloy.Globals.getData = getData;


//const baseURL = "";		//TODO : Stagging Server
const baseURL = "api.tutme.in/index.php/user/";           //TODO : Development Server
//const baseURL = "";					//TODO : Local Server

Alloy.CFG.URL = {
	register : baseURL + "register",
	login : baseURL + "login",
	update_profile : baseURL + "update_profile"
};
