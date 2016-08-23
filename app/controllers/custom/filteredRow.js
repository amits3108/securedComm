// Arguments passed into this controller can be accessed via the `$.args` object
// directly or:
var args = $.args;

if (args) {
	$.name.text = args.full_name;
	$.experience.text = "N.A";//"Experience : "+ args.experience+" years";
	$.location.text = "Location : "+args.city;
	$.intro.text = args.email;
} 
