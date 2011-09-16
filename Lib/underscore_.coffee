root = this

previousUnderscore = root._

breaker = if typeof(StopIteration) is 'undefined' then '__break__' else StopIteration

escapeRegExp = (string) -> string.replace(/([.*+?^${}()|[\]\/\\])/g, '\\$1')

ArrayProto           = Array.prototype
ObjProto             = Object.prototype

slice                = ArrayProto.slice
unshift              = ArrayProto.unshift
toString             = ObjProto.toString
hasOwnProperty       = ObjProto.hasOwnProperty
propertyIsEnumerable = ObjProto.propertyIsEnumerable

nativeForEach        = ArrayProto.forEach
nativeMap            = ArrayProto.map
nativeReduce         = ArrayProto.reduce
nativeReduceRight    = ArrayProto.reduceRight
nativeFilter         = ArrayProto.filter
nativeEvery          = ArrayProto.every
nativeSome           = ArrayProto.some
nativeIndexOf        = ArrayProto.indexOf
nativeLastIndexOf    = ArrayProto.lastIndexOf
nativeIsArray        = Array.isArray
nativeKeys           = Object.keys

_ = (obj) -> new wrapper(obj)

if typeof(exports) != 'undefined' then exports._ = _

root._ = _

_.VERSION = '1.1.0'


_.each = (obj, iterator, context) ->
  try
    if nativeForEach and obj.forEach is nativeForEach
      obj.forEach iterator, context
    else if _.isNumber obj.length
      iterator.call context, obj[i], i, obj for i in [0...obj.length]
    else
      iterator.call context, val, key, obj  for own key, val of obj
  catch e
    throw e if e isnt breaker
  obj

_.map = (obj, iterator, context) ->
  return obj.map(iterator, context) if nativeMap and obj.map is nativeMap
  results = []
  _.each obj, (value, index, list) ->
    results.push iterator.call context, value, index, list
  results

_.reduce = (obj, iterator, memo, context) ->
  if nativeReduce and obj.reduce is nativeReduce
    iterator = _.bind iterator, context if context
    return obj.reduce iterator, memo
  _.each obj, (value, index, list) ->
    memo = iterator.call context, memo, value, index, list
  memo

_.reduceRight = (obj, iterator, memo, context) ->
  if nativeReduceRight and obj.reduceRight is nativeReduceRight
    iterator = _.bind iterator, context if context
    return obj.reduceRight iterator, memo
  reversed = _.clone(_.toArray(obj)).reverse()
  _.reduce reversed, iterator, memo, context

_.detect = (obj, iterator, context) ->
  result = null
  _.each obj, (value, index, list) ->
    if iterator.call context, value, index, list
      result = value
      _.breakLoop()
  result

_.filter = (obj, iterator, context) ->
  return obj.filter iterator, context if nativeFilter and obj.filter is nativeFilter
  results = []
  _.each obj, (value, index, list) ->
    results.push value if iterator.call context, value, index, list
  results

_.reject = (obj, iterator, context) ->
  results = []
  _.each obj, (value, index, list) ->
    results.push value if not iterator.call context, value, index, list
  results

_.every = (obj, iterator, context) ->
  iterator ||= _.identity
  return obj.every iterator, context if nativeEvery and obj.every is nativeEvery
  result = true
  _.each obj, (value, index, list) ->
    _.breakLoop() unless (result = result and iterator.call(context, value, index, list))
  result

_.some = (obj, iterator, context) ->
  iterator ||= _.identity
  return obj.some iterator, context if nativeSome and obj.some is nativeSome
  result = false
  _.each obj, (value, index, list) ->
    _.breakLoop() if (result = iterator.call(context, value, index, list))
  result

_.include = (obj, target) ->
  return _.indexOf(obj, target) isnt -1 if nativeIndexOf and obj.indexOf is nativeIndexOf
  return true for own key, val of obj when val is target
  false

_.invoke = (obj, method) ->
  args = _.rest arguments, 2
  (if method then val[method] else val).apply(val, args) for val in obj

_.pluck = (obj, key) ->
  _.map(obj, (val) -> val[key])

_.max = (obj, iterator, context) ->
  return Math.max.apply(Math, obj) if not iterator and _.isArray(obj)
  result = computed: -Infinity
  _.each obj, (value, index, list) ->
    computed = if iterator then iterator.call(context, value, index, list) else value
    computed >= result.computed and (result = {value: value, computed: computed})
  result.value

_.min = (obj, iterator, context) ->
  return Math.min.apply(Math, obj) if not iterator and _.isArray(obj)
  result = computed: Infinity
  _.each obj, (value, index, list) ->
    computed = if iterator then iterator.call(context, value, index, list) else value
    computed < result.computed and (result = {value: value, computed: computed})
  result.value

