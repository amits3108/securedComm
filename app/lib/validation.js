exports.validateEmail = function(parms) {
	var params = params || {};
	var email = parms.email;
	var re = /^[a-zA-Z0-9]+([\.|\_|\-._%+-][a-zA-Z0-9]+)*@([^\W_]*)+([\.|\_|\-._%+-][a-zA-Z0-9]+)*[.]([a-zA-Z]{2,3}|[a-zA-Z]{2,3}[.][a-zA-Z]{2})$/;
	if (!re.test(email)) {
		return false;
	} else {
		return true;
	}
};
exports.validateNumber = function(params) {
	var re = (/[^0-9]/);
	var params = params || {};
	var phone = params.phone;
	if ((!re.test(phone)) && (phone.length>9)) {
		return true;
	} else {
		return false;
	}
};
