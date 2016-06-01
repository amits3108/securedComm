function showSpinner() {
	var winOpenParam;
	if(OS_ANDROID){
		winOpenParam = {
			activityEnterTransition : Titanium.UI.Android.TRANSITION_NONE
		};
	}else{
		winOpenParam = {};
	}
	$.loading.open(winOpenParam);
	$.activityIndicator.show();
}

function hideSpinner() {
	$.activityIndicator.hide();
	$.loading.close();
	$.infoLabel.width = 0;
	$.square.width = 100;
	$.infoLabel.text = "";
}

function setText(text) {
	if (text != '') {
		$.infoLabel.width = 160;
		$.square.width = 160;
		$.infoLabel.text = text;
	}
}

function androidback() {
	Ti.API.info("please wait...");
};

$.loading.addEventListener("open", function(e) {
	if (OS_ANDROID) {
		var activity = $.loading.getActivity();
		if (activity != undefined && activity.actionBar != undefined) {
			activity.actionBar.setTitle("Secured Text");
		}
	}
});

exports.showSpinner = showSpinner;
exports.hideSpinner = hideSpinner;
exports.setText = setText;