_.sortBy = (obj, iterator, context) ->
  _.pluck(((_.map obj, (value, index, list) ->
    {value: value, criteria: iterator.call(context, value, index, list)}
  ).sort((left, right) ->
    a = left.criteria; b = right.criteria
    if a < b then -1 else if a > b then 1 else 0
  )), 'value')

_.sortedIndex = (array, obj, iterator) ->
  iterator ||= _.identity
  low =  0
  high = array.length
  while low < high
    mid = (low + high) >> 1
    if iterator(array[mid]) < iterator(obj) then low = mid + 1 else high = mid
  low

_.toArray = (iterable) ->
  return []                   if (!iterable)
  return iterable.toArray()   if (iterable.toArray)
  return iterable             if (_.isArray(iterable))
  return slice.call(iterable) if (_.isArguments(iterable))
  _.values(iterable)

_.size = (obj) -> _.toArray(obj).length


_.first = (array, n, guard) ->
  if n and not guard then slice.call(array, 0, n) else array[0]

_.rest = (array, index, guard) ->
  slice.call(array, if _.isUndefined(index) or guard then 1 else index)

_.last = (array) -> array[array.length - 1]

_.compact = (array) -> item for item in array when item

_.flatten = (array) ->
  _.reduce array, (memo, value) ->
    return memo.concat(_.flatten(value)) if _.isArray value
    memo.push value
    memo
  , []

_.without = (array) ->
  values = _.rest arguments
  val for val in _.toArray(array) when not _.include values, val

_.uniq = (array, isSorted) ->
  memo = []
  for el, i in _.toArray array
    memo.push el if i is 0 || (if isSorted is true then _.last(memo) isnt el else not _.include(memo, el))
  memo

_.intersect = (array) ->
  rest = _.rest arguments
  _.select _.uniq(array), (item) ->
    _.all rest, (other) ->
      _.indexOf(other, item) >= 0

_.zip = ->
  length =  _.max _.pluck arguments, 'length'
  results = new Array length
  for i in [0...length]
    results[i] = _.pluck arguments, String i
  results

_.indexOf = (array, item) ->
  return array.indexOf item if nativeIndexOf and array.indexOf is nativeIndexOf
  i = 0; l = array.length
  while l - i
    if array[i] is item then return i else i++
  -1

_.lastIndexOf = (array, item) ->
  return array.lastIndexOf(item) if nativeLastIndexOf and array.lastIndexOf is nativeLastIndexOf
  i = array.length
  while i
    if array[i] is item then return i else i--
  -1

_.range = (start, stop, step) ->
  a         = arguments
  solo      = a.length <= 1
  i = start = if solo then 0 else a[0]
  stop      = if solo then a[0] else a[1]
  step      = a[2] or 1
  len       = Math.ceil((stop - start) / step)
  return []   if len <= 0
  range     = new Array len
  idx       = 0
  loop
    return range if (if step > 0 then i - stop else stop - i) >= 0
    range[idx] = i
    idx++
    i+= step


_.bind = (func, obj) ->
  args = _.rest arguments, 2
  -> func.apply obj or root, args.concat arguments

_.bindAll = (obj) ->
  funcs = if arguments.length > 1 then _.rest(arguments) else _.functions(obj)
  _.each funcs, (f) -> obj[f] = _.bind obj[f], obj
  obj

_.delay = (func, wait) ->
  args = _.rest arguments, 2
  setTimeout((-> func.apply(func, args)), wait)

_.memoize = (func, hasher) ->
  memo = {}
  hasher or= _.identity
  ->
    key = hasher.apply this, arguments
    return memo[key] if key of memo
    memo[key] = func.apply this, arguments

_.defer = (func) ->
  _.delay.apply _, [func, 1].concat _.rest arguments

_.wrap = (func, wrapper) ->
  -> wrapper.apply wrapper, [func].concat arguments

_.compose = ->
  funcs = arguments
  ->
    args = arguments
    for i in [funcs.length - 1..0] by -1
      args = [funcs[i].apply(this, args)]
    args[0]


_.keys = nativeKeys or (obj) ->
  return _.range 0, obj.length if _.isArray(obj)
  key for key, val of obj

_.values = (obj) ->
  _.map obj, _.identity

_.functions = (obj) ->
  _.filter(_.keys(obj), (key) -> _.isFunction(obj[key])).sort()

_.extend = (obj) ->
  for source in _.rest(arguments)
    obj[key] = val for key, val of source
  obj

_.clone = (obj) ->
  return obj.slice 0 if _.isArray obj
  _.extend {}, obj

