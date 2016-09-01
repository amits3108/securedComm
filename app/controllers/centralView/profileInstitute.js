var args = $.args;
var appKey = require("appKey");
var social = require("social");
var utils = require("utils");
setValues();
var LinkedInClick = function() {
	utils.accessLinkedInProfile();
};
function setValues() {
	var user = Alloy.Globals.getData(appKey.USER);
	if (user) {
		$.emailAddress.value = user.email;
		$.contactNo.value = user.phone;
	}
};
// name,emailAddress,address_permanent,contactNo,aboutYourSelf,subjects
var onSubmit = function(e) {
	//if (($.name.value.length > 0) && ($.emailAddress.value.length > 0) && ($.address_permanent.value.length > 0) /*&& ($.contactNo.value.length > 0) && ($.aboutYourSelf.length > 0) && ($.subjects.value.length > 0)*/) {
	if (!Alloy.Globals.getData(appKey.KEYS.REGISTRATIONCOMPLETE)) {
		utils.setRegistrationStatus();
		var win = Alloy.createController("sliderContent/slider").getView();
		win.open();
		args && args.closeNewTutorProfileScreen && args.closeNewTutorProfileScreen();
	} else {
		alert("Profile updated successfully.");
	}
	// } else {
	// //alert('Please fill the details to complete your Registration.');
	// alert('Please fill the name, email and permanent address field ');
	// }
};
// adding dynamic views to scrollableview
$.cameraIcon.addEventListener('click', function(e) {
	var gallerypicker = require('titutorial.gallerypicker');
	var win = Ti.UI.createWindow({
		backgroundColor : 'white',
		navBarHidden : true,
		layout : "vertical"
	});

	var gallerypicker = require('titutorial.gallerypicker');
	Ti.API.info("module is => " + gallerypicker);

	var open = Ti.UI.createButton({
		title : 'open',
		height : '50dp',
		width : '150dp',
		top : '40dp'
	});
	win.add(open);

	var scrollview = Ti.UI.createScrollView();
	win.add(scrollview);

	var imageHolder = Ti.UI.createView({
		top : '10dp',
		backgroundColor : '#ccc',
		layout : "horizontal"
	});
	scrollview.add(imageHolder);

	open.addEventListener('click', function() {
		gallerypicker.openGallery({
			cancelButtonTitle : "Cancel",
			doneButtonTitle : "Okay",
			title : "Custom Gallery",
			errorMessage : "Limit reached",
			limit : 5,
			success : function(e) {
				Ti.API.info("@@## response is => " + JSON.stringify(e));

				var imgArray = e.filePath.split(",");
				Ti.API.info("@@## imgArray.length = " + imgArray.length);

				for (var i = 0; i < imgArray.length; i++) {
					if (imgArray[i]) {
						var imgView = Ti.UI.createImageView({
							left : '10dp',
							top : '10dp',
							image : gallerypicker.decodeBitmapResource(imgArray[i], 100, 100)
						});
						imageHolder.add(imgView);
					}
				}
			},
			error : function(e) {
				alert("error => " + JSON.stringify(e));
				Ti.API.info("@@## error is => " + JSON.stringify(e));
			},
			cancel : function(e) {
				alert("cancel => " + JSON.stringify(e));
				Ti.API.info("@@## cancel is => " + JSON.stringify(e));
			}
		});
	});

	win.open();
});

var numberOfImages = 5,
    data = [];
for ( i = 0; i < 5; i++) {
	var view = Ti.UI.createView();
	//view.setBackgroundColor(getRandomColor());
	data.push(view);
};
$.scrollableView.setViews(data);

function getRandomColor() {
	var letters = '0123456789ABCDEF'.split('');
	var color = '#';
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}