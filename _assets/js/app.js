/*
 * script.js
 * jun/2012 - v1.0
 * by gersonthiago.com | @gersonthiago 
*/



/* @main */
var APP = {

	_init : function(){
		
		if(CONFIG.ROUTER.length>0){
			APP._changeURL();
		} else if(CONFIG.ROUTER.length==0) {
			$.getJSON(CONFIG.BASE_DIR+'/js/router.json', function(response){
				var resp = response.router;
				for(var i=0, t=resp.length; i<t; i++){
					CONFIG.ROUTER.push(resp[i]);
				}
				APP._changeURL();
			});
		}

	},

	_changeURL : function(){

		function verifyURL(url){
			
			// if url equal CONFIG.URl return
			if(url=='#!/'+CONFIG.URL){ return; }

			console.log('verifyURL inicio -> '+url, 'verifyURL inicio CONFIG.URL -> '+CONFIG.URL);
			
			if(url.search(/#!\//gi)==0){
				console.log('TEM #!/');
				url = url.replace(/#!\//gi,'');
			} else {
				console.log('NAO TEM #!/ -> '+CONFIG.ROUTER);
				url = CONFIG.ROUTER[0].section;
				APP._setURL(url);
			}


			// if url not empty
			if(url.length==0){
				url = CONFIG.ROUTER[0].section; 
				APP.setURL(url); 
			}

			CONFIG.URL = url;
			CONFIG.ROUTER_ACTIVE.push(CONFIG.URL);
			APP.despacha();
		}

		$(window).hashchange(function(){
			verifyURL(location.hash);
		});

		verifyURL(location.hash);

	},

	setURL : function(url){
		console.log('setURL -> '+url);
		location.hash = '#!/'+url;
	},

	despacha : function(){

		console.log('DESPACHA -> '+CONFIG.URL);

	}


};

window.onload = function(){
	$(document).ready(APP._init());
}

