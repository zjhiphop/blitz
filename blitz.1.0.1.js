/**
 *this lib is use to encapsulation DB method (dependence of underscore)
 */
!
function(_) {
    'use strict'
    var open = openDatabase ? openDatabase : undefined;
    blitz.WebSQLDB = blitz.WebSQLDB = {
        $: {
            name: 'myDB',
            version: '1.0',
            desc: '',
            size: 1024,
            errorMsg: 'Your browser is not assist WebStorage!Please use IE9+,chrome,ff,opera,safari!'
        },
        execute: function() {

        },
        init: function(option) {
            if (open) {
                throw new Error(this.$.errorMsg);
            }
            this.$ = _.extend(this.$, option);
            if (cachedDB[this.$.name] && confirm('The DB you want to create is existed,do you want replace it?')) {
                cachedDB[this.$.name] = this.createDB(this.$.name, this.$.version, this.$.size);
                return;
            }
            cachedDB[this.$.name] = createDB(this.$.name, this.$.version, this.$.desc, this.$.size);
        },
        createDB: function(name, version, desc, size) {
            return open(name, version, desc, size);
        },
        insert: function(sql, data, successCb, failCb) {

        },
        update: function(sql, data, successCb, failCb) {

        },
        del: function(sql, data, successCb, failCb) {

        },
        getDB: function(name) {
            if (cachedDB[name]) {
                return cachedDB[name];
            } else {

            }
        },
        cachedDB: {

        }
    }
}(_)/**
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
/**
 * @author jade.zhangjin
 * This lib is built to Compatible with multiple browsers
 */
