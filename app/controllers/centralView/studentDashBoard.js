// Arguments passed into this controller can be accessed via the `$.args` object
// directly or:
var args = $.args;
var Dialogs = require("yy.tidialogs");
var network = require("network");
var customtutorTypeDropDownTable = null;

var selectedTutorType = [];
var selectedTime = [];
var selectedCourses = [];
var selectedSubjects = [];
var selectedClass = [];
var subjectData = Ti.App.Properties.getObject('subjectsArrayList');
var coursesData = Ti.App.Properties.getObject('coursesList');
var timeData = Ti.App.Properties.getObject('classTime');
function tutorTypeClick() {
	selectedTutorType.length = 0;
	var tutorpicker = Dialogs.createMultiPicker({
		title : "Tutor Type",
		options : ["Home Tutor", "Tutor's Home", "Self Institution", "Educational Instituation"],
		//selected : ["B", "C"], // <-- optional
		okButtonTitle : "Submit", // <-- optional
		cancelButtonTitle : "Cancel" // <-- optional
	});

	// Add the click listener
	tutorpicker.addEventListener('click', function(e) {
		var indexes = e.indexes;
		// selected indexes
		var selections = e.selections;
		Ti.API.info(JSON.stringify(e.indexes));
		for (var i = 0; i < indexes.length; i++) {
			selectedTutorType.push(indexes[i]);
		}
		// the actual selected options.
	});

	// Cancel listener
	tutorpicker.addEventListener('cancel', function() {
		Ti.API.info("dialog was cancelled");
	});

	// open it
	tutorpicker.show();
}

var customclassNumberDropDownTable = null;

function classNumberClick() {
	selectedClass.length = 0;
	var classpicker = Dialogs.createMultiPicker({
		title : "Select Classes",
		options : timeData, //["8th", "9th", "10th", "11th", "12th"],
		//selected : ["B", "C"], // <-- optional
		okButtonTitle : "Submit", // <-- optional
		cancelButtonTitle : "Cancel" // <-- optional
	});

	// Add the click listener
	classpicker.addEventListener('click', classPickerClickCallback);

	// Cancel listener
	classpicker.addEventListener('cancel', function() {
		Ti.API.info("dialog was cancelled");
	});
	classpicker.show();
}

function classPickerClickCallback(e) {
	var indexes = e.indexes;
	// selected indexes
	var selections = e.selections;
	// the actual selected options.
	Ti.API.info(JSON.stringify(e.indexes));
	for (var i = 0; i < indexes.length; i++) {
		Ti.API.info("%%^%^%^%^%^%^%^" + indexes[i]);
		selectedClass.push(indexes[i]);
	}
	Ti.API.info(selectedClass + "**********");
}

/////////////// search bar View visiblity /////////
function hideFilteringViews() {
	$.optionSelectionView.visible = false;
}

function showFilteringViews() {
	$.optionSelectionView.visible = true;
}

///////////////////////////////////////////////////

////////  filter Table Visibility /////////////////
function showFilteredList() {
	//$.filteredListTable.visible = true;
}

function hideFilteredList() {
	//$.filteredListTable.visible = false;
}

///////////////////////////////////////////////////

///////   dropDown Visiblity //////////////////////
function hidedropDown() {
	$.tutorTypeDropDown.visible = false;
	$.classNumberDropDown.visible = false;
}

function showDropDown() {
	$.tutorTypeDropDown.visible = true;
	$.classNumberDropDown.visible = true;
}

///////////////////////////////////////////////////

/////////////      After retrun click on search bar        //////////////

function subjectTypeClick() {
	selectedSubjects.length = 0;
	var subjectspicker = Dialogs.createMultiPicker({
		title : "Select Subjects",
		options : subjectData,
		//selected : ["B", "C"], // <-- optional
		okButtonTitle : "Submit", // <-- optional
		cancelButtonTitle : "Cancel" // <-- optional
	});

	// Add the click listener
	subjectspicker.addEventListener('click', function(e) {
		var indexes = e.indexes;
		// selected indexes
		var selections = e.selections;
		for (var i = 0; i < indexes.length; i++) {
			Ti.API.info("%%^%^%^%^%^%^%^" + indexes[i]);
			selectedSubjects.push(indexes[i]);
		}
		// the actual selected options.
	});

	// Cancel listener
	subjectspicker.addEventListener('cancel', function() {
		Ti.API.info("dialog was cancelled");
	});
	subjectspicker.show();
}

