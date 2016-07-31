var win;
exports.showSpinner = function () {
	win = Ti.UI.createWindow ({
		backgroundColor : 'transparent',
		fullscreen : true
	});

	var activityIndicator = Ti.UI.createActivityIndicator ({
		color : '#000',
		font : {
			fontFamily : 'Helvetica Neue',
			fontSize : 26,
			fontWeight : 'bold'
		},
		message : 'Loading...',
		//style : Ti.UI.ActivityIndicatorStyle.DARK,
		height : Ti.UI.SIZE,
		width : Ti.UI.SIZE
	});

	// The activity indicator must be added to a window or view for it to appear
	win.add (activityIndicator);

	// eventListeners must always be loaded before the event is likely to fire
	// hence, the open() method must be positioned before the window is opened
	win.addEventListener ('open', function (e) {
		activityIndicator.show ();
		// do some work that takes 6 seconds
		// ie. replace the following setTimeout block with your code
		/*setTimeout (function () {
			e.source.close ();
			activityIndicator.hide ();
		}, 6000);*/
	});

	win.open ();
};

exports.hideSpinner = function(){
	if(win){
		win.close();
	}
};

