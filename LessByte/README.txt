Byte-saving Technique
下面展示的是一系列javascript魔法，它可以剥掉一层你的JS代码！这些技术参考自"140bytes"，一下所说明的技术会帮助你减少JS的代码量，但是在性能方面还有很多方面有待考究！

Arguments
使用按字母排序的一个字母一个位置的参数
我们总是希望参数越短越好，这样可以在生命周期中尽可能的重用他们。最佳的处理方法是仅仅将他们用作一个占位符而不是总是尝试给予一个变量有意义的名字。同时使用一个字母命名法会稍微改变在单独函数中的可读性，保持一致的做法会对函数交互时的可读性有帮助！


  
view plain
function(t,d,v,i,f){...} // before  
function(a,b,c,d,e){...} // after  
  

不要使用arguments.length去判断参数是否存在，使用in去检查是否有参数被传递


view plain
arguments.length>1||(cb=alert) // before  
1 in arguments||(cb=alert)     // after  
 



Variables
使用占位符取代var
通过在函数arguments声明取代var使用来节省字节
view plain
function(a){var b=1;...} // before  
function(a,b){b=1;...}   // after  
 
尽可能的重用变量
谨慎使用那些不再使用的变量来节省字节
view plain
setTimeout(function(){for(var i=10;i--;)... }, a) // before  
setTimeout(function(){for(a=10;a--;)... }, a)     // after  
 
无论何处，尽可能的赋值
因为分配变量会返回被赋得值，同时进行赋值和判断会节省一些字节。有一个很好的例子：JSONP 函数，其中script是在createElement方法中被赋值的！
view plain
a=this.localStorage;if(a){...} // before  
if(a=this.localStorage){...}   // after  
 
使用数组交换变量
数组可以用来临时保存数据占位，这样可以避免声明另一个变量！
view plain
var a=1,b=2,c;c=a;a=b;b=c // before  
var a=1,b=2;a=[b,b=a][0]  // after  
 
强制原则使用开拓
JS强制原则是精华也是糟粕，但是有时相当有用。pubsub函数减少了负面的变量，然后使用一个字符串将结果连接起来，最终结果类似somestring-123，这个字符串会在后续处理中使用连字符“-”来还原为原始的字符串！（也许你可以看看）

Loops
忽略循环体
如果你能在循环条件中执行所有的逻辑，那么你就不需要循环体。示例：timeAgo
使用for而不是while
for和while需要相同的字节空间，但是for会给予你更多的赋值机会。
view plain
while(i--){...} // before  
for(;i--;){...} // after  
i=10;while(i--){...} // before  
for(i=10;i--;){...}  // after  
 
使用存在的缩索引去迭代数组中的真实元素
当你迭代一组真实存在的数组对象时，缩短循环对象的回路将会减少很多字节。
view plain
for(a=[1,2,3,4,5],l=a.length,i=0;i<l;i++){b=a[i];...}  
for(a=[1,2,3,4,5],i=0;b=a[i++];){...}  
 
使用for..in来分配并且获得一个对象的keys
view plain
a=[];for(b in window)a.push(window[b]) // before  
a=[];i=0;for(a[i++]in window);        // after  
 


Operators
理解操作符优先级
This Mozilla page是一个非常好的页面让你去开始学习。
理解位操作运算hacks
使用’~‘配合indexof来测试
Use ~ with indexOf to test presence
view plain
hasAnF="This sentence has an f.".indexOf("f")>=0 // before  
hasAnF=~"This sentence has an f.".indexOf("f")   // after  
~-1  
0  
~1  
-2  
~-2  
1  
~0  
-1  
 

使用’,’来在同一行串联表达式
view plain
with(document){open();write("hello");close()}  
with(document)open(),write("hello"),close()  
 

使用’[]._’取代’void 0’，’undefined’(""._ ，1.._和0[0]也会起作用，但是会更慢)
去除操作符之后的不必要的空格，操作符之后的空格不总是必须的，有时是可以忽略的！
view plain
typeof [] // before  
typeof[]  // after  
 

Numbers
使用’~~’和’0|’取代Math.floor
以上这两种组合将会对数字取整(注意:~比|的优先级别低，除此之外没什么区别)
view plain
rand10=Math.floor(Math.random()*10) // before  
rand10=0|Math.random()*10           // after  
 
使用AeB的格式书写大的十进制的数字
这种写法等价于A*Math.pow(10,B).
view plain
million=1000000 // before  
million=1e6     // after  
 
