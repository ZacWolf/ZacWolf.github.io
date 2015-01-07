/*! zacwolf.com.home - v1.1.0 - 2015-01-07
 *
 * Copyright (c) 2014 Zac Morris <zac@zacwolf.com> [http://www.zacwolf.com]
 * All Right Reserved (except where content covered under prior license)
 */
var	BV,resume_bounce,zenaudio;
var	isChromium			=	typeof window.chrome !== "undefined"  && window.chrome != null && window.navigator.vendor === "Google Inc.";
var	zac3_bubble_timer	=	0;
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
					if (contentwindow.currenttopic!==contentID){
						if (jQuery('#'+contentID).length==0){
							jQuery.ajax({
								type:'GET',  
								url:"http://zacwolf.com/op.ui?funct=getcontent&filename="+contentID,
								dataType:'text', 
								async:true,  
								success:function(data){
									jQuery('#contentcache').append('<div id="'+contentID+'"></div>');
									jQuery('#'+contentID).text(data);
									contentwindow.contentresizejs	=	function(){};
									contentwindow.loadContent(contentID,selector,callback);
								}
							});
						} else {
							//First clear any intervals started by any previous content
							for	(var index = 0; index < contentwindow.contentintervals.length; index++) {
								try{	clearInterval(contentwindow.contentintervals[index]);
								} catch (err){}
							}
							selector.html(jQuery('#'+contentID).text());//This will also launch any JavaScript in the content file
							contentwindow.contentresizejs();
							contentwindow.currenttopic	=	contentID;
							replaceFromNows(selector);
							if (typeof callback == "function") 
								callback();
						}
					}
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

function loadBV(){//http://videojs.com/
	loadCss('https://vjs.zencdn.net/4.11/video-js.css');
	loadCss('//cdn.jsdelivr.net/bigvideo.js/1.0.9/css/bigvideo.css')
	loadScript('https://vjs.zencdn.net/4.11/video.js'
		,function(){
			loadScript("//cdn.jsdelivr.net/bigvideo.js/1.0.9/js/bigvideo"
				,function(){
					BV	=	new jQuery.BigVideo({useFlashForFirefox:false});
					BV.init();
				}
			);
		}
	);
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
														try{contentwindow.contentresizejs();} catch(err){};
var														cw	=	jQuery('#content').width();
var														ww	=	contentwindow.minwidth
																+(jQuery('#content').hasClass("topnav")?175:0);
														if (jQuery('#content').hasClass("leftnav") && cw<ww){
															jQuery('#contentwindow .wintop').show();
															jQuery('#contentwindow .winleft').hide();
															jQuery('#content').removeClass("leftnav").addClass("topnav")
														} else if (jQuery('#content').hasClass("topnav")&& cw>ww+10){
															jQuery('#contentwindow .wintop').hide();
															jQuery('#contentwindow .winleft').show();
															jQuery('#content').removeClass("topnav").addClass("leftnav")
														}
													}
											}
											,'contentdiv':'#wincontent'
											});
			jQuery('#backgroundright')
				.css({"right":(jQuery('#zac3_welcome').width()*-1)+'px'})
//				.dblclick(animateBackgroundObject);//Doing some weird "select" type behavior that messes with the images
			