(function(util){
    'use strict'
    var prefixes = 'moz moz_ o webkit ms khtml'.split(' ');
    var all = ('IndexedDB\x24' + prefixes.join('IndexedDB\x24') + 'IndexedDB').split('$');
    var _db = null;
    for (var i = all.length - 1; i--;) 
        if (window[all[i]]) 
            _db = window[all[i]];
    if (!_db) {
        alert('Your browser is not consist indexDB!');
    }
    if ('webkitIndexedDB' in window) {
        window.IDBTransaction = window.webkitIDBTransaction;
        window.IDBKeyRange = window.webkitIDBKeyRange;
        window.IDBCursor = window.webkitIDBCursor;
    }
    blitz.indexDB = {
        DB: {},
        option: {
            name: 'Test',
            version: '3.0',
            description: 'This is a test DB!',
            entity: [{
                objName: 't1',
                keyName: 'id',
                keyIncrement: true,
                indexCols: {
                    email: true//email is a column used to index,and 'true' is used to as uniqued or not 
                },
                data: [{
                    id: 1,
                    name: 'jade',
                    email: 'zhangjin_2006@126.com'
                }, {
                    id: 2,
                    name: 'jade',
                    email: 'zjhiphop@gmail.com'
                }]//used to create storeObject
            }],
            openSuccessCb: function(){
                util.log('openSuccessCb');
            },//open db success callback
            transSuccessCb: function(){
                util.log('transSuccessCb');
            },//transaction success callback
            transAbortCb: function(){
                util.log('transAbortCb');
            },
            transTimeoutCb: function(){
                util.log('transTimeoutCb');
            },
            cursorSuccessCb: function(){
                util.log('cursorSuccessCb');
            },//cursor success callback
            addDataSuccessCb: function(event){
                util.log(event);
                util.log('addDataSuccessCb');
            },
            putDataSuccessCb: function(){
                util.log('putDataSuccessCb');
            },
            deleteDataSuccessCb: function(){
                util.log('deleteDataSuccessCb');
            },
            getDataSuccessCb: function(event){
                util.log(event.target.result);
                util.log('getDataSuccessCb');
            }
        },
        _constant: {
            trans: {
                read_only: IDBTransaction.READ_ONLY,
                read_write: IDBTransaction.READ_WRITE,
                version_change: IDBTransaction.VERSION_CHANGE
            },
            cursor: {
                next: IDBCursor.NEXT,
                next_unique: IDBCursor.NEXT_NO_DUPLICATE,
                prev: IDBCursor.PREV,
                prev_unique: IDBCursor.PREV_NO_DUPLICATE
            }
        },
        _config: {
            DBReady: false
        },
        init: function(option){
            util.augement(this.option, option);
            var opt = this.option, request = _db.open(this.option['name']), _indexdb = this;
            request.onsuccess = function(){
                var dbName = opt['name'] + opt['version'];
                var db = _indexdb.DB[dbName] = request.result;
                _indexdb._config.DBReady = true;
                if (db.version !== opt['version']) {
                    var req_version = db.setVersion(opt['version']);
                    req_version.onsuccess = function(event){
                        //we can't use db to call method createObjectStore to create a new DB
                        _indexdb._createObjectStore(db);
                        if (opt.openSuccessCb) 
                            opt.openSuccessCb();
                    }
                    req_version.onerror = function(event){
                        util.log('req_version.onerror');
                    }
                }
                else {
                    if (opt.openSuccessCb) 
                        opt.openSuccessCb();
                }
                //db.close();
            }
            request.onerror = function(event){
                util.log('request.onerror')
            };
        },
        _createObjectStore: function(db){
            var entity = '';
            for (var i = this.option.entity.length; i--;) {
                util.log(entity);
                entity = this.option.entity[i];
                if (db.objectStoreNames.contains(entity.objName)) {
                    db.deleteObjectStore(entity.objName);
                }
                var objectStore = db.createObjectStore(entity.objName, {
                    keyPath: entity.keyName,
                    autoIncrement: entity.keyIncrement// auto increment  
                });
                for (var i in entity.indexCols) {
                    if (entity.indexCols.hasOwnProperty(i)) {
                        objectStore.createIndex(i, i, {
                            unique: entity.indexCols[i]
                        });
                    }
                }
                for (var j = entity.data.length; j--;) {
                    if (entity.data.hasOwnProperty(j)) {
                        objectStore.add(entity.data[j]);
                    }
                }
            }
        },
        getAll: function(tableName, tranMethod){
            var cursor = this._cursorFactory('normal', tableName, tranMethod);
            // open cursor and read all data by index
            this._cursorHandler(cursor, this.option);
        },
        getAllByIndex: function(tableName, tranMethod, cursorMethod, range){
            var cursor = this._cursorFactory('index', tableName, tranMethod, cursorMethod, range);
            // open cursor and read all data by index
            this._cursorHandler(cursor, this.option);
        },
        _cursorHandler: function(cursor, opt){
            cursor.onsuccess = function(event){
                var _cursor = event.target.result;
                var result = {};
                if (Array.isArray(_cursor)) {
					result=_cursor;
				}else if (_cursor&&_cursor.value){ 
                    result = _cursor.value;
                    if(_cursor['continue']&&typeof _cursor['continue']==='function')_cursor['continue']();//here is not a error,it is used for cursor
                }
                if (opt.cursorSuccessCb) 
                    opt.cursorSuccessCb(result);
                return result;
            }
            cursor.onerror = function(event){
                util.log(event);
            }
        },
        deleteAll: function(){
            if (confirm('Are you sure to delete all data now?')) {
                this._clear();
            }
        },
        getCurrentDB: function(){
            var opt = this.option;
            var dbName = opt['name'] + opt['version'];
            return this.DB[dbName];
        },
        /*
         * @param method:readonly,read_write,version_change
         * @param onabort:abort event handler
         * @param oncomplete:complete event handler
         * @param ontimeout:timeoout event handler
         */
        trans: function(tableName, method, oncomplete, onabort, ontimeout){
            try {
                var _trans_method = this._constant.trans[method], _db = this.getCurrentDB();
                // get IDBTransaction by IDBDatabase  
                var transaction = _db.transaction([tableName], _trans_method, 0);
                transaction.oncomplete = oncomplete || this.option.transSuccessCb;
                transaction.oncomplete = onabort || this.option.transAbortCb;
                transaction.ontimeout = onabort || this.option.transTimeoutCb;
                //get IDBObjectStore by IDBTransaction
                return transaction.objectStore(tableName);
            } 
            catch (e) {
                util.log(e);
            }
        },
        getCursor: function(tableName, tranReadMethod){
            var tranReadMethod = tranReadMethod || 'read_only';
            var keyRange = IDBKeyRange.lowerBound(0),trans = this.trans(tableName, tranReadMethod),cursor;
			if(trans.getAll){
				cursor=trans.getAll();
			}else{
				cursor=trans.openCursor(keyRange);
			}
			
            return cursor;
        },
        /*
         * tableName:entity name
         * tranReadMethod: read_only or others
         * cursorMethod : 'next' or 'pre' or others
         * range eg: {begin:col,begin_include:true,end:col,end_include:true} or {only:col,isContains:true}
         */
        getRangeCursorByIndex: function(tableName, tranReadMethod, cursorMethod, range){
            var tranReadMethod = tranReadMethod || 'read_only', cursor = this._constant.cursor, _curM = cursor[cursorMethod] || cursor.next;
            if (range) {
                var keyRange = null;
                if (range.only) {
                    keyRange = IDBKeyRange.only(range.begin, range.begin_include);
                }
                if (range.begin && range.end) {
                    keyRange = IDBKeyRange.bound(range.begin, range.begin_include, range.end, range.end_include);
                }
                else 
                    if (range.begin) {
                        keyRange = IDBKeyRange.lowerBound(range.begin, range.begin_include);
                    }
                    else 
                        if (range.end) {
                            keyRange = IDBKeyRange.upperBound(range.end, range.end_include);
                        }
            }
            var cursor = this.trans(tableName, tranReadMethod).openCursor(keyRange, _curM);
            return cursor;
        },
        _bindCb: function(request, successcb, errorcb, type){
            request.onsuccess = successcb ||
            function(event){
                util.log(request + ' success');
            };
            request.onerror = errorcb ||
            function(event){
                util.log('Error: ' + type + ' operation fail');
            };
        },
        _requestFactory: function(type, tableName, dataOrKeyPath, isreadonly){
            var objectStore = this.trans(tableName, isreadonly ? 'read_only' : 'read_write');
            var request = objectStore[type](dataOrKeyPath);
            this._bindCb(request, this.option[type + 'DataSuccessCb'], null, type);
        },
        _cursorFactory: function(type, tableName, tranReadMethod, cursorMethod, range){
            switch (type) {
                case 'normal':
                    return this.getCursor(tableName, tranReadMethod);
                case 'index':
                    return this.getRangeCursorByIndex(tableName, tranReadMethod, cursorMethod, range);
                default:
                    return this.getCursor(tableName, tranReadMethod);
            }
        },
        addData: function(tableName, data){
            this._requestFactory('add', tableName, data);
        },
        putData: function(tableName, data){
            this._requestFactory('put', tableName, data);
        },
        delData: function(tableName, keyPath){
            this._requestFactory('delete', tableName, keyPath);
        },
        getData: function(tableName, keyPath){
            this._requestFactory('get', tableName, keyPath, true);
        },
        _clear: function(){
            this._requestFactory('clear', tableName);
        }
    }
})(blitz.utility)
/*
 *This file is used to manage jQuery plugin for Large Applications
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 Inspired by base2 and Prototype
*/
!function($){
	$.plugin=function(name,object){
	 $.fn[name]=function(options){
	   var args=[].prototype.slice.call(arguments,1);
	   return this.each(function() {
			var instance = $.data(this, name);
			if (instance) {
				instance[options].apply(instance, args);
			} else {
				instance = $.data(this, name, new object(options,this));
			}
	   });
	 }
	}
	/*
	*All plugin is mananged by this Class
	*/
	var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
	// The base Class implementation (does nothing)
	this.Class = function(){};

	// Create a new Class that inherits from this class
	Class.extend = function(prop) {
		var _super = this.prototype;
		
		// Instantiate a base class (but only create the instance,
		// don't run the init constructor)
		initializing = true;
		var prototype = new this();
		initializing = false;
		
		// Copy the properties over onto the new prototype
		for (var name in prop) {
		  // Check if we're overwriting an existing function
		  prototype[name] = typeof prop[name] == "function" && 
			typeof _super[name] == "function" && fnTest.test(prop[name]) ?
			(function(name, fn){
			  return function() {
				var tmp = this._super;
				
				// Add a new ._super() method that is the same method
				// but on the super-class
				this._super = _super[name];
				
				// The method only need to be bound temporarily, so we
				// remove it when we're done executing
				var ret = fn.apply(this, arguments);        
				this._super = tmp;
				
				return ret;
			  };
			})(name, prop[name]) :
			prop[name];
		}
		
		// The dummy class constructor
		function Class() {
		  // All construction is actually done in the init method
		  if ( !initializing && this.init )
			this.init.apply(this, arguments);
		}
		
		// Populate our constructed prototype object
		Class.prototype = prototype;
		
		// Enforce the constructor to be what we expect
		Class.prototype.constructor = Class;

		// And make this class extendable
		Class.extend = arguments.callee;
		
		return Class;
	};
}(jQuery)/*
 This lib is used to make a 
 * */
