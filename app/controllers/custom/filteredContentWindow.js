// Arguments passed into this controller can be accessed via the `$.args` object
// directly or:
var args = $.args;
var map = require('Map');

var isFilterList = true;

if (args.screenType == "tutorProfileScreen") {
	hideFilteredList();
	addProfileView();
} else {
	filteredRowUI();
	showFilteredList();
}
$.filteredListTable.filterAttribute = "title";
////////////    require the UI of each List row in table   ///////////////
Ti.API.error(JSON.stringify(Ti.App.Properties.getObject("tutorData")));
function dataOfRow() {
	var data = Ti.App.Properties.getObject("tutorData");
	return data;
}

function filteredRowUI(params) {
	var params = params || {};

	var rowsData = dataOfRow();
	var total = rowsData.length;

	for (var i = 0; i < total; i++) {
		var filteredRow = Alloy.createController("custom/filteredRow", rowsData[i]).getView();
		var tableRow = Titanium.UI.createTableViewRow({
			height : 120,
			width : Titanium.UI.FILL,
			backgroundColor : "transparent",
		});
		tableRow.title = rowsData[i].full_name;
		tableRow.add(filteredRow);
		$.filteredListTable.appendRow(tableRow);
	}
}

/*function dataOfRow() {
	var data = [{
		tutor_id : "1",
		image : "",
		name : "ravi",
		experience : "6",
		location : "Gurgaon",
		intro : "Work Hard his nature",
	}, {
		tutor_id : "2",
		image : "",
		name : "David",
		experience : "5",
		location : "Gurgaon",
		intro : "Do it perfect",
	}, {
		tutor_id : "3",
		image : "",
		name : "Juli",
		experience : "4",
		location : "Gurgaon",
		intro : "Work Hard his nature",
	}, {

		tutor_id : "4",
		image : "",
		name : "BakBoss",
		experience : "3",
		location : "Noida",
		intro : "Work Hard his nature",
	}, {
		tutor_id : "5",
		image : "",
		name : "Sultan",
		experience : "7",
		location : "Noida",
		intro : "Work Hard his nature",
	}, {
		tutor_id : "6",
		image : "",
		name : "Kumar Khan",
		experience : "8",
		location : "Noida",
		intro : "Work Hard his nature",
	}];

	return data;
}*/

function addProfileView() {
	var tutorProfileView = Alloy.createController("centralView/tutorProfileHome", {
		tutor_id : args.tutor_id,
		title : args.title,
		exp : args.exp || "N.A",
		loc : args.loc,
		intro : args.intro,
		email: args.email,
		closeFilteredContentWindow : closeFilteredContentWindow
	}).getView();
	$.profileView.add(tutorProfileView);
}

////////  filter Table Visibility /////////////////
function showFilteredList() {
	//show filtered list and hide the tutorprofile.
	$.filteredListTable.visible = true;
	$.profileView.visible = false;
	$.profileView.height = 0;
	isFilterList = true;
}

function hideFilteredList() {
	//Hide filtered list and show the tutorprofile.
	$.filteredListTable.visible = false;
	$.profileView.visible = true;
	$.profileView.height = Ti.UI.SIZE;
	isFilterList = false;
}

///////////////////////////////////////////////////
function filteredTableClick(e) {
	var rowsData = dataOfRow();
	var index = e.index;
	Alloy.createController("custom/filteredContentWindow", {
		screenType : "tutorProfileScreen",
		tutor_id : rowsData[index].id,
		title : rowsData[index].full_name,
		exp : rowsData[index].experience,
		loc : rowsData[index].city,
		intro : rowsData[index].intro,
		email: rowsData[index].email,
		closeFilteredContentWindow : closeFilteredContentWindow
	}).getView().open();
}

var actionBar;
$.filteredContentWindow.addEventListener("open", function() {
	actionBar = $.filteredContentWindow.activity.actionBar;
	if (actionBar) {
		actionBar.title = "Tutme";
		actionBar.displayHomeAsUp = true;
		actionBar.homeButtonEnabled = true;
		actionBar.onHomeIconItemSelected = function() {
			closeFilteredContentWindow();
		};
	}

});

function closeFilteredContentWindow() {
	$.filteredContentWindow.close();
}

function doToggle(e) {
	map.showMap();
} 