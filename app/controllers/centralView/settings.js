var utils = require("utils");
var rowtitle = [{
	title : "Profile"
},{
	title : "About us"
}, {
	title : "Terms And Conditions "
}, {
	title : "Policies"
}, {
	title : "Agreement"
}];
var len = rowtitle.length;
for (var i = 0; i < len; i++) {
	var tableRow = createSettingRow({
		settingLabel : rowtitle[i].title,
	});
	$.settingsTable.appendRow(tableRow);
}
function createSettingRow(params) {
	var params = params || {};

	var tableViewRow = Ti.UI.createTableViewRow({
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL,
	});
	var viewContainer = Ti.UI.createView({
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL,
		backgroundColor : "#FFF",
		borderColor : Alloy.CFG.themeColor,
		borderRadius : 4,
		borderWidth : 3,
		layout : "vertical",
		top : 15
	});

	var start_double_quotes = Ti.UI.createImageView({
		image : "/images/start_double_quotes.png",
		height : 20,
		width : 20,
		top : 10,
		left : 5,
	});
	viewContainer.add(start_double_quotes);

	var settingLabel = Ti.UI.createLabel({
		text : params.settingLabel,
		color : "#1BB4C6",
		font : {
			fontSize : 20,
			fontWeight : 'bold'
		},
		//left : 5,
		top : 10,
		textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER
	});
	viewContainer.add(settingLabel);

	var end_double_quotes = Ti.UI.createImageView({
		image : "/images/end_double_quotes.png",
		height : 20,
		width : 20,
		top : 10,
		right : 5,
		bottom : 10
	});
	viewContainer.add(end_double_quotes);
	tableViewRow.add(viewContainer);
	return tableViewRow;
}
$.settingsTable.addEventListener('click',function(e){
	if(e.index == 0){
		var view = Alloy.createController("centralView/profile").getView();
		title = "Profile";
		utils.replaceCentralView({
			view : view,
			title : title
		});
	}
	else if(e.index == 1){
		var Agreementwin = Alloy.createController("centralView/settings/Aboutus").getView();
		Agreementwin.open();
	}
	else if(e.index == 2){
		var Policiesswin = Alloy.createController("centralView/settings/Aboutus").getView();
		Policiesswin.open();
	}
	else if(e.index == 3){
		var Policiesswin = Alloy.createController("centralView/settings/Aboutus").getView();
		Policiesswin.open();
	}
	else{
		var termsconditionswin = Alloy.createController("centralView/settings/Aboutus").getView();
		termsconditionswin.open();
	}
});
