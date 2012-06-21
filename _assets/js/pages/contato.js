/*
 * { PAGE } - CONTATO
 * gt-framework . v1.0
 * by gersonthiago.com
*/
var APP = APP || {};

	APP.contato = {

		status : false,

		data : '',
		
		show : function(){
			
			APP.debug('SHOW CONTATO');

			$('#content').html('<div class="page">'+APP.contato.data+'</div>');
			$('#content .page').fadeIn(1000);

		},

		hide : function(){

			APP.debug('HIDE CONTATO');
			$('#content .page').fadeOut(2000, function(){

				APP.debug('HIDE CONTATO OK');
				APP.dispatch('hide');

			});

		},

		init : function(){
			
			APP.debug('contato debug');
			
			$.getJSON(/*CONFIG.BASE_DIR+*/'_assets/json/pages/contato.json', function(response){
				APP.contato.data = response.page[0].content;

				APP.contato.status = true;
				APP.dispatch();

			});

		}


	};