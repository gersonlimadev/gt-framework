/*
 * { PAGE } - CLIENTE
 * gt-framework . v1.0
 * by gersonthiago.com
*/
var APP = APP || {};

	APP.cliente = {

		initialized : false,

		data : '',
		
		show : {

			fix : function(){
			
				var delay = 100,
					clientes = '<ul>';

				for(var i=0, t=APP.cliente.data.length; i<t; i++){
					clientes += '<li><a href="/cliente/'+(APP.cliente.data[i].titulo.toLowerCase())+'" data-url="true">'+APP.cliente.data[i].titulo+'</a></li>';
				}
				clientes += '</ul>';

				$('#content').html('<div class="listaClientes">'+clientes+'</div><div class="infoCliente"></div><div class="clear"></div>');

				$('.listaClientes li').css({'display':'block','opacity':0});
				for(var z=0; z<t; z++){
					$('.listaClientes li:eq('+z+')').delay(delay).animate({'left':0, 'opacity':1},{duration:400,easing:'easeInOutCirc'});
					delay = delay+200;
				}

				APP.dispatchToSub('show');

			},

			/* 
			 * /hash
			*/
			sub0 : function(){
				$('#content .infoCliente').html('<p>Escolha um cliente, na lista ao lado.</p>').fadeIn(1000);
			},

			/* 
			 * /hash/hash
			*/
			sub1 : function(){
				
				var infoCliente = null,
					hash = APP.getHash(1);

				for(var i=0, t=APP.cliente.data.length; i<t; i++){
					if(hash==APP.cliente.data[i].titulo.toLowerCase()){
						infoCliente = APP.cliente.data[i].texto;
					}
				}
				$('#content .infoCliente').html(infoCliente).fadeIn(1000);
			}

		},

		hide : {

			fix : function(){
				var delay = 200;
				for(var i=$('.listaClientes li').length-1; i>=0; i--){
					$('.listaClientes li:eq('+i+')').delay(delay).animate({'left':'-300px', 'opacity':0},{duration:300,easing:'easeInOutCirc'});
					delay = delay+200;
				}
				window.setTimeout(function(){
					APP.dispatch('hide');
				},delay+200);

			}, 

			/* 
			 * /hash
			*/
			sub0 : function(){
				$('#content .infoCliente').fadeOut(500, function(){
					APP.dispatchToSub('hide');
				});
			},

			/* 
			 * /hash/hash
			*/
			sub1 : function(){
				$('#content .infoCliente').fadeOut(500, function(){
					APP.dispatchToSub('hide');
				});
			}


		},

		init : function(){
			function returnInit(){
				APP.cliente.initialized = true;
				APP.dispatch();
			}

			if(APP.cliente.data){
				returnInit();
			} else {
				$.getJSON(/*CONFIG.BASE_DIR+*/'_assets/json/pages/cliente.json', function(response){
					APP.cliente.data = response.page;
					returnInit();
				});
			}

		}


	};