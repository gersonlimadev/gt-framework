/*
 * { PAGE } - HOME
 * gt-framework . v1.0
 * by gersonthiago.com
*/
var APP = APP || {};

	APP.home = {

		data : '<p>Home Page</p> <p>pagina 2 home page</p>',
		
		show : function(){
			
			APP.debug('SHOW HOME');

			$('#container').html('<div class="page">'+APP.home.data+'</div>');


		},

		hide : function(){

			APP.debug('HIDE HOME');

			_pageControl('hide');
		},


		init : function(){
			APP.debug('APP HOME');
			
			_pageControl();

		}


	};