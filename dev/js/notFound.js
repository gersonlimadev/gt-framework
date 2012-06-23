/*
 * { PAGE } - notFound 404
 * gt-framework . v1.0
 * by gersonthiago.com
*/
var APP = APP || {};

	APP.notFound = {

		initialized : false,

		data : '',
		
		show : {

			fix : function(callback){
			
				$('#content').html('<div class="page"><p>page 404</p><p>Esta página não existe!</p></div>');
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
				APP.notFound.initialized = true;
				callback();
			}

			returnInit();
		}


	};