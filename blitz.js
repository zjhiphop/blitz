if ( "undefined" == typeof(Blitz) || !Blitz ) {
    var Blitz = {};
}

Blitz.Script = {
    loadScript: function(url, onload) {
        Blitz.Script.loadScriptDomElement(url, onload);
    },

    loadScripts: function(aUrls, onload) {
        // first pass: see if any of the scripts are on a different domain
        var nUrls = aUrls.length;
        var bDifferent = false;
        for ( var i = 0; i < nUrls; i++ ) {
            if ( Blitz.Script.differentDomain(aUrls[i]) ) {
                bDifferent = true;
                break;
            }
        }

        // pick the best loading function
        var loadFunc = Blitz.Script.loadScriptXhrInjection;
        if ( bDifferent ) {
            if ( -1 != navigator.userAgent.indexOf('Firefox') || 
                 -1 != navigator.userAgent.indexOf('Opera') ) {
                loadFunc = Blitz.Script.loadScriptDomElement;
            }
            else {
                loadFunc = Blitz.Script.loadScriptDocWrite;
            }
        }

        // second pass: load the scripts
        for ( var i = 0; i < nUrls; i++ ) {
            loadFunc(aUrls[i], ( i+1 == nUrls ? onload : null ), true);
        }
    },

    differentDomain: function(url) {
        if ( 0 === url.indexOf('http://') || 0 === url.indexOf('https://') ) {
            var mainDomain = document.location.protocol + 
                "://" + document.location.host + "/";
            return ( 0 !== url.indexOf(mainDomain) );
        }
        
        return false;
    },

    loadScriptDomElement: function(url, onload) {
        var domscript = document.createElement('script');
        domscript.src = url;
        if ( onload ) {
            domscript.onloadDone = false;
            domscript.onload = function() { 
                if ( !domscript.onloadDone ) {
                    domscript.onloadDone = true; 
                    onload(); 
                }
            };
            domscript.onreadystatechange = function() {
                if ( ( "loaded" === domscript.readyState || "complete" === domscript.readyState ) && !domscript.onloadDone ) {
                    domscript.onloadDone = true;
                    onload();
                }
            }
        }
        document.getElementsByTagName('head')[0].appendChild(domscript);
    },

    loadScriptDocWrite: function(url, onload) {
        document.write('<scr' + 'ipt src="' + url + 
                       '" type="text/javascript"></scr' + 'ipt>');
        if ( onload ) {
            // we can't tie it to the script's onload, so use window
            // thus, it doesn't fire as early as it might have
            Blitz.addHandler(window, "load", onload);
        }
    },

    queuedScripts: new Array(),

    loadScriptXhrInjection: function(url, onload, bOrder) {
        var iQueue = Blitz.Script.queuedScripts.length;
        if ( bOrder ) {
            var qScript = { response: null, onload: onload, done: false };
            Blitz.Script.queuedScripts[iQueue] = qScript;
        }

        var xhrObj = Blitz.Script.getXHRObject();
        xhrObj.onreadystatechange = function() { 
            if ( xhrObj.readyState == 4 ) {
                if ( bOrder ) {
                    Blitz.Script.queuedScripts[iQueue].response = xhrObj.responseText;
                    Blitz.Script.injectScripts();
                }
                else {
                    var se = document.createElement('script');
                    document.getElementsByTagName('head')[0].appendChild(se);
                    se.text = xhrObj.responseText;
                    if ( onload ) {
                        onload();
                    }
                }
            }
        };
        xhrObj.open('GET', url, true);
        xhrObj.send('');
    },

    injectScripts: function() {
        var len = Blitz.Script.queuedScripts.length;
        for ( var i = 0; i < len; i++ ) {
            var qScript = Blitz.Script.queuedScripts[i];
            if ( ! qScript.done ) {
                if ( ! qScript.response ) {
                    // STOP! need to wait for this response
                    break;
                }
                else {
                    var se = document.createElement('script');
                    document.getElementsByTagName('head')[0].appendChild(se);
                    se.text = qScript.response;
                    if ( qScript.onload ) {
                        qScript.onload();
                    }
                    qScript.done = true;
                }
            }
        }
    },

    getXHRObject: function() {
        var xhrObj = false;
        try {
            xhrObj = new XMLHttpRequest();
        }
        catch(e){
            var aTypes = ["Msxml2.XMLHTTP.6.0", 
                          "Msxml2.XMLHTTP.3.0", 
                          "Msxml2.XMLHTTP", 
                          "Microsoft.XMLHTTP"];
            var len = aTypes.length;
            for ( var i=0; i < len; i++ ) {
                try {
                    xhrObj = new ActiveXObject(aTypes[i]);
                }
                catch(e) {
                    continue;
                }
                break;
            }
        }
        finally {
            return xhrObj;
        }
    }
};

Blitz.addHandler = function(elem, type, func) {
    if ( elem.addEventListener ) {
        elem.addEventListener(type, func, false);
    }
    else if ( elem.attachEvent ) {
        elem.attachEvent("on" + type, func);
    }
};