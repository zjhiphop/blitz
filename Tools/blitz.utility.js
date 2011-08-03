//Blitz tools Utility
(function($){
    'use strict'
	var _userAgent=(navigator||window.navigator).userAgent;
    blitz.utility={
	  log:function(msg){
	    if(console.log){
		  console.log(msg);
		}else if(window.status){
          window.status=msg;
        }else{
          $('title').text($('title').text()+' log:'+msg);
        }
	  },
	  createStyleElemnt:function(innerhtml){
		if(document.all){
			window.style=innerhtml;
			document.createStyleSheet("javascript:style");
		}else{
			var style = document.createElement('style');
			style.type = 'text/css';
			style.rel='stylesheet';
			style.innerHTML=innerhtml;
			document.getElementsByTagName('HEAD')[0].appendChild(style);
		}
	  },
	  config:{
	  	storageCss:" {behavior:url(#default#userData);}"
	  },
	  /*browser detect*/
	  isIE:/*@cc_on!@*/0,
	  isIE6:/ie 6/ig.test(_userAgent),
	  isIE7:/ie 7/ig.test(_userAgent),
	  isIE8:/ie 8/ig.test(_userAgent),
	  isIE9:/ie 9/ig.test(_userAgent),
	  isIpad:/ipad/ig.test(_userAgent),
	  isChrome:/chrome/ig.test(_userAgent),
	  isFirefox:/firefox/ig.test(_userAgent),
	  isOpera:/opera/ig.test(_userAgent),
	  /*end browser detect*/
	  cssCheck:function (cssText) {
	  /*check wheither insist the specific style,eg: backgroundSize */
		   var style = document.createElement('cssText').style, domPrefixes = 'Webkit Moz O ms Khtml'.split(' '),
		   ucProp = cssText.charAt(0).toUpperCase() + cssText.substr(1),
		   props = (cssText + ' ' + domPrefixes.join(ucProp + ' ') + ucProp).split(' ');
			for (var i in props) {
				if (style[props[i]] !== undefined) {
					return true;
				}
			}
			return false;
	  }
	}
})(jQuery)

