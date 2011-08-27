/**
 * @author jade.zhangjin
 * dependence of Modernizr to detect browser whether insist html5
 */
(function($){
    'use strict'
    var html5Elements = ['article', 'aside', 'audio', 'canvas', 'command', 'datalist', 'details', 'embed', 'figcaption', 'figure', 'footer', 'header', 'hgroup', 'keygen', 'mark', 'meter', 'nav', 'output', 'progress', 'rp', 'rt', 'ruby', 'section', 'source', 'summary', 'time', 'video', 'wbr'],
        inputtypes = ['date', 'email', 'search', 'range', 'url', 'color', 'number'],
		createElement = function(name, type){
       		 document.createElement(name).type = type||'';
    	}
    if ($) {
        for (var i = html5Elements.length - 1; i--;) {
            if ($[html5Elements[i]]) {
                createElement(html5Elements[i]);
            }
        }
        for (var j = inputtypes.length - 1; j--;) {
            if ($.inputtypes[html5Elements[i]]) {
                createElement(html5Elements[i], type);
            }
        }
    }
    else {
        if (/ie [6|7|8]/ig.test(navigator.userAgent)) {
            for (var i = html5Elements.length - 1; i--;) {
            
                createElement(html5Elements[i]);
            }
            for (var j = inputtypes.length - 1; j--;) {
                createElement(html5Elements[i], type);
            }
        }
    }
})(Modernizr)
