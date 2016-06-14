var social = require("social");
var linkedin = social.create({
	consumerSecret : "s7ZV7hViil2DaqPp",
	consumerKey : "75c5prnmkejwoe",
	site : 'linkedin'
});
var accessLinkedInProfileDailog = Ti.UI.createAlertDialog({
	cancel : 1,
	buttonNames : ['Confirm', 'Cancel'],
	message : 'Tutme would like access your LinkedIn profile.',
	title : 'Tutme'
});

var accessLinkedInProfile = function(e) {
	accessLinkedInProfileDailog.show();
	accessLinkedInProfileDailog.addEventListener('click', function(e) {
		if (e.index === e.source.cancel) {
			Ti.API.info('The cancel button was clicked');
		} else {
			linkedin.getProfileLinkedin({
				message : "messageContent",
				success : function(e) {
					response = JSON.stringify(e);
					Ti.API.info(response.siteStandardProfileRequest + "****" + e.firstName + "response" + JSON.stringify(e));
				},
				error : function(e) {
					Ti.API.info("Error while posting" + JSON.stringify(e));
				}
			});
		}
	});
};