function CoursesTypeClick() {
	selectedCourses.length = 0;
	var coursespicker = Dialogs.createMultiPicker({
		title : "Select Courses",
		options : coursesData,
		//selected : ["B", "C"], // <-- optional
		okButtonTitle : "Submit", // <-- optional
		cancelButtonTitle : "Cancel" // <-- optional
	});

	// Add the click listener
	coursespicker.addEventListener('click', function(e) {
		var indexes = e.indexes;
		// selected indexes
		var selections = e.selections;
		// the actual selected options.
		for (var i = 0; i < indexes.length; i++) {
			Ti.API.info("%%^%^%^%^%^%^%^" + indexes[i]);
			selectedCourses.push(indexes[i]);
		}
	});

	// Cancel listener
	coursespicker.addEventListener('cancel', function() {
		Ti.API.info("dialog was cancelled");
	});
	coursespicker.show();
}

function timeTypeClick() {
	selectedTime.length = 0;
	var timepicker = Dialogs.createMultiPicker({
		title : "Select Time",
		options : timeData,
		//selected : ["B", "C"], // <-- optional
		okButtonTitle : "Submit", // <-- optional
		cancelButtonTitle : "Cancel" // <-- optional
	});

	// Add the click listener
	timepicker.addEventListener('click', function(e) {
		var indexes = e.indexes;
		// selected indexes
		var selections = e.selections;
		// the actual selected options.
		for (var i = 0; i < indexes.length; i++) {
			Ti.API.info("%%^%^%^%^%^%^%^" + indexes[i]);
			selectedTime.push(indexes[i]);
		}
	});

	// Cancel listener
	timepicker.addEventListener('cancel', function() {
		Ti.API.info("dialog was cancelled");
	});
	timepicker.show();
}

function applyButtonclick() {
	Alloy.createController("custom/filteredContentWindow").getView().open();
	Ti.API.info(selectedTutorType,selectedTime,selectedCourses,selectedSubjects,selectedClass);
	/*if (Titanium.Network.online) {
		network.postRequest({
			type : "GET",
			url : Alloy.CFG.URL.getTimings,
			requestData : {},
			requestHeaders : {
				"public-key" : "c8a1ad1332716aa15752422360e739a5",
				"token" : "72dd0dbc65b5e19d4b086c6f89b16203_123",//"79c74e91e49b623f6ea02435e2725"
			},
			callBack : function(e) {
				Ti.API.error(" ddd " + e + " getSubjects " + JSON.stringify(e));
				Alloy.createController("custom/filteredContentWindow").getView().open();
			},//params.callBack,
		});

	} else {
		alert("Internet is not available");
	}*/

}


function HighestQualificationTypeClick(){
	var qualificationDialog = Ti.UI.createOptionDialog({
		cancel : 0,
		options : ['Cancel','Doctorate', 'Post Graduate','Graduate','Senior Secondary','Higher Secondary','5th to 10th','1st to 4th'],
		title : 'Highest Qualification',
		selectedIndex : 0
	});
	qualificationDialog.show();
	qualificationDialog.addEventListener('click', function(e) {
		switch(e.index){
			case 0 : 
			break;
			case 1 : 
			break;
			case 2 : 
			break;
			case 3 : 
			break;
			case 4 : 
			break;
			case 5 : 
			break;
			case 6 : 
			break;
			default:
			break;
		}
		Ti.API.info('The button was clicked'+e.index);
	});
}

function languageTypeClick(){
	var languageDialog = Ti.UI.createOptionDialog({
		cancel : 2,
		options : ['English', 'Hindi', 'Cancel'],
		title : 'Preferred Language',
		selectedIndex : 1
	});
	languageDialog.show();
	languageDialog.addEventListener('click', function(e) {
		switch(e.index){
			case 0 : 
			Ti.API.info('The button was clicked2'+e.index);
			break;
			case 1 : 
			Ti.API.info('The button was clicked2'+e.index);
			break;
			case 2 : 
			Ti.API.info('The button was clicked2'+e.index);
			break;
		}
	});	
}
