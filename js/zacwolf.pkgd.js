var		year			=	new Date().getFullYear();
var		cookies 		=	{};

if (navigator.cookieEnabled){
var		cc				=	document.cookie.split(';');
	while(cc.length){
var		c				=	cc.shift().split('=');
		if (isNaN(c[0].trim()) && c[1].trim()!='undefined')
			cookies[c[0].trim()]=c[1].trim();
	}
}

function setCookie(key,val){
	if (!navigator.cookieEnabled)
		return false;
	cookies[key]		=	val;
var	cookiestring		=	"";
var	keys				=	Object.keys(cookies);
	for (var k=0;k<keys.length;k++ )
		cookiestring	+=	keys[k]+"="+cookies[keys[k]]+";";
	cookiestring		+=	" expires=Fri, 24 Dec 2031 13:00:00 CST;";//set cookie that's valid until I'm eligible to retire
	document.cookie		=	cookiestring;
	return true;
}

function loadScript(url, callback){
var	script				=	document.createElement("script")
	script.type			=	"text/javascript";
	if (script.readyState){  //IE
		script.onreadystatechange = function(){
			if (script.readyState == "loaded" ||
				script.readyState == "complete"){
				script.onreadystatechange = null;
				callback();
			}
		};
	} else {  //Others
		script.onload	=	callback;
	};
	if (!url.endsWith('.js'))
		url				=	url	+ (window.useMin?'.min':'')+'.js'
	script.src = url;
	document.getElementsByTagName("head")[0].appendChild(script);
}

function loadCss(url,callback) {
var	link				=	document.createElement("link");
	link.type			=	"text/css";
	link.rel			=	"stylesheet"
	link.charset		=	"utf8" 
	if (!url.endsWith('.css'))
		url				=	url	+ (window.useMin?'.min':'')+'.css'
	link.href			=	url;
	link.onload			=	callback;
	document.getElementsByTagName("head")[0].appendChild(link);
}

function RandomXToY(min,max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function getUnitSince(date,unit){
	if (typeof moment == "undefined")//http://momentjs.com
		loadScript('//cdn.jsdelivr.net/momentjs/2.8.4/moment-with-locales.min.js'
				,function(){
					replaceFromNows(selector);
				}
			);
	else {
		if (typeof unit == "undefined")
			unit	=	'years';
var			now		=	moment();
var			aday	=	moment(date,'YYYY-MM-DD HH:mm:ss ZZ')
		return now.diff(aday,unit)+" "+unit;
	}
}

function replaceFromNows(selector){
	if (typeof moment == "undefined")//http://momentjs.com
		loadScript('//cdn.jsdelivr.net/momentjs/2.8.4/moment-with-locales.min.js'
			,function(){
				replaceFromNows(selector);
			}
		);
	else {
		selector
			.find('.fromNow')
				.each(
					function(){
						jQuery(this).text(getUnitSince(jQuery(this).attr('date'),jQuery(this).attr('unit')));
					}
				);
	}
}

function  meetsMinSize(minw,minh){
var h			= "innerHeight" in window 
				? window.innerHeight
				: document.documentElement.offsetHeight;
var	w			= "innerWidth" in window 
				? window.innerWidth
						: document.documentElement.offsetWidth;
var	ratio		=	window.devicePixelRatio || 1;
var	realh		=	h * ratio;
var	realw		=	w * ratio;
	//alert("minw:"+minw+" minh:"+minh+" h:"+h+" w:"+w+"  ratio:"+ratio+" realh:"+realh+" realw:"+realw);
	return w>minw && h>minh;
}

//From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
if (!Object.keys) {
	Object.keys = (function() {
		'use strict';
		var hasOwnProperty = Object.prototype.hasOwnProperty,
				hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
				dontEnums = [
					'toString',
					'toLocaleString',
					'valueOf',
					'hasOwnProperty',
					'isPrototypeOf',
					'propertyIsEnumerable',
					'constructor'
				],
				dontEnumsLength = dontEnums.length;

		return function(obj) {
			if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
				throw new TypeError('Object.keys called on non-object');
			}

			var result = [], prop, i;

			for (prop in obj) {
				if (hasOwnProperty.call(obj, prop)) {
					result.push(prop);
				}
			}

			if (hasDontEnumBug) {
				for (i = 0; i < dontEnumsLength; i++) {
					if (hasOwnProperty.call(obj, dontEnums[i])) {
						result.push(dontEnums[i]);
					}
				}
			}
			return result;
		};
	}());
}

