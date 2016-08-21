var courseRow = function(params) {
	var params = params || {};
	var containerTableViewRow = Ti.UI.createTableViewRow({
		height : 130,
		borderRadius : 4,
		left : 3,
		right : 3,
		backgroundColor : "#FFF",
		bottom : 10
	});
	var containerView = Ti.UI.createView({
		height : 110,
		//width:Ti.UI.SIZE,
		left : 3,
		right : 3,
		backgroundColor : "#FFF",
		layout : 'vertical',
		borderRadius : 4,
		//top : 10,
		bottom : 10
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
		top : 2,
		right : 8,
	});
	containerView.add(courseName);
	containerView.add(TimingOffered);
	containerView.add(packages);
	containerView.add(apply);
	containerTableViewRow.add(containerView);
	return containerTableViewRow;
};
exports.courseRow = courseRow;

function dropDownRow(params) {
	var params = params || {};
	var row = Ti.UI.createTableViewRow({
		height : 22,
		width : Ti.UI.FILL,
		backgroundColor : "#FFF",
	});
	var viewContainer = Ti.UI.createView({
		height : Ti.UI.FILL,
		width : Ti.UI.FILL,
		backgroundColor : "#FFF",
		layout : "horizontal"
	});
	var basicSwitch = Ti.UI.createSwitch({
		style : Ti.UI.Android.SWITCH_STYLE_CHECKBOX,
		textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
		title : params.title || "CheckBox",
		value : false,
		width : Ti.UI.FILL, // necessary for textAlign to be effective
		color : "#000",
		font : {
			fontSize : 13
		},
		left : 5
	});
	viewContainer.add(basicSwitch);
	basicSwitch.addEventListener('change', function(e) {
		Ti.API.info('Switch value: ' + basicSwitch.value +"  "+basicSwitch.title);
		params.switchValue && params.switchValue({
			switchValue : basicSwitch.value,
			switchtitle : basicSwitch.title			
		});
	});
	row.add(viewContainer);
	return row;
}

var customDropDown = function(params) {
	var params = params || {};

	var dropDownTable = Ti.UI.createTableView({
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL,
	});
	var totalRows = params && params.rowsArray && params.rowsArray.length;

	if (totalRows && totalRows > 0) {
		for (var i = 0; i < totalRows; i++) {
			var row = dropDownRow({
				title : params.rowsArray[i],
				//switchValue : params.switchValue ? params.switchValue : null
			});
			dropDownTable.appendRow(row);
		}
	}
	return dropDownTable;
};
exports.customDropDown = customDropDown;
