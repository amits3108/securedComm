var args = arguments[0] || {};
var utils = require("utils");
//   Titles for Menu Items for Android 
var leftData = [
    {title:'  Profile ',image:'/images/profile.png'},
    {title:'  Messages ',image:'/images/message.png'},
    {title:'  Notifications ',image:'/images/notify.png'},
    {title:'  Settings ',image:'/images/Settings.png'},
    {title:'  Report Problem ',image:'/images/Problem.png'},
    {title:'  Help ',image:'/images/help.png'},
  ];
var length = leftData.length;
var tblData = [];
for (var i=0; i<length; i++){
  var row = Ti.UI.createTableViewRow({
   height : "50dp"
  });
  var drawwericon = Ti.UI.createImageView({
  	image : leftData[i].image,
  	left : "10dp",
  	height : 30 ,
  	width : 30,
  });
  var title = Ti.UI.createLabel({
  	text : leftData[i].title,
  	color : 'black',
  	left : "50dp",
  	font : {
  		fontSize:15
  	}
  });
  row.add(drawwericon);
  row.add(title);
  tblData.push(row);
 }

	
$.menuTable.data = tblData;
//   Event Listener on Menu Table
$.menuTable.addEventListener('click', function(e){
	var index = e.index;
	var view = null;
	var title = null;
	switch(index) {
	case 0:
		view = Alloy.createController("drawwer/profile").getView(),
		title = "Profile";
		break;
	case 1 :
		view = Alloy.createController("drawwer/Messages").getView(),
		title = "Messages";
		break;
	case 2 :
		view = Alloy.createController("drawwer/Notifications").getView(),
		title = "Notifications";
		break;
	case 3 :
		view = Alloy.createController("drawwer/Settings").getView(),
		title = "Settings";
		break;
	case 4 :
		view = Alloy.createController("drawwer/Problem").getView(),
		title = "Report Problem";
		break;
	case 5 :
		view = Alloy.createController("drawwer/Help").getView(),
		title = "Help";
		break;
	}
	utils.replaceCentralView({
			view : view,
			title : title
	});

});