if (typeof String.prototype.endsWith !== 'function') {
	String.prototype.endsWith = function(suffix) {
		return this.indexOf(suffix, this.length - suffix.length) !== -1;
	};
}

if (typeof String.prototype.startsWith !== 'function') {
	String.prototype.startsWith = function(suffix) {
		return this.indexOf(suffix, this.length - suffix.length) == 0;
	};
}

if (typeof window.modernizr === "undefined")/* Modernizr 2.8.3 (Custom Build) | MIT & BSD Build: http://modernizr.com/download/#-testprop-testallprops-domprefixes*/
	window.Modernizr=function(a,b,c){function w(a){i.cssText=a}function x(a,b){return w(prefixes.join(a+";")+(b||""))}function y(a,b){return typeof a===b}function z(a,b){return!!~(""+a).indexOf(b)}function A(a,b){for(var d in a){var e=a[d];if(!z(e,"-")&&i[e]!==c)return b=="pfx"?e:!0}return!1}function B(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:y(f,"function")?f.bind(d||b):f}return!1}function C(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+m.join(d+" ")+d).split(" ");return y(b,"string")||y(b,"undefined")?A(e,b):(e=(a+" "+n.join(d+" ")+d).split(" "),B(e,b,c))}var d="2.8.3",e={},f=b.documentElement,g="modernizr",h=b.createElement(g),i=h.style,j,k={}.toString,l="Webkit Moz O ms",m=l.split(" "),n=l.toLowerCase().split(" "),o={},p={},q={},r=[],s=r.slice,t,u={}.hasOwnProperty,v;!y(u,"undefined")&&!y(u.call,"undefined")?v=function(a,b){return u.call(a,b)}:v=function(a,b){return b in a&&y(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=s.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(s.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(s.call(arguments)))};return e});for(var D in o)v(o,D)&&(t=D.toLowerCase(),e[t]=o[D](),r.push((e[t]?"":"no-")+t));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)v(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof enableClasses!="undefined"&&enableClasses&&(f.className+=" "+(b?"":"no-")+a),e[a]=b}return e},w(""),h=j=null,e._version=d,e._domPrefixes=n,e._cssomPrefixes=m,e.testProp=function(a){return A([a])},e.testAllProps=C,e}(this,this.document);

loadCss("//cdn.jsdelivr.net/normalize/3.0.2/normalize");
loadScript("https://code.jquery.com/jquery-2.1.3.min.js"
	,function(){
		jQuery.fn.isEmpty		=	function () {
										return this.length == 0;
									}
		jQuery.fn.isOverflowing =	function () {
var										p	=	jQuery(this).parent();get(0);
var										el	=	jQuery(this).get(0);
										return (el.offsetTop < p.offsetTop*-1 || el.offsetLeft < p.offsetLeft*-1) ||
											   (el.offsetTop + el.offsetHeight > p.offsetTop*-1 + p.offsetHeight || el.offsetLeft + el.offsetWidth > p.offsetLeft + p.offsetWidth);
									};
		jQuery.fn.getInnerSize	=	function () {
var										x,y;
										if (self.innerHeight){ // all except Explorer
											x = self.innerWidth;
											y = self.innerHeight;
										} else if (document.documentElement && document.documentElement.clientHeight){
											// Explorer 6 Strict Mode
											x = document.documentElement.clientWidth;
											y = document.documentElement.clientHeight;
										} else if (document.body) { // other Explorers
											x = document.body.clientWidth;
											y = document.body.clientHeight;
										}
										return [x,y];
									}
		jQuery.fn.isTransparent	=	function () {
										return (jQuery(this).is(":visible")
											? parseInt(jQuery(this).css('opacity'))<1
											: false
										);
									};
		jQuery.fn.isVisible		=	function () {
										return jQuery(this).is(":visible");
									};
	}
);
//http://www.google.com/fonts
loadScript("//cdn.jsdelivr.net/webfontloader/1.5.3/webfont.js",
	function(){
		loadCss("https://fonts.googleapis.com/css?family=Roboto:400,500|Open+Sans:300,400,600,700,800|Handlee:400");
	}
);
loadCss("//cdn.jsdelivr.net/fontawesome/4.2.0/css/font-awesome");

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
								url:"//www.zacwolf.com/op.ui?funct=getcontent&filename="+contentID,
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
