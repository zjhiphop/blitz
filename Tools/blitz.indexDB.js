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
				}else{
                    if (_cursor.value) 
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