(function($) {
    'use strict'
	 blitz.localStorage = window.localStorage ? window.localStorage : (function() {
		var store = {};
		if(/*@cc_on!@*/0) {
			store = {
				length : 0,
				key : {},
				_cacheDom:{},
				clear : function() {
					var cache=this.getCachedElement();
					for(var i in this.key){
						if(this.key.hasOwnProperty(i)){
							cache.removeAttribute(key[i]);						
						}						
					}
				},
				getItem : function(key) {
				    if(blitz.utility.isIE6){
						var cache=this.getCachedElement();
						var isLoaded=false;
						var getItemInterval=setInterval(function(){
							try{
								cache.load('cache');
								isLoaded=true;
								clearInterval(getItemInterval);
							}
							catch(e){}
						},15);
						return (function(loaded){
							if(loaded) arguments.callee(isLoaded);
							else return cache.getAttribute(key);
						})(isLoaded);	
					}else{
						var cache=this.getCachedElement();
						cache.load('cache');
						return cache.getAttribute(key);
					}
				},
				removeItem : function(key) {
					var cache=this.getCachedElement();
					cache.removeAttribute(key);
				},
				setItem : function(key, value) {
					if(blitz.utility.isIE6){
						if(this.key&&!this.key[key]) {
								this.key = key;
								this.length++;
							}
							var cache=this.getCachedElement();
							cache.setAttribute(key,value);
							var setItemInterval=setInterval(function(){
								try{
									cache.save('cache');
									clearInterval(setItemInterval);								
								}catch(e){
								}
						},15);
					}else{
						if(!this.key[key]) {
						this.key = key;
						this.length++;
						}
						var cache=this.getCachedElement();
						cache.setAttribute(key,value);
						cache.save('cache');
					}
				},
				getCachedElement : function() {
					if(!this._cacheDom['storage-cache']){
						var elem=document.getElementsByTagName('storage-cache')[0];
						if(!elem) {
						   if(blitz.utility.isIE6){
						    blitz.utility.createStyleElemnt('.userData {BEHAVIOR: url(#default#userdata)}');
						    $('body').append('<INPUT class=userData id=storage-cache>');
							elem=document.getElementById('storage-cache');
						   }else{
							var element = document.createElement('storage-cache');
							element.style.display = 'none';
							element.style.behavior = "url('#default#userData')";
							document.body.appendChild(element);
						   }
						}
						this._cacheDom['storage-cache']=elem;
					}
					return this._cacheDom['storage-cache'];					
				}
			}
			return store;
		} else {
			throw new Error("Your browser is not consist localStorage");
		}
	})();
})(jQuery)/*
 *Examples: 
 *
 //Pub/sub on a centralized mediator
 mediator.name = "tim";
 mediator.subscribe('nameChange', function(arg){
 console.log(this.name);
 this.name = arg;
 console.log(this.name);
 });
 mediator.publish('nameChange', 'david'); //tim, david
 //Pub/sub via third party mediator
 var obj = { name: 'sam' };
 mediator.installTo(obj);
 obj.subscribe('nameChange', function(arg){
 console.log(this.name);
 this.name = arg;
 console.log(this.name);
 });
 obj.publish('nameChange', 'john'); //sam, john
 * */
