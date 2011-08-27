/*
 *clone method for OO
 */
blitz.clone = function(o){
    if (Object.create) {
      return Object.create(o);
    }
    else {
        var f = function(){
        };
        f.prototype = o;
        return new f;
    }
    
}
