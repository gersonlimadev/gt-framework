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

		//verificar se a url mandada existe, tanto [0] quanto [1]
		for(var i=0,t=APP.routersHash.length; i<t; i++){
			if(page==APP.routersHash[i].section){
				return true;
			}
		}
		//return false;
		return true;
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
			var hash = APP.hash.split('/');
			if(APP.getHash.arguments.length>0){
				return hash[APP.getHash.arguments[0]];
			} else {
				return hash;
			}
		},

		getModulo : function(){
			var router = APP.router[0];
			if(router.search('/')>0){
				router = router.split('/')[0];
			}
			return router;
		},

		getFirstRouter : function(){
			return APP.router[0];
		},

		dispatch : function(){

			if(!APP.loaderInitialized){ 
				APP.loader.init(); 
				return false;
			}
			
			if(APP.dispatch.arguments.length>0){ 
				var arg = APP.dispatch.arguments[0];
				if(arg=='hide'){
					var moduloEqual = false;
					if(APP.dispatch.arguments[1]){
						if(APP.dispatch.arguments[1]==true){ moduloEqual = true; }
					}
					APP.router.shift();
				}
			}

			var modulo = APP.getModulo(),
				isPage = _isPage(modulo);

			APP.debug('DISPATCH TO '+modulo);
			APP.debug('_isPage '+isPage);
			APP.debug('ROUTER '+APP.router);

			if(isPage){
				
				var router = APP.router.length;
				if(router==1){
					if(!moduloEqual){
						if(APP[modulo].initialized===false){
							APP[modulo].init();
						} else {
							APP[modulo].show['fix']();
						}
					} else {
						APP.dispatchToSub('goSub');
					}
				} else if(router==2){
					APP.dispatchToSub('hideSub');
				}

			}


		},

		dispatchToSub : function(){

			if(APP.dispatchToSub.arguments.length==0){ return false; } 

			var	modulo = APP.getModulo(),
				hash = APP.getFirstRouter(),
				numSub = 0,
				arg = APP.dispatchToSub.arguments[0];

			if(hash.search('/')>0){ 
				numSub = hash.split('/').length-1; 
			}

			if( (arg=='show') || (arg=='hideSub')){

				if(arg=='show'){
					APP[modulo].show['sub'+numSub]();
				} else if(arg=='hideSub'){
					APP[modulo].hide['sub'+numSub]();
				}

			} else if(arg=='hide'){
				
				var prevRouter = APP.getFirstRouter(),
					nextRouter = APP.router[1];
					
				if(prevRouter.search('/')>0){ prevRouter = prevRouter.split('/')[0]; }
				if(nextRouter.search('/')>0){ nextRouter = nextRouter.split('/')[0]; }
				
				var moduloEqual = false;
				if(prevRouter==nextRouter){ 
					moduloEqual = true;
				}

				if(!moduloEqual){
					APP[modulo].hide['fix']();
				} else {
					APP.dispatch('hide', true);
				}

			} else if(arg=='goSub'){
				APP[modulo].show['sub'+numSub]();
			}

		}




	};

	window.onload = function(){
		$(document).ready(APP._init());
	}
