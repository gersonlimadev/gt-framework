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

			fix : function(){
					
				$('#content').html('<div class="page">'+APP.home.data+'</div>');
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
				APP.home.initialized = true;
				APP.dispatch();
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