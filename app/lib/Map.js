exports.showMap = function(parmas) {
	var Map = require('ti.map');
	var params = params || {};
	var view = parmas.view;
	var lat,
	    longt;
	var loc = getCurrentLocation();
	Ti.API.info(loc + "     " + JSON.stringify(getCurrentLocation()));
	 lat = loc.latitude;
	 longt = loc.longitude;
	var mountainView = Map.createAnnotation({
		latitude : lat,
		longitude : longt,
		title : "Appcelerator Headquarters",
		subtitle : 'Mountain View, CA',
		pincolor : Map.ANNOTATION_RED,
		//myid : 1 // Custom property to uniquely identify this annotation.
	});

	var mapview = Map.createView({
		mapType : Map.NORMAL_TYPE,
		region : {
			latitude : lat,
			longitude : longt,
			latitudeDelta : 0.01,
			longitudeDelta : 0.01
		},
		animate : true,
		regionFit : true,
		userLocation : true,
		annotations : [mountainView]
	});

	var circle = Map.createCircle({
		center : {
			latitude : lat,
			longitude : longt
		},
		radius : 1000, //1km
		fillColor : "#20FF0000"
	});
	view.add(mapview);
};
var getCurrentLocation = function(e) {
	var longitude,
	    latitude;
	Ti.App.GeoApp = {};

	Ti.Geolocation.preferredProvider = Titanium.Geolocation.PROVIDER_GPS;
	Ti.Geolocation.purpose = "Receive User Location";
	Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
	Titanium.Geolocation.distanceFilter = 10;

	if (Titanium.Geolocation.locationServicesEnabled === false) {
		alert('Your device has GPS turned off. Please turn it on.');
	} else if (Ti.Network.online) {
		Titanium.Geolocation.getCurrentPosition(function(e) {
			if (!e.success || e.error) {
				alert('Could not find the device location' + JSON.stringify(e));
				Ti.API.info('Could not find the device location' + JSON.stringify(e));
				longitude = "";
				latitude = "";
			} else {
				longitude = e.coords.longitude;
				latitude = e.coords.latitude;
				Ti.API.info("latitude: " + latitude + "longitude: " + longitude, e.coords.longitude, e.coords.latitude);
			}

		});
	} else {
		alert("Internet connection is required to use localization features");
	}
	return {
		longitude : longitude,
		latitude : latitude
	};
};
