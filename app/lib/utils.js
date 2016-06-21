var appKey = require("appKey");
var map = require('Map');
exports.replaceCentralView = function(params) {
	//var slider = Alloy.Globals.slider;
	var mainView = Alloy.Globals.centralView;
	var replacedView = params.view;

	if (mainView && mainView.windowView && mainView.children[0]) {
		mainView.remove(mainView.windowView);
		mainView.removeAllChildren();
		mainView.windowView = null;
	}
	if (Alloy.Globals.actionBar) {
		var _title = params.title || "";
		Alloy.Globals.actionBar.setTitle(_title);
	}
	mainView.height = Ti.UI.FILL;
	mainView.add(replacedView);
	mainView.windowView = replacedView;
	//slider.toggleLeftWindow();
	//slider = null;
	mainView = null;
	replacedView = null;
};

// function to accept option and return dialog

exports.createDailog = function(opts) {
	return Ti.UI.createOptionDialog(opts);
};

//   Floating Button

exports.addFloatingButton = function(params) {
	var parentView = params.view;
	var floatingView = Titanium.UI.createView({
		backgroundImage : '/images/gps.png',
		width : 50,
		height : 50,
		right : 50,
		bottom : 50,
		borderRadius : 35,
		viewShadowRadius : 4,
		viewShadowColor : 'gray',
		zIndex : '999'
	});
	parentView.add(floatingView);
	floatingView.addEventListener('click', function(e) {
		parentView.removeAllChildren();
		map.showMap();
	});
};

exports.setLoginStatus = function() {
	if (!Alloy.Globals.getData(appKey.KEYS.LOGINSTATUS)) {
		Alloy.Globals.setData(appKey.KEYS.LOGINSTATUS, true);
	}
};

exports.setRegistrationStatus = function() {
	if (!Alloy.Globals.getData(appKey.KEYS.REGISTRATIONCOMPLETE)) {
		Alloy.Globals.setData(appKey.KEYS.REGISTRATIONCOMPLETE, true);
	}
};
var setPropertiesNull = function() {
	var appKeys = require("appKey").KEYS;
	var keyArray = [appKeys.LOGINSTATUS, appKeys.TUTORPROFILEUPDATE, appKeys.USERTYPE, appKeys.REGISTRATIONCOMPLETE];

	_.each(keyArray, function(key, index) {
		Ti.API.error(" index " + index + "   key  " + key);
		Alloy.Globals.setData(key, null);
	});
};
exports.setPropertiesNull = setPropertiesNull;

exports.logout = function(e) {
	var logoutDailog = Ti.UI.createAlertDialog({
		cancel : 1,
		buttonNames : ['Logout', 'Cancel'],
		message : 'Are you sure you want to Logout ?',
		title : 'Tutme'
	});
	logoutDailog.show();
	logoutDailog.addEventListener('click', function(e) {
		if (e.index === e.source.cancel) {
			Ti.API.info('The cancel button was clicked');
		} else {
			var win = Alloy.createController("authentication/login").getView();
			win.open();
			Alloy.Globals.currentWindow.close();
			setPropertiesNull();
		}
	});
};

// Open Calender 
/*exports.openCalender = function() {
	var dob ;
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
			}
		}
		
	});
	return dob;
};*/

exports.Loading = function(){
	this.Loading = Alloy.createController("Widgets/Loading");
};
