exports.replaceCentralView = function(params) {
	var slider = Alloy.Globals.slider;
	var mainView = Alloy.Globals.centralView;
	var replacedView = params.view;

	if (mainView && mainView.windowView && mainView.children[0]) {
		mainView.remove(mainView.windowView);
		mainView.windowView = null;
	}
	if (Alloy.Globals.actionBar) {
		var _title = params.title || "";
		Alloy.Globals.actionBar.setTitle(_title);
	}
	mainView.height = Ti.UI.FILL;
	mainView.add(replacedView);
	mainView.windowView = replacedView;
	slider.toggleLeftWindow();
	slider = null;
	mainView = null;
	replacedView = null;
};


// function to accept option and return dialog

exports.createDailog = function(opts){
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
		viewShadowColor : 'gray'
	});
	parentView.add(floatingView);
};


function Utils() {
	this.Loading = Alloy.createController("Widgets/Loading");
}
Utils.getInstance = function() {
	var singletonClass = new Utils();
	return singletonClass;
};