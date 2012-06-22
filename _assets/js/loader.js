/*
 * { PAGE } - LOADER
 * gt-framework . v1.0
 * by gersonthiago.com
*/
var APP = APP || {};

	APP.loader = {

		data : '',
		
		addEvents : function(){

			APP.debug('LOADER -> addEvents');

			$('a[data-url=true]').live('click',function(e){
				e.preventDefault();
				var hash = $(this).attr('href').replace('/','');
				APP.setHash(hash);
			});

		},

		init : function(){
			
			APP.debug('LOADER -> init');
			
			var header = $('#header');

			header.find('h1').animate({'top':30}, {duration:800, easing: 'easeInOutCirc', complete: function(){

				var navLi = header.find('#nav li.bt'),
					t = navLi.length,
					delay = 200;

				for(var i=0; i<t; i++){
					navLi.eq(i).delay(delay).fadeIn();
					delay = delay+200;
				}

				window.setTimeout(function(){
					APP.loader.addEvents();
					APP.loaderInitialized = true;
					APP.dispatch();
				},delay+200);
				
			}});

		}


	};