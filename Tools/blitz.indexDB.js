/**
 * @author jade.zhangjin
 * This lib is built to Compatible with multiple browsers
 */
(function(util){
    'use strict'
    var prefixes = 'moz moz_ o webkit ms khtml'.split(' ');
    blitz.indexDB = {
        option: {
            name: 'Test',
            version: '1.0',
            description: 'This is a test DB!',
            entity: {
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
                }],//used to create storeObject
            },
            openSuccessCb: function(){
            },//open db success callback
            transSuccessCb: function(){
            },//transaction success callback
            cursorSuccessCb: function(){
            }//cursor success callback
        },
        init: function(option){
            var all = ('indexedDB\x24' + prefixes.join('indexedDB\x24') + 'indexedDB').split('$');
            var _db = {};
            for (var i = all.length - 1; i--;) 
                if (window[all[i]]) 
                    _db = window[all[i]];
            if (!_db) {
                throw new Error('Your browser is not consist indexDB!');
            }
            var opt = util.augement(this.option, option);
            var request = _db.open(this.option['name']);
            var _indexdb = this;
            request.onsuccess = function(){
                var db = _indexdb.DB[opt['name'] + opt['version']] = request.result;
                if (db.version !== opt['version']) {
                    var req_version = db.setVersion(opt['version']);
                    req_version.onsuccess = function(event){
                        //we can't use db to call method createObjectStore to create a new DB
                        _indexdb._createObjectStore(db);
                        if (opt.openSuccessCb) 
                            opt.openSuccessCb();
                    }
                    req_version.onerror = function(event){
                        util.log(event);
                    }
                }
                db.close();
            }
            request.onerror = function(event){
                util.log(event)
            };
        },
        DB: {},
        _createObjectStore: function(db){
            var entity = this.option.entity;
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
            for (var j = entity.data.length - 1; j--;) {
                if (entity.data.hasOwnProperty(j)) {
                    objectStore.add(entity.data[j]);
                }
            }
        },
        getAll: function(){
            // get IDBTransaction by IDBDatabase  
            var transaction = db.transaction(["customers"]);
            //get IDBObjectStore by IDBTransaction
            var objectStore = transaction.objectStore("customers");
            var cursor = objectStore.openCursor();
            // open cursor and read all data
            cursor.onsuccess = function(event){
                var cursor = event.target.result;
                var result = {};
                if (cursor) {
                    result[cursor.key] = cursor.value;
                    cursor.continue();//here is not a error,it is used for cursor
                }
                if (this.option.cursorSuccessCb) 
                    cursorSuccessCb(result);
                return result;
            }
            cursor.onerror = function(event){
                util.log(event);
            }
        },
        trans: function(){
        }
    }
    
})(blitz.utility)
