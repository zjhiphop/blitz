/*Blitz tools Utility
 * depandency:  blitz.clone.js
 */
(function($){
    'use strict'
    var _userAgent = (navigator || window.navigator).userAgent;
    blitz.utility = {
        log: function(msg){
            if (typeof msg === 'object') {
                this.config._result = '';
                this.getAllObjProp(msg);
                msg = this.config._result;
				this._dispose();
            }
            if (console.log) {
                console.log(msg);
            }
            else 
                if (window.status) {
                    window.status = msg;
                }
                else {
                    $('title').text($('title').text() + ' log:' + msg);
                }
        },
        getAllObjProp: function(obj){//after excute this method,you must excute dispose method to reset number
            for (var i in obj) {
                if (obj.hasOwnProperty(i)) {
                    if (typeof obj[i] === 'object') {
                        var j = (this.config.deep++);
                        while (j--) 
                            this.config._result += '  ';
                        this.config._result += i + '--\r\n';
                        this.getAllObjProp(obj[i]);//use strict will not allow use arguments.callee,so i changed method
                        this.config.deep--;
                    }
                    else {
                        var j = this.config.deep;
                        while (j--) {
                            this.config._result += '  ';
                        }
                        this.config._result += i + '-' + obj[i] + '\r\n';
                    }
                }
            }
        },
        augement: function(a, b){
            if (arguments.length < 2) {
                return a;
            }
            else 
                if (a && b && (typeof a === 'object' || typeof b === 'object')) {
                    var refb = blitz.clone(b);
                    for (var i in refb) {
                        a[i] = refb[i];
                    }
                }
                else {
                    return a;
                }
        },
        createStyleElemnt: function(innerhtml){
            if (document.all) {
                window.style = innerhtml;
                document.createStyleSheet("javascript:style");
            }
            else {
                var style = document.createElement('style');
                style.type = 'text/css';
                style.rel = 'stylesheet';
                style.innerHTML = innerhtml;
                document.getElementsByTagName('HEAD')[0].appendChild(style);
            }
        },
        config: {
            _result: '',
            _inObj: false,
            deep: 0
        },
		_dispose:function(){
			this.config={
	            _result: '',
	            _inObj: false,
	            deep: 0	
			};
		},
        /*browser detect*/
        isIE:/*@cc_on!@*/ 0,
        isIE6: /ie 6/ig.test(_userAgent),
        isIE7: /ie 7/ig.test(_userAgent),
        isIE8: /ie 8/ig.test(_userAgent),
        isIE9: /ie 9/ig.test(_userAgent),
        isIpad: /ipad/ig.test(_userAgent),
        isChrome: /chrome/ig.test(_userAgent),
        isFirefox: /firefox/ig.test(_userAgent),
        isOpera: /opera/ig.test(_userAgent),
        /*end browser detect*/
        cssCheck: function(cssText){
            /*check wheither insist the specific style,eg: backgroundSize */
            var style = document.createElement('cssText').style, domPrefixes = 'Webkit Moz O ms Khtml'.split(' '), ucProp = cssText.charAt(0).toUpperCase() + cssText.substr(1), props = (cssText + ' ' + domPrefixes.join(ucProp + ' ') + ucProp).split(' ');
            for (var i in props) {
                if (style[props[i]] !== undefined) {
                    return true;
                }
            }
            return false;
        },
        //used to throttle
        process:function(fn,delay){
        	var timer =null;
        	return function(){
        		var args=arguments,context=this;
        		clearTimeout(timer);
        		setTimeout(function(){
                 fn.apply(context,args);
				},delay);        		
        	}
        }
    }
})(jQuery)

