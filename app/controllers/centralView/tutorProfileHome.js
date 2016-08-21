// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var network = require("network");
var appKey = require("appKey");

if (Alloy.Globals.getData(appKey.KEYS.USERTYPE) == "student") {
	$.introDetail.editable = false;
}
var tutor_id = null;
if (args && args.tutor_id)
	tutor_id = args.tutor_id;
	else
	tutor_id = "1";

if (args) {
	$.name.text = args.title;
	$.introDetail.value = args.intro;
	$.experience.text = "Experience : " + args.exp + " years";
	$.location.text = "Location : " + args.loc;
}
var courses = [{
	courseName : 'Physics',
	timingOffered : "10:30am -11:30am,12:00-1:00pm,5:00pm-6:00pm",
	packages : "hourly,Weekly,Monthly,Annualy"
}, {
	courseName : 'Chemistry',
	timingOffered : "10:30am -11:30am,12:00-1:00pm,5:00pm-6:00pm",
	packages : "hourly,Weekly,Monthly,Annualy"
}, {
	courseName : 'Maths',
	timingOffered : "10:30am -11:30am,12:00-1:00pm,5:00pm-6:00pm",
	packages : "hourly,Weekly,Monthly,Annualy"
}, {
	courseName : 'Physics2',
	timingOffered : "10:30am -11:30am,12:00-1:00pm,5:00pm-6:00pm",
	packages : "hourly,Weekly,Monthly,Annualy"
}, {
	courseName : 'Chemistry2',
	timingOffered : "10:30am -11:30am,12:00-1:00pm,5:00pm-6:00pm",
	packages : "hourly,Weekly,Monthly,Annualy"
}, {
	courseName : 'Maths2',
	timingOffered : "10:30am -11:30am,12:00-1:00pm,5:00pm-6:00pm......",
	packages : "hourly,Weekly,Monthly,Annualy"
}];

var totalCourses = courses.length;
var coursesData = [];
for (var i = 0; i < totalCourses; i++) {
	//var courseRowView = require("customized/customUI").courseRow(courses[i]);
	coursesData.push(require("customized/customUI").courseRow(courses[i]));
	_.delay(function() {
		$.coursesScrollContainer.height = Ti.UI.SIZE;
		//$.scrollContainer.height = Ti.UI.SIZE;
	}, 200);
	courseRowView = null;
}
$.coursesTable.setData(coursesData);


function onCoursesTableClick(e){
	var index = e.index;
	
	if(Alloy.Globals.getData(appKey.KEYS.USERTYPE) =="student"){
		Alloy.createController("custom/batchAndPackageSelection",{
			tutor_id : tutor_id
		}).getView().open();
	}
	
}
function addToFavourite(e){
	Ti.API.info("add to favourite");
}

