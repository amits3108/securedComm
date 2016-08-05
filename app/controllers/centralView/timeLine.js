// Arguments passed into this controller can be accessed via the `$.args` object
// directly or:
var args = $.args;
var network = require("network");
var appKey = require("appKey");
var spinner = require("spinner");
var utils = require("utils");

function createtimeLineRow(params) {
	var params = params || {};

	var tableViewRow = Ti.UI.createTableViewRow({
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL,
	});
	var viewContainer = Ti.UI.createView({
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL,
		backgroundColor : "#FFF",
		borderColor : Alloy.CFG.themeColor,
		borderRadius : 4,
		borderWidth : 3,
		layout : "vertical",
		top : 15
	});
	var createdOn = Ti.UI.createLabel({
		text : "Created On: " + params.postCreationDate,
		color : "#000",
		font : {
			fontSize : 13,
		},
		left : 5,
		top : 10
	});
	viewContainer.add(createdOn);

	var start_double_quotes = Ti.UI.createImageView({
		image : "/images/start_double_quotes.png",
		height : 20,
		width : 20,
		top : 10,
		left : 5,
	});
	viewContainer.add(start_double_quotes);

	var timeLinePostLabel = Ti.UI.createLabel({
		text : params.timeLinePost,
		color : "#000",
		font : {
			fontSize : 13,
		},
		//left : 5,
		top : 10,
		textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER
	});
	viewContainer.add(timeLinePostLabel);

	var end_double_quotes = Ti.UI.createImageView({
		image : "/images/end_double_quotes.png",
		height : 20,
		width : 20,
		top : 10,
		right : 5,
		bottom : 10
	});
	viewContainer.add(end_double_quotes);
	tableViewRow.add(viewContainer);
	return tableViewRow;
}

function postButtonClick() {
	/*var timeLinePost = ($.timeLineField.value != "" || null) ? $.timeLineField.value : "";
	 var tableRow = createtimeLineRow({
	 timeLinePost : timeLinePost,
	 postCreationDate : "6:20pm June 15,2016"
	 });

	 $.timeLineTable.appendRow(tableRow);
	 //Ti.API.info(" $.timeLineTable.data.length "+ $.timeLineTable.data.length);
	 //$.timeLineTable.scrollToIndex($.timeLineTable.data.length - 1);
	 $.timeLineField.value = "";*/

	if ($.timeLineField.value == "" || null) {
		alert("Enter your timeLine");
	} else {
		var timeLinePost = $.timeLineField.value;
		sendPostToServer({
			post_text : timeLinePost
		});
	}
}

function sendPostToServer(params) {
	var params = params || {};
	if (Titanium.Network.online) {
		utils.showLoading();;
		var user = Alloy.Globals.getData(appKey.USER);
		var requestData = {
			tutor_id : user.user_id,
			post_text : params.post_text
		};
		network.postRequest({
			type : "POST",
			url : Alloy.CFG.URL.create_post,
			requestData : requestData,
			requestHeaders : {
				"public-key" : "c8a1ad1332716aa15752422360e739a5",
				"token" : "72dd0dbc65b5e19d4b086c6f89b16203_123",//"79c74e91e49b623f6ea02435e2725"
			},
			callBack : sendPostToServerCallBack,
		});

	} else {
		alert("Internet is not available");
	}
}

function sendPostToServerCallBack(json) {
	Ti.API.info(" callback json " + JSON.stringify(json));
	utils.hideLoading();
	if (json && (parseInt(json.status_code) == 200) && (!json.error)) {
		if (json.data) {
			if (json.data) {
				Ti.API.info("json data found");
			} else {
				Ti.API.info("json data not found");
			}
		} else {
			if (json.message)
				alert(json.message + "");

			var timeLinePost = ($.timeLineField.value != "" || null) ? $.timeLineField.value : "";

			var tableRow1 = createtimeLineRow({
				timeLinePost : timeLinePost,
				postCreationDate : "6:20pm June 15,2016"
			});
			$.timeLineTable.appendRow(tableRow1);
			tableRow1 = null;
			$.timeLineField.value = "";
		}
		Ti.API.info("post completed");
	} else {
		//json && !(_.isEmpty(json)) && alert(json.message);
		_.isEmpty(json) && alert("Unable to Post your message. Please try again later.");
		if (json && json.error) {
			if (json.message) {
				alert(json.message + "");
			} else {
				alert("Something went wrong, Please try again");
			}
		}
		Ti.API.error("error found");
	}

}

/*var tableRow1 = createtimeLineRow({
 timeLinePost : "Education is the key to success in life, and teachers make a lasting impact in the lives of their students. Solomon Ortiz",
 postCreationDate : "6:20pm June 15,2016"
 });
 $.timeLineTable.appendRow(tableRow1);
 tableRow1 = null;*/

function getAllPostFromServer() {
	if (Titanium.Network.online) {
		var user = Alloy.Globals.getData(appKey.USER);
		var requestData = {
			tutor_id : user.user_id,
		};
		network.postRequest({
			type : "GET",
			url : Alloy.CFG.URL.get_post+"/tutor_id/"+user.user_id,
			//requestData : {},
			requestHeaders : {
				"public-key" : "c8a1ad1332716aa15752422360e739a5",
				"token" : "72dd0dbc65b5e19d4b086c6f89b16203_123", //"79c74e91e49b623f6ea02435e2725"
				tutor_id : user.user_id,
			},
			callBack : getAllPostFromServerCallBack,
		});

	} else {
		//alert("Internet is not available");
	}
}

getAllPostFromServer();

function getAllPostFromServerCallBack(json) {
	Ti.API.info(" getAllPostFromServerCallBack json " + JSON.stringify(json));
	if (json && (parseInt(json.status_code) == 200) && (!json.error)) {
		if (json.data) {
			if (json.data) {
				Ti.API.info("json data found");
			} else {
				Ti.API.info("json data not found");
			}
		} else {
			if (json.message)
				alert(json.message + "");
		}
		Ti.API.info("post completed");
	} else {
		//json && !(_.isEmpty(json)) && alert(json.message);
		_.isEmpty(json) && alert("Unable to Post your message. Please try again later.");
		if (json && json.error) {
			if (json.message) {
				alert(json.message + "");
			} else {
				alert("Something went wrong, Please try again");
			}
		}
		Ti.API.error("error found");
	}
}
