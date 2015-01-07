/*! zacwolf.com.home - v1.1.0 - 2015-01-07
 *
 * Copyright (c) 2014 Zac Morris <zac@zacwolf.com> [http://www.zacwolf.com]
 * All Right Reserved (except where content covered under prior license)
 */
var	defaultanimatespeed	=	1500;
var		contentwindow	=	
		{	currenttopic:""
			,minwidth:590
			,minheight:475
			,top:50
			,left:50
			,contentresizejs:function(){}
			,contentintervals:[]
			,loadContent: 
				function(contentID,selector,callback){
					
				}
		};
window.initPage	=	
function initPage(){
	if (typeof jQuery=="undefined" && typeof jQuery.ui != 'undefined'){
		setTimeout(window.initPage,100);
		return;
	}
	loadScript("//cdn.jsdelivr.net/jquery.ui/1.11.2/jquery-ui.min.js"
		,function(){
			loadScript("//cdn.jsdelivr.net/velocity/1.1.0/velocity.min.js"
				,function(){
					loadScript("//cdn.jsdelivr.net/velocity/1.1.0/velocity.ui.min.js",
						function(){
							var VelocityContainer = window.Velocity || $.Velocity;
							$.extend(VelocityContainer.Easings, {
							    Back: function( p ) {
							        return p * p * ( 3 * p - 2 );
							    },
							    Bounce: function ( p ) {
							        var pow2,
							            bounce = 4;
	
							        while ( p < ( ( pow2 = Math.pow( 2, --bounce ) ) - 1 ) / 11 ) {}
							        return 1 / Math.pow( 4, 3 - bounce ) - 7.5625 * Math.pow( ( pow2 * 3 - 2 ) / 22 - p, 2 );
							    }
							});
							$.each([ "Back", "Bounce" ], function( index, easeInName ) {
							    var easeIn = VelocityContainer.Easings[easeInName];
							    VelocityContainer.Easings[ "easeIn" + easeInName ] = easeIn;
							    VelocityContainer.Easings[ "easeOut" + easeInName ] = function( p ) {
							        return 1 - easeIn( 1 - p );
							    };
							    VelocityContainer.Easings[ "easeInOut" + easeInName ] = function( p ) {
							        return p < 0.5 ?
							            easeIn( p * 2 ) / 2 :
							            1 - easeIn( p * -2 + 2 ) / 2;
							    };
							});
							loadRest();
						}
					)
				}
			);
			loadScript("//cdn.jsdelivr.net/jquery.ui.touch-punch/0.2.3/jquery.ui.touch-punch");
		}
	);
	//https://github.com/jquery/jquery-mousewheel
	loadScript("//cdn.jsdelivr.net/mousewheel/3.1.9/jquery.mousewheel");
	//https://github.com/malihu/malihu-custom-scrollbar-plugin
	loadScript("//cdn.jsdelivr.net/jquery.mcustomscrollbar/3.0.6/jquery.mCustomScrollbar");
	//http://qtip2.com
	loadScript("//cdn.jsdelivr.net/qtip2/2.2.1/jquery.qtip");
	loadScript("jsframeworks/jQuery-rwdImageMaps/jquery.rwdImageMaps")

	//http://desandro.github.io/imagesloaded
	loadScript("//cdn.jsdelivr.net/imagesloaded/3.1.6/imagesloaded.pkgd");

	loadCss("//cdn.jsdelivr.net/jquery.mcustomscrollbar/3.0.6/jquery.mCustomScrollbar.min.css");
	loadCss("//cdn.jsdelivr.net/qtip2/2.2.1/jquery.qtip");
	loadCss("/jsframeworks/jquery.ui.windoge/jquery.ui.windoge");
	loadCss("/css/section");
	loadCss("/css/zacwolf");
	$( window ).resize(windowResize);
}

function loadRest(){
	loadScript("/jsframeworks/jquery.ui.windoge/jquery.ui.windoge",
		function(){
			window.windoge	=	new winDoge({'id':'contentwindow'
											,'header':'Welcome to zacwolf.com'
											,'winlogo':'/images/LOGO/zacwolf_logo_trans_100.png'
											,'winlogoshow':true
											,'winlogodropshadow':true
											,'windropshadow':true
											,'style':{	'min-width':contentwindow.minwidth+'px'
														,'min-height':contentwindow.minheight+'px'
														,'top':'0px'
														,'left':'-2000px'
														,'opacity':'0'
														,'background-color':'rgba(234,220,142,.8)'
													 }
											,'on':{
												'resize':
													function(){

													}
											}
											,'contentdiv':'#wincontent'
											});
			
var			contentwinwidth_min	=	parseInt(jQuery('#contentwindow').css('min-width'));
var			contentwinwidth		=	jQuery(window).width() -(contentwindow.left*2);
			if (contentwinwidth<contentwinwidth_min){
				contentwindow.left	=	0;
				contentwinwidth	=	jQuery(window).width();
			}

var			contentwinheight_min=	parseInt(jQuery('#contentwindow').css('min-height'));
var			contentwinheight	=	jQuery(window).height() -(contentwindow.top*2);
			if (contentwinheight<contentwinheight_min){
				contentwindow.top	=	0;
				contentwinheight	=	jQuery(window).height();
			}
			contentwinheight	=	(contentwinheight>contentwinheight_min
										?contentwinheight
										:contentwinheight_min
									);
			jQuery('#contentwindow')
				.css({'left':((contentwinwidth+5)*-1)+'px'})
				.width(contentwinwidth)
				.height(contentwinheight)
			jQuery('#content')//Setup the mCustomScrollbar
				.css({'margin-left':'180px;'})
				.mCustomScrollbar({
					theme:'dark-2'
					,autoHideScrollbar:false
					,alwaysShowScrollbar:1
					,scrollInertia: 0
					,mouseWheel:{ deltaFactor: 20 }
					,autoDraggerLength: true
					,scrollButtons:{enable:true}
					,advanced:{updateOnContentResize:true}
					,mouseWheel:{ enable: true, deltaFactor: 25 }
					,keyboard:{ enable: true }
				});			


			jQuery('#contentwindow')
				.delay(defaultanimatespeed*1.5)
				.velocity(
					{	'top':contentwindow.top+'px'
						,'left':contentwindow.left+'px'
						,'opacity':1
					}
					,defaultanimatespeed
					,'easeOutQuart'
				)
		}
	);
}


window.ignoresize	=	false;
function windowResize(){
	if (window.ignoresize || (Modernizr.testProp('backgroundSize')&& meetsMinSize(contentwindow.minwidth,contentwindow.minheight))){
		if($("#sizedialog").is(":visible")){
			$("#sizedialog").hide();
			window.ignoreresize	=	false; //reset the warning
		}
	} else if (!$("#sizedialog").is(":visible")){
		$("#sizedialog").show();
		$('#yesbutton').one('click',function(){
			window.location = (window.location.href.indexOf("dev.")>-1?"dev.":"")+'mobile.html';
		});
		$('#nobutton').one('click',function(){
			window.ignoresize	=	true;
			$("#sizedialog").hide();
		});
	}
}
