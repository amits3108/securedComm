// Arguments passed into this controller can be accessed via the `$.args` object
// directly or:
var args = $.args;

var customtutorTypeDropDownTable = null;
/*function tutorTypeClick () {
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
}*/
function tutorTypeClick(){
	openPopUpWindow ({
		dropDownType : "tutorTypeDialog"
	});
}

var customclassNumberDropDownTable = null;
/*function classNumberClick () {
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
}*/
function classNumberClick () {
	openPopUpWindow ({
		dropDownType : "classTypeDialog"
	});
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
	//$.filteredListTable.visible = true;
}

function hideFilteredList () {
	//$.filteredListTable.visible = false;
}

///////////////////////////////////////////////////

///////   dropDown Visiblity //////////////////////
function hidedropDown () {
	$.tutorTypeDropDown.visible = false;
	$.classNumberDropDown.visible = false;
}

function showDropDown () {
	$.tutorTypeDropDown.visible = true;
	$.classNumberDropDown.visible = true;
}

///////////////////////////////////////////////////

/////////////      After retrun click on search bar        //////////////
function doFiltering () {
	//hidedropDown ();
	//showFilteredList ();
	//filteredRowUI ();
}

function subjectTypeClick () {
	openPopUpWindow ({
		dropDownType : "SubjectTypeDialog"
	});
}

function openPopUpWindow (params) {
	var params = params || {};
	Alloy.createController ("custom/popUpWindow",{
		dropDownType : params.dropDownType
	}).getView ().open ();
}

function applyButtonclick () {
	Alloy.createController ("custom/filteredContentWindow").getView ().open ();
}

//require("utils").getCourses();
//require("utils").getSubjects();
//require("utils").getTimings();

