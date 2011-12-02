/*Blitz tools Utility
 * depandency:  blitz.clone.js
 */
(function($, undefined) {'use strict';
    var _userAgent = (navigator || window.navigator).userAgent;
    if(!window.console) {
        window.firebug = document.createElement('script');
        firebug.setAttribute('src', 'http://getfirebug.com/releases/lite/1.2/firebug-lite-compressed.js');
        document.body.appendChild(firebug);
        //@off
			(function fire_bug() {
					if (window.firebug.version) {
						firebug.init();
					} else {
						setTimeout(fire_bug);
					}
				})();
			void(firebug);
			firebug.onerror = function () {
				if (!window.console) {
					var names = ['log', 'debug', 'info', 'warn', 'error', 'assert',
						'dir', 'dirxml', 'group', 'groupEnd', 'time', 'timeEnd',
						'count', 'trace', 'profile', 'profileEnd'];
					window.console = {};
					for (var i = 0; i < names.length; ++i) {
						window.console[names[i]] = function () {};
					}
				}
			}
		}
		//@on
    var blitz = blitz || {};
    blitz.clone = blitz.clone ||
    function(o) {
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
            //@off
				var style = document.createElement('cssText').style,
				domPrefixes = 'Webkit Moz O ms Khtml'.split(' '),
				ucProp = cssText.charAt(0).toUpperCase() + cssText.substr(1),
				props = (cssText + ' ' + domPrefixes.join(ucProp + ' ') + ucProp).split(' ');
				//@on
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
                timer = setTimeout(function() {
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
            var args = [].slice.call(arguments, 0), context = this;
            if(console && typeof fn === 'function') {
                return function() {
                    console.profile();
                    fn.apply(context, args);
                    console.profileEnd();
                };
            }
            else {
                return function() {
                    var _startTime = +new Date;
                    fn.apply(context, args);
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
        },
        /*JS method to read url arguments*/
        getUrlValue : function(url) {
            var url = (url !== undefined) ? url : window.location.href;
            if(url.indexOf("#") > -1 && url.indexOf("?") > -1) {
                var variable = url.replace(/#/i, '&').split("?")[1];
            }
            else {
                var variable = url.split("?")[1];
            }
            if(variable == '' || typeof variable == "undefined") {
                return {};
            }
            else {
                var value = {};
                variable = variable.split("&");
                for(var i = 0, m = variable.length; i < m; i++) {
                    value[variable[i].split("=")[0]] = variable[i].split("=")[1];
                }
                return value;
            }
        },
        setUrlValue : function(sUrl, data) {
            var url = sUrl || window.location.href;
            var prefix;
            if(url.indexOf('#') > -1) {
                var prefix = url.split('#')[1];
                url = url.split('#')[0];
            }
            if(url.indexOf("?") < 0) {
                url += '?';
            }
            var o = getUrlValue(url);
            for(var i in data) {
                o[i] = data[i];
            }
            url = url.split("?")[0] + '?';
            for(var i in o) {
                url += i + '=' + o[i] + '&';
            }
            url = url.substr(0, url.length - 1);
            return url;
        },
        /*End JS method to read url arguments*/
        //proxy dom event
        proxy : function(context, func) {
            var thisObject = context || this;
            return (function() {
                return func.apply(context, arguments);
            });
        },
        memoize : function(fn) {
            var cache = (fn.memoize = fn.memoize || {}), stringifyJson = JSON.stringify, sliceArray = Array.prototype.slice;

            return function() {
                var hash = stringifyJson(sliceArray.call(arguments));
                return ( hash in cache) ? cache[hash] : cache[hash] = fn.apply(this, arguments);
            };
        },
        animate : // shim layer with setTimeout fallback
        (function() {
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
            function(/* function */callback, /* DOMElement */element) {
                window.setTimeout(callback, 1000 / 60, +new Date);
            };

        })(),
        //javascript yield
        processItems : function(items, processItem, delay) {
            delay = delay || 10;
            var queue = items.slice(0);
            function processNextBatch() {
                var nextItem, startTime = +new Date;
                while(startTime + 100 >= +new Date) {
                    nextItem = queue.shift();
                    if(!nextItem)
                        return processItem(nextItem);
                }
                setTimeout(processNextBatch, delay);
            }

            processNextBatch();
        },
        //check absolute url from relative url
        qualifyURL : function(url) {
            var img = document.createElement('img');
            img.src = url;
            // set string url
            url = img.src;
            // get qualified url
            img.src = null;
            // no server request
            return url;
        },
        getSelection : function() {
            var userSelection;
            if(window.getSelection) {
                userSelection = window.getSelection();
            }
            else
            if(document.selection) {// should come last; Opera!
                userSelection = document.selection.createRange();
            }
            return userSelection;
        },
        getRangeObject : function(selectionObject) {
            if(selectionObject.getRangeAt)
                return selectionObject.getRangeAt(0);
            else {// Safari!
                var range = document.createRange();
                range.setStart(selectionObject.anchorNode, selectionObject.anchorOffset);
                range.setEnd(selectionObject.focusNode, selectionObject.focusOffset);
                return range;
            }
        }
    }
    $.util$ = blitz.utility;
})(jQuery)