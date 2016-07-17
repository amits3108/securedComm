// Arguments passed into this controller can be accessed via the `$.args` object
// directly or:
var args = $.args;

if (args) {
	$.name.text = args.name;
	$.experience.text = args.experience;
	$.location.text = args.location;
	$.intro.text = args.intro;
} 