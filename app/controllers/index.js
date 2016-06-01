
var win = Alloy.createController("authenctication/signUp").getView();
//var win = Alloy.createController("Main").getView();
win.open();

/*var openAndroidSlider = function() {
	if (OS_IOS) {
		return;
	}
	var win = Ti.UI.createWindow({
		//backgroundColor : '#fff',
		//softKeyboardOnFocus : Titanium.UI.Android.SOFT_KEYBOARD_HIDE_ON_FOCUS,
		orientationModes : [Titanium.UI.PORTRAIT],
		exitOnClose : true
	});
	Alloy.Globals.currentWindow = win;
	// Load module
	var TiDrawerLayout = require('com.tripvi.drawerlayout');

	//var centralView = Alloy.createController('notifySliderContent/centerWindowView').createCenterView();
	//Alloy.Globals.slider.setCenterWindow(centralView);
	var centralView = Ti.UI.createView({
		height : Ti.UI.FILL,
		width  : Ti.UI.FILL,
		backgroundColor : "green"
	});
	
	//var leftMenuView = Alloy.createController('notifySliderContent/leftWindowView').getView();
	//Alloy.Globals.slider.setLeftWindow(leftMenuView);
	var leftMenuView = Ti.UI.createView({
		height : Ti.UI.FILL,
		width  : Ti.UI.FILL,
		backgroundColor : "yellow"
	});

	// create the Drawer
	Alloy.Globals.slider = TiDrawerLayout.createDrawer({
		leftView : leftMenuView,
		centerView : centralView,
		leftDrawerWidth : "270dp",
		width : Ti.UI.FILL,
		height : Ti.UI.FILL
	});

	// add some listeners
	Alloy.Globals.slider.addEventListener('draweropen', function(e) {
		// drawer is open
	});

	Alloy.Globals.slider.addEventListener('drawerclose', function(e) {
		// drawer is closed
	});

	Alloy.Globals.slider.addEventListener('drawerslide', function(e) {
		// drawer is sliding
		// slide offset: e.offset
	});

	// add the drawer to your root window
	win.add(Alloy.Globals.slider);

	// open the window
	win.open();

	//win.addEventListener('open', onNavDrawerWinOpen);
	win.addEventListener('close', function(e) {
		win = null;
		Alloy.Globals.slider = null;
		Alloy.Globals.activity = null;
		Alloy.Globals.actionBar = null;
	});


};
//exports.openAndroidSlider = openAndroidSlider;
openAndroidSlider();
exports.openslider = function() {
	if (OS_ANDROID) {
		openAndroidSlider();
	}
};
*/