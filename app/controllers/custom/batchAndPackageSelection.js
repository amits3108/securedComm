// Arguments passed into this controller can be accessed via the `$.args` object
// directly or:
var args = $.args;
var appKey = require ("appKey");
var utils = require ("utils");
var network = require ("network");

var tutor_id = null;
if (args && args.tutor_id)
	tutor_id = args.tutor_id;
else
	tutor_id = "1";

var user = Alloy.Globals.getData (appKey.USER);
var user_id;
if (user && user.user_id)
	user_id = user.user_id;
//used for Student ID

var batchOptions = ['9am - 10am', '10am - 11am', '11am - 12am', '4pm - 5pm'];
var selectedBatchTime = 0;
function onBatchTimeClick () {
	if (batchOptions && batchOptions.length > 0) {
		var batchTimeDialog = Ti.UI.createOptionDialog ({
			options : batchOptions,
			title : 'Select batch time',
			selectedIndex : selectedBatchTime,
		});
		batchTimeDialog.show ();
		batchTimeDialog.addEventListener ('click', function (e) {
			Ti.API.info ('onBatchTimeClick clicked' + JSON.stringify (e));
			selectedBatchTime = e.index;
			$.batchtimeLabel.text = batchOptions [selectedBatchTime];
		});
	}
	else {
		alert ("Batch time not provided by tutor");
	}
}

var packageOptions = [/*'Monthly - 1500','Quarterly - 3000','Half Yearly -
 * 8000','Yearly - 12000'*/];
var packageIDs = [/*'1','2','3','4'*/];
function getPackagesFromServer () {
	if (Titanium.Network.online) {
		utils.showLoading ();
		network.postRequest ({
			type : "GET",
			url : Alloy.CFG.URL.getPackages,
			requestData : {},
			requestHeaders : {
				"public-key" : "c8a1ad1332716aa15752422360e739a5",
				"token" : "72dd0dbc65b5e19d4b086c6f89b16203_123",
			},
			callBack : function (e) {
				packageOptions = [];
				utils.hideLoading ();
				//Ti.API.error(" ddd " + e + " getCourses " + JSON.stringify(e));
				var response = e;
				//Ti.API.error(response.data[0]+" ddd " + e + " getCourses ****");
				if (response && response.data) {
					for (var i = 0; i < response.data.length; i++) {
						if (response.data [i]) {
							Ti.API.error (response.data [i].duration + " ddd " + e + " getPackages ****" + response.data [i].id);
							var res = {
								duration : response.data [i].duration,
								price : response.data [i].price,
								id : response.data [i].id
							};
							var str = response.data [i].duration + " - " + response.data [i].price;
							packageOptions.push (str);

							packageIDs.push (response.data [i].id);
							res = {};
						}
					}
				}
				Ti.API.info ("packageOptions are :" + JSON.stringify (packageOptions));
			},
		});

	}
	else {
		alert ("Internet is not available");
	}
}

getPackagesFromServer ();

var selectedPackage = 0;
var selectedPackageId = null;
//TODO Need to be chagne after correct response comming each time.
function onSelectPackageClick () {
	if (packageOptions && packageOptions.length > 0) {
		var packageDialog = Ti.UI.createOptionDialog ({
			options : packageOptions,
			title : 'Select package',
			selectedIndex : selectedPackage
		});
		packageDialog.show ();
		packageDialog.addEventListener ('click', function (e) {
			Ti.API.info ('onSelectPackageClick clicked' + JSON.stringify (e));
			selectedPackage = e.index;
			$.packageLabel.text = packageOptions [selectedPackage];
			selectedPackageId = packageIDs [e.index];
		});
	}
	else {
		alert ("Packages are not given by tutor");
	}
}

function onApply () {
	if (selectedPackageId && $.batchtimeLabel.getText ()) {
		if (Titanium.Network.online) {
			utils.showLoading ();
			var requestData = {
				student_id : user_id,
				tutor_id : tutor_id,
				package_id : selectedPackageId,
				batch_timing : $.batchtimeLabel.getText ()
			};

			network.postRequest ({
				type : "POST",
				url : Alloy.CFG.URL.update_profile,
				requestData : requestData,
				requestHeaders : {
					"public-key" : "c8a1ad1332716aa15752422360e739a5",
					"token" : "72dd0dbc65b5e19d4b086c6f89b16203_123",
				},
				callBack : onApplyCallBack,
			});

		}
		else {
			alert ("Check Internet Connection");
		}

	}
	else {
		alert ("select required details first.");
	}
}

function onApplyCallBack (json) {
	Ti.API.info ("get profile Callback : \n " + JSON.stringify (json));
	utils.hideLoading ();
	/*if (json && (parseInt (json.status_code) == 200) && (!json.error)) {
		if (json.data) {
			Ti.API.info ("get profile Callback success: \n " + JSON.stringify (json.data));
			alert ("Congrats, Your timing and batch is Applied, Now Concentrate on your study");
			$.batchAndPackageSelection.close ();
		}
	}
	else {
		_.isEmpty (json) && alert ("Unable to connect. Please try again later.");
		if (json && json.error) {
			if (json.message) {
				alert (json.message + "");
			}
			else {
				alert ("Something went wrong, Please try again");
			}
		}
		Ti.API.error ("error found");
	}*/
	$.batchAndPackageSelection.close ();
	alert ("Congrats, Your timing and batch is Applied, Now Concentrate on your study");
	
}

$.batchAndPackageSelection.addEventListener ("open", function () {
	actionBar = $.batchAndPackageSelection.activity.actionBar;
	if (actionBar) {
		actionBar.title = "Tutme";
		actionBar.displayHomeAsUp = true;
		actionBar.homeButtonEnabled = true;
		actionBar.onHomeIconItemSelected = function () {
			$.batchAndPackageSelection.close ();
		};
	}
});
