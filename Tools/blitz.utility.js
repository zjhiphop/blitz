/*Blitz tools Utility
 * depandency:  blitz.clone.js
 */
(function($) {'use strict'
    var _userAgent = (navigator || window.navigator).userAgent;
    var blitz=blitz||{};
    blitz.clone = blitz.clone||function(o) {
        if(Object.create) {
            return Object.create(o);
        }
        else {
            var f = function() {
            };
            f.prototype = o;
            return new f;
        }

    };
    blitz.utility = {
        log : function(msg) {
            if( typeof msg === 'object') {
                this.config._result = '';
                this.getAllObjProp(msg);
                msg = this.config._result;
                this._dispose();
            }
            if(console.log) {
                console.log(msg);
            }
            else
            if(window.status) {
                window.status = msg;
            }
            else {
                $('title').text($('title').text() + ' log:' + msg);
            }
        },
        getAllObjProp : function(obj) {//after excute this method,you must excute
            // dispose method to reset number
            for(var i in obj) {
                if(obj.hasOwnProperty(i)) {
                    if( typeof obj[i] === 'object') {
                        var j = (this.config.deep++);
                        while(j--)
                        this.config._result += '  ';
                        this.config._result += i + '--\r\n';
                        this.getAllObjProp(obj[i]);
                        //use strict will not allow use
                        // arguments.callee,so i changed method
                        this.config.deep--;
                    }
                    else {
                        var j = this.config.deep;
                        while(j--) {
                            this.config._result += '  ';
                        }
                        this.config._result += i + '-' + obj[i] + '\r\n';
                    }
                }
            }
        },
        augement : function(a, b) {
            if(arguments.length < 2) {
                return a;
            }
            else
            if(a && b && ( typeof a === 'object' || typeof b === 'object')) {
                var refb = blitz.clone(b);
                for(var i in refb) {
                    a[i] = refb[i];
                }
            }
            else {
                return a;
            }
        },
        createStyleElemnt : function(innerhtml) {
            if(document.all) {
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
        config : {
            _result : '',
            _inObj : false,
            deep : 0
        },
        _dispose : function() {
            this.config = {
                _result : '',
                _inObj : false,
                deep : 0
            };
        },
        /*browser detect*/
        isIE : /*@cc_on!@*/0,
        isIE6 : /ie 6/ig.test(_userAgent),
        isIE7 : /ie 7/ig.test(_userAgent),
        isIE8 : /ie 8/ig.test(_userAgent),
        isIE9 : /ie 9/ig.test(_userAgent),
        isIpad : /ipad/ig.test(_userAgent),
        isChrome : /chrome/ig.test(_userAgent),
        isFirefox : /firefox/ig.test(_userAgent),
        isOpera : /opera/ig.test(_userAgent),
        isSafari : _userAgent.indexOf("Safari") > -1 && _userAgent.indexOf("Chrome") < 1,
        /*end browser detect*/
        cssCheck : function(cssText) {
            /*check wheither insist the specific style,eg: backgroundSize */
            var style = document.createElement('cssText').style, domPrefixes = 'Webkit Moz O ms Khtml'.split(' '), ucProp = cssText.charAt(0).toUpperCase() + cssText.substr(1), props = (cssText + ' ' + domPrefixes.join(ucProp + ' ') + ucProp).split(' ');
            for(var i in props) {
                if(style[props[i]] !== undefined) {
                    return true;
                }
            }
            return false;
        },
        flashChecker : function() {
            var hasFlash = 0;
            var flashVersion = 0;
            var isIE = /*@cc_on!@*/0;
            if(isIE) {
                var swf = new ActiveXObject('ShockWaveFlash.ShockWaveFlash');
                if(swf) {
                    hasFlash = 1;
                    VSwf = swf.GetVariable("$version");
                    flashVersion = parseInt(VSwf.split(" ")[1].split(",")[0], 10);
                }
            }
            else {
                if(navigator.plugins && navigator.plugins.length > 0) {
                    var swf = navigator.plugins["Shockwave Flash"];
                    if(swf) {
                        hasFlash = 1;
                        var desflash = swf.description.split(" ");
                        for(var i = 0; i < desflash.length; i++) {
                            if(isNaN(desflash[i]))
                                continue;
                            flashVersion = parseInt(desflash[i], 10);
                        }
                    }
                }
            }
            return {
                hasInstall : hasFlash || swfobject.hasFlashPlayerVersion("10"),
                version : flashVersion || swfobject.getFlashPlayerVersion().major
            };
        },
        //used to throttle
        process : function(fn, delay) {
            var timer = null;
            return function() {
                var args = arguments, context = this;
                clearTimeout(timer);
                setTimeout(function() {
                    fn.apply(context, args);
                }, delay);
            }
        },
        //check scroll state
        getScrollY : function() {
            return window.pageYOffset || (document.documentElement && document.documentElement.scrollTop) || (document.body && document.body.scrollTop);
        },
        getScrollX : function() {
            return window.pageXOffset || (document.documentElement && document.documentElement.scrollLeft) || (document.body && document.body.scrollLeft);
        },
        profile : function(fn) {
            if(console && typeof fn === 'function') {
                return function() {
                    console.profile();
                    fn();
                    console.profileEnd();
                };
            }
            else {
                return function() {
                    var _startTime = +new Date;
                    fun();
                    var _endTime = +new Date;
                    blitz.utility.log('total time:' + _endTime - _startTime);
                };
            }
        },
        purge : function(jqueryElement) {
            if( typeof (jqueryElement) !== "object") {
                this._purge(jqueryElement);
                return;
            }
            var _len = jqueryElement.length;
            if(_len === 0) {
                return;
            }
            var i;
            for( i = 0; i < _len; i += 1) {
                this._purge(jqueryElement[i]);
            }
        },
        _purge : function(domElement) {
            if(!domElement) {
                return;
            }
            var _attr = domElement.attributes, i, _len, _name;
            if(_attr) {
                _len = _attr.length;
                for( i = 0; i < _len; i += 1) {
                    _name = _attr[i].name;
                    if( typeof domElement[_name] === 'function') {
                        domElement[_name] = null;
                    }
                }
            }
            _attr = domElement.childNodes;
            if(_attr) {
                _len = _attr.length;
                for( i = 0; i < _len; i += 1) {
                    this._purge(domElement.childNodes[i]);
                }
            }
        },
        loadTemplate : function(elem, URL, data, include, setting) {
            this.purge(elem.children());
            $.ajaxSetup({
                cache : true
            });
            if(/ie 6/i.test(navigator.userAgent)) {
                document.execCommand("BackgroundImageCache", false, true);
            }
            elem.setTemplateURL(URL + "?siteversion=" + window.siteVersion, include, setting);
            elem.processTemplate(data);
        },
        loadTemplateToText : function(URL, data, proceeSetting, include, createSetting) {
            var _templateText = "";
            $.ajaxSetup({
                cache : true
            });
            if(/ie 6/i.test(navigator.userAgent)) {
                document.execCommand("BackgroundImageCache", false, true);
            }
            var _tem;
            _tem = $.createTemplateURL(URL + "?siteversion=" + window.siteVersion, include, createSetting);
            _templateText = $.processTemplateToText(_tem, data, proceeSetting);
            return _templateText;
        }
    };
    $.util$=blitz.utility;
})(jQuery)