var			contentwinwidth_min	=	parseInt(jQuery('#contentwindow').css('min-width'));
var			contentwinwidth		=	jQuery(window).width() -jQuery('#zac3_welcome').width() -contentwindow.left;
			if (contentwinwidth<contentwinwidth_min){
				jQuery('#backgroundright').remove();
				contentwinwidth	=	jQuery(window).width() -(contentwindow.left*2);
				if (contentwinwidth<contentwinwidth_min){
					contentwindow.left	=	0;
					contentwinwidth	=	jQuery(window).width();
				}
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
			
			jQuery('img[usemap]').rwdImageMaps();
				
			jQuery('.nav > span').each(//Setup the Content Nav onclicks
				function(){
					jQuery(this).on('click',function(e){
						showContent(jQuery(this).attr("content"));
					})
				}
			);
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
			restoreBackground(
				function(){
					jQuery('#pageloading').remove();
					jQuery('#zac3_welcome')
						.delay(2000)
						.velocity({'opacity':1},'slow')
						.delay(7000)
						.velocity({'opacity':0},defaultanimatespeed,
							function(){
								zac3_bubble_timer	=	setTimeout(
									function(){
										jQuery('#zac3_bubble')
											.velocity({'opacity':1},defaultanimatespeed);
										jQuery('#contentwindowlogo')
											.one('click', function() {
												clearTimeout(zac3_bubble_timer);
												jQuery('#zac3_bubble').remove();
											});
									}
									, 240000
								);
							}
						);
				}
			);
			contentwindow.loadContent(
				'about'
				,jQuery('#contenthtml')
				,function(){
					jQuery('#resumeicon')
						.delay(7000)
						.velocity({'opacity':'1','bottom':'15px'}
							,defaultanimatespeed
							,'easeOutBounce'
							,function(){
								//Chrome CANVAS bug https://code.google.com/p/chromium/issues/detail?id=100703
								try{
						var		elem = document.createElement('canvas');
								if (!isChromium && (elem.getContext && elem.getContext('2d'))){
						var			blur				=	parseInt(jQuery('#resumeicon').css('left'));
						var			icon				=	new Image();
									icon.src			=	jQuery('#resumeicon').prop('src');
						var			canvas				=	document.createElement('canvas');
									canvas.id			=	"canvaseresumeicon";
									canvas.className	=	"resumeicon";
									canvas.width		=	jQuery('#resumeicon').width()+(blur*2);
									canvas.height		=	jQuery('#resumeicon').height()+(blur*2)
						var			ctx					=	canvas.getContext('2d');
									ctx.shadowColor		=	'#024D44';
									ctx.shadowOffsetX	=	0;
									ctx.shadowOffsetY	=	0;
									ctx.shadowBlur		=	0;
									ctx.drawImage(icon,blur,blur,128,128);
									canvas.addEventListener("mouseover", 
										function() {
											ctx.shadowBlur=blur;
											ctx.clearRect(0, 0, canvas.width, canvas.height);
											ctx.drawImage(icon,blur,blur,128,128);
										}
									);
									canvas.addEventListener("mouseout", 
										function() {
											ctx.shadowBlur=0;
											ctx.clearRect(0, 0, canvas.width, canvas.height);
											ctx.drawImage(icon,blur,blur,128,128);
										}
									);
									jQuery('#resumeicon').replaceWith(canvas);
								}
								} catch (err){}//Ignore any canvas error
								jQuery('.resumeicon')
									.one('click', 
										function(){
											clearInterval(resume_bounce);
											setCookie("viewedresume","true");
										}
									)
									.qtip(
										{	content:{text: 'Take a look at my resume!'}
											,position:{
												target: 'mouse'
												,at:'center right'
												,my:'center left'
												,adjust: {
													x: 10
												}
											}
										}
									);
								if (!cookies['viewedresume'])
									resume_bounce = setInterval(function(){jQuery('.resumeicon').effect( "bounce", "slow" );},10000);
							}
						)
				}
			);
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
			if (document.createElement('audio').canPlayType('audio/mpeg;')){
				zenaudio		=	new Audio();
				jQuery('#contentwindowlogo')
					.css('cursor','url(/images/ICONS/audio_32.png),pointer')
					.qtip(	{	content:{
									title: "Zen Passion Radio"
									,text: 'zen-passion.twomini.com'
								}
								,position:{
									target: 'mouse'
									,at:'center right'
									,my:'center left'
									,adjust: {
										x: 25
									}
								}
							}
						);
			}
			jQuery('#contentwindowlogo').click(
				function(){
					if (!zenaudio){
						showBurningManVideo()
					} else	if (zenaudio.src.endsWith('.mp3')){
						zenaudio.pause();
						zenaudio.src	=	'';
					} else {
						zenaudio.src	=	"http://92.222.22.34:7777/stream/;stream.mp3";
						zenaudio.play();
					}
				}
			);
		}
	);
	loadBV();
}
function restoreBackground(callback){
	if (jQuery('#backgroundright').is(":visible"))
		jQuery('#backgroundright').velocity({'opacity':1,'right':0},defaultanimatespeed*1.5);
	jQuery('#background')
		.velocity(
			{'opacity':1}
			,{'duration':400
			 ,'complete':
				function(){
				 	animateBackgroundObject();
					if (typeof callback === 'function')
						callback();
				}
			}
		);
}
function clearBackground(callback){
	if (jQuery('#backgroundright').is(":visible"))
		jQuery('#backgroundright')
			.velocity({'opacity':0,'right':(jQuery('#backgroundright').width()*-1)+'px'},defaultanimatespeed*1.5);
	jQuery('#background')
		.velocity(
			 {'opacity':0}
			,{'duration':defaultanimatespeed
			,'complete':callback
			}
		);
}
function animateBackgroundObject(callback){
	switch(RandomXToY(1,3))
	{
	case 1:
		animateMini(callback);
		break;
	case 2:
		animateHummer(callback);
		break;
	default:
		animateBike(callback);
	}
}
function animateMini(callback){
	jQuery('#background').prepend('<img id="mini" src="images/mini.png" style="position:absolute;left:-200px;top:45%;height:'+Math.round(jQuery(window).height()*.3)+'px;opacity:0;background-color:transparent;" />');
	jQuery('#mini')
		.velocity({'opacity':1},400)
		.velocity(
			 {'left':'50%','top':'45%','height':Math.round(jQuery(window).height()*.8), 'opacity':0}
			,{'duration':4000
			,'complete':
				function(){
					jQuery(this).remove();
					if(typeof callback === "function")
						callback();
				}
			 }
		);
}
function animateBike(callback){
	jQuery('#background').prepend('<img id="zaconbike" src="images/zaconbike.png" style="position:absolute;left:-200px;top:30%;height:'+Math.round(jQuery(window).height()*.4)+'px;opacity:0;background-color:transparent;" />');
	jQuery('#zaconbike')
		.velocity({'opacity':1},400)
		.velocity(
			 {'left':'50%','top':'30%','height':Math.round(jQuery(window).height()*.8), 'opacity':0}
			,{'duration':4000
			,'complete':
				function(){
					jQuery(this).remove();
					if(typeof callback === "function")
						callback();
				}
			 }
		);
}
function animateHummer(callback){
	jQuery('#background').append('<img id="huck" src="images/huck.png" style="position:absolute;left:-300px;top:35%;height:'+Math.round(jQuery(window).height()*.4)+'px;opacity:0;background-color:transparent;" />');
	jQuery('#huck')
		.velocity({'opacity':1},400)
		.velocity(
			 {'left':'60%','top':'45%','height':Math.round(jQuery(window).height()*.8), 'opacity':0}
			,{'duration':4000
			,'complete':
				function(){
					jQuery(this).remove();
					if(typeof callback === "function")
						callback();
				}
			 }
		);
}
function showBurningManVideo(){
	if (zenaudio) zenaudio.pause();
	clearTimeout(zac3_bubble_timer);
	jQuery('#zac3_bubble').remove();
	window.windoge
		.minimize()
		.one('minrestore',function(){
			if (BV){
				jQuery('#sparkimg').remove();
				jQuery('#sparklink').remove();
				BV.triggerPlayer('pause');
				jQuery('#big-video-wrap')
					.velocity(
						{'opacity':0}
						,'fast'
						,function(){
							BV.dispose();
							BV	=	new jQuery.BigVideo({useFlashForFirefox:false});
							BV.init();
						}
					);
			}
			restoreBackground();
		});
	clearBackground();
	if (BV){
		BV.getPlayer().on('error', function(){
			window.windoge.restore();
		});
		BV.show([	{ type: "video/mp4",  src: "//dl.dropboxusercontent.com/u/27151327/html/video/Art%20on%20Fire.mp4" }
					,{ type: "video/webm", src: "//dl.dropboxusercontent.com/u/27151327/html/video/Art%20on%20Fire.webm" }
					,{ type: "video/ogg",  src: "//dl.dropboxusercontent.com/u/27151327/html/video/Art%20on%20Fire.ogv" }
				], {doLoop:true});
		jQuery('#big-video-wrap').velocity({'opacity':1},'fast');
		jQuery('body').append('<a href="http://spark.ignite.me/" id="sparklink" onclick="window.windoge.restore();"><img id="sparkimg" src="http://b.vimeocdn.com/us/vod_poster/727/7278_275.jpg" style="opacity:0;position:fixed;top:25px;right:25px;border:solid #cccccc 1px;-webkit-border-radius:10px;-moz-border-radius:10px;border-radius:10px;-webkit-box-shadow:#B3B3B3 5px 5px 5px;-moz-box-shadow:#B3B3B3 5px 5px 5px;box-shadow:#B3B3B3 5px 5px 5px;" /></a>');
		jQuery('#sparkimg')
			.delay(defaultanimatespeed)
			.velocity({'opacity':1},defaultanimatespeed)
			.delay(defaultanimatespeed)
			.velocity(
				 {'opacity':0}
				,{'duration':defaultanimatespeed
				,'complete':
					function(){
						jQuery('#sparklink').remove();
						jQuery('body').append('<a href="http://spark.ignite.me/" id="sparklink" onclick="window.windoge.restore();"><img id="sparkimg" src="http://b.vimeocdn.com/ts/450/300/450300605_295.jpg" style="height:100px;opacity:0;position:fixed;top:25px;right:25px;border:solid #333333 1px;-webkit-border-radius:5px;-moz-border-radius:5px;border-radius:5px;-webkit-box-shadow:#B3B3B3 2px 2px 2px;-moz-box-shadow:#B3B3B3 2px 2px 2px;box-shadow:#B3B3B3 2px 2px 2px;" /></a>');
						jQuery('#sparkimg').velocity({'opacity':.5},400)
					}
				}
			)
	}
}

function showContent(contentID,callback){
	if (contentwindow.currenttopic!==contentID){
		jQuery('.nav > span.selected').removeClass('selected');
		jQuery('.nav > span[content="'+contentID+'"]').addClass('selected');
		jQuery('#content')
			.velocity({'opacity':0},500,
				function(){
					contentwindow.loadContent(
						contentID
						,jQuery('#contenthtml')
						,function(){
							jQuery('#content')
								.mCustomScrollbar("disable",true)
								.velocity({'opacity':1},500,
									function(){
										jQuery('#content').mCustomScrollbar("update");
										if (typeof callback=="function")
											callback();
									}
								);
						}
					);
				}
			);
	}
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
