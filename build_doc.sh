::run.bat
::jsdoc_toolkit path
set jsdoc=%cd%\Lib\jsdoc_toolkit-2.4.0\
::js filepath
set jspath=%cd%\
echo start...

java -jar %jsdoc%jsrun.jar %jsdoc%app\run.js -a -e=GBK -t=%jsdoc%templates\jsdoc -d=%jspath%docs %jspath%

echo finished.
pause


rem @author:作者
rem @argument:参数
rem @augments：参数
rem @class： 类
rem @constant：常数
rem @constructor：构造
rem @constructs： 构造
rem @default：默认值
rem @deprecated： 推荐，说明使用一个变量已不再支持
rem @description：说明
rem @example ：范例
rem @extends： 扩展 ，继承
rem @field：变量（非功能）
rem @fileOverview ：整个文件信息
rem @function： 功能 (表示该变量指向一个功能)
rem @inner || @private : 私有，内部
rem @ignore： 忽视 （文档生成的式后也将忽视这个变量）
rem @event：事件
rem @version：版本
rem @type：类型 描述预期的类型变量的值或返回值的函数
rem @throws :可能抛出的异常
rem @static： 静态，访问该变量不需要实例
rem @since： 自 （表明某属性特征，是在什么版本之后才有的）
rem @see： 描述相关的资源
rem @scope ||@lends： 作用域
rem @return ||@returns
rem @requires： 描述必须需要的资源
rem @public： 说明内在变量是公开的
rem @property ： 属性
rem @param：参数
rem @namespace： 命名空间