_.tap = (obj, interceptor) ->
  interceptor obj
  obj

_.isEqual = (a, b) ->

  return true if a is b

  atype = typeof(a); btype = typeof(b)
  return false if atype isnt btype

  return true if `a == b`

  return false if (!a and b) or (a and !b)

  return a.isEqual(b) if a.isEqual

  return a.getTime() is b.getTime() if _.isDate(a) and _.isDate(b)

  return false if _.isNaN(a) and _.isNaN(b)

  if _.isRegExp(a) and _.isRegExp(b)
    return a.source     is b.source and
           a.global     is b.global and
           a.ignoreCase is b.ignoreCase and
           a.multiline  is b.multiline

  return false if atype isnt 'object'

  return false if a.length and (a.length isnt b.length)

  aKeys = _.keys(a); bKeys = _.keys(b)

  return false if aKeys.length isnt bKeys.length

  return false for key, val of a when !(key of b) or !_.isEqual(val, b[key])
  true

_.isEmpty = (obj) ->
  return obj.length is 0 if _.isArray(obj) or _.isString(obj)
  return false for own key of obj
  true

_.isElement   = (obj) -> obj and obj.nodeType is 1

_.isArray     = nativeIsArray or (obj) -> !!(obj and obj.concat and obj.unshift and not obj.callee)

_.isArguments = (obj) -> obj and obj.callee

_.isFunction  = (obj) -> !!(obj and obj.constructor and obj.call and obj.apply)

_.isString    = (obj) -> !!(obj is '' or (obj and obj.charCodeAt and obj.substr))

_.isNumber    = (obj) -> (obj is +obj) or toString.call(obj) is '[object Number]'

_.isBoolean   = (obj) -> obj is true or obj is false

_.isDate      = (obj) -> !!(obj and obj.getTimezoneOffset and obj.setUTCFullYear)

_.isRegExp    = (obj) -> !!(obj and obj.exec and (obj.ignoreCase or obj.ignoreCase is false))

_.isNaN       = (obj) -> _.isNumber(obj) and window.isNaN(obj)

_.isNull      = (obj) -> obj is null

_.isUndefined = (obj) -> typeof obj is 'undefined'


_.noConflict = ->
  root._ = previousUnderscore
  this

_.identity = (value) -> value

_.times = (n, iterator, context) ->
  iterator.call context, i for i in [0...n]

_.breakLoop = -> throw breaker

_.mixin = (obj) ->
  for name in _.functions(obj)
    addToWrapper name, _[name] = obj[name]

idCounter = 0
_.uniqueId = (prefix) ->
  (prefix or '') + idCounter++

_.templateSettings = {
  start:        '<%'
  end:          '%>'
  interpolate:  /<%=(.+?)%>/g
}

_.template = (str, data) ->
  c = _.templateSettings
  endMatch = new RegExp("'(?=[^"+c.end.substr(0, 1)+"]*"+escapeRegExp(c.end)+")","g")
  fn = new Function 'obj',
    'var p=[],print=function(){p.push.apply(p,arguments);};' +
    'with(obj||{}){p.push(\'' +
    str.replace(/\r/g, '\\r')
       .replace(/\n/g, '\\n')
       .replace(/\t/g, '\\t')
       .replace(endMatch,"?")
       .split("'").join("\\'")
       .split("?").join("'")
       .replace(c.interpolate, "',$1,'")
       .split(c.start).join("');")
       .split(c.end).join("p.push('") +
       "');}return p.join('');"
  if data then fn(data) else fn

_.forEach  = _.each
_.foldl    = _.inject = _.reduce
_.foldr    = _.reduceRight
_.select   = _.filter
_.all      = _.every
_.any      = _.some
_.contains = _.include
_.head     = _.first
_.tail     = _.rest
_.methods  = _.functions


wrapper = (obj) ->
  this._wrapped = obj
  this

result = (obj, chain) ->
  if chain then _(obj).chain() else obj

addToWrapper = (name, func) ->
  wrapper.prototype[name] = ->
    args = _.toArray arguments
    unshift.call args, this._wrapped
    result func.apply(_, args), this._chain

_.mixin _

_.each ['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], (name) ->
  method = Array.prototype[name]
  wrapper.prototype[name] = ->
    method.apply(this._wrapped, arguments)
    result(this._wrapped, this._chain)

_.each ['concat', 'join', 'slice'], (name) ->
  method = Array.prototype[name]
  wrapper.prototype[name] = ->
    result(method.apply(this._wrapped, arguments), this._chain)

wrapper::chain = ->
  this._chain = true
  this

wrapper::value = -> this._wrapped