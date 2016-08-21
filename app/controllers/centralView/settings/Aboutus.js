var aboutLabel = "Tutme provides a golden opportunity for students to learn from the best tutors in their neighbourhood and city. Tutme is a great online service that provides an organized platform to unstructured market of tuitions and expert professional training providers, both individuals and institutes to connect students and teachers/trainers. We make an effort to ensure that we encourage and attract the talented, highly enthusiastic and extremely passionate tutors to join the platform and contribute to the needs of serious students. This means the students are not only able to get best learning/training experience but also the support required to achieve their potential/goals. We at Tutme offer a comprehensive range of categories like computer education and training, School or College Tuitions, Competition exams, Entrance exams, Different Sports training, Dance training, Music teaching, Yoga training, Photography, Cooking, and many others. Tutme allows individual teachers and institutes to create their profile, add skills or experience, showcase class location, introduction and other teaching related videos, add photo galleries etc. There is a nominal fee, teachers need to pay to receive the contact details of the students interested in tuitions and to avail other services of Tutme. Although finding students online are not necessarily known to be the cheapest way, but every serious individual students at Tutme make it more worthwhile than most.";

var viewContainer = Ti.UI.createScrollView({
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

var aboutusLabel = Ti.UI.createLabel({
	text : aboutLabel,
	color : "#1BB4C6",
	font : {
		fontSize : 8,
		fontWeight : 'regular'
	},
	//left : 5,
	top : 10,
	textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER
});
viewContainer.add(aboutusLabel);

var end_double_quotes = Ti.UI.createImageView({
	image : "/images/end_double_quotes.png",
	height : 20,
	width : 20,
	top : 10,
	right : 5,
	bottom : 10
});
viewContainer.add(end_double_quotes);
$.aboutus.add(viewContainer);

var actionBar;

$.aboutWin.addEventListener("open", function() {

	actionBar = $.aboutWin.activity.actionBar;
	if (actionBar) {
		actionBar.title = "About Us";
		actionBar.displayHomeAsUp = true;
		actionBar.homeButtonEnabled = true;
		actionBar.onHomeIconItemSelected = function() {
			$.aboutWin.close();
		};
	}

}); 