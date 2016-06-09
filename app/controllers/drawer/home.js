// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
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
for (var i = 0; i < totalCourses; i++) {
	var courseRowView = require("customized/customUI").courseRow(courses[i]);
	$.coursesScrollContainer.add(courseRowView);
	_.delay(function() {
		$.coursesScrollContainer.height = Ti.UI.SIZE;
		//$.scrollContainer.height = Ti.UI.SIZE;
	}, 200);
	courseRowView = null;
}

