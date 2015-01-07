/*! zacwolf.com.home - v1.1.0 - 2015-01-07
 *
 * Copyright (c) 2014 Zac Morris <zac@zacwolf.com> [http://www.zacwolf.com]
 * All Right Reserved (except where content covered under prior license)
 */

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
