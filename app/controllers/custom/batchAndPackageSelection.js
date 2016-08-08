// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

var batchOptions = ['9am - 10am','10am - 11am','11am - 12am','4pm - 5pm'];
var selectedBatchTime = 0;
function onBatchTimeClick(){
	var batchTimeDialog = Ti.UI.createOptionDialog({
		options : batchOptions,
		title : 'Select batch time',
		selectedIndex : selectedBatchTime,
	});
	batchTimeDialog.show();
	batchTimeDialog.addEventListener('click', function(e) {
		Ti.API.info('onBatchTimeClick clicked'+JSON.stringify(e));
		selectedBatchTime = e.index;
		$.batchtimeLabel.text = batchOptions[selectedBatchTime];
	});
}

var packageOptions = ['monthly - 1500','quarterly - 3000','half yearly - 8000','yearly - 12000'];
var selectedPackage = 0;
function onSelectPackageClick(){
	var packageDialog = Ti.UI.createOptionDialog({
		options : packageOptions,
		title : 'Select package',
		selectedIndex : selectedPackage
	});
	packageDialog.show();
	packageDialog.addEventListener('click', function(e) {
		Ti.API.info('onSelectPackageClick clicked'+JSON.stringify(e));
		selectedPackage = e.index;
		$.packageLabel.text = packageOptions[selectedPackage];
	});
}

function onApply(){
	alert("your timing and batch is Applied");
	$.batchAndPackageSelection.close();
}


$.batchAndPackageSelection.addEventListener("open", function() {
	actionBar = $.batchAndPackageSelection.activity.actionBar;
	if (actionBar) {
		actionBar.title = "Tutme";
		actionBar.displayHomeAsUp = true;
		actionBar.homeButtonEnabled = true;
		actionBar.onHomeIconItemSelected = function() {
			$.batchAndPackageSelection.close();
		};
	}

}); 