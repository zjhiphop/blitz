/*
 This lib is used to make a
 * */
(function($) {'use strict';
    blitz.localStorage = window.localStorage ? window.localStorage : (function() {
        var store = {};
        if(/*@cc_on!@*/0) {
            store = {
                length : 0,
                key : {},
                _cacheDom : {},
                clear : function() {
                    var cache = this.getCachedElement();
                    for(var i in this.key) {
                        if(this.key.hasOwnProperty(i)) {
                            cache.removeAttribute(key[i]);
                        }
                    }
                },
                getItem : function(key) {
                    if(blitz.utility.isIE6) {
                        var cache = this.getCachedElement();
                        var isLoaded = false;
                        var getItemInterval = setInterval(function() {
                            try {
                                cache.load('cache');
                                isLoaded = true;
                                clearInterval(getItemInterval);
                            }
                            catch(e) {
                            }
                        }, 15);
                        return (function(loaded) {
                            if(loaded) {
                                arguments.callee(isLoaded)
                            }
                            else{
                                return cache.getAttribute(key);
                            }                                
                        })(isLoaded);
                    }
                    else {
                        var cache = this.getCachedElement();
                        cache.load('cache');
                        return cache.getAttribute(key);
                    }
                },
                removeItem : function(key) {
                    var cache = this.getCachedElement();
                    cache.removeAttribute(key);
                },
                setItem : function(key, value) {
                    if(blitz.utility.isIE6) {
                        if(this.key && !this.key[key]) {
                            this.key = key;
                            this.length++;
                        }
                        var cache = this.getCachedElement();
                        cache.setAttribute(key, value);
                        var setItemInterval = setInterval(function() {
                            try {
                                cache.save('cache');
                                clearInterval(setItemInterval);
                            }
                            catch(e) {
                            }
                        }, 15);
                    }
                    else {
                        if(!this.key[key]) {
                            this.key = key;
                            this.length++;
                        }
                        var cache = this.getCachedElement();
                        cache.setAttribute(key, value);
                        cache.save('cache');
                    }
                },
                getCachedElement : function() {
                    if(!this._cacheDom['storage-cache']) {
                        var elem = document.getElementsByTagName('storage-cache')[0];
                        if(!elem) {
                            if(blitz.utility.isIE6) {
                                blitz.utility.createStyleElemnt('.userData {BEHAVIOR: url(#default#userdata)}');
                                $('body').append('<INPUT class=userData id=storage-cache>');
                                elem = document.getElementById('storage-cache');
                            }
                            else {
                                var element = document.createElement('storage-cache');
                                element.style.display = 'none';
                                element.style.behavior = "url('#default#userData')";
                                document.body.appendChild(element);
                            }
                        }
                        this._cacheDom['storage-cache'] = elem;
                    }
                    return this._cacheDom['storage-cache'];
                }
            }
            return store;
        }
        else {
            throw new Error("Your browser is not consist localStorage");
        }
    })();
})(jQuery)