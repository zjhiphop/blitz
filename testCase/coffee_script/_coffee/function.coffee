this.show=(obj)-> console.log obj
this.absolute =(num) -> if num>=0 then num else -num
this.expo= (base,ite)->
  result=1
  for count in [0...ite]
     result*=base
  return result

show absolute -1
show expo 2,10
