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
}(_)