// Arguments passed into this controller can be accessed via the `$.args` object
// directly or:
var args = $.args;
var isFilterList = true;

if (args.screenType == "tutorProfileScreen") {
	hideFilteredList();
	addProfileView();
} else {
	filteredRowUI();
	showFilteredList();
}

////////////    require the UI of each List row in table   ///////////////
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
		tableRow.add(filteredRow);
		$.filteredListTable.appendRow(tableRow);
	}
}

function dataOfRow() {
	var data = [{
		image : "",
		name : "ravi",
		experience : "6",
		location : "Gurgaon",
		intro : "Work Hard his nature",
	}, {
		image : "",
		name : "David",
		experience : "5",
		location : "Gurgaon",
		intro : "Do it perfect",
	}, {
		image : "",
		name : "Juli",
		experience : "4",
		location : "Gurgaon",
		intro : "Work Hard his nature",
	}, {
		image : "",
		name : "BakBoss",
		experience : "3",
		location : "Noida",
		intro : "Work Hard his nature",
	}, {
		image : "",
		name : "Sultan",
		experience : "7",
		location : "Noida",
		intro : "Work Hard his nature",
	}, {
		image : "",
		name : "Kumar Khan",
		experience : "8",
		location : "Noida",
		intro : "Work Hard his nature",
	}];

	return data;
}

function addProfileView() {
	var tutorProfileView = Alloy.createController("centralView/tutorProfileHome", {
		title : args.title,
		exp : args.exp,
		loc : args.loc,
		intro : args.intro
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
		title : rowsData[index].name,
		exp : rowsData[index].experience,
		loc : rowsData[index].location,
		intro : rowsData[index].intro
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
			$.filteredContentWindow.close();
		};
	}

}); 