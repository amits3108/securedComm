var args = $.args;
var appKey = require("appKey");
var social = require("social");
var utils = require("utils");
setValues();
var LinkedInClick = function() {
	utils.accessLinkedInProfile();
};
function setValues(){
	var user = Ti.App.Properties.getObject('user');
	$.name.value = user.name;
	$.emailAddress.value = user.email;
	$.contactNo.value = user.phone;
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
var numberOfImages = 5,data = [];
for( i = 0 ; i < 5 ; i++){
	var view = Ti.UI.createView();
	view.setBackgroundColor(getRandomColor());
	data.push(view);
};
$.scrollableView.setViews(data);

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
