/*
*  Monitor Object Property
*  Everytime property changed will output a stack info about context.
*  Support: IE 9+, Chrome, FF, opera, Safari.
*/

(function(obj, prop, handler){
  function printStackTrace() {
    var callstack = [];
    var isCallstackPopulated = false;
    try {
   i.dont.exist+=0; //doesn't exist- that's the point
    } catch(e) {
   if (e.stack) { //Firefox
     var lines = e.stack.split('\n');
     for (var i=0, len=lines.length; i<len; i++) {
    if (lines[i].match(/^\s*[A-Za-z0-9\-_\$\s]+\(/g)) {
      callstack.push(lines[i]);
    }
     }
     //Remove call to printStackTrace()
     callstack.shift();
     isCallstackPopulated = true;
   }
   else if (window.opera && e.message) { //Opera
     var lines = e.message.split('\n');
     for (var i=0, len=lines.length; i<len; i++) {
    if (lines[i].match(/^\s*[A-Za-z0-9\-_\$\s]+\(/)) {
      var entry = lines[i];
      //Append next line also since it has the file info
      if (lines[i+1]) {
     entry += ' at ' + lines[i+1];
     i++;
      }
      callstack.push(entry);
    }
     }
     //Remove call to printStackTrace()
     callstack.shift();
     isCallstackPopulated = true;
   }
    }
    if (!isCallstackPopulated) { //IE and Safari
   var currentFunction = arguments.callee.caller;
   while (currentFunction) {
     var fn = currentFunction.toString();
     var fname = fn.substring(fn.indexOf("function") + 8, fn.indexOf('')) || 'anonymous';
     callstack.push(fname);
     currentFunction = currentFunction.caller;
   }
    }
    output(callstack);
  };
  
  function output(arr) {
    //Optput however you want
    console.log(arr.join('\n\n'));
  };
  
  if (!Object.prototype._watch)
  {
    Object.prototype._watch = function (prop, handler) 
    {
     var oldval = this[prop], newval = oldval,
     getter = function ()
     {
      return newval;
     },
     setter = function (val) 
     {
      oldval = newval;
      return newval = handler.call(this, prop, oldval, val);
     };
     if (delete this[prop])
     { 
      if (Object.defineProperty) // ECMAScript 5
      {           
        Object.defineProperty(this, prop, {get: getter,set: setter});
      }
      else if (Object.prototype.__defineGetter__ && Object.prototype.__defineSetter__) 
      {
        Object.prototype.__defineGetter__.call(this, prop, getter);
        Object.prototype.__defineSetter__.call(this, prop, setter);
      }
     }
    };
  }
  
  if (!Object.prototype._unwatch)
  {
   Object.prototype._unwatch = function (prop) 
   {
    var val = this[prop];
    delete this[prop]; 
    this[prop] = val;
   };
  }
  
  obj && obj._watch(prop, function(prop, oldval, val){
   printStackTrace();
   console.log( prop + " changed!! old: " +  oldval +", new: "+ val);
  });
 })(window, "asrOpenType");