var courseRow = function(params) {
	var params = params || {};
	var containerView = Ti.UI.createView({
		height : 130,
		//width:Ti.UI.SIZE,
		left : 3,
		right : 3,
		backgroundColor : "#FFF",
		layout : 'vertical',
		borderRadius : 4,
		top : 10
	});
	var courseName = Ti.UI.createLabel({
		text : params.courseName,
		font : {
			fontSize : 20
		},
		top : 5,
		color : "#B2DAF6",
		left : 8,
	});
	var TimingOffered = Ti.UI.createLabel({
		text : "Timings Offered : " + params.timingOffered,
		font : {
			fontSize : 12
		},
		top : 5,
		color : "#000",
		left : 8,
	});
	var packages = Ti.UI.createLabel({
		text : "Packages-   " + params.packages,
		font : {
			fontSize : 12
		},
		color : "#000",
		top : 5,
		left : 8,
	});
	var apply = Ti.UI.createLabel({
		text : "Apply",
		font : {
			fontSize : 15
		},
		color : Alloy.CFG.yellowColor,
		top : 5,
		right : 8,
	});
	containerView.add(courseName);
	containerView.add(TimingOffered);
	containerView.add(packages);
	containerView.add(apply);
	return containerView;
};
exports.courseRow = courseRow;
