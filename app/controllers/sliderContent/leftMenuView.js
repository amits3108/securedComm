var args = arguments[0] || {};
var utils = require("utils");
var appKey = require("appKey");

//   Titles for Menu Items for Android  
var leftData = [
    {title:'  Home ',image:'/images/profile.png'},
    {title:'  Messages ',image:'/images/message.png'},
    {title:'  Notifications ',image:'/images/notify.png'},
    {title:'  Events ',image:'/images/events.png'},
    {title:'  Settings ',image:'/images/Settings.png'},
    {title:'  Report Problem ',image:'/images/Problem.png'},
   // {title:'  Help ',image:'/images/help.png'},
    {title:'  Logout ',image:'/images/logout.png'},
  ];
var length = leftData.length;
var tblData = [];
for (var i=0; i<length; i++){
  var row = Ti.UI.createTableViewRow({
   height : "50dp",
   backgroundSelectedColor : "#B2DAF6"
  });
  var drawwericon = Ti.UI.createImageView({
  	image : leftData[i].image,
  	left : "10dp",
  	height : 30 ,
  	width : 30,
  });
  var title = Ti.UI.createLabel({
  	text : leftData[i].title,
  	color : "#000",
  	left : "50dp",
  	font : {
  		fontSize:15
  	}
  });
  row.add(drawwericon);
  row.add(title);
  tblData.push(row);
  $.menuTable.appendRow(row);
 }

var user = Alloy.Globals.getData(appKey.USER);
$.name.text = user.name;	
//$.menuTable.data = tblData;
//   Event Listener on Menu Table
var lastIndex = null;
$.menuTable.addEventListener('click', function(e){
	var index = e.index;
	var view = null;
	var title = null;
	Alloy.Globals.slider && Alloy.Globals.slider.toggleLeftWindow();
	if((index!=7) && (lastIndex == index)){
		return;
	}
	switch(index) {
	case 0:
		view = Alloy.createController("centralView/profile").getView();
		title = "Profile";
		break;
	case 1:
		if (Alloy.Globals.getData(appKey.KEYS.USERTYPE) == "student") {
				view = Alloy.createController("centralView/studentDashBoard").getView();
				title = "Student DashBoard";
		} else {
				view = Alloy.createController("centralView/tutorDashBoard").getView();
				title = "Tutor DashBoard";
		}
		break;
	case 2 :
		view = Alloy.createController("centralView/message").getView();
		title = "Messages";
		break;
	case 3 :
		view = Alloy.createController("centralView/notifications").getView();
		title = "Notifications";
		break;
	case 4 :
		view = Alloy.createController("centralView/events").getView();
		title = "Events";
		break;
	case 5 :
		view = Alloy.createController("centralView/settings").getView();
		title = "Settings";
		break;
	case 6 :
		view = Alloy.createController("centralView/problem").getView();
		title = "Report Problem";
		break;
	/*case 7 :
		view = Alloy.createController("centralView/help").getView();
		title = "Help";
		break;*/
	case 7 :
		utils.logout();
		break;
	}
	if(index != 7){
		utils.replaceCentralView({
			view : view,
			title : title
		});
	}
	lastIndex = index;
});
