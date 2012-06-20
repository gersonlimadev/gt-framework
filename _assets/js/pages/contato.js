/*
 * { PAGE } - CONTATO
 * gt-framework . v1.0
 * by gersonthiago.com
*/
var APP = APP || {};

	APP.contato = {

		data : '',
		
		show : function(){
			
			APP.debug('SHOW CONTATO');

			$('#container').html('<div class="page">'+APP.contato.data+'</div>');


		},

		hide : function(){

			APP.debug('HIDE CONTATO');

			_pageControl('hide');
		},


		init : function(){
			APP.debug('APP CONTATO');
			APP.debug(APP.contato.data);
			if(APP.contato.data){
				_pageControl();
			} else {
				$.getJSON(/*CONFIG.BASE_DIR+*/'_assets/json/pages/contato.json', function(response){
					APP.contato.data = response.page[0].content;
					_pageControl();
				});
			}

		}


	};