!function(){
/*
*extends method for OO
*/
blitz.extend=function(subClass,supperClass){
   if(!arguments.length) throw new Error('You must pass a param at least!');
   if(arguments.length>1){
	   var f=function(){}
	   f.prototype=supperClass.prototype;
	   subClass.prototype=new f();
	   subClass.prototype.constructor=subClass;
	   
	   subClass._super=supperClass.prototype.constructor;
	   if(supperClass.prototype.constructor == Object.prototype.constructor) {
		 supperClass.prototype.constructor = supperClass;
	   }   
   } 
}
/*
*augement current function with chian
*/
blitz.chainExtend=function(Class){ 
  var o=this.constructor===Object.prototype.constructor?Class.prototype.constructor:this;
  o.extend=arguments.callee;
  if(arguments[1]){
	   for(var i=arguments.length;--i>0;){
	   if(!o.prototype[arguments[i]])
	     o.prototype[arguments[i]]=Class.prototype[arguments[i]];
	   }
   }else{
	   for(var name in Class.prototype){
	     if(!o.prototype[name])
		   o.prototype[name]=Class.prototype[name];
	   }
   }
  return o;
}

/*
*augement current function with chian(先继承的成员为后继承的成员的父类，后继承的成员通过this._super来掉用父类的的同名方法)
*/
	blitz.Class=function(){};
	blitz.Class.extend=function(superClass){ 
	    var _super = this.prototype;
		var initializing=true;
		var prototype=new this;
		initializing=false;
		
		var fnTest=/xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
		for(var name in superClass.prototype){
		  // Check if we're overwriting an existing function
		  prototype[name] = typeof superClass.prototype[name] == "function" && 
			typeof _super[name] == "function" && fnTest.test(superClass.prototype[name]) ?
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
			})(name, superClass.prototype[name]) :
			superClass.prototype[name];
		}
		
		// The dummy class constructor
		function Class() {
			// All construction is actually done in the init method
			if ( !initializing && this.init )
			  this.init.apply(this, arguments);//init method is definded in every subclass
		}

		// Populate our constructed prototype object
		Class.prototype = prototype;

		// Enforce the constructor to be what we expect
		Class.prototype.constructor = Class;

		// And make this class extendable
		Class.extend = arguments.callee;
		return Class;
	}
}()


