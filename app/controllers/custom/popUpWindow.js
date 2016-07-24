// Arguments passed into this controller can be accessed via the `$.args` object
// directly or:
var args = $.args;

if (args && args.dropDownType) {
	switch(args.dropDownType)
	{
		case "tutorTypeDialog":
			openTutorTypeDialog ();
			break;
		case "classTypeDialog":
			openClassTypeDialog ();
			break;
		case "SubjectTypeDialog":
			subjectTypeDialog ();
			break;
	}
}

function openTutorTypeDialog () {
	var customtutorTypeDropDownTable = require ("customized/customUI").customDropDown ({
		rowsArray : ["Home Tutor", "Tutor's Home", "Self Institution", "Educational Instituation"]
	});
	//Ti.API.error("*******tutorTypeClick ********3");
	$.containerView.add (customtutorTypeDropDownTable);
}

//openTutorTypeDialog ();

function openClassTypeDialog () {
	var customclassNumberDropDownTable = require ("customized/customUI").customDropDown ({
		rowsArray : ["8th", "9th", "10th", "11th", "12th"]
	});
	//Ti.API.error("*******classNumberClick ********3");
	$.containerView.add (customclassNumberDropDownTable);
}

function subjectTypeDialog () {
	var customSubjectDropDownTable = require ("customized/customUI").customDropDown ({
		rowsArray : ["Java", "C++", "C", "programming", "Android"]
	});
	//Ti.API.error("*******classNumberClick ********3");
	$.containerView.add (customSubjectDropDownTable);
}
