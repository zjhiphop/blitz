blitz.Interface=function(name,methods){
  this.name=''+name;
  this.methods=this.methods||[];
  if(!methods){
    throw new Error('Please insure you hvae methods to implements!');
  }
  else if(typeof methods==='string'){
	this.methods.push(methods);
  }else if(~methods.constructor.toString().indexOf("Array")){
    for(var i=0;i<methods.length;i++){
	   this.methods.push(methods[i]);
	}    
  }else{
    throw new Error('The second params type is error!');
  }
  this.implemented=function(obj){
     if(!obj){throw new Error('You must transfer a parameter');}
	 for(var j=0;j<this.methods.length;j++){
	  if(!obj[this.methods[j]]||typeof obj[this.methods[j]]!=='function'){
	    throw new Error('You must implements method '+this.methods[j]+'!');
	  }
	 }
  }
}