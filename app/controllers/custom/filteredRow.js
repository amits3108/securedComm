// Arguments passed into this controller can be accessed via the `$.args` object
// directly or:
var args = $.args;

if (args) {
	$.name.text = args.name;
	$.experience.text = "Experience : "+ args.experience+" years";
	$.location.text = "Location : "+args.location;
	$.intro.text = args.intro;
} 
