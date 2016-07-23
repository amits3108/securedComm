//var showAlert = require('alert');
var _ = require("alloy/underscore")._;
//Send Request to server.
exports.postRequest = function(params) {
	//Check Network
	if (!Ti.Network.online) {
		//showAlert.show(L('mustOnlineMessage'), L('connectionFailTitle'));
		params.callBack(null);
		return;
	}
	//Create Network Connection
	var xhr = Ti.Network.createHTTPClient({
		autoEncodeUrl : false
	});
	xhr.setTimeout(30 * 1000);
	xhr.onload = function() {
		if (this.status == 200) {
			var response = JSON.parse(xhr.responseText);
			params.callBack(response);
		} else {
			//showAlert.show(this.status, L('connectionFailTitle'));
			params.callBack(null);
		}
	};
	xhr.onerror = function(e) {
		Ti.API.error("FROM NETWORK API >>>" + this.responseText);
		var response = null;
		var msg = null;
		if (this.status != 404) {
			try {
				response = JSON.parse(this.responseText);
			} catch(e) {
				Ti.API.error("An Error:[" + e.message + "] has occured in line " + e.line + " \nsourceID:" + e.sourceId + "\nsourceURL:" + e.sourceURL);
			}
			if (this.status >= 500) {
				if (response && response.error && !response.message) {
					require('alert').show(L('server_unable_to_process'), L('error') + " " + this.status);
					response = null;
				}
				msg = this.status;
			}else if (this.status == 401) {
				//require('utils').openloginScreen();
				Ti.API.error("401 error found");
			}
			//showAlert.show("Status Code : " + this.status + "\nError Message : " + e.error, L('connectionFailTitle'));
		} else {
			msg = 404;
		}
		params.callBack(response, msg);
	};
	Ti.API.error("Connecting to .." + params.url);
	xhr.open(params.type, params.url);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.setRequestHeader('Accept', 'application/json');
	params.requestHeaders && _.each(params.requestHeaders, function(value, key) {
		Ti.API.debug("Setting request header , type:" + key + " value:" + value);
		xhr.setRequestHeader(key, value);
	});
	if (params.type == "GET") {
		xhr.send();
	} else {
		Ti.API.error("Request Data : " + JSON.stringify(params.requestData));
		xhr.send(params.requestData);
	}
};

exports.postRequestWithErrorHandling = function(params) {
	//Check Network
	if (!Ti.Network.online) {
		//showAlert.show(L('mustOnlineMessage'), L('connectionFailTitle'));
		params.errorCallback(L('mustOnlineMessage'));
		return;
	}
	//Create Network Connection
	var xhr = Ti.Network.createHTTPClient({
		autoEncodeUrl : false
	});
	xhr.setTimeout(30 * 1000);
	xhr.onload = function() {
		Ti.API.error("FROM NETWORK API Success[ERROR HANDLING]>>>" + this.responseText);
		if (this.status == 200) {
			var response = JSON.parse(xhr.responseText);
			params.callBack(response);
		} else {
			//showAlert.show(this.status, L('connectionFailTitle'));
			params.callBack(null);
		}
	};
	xhr.onerror = function(e) {
		Ti.API.error("FROM NETWORK API Error [ERROR HANDLING]>>>" + this.responseText);
		params.errorCallback(this.responseText);
		if (this.status >= 500) {
			require('alert').show(L('server_unable_to_process'), L('error') + " " + this.status);
		}else if (this.status == 401) {
			require('utils').openloginScreen();
		}
	};
	Ti.API.error("Connecting to .." + params.url);
	xhr.open(params.type, params.url);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.setRequestHeader('Accept', 'application/json');
	params.requestHeaders && _.each(params.requestHeaders, function(value, key) {
		Ti.API.debug("Setting request header , type:" + key + " value:" + value);
		xhr.setRequestHeader(key, value);
	});
	if (params.type == "GET") {
		xhr.send();
	} else {
		xhr.send(params.requestData);
	}
};
