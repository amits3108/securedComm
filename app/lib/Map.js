var Map = require('ti.map');

exports.showMap = function(parmas) {
	var destinationLongitude = "77.1025";
	//params.destLong
	var destinationLatitude = "28.7041";
	//params.destLat
	var params = params || {};
	var win = Ti.UI.createWindow();
	var lat,
	    longt;
	var loc = getCurrentLocation();
	var mapview;
	var locationValue;
	Ti.API.info(loc + "     " + JSON.stringify(getCurrentLocation()));

	lat = loc.latitude;
	longt = loc.longitude;

	var myCallback = function(e, evt) {
		Ti.API.error("IN CALLBACK" + evt.places[0].displayAddress || evt.places[0].address);
		locationValue = evt.places[0].displayAddress || evt.places[0].address;
		annotations[0].setTitle(evt.places[0].displayAddress || evt.places[0].address);
	};

	getAddress(lat, longt, myCallback);
	var annotations = [Map.createAnnotation({
		latitude : lat,
		longitude : longt,
		title : locationValue,
		subtitle : locationValue,
		animate : true,
		pincolor : Map.ANNOTATION_RED,
		
	}), Map.createAnnotation({
		latitude : destinationLatitude,
		longitude : destinationLongitude,
		title : 'Tutors Location',
		pincolor : Map.ANNOTATION_GREEN,
		animate : true,
	})];
	mapview = Map.createView({
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
		annotations : annotations// Assign the annotations to the map view for pin point
	});

	var circle = Map.createCircle({
		center : {
			latitude : lat,
			longitude : longt
		},
		radius : 1000, //1km
		fillColor : "#20FF0000"
	});
	win.add(mapview);
	win.open();
	win.addEventListener('open', function(e) {
		var activity = this.getActivity();
		Alloy.Globals.activity = activity;
		Alloy.Globals.actionBar = activity.actionBar;

		if (activity) {
			//Everytime when launch the app.
			var actionBar = activity.getActionBar();
			Alloy.Globals.actionBar = actionBar;
			if (actionBar) {
				actionBar.displayHomeAsUp = true;
				actionBar.homeButtonEnabled = true;
				actionBar.setOnHomeIconItemSelected(function() {
					Ti.API.info("  defined in window open function ");
					win.close();
					//self.fireEvent('focus');
				});
			}
		}
	});

	// The bellow URL is used to Get the route of current location to assigned  destination  Location.

	var url = "http://maps.googleapis.com/maps/api/directions/json?origin=" + lat + ',' + longt + "&destination=" + destinationLatitude   + ',' + destinationLongitude + "&sensor=true";

	// The Bellow URL use the static current location to destination  Location.
	// var url = "http://maps.googleapis.com/maps/api/directions/json?origin=37.422502,-122.0855498&destination=37.389569,-122.050212&sensor=true";

	var xhr = Titanium.Network.createHTTPClient();
	xhr.open('GET', url);
	Ti.API.info('URL: ' + url);

	xhr.onload = function() {
		Ti.API.info('inside the xhr-->' + this.responseText);
		var xml = this.responseText;
		var points = [];

		// Bellow Variable have the step of the current location to destination  Location. Using the Steps we going to create a route.

		var position = JSON.parse(this.responseText).routes[0].legs[0].steps;
		if (position[0] != null) {

			points.push({
				latitude : position[0].start_location.lat,
				longitude : position[0].start_location.lng,
			});

			// Here we use the for loop to collect all the steps and push it to the array and use this array to form the route in android.

			for (var i = 0; i < position.length; i++) {

				points.push({
					latitude : position[i].end_location.lat,
					longitude : position[i].end_location.lng,
				});
			}
		} else {
			alert('no route');
		}

		var route = Map.createRoute({
			name : "india",
			points : points,
			color : Alloy.CFG.themeColor,
			width : 5
		});
		mapview.addRoute(route);
	};
	// Send the request to server
	xhr.send();

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

//          *************Reverse Geo coding************
var getAddress = function(latitude, longitude, callback) {
	Titanium.Geolocation.reverseGeocoder(latitude, longitude, function(evt) {
		places = evt.places;
		Ti.API.info(JSON.stringify(evt));
		if (callback) {
			callback(null, evt);
		}
	});
};
/*
 *
 * Adding routes to mapview
 *
 *
 *
function drawRoute(params) {
	longitude = params.longitude;
	latitude = params.latitude;
	// Assign the destination Latitude and Longitude.
	var destinationLongitude = params.destlong;
	var destinationLatitude = params.destlat;

	// The bellow URL is used to Get the route of current location to assigned  destination  Location.

	var url = "http://maps.googleapis.com/maps/api/directions/json?origin=" + latitude + ',' + longitude + "&destination=" + destinationLatitude + ',' + destinationLongitude + "&sensor=true";

	// The Bellow URL use the static current location to destination  Location.
	// var url = "http://maps.googleapis.com/maps/api/directions/json?origin=37.422502,-122.0855498&destination=37.389569,-122.050212&sensor=true";

	var xhr = Titanium.Network.createHTTPClient();
	xhr.open('GET', url);
	Ti.API.info('URL: ' + url);

	xhr.onload = function() {
		Ti.API.info('inside the xhr-->' + this.responseText);
		var xml = this.responseText;
		var points = [];

		// Bellow Variable have the step of the current location to destination  Location. Using the Steps we going to create a route.

		var position = JSON.parse(this.responseText).routes[0].legs[0].steps;
		if (position[0] != null) {

			points.push({
				latitude : position[0].start_location.lat,
				longitude : position[0].start_location.lng,
			});

			// Here we use the for loop to collect all the steps and push it to the array and use this array to form the route in android.

			for (var i = 0; i < position.length; i++) {

				points.push({
					latitude : position[i].end_location.lat,
					longitude : position[i].end_location.lng,
				});
			}
		} else {
			alert('no route');
		}

		var route = Map.createRoute({
			name : "india",
			points : points,
			color : Alloy.CFG.themeColor,
			width : 5
		});
		mapview.addRoute(route);
	};
	// Send the request to server
	xhr.send();
}
*/
