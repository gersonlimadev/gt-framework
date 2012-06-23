/*
 * { PAGE } - MAIN
 * gt-framework . v1.0
 * by gersonthiago.com
*/
var APP = APP || {};

	APP.main = {

		data : '',
		
		addEvents : function(){

			$('a[data-url=true]').live('click',function(e){
				e.preventDefault();
				var hash = $(this).attr('href').replace('/','');
				APP.setHash(hash);
			});

		},

		init : function(callback){
			
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
					APP.main.addEvents();
					APP.mainInitialized = true;
					callback();
				},delay+200);
				
			}});

		}


	};