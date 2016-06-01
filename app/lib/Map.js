var Map = require('ti.map');
var mountainView = Map.createAnnotation({
	latitude : 37.390749,
	longitude : -122.081651,
	title : "Appcelerator Headquarters",
	subtitle : 'Mountain View, CA',
	pincolor : Map.ANNOTATION_RED,
	//myid : 1 // Custom property to uniquely identify this annotation.
});

var mapview = Map.createView({
	mapType : Map.NORMAL_TYPE,
	region : {
		latitude : 33.74511,
		longitude : -84.38993,
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
		latitude : 33.74511,
		longitude : -84.38993
	},
	radius : 1000, //1km
	fillColor : "#20FF0000"
});
//mapview.addCircle(circle);
Alloy.Globals.centralView.add(mapview);