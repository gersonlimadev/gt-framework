/*
 * { APP }
 * gt-framework . v1.1
 * by gersonthiago.com
*/

	/* @private functions */
	function _changeHash(){

		function _verifyHash(hash){
			
			// if hash equal APP.hash return
			if(hash == '#!/'+APP.hash){ return; }

			if(hash.search(/#!\//gi) == 0){
				hash = hash.replace(/#!\//gi,'');
			} else {
				hash = APP.getFirstHash();
				APP.setHash(hash);
			}

			// test page exist
			var isPage = testHash(hash);

			// redirect to page 404 - notFound
			if( (isPage.result == false) || (APP.hasOwnProperty(isPage.module) == false) ){
				if( APP.hasOwnProperty('notFound') == false ){
					hash = APP.getFirstHash();
					APP.setHash(hash);
				} else if( APP.hasOwnProperty('notFound') == true ){
					hash = 'notFound';
					APP.setHash(hash);
				}
			}

			if( hash.length == 0 ){
				hash = APP.getFirstHash();
				APP.setHash(hash);
			}



			APP.hash = hash;
			APP.router.push(APP.hash);

			if(APP.mainInitialized){ 
				APP.dispatch();
			} else {
				APP.main.init(APP.dispatch); 
				return false;
			}

		}

		$(window).hashchange(function(){
			_verifyHash(location.hash);
		});

		_verifyHash(location.hash);

	}

	function testHash(hash){
		
		if( hash.search('/') > 0 ){ 

			hash = hash.split('/'); 

			var i = 0,
				t = hash.length;

			for(; i < t; i++){
				// transform the hash, in string
				// replace string for {string}
				// and numbers for {number}
				if( i != 0){
					if( $.isNumeric( hash[i] ) ){
						hash[i] = '{number}';
					} else {
						hash[i] = '{string}';
					}
				}

			}

			hash = hash.join('/');
		}
		
		var i = 0,
			t = APP.routersHash.length;

		for(; i < t; i++){
			
			var ii = 0,
				tt = APP.routersHash[i].routers.length;

			for(; ii < tt; ii++){
				if( hash == APP.routersHash[i].routers[ii] ){
					return {
						result : true,
						module : APP.routersHash[i].module
					}
				}
			}

		}
		return {
			result : false,
			module : 'notFound'
		};
	}





	/* @main */
	var APP = {

		// hash site (string)
		hash : null,

		// pages of the site - menu (obj)
		routersHash : null,

		// page active and next page (array)
		router : [],

		// load main first (boolean)
		mainInitialized: false,


		_init : function(){
			if(APP.routersHash != null){
				APP._changeHash();
			} else if(APP.routersHash == null) {
				$.getJSON(/*CONFIG.BASE_DIR+*/'dev/json/routersHash.json', function(response){
					APP.routersHash = response.router;
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

			// arguments, number hash position
			if(APP.getHash.arguments.length > 0){
				return hash[APP.getHash.arguments[0]];
			} else {
				return hash;
			}

		},

		getFirstHash : function(){
			return APP.routersHash[0].routers[0];
		},

		getModule : function(){
			var router = testHash(APP.router[0]);
			return router.module;
		},

		getFirstRouter : function(){
			return APP.router[0];
		},

		dispatch : function(){
			
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

			var modulo = APP.getModule();
			var router = APP.router.length;

			if(router == 1){
				if(!moduloEqual){
					if(APP[modulo].initialized === false){
						APP[modulo].init(APP.dispatch);
					} else {
						APP[modulo].show['fix'](APP.dispatchToSub);
					}
				} else {
					APP.dispatchToSub('goSub');
				}
			} else if(router == 2){
				APP.dispatchToSub('hideSub');
			}

		},

		dispatchToSub : function(){

			if(APP.dispatchToSub.arguments.length==0){ return false; } 

			var	modulo = APP.getModule(),
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
					APP[modulo].hide['sub'+numSub](APP.dispatchToSub);
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
					APP[modulo].hide['fix'](APP.dispatch);
				} else {
					APP.dispatch('hide', true);
				}

			} else if(arg=='goSub'){
				APP[modulo].show['sub'+numSub]();
			}

		}


	};

	$(document).ready(function(){
		APP._init();
	});
