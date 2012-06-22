/*
 * { APP }
 * gt-framework . v1.0
 * by gersonthiago.com
*/

	/* @private functions */
	function _changeHash(){

		function _verifyHash(hash){
			
			// if hash equal APP.hash return
			if(hash=='#!/'+APP.hash){ return; }

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

	function _isPage(page){
		APP.debug('_isPage -> '+page);
		for(var i=0,t=APP.routersHash.length; i<t; i++){
			if(page==APP.routersHash[i].section){
				return true;
			}
		}
		return false;
	}





	/* @main */
	var APP = {

		// hash site (string)
		hash : null,

		// pages of the site - menu (array)
		routersHash : [],

		// page active and next page (array)
		router : [],

		// load loader first (boolean)
		loaderInitialized: false,


		_init : function(){
			
			if(APP.routersHash.length>0){
				APP._changeHash();
			} else if(APP.routersHash.length==0) {
				$.getJSON(/*CONFIG.BASE_DIR+*/'_assets/json/routersHash.json', function(response){
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

		getHash : function(){
			return location.hash.replace(/#!\//gi,'');
		},

		dispatch : function(){

			if(!APP.loaderInitialized){ 
				APP.loader.init(); 
				return false;
			}
			
			if(APP.dispatch.arguments.length>0){ 
				var arg = APP.dispatch.arguments[0];
				if(arg=='hide'){
					APP.router.shift();
				}
			}

			var isPage = _isPage(APP.router[0]);

			APP.debug('DISPATCH TO '+APP.router[0]);
			
			if(isPage){
				
				var router = APP.router.length;

				if(router==1){
					if(APP[APP.router[0]].initialized===false){
						APP[APP.router[0]].init();
					} else {
						APP[APP.router[0]].show['fix']();
					}
				} else if(router==2){
					APP.dispatchToSub('hideSub');
				}

			}


		},

		dispatchToSub : function(){

			if(APP.dispatchToSub.arguments.length==0){ return false; } 

			var	hash = APP.router[0],
				numHash = 0,
				arg = APP.dispatchToSub.arguments[0];

			if( (arg=='show') || (arg=='hideSub')){
				if(hash.search('/')>0){ 
					numHash = hash.split('/').length-1;
				}

				if(arg=='show'){
					APP[APP.router[0]].show['sub'+numHash]();
				} else if(arg=='hideSub'){
					APP[APP.router[0]].hide['sub'+numHash]();
				}

			} else if(arg=='hide'){
				
				APP[APP.router[0]].hide['fix']();

			}

		}




	};

	window.onload = function(){
		$(document).ready(APP._init());
	}
