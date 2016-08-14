var measurement = require('alloy/measurement');
// workaround to 'alloy is not defined'
Ti.API.info("456564654646");
var Alloy = require('alloy'), _ = require("alloy/underscore")._;
Alloy.Globals.platformWidthInPixels = measurement.dpToPX(Alloy.Globals.platformWidth);
var callback = null;
var pickerCallback = function(e) {
	if (e.index == 0) {
		// show the camera
		Ti.Media.showCamera({
			success : cameraCallback,
			cancel : cameraCancel,
			error : cameraError,
			saveToPhotoGallery : false,
			allowEditing : false,
			mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO]
		});
	} else if (e.index == 1) {
		// Image Gallery
		Ti.Media.openPhotoGallery({
			success : cameraCallback,
			cancel : cameraCancel,
			error : cameraError,
			allowEditing : false,
			mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO]
		});
	}
};

var cameraError = function(error) {
	var message;
	if (error.code == Ti.Media.NO_CAMERA) {
		message = 'Please run this test on device';
	} else {
		message = 'Unexpected error: ' + error.code;
	}
	Ti.App.fireEvent('error.show', {
		message : message
	});
};

var cameraCancel = function() {
	// Do Nothing
};

var cameraCallback = function(e) {
	//Ti.API.info("e value is : "+JSON.stringify(e));
	if (e.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
		Ti.API.info("e.media : "+JSON.stringify(e));
		var image;
		var rawImage = e.media;
		var imageWidth = rawImage.width;
		var imageHeight = rawImage.height;
		var maxSize = 1.6 * Alloy.Globals.platformWidthInPixels;
		if (imageWidth > maxSize) {
			var amountToTrim = imageWidth / maxSize;
			var newWidth = imageWidth / amountToTrim;
			var newHeight = imageHeight / amountToTrim;
			image = rawImage.imageAsResized(newWidth, newHeight);
		} else {
			image = rawImage;
		}
		if (callback) {
			callback(image);
		}
	}

};
var existingCallBack = function(e) {
	if (e.index == 0) {
		callback("remove");
	} else if (e.index == 1) {
		callback("replace");
	}
};
exports.showDialogs = function(params) {
	callback = params.success || null;
	var dialog = Ti.UI.createOptionDialog({
		options : ['Camera', 'Gallery', 'cancel'],
		cancel : 2
	});
	dialog.addEventListener('click', pickerCallback);
	dialog.show();
};

exports.showExistingDialogs = function(params) {
	callback = params.success || null;
	var dialog = Ti.UI.createOptionDialog({
		options : ['remove', 'replace', 'cancel'],
		cancel : 2
	});
	dialog.addEventListener('click', existingCallBack);
	dialog.show();
};
