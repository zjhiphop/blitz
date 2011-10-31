/*
 *Benchmark to define commonJS module 
 */
//one:
(function(define,undef){
	define([],function(){
		//1.construct moduler method
		//2.
		return modelerName;
	});
}
)(
	typeof define != 'undefined'
	// use define for AMD if available
	? define
	// If no define, look for module to export as a CommonJS module.
	// If no define or module, attach to current context.
	: typeof module != 'undefined'
		? function(deps, factory) { module.exports = factory(); }
		: function(deps, factory) { this.when = factory(); }
)
//two:
(function (definition) {
    // This file will function properly as a <script> tag, or a module
    // using CommonJS and NodeJS or RequireJS module formats.  In
    // Common/Node/RequireJS, the module exports the "modulerName" API and when
    // executed as a simple <script>, it creates a "modulerName" global instead.

    // RequireJS
    if (typeof define === "function") {
        define(definition);
    // CommonJS
    } else if (typeof exports === "object") {
        definition(require, exports);
    // <script>
    } else {
        definition(void 0, modulerName = {});
    }
})(function(require,exports){
	
})