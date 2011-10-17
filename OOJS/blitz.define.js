/*ref:http://aboutcode.net/2011/10/04/efficient-encapsulation-of-javascript-objects.html?utm_source=javascriptweekly&utm_medium=email
 *Make a better define method to manager your class 
 *
 * var yourClass=blitz.define(
 * {
 * 	'constructor':function(initVar){
 * 	  this.var=iniVar;
 *  },
 *  'public':{
 * 	   publicMethod1:function(){
 *     },
 * 	   publicMethod2:function(){
 *     }
 *   },
 *   'private':{
 * 	   privateMethod1:function(){
 *     },
 * 	   privateMethod2:function(){
 *     }
 *    }
 *   } 
 * )
 */
blitz.define = (function() {
    // Creates a proxying function that will call the real object.
    function createProxyFunction(functionName) {
        return function() {
            // 'this' in here is the proxy object.
            var realObject = this.__realObject__,
                realFunction = realObject[functionName];
 
            // Call the real function on the real object, passing any arguments we received.
            return realFunction.apply(realObject, arguments);
        };
    };
 
    // createProxyClass creates a function that will create Proxy objects.
    //   publicFunctions: an object of public functions for the proxy.
    function createProxyClass(publicFunctions) {
        var ProxyClass, functionName, func;
 
        // This is this Proxy object constructor.
        ProxyClass = function (realObject) {
            // Choose a reasonably obscure name for the real object property.
            // It should avoid any conflict with the public function names.
            // Also any code being naughty by using this property is quickly spotted!
            this.__realObject__ = realObject;
        };
 
        // Create a proxy function for each of the public functions.
        for (functionName in publicFunctions) {
            func = publicFunctions[functionName];
            // We only want functions that are defined directly on the publicFunctions object.
            if (publicFunctions.hasOwnProperty(functionName) &&
                typeof func === "function") {
                ProxyClass.prototype[functionName] = createProxyFunction(functionName);
            }
        }
 
        return ProxyClass;
    }
 
    function copyToPrototype(source, destination) {
        var prototype = destination.prototype,
            property;
        for (property in source) {
            if (source.hasOwnProperty(property)) {
                prototype[property] = source[property];
            }
        }
    };
 
    function createRealClass(constructor, publics, privates, proxyClass) {
        var RealClass = function () {
            var proxy;
 
            if (typeof constructor === "function") {
                // Call the constructor function to perform any initialization of the object.
                constructor.apply(this, arguments);
            }
            proxy = new proxyClass(this);
            // Maintain the illusion that the proxy object is a real object.
            // Assign the constructor property in case anyone uses it to create another instance.
            proxy.constructor = RealClass;
            // Returning the proxy object means creating a new instance of Class
            // results in a proxy object, instead of the real object.
            // Callers can then only interact with the proxy.
            return proxy;
        };
        // The RealClass has both public and private functions.
        copyToPrototype(publics || {}, RealClass);
        copyToPrototype(privates || {}, RealClass);
 
        return RealClass;
    }
 
    // Return the defineClass function.
    return function (options) {
        // 'public' and 'private' are reserved keywords, so the option properties must be 
        // accessed using strings instead of options.public, for example.
        var proxyClass = createProxyClass(options["public"]),
            realClass = createRealClass(
                options["constructor"],
                options["public"],
                options["private"],
                proxyClass
            );
        return realClass;
    };
 
})();