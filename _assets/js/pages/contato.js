/*
 * { PAGE } - CONTATO
 * gt-framework . v1.0
 * by gersonthiago.com
*/
var APP = APP || {};

	APP.contato = {

		initialized : false,

		data : '',
		
		show : {

			fix : function(){
			
				APP.debug('SHOW CONTATO');

				$('#content').html('<div class="page">'+APP.contato.data+'</div>');
				$('#content .page').fadeIn(1000);

				APP.dispatchToSub('show');

			},

			/* 
			 * /hash
			*/
			sub0 : function(){

			}

		},

		hide : {

			fix : function(){
				
				$('#content .page').fadeOut(2000, function(){
					APP.dispatch('hide');
				});

			}, 

			/* 
			 * /hash
			*/
			sub0 : function(){

				APP.dispatchToSub('hide');

			}

		},

		init : function(){
			
			function returnInit(){
				APP.contato.initialized = true;
				APP.dispatch();
			}

			if(APP.contato.data){
				returnInit();
			} else {
				$.getJSON(/*CONFIG.BASE_DIR+*/'_assets/json/pages/contato.json', function(response){
					APP.contato.data = response.page[0].content;
					returnInit();
				});
			}

		}


	};