//Create a new object
!function($){
    blitz.utility=utility={
	  log:function(msg){
	    if(console.log){
		  console.log(msg);
		}
	  }
	}
	var f=Function.prototype;
	/*
	*used to creat a new object
	*/
	Object.create=Object.create||function(o){
			   var f=function(){};
			   f.prototype=(o.prototype||o||{});
			   return new f();
    };
	Object.isArray=Array.isArray||function(){
	     return ~Object.constructor.toString().indexOf("Array"); 
	}
	
	/*
	*decration mode
	*eg: f1.prototype.opa=fn2.prototype.add
	*    f1.opa(1) is equivalent to fns.add(1)
	*/
	f.partial = function() {
		var fn = this,
		args=$?$.makeArray(arguments):[].slice.call(arguments);//if jquery is used,then will use jquery lib at first
		return function() {
			return fn.apply(this,args.concat(arguments));
		};
	};
	/*
	*function chained
	*eg: function a(){}
	*
	*/
	f.method=function(name,func){
	  this[name]=func;
	  return this;
	}
	
}(jQuery)

