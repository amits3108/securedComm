// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

function onProfileViewFocus(){
	$.profileHighlighter.backgroundColor = Alloy.CFG.yellowColor;
	$.timeLineHighlighter.backgroundColor = "#FFF";
}

function onTimeLineViewFocus(){
	$.profileHighlighter.backgroundColor = "#FFF";
	$.timeLineHighlighter.backgroundColor =  Alloy.CFG.yellowColor;
}

function profileViewClick(){
	onProfileViewFocus();
	$.scrollableView.setCurrentPage(0);
}

function timeLineViewClick(){
	onTimeLineViewFocus();
	$.scrollableView.setCurrentPage(1);
}

function onScrollEndOFViews(res){
	Ti.API.info(" onScrollEndOFViews "+res+"  "+res.currentPage  +" \n"+JSON.stringify(res) );
	var currentPage = res.source && res.source.currentPage;
	if(currentPage == 0){
		//profileViewClick();
		onProfileViewFocus();
	}else{
		//timeLineViewClick();
		onTimeLineViewFocus();
	}
}

$.scrollableView.addEventListener('dragend',function(res){
	onScrollEndOFViews(res);
});

var tutorProfileView = Alloy.createController("centralView/home").getView();
$.profileView.add(tutorProfileView);
