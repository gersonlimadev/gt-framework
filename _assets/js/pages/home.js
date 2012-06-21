/*
 * { PAGE } - HOME
 * gt-framework . v1.0
 * by gersonthiago.com
*/
var APP = APP || {};

	APP.home = {

		status : false,

		data : '<p>Home Page</p> <p>pagina 2 home page</p>',
		
		show : function(){
			
			APP.debug('SHOW HOME');

			$('#container').html('<div class="page">'+APP.home.data+'</div>');
			$('#container .page').fadeIn(1000);

		},

		hide : function(callback){

			APP.debug('HIDE HOME');
			$('#container .page').fadeOut(2000, function(){

				APP.debug('HIDE HOME OK');
				APP.dispatch('hide');

			});

		},


		addEvents : function(){

			APP.home.status = true;
			APP.dispatch();

		}


	};