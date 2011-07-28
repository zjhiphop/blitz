/*
*clone method for OO
*/
blitz.clone=function(o){
   var f=function(){};
   f.prototype=o;
   return new f;
}