使用A<<B的格式来书写一个大的二进制数据
这种写法等价于A*Math.pow(2,B). 示例：rgb2hex
view plain
color=0x100000 // before  
color=1<<20    // after  
 
使用1/0来取代无穷(Infinity)
这种做法会更加简短。除此之外，division by zero gets you free internet points.
view plain
[Infinity,-Infinity] // before  
[1/0,-1/0]           // after  
 
挖掘出0作为假(Exploit the "falsiness" of 0)
当比较几个数字时，通常将值转化为对0进行比较以达到是代码精简的目的！
view plain
a==1||console.log("not one") // before  
!~-a||console.log("not one")  // after  
 



Strings
使用0来分隔字符串
使用0作为分隔符将会节省两个byte，示例：timeAgo
view plain
"alpha,bravo,charlie".split(",") // before  
"alpha0bravo0charlie".split(0)   // after  
 
使用很少被知道的’.link’方法
Strings有一个内建的方法’link’,用来创建一个html link element。你可以查看示例： linkify 函数.
view plain
html="<a href=""+url+"" mce_href=""+url+"">"+text+"</a>" // before  
html=text.link(url)                   // after  
 
使用’replace’来创建强力的字符串迭代
因为 ‘replace’方法可以使用function作为第二个参数，它可以用来捕获大量的迭代’账簿’。你可以查看示例：templates and UUID functions.
使用数组来重复字符串
view plain
for(a="",i=32;i--;)a+=0 // before  
a=Array(33).join(0)     // after  
 

Conditionals
尽可能的使用&&和||在所有的地方
view plain
if(a)if(b)return c // before  
return a&&b&&c     // after  
if(!a)a=Infinity // before  
a||(a=Infinity)  // after  
 

Arrays
Use elision
Array elision 在某些特定的场景可以节省字节空间！查看示例： router API for a real-world example.
view plain
[undefined,undefined,2] // before  
[,,2]                   // after  
// Note: Be mindful of elided elements at the end of the element list  
[2,undefined,undefined] // before length is 3  
[2,,]                   // after length is 2  

Regular Expressions
非规范化的缩减
//d{2}/比较灵活, //d/d/ 更加简短.
eval解析正则表达式比直接使用RegExp()更简短
view plain
r=new RegExp("{"+p+"}","g") // before  
r=eval("/{"+p+"}/g")    // after  
 

Booleans
使用’!’来创建boolean
true 和 false 可以用’!’联合数字使用达到相同的效果
view plain
[true,false] // before  
[!0,!1]      // after  
 

Functions
使用命名的函数进行递归
递归通常比循环更加简洁，因为递归会卸载掉栈调用的列表簿。查看示例：walk function.
使用命名的函数来保存状态
如果状态需要在函数调用的时候进行保存，那么使用命名的函数并且将他作容器使用。示例：JSONP function.
view plain
function(i){return function(){console.log("called "+(++i)+" times")}}(0) // before  
(function a(){console.log("called "+(a.i=a.i+1||1)+" times")})           // after  
0,function a(){console.log("called "+(a.i=a.i+1||1)+" times")}           // another alternative  
 
忽略”()”当使用不带参数的new创建新的对象时
“new Object” 等价于 new Object()
view plain
now = +new Date() // before  
now = +new Date   // after  
 
reutrn语句
当返回任何数据除了变量，不需要在return之后加空格return ：
view plain
['foo',42,'bar']; // before  
return['foo',42,'bar'];  // after  
return {x:42,y:417}; // before  
return{x:42,y:417};  // after  
return .01; // before  
return.01;  // after  
 
正确的使用函数闭包 Use the right closure for the job
如果你需要立即执行函数，请使用最适当的闭包.
view plain
;(function(){...})() // before  
new function(){...}  // after, if you plan on returning an object and can use `this`  
!function(){...}()   // after, if you don't need to return anything  
 

In the browser
使用浏览器对象避免额外的逻辑
你可以使用浏览器anchor elements去解析URLs取代自己写的逻辑。示例：parseURL, 将文本转化为html：escapeHTML.
Use global scope
因为window在浏览器中是一个全局对象，你可以直接引用它的任何属性。比如说document和location，除此之外还有其他比较有用的属性，像：innerWidth，查看示例： screensaver.

APIs

尽可能的对每个参数传递静态的数据
使用额外的字节去提供默认值
只做一件事并做到最好

Other resources
Ben Alman's explanation of his JS1K entry
Marijn Haverbeke's explanation of his JS1K entry
Suggested Closure Compiler optimizations
Angus Croll's blog