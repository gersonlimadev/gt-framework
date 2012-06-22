/*
 * { PAGE } - HOME
 * gt-framework . v1.0
 * by gersonthiago.com
*/
var APP = APP || {};

	APP.home = {

		initialized : false,

		data : '',

		show : {

			fix : function(callback){
					
				$('#content').html('<div class="page">'+APP.home.data+'</div>');
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
				APP.home.initialized = true;
				callback();
			}

			if(APP.home.data){
				returnInit();
			} else {
				$.getJSON(/*CONFIG.BASE_DIR+*/'_assets/json/pages/home.json', function(response){
					APP.home.data = response.page[0].content;
					returnInit();
				});
			}

		}


	};