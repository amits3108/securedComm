// Arguments passed into this controller can be accessed via the `$.args` object
// directly or:
var args = $.args;

var customtutorTypeDropDownTable = null;
function tutorTypeClick () {
	//Ti.API.error("*******tutorTypeClick ********1");
	if (!customtutorTypeDropDownTable) {
		//Ti.API.error("*******tutorTypeClick ********2");
		customtutorTypeDropDownTable = require ("customized/customUI").customDropDown ({
			rowsArray : ["Home Tutor", "Tutor's Home", "Self Institution", "Educational Instituation"]
		});
		//Ti.API.error("*******tutorTypeClick ********3");
		$.tutorTypeDropDown.add (customtutorTypeDropDownTable);
		$.tutorTypeDropDown.height = Titanium.UI.SIZE;
	}
	else {
		//Ti.API.error("*******tutorTypeClick ********4");
		$.tutorTypeDropDown.remove (customtutorTypeDropDownTable);
		$.tutorTypeDropDown.height = 0;
		customtutorTypeDropDownTable = null;
	}
}

var customclassNumberDropDownTable = null;
function classNumberClick () {
	//Ti.API.error("*******classNumberClick ********1");
	if (!customclassNumberDropDownTable) {
		Ti.API.error ("*******classNumberClick ********2");
		customclassNumberDropDownTable = require ("customized/customUI").customDropDown ({
			rowsArray : ["8th", "9th", "10th", "11th", "12th"]
		});
		//Ti.API.error("*******classNumberClick ********3");
		$.classNumberDropDown.add (customclassNumberDropDownTable);
		$.classNumberDropDown.height = Titanium.UI.SIZE;
	}
	else {
		//Ti.API.error("*******classNumberClick ********4");
		$.classNumberDropDown.remove (customclassNumberDropDownTable);
		$.classNumberDropDown.height = 0;
		customclassNumberDropDownTable = null;
	}
}


/////////////// search bar View visiblity /////////
function hideFilteringViews () {
	$.optionSelectionView.visible = false;
}

function showFilteringViews () {
	$.optionSelectionView.visible = true;
}
///////////////////////////////////////////////////


////////  filter Table Visibility /////////////////
function showFilteredList () {
	$.filteredListTable.visible = true;
}

function hideFilteredList () {
	$.filteredListTable.visible = false;
}
///////////////////////////////////////////////////

///////   dropDown Visiblity //////////////////////
function hidedropDown(){
	$.tutorTypeDropDown.visible = false;
	$.classNumberDropDown.visible = false;
}
function showDropDown(){
	$.tutorTypeDropDown.visible = true;
	$.classNumberDropDown.visible = true;
}
///////////////////////////////////////////////////

/////////////      After retrun click on search bar        //////////////
function doFiltering () {
	hidedropDown();
	showFilteredList ();
	filteredRowUI();
}

////////////    require the UI of each List row in table   ///////////////
function filteredRowUI (params) {
	var params = params || {};
	
	var rowsData = dataOfRow ();
	var total = rowsData.length;
	
	for(var i=0;i<total;i++){
		var filteredRow = Alloy.createController ("custom/filteredRow", rowsData[i]).getView ();
		var tableRow = Titanium.UI.createTableViewRow({
			height : 120,
			width : Titanium.UI.FILL,
			backgroundColor : "transparent",
		});
		tableRow.add(filteredRow);
		$.filteredListTable.appendRow(tableRow);
	}
}

function dataOfRow () {
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
	},{
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
	},{
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

