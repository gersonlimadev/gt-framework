/*
 * { PAGE } - CONTATO
 * gt-framework . v1.1
 * by gersonthiago.com
*/
var APP = APP || {};

	APP.contato = {

		initialized : false,

		data : '',
		
		show : {

			fix : function(callback){
			
				$('#content').html('<div class="page">'+APP.contato.data+'</div>');
				$('#content .page').fadeIn(1000);

				callback('show');

			},

			/* 
			 * /hash
			*/
			sub0 : function(){

			}

		},

		hide : {

			fix : function(callback){
				
				$('#content .page').fadeOut(2000, function(){
					callback('hide');
				});

			}, 

			/* 
			 * /hash
			*/
			sub0 : function(callback){

				callback('hide');

			}

		},

		init : function(callback){
			
			function returnInit(){
				APP.contato.initialized = true;
				callback();
			}

			if(APP.contato.data){
				returnInit();
			} else {
				$.getJSON(/*CONFIG.BASE_DIR+*/'dev/json/pages/contato.json', function(response){
					APP.contato.data = response.page[0].content;
					returnInit();
				});
			}

		}


	};