/*
 * APP
 * gt-framework . v1.0
 * by gersonthiago.com
*/

	/* @private functions */

	function _changeHash(){

		function _verifyHash(hash){
			
			// if hash equal APP.hash return
			if(hash=='#!/'+APP.hash){ return; }

			//APP.debug('_verifyHash inicio -> '+hash, '_verifyHash inicio APP.hash -> '+APP.hash);
			
			if(hash.search(/#!\//gi)==0){
				hash = hash.replace(/#!\//gi,'');
			} else {
				hash = APP.routersHash[0].section;
				APP.setHash(hash);
			}

			if(hash.length==0){
				hash = APP.routersHash[0].section; 
				APP.setHash(hash);
			}

			APP.hash = hash;
			APP.router.push(APP.hash);
			APP.dispatch();
		}

		$(window).hashchange(function(){
			_verifyHash(location.hash);
		});

		_verifyHash(location.hash);

	}



	/* @main */
	var APP = {

		// hash site (string)
		hash : null,

		// pages of the site - menu (array)
		routersHash : [],

		// page active and next page (array)
		router : [],

		// execute intro (boolean)
		intro: null,


		_init : function(){
			
			if(APP.routersHash.length>0){
				APP._changeHash();
			} else if(APP.routersHash.length==0) {
				$.getJSON(/*CONFIG.BASE_DIR+*/'_assets/js/routersHash.json', function(response){
					var resp = response.router;
					for(var i=0, t=resp.length; i<t; i++){
						APP.routersHash.push(resp[i]);
					}
					_changeHash();
				});
			}

		},

		debug : function(){
			if(CONFIG.DEBUG){
				for(var i=0,t=this.debug.arguments.length; i<t; i++){
					console.log(this.debug.arguments[i]);
				}
			}
		},

		setHash : function(hash){
			location.hash = '#!/'+hash;
		},

		dispatch : function(){

			//APP.debug('DESPACHA -> '+APP.hash);
			//APP.debug(APP.routersHash);
			//APP.debug('CONFIG.title -> '+CONFIG.TITLE);

		}


	};

	window.onload = function(){
		$(document).ready(APP._init());
	}









