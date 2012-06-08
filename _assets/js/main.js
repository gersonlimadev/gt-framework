/*
 * script.js
 * by gersonthiago.com | @gersonthiago 
*/

	/*
	 * @config
	*/
	var CONFIG = {

		base : document.getElementsByTagName('body')[0].getAttribute('data-base'),

		// URL site (string)
		url : null,

		// pages of the site - menu (array)
		levels : [],

		// page active and next page (array)
		page_active : [],

		// execute intro (boolean)
		intro: null
	};

	

	/*
	 * @main
	*/
	var MAIN = {

		init : function(){
			
			MAIN.getURL();

		},

		getURL : function(){

			function verifyURL(url){
				if(url.search(/#!\//gi)==0){
					url = url.replace(/#!\//gi,'');
				} else {
					url = 'home';
					location.hash = '#!/'+url;
				}

				if(url!=CONFIG.url){ 
					CONFIG.url = url; 
					CONFIG.page_active.push(CONFIG.url);
					MAIN.despacha();
				}
			}

			$(window).hashchange(function(){
				var url = location.hash.replace(/#!\//gi,'');
				if(url!=CONFIG.url){
					verifyURL(location.hash);
				}
			});

			verifyURL(location.hash);

		},

		despacha : function(){

			console.log(CONFIG.url);

		}


	};

window.onload = function(){
	$(document).ready(MAIN.init());
}

