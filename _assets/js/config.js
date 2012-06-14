/* @config */
var CONFIG = {

	VERSION : '1.0',

	BASE : document.getElementsByTagName('body')[0].getAttribute('data-base'),
	
	BASE_DIR : document.getElementsByTagName('body')[0].getAttribute('data-base')+'/_assets',

	// URL site (string)
	URL : null,

	// pages of the site - menu (array)
	ROUTER : [],

	// page active and next page (array)
	ROUTER_ACTIVE : [],

	// execute intro (boolean)
	INTRO: null
};