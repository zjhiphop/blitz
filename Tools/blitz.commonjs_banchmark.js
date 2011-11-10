/**
 *
 * @fileOverview Benchmark to define commonJS module 
 * @author Jade
 * @description [数据结构]命名空间
 * @see The <a href="http://www.example.com">Example Project</a>.
 * @param  {NULL_PARAMETER} objNull 
 * @param  {Function} [fnCallback="null"] :如果不是函数类型,则进行同步调用
 * @return {Boolean} json ：作为回调参数返回
 * @example new KxEFileMon.Data.NULL_PARAMETER("a")
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