blitz.mediator = ( function() {
    var subscribe = function(channel, fn) {
        if(!mediator.channels[channel])
            mediator.channels[channel] = [];
        mediator.channels[channel].push({
            context : this,
            callback : fn
        });
        return this;
    }, publish = function(channel) {
        if(!mediator.channels[channel])
            return false;
        var args = Array.prototype.slice.call(arguments, 1);
        for(var i = 0, l = mediator.channels[channel].length; i < l; i++) {
            var subscription = mediator.channels[channel][i];
            subscription.callback.apply(subscription.context, args);
        }
        return this;
    };
    return {
        channels : {},
        publish : publish,
        subscribe : subscribe,
        installTo : function(obj) {
            obj.subscribe = subscribe;
            obj.publish = publish;
        }
    };
}());
// A generic observable subject class that is useful in model creation.
//
!
function(exports) {
	'use strict'
    exports.observer = function(events) {
        var groups = {};

        var addEvent = function(event) {
            if(groups.hasOwnProperty(event)) {
                throw new Error('addEvent: Already an event named "' + event + '"');
            }
            groups[event] = [];
        };
        var addObserver = function(event, observer) {
            if(!groups.hasOwnProperty(event)) {
                throw new Error('addObserver: No event "' + event + '".');
            }
            var group = groups[event];
            for(var i = 0, ilen = group.length; i < ilen; i++) {
                if(group[i] === observer) {
                    throw new Error('Cannot add the same listener more than once.');
                }
            }
            group.push(observer);
        };
        var removeObserver = function(event, observer) {
            if(!groups.hasOwnProperty(event)) {
                throw new Error('removeObserver: No event "' + event + '".');
            }
            var group = groups[event];
            for(var i = 0, ilen = group.length; i < ilen; i++) {
                if(group[i] === observer) {
                    group.splice(i, 1);
                    return;
                }
            }
            throw new Error('removeObserver: Did not find the observer and so could not remove it.');
        };
        var notifyObservers = function(event, data) {
            if(!groups.hasOwnProperty(event)) {
                throw new Error('notifyObservers: No event "' + event + '".');
            }
            var group = groups[event];
            for(var i = 0, ilen = group.length; i < ilen; i++) {
                group[i](data);
            }
        };
        // initialize
        for(var i = 0, ilen = events.length; i < ilen; i++) {
            var event = events[i];
            addEvent(event);
        };

        return {
            addEvent : addEvent,
            addObserver : addObserver,
            removeObserver : removeObserver,
            notifyObservers : notifyObservers
        };
    };
}(blitz)
/*Blitz tools Utility
 * depandency:  blitz.clone.js
 */
