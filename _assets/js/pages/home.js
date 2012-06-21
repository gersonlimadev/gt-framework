/*
 * { PAGE } - HOME
 * gt-framework . v1.0
 * by gersonthiago.com
*/
var APP = APP || {};

	APP.home = {

		status : false,

		data : '<p>Home Page</p> <p>pagina 2 home page</p>',
		
		/*show : {

			main : function(){


			},

			sub0 : function(){



			}

		},*/

		show : function(){
			
			APP.debug('SHOW HOME');

			$('#content').html('<div class="page">'+APP.home.data+'</div>');
			$('#content .page').fadeIn(1000);

		},

		hide : function(callback){

			APP.debug('HIDE HOME');
			$('#content .page').fadeOut(2000, function(){

				APP.debug('HIDE HOME OK');
				APP.dispatch('hide');

			});

		},


		init : function(){

			APP.home.status = true;
			APP.dispatch();

		}


	};