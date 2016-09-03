// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var network = require("network");
var appKey = require("appKey");
var utils = require("utils");
var user = Alloy.Globals.getData(appKey.USER);
var user_id;
if (user && user.user_id)
	user_id = user.user_id;
//used for Student ID
if (Alloy.Globals.getData(appKey.KEYS.USERTYPE) == "student") {
	$.introDetail.editable = false;
}
if ((Alloy.Globals.getData(appKey.KEYS.USERTYPE) != "student")) {
	$.favView.remove($.markFav);
	//$.markFav.hide();
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
	$.emailid.text = args.email;
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

function onCoursesTableClick(e) {
	var index = e.index;

	if (Alloy.Globals.getData(appKey.KEYS.USERTYPE) == "student") {
		Alloy.createController("custom/batchAndPackageSelection", {
			tutor_id : tutor_id,
			closeFilteredContentWindow : args.closeFilteredContentWindow
		}).getView().open();
	}

}

function addToFavourite(e) {
	Ti.API.info("add to favourite");
	if (Titanium.Network.online) {
		utils.showLoading();
		network.postRequest({
			type : "POST",
			url : Alloy.CFG.URL.add_favorite,
			requestData : {
				tutor_id : tutor_id,
				student_id : user_id
			},
			requestHeaders : {
				"public-key" : "c8a1ad1332716aa15752422360e739a5",
				"token" : "72dd0dbc65b5e19d4b086c6f89b16203_123",//"79c74e91e49b623f6ea02435e2725"
			},
			callBack : function(e) {
				Ti.API.error(" ddd " + e + JSON.stringify(e));
				utils.hideLoading();
				alert('Tutor added to the favourite list.');
			},//params.callBack,
		});

	} else {
		alert("Internet is not available");
	}
}

var ratingbar = require('titutorial.ratingbar');
var ratingView = Ti.UI.createLabel({
	backgroundColor: "#E4E4E4",
	left : 0,
	top : 10,
	text : '  Rate Tutor ',
	color : '#000'
});
/*
 * Dynamic rating bar
 */
var ratingBarforTutor = ratingbar.createRatingBar({
	//top : '30dp',
	rating : 0,
	stars : 5,
	stepSize : 1,
	//isIndicator : false
});
ratingView.add(ratingBarforTutor);
$.tutorInitialDetails.add(ratingView);

ratingView.addEventListener('click',ratingforTutor);

function setRatingValue(text){
	Ti.API.info("afghjkakjfghajkg     "+text);
	ratingView.text = '   Tutor Rating is : '+ text + "  ";
	//mainWindow.close()
}

function ratingforTutor() {
	//ratingBarforTutor.setIsIndicator(false);
	if (Alloy.Globals.getData(appKey.KEYS.USERTYPE) == "student") {
		utils.showRatingDailog({
			callback : setRatingValue
		}).open(); 
	}

	//Ti.API.info("afghjkakjfghajkg     "+ratingValue);
	//
}

/*for marking tutor as favorite :
 url : api.tutme.in/index.php/student/add_favorite
 method : post
 params: tutor_id, student_id

 for getting post list of favorited tutor :
 url : api.tutme.in/index.php/student/postsby_fav_tutors/:student_id
 method : get
 {"error":false,"data":null,"message":"No posts available by your favorite tutors","errors":null,"status_code":200}

 for liking a post by tutor:
 url : api.tutme.in/index.php/student/like_tutor_posts
 method : post
 params: post_id, student_id

 for adding a comment on post by tutor:
 url : api.tutme.in/index.php/student/comment_tutor_posts
 method : post
 params: post_id, student_id, comment_text
 */
