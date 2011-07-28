/*
*chain method for OO function
*You can use this function like blitz.chain(math)('add',2)('sub',1)('log');
*or blitz.chain(math,'o').add(2).sub(1).log();//if you use it like this,you must add 'return this' at the end of every chained function.
*/
!function(){
  blitz.chain=function(o){
    var ftest=/XYZ/.test(function(){XYZ;})?/\breturn\s+this\b/img:/.*/ig;
    return arguments[1]==='o'&&(function(){
		   for(var i in o){
			  if(typeof o[i]==='function'){
				return ftest.test(o[i].toString());
			  }
		   }
	 })()?o:function(methodName){
	  if(!arguments.length){
	    return o;
	  }
	  if(o[methodName]&&typeof o[methodName]==='function'){
	     o[methodName].apply(o,[].slice.call(arguments,1)); 
	  }
	  return arguments.callee;
	};
  }
}()