(function($,undefined) {'use strict'
    var _userAgent = (navigator || window.navigator).userAgent;
    if(!window.console) {
        window.firebug = document.createElement('script');
        firebug.setAttribute('src', 'http://getfirebug.com/releases/lite/1.2/firebug-lite-compressed.js');
        document.body.appendChild(firebug);
        //@off
        (function fire_bug() {
            if(window.firebug.version) {
                firebug.init();
            }
            else {
            	setTimeout(fire_bug);
            }
        })();
        void (firebug);
        firebug.onerror=function (){
        	if(!window.console){
        		var names = ['log', 'debug', 'info', 'warn', 'error', 'assert', 
                     'dir', 'dirxml', 'group', 'groupEnd', 'time', 'timeEnd', 
                     'count', 'trace', 'profile', 'profileEnd'];
                window.console = {};
                for(var i = 0; i < names.length; ++i){
                	window.console[names[i]] = function() {};
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
                var variable = url.replace(/#/i,'&').split("?")[1];
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
        memoize : function(fn) {"use strict";
            var cache = (fn.memoize = fn.memoize || {}), stringifyJson = JSON.stringify, sliceArray = Array.prototype.slice;

            return function() {
                var hash = stringifyJson(sliceArray.call(arguments));
                return ( hash in cache) ? cache[hash] : cache[hash] = fn.apply(this, arguments);
            };
        }
    };
    $.util$ = blitz.utility;
})(jQuery)