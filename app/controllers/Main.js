var utils = require("utils");
// Load module
var TiDrawerLayout = require('com.tripvi.drawerlayout');
var menuTable = Alloy.createController('menu').getView();
Alloy.Globals.centralView = Ti.UI.createView({
	backgroundColor : 'white',
});
var Map = require('ti.map');
var mountainView = Map.createAnnotation({
	latitude : 37.390749,
	longitude : -122.081651,
	title : "Appcelerator Headquarters",
	subtitle : 'Mountain View, CA',
	pincolor : Map.ANNOTATION_RED,
	myid : 1 // Custom property to uniquely identify this annotation.
});

var mapview = Map.createView({
	mapType : Map.NORMAL_TYPE,
	region : {
		latitude : 33.74511,
		longitude : -84.38993,
		latitudeDelta : 0.01,
		longitudeDelta : 0.01
	},
	animate : true,
	regionFit : true,
	userLocation : true,
	annotations : [mountainView]
});

var circle = Map.createCircle({
	center : {
		latitude : 33.74511,
		longitude : -84.38993
	},
	radius : 1000, //1km
	fillColor : "#20FF0000"
});
mapview.addCircle(circle);
Alloy.Globals.centralView.add(mapview);
utils.addFloatingButton({
	view : Alloy.Globals.centralView
});
Alloy.Globals.slider = TiDrawerLayout.createDrawer({
	leftView : menuTable,
	centerView : Alloy.Globals.centralView,
	leftDrawerWidth : '240dp',
	width : Ti.UI.FILL,
});
$.mainWindow.add(Alloy.Globals.slider);

Alloy.Globals.slider.addEventListener('click', function(e) {
	Alloy.Globals.slider.toggleLeftWindow();
});


function onMainWinOpen(evt) {
	//var self = this;
	//this.removeEventListener('open', onNavDrawerWinOpen);
	var activity = this.getActivity();
	Alloy.Globals.activity = activity;
	Alloy.Globals.actionBar = activity.actionBar;
	if (activity) {
		//Everytime when launch the app.
		//Alloy.Globals.slider.toggleLeftWindow();
		var actionBar = activity.getActionBar();
		Alloy.Globals.actionBar = actionBar;
		if (actionBar) {
			//var _title = Alloy.Globals.getData(_notify_keys.KEYS.LOGINSTATUS) ? moment().format("dddd, MMM DD, YYYY") : "";
			//actionBar.setTitle(_title);
			//When app is launch than its notifiaction home page will contain the date title
			//actionBar.icon = "/images/actionbarappicon.png";
			actionBar.setOnHomeIconItemSelected(function() {
				Alloy.Globals.slider.toggleLeftWindow();
				Ti.API.info("  defined in window open function ");
				//self.fireEvent('focus');
			});
		}
	}
}
