/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	
	var windowFrame = __webpack_require__(1)();
	var windowFrameEditor = __webpack_require__(77);
	var $ = __webpack_require__(80);
	var counter = __webpack_require__(81);

	$(document).ready(function(){
	  var contents = contents || {};
	  var dataSources = dataSources || {};
	  windowFrameEditor($("body"), windowFrame, contents, dataSources);
	  contents["hello-world"] = __webpack_require__(82);
	  dataSources["counter"] = counter;
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Nools = __webpack_require__(2);
	var nools = __webpack_require__(3);

	var flow = Nools(nools);

	module.exports = function(){
	  return {
	    flow: flow,
	    session: flow.getSession(),
	    Action: flow.getDefined("Action"),
	    WindowSlot: flow.getDefined("WindowSlot")
	  };}


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	!function(){function _getCompiled(nools){return function(){return function(options){options=options||{};var defined={Array:Array,String:String,Number:Number,Boolean:Boolean,RegExp:RegExp,Date:Date,Object:Object},scope=options.scope||{},optDefined=options.defined||{};for(var i in optDefined)defined[i]=optDefined[i];return nools.flow("window-slots",function(){var WindowSlot=defined.WindowSlot=this.addDefined("WindowSlot",function(){var Defined=function(opts){for(var i in opts)opts.hasOwnProperty(i)&&(this[i]=opts[i])},proto=Defined.prototype;return proto.actions=null,proto.slot_id=-1,proto.content=null,proto.slot_element=null,Defined}()),Action=defined.Action=this.addDefined("Action",function(){var Defined=function(opts){for(var i in opts)opts.hasOwnProperty(i)&&(this[i]=opts[i])},proto=Defined.prototype;return proto.sub_type="",proto.slot_id=-1,proto.content=null,Defined}());scope.console=console,this.rule("Load into empty slot",{scope:scope},[[Action,"a",'a.sub_type === "load"'],[WindowSlot,"ws","ws.content === null && a.slot_id === ws.slot_id"]],function(facts,flow,next){var a=facts.a,a=facts.a,ws=facts.ws,ws=facts.ws,a=facts.a,modify=flow.modify,retract=flow.retract;modify(ws,function(){ws.content=a.content}),retract(a),ws.actions.load().then(function(){next()}).catch(function(){next()})}),this.rule("Unload slot",{scope:scope},[[Action,"a",'a.sub_type === "unload"'],[WindowSlot,"ws","a.slot_id === ws.slot_id"]],function(facts,flow,next){var a=facts.a,a=facts.a,ws=facts.ws,a=facts.a,ws=facts.ws,modify=flow.modify,retract=flow.retract;ws.actions.unload().then(function(){modify(ws,function(){ws.content=null}),retract(a),next()}).catch(function(){modify(ws,function(){ws.content=null}),retract(a),next()})}),this.rule("Load into occupied slot",{scope:scope},[[Action,"a",'a.sub_type === "load"'],[WindowSlot,"ws","ws.content !== null && a.slot_id === ws.slot_id"]],function(facts,flow){facts.a,facts.a;var ws=facts.ws,ws=facts.ws;facts.a;var assert=flow.assert;assert(new Action({slot_id:ws.slot_id,sub_type:"unload"}))})})}}()} true?"undefined"!=typeof module&&module.exports&&(module.exports=_getCompiled(__webpack_require__(3))):"function"==typeof define&&define.amd?define(["nools"],function(nools){return _getCompiled(nools)}):_getCompiled(this.nools)()}.call(this);

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = exports = __webpack_require__(4);

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 *
	 * @projectName nools
	 * @github https://github.com/C2FO/nools
	 * @includeDoc [Examples] ../docs-md/examples.md
	 * @includeDoc [Change Log] ../History.md
	 * @header [../readme.md]
	 */

	"use strict";
	var extd = __webpack_require__(5),
	    fs = __webpack_require__(29),
	    path = __webpack_require__(30),
	    compile = __webpack_require__(31),
	    FlowContainer = __webpack_require__(43);

	function isNoolsFile(file) {
	    return (/\.nools$/).test(file);
	}

	function parse(source) {
	    var ret;
	    if (isNoolsFile(source)) {
	        ret = compile.parse(fs.readFileSync(source, "utf8"), source);
	    } else {
	        ret = compile.parse(source);
	    }
	    return ret;
	}

	exports.Flow = FlowContainer;

	exports.getFlow = FlowContainer.getFlow;
	exports.hasFlow = FlowContainer.hasFlow;

	exports.deleteFlow = function (name) {
	    FlowContainer.deleteFlow(name);
	    return this;
	};

	exports.deleteFlows = function () {
	    FlowContainer.deleteFlows();
	    return this;
	};

	exports.flow = FlowContainer.create;

	exports.compile = function (file, options, cb) {
	    if (extd.isFunction(options)) {
	        cb = options;
	        options = {};
	    } else {
	        options = options || {};
	        cb = null;
	    }
	    if (extd.isString(file)) {
	        options.name = options.name || (isNoolsFile(file) ? path.basename(file, path.extname(file)) : null);
	        file = parse(file);
	    }
	    if (!options.name) {
	        throw new Error("Name required when compiling nools source");
	    }
	    return  compile.compile(file, options, cb, FlowContainer);
	};

	exports.transpile = function (file, options) {
	    options = options || {};
	    if (extd.isString(file)) {
	        options.name = options.name || (isNoolsFile(file) ? path.basename(file, path.extname(file)) : null);
	        file = parse(file);
	    }
	    return compile.transpile(file, options);
	};

	exports.parse = parse;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var arr = __webpack_require__(6),
	    unique = arr.unique,
	    indexOf = arr.indexOf,
	    map = arr.map,
	    pSlice = Array.prototype.slice,
	    pSplice = Array.prototype.splice;

	function plucked(prop) {
	    var exec = prop.match(/(\w+)\(\)$/);
	    if (exec) {
	        prop = exec[1];
	        return function (item) {
	            return item[prop]();
	        };
	    } else {
	        return function (item) {
	            return item[prop];
	        };
	    }
	}

	function plucker(prop) {
	    prop = prop.split(".");
	    if (prop.length === 1) {
	        return plucked(prop[0]);
	    } else {
	        var pluckers = map(prop, function (prop) {
	            return plucked(prop);
	        });
	        var l = pluckers.length;
	        return function (item) {
	            var i = -1, res = item;
	            while (++i < l) {
	                res = pluckers[i](res);
	            }
	            return res;
	        };
	    }
	}

	function intersection(a, b) {
	    a = pSlice.call(a);
	    var aOne, i = -1, l;
	    l = a.length;
	    while (++i < l) {
	        aOne = a[i];
	        if (indexOf(b, aOne) === -1) {
	            pSplice.call(a, i--, 1);
	            l--;
	        }
	    }
	    return a;
	}

	function inPlaceIntersection(a, b) {
	    var aOne, i = -1, l;
	    l = a.length;
	    while (++i < l) {
	        aOne = a[i];
	        if (indexOf(b, aOne) === -1) {
	            pSplice.call(a, i--, 1);
	            l--;
	        }
	    }
	    return a;
	}

	function inPlaceDifference(a, b) {
	    var aOne, i = -1, l;
	    l = a.length;
	    while (++i < l) {
	        aOne = a[i];
	        if (indexOf(b, aOne) !== -1) {
	            pSplice.call(a, i--, 1);
	            l--;
	        }
	    }
	    return a;
	}

	function diffArr(arr1, arr2) {
	    var ret = [], i = -1, j, l2 = arr2.length, l1 = arr1.length, a, found;
	    if (l2 > l1) {
	        ret = arr1.slice();
	        while (++i < l2) {
	            a = arr2[i];
	            j = -1;
	            l1 = ret.length;
	            while (++j < l1) {
	                if (ret[j] === a) {
	                    ret.splice(j, 1);
	                    break;
	                }
	            }
	        }
	    } else {
	        while (++i < l1) {
	            a = arr1[i];
	            j = -1;
	            found = false;
	            while (++j < l2) {
	                if (arr2[j] === a) {
	                    found = true;
	                    break;
	                }
	            }
	            if (!found) {
	                ret.push(a);
	            }
	        }
	    }
	    return ret;
	}

	function diffHash(h1, h2) {
	    var ret = {};
	    for (var i in h1) {
	        if (!hasOwnProperty.call(h2, i)) {
	            ret[i] = h1[i];
	        }
	    }
	    return ret;
	}


	function union(arr1, arr2) {
	    return unique(arr1.concat(arr2));
	}

	module.exports = __webpack_require__(7)()
	    .register(__webpack_require__(18))
	    .register(arr)
	    .register(__webpack_require__(19))
	    .register(__webpack_require__(20))
	    .register(__webpack_require__(21))
	    .register(__webpack_require__(24))
	    .register(__webpack_require__(12))
	    .register("intersection", intersection)
	    .register("inPlaceIntersection", inPlaceIntersection)
	    .register("inPlaceDifference", inPlaceDifference)
	    .register("diffArr", diffArr)
	    .register("diffHash", diffHash)
	    .register("unionArr", union)
	    .register("plucker", plucker)
	    .register("HashTable", __webpack_require__(25))
	    .register("declare", __webpack_require__(10))
	    .register(__webpack_require__(26))
	    .register("LinkedList", __webpack_require__(27));



/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	(function () {
	    "use strict";
	    /*global define*/

	    function defineArray(extended, is, args) {

	        var isString = is.isString,
	            isArray = Array.isArray || is.isArray,
	            isDate = is.isDate,
	            floor = Math.floor,
	            abs = Math.abs,
	            mathMax = Math.max,
	            mathMin = Math.min,
	            arrayProto = Array.prototype,
	            arrayIndexOf = arrayProto.indexOf,
	            arrayForEach = arrayProto.forEach,
	            arrayMap = arrayProto.map,
	            arrayReduce = arrayProto.reduce,
	            arrayReduceRight = arrayProto.reduceRight,
	            arrayFilter = arrayProto.filter,
	            arrayEvery = arrayProto.every,
	            arraySome = arrayProto.some,
	            argsToArray = args.argsToArray;


	        function cross(num, cros) {
	            return reduceRight(cros, function (a, b) {
	                if (!isArray(b)) {
	                    b = [b];
	                }
	                b.unshift(num);
	                a.unshift(b);
	                return a;
	            }, []);
	        }

	        function permute(num, cross, length) {
	            var ret = [];
	            for (var i = 0; i < cross.length; i++) {
	                ret.push([num].concat(rotate(cross, i)).slice(0, length));
	            }
	            return ret;
	        }


	        function intersection(a, b) {
	            var ret = [], aOne, i = -1, l;
	            l = a.length;
	            while (++i < l) {
	                aOne = a[i];
	                if (indexOf(b, aOne) !== -1) {
	                    ret.push(aOne);
	                }
	            }
	            return ret;
	        }


	        var _sort = (function () {

	            var isAll = function (arr, test) {
	                return every(arr, test);
	            };

	            var defaultCmp = function (a, b) {
	                return a - b;
	            };

	            var dateSort = function (a, b) {
	                return a.getTime() - b.getTime();
	            };

	            return function _sort(arr, property) {
	                var ret = [];
	                if (isArray(arr)) {
	                    ret = arr.slice();
	                    if (property) {
	                        if (typeof property === "function") {
	                            ret.sort(property);
	                        } else {
	                            ret.sort(function (a, b) {
	                                var aProp = a[property], bProp = b[property];
	                                if (isString(aProp) && isString(bProp)) {
	                                    return aProp > bProp ? 1 : aProp < bProp ? -1 : 0;
	                                } else if (isDate(aProp) && isDate(bProp)) {
	                                    return aProp.getTime() - bProp.getTime();
	                                } else {
	                                    return aProp - bProp;
	                                }
	                            });
	                        }
	                    } else {
	                        if (isAll(ret, isString)) {
	                            ret.sort();
	                        } else if (isAll(ret, isDate)) {
	                            ret.sort(dateSort);
	                        } else {
	                            ret.sort(defaultCmp);
	                        }
	                    }
	                }
	                return ret;
	            };

	        })();

	        function indexOf(arr, searchElement, from) {
	            var index = (from || 0) - 1,
	                length = arr.length;
	            while (++index < length) {
	                if (arr[index] === searchElement) {
	                    return index;
	                }
	            }
	            return -1;
	        }

	        function lastIndexOf(arr, searchElement, from) {
	            if (!isArray(arr)) {
	                throw new TypeError();
	            }

	            var t = Object(arr);
	            var len = t.length >>> 0;
	            if (len === 0) {
	                return -1;
	            }

	            var n = len;
	            if (arguments.length > 2) {
	                n = Number(arguments[2]);
	                if (n !== n) {
	                    n = 0;
	                } else if (n !== 0 && n !== (1 / 0) && n !== -(1 / 0)) {
	                    n = (n > 0 || -1) * floor(abs(n));
	                }
	            }

	            var k = n >= 0 ? mathMin(n, len - 1) : len - abs(n);

	            for (; k >= 0; k--) {
	                if (k in t && t[k] === searchElement) {
	                    return k;
	                }
	            }
	            return -1;
	        }

	        function filter(arr, iterator, scope) {
	            if (arr && arrayFilter && arrayFilter === arr.filter) {
	                return arr.filter(iterator, scope);
	            }
	            if (!isArray(arr) || typeof iterator !== "function") {
	                throw new TypeError();
	            }

	            var t = Object(arr);
	            var len = t.length >>> 0;
	            var res = [];
	            for (var i = 0; i < len; i++) {
	                if (i in t) {
	                    var val = t[i]; // in case fun mutates this
	                    if (iterator.call(scope, val, i, t)) {
	                        res.push(val);
	                    }
	                }
	            }
	            return res;
	        }

	        function forEach(arr, iterator, scope) {
	            if (!isArray(arr) || typeof iterator !== "function") {
	                throw new TypeError();
	            }
	            if (arr && arrayForEach && arrayForEach === arr.forEach) {
	                arr.forEach(iterator, scope);
	                return arr;
	            }
	            for (var i = 0, len = arr.length; i < len; ++i) {
	                iterator.call(scope || arr, arr[i], i, arr);
	            }

	            return arr;
	        }

	        function every(arr, iterator, scope) {
	            if (arr && arrayEvery && arrayEvery === arr.every) {
	                return arr.every(iterator, scope);
	            }
	            if (!isArray(arr) || typeof iterator !== "function") {
	                throw new TypeError();
	            }
	            var t = Object(arr);
	            var len = t.length >>> 0;
	            for (var i = 0; i < len; i++) {
	                if (i in t && !iterator.call(scope, t[i], i, t)) {
	                    return false;
	                }
	            }
	            return true;
	        }

	        function some(arr, iterator, scope) {
	            if (arr && arraySome && arraySome === arr.some) {
	                return arr.some(iterator, scope);
	            }
	            if (!isArray(arr) || typeof iterator !== "function") {
	                throw new TypeError();
	            }
	            var t = Object(arr);
	            var len = t.length >>> 0;
	            for (var i = 0; i < len; i++) {
	                if (i in t && iterator.call(scope, t[i], i, t)) {
	                    return true;
	                }
	            }
	            return false;
	        }

	        function map(arr, iterator, scope) {
	            if (arr && arrayMap && arrayMap === arr.map) {
	                return arr.map(iterator, scope);
	            }
	            if (!isArray(arr) || typeof iterator !== "function") {
	                throw new TypeError();
	            }

	            var t = Object(arr);
	            var len = t.length >>> 0;
	            var res = [];
	            for (var i = 0; i < len; i++) {
	                if (i in t) {
	                    res.push(iterator.call(scope, t[i], i, t));
	                }
	            }
	            return res;
	        }

	        function reduce(arr, accumulator, curr) {
	            var initial = arguments.length > 2;
	            if (arr && arrayReduce && arrayReduce === arr.reduce) {
	                return initial ? arr.reduce(accumulator, curr) : arr.reduce(accumulator);
	            }
	            if (!isArray(arr) || typeof accumulator !== "function") {
	                throw new TypeError();
	            }
	            var i = 0, l = arr.length >> 0;
	            if (arguments.length < 3) {
	                if (l === 0) {
	                    throw new TypeError("Array length is 0 and no second argument");
	                }
	                curr = arr[0];
	                i = 1; // start accumulating at the second element
	            } else {
	                curr = arguments[2];
	            }
	            while (i < l) {
	                if (i in arr) {
	                    curr = accumulator.call(undefined, curr, arr[i], i, arr);
	                }
	                ++i;
	            }
	            return curr;
	        }

	        function reduceRight(arr, accumulator, curr) {
	            var initial = arguments.length > 2;
	            if (arr && arrayReduceRight && arrayReduceRight === arr.reduceRight) {
	                return initial ? arr.reduceRight(accumulator, curr) : arr.reduceRight(accumulator);
	            }
	            if (!isArray(arr) || typeof accumulator !== "function") {
	                throw new TypeError();
	            }

	            var t = Object(arr);
	            var len = t.length >>> 0;

	            // no value to return if no initial value, empty array
	            if (len === 0 && arguments.length === 2) {
	                throw new TypeError();
	            }

	            var k = len - 1;
	            if (arguments.length >= 3) {
	                curr = arguments[2];
	            } else {
	                do {
	                    if (k in arr) {
	                        curr = arr[k--];
	                        break;
	                    }
	                }
	                while (true);
	            }
	            while (k >= 0) {
	                if (k in t) {
	                    curr = accumulator.call(undefined, curr, t[k], k, t);
	                }
	                k--;
	            }
	            return curr;
	        }


	        function toArray(o) {
	            var ret = [];
	            if (o !== null) {
	                var args = argsToArray(arguments);
	                if (args.length === 1) {
	                    if (isArray(o)) {
	                        ret = o;
	                    } else if (is.isHash(o)) {
	                        for (var i in o) {
	                            if (o.hasOwnProperty(i)) {
	                                ret.push([i, o[i]]);
	                            }
	                        }
	                    } else {
	                        ret.push(o);
	                    }
	                } else {
	                    forEach(args, function (a) {
	                        ret = ret.concat(toArray(a));
	                    });
	                }
	            }
	            return ret;
	        }

	        function sum(array) {
	            array = array || [];
	            if (array.length) {
	                return reduce(array, function (a, b) {
	                    return a + b;
	                });
	            } else {
	                return 0;
	            }
	        }

	        function avg(arr) {
	            arr = arr || [];
	            if (arr.length) {
	                var total = sum(arr);
	                if (is.isNumber(total)) {
	                    return  total / arr.length;
	                } else {
	                    throw new Error("Cannot average an array of non numbers.");
	                }
	            } else {
	                return 0;
	            }
	        }

	        function sort(arr, cmp) {
	            return _sort(arr, cmp);
	        }

	        function min(arr, cmp) {
	            return _sort(arr, cmp)[0];
	        }

	        function max(arr, cmp) {
	            return _sort(arr, cmp)[arr.length - 1];
	        }

	        function difference(arr1) {
	            var ret = arr1, args = flatten(argsToArray(arguments, 1));
	            if (isArray(arr1)) {
	                ret = filter(arr1, function (a) {
	                    return indexOf(args, a) === -1;
	                });
	            }
	            return ret;
	        }

	        function removeDuplicates(arr) {
	            var ret = [], i = -1, l, retLength = 0;
	            if (arr) {
	                l = arr.length;
	                while (++i < l) {
	                    var item = arr[i];
	                    if (indexOf(ret, item) === -1) {
	                        ret[retLength++] = item;
	                    }
	                }
	            }
	            return ret;
	        }


	        function unique(arr) {
	            return removeDuplicates(arr);
	        }


	        function rotate(arr, numberOfTimes) {
	            var ret = arr.slice();
	            if (typeof numberOfTimes !== "number") {
	                numberOfTimes = 1;
	            }
	            if (numberOfTimes && isArray(arr)) {
	                if (numberOfTimes > 0) {
	                    ret.push(ret.shift());
	                    numberOfTimes--;
	                } else {
	                    ret.unshift(ret.pop());
	                    numberOfTimes++;
	                }
	                return rotate(ret, numberOfTimes);
	            } else {
	                return ret;
	            }
	        }

	        function permutations(arr, length) {
	            var ret = [];
	            if (isArray(arr)) {
	                var copy = arr.slice(0);
	                if (typeof length !== "number") {
	                    length = arr.length;
	                }
	                if (!length) {
	                    ret = [
	                        []
	                    ];
	                } else if (length <= arr.length) {
	                    ret = reduce(arr, function (a, b, i) {
	                        var ret;
	                        if (length > 1) {
	                            ret = permute(b, rotate(copy, i).slice(1), length);
	                        } else {
	                            ret = [
	                                [b]
	                            ];
	                        }
	                        return a.concat(ret);
	                    }, []);
	                }
	            }
	            return ret;
	        }

	        function zip() {
	            var ret = [];
	            var arrs = argsToArray(arguments);
	            if (arrs.length > 1) {
	                var arr1 = arrs.shift();
	                if (isArray(arr1)) {
	                    ret = reduce(arr1, function (a, b, i) {
	                        var curr = [b];
	                        for (var j = 0; j < arrs.length; j++) {
	                            var currArr = arrs[j];
	                            if (isArray(currArr) && !is.isUndefined(currArr[i])) {
	                                curr.push(currArr[i]);
	                            } else {
	                                curr.push(null);
	                            }
	                        }
	                        a.push(curr);
	                        return a;
	                    }, []);
	                }
	            }
	            return ret;
	        }

	        function transpose(arr) {
	            var ret = [];
	            if (isArray(arr) && arr.length) {
	                var last;
	                forEach(arr, function (a) {
	                    if (isArray(a) && (!last || a.length === last.length)) {
	                        forEach(a, function (b, i) {
	                            if (!ret[i]) {
	                                ret[i] = [];
	                            }
	                            ret[i].push(b);
	                        });
	                        last = a;
	                    }
	                });
	            }
	            return ret;
	        }

	        function valuesAt(arr, indexes) {
	            var ret = [];
	            indexes = argsToArray(arguments);
	            arr = indexes.shift();
	            if (isArray(arr) && indexes.length) {
	                for (var i = 0, l = indexes.length; i < l; i++) {
	                    ret.push(arr[indexes[i]] || null);
	                }
	            }
	            return ret;
	        }

	        function union() {
	            var ret = [];
	            var arrs = argsToArray(arguments);
	            if (arrs.length > 1) {
	                for (var i = 0, l = arrs.length; i < l; i++) {
	                    ret = ret.concat(arrs[i]);
	                }
	                ret = removeDuplicates(ret);
	            }
	            return ret;
	        }

	        function intersect() {
	            var collect = [], sets, i = -1 , l;
	            if (arguments.length > 1) {
	                //assume we are intersections all the lists in the array
	                sets = argsToArray(arguments);
	            } else {
	                sets = arguments[0];
	            }
	            if (isArray(sets)) {
	                collect = sets[0];
	                i = 0;
	                l = sets.length;
	                while (++i < l) {
	                    collect = intersection(collect, sets[i]);
	                }
	            }
	            return removeDuplicates(collect);
	        }

	        function powerSet(arr) {
	            var ret = [];
	            if (isArray(arr) && arr.length) {
	                ret = reduce(arr, function (a, b) {
	                    var ret = map(a, function (c) {
	                        return c.concat(b);
	                    });
	                    return a.concat(ret);
	                }, [
	                    []
	                ]);
	            }
	            return ret;
	        }

	        function cartesian(a, b) {
	            var ret = [];
	            if (isArray(a) && isArray(b) && a.length && b.length) {
	                ret = cross(a[0], b).concat(cartesian(a.slice(1), b));
	            }
	            return ret;
	        }

	        function compact(arr) {
	            var ret = [];
	            if (isArray(arr) && arr.length) {
	                ret = filter(arr, function (item) {
	                    return !is.isUndefinedOrNull(item);
	                });
	            }
	            return ret;
	        }

	        function multiply(arr, times) {
	            times = is.isNumber(times) ? times : 1;
	            if (!times) {
	                //make sure times is greater than zero if it is zero then dont multiply it
	                times = 1;
	            }
	            arr = toArray(arr || []);
	            var ret = [], i = 0;
	            while (++i <= times) {
	                ret = ret.concat(arr);
	            }
	            return ret;
	        }

	        function flatten(arr) {
	            var set;
	            var args = argsToArray(arguments);
	            if (args.length > 1) {
	                //assume we are intersections all the lists in the array
	                set = args;
	            } else {
	                set = toArray(arr);
	            }
	            return reduce(set, function (a, b) {
	                return a.concat(b);
	            }, []);
	        }

	        function pluck(arr, prop) {
	            prop = prop.split(".");
	            var result = arr.slice(0);
	            forEach(prop, function (prop) {
	                var exec = prop.match(/(\w+)\(\)$/);
	                result = map(result, function (item) {
	                    return exec ? item[exec[1]]() : item[prop];
	                });
	            });
	            return result;
	        }

	        function invoke(arr, func, args) {
	            args = argsToArray(arguments, 2);
	            return map(arr, function (item) {
	                var exec = isString(func) ? item[func] : func;
	                return exec.apply(item, args);
	            });
	        }


	        var array = {
	            toArray: toArray,
	            sum: sum,
	            avg: avg,
	            sort: sort,
	            min: min,
	            max: max,
	            difference: difference,
	            removeDuplicates: removeDuplicates,
	            unique: unique,
	            rotate: rotate,
	            permutations: permutations,
	            zip: zip,
	            transpose: transpose,
	            valuesAt: valuesAt,
	            union: union,
	            intersect: intersect,
	            powerSet: powerSet,
	            cartesian: cartesian,
	            compact: compact,
	            multiply: multiply,
	            flatten: flatten,
	            pluck: pluck,
	            invoke: invoke,
	            forEach: forEach,
	            map: map,
	            filter: filter,
	            reduce: reduce,
	            reduceRight: reduceRight,
	            some: some,
	            every: every,
	            indexOf: indexOf,
	            lastIndexOf: lastIndexOf
	        };

	        return extended.define(isArray, array).expose(array);
	    }

	    if (true) {
	        if ("undefined" !== typeof module && module.exports) {
	            module.exports = defineArray(__webpack_require__(7), __webpack_require__(12), __webpack_require__(17));
	        }
	    } else if ("function" === typeof define && define.amd) {
	        define(["extended", "is-extended", "arguments-extended"], function (extended, is, args) {
	            return defineArray(extended, is, args);
	        });
	    } else {
	        this.arrayExtended = defineArray(this.extended, this.isExtended, this.argumentsExtended);
	    }

	}).call(this);








/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	(function () {
	    "use strict";
	    /*global extender is, dateExtended*/

	    function defineExtended(extender) {


	        var merge = (function merger() {
	            function _merge(target, source) {
	                var name, s;
	                for (name in source) {
	                    if (source.hasOwnProperty(name)) {
	                        s = source[name];
	                        if (!(name in target) || (target[name] !== s)) {
	                            target[name] = s;
	                        }
	                    }
	                }
	                return target;
	            }

	            return function merge(obj) {
	                if (!obj) {
	                    obj = {};
	                }
	                for (var i = 1, l = arguments.length; i < l; i++) {
	                    _merge(obj, arguments[i]);
	                }
	                return obj; // Object
	            };
	        }());

	        function getExtended() {

	            var loaded = {};


	            //getInitial instance;
	            var extended = extender.define();
	            extended.expose({
	                register: function register(alias, extendWith) {
	                    if (!extendWith) {
	                        extendWith = alias;
	                        alias = null;
	                    }
	                    var type = typeof extendWith;
	                    if (alias) {
	                        extended[alias] = extendWith;
	                    } else if (extendWith && type === "function") {
	                        extended.extend(extendWith);
	                    } else if (type === "object") {
	                        extended.expose(extendWith);
	                    } else {
	                        throw new TypeError("extended.register must be called with an extender function");
	                    }
	                    return extended;
	                },

	                define: function () {
	                    return extender.define.apply(extender, arguments);
	                }
	            });

	            return extended;
	        }

	        function extended() {
	            return getExtended();
	        }

	        extended.define = function define() {
	            return extender.define.apply(extender, arguments);
	        };

	        return extended;
	    }

	    if (true) {
	        if ("undefined" !== typeof module && module.exports) {
	            module.exports = defineExtended(__webpack_require__(8));

	        }
	    } else if ("function" === typeof define && define.amd) {
	        define(["extender"], function (extender) {
	            return defineExtended(extender);
	        });
	    } else {
	        this.extended = defineExtended(this.extender);
	    }

	}).call(this);








/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(9);

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	(function () {
	    /*jshint strict:false*/


	    /**
	     *
	     * @projectName extender
	     * @github http://github.com/doug-martin/extender
	     * @header
	     * [![build status](https://secure.travis-ci.org/doug-martin/extender.png)](http://travis-ci.org/doug-martin/extender)
	     * # Extender
	     *
	     * `extender` is a library that helps in making chainable APIs, by creating a function that accepts different values and returns an object decorated with functions based on the type.
	     *
	     * ## Why Is Extender Different?
	     *
	     * Extender is different than normal chaining because is does more than return `this`. It decorates your values in a type safe manner.
	     *
	     * For example if you return an array from a string based method then the returned value will be decorated with array methods and not the string methods. This allow you as the developer to focus on your API and not worrying about how to properly build and connect your API.
	     *
	     *
	     * ## Installation
	     *
	     * ```
	     * npm install extender
	     * ```
	     *
	     * Or [download the source](https://raw.github.com/doug-martin/extender/master/extender.js) ([minified](https://raw.github.com/doug-martin/extender/master/extender-min.js))
	     *
	     * **Note** `extender` depends on [`declare.js`](http://doug-martin.github.com/declare.js/).
	     *
	     * ### Requirejs
	     *
	     * To use with requirejs place the `extend` source in the root scripts directory
	     *
	     * ```javascript
	     *
	     * define(["extender"], function(extender){
	     * });
	     *
	     * ```
	     *
	     *
	     * ## Usage
	     *
	     * **`extender.define(tester, decorations)`**
	     *
	     * To create your own extender call the `extender.define` function.
	     *
	     * This function accepts an optional tester which is used to determine a value should be decorated with the specified `decorations`
	     *
	     * ```javascript
	     * function isString(obj) {
	     *     return !isUndefinedOrNull(obj) && (typeof obj === "string" || obj instanceof String);
	     * }
	     *
	     *
	     * var myExtender = extender.define(isString, {
	     *		multiply: function (str, times) {
	     *			var ret = str;
	     *			for (var i = 1; i < times; i++) {
	     *				ret += str;
	     *			}
	     *			return ret;
	     *		},
	     *		toArray: function (str, delim) {
	     *			delim = delim || "";
	     *			return str.split(delim);
	     *		}
	     *	});
	     *
	     * myExtender("hello").multiply(2).value(); //hellohello
	     *
	     * ```
	     *
	     * If you do not specify a tester function and just pass in an object of `functions` then all values passed in will be decorated with methods.
	     *
	     * ```javascript
	     *
	     * function isUndefined(obj) {
	     *     var undef;
	     *     return obj === undef;
	     * }
	     *
	     * function isUndefinedOrNull(obj) {
	     *	var undef;
	     *     return obj === undef || obj === null;
	     * }
	     *
	     * function isArray(obj) {
	     *     return Object.prototype.toString.call(obj) === "[object Array]";
	     * }
	     *
	     * function isBoolean(obj) {
	     *     var undef, type = typeof obj;
	     *     return !isUndefinedOrNull(obj) && type === "boolean" || type === "Boolean";
	     * }
	     *
	     * function isString(obj) {
	     *     return !isUndefinedOrNull(obj) && (typeof obj === "string" || obj instanceof String);
	     * }
	     *
	     * var myExtender = extender.define({
	     *	isUndefined : isUndefined,
	     *	isUndefinedOrNull : isUndefinedOrNull,
	     *	isArray : isArray,
	     *	isBoolean : isBoolean,
	     *	isString : isString
	     * });
	     *
	     * ```
	     *
	     * To use
	     *
	     * ```
	     * var undef;
	     * myExtender("hello").isUndefined().value(); //false
	     * myExtender(undef).isUndefined().value(); //true
	     * ```
	     *
	     * You can also chain extenders so that they accept multiple types and decorates accordingly.
	     *
	     * ```javascript
	     * myExtender
	     *     .define(isArray, {
	     *		pluck: function (arr, m) {
	     *			var ret = [];
	     *			for (var i = 0, l = arr.length; i < l; i++) {
	     *				ret.push(arr[i][m]);
	     *			}
	     *			return ret;
	     *		}
	     *	})
	     *     .define(isBoolean, {
	     *		invert: function (val) {
	     *			return !val;
	     *		}
	     *	});
	     *
	     * myExtender([{a: "a"},{a: "b"},{a: "c"}]).pluck("a").value(); //["a", "b", "c"]
	     * myExtender("I love javascript!").toArray(/\s+/).pluck("0"); //["I", "l", "j"]
	     *
	     * ```
	     *
	     * Notice that we reuse the same extender as defined above.
	     *
	     * **Return Values**
	     *
	     * When creating an extender if you return a value from one of the decoration functions then that value will also be decorated. If you do not return any values then the extender will be returned.
	     *
	     * **Default decoration methods**
	     *
	     * By default every value passed into an extender is decorated with the following methods.
	     *
	     * * `value` : The value this extender represents.
	     * * `eq(otherValue)` : Tests strict equality of the currently represented value to the `otherValue`
	     * * `neq(oterValue)` : Tests strict inequality of the currently represented value.
	     * * `print` : logs the current value to the console.
	     *
	     * **Extender initialization**
	     *
	     * When creating an extender you can also specify a constructor which will be invoked with the current value.
	     *
	     * ```javascript
	     * myExtender.define(isString, {
	     *	constructor : function(val){
	     *     //set our value to the string trimmed
	     *		this._value = val.trimRight().trimLeft();
	     *	}
	     * });
	     * ```
	     *
	     * **`noWrap`**
	     *
	     * `extender` also allows you to specify methods that should not have the value wrapped providing a cleaner exit function other than `value()`.
	     *
	     * For example suppose you have an API that allows you to build a validator, rather than forcing the user to invoke the `value` method you could add a method called `validator` which makes more syntactic sense.
	     *
	     * ```
	     *
	     * var myValidator = extender.define({
	     *     //chainable validation methods
	     *     //...
	     *     //end chainable validation methods
	     *
	     *     noWrap : {
	     *         validator : function(){
	     *             //return your validator
	     *         }
	     *     }
	     * });
	     *
	     * myValidator().isNotNull().isEmailAddress().validator(); //now you dont need to call .value()
	     *
	     *
	     * ```
	     * **`extender.extend(extendr)`**
	     *
	     * You may also compose extenders through the use of `extender.extend(extender)`, which will return an entirely new extender that is the composition of extenders.
	     *
	     * Suppose you have the following two extenders.
	     *
	     * ```javascript
	     * var myExtender = extender
	     *        .define({
	     *            isFunction: is.function,
	     *            isNumber: is.number,
	     *            isString: is.string,
	     *            isDate: is.date,
	     *            isArray: is.array,
	     *            isBoolean: is.boolean,
	     *            isUndefined: is.undefined,
	     *            isDefined: is.defined,
	     *            isUndefinedOrNull: is.undefinedOrNull,
	     *            isNull: is.null,
	     *            isArguments: is.arguments,
	     *            isInstanceOf: is.instanceOf,
	     *            isRegExp: is.regExp
	     *        });
	     * var myExtender2 = extender.define(is.array, {
	     *     pluck: function (arr, m) {
	     *         var ret = [];
	     *         for (var i = 0, l = arr.length; i < l; i++) {
	     *             ret.push(arr[i][m]);
	     *         }
	     *         return ret;
	     *     },
	     *
	     *     noWrap: {
	     *         pluckPlain: function (arr, m) {
	     *             var ret = [];
	     *             for (var i = 0, l = arr.length; i < l; i++) {
	     *                 ret.push(arr[i][m]);
	     *             }
	     *             return ret;
	     *         }
	     *     }
	     * });
	     *
	     *
	     * ```
	     *
	     * And you do not want to alter either of them but instead what to create a third that is the union of the two.
	     *
	     *
	     * ```javascript
	     * var composed = extender.extend(myExtender).extend(myExtender2);
	     * ```
	     * So now you can use the new extender with the joined functionality if `myExtender` and `myExtender2`.
	     *
	     * ```javascript
	     * var extended = composed([
	     *      {a: "a"},
	     *      {a: "b"},
	     *      {a: "c"}
	     * ]);
	     * extended.isArray().value(); //true
	     * extended.pluck("a").value(); // ["a", "b", "c"]);
	     *
	     * ```
	     *
	     * **Note** `myExtender` and `myExtender2` will **NOT** be altered.
	     *
	     * **`extender.expose(methods)`**
	     *
	     * The `expose` method allows you to add methods to your extender that are not wrapped or automatically chained by exposing them on the extender directly.
	     *
	     * ```
	     * var isMethods = {
	     *      isFunction: is.function,
	     *      isNumber: is.number,
	     *      isString: is.string,
	     *      isDate: is.date,
	     *      isArray: is.array,
	     *      isBoolean: is.boolean,
	     *      isUndefined: is.undefined,
	     *      isDefined: is.defined,
	     *      isUndefinedOrNull: is.undefinedOrNull,
	     *      isNull: is.null,
	     *      isArguments: is.arguments,
	     *      isInstanceOf: is.instanceOf,
	     *      isRegExp: is.regExp
	     * };
	     *
	     * var myExtender = extender.define(isMethods).expose(isMethods);
	     *
	     * myExtender.isArray([]); //true
	     * myExtender([]).isArray([]).value(); //true
	     *
	     * ```
	     *
	     *
	     * **Using `instanceof`**
	     *
	     * When using extenders you can test if a value is an `instanceof` of an extender by using the instanceof operator.
	     *
	     * ```javascript
	     * var str = myExtender("hello");
	     *
	     * str instanceof myExtender; //true
	     * ```
	     *
	     * ## Examples
	     *
	     * To see more examples click [here](https://github.com/doug-martin/extender/tree/master/examples)
	     */
	    function defineExtender(declare) {


	        var slice = Array.prototype.slice, undef;

	        function indexOf(arr, item) {
	            if (arr && arr.length) {
	                for (var i = 0, l = arr.length; i < l; i++) {
	                    if (arr[i] === item) {
	                        return i;
	                    }
	                }
	            }
	            return -1;
	        }

	        function isArray(obj) {
	            return Object.prototype.toString.call(obj) === "[object Array]";
	        }

	        var merge = (function merger() {
	            function _merge(target, source, exclude) {
	                var name, s;
	                for (name in source) {
	                    if (source.hasOwnProperty(name) && indexOf(exclude, name) === -1) {
	                        s = source[name];
	                        if (!(name in target) || (target[name] !== s)) {
	                            target[name] = s;
	                        }
	                    }
	                }
	                return target;
	            }

	            return function merge(obj) {
	                if (!obj) {
	                    obj = {};
	                }
	                var l = arguments.length;
	                var exclude = arguments[arguments.length - 1];
	                if (isArray(exclude)) {
	                    l--;
	                } else {
	                    exclude = [];
	                }
	                for (var i = 1; i < l; i++) {
	                    _merge(obj, arguments[i], exclude);
	                }
	                return obj; // Object
	            };
	        }());


	        function extender(supers) {
	            supers = supers || [];
	            var Base = declare({
	                instance: {
	                    constructor: function (value) {
	                        this._value = value;
	                    },

	                    value: function () {
	                        return this._value;
	                    },

	                    eq: function eq(val) {
	                        return this["__extender__"](this._value === val);
	                    },

	                    neq: function neq(other) {
	                        return this["__extender__"](this._value !== other);
	                    },
	                    print: function () {
	                        console.log(this._value);
	                        return this;
	                    }
	                }
	            }), defined = [];

	            function addMethod(proto, name, func) {
	                if ("function" !== typeof func) {
	                    throw new TypeError("when extending type you must provide a function");
	                }
	                var extendedMethod;
	                if (name === "constructor") {
	                    extendedMethod = function () {
	                        this._super(arguments);
	                        func.apply(this, arguments);
	                    };
	                } else {
	                    extendedMethod = function extendedMethod() {
	                        var args = slice.call(arguments);
	                        args.unshift(this._value);
	                        var ret = func.apply(this, args);
	                        return ret !== undef ? this["__extender__"](ret) : this;
	                    };
	                }
	                proto[name] = extendedMethod;
	            }

	            function addNoWrapMethod(proto, name, func) {
	                if ("function" !== typeof func) {
	                    throw new TypeError("when extending type you must provide a function");
	                }
	                var extendedMethod;
	                if (name === "constructor") {
	                    extendedMethod = function () {
	                        this._super(arguments);
	                        func.apply(this, arguments);
	                    };
	                } else {
	                    extendedMethod = function extendedMethod() {
	                        var args = slice.call(arguments);
	                        args.unshift(this._value);
	                        return func.apply(this, args);
	                    };
	                }
	                proto[name] = extendedMethod;
	            }

	            function decorateProto(proto, decoration, nowrap) {
	                for (var i in decoration) {
	                    if (decoration.hasOwnProperty(i)) {
	                        if (i !== "getters" && i !== "setters") {
	                            if (i === "noWrap") {
	                                decorateProto(proto, decoration[i], true);
	                            } else if (nowrap) {
	                                addNoWrapMethod(proto, i, decoration[i]);
	                            } else {
	                                addMethod(proto, i, decoration[i]);
	                            }
	                        } else {
	                            proto[i] = decoration[i];
	                        }
	                    }
	                }
	            }

	            function _extender(obj) {
	                var ret = obj, i, l;
	                if (!(obj instanceof Base)) {
	                    var OurBase = Base;
	                    for (i = 0, l = defined.length; i < l; i++) {
	                        var definer = defined[i];
	                        if (definer[0](obj)) {
	                            OurBase = OurBase.extend({instance: definer[1]});
	                        }
	                    }
	                    ret = new OurBase(obj);
	                    ret["__extender__"] = _extender;
	                }
	                return ret;
	            }

	            function always() {
	                return true;
	            }

	            function define(tester, decorate) {
	                if (arguments.length) {
	                    if (typeof tester === "object") {
	                        decorate = tester;
	                        tester = always;
	                    }
	                    decorate = decorate || {};
	                    var proto = {};
	                    decorateProto(proto, decorate);
	                    //handle browsers like which skip over the constructor while looping
	                    if (!proto.hasOwnProperty("constructor")) {
	                        if (decorate.hasOwnProperty("constructor")) {
	                            addMethod(proto, "constructor", decorate.constructor);
	                        } else {
	                            proto.constructor = function () {
	                                this._super(arguments);
	                            };
	                        }
	                    }
	                    defined.push([tester, proto]);
	                }
	                return _extender;
	            }

	            function extend(supr) {
	                if (supr && supr.hasOwnProperty("__defined__")) {
	                    _extender["__defined__"] = defined = defined.concat(supr["__defined__"]);
	                }
	                merge(_extender, supr, ["define", "extend", "expose", "__defined__"]);
	                return _extender;
	            }

	            _extender.define = define;
	            _extender.extend = extend;
	            _extender.expose = function expose() {
	                var methods;
	                for (var i = 0, l = arguments.length; i < l; i++) {
	                    methods = arguments[i];
	                    if (typeof methods === "object") {
	                        merge(_extender, methods, ["define", "extend", "expose", "__defined__"]);
	                    }
	                }
	                return _extender;
	            };
	            _extender["__defined__"] = defined;


	            return _extender;
	        }

	        return {
	            define: function () {
	                return extender().define.apply(extender, arguments);
	            },

	            extend: function (supr) {
	                return extender().define().extend(supr);
	            }
	        };

	    }

	    if (true) {
	        if ("undefined" !== typeof module && module.exports) {
	            module.exports = defineExtender(__webpack_require__(10));

	        }
	    } else if ("function" === typeof define && define.amd) {
	        define(["declare"], function (declare) {
	            return defineExtender(declare);
	        });
	    } else {
	        this.extender = defineExtender(this.declare);
	    }

	}).call(this);

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(11);

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	(function () {

	    /**
	     * @projectName declare
	     * @github http://github.com/doug-martin/declare.js
	     * @header
	     *
	     * Declare is a library designed to allow writing object oriented code the same way in both the browser and node.js.
	     *
	     * ##Installation
	     *
	     * `npm install declare.js`
	     *
	     * Or [download the source](https://raw.github.com/doug-martin/declare.js/master/declare.js) ([minified](https://raw.github.com/doug-martin/declare.js/master/declare-min.js))
	     *
	     * ###Requirejs
	     *
	     * To use with requirejs place the `declare` source in the root scripts directory
	     *
	     * ```
	     *
	     * define(["declare"], function(declare){
	     *      return declare({
	     *          instance : {
	     *              hello : function(){
	     *                  return "world";
	     *              }
	     *          }
	     *      });
	     * });
	     *
	     * ```
	     *
	     *
	     * ##Usage
	     *
	     * declare.js provides
	     *
	     * Class methods
	     *
	     * * `as(module | object, name)` : exports the object to module or the object with the name
	     * * `mixin(mixin)` : mixes in an object but does not inherit directly from the object. **Note** this does not return a new class but changes the original class.
	     * * `extend(proto)` : extend a class with the given properties. A shortcut to `declare(Super, {})`;
	     *
	     * Instance methods
	     *
	     * * `_super(arguments)`: calls the super of the current method, you can pass in either the argments object or an array with arguments you want passed to super
	     * * `_getSuper()`: returns a this methods direct super.
	     * * `_static` : use to reference class properties and methods.
	     * * `get(prop)` : gets a property invoking the getter if it exists otherwise it just returns the named property on the object.
	     * * `set(prop, val)` : sets a property invoking the setter if it exists otherwise it just sets the named property on the object.
	     *
	     *
	     * ###Declaring a new Class
	     *
	     * Creating a new class with declare is easy!
	     *
	     * ```
	     *
	     * var Mammal = declare({
	     *      //define your instance methods and properties
	     *      instance : {
	     *
	     *          //will be called whenever a new instance is created
	     *          constructor: function(options) {
	     *              options = options || {};
	     *              this._super(arguments);
	     *              this._type = options.type || "mammal";
	     *          },
	     *
	     *          speak : function() {
	     *              return  "A mammal of type " + this._type + " sounds like";
	     *          },
	     *
	     *          //Define your getters
	     *          getters : {
	     *
	     *              //can be accessed by using the get method. (mammal.get("type"))
	     *              type : function() {
	     *                  return this._type;
	     *              }
	     *          },
	     *
	     *           //Define your setters
	     *          setters : {
	     *
	     *                //can be accessed by using the set method. (mammal.set("type", "mammalType"))
	     *              type : function(t) {
	     *                  this._type = t;
	     *              }
	     *          }
	     *      },
	     *
	     *      //Define your static methods
	     *      static : {
	     *
	     *          //Mammal.soundOff(); //"Im a mammal!!"
	     *          soundOff : function() {
	     *              return "Im a mammal!!";
	     *          }
	     *      }
	     * });
	     *
	     *
	     * ```
	     *
	     * You can use Mammal just like you would any other class.
	     *
	     * ```
	     * Mammal.soundOff("Im a mammal!!");
	     *
	     * var myMammal = new Mammal({type : "mymammal"});
	     * myMammal.speak(); // "A mammal of type mymammal sounds like"
	     * myMammal.get("type"); //"mymammal"
	     * myMammal.set("type", "mammal");
	     * myMammal.get("type"); //"mammal"
	     *
	     *
	     * ```
	     *
	     * ###Extending a class
	     *
	     * If you want to just extend a single class use the .extend method.
	     *
	     * ```
	     *
	     * var Wolf = Mammal.extend({
	     *
	     *   //define your instance method
	     *   instance: {
	     *
	     *        //You can override super constructors just be sure to call `_super`
	     *       constructor: function(options) {
	     *          options = options || {};
	     *          this._super(arguments); //call our super constructor.
	     *          this._sound = "growl";
	     *          this._color = options.color || "grey";
	     *      },
	     *
	     *      //override Mammals `speak` method by appending our own data to it.
	     *      speak : function() {
	     *          return this._super(arguments) + " a " + this._sound;
	     *      },
	     *
	     *      //add new getters for sound and color
	     *      getters : {
	     *
	     *           //new Wolf().get("type")
	     *           //notice color is read only as we did not define a setter
	     *          color : function() {
	     *              return this._color;
	     *          },
	     *
	     *          //new Wolf().get("sound")
	     *          sound : function() {
	     *              return this._sound;
	     *          }
	     *      },
	     *
	     *      setters : {
	     *
	     *          //new Wolf().set("sound", "howl")
	     *          sound : function(s) {
	     *              this._sound = s;
	     *          }
	     *      }
	     *
	     *  },
	     *
	     *  static : {
	     *
	     *      //You can override super static methods also! And you can still use _super
	     *      soundOff : function() {
	     *          //You can even call super in your statics!!!
	     *          //should return "I'm a mammal!! that growls"
	     *          return this._super(arguments) + " that growls";
	     *      }
	     *  }
	     * });
	     *
	     * Wolf.soundOff(); //Im a mammal!! that growls
	     *
	     * var myWolf = new Wolf();
	     * myWolf instanceof Mammal //true
	     * myWolf instanceof Wolf //true
	     *
	     * ```
	     *
	     * You can also extend a class by using the declare method and just pass in the super class.
	     *
	     * ```
	     * //Typical hierarchical inheritance
	     * // Mammal->Wolf->Dog
	     * var Dog = declare(Wolf, {
	     *    instance: {
	     *        constructor: function(options) {
	     *            options = options || {};
	     *            this._super(arguments);
	     *            //override Wolfs initialization of sound to woof.
	     *            this._sound = "woof";
	     *
	     *        },
	     *
	     *        speak : function() {
	     *            //Should return "A mammal of type mammal sounds like a growl thats domesticated"
	     *            return this._super(arguments) + " thats domesticated";
	     *        }
	     *    },
	     *
	     *    static : {
	     *        soundOff : function() {
	     *            //should return "I'm a mammal!! that growls but now barks"
	     *            return this._super(arguments) + " but now barks";
	     *        }
	     *    }
	     * });
	     *
	     * Dog.soundOff(); //Im a mammal!! that growls but now barks
	     *
	     * var myDog = new Dog();
	     * myDog instanceof Mammal //true
	     * myDog instanceof Wolf //true
	     * myDog instanceof Dog //true
	     *
	     *
	     * //Notice you still get the extend method.
	     *
	     * // Mammal->Wolf->Dog->Breed
	     * var Breed = Dog.extend({
	     *    instance: {
	     *
	     *        //initialize outside of constructor
	     *        _pitch : "high",
	     *
	     *        constructor: function(options) {
	     *            options = options || {};
	     *            this._super(arguments);
	     *            this.breed = options.breed || "lab";
	     *        },
	     *
	     *        speak : function() {
	     *            //Should return "A mammal of type mammal sounds like a
	     *            //growl thats domesticated with a high pitch!"
	     *            return this._super(arguments) + " with a " + this._pitch + " pitch!";
	     *        },
	     *
	     *        getters : {
	     *            pitch : function() {
	     *                return this._pitch;
	     *            }
	     *        }
	     *    },
	     *
	     *    static : {
	     *        soundOff : function() {
	     *            //should return "I'M A MAMMAL!! THAT GROWLS BUT NOW BARKS!"
	     *            return this._super(arguments).toUpperCase() + "!";
	     *        }
	     *    }
	     * });
	     *
	     *
	     * Breed.soundOff()//"IM A MAMMAL!! THAT GROWLS BUT NOW BARKS!"
	     *
	     * var myBreed = new Breed({color : "gold", type : "lab"}),
	     * myBreed instanceof Dog //true
	     * myBreed instanceof Wolf //true
	     * myBreed instanceof Mammal //true
	     * myBreed.speak() //"A mammal of type lab sounds like a woof thats domesticated with a high pitch!"
	     * myBreed.get("type") //"lab"
	     * myBreed.get("color") //"gold"
	     * myBreed.get("sound")" //"woof"
	     * ```
	     *
	     * ###Multiple Inheritance / Mixins
	     *
	     * declare also allows the use of multiple super classes.
	     * This is useful if you have generic classes that provide functionality but shouldnt be used on their own.
	     *
	     * Lets declare a mixin that allows us to watch for property changes.
	     *
	     * ```
	     * //Notice that we set up the functions outside of declare because we can reuse them
	     *
	     * function _set(prop, val) {
	     *     //get the old value
	     *     var oldVal = this.get(prop);
	     *     //call super to actually set the property
	     *     var ret = this._super(arguments);
	     *     //call our handlers
	     *     this.__callHandlers(prop, oldVal, val);
	     *     return ret;
	     * }
	     *
	     * function _callHandlers(prop, oldVal, newVal) {
	     *    //get our handlers for the property
	     *     var handlers = this.__watchers[prop], l;
	     *     //if the handlers exist and their length does not equal 0 then we call loop through them
	     *     if (handlers && (l = handlers.length) !== 0) {
	     *         for (var i = 0; i < l; i++) {
	     *             //call the handler
	     *             handlers[i].call(null, prop, oldVal, newVal);
	     *         }
	     *     }
	     * }
	     *
	     *
	     * //the watch function
	     * function _watch(prop, handler) {
	     *     if ("function" !== typeof handler) {
	     *         //if its not a function then its an invalid handler
	     *         throw new TypeError("Invalid handler.");
	     *     }
	     *     if (!this.__watchers[prop]) {
	     *         //create the watchers if it doesnt exist
	     *         this.__watchers[prop] = [handler];
	     *     } else {
	     *         //otherwise just add it to the handlers array
	     *         this.__watchers[prop].push(handler);
	     *     }
	     * }
	     *
	     * function _unwatch(prop, handler) {
	     *     if ("function" !== typeof handler) {
	     *         throw new TypeError("Invalid handler.");
	     *     }
	     *     var handlers = this.__watchers[prop], index;
	     *     if (handlers && (index = handlers.indexOf(handler)) !== -1) {
	     *        //remove the handler if it is found
	     *         handlers.splice(index, 1);
	     *     }
	     * }
	     *
	     * declare({
	     *     instance:{
	     *         constructor:function () {
	     *             this._super(arguments);
	     *             //set up our watchers
	     *             this.__watchers = {};
	     *         },
	     *
	     *         //override the default set function so we can watch values
	     *         "set":_set,
	     *         //set up our callhandlers function
	     *         __callHandlers:_callHandlers,
	     *         //add the watch function
	     *         watch:_watch,
	     *         //add the unwatch function
	     *         unwatch:_unwatch
	     *     },
	     *
	     *     "static":{
	     *
	     *         init:function () {
	     *             this._super(arguments);
	     *             this.__watchers = {};
	     *         },
	     *         //override the default set function so we can watch values
	     *         "set":_set,
	     *         //set our callHandlers function
	     *         __callHandlers:_callHandlers,
	     *         //add the watch
	     *         watch:_watch,
	     *         //add the unwatch function
	     *         unwatch:_unwatch
	     *     }
	     * })
	     *
	     * ```
	     *
	     * Now lets use the mixin
	     *
	     * ```
	     * var WatchDog = declare([Dog, WatchMixin]);
	     *
	     * var watchDog = new WatchDog();
	     * //create our handler
	     * function watch(id, oldVal, newVal) {
	     *     console.log("watchdog's %s was %s, now %s", id, oldVal, newVal);
	     * }
	     *
	     * //watch for property changes
	     * watchDog.watch("type", watch);
	     * watchDog.watch("color", watch);
	     * watchDog.watch("sound", watch);
	     *
	     * //now set the properties each handler will be called
	     * watchDog.set("type", "newDog");
	     * watchDog.set("color", "newColor");
	     * watchDog.set("sound", "newSound");
	     *
	     *
	     * //unwatch the property changes
	     * watchDog.unwatch("type", watch);
	     * watchDog.unwatch("color", watch);
	     * watchDog.unwatch("sound", watch);
	     *
	     * //no handlers will be called this time
	     * watchDog.set("type", "newDog");
	     * watchDog.set("color", "newColor");
	     * watchDog.set("sound", "newSound");
	     *
	     *
	     * ```
	     *
	     * ###Accessing static methods and properties witin an instance.
	     *
	     * To access static properties on an instance use the `_static` property which is a reference to your constructor.
	     *
	     * For example if your in your constructor and you want to have configurable default values.
	     *
	     * ```
	     * consturctor : function constructor(opts){
	     *     this.opts = opts || {};
	     *     this._type = opts.type || this._static.DEFAULT_TYPE;
	     * }
	     * ```
	     *
	     *
	     *
	     * ###Creating a new instance of within an instance.
	     *
	     * Often times you want to create a new instance of an object within an instance. If your subclassed however you cannot return a new instance of the parent class as it will not be the right sub class. `declare` provides a way around this by setting the `_static` property on each isntance of the class.
	     *
	     * Lets add a reproduce method `Mammal`
	     *
	     * ```
	     * reproduce : function(options){
	     *     return new this._static(options);
	     * }
	     * ```
	     *
	     * Now in each subclass you can call reproduce and get the proper type.
	     *
	     * ```
	     * var myDog = new Dog();
	     * var myDogsChild = myDog.reproduce();
	     *
	     * myDogsChild instanceof Dog; //true
	     * ```
	     *
	     * ###Using the `as`
	     *
	     * `declare` also provides an `as` method which allows you to add your class to an object or if your using node.js you can pass in `module` and the class will be exported as the module.
	     *
	     * ```
	     * var animals = {};
	     *
	     * Mammal.as(animals, "Dog");
	     * Wolf.as(animals, "Wolf");
	     * Dog.as(animals, "Dog");
	     * Breed.as(animals, "Breed");
	     *
	     * var myDog = new animals.Dog();
	     *
	     * ```
	     *
	     * Or in node
	     *
	     * ```
	     * Mammal.as(exports, "Dog");
	     * Wolf.as(exports, "Wolf");
	     * Dog.as(exports, "Dog");
	     * Breed.as(exports, "Breed");
	     *
	     * ```
	     *
	     * To export a class as the `module` in node
	     *
	     * ```
	     * Mammal.as(module);
	     * ```
	     *
	     *
	     */
	    function createDeclared() {
	        var arraySlice = Array.prototype.slice, classCounter = 0, Base, forceNew = new Function();

	        var SUPER_REGEXP = /(super)/g;

	        function argsToArray(args, slice) {
	            slice = slice || 0;
	            return arraySlice.call(args, slice);
	        }

	        function isArray(obj) {
	            return Object.prototype.toString.call(obj) === "[object Array]";
	        }

	        function isObject(obj) {
	            var undef;
	            return obj !== null && obj !== undef && typeof obj === "object";
	        }

	        function isHash(obj) {
	            var ret = isObject(obj);
	            return ret && obj.constructor === Object;
	        }

	        var isArguments = function _isArguments(object) {
	            return Object.prototype.toString.call(object) === '[object Arguments]';
	        };

	        if (!isArguments(arguments)) {
	            isArguments = function _isArguments(obj) {
	                return !!(obj && obj.hasOwnProperty("callee"));
	            };
	        }

	        function indexOf(arr, item) {
	            if (arr && arr.length) {
	                for (var i = 0, l = arr.length; i < l; i++) {
	                    if (arr[i] === item) {
	                        return i;
	                    }
	                }
	            }
	            return -1;
	        }

	        function merge(target, source, exclude) {
	            var name, s;
	            for (name in source) {
	                if (source.hasOwnProperty(name) && indexOf(exclude, name) === -1) {
	                    s = source[name];
	                    if (!(name in target) || (target[name] !== s)) {
	                        target[name] = s;
	                    }
	                }
	            }
	            return target;
	        }

	        function callSuper(args, a) {
	            var meta = this.__meta,
	                supers = meta.supers,
	                l = supers.length, superMeta = meta.superMeta, pos = superMeta.pos;
	            if (l > pos) {
	                args = !args ? [] : (!isArguments(args) && !isArray(args)) ? [args] : args;
	                var name = superMeta.name, f = superMeta.f, m;
	                do {
	                    m = supers[pos][name];
	                    if ("function" === typeof m && (m = m._f || m) !== f) {
	                        superMeta.pos = 1 + pos;
	                        return m.apply(this, args);
	                    }
	                } while (l > ++pos);
	            }

	            return null;
	        }

	        function getSuper() {
	            var meta = this.__meta,
	                supers = meta.supers,
	                l = supers.length, superMeta = meta.superMeta, pos = superMeta.pos;
	            if (l > pos) {
	                var name = superMeta.name, f = superMeta.f, m;
	                do {
	                    m = supers[pos][name];
	                    if ("function" === typeof m && (m = m._f || m) !== f) {
	                        superMeta.pos = 1 + pos;
	                        return m.bind(this);
	                    }
	                } while (l > ++pos);
	            }
	            return null;
	        }

	        function getter(name) {
	            var getters = this.__getters__;
	            if (getters.hasOwnProperty(name)) {
	                return getters[name].apply(this);
	            } else {
	                return this[name];
	            }
	        }

	        function setter(name, val) {
	            var setters = this.__setters__;
	            if (isHash(name)) {
	                for (var i in name) {
	                    var prop = name[i];
	                    if (setters.hasOwnProperty(i)) {
	                        setters[name].call(this, prop);
	                    } else {
	                        this[i] = prop;
	                    }
	                }
	            } else {
	                if (setters.hasOwnProperty(name)) {
	                    return setters[name].apply(this, argsToArray(arguments, 1));
	                } else {
	                    return this[name] = val;
	                }
	            }
	        }


	        function defaultFunction() {
	            var meta = this.__meta || {},
	                supers = meta.supers,
	                l = supers.length, superMeta = meta.superMeta, pos = superMeta.pos;
	            if (l > pos) {
	                var name = superMeta.name, f = superMeta.f, m;
	                do {
	                    m = supers[pos][name];
	                    if ("function" === typeof m && (m = m._f || m) !== f) {
	                        superMeta.pos = 1 + pos;
	                        return m.apply(this, arguments);
	                    }
	                } while (l > ++pos);
	            }
	            return null;
	        }


	        function functionWrapper(f, name) {
	            if (f.toString().match(SUPER_REGEXP)) {
	                var wrapper = function wrapper() {
	                    var ret, meta = this.__meta || {};
	                    var orig = meta.superMeta;
	                    meta.superMeta = {f: f, pos: 0, name: name};
	                    switch (arguments.length) {
	                    case 0:
	                        ret = f.call(this);
	                        break;
	                    case 1:
	                        ret = f.call(this, arguments[0]);
	                        break;
	                    case 2:
	                        ret = f.call(this, arguments[0], arguments[1]);
	                        break;

	                    case 3:
	                        ret = f.call(this, arguments[0], arguments[1], arguments[2]);
	                        break;
	                    default:
	                        ret = f.apply(this, arguments);
	                    }
	                    meta.superMeta = orig;
	                    return ret;
	                };
	                wrapper._f = f;
	                return wrapper;
	            } else {
	                f._f = f;
	                return f;
	            }
	        }

	        function defineMixinProps(child, proto) {

	            var operations = proto.setters || {}, __setters = child.__setters__, __getters = child.__getters__;
	            for (var i in operations) {
	                if (!__setters.hasOwnProperty(i)) {  //make sure that the setter isnt already there
	                    __setters[i] = operations[i];
	                }
	            }
	            operations = proto.getters || {};
	            for (i in operations) {
	                if (!__getters.hasOwnProperty(i)) {  //make sure that the setter isnt already there
	                    __getters[i] = operations[i];
	                }
	            }
	            for (var j in proto) {
	                if (j !== "getters" && j !== "setters") {
	                    var p = proto[j];
	                    if ("function" === typeof p) {
	                        if (!child.hasOwnProperty(j)) {
	                            child[j] = functionWrapper(defaultFunction, j);
	                        }
	                    } else {
	                        child[j] = p;
	                    }
	                }
	            }
	        }

	        function mixin() {
	            var args = argsToArray(arguments), l = args.length;
	            var child = this.prototype;
	            var childMeta = child.__meta, thisMeta = this.__meta, bases = child.__meta.bases, staticBases = bases.slice(),
	                staticSupers = thisMeta.supers || [], supers = childMeta.supers || [];
	            for (var i = 0; i < l; i++) {
	                var m = args[i], mProto = m.prototype;
	                var protoMeta = mProto.__meta, meta = m.__meta;
	                !protoMeta && (protoMeta = (mProto.__meta = {proto: mProto || {}}));
	                !meta && (meta = (m.__meta = {proto: m.__proto__ || {}}));
	                defineMixinProps(child, protoMeta.proto || {});
	                defineMixinProps(this, meta.proto || {});
	                //copy the bases for static,

	                mixinSupers(m.prototype, supers, bases);
	                mixinSupers(m, staticSupers, staticBases);
	            }
	            return this;
	        }

	        function mixinSupers(sup, arr, bases) {
	            var meta = sup.__meta;
	            !meta && (meta = (sup.__meta = {}));
	            var unique = sup.__meta.unique;
	            !unique && (meta.unique = "declare" + ++classCounter);
	            //check it we already have this super mixed into our prototype chain
	            //if true then we have already looped their supers!
	            if (indexOf(bases, unique) === -1) {
	                //add their id to our bases
	                bases.push(unique);
	                var supers = sup.__meta.supers || [], i = supers.length - 1 || 0;
	                while (i >= 0) {
	                    mixinSupers(supers[i--], arr, bases);
	                }
	                arr.unshift(sup);
	            }
	        }

	        function defineProps(child, proto) {
	            var operations = proto.setters,
	                __setters = child.__setters__,
	                __getters = child.__getters__;
	            if (operations) {
	                for (var i in operations) {
	                    __setters[i] = operations[i];
	                }
	            }
	            operations = proto.getters || {};
	            if (operations) {
	                for (i in operations) {
	                    __getters[i] = operations[i];
	                }
	            }
	            for (i in proto) {
	                if (i != "getters" && i != "setters") {
	                    var f = proto[i];
	                    if ("function" === typeof f) {
	                        var meta = f.__meta || {};
	                        if (!meta.isConstructor) {
	                            child[i] = functionWrapper(f, i);
	                        } else {
	                            child[i] = f;
	                        }
	                    } else {
	                        child[i] = f;
	                    }
	                }
	            }

	        }

	        function _export(obj, name) {
	            if (obj && name) {
	                obj[name] = this;
	            } else {
	                obj.exports = obj = this;
	            }
	            return this;
	        }

	        function extend(proto) {
	            return declare(this, proto);
	        }

	        function getNew(ctor) {
	            // create object with correct prototype using a do-nothing
	            // constructor
	            forceNew.prototype = ctor.prototype;
	            var t = new forceNew();
	            forceNew.prototype = null;	// clean up
	            return t;
	        }


	        function __declare(child, sup, proto) {
	            var childProto = {}, supers = [];
	            var unique = "declare" + ++classCounter, bases = [], staticBases = [];
	            var instanceSupers = [], staticSupers = [];
	            var meta = {
	                supers: instanceSupers,
	                unique: unique,
	                bases: bases,
	                superMeta: {
	                    f: null,
	                    pos: 0,
	                    name: null
	                }
	            };
	            var childMeta = {
	                supers: staticSupers,
	                unique: unique,
	                bases: staticBases,
	                isConstructor: true,
	                superMeta: {
	                    f: null,
	                    pos: 0,
	                    name: null
	                }
	            };

	            if (isHash(sup) && !proto) {
	                proto = sup;
	                sup = Base;
	            }

	            if ("function" === typeof sup || isArray(sup)) {
	                supers = isArray(sup) ? sup : [sup];
	                sup = supers.shift();
	                child.__meta = childMeta;
	                childProto = getNew(sup);
	                childProto.__meta = meta;
	                childProto.__getters__ = merge({}, childProto.__getters__ || {});
	                childProto.__setters__ = merge({}, childProto.__setters__ || {});
	                child.__getters__ = merge({}, child.__getters__ || {});
	                child.__setters__ = merge({}, child.__setters__ || {});
	                mixinSupers(sup.prototype, instanceSupers, bases);
	                mixinSupers(sup, staticSupers, staticBases);
	            } else {
	                child.__meta = childMeta;
	                childProto.__meta = meta;
	                childProto.__getters__ = childProto.__getters__ || {};
	                childProto.__setters__ = childProto.__setters__ || {};
	                child.__getters__ = child.__getters__ || {};
	                child.__setters__ = child.__setters__ || {};
	            }
	            child.prototype = childProto;
	            if (proto) {
	                var instance = meta.proto = proto.instance || {};
	                var stat = childMeta.proto = proto.static || {};
	                stat.init = stat.init || defaultFunction;
	                defineProps(childProto, instance);
	                defineProps(child, stat);
	                if (!instance.hasOwnProperty("constructor")) {
	                    childProto.constructor = instance.constructor = functionWrapper(defaultFunction, "constructor");
	                } else {
	                    childProto.constructor = functionWrapper(instance.constructor, "constructor");
	                }
	            } else {
	                meta.proto = {};
	                childMeta.proto = {};
	                child.init = functionWrapper(defaultFunction, "init");
	                childProto.constructor = functionWrapper(defaultFunction, "constructor");
	            }
	            if (supers.length) {
	                mixin.apply(child, supers);
	            }
	            if (sup) {
	                //do this so we mixin our super methods directly but do not ov
	                merge(child, merge(merge({}, sup), child));
	            }
	            childProto._super = child._super = callSuper;
	            childProto._getSuper = child._getSuper = getSuper;
	            childProto._static = child;
	        }

	        function declare(sup, proto) {
	            function declared() {
	                switch (arguments.length) {
	                case 0:
	                    this.constructor.call(this);
	                    break;
	                case 1:
	                    this.constructor.call(this, arguments[0]);
	                    break;
	                case 2:
	                    this.constructor.call(this, arguments[0], arguments[1]);
	                    break;
	                case 3:
	                    this.constructor.call(this, arguments[0], arguments[1], arguments[2]);
	                    break;
	                default:
	                    this.constructor.apply(this, arguments);
	                }
	            }

	            __declare(declared, sup, proto);
	            return declared.init() || declared;
	        }

	        function singleton(sup, proto) {
	            var retInstance;

	            function declaredSingleton() {
	                if (!retInstance) {
	                    this.constructor.apply(this, arguments);
	                    retInstance = this;
	                }
	                return retInstance;
	            }

	            __declare(declaredSingleton, sup, proto);
	            return  declaredSingleton.init() || declaredSingleton;
	        }

	        Base = declare({
	            instance: {
	                "get": getter,
	                "set": setter
	            },

	            "static": {
	                "get": getter,
	                "set": setter,
	                mixin: mixin,
	                extend: extend,
	                as: _export
	            }
	        });

	        declare.singleton = singleton;
	        return declare;
	    }

	    if (true) {
	        if ("undefined" !== typeof module && module.exports) {
	            module.exports = createDeclared();
	        }
	    } else if ("function" === typeof define && define.amd) {
	        define(createDeclared);
	    } else {
	        this.declare = createDeclared();
	    }
	}());





/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {(function () {
	    "use strict";

	    function defineIsa(extended) {

	        var pSlice = Array.prototype.slice;

	        var hasOwn = Object.prototype.hasOwnProperty;
	        var toStr = Object.prototype.toString;

	        function argsToArray(args, slice) {
	            var i = -1, j = 0, l = args.length, ret = [];
	            slice = slice || 0;
	            i += slice;
	            while (++i < l) {
	                ret[j++] = args[i];
	            }
	            return ret;
	        }

	        function keys(obj) {
	            var ret = [];
	            for (var i in obj) {
	                if (hasOwn.call(obj, i)) {
	                    ret.push(i);
	                }
	            }
	            return ret;
	        }

	        //taken from node js assert.js
	        //https://github.com/joyent/node/blob/master/lib/assert.js
	        function deepEqual(actual, expected) {
	            // 7.1. All identical values are equivalent, as determined by ===.
	            if (actual === expected) {
	                return true;

	            } else if (typeof Buffer !== "undefined" && Buffer.isBuffer(actual) && Buffer.isBuffer(expected)) {
	                if (actual.length !== expected.length) {
	                    return false;
	                }
	                for (var i = 0; i < actual.length; i++) {
	                    if (actual[i] !== expected[i]) {
	                        return false;
	                    }
	                }
	                return true;

	                // 7.2. If the expected value is a Date object, the actual value is
	                // equivalent if it is also a Date object that refers to the same time.
	            } else if (isDate(actual) && isDate(expected)) {
	                return actual.getTime() === expected.getTime();

	                // 7.3 If the expected value is a RegExp object, the actual value is
	                // equivalent if it is also a RegExp object with the same source and
	                // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
	            } else if (isRegExp(actual) && isRegExp(expected)) {
	                return actual.source === expected.source &&
	                    actual.global === expected.global &&
	                    actual.multiline === expected.multiline &&
	                    actual.lastIndex === expected.lastIndex &&
	                    actual.ignoreCase === expected.ignoreCase;

	                // 7.4. Other pairs that do not both pass typeof value == 'object',
	                // equivalence is determined by ==.
	            } else if (isString(actual) && isString(expected) && actual !== expected) {
	                return false;
	            } else if (typeof actual !== 'object' && typeof expected !== 'object') {
	                return actual === expected;

	                // 7.5 For all other Object pairs, including Array objects, equivalence is
	                // determined by having the same number of owned properties (as verified
	                // with Object.prototype.hasOwnProperty.call), the same set of keys
	                // (although not necessarily the same order), equivalent values for every
	                // corresponding key, and an identical 'prototype' property. Note: this
	                // accounts for both named and indexed properties on Arrays.
	            } else {
	                return objEquiv(actual, expected);
	            }
	        }


	        function objEquiv(a, b) {
	            var key;
	            if (isUndefinedOrNull(a) || isUndefinedOrNull(b)) {
	                return false;
	            }
	            // an identical 'prototype' property.
	            if (a.prototype !== b.prototype) {
	                return false;
	            }
	            //~~~I've managed to break Object.keys through screwy arguments passing.
	            //   Converting to array solves the problem.
	            if (isArguments(a)) {
	                if (!isArguments(b)) {
	                    return false;
	                }
	                a = pSlice.call(a);
	                b = pSlice.call(b);
	                return deepEqual(a, b);
	            }
	            try {
	                var ka = keys(a),
	                    kb = keys(b),
	                    i;
	                // having the same number of owned properties (keys incorporates
	                // hasOwnProperty)
	                if (ka.length !== kb.length) {
	                    return false;
	                }
	                //the same set of keys (although not necessarily the same order),
	                ka.sort();
	                kb.sort();
	                //~~~cheap key test
	                for (i = ka.length - 1; i >= 0; i--) {
	                    if (ka[i] !== kb[i]) {
	                        return false;
	                    }
	                }
	                //equivalent values for every corresponding key, and
	                //~~~possibly expensive deep test
	                for (i = ka.length - 1; i >= 0; i--) {
	                    key = ka[i];
	                    if (!deepEqual(a[key], b[key])) {
	                        return false;
	                    }
	                }
	            } catch (e) {//happens when one is a string literal and the other isn't
	                return false;
	            }
	            return true;
	        }


	        var isFunction = function (obj) {
	            return toStr.call(obj) === '[object Function]';
	        };

	        //ie hack
	        if ("undefined" !== typeof window && !isFunction(window.alert)) {
	            (function (alert) {
	                isFunction = function (obj) {
	                    return toStr.call(obj) === '[object Function]' || obj === alert;
	                };
	            }(window.alert));
	        }

	        function isObject(obj) {
	            var undef;
	            return obj !== null && typeof obj === "object";
	        }

	        function isHash(obj) {
	            var ret = isObject(obj);
	            return ret && obj.constructor === Object && !obj.nodeType && !obj.setInterval;
	        }

	        function isEmpty(object) {
	            if (isArguments(object)) {
	                return object.length === 0;
	            } else if (isObject(object)) {
	                return keys(object).length === 0;
	            } else if (isString(object) || isArray(object)) {
	                return object.length === 0;
	            }
	            return true;
	        }

	        function isBoolean(obj) {
	            return obj === true || obj === false || toStr.call(obj) === "[object Boolean]";
	        }

	        function isUndefined(obj) {
	            return typeof obj === 'undefined';
	        }

	        function isDefined(obj) {
	            return !isUndefined(obj);
	        }

	        function isUndefinedOrNull(obj) {
	            return isUndefined(obj) || isNull(obj);
	        }

	        function isNull(obj) {
	            return obj === null;
	        }


	        var isArguments = function _isArguments(object) {
	            return toStr.call(object) === '[object Arguments]';
	        };

	        if (!isArguments(arguments)) {
	            isArguments = function _isArguments(obj) {
	                return !!(obj && hasOwn.call(obj, "callee"));
	            };
	        }


	        function isInstanceOf(obj, clazz) {
	            if (isFunction(clazz)) {
	                return obj instanceof clazz;
	            } else {
	                return false;
	            }
	        }

	        function isRegExp(obj) {
	            return toStr.call(obj) === '[object RegExp]';
	        }

	        var isArray = Array.isArray || function isArray(obj) {
	            return toStr.call(obj) === "[object Array]";
	        };

	        function isDate(obj) {
	            return toStr.call(obj) === '[object Date]';
	        }

	        function isString(obj) {
	            return toStr.call(obj) === '[object String]';
	        }

	        function isNumber(obj) {
	            return toStr.call(obj) === '[object Number]';
	        }

	        function isTrue(obj) {
	            return obj === true;
	        }

	        function isFalse(obj) {
	            return obj === false;
	        }

	        function isNotNull(obj) {
	            return !isNull(obj);
	        }

	        function isEq(obj, obj2) {
	            /*jshint eqeqeq:false*/
	            return obj == obj2;
	        }

	        function isNeq(obj, obj2) {
	            /*jshint eqeqeq:false*/
	            return obj != obj2;
	        }

	        function isSeq(obj, obj2) {
	            return obj === obj2;
	        }

	        function isSneq(obj, obj2) {
	            return obj !== obj2;
	        }

	        function isIn(obj, arr) {
	            if ((isArray(arr) && Array.prototype.indexOf) || isString(arr)) {
	                return arr.indexOf(obj) > -1;
	            } else if (isArray(arr)) {
	                for (var i = 0, l = arr.length; i < l; i++) {
	                    if (isEq(obj, arr[i])) {
	                        return true;
	                    }
	                }
	            }
	            return false;
	        }

	        function isNotIn(obj, arr) {
	            return !isIn(obj, arr);
	        }

	        function isLt(obj, obj2) {
	            return obj < obj2;
	        }

	        function isLte(obj, obj2) {
	            return obj <= obj2;
	        }

	        function isGt(obj, obj2) {
	            return obj > obj2;
	        }

	        function isGte(obj, obj2) {
	            return obj >= obj2;
	        }

	        function isLike(obj, reg) {
	            if (isString(reg)) {
	                return ("" + obj).match(reg) !== null;
	            } else if (isRegExp(reg)) {
	                return reg.test(obj);
	            }
	            return false;
	        }

	        function isNotLike(obj, reg) {
	            return !isLike(obj, reg);
	        }

	        function contains(arr, obj) {
	            return isIn(obj, arr);
	        }

	        function notContains(arr, obj) {
	            return !isIn(obj, arr);
	        }

	        function containsAt(arr, obj, index) {
	            if (isArray(arr) && arr.length > index) {
	                return isEq(arr[index], obj);
	            }
	            return false;
	        }

	        function notContainsAt(arr, obj, index) {
	            if (isArray(arr)) {
	                return !isEq(arr[index], obj);
	            }
	            return false;
	        }

	        function has(obj, prop) {
	            return hasOwn.call(obj, prop);
	        }

	        function notHas(obj, prop) {
	            return !has(obj, prop);
	        }

	        function length(obj, l) {
	            if (has(obj, "length")) {
	                return obj.length === l;
	            }
	            return false;
	        }

	        function notLength(obj, l) {
	            if (has(obj, "length")) {
	                return obj.length !== l;
	            }
	            return false;
	        }

	        var isa = {
	            isFunction: isFunction,
	            isObject: isObject,
	            isEmpty: isEmpty,
	            isHash: isHash,
	            isNumber: isNumber,
	            isString: isString,
	            isDate: isDate,
	            isArray: isArray,
	            isBoolean: isBoolean,
	            isUndefined: isUndefined,
	            isDefined: isDefined,
	            isUndefinedOrNull: isUndefinedOrNull,
	            isNull: isNull,
	            isArguments: isArguments,
	            instanceOf: isInstanceOf,
	            isRegExp: isRegExp,
	            deepEqual: deepEqual,
	            isTrue: isTrue,
	            isFalse: isFalse,
	            isNotNull: isNotNull,
	            isEq: isEq,
	            isNeq: isNeq,
	            isSeq: isSeq,
	            isSneq: isSneq,
	            isIn: isIn,
	            isNotIn: isNotIn,
	            isLt: isLt,
	            isLte: isLte,
	            isGt: isGt,
	            isGte: isGte,
	            isLike: isLike,
	            isNotLike: isNotLike,
	            contains: contains,
	            notContains: notContains,
	            has: has,
	            notHas: notHas,
	            isLength: length,
	            isNotLength: notLength,
	            containsAt: containsAt,
	            notContainsAt: notContainsAt
	        };

	        var tester = {
	            constructor: function () {
	                this._testers = [];
	            },

	            noWrap: {
	                tester: function () {
	                    var testers = this._testers;
	                    return function tester(value) {
	                        var isa = false;
	                        for (var i = 0, l = testers.length; i < l && !isa; i++) {
	                            isa = testers[i](value);
	                        }
	                        return isa;
	                    };
	                }
	            }
	        };

	        var switcher = {
	            constructor: function () {
	                this._cases = [];
	                this.__default = null;
	            },

	            def: function (val, fn) {
	                this.__default = fn;
	            },

	            noWrap: {
	                switcher: function () {
	                    var testers = this._cases, __default = this.__default;
	                    return function tester() {
	                        var handled = false, args = argsToArray(arguments), caseRet;
	                        for (var i = 0, l = testers.length; i < l && !handled; i++) {
	                            caseRet = testers[i](args);
	                            if (caseRet.length > 1) {
	                                if (caseRet[1] || caseRet[0]) {
	                                    return caseRet[1];
	                                }
	                            }
	                        }
	                        if (!handled && __default) {
	                            return  __default.apply(this, args);
	                        }
	                    };
	                }
	            }
	        };

	        function addToTester(func) {
	            tester[func] = function isaTester() {
	                this._testers.push(isa[func]);
	            };
	        }

	        function addToSwitcher(func) {
	            switcher[func] = function isaTester() {
	                var args = argsToArray(arguments, 1), isFunc = isa[func], handler, doBreak = true;
	                if (args.length <= isFunc.length - 1) {
	                    throw new TypeError("A handler must be defined when calling using switch");
	                } else {
	                    handler = args.pop();
	                    if (isBoolean(handler)) {
	                        doBreak = handler;
	                        handler = args.pop();
	                    }
	                }
	                if (!isFunction(handler)) {
	                    throw new TypeError("handler must be defined");
	                }
	                this._cases.push(function (testArgs) {
	                    if (isFunc.apply(isa, testArgs.concat(args))) {
	                        return [doBreak, handler.apply(this, testArgs)];
	                    }
	                    return [false];
	                });
	            };
	        }

	        for (var i in isa) {
	            if (hasOwn.call(isa, i)) {
	                addToSwitcher(i);
	                addToTester(i);
	            }
	        }

	        var is = extended.define(isa).expose(isa);
	        is.tester = extended.define(tester);
	        is.switcher = extended.define(switcher);
	        return is;

	    }

	    if (true) {
	        if ("undefined" !== typeof module && module.exports) {
	            module.exports = defineIsa(__webpack_require__(7));

	        }
	    } else if ("function" === typeof define && define.amd) {
	        define(["extended"], function (extended) {
	            return defineIsa(extended);
	        });
	    } else {
	        this.isExtended = defineIsa(this.extended);
	    }

	}).call(this);


	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13).Buffer))

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer, global) {/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	/* eslint-disable no-proto */

	'use strict'

	var base64 = __webpack_require__(14)
	var ieee754 = __webpack_require__(15)
	var isArray = __webpack_require__(16)

	exports.Buffer = Buffer
	exports.SlowBuffer = SlowBuffer
	exports.INSPECT_MAX_BYTES = 50
	Buffer.poolSize = 8192 // not used by this implementation

	var rootParent = {}

	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Due to various browser bugs, sometimes the Object implementation will be used even
	 * when the browser supports typed arrays.
	 *
	 * Note:
	 *
	 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
	 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *   - Safari 5-7 lacks support for changing the `Object.prototype.constructor` property
	 *     on objects.
	 *
	 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *     incorrect length in some situations.

	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
	 * get the Object implementation, which is slower but behaves correctly.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
	  ? global.TYPED_ARRAY_SUPPORT
	  : typedArraySupport()

	function typedArraySupport () {
	  function Bar () {}
	  try {
	    var arr = new Uint8Array(1)
	    arr.foo = function () { return 42 }
	    arr.constructor = Bar
	    return arr.foo() === 42 && // typed array instances can be augmented
	        arr.constructor === Bar && // constructor can be set
	        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
	        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
	  } catch (e) {
	    return false
	  }
	}

	function kMaxLength () {
	  return Buffer.TYPED_ARRAY_SUPPORT
	    ? 0x7fffffff
	    : 0x3fffffff
	}

	/**
	 * Class: Buffer
	 * =============
	 *
	 * The Buffer constructor returns instances of `Uint8Array` that are augmented
	 * with function properties for all the node `Buffer` API functions. We use
	 * `Uint8Array` so that square bracket notation works as expected -- it returns
	 * a single octet.
	 *
	 * By augmenting the instances, we can avoid modifying the `Uint8Array`
	 * prototype.
	 */
	function Buffer (arg) {
	  if (!(this instanceof Buffer)) {
	    // Avoid going through an ArgumentsAdaptorTrampoline in the common case.
	    if (arguments.length > 1) return new Buffer(arg, arguments[1])
	    return new Buffer(arg)
	  }

	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    this.length = 0
	    this.parent = undefined
	  }

	  // Common case.
	  if (typeof arg === 'number') {
	    return fromNumber(this, arg)
	  }

	  // Slightly less common case.
	  if (typeof arg === 'string') {
	    return fromString(this, arg, arguments.length > 1 ? arguments[1] : 'utf8')
	  }

	  // Unusual.
	  return fromObject(this, arg)
	}

	function fromNumber (that, length) {
	  that = allocate(that, length < 0 ? 0 : checked(length) | 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < length; i++) {
	      that[i] = 0
	    }
	  }
	  return that
	}

	function fromString (that, string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') encoding = 'utf8'

	  // Assumption: byteLength() return value is always < kMaxLength.
	  var length = byteLength(string, encoding) | 0
	  that = allocate(that, length)

	  that.write(string, encoding)
	  return that
	}

	function fromObject (that, object) {
	  if (Buffer.isBuffer(object)) return fromBuffer(that, object)

	  if (isArray(object)) return fromArray(that, object)

	  if (object == null) {
	    throw new TypeError('must start with number, buffer, array or string')
	  }

	  if (typeof ArrayBuffer !== 'undefined') {
	    if (object.buffer instanceof ArrayBuffer) {
	      return fromTypedArray(that, object)
	    }
	    if (object instanceof ArrayBuffer) {
	      return fromArrayBuffer(that, object)
	    }
	  }

	  if (object.length) return fromArrayLike(that, object)

	  return fromJsonObject(that, object)
	}

	function fromBuffer (that, buffer) {
	  var length = checked(buffer.length) | 0
	  that = allocate(that, length)
	  buffer.copy(that, 0, 0, length)
	  return that
	}

	function fromArray (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	// Duplicate of fromArray() to keep fromArray() monomorphic.
	function fromTypedArray (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  // Truncating the elements is probably not what people expect from typed
	  // arrays with BYTES_PER_ELEMENT > 1 but it's compatible with the behavior
	  // of the old Buffer constructor.
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	function fromArrayBuffer (that, array) {
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    array.byteLength
	    that = Buffer._augment(new Uint8Array(array))
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that = fromTypedArray(that, new Uint8Array(array))
	  }
	  return that
	}

	function fromArrayLike (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	// Deserialize { type: 'Buffer', data: [1,2,3,...] } into a Buffer object.
	// Returns a zero-length buffer for inputs that don't conform to the spec.
	function fromJsonObject (that, object) {
	  var array
	  var length = 0

	  if (object.type === 'Buffer' && isArray(object.data)) {
	    array = object.data
	    length = checked(array.length) | 0
	  }
	  that = allocate(that, length)

	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	if (Buffer.TYPED_ARRAY_SUPPORT) {
	  Buffer.prototype.__proto__ = Uint8Array.prototype
	  Buffer.__proto__ = Uint8Array
	} else {
	  // pre-set for values that may exist in the future
	  Buffer.prototype.length = undefined
	  Buffer.prototype.parent = undefined
	}

	function allocate (that, length) {
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = Buffer._augment(new Uint8Array(length))
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that.length = length
	    that._isBuffer = true
	  }

	  var fromPool = length !== 0 && length <= Buffer.poolSize >>> 1
	  if (fromPool) that.parent = rootParent

	  return that
	}

	function checked (length) {
	  // Note: cannot use `length < kMaxLength` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= kMaxLength()) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
	                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
	  }
	  return length | 0
	}

	function SlowBuffer (subject, encoding) {
	  if (!(this instanceof SlowBuffer)) return new SlowBuffer(subject, encoding)

	  var buf = new Buffer(subject, encoding)
	  delete buf.parent
	  return buf
	}

	Buffer.isBuffer = function isBuffer (b) {
	  return !!(b != null && b._isBuffer)
	}

	Buffer.compare = function compare (a, b) {
	  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
	    throw new TypeError('Arguments must be Buffers')
	  }

	  if (a === b) return 0

	  var x = a.length
	  var y = b.length

	  var i = 0
	  var len = Math.min(x, y)
	  while (i < len) {
	    if (a[i] !== b[i]) break

	    ++i
	  }

	  if (i !== len) {
	    x = a[i]
	    y = b[i]
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}

	Buffer.isEncoding = function isEncoding (encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'binary':
	    case 'base64':
	    case 'raw':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true
	    default:
	      return false
	  }
	}

	Buffer.concat = function concat (list, length) {
	  if (!isArray(list)) throw new TypeError('list argument must be an Array of Buffers.')

	  if (list.length === 0) {
	    return new Buffer(0)
	  }

	  var i
	  if (length === undefined) {
	    length = 0
	    for (i = 0; i < list.length; i++) {
	      length += list[i].length
	    }
	  }

	  var buf = new Buffer(length)
	  var pos = 0
	  for (i = 0; i < list.length; i++) {
	    var item = list[i]
	    item.copy(buf, pos)
	    pos += item.length
	  }
	  return buf
	}

	function byteLength (string, encoding) {
	  if (typeof string !== 'string') string = '' + string

	  var len = string.length
	  if (len === 0) return 0

	  // Use a for loop to avoid recursion
	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'ascii':
	      case 'binary':
	      // Deprecated
	      case 'raw':
	      case 'raws':
	        return len
	      case 'utf8':
	      case 'utf-8':
	        return utf8ToBytes(string).length
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return len * 2
	      case 'hex':
	        return len >>> 1
	      case 'base64':
	        return base64ToBytes(string).length
	      default:
	        if (loweredCase) return utf8ToBytes(string).length // assume utf8
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	Buffer.byteLength = byteLength

	function slowToString (encoding, start, end) {
	  var loweredCase = false

	  start = start | 0
	  end = end === undefined || end === Infinity ? this.length : end | 0

	  if (!encoding) encoding = 'utf8'
	  if (start < 0) start = 0
	  if (end > this.length) end = this.length
	  if (end <= start) return ''

	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)

	      case 'ascii':
	        return asciiSlice(this, start, end)

	      case 'binary':
	        return binarySlice(this, start, end)

	      case 'base64':
	        return base64Slice(this, start, end)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = (encoding + '').toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	Buffer.prototype.toString = function toString () {
	  var length = this.length | 0
	  if (length === 0) return ''
	  if (arguments.length === 0) return utf8Slice(this, 0, length)
	  return slowToString.apply(this, arguments)
	}

	Buffer.prototype.equals = function equals (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return true
	  return Buffer.compare(this, b) === 0
	}

	Buffer.prototype.inspect = function inspect () {
	  var str = ''
	  var max = exports.INSPECT_MAX_BYTES
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
	    if (this.length > max) str += ' ... '
	  }
	  return '<Buffer ' + str + '>'
	}

	Buffer.prototype.compare = function compare (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return 0
	  return Buffer.compare(this, b)
	}

	Buffer.prototype.indexOf = function indexOf (val, byteOffset) {
	  if (byteOffset > 0x7fffffff) byteOffset = 0x7fffffff
	  else if (byteOffset < -0x80000000) byteOffset = -0x80000000
	  byteOffset >>= 0

	  if (this.length === 0) return -1
	  if (byteOffset >= this.length) return -1

	  // Negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = Math.max(this.length + byteOffset, 0)

	  if (typeof val === 'string') {
	    if (val.length === 0) return -1 // special case: looking for empty string always fails
	    return String.prototype.indexOf.call(this, val, byteOffset)
	  }
	  if (Buffer.isBuffer(val)) {
	    return arrayIndexOf(this, val, byteOffset)
	  }
	  if (typeof val === 'number') {
	    if (Buffer.TYPED_ARRAY_SUPPORT && Uint8Array.prototype.indexOf === 'function') {
	      return Uint8Array.prototype.indexOf.call(this, val, byteOffset)
	    }
	    return arrayIndexOf(this, [ val ], byteOffset)
	  }

	  function arrayIndexOf (arr, val, byteOffset) {
	    var foundIndex = -1
	    for (var i = 0; byteOffset + i < arr.length; i++) {
	      if (arr[byteOffset + i] === val[foundIndex === -1 ? 0 : i - foundIndex]) {
	        if (foundIndex === -1) foundIndex = i
	        if (i - foundIndex + 1 === val.length) return byteOffset + foundIndex
	      } else {
	        foundIndex = -1
	      }
	    }
	    return -1
	  }

	  throw new TypeError('val must be string, number or Buffer')
	}

	// `get` is deprecated
	Buffer.prototype.get = function get (offset) {
	  console.log('.get() is deprecated. Access using array indexes instead.')
	  return this.readUInt8(offset)
	}

	// `set` is deprecated
	Buffer.prototype.set = function set (v, offset) {
	  console.log('.set() is deprecated. Access using array indexes instead.')
	  return this.writeUInt8(v, offset)
	}

	function hexWrite (buf, string, offset, length) {
	  offset = Number(offset) || 0
	  var remaining = buf.length - offset
	  if (!length) {
	    length = remaining
	  } else {
	    length = Number(length)
	    if (length > remaining) {
	      length = remaining
	    }
	  }

	  // must be an even number of digits
	  var strLen = string.length
	  if (strLen % 2 !== 0) throw new Error('Invalid hex string')

	  if (length > strLen / 2) {
	    length = strLen / 2
	  }
	  for (var i = 0; i < length; i++) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16)
	    if (isNaN(parsed)) throw new Error('Invalid hex string')
	    buf[offset + i] = parsed
	  }
	  return i
	}

	function utf8Write (buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
	}

	function asciiWrite (buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length)
	}

	function binaryWrite (buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length)
	}

	function base64Write (buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length)
	}

	function ucs2Write (buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
	}

	Buffer.prototype.write = function write (string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8'
	    length = this.length
	    offset = 0
	  // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	    encoding = offset
	    length = this.length
	    offset = 0
	  // Buffer#write(string, offset[, length][, encoding])
	  } else if (isFinite(offset)) {
	    offset = offset | 0
	    if (isFinite(length)) {
	      length = length | 0
	      if (encoding === undefined) encoding = 'utf8'
	    } else {
	      encoding = length
	      length = undefined
	    }
	  // legacy write(string, encoding, offset, length) - remove in v0.13
	  } else {
	    var swap = encoding
	    encoding = offset
	    offset = length | 0
	    length = swap
	  }

	  var remaining = this.length - offset
	  if (length === undefined || length > remaining) length = remaining

	  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
	    throw new RangeError('attempt to write outside buffer bounds')
	  }

	  if (!encoding) encoding = 'utf8'

	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length)

	      case 'ascii':
	        return asciiWrite(this, string, offset, length)

	      case 'binary':
	        return binaryWrite(this, string, offset, length)

	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	Buffer.prototype.toJSON = function toJSON () {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  }
	}

	function base64Slice (buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return base64.fromByteArray(buf)
	  } else {
	    return base64.fromByteArray(buf.slice(start, end))
	  }
	}

	function utf8Slice (buf, start, end) {
	  end = Math.min(buf.length, end)
	  var res = []

	  var i = start
	  while (i < end) {
	    var firstByte = buf[i]
	    var codePoint = null
	    var bytesPerSequence = (firstByte > 0xEF) ? 4
	      : (firstByte > 0xDF) ? 3
	      : (firstByte > 0xBF) ? 2
	      : 1

	    if (i + bytesPerSequence <= end) {
	      var secondByte, thirdByte, fourthByte, tempCodePoint

	      switch (bytesPerSequence) {
	        case 1:
	          if (firstByte < 0x80) {
	            codePoint = firstByte
	          }
	          break
	        case 2:
	          secondByte = buf[i + 1]
	          if ((secondByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
	            if (tempCodePoint > 0x7F) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 3:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
	            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 4:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          fourthByte = buf[i + 3]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
	            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
	              codePoint = tempCodePoint
	            }
	          }
	      }
	    }

	    if (codePoint === null) {
	      // we did not generate a valid codePoint so insert a
	      // replacement char (U+FFFD) and advance only 1 byte
	      codePoint = 0xFFFD
	      bytesPerSequence = 1
	    } else if (codePoint > 0xFFFF) {
	      // encode to utf16 (surrogate pair dance)
	      codePoint -= 0x10000
	      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
	      codePoint = 0xDC00 | codePoint & 0x3FF
	    }

	    res.push(codePoint)
	    i += bytesPerSequence
	  }

	  return decodeCodePointsArray(res)
	}

	// Based on http://stackoverflow.com/a/22747272/680742, the browser with
	// the lowest limit is Chrome, with 0x10000 args.
	// We go 1 magnitude less, for safety
	var MAX_ARGUMENTS_LENGTH = 0x1000

	function decodeCodePointsArray (codePoints) {
	  var len = codePoints.length
	  if (len <= MAX_ARGUMENTS_LENGTH) {
	    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
	  }

	  // Decode in chunks to avoid "call stack size exceeded".
	  var res = ''
	  var i = 0
	  while (i < len) {
	    res += String.fromCharCode.apply(
	      String,
	      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
	    )
	  }
	  return res
	}

	function asciiSlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; i++) {
	    ret += String.fromCharCode(buf[i] & 0x7F)
	  }
	  return ret
	}

	function binarySlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; i++) {
	    ret += String.fromCharCode(buf[i])
	  }
	  return ret
	}

	function hexSlice (buf, start, end) {
	  var len = buf.length

	  if (!start || start < 0) start = 0
	  if (!end || end < 0 || end > len) end = len

	  var out = ''
	  for (var i = start; i < end; i++) {
	    out += toHex(buf[i])
	  }
	  return out
	}

	function utf16leSlice (buf, start, end) {
	  var bytes = buf.slice(start, end)
	  var res = ''
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
	  }
	  return res
	}

	Buffer.prototype.slice = function slice (start, end) {
	  var len = this.length
	  start = ~~start
	  end = end === undefined ? len : ~~end

	  if (start < 0) {
	    start += len
	    if (start < 0) start = 0
	  } else if (start > len) {
	    start = len
	  }

	  if (end < 0) {
	    end += len
	    if (end < 0) end = 0
	  } else if (end > len) {
	    end = len
	  }

	  if (end < start) end = start

	  var newBuf
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    newBuf = Buffer._augment(this.subarray(start, end))
	  } else {
	    var sliceLen = end - start
	    newBuf = new Buffer(sliceLen, undefined)
	    for (var i = 0; i < sliceLen; i++) {
	      newBuf[i] = this[i + start]
	    }
	  }

	  if (newBuf.length) newBuf.parent = this.parent || this

	  return newBuf
	}

	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset (offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
	}

	Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }

	  return val
	}

	Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length)
	  }

	  var val = this[offset + --byteLength]
	  var mul = 1
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul
	  }

	  return val
	}

	Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  return this[offset]
	}

	Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return this[offset] | (this[offset + 1] << 8)
	}

	Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return (this[offset] << 8) | this[offset + 1]
	}

	Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return ((this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16)) +
	      (this[offset + 3] * 0x1000000)
	}

	Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] * 0x1000000) +
	    ((this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    this[offset + 3])
	}

	Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var i = byteLength
	  var mul = 1
	  var val = this[offset + --i]
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  if (!(this[offset] & 0x80)) return (this[offset])
	  return ((0xff - this[offset] + 1) * -1)
	}

	Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset] | (this[offset + 1] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset + 1] | (this[offset] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset]) |
	    (this[offset + 1] << 8) |
	    (this[offset + 2] << 16) |
	    (this[offset + 3] << 24)
	}

	Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] << 24) |
	    (this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    (this[offset + 3])
	}

	Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, true, 23, 4)
	}

	Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, false, 23, 4)
	}

	Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, true, 52, 8)
	}

	Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, false, 52, 8)
	}

	function checkInt (buf, value, offset, ext, max, min) {
	  if (!Buffer.isBuffer(buf)) throw new TypeError('buffer must be a Buffer instance')
	  if (value > max || value < min) throw new RangeError('value is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('index out of range')
	}

	Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)

	  var mul = 1
	  var i = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)

	  var i = byteLength - 1
	  var mul = 1
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  this[offset] = (value & 0xff)
	  return offset + 1
	}

	function objectWriteUInt16 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; i++) {
	    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
	      (littleEndian ? i : 1 - i) * 8
	  }
	}

	Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	function objectWriteUInt32 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; i++) {
	    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
	  }
	}

	Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = (value >>> 24)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 1] = (value >>> 8)
	    this[offset] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = 0
	  var mul = 1
	  var sub = value < 0 ? 1 : 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = byteLength - 1
	  var mul = 1
	  var sub = value < 0 ? 1 : 0
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  if (value < 0) value = 0xff + value + 1
	  this[offset] = (value & 0xff)
	  return offset + 1
	}

	Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 3] = (value >>> 24)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (value < 0) value = 0xffffffff + value + 1
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	function checkIEEE754 (buf, value, offset, ext, max, min) {
	  if (value > max || value < min) throw new RangeError('value is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('index out of range')
	  if (offset < 0) throw new RangeError('index out of range')
	}

	function writeFloat (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 23, 4)
	  return offset + 4
	}

	Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert)
	}

	function writeDouble (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 52, 8)
	  return offset + 8
	}

	Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert)
	}

	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function copy (target, targetStart, start, end) {
	  if (!start) start = 0
	  if (!end && end !== 0) end = this.length
	  if (targetStart >= target.length) targetStart = target.length
	  if (!targetStart) targetStart = 0
	  if (end > 0 && end < start) end = start

	  // Copy 0 bytes; we're done
	  if (end === start) return 0
	  if (target.length === 0 || this.length === 0) return 0

	  // Fatal error conditions
	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds')
	  }
	  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
	  if (end < 0) throw new RangeError('sourceEnd out of bounds')

	  // Are we oob?
	  if (end > this.length) end = this.length
	  if (target.length - targetStart < end - start) {
	    end = target.length - targetStart + start
	  }

	  var len = end - start
	  var i

	  if (this === target && start < targetStart && targetStart < end) {
	    // descending copy from end
	    for (i = len - 1; i >= 0; i--) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    // ascending copy from start
	    for (i = 0; i < len; i++) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else {
	    target._set(this.subarray(start, start + len), targetStart)
	  }

	  return len
	}

	// fill(value, start=0, end=buffer.length)
	Buffer.prototype.fill = function fill (value, start, end) {
	  if (!value) value = 0
	  if (!start) start = 0
	  if (!end) end = this.length

	  if (end < start) throw new RangeError('end < start')

	  // Fill 0 bytes; we're done
	  if (end === start) return
	  if (this.length === 0) return

	  if (start < 0 || start >= this.length) throw new RangeError('start out of bounds')
	  if (end < 0 || end > this.length) throw new RangeError('end out of bounds')

	  var i
	  if (typeof value === 'number') {
	    for (i = start; i < end; i++) {
	      this[i] = value
	    }
	  } else {
	    var bytes = utf8ToBytes(value.toString())
	    var len = bytes.length
	    for (i = start; i < end; i++) {
	      this[i] = bytes[i % len]
	    }
	  }

	  return this
	}

	/**
	 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
	 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
	 */
	Buffer.prototype.toArrayBuffer = function toArrayBuffer () {
	  if (typeof Uint8Array !== 'undefined') {
	    if (Buffer.TYPED_ARRAY_SUPPORT) {
	      return (new Buffer(this)).buffer
	    } else {
	      var buf = new Uint8Array(this.length)
	      for (var i = 0, len = buf.length; i < len; i += 1) {
	        buf[i] = this[i]
	      }
	      return buf.buffer
	    }
	  } else {
	    throw new TypeError('Buffer.toArrayBuffer not supported in this browser')
	  }
	}

	// HELPER FUNCTIONS
	// ================

	var BP = Buffer.prototype

	/**
	 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
	 */
	Buffer._augment = function _augment (arr) {
	  arr.constructor = Buffer
	  arr._isBuffer = true

	  // save reference to original Uint8Array set method before overwriting
	  arr._set = arr.set

	  // deprecated
	  arr.get = BP.get
	  arr.set = BP.set

	  arr.write = BP.write
	  arr.toString = BP.toString
	  arr.toLocaleString = BP.toString
	  arr.toJSON = BP.toJSON
	  arr.equals = BP.equals
	  arr.compare = BP.compare
	  arr.indexOf = BP.indexOf
	  arr.copy = BP.copy
	  arr.slice = BP.slice
	  arr.readUIntLE = BP.readUIntLE
	  arr.readUIntBE = BP.readUIntBE
	  arr.readUInt8 = BP.readUInt8
	  arr.readUInt16LE = BP.readUInt16LE
	  arr.readUInt16BE = BP.readUInt16BE
	  arr.readUInt32LE = BP.readUInt32LE
	  arr.readUInt32BE = BP.readUInt32BE
	  arr.readIntLE = BP.readIntLE
	  arr.readIntBE = BP.readIntBE
	  arr.readInt8 = BP.readInt8
	  arr.readInt16LE = BP.readInt16LE
	  arr.readInt16BE = BP.readInt16BE
	  arr.readInt32LE = BP.readInt32LE
	  arr.readInt32BE = BP.readInt32BE
	  arr.readFloatLE = BP.readFloatLE
	  arr.readFloatBE = BP.readFloatBE
	  arr.readDoubleLE = BP.readDoubleLE
	  arr.readDoubleBE = BP.readDoubleBE
	  arr.writeUInt8 = BP.writeUInt8
	  arr.writeUIntLE = BP.writeUIntLE
	  arr.writeUIntBE = BP.writeUIntBE
	  arr.writeUInt16LE = BP.writeUInt16LE
	  arr.writeUInt16BE = BP.writeUInt16BE
	  arr.writeUInt32LE = BP.writeUInt32LE
	  arr.writeUInt32BE = BP.writeUInt32BE
	  arr.writeIntLE = BP.writeIntLE
	  arr.writeIntBE = BP.writeIntBE
	  arr.writeInt8 = BP.writeInt8
	  arr.writeInt16LE = BP.writeInt16LE
	  arr.writeInt16BE = BP.writeInt16BE
	  arr.writeInt32LE = BP.writeInt32LE
	  arr.writeInt32BE = BP.writeInt32BE
	  arr.writeFloatLE = BP.writeFloatLE
	  arr.writeFloatBE = BP.writeFloatBE
	  arr.writeDoubleLE = BP.writeDoubleLE
	  arr.writeDoubleBE = BP.writeDoubleBE
	  arr.fill = BP.fill
	  arr.inspect = BP.inspect
	  arr.toArrayBuffer = BP.toArrayBuffer

	  return arr
	}

	var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

	function base64clean (str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return ''
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '='
	  }
	  return str
	}

	function stringtrim (str) {
	  if (str.trim) return str.trim()
	  return str.replace(/^\s+|\s+$/g, '')
	}

	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}

	function utf8ToBytes (string, units) {
	  units = units || Infinity
	  var codePoint
	  var length = string.length
	  var leadSurrogate = null
	  var bytes = []

	  for (var i = 0; i < length; i++) {
	    codePoint = string.charCodeAt(i)

	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (!leadSurrogate) {
	        // no lead yet
	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        }

	        // valid lead
	        leadSurrogate = codePoint

	        continue
	      }

	      // 2 leads in a row
	      if (codePoint < 0xDC00) {
	        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	        leadSurrogate = codePoint
	        continue
	      }

	      // valid surrogate pair
	      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	    }

	    leadSurrogate = null

	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break
	      bytes.push(codePoint)
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break
	      bytes.push(
	        codePoint >> 0x6 | 0xC0,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break
	      bytes.push(
	        codePoint >> 0xC | 0xE0,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x110000) {
	      if ((units -= 4) < 0) break
	      bytes.push(
	        codePoint >> 0x12 | 0xF0,
	        codePoint >> 0xC & 0x3F | 0x80,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else {
	      throw new Error('Invalid code point')
	    }
	  }

	  return bytes
	}

	function asciiToBytes (str) {
	  var byteArray = []
	  for (var i = 0; i < str.length; i++) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF)
	  }
	  return byteArray
	}

	function utf16leToBytes (str, units) {
	  var c, hi, lo
	  var byteArray = []
	  for (var i = 0; i < str.length; i++) {
	    if ((units -= 2) < 0) break

	    c = str.charCodeAt(i)
	    hi = c >> 8
	    lo = c % 256
	    byteArray.push(lo)
	    byteArray.push(hi)
	  }

	  return byteArray
	}

	function base64ToBytes (str) {
	  return base64.toByteArray(base64clean(str))
	}

	function blitBuffer (src, dst, offset, length) {
	  for (var i = 0; i < length; i++) {
	    if ((i + offset >= dst.length) || (i >= src.length)) break
	    dst[i + offset] = src[i]
	  }
	  return i
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13).Buffer, (function() { return this; }())))

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

	;(function (exports) {
		'use strict';

	  var Arr = (typeof Uint8Array !== 'undefined')
	    ? Uint8Array
	    : Array

		var PLUS   = '+'.charCodeAt(0)
		var SLASH  = '/'.charCodeAt(0)
		var NUMBER = '0'.charCodeAt(0)
		var LOWER  = 'a'.charCodeAt(0)
		var UPPER  = 'A'.charCodeAt(0)
		var PLUS_URL_SAFE = '-'.charCodeAt(0)
		var SLASH_URL_SAFE = '_'.charCodeAt(0)

		function decode (elt) {
			var code = elt.charCodeAt(0)
			if (code === PLUS ||
			    code === PLUS_URL_SAFE)
				return 62 // '+'
			if (code === SLASH ||
			    code === SLASH_URL_SAFE)
				return 63 // '/'
			if (code < NUMBER)
				return -1 //no match
			if (code < NUMBER + 10)
				return code - NUMBER + 26 + 26
			if (code < UPPER + 26)
				return code - UPPER
			if (code < LOWER + 26)
				return code - LOWER + 26
		}

		function b64ToByteArray (b64) {
			var i, j, l, tmp, placeHolders, arr

			if (b64.length % 4 > 0) {
				throw new Error('Invalid string. Length must be a multiple of 4')
			}

			// the number of equal signs (place holders)
			// if there are two placeholders, than the two characters before it
			// represent one byte
			// if there is only one, then the three characters before it represent 2 bytes
			// this is just a cheap hack to not do indexOf twice
			var len = b64.length
			placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0

			// base64 is 4/3 + up to two characters of the original data
			arr = new Arr(b64.length * 3 / 4 - placeHolders)

			// if there are placeholders, only get up to the last complete 4 chars
			l = placeHolders > 0 ? b64.length - 4 : b64.length

			var L = 0

			function push (v) {
				arr[L++] = v
			}

			for (i = 0, j = 0; i < l; i += 4, j += 3) {
				tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
				push((tmp & 0xFF0000) >> 16)
				push((tmp & 0xFF00) >> 8)
				push(tmp & 0xFF)
			}

			if (placeHolders === 2) {
				tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
				push(tmp & 0xFF)
			} else if (placeHolders === 1) {
				tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
				push((tmp >> 8) & 0xFF)
				push(tmp & 0xFF)
			}

			return arr
		}

		function uint8ToBase64 (uint8) {
			var i,
				extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
				output = "",
				temp, length

			function encode (num) {
				return lookup.charAt(num)
			}

			function tripletToBase64 (num) {
				return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
			}

			// go through the array every three bytes, we'll deal with trailing stuff later
			for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
				temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
				output += tripletToBase64(temp)
			}

			// pad the end with zeros, but make sure to not forget the extra bytes
			switch (extraBytes) {
				case 1:
					temp = uint8[uint8.length - 1]
					output += encode(temp >> 2)
					output += encode((temp << 4) & 0x3F)
					output += '=='
					break
				case 2:
					temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
					output += encode(temp >> 10)
					output += encode((temp >> 4) & 0x3F)
					output += encode((temp << 2) & 0x3F)
					output += '='
					break
			}

			return output
		}

		exports.toByteArray = b64ToByteArray
		exports.fromByteArray = uint8ToBase64
	}( false ? (this.base64js = {}) : exports))


/***/ },
/* 15 */
/***/ function(module, exports) {

	exports.read = function (buffer, offset, isLE, mLen, nBytes) {
	  var e, m
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var nBits = -7
	  var i = isLE ? (nBytes - 1) : 0
	  var d = isLE ? -1 : 1
	  var s = buffer[offset + i]

	  i += d

	  e = s & ((1 << (-nBits)) - 1)
	  s >>= (-nBits)
	  nBits += eLen
	  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  m = e & ((1 << (-nBits)) - 1)
	  e >>= (-nBits)
	  nBits += mLen
	  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  if (e === 0) {
	    e = 1 - eBias
	  } else if (e === eMax) {
	    return m ? NaN : ((s ? -1 : 1) * Infinity)
	  } else {
	    m = m + Math.pow(2, mLen)
	    e = e - eBias
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
	}

	exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
	  var i = isLE ? 0 : (nBytes - 1)
	  var d = isLE ? 1 : -1
	  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

	  value = Math.abs(value)

	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0
	    e = eMax
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2)
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--
	      c *= 2
	    }
	    if (e + eBias >= 1) {
	      value += rt / c
	    } else {
	      value += rt * Math.pow(2, 1 - eBias)
	    }
	    if (value * c >= 2) {
	      e++
	      c /= 2
	    }

	    if (e + eBias >= eMax) {
	      m = 0
	      e = eMax
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * Math.pow(2, mLen)
	      e = e + eBias
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
	      e = 0
	    }
	  }

	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

	  e = (e << mLen) | m
	  eLen += mLen
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

	  buffer[offset + i - d] |= s * 128
	}


/***/ },
/* 16 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = Array.isArray || function (arr) {
	  return toString.call(arr) == '[object Array]';
	};


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	(function () {
	    "use strict";

	    function defineArgumentsExtended(extended, is) {

	        var pSlice = Array.prototype.slice,
	            isArguments = is.isArguments;

	        function argsToArray(args, slice) {
	            var i = -1, j = 0, l = args.length, ret = [];
	            slice = slice || 0;
	            i += slice;
	            while (++i < l) {
	                ret[j++] = args[i];
	            }
	            return ret;
	        }


	        return extended
	            .define(isArguments, {
	                toArray: argsToArray
	            })
	            .expose({
	                argsToArray: argsToArray
	            });
	    }

	    if (true) {
	        if ("undefined" !== typeof module && module.exports) {
	            module.exports = defineArgumentsExtended(__webpack_require__(7), __webpack_require__(12));

	        }
	    } else if ("function" === typeof define && define.amd) {
	        define(["extended", "is-extended"], function (extended, is) {
	            return defineArgumentsExtended(extended, is);
	        });
	    } else {
	        this.argumentsExtended = defineArgumentsExtended(this.extended, this.isExtended);
	    }

	}).call(this);



/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	(function () {
	    "use strict";

	    function defineDate(extended, is, array) {

	        function _pad(string, length, ch, end) {
	            string = "" + string; //check for numbers
	            ch = ch || " ";
	            var strLen = string.length;
	            while (strLen < length) {
	                if (end) {
	                    string += ch;
	                } else {
	                    string = ch + string;
	                }
	                strLen++;
	            }
	            return string;
	        }

	        function _truncate(string, length, end) {
	            var ret = string;
	            if (is.isString(ret)) {
	                if (string.length > length) {
	                    if (end) {
	                        var l = string.length;
	                        ret = string.substring(l - length, l);
	                    } else {
	                        ret = string.substring(0, length);
	                    }
	                }
	            } else {
	                ret = _truncate("" + ret, length);
	            }
	            return ret;
	        }

	        function every(arr, iterator, scope) {
	            if (!is.isArray(arr) || typeof iterator !== "function") {
	                throw new TypeError();
	            }
	            var t = Object(arr);
	            var len = t.length >>> 0;
	            for (var i = 0; i < len; i++) {
	                if (i in t && !iterator.call(scope, t[i], i, t)) {
	                    return false;
	                }
	            }
	            return true;
	        }


	        var transforms = (function () {
	                var floor = Math.floor, round = Math.round;

	                var addMap = {
	                    day: function addDay(date, amount) {
	                        return [amount, "Date", false];
	                    },
	                    weekday: function addWeekday(date, amount) {
	                        // Divide the increment time span into weekspans plus leftover days
	                        // e.g., 8 days is one 5-day weekspan / and two leftover days
	                        // Can't have zero leftover days, so numbers divisible by 5 get
	                        // a days value of 5, and the remaining days make up the number of weeks
	                        var days, weeks, mod = amount % 5, strt = date.getDay(), adj = 0;
	                        if (!mod) {
	                            days = (amount > 0) ? 5 : -5;
	                            weeks = (amount > 0) ? ((amount - 5) / 5) : ((amount + 5) / 5);
	                        } else {
	                            days = mod;
	                            weeks = parseInt(amount / 5, 10);
	                        }
	                        if (strt === 6 && amount > 0) {
	                            adj = 1;
	                        } else if (strt === 0 && amount < 0) {
	                            // Orig date is Sun / negative increment
	                            // Jump back over Sat
	                            adj = -1;
	                        }
	                        // Get weekday val for the new date
	                        var trgt = strt + days;
	                        // New date is on Sat or Sun
	                        if (trgt === 0 || trgt === 6) {
	                            adj = (amount > 0) ? 2 : -2;
	                        }
	                        // Increment by number of weeks plus leftover days plus
	                        // weekend adjustments
	                        return [(7 * weeks) + days + adj, "Date", false];
	                    },
	                    year: function addYear(date, amount) {
	                        return [amount, "FullYear", true];
	                    },
	                    week: function addWeek(date, amount) {
	                        return [amount * 7, "Date", false];
	                    },
	                    quarter: function addYear(date, amount) {
	                        return [amount * 3, "Month", true];
	                    },
	                    month: function addYear(date, amount) {
	                        return [amount, "Month", true];
	                    }
	                };

	                function addTransform(interval, date, amount) {
	                    interval = interval.replace(/s$/, "");
	                    if (addMap.hasOwnProperty(interval)) {
	                        return addMap[interval](date, amount);
	                    }
	                    return [amount, "UTC" + interval.charAt(0).toUpperCase() + interval.substring(1) + "s", false];
	                }


	                var differenceMap = {
	                    "quarter": function quarterDifference(date1, date2, utc) {
	                        var yearDiff = date2.getFullYear() - date1.getFullYear();
	                        var m1 = date1[utc ? "getUTCMonth" : "getMonth"]();
	                        var m2 = date2[utc ? "getUTCMonth" : "getMonth"]();
	                        // Figure out which quarter the months are in
	                        var q1 = floor(m1 / 3) + 1;
	                        var q2 = floor(m2 / 3) + 1;
	                        // Add quarters for any year difference between the dates
	                        q2 += (yearDiff * 4);
	                        return q2 - q1;
	                    },

	                    "weekday": function weekdayDifference(date1, date2, utc) {
	                        var days = differenceTransform("day", date1, date2, utc), weeks;
	                        var mod = days % 7;
	                        // Even number of weeks
	                        if (mod === 0) {
	                            days = differenceTransform("week", date1, date2, utc) * 5;
	                        } else {
	                            // Weeks plus spare change (< 7 days)
	                            var adj = 0, aDay = date1[utc ? "getUTCDay" : "getDay"](), bDay = date2[utc ? "getUTCDay" : "getDay"]();
	                            weeks = parseInt(days / 7, 10);
	                            // Mark the date advanced by the number of
	                            // round weeks (may be zero)
	                            var dtMark = new Date(+date1);
	                            dtMark.setDate(dtMark[utc ? "getUTCDate" : "getDate"]() + (weeks * 7));
	                            var dayMark = dtMark[utc ? "getUTCDay" : "getDay"]();

	                            // Spare change days -- 6 or less
	                            if (days > 0) {
	                                if (aDay === 6 || bDay === 6) {
	                                    adj = -1;
	                                } else if (aDay === 0) {
	                                    adj = 0;
	                                } else if (bDay === 0 || (dayMark + mod) > 5) {
	                                    adj = -2;
	                                }
	                            } else if (days < 0) {
	                                if (aDay === 6) {
	                                    adj = 0;
	                                } else if (aDay === 0 || bDay === 0) {
	                                    adj = 1;
	                                } else if (bDay === 6 || (dayMark + mod) < 0) {
	                                    adj = 2;
	                                }
	                            }
	                            days += adj;
	                            days -= (weeks * 2);
	                        }
	                        return days;
	                    },
	                    year: function (date1, date2) {
	                        return date2.getFullYear() - date1.getFullYear();
	                    },
	                    month: function (date1, date2, utc) {
	                        var m1 = date1[utc ? "getUTCMonth" : "getMonth"]();
	                        var m2 = date2[utc ? "getUTCMonth" : "getMonth"]();
	                        return (m2 - m1) + ((date2.getFullYear() - date1.getFullYear()) * 12);
	                    },
	                    week: function (date1, date2, utc) {
	                        return round(differenceTransform("day", date1, date2, utc) / 7);
	                    },
	                    day: function (date1, date2) {
	                        return 1.1574074074074074e-8 * (date2.getTime() - date1.getTime());
	                    },
	                    hour: function (date1, date2) {
	                        return 2.7777777777777776e-7 * (date2.getTime() - date1.getTime());
	                    },
	                    minute: function (date1, date2) {
	                        return 0.000016666666666666667 * (date2.getTime() - date1.getTime());
	                    },
	                    second: function (date1, date2) {
	                        return 0.001 * (date2.getTime() - date1.getTime());
	                    },
	                    millisecond: function (date1, date2) {
	                        return date2.getTime() - date1.getTime();
	                    }
	                };


	                function differenceTransform(interval, date1, date2, utc) {
	                    interval = interval.replace(/s$/, "");
	                    return round(differenceMap[interval](date1, date2, utc));
	                }


	                return {
	                    addTransform: addTransform,
	                    differenceTransform: differenceTransform
	                };
	            }()),
	            addTransform = transforms.addTransform,
	            differenceTransform = transforms.differenceTransform;


	        /**
	         * @ignore
	         * Based on DOJO Date Implementation
	         *
	         * Dojo is available under *either* the terms of the modified BSD license *or* the
	         * Academic Free License version 2.1. As a recipient of Dojo, you may choose which
	         * license to receive this code under (except as noted in per-module LICENSE
	         * files). Some modules may not be the copyright of the Dojo Foundation. These
	         * modules contain explicit declarations of copyright in both the LICENSE files in
	         * the directories in which they reside and in the code itself. No external
	         * contributions are allowed under licenses which are fundamentally incompatible
	         * with the AFL or BSD licenses that Dojo is distributed under.
	         *
	         */

	        var floor = Math.floor, round = Math.round, min = Math.min, pow = Math.pow, ceil = Math.ceil, abs = Math.abs;
	        var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	        var monthAbbr = ["Jan.", "Feb.", "Mar.", "Apr.", "May.", "Jun.", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."];
	        var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	        var dayAbbr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	        var eraNames = ["Before Christ", "Anno Domini"];
	        var eraAbbr = ["BC", "AD"];


	        function getDayOfYear(/*Date*/dateObject, utc) {
	            // summary: gets the day of the year as represented by dateObject
	            return date.difference(new Date(dateObject.getFullYear(), 0, 1, dateObject.getHours()), dateObject, null, utc) + 1; // Number
	        }

	        function getWeekOfYear(/*Date*/dateObject, /*Number*/firstDayOfWeek, utc) {
	            firstDayOfWeek = firstDayOfWeek || 0;
	            var fullYear = dateObject[utc ? "getUTCFullYear" : "getFullYear"]();
	            var firstDayOfYear = new Date(fullYear, 0, 1).getDay(),
	                adj = (firstDayOfYear - firstDayOfWeek + 7) % 7,
	                week = floor((getDayOfYear(dateObject) + adj - 1) / 7);

	            // if year starts on the specified day, start counting weeks at 1
	            if (firstDayOfYear === firstDayOfWeek) {
	                week++;
	            }

	            return week; // Number
	        }

	        function getTimezoneName(/*Date*/dateObject) {
	            var str = dateObject.toString();
	            var tz = '';
	            var pos = str.indexOf('(');
	            if (pos > -1) {
	                tz = str.substring(++pos, str.indexOf(')'));
	            }
	            return tz; // String
	        }


	        function buildDateEXP(pattern, tokens) {
	            return pattern.replace(/([a-z])\1*/ig,function (match) {
	                // Build a simple regexp.  Avoid captures, which would ruin the tokens list
	                var s,
	                    c = match.charAt(0),
	                    l = match.length,
	                    p2 = '0?',
	                    p3 = '0{0,2}';
	                if (c === 'y') {
	                    s = '\\d{2,4}';
	                } else if (c === "M") {
	                    s = (l > 2) ? '\\S+?' : '1[0-2]|' + p2 + '[1-9]';
	                } else if (c === "D") {
	                    s = '[12][0-9][0-9]|3[0-5][0-9]|36[0-6]|' + p3 + '[1-9][0-9]|' + p2 + '[1-9]';
	                } else if (c === "d") {
	                    s = '3[01]|[12]\\d|' + p2 + '[1-9]';
	                } else if (c === "w") {
	                    s = '[1-4][0-9]|5[0-3]|' + p2 + '[1-9]';
	                } else if (c === "E") {
	                    s = '\\S+';
	                } else if (c === "h") {
	                    s = '1[0-2]|' + p2 + '[1-9]';
	                } else if (c === "K") {
	                    s = '1[01]|' + p2 + '\\d';
	                } else if (c === "H") {
	                    s = '1\\d|2[0-3]|' + p2 + '\\d';
	                } else if (c === "k") {
	                    s = '1\\d|2[0-4]|' + p2 + '[1-9]';
	                } else if (c === "m" || c === "s") {
	                    s = '[0-5]\\d';
	                } else if (c === "S") {
	                    s = '\\d{' + l + '}';
	                } else if (c === "a") {
	                    var am = 'AM', pm = 'PM';
	                    s = am + '|' + pm;
	                    if (am !== am.toLowerCase()) {
	                        s += '|' + am.toLowerCase();
	                    }
	                    if (pm !== pm.toLowerCase()) {
	                        s += '|' + pm.toLowerCase();
	                    }
	                    s = s.replace(/\./g, "\\.");
	                } else if (c === 'v' || c === 'z' || c === 'Z' || c === 'G' || c === 'q' || c === 'Q') {
	                    s = ".*";
	                } else {
	                    s = c === " " ? "\\s*" : c + "*";
	                }
	                if (tokens) {
	                    tokens.push(match);
	                }

	                return "(" + s + ")"; // add capture
	            }).replace(/[\xa0 ]/g, "[\\s\\xa0]"); // normalize whitespace.  Need explicit handling of \xa0 for IE.
	        }


	        /**
	         * @namespace Utilities for Dates
	         */
	        var date = {

	            /**@lends date*/

	            /**
	             * Returns the number of days in the month of a date
	             *
	             * @example
	             *
	             *  dateExtender.getDaysInMonth(new Date(2006, 1, 1)); //28
	             *  dateExtender.getDaysInMonth(new Date(2004, 1, 1)); //29
	             *  dateExtender.getDaysInMonth(new Date(2006, 2, 1)); //31
	             *  dateExtender.getDaysInMonth(new Date(2006, 3, 1)); //30
	             *  dateExtender.getDaysInMonth(new Date(2006, 4, 1)); //31
	             *  dateExtender.getDaysInMonth(new Date(2006, 5, 1)); //30
	             *  dateExtender.getDaysInMonth(new Date(2006, 6, 1)); //31
	             * @param {Date} dateObject the date containing the month
	             * @return {Number} the number of days in the month
	             */
	            getDaysInMonth: function (/*Date*/dateObject) {
	                //	summary:
	                //		Returns the number of days in the month used by dateObject
	                var month = dateObject.getMonth();
	                var days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	                if (month === 1 && date.isLeapYear(dateObject)) {
	                    return 29;
	                } // Number
	                return days[month]; // Number
	            },

	            /**
	             * Determines if a date is a leap year
	             *
	             * @example
	             *
	             *  dateExtender.isLeapYear(new Date(1600, 0, 1)); //true
	             *  dateExtender.isLeapYear(new Date(2004, 0, 1)); //true
	             *  dateExtender.isLeapYear(new Date(2000, 0, 1)); //true
	             *  dateExtender.isLeapYear(new Date(2006, 0, 1)); //false
	             *  dateExtender.isLeapYear(new Date(1900, 0, 1)); //false
	             *  dateExtender.isLeapYear(new Date(1800, 0, 1)); //false
	             *  dateExtender.isLeapYear(new Date(1700, 0, 1)); //false
	             *
	             * @param {Date} dateObject
	             * @returns {Boolean} true if it is a leap year false otherwise
	             */
	            isLeapYear: function (/*Date*/dateObject, utc) {
	                var year = dateObject[utc ? "getUTCFullYear" : "getFullYear"]();
	                return (year % 400 === 0) || (year % 4 === 0 && year % 100 !== 0);

	            },

	            /**
	             * Determines if a date is on a weekend
	             *
	             * @example
	             *
	             * var thursday = new Date(2006, 8, 21);
	             * var saturday = new Date(2006, 8, 23);
	             * var sunday = new Date(2006, 8, 24);
	             * var monday = new Date(2006, 8, 25);
	             * dateExtender.isWeekend(thursday)); //false
	             * dateExtender.isWeekend(saturday); //true
	             * dateExtender.isWeekend(sunday); //true
	             * dateExtender.isWeekend(monday)); //false
	             *
	             * @param {Date} dateObject the date to test
	             *
	             * @returns {Boolean} true if the date is a weekend
	             */
	            isWeekend: function (/*Date?*/dateObject, utc) {
	                // summary:
	                //	Determines if the date falls on a weekend, according to local custom.
	                var day = (dateObject || new Date())[utc ? "getUTCDay" : "getDay"]();
	                return day === 0 || day === 6;
	            },

	            /**
	             * Get the timezone of a date
	             *
	             * @example
	             *  //just setting the strLocal to simulate the toString() of a date
	             *  dt.str = 'Sun Sep 17 2006 22:25:51 GMT-0500 (CDT)';
	             *  //just setting the strLocal to simulate the locale
	             *  dt.strLocale = 'Sun 17 Sep 2006 10:25:51 PM CDT';
	             *  dateExtender.getTimezoneName(dt); //'CDT'
	             *  dt.str = 'Sun Sep 17 2006 22:57:18 GMT-0500 (CDT)';
	             *  dt.strLocale = 'Sun Sep 17 22:57:18 2006';
	             *  dateExtender.getTimezoneName(dt); //'CDT'
	             * @param dateObject the date to get the timezone from
	             *
	             * @returns {String} the timezone of the date
	             */
	            getTimezoneName: getTimezoneName,

	            /**
	             * Compares two dates
	             *
	             * @example
	             *
	             * var d1 = new Date();
	             * d1.setHours(0);
	             * dateExtender.compare(d1, d1); // 0
	             *
	             *  var d1 = new Date();
	             *  d1.setHours(0);
	             *  var d2 = new Date();
	             *  d2.setFullYear(2005);
	             *  d2.setHours(12);
	             *  dateExtender.compare(d1, d2, "date"); // 1
	             *  dateExtender.compare(d1, d2, "datetime"); // 1
	             *
	             *  var d1 = new Date();
	             *  d1.setHours(0);
	             *  var d2 = new Date();
	             *  d2.setFullYear(2005);
	             *  d2.setHours(12);
	             *  dateExtender.compare(d2, d1, "date"); // -1
	             *  dateExtender.compare(d1, d2, "time"); //-1
	             *
	             * @param {Date|String} date1 the date to comapare
	             * @param {Date|String} [date2=new Date()] the date to compare date1 againse
	             * @param {"date"|"time"|"datetime"} portion compares the portion specified
	             *
	             * @returns -1 if date1 is < date2 0 if date1 === date2  1 if date1 > date2
	             */
	            compare: function (/*Date*/date1, /*Date*/date2, /*String*/portion) {
	                date1 = new Date(+date1);
	                date2 = new Date(+(date2 || new Date()));

	                if (portion === "date") {
	                    // Ignore times and compare dates.
	                    date1.setHours(0, 0, 0, 0);
	                    date2.setHours(0, 0, 0, 0);
	                } else if (portion === "time") {
	                    // Ignore dates and compare times.
	                    date1.setFullYear(0, 0, 0);
	                    date2.setFullYear(0, 0, 0);
	                }
	                return date1 > date2 ? 1 : date1 < date2 ? -1 : 0;
	            },


	            /**
	             * Adds a specified interval and amount to a date
	             *
	             * @example
	             *  var dtA = new Date(2005, 11, 27);
	             *  dateExtender.add(dtA, "year", 1); //new Date(2006, 11, 27);
	             *  dateExtender.add(dtA, "years", 1); //new Date(2006, 11, 27);
	             *
	             *  dtA = new Date(2000, 0, 1);
	             *  dateExtender.add(dtA, "quarter", 1); //new Date(2000, 3, 1);
	             *  dateExtender.add(dtA, "quarters", 1); //new Date(2000, 3, 1);
	             *
	             *  dtA = new Date(2000, 0, 1);
	             *  dateExtender.add(dtA, "month", 1); //new Date(2000, 1, 1);
	             *  dateExtender.add(dtA, "months", 1); //new Date(2000, 1, 1);
	             *
	             *  dtA = new Date(2000, 0, 31);
	             *  dateExtender.add(dtA, "month", 1); //new Date(2000, 1, 29);
	             *  dateExtender.add(dtA, "months", 1); //new Date(2000, 1, 29);
	             *
	             *  dtA = new Date(2000, 0, 1);
	             *  dateExtender.add(dtA, "week", 1); //new Date(2000, 0, 8);
	             *  dateExtender.add(dtA, "weeks", 1); //new Date(2000, 0, 8);
	             *
	             *  dtA = new Date(2000, 0, 1);
	             *  dateExtender.add(dtA, "day", 1); //new Date(2000, 0, 2);
	             *
	             *  dtA = new Date(2000, 0, 1);
	             *  dateExtender.add(dtA, "weekday", 1); //new Date(2000, 0, 3);
	             *
	             *  dtA = new Date(2000, 0, 1, 11);
	             *  dateExtender.add(dtA, "hour", 1); //new Date(2000, 0, 1, 12);
	             *
	             *  dtA = new Date(2000, 11, 31, 23, 59);
	             *  dateExtender.add(dtA, "minute", 1); //new Date(2001, 0, 1, 0, 0);
	             *
	             *  dtA = new Date(2000, 11, 31, 23, 59, 59);
	             *  dateExtender.add(dtA, "second", 1); //new Date(2001, 0, 1, 0, 0, 0);
	             *
	             *  dtA = new Date(2000, 11, 31, 23, 59, 59, 999);
	             *  dateExtender.add(dtA, "millisecond", 1); //new Date(2001, 0, 1, 0, 0, 0, 0);
	             *
	             * @param {Date} date
	             * @param {String} interval the interval to add
	             *  <ul>
	             *      <li>day | days</li>
	             *      <li>weekday | weekdays</li>
	             *      <li>year | years</li>
	             *      <li>week | weeks</li>
	             *      <li>quarter | quarters</li>
	             *      <li>months | months</li>
	             *      <li>hour | hours</li>
	             *      <li>minute | minutes</li>
	             *      <li>second | seconds</li>
	             *      <li>millisecond | milliseconds</li>
	             *  </ul>
	             * @param {Number} [amount=0] the amount to add
	             */
	            add: function (/*Date*/date, /*String*/interval, /*int*/amount) {
	                var res = addTransform(interval, date, amount || 0);
	                amount = res[0];
	                var property = res[1];
	                var sum = new Date(+date);
	                var fixOvershoot = res[2];
	                if (property) {
	                    sum["set" + property](sum["get" + property]() + amount);
	                }

	                if (fixOvershoot && (sum.getDate() < date.getDate())) {
	                    sum.setDate(0);
	                }

	                return sum; // Date
	            },

	            /**
	             * Finds the difference between two dates based on the specified interval
	             *
	             * @example
	             *
	             * var dtA, dtB;
	             *
	             * dtA = new Date(2005, 11, 27);
	             * dtB = new Date(2006, 11, 27);
	             * dateExtender.difference(dtA, dtB, "year"); //1
	             *
	             * dtA = new Date(2000, 1, 29);
	             * dtB = new Date(2001, 2, 1);
	             * dateExtender.difference(dtA, dtB, "quarter"); //4
	             * dateExtender.difference(dtA, dtB, "month"); //13
	             *
	             * dtA = new Date(2000, 1, 1);
	             * dtB = new Date(2000, 1, 8);
	             * dateExtender.difference(dtA, dtB, "week"); //1
	             *
	             * dtA = new Date(2000, 1, 29);
	             * dtB = new Date(2000, 2, 1);
	             * dateExtender.difference(dtA, dtB, "day"); //1
	             *
	             * dtA = new Date(2006, 7, 3);
	             * dtB = new Date(2006, 7, 11);
	             * dateExtender.difference(dtA, dtB, "weekday"); //6
	             *
	             * dtA = new Date(2000, 11, 31, 23);
	             * dtB = new Date(2001, 0, 1, 0);
	             * dateExtender.difference(dtA, dtB, "hour"); //1
	             *
	             * dtA = new Date(2000, 11, 31, 23, 59);
	             * dtB = new Date(2001, 0, 1, 0, 0);
	             * dateExtender.difference(dtA, dtB, "minute"); //1
	             *
	             * dtA = new Date(2000, 11, 31, 23, 59, 59);
	             * dtB = new Date(2001, 0, 1, 0, 0, 0);
	             * dateExtender.difference(dtA, dtB, "second"); //1
	             *
	             * dtA = new Date(2000, 11, 31, 23, 59, 59, 999);
	             * dtB = new Date(2001, 0, 1, 0, 0, 0, 0);
	             * dateExtender.difference(dtA, dtB, "millisecond"); //1
	             *
	             *
	             * @param {Date} date1
	             * @param {Date} [date2 = new Date()]
	             * @param {String} [interval = "day"] the intercal to find the difference of.
	             *   <ul>
	             *      <li>day | days</li>
	             *      <li>weekday | weekdays</li>
	             *      <li>year | years</li>
	             *      <li>week | weeks</li>
	             *      <li>quarter | quarters</li>
	             *      <li>months | months</li>
	             *      <li>hour | hours</li>
	             *      <li>minute | minutes</li>
	             *      <li>second | seconds</li>
	             *      <li>millisecond | milliseconds</li>
	             *  </ul>
	             */
	            difference: function (/*Date*/date1, /*Date?*/date2, /*String*/interval, utc) {
	                date2 = date2 || new Date();
	                interval = interval || "day";
	                return differenceTransform(interval, date1, date2, utc);
	            },

	            /**
	             * Formats a date to the specidifed format string
	             *
	             * @example
	             *
	             * var date = new Date(2006, 7, 11, 0, 55, 12, 345);
	             * dateExtender.format(date, "EEEE, MMMM dd, yyyy"); //"Friday, August 11, 2006"
	             * dateExtender.format(date, "M/dd/yy"); //"8/11/06"
	             * dateExtender.format(date, "E"); //"6"
	             * dateExtender.format(date, "h:m a"); //"12:55 AM"
	             * dateExtender.format(date, 'h:m:s'); //"12:55:12"
	             * dateExtender.format(date, 'h:m:s.SS'); //"12:55:12.35"
	             * dateExtender.format(date, 'k:m:s.SS'); //"24:55:12.35"
	             * dateExtender.format(date, 'H:m:s.SS'); //"0:55:12.35"
	             * dateExtender.format(date, "ddMMyyyy"); //"11082006"
	             *
	             * @param date the date to format
	             * @param {String} format the format of the date composed of the following options
	             * <ul>
	             *                  <li> G    Era designator    Text    AD</li>
	             *                  <li> y    Year    Year    1996; 96</li>
	             *                  <li> M    Month in year    Month    July; Jul; 07</li>
	             *                  <li> w    Week in year    Number    27</li>
	             *                  <li> W    Week in month    Number    2</li>
	             *                  <li> D    Day in year    Number    189</li>
	             *                  <li> d    Day in month    Number    10</li>
	             *                  <li> E    Day in week    Text    Tuesday; Tue</li>
	             *                  <li> a    Am/pm marker    Text    PM</li>
	             *                  <li> H    Hour in day (0-23)    Number    0</li>
	             *                  <li> k    Hour in day (1-24)    Number    24</li>
	             *                  <li> K    Hour in am/pm (0-11)    Number    0</li>
	             *                  <li> h    Hour in am/pm (1-12)    Number    12</li>
	             *                  <li> m    Minute in hour    Number    30</li>
	             *                  <li> s    Second in minute    Number    55</li>
	             *                  <li> S    Millisecond    Number    978</li>
	             *                  <li> z    Time zone    General time zone    Pacific Standard Time; PST; GMT-08:00</li>
	             *                  <li> Z    Time zone    RFC 822 time zone    -0800 </li>
	             * </ul>
	             */
	            format: function (date, format, utc) {
	                utc = utc || false;
	                var fullYear, month, day, d, hour, minute, second, millisecond;
	                if (utc) {
	                    fullYear = date.getUTCFullYear();
	                    month = date.getUTCMonth();
	                    day = date.getUTCDay();
	                    d = date.getUTCDate();
	                    hour = date.getUTCHours();
	                    minute = date.getUTCMinutes();
	                    second = date.getUTCSeconds();
	                    millisecond = date.getUTCMilliseconds();
	                } else {
	                    fullYear = date.getFullYear();
	                    month = date.getMonth();
	                    d = date.getDate();
	                    day = date.getDay();
	                    hour = date.getHours();
	                    minute = date.getMinutes();
	                    second = date.getSeconds();
	                    millisecond = date.getMilliseconds();
	                }
	                return format.replace(/([A-Za-z])\1*/g, function (match) {
	                    var s, pad,
	                        c = match.charAt(0),
	                        l = match.length;
	                    if (c === 'd') {
	                        s = "" + d;
	                        pad = true;
	                    } else if (c === "H" && !s) {
	                        s = "" + hour;
	                        pad = true;
	                    } else if (c === 'm' && !s) {
	                        s = "" + minute;
	                        pad = true;
	                    } else if (c === 's') {
	                        if (!s) {
	                            s = "" + second;
	                        }
	                        pad = true;
	                    } else if (c === "G") {
	                        s = ((l < 4) ? eraAbbr : eraNames)[fullYear < 0 ? 0 : 1];
	                    } else if (c === "y") {
	                        s = fullYear;
	                        if (l > 1) {
	                            if (l === 2) {
	                                s = _truncate("" + s, 2, true);
	                            } else {
	                                pad = true;
	                            }
	                        }
	                    } else if (c.toUpperCase() === "Q") {
	                        s = ceil((month + 1) / 3);
	                        pad = true;
	                    } else if (c === "M") {
	                        if (l < 3) {
	                            s = month + 1;
	                            pad = true;
	                        } else {
	                            s = (l === 3 ? monthAbbr : monthNames)[month];
	                        }
	                    } else if (c === "w") {
	                        s = getWeekOfYear(date, 0, utc);
	                        pad = true;
	                    } else if (c === "D") {
	                        s = getDayOfYear(date, utc);
	                        pad = true;
	                    } else if (c === "E") {
	                        if (l < 3) {
	                            s = day + 1;
	                            pad = true;
	                        } else {
	                            s = (l === -3 ? dayAbbr : dayNames)[day];
	                        }
	                    } else if (c === 'a') {
	                        s = (hour < 12) ? 'AM' : 'PM';
	                    } else if (c === "h") {
	                        s = (hour % 12) || 12;
	                        pad = true;
	                    } else if (c === "K") {
	                        s = (hour % 12);
	                        pad = true;
	                    } else if (c === "k") {
	                        s = hour || 24;
	                        pad = true;
	                    } else if (c === "S") {
	                        s = round(millisecond * pow(10, l - 3));
	                        pad = true;
	                    } else if (c === "z" || c === "v" || c === "Z") {
	                        s = getTimezoneName(date);
	                        if ((c === "z" || c === "v") && !s) {
	                            l = 4;
	                        }
	                        if (!s || c === "Z") {
	                            var offset = date.getTimezoneOffset();
	                            var tz = [
	                                (offset >= 0 ? "-" : "+"),
	                                _pad(floor(abs(offset) / 60), 2, "0"),
	                                _pad(abs(offset) % 60, 2, "0")
	                            ];
	                            if (l === 4) {
	                                tz.splice(0, 0, "GMT");
	                                tz.splice(3, 0, ":");
	                            }
	                            s = tz.join("");
	                        }
	                    } else {
	                        s = match;
	                    }
	                    if (pad) {
	                        s = _pad(s, l, '0');
	                    }
	                    return s;
	                });
	            }

	        };

	        var numberDate = {};

	        function addInterval(interval) {
	            numberDate[interval + "sFromNow"] = function (val) {
	                return date.add(new Date(), interval, val);
	            };
	            numberDate[interval + "sAgo"] = function (val) {
	                return date.add(new Date(), interval, -val);
	            };
	        }

	        var intervals = ["year", "month", "day", "hour", "minute", "second"];
	        for (var i = 0, l = intervals.length; i < l; i++) {
	            addInterval(intervals[i]);
	        }

	        var stringDate = {

	            parseDate: function (dateStr, format) {
	                if (!format) {
	                    throw new Error('format required when calling dateExtender.parse');
	                }
	                var tokens = [], regexp = buildDateEXP(format, tokens),
	                    re = new RegExp("^" + regexp + "$", "i"),
	                    match = re.exec(dateStr);
	                if (!match) {
	                    return null;
	                } // null
	                var result = [1970, 0, 1, 0, 0, 0, 0], // will get converted to a Date at the end
	                    amPm = "",
	                    valid = every(match, function (v, i) {
	                        if (i) {
	                            var token = tokens[i - 1];
	                            var l = token.length, type = token.charAt(0);
	                            if (type === 'y') {
	                                if (v < 100) {
	                                    v = parseInt(v, 10);
	                                    //choose century to apply, according to a sliding window
	                                    //of 80 years before and 20 years after present year
	                                    var year = '' + new Date().getFullYear(),
	                                        century = year.substring(0, 2) * 100,
	                                        cutoff = min(year.substring(2, 4) + 20, 99);
	                                    result[0] = (v < cutoff) ? century + v : century - 100 + v;
	                                } else {
	                                    result[0] = v;
	                                }
	                            } else if (type === "M") {
	                                if (l > 2) {
	                                    var months = monthNames, j, k;
	                                    if (l === 3) {
	                                        months = monthAbbr;
	                                    }
	                                    //Tolerate abbreviating period in month part
	                                    //Case-insensitive comparison
	                                    v = v.replace(".", "").toLowerCase();
	                                    var contains = false;
	                                    for (j = 0, k = months.length; j < k && !contains; j++) {
	                                        var s = months[j].replace(".", "").toLocaleLowerCase();
	                                        if (s === v) {
	                                            v = j;
	                                            contains = true;
	                                        }
	                                    }
	                                    if (!contains) {
	                                        return false;
	                                    }
	                                } else {
	                                    v--;
	                                }
	                                result[1] = v;
	                            } else if (type === "E" || type === "e") {
	                                var days = dayNames;
	                                if (l === 3) {
	                                    days = dayAbbr;
	                                }
	                                //Case-insensitive comparison
	                                v = v.toLowerCase();
	                                days = array.map(days, function (d) {
	                                    return d.toLowerCase();
	                                });
	                                var d = array.indexOf(days, v);
	                                if (d === -1) {
	                                    v = parseInt(v, 10);
	                                    if (isNaN(v) || v > days.length) {
	                                        return false;
	                                    }
	                                } else {
	                                    v = d;
	                                }
	                            } else if (type === 'D' || type === "d") {
	                                if (type === "D") {
	                                    result[1] = 0;
	                                }
	                                result[2] = v;
	                            } else if (type === "a") {
	                                var am = "am";
	                                var pm = "pm";
	                                var period = /\./g;
	                                v = v.replace(period, '').toLowerCase();
	                                // we might not have seen the hours field yet, so store the state and apply hour change later
	                                amPm = (v === pm) ? 'p' : (v === am) ? 'a' : '';
	                            } else if (type === "k" || type === "h" || type === "H" || type === "K") {
	                                if (type === "k" && (+v) === 24) {
	                                    v = 0;
	                                }
	                                result[3] = v;
	                            } else if (type === "m") {
	                                result[4] = v;
	                            } else if (type === "s") {
	                                result[5] = v;
	                            } else if (type === "S") {
	                                result[6] = v;
	                            }
	                        }
	                        return true;
	                    });
	                if (valid) {
	                    var hours = +result[3];
	                    //account for am/pm
	                    if (amPm === 'p' && hours < 12) {
	                        result[3] = hours + 12; //e.g., 3pm -> 15
	                    } else if (amPm === 'a' && hours === 12) {
	                        result[3] = 0; //12am -> 0
	                    }
	                    var dateObject = new Date(result[0], result[1], result[2], result[3], result[4], result[5], result[6]); // Date
	                    var dateToken = (array.indexOf(tokens, 'd') !== -1),
	                        monthToken = (array.indexOf(tokens, 'M') !== -1),
	                        month = result[1],
	                        day = result[2],
	                        dateMonth = dateObject.getMonth(),
	                        dateDay = dateObject.getDate();
	                    if ((monthToken && dateMonth > month) || (dateToken && dateDay > day)) {
	                        return null;
	                    }
	                    return dateObject; // Date
	                } else {
	                    return null;
	                }
	            }
	        };


	        var ret = extended.define(is.isDate, date).define(is.isString, stringDate).define(is.isNumber, numberDate);
	        for (i in date) {
	            if (date.hasOwnProperty(i)) {
	                ret[i] = date[i];
	            }
	        }

	        for (i in stringDate) {
	            if (stringDate.hasOwnProperty(i)) {
	                ret[i] = stringDate[i];
	            }
	        }
	        for (i in numberDate) {
	            if (numberDate.hasOwnProperty(i)) {
	                ret[i] = numberDate[i];
	            }
	        }
	        return ret;
	    }

	    if (true) {
	        if ("undefined" !== typeof module && module.exports) {
	            module.exports = defineDate(__webpack_require__(7), __webpack_require__(12), __webpack_require__(6));

	        }
	    } else if ("function" === typeof define && define.amd) {
	        define(["extended", "is-extended", "array-extended"], function (extended, is, arr) {
	            return defineDate(extended, is, arr);
	        });
	    } else {
	        this.dateExtended = defineDate(this.extended, this.isExtended, this.arrayExtended);
	    }

	}).call(this);








/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	(function () {
	    "use strict";
	    /*global extended isExtended*/

	    function defineObject(extended, is, arr) {

	        var deepEqual = is.deepEqual,
	            isString = is.isString,
	            isHash = is.isHash,
	            difference = arr.difference,
	            hasOwn = Object.prototype.hasOwnProperty,
	            isFunction = is.isFunction;

	        function _merge(target, source) {
	            var name, s;
	            for (name in source) {
	                if (hasOwn.call(source, name)) {
	                    s = source[name];
	                    if (!(name in target) || (target[name] !== s)) {
	                        target[name] = s;
	                    }
	                }
	            }
	            return target;
	        }

	        function _deepMerge(target, source) {
	            var name, s, t;
	            for (name in source) {
	                if (hasOwn.call(source, name)) {
	                    s = source[name];
	                    t = target[name];
	                    if (!deepEqual(t, s)) {
	                        if (isHash(t) && isHash(s)) {
	                            target[name] = _deepMerge(t, s);
	                        } else if (isHash(s)) {
	                            target[name] = _deepMerge({}, s);
	                        } else {
	                            target[name] = s;
	                        }
	                    }
	                }
	            }
	            return target;
	        }


	        function merge(obj) {
	            if (!obj) {
	                obj = {};
	            }
	            for (var i = 1, l = arguments.length; i < l; i++) {
	                _merge(obj, arguments[i]);
	            }
	            return obj; // Object
	        }

	        function deepMerge(obj) {
	            if (!obj) {
	                obj = {};
	            }
	            for (var i = 1, l = arguments.length; i < l; i++) {
	                _deepMerge(obj, arguments[i]);
	            }
	            return obj; // Object
	        }


	        function extend(parent, child) {
	            var proto = parent.prototype || parent;
	            merge(proto, child);
	            return parent;
	        }

	        function forEach(hash, iterator, scope) {
	            if (!isHash(hash) || !isFunction(iterator)) {
	                throw new TypeError();
	            }
	            var objKeys = keys(hash), key;
	            for (var i = 0, len = objKeys.length; i < len; ++i) {
	                key = objKeys[i];
	                iterator.call(scope || hash, hash[key], key, hash);
	            }
	            return hash;
	        }

	        function filter(hash, iterator, scope) {
	            if (!isHash(hash) || !isFunction(iterator)) {
	                throw new TypeError();
	            }
	            var objKeys = keys(hash), key, value, ret = {};
	            for (var i = 0, len = objKeys.length; i < len; ++i) {
	                key = objKeys[i];
	                value = hash[key];
	                if (iterator.call(scope || hash, value, key, hash)) {
	                    ret[key] = value;
	                }
	            }
	            return ret;
	        }

	        function values(hash) {
	            if (!isHash(hash)) {
	                throw new TypeError();
	            }
	            var objKeys = keys(hash), ret = [];
	            for (var i = 0, len = objKeys.length; i < len; ++i) {
	                ret.push(hash[objKeys[i]]);
	            }
	            return ret;
	        }


	        function keys(hash) {
	            if (!isHash(hash)) {
	                throw new TypeError();
	            }
	            var ret = [];
	            for (var i in hash) {
	                if (hasOwn.call(hash, i)) {
	                    ret.push(i);
	                }
	            }
	            return ret;
	        }

	        function invert(hash) {
	            if (!isHash(hash)) {
	                throw new TypeError();
	            }
	            var objKeys = keys(hash), key, ret = {};
	            for (var i = 0, len = objKeys.length; i < len; ++i) {
	                key = objKeys[i];
	                ret[hash[key]] = key;
	            }
	            return ret;
	        }

	        function toArray(hash) {
	            if (!isHash(hash)) {
	                throw new TypeError();
	            }
	            var objKeys = keys(hash), key, ret = [];
	            for (var i = 0, len = objKeys.length; i < len; ++i) {
	                key = objKeys[i];
	                ret.push([key, hash[key]]);
	            }
	            return ret;
	        }

	        function omit(hash, omitted) {
	            if (!isHash(hash)) {
	                throw new TypeError();
	            }
	            if (isString(omitted)) {
	                omitted = [omitted];
	            }
	            var objKeys = difference(keys(hash), omitted), key, ret = {};
	            for (var i = 0, len = objKeys.length; i < len; ++i) {
	                key = objKeys[i];
	                ret[key] = hash[key];
	            }
	            return ret;
	        }

	        var hash = {
	            forEach: forEach,
	            filter: filter,
	            invert: invert,
	            values: values,
	            toArray: toArray,
	            keys: keys,
	            omit: omit
	        };


	        var obj = {
	            extend: extend,
	            merge: merge,
	            deepMerge: deepMerge,
	            omit: omit
	        };

	        var ret = extended.define(is.isObject, obj).define(isHash, hash).define(is.isFunction, {extend: extend}).expose({hash: hash}).expose(obj);
	        var orig = ret.extend;
	        ret.extend = function __extend() {
	            if (arguments.length === 1) {
	                return orig.extend.apply(ret, arguments);
	            } else {
	                extend.apply(null, arguments);
	            }
	        };
	        return ret;

	    }

	    if (true) {
	        if ("undefined" !== typeof module && module.exports) {
	            module.exports = defineObject(__webpack_require__(7), __webpack_require__(12), __webpack_require__(6));

	        }
	    } else if ("function" === typeof define && define.amd) {
	        define(["extended", "is-extended", "array-extended"], function (extended, is, array) {
	            return defineObject(extended, is, array);
	        });
	    } else {
	        this.objectExtended = defineObject(this.extended, this.isExtended, this.arrayExtended);
	    }

	}).call(this);








/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	(function () {
	    "use strict";

	    function defineString(extended, is, date, arr) {

	        var stringify;
	        if (typeof JSON === "undefined") {
	            /*
	             json2.js
	             2012-10-08

	             Public Domain.

	             NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
	             */

	            (function () {
	                function f(n) {
	                    // Format integers to have at least two digits.
	                    return n < 10 ? '0' + n : n;
	                }

	                var isPrimitive = is.tester().isString().isNumber().isBoolean().tester();

	                function toJSON(obj) {
	                    if (is.isDate(obj)) {
	                        return isFinite(obj.valueOf()) ? obj.getUTCFullYear() + '-' +
	                            f(obj.getUTCMonth() + 1) + '-' +
	                            f(obj.getUTCDate()) + 'T' +
	                            f(obj.getUTCHours()) + ':' +
	                            f(obj.getUTCMinutes()) + ':' +
	                            f(obj.getUTCSeconds()) + 'Z'
	                            : null;
	                    } else if (isPrimitive(obj)) {
	                        return obj.valueOf();
	                    }
	                    return obj;
	                }

	                var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
	                    escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
	                    gap,
	                    indent,
	                    meta = {    // table of character substitutions
	                        '\b': '\\b',
	                        '\t': '\\t',
	                        '\n': '\\n',
	                        '\f': '\\f',
	                        '\r': '\\r',
	                        '"': '\\"',
	                        '\\': '\\\\'
	                    },
	                    rep;


	                function quote(string) {
	                    escapable.lastIndex = 0;
	                    return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
	                        var c = meta[a];
	                        return typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
	                    }) + '"' : '"' + string + '"';
	                }


	                function str(key, holder) {

	                    var i, k, v, length, mind = gap, partial, value = holder[key];
	                    if (value) {
	                        value = toJSON(value);
	                    }
	                    if (typeof rep === 'function') {
	                        value = rep.call(holder, key, value);
	                    }
	                    switch (typeof value) {
	                    case 'string':
	                        return quote(value);
	                    case 'number':
	                        return isFinite(value) ? String(value) : 'null';
	                    case 'boolean':
	                    case 'null':
	                        return String(value);
	                    case 'object':
	                        if (!value) {
	                            return 'null';
	                        }
	                        gap += indent;
	                        partial = [];
	                        if (Object.prototype.toString.apply(value) === '[object Array]') {
	                            length = value.length;
	                            for (i = 0; i < length; i += 1) {
	                                partial[i] = str(i, value) || 'null';
	                            }
	                            v = partial.length === 0 ? '[]' : gap ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' : '[' + partial.join(',') + ']';
	                            gap = mind;
	                            return v;
	                        }
	                        if (rep && typeof rep === 'object') {
	                            length = rep.length;
	                            for (i = 0; i < length; i += 1) {
	                                if (typeof rep[i] === 'string') {
	                                    k = rep[i];
	                                    v = str(k, value);
	                                    if (v) {
	                                        partial.push(quote(k) + (gap ? ': ' : ':') + v);
	                                    }
	                                }
	                            }
	                        } else {
	                            for (k in value) {
	                                if (Object.prototype.hasOwnProperty.call(value, k)) {
	                                    v = str(k, value);
	                                    if (v) {
	                                        partial.push(quote(k) + (gap ? ': ' : ':') + v);
	                                    }
	                                }
	                            }
	                        }
	                        v = partial.length === 0 ? '{}' : gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' : '{' + partial.join(',') + '}';
	                        gap = mind;
	                        return v;
	                    }
	                }

	                stringify = function (value, replacer, space) {
	                    var i;
	                    gap = '';
	                    indent = '';
	                    if (typeof space === 'number') {
	                        for (i = 0; i < space; i += 1) {
	                            indent += ' ';
	                        }
	                    } else if (typeof space === 'string') {
	                        indent = space;
	                    }
	                    rep = replacer;
	                    if (replacer && typeof replacer !== 'function' &&
	                        (typeof replacer !== 'object' ||
	                            typeof replacer.length !== 'number')) {
	                        throw new Error('JSON.stringify');
	                    }
	                    return str('', {'': value});
	                };
	            }());
	        } else {
	            stringify = JSON.stringify;
	        }


	        var isHash = is.isHash, aSlice = Array.prototype.slice;

	        var FORMAT_REGEX = /%((?:-?\+?.?\d*)?|(?:\[[^\[|\]]*\]))?([sjdDZ])/g;
	        var INTERP_REGEX = /\{(?:\[([^\[|\]]*)\])?(\w+)\}/g;
	        var STR_FORMAT = /(-?)(\+?)([A-Z|a-z|\W]?)([1-9][0-9]*)?$/;
	        var OBJECT_FORMAT = /([1-9][0-9]*)$/g;

	        function formatString(string, format) {
	            var ret = string;
	            if (STR_FORMAT.test(format)) {
	                var match = format.match(STR_FORMAT);
	                var isLeftJustified = match[1], padChar = match[3], width = match[4];
	                if (width) {
	                    width = parseInt(width, 10);
	                    if (ret.length < width) {
	                        ret = pad(ret, width, padChar, isLeftJustified);
	                    } else {
	                        ret = truncate(ret, width);
	                    }
	                }
	            }
	            return ret;
	        }

	        function formatNumber(number, format) {
	            var ret;
	            if (is.isNumber(number)) {
	                ret = "" + number;
	                if (STR_FORMAT.test(format)) {
	                    var match = format.match(STR_FORMAT);
	                    var isLeftJustified = match[1], signed = match[2], padChar = match[3], width = match[4];
	                    if (signed) {
	                        ret = (number > 0 ? "+" : "") + ret;
	                    }
	                    if (width) {
	                        width = parseInt(width, 10);
	                        if (ret.length < width) {
	                            ret = pad(ret, width, padChar || "0", isLeftJustified);
	                        } else {
	                            ret = truncate(ret, width);
	                        }
	                    }

	                }
	            } else {
	                throw new Error("stringExtended.format : when using %d the parameter must be a number!");
	            }
	            return ret;
	        }

	        function formatObject(object, format) {
	            var ret, match = format.match(OBJECT_FORMAT), spacing = 0;
	            if (match) {
	                spacing = parseInt(match[0], 10);
	                if (isNaN(spacing)) {
	                    spacing = 0;
	                }
	            }
	            try {
	                ret = stringify(object, null, spacing);
	            } catch (e) {
	                throw new Error("stringExtended.format : Unable to parse json from ", object);
	            }
	            return ret;
	        }


	        var styles = {
	            //styles
	            bold: 1,
	            bright: 1,
	            italic: 3,
	            underline: 4,
	            blink: 5,
	            inverse: 7,
	            crossedOut: 9,

	            red: 31,
	            green: 32,
	            yellow: 33,
	            blue: 34,
	            magenta: 35,
	            cyan: 36,
	            white: 37,

	            redBackground: 41,
	            greenBackground: 42,
	            yellowBackground: 43,
	            blueBackground: 44,
	            magentaBackground: 45,
	            cyanBackground: 46,
	            whiteBackground: 47,

	            encircled: 52,
	            overlined: 53,
	            grey: 90,
	            black: 90
	        };

	        var characters = {
	            SMILEY: "☺",
	            SOLID_SMILEY: "☻",
	            HEART: "♥",
	            DIAMOND: "♦",
	            CLOVE: "♣",
	            SPADE: "♠",
	            DOT: "•",
	            SQUARE_CIRCLE: "◘",
	            CIRCLE: "○",
	            FILLED_SQUARE_CIRCLE: "◙",
	            MALE: "♂",
	            FEMALE: "♀",
	            EIGHT_NOTE: "♪",
	            DOUBLE_EIGHTH_NOTE: "♫",
	            SUN: "☼",
	            PLAY: "►",
	            REWIND: "◄",
	            UP_DOWN: "↕",
	            PILCROW: "¶",
	            SECTION: "§",
	            THICK_MINUS: "▬",
	            SMALL_UP_DOWN: "↨",
	            UP_ARROW: "↑",
	            DOWN_ARROW: "↓",
	            RIGHT_ARROW: "→",
	            LEFT_ARROW: "←",
	            RIGHT_ANGLE: "∟",
	            LEFT_RIGHT_ARROW: "↔",
	            TRIANGLE: "▲",
	            DOWN_TRIANGLE: "▼",
	            HOUSE: "⌂",
	            C_CEDILLA: "Ç",
	            U_UMLAUT: "ü",
	            E_ACCENT: "é",
	            A_LOWER_CIRCUMFLEX: "â",
	            A_LOWER_UMLAUT: "ä",
	            A_LOWER_GRAVE_ACCENT: "à",
	            A_LOWER_CIRCLE_OVER: "å",
	            C_LOWER_CIRCUMFLEX: "ç",
	            E_LOWER_CIRCUMFLEX: "ê",
	            E_LOWER_UMLAUT: "ë",
	            E_LOWER_GRAVE_ACCENT: "è",
	            I_LOWER_UMLAUT: "ï",
	            I_LOWER_CIRCUMFLEX: "î",
	            I_LOWER_GRAVE_ACCENT: "ì",
	            A_UPPER_UMLAUT: "Ä",
	            A_UPPER_CIRCLE: "Å",
	            E_UPPER_ACCENT: "É",
	            A_E_LOWER: "æ",
	            A_E_UPPER: "Æ",
	            O_LOWER_CIRCUMFLEX: "ô",
	            O_LOWER_UMLAUT: "ö",
	            O_LOWER_GRAVE_ACCENT: "ò",
	            U_LOWER_CIRCUMFLEX: "û",
	            U_LOWER_GRAVE_ACCENT: "ù",
	            Y_LOWER_UMLAUT: "ÿ",
	            O_UPPER_UMLAUT: "Ö",
	            U_UPPER_UMLAUT: "Ü",
	            CENTS: "¢",
	            POUND: "£",
	            YEN: "¥",
	            CURRENCY: "¤",
	            PTS: "₧",
	            FUNCTION: "ƒ",
	            A_LOWER_ACCENT: "á",
	            I_LOWER_ACCENT: "í",
	            O_LOWER_ACCENT: "ó",
	            U_LOWER_ACCENT: "ú",
	            N_LOWER_TILDE: "ñ",
	            N_UPPER_TILDE: "Ñ",
	            A_SUPER: "ª",
	            O_SUPER: "º",
	            UPSIDEDOWN_QUESTION: "¿",
	            SIDEWAYS_L: "⌐",
	            NEGATION: "¬",
	            ONE_HALF: "½",
	            ONE_FOURTH: "¼",
	            UPSIDEDOWN_EXCLAMATION: "¡",
	            DOUBLE_LEFT: "«",
	            DOUBLE_RIGHT: "»",
	            LIGHT_SHADED_BOX: "░",
	            MEDIUM_SHADED_BOX: "▒",
	            DARK_SHADED_BOX: "▓",
	            VERTICAL_LINE: "│",
	            MAZE__SINGLE_RIGHT_T: "┤",
	            MAZE_SINGLE_RIGHT_TOP: "┐",
	            MAZE_SINGLE_RIGHT_BOTTOM_SMALL: "┘",
	            MAZE_SINGLE_LEFT_TOP_SMALL: "┌",
	            MAZE_SINGLE_LEFT_BOTTOM_SMALL: "└",
	            MAZE_SINGLE_LEFT_T: "├",
	            MAZE_SINGLE_BOTTOM_T: "┴",
	            MAZE_SINGLE_TOP_T: "┬",
	            MAZE_SINGLE_CENTER: "┼",
	            MAZE_SINGLE_HORIZONTAL_LINE: "─",
	            MAZE_SINGLE_RIGHT_DOUBLECENTER_T: "╡",
	            MAZE_SINGLE_RIGHT_DOUBLE_BL: "╛",
	            MAZE_SINGLE_RIGHT_DOUBLE_T: "╢",
	            MAZE_SINGLE_RIGHT_DOUBLEBOTTOM_TOP: "╖",
	            MAZE_SINGLE_RIGHT_DOUBLELEFT_TOP: "╕",
	            MAZE_SINGLE_LEFT_DOUBLE_T: "╞",
	            MAZE_SINGLE_BOTTOM_DOUBLE_T: "╧",
	            MAZE_SINGLE_TOP_DOUBLE_T: "╤",
	            MAZE_SINGLE_TOP_DOUBLECENTER_T: "╥",
	            MAZE_SINGLE_BOTTOM_DOUBLECENTER_T: "╨",
	            MAZE_SINGLE_LEFT_DOUBLERIGHT_BOTTOM: "╘",
	            MAZE_SINGLE_LEFT_DOUBLERIGHT_TOP: "╒",
	            MAZE_SINGLE_LEFT_DOUBLEBOTTOM_TOP: "╓",
	            MAZE_SINGLE_LEFT_DOUBLETOP_BOTTOM: "╙",
	            MAZE_SINGLE_LEFT_TOP: "Γ",
	            MAZE_SINGLE_RIGHT_BOTTOM: "╜",
	            MAZE_SINGLE_LEFT_CENTER: "╟",
	            MAZE_SINGLE_DOUBLECENTER_CENTER: "╫",
	            MAZE_SINGLE_DOUBLECROSS_CENTER: "╪",
	            MAZE_DOUBLE_LEFT_CENTER: "╣",
	            MAZE_DOUBLE_VERTICAL: "║",
	            MAZE_DOUBLE_RIGHT_TOP: "╗",
	            MAZE_DOUBLE_RIGHT_BOTTOM: "╝",
	            MAZE_DOUBLE_LEFT_BOTTOM: "╚",
	            MAZE_DOUBLE_LEFT_TOP: "╔",
	            MAZE_DOUBLE_BOTTOM_T: "╩",
	            MAZE_DOUBLE_TOP_T: "╦",
	            MAZE_DOUBLE_LEFT_T: "╠",
	            MAZE_DOUBLE_HORIZONTAL: "═",
	            MAZE_DOUBLE_CROSS: "╬",
	            SOLID_RECTANGLE: "█",
	            THICK_LEFT_VERTICAL: "▌",
	            THICK_RIGHT_VERTICAL: "▐",
	            SOLID_SMALL_RECTANGLE_BOTTOM: "▄",
	            SOLID_SMALL_RECTANGLE_TOP: "▀",
	            PHI_UPPER: "Φ",
	            INFINITY: "∞",
	            INTERSECTION: "∩",
	            DEFINITION: "≡",
	            PLUS_MINUS: "±",
	            GT_EQ: "≥",
	            LT_EQ: "≤",
	            THEREFORE: "⌠",
	            SINCE: "∵",
	            DOESNOT_EXIST: "∄",
	            EXISTS: "∃",
	            FOR_ALL: "∀",
	            EXCLUSIVE_OR: "⊕",
	            BECAUSE: "⌡",
	            DIVIDE: "÷",
	            APPROX: "≈",
	            DEGREE: "°",
	            BOLD_DOT: "∙",
	            DOT_SMALL: "·",
	            CHECK: "√",
	            ITALIC_X: "✗",
	            SUPER_N: "ⁿ",
	            SQUARED: "²",
	            CUBED: "³",
	            SOLID_BOX: "■",
	            PERMILE: "‰",
	            REGISTERED_TM: "®",
	            COPYRIGHT: "©",
	            TRADEMARK: "™",
	            BETA: "β",
	            GAMMA: "γ",
	            ZETA: "ζ",
	            ETA: "η",
	            IOTA: "ι",
	            KAPPA: "κ",
	            LAMBDA: "λ",
	            NU: "ν",
	            XI: "ξ",
	            OMICRON: "ο",
	            RHO: "ρ",
	            UPSILON: "υ",
	            CHI_LOWER: "φ",
	            CHI_UPPER: "χ",
	            PSI: "ψ",
	            ALPHA: "α",
	            ESZETT: "ß",
	            PI: "π",
	            SIGMA_UPPER: "Σ",
	            SIGMA_LOWER: "σ",
	            MU: "µ",
	            TAU: "τ",
	            THETA: "Θ",
	            OMEGA: "Ω",
	            DELTA: "δ",
	            PHI_LOWER: "φ",
	            EPSILON: "ε"
	        };

	        function pad(string, length, ch, end) {
	            string = "" + string; //check for numbers
	            ch = ch || " ";
	            var strLen = string.length;
	            while (strLen < length) {
	                if (end) {
	                    string += ch;
	                } else {
	                    string = ch + string;
	                }
	                strLen++;
	            }
	            return string;
	        }

	        function truncate(string, length, end) {
	            var ret = string;
	            if (is.isString(ret)) {
	                if (string.length > length) {
	                    if (end) {
	                        var l = string.length;
	                        ret = string.substring(l - length, l);
	                    } else {
	                        ret = string.substring(0, length);
	                    }
	                }
	            } else {
	                ret = truncate("" + ret, length);
	            }
	            return ret;
	        }

	        function format(str, obj) {
	            if (obj instanceof Array) {
	                var i = 0, len = obj.length;
	                //find the matches
	                return str.replace(FORMAT_REGEX, function (m, format, type) {
	                    var replacer, ret;
	                    if (i < len) {
	                        replacer = obj[i++];
	                    } else {
	                        //we are out of things to replace with so
	                        //just return the match?
	                        return m;
	                    }
	                    if (m === "%s" || m === "%d" || m === "%D") {
	                        //fast path!
	                        ret = replacer + "";
	                    } else if (m === "%Z") {
	                        ret = replacer.toUTCString();
	                    } else if (m === "%j") {
	                        try {
	                            ret = stringify(replacer);
	                        } catch (e) {
	                            throw new Error("stringExtended.format : Unable to parse json from ", replacer);
	                        }
	                    } else {
	                        format = format.replace(/^\[|\]$/g, "");
	                        switch (type) {
	                        case "s":
	                            ret = formatString(replacer, format);
	                            break;
	                        case "d":
	                            ret = formatNumber(replacer, format);
	                            break;
	                        case "j":
	                            ret = formatObject(replacer, format);
	                            break;
	                        case "D":
	                            ret = date.format(replacer, format);
	                            break;
	                        case "Z":
	                            ret = date.format(replacer, format, true);
	                            break;
	                        }
	                    }
	                    return ret;
	                });
	            } else if (isHash(obj)) {
	                return str.replace(INTERP_REGEX, function (m, format, value) {
	                    value = obj[value];
	                    if (!is.isUndefined(value)) {
	                        if (format) {
	                            if (is.isString(value)) {
	                                return formatString(value, format);
	                            } else if (is.isNumber(value)) {
	                                return formatNumber(value, format);
	                            } else if (is.isDate(value)) {
	                                return date.format(value, format);
	                            } else if (is.isObject(value)) {
	                                return formatObject(value, format);
	                            }
	                        } else {
	                            return "" + value;
	                        }
	                    }
	                    return m;
	                });
	            } else {
	                var args = aSlice.call(arguments).slice(1);
	                return format(str, args);
	            }
	        }

	        function toArray(testStr, delim) {
	            var ret = [];
	            if (testStr) {
	                if (testStr.indexOf(delim) > 0) {
	                    ret = testStr.replace(/\s+/g, "").split(delim);
	                }
	                else {
	                    ret.push(testStr);
	                }
	            }
	            return ret;
	        }

	        function multiply(str, times) {
	            var ret = [];
	            if (times) {
	                for (var i = 0; i < times; i++) {
	                    ret.push(str);
	                }
	            }
	            return ret.join("");
	        }


	        function style(str, options) {
	            var ret, i, l;
	            if (options) {
	                if (is.isArray(str)) {
	                    ret = [];
	                    for (i = 0, l = str.length; i < l; i++) {
	                        ret.push(style(str[i], options));
	                    }
	                } else if (options instanceof Array) {
	                    ret = str;
	                    for (i = 0, l = options.length; i < l; i++) {
	                        ret = style(ret, options[i]);
	                    }
	                } else if (options in styles) {
	                    ret = '\x1B[' + styles[options] + 'm' + str + '\x1B[0m';
	                }
	            }
	            return ret;
	        }

	        function escape(str, except) {
	            return str.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, function (ch) {
	                if (except && arr.indexOf(except, ch) !== -1) {
	                    return ch;
	                }
	                return "\\" + ch;
	            });
	        }

	        function trim(str) {
	            return str.replace(/^\s*|\s*$/g, "");
	        }

	        function trimLeft(str) {
	            return str.replace(/^\s*/, "");
	        }

	        function trimRight(str) {
	            return str.replace(/\s*$/, "");
	        }

	        function isEmpty(str) {
	            return str.length === 0;
	        }


	        var string = {
	            toArray: toArray,
	            pad: pad,
	            truncate: truncate,
	            multiply: multiply,
	            format: format,
	            style: style,
	            escape: escape,
	            trim: trim,
	            trimLeft: trimLeft,
	            trimRight: trimRight,
	            isEmpty: isEmpty
	        };
	        return extended.define(is.isString, string).define(is.isArray, {style: style}).expose(string).expose({characters: characters});
	    }

	    if (true) {
	        if ("undefined" !== typeof module && module.exports) {
	            module.exports = defineString(__webpack_require__(7), __webpack_require__(12), __webpack_require__(18), __webpack_require__(6));

	        }
	    } else if ("function" === typeof define && define.amd) {
	        define(["extended", "is-extended", "date-extended", "array-extended"], function (extended, is, date, arr) {
	            return defineString(extended, is, date, arr);
	        });
	    } else {
	        this.stringExtended = defineString(this.extended, this.isExtended, this.dateExtended, this.arrayExtended);
	    }

	}).call(this);








/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate, process) {(function () {
	    "use strict";
	    /*global setImmediate, MessageChannel*/


	    function definePromise(declare, extended, array, is, fn, args) {

	        var forEach = array.forEach,
	            isUndefinedOrNull = is.isUndefinedOrNull,
	            isArray = is.isArray,
	            isFunction = is.isFunction,
	            isBoolean = is.isBoolean,
	            bind = fn.bind,
	            bindIgnore = fn.bindIgnore,
	            argsToArray = args.argsToArray;

	        function createHandler(fn, promise) {
	            return function _handler() {
	                try {
	                    when(fn.apply(null, arguments))
	                        .addCallback(promise)
	                        .addErrback(promise);
	                } catch (e) {
	                    promise.errback(e);
	                }
	            };
	        }

	        var nextTick;
	        if (typeof setImmediate === "function") {
	            // In IE10, or use https://github.com/NobleJS/setImmediate
	            if (typeof window !== "undefined") {
	                nextTick = setImmediate.bind(window);
	            } else {
	                nextTick = setImmediate;
	            }
	        } else if (typeof process !== "undefined") {
	            // node
	            nextTick = function (cb) {
	                process.nextTick(cb);
	            };
	        } else if (typeof MessageChannel !== "undefined") {
	            // modern browsers
	            // http://www.nonblocking.io/2011/06/windownexttick.html
	            var channel = new MessageChannel();
	            // linked list of tasks (single, with head node)
	            var head = {}, tail = head;
	            channel.port1.onmessage = function () {
	                head = head.next;
	                var task = head.task;
	                delete head.task;
	                task();
	            };
	            nextTick = function (task) {
	                tail = tail.next = {task: task};
	                channel.port2.postMessage(0);
	            };
	        } else {
	            // old browsers
	            nextTick = function (task) {
	                setTimeout(task, 0);
	            };
	        }


	        //noinspection JSHint
	        var Promise = declare({
	            instance: {
	                __fired: false,

	                __results: null,

	                __error: null,

	                __errorCbs: null,

	                __cbs: null,

	                constructor: function () {
	                    this.__errorCbs = [];
	                    this.__cbs = [];
	                    fn.bindAll(this, ["callback", "errback", "resolve", "classic", "__resolve", "addCallback", "addErrback"]);
	                },

	                __resolve: function () {
	                    if (!this.__fired) {
	                        this.__fired = true;
	                        var cbs = this.__error ? this.__errorCbs : this.__cbs,
	                            len = cbs.length, i,
	                            results = this.__error || this.__results;
	                        for (i = 0; i < len; i++) {
	                            this.__callNextTick(cbs[i], results);
	                        }

	                    }
	                },

	                __callNextTick: function (cb, results) {
	                    nextTick(function () {
	                        cb.apply(this, results);
	                    });
	                },

	                addCallback: function (cb) {
	                    if (cb) {
	                        if (isPromiseLike(cb) && cb.callback) {
	                            cb = cb.callback;
	                        }
	                        if (this.__fired && this.__results) {
	                            this.__callNextTick(cb, this.__results);
	                        } else {
	                            this.__cbs.push(cb);
	                        }
	                    }
	                    return this;
	                },


	                addErrback: function (cb) {
	                    if (cb) {
	                        if (isPromiseLike(cb) && cb.errback) {
	                            cb = cb.errback;
	                        }
	                        if (this.__fired && this.__error) {
	                            this.__callNextTick(cb, this.__error);
	                        } else {
	                            this.__errorCbs.push(cb);
	                        }
	                    }
	                    return this;
	                },

	                callback: function (args) {
	                    if (!this.__fired) {
	                        this.__results = arguments;
	                        this.__resolve();
	                    }
	                    return this.promise();
	                },

	                errback: function (args) {
	                    if (!this.__fired) {
	                        this.__error = arguments;
	                        this.__resolve();
	                    }
	                    return this.promise();
	                },

	                resolve: function (err, args) {
	                    if (err) {
	                        this.errback(err);
	                    } else {
	                        this.callback.apply(this, argsToArray(arguments, 1));
	                    }
	                    return this;
	                },

	                classic: function (cb) {
	                    if ("function" === typeof cb) {
	                        this.addErrback(function (err) {
	                            cb(err);
	                        });
	                        this.addCallback(function () {
	                            cb.apply(this, [null].concat(argsToArray(arguments)));
	                        });
	                    }
	                    return this;
	                },

	                then: function (callback, errback) {

	                    var promise = new Promise(), errorHandler = promise;
	                    if (isFunction(errback)) {
	                        errorHandler = createHandler(errback, promise);
	                    }
	                    this.addErrback(errorHandler);
	                    if (isFunction(callback)) {
	                        this.addCallback(createHandler(callback, promise));
	                    } else {
	                        this.addCallback(promise);
	                    }

	                    return promise.promise();
	                },

	                both: function (callback) {
	                    return this.then(callback, callback);
	                },

	                promise: function () {
	                    var ret = {
	                        then: bind(this, "then"),
	                        both: bind(this, "both"),
	                        promise: function () {
	                            return ret;
	                        }
	                    };
	                    forEach(["addCallback", "addErrback", "classic"], function (action) {
	                        ret[action] = bind(this, function () {
	                            this[action].apply(this, arguments);
	                            return ret;
	                        });
	                    }, this);

	                    return ret;
	                }


	            }
	        });


	        var PromiseList = Promise.extend({
	            instance: {

	                /*@private*/
	                __results: null,

	                /*@private*/
	                __errors: null,

	                /*@private*/
	                __promiseLength: 0,

	                /*@private*/
	                __defLength: 0,

	                /*@private*/
	                __firedLength: 0,

	                normalizeResults: false,

	                constructor: function (defs, normalizeResults) {
	                    this.__errors = [];
	                    this.__results = [];
	                    this.normalizeResults = isBoolean(normalizeResults) ? normalizeResults : false;
	                    this._super(arguments);
	                    if (defs && defs.length) {
	                        this.__defLength = defs.length;
	                        forEach(defs, this.__addPromise, this);
	                    } else {
	                        this.__resolve();
	                    }
	                },

	                __addPromise: function (promise, i) {
	                    promise.then(
	                        bind(this, function () {
	                            var args = argsToArray(arguments);
	                            args.unshift(i);
	                            this.callback.apply(this, args);
	                        }),
	                        bind(this, function () {
	                            var args = argsToArray(arguments);
	                            args.unshift(i);
	                            this.errback.apply(this, args);
	                        })
	                    );
	                },

	                __resolve: function () {
	                    if (!this.__fired) {
	                        this.__fired = true;
	                        var cbs = this.__errors.length ? this.__errorCbs : this.__cbs,
	                            len = cbs.length, i,
	                            results = this.__errors.length ? this.__errors : this.__results;
	                        for (i = 0; i < len; i++) {
	                            this.__callNextTick(cbs[i], results);
	                        }

	                    }
	                },

	                __callNextTick: function (cb, results) {
	                    nextTick(function () {
	                        cb.apply(null, [results]);
	                    });
	                },

	                addCallback: function (cb) {
	                    if (cb) {
	                        if (isPromiseLike(cb) && cb.callback) {
	                            cb = bind(cb, "callback");
	                        }
	                        if (this.__fired && !this.__errors.length) {
	                            this.__callNextTick(cb, this.__results);
	                        } else {
	                            this.__cbs.push(cb);
	                        }
	                    }
	                    return this;
	                },

	                addErrback: function (cb) {
	                    if (cb) {
	                        if (isPromiseLike(cb) && cb.errback) {
	                            cb = bind(cb, "errback");
	                        }
	                        if (this.__fired && this.__errors.length) {
	                            this.__callNextTick(cb, this.__errors);
	                        } else {
	                            this.__errorCbs.push(cb);
	                        }
	                    }
	                    return this;
	                },


	                callback: function (i) {
	                    if (this.__fired) {
	                        throw new Error("Already fired!");
	                    }
	                    var args = argsToArray(arguments);
	                    if (this.normalizeResults) {
	                        args = args.slice(1);
	                        args = args.length === 1 ? args.pop() : args;
	                    }
	                    this.__results[i] = args;
	                    this.__firedLength++;
	                    if (this.__firedLength === this.__defLength) {
	                        this.__resolve();
	                    }
	                    return this.promise();
	                },


	                errback: function (i) {
	                    if (this.__fired) {
	                        throw new Error("Already fired!");
	                    }
	                    var args = argsToArray(arguments);
	                    if (this.normalizeResults) {
	                        args = args.slice(1);
	                        args = args.length === 1 ? args.pop() : args;
	                    }
	                    this.__errors[i] = args;
	                    this.__firedLength++;
	                    if (this.__firedLength === this.__defLength) {
	                        this.__resolve();
	                    }
	                    return this.promise();
	                }

	            }
	        });


	        function callNext(list, results, propogate) {
	            var ret = new Promise().callback();
	            forEach(list, function (listItem) {
	                ret = ret.then(propogate ? listItem : bindIgnore(null, listItem));
	                if (!propogate) {
	                    ret = ret.then(function (res) {
	                        results.push(res);
	                        return results;
	                    });
	                }
	            });
	            return ret;
	        }

	        function isPromiseLike(obj) {
	            return !isUndefinedOrNull(obj) && (isFunction(obj.then));
	        }

	        function wrapThenPromise(p) {
	            var ret = new Promise();
	            p.then(bind(ret, "callback"), bind(ret, "errback"));
	            return  ret.promise();
	        }

	        function when(args) {
	            var p;
	            args = argsToArray(arguments);
	            if (!args.length) {
	                p = new Promise().callback(args).promise();
	            } else if (args.length === 1) {
	                args = args.pop();
	                if (isPromiseLike(args)) {
	                    if (args.addCallback && args.addErrback) {
	                        p = new Promise();
	                        args.addCallback(p.callback);
	                        args.addErrback(p.errback);
	                    } else {
	                        p = wrapThenPromise(args);
	                    }
	                } else if (isArray(args) && array.every(args, isPromiseLike)) {
	                    p = new PromiseList(args, true).promise();
	                } else {
	                    p = new Promise().callback(args);
	                }
	            } else {
	                p = new PromiseList(array.map(args, function (a) {
	                    return when(a);
	                }), true).promise();
	            }
	            return p;

	        }

	        function wrap(fn, scope) {
	            return function _wrap() {
	                var ret = new Promise();
	                var args = argsToArray(arguments);
	                args.push(ret.resolve);
	                fn.apply(scope || this, args);
	                return ret.promise();
	            };
	        }

	        function serial(list) {
	            if (isArray(list)) {
	                return callNext(list, [], false);
	            } else {
	                throw new Error("When calling promise.serial the first argument must be an array");
	            }
	        }


	        function chain(list) {
	            if (isArray(list)) {
	                return callNext(list, [], true);
	            } else {
	                throw new Error("When calling promise.serial the first argument must be an array");
	            }
	        }


	        function wait(args, fn) {
	            args = argsToArray(arguments);
	            var resolved = false;
	            fn = args.pop();
	            var p = when(args);
	            return function waiter() {
	                if (!resolved) {
	                    args = arguments;
	                    return p.then(bind(this, function doneWaiting() {
	                        resolved = true;
	                        return fn.apply(this, args);
	                    }));
	                } else {
	                    return when(fn.apply(this, arguments));
	                }
	            };
	        }

	        function createPromise() {
	            return new Promise();
	        }

	        function createPromiseList(promises) {
	            return new PromiseList(promises, true).promise();
	        }

	        function createRejected(val) {
	            return createPromise().errback(val);
	        }

	        function createResolved(val) {
	            return createPromise().callback(val);
	        }


	        return extended
	            .define({
	                isPromiseLike: isPromiseLike
	            }).expose({
	                isPromiseLike: isPromiseLike,
	                when: when,
	                wrap: wrap,
	                wait: wait,
	                serial: serial,
	                chain: chain,
	                Promise: Promise,
	                PromiseList: PromiseList,
	                promise: createPromise,
	                defer: createPromise,
	                deferredList: createPromiseList,
	                reject: createRejected,
	                resolve: createResolved
	            });

	    }

	    if (true) {
	        if ("undefined" !== typeof module && module.exports) {
	            module.exports = definePromise(__webpack_require__(10), __webpack_require__(7), __webpack_require__(6), __webpack_require__(12), __webpack_require__(24), __webpack_require__(17));
	        }
	    } else if ("function" === typeof define && define.amd) {
	        define(["declare", "extended", "array-extended", "is-extended", "function-extended", "arguments-extended"], function (declare, extended, array, is, fn, args) {
	            return definePromise(declare, extended, array, is, fn, args);
	        });
	    } else {
	        this.promiseExtended = definePromise(this.declare, this.extended, this.arrayExtended, this.isExtended, this.functionExtended, this.argumentsExtended);
	    }

	}).call(this);







	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(22).setImmediate, __webpack_require__(23)))

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate, clearImmediate) {var nextTick = __webpack_require__(23).nextTick;
	var apply = Function.prototype.apply;
	var slice = Array.prototype.slice;
	var immediateIds = {};
	var nextImmediateId = 0;

	// DOM APIs, for completeness

	exports.setTimeout = function() {
	  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
	};
	exports.setInterval = function() {
	  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
	};
	exports.clearTimeout =
	exports.clearInterval = function(timeout) { timeout.close(); };

	function Timeout(id, clearFn) {
	  this._id = id;
	  this._clearFn = clearFn;
	}
	Timeout.prototype.unref = Timeout.prototype.ref = function() {};
	Timeout.prototype.close = function() {
	  this._clearFn.call(window, this._id);
	};

	// Does not start the time, just sets up the members needed.
	exports.enroll = function(item, msecs) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = msecs;
	};

	exports.unenroll = function(item) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = -1;
	};

	exports._unrefActive = exports.active = function(item) {
	  clearTimeout(item._idleTimeoutId);

	  var msecs = item._idleTimeout;
	  if (msecs >= 0) {
	    item._idleTimeoutId = setTimeout(function onTimeout() {
	      if (item._onTimeout)
	        item._onTimeout();
	    }, msecs);
	  }
	};

	// That's not how node.js implements it but the exposed api is the same.
	exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
	  var id = nextImmediateId++;
	  var args = arguments.length < 2 ? false : slice.call(arguments, 1);

	  immediateIds[id] = true;

	  nextTick(function onNextTick() {
	    if (immediateIds[id]) {
	      // fn.call() is faster so we optimize for the common use-case
	      // @see http://jsperf.com/call-apply-segu
	      if (args) {
	        fn.apply(null, args);
	      } else {
	        fn.call(null);
	      }
	      // Prevent ids from leaking
	      exports.clearImmediate(id);
	    }
	  });

	  return id;
	};

	exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
	  delete immediateIds[id];
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(22).setImmediate, __webpack_require__(22).clearImmediate))

/***/ },
/* 23 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	(function () {
	    "use strict";

	    function defineFunction(extended, is, args) {

	        var isArray = is.isArray,
	            isObject = is.isObject,
	            isString = is.isString,
	            isFunction = is.isFunction,
	            argsToArray = args.argsToArray;

	        function spreadArgs(f, args, scope) {
	            var ret;
	            switch ((args || []).length) {
	            case 0:
	                ret = f.call(scope);
	                break;
	            case 1:
	                ret = f.call(scope, args[0]);
	                break;
	            case 2:
	                ret = f.call(scope, args[0], args[1]);
	                break;
	            case 3:
	                ret = f.call(scope, args[0], args[1], args[2]);
	                break;
	            default:
	                ret = f.apply(scope, args);
	            }
	            return ret;
	        }

	        function hitch(scope, method, args) {
	            args = argsToArray(arguments, 2);
	            if ((isString(method) && !(method in scope))) {
	                throw new Error(method + " property not defined in scope");
	            } else if (!isString(method) && !isFunction(method)) {
	                throw new Error(method + " is not a function");
	            }
	            if (isString(method)) {
	                return function () {
	                    var func = scope[method];
	                    if (isFunction(func)) {
	                        return spreadArgs(func, args.concat(argsToArray(arguments)), scope);
	                    } else {
	                        return func;
	                    }
	                };
	            } else {
	                if (args.length) {
	                    return function () {
	                        return spreadArgs(method, args.concat(argsToArray(arguments)), scope);
	                    };
	                } else {

	                    return function () {
	                        return spreadArgs(method, arguments, scope);
	                    };
	                }
	            }
	        }


	        function applyFirst(method, args) {
	            args = argsToArray(arguments, 1);
	            if (!isString(method) && !isFunction(method)) {
	                throw new Error(method + " must be the name of a property or function to execute");
	            }
	            if (isString(method)) {
	                return function () {
	                    var scopeArgs = argsToArray(arguments), scope = scopeArgs.shift();
	                    var func = scope[method];
	                    if (isFunction(func)) {
	                        scopeArgs = args.concat(scopeArgs);
	                        return spreadArgs(func, scopeArgs, scope);
	                    } else {
	                        return func;
	                    }
	                };
	            } else {
	                return function () {
	                    var scopeArgs = argsToArray(arguments), scope = scopeArgs.shift();
	                    scopeArgs = args.concat(scopeArgs);
	                    return spreadArgs(method, scopeArgs, scope);
	                };
	            }
	        }


	        function hitchIgnore(scope, method, args) {
	            args = argsToArray(arguments, 2);
	            if ((isString(method) && !(method in scope))) {
	                throw new Error(method + " property not defined in scope");
	            } else if (!isString(method) && !isFunction(method)) {
	                throw new Error(method + " is not a function");
	            }
	            if (isString(method)) {
	                return function () {
	                    var func = scope[method];
	                    if (isFunction(func)) {
	                        return spreadArgs(func, args, scope);
	                    } else {
	                        return func;
	                    }
	                };
	            } else {
	                return function () {
	                    return spreadArgs(method, args, scope);
	                };
	            }
	        }


	        function hitchAll(scope) {
	            var funcs = argsToArray(arguments, 1);
	            if (!isObject(scope) && !isFunction(scope)) {
	                throw new TypeError("scope must be an object");
	            }
	            if (funcs.length === 1 && isArray(funcs[0])) {
	                funcs = funcs[0];
	            }
	            if (!funcs.length) {
	                funcs = [];
	                for (var k in scope) {
	                    if (scope.hasOwnProperty(k) && isFunction(scope[k])) {
	                        funcs.push(k);
	                    }
	                }
	            }
	            for (var i = 0, l = funcs.length; i < l; i++) {
	                scope[funcs[i]] = hitch(scope, scope[funcs[i]]);
	            }
	            return scope;
	        }


	        function partial(method, args) {
	            args = argsToArray(arguments, 1);
	            if (!isString(method) && !isFunction(method)) {
	                throw new Error(method + " must be the name of a property or function to execute");
	            }
	            if (isString(method)) {
	                return function () {
	                    var func = this[method];
	                    if (isFunction(func)) {
	                        var scopeArgs = args.concat(argsToArray(arguments));
	                        return spreadArgs(func, scopeArgs, this);
	                    } else {
	                        return func;
	                    }
	                };
	            } else {
	                return function () {
	                    var scopeArgs = args.concat(argsToArray(arguments));
	                    return spreadArgs(method, scopeArgs, this);
	                };
	            }
	        }

	        function curryFunc(f, execute) {
	            return function () {
	                var args = argsToArray(arguments);
	                return execute ? spreadArgs(f, arguments, this) : function () {
	                    return spreadArgs(f, args.concat(argsToArray(arguments)), this);
	                };
	            };
	        }


	        function curry(depth, cb, scope) {
	            var f;
	            if (scope) {
	                f = hitch(scope, cb);
	            } else {
	                f = cb;
	            }
	            if (depth) {
	                var len = depth - 1;
	                for (var i = len; i >= 0; i--) {
	                    f = curryFunc(f, i === len);
	                }
	            }
	            return f;
	        }

	        return extended
	            .define(isObject, {
	                bind: hitch,
	                bindAll: hitchAll,
	                bindIgnore: hitchIgnore,
	                curry: function (scope, depth, fn) {
	                    return curry(depth, fn, scope);
	                }
	            })
	            .define(isFunction, {
	                bind: function (fn, obj) {
	                    return spreadArgs(hitch, [obj, fn].concat(argsToArray(arguments, 2)), this);
	                },
	                bindIgnore: function (fn, obj) {
	                    return spreadArgs(hitchIgnore, [obj, fn].concat(argsToArray(arguments, 2)), this);
	                },
	                partial: partial,
	                applyFirst: applyFirst,
	                curry: function (fn, num, scope) {
	                    return curry(num, fn, scope);
	                },
	                noWrap: {
	                    f: function () {
	                        return this.value();
	                    }
	                }
	            })
	            .define(isString, {
	                bind: function (str, scope) {
	                    return hitch(scope, str);
	                },
	                bindIgnore: function (str, scope) {
	                    return hitchIgnore(scope, str);
	                },
	                partial: partial,
	                applyFirst: applyFirst,
	                curry: function (fn, depth, scope) {
	                    return curry(depth, fn, scope);
	                }
	            })
	            .expose({
	                bind: hitch,
	                bindAll: hitchAll,
	                bindIgnore: hitchIgnore,
	                partial: partial,
	                applyFirst: applyFirst,
	                curry: curry
	            });

	    }

	    if (true) {
	        if ("undefined" !== typeof module && module.exports) {
	            module.exports = defineFunction(__webpack_require__(7), __webpack_require__(12), __webpack_require__(17));

	        }
	    } else if ("function" === typeof define && define.amd) {
	        define(["extended", "is-extended", "arguments-extended"], function (extended, is, args) {
	            return defineFunction(extended, is, args);
	        });
	    } else {
	        this.functionExtended = defineFunction(this.extended, this.isExtended, this.argumentsExtended);
	    }

	}).call(this);








/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	(function () {
	    "use strict";

	    function defineHt(_) {


	        var hashFunction = function (key) {
	            if (typeof key === "string") {
	                return key;
	            } else if (typeof key === "object") {
	                return  key.hashCode ? key.hashCode() : "" + key;
	            } else {
	                return "" + key;
	            }
	        };

	        var Bucket = _.declare({

	            instance: {

	                constructor: function () {
	                    this.__entries = [];
	                    this.__keys = [];
	                    this.__values = [];
	                },

	                pushValue: function (key, value) {
	                    this.__keys.push(key);
	                    this.__values.push(value);
	                    this.__entries.push({key: key, value: value});
	                    return value;
	                },

	                remove: function (key) {
	                    var ret = null, map = this.__entries, val, keys = this.__keys, vals = this.__values;
	                    var i = map.length - 1;
	                    for (; i >= 0; i--) {
	                        if (!!(val = map[i]) && val.key === key) {
	                            map.splice(i, 1);
	                            keys.splice(i, 1);
	                            vals.splice(i, 1);
	                            return val.value;
	                        }
	                    }
	                    return ret;
	                },

	                "set": function (key, value) {
	                    var ret = null, map = this.__entries, vals = this.__values;
	                    var i = map.length - 1;
	                    for (; i >= 0; i--) {
	                        var val = map[i];
	                        if (val && key === val.key) {
	                            vals[i] = value;
	                            val.value = value;
	                            ret = value;
	                            break;
	                        }
	                    }
	                    if (!ret) {
	                        map.push({key: key, value: value});
	                    }
	                    return ret;
	                },

	                find: function (key) {
	                    var ret = null, map = this.__entries, val;
	                    var i = map.length - 1;
	                    for (; i >= 0; i--) {
	                        val = map[i];
	                        if (val && key === val.key) {
	                            ret = val.value;
	                            break;
	                        }
	                    }
	                    return ret;
	                },

	                getEntrySet: function () {
	                    return this.__entries;
	                },

	                getKeys: function () {
	                    return this.__keys;
	                },

	                getValues: function (arr) {
	                    return this.__values;
	                }
	            }
	        });

	        return _.declare({

	            instance: {

	                constructor: function () {
	                    this.__map = {};
	                },

	                entrySet: function () {
	                    var ret = [], map = this.__map;
	                    for (var i in map) {
	                        if (map.hasOwnProperty(i)) {
	                            ret = ret.concat(map[i].getEntrySet());
	                        }
	                    }
	                    return ret;
	                },

	                put: function (key, value) {
	                    var hash = hashFunction(key);
	                    var bucket = null;
	                    if (!(bucket = this.__map[hash])) {
	                        bucket = (this.__map[hash] = new Bucket());
	                    }
	                    bucket.pushValue(key, value);
	                    return value;
	                },

	                remove: function (key) {
	                    var hash = hashFunction(key), ret = null;
	                    var bucket = this.__map[hash];
	                    if (bucket) {
	                        ret = bucket.remove(key);
	                    }
	                    return ret;
	                },

	                "get": function (key) {
	                    var hash = hashFunction(key), ret = null, bucket;
	                    if (!!(bucket = this.__map[hash])) {
	                        ret = bucket.find(key);
	                    }
	                    return ret;
	                },

	                "set": function (key, value) {
	                    var hash = hashFunction(key), ret = null, bucket = null, map = this.__map;
	                    if (!!(bucket = map[hash])) {
	                        ret = bucket.set(key, value);
	                    } else {
	                        ret = (map[hash] = new Bucket()).pushValue(key, value);
	                    }
	                    return ret;
	                },

	                contains: function (key) {
	                    var hash = hashFunction(key), ret = false, bucket = null;
	                    if (!!(bucket = this.__map[hash])) {
	                        ret = !!(bucket.find(key));
	                    }
	                    return ret;
	                },

	                concat: function (hashTable) {
	                    if (hashTable instanceof this._static) {
	                        var ret = new this._static();
	                        var otherEntrySet = hashTable.entrySet().concat(this.entrySet());
	                        for (var i = otherEntrySet.length - 1; i >= 0; i--) {
	                            var e = otherEntrySet[i];
	                            ret.put(e.key, e.value);
	                        }
	                        return ret;
	                    } else {
	                        throw new TypeError("When joining hashtables the joining arg must be a HashTable");
	                    }
	                },

	                filter: function (cb, scope) {
	                    var es = this.entrySet(), ret = new this._static();
	                    es = _.filter(es, cb, scope);
	                    for (var i = es.length - 1; i >= 0; i--) {
	                        var e = es[i];
	                        ret.put(e.key, e.value);
	                    }
	                    return ret;
	                },

	                forEach: function (cb, scope) {
	                    var es = this.entrySet();
	                    _.forEach(es, cb, scope);
	                },

	                every: function (cb, scope) {
	                    var es = this.entrySet();
	                    return _.every(es, cb, scope);
	                },

	                map: function (cb, scope) {
	                    var es = this.entrySet();
	                    return _.map(es, cb, scope);
	                },

	                some: function (cb, scope) {
	                    var es = this.entrySet();
	                    return _.some(es, cb, scope);
	                },

	                reduce: function (cb, scope) {
	                    var es = this.entrySet();
	                    return _.reduce(es, cb, scope);
	                },

	                reduceRight: function (cb, scope) {
	                    var es = this.entrySet();
	                    return _.reduceRight(es, cb, scope);
	                },

	                clear: function () {
	                    this.__map = {};
	                },

	                keys: function () {
	                    var ret = [], map = this.__map;
	                    for (var i in map) {
	                        //if (map.hasOwnProperty(i)) {
	                        ret = ret.concat(map[i].getKeys());
	                        //}
	                    }
	                    return ret;
	                },

	                values: function () {
	                    var ret = [], map = this.__map;
	                    for (var i in map) {
	                        //if (map.hasOwnProperty(i)) {
	                        ret = ret.concat(map[i].getValues());
	                        //}
	                    }
	                    return ret;
	                },

	                isEmpty: function () {
	                    return this.keys().length === 0;
	                }
	            }

	        });


	    }

	    if (true) {
	        if ("undefined" !== typeof module && module.exports) {
	            module.exports = defineHt(__webpack_require__(7)().register("declare", __webpack_require__(10)).register(__webpack_require__(12)).register(__webpack_require__(6)));

	        }
	    } else if ("function" === typeof define) {
	        define(["extended", "declare", "is-extended", "array-extended"], function (extended, declare, is, array) {
	            return defineHt(extended().register("declare", declare).register(is).register(array));
	        });
	    } else {
	        this.Ht = defineHt(this.extended().register("declare", this.declare).register(this.isExtended).register(this.arrayExtended));
	    }

	}).call(this);








/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	(function () {
	    "use strict";

	    function defineLeafy(_) {

	        function compare(a, b) {
	            var ret = 0;
	            if (a > b) {
	                return 1;
	            } else if (a < b) {
	                return -1;
	            } else if (!b) {
	                return 1;
	            }
	            return ret;
	        }

	        var multiply = _.multiply;

	        var Tree = _.declare({

	            instance: {

	                /**
	                 * Prints a node
	                 * @param node node to print
	                 * @param level the current level the node is at, Used for formatting
	                 */
	                __printNode: function (node, level) {
	                    //console.log(level);
	                    var str = [];
	                    if (_.isUndefinedOrNull(node)) {
	                        str.push(multiply('\t', level));
	                        str.push("~");
	                        console.log(str.join(""));
	                    } else {
	                        this.__printNode(node.right, level + 1);
	                        str.push(multiply('\t', level));
	                        str.push(node.data + "\n");
	                        console.log(str.join(""));
	                        this.__printNode(node.left, level + 1);
	                    }
	                },

	                constructor: function (options) {
	                    options = options || {};
	                    this.compare = options.compare || compare;
	                    this.__root = null;
	                },

	                insert: function () {
	                    throw new Error("Not Implemented");
	                },

	                remove: function () {
	                    throw new Error("Not Implemented");
	                },

	                clear: function () {
	                    this.__root = null;
	                },

	                isEmpty: function () {
	                    return !(this.__root);
	                },

	                traverseWithCondition: function (node, order, callback) {
	                    var cont = true;
	                    if (node) {
	                        order = order || Tree.PRE_ORDER;
	                        if (order === Tree.PRE_ORDER) {
	                            cont = callback(node.data);
	                            if (cont) {
	                                cont = this.traverseWithCondition(node.left, order, callback);
	                                if (cont) {
	                                    cont = this.traverseWithCondition(node.right, order, callback);
	                                }

	                            }
	                        } else if (order === Tree.IN_ORDER) {
	                            cont = this.traverseWithCondition(node.left, order, callback);
	                            if (cont) {
	                                cont = callback(node.data);
	                                if (cont) {
	                                    cont = this.traverseWithCondition(node.right, order, callback);
	                                }
	                            }
	                        } else if (order === Tree.POST_ORDER) {
	                            cont = this.traverseWithCondition(node.left, order, callback);
	                            if (cont) {
	                                if (cont) {
	                                    cont = this.traverseWithCondition(node.right, order, callback);
	                                }
	                                if (cont) {
	                                    cont = callback(node.data);
	                                }
	                            }
	                        } else if (order === Tree.REVERSE_ORDER) {
	                            cont = this.traverseWithCondition(node.right, order, callback);
	                            if (cont) {
	                                cont = callback(node.data);
	                                if (cont) {
	                                    cont = this.traverseWithCondition(node.left, order, callback);
	                                }
	                            }
	                        }
	                    }
	                    return cont;
	                },

	                traverse: function (node, order, callback) {
	                    if (node) {
	                        order = order || Tree.PRE_ORDER;
	                        if (order === Tree.PRE_ORDER) {
	                            callback(node.data);
	                            this.traverse(node.left, order, callback);
	                            this.traverse(node.right, order, callback);
	                        } else if (order === Tree.IN_ORDER) {
	                            this.traverse(node.left, order, callback);
	                            callback(node.data);
	                            this.traverse(node.right, order, callback);
	                        } else if (order === Tree.POST_ORDER) {
	                            this.traverse(node.left, order, callback);
	                            this.traverse(node.right, order, callback);
	                            callback(node.data);
	                        } else if (order === Tree.REVERSE_ORDER) {
	                            this.traverse(node.right, order, callback);
	                            callback(node.data);
	                            this.traverse(node.left, order, callback);

	                        }
	                    }
	                },

	                forEach: function (cb, scope, order) {
	                    if (typeof cb !== "function") {
	                        throw new TypeError();
	                    }
	                    order = order || Tree.IN_ORDER;
	                    scope = scope || this;
	                    this.traverse(this.__root, order, function (node) {
	                        cb.call(scope, node, this);
	                    });
	                },

	                map: function (cb, scope, order) {
	                    if (typeof cb !== "function") {
	                        throw new TypeError();
	                    }

	                    order = order || Tree.IN_ORDER;
	                    scope = scope || this;
	                    var ret = new this._static();
	                    this.traverse(this.__root, order, function (node) {
	                        ret.insert(cb.call(scope, node, this));
	                    });
	                    return ret;
	                },

	                filter: function (cb, scope, order) {
	                    if (typeof cb !== "function") {
	                        throw new TypeError();
	                    }

	                    order = order || Tree.IN_ORDER;
	                    scope = scope || this;
	                    var ret = new this._static();
	                    this.traverse(this.__root, order, function (node) {
	                        if (cb.call(scope, node, this)) {
	                            ret.insert(node);
	                        }
	                    });
	                    return ret;
	                },

	                reduce: function (fun, accumulator, order) {
	                    var arr = this.toArray(order);
	                    var args = [arr, fun];
	                    if (!_.isUndefinedOrNull(accumulator)) {
	                        args.push(accumulator);
	                    }
	                    return _.reduce.apply(_, args);
	                },

	                reduceRight: function (fun, accumulator, order) {
	                    var arr = this.toArray(order);
	                    var args = [arr, fun];
	                    if (!_.isUndefinedOrNull(accumulator)) {
	                        args.push(accumulator);
	                    }
	                    return _.reduceRight.apply(_, args);
	                },

	                every: function (cb, scope, order) {
	                    if (typeof cb !== "function") {
	                        throw new TypeError();
	                    }
	                    order = order || Tree.IN_ORDER;
	                    scope = scope || this;
	                    var ret = false;
	                    this.traverseWithCondition(this.__root, order, function (node) {
	                        ret = cb.call(scope, node, this);
	                        return ret;
	                    });
	                    return ret;
	                },

	                some: function (cb, scope, order) {
	                    if (typeof cb !== "function") {
	                        throw new TypeError();
	                    }

	                    order = order || Tree.IN_ORDER;
	                    scope = scope || this;
	                    var ret;
	                    this.traverseWithCondition(this.__root, order, function (node) {
	                        ret = cb.call(scope, node, this);
	                        return !ret;
	                    });
	                    return ret;
	                },

	                toArray: function (order) {
	                    order = order || Tree.IN_ORDER;
	                    var arr = [];
	                    this.traverse(this.__root, order, function (node) {
	                        arr.push(node);
	                    });
	                    return arr;
	                },

	                contains: function (value) {
	                    var ret = false;
	                    var root = this.__root;
	                    while (root !== null) {
	                        var cmp = this.compare(value, root.data);
	                        if (cmp) {
	                            root = root[(cmp === -1) ? "left" : "right"];
	                        } else {
	                            ret = true;
	                            root = null;
	                        }
	                    }
	                    return ret;
	                },

	                find: function (value) {
	                    var ret;
	                    var root = this.__root;
	                    while (root) {
	                        var cmp = this.compare(value, root.data);
	                        if (cmp) {
	                            root = root[(cmp === -1) ? "left" : "right"];
	                        } else {
	                            ret = root.data;
	                            break;
	                        }
	                    }
	                    return ret;
	                },

	                findLessThan: function (value, exclusive) {
	                    //find a better way!!!!
	                    var ret = [], compare = this.compare;
	                    this.traverseWithCondition(this.__root, Tree.IN_ORDER, function (v) {
	                        var cmp = compare(value, v);
	                        if ((!exclusive && cmp === 0) || cmp === 1) {
	                            ret.push(v);
	                            return true;
	                        } else {
	                            return false;
	                        }
	                    });
	                    return ret;
	                },

	                findGreaterThan: function (value, exclusive) {
	                    //find a better way!!!!
	                    var ret = [], compare = this.compare;
	                    this.traverse(this.__root, Tree.REVERSE_ORDER, function (v) {
	                        var cmp = compare(value, v);
	                        if ((!exclusive && cmp === 0) || cmp === -1) {
	                            ret.push(v);
	                            return true;
	                        } else {
	                            return false;
	                        }
	                    });
	                    return ret;
	                },

	                print: function () {
	                    this.__printNode(this.__root, 0);
	                }
	            },

	            "static": {
	                PRE_ORDER: "pre_order",
	                IN_ORDER: "in_order",
	                POST_ORDER: "post_order",
	                REVERSE_ORDER: "reverse_order"
	            }
	        });

	        var AVLTree = (function () {
	            var abs = Math.abs;


	            var makeNode = function (data) {
	                return {
	                    data: data,
	                    balance: 0,
	                    left: null,
	                    right: null
	                };
	            };

	            var rotateSingle = function (root, dir, otherDir) {
	                var save = root[otherDir];
	                root[otherDir] = save[dir];
	                save[dir] = root;
	                return save;
	            };


	            var rotateDouble = function (root, dir, otherDir) {
	                root[otherDir] = rotateSingle(root[otherDir], otherDir, dir);
	                return rotateSingle(root, dir, otherDir);
	            };

	            var adjustBalance = function (root, dir, bal) {
	                var otherDir = dir === "left" ? "right" : "left";
	                var n = root[dir], nn = n[otherDir];
	                if (nn.balance === 0) {
	                    root.balance = n.balance = 0;
	                } else if (nn.balance === bal) {
	                    root.balance = -bal;
	                    n.balance = 0;
	                } else { /* nn.balance == -bal */
	                    root.balance = 0;
	                    n.balance = bal;
	                }
	                nn.balance = 0;
	            };

	            var insertAdjustBalance = function (root, dir) {
	                var otherDir = dir === "left" ? "right" : "left";

	                var n = root[dir];
	                var bal = dir === "right" ? -1 : +1;

	                if (n.balance === bal) {
	                    root.balance = n.balance = 0;
	                    root = rotateSingle(root, otherDir, dir);
	                } else {
	                    adjustBalance(root, dir, bal);
	                    root = rotateDouble(root, otherDir, dir);
	                }

	                return root;

	            };

	            var removeAdjustBalance = function (root, dir, done) {
	                var otherDir = dir === "left" ? "right" : "left";
	                var n = root[otherDir];
	                var bal = dir === "right" ? -1 : 1;
	                if (n.balance === -bal) {
	                    root.balance = n.balance = 0;
	                    root = rotateSingle(root, dir, otherDir);
	                } else if (n.balance === bal) {
	                    adjustBalance(root, otherDir, -bal);
	                    root = rotateDouble(root, dir, otherDir);
	                } else { /* n.balance == 0 */
	                    root.balance = -bal;
	                    n.balance = bal;
	                    root = rotateSingle(root, dir, otherDir);
	                    done.done = true;
	                }
	                return root;
	            };

	            function insert(tree, data, cmp) {
	                /* Empty tree case */
	                var root = tree.__root;
	                if (root === null || root === undefined) {
	                    tree.__root = makeNode(data);
	                } else {
	                    var it = root, upd = [], up = [], top = 0, dir;
	                    while (true) {
	                        dir = upd[top] = cmp(data, it.data) === -1 ? "left" : "right";
	                        up[top++] = it;
	                        if (!it[dir]) {
	                            it[dir] = makeNode(data);
	                            break;
	                        }
	                        it = it[dir];
	                    }
	                    if (!it[dir]) {
	                        return null;
	                    }
	                    while (--top >= 0) {
	                        up[top].balance += upd[top] === "right" ? -1 : 1;
	                        if (up[top].balance === 0) {
	                            break;
	                        } else if (abs(up[top].balance) > 1) {
	                            up[top] = insertAdjustBalance(up[top], upd[top]);
	                            if (top !== 0) {
	                                up[top - 1][upd[top - 1]] = up[top];
	                            } else {
	                                tree.__root = up[0];
	                            }
	                            break;
	                        }
	                    }
	                }
	            }

	            function remove(tree, data, cmp) {
	                var root = tree.__root;
	                if (root !== null && root !== undefined) {
	                    var it = root, top = 0, up = [], upd = [], done = {done: false}, dir, compare;
	                    while (true) {
	                        if (!it) {
	                            return;
	                        } else if ((compare = cmp(data, it.data)) === 0) {
	                            break;
	                        }
	                        dir = upd[top] = compare === -1 ? "left" : "right";
	                        up[top++] = it;
	                        it = it[dir];
	                    }
	                    var l = it.left, r = it.right;
	                    if (!l || !r) {
	                        dir = !l ? "right" : "left";
	                        if (top !== 0) {
	                            up[top - 1][upd[top - 1]] = it[dir];
	                        } else {
	                            tree.__root = it[dir];
	                        }
	                    } else {
	                        var heir = l;
	                        upd[top] = "left";
	                        up[top++] = it;
	                        while (heir.right) {
	                            upd[top] = "right";
	                            up[top++] = heir;
	                            heir = heir.right;
	                        }
	                        it.data = heir.data;
	                        up[top - 1][up[top - 1] === it ? "left" : "right"] = heir.left;
	                    }
	                    while (--top >= 0 && !done.done) {
	                        up[top].balance += upd[top] === "left" ? -1 : +1;
	                        if (abs(up[top].balance) === 1) {
	                            break;
	                        } else if (abs(up[top].balance) > 1) {
	                            up[top] = removeAdjustBalance(up[top], upd[top], done);
	                            if (top !== 0) {
	                                up[top - 1][upd[top - 1]] = up[top];
	                            } else {
	                                tree.__root = up[0];
	                            }
	                        }
	                    }
	                }
	            }


	            return Tree.extend({
	                instance: {

	                    insert: function (data) {
	                        insert(this, data, this.compare);
	                    },


	                    remove: function (data) {
	                        remove(this, data, this.compare);
	                    },

	                    __printNode: function (node, level) {
	                        var str = [];
	                        if (!node) {
	                            str.push(multiply('\t', level));
	                            str.push("~");
	                            console.log(str.join(""));
	                        } else {
	                            this.__printNode(node.right, level + 1);
	                            str.push(multiply('\t', level));
	                            str.push(node.data + ":" + node.balance + "\n");
	                            console.log(str.join(""));
	                            this.__printNode(node.left, level + 1);
	                        }
	                    }

	                }
	            });
	        }());

	        var AnderssonTree = (function () {

	            var nil = {level: 0, data: null};

	            function makeNode(data, level) {
	                return {
	                    data: data,
	                    level: level,
	                    left: nil,
	                    right: nil
	                };
	            }

	            function skew(root) {
	                if (root.level !== 0 && root.left.level === root.level) {
	                    var save = root.left;
	                    root.left = save.right;
	                    save.right = root;
	                    root = save;
	                }
	                return root;
	            }

	            function split(root) {
	                if (root.level !== 0 && root.right.right.level === root.level) {
	                    var save = root.right;
	                    root.right = save.left;
	                    save.left = root;
	                    root = save;
	                    root.level++;
	                }
	                return root;
	            }

	            function insert(root, data, compare) {
	                if (root === nil) {
	                    root = makeNode(data, 1);
	                }
	                else {
	                    var dir = compare(data, root.data) === -1 ? "left" : "right";
	                    root[dir] = insert(root[dir], data, compare);
	                    root = skew(root);
	                    root = split(root);
	                }
	                return root;
	            }

	            var remove = function (root, data, compare) {
	                var rLeft, rRight;
	                if (root !== nil) {
	                    var cmp = compare(data, root.data);
	                    if (cmp === 0) {
	                        rLeft = root.left, rRight = root.right;
	                        if (rLeft !== nil && rRight !== nil) {
	                            var heir = rLeft;
	                            while (heir.right !== nil) {
	                                heir = heir.right;
	                            }
	                            root.data = heir.data;
	                            root.left = remove(rLeft, heir.data, compare);
	                        } else {
	                            root = root[rLeft === nil ? "right" : "left"];
	                        }
	                    } else {
	                        var dir = cmp === -1 ? "left" : "right";
	                        root[dir] = remove(root[dir], data, compare);
	                    }
	                }
	                if (root !== nil) {
	                    var rLevel = root.level;
	                    var rLeftLevel = root.left.level, rRightLevel = root.right.level;
	                    if (rLeftLevel < rLevel - 1 || rRightLevel < rLevel - 1) {
	                        if (rRightLevel > --root.level) {
	                            root.right.level = root.level;
	                        }
	                        root = skew(root);
	                        root = split(root);
	                    }
	                }
	                return root;
	            };

	            return Tree.extend({

	                instance: {

	                    isEmpty: function () {
	                        return this.__root === nil || this._super(arguments);
	                    },

	                    insert: function (data) {
	                        if (!this.__root) {
	                            this.__root = nil;
	                        }
	                        this.__root = insert(this.__root, data, this.compare);
	                    },

	                    remove: function (data) {
	                        this.__root = remove(this.__root, data, this.compare);
	                    },


	                    traverseWithCondition: function (node) {
	                        var cont = true;
	                        if (node !== nil) {
	                            return this._super(arguments);
	                        }
	                        return cont;
	                    },


	                    traverse: function (node) {
	                        if (node !== nil) {
	                            this._super(arguments);
	                        }
	                    },

	                    contains: function () {
	                        if (this.__root !== nil) {
	                            return this._super(arguments);
	                        }
	                        return false;
	                    },

	                    __printNode: function (node, level) {
	                        var str = [];
	                        if (!node || !node.data) {
	                            str.push(multiply('\t', level));
	                            str.push("~");
	                            console.log(str.join(""));
	                        } else {
	                            this.__printNode(node.right, level + 1);
	                            str.push(multiply('\t', level));
	                            str.push(node.data + ":" + node.level + "\n");
	                            console.log(str.join(""));
	                            this.__printNode(node.left, level + 1);
	                        }
	                    }

	                }

	            });
	        }());

	        var BinaryTree = Tree.extend({
	            instance: {
	                insert: function (data) {
	                    if (!this.__root) {
	                        this.__root = {
	                            data: data,
	                            parent: null,
	                            left: null,
	                            right: null
	                        };
	                        return this.__root;
	                    }
	                    var compare = this.compare;
	                    var root = this.__root;
	                    while (root !== null) {
	                        var cmp = compare(data, root.data);
	                        if (cmp) {
	                            var leaf = (cmp === -1) ? "left" : "right";
	                            var next = root[leaf];
	                            if (!next) {
	                                return (root[leaf] = {data: data, parent: root, left: null, right: null});
	                            } else {
	                                root = next;
	                            }
	                        } else {
	                            return;
	                        }
	                    }
	                },

	                remove: function (data) {
	                    if (this.__root !== null) {
	                        var head = {right: this.__root}, it = head;
	                        var p, f = null;
	                        var dir = "right";
	                        while (it[dir] !== null) {
	                            p = it;
	                            it = it[dir];
	                            var cmp = this.compare(data, it.data);
	                            if (!cmp) {
	                                f = it;
	                            }
	                            dir = (cmp === -1 ? "left" : "right");
	                        }
	                        if (f !== null) {
	                            f.data = it.data;
	                            p[p.right === it ? "right" : "left"] = it[it.left === null ? "right" : "left"];
	                        }
	                        this.__root = head.right;
	                    }

	                }
	            }
	        });

	        var RedBlackTree = (function () {
	            var RED = "RED", BLACK = "BLACK";

	            var isRed = function (node) {
	                return node !== null && node.red;
	            };

	            var makeNode = function (data) {
	                return {
	                    data: data,
	                    red: true,
	                    left: null,
	                    right: null
	                };
	            };

	            var insert = function (root, data, compare) {
	                if (!root) {
	                    return makeNode(data);

	                } else {
	                    var cmp = compare(data, root.data);
	                    if (cmp) {
	                        var dir = cmp === -1 ? "left" : "right";
	                        var otherDir = dir === "left" ? "right" : "left";
	                        root[dir] = insert(root[dir], data, compare);
	                        var node = root[dir];

	                        if (isRed(node)) {

	                            var sibling = root[otherDir];
	                            if (isRed(sibling)) {
	                                /* Case 1 */
	                                root.red = true;
	                                node.red = false;
	                                sibling.red = false;
	                            } else {

	                                if (isRed(node[dir])) {

	                                    root = rotateSingle(root, otherDir);
	                                } else if (isRed(node[otherDir])) {

	                                    root = rotateDouble(root, otherDir);
	                                }
	                            }

	                        }
	                    }
	                }
	                return root;
	            };

	            var rotateSingle = function (root, dir) {
	                var otherDir = dir === "left" ? "right" : "left";
	                var save = root[otherDir];
	                root[otherDir] = save[dir];
	                save[dir] = root;
	                root.red = true;
	                save.red = false;
	                return save;
	            };

	            var rotateDouble = function (root, dir) {
	                var otherDir = dir === "left" ? "right" : "left";
	                root[otherDir] = rotateSingle(root[otherDir], otherDir);
	                return rotateSingle(root, dir);
	            };


	            var remove = function (root, data, done, compare) {
	                if (!root) {
	                    done.done = true;
	                } else {
	                    var dir;
	                    if (compare(data, root.data) === 0) {
	                        if (!root.left || !root.right) {
	                            var save = root[!root.left ? "right" : "left"];
	                            /* Case 0 */
	                            if (isRed(root)) {
	                                done.done = true;
	                            } else if (isRed(save)) {
	                                save.red = false;
	                                done.done = true;
	                            }
	                            return save;
	                        }
	                        else {
	                            var heir = root.right, p;
	                            while (heir.left !== null) {
	                                p = heir;
	                                heir = heir.left;
	                            }
	                            if (p) {
	                                p.left = null;
	                            }
	                            root.data = heir.data;
	                            data = heir.data;
	                        }
	                    }
	                    dir = compare(data, root.data) === -1 ? "left" : "right";
	                    root[dir] = remove(root[dir], data, done, compare);
	                    if (!done.done) {
	                        root = removeBalance(root, dir, done);
	                    }
	                }
	                return root;
	            };

	            var removeBalance = function (root, dir, done) {
	                var notDir = dir === "left" ? "right" : "left";
	                var p = root, s = p[notDir];
	                if (isRed(s)) {
	                    root = rotateSingle(root, dir);
	                    s = p[notDir];
	                }
	                if (s !== null) {
	                    if (!isRed(s.left) && !isRed(s.right)) {
	                        if (isRed(p)) {
	                            done.done = true;
	                        }
	                        p.red = 0;
	                        s.red = 1;
	                    } else {
	                        var save = p.red, newRoot = ( root === p );
	                        p = (isRed(s[notDir]) ? rotateSingle : rotateDouble)(p, dir);
	                        p.red = save;
	                        p.left.red = p.right.red = 0;
	                        if (newRoot) {
	                            root = p;
	                        } else {
	                            root[dir] = p;
	                        }
	                        done.done = true;
	                    }
	                }
	                return root;
	            };

	            return Tree.extend({
	                instance: {
	                    insert: function (data) {
	                        this.__root = insert(this.__root, data, this.compare);
	                        this.__root.red = false;
	                    },

	                    remove: function (data) {
	                        var done = {done: false};
	                        var root = remove(this.__root, data, done, this.compare);
	                        if (root !== null) {
	                            root.red = 0;
	                        }
	                        this.__root = root;
	                        return data;
	                    },


	                    __printNode: function (node, level) {
	                        var str = [];
	                        if (!node) {
	                            str.push(multiply('\t', level));
	                            str.push("~");
	                            console.log(str.join(""));
	                        } else {
	                            this.__printNode(node.right, level + 1);
	                            str.push(multiply('\t', level));
	                            str.push((node.red ? RED : BLACK) + ":" + node.data + "\n");
	                            console.log(str.join(""));
	                            this.__printNode(node.left, level + 1);
	                        }
	                    }

	                }
	            });

	        }());


	        return {
	            Tree: Tree,
	            AVLTree: AVLTree,
	            AnderssonTree: AnderssonTree,
	            BinaryTree: BinaryTree,
	            RedBlackTree: RedBlackTree,
	            IN_ORDER: Tree.IN_ORDER,
	            PRE_ORDER: Tree.PRE_ORDER,
	            POST_ORDER: Tree.POST_ORDER,
	            REVERSE_ORDER: Tree.REVERSE_ORDER

	        };
	    }

	    if (true) {
	        if ("undefined" !== typeof module && module.exports) {
	            module.exports = defineLeafy(__webpack_require__(7)()
	                .register("declare", __webpack_require__(10))
	                .register(__webpack_require__(12))
	                .register(__webpack_require__(6))
	                .register(__webpack_require__(20))
	            );

	        }
	    } else if ("function" === typeof define) {
	        define(["extended", "declare.js", "is-extended", "array-extended", "string-extended"], function (extended, declare, is, array, string) {
	            return defineLeafy(extended()
	                .register("declare", declare)
	                .register(is)
	                .register(array)
	                .register(string)
	            );
	        });
	    } else {
	        this.leafy = defineLeafy(this.extended()
	            .register("declare", this.declare)
	            .register(this.isExtended)
	            .register(this.arrayExtended)
	            .register(this.stringExtended));
	    }

	}).call(this);








/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var declare = __webpack_require__(10);
	declare({

	    instance: {
	        constructor: function () {
	            this.head = null;
	            this.tail = null;
	            this.length = null;
	        },

	        push: function (data) {
	            var tail = this.tail, head = this.head, node = {data: data, prev: tail, next: null};
	            if (tail) {
	                this.tail.next = node;
	            }
	            this.tail = node;
	            if (!head) {
	                this.head = node;
	            }
	            this.length++;
	            return node;
	        },

	        remove: function (node) {
	            if (node.prev) {
	                node.prev.next = node.next;
	            } else {
	                this.head = node.next;
	            }
	            if (node.next) {
	                node.next.prev = node.prev;
	            } else {
	                this.tail = node.prev;
	            }
	            //node.data = node.prev = node.next = null;
	            this.length--;
	        },

	        forEach: function (cb) {
	            var head = {next: this.head};
	            while ((head = head.next)) {
	                cb(head.data);
	            }
	        },

	        toArray: function () {
	            var head = {next: this.head}, ret = [];
	            while ((head = head.next)) {
	                ret.push(head);
	            }
	            return ret;
	        },

	        removeByData: function (data) {
	            var head = {next: this.head};
	            while ((head = head.next)) {
	                if (head.data === data) {
	                    this.remove(head);
	                    break;
	                }
	            }
	        },

	        getByData: function (data) {
	            var head = {next: this.head};
	            while ((head = head.next)) {
	                if (head.data === data) {
	                    return head;
	                }
	            }
	        },

	        clear: function () {
	            this.head = this.tail = null;
	            this.length = 0;
	        }

	    }

	}).as(module);

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(28)(module)))

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 29 */
/***/ function(module, exports) {

	

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// resolves . and .. elements in a path array with directory names there
	// must be no slashes, empty elements, or device names (c:\) in the array
	// (so also no leading and trailing slashes - it does not distinguish
	// relative and absolute paths)
	function normalizeArray(parts, allowAboveRoot) {
	  // if the path tries to go above the root, `up` ends up > 0
	  var up = 0;
	  for (var i = parts.length - 1; i >= 0; i--) {
	    var last = parts[i];
	    if (last === '.') {
	      parts.splice(i, 1);
	    } else if (last === '..') {
	      parts.splice(i, 1);
	      up++;
	    } else if (up) {
	      parts.splice(i, 1);
	      up--;
	    }
	  }

	  // if the path is allowed to go above the root, restore leading ..s
	  if (allowAboveRoot) {
	    for (; up--; up) {
	      parts.unshift('..');
	    }
	  }

	  return parts;
	}

	// Split a filename into [root, dir, basename, ext], unix version
	// 'root' is just a slash, or nothing.
	var splitPathRe =
	    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
	var splitPath = function(filename) {
	  return splitPathRe.exec(filename).slice(1);
	};

	// path.resolve([from ...], to)
	// posix version
	exports.resolve = function() {
	  var resolvedPath = '',
	      resolvedAbsolute = false;

	  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
	    var path = (i >= 0) ? arguments[i] : process.cwd();

	    // Skip empty and invalid entries
	    if (typeof path !== 'string') {
	      throw new TypeError('Arguments to path.resolve must be strings');
	    } else if (!path) {
	      continue;
	    }

	    resolvedPath = path + '/' + resolvedPath;
	    resolvedAbsolute = path.charAt(0) === '/';
	  }

	  // At this point the path should be resolved to a full absolute path, but
	  // handle relative paths to be safe (might happen when process.cwd() fails)

	  // Normalize the path
	  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
	    return !!p;
	  }), !resolvedAbsolute).join('/');

	  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
	};

	// path.normalize(path)
	// posix version
	exports.normalize = function(path) {
	  var isAbsolute = exports.isAbsolute(path),
	      trailingSlash = substr(path, -1) === '/';

	  // Normalize the path
	  path = normalizeArray(filter(path.split('/'), function(p) {
	    return !!p;
	  }), !isAbsolute).join('/');

	  if (!path && !isAbsolute) {
	    path = '.';
	  }
	  if (path && trailingSlash) {
	    path += '/';
	  }

	  return (isAbsolute ? '/' : '') + path;
	};

	// posix version
	exports.isAbsolute = function(path) {
	  return path.charAt(0) === '/';
	};

	// posix version
	exports.join = function() {
	  var paths = Array.prototype.slice.call(arguments, 0);
	  return exports.normalize(filter(paths, function(p, index) {
	    if (typeof p !== 'string') {
	      throw new TypeError('Arguments to path.join must be strings');
	    }
	    return p;
	  }).join('/'));
	};


	// path.relative(from, to)
	// posix version
	exports.relative = function(from, to) {
	  from = exports.resolve(from).substr(1);
	  to = exports.resolve(to).substr(1);

	  function trim(arr) {
	    var start = 0;
	    for (; start < arr.length; start++) {
	      if (arr[start] !== '') break;
	    }

	    var end = arr.length - 1;
	    for (; end >= 0; end--) {
	      if (arr[end] !== '') break;
	    }

	    if (start > end) return [];
	    return arr.slice(start, end - start + 1);
	  }

	  var fromParts = trim(from.split('/'));
	  var toParts = trim(to.split('/'));

	  var length = Math.min(fromParts.length, toParts.length);
	  var samePartsLength = length;
	  for (var i = 0; i < length; i++) {
	    if (fromParts[i] !== toParts[i]) {
	      samePartsLength = i;
	      break;
	    }
	  }

	  var outputParts = [];
	  for (var i = samePartsLength; i < fromParts.length; i++) {
	    outputParts.push('..');
	  }

	  outputParts = outputParts.concat(toParts.slice(samePartsLength));

	  return outputParts.join('/');
	};

	exports.sep = '/';
	exports.delimiter = ':';

	exports.dirname = function(path) {
	  var result = splitPath(path),
	      root = result[0],
	      dir = result[1];

	  if (!root && !dir) {
	    // No dirname whatsoever
	    return '.';
	  }

	  if (dir) {
	    // It has a dirname, strip trailing slash
	    dir = dir.substr(0, dir.length - 1);
	  }

	  return root + dir;
	};


	exports.basename = function(path, ext) {
	  var f = splitPath(path)[2];
	  // TODO: make this comparison case-insensitive on windows?
	  if (ext && f.substr(-1 * ext.length) === ext) {
	    f = f.substr(0, f.length - ext.length);
	  }
	  return f;
	};


	exports.extname = function(path) {
	  return splitPath(path)[3];
	};

	function filter (xs, f) {
	    if (xs.filter) return xs.filter(f);
	    var res = [];
	    for (var i = 0; i < xs.length; i++) {
	        if (f(xs[i], i, xs)) res.push(xs[i]);
	    }
	    return res;
	}

	// String.prototype.substr - negative index don't work in IE8
	var substr = 'ab'.substr(-1) === 'b'
	    ? function (str, start, len) { return str.substr(start, len) }
	    : function (str, start, len) {
	        if (start < 0) start = str.length + start;
	        return str.substr(start, len);
	    }
	;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(23)))

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {/*jshint evil:true*/
	"use strict";
	var extd = __webpack_require__(5),
	    parser = __webpack_require__(32),
	    constraintMatcher = __webpack_require__(37),
	    indexOf = extd.indexOf,
	    forEach = extd.forEach,
	    removeDuplicates = extd.removeDuplicates,
	    map = extd.map,
	    obj = extd.hash,
	    keys = obj.keys,
	    merge = extd.merge,
	    rules = __webpack_require__(39),
	    common = __webpack_require__(41),
	    modifiers = common.modifiers,
	    createDefined = common.createDefined,
	    createFunction = common.createFunction;


	/**
	 * @private
	 * Parses an action from a rule definition
	 * @param {String} action the body of the action to execute
	 * @param {Array} identifiers array of identifiers collected
	 * @param {Object} defined an object of defined
	 * @param scope
	 * @return {Object}
	 */
	var parseAction = function (action, identifiers, defined, scope) {
	    var declares = [];
	    forEach(identifiers, function (i) {
	        if (action.indexOf(i) !== -1) {
	            declares.push("var " + i + "= facts." + i + ";");
	        }
	    });
	    extd(defined).keys().forEach(function (i) {
	        if (action.indexOf(i) !== -1) {
	            declares.push("var " + i + "= defined." + i + ";");
	        }
	    });

	    extd(scope).keys().forEach(function (i) {
	        if (action.indexOf(i) !== -1) {
	            declares.push("var " + i + "= scope." + i + ";");
	        }
	    });
	    extd(modifiers).forEach(function (i) {
	        if (action.indexOf(i) !== -1) {
	            declares.push("if(!" + i + "){ var " + i + "= flow." + i + ";}");
	        }
	    });
	    var params = ["facts", 'flow'];
	    if (/next\(.*\)/.test(action)) {
	        params.push("next");
	    }
	    action = declares.join("") + action;
	    try {
	        return new Function("defined, scope", "return " + new Function(params.join(","), action).toString())(defined, scope);
	    } catch (e) {
	        throw new Error("Invalid action : " + action + "\n" + e.message);
	    }
	};

	var createRuleFromObject = (function () {
	    var __resolveRule = function (rule, identifiers, conditions, defined, name) {
	        var condition = [], definedClass = rule[0], alias = rule[1], constraint = rule[2], refs = rule[3];
	        if (extd.isHash(constraint)) {
	            refs = constraint;
	            constraint = null;
	        }
	        if (definedClass && !!(definedClass = defined[definedClass])) {
	            condition.push(definedClass);
	        } else {
	            throw new Error("Invalid class " + rule[0] + " for rule " + name);
	        }
	        condition.push(alias, constraint, refs);
	        conditions.push(condition);
	        identifiers.push(alias);
	        if (constraint) {
	            forEach(constraintMatcher.getIdentifiers(parser.parseConstraint(constraint)), function (i) {
	                identifiers.push(i);
	            });
	        }
	        if (extd.isObject(refs)) {
	            for (var j in refs) {
	                var ident = refs[j];
	                if (indexOf(identifiers, ident) === -1) {
	                    identifiers.push(ident);
	                }
	            }
	        }
	    };

	    function parseRule(rule, conditions, identifiers, defined, name) {
	        if (rule.length) {
	            var r0 = rule[0];
	            if (r0 === "not" || r0 === "exists") {
	                var temp = [];
	                rule.shift();
	                __resolveRule(rule, identifiers, temp, defined, name);
	                var cond = temp[0];
	                cond.unshift(r0);
	                conditions.push(cond);
	            } else if (r0 === "or") {
	                var conds = [r0];
	                rule.shift();
	                forEach(rule, function (cond) {
	                    parseRule(cond, conds, identifiers, defined, name);
	                });
	                conditions.push(conds);
	            } else {
	                __resolveRule(rule, identifiers, conditions, defined, name);
	                identifiers = removeDuplicates(identifiers);
	            }
	        }

	    }

	    return function (obj, defined, scope) {
	        var name = obj.name;
	        if (extd.isEmpty(obj)) {
	            throw new Error("Rule is empty");
	        }
	        var options = obj.options || {};
	        options.scope = scope;
	        var constraints = obj.constraints || [], l = constraints.length;
	        if (!l) {
	            constraints = ["true"];
	        }
	        var action = obj.action;
	        if (extd.isUndefined(action)) {
	            throw new Error("No action was defined for rule " + name);
	        }
	        var conditions = [], identifiers = [];
	        forEach(constraints, function (rule) {
	            parseRule(rule, conditions, identifiers, defined, name);
	        });
	        return rules.createRule(name, options, conditions, parseAction(action, identifiers, defined, scope));
	    };
	})();

	exports.parse = function (src, file) {
	    //parse flow from file
	    return parser.parseRuleSet(src, file);

	};
	exports.compile = function (flowObj, options, cb, Container) {
	    if (extd.isFunction(options)) {
	        cb = options;
	        options = {};
	    } else {
	        options = options || {};
	        cb = null;
	    }
	    var name = flowObj.name || options.name;
	    //if !name throw an error
	    if (!name) {
	        throw new Error("Name must be present in JSON or options");
	    }
	    var flow = new Container(name);
	    var defined = merge({Array: Array, String: String, Number: Number, Boolean: Boolean, RegExp: RegExp, Date: Date, Object: Object}, options.define || {});
	    if (typeof Buffer !== "undefined") {
	        defined.Buffer = Buffer;
	    }
	    var scope = merge({console: console}, options.scope);
	    //add the anything added to the scope as a property
	    forEach(flowObj.scope, function (s) {
	        scope[s.name] = true;
	    });
	    //add any defined classes in the parsed flowObj to defined
	    forEach(flowObj.define, function (d) {
	        defined[d.name] = createDefined(d, defined, scope);
	    });

	    //expose any defined classes to the flow.
	    extd(defined).forEach(function (cls, name) {
	        flow.addDefined(name, cls);
	    });

	    var scopeNames = extd(flowObj.scope).pluck("name").union(extd(scope).keys().value()).value();
	    var definedNames = map(keys(defined), function (s) {
	        return s;
	    });
	    forEach(flowObj.scope, function (s) {
	        scope[s.name] = createFunction(s.body, defined, scope, scopeNames, definedNames);
	    });
	    var rules = flowObj.rules;
	    if (rules.length) {
	        forEach(rules, function (rule) {
	            flow.__rules = flow.__rules.concat(createRuleFromObject(rule, defined, scope));
	        });
	    }
	    if (cb) {
	        cb.call(flow, flow);
	    }
	    return flow;
	};

	exports.transpile = __webpack_require__(42).transpile;




	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13).Buffer))

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	(function () {
	    "use strict";
	    var constraintParser = __webpack_require__(33),
	        noolParser = __webpack_require__(34);

	    exports.parseConstraint = function (expression) {
	        try {
	            return constraintParser.parse(expression);
	        } catch (e) {
	            throw new Error("Invalid expression '" + expression + "'");
	        }
	    };

	    exports.parseRuleSet = function (source, file) {
	        return noolParser.parse(source, file);
	    };
	})();

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process, module) {/* parser generated by jison 0.4.13 */
	/*
	  Returns a Parser object of the following structure:

	  Parser: {
	    yy: {}
	  }

	  Parser.prototype: {
	    yy: {},
	    trace: function(),
	    symbols_: {associative list: name ==> number},
	    terminals_: {associative list: number ==> name},
	    productions_: [...],
	    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
	    table: [...],
	    defaultActions: {...},
	    parseError: function(str, hash),
	    parse: function(input),

	    lexer: {
	        EOF: 1,
	        parseError: function(str, hash),
	        setInput: function(input),
	        input: function(),
	        unput: function(str),
	        more: function(),
	        less: function(n),
	        pastInput: function(),
	        upcomingInput: function(),
	        showPosition: function(),
	        test_match: function(regex_match_array, rule_index),
	        next: function(),
	        lex: function(),
	        begin: function(condition),
	        popState: function(),
	        _currentRules: function(),
	        topState: function(),
	        pushState: function(condition),

	        options: {
	            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
	            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
	            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
	        },

	        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
	        rules: [...],
	        conditions: {associative list: name ==> set},
	    }
	  }


	  token location info (@$, _$, etc.): {
	    first_line: n,
	    last_line: n,
	    first_column: n,
	    last_column: n,
	    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
	  }


	  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
	    text:        (matched text)
	    token:       (the produced terminal token, if any)
	    line:        (yylineno)
	  }
	  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
	    loc:         (yylloc)
	    expected:    (string describing the set of expected tokens)
	    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
	  }
	*/
	var parser = (function(){
	var parser = {trace: function trace() { },
	yy: {},
	symbols_: {"error":2,"expressions":3,"EXPRESSION":4,"EOF":5,"UNARY_EXPRESSION":6,"LITERAL_EXPRESSION":7,"-":8,"!":9,"MULTIPLICATIVE_EXPRESSION":10,"*":11,"/":12,"%":13,"ADDITIVE_EXPRESSION":14,"+":15,"EXPONENT_EXPRESSION":16,"^":17,"RELATIONAL_EXPRESSION":18,"<":19,">":20,"<=":21,">=":22,"EQUALITY_EXPRESSION":23,"==":24,"===":25,"!=":26,"!==":27,"=~":28,"!=~":29,"IN_EXPRESSION":30,"in":31,"ARRAY_EXPRESSION":32,"notIn":33,"OBJECT_EXPRESSION":34,"AND_EXPRESSION":35,"&&":36,"OR_EXPRESSION":37,"||":38,"ARGUMENT_LIST":39,",":40,"IDENTIFIER_EXPRESSION":41,"IDENTIFIER":42,".":43,"[":44,"STRING_EXPRESSION":45,"]":46,"NUMBER_EXPRESSION":47,"(":48,")":49,"STRING":50,"NUMBER":51,"REGEXP_EXPRESSION":52,"REGEXP":53,"BOOLEAN_EXPRESSION":54,"BOOLEAN":55,"NULL_EXPRESSION":56,"NULL":57,"$accept":0,"$end":1},
	terminals_: {2:"error",5:"EOF",8:"-",9:"!",11:"*",12:"/",13:"%",15:"+",17:"^",19:"<",20:">",21:"<=",22:">=",24:"==",25:"===",26:"!=",27:"!==",28:"=~",29:"!=~",31:"in",33:"notIn",36:"&&",38:"||",40:",",42:"IDENTIFIER",43:".",44:"[",46:"]",48:"(",49:")",50:"STRING",51:"NUMBER",53:"REGEXP",55:"BOOLEAN",57:"NULL"},
	productions_: [0,[3,2],[6,1],[6,2],[6,2],[10,1],[10,3],[10,3],[10,3],[14,1],[14,3],[14,3],[16,1],[16,3],[18,1],[18,3],[18,3],[18,3],[18,3],[23,1],[23,3],[23,3],[23,3],[23,3],[23,3],[23,3],[30,1],[30,3],[30,3],[30,3],[30,3],[35,1],[35,3],[37,1],[37,3],[39,1],[39,3],[41,1],[34,1],[34,3],[34,4],[34,4],[34,4],[34,3],[34,4],[45,1],[47,1],[52,1],[54,1],[56,1],[32,2],[32,3],[7,1],[7,1],[7,1],[7,1],[7,1],[7,1],[7,1],[7,3],[4,1]],
	performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
	/* this == yyval */

	var $0 = $$.length - 1;
	switch (yystate) {
	case 1:return $$[$0-1];
	break;
	case 3:this.$ = [$$[$0], null, 'unary'];
	break;
	case 4:this.$ = [$$[$0], null, 'logicalNot'];
	break;
	case 6:this.$ = [$$[$0-2], $$[$0], 'mult'];
	break;
	case 7:this.$ = [$$[$0-2], $$[$0], 'div'];
	break;
	case 8:this.$ = [$$[$0-2], $$[$0], 'mod'];
	break;
	case 10:this.$ = [$$[$0-2], $$[$0], 'plus'];
	break;
	case 11:this.$ = [$$[$0-2], $$[$0], 'minus'];
	break;
	case 13:this.$ = [$$[$0-2], $$[$0], 'pow'];
	break;
	case 15:this.$ = [$$[$0-2], $$[$0], 'lt'];
	break;
	case 16:this.$ = [$$[$0-2], $$[$0], 'gt'];
	break;
	case 17:this.$ = [$$[$0-2], $$[$0], 'lte'];
	break;
	case 18:this.$ = [$$[$0-2], $$[$0], 'gte'];
	break;
	case 20:this.$ = [$$[$0-2], $$[$0], 'eq'];
	break;
	case 21:this.$ = [$$[$0-2], $$[$0], 'seq'];
	break;
	case 22:this.$ = [$$[$0-2], $$[$0], 'neq'];
	break;
	case 23:this.$ = [$$[$0-2], $$[$0], 'sneq'];
	break;
	case 24:this.$ = [$$[$0-2], $$[$0], 'like'];
	break;
	case 25:this.$ = [$$[$0-2], $$[$0], 'notLike'];
	break;
	case 27:this.$ = [$$[$0-2], $$[$0], 'in'];
	break;
	case 28:this.$ = [$$[$0-2], $$[$0], 'notIn'];
	break;
	case 29:this.$ = [$$[$0-2], $$[$0], 'in'];
	break;
	case 30:this.$ = [$$[$0-2], $$[$0], 'notIn'];
	break;
	case 32:this.$ = [$$[$0-2], $$[$0], 'and'];
	break;
	case 34:this.$ = [$$[$0-2], $$[$0], 'or'];
	break;
	case 36:this.$ = [$$[$0-2], $$[$0], 'arguments']
	break;
	case 37:this.$ = [String(yytext), null, 'identifier'];
	break;
	case 39:this.$ = [$$[$0-2],$$[$0], 'prop'];
	break;
	case 40:this.$ = [$$[$0-3],$$[$0-1], 'propLookup'];
	break;
	case 41:this.$ = [$$[$0-3],$$[$0-1], 'propLookup'];
	break;
	case 42:this.$ = [$$[$0-3],$$[$0-1], 'propLookup'];
	break;
	case 43:this.$ = [$$[$0-2], [null, null, 'arguments'], 'function']
	break;
	case 44:this.$ = [$$[$0-3], $$[$0-1], 'function']
	break;
	case 45:this.$ = [String(yytext.replace(/^['|"]|['|"]$/g, '')), null, 'string'];
	break;
	case 46:this.$ = [Number(yytext), null, 'number'];
	break;
	case 47:this.$ = [yytext, null, 'regexp'];
	break;
	case 48:this.$ = [yytext.replace(/^\s+/, '') == 'true', null, 'boolean'];
	break;
	case 49:this.$ = [null, null, 'null'];
	break;
	case 50:this.$ = [null, null, 'array'];
	break;
	case 51:this.$ = [$$[$0-1], null, 'array'];
	break;
	case 59:this.$ = [$$[$0-1], null, 'composite']
	break;
	}
	},
	table: [{3:1,4:2,6:28,7:7,8:[1,29],9:[1,30],10:27,14:25,16:17,18:8,23:6,30:5,32:15,34:14,35:4,37:3,41:23,42:[1,26],44:[1,24],45:9,47:10,48:[1,16],50:[1,18],51:[1,19],52:11,53:[1,20],54:12,55:[1,21],56:13,57:[1,22]},{1:[3]},{5:[1,31]},{5:[2,60],38:[1,32],49:[2,60]},{5:[2,33],36:[1,33],38:[2,33],49:[2,33]},{5:[2,31],36:[2,31],38:[2,31],49:[2,31]},{5:[2,26],24:[1,34],25:[1,35],26:[1,36],27:[1,37],28:[1,38],29:[1,39],36:[2,26],38:[2,26],49:[2,26]},{5:[2,2],8:[2,2],11:[2,2],12:[2,2],13:[2,2],15:[2,2],17:[2,2],19:[2,2],20:[2,2],21:[2,2],22:[2,2],24:[2,2],25:[2,2],26:[2,2],27:[2,2],28:[2,2],29:[2,2],31:[1,40],33:[1,41],36:[2,2],38:[2,2],49:[2,2]},{5:[2,19],19:[1,42],20:[1,43],21:[1,44],22:[1,45],24:[2,19],25:[2,19],26:[2,19],27:[2,19],28:[2,19],29:[2,19],36:[2,19],38:[2,19],49:[2,19]},{5:[2,52],8:[2,52],11:[2,52],12:[2,52],13:[2,52],15:[2,52],17:[2,52],19:[2,52],20:[2,52],21:[2,52],22:[2,52],24:[2,52],25:[2,52],26:[2,52],27:[2,52],28:[2,52],29:[2,52],31:[2,52],33:[2,52],36:[2,52],38:[2,52],40:[2,52],46:[2,52],49:[2,52]},{5:[2,53],8:[2,53],11:[2,53],12:[2,53],13:[2,53],15:[2,53],17:[2,53],19:[2,53],20:[2,53],21:[2,53],22:[2,53],24:[2,53],25:[2,53],26:[2,53],27:[2,53],28:[2,53],29:[2,53],31:[2,53],33:[2,53],36:[2,53],38:[2,53],40:[2,53],46:[2,53],49:[2,53]},{5:[2,54],8:[2,54],11:[2,54],12:[2,54],13:[2,54],15:[2,54],17:[2,54],19:[2,54],20:[2,54],21:[2,54],22:[2,54],24:[2,54],25:[2,54],26:[2,54],27:[2,54],28:[2,54],29:[2,54],31:[2,54],33:[2,54],36:[2,54],38:[2,54],40:[2,54],46:[2,54],49:[2,54]},{5:[2,55],8:[2,55],11:[2,55],12:[2,55],13:[2,55],15:[2,55],17:[2,55],19:[2,55],20:[2,55],21:[2,55],22:[2,55],24:[2,55],25:[2,55],26:[2,55],27:[2,55],28:[2,55],29:[2,55],31:[2,55],33:[2,55],36:[2,55],38:[2,55],40:[2,55],46:[2,55],49:[2,55]},{5:[2,56],8:[2,56],11:[2,56],12:[2,56],13:[2,56],15:[2,56],17:[2,56],19:[2,56],20:[2,56],21:[2,56],22:[2,56],24:[2,56],25:[2,56],26:[2,56],27:[2,56],28:[2,56],29:[2,56],31:[2,56],33:[2,56],36:[2,56],38:[2,56],40:[2,56],46:[2,56],49:[2,56]},{5:[2,57],8:[2,57],11:[2,57],12:[2,57],13:[2,57],15:[2,57],17:[2,57],19:[2,57],20:[2,57],21:[2,57],22:[2,57],24:[2,57],25:[2,57],26:[2,57],27:[2,57],28:[2,57],29:[2,57],31:[2,57],33:[2,57],36:[2,57],38:[2,57],40:[2,57],43:[1,46],44:[1,47],46:[2,57],48:[1,48],49:[2,57]},{5:[2,58],8:[2,58],11:[2,58],12:[2,58],13:[2,58],15:[2,58],17:[2,58],19:[2,58],20:[2,58],21:[2,58],22:[2,58],24:[2,58],25:[2,58],26:[2,58],27:[2,58],28:[2,58],29:[2,58],31:[2,58],33:[2,58],36:[2,58],38:[2,58],40:[2,58],46:[2,58],49:[2,58]},{4:49,6:28,7:7,8:[1,29],9:[1,30],10:27,14:25,16:17,18:8,23:6,30:5,32:15,34:14,35:4,37:3,41:23,42:[1,26],44:[1,24],45:9,47:10,48:[1,16],50:[1,18],51:[1,19],52:11,53:[1,20],54:12,55:[1,21],56:13,57:[1,22]},{5:[2,14],17:[1,50],19:[2,14],20:[2,14],21:[2,14],22:[2,14],24:[2,14],25:[2,14],26:[2,14],27:[2,14],28:[2,14],29:[2,14],36:[2,14],38:[2,14],49:[2,14]},{5:[2,45],8:[2,45],11:[2,45],12:[2,45],13:[2,45],15:[2,45],17:[2,45],19:[2,45],20:[2,45],21:[2,45],22:[2,45],24:[2,45],25:[2,45],26:[2,45],27:[2,45],28:[2,45],29:[2,45],31:[2,45],33:[2,45],36:[2,45],38:[2,45],40:[2,45],46:[2,45],49:[2,45]},{5:[2,46],8:[2,46],11:[2,46],12:[2,46],13:[2,46],15:[2,46],17:[2,46],19:[2,46],20:[2,46],21:[2,46],22:[2,46],24:[2,46],25:[2,46],26:[2,46],27:[2,46],28:[2,46],29:[2,46],31:[2,46],33:[2,46],36:[2,46],38:[2,46],40:[2,46],46:[2,46],49:[2,46]},{5:[2,47],8:[2,47],11:[2,47],12:[2,47],13:[2,47],15:[2,47],17:[2,47],19:[2,47],20:[2,47],21:[2,47],22:[2,47],24:[2,47],25:[2,47],26:[2,47],27:[2,47],28:[2,47],29:[2,47],31:[2,47],33:[2,47],36:[2,47],38:[2,47],40:[2,47],46:[2,47],49:[2,47]},{5:[2,48],8:[2,48],11:[2,48],12:[2,48],13:[2,48],15:[2,48],17:[2,48],19:[2,48],20:[2,48],21:[2,48],22:[2,48],24:[2,48],25:[2,48],26:[2,48],27:[2,48],28:[2,48],29:[2,48],31:[2,48],33:[2,48],36:[2,48],38:[2,48],40:[2,48],46:[2,48],49:[2,48]},{5:[2,49],8:[2,49],11:[2,49],12:[2,49],13:[2,49],15:[2,49],17:[2,49],19:[2,49],20:[2,49],21:[2,49],22:[2,49],24:[2,49],25:[2,49],26:[2,49],27:[2,49],28:[2,49],29:[2,49],31:[2,49],33:[2,49],36:[2,49],38:[2,49],40:[2,49],46:[2,49],49:[2,49]},{5:[2,38],8:[2,38],11:[2,38],12:[2,38],13:[2,38],15:[2,38],17:[2,38],19:[2,38],20:[2,38],21:[2,38],22:[2,38],24:[2,38],25:[2,38],26:[2,38],27:[2,38],28:[2,38],29:[2,38],31:[2,38],33:[2,38],36:[2,38],38:[2,38],40:[2,38],43:[2,38],44:[2,38],46:[2,38],48:[2,38],49:[2,38]},{7:53,32:15,34:14,39:52,41:23,42:[1,26],44:[1,24],45:9,46:[1,51],47:10,48:[1,16],50:[1,18],51:[1,19],52:11,53:[1,20],54:12,55:[1,21],56:13,57:[1,22]},{5:[2,12],8:[1,55],15:[1,54],17:[2,12],19:[2,12],20:[2,12],21:[2,12],22:[2,12],24:[2,12],25:[2,12],26:[2,12],27:[2,12],28:[2,12],29:[2,12],36:[2,12],38:[2,12],49:[2,12]},{5:[2,37],8:[2,37],11:[2,37],12:[2,37],13:[2,37],15:[2,37],17:[2,37],19:[2,37],20:[2,37],21:[2,37],22:[2,37],24:[2,37],25:[2,37],26:[2,37],27:[2,37],28:[2,37],29:[2,37],31:[2,37],33:[2,37],36:[2,37],38:[2,37],40:[2,37],43:[2,37],44:[2,37],46:[2,37],48:[2,37],49:[2,37]},{5:[2,9],8:[2,9],11:[1,56],12:[1,57],13:[1,58],15:[2,9],17:[2,9],19:[2,9],20:[2,9],21:[2,9],22:[2,9],24:[2,9],25:[2,9],26:[2,9],27:[2,9],28:[2,9],29:[2,9],36:[2,9],38:[2,9],49:[2,9]},{5:[2,5],8:[2,5],11:[2,5],12:[2,5],13:[2,5],15:[2,5],17:[2,5],19:[2,5],20:[2,5],21:[2,5],22:[2,5],24:[2,5],25:[2,5],26:[2,5],27:[2,5],28:[2,5],29:[2,5],36:[2,5],38:[2,5],49:[2,5]},{6:59,7:60,8:[1,29],9:[1,30],32:15,34:14,41:23,42:[1,26],44:[1,24],45:9,47:10,48:[1,16],50:[1,18],51:[1,19],52:11,53:[1,20],54:12,55:[1,21],56:13,57:[1,22]},{6:61,7:60,8:[1,29],9:[1,30],32:15,34:14,41:23,42:[1,26],44:[1,24],45:9,47:10,48:[1,16],50:[1,18],51:[1,19],52:11,53:[1,20],54:12,55:[1,21],56:13,57:[1,22]},{1:[2,1]},{6:28,7:7,8:[1,29],9:[1,30],10:27,14:25,16:17,18:8,23:6,30:5,32:15,34:14,35:62,41:23,42:[1,26],44:[1,24],45:9,47:10,48:[1,16],50:[1,18],51:[1,19],52:11,53:[1,20],54:12,55:[1,21],56:13,57:[1,22]},{6:28,7:7,8:[1,29],9:[1,30],10:27,14:25,16:17,18:8,23:6,30:63,32:15,34:14,41:23,42:[1,26],44:[1,24],45:9,47:10,48:[1,16],50:[1,18],51:[1,19],52:11,53:[1,20],54:12,55:[1,21],56:13,57:[1,22]},{6:28,7:60,8:[1,29],9:[1,30],10:27,14:25,16:17,18:64,32:15,34:14,41:23,42:[1,26],44:[1,24],45:9,47:10,48:[1,16],50:[1,18],51:[1,19],52:11,53:[1,20],54:12,55:[1,21],56:13,57:[1,22]},{6:28,7:60,8:[1,29],9:[1,30],10:27,14:25,16:17,18:65,32:15,34:14,41:23,42:[1,26],44:[1,24],45:9,47:10,48:[1,16],50:[1,18],51:[1,19],52:11,53:[1,20],54:12,55:[1,21],56:13,57:[1,22]},{6:28,7:60,8:[1,29],9:[1,30],10:27,14:25,16:17,18:66,32:15,34:14,41:23,42:[1,26],44:[1,24],45:9,47:10,48:[1,16],50:[1,18],51:[1,19],52:11,53:[1,20],54:12,55:[1,21],56:13,57:[1,22]},{6:28,7:60,8:[1,29],9:[1,30],10:27,14:25,16:17,18:67,32:15,34:14,41:23,42:[1,26],44:[1,24],45:9,47:10,48:[1,16],50:[1,18],51:[1,19],52:11,53:[1,20],54:12,55:[1,21],56:13,57:[1,22]},{6:28,7:60,8:[1,29],9:[1,30],10:27,14:25,16:17,18:68,32:15,34:14,41:23,42:[1,26],44:[1,24],45:9,47:10,48:[1,16],50:[1,18],51:[1,19],52:11,53:[1,20],54:12,55:[1,21],56:13,57:[1,22]},{6:28,7:60,8:[1,29],9:[1,30],10:27,14:25,16:17,18:69,32:15,34:14,41:23,42:[1,26],44:[1,24],45:9,47:10,48:[1,16],50:[1,18],51:[1,19],52:11,53:[1,20],54:12,55:[1,21],56:13,57:[1,22]},{32:70,34:71,41:23,42:[1,26],44:[1,24]},{32:72,34:73,41:23,42:[1,26],44:[1,24]},{6:28,7:60,8:[1,29],9:[1,30],10:27,14:25,16:74,32:15,34:14,41:23,42:[1,26],44:[1,24],45:9,47:10,48:[1,16],50:[1,18],51:[1,19],52:11,53:[1,20],54:12,55:[1,21],56:13,57:[1,22]},{6:28,7:60,8:[1,29],9:[1,30],10:27,14:25,16:75,32:15,34:14,41:23,42:[1,26],44:[1,24],45:9,47:10,48:[1,16],50:[1,18],51:[1,19],52:11,53:[1,20],54:12,55:[1,21],56:13,57:[1,22]},{6:28,7:60,8:[1,29],9:[1,30],10:27,14:25,16:76,32:15,34:14,41:23,42:[1,26],44:[1,24],45:9,47:10,48:[1,16],50:[1,18],51:[1,19],52:11,53:[1,20],54:12,55:[1,21],56:13,57:[1,22]},{6:28,7:60,8:[1,29],9:[1,30],10:27,14:25,16:77,32:15,34:14,41:23,42:[1,26],44:[1,24],45:9,47:10,48:[1,16],50:[1,18],51:[1,19],52:11,53:[1,20],54:12,55:[1,21],56:13,57:[1,22]},{41:78,42:[1,26]},{34:81,41:23,42:[1,26],45:79,47:80,50:[1,18],51:[1,19]},{7:53,32:15,34:14,39:83,41:23,42:[1,26],44:[1,24],45:9,47:10,48:[1,16],49:[1,82],50:[1,18],51:[1,19],52:11,53:[1,20],54:12,55:[1,21],56:13,57:[1,22]},{49:[1,84]},{6:28,7:60,8:[1,29],9:[1,30],10:27,14:85,32:15,34:14,41:23,42:[1,26],44:[1,24],45:9,47:10,48:[1,16],50:[1,18],51:[1,19],52:11,53:[1,20],54:12,55:[1,21],56:13,57:[1,22]},{5:[2,50],8:[2,50],11:[2,50],12:[2,50],13:[2,50],15:[2,50],17:[2,50],19:[2,50],20:[2,50],21:[2,50],22:[2,50],24:[2,50],25:[2,50],26:[2,50],27:[2,50],28:[2,50],29:[2,50],31:[2,50],33:[2,50],36:[2,50],38:[2,50],40:[2,50],46:[2,50],49:[2,50]},{40:[1,87],46:[1,86]},{40:[2,35],46:[2,35],49:[2,35]},{6:28,7:60,8:[1,29],9:[1,30],10:88,32:15,34:14,41:23,42:[1,26],44:[1,24],45:9,47:10,48:[1,16],50:[1,18],51:[1,19],52:11,53:[1,20],54:12,55:[1,21],56:13,57:[1,22]},{6:28,7:60,8:[1,29],9:[1,30],10:89,32:15,34:14,41:23,42:[1,26],44:[1,24],45:9,47:10,48:[1,16],50:[1,18],51:[1,19],52:11,53:[1,20],54:12,55:[1,21],56:13,57:[1,22]},{6:90,7:60,8:[1,29],9:[1,30],32:15,34:14,41:23,42:[1,26],44:[1,24],45:9,47:10,48:[1,16],50:[1,18],51:[1,19],52:11,53:[1,20],54:12,55:[1,21],56:13,57:[1,22]},{6:91,7:60,8:[1,29],9:[1,30],32:15,34:14,41:23,42:[1,26],44:[1,24],45:9,47:10,48:[1,16],50:[1,18],51:[1,19],52:11,53:[1,20],54:12,55:[1,21],56:13,57:[1,22]},{6:92,7:60,8:[1,29],9:[1,30],32:15,34:14,41:23,42:[1,26],44:[1,24],45:9,47:10,48:[1,16],50:[1,18],51:[1,19],52:11,53:[1,20],54:12,55:[1,21],56:13,57:[1,22]},{5:[2,3],8:[2,3],11:[2,3],12:[2,3],13:[2,3],15:[2,3],17:[2,3],19:[2,3],20:[2,3],21:[2,3],22:[2,3],24:[2,3],25:[2,3],26:[2,3],27:[2,3],28:[2,3],29:[2,3],36:[2,3],38:[2,3],49:[2,3]},{5:[2,2],8:[2,2],11:[2,2],12:[2,2],13:[2,2],15:[2,2],17:[2,2],19:[2,2],20:[2,2],21:[2,2],22:[2,2],24:[2,2],25:[2,2],26:[2,2],27:[2,2],28:[2,2],29:[2,2],36:[2,2],38:[2,2],49:[2,2]},{5:[2,4],8:[2,4],11:[2,4],12:[2,4],13:[2,4],15:[2,4],17:[2,4],19:[2,4],20:[2,4],21:[2,4],22:[2,4],24:[2,4],25:[2,4],26:[2,4],27:[2,4],28:[2,4],29:[2,4],36:[2,4],38:[2,4],49:[2,4]},{5:[2,34],36:[1,33],38:[2,34],49:[2,34]},{5:[2,32],36:[2,32],38:[2,32],49:[2,32]},{5:[2,20],19:[1,42],20:[1,43],21:[1,44],22:[1,45],24:[2,20],25:[2,20],26:[2,20],27:[2,20],28:[2,20],29:[2,20],36:[2,20],38:[2,20],49:[2,20]},{5:[2,21],19:[1,42],20:[1,43],21:[1,44],22:[1,45],24:[2,21],25:[2,21],26:[2,21],27:[2,21],28:[2,21],29:[2,21],36:[2,21],38:[2,21],49:[2,21]},{5:[2,22],19:[1,42],20:[1,43],21:[1,44],22:[1,45],24:[2,22],25:[2,22],26:[2,22],27:[2,22],28:[2,22],29:[2,22],36:[2,22],38:[2,22],49:[2,22]},{5:[2,23],19:[1,42],20:[1,43],21:[1,44],22:[1,45],24:[2,23],25:[2,23],26:[2,23],27:[2,23],28:[2,23],29:[2,23],36:[2,23],38:[2,23],49:[2,23]},{5:[2,24],19:[1,42],20:[1,43],21:[1,44],22:[1,45],24:[2,24],25:[2,24],26:[2,24],27:[2,24],28:[2,24],29:[2,24],36:[2,24],38:[2,24],49:[2,24]},{5:[2,25],19:[1,42],20:[1,43],21:[1,44],22:[1,45],24:[2,25],25:[2,25],26:[2,25],27:[2,25],28:[2,25],29:[2,25],36:[2,25],38:[2,25],49:[2,25]},{5:[2,27],36:[2,27],38:[2,27],49:[2,27]},{5:[2,29],36:[2,29],38:[2,29],43:[1,46],44:[1,47],48:[1,48],49:[2,29]},{5:[2,28],36:[2,28],38:[2,28],49:[2,28]},{5:[2,30],36:[2,30],38:[2,30],43:[1,46],44:[1,47],48:[1,48],49:[2,30]},{5:[2,15],17:[1,50],19:[2,15],20:[2,15],21:[2,15],22:[2,15],24:[2,15],25:[2,15],26:[2,15],27:[2,15],28:[2,15],29:[2,15],36:[2,15],38:[2,15],49:[2,15]},{5:[2,16],17:[1,50],19:[2,16],20:[2,16],21:[2,16],22:[2,16],24:[2,16],25:[2,16],26:[2,16],27:[2,16],28:[2,16],29:[2,16],36:[2,16],38:[2,16],49:[2,16]},{5:[2,17],17:[1,50],19:[2,17],20:[2,17],21:[2,17],22:[2,17],24:[2,17],25:[2,17],26:[2,17],27:[2,17],28:[2,17],29:[2,17],36:[2,17],38:[2,17],49:[2,17]},{5:[2,18],17:[1,50],19:[2,18],20:[2,18],21:[2,18],22:[2,18],24:[2,18],25:[2,18],26:[2,18],27:[2,18],28:[2,18],29:[2,18],36:[2,18],38:[2,18],49:[2,18]},{5:[2,39],8:[2,39],11:[2,39],12:[2,39],13:[2,39],15:[2,39],17:[2,39],19:[2,39],20:[2,39],21:[2,39],22:[2,39],24:[2,39],25:[2,39],26:[2,39],27:[2,39],28:[2,39],29:[2,39],31:[2,39],33:[2,39],36:[2,39],38:[2,39],40:[2,39],43:[2,39],44:[2,39],46:[2,39],48:[2,39],49:[2,39]},{46:[1,93]},{46:[1,94]},{43:[1,46],44:[1,47],46:[1,95],48:[1,48]},{5:[2,43],8:[2,43],11:[2,43],12:[2,43],13:[2,43],15:[2,43],17:[2,43],19:[2,43],20:[2,43],21:[2,43],22:[2,43],24:[2,43],25:[2,43],26:[2,43],27:[2,43],28:[2,43],29:[2,43],31:[2,43],33:[2,43],36:[2,43],38:[2,43],40:[2,43],43:[2,43],44:[2,43],46:[2,43],48:[2,43],49:[2,43]},{40:[1,87],49:[1,96]},{5:[2,59],8:[2,59],11:[2,59],12:[2,59],13:[2,59],15:[2,59],17:[2,59],19:[2,59],20:[2,59],21:[2,59],22:[2,59],24:[2,59],25:[2,59],26:[2,59],27:[2,59],28:[2,59],29:[2,59],31:[2,59],33:[2,59],36:[2,59],38:[2,59],40:[2,59],46:[2,59],49:[2,59]},{5:[2,13],8:[1,55],15:[1,54],17:[2,13],19:[2,13],20:[2,13],21:[2,13],22:[2,13],24:[2,13],25:[2,13],26:[2,13],27:[2,13],28:[2,13],29:[2,13],36:[2,13],38:[2,13],49:[2,13]},{5:[2,51],8:[2,51],11:[2,51],12:[2,51],13:[2,51],15:[2,51],17:[2,51],19:[2,51],20:[2,51],21:[2,51],22:[2,51],24:[2,51],25:[2,51],26:[2,51],27:[2,51],28:[2,51],29:[2,51],31:[2,51],33:[2,51],36:[2,51],38:[2,51],40:[2,51],46:[2,51],49:[2,51]},{7:97,32:15,34:14,41:23,42:[1,26],44:[1,24],45:9,47:10,48:[1,16],50:[1,18],51:[1,19],52:11,53:[1,20],54:12,55:[1,21],56:13,57:[1,22]},{5:[2,10],8:[2,10],11:[1,56],12:[1,57],13:[1,58],15:[2,10],17:[2,10],19:[2,10],20:[2,10],21:[2,10],22:[2,10],24:[2,10],25:[2,10],26:[2,10],27:[2,10],28:[2,10],29:[2,10],36:[2,10],38:[2,10],49:[2,10]},{5:[2,11],8:[2,11],11:[1,56],12:[1,57],13:[1,58],15:[2,11],17:[2,11],19:[2,11],20:[2,11],21:[2,11],22:[2,11],24:[2,11],25:[2,11],26:[2,11],27:[2,11],28:[2,11],29:[2,11],36:[2,11],38:[2,11],49:[2,11]},{5:[2,6],8:[2,6],11:[2,6],12:[2,6],13:[2,6],15:[2,6],17:[2,6],19:[2,6],20:[2,6],21:[2,6],22:[2,6],24:[2,6],25:[2,6],26:[2,6],27:[2,6],28:[2,6],29:[2,6],36:[2,6],38:[2,6],49:[2,6]},{5:[2,7],8:[2,7],11:[2,7],12:[2,7],13:[2,7],15:[2,7],17:[2,7],19:[2,7],20:[2,7],21:[2,7],22:[2,7],24:[2,7],25:[2,7],26:[2,7],27:[2,7],28:[2,7],29:[2,7],36:[2,7],38:[2,7],49:[2,7]},{5:[2,8],8:[2,8],11:[2,8],12:[2,8],13:[2,8],15:[2,8],17:[2,8],19:[2,8],20:[2,8],21:[2,8],22:[2,8],24:[2,8],25:[2,8],26:[2,8],27:[2,8],28:[2,8],29:[2,8],36:[2,8],38:[2,8],49:[2,8]},{5:[2,40],8:[2,40],11:[2,40],12:[2,40],13:[2,40],15:[2,40],17:[2,40],19:[2,40],20:[2,40],21:[2,40],22:[2,40],24:[2,40],25:[2,40],26:[2,40],27:[2,40],28:[2,40],29:[2,40],31:[2,40],33:[2,40],36:[2,40],38:[2,40],40:[2,40],43:[2,40],44:[2,40],46:[2,40],48:[2,40],49:[2,40]},{5:[2,41],8:[2,41],11:[2,41],12:[2,41],13:[2,41],15:[2,41],17:[2,41],19:[2,41],20:[2,41],21:[2,41],22:[2,41],24:[2,41],25:[2,41],26:[2,41],27:[2,41],28:[2,41],29:[2,41],31:[2,41],33:[2,41],36:[2,41],38:[2,41],40:[2,41],43:[2,41],44:[2,41],46:[2,41],48:[2,41],49:[2,41]},{5:[2,42],8:[2,42],11:[2,42],12:[2,42],13:[2,42],15:[2,42],17:[2,42],19:[2,42],20:[2,42],21:[2,42],22:[2,42],24:[2,42],25:[2,42],26:[2,42],27:[2,42],28:[2,42],29:[2,42],31:[2,42],33:[2,42],36:[2,42],38:[2,42],40:[2,42],43:[2,42],44:[2,42],46:[2,42],48:[2,42],49:[2,42]},{5:[2,44],8:[2,44],11:[2,44],12:[2,44],13:[2,44],15:[2,44],17:[2,44],19:[2,44],20:[2,44],21:[2,44],22:[2,44],24:[2,44],25:[2,44],26:[2,44],27:[2,44],28:[2,44],29:[2,44],31:[2,44],33:[2,44],36:[2,44],38:[2,44],40:[2,44],43:[2,44],44:[2,44],46:[2,44],48:[2,44],49:[2,44]},{40:[2,36],46:[2,36],49:[2,36]}],
	defaultActions: {31:[2,1]},
	parseError: function parseError(str, hash) {
	    if (hash.recoverable) {
	        this.trace(str);
	    } else {
	        throw new Error(str);
	    }
	},
	parse: function parse(input) {
	    var self = this, stack = [0], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
	    var args = lstack.slice.call(arguments, 1);
	    this.lexer.setInput(input);
	    this.lexer.yy = this.yy;
	    this.yy.lexer = this.lexer;
	    this.yy.parser = this;
	    if (typeof this.lexer.yylloc == 'undefined') {
	        this.lexer.yylloc = {};
	    }
	    var yyloc = this.lexer.yylloc;
	    lstack.push(yyloc);
	    var ranges = this.lexer.options && this.lexer.options.ranges;
	    if (typeof this.yy.parseError === 'function') {
	        this.parseError = this.yy.parseError;
	    } else {
	        this.parseError = Object.getPrototypeOf(this).parseError;
	    }
	    function popStack(n) {
	        stack.length = stack.length - 2 * n;
	        vstack.length = vstack.length - n;
	        lstack.length = lstack.length - n;
	    }
	    function lex() {
	        var token;
	        token = self.lexer.lex() || EOF;
	        if (typeof token !== 'number') {
	            token = self.symbols_[token] || token;
	        }
	        return token;
	    }
	    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
	    while (true) {
	        state = stack[stack.length - 1];
	        if (this.defaultActions[state]) {
	            action = this.defaultActions[state];
	        } else {
	            if (symbol === null || typeof symbol == 'undefined') {
	                symbol = lex();
	            }
	            action = table[state] && table[state][symbol];
	        }
	                    if (typeof action === 'undefined' || !action.length || !action[0]) {
	                var errStr = '';
	                expected = [];
	                for (p in table[state]) {
	                    if (this.terminals_[p] && p > TERROR) {
	                        expected.push('\'' + this.terminals_[p] + '\'');
	                    }
	                }
	                if (this.lexer.showPosition) {
	                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + this.lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
	                } else {
	                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
	                }
	                this.parseError(errStr, {
	                    text: this.lexer.match,
	                    token: this.terminals_[symbol] || symbol,
	                    line: this.lexer.yylineno,
	                    loc: yyloc,
	                    expected: expected
	                });
	            }
	        if (action[0] instanceof Array && action.length > 1) {
	            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
	        }
	        switch (action[0]) {
	        case 1:
	            stack.push(symbol);
	            vstack.push(this.lexer.yytext);
	            lstack.push(this.lexer.yylloc);
	            stack.push(action[1]);
	            symbol = null;
	            if (!preErrorSymbol) {
	                yyleng = this.lexer.yyleng;
	                yytext = this.lexer.yytext;
	                yylineno = this.lexer.yylineno;
	                yyloc = this.lexer.yylloc;
	                if (recovering > 0) {
	                    recovering--;
	                }
	            } else {
	                symbol = preErrorSymbol;
	                preErrorSymbol = null;
	            }
	            break;
	        case 2:
	            len = this.productions_[action[1]][1];
	            yyval.$ = vstack[vstack.length - len];
	            yyval._$ = {
	                first_line: lstack[lstack.length - (len || 1)].first_line,
	                last_line: lstack[lstack.length - 1].last_line,
	                first_column: lstack[lstack.length - (len || 1)].first_column,
	                last_column: lstack[lstack.length - 1].last_column
	            };
	            if (ranges) {
	                yyval._$.range = [
	                    lstack[lstack.length - (len || 1)].range[0],
	                    lstack[lstack.length - 1].range[1]
	                ];
	            }
	            r = this.performAction.apply(yyval, [
	                yytext,
	                yyleng,
	                yylineno,
	                this.yy,
	                action[1],
	                vstack,
	                lstack
	            ].concat(args));
	            if (typeof r !== 'undefined') {
	                return r;
	            }
	            if (len) {
	                stack = stack.slice(0, -1 * len * 2);
	                vstack = vstack.slice(0, -1 * len);
	                lstack = lstack.slice(0, -1 * len);
	            }
	            stack.push(this.productions_[action[1]][0]);
	            vstack.push(yyval.$);
	            lstack.push(yyval._$);
	            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
	            stack.push(newState);
	            break;
	        case 3:
	            return true;
	        }
	    }
	    return true;
	}};
	/* generated by jison-lex 0.2.1 */
	var lexer = (function(){
	var lexer = {

	EOF:1,

	parseError:function parseError(str, hash) {
	        if (this.yy.parser) {
	            this.yy.parser.parseError(str, hash);
	        } else {
	            throw new Error(str);
	        }
	    },

	// resets the lexer, sets new input
	setInput:function (input) {
	        this._input = input;
	        this._more = this._backtrack = this.done = false;
	        this.yylineno = this.yyleng = 0;
	        this.yytext = this.matched = this.match = '';
	        this.conditionStack = ['INITIAL'];
	        this.yylloc = {
	            first_line: 1,
	            first_column: 0,
	            last_line: 1,
	            last_column: 0
	        };
	        if (this.options.ranges) {
	            this.yylloc.range = [0,0];
	        }
	        this.offset = 0;
	        return this;
	    },

	// consumes and returns one char from the input
	input:function () {
	        var ch = this._input[0];
	        this.yytext += ch;
	        this.yyleng++;
	        this.offset++;
	        this.match += ch;
	        this.matched += ch;
	        var lines = ch.match(/(?:\r\n?|\n).*/g);
	        if (lines) {
	            this.yylineno++;
	            this.yylloc.last_line++;
	        } else {
	            this.yylloc.last_column++;
	        }
	        if (this.options.ranges) {
	            this.yylloc.range[1]++;
	        }

	        this._input = this._input.slice(1);
	        return ch;
	    },

	// unshifts one char (or a string) into the input
	unput:function (ch) {
	        var len = ch.length;
	        var lines = ch.split(/(?:\r\n?|\n)/g);

	        this._input = ch + this._input;
	        this.yytext = this.yytext.substr(0, this.yytext.length - len - 1);
	        //this.yyleng -= len;
	        this.offset -= len;
	        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
	        this.match = this.match.substr(0, this.match.length - 1);
	        this.matched = this.matched.substr(0, this.matched.length - 1);

	        if (lines.length - 1) {
	            this.yylineno -= lines.length - 1;
	        }
	        var r = this.yylloc.range;

	        this.yylloc = {
	            first_line: this.yylloc.first_line,
	            last_line: this.yylineno + 1,
	            first_column: this.yylloc.first_column,
	            last_column: lines ?
	                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
	                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
	              this.yylloc.first_column - len
	        };

	        if (this.options.ranges) {
	            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
	        }
	        this.yyleng = this.yytext.length;
	        return this;
	    },

	// When called from action, caches matched text and appends it on next action
	more:function () {
	        this._more = true;
	        return this;
	    },

	// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
	reject:function () {
	        if (this.options.backtrack_lexer) {
	            this._backtrack = true;
	        } else {
	            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
	                text: "",
	                token: null,
	                line: this.yylineno
	            });

	        }
	        return this;
	    },

	// retain first n characters of the match
	less:function (n) {
	        this.unput(this.match.slice(n));
	    },

	// displays already matched input, i.e. for error messages
	pastInput:function () {
	        var past = this.matched.substr(0, this.matched.length - this.match.length);
	        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
	    },

	// displays upcoming input, i.e. for error messages
	upcomingInput:function () {
	        var next = this.match;
	        if (next.length < 20) {
	            next += this._input.substr(0, 20-next.length);
	        }
	        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
	    },

	// displays the character position where the lexing error occurred, i.e. for error messages
	showPosition:function () {
	        var pre = this.pastInput();
	        var c = new Array(pre.length + 1).join("-");
	        return pre + this.upcomingInput() + "\n" + c + "^";
	    },

	// test the lexed token: return FALSE when not a match, otherwise return token
	test_match:function (match, indexed_rule) {
	        var token,
	            lines,
	            backup;

	        if (this.options.backtrack_lexer) {
	            // save context
	            backup = {
	                yylineno: this.yylineno,
	                yylloc: {
	                    first_line: this.yylloc.first_line,
	                    last_line: this.last_line,
	                    first_column: this.yylloc.first_column,
	                    last_column: this.yylloc.last_column
	                },
	                yytext: this.yytext,
	                match: this.match,
	                matches: this.matches,
	                matched: this.matched,
	                yyleng: this.yyleng,
	                offset: this.offset,
	                _more: this._more,
	                _input: this._input,
	                yy: this.yy,
	                conditionStack: this.conditionStack.slice(0),
	                done: this.done
	            };
	            if (this.options.ranges) {
	                backup.yylloc.range = this.yylloc.range.slice(0);
	            }
	        }

	        lines = match[0].match(/(?:\r\n?|\n).*/g);
	        if (lines) {
	            this.yylineno += lines.length;
	        }
	        this.yylloc = {
	            first_line: this.yylloc.last_line,
	            last_line: this.yylineno + 1,
	            first_column: this.yylloc.last_column,
	            last_column: lines ?
	                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
	                         this.yylloc.last_column + match[0].length
	        };
	        this.yytext += match[0];
	        this.match += match[0];
	        this.matches = match;
	        this.yyleng = this.yytext.length;
	        if (this.options.ranges) {
	            this.yylloc.range = [this.offset, this.offset += this.yyleng];
	        }
	        this._more = false;
	        this._backtrack = false;
	        this._input = this._input.slice(match[0].length);
	        this.matched += match[0];
	        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
	        if (this.done && this._input) {
	            this.done = false;
	        }
	        if (token) {
	            return token;
	        } else if (this._backtrack) {
	            // recover context
	            for (var k in backup) {
	                this[k] = backup[k];
	            }
	            return false; // rule action called reject() implying the next rule should be tested instead.
	        }
	        return false;
	    },

	// return next match in input
	next:function () {
	        if (this.done) {
	            return this.EOF;
	        }
	        if (!this._input) {
	            this.done = true;
	        }

	        var token,
	            match,
	            tempMatch,
	            index;
	        if (!this._more) {
	            this.yytext = '';
	            this.match = '';
	        }
	        var rules = this._currentRules();
	        for (var i = 0; i < rules.length; i++) {
	            tempMatch = this._input.match(this.rules[rules[i]]);
	            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
	                match = tempMatch;
	                index = i;
	                if (this.options.backtrack_lexer) {
	                    token = this.test_match(tempMatch, rules[i]);
	                    if (token !== false) {
	                        return token;
	                    } else if (this._backtrack) {
	                        match = false;
	                        continue; // rule action called reject() implying a rule MISmatch.
	                    } else {
	                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
	                        return false;
	                    }
	                } else if (!this.options.flex) {
	                    break;
	                }
	            }
	        }
	        if (match) {
	            token = this.test_match(match, rules[index]);
	            if (token !== false) {
	                return token;
	            }
	            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
	            return false;
	        }
	        if (this._input === "") {
	            return this.EOF;
	        } else {
	            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
	                text: "",
	                token: null,
	                line: this.yylineno
	            });
	        }
	    },

	// return next match that has a token
	lex:function lex() {
	        var r = this.next();
	        if (r) {
	            return r;
	        } else {
	            return this.lex();
	        }
	    },

	// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
	begin:function begin(condition) {
	        this.conditionStack.push(condition);
	    },

	// pop the previously active lexer condition state off the condition stack
	popState:function popState() {
	        var n = this.conditionStack.length - 1;
	        if (n > 0) {
	            return this.conditionStack.pop();
	        } else {
	            return this.conditionStack[0];
	        }
	    },

	// produce the lexer rule set which is active for the currently active lexer condition state
	_currentRules:function _currentRules() {
	        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
	            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
	        } else {
	            return this.conditions["INITIAL"].rules;
	        }
	    },

	// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
	topState:function topState(n) {
	        n = this.conditionStack.length - 1 - Math.abs(n || 0);
	        if (n >= 0) {
	            return this.conditionStack[n];
	        } else {
	            return "INITIAL";
	        }
	    },

	// alias for begin(condition)
	pushState:function pushState(condition) {
	        this.begin(condition);
	    },

	// return the number of states currently on the stack
	stateStackSize:function stateStackSize() {
	        return this.conditionStack.length;
	    },
	options: {},
	performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {

	var YYSTATE=YY_START;
	switch($avoiding_name_collisions) {
	case 0:return 31;
	break;
	case 1:return 33;
	break;
	case 2:return 'from';
	break;
	case 3:return 24;
	break;
	case 4:return 25;
	break;
	case 5:return 26;
	break;
	case 6:return 27;
	break;
	case 7:return 21;
	break;
	case 8:return 19;
	break;
	case 9:return 22;
	break;
	case 10:return 20;
	break;
	case 11:return 28;
	break;
	case 12:return 29;
	break;
	case 13:return 36;
	break;
	case 14:return 38;
	break;
	case 15:return 57;
	break;
	case 16:return 55;
	break;
	case 17:/* skip whitespace */
	break;
	case 18:return 51;
	break;
	case 19:return 50;
	break;
	case 20:return 50;
	break;
	case 21:return 42;
	break;
	case 22:return 53;
	break;
	case 23:return 43;
	break;
	case 24:return 11;
	break;
	case 25:return 12;
	break;
	case 26:return 13;
	break;
	case 27:return 40;
	break;
	case 28:return 8;
	break;
	case 29:return 28;
	break;
	case 30:return 29;
	break;
	case 31:return 25;
	break;
	case 32:return 24;
	break;
	case 33:return 27;
	break;
	case 34:return 26;
	break;
	case 35:return 21;
	break;
	case 36:return 22;
	break;
	case 37:return 20;
	break;
	case 38:return 19;
	break;
	case 39:return 36;
	break;
	case 40:return 38;
	break;
	case 41:return 15;
	break;
	case 42:return 17;
	break;
	case 43:return 48;
	break;
	case 44:return 46;
	break;
	case 45:return 44;
	break;
	case 46:return 49;
	break;
	case 47:return 9;
	break;
	case 48:return 5;
	break;
	}
	},
	rules: [/^(?:\s+in\b)/,/^(?:\s+notIn\b)/,/^(?:\s+from\b)/,/^(?:\s+(eq|EQ)\b)/,/^(?:\s+(seq|SEQ)\b)/,/^(?:\s+(neq|NEQ)\b)/,/^(?:\s+(sneq|SNEQ)\b)/,/^(?:\s+(lte|LTE)\b)/,/^(?:\s+(lt|LT)\b)/,/^(?:\s+(gte|GTE)\b)/,/^(?:\s+(gt|GT)\b)/,/^(?:\s+(like|LIKE)\b)/,/^(?:\s+(notLike|NOT_LIKE)\b)/,/^(?:\s+(and|AND)\b)/,/^(?:\s+(or|OR)\b)/,/^(?:\s+null\b)/,/^(?:\s+(true|false)\b)/,/^(?:\s+)/,/^(?:-?[0-9]+(?:\.[0-9]+)?\b)/,/^(?:'[^']*')/,/^(?:"[^"]*")/,/^(?:([a-zA-Z_$][0-9a-zA-Z_$]*))/,/^(?:^\/((?![\s=])[^[\/\n\\]*(?:(?:\\[\s\S]|\[[^\]\n\\]*(?:\\[\s\S][^\]\n\\]*)*])[^[\/\n\\]*)*\/[imgy]{0,4})(?!\w))/,/^(?:\.)/,/^(?:\*)/,/^(?:\/)/,/^(?:\%)/,/^(?:,)/,/^(?:-)/,/^(?:=~)/,/^(?:!=~)/,/^(?:===)/,/^(?:==)/,/^(?:!==)/,/^(?:!=)/,/^(?:<=)/,/^(?:>=)/,/^(?:>)/,/^(?:<)/,/^(?:&&)/,/^(?:\|\|)/,/^(?:\+)/,/^(?:\^)/,/^(?:\()/,/^(?:\])/,/^(?:\[)/,/^(?:\))/,/^(?:!)/,/^(?:$)/],
	conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48],"inclusive":true}}
	};
	return lexer;
	})();
	parser.lexer = lexer;
	function Parser () {
	  this.yy = {};
	}
	Parser.prototype = parser;parser.Parser = Parser;
	return new Parser;
	})();


	if (true) {
	exports.parser = parser;
	exports.Parser = parser.Parser;
	exports.parse = function () { return parser.parse.apply(parser, arguments); };
	exports.main = function commonjsMain(args) {
	    if (!args[1]) {
	        console.log('Usage: '+args[0]+' FILE');
	        process.exit(1);
	    }
	    var source = __webpack_require__(29).readFileSync(__webpack_require__(30).normalize(args[1]), "utf8");
	    return exports.parser.parse(source);
	};
	if (typeof module !== 'undefined' && __webpack_require__.c[0] === module) {
	  exports.main(process.argv.slice(1));
	}
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(23), __webpack_require__(28)(module)))

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var tokens = __webpack_require__(35),
	    extd = __webpack_require__(5),
	    keys = extd.hash.keys,
	    utils = __webpack_require__(36);

	var parse = function (src, keywords, context) {
	    var orig = src;
	    src = src.replace(/\/\/(.*)/g, "").replace(/\n|\r|\r\n/g, " ");

	    var blockTypes = new RegExp("^(" + keys(keywords).join("|") + ")"), index;
	    while (src && (index = utils.findNextTokenIndex(src)) !== -1) {
	        src = src.substr(index);
	        var blockType = src.match(blockTypes);
	        if (blockType !== null) {
	            blockType = blockType[1];
	            if (blockType in keywords) {
	                try {
	                    src = keywords[blockType](src, context, parse).replace(/^\s*|\s*$/g, "");
	                } catch (e) {
	                    throw new Error("Invalid " + blockType + " definition \n" + e.message + "; \nstarting at : " + orig);
	                }
	            } else {
	                throw new Error("Unknown token" + blockType);
	            }
	        } else {
	            throw new Error("Error parsing " + src);
	        }
	    }
	};

	exports.parse = function (src, file) {
	    var context = {define: [], rules: [], scope: [], loaded: [], file: file};
	    parse(src, tokens, context);
	    return context;
	};



/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {"use strict";

	var utils = __webpack_require__(36),
	    fs = __webpack_require__(29),
	    extd = __webpack_require__(5),
	    filter = extd.filter,
	    indexOf = extd.indexOf,
	    predicates = ["not", "or", "exists"],
	    predicateRegExp = new RegExp("^(" + predicates.join("|") + ") *\\((.*)\\)$", "m"),
	    predicateBeginExp = new RegExp(" *(" + predicates.join("|") + ") *\\(", "g");

	var isWhiteSpace = function (str) {
	    return str.replace(/[\s|\n|\r|\t]/g, "").length === 0;
	};

	var joinFunc = function (m, str) {
	    return "; " + str;
	};

	var splitRuleLineByPredicateExpressions = function (ruleLine) {
	    var str = ruleLine.replace(/,\s*(\$?\w+\s*:)/g, joinFunc);
	    var parts = filter(str.split(predicateBeginExp), function (str) {
	            return str !== "";
	        }),
	        l = parts.length, ret = [];

	    if (l) {
	        for (var i = 0; i < l; i++) {
	            if (indexOf(predicates, parts[i]) !== -1) {
	                ret.push([parts[i], "(", parts[++i].replace(/, *$/, "")].join(""));
	            } else {
	                ret.push(parts[i].replace(/, *$/, ""));
	            }
	        }
	    } else {
	        return str;
	    }
	    return ret.join(";");
	};

	var ruleTokens = {

	    salience: (function () {
	        var salienceRegexp = /^(salience|priority)\s*:\s*(-?\d+)\s*[,;]?/;
	        return function (src, context) {
	            if (salienceRegexp.test(src)) {
	                var parts = src.match(salienceRegexp),
	                    priority = parseInt(parts[2], 10);
	                if (!isNaN(priority)) {
	                    context.options.priority = priority;
	                } else {
	                    throw new Error("Invalid salience/priority " + parts[2]);
	                }
	                return src.replace(parts[0], "");
	            } else {
	                throw new Error("invalid format");
	            }
	        };
	    })(),

	    agendaGroup: (function () {
	        var agendaGroupRegexp = /^(agenda-group|agendaGroup)\s*:\s*([a-zA-Z_$][0-9a-zA-Z_$]*|"[^"]*"|'[^']*')\s*[,;]?/;
	        return function (src, context) {
	            if (agendaGroupRegexp.test(src)) {
	                var parts = src.match(agendaGroupRegexp),
	                    agendaGroup = parts[2];
	                if (agendaGroup) {
	                    context.options.agendaGroup = agendaGroup.replace(/^["']|["']$/g, "");
	                } else {
	                    throw new Error("Invalid agenda-group " + parts[2]);
	                }
	                return src.replace(parts[0], "");
	            } else {
	                throw new Error("invalid format");
	            }
	        };
	    })(),

	    autoFocus: (function () {
	        var autoFocusRegexp = /^(auto-focus|autoFocus)\s*:\s*(true|false)\s*[,;]?/;
	        return function (src, context) {
	            if (autoFocusRegexp.test(src)) {
	                var parts = src.match(autoFocusRegexp),
	                    autoFocus = parts[2];
	                if (autoFocus) {
	                    context.options.autoFocus = autoFocus === "true" ? true : false;
	                } else {
	                    throw new Error("Invalid auto-focus " + parts[2]);
	                }
	                return src.replace(parts[0], "");
	            } else {
	                throw new Error("invalid format");
	            }
	        };
	    })(),

	    "agenda-group": function () {
	        return this.agendaGroup.apply(this, arguments);
	    },

	    "auto-focus": function () {
	        return this.autoFocus.apply(this, arguments);
	    },

	    priority: function () {
	        return this.salience.apply(this, arguments);
	    },

	    when: (function () {
	        /*jshint evil:true*/

	        var ruleRegExp = /^(\$?\w+) *: *(\w+)(.*)/;

	        var constraintRegExp = /(\{ *(?:["']?\$?\w+["']?\s*:\s*["']?\$?\w+["']? *(?:, *["']?\$?\w+["']?\s*:\s*["']?\$?\w+["']?)*)+ *\})/;
	        var fromRegExp = /(\bfrom\s+.*)/;
	        var parseRules = function (str) {
	            var rules = [];
	            var ruleLines = str.split(";"), l = ruleLines.length, ruleLine;
	            for (var i = 0; i < l && (ruleLine = ruleLines[i].replace(/^\s*|\s*$/g, "").replace(/\n/g, "")); i++) {
	                if (!isWhiteSpace(ruleLine)) {
	                    var rule = [];
	                    if (predicateRegExp.test(ruleLine)) {
	                        var m = ruleLine.match(predicateRegExp);
	                        var pred = m[1].replace(/^\s*|\s*$/g, "");
	                        rule.push(pred);
	                        ruleLine = m[2].replace(/^\s*|\s*$/g, "");
	                        if (pred === "or") {
	                            rule = rule.concat(parseRules(splitRuleLineByPredicateExpressions(ruleLine)));
	                            rules.push(rule);
	                            continue;
	                        }

	                    }
	                    var parts = ruleLine.match(ruleRegExp);
	                    if (parts && parts.length) {
	                        rule.push(parts[2], parts[1]);
	                        var constraints = parts[3].replace(/^\s*|\s*$/g, "");
	                        var hashParts = constraints.match(constraintRegExp), from = null, fromMatch;
	                        if (hashParts) {
	                            var hash = hashParts[1], constraint = constraints.replace(hash, "");
	                            if (fromRegExp.test(constraint)) {
	                                fromMatch = constraint.match(fromRegExp);
	                                from = fromMatch[0];
	                                constraint = constraint.replace(fromMatch[0], "");
	                            }
	                            if (constraint) {
	                                rule.push(constraint.replace(/^\s*|\s*$/g, ""));
	                            }
	                            if (hash) {
	                                rule.push(eval("(" + hash.replace(/(\$?\w+)\s*:\s*(\$?\w+)/g, '"$1" : "$2"') + ")"));
	                            }
	                        } else if (constraints && !isWhiteSpace(constraints)) {
	                            if (fromRegExp.test(constraints)) {
	                                fromMatch = constraints.match(fromRegExp);
	                                from = fromMatch[0];
	                                constraints = constraints.replace(fromMatch[0], "");
	                            }
	                            rule.push(constraints);
	                        }
	                        if (from) {
	                            rule.push(from);
	                        }
	                        rules.push(rule);
	                    } else {
	                        throw new Error("Invalid constraint " + ruleLine);
	                    }
	                }
	            }
	            return rules;
	        };

	        return function (orig, context) {
	            var src = orig.replace(/^when\s*/, "").replace(/^\s*|\s*$/g, "");
	            if (utils.findNextToken(src) === "{") {
	                var body = utils.getTokensBetween(src, "{", "}", true).join("");
	                src = src.replace(body, "");
	                context.constraints = parseRules(body.replace(/^\{\s*|\}\s*$/g, ""));
	                return src;
	            } else {
	                throw new Error("unexpected token : expected : '{' found : '" + utils.findNextToken(src) + "'");
	            }
	        };
	    })(),

	    then: (function () {
	        return function (orig, context) {
	            if (!context.action) {
	                var src = orig.replace(/^then\s*/, "").replace(/^\s*|\s*$/g, "");
	                if (utils.findNextToken(src) === "{") {
	                    var body = utils.getTokensBetween(src, "{", "}", true).join("");
	                    src = src.replace(body, "");
	                    if (!context.action) {
	                        context.action = body.replace(/^\{\s*|\}\s*$/g, "");
	                    }
	                    if (!isWhiteSpace(src)) {
	                        throw new Error("Error parsing then block " + orig);
	                    }
	                    return src;
	                } else {
	                    throw new Error("unexpected token : expected : '{' found : '" + utils.findNextToken(src) + "'");
	                }
	            } else {
	                throw new Error("action already defined for rule" + context.name);
	            }

	        };
	    })()
	};

	var topLevelTokens = {
	    "/": function (orig) {
	        if (orig.match(/^\/\*/)) {
	            // Block Comment parse
	            return orig.replace(/\/\*.*?\*\//, "");
	        } else {
	            return orig;
	        }
	    },

	    "define": function (orig, context) {
	        var src = orig.replace(/^define\s*/, "");
	        var name = src.match(/^([a-zA-Z_$][0-9a-zA-Z_$]*)/);
	        if (name) {
	            src = src.replace(name[0], "").replace(/^\s*|\s*$/g, "");
	            if (utils.findNextToken(src) === "{") {
	                name = name[1];
	                var body = utils.getTokensBetween(src, "{", "}", true).join("");
	                src = src.replace(body, "");
	                //should
	                context.define.push({name: name, properties: "(" + body + ")"});
	                return src;
	            } else {
	                throw new Error("unexpected token : expected : '{' found : '" + utils.findNextToken(src) + "'");
	            }
	        } else {
	            throw new Error("missing name");
	        }
	    },

	    "import": function (orig, context, parse) {
	        if (typeof window !== 'undefined') {
	            throw new Error("import cannot be used in a browser");
	        }
	        var src = orig.replace(/^import\s*/, "");
	        if (utils.findNextToken(src) === "(") {
	            var file = utils.getParamList(src);
	            src = src.replace(file, "").replace(/^\s*|\s*$/g, "");
	            utils.findNextToken(src) === ";" && (src = src.replace(/\s*;/, ""));
	            file = file.replace(/[\(|\)]/g, "").split(",");
	            if (file.length === 1) {
	                file = utils.resolve(context.file || process.cwd(), file[0].replace(/["|']/g, ""));
	                if (indexOf(context.loaded, file) === -1) {
	                    var origFile = context.file;
	                    context.file = file;
	                    parse(fs.readFileSync(file, "utf8"), topLevelTokens, context);
	                    context.loaded.push(file);
	                    context.file = origFile;
	                }
	                return src;
	            } else {
	                throw new Error("import accepts a single file");
	            }
	        } else {
	            throw new Error("unexpected token : expected : '(' found : '" + utils.findNextToken(src) + "'");
	        }

	    },

	    //define a global
	    "global": function (orig, context) {
	        var src = orig.replace(/^global\s*/, "");
	        var name = src.match(/^([a-zA-Z_$][0-9a-zA-Z_$]*\s*)/);
	        if (name) {
	            src = src.replace(name[0], "").replace(/^\s*|\s*$/g, "");
	            if (utils.findNextToken(src) === "=") {
	                name = name[1].replace(/^\s+|\s+$/g, '');
	                var fullbody = utils.getTokensBetween(src, "=", ";", true).join("");
	                var body = fullbody.substring(1, fullbody.length - 1);
	                body = body.replace(/^\s+|\s+$/g, '');
	                if (/^require\(/.test(body)) {
	                    var file = utils.getParamList(body.replace("require")).replace(/[\(|\)]/g, "").split(",");
	                    if (file.length === 1) {
	                        //handle relative require calls
	                        file = file[0].replace(/["|']/g, "");
	                        body = ["require('", utils.resolve(context.file || process.cwd(), file) , "')"].join("");
	                    }
	                }
	                context.scope.push({name: name, body: body});
	                src = src.replace(fullbody, "");
	                return src;
	            } else {
	                throw new Error("unexpected token : expected : '=' found : '" + utils.findNextToken(src) + "'");
	            }
	        } else {
	            throw new Error("missing name");
	        }
	    },

	    //define a function
	    "function": function (orig, context) {
	        var src = orig.replace(/^function\s*/, "");
	        //parse the function name
	        var name = src.match(/^([a-zA-Z_$][0-9a-zA-Z_$]*)\s*/);
	        if (name) {
	            src = src.replace(name[0], "");
	            if (utils.findNextToken(src) === "(") {
	                name = name[1];
	                var params = utils.getParamList(src);
	                src = src.replace(params, "").replace(/^\s*|\s*$/g, "");
	                if (utils.findNextToken(src) === "{") {
	                    var body = utils.getTokensBetween(src, "{", "}", true).join("");
	                    src = src.replace(body, "");
	                    //should
	                    context.scope.push({name: name, body: "function" + params + body});
	                    return src;
	                } else {
	                    throw new Error("unexpected token : expected : '{' found : '" + utils.findNextToken(src) + "'");
	                }
	            } else {
	                throw new Error("unexpected token : expected : '(' found : '" + utils.findNextToken(src) + "'");
	            }
	        } else {
	            throw new Error("missing name");
	        }
	    },

	    "rule": function (orig, context, parse) {
	        var src = orig.replace(/^rule\s*/, "");
	        var name = src.match(/^([a-zA-Z_$][0-9a-zA-Z_$]*|"[^"]*"|'[^']*')/);
	        if (name) {
	            src = src.replace(name[0], "").replace(/^\s*|\s*$/g, "");
	            if (utils.findNextToken(src) === "{") {
	                name = name[1].replace(/^["']|["']$/g, "");
	                var rule = {name: name, options: {}, constraints: null, action: null};
	                var body = utils.getTokensBetween(src, "{", "}", true).join("");
	                src = src.replace(body, "");
	                parse(body.replace(/^\{\s*|\}\s*$/g, ""), ruleTokens, rule);
	                context.rules.push(rule);
	                return src;
	            } else {
	                throw new Error("unexpected token : expected : '{' found : '" + utils.findNextToken(src) + "'");
	            }
	        } else {
	            throw new Error("missing name");
	        }

	    }
	};
	module.exports = topLevelTokens;


	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(23)))

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {"use strict";

	var path = __webpack_require__(30);
	var WHITE_SPACE_REG = /[\s|\n|\r|\t]/,
	    pathSep = path.sep || ( process.platform === 'win32' ? '\\' : '/' );

	var TOKEN_INVERTS = {
	    "{": "}",
	    "}": "{",
	    "(": ")",
	    ")": "(",
	    "[": "]"
	};

	var getTokensBetween = exports.getTokensBetween = function (str, start, stop, includeStartEnd) {
	    var depth = 0, ret = [];
	    if (!start) {
	        start = TOKEN_INVERTS[stop];
	        depth = 1;
	    }
	    if (!stop) {
	        stop = TOKEN_INVERTS[start];
	    }
	    str = Object(str);
	    var startPushing = false, token, cursor = 0, found = false;
	    while ((token = str.charAt(cursor++))) {
	        if (token === start) {
	            depth++;
	            if (!startPushing) {
	                startPushing = true;
	                if (includeStartEnd) {
	                    ret.push(token);
	                }
	            } else {
	                ret.push(token);
	            }
	        } else if (token === stop && cursor) {
	            depth--;
	            if (depth === 0) {
	                if (includeStartEnd) {
	                    ret.push(token);
	                }
	                found = true;
	                break;
	            }
	            ret.push(token);
	        } else if (startPushing) {
	            ret.push(token);
	        }
	    }
	    if (!found) {
	        throw new Error("Unable to match " + start + " in " + str);
	    }
	    return ret;
	};

	exports.getParamList = function (str) {
	    return  getTokensBetween(str, "(", ")", true).join("");
	};

	exports.resolve = function (from, to) {
	    if (path.extname(from) !== '') {
	        from = path.dirname(from);
	    }
	    if (to.split(pathSep).length === 1) {
	        return to;
	    }
	    return path.resolve(from, to);

	};

	var findNextTokenIndex = exports.findNextTokenIndex = function (str, startIndex, endIndex) {
	    startIndex = startIndex || 0;
	    endIndex = endIndex || str.length;
	    var ret = -1, l = str.length;
	    if (!endIndex || endIndex > l) {
	        endIndex = l;
	    }
	    for (; startIndex < endIndex; startIndex++) {
	        var c = str.charAt(startIndex);
	        if (!WHITE_SPACE_REG.test(c)) {
	            ret = startIndex;
	            break;
	        }
	    }
	    return ret;
	};

	exports.findNextToken = function (str, startIndex, endIndex) {
	    return str.charAt(findNextTokenIndex(str, startIndex, endIndex));
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(23)))

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var extd = __webpack_require__(5),
	    isArray = extd.isArray,
	    forEach = extd.forEach,
	    some = extd.some,
	    indexOf = extd.indexOf,
	    isNumber = extd.isNumber,
	    removeDups = extd.removeDuplicates,
	    atoms = __webpack_require__(38);

	function getProps(val) {
	    return extd(val).map(function mapper(val) {
	        return isArray(val) ? isArray(val[0]) ? getProps(val).value() : val.reverse().join(".") : val;
	    }).flatten().filter(function (v) {
	        return !!v;
	    });
	}

	var definedFuncs = {
	    indexOf: extd.indexOf,
	    now: function () {
	        return new Date();
	    },

	    Date: function (y, m, d, h, min, s, ms) {
	        var date = new Date();
	        if (isNumber(y)) {
	            date.setYear(y);
	        }
	        if (isNumber(m)) {
	            date.setMonth(m);
	        }
	        if (isNumber(d)) {
	            date.setDate(d);
	        }
	        if (isNumber(h)) {
	            date.setHours(h);
	        }
	        if (isNumber(min)) {
	            date.setMinutes(min);
	        }
	        if (isNumber(s)) {
	            date.setSeconds(s);
	        }
	        if (isNumber(ms)) {
	            date.setMilliseconds(ms);
	        }
	        return date;
	    },

	    lengthOf: function (arr, length) {
	        return arr.length === length;
	    },

	    isTrue: function (val) {
	        return val === true;
	    },

	    isFalse: function (val) {
	        return val === false;
	    },

	    isNotNull: function (actual) {
	        return actual !== null;
	    },

	    dateCmp: function (dt1, dt2) {
	        return extd.compare(dt1, dt2);
	    }

	};

	forEach(["years", "days", "months", "hours", "minutes", "seconds"], function (k) {
	    definedFuncs[k + "FromNow"] = extd[k + "FromNow"];
	    definedFuncs[k + "Ago"] = extd[k + "Ago"];
	});


	forEach(["isArray", "isNumber", "isHash", "isObject", "isDate", "isBoolean", "isString", "isRegExp", "isNull", "isEmpty",
	    "isUndefined", "isDefined", "isUndefinedOrNull", "isPromiseLike", "isFunction", "deepEqual"], function (k) {
	    var m = extd[k];
	    definedFuncs[k] = function () {
	        return m.apply(extd, arguments);
	    };
	});


	var lang = {

	    equal: function (c1, c2) {
	        var ret = false;
	        if (c1 === c2) {
	            ret = true;
	        } else {
	            if (c1[2] === c2[2]) {
	                if (indexOf(["string", "number", "boolean", "regexp", "identifier", "null"], c1[2]) !== -1) {
	                    ret = c1[0] === c2[0];
	                } else if (c1[2] === "unary" || c1[2] === "logicalNot") {
	                    ret = this.equal(c1[0], c2[0]);
	                } else {
	                    ret = this.equal(c1[0], c2[0]) && this.equal(c1[1], c2[1]);
	                }
	            }
	        }
	        return ret;
	    },

	    __getProperties: function (rule) {
	        var ret = [];
	        if (rule) {
	            var rule2 = rule[2];
	            if (!rule2) {
	                return ret;
	            }
	            if (rule2 !== "prop" &&
	                rule2 !== "identifier" &&
	                rule2 !== "string" &&
	                rule2 !== "number" &&
	                rule2 !== "boolean" &&
	                rule2 !== "regexp" &&
	                rule2 !== "unary" &&
	                rule2 !== "unary") {
	                ret[0] = this.__getProperties(rule[0]);
	                ret[1] = this.__getProperties(rule[1]);
	            } else if (rule2 === "identifier") {
	                //at the bottom
	                ret = [rule[0]];
	            } else {
	                ret = lang.__getProperties(rule[1]).concat(lang.__getProperties(rule[0]));
	            }
	        }
	        return ret;
	    },

	    getIndexableProperties: function (rule) {
	        if (rule[2] === "composite") {
	            return this.getIndexableProperties(rule[0]);
	        } else if (/^(\w+(\['[^']*'])*) *([!=]==?|[<>]=?) (\w+(\['[^']*'])*)$/.test(this.parse(rule))) {
	            return getProps(this.__getProperties(rule)).flatten().value();
	        } else {
	            return [];
	        }
	    },

	    getIdentifiers: function (rule) {
	        var ret = [];
	        var rule2 = rule[2];

	        if (rule2 === "identifier") {
	            //its an identifier so stop
	            return [rule[0]];
	        } else if (rule2 === "function") {
	            ret = ret.concat(this.getIdentifiers(rule[0])).concat(this.getIdentifiers(rule[1]));
	        } else if (rule2 !== "string" &&
	            rule2 !== "number" &&
	            rule2 !== "boolean" &&
	            rule2 !== "regexp" &&
	            rule2 !== "unary" &&
	            rule2 !== "unary") {
	            //its an expression so keep going
	            if (rule2 === "prop") {
	                ret = ret.concat(this.getIdentifiers(rule[0]));
	                if (rule[1]) {
	                    var propChain = rule[1];
	                    //go through the member variables and collect any identifiers that may be in functions
	                    while (isArray(propChain)) {
	                        if (propChain[2] === "function") {
	                            ret = ret.concat(this.getIdentifiers(propChain[1]));
	                            break;
	                        } else {
	                            propChain = propChain[1];
	                        }
	                    }
	                }

	            } else {
	                if (rule[0]) {
	                    ret = ret.concat(this.getIdentifiers(rule[0]));
	                }
	                if (rule[1]) {
	                    ret = ret.concat(this.getIdentifiers(rule[1]));
	                }
	            }
	        }
	        //remove dups and return
	        return removeDups(ret);
	    },

	    toConstraints: function (rule, options) {
	        var ret = [],
	            alias = options.alias,
	            scope = options.scope || {};

	        var rule2 = rule[2];


	        if (rule2 === "and") {
	            ret = ret.concat(this.toConstraints(rule[0], options)).concat(this.toConstraints(rule[1], options));
	        } else if (
	            rule2 === "composite" ||
	            rule2 === "or" ||
	            rule2 === "lt" ||
	            rule2 === "gt" ||
	            rule2 === "lte" ||
	            rule2 === "gte" ||
	            rule2 === "like" ||
	            rule2 === "notLike" ||
	            rule2 === "eq" ||
	            rule2 === "neq" ||
	            rule2 === "seq" ||
	            rule2 === "sneq" ||
	            rule2 === "in" ||
	            rule2 === "notIn" ||
	            rule2 === "prop" ||
	            rule2 === "propLookup" ||
	            rule2 === "function" ||
	            rule2 === "logicalNot") {
	            var isReference = some(this.getIdentifiers(rule), function (i) {
	                return i !== alias && !(i in definedFuncs) && !(i in scope);
	            });
	            switch (rule2) {
	            case "eq":
	                ret.push(new atoms[isReference ? "ReferenceEqualityConstraint" : "EqualityConstraint"](rule, options));
	                break;
	            case "seq":
	                ret.push(new atoms[isReference ? "ReferenceEqualityConstraint" : "EqualityConstraint"](rule, options));
	                break;
	            case "neq":
	                ret.push(new atoms[isReference ? "ReferenceInequalityConstraint" : "InequalityConstraint"](rule, options));
	                break;
	            case "sneq":
	                ret.push(new atoms[isReference ? "ReferenceInequalityConstraint" : "InequalityConstraint"](rule, options));
	                break;
	            case "gt":
	                ret.push(new atoms[isReference ? "ReferenceGTConstraint" : "ComparisonConstraint"](rule, options));
	                break;
	            case "gte":
	                ret.push(new atoms[isReference ? "ReferenceGTEConstraint" : "ComparisonConstraint"](rule, options));
	                break;
	            case "lt":
	                ret.push(new atoms[isReference ? "ReferenceLTConstraint" : "ComparisonConstraint"](rule, options));
	                break;
	            case "lte":
	                ret.push(new atoms[isReference ? "ReferenceLTEConstraint" : "ComparisonConstraint"](rule, options));
	                break;
	            default:
	                ret.push(new atoms[isReference ? "ReferenceConstraint" : "ComparisonConstraint"](rule, options));
	            }

	        }
	        return ret;
	    },


	    parse: function (rule) {
	        return this[rule[2]](rule[0], rule[1]);
	    },

	    composite: function (lhs) {
	        return this.parse(lhs);
	    },

	    and: function (lhs, rhs) {
	        return ["(", this.parse(lhs), "&&", this.parse(rhs), ")"].join(" ");
	    },

	    or: function (lhs, rhs) {
	        return ["(", this.parse(lhs), "||", this.parse(rhs), ")"].join(" ");
	    },

	    prop: function (name, prop) {
	        if (prop[2] === "function") {
	            return [this.parse(name), this.parse(prop)].join(".");
	        } else {
	            return [this.parse(name), "['", this.parse(prop), "']"].join("");
	        }
	    },

	    propLookup: function (name, prop) {
	        if (prop[2] === "function") {
	            return [this.parse(name), this.parse(prop)].join(".");
	        } else {
	            return [this.parse(name), "[", this.parse(prop), "]"].join("");
	        }
	    },

	    unary: function (lhs) {
	        return -1 * this.parse(lhs);
	    },

	    plus: function (lhs, rhs) {
	        return [this.parse(lhs), "+", this.parse(rhs)].join(" ");
	    },
	    minus: function (lhs, rhs) {
	        return [this.parse(lhs), "-", this.parse(rhs)].join(" ");
	    },

	    mult: function (lhs, rhs) {
	        return [this.parse(lhs), "*", this.parse(rhs)].join(" ");
	    },

	    div: function (lhs, rhs) {
	        return [this.parse(lhs), "/", this.parse(rhs)].join(" ");
	    },

	    mod: function (lhs, rhs) {
	        return [this.parse(lhs), "%", this.parse(rhs)].join(" ");
	    },

	    lt: function (lhs, rhs) {
	        return [this.parse(lhs), "<", this.parse(rhs)].join(" ");
	    },
	    gt: function (lhs, rhs) {
	        return [this.parse(lhs), ">", this.parse(rhs)].join(" ");
	    },
	    lte: function (lhs, rhs) {
	        return [this.parse(lhs), "<=", this.parse(rhs)].join(" ");
	    },
	    gte: function (lhs, rhs) {
	        return [this.parse(lhs), ">=", this.parse(rhs)].join(" ");
	    },
	    like: function (lhs, rhs) {
	        return [this.parse(rhs), ".test(", this.parse(lhs), ")"].join("");
	    },
	    notLike: function (lhs, rhs) {
	        return ["!", this.parse(rhs), ".test(", this.parse(lhs), ")"].join("");
	    },
	    eq: function (lhs, rhs) {
	        return [this.parse(lhs), "==", this.parse(rhs)].join(" ");
	    },

	    seq: function (lhs, rhs) {
	        return [this.parse(lhs), "===", this.parse(rhs)].join(" ");
	    },

	    neq: function (lhs, rhs) {
	        return [this.parse(lhs), "!=", this.parse(rhs)].join(" ");
	    },

	    sneq: function (lhs, rhs) {
	        return [this.parse(lhs), "!==", this.parse(rhs)].join(" ");
	    },

	    "in": function (lhs, rhs) {
	        return ["(indexOf(", this.parse(rhs), ",", this.parse(lhs), ")) != -1"].join("");
	    },

	    "notIn": function (lhs, rhs) {
	        return ["(indexOf(", this.parse(rhs), ",", this.parse(lhs), ")) == -1"].join("");
	    },

	    "arguments": function (lhs, rhs) {
	        var ret = [];
	        if (lhs) {
	            ret.push(this.parse(lhs));
	        }
	        if (rhs) {
	            ret.push(this.parse(rhs));
	        }
	        return ret.join(",");
	    },

	    "array": function (lhs) {
	        var args = [];
	        if (lhs) {
	            args = this.parse(lhs);
	            if (isArray(args)) {
	                return args;
	            } else {
	                return ["[", args, "]"].join("");
	            }
	        }
	        return ["[", args.join(","), "]"].join("");
	    },

	    "function": function (lhs, rhs) {
	        var args = this.parse(rhs);
	        return [this.parse(lhs), "(", args, ")"].join("");
	    },

	    "string": function (lhs) {
	        return "'" + lhs + "'";
	    },

	    "number": function (lhs) {
	        return lhs;
	    },

	    "boolean": function (lhs) {
	        return lhs;
	    },

	    regexp: function (lhs) {
	        return lhs;
	    },

	    identifier: function (lhs) {
	        return lhs;
	    },

	    "null": function () {
	        return "null";
	    },

	    logicalNot: function (lhs) {
	        return ["!(", this.parse(lhs), ")"].join("");
	    }
	};

	var matcherCount = 0;
	var toJs = exports.toJs = function (rule, scope, alias, equality, wrap) {
	    /*jshint evil:true*/
	    var js = lang.parse(rule);
	    scope = scope || {};
	    var vars = lang.getIdentifiers(rule);
	    var closureVars = ["var indexOf = definedFuncs.indexOf; var hasOwnProperty = Object.prototype.hasOwnProperty;"], funcVars = [];
	    extd(vars).filter(function (v) {
	        var ret = ["var ", v, " = "];
	        if (definedFuncs.hasOwnProperty(v)) {
	            ret.push("definedFuncs['", v, "']");
	        } else if (scope.hasOwnProperty(v)) {
	            ret.push("scope['", v, "']");
	        } else {
	            return true;
	        }
	        ret.push(";");
	        closureVars.push(ret.join(""));
	        return false;
	    }).forEach(function (v) {
	        var ret = ["var ", v, " = "];
	        if (equality || v !== alias) {
	            ret.push("fact." + v);
	        } else if (v === alias) {
	            ret.push("hash.", v, "");
	        }
	        ret.push(";");
	        funcVars.push(ret.join(""));
	    });
	    var closureBody = closureVars.join("") + "return function matcher" + (matcherCount++) + (!equality ? "(fact, hash){" : "(fact){") + funcVars.join("") + " return " + (wrap ? wrap(js) : js) + ";}";
	    var f = new Function("definedFuncs, scope", closureBody)(definedFuncs, scope);
	    //console.log(f.toString());
	    return f;
	};

	exports.getMatcher = function (rule, options, equality) {
	    options = options || {};
	    return toJs(rule, options.scope, options.alias, equality, function (src) {
	        return "!!(" + src + ")";
	    });
	};

	exports.getSourceMatcher = function (rule, options, equality) {
	    options = options || {};
	    return toJs(rule, options.scope, options.alias, equality, function (src) {
	        return src;
	    });
	};

	exports.toConstraints = function (constraint, options) {
	    if (typeof constraint === 'function') {
	        return [new atoms.CustomConstraint(constraint, options)];
	    }
	    //constraint.split("&&")
	    return lang.toConstraints(constraint, options);
	};

	exports.equal = function (c1, c2) {
	    return lang.equal(c1, c2);
	};

	exports.getIdentifiers = function (constraint) {
	    return lang.getIdentifiers(constraint);
	};

	exports.getIndexableProperties = function (constraint) {
	    return lang.getIndexableProperties(constraint);
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var extd = __webpack_require__(5),
	    deepEqual = extd.deepEqual,
	    merge = extd.merge,
	    instanceOf = extd.instanceOf,
	    filter = extd.filter,
	    declare = extd.declare,
	    constraintMatcher;

	var id = 0;
	var Constraint = declare({

	    type: null,

	    instance: {
	        constructor: function (constraint) {
	            if (!constraintMatcher) {
	                constraintMatcher = __webpack_require__(37);
	            }
	            this.id = id++;
	            this.constraint = constraint;
	            extd.bindAll(this, ["assert"]);
	        },
	        "assert": function () {
	            throw new Error("not implemented");
	        },

	        getIndexableProperties: function () {
	            return [];
	        },

	        equal: function (constraint) {
	            return instanceOf(constraint, this._static) && this.get("alias") === constraint.get("alias") && extd.deepEqual(this.constraint, constraint.constraint);
	        },

	        getters: {
	            variables: function () {
	                return [this.get("alias")];
	            }
	        }


	    }
	});

	Constraint.extend({
	    instance: {

	        type: "object",

	        constructor: function (type) {
	            this._super([type]);
	        },

	        "assert": function (param) {
	            return param instanceof this.constraint || param.constructor === this.constraint;
	        },

	        equal: function (constraint) {
	            return instanceOf(constraint, this._static) && this.constraint === constraint.constraint;
	        }
	    }
	}).as(exports, "ObjectConstraint");

	var EqualityConstraint = Constraint.extend({

	    instance: {

	        type: "equality",

	        constructor: function (constraint, options) {
	            this._super([constraint]);
	            options = options || {};
	            this.pattern = options.pattern;
	            this._matcher = constraintMatcher.getMatcher(constraint, options, true);
	        },

	        "assert": function (values) {
	            return this._matcher(values);
	        }
	    }
	}).as(exports, "EqualityConstraint");

	EqualityConstraint.extend({instance: {type: "inequality"}}).as(exports, "InequalityConstraint");
	EqualityConstraint.extend({instance: {type: "comparison"}}).as(exports, "ComparisonConstraint");

	Constraint.extend({

	    instance: {

	        type: "equality",

	        constructor: function () {
	            this._super([
	                [true]
	            ]);
	        },

	        equal: function (constraint) {
	            return instanceOf(constraint, this._static) && this.get("alias") === constraint.get("alias");
	        },


	        "assert": function () {
	            return true;
	        }
	    }
	}).as(exports, "TrueConstraint");

	var ReferenceConstraint = Constraint.extend({

	    instance: {

	        type: "reference",

	        constructor: function (constraint, options) {
	            this.cache = {};
	            this._super([constraint]);
	            options = options || {};
	            this.values = [];
	            this.pattern = options.pattern;
	            this._options = options;
	            this._matcher = constraintMatcher.getMatcher(constraint, options, false);
	        },

	        "assert": function (fact, fh) {
	            try {
	                return this._matcher(fact, fh);
	            } catch (e) {
	                throw new Error("Error with evaluating pattern " + this.pattern + " " + e.message);
	            }

	        },

	        merge: function (that) {
	            var ret = this;
	            if (that instanceof ReferenceConstraint) {
	                ret = new this._static([this.constraint, that.constraint, "and"], merge({}, this._options, this._options));
	                ret._alias = this._alias || that._alias;
	                ret.vars = this.vars.concat(that.vars);
	            }
	            return ret;
	        },

	        equal: function (constraint) {
	            return instanceOf(constraint, this._static) && extd.deepEqual(this.constraint, constraint.constraint);
	        },


	        getters: {
	            variables: function () {
	                return this.vars;
	            },

	            alias: function () {
	                return this._alias;
	            }
	        },

	        setters: {
	            alias: function (alias) {
	                this._alias = alias;
	                this.vars = filter(constraintMatcher.getIdentifiers(this.constraint), function (v) {
	                    return v !== alias;
	                });
	            }
	        }
	    }

	}).as(exports, "ReferenceConstraint");


	ReferenceConstraint.extend({
	    instance: {
	        type: "reference_equality",
	        op: "eq",
	        getIndexableProperties: function () {
	            return constraintMatcher.getIndexableProperties(this.constraint);
	        }
	    }
	}).as(exports, "ReferenceEqualityConstraint")
	    .extend({instance: {type: "reference_inequality", op: "neq"}}).as(exports, "ReferenceInequalityConstraint")
	    .extend({instance: {type: "reference_gt", op: "gt"}}).as(exports, "ReferenceGTConstraint")
	    .extend({instance: {type: "reference_gte", op: "gte"}}).as(exports, "ReferenceGTEConstraint")
	    .extend({instance: {type: "reference_lt", op: "lt"}}).as(exports, "ReferenceLTConstraint")
	    .extend({instance: {type: "reference_lte", op: "lte"}}).as(exports, "ReferenceLTEConstraint");


	Constraint.extend({
	    instance: {

	        type: "hash",

	        constructor: function (hash) {
	            this._super([hash]);
	        },

	        equal: function (constraint) {
	            return extd.instanceOf(constraint, this._static) && this.get("alias") === constraint.get("alias") && extd.deepEqual(this.constraint, constraint.constraint);
	        },

	        "assert": function () {
	            return true;
	        },

	        getters: {
	            variables: function () {
	                return this.constraint;
	            }
	        }

	    }
	}).as(exports, "HashConstraint");

	Constraint.extend({
	    instance: {
	        constructor: function (constraints, options) {
	            this.type = "from";
	            this.constraints = constraintMatcher.getSourceMatcher(constraints, (options || {}), true);
	            extd.bindAll(this, ["assert"]);
	        },

	        equal: function (constraint) {
	            return instanceOf(constraint, this._static) && this.get("alias") === constraint.get("alias") && deepEqual(this.constraints, constraint.constraints);
	        },

	        "assert": function (fact, fh) {
	            return this.constraints(fact, fh);
	        },

	        getters: {
	            variables: function () {
	                return this.constraint;
	            }
	        }

	    }
	}).as(exports, "FromConstraint");

	Constraint.extend({
	    instance: {
	        constructor: function (func, options) {
	            this.type = "custom";
	            this.fn = func;
	            this.options = options;
	            extd.bindAll(this, ["assert"]);
	        },

	        equal: function (constraint) {
	            return instanceOf(constraint, this._static) && this.fn === constraint.constraint;
	        },

	        "assert": function (fact, fh) {
	            return this.fn(fact, fh);
	        }
	    }
	}).as(exports, "CustomConstraint");




/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var extd = __webpack_require__(5),
	    isArray = extd.isArray,
	    Promise = extd.Promise,
	    declare = extd.declare,
	    isHash = extd.isHash,
	    isString = extd.isString,
	    format = extd.format,
	    parser = __webpack_require__(32),
	    pattern = __webpack_require__(40),
	    ObjectPattern = pattern.ObjectPattern,
	    FromPattern = pattern.FromPattern,
	    NotPattern = pattern.NotPattern,
	    ExistsPattern = pattern.ExistsPattern,
	    FromNotPattern = pattern.FromNotPattern,
	    FromExistsPattern = pattern.FromExistsPattern,
	    CompositePattern = pattern.CompositePattern;

	var parseConstraint = function (constraint) {
	    if (typeof constraint === 'function') {
	        // No parsing is needed for constraint functions
	        return constraint;
	    }
	    return parser.parseConstraint(constraint);
	};

	var parseExtra = extd
	    .switcher()
	    .isUndefinedOrNull(function () {
	        return null;
	    })
	    .isLike(/^from +/, function (s) {
	        return {from: s.replace(/^from +/, "").replace(/^\s*|\s*$/g, "")};
	    })
	    .def(function (o) {
	        throw new Error("invalid rule constraint option " + o);
	    })
	    .switcher();

	var normailizeConstraint = extd
	    .switcher()
	    .isLength(1, function (c) {
	        throw new Error("invalid rule constraint " + format("%j", [c]));
	    })
	    .isLength(2, function (c) {
	        c.push("true");
	        return c;
	    })
	    //handle case where c[2] is a hash rather than a constraint string
	    .isLength(3, function (c) {
	        if (isString(c[2]) && /^from +/.test(c[2])) {
	            var extra = c[2];
	            c.splice(2, 0, "true");
	            c[3] = null;
	            c[4] = parseExtra(extra);
	        } else if (isHash(c[2])) {
	            c.splice(2, 0, "true");
	        }
	        return c;
	    })
	    //handle case where c[3] is a from clause rather than a hash for references
	    .isLength(4, function (c) {
	        if (isString(c[3])) {
	            c.splice(3, 0, null);
	            c[4] = parseExtra(c[4]);
	        }
	        return c;
	    })
	    .def(function (c) {
	        if (c.length === 5) {
	            c[4] = parseExtra(c[4]);
	        }
	        return c;
	    })
	    .switcher();

	var getParamType = function getParamType(type, scope) {
	    scope = scope || {};
	    var getParamTypeSwitch = extd
	        .switcher()
	        .isEq("string", function () {
	            return String;
	        })
	        .isEq("date", function () {
	            return Date;
	        })
	        .isEq("array", function () {
	            return Array;
	        })
	        .isEq("boolean", function () {
	            return Boolean;
	        })
	        .isEq("regexp", function () {
	            return RegExp;
	        })
	        .isEq("number", function () {
	            return Number;
	        })
	        .isEq("object", function () {
	            return Object;
	        })
	        .isEq("hash", function () {
	            return Object;
	        })
	        .def(function (param) {
	            throw new TypeError("invalid param type " + param);
	        })
	        .switcher();

	    var _getParamType = extd
	        .switcher()
	        .isString(function (param) {
	            var t = scope[param];
	            if (!t) {
	                return getParamTypeSwitch(param.toLowerCase());
	            } else {
	                return t;
	            }
	        })
	        .isFunction(function (func) {
	            return func;
	        })
	        .deepEqual([], function () {
	            return Array;
	        })
	        .def(function (param) {
	            throw  new Error("invalid param type " + param);
	        })
	        .switcher();

	    return _getParamType(type);
	};

	var parsePattern = extd
	    .switcher()
	    .containsAt("or", 0, function (condition) {
	        condition.shift();
	        return extd(condition).map(function (cond) {
	            cond.scope = condition.scope;
	            return parsePattern(cond);
	        }).flatten().value();
	    })
	    .containsAt("not", 0, function (condition) {
	        condition.shift();
	        condition = normailizeConstraint(condition);
	        if (condition[4] && condition[4].from) {
	            return [
	                new FromNotPattern(
	                    getParamType(condition[0], condition.scope),
	                    condition[1] || "m",
	                    parseConstraint(condition[2] || "true"),
	                    condition[3] || {},
	                    parseConstraint(condition[4].from),
	                    {scope: condition.scope, pattern: condition[2]}
	                )
	            ];
	        } else {
	            return [
	                new NotPattern(
	                    getParamType(condition[0], condition.scope),
	                    condition[1] || "m",
	                    parseConstraint(condition[2] || "true"),
	                    condition[3] || {},
	                    {scope: condition.scope, pattern: condition[2]}
	                )
	            ];
	        }
	    })
	    .containsAt("exists", 0, function (condition) {
	        condition.shift();
	        condition = normailizeConstraint(condition);
	        if (condition[4] && condition[4].from) {
	            return [
	                new FromExistsPattern(
	                    getParamType(condition[0], condition.scope),
	                    condition[1] || "m",
	                    parseConstraint(condition[2] || "true"),
	                    condition[3] || {},
	                    parseConstraint(condition[4].from),
	                    {scope: condition.scope, pattern: condition[2]}
	                )
	            ];
	        } else {
	            return [
	                new ExistsPattern(
	                    getParamType(condition[0], condition.scope),
	                    condition[1] || "m",
	                    parseConstraint(condition[2] || "true"),
	                    condition[3] || {},
	                    {scope: condition.scope, pattern: condition[2]}
	                )
	            ];
	        }
	    })
	    .def(function (condition) {
	        if (typeof condition === 'function') {
	            return [condition];
	        }
	        condition = normailizeConstraint(condition);
	        if (condition[4] && condition[4].from) {
	            return [
	                new FromPattern(
	                    getParamType(condition[0], condition.scope),
	                    condition[1] || "m",
	                    parseConstraint(condition[2] || "true"),
	                    condition[3] || {},
	                    parseConstraint(condition[4].from),
	                    {scope: condition.scope, pattern: condition[2]}
	                )
	            ];
	        } else {
	            return [
	                new ObjectPattern(
	                    getParamType(condition[0], condition.scope),
	                    condition[1] || "m",
	                    parseConstraint(condition[2] || "true"),
	                    condition[3] || {},
	                    {scope: condition.scope, pattern: condition[2]}
	                )
	            ];
	        }
	    }).switcher();

	var Rule = declare({
	    instance: {
	        constructor: function (name, options, pattern, cb) {
	            this.name = name;
	            this.pattern = pattern;
	            this.cb = cb;
	            if (options.agendaGroup) {
	                this.agendaGroup = options.agendaGroup;
	                this.autoFocus = extd.isBoolean(options.autoFocus) ? options.autoFocus : false;
	            }
	            this.priority = options.priority || options.salience || 0;
	        },

	        fire: function (flow, match) {
	            var ret = new Promise(), cb = this.cb;
	            try {
	                if (cb.length === 3) {
	                    cb.call(flow, match.factHash, flow, ret.resolve);
	                } else {
	                    ret = cb.call(flow, match.factHash, flow);
	                }
	            } catch (e) {
	                ret.errback(e);
	            }
	            return ret;
	        }
	    }
	});

	function createRule(name, options, conditions, cb) {
	    if (isArray(options)) {
	        cb = conditions;
	        conditions = options;
	    } else {
	        options = options || {};
	    }
	    var isRules = extd.every(conditions, function (cond) {
	        return isArray(cond);
	    });
	    if (isRules && conditions.length === 1) {
	        conditions = conditions[0];
	        isRules = false;
	    }
	    var rules = [];
	    var scope = options.scope || {};
	    conditions.scope = scope;
	    if (isRules) {
	        var _mergePatterns = function (patt, i) {
	            if (!patterns[i]) {
	                patterns[i] = i === 0 ? [] : patterns[i - 1].slice();
	                //remove dup
	                if (i !== 0) {
	                    patterns[i].pop();
	                }
	                patterns[i].push(patt);
	            } else {
	                extd(patterns).forEach(function (p) {
	                    p.push(patt);
	                });
	            }

	        };
	        var l = conditions.length, patterns = [], condition;
	        for (var i = 0; i < l; i++) {
	            condition = conditions[i];
	            condition.scope = scope;
	            extd.forEach(parsePattern(condition), _mergePatterns);

	        }
	        rules = extd.map(patterns, function (patterns) {
	            var compPat = null;
	            for (var i = 0; i < patterns.length; i++) {
	                if (compPat === null) {
	                    compPat = new CompositePattern(patterns[i++], patterns[i]);
	                } else {
	                    compPat = new CompositePattern(compPat, patterns[i]);
	                }
	            }
	            return new Rule(name, options, compPat, cb);
	        });
	    } else {
	        rules = extd.map(parsePattern(conditions), function (cond) {
	            return new Rule(name, options, cond, cb);
	        });
	    }
	    return rules;
	}

	exports.createRule = createRule;





/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var extd = __webpack_require__(5),
	    isEmpty = extd.isEmpty,
	    merge = extd.merge,
	    forEach = extd.forEach,
	    declare = extd.declare,
	    constraintMatcher = __webpack_require__(37),
	    constraint = __webpack_require__(38),
	    EqualityConstraint = constraint.EqualityConstraint,
	    FromConstraint = constraint.FromConstraint;

	var id = 0;
	var Pattern = declare({});

	var ObjectPattern = Pattern.extend({
	    instance: {
	        constructor: function (type, alias, conditions, store, options) {
	            options = options || {};
	            this.id = id++;
	            this.type = type;
	            this.alias = alias;
	            this.conditions = conditions;
	            this.pattern = options.pattern;
	            var constraints = [new constraint.ObjectConstraint(type)];
	            var constrnts = constraintMatcher.toConstraints(conditions, merge({alias: alias}, options));
	            if (constrnts.length) {
	                constraints = constraints.concat(constrnts);
	            } else {
	                var cnstrnt = new constraint.TrueConstraint();
	                constraints.push(cnstrnt);
	            }
	            if (store && !isEmpty(store)) {
	                var atm = new constraint.HashConstraint(store);
	                constraints.push(atm);
	            }

	            forEach(constraints, function (constraint) {
	                constraint.set("alias", alias);
	            });
	            this.constraints = constraints;
	        },

	        getSpecificity: function () {
	            var constraints = this.constraints, specificity = 0;
	            for (var i = 0, l = constraints.length; i < l; i++) {
	                if (constraints[i] instanceof EqualityConstraint) {
	                    specificity++;
	                }
	            }
	            return specificity;
	        },

	        hasConstraint: function (type) {
	            return extd.some(this.constraints, function (c) {
	                return c instanceof type;
	            });
	        },

	        hashCode: function () {
	            return [this.type, this.alias, extd.format("%j", this.conditions)].join(":");
	        },

	        toString: function () {
	            return extd.format("%j", this.constraints);
	        }
	    }
	}).as(exports, "ObjectPattern");

	var FromPattern = ObjectPattern.extend({
	    instance: {
	        constructor: function (type, alias, conditions, store, from, options) {
	            this._super([type, alias, conditions, store, options]);
	            this.from = new FromConstraint(from, options);
	        },

	        hasConstraint: function (type) {
	            return extd.some(this.constraints, function (c) {
	                return c instanceof type;
	            });
	        },

	        getSpecificity: function () {
	            return this._super(arguments) + 1;
	        },

	        hashCode: function () {
	            return [this.type, this.alias, extd.format("%j", this.conditions), this.from.from].join(":");
	        },

	        toString: function () {
	            return extd.format("%j from %s", this.constraints, this.from.from);
	        }
	    }
	}).as(exports, "FromPattern");


	FromPattern.extend().as(exports, "FromNotPattern");
	ObjectPattern.extend().as(exports, "NotPattern");
	ObjectPattern.extend().as(exports, "ExistsPattern");
	FromPattern.extend().as(exports, "FromExistsPattern");

	Pattern.extend({

	    instance: {
	        constructor: function (left, right) {
	            this.id = id++;
	            this.leftPattern = left;
	            this.rightPattern = right;
	        },

	        hashCode: function () {
	            return [this.leftPattern.hashCode(), this.rightPattern.hashCode()].join(":");
	        },

	        getSpecificity: function () {
	            return this.rightPattern.getSpecificity() + this.leftPattern.getSpecificity();
	        },

	        getters: {
	            constraints: function () {
	                return this.leftPattern.constraints.concat(this.rightPattern.constraints);
	            }
	        }
	    }

	}).as(exports, "CompositePattern");


	var InitialFact = declare({
	    instance: {
	        constructor: function () {
	            this.id = id++;
	            this.recency = 0;
	        }
	    }
	}).as(exports, "InitialFact");

	ObjectPattern.extend({
	    instance: {
	        constructor: function () {
	            this._super([InitialFact, "__i__", [], {}]);
	        },

	        assert: function () {
	            return true;
	        }
	    }
	}).as(exports, "InitialFactPattern");





/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	/*jshint evil:true*/
	"use strict";
	var extd = __webpack_require__(5),
	    forEach = extd.forEach,
	    isString = extd.isString;

	exports.modifiers = ["assert", "modify", "retract", "emit", "halt", "focus", "getFacts"];

	var createFunction = function (body, defined, scope, scopeNames, definedNames) {
	    var declares = [];
	    forEach(definedNames, function (i) {
	        if (body.indexOf(i) !== -1) {
	            declares.push("var " + i + "= defined." + i + ";");
	        }
	    });

	    forEach(scopeNames, function (i) {
	        if (body.indexOf(i) !== -1) {
	            declares.push("var " + i + "= scope." + i + ";");
	        }
	    });
	    body = ["((function(){", declares.join(""), "\n\treturn ", body, "\n})())"].join("");
	    try {
	        return eval(body);
	    } catch (e) {
	        throw new Error("Invalid action : " + body + "\n" + e.message);
	    }
	};

	var createDefined = (function () {

	    var _createDefined = function (action, defined, scope) {
	        if (isString(action)) {
	            var declares = [];
	            extd(defined).keys().forEach(function (i) {
	                if (action.indexOf(i) !== -1) {
	                    declares.push("var " + i + "= defined." + i + ";");
	                }
	            });

	            extd(scope).keys().forEach(function (i) {
	                if (action.indexOf(i) !== -1) {
	                    declares.push("var " + i + "= function(){var prop = scope." + i + "; return __objToStr__.call(prop) === '[object Function]' ? prop.apply(void 0, arguments) : prop;};");
	                }
	            });
	            if (declares.length) {
	                declares.unshift("var __objToStr__ = Object.prototype.toString;");
	            }
	            action = [declares.join(""), "return ", action, ";"].join("");
	            action = new Function("defined", "scope", action)(defined, scope);
	        }
	        var ret = action.hasOwnProperty("constructor") && "function" === typeof action.constructor ? action.constructor : function (opts) {
	            opts = opts || {};
	            for (var i in opts) {
	                if (i in action) {
	                    this[i] = opts[i];
	                }
	            }
	        };
	        var proto = ret.prototype;
	        for (var i in action) {
	            proto[i] = action[i];
	        }
	        return ret;

	    };

	    return function (options, defined, scope) {
	        return _createDefined(options.properties, defined, scope);
	    };
	})();

	exports.createFunction = createFunction;
	exports.createDefined = createDefined;

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var extd = __webpack_require__(5),
	    forEach = extd.forEach,
	    indexOf = extd.indexOf,
	    merge = extd.merge,
	    isString = extd.isString,
	    modifiers = __webpack_require__(41).modifiers,
	    constraintMatcher = __webpack_require__(37),
	    parser = __webpack_require__(32);

	function definedToJs(options) {
	    /*jshint evil:true*/
	    options = isString(options) ? new Function("return " + options + ";")() : options;
	    var ret = ["(function(){"], value;

	    if (options.hasOwnProperty("constructor") && "function" === typeof options.constructor) {
	        ret.push("var Defined = " + options.constructor.toString() + ";");
	    } else {
	        ret.push("var Defined = function(opts){ for(var i in opts){if(opts.hasOwnProperty(i)){this[i] = opts[i];}}};");
	    }
	    ret.push("var proto = Defined.prototype;");
	    for (var key in options) {
	        if (options.hasOwnProperty(key)) {
	            value = options[key];
	            ret.push("proto." + key + " = " + (extd.isFunction(value) ? value.toString() : extd.format("%j", value)) + ";");
	        }
	    }
	    ret.push("return Defined;");
	    ret.push("}())");
	    return ret.join("");

	}

	function actionToJs(action, identifiers, defined, scope) {
	    var declares = [], usedVars = {};
	    forEach(identifiers, function (i) {
	        if (action.indexOf(i) !== -1) {
	            usedVars[i] = true;
	            declares.push("var " + i + "= facts." + i + ";");
	        }
	    });
	    extd(defined).keys().forEach(function (i) {
	        if (action.indexOf(i) !== -1 && !usedVars[i]) {
	            usedVars[i] = true;
	            declares.push("var " + i + "= defined." + i + ";");
	        }
	    });

	    extd(scope).keys().forEach(function (i) {
	        if (action.indexOf(i) !== -1 && !usedVars[i]) {
	            usedVars[i] = true;
	            declares.push("var " + i + "= scope." + i + ";");
	        }
	    });
	    extd(modifiers).forEach(function (i) {
	        if (action.indexOf(i) !== -1 && !usedVars[i]) {
	            declares.push("var " + i + "= flow." + i + ";");
	        }
	    });
	    var params = ["facts", 'flow'];
	    if (/next\(.*\)/.test(action)) {
	        params.push("next");
	    }
	    action = declares.join("") + action;
	    try {
	        return ["function(", params.join(","), "){", action, "}"].join("");
	    } catch (e) {
	        throw new Error("Invalid action : " + action + "\n" + e.message);
	    }
	}

	function parseConstraintModifier(constraint, ret) {
	    if (constraint.length && extd.isString(constraint[0])) {
	        var modifier = constraint[0].match(" *(from)");
	        if (modifier) {
	            modifier = modifier[0];
	            switch (modifier) {
	            case "from":
	                ret.push(', "', constraint.shift(), '"');
	                break;
	            default:
	                throw new Error("Unrecognized modifier " + modifier);
	            }
	        }
	    }
	}

	function parseConstraintHash(constraint, ret, identifiers) {
	    if (constraint.length && extd.isHash(constraint[0])) {
	        //ret of options
	        var refs = constraint.shift();
	        extd(refs).values().forEach(function (ident) {
	            if (indexOf(identifiers, ident) === -1) {
	                identifiers.push(ident);
	            }
	        });
	        ret.push(',' + extd.format('%j', [refs]));
	    }
	}

	function constraintsToJs(constraint, identifiers) {
	    constraint = constraint.slice(0);
	    var ret = [];
	    if (constraint[0] === "or") {
	        ret.push('["' + constraint.shift() + '"');
	        ret.push(extd.map(constraint,function (c) {
	            return constraintsToJs(c, identifiers);
	        }).join(",") + "]");
	        return ret;
	    } else if (constraint[0] === "not" || constraint[0] === "exists") {
	        ret.push('"', constraint.shift(), '", ');
	    }
	    identifiers.push(constraint[1]);
	    ret.push(constraint[0], ', "' + constraint[1].replace(/\\/g, "\\\\").replace(/"/g, "\\\"") + '"');
	    constraint.splice(0, 2);
	    if (constraint.length) {
	        //constraint
	        var c = constraint.shift();
	        if (extd.isString(c) && c) {
	            ret.push(',"' + c.replace(/\\/g, "\\\\").replace(/"/g, "\\\""), '"');
	            forEach(constraintMatcher.getIdentifiers(parser.parseConstraint(c)), function (i) {
	                identifiers.push(i);
	            });
	        } else {
	            ret.push(',"true"');
	            constraint.unshift(c);
	        }
	    }
	    parseConstraintModifier(constraint, ret);
	    parseConstraintHash(constraint, ret, identifiers);
	    return '[' + ret.join("") + ']';
	}

	exports.transpile = function (flowObj, options) {
	    options = options || {};
	    var ret = [];
	    ret.push("(function(){");
	    ret.push("return function(options){");
	    ret.push("options = options || {};");
	    ret.push("var bind = function(scope, fn){return function(){return fn.apply(scope, arguments);};}, defined = {Array: Array, String: String, Number: Number, Boolean: Boolean, RegExp: RegExp, Date: Date, Object: Object}, scope = options.scope || {};");
	    ret.push("var optDefined = options.defined || {}; for(var i in optDefined){defined[i] = optDefined[i];}");
	    var defined = merge({Array: Array, String: String, Number: Number, Boolean: Boolean, RegExp: RegExp, Date: Date, Object: Object}, options.define || {});
	    if (typeof Buffer !== "undefined") {
	        defined.Buffer = Buffer;
	    }
	    var scope = merge({console: console}, options.scope);
	    ret.push(["return nools.flow('", options.name, "', function(){"].join(""));
	    //add any defined classes in the parsed flowObj to defined
	    ret.push(extd(flowObj.define || []).map(function (defined) {
	        var name = defined.name;
	        defined[name] = {};
	        return ["var", name, "= defined." + name, "= this.addDefined('" + name + "',", definedToJs(defined.properties) + ");"].join(" ");
	    }).value().join("\n"));
	    ret.push(extd(flowObj.scope || []).map(function (s) {
	        var name = s.name;
	        scope[name] = {};
	        return ["var", name, "= scope." + name, "= ", s.body, ";"].join(" ");
	    }).value().join("\n"));
	    ret.push("scope.console = console;\n");


	    ret.push(extd(flowObj.rules || []).map(function (rule) {
	        var identifiers = [], ret = ["this.rule('", rule.name.replace(/'/g, "\\'"), "'"], options = extd.merge(rule.options || {}, {scope: "scope"});
	        ret.push(",", extd.format("%j", [options]).replace(/(:"scope")/, ":scope"));
	        if (rule.constraints && !extd.isEmpty(rule.constraints)) {
	            ret.push(", [");
	            ret.push(extd(rule.constraints).map(function (c) {
	                return constraintsToJs(c, identifiers);
	            }).value().join(","));
	            ret.push("]");
	        }
	        ret.push(",", actionToJs(rule.action, identifiers, defined, scope));
	        ret.push(");");
	        return ret.join("");
	    }).value().join(""));
	    ret.push("});");
	    ret.push("};");
	    ret.push("}());");
	    return ret.join("");
	};



	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13).Buffer))

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {"use strict";
	var extd = __webpack_require__(5),
	    instanceOf = extd.instanceOf,
	    forEach = extd.forEach,
	    declare = extd.declare,
	    InitialFact = __webpack_require__(40).InitialFact,
	    conflictStrategies = __webpack_require__(44),
	    conflictResolution = conflictStrategies.strategy(["salience", "activationRecency"]),
	    rule = __webpack_require__(39),
	    Flow = __webpack_require__(45);

	var flows = {};
	var FlowContainer = declare({

	    instance: {

	        constructor: function (name, cb) {
	            this.name = name;
	            this.cb = cb;
	            this.__rules = [];
	            this.__defined = {};
	            this.conflictResolutionStrategy = conflictResolution;
	            if (cb) {
	                cb.call(this, this);
	            }
	            if (!flows.hasOwnProperty(name)) {
	                flows[name] = this;
	            } else {
	                throw new Error("Flow with " + name + " already defined");
	            }
	        },

	        conflictResolution: function (strategies) {
	            this.conflictResolutionStrategy = conflictStrategies.strategy(strategies);
	            return this;
	        },

	        getDefined: function (name) {
	            var ret = this.__defined[name.toLowerCase()];
	            if (!ret) {
	                throw new Error(name + " flow class is not defined");
	            }
	            return ret;
	        },

	        addDefined: function (name, cls) {
	            //normalize
	            this.__defined[name.toLowerCase()] = cls;
	            return cls;
	        },

	        rule: function () {
	            this.__rules = this.__rules.concat(rule.createRule.apply(rule, arguments));
	            return this;
	        },

	        getSession: function () {
	            var flow = new Flow(this.name, this.conflictResolutionStrategy);
	            forEach(this.__rules, function (rule) {
	                flow.rule(rule);
	            });
	            flow.assert(new InitialFact());
	            for (var i = 0, l = arguments.length; i < l; i++) {
	                flow.assert(arguments[i]);
	            }
	            return flow;
	        },

	        containsRule: function (name) {
	            return extd.some(this.__rules, function (rule) {
	                return rule.name === name;
	            });
	        }

	    },

	    "static": {
	        getFlow: function (name) {
	            return flows[name];
	        },

	        hasFlow: function (name) {
	            return extd.has(flows, name);
	        },

	        deleteFlow: function (name) {
	            if (instanceOf(name, FlowContainer)) {
	                name = name.name;
	            }
	            delete flows[name];
	            return FlowContainer;
	        },

	        deleteFlows: function () {
	            for (var name in flows) {
	                if (name in flows) {
	                    delete flows[name];
	                }
	            }
	            return FlowContainer;
	        },

	        create: function (name, cb) {
	            return new FlowContainer(name, cb);
	        }
	    }

	}).as(module);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(28)(module)))

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var map = __webpack_require__(5).map;

	function salience(a, b) {
	    return a.rule.priority - b.rule.priority;
	}

	function bucketCounter(a, b) {
	    return a.counter - b.counter;
	}

	function factRecency(a, b) {
	    /*jshint noempty: false*/

	    var i = 0;
	    var aMatchRecency = a.match.recency,
	        bMatchRecency = b.match.recency, aLength = aMatchRecency.length - 1, bLength = bMatchRecency.length - 1;
	    while (aMatchRecency[i] === bMatchRecency[i] && i < aLength && i < bLength && i++) {
	    }
	    var ret = aMatchRecency[i] - bMatchRecency[i];
	    if (!ret) {
	        ret = aLength - bLength;
	    }
	    return ret;
	}

	function activationRecency(a, b) {
	    return a.recency - b.recency;
	}

	var strategies = {
	    salience: salience,
	    bucketCounter: bucketCounter,
	    factRecency: factRecency,
	    activationRecency: activationRecency
	};

	exports.strategies = strategies;
	exports.strategy = function (strats) {
	    strats = map(strats, function (s) {
	        return strategies[s];
	    });
	    var stratsLength = strats.length;

	    return function (a, b) {
	        var i = -1, ret = 0;
	        var equal = (a === b) || (a.name === b.name && a.hashCode === b.hashCode);
	        if (!equal) {
	            while (++i < stratsLength && !ret) {
	                ret = strats[i](a, b);
	            }
	            ret = ret > 0 ? 1 : -1;
	        }
	        return ret;
	    };
	};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var extd = __webpack_require__(5),
	    bind = extd.bind,
	    declare = extd.declare,
	    nodes = __webpack_require__(46),
	    EventEmitter = __webpack_require__(72).EventEmitter,
	    wm = __webpack_require__(73),
	    WorkingMemory = wm.WorkingMemory,
	    ExecutionStragegy = __webpack_require__(74),
	    AgendaTree = __webpack_require__(76);

	module.exports = declare(EventEmitter, {

	    instance: {

	        name: null,

	        executionStrategy: null,

	        constructor: function (name, conflictResolutionStrategy) {
	            this.env = null;
	            this.name = name;
	            this.__rules = {};
	            this.conflictResolutionStrategy = conflictResolutionStrategy;
	            this.workingMemory = new WorkingMemory();
	            this.agenda = new AgendaTree(this, conflictResolutionStrategy);
	            this.agenda.on("fire", bind(this, "emit", "fire"));
	            this.agenda.on("focused", bind(this, "emit", "focused"));
	            this.rootNode = new nodes.RootNode(this.workingMemory, this.agenda);
	            extd.bindAll(this, "halt", "assert", "retract", "modify", "focus",
	              "emit", "getFacts", "getFact");
	        },

	        getFacts: function (Type) {
	            var ret;
	            if (Type) {
	                ret = this.workingMemory.getFactsByType(Type);
	            } else {
	                ret = this.workingMemory.getFacts();
	            }
	            return ret;
	        },

	        getFact: function (Type) {
	            var ret;
	            if (Type) {
	                ret = this.workingMemory.getFactsByType(Type);
	            } else {
	                ret = this.workingMemory.getFacts();
	            }
	            return ret && ret[0];
	        },

	        focus: function (focused) {
	            this.agenda.setFocus(focused);
	            return this;
	        },

	        halt: function () {
	            this.executionStrategy.halt();
	            return this;
	        },

	        dispose: function () {
	            this.workingMemory.dispose();
	            this.agenda.dispose();
	            this.rootNode.dispose();
	        },

	        assert: function (fact) {
	            this.rootNode.assertFact(this.workingMemory.assertFact(fact));
	            this.emit("assert", fact);
	            return fact;
	        },

	        // This method is called to remove an existing fact from working memory
	        retract: function (fact) {
	            //fact = this.workingMemory.getFact(fact);
	            this.rootNode.retractFact(this.workingMemory.retractFact(fact));
	            this.emit("retract", fact);
	            return fact;
	        },

	        // This method is called to alter an existing fact.  It is essentially a
	        // retract followed by an assert.
	        modify: function (fact, cb) {
	            //fact = this.workingMemory.getFact(fact);
	            if ("function" === typeof cb) {
	                cb.call(fact, fact);
	            }
	            this.rootNode.modifyFact(this.workingMemory.modifyFact(fact));
	            this.emit("modify", fact);
	            return fact;
	        },

	        print: function () {
	            this.rootNode.print();
	        },

	        containsRule: function (name) {
	            return this.rootNode.containsRule(name);
	        },

	        rule: function (rule) {
	            this.rootNode.assertRule(rule);
	        },

	        matchUntilHalt: function (cb) {
	            return (this.executionStrategy = new ExecutionStragegy(this, true)).execute().classic(cb).promise();
	        },

	        match: function (cb) {
	            return (this.executionStrategy = new ExecutionStragegy(this)).execute().classic(cb).promise();
	        }

	    }
	});

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var extd = __webpack_require__(5),
	    forEach = extd.forEach,
	    some = extd.some,
	    declare = extd.declare,
	    pattern = __webpack_require__(40),
	    ObjectPattern = pattern.ObjectPattern,
	    FromPattern = pattern.FromPattern,
	    FromNotPattern = pattern.FromNotPattern,
	    ExistsPattern = pattern.ExistsPattern,
	    FromExistsPattern = pattern.FromExistsPattern,
	    NotPattern = pattern.NotPattern,
	    CompositePattern = pattern.CompositePattern,
	    InitialFactPattern = pattern.InitialFactPattern,
	    constraints = __webpack_require__(38),
	    HashConstraint = constraints.HashConstraint,
	    ReferenceConstraint = constraints.ReferenceConstraint,
	    AliasNode = __webpack_require__(47),
	    EqualityNode = __webpack_require__(51),
	    JoinNode = __webpack_require__(52),
	    BetaNode = __webpack_require__(53),
	    NotNode = __webpack_require__(61),
	    FromNode = __webpack_require__(62),
	    FromNotNode = __webpack_require__(63),
	    ExistsNode = __webpack_require__(64),
	    ExistsFromNode = __webpack_require__(65),
	    LeftAdapterNode = __webpack_require__(66),
	    RightAdapterNode = __webpack_require__(68),
	    TypeNode = __webpack_require__(69),
	    TerminalNode = __webpack_require__(70),
	    PropertyNode = __webpack_require__(71);

	function hasRefernceConstraints(pattern) {
	    return some(pattern.constraints || [], function (c) {
	        return c instanceof ReferenceConstraint;
	    });
	}

	declare({
	    instance: {
	        constructor: function (wm, agendaTree) {
	            this.terminalNodes = [];
	            this.joinNodes = [];
	            this.nodes = [];
	            this.constraints = [];
	            this.typeNodes = [];
	            this.__ruleCount = 0;
	            this.bucket = {
	                counter: 0,
	                recency: 0
	            };
	            this.agendaTree = agendaTree;
	            this.workingMemory = wm;
	        },

	        assertRule: function (rule) {
	            var terminalNode = new TerminalNode(this.bucket, this.__ruleCount++, rule, this.agendaTree);
	            this.__addToNetwork(rule, rule.pattern, terminalNode);
	            this.__mergeJoinNodes();
	            this.terminalNodes.push(terminalNode);
	        },

	        resetCounter: function () {
	            this.bucket.counter = 0;
	        },

	        incrementCounter: function () {
	            this.bucket.counter++;
	        },

	        assertFact: function (fact) {
	            var typeNodes = this.typeNodes, i = typeNodes.length - 1;
	            for (; i >= 0; i--) {
	                typeNodes[i].assert(fact);
	            }
	        },

	        retractFact: function (fact) {
	            var typeNodes = this.typeNodes, i = typeNodes.length - 1;
	            for (; i >= 0; i--) {
	                typeNodes[i].retract(fact);
	            }
	        },

	        modifyFact: function (fact) {
	            var typeNodes = this.typeNodes, i = typeNodes.length - 1;
	            for (; i >= 0; i--) {
	                typeNodes[i].modify(fact);
	            }
	        },


	        containsRule: function (name) {
	            return some(this.terminalNodes, function (n) {
	                return n.rule.name === name;
	            });
	        },

	        dispose: function () {
	            var typeNodes = this.typeNodes, i = typeNodes.length - 1;
	            for (; i >= 0; i--) {
	                typeNodes[i].dispose();
	            }
	        },

	        __mergeJoinNodes: function () {
	            var joinNodes = this.joinNodes;
	            for (var i = 0; i < joinNodes.length; i++) {
	                var j1 = joinNodes[i], j2 = joinNodes[i + 1];
	                if (j1 && j2 && (j1.constraint && j2.constraint && j1.constraint.equal(j2.constraint))) {
	                    j1.merge(j2);
	                    joinNodes.splice(i + 1, 1);
	                }
	            }
	        },

	        __checkEqual: function (node) {
	            var constraints = this.constraints, i = constraints.length - 1;
	            for (; i >= 0; i--) {
	                var n = constraints[i];
	                if (node.equal(n)) {
	                    return  n;
	                }
	            }
	            constraints.push(node);
	            return node;
	        },

	        __createTypeNode: function (rule, pattern) {
	            var ret = new TypeNode(pattern.get("constraints")[0]);
	            var constraints = this.typeNodes, i = constraints.length - 1;
	            for (; i >= 0; i--) {
	                var n = constraints[i];
	                if (ret.equal(n)) {
	                    return  n;
	                }
	            }
	            constraints.push(ret);
	            return ret;
	        },

	        __createEqualityNode: function (rule, constraint) {
	            return this.__checkEqual(new EqualityNode(constraint)).addRule(rule);
	        },

	        __createPropertyNode: function (rule, constraint) {
	            return this.__checkEqual(new PropertyNode(constraint)).addRule(rule);
	        },

	        __createAliasNode: function (rule, pattern) {
	            return this.__checkEqual(new AliasNode(pattern)).addRule(rule);
	        },

	        __createAdapterNode: function (rule, side) {
	            return (side === "left" ? new LeftAdapterNode() : new RightAdapterNode()).addRule(rule);
	        },

	        __createJoinNode: function (rule, pattern, outNode, side) {
	            var joinNode;
	            if (pattern.rightPattern instanceof NotPattern) {
	                joinNode = new NotNode();
	            } else if (pattern.rightPattern instanceof FromExistsPattern) {
	                joinNode = new ExistsFromNode(pattern.rightPattern, this.workingMemory);
	            } else if (pattern.rightPattern instanceof ExistsPattern) {
	                joinNode = new ExistsNode();
	            } else if (pattern.rightPattern instanceof FromNotPattern) {
	                joinNode = new FromNotNode(pattern.rightPattern, this.workingMemory);
	            } else if (pattern.rightPattern instanceof FromPattern) {
	                joinNode = new FromNode(pattern.rightPattern, this.workingMemory);
	            } else if (pattern instanceof CompositePattern && !hasRefernceConstraints(pattern.leftPattern) && !hasRefernceConstraints(pattern.rightPattern)) {
	                joinNode = new BetaNode();
	                this.joinNodes.push(joinNode);
	            } else {
	                joinNode = new JoinNode();
	                this.joinNodes.push(joinNode);
	            }
	            joinNode["__rule__"] = rule;
	            var parentNode = joinNode;
	            if (outNode instanceof BetaNode) {
	                var adapterNode = this.__createAdapterNode(rule, side);
	                parentNode.addOutNode(adapterNode, pattern);
	                parentNode = adapterNode;
	            }
	            parentNode.addOutNode(outNode, pattern);
	            return joinNode.addRule(rule);
	        },

	        __addToNetwork: function (rule, pattern, outNode, side) {
	            if (pattern instanceof ObjectPattern) {
	                if (!(pattern instanceof InitialFactPattern) && (!side || side === "left")) {
	                    this.__createBetaNode(rule, new CompositePattern(new InitialFactPattern(), pattern), outNode, side);
	                } else {
	                    this.__createAlphaNode(rule, pattern, outNode, side);
	                }
	            } else if (pattern instanceof CompositePattern) {
	                this.__createBetaNode(rule, pattern, outNode, side);
	            }
	        },

	        __createBetaNode: function (rule, pattern, outNode, side) {
	            var joinNode = this.__createJoinNode(rule, pattern, outNode, side);
	            this.__addToNetwork(rule, pattern.rightPattern, joinNode, "right");
	            this.__addToNetwork(rule, pattern.leftPattern, joinNode, "left");
	            outNode.addParentNode(joinNode);
	            return joinNode;
	        },


	        __createAlphaNode: function (rule, pattern, outNode, side) {
	            var typeNode, parentNode;
	            if (!(pattern instanceof FromPattern)) {

	                var constraints = pattern.get("constraints");
	                typeNode = this.__createTypeNode(rule, pattern);
	                var aliasNode = this.__createAliasNode(rule, pattern);
	                typeNode.addOutNode(aliasNode, pattern);
	                aliasNode.addParentNode(typeNode);
	                parentNode = aliasNode;
	                var i = constraints.length - 1;
	                for (; i > 0; i--) {
	                    var constraint = constraints[i], node;
	                    if (constraint instanceof HashConstraint) {
	                        node = this.__createPropertyNode(rule, constraint);
	                    } else if (constraint instanceof ReferenceConstraint) {
	                        outNode.constraint.addConstraint(constraint);
	                        continue;
	                    } else {
	                        node = this.__createEqualityNode(rule, constraint);
	                    }
	                    parentNode.addOutNode(node, pattern);
	                    node.addParentNode(parentNode);
	                    parentNode = node;
	                }

	                if (outNode instanceof BetaNode) {
	                    var adapterNode = this.__createAdapterNode(rule, side);
	                    adapterNode.addParentNode(parentNode);
	                    parentNode.addOutNode(adapterNode, pattern);
	                    parentNode = adapterNode;
	                }
	                outNode.addParentNode(parentNode);
	                parentNode.addOutNode(outNode, pattern);
	                return typeNode;
	            }
	        },

	        print: function () {
	            forEach(this.terminalNodes, function (t) {
	                t.print("    ");
	            });
	        }
	    }
	}).as(exports, "RootNode");







/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var AlphaNode = __webpack_require__(48);

	AlphaNode.extend({
	    instance: {

	        constructor: function () {
	            this._super(arguments);
	            this.alias = this.constraint.get("alias");
	        },

	        toString: function () {
	            return "AliasNode" + this.__count;
	        },

	        assert: function (context) {
	            return this.__propagate("assert", context.set(this.alias, context.fact.object));
	        },

	        modify: function (context) {
	            return this.__propagate("modify", context.set(this.alias, context.fact.object));
	        },

	        retract: function (context) {
	            return this.__propagate("retract", context.set(this.alias, context.fact.object));
	        },

	        equal: function (other) {
	            return other instanceof this._static && this.alias === other.alias;
	        }
	    }
	}).as(module);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(28)(module)))

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {"use strict";
	var Node = __webpack_require__(49);

	Node.extend({
	    instance: {
	        constructor: function (constraint) {
	            this._super([]);
	            this.constraint = constraint;
	            this.constraintAssert = this.constraint.assert;
	        },

	        toString: function () {
	            return "AlphaNode " + this.__count;
	        },

	        equal: function (constraint) {
	            return this.constraint.equal(constraint.constraint);
	        }
	    }
	}).as(module);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(28)(module)))

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var extd = __webpack_require__(5),
	    forEach = extd.forEach,
	    indexOf = extd.indexOf,
	    intersection = extd.intersection,
	    declare = extd.declare,
	    HashTable = extd.HashTable,
	    Context = __webpack_require__(50);

	var count = 0;
	declare({
	    instance: {
	        constructor: function () {
	            this.nodes = new HashTable();
	            this.rules = [];
	            this.parentNodes = [];
	            this.__count = count++;
	            this.__entrySet = [];
	        },

	        addRule: function (rule) {
	            if (indexOf(this.rules, rule) === -1) {
	                this.rules.push(rule);
	            }
	            return this;
	        },

	        merge: function (that) {
	            that.nodes.forEach(function (entry) {
	                var patterns = entry.value, node = entry.key;
	                for (var i = 0, l = patterns.length; i < l; i++) {
	                    this.addOutNode(node, patterns[i]);
	                }
	                that.nodes.remove(node);
	            }, this);
	            var thatParentNodes = that.parentNodes;
	            for (var i = 0, l = that.parentNodes.l; i < l; i++) {
	                var parentNode = thatParentNodes[i];
	                this.addParentNode(parentNode);
	                parentNode.nodes.remove(that);
	            }
	            return this;
	        },

	        resolve: function (mr1, mr2) {
	            return mr1.hashCode === mr2.hashCode;
	        },

	        print: function (tab) {
	            console.log(tab + this.toString());
	            forEach(this.parentNodes, function (n) {
	                n.print("    " + tab);
	            });
	        },

	        addOutNode: function (outNode, pattern) {
	            if (!this.nodes.contains(outNode)) {
	                this.nodes.put(outNode, []);
	            }
	            this.nodes.get(outNode).push(pattern);
	            this.__entrySet = this.nodes.entrySet();
	        },

	        addParentNode: function (n) {
	            if (indexOf(this.parentNodes, n) === -1) {
	                this.parentNodes.push(n);
	            }
	        },

	        shareable: function () {
	            return false;
	        },

	        __propagate: function (method, context) {
	            var entrySet = this.__entrySet, i = entrySet.length, entry, outNode, paths, continuingPaths;
	            while (--i > -1) {
	                entry = entrySet[i];
	                outNode = entry.key;
	                paths = entry.value;

	                if ((continuingPaths = intersection(paths, context.paths)).length) {
	                    outNode[method](new Context(context.fact, continuingPaths, context.match));
	                }

	            }
	        },

	        dispose: function (assertable) {
	            this.propagateDispose(assertable);
	        },

	        retract: function (assertable) {
	            this.propagateRetract(assertable);
	        },

	        propagateDispose: function (assertable, outNodes) {
	            outNodes = outNodes || this.nodes;
	            var entrySet = this.__entrySet, i = entrySet.length - 1;
	            for (; i >= 0; i--) {
	                var entry = entrySet[i], outNode = entry.key;
	                outNode.dispose(assertable);
	            }
	        },

	        propagateAssert: function (assertable) {
	            this.__propagate("assert", assertable);
	        },

	        propagateRetract: function (assertable) {
	            this.__propagate("retract", assertable);
	        },

	        assert: function (assertable) {
	            this.propagateAssert(assertable);
	        },

	        modify: function (assertable) {
	            this.propagateModify(assertable);
	        },

	        propagateModify: function (assertable) {
	            this.__propagate("modify", assertable);
	        }
	    }

	}).as(module);

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(28)(module)))

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {"use strict";
	var extd = __webpack_require__(5),
	    isBoolean = extd.isBoolean,
	    declare = extd.declare,
	    indexOf = extd.indexOf,
	    pPush = Array.prototype.push;

	function createContextHash(paths, hashCode) {
	    var ret = "",
	        i = -1,
	        l = paths.length;
	    while (++i < l) {
	        ret += paths[i].id + ":";
	    }
	    ret += hashCode;
	    return ret;
	}

	function merge(h1, h2, aliases) {
	    var i = -1, l = aliases.length, alias;
	    while (++i < l) {
	        alias = aliases[i];
	        h1[alias] = h2[alias];
	    }
	}

	function unionRecency(arr, arr1, arr2) {
	    pPush.apply(arr, arr1);
	    var i = -1, l = arr2.length, val, j = arr.length;
	    while (++i < l) {
	        val = arr2[i];
	        if (indexOf(arr, val) === -1) {
	            arr[j++] = val;
	        }
	    }
	}

	var Match = declare({
	    instance: {

	        isMatch: true,
	        hashCode: "",
	        facts: null,
	        factIds: null,
	        factHash: null,
	        recency: null,
	        aliases: null,

	        constructor: function () {
	            this.facts = [];
	            this.factIds = [];
	            this.factHash = {};
	            this.recency = [];
	            this.aliases = [];
	        },

	        addFact: function (assertable) {
	            pPush.call(this.facts, assertable);
	            pPush.call(this.recency, assertable.recency);
	            pPush.call(this.factIds, assertable.id);
	            this.hashCode = this.factIds.join(":");
	            return this;
	        },

	        merge: function (mr) {
	            var ret = new Match();
	            ret.isMatch = mr.isMatch;
	            pPush.apply(ret.facts, this.facts);
	            pPush.apply(ret.facts, mr.facts);
	            pPush.apply(ret.aliases, this.aliases);
	            pPush.apply(ret.aliases, mr.aliases);
	            ret.hashCode = this.hashCode + ":" + mr.hashCode;
	            merge(ret.factHash, this.factHash, this.aliases);
	            merge(ret.factHash, mr.factHash, mr.aliases);
	            unionRecency(ret.recency, this.recency, mr.recency);
	            return ret;
	        }
	    }
	});

	var Context = declare({
	    instance: {
	        match: null,
	        factHash: null,
	        aliases: null,
	        fact: null,
	        hashCode: null,
	        paths: null,
	        pathsHash: null,

	        constructor: function (fact, paths, mr) {
	            this.fact = fact;
	            if (mr) {
	                this.match = mr;
	            } else {
	                this.match = new Match().addFact(fact);
	            }
	            this.factHash = this.match.factHash;
	            this.aliases = this.match.aliases;
	            this.hashCode = this.match.hashCode;
	            if (paths) {
	                this.paths = paths;
	                this.pathsHash = createContextHash(paths, this.hashCode);
	            } else {
	                this.pathsHash = this.hashCode;
	            }
	        },

	        "set": function (key, value) {
	            this.factHash[key] = value;
	            this.aliases.push(key);
	            return this;
	        },

	        isMatch: function (isMatch) {
	            if (isBoolean(isMatch)) {
	                this.match.isMatch = isMatch;
	            } else {
	                return this.match.isMatch;
	            }
	            return this;
	        },

	        mergeMatch: function (merge) {
	            var match = this.match = this.match.merge(merge);
	            this.factHash = match.factHash;
	            this.hashCode = match.hashCode;
	            this.aliases = match.aliases;
	            return this;
	        },

	        clone: function (fact, paths, match) {
	            return new Context(fact || this.fact, paths || this.path, match || this.match);
	        }
	    }
	}).as(module);



	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(28)(module)))

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var AlphaNode = __webpack_require__(48);

	AlphaNode.extend({
	    instance: {

	        constructor: function () {
	            this.memory = {};
	            this._super(arguments);
	            this.constraintAssert = this.constraint.assert;
	        },

	        assert: function (context) {
	            if ((this.memory[context.pathsHash] = this.constraintAssert(context.factHash))) {
	                this.__propagate("assert", context);
	            }
	        },

	        modify: function (context) {
	            var memory = this.memory,
	                hashCode = context.pathsHash,
	                wasMatch = memory[hashCode];
	            if ((memory[hashCode] = this.constraintAssert(context.factHash))) {
	                this.__propagate(wasMatch ? "modify" : "assert", context);
	            } else if (wasMatch) {
	                this.__propagate("retract", context);
	            }
	        },

	        retract: function (context) {
	            var hashCode = context.pathsHash,
	                memory = this.memory;
	            if (memory[hashCode]) {
	                this.__propagate("retract", context);
	            }
	            memory[hashCode] = null;
	        },

	        toString: function () {
	            return "EqualityNode" + this.__count;
	        }
	    }
	}).as(module);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(28)(module)))

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var BetaNode = __webpack_require__(53),
	    JoinReferenceNode = __webpack_require__(60);

	BetaNode.extend({

	    instance: {
	        constructor: function () {
	            this._super(arguments);
	            this.constraint = new JoinReferenceNode(this.leftTuples, this.rightTuples);
	        },

	        nodeType: "JoinNode",

	        propagateFromLeft: function (context, rm) {
	            var mr;
	            if ((mr = this.constraint.match(context, rm)).isMatch) {
	                this.__propagate("assert", this.__addToMemoryMatches(rm, context, context.clone(null, null, mr)));
	            }
	            return this;
	        },

	        propagateFromRight: function (context, lm) {
	            var mr;
	            if ((mr = this.constraint.match(lm, context)).isMatch) {
	                this.__propagate("assert", this.__addToMemoryMatches(context, lm, context.clone(null, null, mr)));
	            }
	            return this;
	        },

	        propagateAssertModifyFromLeft: function (context, rightMatches, rm) {
	            var factId = rm.hashCode, mr;
	            if (factId in rightMatches) {
	                mr = this.constraint.match(context, rm);
	                var mrIsMatch = mr.isMatch;
	                if (!mrIsMatch) {
	                    this.__propagate("retract", rightMatches[factId].clone());
	                } else {
	                    this.__propagate("modify", this.__addToMemoryMatches(rm, context, context.clone(null, null, mr)));
	                }
	            } else {
	                this.propagateFromLeft(context, rm);
	            }
	        },

	        propagateAssertModifyFromRight: function (context, leftMatches, lm) {
	            var factId = lm.hashCode, mr;
	            if (factId in leftMatches) {
	                mr = this.constraint.match(lm, context);
	                var mrIsMatch = mr.isMatch;
	                if (!mrIsMatch) {
	                    this.__propagate("retract", leftMatches[factId].clone());
	                } else {
	                    this.__propagate("modify", this.__addToMemoryMatches(context, lm, context.clone(null, null, mr)));
	                }
	            } else {
	                this.propagateFromRight(context, lm);
	            }
	        }
	    }

	}).as(module);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(28)(module)))

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var extd = __webpack_require__(5),
	    keys = extd.hash.keys,
	    Node = __webpack_require__(49),
	    LeftMemory = __webpack_require__(54), RightMemory = __webpack_require__(59);

	Node.extend({

	    instance: {

	        nodeType: "BetaNode",

	        constructor: function () {
	            this._super([]);
	            this.leftMemory = {};
	            this.rightMemory = {};
	            this.leftTuples = new LeftMemory();
	            this.rightTuples = new RightMemory();
	        },

	        __propagate: function (method, context) {
	            var entrySet = this.__entrySet, i = entrySet.length, entry, outNode;
	            while (--i > -1) {
	                entry = entrySet[i];
	                outNode = entry.key;
	                outNode[method](context);
	            }
	        },

	        dispose: function () {
	            this.leftMemory = {};
	            this.rightMemory = {};
	            this.leftTuples.clear();
	            this.rightTuples.clear();
	        },

	        disposeLeft: function (fact) {
	            this.leftMemory = {};
	            this.leftTuples.clear();
	            this.propagateDispose(fact);
	        },

	        disposeRight: function (fact) {
	            this.rightMemory = {};
	            this.rightTuples.clear();
	            this.propagateDispose(fact);
	        },

	        hashCode: function () {
	            return  this.nodeType + " " + this.__count;
	        },

	        toString: function () {
	            return this.nodeType + " " + this.__count;
	        },

	        retractLeft: function (context) {
	            context = this.removeFromLeftMemory(context).data;
	            var rightMatches = context.rightMatches,
	                hashCodes = keys(rightMatches),
	                i = -1,
	                l = hashCodes.length;
	            while (++i < l) {
	                this.__propagate("retract", rightMatches[hashCodes[i]].clone());
	            }
	        },

	        retractRight: function (context) {
	            context = this.removeFromRightMemory(context).data;
	            var leftMatches = context.leftMatches,
	                hashCodes = keys(leftMatches),
	                i = -1,
	                l = hashCodes.length;
	            while (++i < l) {
	                this.__propagate("retract", leftMatches[hashCodes[i]].clone());
	            }
	        },

	        assertLeft: function (context) {
	            this.__addToLeftMemory(context);
	            var rm = this.rightTuples.getRightMemory(context), i = -1, l = rm.length;
	            while (++i < l) {
	                this.propagateFromLeft(context, rm[i].data);
	            }
	        },

	        assertRight: function (context) {
	            this.__addToRightMemory(context);
	            var lm = this.leftTuples.getLeftMemory(context), i = -1, l = lm.length;
	            while (++i < l) {
	                this.propagateFromRight(context, lm[i].data);
	            }
	        },

	        modifyLeft: function (context) {
	            var previousContext = this.removeFromLeftMemory(context).data;
	            this.__addToLeftMemory(context);
	            var rm = this.rightTuples.getRightMemory(context), l = rm.length, i = -1, rightMatches;
	            if (!l) {
	                this.propagateRetractModifyFromLeft(previousContext);
	            } else {
	                rightMatches = previousContext.rightMatches;
	                while (++i < l) {
	                    this.propagateAssertModifyFromLeft(context, rightMatches, rm[i].data);
	                }

	            }
	        },

	        modifyRight: function (context) {
	            var previousContext = this.removeFromRightMemory(context).data;
	            this.__addToRightMemory(context);
	            var lm = this.leftTuples.getLeftMemory(context);
	            if (!lm.length) {
	                this.propagateRetractModifyFromRight(previousContext);
	            } else {
	                var leftMatches = previousContext.leftMatches, i = -1, l = lm.length;
	                while (++i < l) {
	                    this.propagateAssertModifyFromRight(context, leftMatches, lm[i].data);
	                }
	            }
	        },

	        propagateFromLeft: function (context, rc) {
	            this.__propagate("assert", this.__addToMemoryMatches(rc, context, context.clone(null, null, context.match.merge(rc.match))));
	        },

	        propagateFromRight: function (context, lc) {
	            this.__propagate("assert", this.__addToMemoryMatches(context, lc, lc.clone(null, null, lc.match.merge(context.match))));
	        },

	        propagateRetractModifyFromLeft: function (context) {
	            var rightMatches = context.rightMatches,
	                hashCodes = keys(rightMatches),
	                l = hashCodes.length,
	                i = -1;
	            while (++i < l) {
	                this.__propagate("retract", rightMatches[hashCodes[i]].clone());
	            }
	        },

	        propagateRetractModifyFromRight: function (context) {
	            var leftMatches = context.leftMatches,
	                hashCodes = keys(leftMatches),
	                l = hashCodes.length,
	                i = -1;
	            while (++i < l) {
	                this.__propagate("retract", leftMatches[hashCodes[i]].clone());
	            }
	        },

	        propagateAssertModifyFromLeft: function (context, rightMatches, rm) {
	            var factId = rm.hashCode;
	            if (factId in rightMatches) {
	                this.__propagate("modify", this.__addToMemoryMatches(rm, context, context.clone(null, null, context.match.merge(rm.match))));
	            } else {
	                this.propagateFromLeft(context, rm);
	            }
	        },

	        propagateAssertModifyFromRight: function (context, leftMatches, lm) {
	            var factId = lm.hashCode;
	            if (factId in leftMatches) {
	                this.__propagate("modify", this.__addToMemoryMatches(context, lm, context.clone(null, null, lm.match.merge(context.match))));
	            } else {
	                this.propagateFromRight(context, lm);
	            }
	        },

	        removeFromRightMemory: function (context) {
	            var hashCode = context.hashCode, ret;
	            context = this.rightMemory[hashCode] || null;
	            var tuples = this.rightTuples;
	            if (context) {
	                var leftMemory = this.leftMemory;
	                ret = context.data;
	                var leftMatches = ret.leftMatches;
	                tuples.remove(context);
	                var hashCodes = keys(leftMatches), i = -1, l = hashCodes.length;
	                while (++i < l) {
	                    delete leftMemory[hashCodes[i]].data.rightMatches[hashCode];
	                }
	                delete this.rightMemory[hashCode];
	            }
	            return context;
	        },

	        removeFromLeftMemory: function (context) {
	            var hashCode = context.hashCode;
	            context = this.leftMemory[hashCode] || null;
	            if (context) {
	                var rightMemory = this.rightMemory;
	                var rightMatches = context.data.rightMatches;
	                this.leftTuples.remove(context);
	                var hashCodes = keys(rightMatches), i = -1, l = hashCodes.length;
	                while (++i < l) {
	                    delete rightMemory[hashCodes[i]].data.leftMatches[hashCode];
	                }
	                delete this.leftMemory[hashCode];
	            }
	            return context;
	        },

	        getRightMemoryMatches: function (context) {
	            var lm = this.leftMemory[context.hashCode], ret = {};
	            if (lm) {
	                ret = lm.rightMatches;
	            }
	            return ret;
	        },

	        __addToMemoryMatches: function (rightContext, leftContext, createdContext) {
	            var rightFactId = rightContext.hashCode,
	                rm = this.rightMemory[rightFactId],
	                lm, leftFactId = leftContext.hashCode;
	            if (rm) {
	                rm = rm.data;
	                if (leftFactId in rm.leftMatches) {
	                    throw new Error("Duplicate left fact entry");
	                }
	                rm.leftMatches[leftFactId] = createdContext;
	            }
	            lm = this.leftMemory[leftFactId];
	            if (lm) {
	                lm = lm.data;
	                if (rightFactId in lm.rightMatches) {
	                    throw new Error("Duplicate right fact entry");
	                }
	                lm.rightMatches[rightFactId] = createdContext;
	            }
	            return createdContext;
	        },

	        __addToRightMemory: function (context) {
	            var hashCode = context.hashCode, rm = this.rightMemory;
	            if (hashCode in rm) {
	                return false;
	            }
	            rm[hashCode] = this.rightTuples.push(context);
	            context.leftMatches = {};
	            return true;
	        },


	        __addToLeftMemory: function (context) {
	            var hashCode = context.hashCode, lm = this.leftMemory;
	            if (hashCode in lm) {
	                return false;
	            }
	            lm[hashCode] = this.leftTuples.push(context);
	            context.rightMatches = {};
	            return true;
	        }
	    }

	}).as(module);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(28)(module)))

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var Memory = __webpack_require__(55);

	Memory.extend({

	    instance: {

	        getLeftMemory: function (tuple) {
	            return this.getMemory(tuple);
	        }
	    }

	}).as(module);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(28)(module)))

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var extd = __webpack_require__(5),
	    plucker = extd.plucker,
	    declare = extd.declare,
	    getMemory = __webpack_require__(56).getMemory,
	    Table = __webpack_require__(57),
	    TupleEntry = __webpack_require__(58);


	var id = 0;
	declare({

	    instance: {
	        length: 0,

	        constructor: function () {
	            this.head = null;
	            this.tail = null;
	            this.indexes = [];
	            this.tables = new TupleEntry(null, new Table(), false);
	        },

	        push: function (data) {
	            var tail = this.tail, head = this.head, node = {data: data, tuples: [], hashCode: id++, prev: tail, next: null};
	            if (tail) {
	                this.tail.next = node;
	            }
	            this.tail = node;
	            if (!head) {
	                this.head = node;
	            }
	            this.length++;
	            this.__index(node);
	            this.tables.addNode(node);
	            return node;
	        },

	        remove: function (node) {
	            if (node.prev) {
	                node.prev.next = node.next;
	            } else {
	                this.head = node.next;
	            }
	            if (node.next) {
	                node.next.prev = node.prev;
	            } else {
	                this.tail = node.prev;
	            }
	            this.tables.removeNode(node);
	            this.__removeFromIndex(node);
	            this.length--;
	        },

	        forEach: function (cb) {
	            var head = {next: this.head};
	            while ((head = head.next)) {
	                cb(head.data);
	            }
	        },

	        toArray: function () {
	            return this.tables.tuples.slice();
	        },

	        clear: function () {
	            this.head = this.tail = null;
	            this.length = 0;
	            this.clearIndexes();
	        },

	        clearIndexes: function () {
	            this.tables = {};
	            this.indexes.length = 0;
	        },

	        __index: function (node) {
	            var data = node.data,
	                factHash = data.factHash,
	                indexes = this.indexes,
	                entry = this.tables,
	                i = -1, l = indexes.length,
	                tuples, index, val, path, tables, currEntry, prevLookup;
	            while (++i < l) {
	                index = indexes[i];
	                val = index[2](factHash);
	                path = index[0];
	                tables = entry.tables;
	                if (!(tuples = (currEntry = tables[path] || (tables[path] = new Table())).get(val))) {
	                    tuples = new TupleEntry(val, currEntry, true);
	                    currEntry.set(val, tuples);
	                }
	                if (currEntry !== prevLookup) {
	                    node.tuples.push(tuples.addNode(node));
	                }
	                prevLookup = currEntry;
	                if (index[4] === "eq") {
	                    entry = tuples;
	                }
	            }
	        },

	        __removeFromIndex: function (node) {
	            var tuples = node.tuples, i = tuples.length;
	            while (--i >= 0) {
	                tuples[i].removeNode(node);
	            }
	            node.tuples.length = 0;
	        },

	        getMemory: function (tuple) {
	            var ret;
	            if (!this.length) {
	                ret = [];
	            } else {
	                ret = getMemory(this.tables, tuple.factHash, this.indexes);
	            }
	            return ret;
	        },

	        __createIndexTree: function () {
	            var table = this.tables.tables = {};
	            var indexes = this.indexes;
	            table[indexes[0][0]] = new Table();
	        },


	        addIndex: function (primary, lookup, op) {
	            this.indexes.push([primary, lookup, plucker(primary), plucker(lookup), op || "eq"]);
	            this.indexes.sort(function (a, b) {
	                var aOp = a[4], bOp = b[4];
	                return aOp === bOp ? 0 : aOp > bOp ? 1 : aOp === bOp ? 0 : -1;
	            });
	            this.__createIndexTree();

	        }

	    }

	}).as(module);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(28)(module)))

/***/ },
/* 56 */
/***/ function(module, exports) {

	exports.getMemory = (function () {

	    var pPush = Array.prototype.push, NPL = 0, EMPTY_ARRAY = [], NOT_POSSIBLES_HASH = {}, POSSIBLES_HASH = {}, PL = 0;

	    function mergePossibleTuples(ret, a, l) {
	        var val, j = 0, i = -1;
	        if (PL < l) {
	            while (PL && ++i < l) {
	                if (POSSIBLES_HASH[(val = a[i]).hashCode]) {
	                    ret[j++] = val;
	                    PL--;
	                }
	            }
	        } else {
	            pPush.apply(ret, a);
	        }
	        PL = 0;
	        POSSIBLES_HASH = {};
	    }


	    function mergeNotPossibleTuples(ret, a, l) {
	        var val, j = 0, i = -1;
	        if (NPL < l) {
	            while (++i < l) {
	                if (!NPL) {
	                    ret[j++] = a[i];
	                } else if (!NOT_POSSIBLES_HASH[(val = a[i]).hashCode]) {
	                    ret[j++] = val;
	                } else {
	                    NPL--;
	                }
	            }
	        }
	        NPL = 0;
	        NOT_POSSIBLES_HASH = {};
	    }

	    function mergeBothTuples(ret, a, l) {
	        if (PL === l) {
	            mergeNotPossibles(ret, a, l);
	        } else if (NPL < l) {
	            var val, j = 0, i = -1, hashCode;
	            while (++i < l) {
	                if (!NOT_POSSIBLES_HASH[(hashCode = (val = a[i]).hashCode)] && POSSIBLES_HASH[hashCode]) {
	                    ret[j++] = val;
	                }
	            }
	        }
	        NPL = 0;
	        NOT_POSSIBLES_HASH = {};
	        PL = 0;
	        POSSIBLES_HASH = {};
	    }

	    function mergePossiblesAndNotPossibles(a, l) {
	        var ret = EMPTY_ARRAY;
	        if (l) {
	            if (NPL || PL) {
	                ret = [];
	                if (!NPL) {
	                    mergePossibleTuples(ret, a, l);
	                } else if (!PL) {
	                    mergeNotPossibleTuples(ret, a, l);
	                } else {
	                    mergeBothTuples(ret, a, l);
	                }
	            } else {
	                ret = a;
	            }
	        }
	        return ret;
	    }

	    function getRangeTuples(op, currEntry, val) {
	        var ret;
	        if (op === "gt") {
	            ret = currEntry.findGT(val);
	        } else if (op === "gte") {
	            ret = currEntry.findGTE(val);
	        } else if (op === "lt") {
	            ret = currEntry.findLT(val);
	        } else if (op === "lte") {
	            ret = currEntry.findLTE(val);
	        }
	        return ret;
	    }

	    function mergeNotPossibles(tuples, tl) {
	        if (tl) {
	            var j = -1, hashCode;
	            while (++j < tl) {
	                hashCode = tuples[j].hashCode;
	                if (!NOT_POSSIBLES_HASH[hashCode]) {
	                    NOT_POSSIBLES_HASH[hashCode] = true;
	                    NPL++;
	                }
	            }
	        }
	    }

	    function mergePossibles(tuples, tl) {
	        if (tl) {
	            var j = -1, hashCode;
	            while (++j < tl) {
	                hashCode = tuples[j].hashCode;
	                if (!POSSIBLES_HASH[hashCode]) {
	                    POSSIBLES_HASH[hashCode] = true;
	                    PL++;
	                }
	            }
	        }
	    }

	    return function _getMemory(entry, factHash, indexes) {
	        var i = -1, l = indexes.length,
	            ret = entry.tuples,
	            rl = ret.length,
	            intersected = false,
	            tables = entry.tables,
	            index, val, op, nextEntry, currEntry, tuples, tl;
	        while (++i < l && rl) {
	            index = indexes[i];
	            val = index[3](factHash);
	            op = index[4];
	            currEntry = tables[index[0]];
	            if (op === "eq" || op === "seq") {
	                if ((nextEntry = currEntry.get(val))) {
	                    rl = (ret = (entry = nextEntry).tuples).length;
	                    tables = nextEntry.tables;
	                } else {
	                    rl = (ret = EMPTY_ARRAY).length;
	                }
	            } else if (op === "neq" || op === "sneq") {
	                if ((nextEntry = currEntry.get(val))) {
	                    tl = (tuples = nextEntry.tuples).length;
	                    mergeNotPossibles(tuples, tl);
	                }
	            } else if (!intersected) {
	                rl = (ret = getRangeTuples(op, currEntry, val)).length;
	                intersected = true;
	            } else if ((tl = (tuples = getRangeTuples(op, currEntry, val)).length)) {
	                mergePossibles(tuples, tl);
	            } else {
	                ret = tuples;
	                rl = tl;
	            }
	        }
	        return mergePossiblesAndNotPossibles(ret, rl);
	    };
	}());

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var extd = __webpack_require__(5),
	    pPush = Array.prototype.push,
	    HashTable = extd.HashTable,
	    AVLTree = extd.AVLTree;

	function compare(a, b) {
	    /*jshint eqeqeq: false*/
	    a = a.key;
	    b = b.key;
	    var ret;
	    if (a == b) {
	        ret = 0;
	    } else if (a > b) {
	        ret = 1;
	    } else if (a < b) {
	        ret = -1;
	    } else {
	        ret = 1;
	    }
	    return ret;
	}

	function compareGT(v1, v2) {
	    return compare(v1, v2) === 1;
	}
	function compareGTE(v1, v2) {
	    return compare(v1, v2) !== -1;
	}

	function compareLT(v1, v2) {
	    return compare(v1, v2) === -1;
	}
	function compareLTE(v1, v2) {
	    return compare(v1, v2) !== 1;
	}

	var STACK = [],
	    VALUE = {key: null};
	function traverseInOrder(tree, key, comparator) {
	    VALUE.key = key;
	    var ret = [];
	    var i = 0, current = tree.__root, v;
	    while (true) {
	        if (current) {
	            current = (STACK[i++] = current).left;
	        } else {
	            if (i > 0) {
	                v = (current = STACK[--i]).data;
	                if (comparator(v, VALUE)) {
	                    pPush.apply(ret, v.value.tuples);
	                    current = current.right;
	                } else {
	                    break;
	                }
	            } else {
	                break;
	            }
	        }
	    }
	    STACK.length = 0;
	    return ret;
	}

	function traverseReverseOrder(tree, key, comparator) {
	    VALUE.key = key;
	    var ret = [];
	    var i = 0, current = tree.__root, v;
	    while (true) {
	        if (current) {
	            current = (STACK[i++] = current).right;
	        } else {
	            if (i > 0) {
	                v = (current = STACK[--i]).data;
	                if (comparator(v, VALUE)) {
	                    pPush.apply(ret, v.value.tuples);
	                    current = current.left;
	                } else {
	                    break;
	                }
	            } else {
	                break;
	            }
	        }
	    }
	    STACK.length = 0;
	    return ret;
	}

	AVLTree.extend({
	    instance: {

	        constructor: function () {
	            this._super([
	                {
	                    compare: compare
	                }
	            ]);
	            this.gtCache = new HashTable();
	            this.gteCache = new HashTable();
	            this.ltCache = new HashTable();
	            this.lteCache = new HashTable();
	            this.hasGTCache = false;
	            this.hasGTECache = false;
	            this.hasLTCache = false;
	            this.hasLTECache = false;
	        },

	        clearCache: function () {
	            this.hasGTCache && this.gtCache.clear() && (this.hasGTCache = false);
	            this.hasGTECache && this.gteCache.clear() && (this.hasGTECache = false);
	            this.hasLTCache && this.ltCache.clear() && (this.hasLTCache = false);
	            this.hasLTECache && this.lteCache.clear() && (this.hasLTECache = false);
	        },

	        contains: function (key) {
	            return  this._super([
	                {key: key}
	            ]);
	        },

	        "set": function (key, value) {
	            this.insert({key: key, value: value});
	            this.clearCache();
	        },

	        "get": function (key) {
	            var ret = this.find({key: key});
	            return ret && ret.value;
	        },

	        "remove": function (key) {
	            this.clearCache();
	            return this._super([
	                {key: key}
	            ]);
	        },

	        findGT: function (key) {
	            var ret = this.gtCache.get(key);
	            if (!ret) {
	                this.hasGTCache = true;
	                this.gtCache.put(key, (ret = traverseReverseOrder(this, key, compareGT)));
	            }
	            return ret;
	        },

	        findGTE: function (key) {
	            var ret = this.gteCache.get(key);
	            if (!ret) {
	                this.hasGTECache = true;
	                this.gteCache.put(key, (ret = traverseReverseOrder(this, key, compareGTE)));
	            }
	            return ret;
	        },

	        findLT: function (key) {
	            var ret = this.ltCache.get(key);
	            if (!ret) {
	                this.hasLTCache = true;
	                this.ltCache.put(key, (ret = traverseInOrder(this, key, compareLT)));
	            }
	            return ret;
	        },

	        findLTE: function (key) {
	            var ret = this.lteCache.get(key);
	            if (!ret) {
	                this.hasLTECache = true;
	                this.lteCache.put(key, (ret = traverseInOrder(this, key, compareLTE)));
	            }
	            return ret;
	        }

	    }
	}).as(module);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(28)(module)))

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var extd = __webpack_require__(5),
	    indexOf = extd.indexOf;
	//    HashSet = require("./hashSet");


	var TUPLE_ID = 0;
	extd.declare({

	    instance: {
	        tuples: null,
	        tupleMap: null,
	        hashCode: null,
	        tables: null,
	        entry: null,
	        constructor: function (val, entry, canRemove) {
	            this.val = val;
	            this.canRemove = canRemove;
	            this.tuples = [];
	            this.tupleMap = {};
	            this.hashCode = TUPLE_ID++;
	            this.tables = {};
	            this.length = 0;
	            this.entry = entry;
	        },

	        addNode: function (node) {
	            this.tuples[this.length++] = node;
	            if (this.length > 1) {
	                this.entry.clearCache();
	            }
	            return this;
	        },

	        removeNode: function (node) {
	            var tuples = this.tuples, index = indexOf(tuples, node);
	            if (index !== -1) {
	                tuples.splice(index, 1);
	                this.length--;
	                this.entry.clearCache();
	            }
	            if (this.canRemove && !this.length) {
	                this.entry.remove(this.val);
	            }
	        }
	    }
	}).as(module);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(28)(module)))

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var Memory = __webpack_require__(55);

	Memory.extend({

	    instance: {

	        getRightMemory: function (tuple) {
	            return this.getMemory(tuple);
	        }
	    }

	}).as(module);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(28)(module)))

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var Node = __webpack_require__(49),
	    constraints = __webpack_require__(38),
	    ReferenceEqualityConstraint = constraints.ReferenceEqualityConstraint;

	var DEFUALT_CONSTRAINT = {
	    isDefault: true,
	    assert: function () {
	        return true;
	    },

	    equal: function () {
	        return false;
	    }
	};

	var inversions = {
	    "gt": "lte",
	    "gte": "lte",
	    "lt": "gte",
	    "lte": "gte",
	    "eq": "eq",
	    "neq": "neq"
	};

	function normalizeRightIndexConstraint(rightIndex, indexes, op) {
	    if (rightIndex === indexes[1]) {
	        op = inversions[op];
	    }
	    return op;
	}

	function normalizeLeftIndexConstraint(leftIndex, indexes, op) {
	    if (leftIndex === indexes[1]) {
	        op = inversions[op];
	    }
	    return op;
	}

	Node.extend({

	    instance: {

	        constraint: DEFUALT_CONSTRAINT,

	        constructor: function (leftMemory, rightMemory) {
	            this._super(arguments);
	            this.constraint = DEFUALT_CONSTRAINT;
	            this.constraintAssert = DEFUALT_CONSTRAINT.assert;
	            this.rightIndexes = [];
	            this.leftIndexes = [];
	            this.constraintLength = 0;
	            this.leftMemory = leftMemory;
	            this.rightMemory = rightMemory;
	        },

	        addConstraint: function (constraint) {
	            if (constraint instanceof ReferenceEqualityConstraint) {
	                var identifiers = constraint.getIndexableProperties();
	                var alias = constraint.get("alias");
	                if (identifiers.length === 2 && alias) {
	                    var leftIndex, rightIndex, i = -1, indexes = [];
	                    while (++i < 2) {
	                        var index = identifiers[i];
	                        if (index.match(new RegExp("^" + alias + "(\\.?)")) === null) {
	                            indexes.push(index);
	                            leftIndex = index;
	                        } else {
	                            indexes.push(index);
	                            rightIndex = index;
	                        }
	                    }
	                    if (leftIndex && rightIndex) {
	                        var leftOp = normalizeLeftIndexConstraint(leftIndex, indexes, constraint.op),
	                            rightOp = normalizeRightIndexConstraint(rightIndex, indexes, constraint.op);
	                        this.rightMemory.addIndex(rightIndex, leftIndex, rightOp);
	                        this.leftMemory.addIndex(leftIndex, rightIndex, leftOp);
	                    }
	                }
	            }
	            if (this.constraint.isDefault) {
	                this.constraint = constraint;
	                this.isDefault = false;
	            } else {
	                this.constraint = this.constraint.merge(constraint);
	            }
	            this.constraintAssert = this.constraint.assert;

	        },

	        equal: function (constraint) {
	            return this.constraint.equal(constraint.constraint);
	        },

	        isMatch: function (lc, rc) {
	            return this.constraintAssert(lc.factHash, rc.factHash);
	        },

	        match: function (lc, rc) {
	            var ret = {isMatch: false};
	            if (this.constraintAssert(lc.factHash, rc.factHash)) {
	                ret = lc.match.merge(rc.match);
	            }
	            return ret;
	        }

	    }

	}).as(module);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(28)(module)))

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var JoinNode = __webpack_require__(52),
	    LinkedList = __webpack_require__(27),
	    Context = __webpack_require__(50),
	    InitialFact = __webpack_require__(40).InitialFact;


	JoinNode.extend({
	    instance: {

	        nodeType: "NotNode",

	        constructor: function () {
	            this._super(arguments);
	            this.leftTupleMemory = {};
	            //use this ensure a unique match for and propagated context.
	            this.notMatch = new Context(new InitialFact()).match;
	        },

	        __cloneContext: function (context) {
	            return context.clone(null, null, context.match.merge(this.notMatch));
	        },


	        retractRight: function (context) {
	            var ctx = this.removeFromRightMemory(context),
	                rightContext = ctx.data,
	                blocking = rightContext.blocking;
	            if (blocking.length) {
	                //if we are blocking left contexts
	                var leftContext, thisConstraint = this.constraint, blockingNode = {next: blocking.head}, rc;
	                while ((blockingNode = blockingNode.next)) {
	                    leftContext = blockingNode.data;
	                    this.removeFromLeftBlockedMemory(leftContext);
	                    var rm = this.rightTuples.getRightMemory(leftContext), l = rm.length, i;
	                    i = -1;
	                    while (++i < l) {
	                        if (thisConstraint.isMatch(leftContext, rc = rm[i].data)) {
	                            this.blockedContext(leftContext, rc);
	                            leftContext = null;
	                            break;
	                        }
	                    }
	                    if (leftContext) {
	                        this.notBlockedContext(leftContext, true);
	                    }
	                }
	                blocking.clear();
	            }

	        },

	        blockedContext: function (leftContext, rightContext, propagate) {
	            leftContext.blocker = rightContext;
	            this.removeFromLeftMemory(leftContext);
	            this.addToLeftBlockedMemory(rightContext.blocking.push(leftContext));
	            propagate && this.__propagate("retract", this.__cloneContext(leftContext));
	        },

	        notBlockedContext: function (leftContext, propagate) {
	            this.__addToLeftMemory(leftContext);
	            propagate && this.__propagate("assert", this.__cloneContext(leftContext));
	        },

	        propagateFromLeft: function (leftContext) {
	            this.notBlockedContext(leftContext, true);
	        },

	        propagateFromRight: function (leftContext) {
	            this.notBlockedContext(leftContext, true);
	        },

	        blockFromAssertRight: function (leftContext, rightContext) {
	            this.blockedContext(leftContext, rightContext, true);
	        },

	        blockFromAssertLeft: function (leftContext, rightContext) {
	            this.blockedContext(leftContext, rightContext, false);
	        },


	        retractLeft: function (context) {
	            var ctx = this.removeFromLeftMemory(context);
	            if (ctx) {
	                ctx = ctx.data;
	                this.__propagate("retract", this.__cloneContext(ctx));
	            } else {
	                if (!this.removeFromLeftBlockedMemory(context)) {
	                    throw new Error();
	                }
	            }
	        },

	        assertLeft: function (context) {
	            var values = this.rightTuples.getRightMemory(context),
	                thisConstraint = this.constraint, rc, i = -1, l = values.length;
	            while (++i < l) {
	                if (thisConstraint.isMatch(context, rc = values[i].data)) {
	                    this.blockFromAssertLeft(context, rc);
	                    context = null;
	                    i = l;
	                }
	            }
	            if (context) {
	                this.propagateFromLeft(context);
	            }
	        },

	        assertRight: function (context) {
	            this.__addToRightMemory(context);
	            context.blocking = new LinkedList();
	            var fl = this.leftTuples.getLeftMemory(context).slice(),
	                i = -1, l = fl.length,
	                leftContext, thisConstraint = this.constraint;
	            while (++i < l) {
	                leftContext = fl[i].data;
	                if (thisConstraint.isMatch(leftContext, context)) {
	                    this.blockFromAssertRight(leftContext, context);
	                }
	            }
	        },

	        addToLeftBlockedMemory: function (context) {
	            var data = context.data, hashCode = data.hashCode;
	            var ctx = this.leftMemory[hashCode];
	            this.leftTupleMemory[hashCode] = context;
	            if (ctx) {
	                this.leftTuples.remove(ctx);
	            }
	            return this;
	        },

	        removeFromLeftBlockedMemory: function (context) {
	            var ret = this.leftTupleMemory[context.hashCode] || null;
	            if (ret) {
	                delete this.leftTupleMemory[context.hashCode];
	                ret.data.blocker.blocking.remove(ret);
	            }
	            return ret;
	        },

	        modifyLeft: function (context) {
	            var ctx = this.removeFromLeftMemory(context),
	                leftContext,
	                thisConstraint = this.constraint,
	                rightTuples = this.rightTuples.getRightMemory(context),
	                l = rightTuples.length,
	                isBlocked = false,
	                i, rc, blocker;
	            if (!ctx) {
	                //blocked before
	                ctx = this.removeFromLeftBlockedMemory(context);
	                isBlocked = true;
	            }
	            if (ctx) {
	                leftContext = ctx.data;

	                if (leftContext && leftContext.blocker) {
	                    //we were blocked before so only check nodes previous to our blocker
	                    blocker = this.rightMemory[leftContext.blocker.hashCode];
	                    leftContext.blocker = null;
	                }
	                if (blocker) {
	                    if (thisConstraint.isMatch(context, rc = blocker.data)) {
	                        //we cant be proagated so retract previous
	                        if (!isBlocked) {
	                            //we were asserted before so retract
	                            this.__propagate("retract", this.__cloneContext(leftContext));
	                        }
	                        context.blocker = rc;
	                        this.addToLeftBlockedMemory(rc.blocking.push(context));
	                        context = null;
	                    }
	                }
	                if (context && l) {
	                    i = -1;
	                    //we were propogated before
	                    while (++i < l) {
	                        if (thisConstraint.isMatch(context, rc = rightTuples[i].data)) {
	                            //we cant be proagated so retract previous
	                            if (!isBlocked) {
	                                //we were asserted before so retract
	                                this.__propagate("retract", this.__cloneContext(leftContext));
	                            }
	                            this.addToLeftBlockedMemory(rc.blocking.push(context));
	                            context.blocker = rc;
	                            context = null;
	                            break;
	                        }
	                    }
	                }
	                if (context) {
	                    //we can still be propogated
	                    this.__addToLeftMemory(context);
	                    if (!isBlocked) {
	                        //we weren't blocked before so modify
	                        this.__propagate("modify", this.__cloneContext(context));
	                    } else {
	                        //we were blocked before but aren't now
	                        this.__propagate("assert", this.__cloneContext(context));
	                    }

	                }
	            } else {
	                throw new Error();
	            }

	        },

	        modifyRight: function (context) {
	            var ctx = this.removeFromRightMemory(context);
	            if (ctx) {
	                var rightContext = ctx.data,
	                    leftTuples = this.leftTuples.getLeftMemory(context).slice(),
	                    leftTuplesLength = leftTuples.length,
	                    leftContext,
	                    thisConstraint = this.constraint,
	                    i, node,
	                    blocking = rightContext.blocking;
	                this.__addToRightMemory(context);
	                context.blocking = new LinkedList();

	                var rc;
	                //check old blocked contexts
	                //check if the same contexts blocked before are still blocked
	                var blockingNode = {next: blocking.head};
	                while ((blockingNode = blockingNode.next)) {
	                    leftContext = blockingNode.data;
	                    leftContext.blocker = null;
	                    if (thisConstraint.isMatch(leftContext, context)) {
	                        leftContext.blocker = context;
	                        this.addToLeftBlockedMemory(context.blocking.push(leftContext));
	                        leftContext = null;
	                    } else {
	                        //we arent blocked anymore
	                        leftContext.blocker = null;
	                        node = ctx;
	                        while ((node = node.next)) {
	                            if (thisConstraint.isMatch(leftContext, rc = node.data)) {
	                                leftContext.blocker = rc;
	                                this.addToLeftBlockedMemory(rc.blocking.push(leftContext));
	                                leftContext = null;
	                                break;
	                            }
	                        }
	                        if (leftContext) {
	                            this.__addToLeftMemory(leftContext);
	                            this.__propagate("assert", this.__cloneContext(leftContext));
	                        }
	                    }
	                }
	                if (leftTuplesLength) {
	                    //check currently left tuples in memory
	                    i = -1;
	                    while (++i < leftTuplesLength) {
	                        leftContext = leftTuples[i].data;
	                        if (thisConstraint.isMatch(leftContext, context)) {
	                            this.__propagate("retract", this.__cloneContext(leftContext));
	                            this.removeFromLeftMemory(leftContext);
	                            this.addToLeftBlockedMemory(context.blocking.push(leftContext));
	                            leftContext.blocker = context;
	                        }
	                    }
	                }
	            } else {
	                throw new Error();
	            }


	        }
	    }
	}).as(module);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(28)(module)))

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var JoinNode = __webpack_require__(52),
	    extd = __webpack_require__(5),
	    constraint = __webpack_require__(38),
	    EqualityConstraint = constraint.EqualityConstraint,
	    HashConstraint = constraint.HashConstraint,
	    ReferenceConstraint = constraint.ReferenceConstraint,
	    Context = __webpack_require__(50),
	    isDefined = extd.isDefined,
	    isEmpty = extd.isEmpty,
	    forEach = extd.forEach,
	    isArray = extd.isArray;

	var DEFAULT_MATCH = {
	    isMatch: function () {
	        return false;
	    }
	};

	JoinNode.extend({
	    instance: {

	        nodeType: "FromNode",

	        constructor: function (pattern, wm) {
	            this._super(arguments);
	            this.workingMemory = wm;
	            this.fromMemory = {};
	            this.pattern = pattern;
	            this.type = pattern.get("constraints")[0].assert;
	            this.alias = pattern.get("alias");
	            this.from = pattern.from.assert;
	            var eqConstraints = this.__equalityConstraints = [];
	            var vars = [];
	            forEach(this.constraints = this.pattern.get("constraints").slice(1), function (c) {
	                if (c instanceof EqualityConstraint || c instanceof ReferenceConstraint) {
	                    eqConstraints.push(c.assert);
	                } else if (c instanceof HashConstraint) {
	                    vars = vars.concat(c.get("variables"));
	                }
	            });
	            this.__variables = vars;
	        },

	        __createMatches: function (context) {
	            var fh = context.factHash, o = this.from(fh);
	            if (isArray(o)) {
	                for (var i = 0, l = o.length; i < l; i++) {
	                    this.__checkMatch(context, o[i], true);
	                }
	            } else if (isDefined(o)) {
	                this.__checkMatch(context, o, true);
	            }
	        },

	        __checkMatch: function (context, o, propogate) {
	            var newContext;
	            if ((newContext = this.__createMatch(context, o)).isMatch() && propogate) {
	                this.__propagate("assert", newContext.clone());
	            }
	            return newContext;
	        },

	        __createMatch: function (lc, o) {
	            if (this.type(o)) {
	                var createdFact = this.workingMemory.getFactHandle(o, true),
	                    createdContext,
	                    rc = new Context(createdFact, null, null)
	                        .set(this.alias, o),
	                    createdFactId = createdFact.id;
	                var fh = rc.factHash, lcFh = lc.factHash;
	                for (var key in lcFh) {
	                    fh[key] = lcFh[key];
	                }
	                var eqConstraints = this.__equalityConstraints, vars = this.__variables, i = -1, l = eqConstraints.length;
	                while (++i < l) {
	                    if (!eqConstraints[i](fh, fh)) {
	                        createdContext = DEFAULT_MATCH;
	                        break;
	                    }
	                }
	                var fm = this.fromMemory[createdFactId];
	                if (!fm) {
	                    fm = this.fromMemory[createdFactId] = {};
	                }
	                if (!createdContext) {
	                    var prop;
	                    i = -1;
	                    l = vars.length;
	                    while (++i < l) {
	                        prop = vars[i];
	                        fh[prop] = o[prop];
	                    }
	                    lc.fromMatches[createdFact.id] = createdContext = rc.clone(createdFact, null, lc.match.merge(rc.match));
	                }
	                fm[lc.hashCode] = [lc, createdContext];
	                return createdContext;
	            }
	            return DEFAULT_MATCH;
	        },

	        retractRight: function () {
	            throw new Error("Shouldnt have gotten here");
	        },

	        removeFromFromMemory: function (context) {
	            var factId = context.fact.id;
	            var fm = this.fromMemory[factId];
	            if (fm) {
	                var entry;
	                for (var i in fm) {
	                    entry = fm[i];
	                    if (entry[1] === context) {
	                        delete fm[i];
	                        if (isEmpty(fm)) {
	                            delete this.fromMemory[factId];
	                        }
	                        break;
	                    }
	                }
	            }

	        },

	        retractLeft: function (context) {
	            var ctx = this.removeFromLeftMemory(context);
	            if (ctx) {
	                ctx = ctx.data;
	                var fromMatches = ctx.fromMatches;
	                for (var i in fromMatches) {
	                    this.removeFromFromMemory(fromMatches[i]);
	                    this.__propagate("retract", fromMatches[i].clone());
	                }
	            }
	        },

	        modifyLeft: function (context) {
	            var ctx = this.removeFromLeftMemory(context), newContext, i, l, factId, fact;
	            if (ctx) {
	                this.__addToLeftMemory(context);

	                var leftContext = ctx.data,
	                    fromMatches = (context.fromMatches = {}),
	                    rightMatches = leftContext.fromMatches,
	                    o = this.from(context.factHash);

	                if (isArray(o)) {
	                    for (i = 0, l = o.length; i < l; i++) {
	                        newContext = this.__checkMatch(context, o[i], false);
	                        if (newContext.isMatch()) {
	                            factId = newContext.fact.id;
	                            if (factId in rightMatches) {
	                                this.__propagate("modify", newContext.clone());
	                            } else {
	                                this.__propagate("assert", newContext.clone());
	                            }
	                        }
	                    }
	                } else if (isDefined(o)) {
	                    newContext = this.__checkMatch(context, o, false);
	                    if (newContext.isMatch()) {
	                        factId = newContext.fact.id;
	                        if (factId in rightMatches) {
	                            this.__propagate("modify", newContext.clone());
	                        } else {
	                            this.__propagate("assert", newContext.clone());
	                        }
	                    }
	                }
	                for (i in rightMatches) {
	                    if (!(i in fromMatches)) {
	                        this.removeFromFromMemory(rightMatches[i]);
	                        this.__propagate("retract", rightMatches[i].clone());
	                    }
	                }
	            } else {
	                this.assertLeft(context);
	            }
	            fact = context.fact;
	            factId = fact.id;
	            var fm = this.fromMemory[factId];
	            this.fromMemory[factId] = {};
	            if (fm) {
	                var lc, entry, cc, createdIsMatch, factObject = fact.object;
	                for (i in fm) {
	                    entry = fm[i];
	                    lc = entry[0];
	                    cc = entry[1];
	                    createdIsMatch = cc.isMatch();
	                    if (lc.hashCode !== context.hashCode) {
	                        newContext = this.__createMatch(lc, factObject, false);
	                        if (createdIsMatch) {
	                            this.__propagate("retract", cc.clone());
	                        }
	                        if (newContext.isMatch()) {
	                            this.__propagate(createdIsMatch ? "modify" : "assert", newContext.clone());
	                        }

	                    }
	                }
	            }
	        },

	        assertLeft: function (context) {
	            this.__addToLeftMemory(context);
	            context.fromMatches = {};
	            this.__createMatches(context);
	        },

	        assertRight: function () {
	            throw new Error("Shouldnt have gotten here");
	        }

	    }
	}).as(module);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(28)(module)))

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var JoinNode = __webpack_require__(52),
	    extd = __webpack_require__(5),
	    constraint = __webpack_require__(38),
	    EqualityConstraint = constraint.EqualityConstraint,
	    HashConstraint = constraint.HashConstraint,
	    ReferenceConstraint = constraint.ReferenceConstraint,
	    Context = __webpack_require__(50),
	    isDefined = extd.isDefined,
	    forEach = extd.forEach,
	    isArray = extd.isArray;

	JoinNode.extend({
	    instance: {

	        nodeType: "FromNotNode",

	        constructor: function (pattern, workingMemory) {
	            this._super(arguments);
	            this.workingMemory = workingMemory;
	            this.pattern = pattern;
	            this.type = pattern.get("constraints")[0].assert;
	            this.alias = pattern.get("alias");
	            this.from = pattern.from.assert;
	            this.fromMemory = {};
	            var eqConstraints = this.__equalityConstraints = [];
	            var vars = [];
	            forEach(this.constraints = this.pattern.get("constraints").slice(1), function (c) {
	                if (c instanceof EqualityConstraint || c instanceof ReferenceConstraint) {
	                    eqConstraints.push(c.assert);
	                } else if (c instanceof HashConstraint) {
	                    vars = vars.concat(c.get("variables"));
	                }
	            });
	            this.__variables = vars;

	        },

	        retractLeft: function (context) {
	            var ctx = this.removeFromLeftMemory(context);
	            if (ctx) {
	                ctx = ctx.data;
	                if (!ctx.blocked) {
	                    this.__propagate("retract", ctx.clone());
	                }
	            }
	        },

	        __modify: function (context, leftContext) {
	            var leftContextBlocked = leftContext.blocked;
	            var fh = context.factHash, o = this.from(fh);
	            if (isArray(o)) {
	                for (var i = 0, l = o.length; i < l; i++) {
	                    if (this.__isMatch(context, o[i], true)) {
	                        context.blocked = true;
	                        break;
	                    }
	                }
	            } else if (isDefined(o)) {
	                context.blocked = this.__isMatch(context, o, true);
	            }
	            var newContextBlocked = context.blocked;
	            if (!newContextBlocked) {
	                if (leftContextBlocked) {
	                    this.__propagate("assert", context.clone());
	                } else {
	                    this.__propagate("modify", context.clone());
	                }
	            } else if (!leftContextBlocked) {
	                this.__propagate("retract", leftContext.clone());
	            }

	        },

	        modifyLeft: function (context) {
	            var ctx = this.removeFromLeftMemory(context);
	            if (ctx) {
	                this.__addToLeftMemory(context);
	                this.__modify(context, ctx.data);
	            } else {
	                throw new Error();
	            }
	            var fm = this.fromMemory[context.fact.id];
	            this.fromMemory[context.fact.id] = {};
	            if (fm) {
	                for (var i in fm) {
	                    // update any contexts associated with this fact
	                    if (i !== context.hashCode) {
	                        var lc = fm[i];
	                        ctx = this.removeFromLeftMemory(lc);
	                        if (ctx) {
	                            lc = lc.clone();
	                            lc.blocked = false;
	                            this.__addToLeftMemory(lc);
	                            this.__modify(lc, ctx.data);
	                        }
	                    }
	                }
	            }
	        },

	        __findMatches: function (context) {
	            var fh = context.factHash, o = this.from(fh), isMatch = false;
	            if (isArray(o)) {
	                for (var i = 0, l = o.length; i < l; i++) {
	                    if (this.__isMatch(context, o[i], true)) {
	                        context.blocked = true;
	                        return;
	                    }
	                }
	                this.__propagate("assert", context.clone());
	            } else if (isDefined(o) && !(context.blocked = this.__isMatch(context, o, true))) {
	                this.__propagate("assert", context.clone());
	            }
	            return isMatch;
	        },

	        __isMatch: function (oc, o, add) {
	            var ret = false;
	            if (this.type(o)) {
	                var createdFact = this.workingMemory.getFactHandle(o);
	                var context = new Context(createdFact, null)
	                    .mergeMatch(oc.match)
	                    .set(this.alias, o);
	                if (add) {
	                    var fm = this.fromMemory[createdFact.id];
	                    if (!fm) {
	                        fm = this.fromMemory[createdFact.id] = {};
	                    }
	                    fm[oc.hashCode] = oc;
	                }
	                var fh = context.factHash;
	                var eqConstraints = this.__equalityConstraints;
	                for (var i = 0, l = eqConstraints.length; i < l; i++) {
	                    if (eqConstraints[i](fh, fh)) {
	                        ret = true;
	                    } else {
	                        ret = false;
	                        break;
	                    }
	                }
	            }
	            return ret;
	        },

	        assertLeft: function (context) {
	            this.__addToLeftMemory(context);
	            this.__findMatches(context);
	        },

	        assertRight: function () {
	            throw new Error("Shouldnt have gotten here");
	        },

	        retractRight: function () {
	            throw new Error("Shouldnt have gotten here");
	        }

	    }
	}).as(module);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(28)(module)))

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var NotNode = __webpack_require__(61),
	    LinkedList = __webpack_require__(27);


	NotNode.extend({
	    instance: {

	        nodeType: "ExistsNode",

	        blockedContext: function (leftContext, rightContext) {
	            leftContext.blocker = rightContext;
	            this.removeFromLeftMemory(leftContext);
	            this.addToLeftBlockedMemory(rightContext.blocking.push(leftContext));
	            this.__propagate("assert", this.__cloneContext(leftContext));
	        },

	        notBlockedContext: function (leftContext, propagate) {
	            this.__addToLeftMemory(leftContext);
	            propagate && this.__propagate("retract", this.__cloneContext(leftContext));
	        },

	        propagateFromLeft: function (leftContext) {
	            this.notBlockedContext(leftContext, false);
	        },


	        retractLeft: function (context) {
	            var ctx;
	            if (!this.removeFromLeftMemory(context)) {
	                if ((ctx = this.removeFromLeftBlockedMemory(context))) {
	                    this.__propagate("retract", this.__cloneContext(ctx.data));
	                } else {
	                    throw new Error();
	                }
	            }
	        },
	       
	        modifyLeft: function (context) {
	            var ctx = this.removeFromLeftMemory(context),
	                leftContext,
	                thisConstraint = this.constraint,
	                rightTuples = this.rightTuples,
	                l = rightTuples.length,
	                isBlocked = false,
	                node, rc, blocker;
	            if (!ctx) {
	                //blocked before
	                ctx = this.removeFromLeftBlockedMemory(context);
	                isBlocked = true;
	            }
	            if (ctx) {
	                leftContext = ctx.data;

	                if (leftContext && leftContext.blocker) {
	                    //we were blocked before so only check nodes previous to our blocker
	                    blocker = this.rightMemory[leftContext.blocker.hashCode];
	                }
	                if (blocker) {
	                    if (thisConstraint.isMatch(context, rc = blocker.data)) {
	                        //propogate as a modify or assert
	                        this.__propagate(!isBlocked ? "assert" : "modify", this.__cloneContext(leftContext));
	                        context.blocker = rc;
	                        this.addToLeftBlockedMemory(rc.blocking.push(context));
	                        context = null;
	                    }
	                    if (context) {
	                        node = {next: blocker.next};
	                    }
	                } else {
	                    node = {next: rightTuples.head};
	                }
	                if (context && l) {
	                    node = {next: rightTuples.head};
	                    //we were propagated before
	                    while ((node = node.next)) {
	                        if (thisConstraint.isMatch(context, rc = node.data)) {
	                            //we cant be proagated so retract previous

	                            //we were asserted before so retract
	                            this.__propagate(!isBlocked ? "assert" : "modify", this.__cloneContext(leftContext));

	                            this.addToLeftBlockedMemory(rc.blocking.push(context));
	                            context.blocker = rc;
	                            context = null;
	                            break;
	                        }
	                    }
	                }
	                if (context) {
	                    //we can still be propogated
	                    this.__addToLeftMemory(context);
	                    if (isBlocked) {
	                        //we were blocked so retract
	                        this.__propagate("retract", this.__cloneContext(context));
	                    }

	                }
	            } else {
	                throw new Error();
	            }

	        },

	        modifyRight: function (context) {
	            var ctx = this.removeFromRightMemory(context);
	            if (ctx) {
	                var rightContext = ctx.data,
	                    leftTuples = this.leftTuples,
	                    leftTuplesLength = leftTuples.length,
	                    leftContext,
	                    thisConstraint = this.constraint,
	                    node,
	                    blocking = rightContext.blocking;
	                this.__addToRightMemory(context);
	                context.blocking = new LinkedList();
	                if (leftTuplesLength || blocking.length) {
	                    if (blocking.length) {
	                        var rc;
	                        //check old blocked contexts
	                        //check if the same contexts blocked before are still blocked
	                        var blockingNode = {next: blocking.head};
	                        while ((blockingNode = blockingNode.next)) {
	                            leftContext = blockingNode.data;
	                            leftContext.blocker = null;
	                            if (thisConstraint.isMatch(leftContext, context)) {
	                                leftContext.blocker = context;
	                                this.addToLeftBlockedMemory(context.blocking.push(leftContext));
	                                this.__propagate("assert", this.__cloneContext(leftContext));
	                                leftContext = null;
	                            } else {
	                                //we arent blocked anymore
	                                leftContext.blocker = null;
	                                node = ctx;
	                                while ((node = node.next)) {
	                                    if (thisConstraint.isMatch(leftContext, rc = node.data)) {
	                                        leftContext.blocker = rc;
	                                        this.addToLeftBlockedMemory(rc.blocking.push(leftContext));
	                                        this.__propagate("assert", this.__cloneContext(leftContext));
	                                        leftContext = null;
	                                        break;
	                                    }
	                                }
	                                if (leftContext) {
	                                    this.__addToLeftMemory(leftContext);
	                                }
	                            }
	                        }
	                    }

	                    if (leftTuplesLength) {
	                        //check currently left tuples in memory
	                        node = {next: leftTuples.head};
	                        while ((node = node.next)) {
	                            leftContext = node.data;
	                            if (thisConstraint.isMatch(leftContext, context)) {
	                                this.__propagate("assert", this.__cloneContext(leftContext));
	                                this.removeFromLeftMemory(leftContext);
	                                this.addToLeftBlockedMemory(context.blocking.push(leftContext));
	                                leftContext.blocker = context;
	                            }
	                        }
	                    }


	                }
	            } else {
	                throw new Error();
	            }


	        }
	    }
	}).as(module);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(28)(module)))

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var FromNotNode = __webpack_require__(63),
	    extd = __webpack_require__(5),
	    Context = __webpack_require__(50),
	    isDefined = extd.isDefined,
	    isArray = extd.isArray;

	FromNotNode.extend({
	    instance: {

	        nodeType: "ExistsFromNode",

	        retractLeft: function (context) {
	            var ctx = this.removeFromLeftMemory(context);
	            if (ctx) {
	                ctx = ctx.data;
	                if (ctx.blocked) {
	                    this.__propagate("retract", ctx.clone());
	                }
	            }
	        },

	        __modify: function (context, leftContext) {
	            var leftContextBlocked = leftContext.blocked;
	            var fh = context.factHash, o = this.from(fh);
	            if (isArray(o)) {
	                for (var i = 0, l = o.length; i < l; i++) {
	                    if (this.__isMatch(context, o[i], true)) {
	                        context.blocked = true;
	                        break;
	                    }
	                }
	            } else if (isDefined(o)) {
	                context.blocked = this.__isMatch(context, o, true);
	            }
	            var newContextBlocked = context.blocked;
	            if (newContextBlocked) {
	                if (leftContextBlocked) {
	                    this.__propagate("modify", context.clone());
	                } else {
	                    this.__propagate("assert", context.clone());
	                }
	            } else if (leftContextBlocked) {
	                this.__propagate("retract", context.clone());
	            }

	        },

	        __findMatches: function (context) {
	            var fh = context.factHash, o = this.from(fh), isMatch = false;
	            if (isArray(o)) {
	                for (var i = 0, l = o.length; i < l; i++) {
	                    if (this.__isMatch(context, o[i], true)) {
	                        context.blocked = true;
	                        this.__propagate("assert", context.clone());
	                        return;
	                    }
	                }
	            } else if (isDefined(o) && (this.__isMatch(context, o, true))) {
	                context.blocked = true;
	                this.__propagate("assert", context.clone());
	            }
	            return isMatch;
	        },

	        __isMatch: function (oc, o, add) {
	            var ret = false;
	            if (this.type(o)) {
	                var createdFact = this.workingMemory.getFactHandle(o);
	                var context = new Context(createdFact, null, null)
	                    .mergeMatch(oc.match)
	                    .set(this.alias, o);
	                if (add) {
	                    var fm = this.fromMemory[createdFact.id];
	                    if (!fm) {
	                        fm = this.fromMemory[createdFact.id] = {};
	                    }
	                    fm[oc.hashCode] = oc;
	                }
	                var fh = context.factHash;
	                var eqConstraints = this.__equalityConstraints;
	                for (var i = 0, l = eqConstraints.length; i < l; i++) {
	                    if (eqConstraints[i](fh)) {
	                        ret = true;
	                    } else {
	                        ret = false;
	                        break;
	                    }
	                }
	            }
	            return ret;
	        },

	        assertLeft: function (context) {
	            this.__addToLeftMemory(context);
	            this.__findMatches(context);
	        }

	    }
	}).as(module);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(28)(module)))

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var Node = __webpack_require__(67);

	Node.extend({
	    instance: {
	        propagateAssert: function (context) {
	            this.__propagate("assertLeft", context);
	        },

	        propagateRetract: function (context) {
	            this.__propagate("retractLeft", context);
	        },

	        propagateResolve: function (context) {
	            this.__propagate("retractResolve", context);
	        },

	        propagateModify: function (context) {
	            this.__propagate("modifyLeft", context);
	        },

	        retractResolve: function (match) {
	            this.__propagate("retractResolve", match);
	        },

	        dispose: function (context) {
	            this.propagateDispose(context);
	        },

	        toString: function () {
	            return "LeftAdapterNode " + this.__count;
	        }
	    }

	}).as(module);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(28)(module)))

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var Node = __webpack_require__(49),
	    intersection = __webpack_require__(5).intersection;

	Node.extend({
	    instance: {

	        __propagatePaths: function (method, context) {
	            var entrySet = this.__entrySet, i = entrySet.length, entry, outNode, paths, continuingPaths;
	            while (--i > -1) {
	                entry = entrySet[i];
	                outNode = entry.key;
	                paths = entry.value;
	                if ((continuingPaths = intersection(paths, context.paths)).length) {
	                    outNode[method](context.clone(null, continuingPaths, null));
	                }
	            }
	        },

	        __propagateNoPaths: function (method, context) {
	            var entrySet = this.__entrySet, i = entrySet.length;
	            while (--i > -1) {
	                entrySet[i].key[method](context);
	            }
	        },

	        __propagate: function (method, context) {
	            if (context.paths) {
	                this.__propagatePaths(method, context);
	            } else {
	                this.__propagateNoPaths(method, context);
	            }
	        }
	    }
	}).as(module);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(28)(module)))

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var Node = __webpack_require__(67);

	Node.extend({
	    instance: {

	        retractResolve: function (match) {
	            this.__propagate("retractResolve", match);
	        },

	        dispose: function (context) {
	            this.propagateDispose(context);
	        },

	        propagateAssert: function (context) {
	            this.__propagate("assertRight", context);
	        },

	        propagateRetract: function (context) {
	            this.__propagate("retractRight", context);
	        },

	        propagateResolve: function (context) {
	            this.__propagate("retractResolve", context);
	        },

	        propagateModify: function (context) {
	            this.__propagate("modifyRight", context);
	        },

	        toString: function () {
	            return "RightAdapterNode " + this.__count;
	        }
	    }
	}).as(module);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(28)(module)))

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var AlphaNode = __webpack_require__(48),
	    Context = __webpack_require__(50);

	AlphaNode.extend({
	    instance: {

	        assert: function (fact) {
	            if (this.constraintAssert(fact.object)) {
	                this.__propagate("assert", fact);
	            }
	        },

	        modify: function (fact) {
	            if (this.constraintAssert(fact.object)) {
	                this.__propagate("modify", fact);
	            }
	        },

	        retract: function (fact) {
	            if (this.constraintAssert(fact.object)) {
	                this.__propagate("retract", fact);
	            }
	        },

	        toString: function () {
	            return "TypeNode" + this.__count;
	        },

	        dispose: function () {
	            var es = this.__entrySet, i = es.length - 1;
	            for (; i >= 0; i--) {
	                var e = es[i], outNode = e.key, paths = e.value;
	                outNode.dispose({paths: paths});
	            }
	        },

	        __propagate: function (method, fact) {
	            var es = this.__entrySet, i = -1, l = es.length;
	            while (++i < l) {
	                var e = es[i], outNode = e.key, paths = e.value;
	                outNode[method](new Context(fact, paths));
	            }
	        }
	    }
	}).as(module);


	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(28)(module)))

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var Node = __webpack_require__(49),
	    extd = __webpack_require__(5),
	    bind = extd.bind;

	Node.extend({
	    instance: {
	        constructor: function (bucket, index, rule, agenda) {
	            this._super([]);
	            this.resolve = bind(this, this.resolve);
	            this.rule = rule;
	            this.index = index;
	            this.name = this.rule.name;
	            this.agenda = agenda;
	            this.bucket = bucket;
	            agenda.register(this);
	        },

	        __assertModify: function (context) {
	            var match = context.match;
	            if (match.isMatch) {
	                var rule = this.rule, bucket = this.bucket;
	                this.agenda.insert(this, {
	                    rule: rule,
	                    hashCode: context.hashCode,
	                    index: this.index,
	                    name: rule.name,
	                    recency: bucket.recency++,
	                    match: match,
	                    counter: bucket.counter
	                });
	            }
	        },

	        assert: function (context) {
	            this.__assertModify(context);
	        },

	        modify: function (context) {
	            this.agenda.retract(this, context);
	            this.__assertModify(context);
	        },

	        retract: function (context) {
	            this.agenda.retract(this, context);
	        },

	        retractRight: function (context) {
	            this.agenda.retract(this, context);
	        },

	        retractLeft: function (context) {
	            this.agenda.retract(this, context);
	        },

	        assertLeft: function (context) {
	            this.__assertModify(context);
	        },

	        assertRight: function (context) {
	            this.__assertModify(context);
	        },

	        toString: function () {
	            return "TerminalNode " + this.rule.name;
	        }
	    }
	}).as(module);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(28)(module)))

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var AlphaNode = __webpack_require__(48),
	    Context = __webpack_require__(50),
	    extd = __webpack_require__(5);

	AlphaNode.extend({
	    instance: {

	        constructor: function () {
	            this._super(arguments);
	            this.alias = this.constraint.get("alias");
	            this.varLength = (this.variables = extd(this.constraint.get("variables")).toArray().value()).length;
	        },

	        assert: function (context) {
	            var c = new Context(context.fact, context.paths);
	            var variables = this.variables, o = context.fact.object, item;
	            c.set(this.alias, o);
	            for (var i = 0, l = this.varLength; i < l; i++) {
	                item = variables[i];
	                c.set(item[1], o[item[0]]);
	            }

	            this.__propagate("assert", c);

	        },

	        retract: function (context) {
	            this.__propagate("retract", new Context(context.fact, context.paths));
	        },

	        modify: function (context) {
	            var c = new Context(context.fact, context.paths);
	            var variables = this.variables, o = context.fact.object, item;
	            c.set(this.alias, o);
	            for (var i = 0, l = this.varLength; i < l; i++) {
	                item = variables[i];
	                c.set(item[1], o[item[0]]);
	            }
	            this.__propagate("modify", c);
	        },


	        toString: function () {
	            return "PropertyNode" + this.__count;
	        }
	    }
	}).as(module);



	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(28)(module)))

/***/ },
/* 72 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;

	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};

	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;

	  if (!this._events)
	    this._events = {};

	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      }
	      throw TypeError('Uncaught, unspecified "error" event.');
	    }
	  }

	  handler = this._events[type];

	  if (isUndefined(handler))
	    return false;

	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        args = Array.prototype.slice.call(arguments, 1);
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    args = Array.prototype.slice.call(arguments, 1);
	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }

	  return true;
	};

	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events)
	    this._events = {};

	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);

	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];

	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }

	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }

	  return this;
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  var fired = false;

	  function g() {
	    this.removeListener(type, g);

	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }

	  g.listener = listener;
	  this.on(type, g);

	  return this;
	};

	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events || !this._events[type])
	    return this;

	  list = this._events[type];
	  length = list.length;
	  position = -1;

	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);

	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }

	    if (position < 0)
	      return this;

	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }

	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }

	  return this;
	};

	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;

	  if (!this._events)
	    return this;

	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }

	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }

	  listeners = this._events[type];

	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else if (listeners) {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];

	  return this;
	};

	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};

	EventEmitter.prototype.listenerCount = function(type) {
	  if (this._events) {
	    var evlistener = this._events[type];

	    if (isFunction(evlistener))
	      return 1;
	    else if (evlistener)
	      return evlistener.length;
	  }
	  return 0;
	};

	EventEmitter.listenerCount = function(emitter, type) {
	  return emitter.listenerCount(type);
	};

	function isFunction(arg) {
	  return typeof arg === 'function';
	}

	function isNumber(arg) {
	  return typeof arg === 'number';
	}

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}

	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var declare = __webpack_require__(10),
	    LinkedList = __webpack_require__(27),
	    InitialFact = __webpack_require__(40).InitialFact,
	    id = 0;

	var Fact = declare({

	    instance: {
	        constructor: function (obj) {
	            this.object = obj;
	            this.recency = 0;
	            this.id = id++;
	        },

	        equals: function (fact) {
	            return fact === this.object;
	        },

	        hashCode: function () {
	            return this.id;
	        }
	    }

	});

	declare({

	    instance: {

	        constructor: function () {
	            this.recency = 0;
	            this.facts = new LinkedList();
	        },

	        dispose: function () {
	            this.facts.clear();
	        },

	        getFacts: function () {
	            var head = {next: this.facts.head}, ret = [], i = 0, val;
	            while ((head = head.next)) {
	                if (!((val = head.data.object)  instanceof InitialFact)) {
	                    ret[i++] = val;
	                }
	            }
	            return ret;
	        },

	        getFactsByType: function (Type) {
	            var head = {next: this.facts.head}, ret = [], i = 0;
	            while ((head = head.next)) {
	                var val = head.data.object;
	                if (!(val  instanceof InitialFact) && (val instanceof Type || val.constructor === Type)) {
	                    ret[i++] = val;
	                }
	            }
	            return ret;
	        },

	        getFactHandle: function (o) {
	            var head = {next: this.facts.head}, ret;
	            while ((head = head.next)) {
	                var existingFact = head.data;
	                if (existingFact.equals(o)) {
	                    return existingFact;
	                }
	            }
	            if (!ret) {
	                ret = new Fact(o);
	                ret.recency = this.recency++;
	                //this.facts.push(ret);
	            }
	            return ret;
	        },

	        modifyFact: function (fact) {
	            var head = {next: this.facts.head};
	            while ((head = head.next)) {
	                var existingFact = head.data;
	                if (existingFact.equals(fact)) {
	                    existingFact.recency = this.recency++;
	                    return existingFact;
	                }
	            }
	            //if we made it here we did not find the fact
	            throw new Error("the fact to modify does not exist");
	        },

	        assertFact: function (fact) {
	            var ret = new Fact(fact);
	            ret.recency = this.recency++;
	            this.facts.push(ret);
	            return ret;
	        },

	        retractFact: function (fact) {
	            var facts = this.facts, head = {next: facts.head};
	            while ((head = head.next)) {
	                var existingFact = head.data;
	                if (existingFact.equals(fact)) {
	                    facts.remove(head);
	                    return existingFact;
	                }
	            }
	            //if we made it here we did not find the fact
	            throw new Error("the fact to remove does not exist");


	        }
	    }

	}).as(exports, "WorkingMemory");



/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var extd = __webpack_require__(5),
	    Promise = extd.Promise,
	    nextTick = __webpack_require__(75),
	    isPromiseLike = extd.isPromiseLike;

	Promise.extend({
	    instance: {

	        looping: false,

	        constructor: function (flow, matchUntilHalt) {
	            this._super([]);
	            this.flow = flow;
	            this.agenda = flow.agenda;
	            this.rootNode = flow.rootNode;
	            this.matchUntilHalt = !!(matchUntilHalt);
	            extd.bindAll(this, ["onAlter", "callNext"]);
	        },

	        halt: function () {
	            this.__halted = true;
	            if (!this.looping) {
	                this.callback();
	            }
	        },

	        onAlter: function () {
	            this.flowAltered = true;
	            if (!this.looping && this.matchUntilHalt && !this.__halted) {
	                this.callNext();
	            }
	        },

	        setup: function () {
	            var flow = this.flow;
	            this.rootNode.resetCounter();
	            flow.on("assert", this.onAlter);
	            flow.on("modify", this.onAlter);
	            flow.on("retract", this.onAlter);
	        },

	        tearDown: function () {
	            var flow = this.flow;
	            flow.removeListener("assert", this.onAlter);
	            flow.removeListener("modify", this.onAlter);
	            flow.removeListener("retract", this.onAlter);
	        },

	        __handleAsyncNext: function (next) {
	            var self = this, agenda = self.agenda;
	            return next.then(function () {
	                self.looping = false;
	                if (!agenda.isEmpty()) {
	                    if (self.flowAltered) {
	                        self.rootNode.incrementCounter();
	                        self.flowAltered = false;
	                    }
	                    if (!self.__halted) {
	                        self.callNext();
	                    } else {
	                        self.callback();
	                    }
	                } else if (!self.matchUntilHalt || self.__halted) {
	                    self.callback();
	                }
	                self = null;
	            }, this.errback);
	        },

	        __handleSyncNext: function (next) {
	            this.looping = false;
	            if (!this.agenda.isEmpty()) {
	                if (this.flowAltered) {
	                    this.rootNode.incrementCounter();
	                    this.flowAltered = false;
	                }
	            }
	            if (next && !this.__halted) {
	                nextTick(this.callNext);
	            } else if (!this.matchUntilHalt || this.__halted) {
	                this.callback();
	            }
	            return next;
	        },

	        callback: function () {
	            this.tearDown();
	            this._super(arguments);
	        },


	        callNext: function () {
	            this.looping = true;
	            var next = this.agenda.fireNext();
	            return isPromiseLike(next) ? this.__handleAsyncNext(next) : this.__handleSyncNext(next);
	        },

	        execute: function () {
	            this.setup();
	            this.callNext();
	            return this;
	        }
	    }
	}).as(module);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(28)(module)))

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate, process) {/*global setImmediate, window, MessageChannel*/
	var extd = __webpack_require__(5);
	var nextTick;
	if (typeof setImmediate === "function") {
	    // In IE10, or use https://github.com/NobleJS/setImmediate
	    if (typeof window !== "undefined") {
	        nextTick = extd.bind(window, setImmediate);
	    } else {
	        nextTick = setImmediate;
	    }
	} else if (typeof process !== "undefined") {
	    // node
	    nextTick = process.nextTick;
	} else if (typeof MessageChannel !== "undefined") {
	    // modern browsers
	    // http://www.nonblocking.io/2011/06/windownexttick.html
	    var channel = new MessageChannel();
	    // linked list of tasks (single, with head node)
	    var head = {}, tail = head;
	    channel.port1.onmessage = function () {
	        head = head.next;
	        var task = head.task;
	        delete head.task;
	        task();
	    };
	    nextTick = function (task) {
	        tail = tail.next = {task: task};
	        channel.port2.postMessage(0);
	    };
	} else {
	    // old browsers
	    nextTick = function (task) {
	        setTimeout(task, 0);
	    };
	}

	module.exports = nextTick;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(22).setImmediate, __webpack_require__(23)))

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var extd = __webpack_require__(5),
	    declare = extd.declare,
	    AVLTree = extd.AVLTree,
	    LinkedList = extd.LinkedList,
	    isPromise = extd.isPromiseLike,
	    EventEmitter = __webpack_require__(72).EventEmitter;


	var FactHash = declare({
	    instance: {
	        constructor: function () {
	            this.memory = {};
	            this.memoryValues = new LinkedList();
	        },

	        clear: function () {
	            this.memoryValues.clear();
	            this.memory = {};
	        },


	        remove: function (v) {
	            var hashCode = v.hashCode,
	                memory = this.memory,
	                ret = memory[hashCode];
	            if (ret) {
	                this.memoryValues.remove(ret);
	                delete memory[hashCode];
	            }
	            return ret;
	        },

	        insert: function (insert) {
	            var hashCode = insert.hashCode;
	            if (hashCode in this.memory) {
	                throw new Error("Activation already in agenda " + insert.rule.name + " agenda");
	            }
	            this.memoryValues.push((this.memory[hashCode] = insert));
	        }
	    }
	});


	var DEFAULT_AGENDA_GROUP = "main";
	module.exports = declare(EventEmitter, {

	    instance: {
	        constructor: function (flow, conflictResolution) {
	            this.agendaGroups = {};
	            this.agendaGroupStack = [DEFAULT_AGENDA_GROUP];
	            this.rules = {};
	            this.flow = flow;
	            this.comparator = conflictResolution;
	            this.setFocus(DEFAULT_AGENDA_GROUP).addAgendaGroup(DEFAULT_AGENDA_GROUP);
	        },

	        addAgendaGroup: function (groupName) {
	            if (!extd.has(this.agendaGroups, groupName)) {
	                this.agendaGroups[groupName] = new AVLTree({compare: this.comparator});
	            }
	        },

	        getAgendaGroup: function (groupName) {
	            return this.agendaGroups[groupName || DEFAULT_AGENDA_GROUP];
	        },

	        setFocus: function (agendaGroup) {
	            if (agendaGroup !== this.getFocused()) {
	                this.agendaGroupStack.push(agendaGroup);
	                this.emit("focused", agendaGroup);
	            }
	            return this;
	        },

	        getFocused: function () {
	            var ags = this.agendaGroupStack;
	            return ags[ags.length - 1];
	        },

	        getFocusedAgenda: function () {
	            return this.agendaGroups[this.getFocused()];
	        },

	        register: function (node) {
	            var agendaGroup = node.rule.agendaGroup;
	            this.rules[node.name] = {tree: new AVLTree({compare: this.comparator}), factTable: new FactHash()};
	            if (agendaGroup) {
	                this.addAgendaGroup(agendaGroup);
	            }
	        },

	        isEmpty: function () {
	            var agendaGroupStack = this.agendaGroupStack, changed = false;
	            while (this.getFocusedAgenda().isEmpty() && this.getFocused() !== DEFAULT_AGENDA_GROUP) {
	                agendaGroupStack.pop();
	                changed = true;
	            }
	            if (changed) {
	                this.emit("focused", this.getFocused());
	            }
	            return this.getFocusedAgenda().isEmpty();
	        },

	        fireNext: function () {
	            var agendaGroupStack = this.agendaGroupStack, ret = false;
	            while (this.getFocusedAgenda().isEmpty() && this.getFocused() !== DEFAULT_AGENDA_GROUP) {
	                agendaGroupStack.pop();
	            }
	            if (!this.getFocusedAgenda().isEmpty()) {
	                var activation = this.pop();
	                this.emit("fire", activation.rule.name, activation.match.factHash);
	                var fired = activation.rule.fire(this.flow, activation.match);
	                if (isPromise(fired)) {
	                    ret = fired.then(function () {
	                        //return true if an activation fired
	                        return true;
	                    });
	                } else {
	                    ret = true;
	                }
	            }
	            //return false if activation not fired
	            return ret;
	        },

	        pop: function () {
	            var tree = this.getFocusedAgenda(), root = tree.__root;
	            while (root.right) {
	                root = root.right;
	            }
	            var v = root.data;
	            tree.remove(v);
	            var rule = this.rules[v.name];
	            rule.tree.remove(v);
	            rule.factTable.remove(v);
	            return v;
	        },

	        peek: function () {
	            var tree = this.getFocusedAgenda(), root = tree.__root;
	            while (root.right) {
	                root = root.right;
	            }
	            return root.data;
	        },

	        modify: function (node, context) {
	            this.retract(node, context);
	            this.insert(node, context);
	        },

	        retract: function (node, retract) {
	            var rule = this.rules[node.name];
	            retract.rule = node;
	            var activation = rule.factTable.remove(retract);
	            if (activation) {
	                this.getAgendaGroup(node.rule.agendaGroup).remove(activation);
	                rule.tree.remove(activation);
	            }
	        },

	        insert: function (node, insert) {
	            var rule = this.rules[node.name], nodeRule = node.rule, agendaGroup = nodeRule.agendaGroup;
	            rule.tree.insert(insert);
	            this.getAgendaGroup(agendaGroup).insert(insert);
	            if (agendaGroup) {
	                if (nodeRule.autoFocus) {
	                    this.setFocus(agendaGroup);
	                }
	            }

	            rule.factTable.insert(insert);
	        },

	        dispose: function () {
	            for (var i in this.agendaGroups) {
	                this.agendaGroups[i].clear();
	            }
	            var rules = this.rules;
	            for (i in rules) {
	                if (i in rules) {
	                    rules[i].tree.clear();
	                    rules[i].factTable.clear();

	                }
	            }
	            this.rules = {};
	        }
	    }

	});

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	
	var uuid = __webpack_require__(78);
	var $ = __webpack_require__(80);

	module.exports = function(root, windowFrame, contentTypes, dataSources){
	  var WindowSlot = windowFrame.WindowSlot;
	  var Action = windowFrame.Action;
	  var session = windowFrame.session;
	  var slot_num = 0;
	  function createWindowSlot(){
	    slot_num++;
	    var elementId = uuid.v4();
	    var element = $('<div id="' + elementId + '" class="window-slot"></div>');
	    var ws = new WindowSlot({slot_id:slot_num, content:null, slot_element:element});
	    ws.actions = {};
	    ws.actions.load = function(){
	      return new Promise((res, rej) => {
	        if(this.content !== null){
	          this.content = this.content.load(this, dataSources);
	          $("#" + elementId).append(this.content.render());
	        }
	        res();
	      });
	    }.bind(ws);
	    ws.actions.unload = function(){
	      return new Promise((res, rej) => {
	        this.content.unload();
	        $("#" + elementId).empty();
	        res();
	      });
	    }.bind(ws);
	    ws.actions.rerender = function(){
	      return new Promise((res, rej) => {
	        if(this.content !== null){
	          $("#" + elementId).empty();
	          $("#" + elementId).append(this.content.render());
	        }
	        res();
	      });
	    }.bind(ws);
	    element.appendTo(root);
	    session.assert(ws);
	    session.match();
	  }

	  function loadContent(contentKey, slot_id){
	    var contentFactory = contentTypes[contentKey] || null;
	    session.assert(new Action({slot_id:slot_id, content:contentFactory, sub_type:"load"}))
	    session.match();
	  }

	  createWindowSlot();

	  var editor = {
	    load:function(){
	      return {
	        render: function(){
	          var ele = $("<span></span>");
	          var addSlotButton = $('<input type="button" value="Add Slot"></input>');
	          addSlotButton.click(createWindowSlot);
	          ele.append(addSlotButton);
	          ele.append("Slot Id: ");
	          var fieldId = uuid.v4();
	          var slotIdField = $('<input id="' + fieldId + '" type="text"></input>');
	          ele.append(slotIdField);
	          ele.append("Content: ");
	          var fieldContent = uuid.v4();
	          var contentField = $('<input id="' + fieldContent + '" type="text"></input>');
	          ele.append(contentField);
	          var loadSlot = $('<input type="button" value="Load Slot"></input>');
	          loadSlot.click(function(){
	            var idVal = parseInt($("#" + fieldId).val());
	            var fieldVal = $("#" + fieldContent).val();
	            if(idVal && fieldVal){
	              loadContent(fieldVal, idVal);
	            }
	          });
	          ele.append(loadSlot);
	          return ele;
	        },
	        unload: function(){

	        }
	      }
	    }
	  }

	  contentTypes["window-frame-editor"] = editor;
	  loadContent("window-frame-editor", slot_num);
	}


/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	//     uuid.js
	//
	//     Copyright (c) 2010-2012 Robert Kieffer
	//     MIT License - http://opensource.org/licenses/mit-license.php

	// Unique ID creation requires a high quality random # generator.  We feature
	// detect to determine the best RNG source, normalizing to a function that
	// returns 128-bits of randomness, since that's what's usually required
	var _rng = __webpack_require__(79);

	// Maps for number <-> hex string conversion
	var _byteToHex = [];
	var _hexToByte = {};
	for (var i = 0; i < 256; i++) {
	  _byteToHex[i] = (i + 0x100).toString(16).substr(1);
	  _hexToByte[_byteToHex[i]] = i;
	}

	// **`parse()` - Parse a UUID into it's component bytes**
	function parse(s, buf, offset) {
	  var i = (buf && offset) || 0, ii = 0;

	  buf = buf || [];
	  s.toLowerCase().replace(/[0-9a-f]{2}/g, function(oct) {
	    if (ii < 16) { // Don't overflow!
	      buf[i + ii++] = _hexToByte[oct];
	    }
	  });

	  // Zero out remaining bytes if string was short
	  while (ii < 16) {
	    buf[i + ii++] = 0;
	  }

	  return buf;
	}

	// **`unparse()` - Convert UUID byte array (ala parse()) into a string**
	function unparse(buf, offset) {
	  var i = offset || 0, bth = _byteToHex;
	  return  bth[buf[i++]] + bth[buf[i++]] +
	          bth[buf[i++]] + bth[buf[i++]] + '-' +
	          bth[buf[i++]] + bth[buf[i++]] + '-' +
	          bth[buf[i++]] + bth[buf[i++]] + '-' +
	          bth[buf[i++]] + bth[buf[i++]] + '-' +
	          bth[buf[i++]] + bth[buf[i++]] +
	          bth[buf[i++]] + bth[buf[i++]] +
	          bth[buf[i++]] + bth[buf[i++]];
	}

	// **`v1()` - Generate time-based UUID**
	//
	// Inspired by https://github.com/LiosK/UUID.js
	// and http://docs.python.org/library/uuid.html

	// random #'s we need to init node and clockseq
	var _seedBytes = _rng();

	// Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
	var _nodeId = [
	  _seedBytes[0] | 0x01,
	  _seedBytes[1], _seedBytes[2], _seedBytes[3], _seedBytes[4], _seedBytes[5]
	];

	// Per 4.2.2, randomize (14 bit) clockseq
	var _clockseq = (_seedBytes[6] << 8 | _seedBytes[7]) & 0x3fff;

	// Previous uuid creation time
	var _lastMSecs = 0, _lastNSecs = 0;

	// See https://github.com/broofa/node-uuid for API details
	function v1(options, buf, offset) {
	  var i = buf && offset || 0;
	  var b = buf || [];

	  options = options || {};

	  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

	  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
	  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
	  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
	  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
	  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

	  // Per 4.2.1.2, use count of uuid's generated during the current clock
	  // cycle to simulate higher resolution clock
	  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

	  // Time since last uuid creation (in msecs)
	  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

	  // Per 4.2.1.2, Bump clockseq on clock regression
	  if (dt < 0 && options.clockseq === undefined) {
	    clockseq = clockseq + 1 & 0x3fff;
	  }

	  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
	  // time interval
	  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
	    nsecs = 0;
	  }

	  // Per 4.2.1.2 Throw error if too many uuids are requested
	  if (nsecs >= 10000) {
	    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
	  }

	  _lastMSecs = msecs;
	  _lastNSecs = nsecs;
	  _clockseq = clockseq;

	  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
	  msecs += 12219292800000;

	  // `time_low`
	  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
	  b[i++] = tl >>> 24 & 0xff;
	  b[i++] = tl >>> 16 & 0xff;
	  b[i++] = tl >>> 8 & 0xff;
	  b[i++] = tl & 0xff;

	  // `time_mid`
	  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
	  b[i++] = tmh >>> 8 & 0xff;
	  b[i++] = tmh & 0xff;

	  // `time_high_and_version`
	  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
	  b[i++] = tmh >>> 16 & 0xff;

	  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
	  b[i++] = clockseq >>> 8 | 0x80;

	  // `clock_seq_low`
	  b[i++] = clockseq & 0xff;

	  // `node`
	  var node = options.node || _nodeId;
	  for (var n = 0; n < 6; n++) {
	    b[i + n] = node[n];
	  }

	  return buf ? buf : unparse(b);
	}

	// **`v4()` - Generate random UUID**

	// See https://github.com/broofa/node-uuid for API details
	function v4(options, buf, offset) {
	  // Deprecated - 'format' argument, as supported in v1.2
	  var i = buf && offset || 0;

	  if (typeof(options) == 'string') {
	    buf = options == 'binary' ? new Array(16) : null;
	    options = null;
	  }
	  options = options || {};

	  var rnds = options.random || (options.rng || _rng)();

	  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
	  rnds[6] = (rnds[6] & 0x0f) | 0x40;
	  rnds[8] = (rnds[8] & 0x3f) | 0x80;

	  // Copy bytes to buffer, if provided
	  if (buf) {
	    for (var ii = 0; ii < 16; ii++) {
	      buf[i + ii] = rnds[ii];
	    }
	  }

	  return buf || unparse(rnds);
	}

	// Export public API
	var uuid = v4;
	uuid.v1 = v1;
	uuid.v4 = v4;
	uuid.parse = parse;
	uuid.unparse = unparse;

	module.exports = uuid;


/***/ },
/* 79 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {
	var rng;

	if (global.crypto && crypto.getRandomValues) {
	  // WHATWG crypto-based RNG - http://wiki.whatwg.org/wiki/Crypto
	  // Moderately fast, high quality
	  var _rnds8 = new Uint8Array(16);
	  rng = function whatwgRNG() {
	    crypto.getRandomValues(_rnds8);
	    return _rnds8;
	  };
	}

	if (!rng) {
	  // Math.random()-based (RNG)
	  //
	  // If all else fails, use Math.random().  It's fast, but is of unspecified
	  // quality.
	  var  _rnds = new Array(16);
	  rng = function() {
	    for (var i = 0, r; i < 16; i++) {
	      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
	      _rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
	    }

	    return _rnds;
	  };
	}

	module.exports = rng;


	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * jQuery JavaScript Library v2.1.4
	 * http://jquery.com/
	 *
	 * Includes Sizzle.js
	 * http://sizzlejs.com/
	 *
	 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
	 * Released under the MIT license
	 * http://jquery.org/license
	 *
	 * Date: 2015-04-28T16:01Z
	 */

	(function( global, factory ) {

		if ( typeof module === "object" && typeof module.exports === "object" ) {
			// For CommonJS and CommonJS-like environments where a proper `window`
			// is present, execute the factory and get jQuery.
			// For environments that do not have a `window` with a `document`
			// (such as Node.js), expose a factory as module.exports.
			// This accentuates the need for the creation of a real `window`.
			// e.g. var jQuery = require("jquery")(window);
			// See ticket #14549 for more info.
			module.exports = global.document ?
				factory( global, true ) :
				function( w ) {
					if ( !w.document ) {
						throw new Error( "jQuery requires a window with a document" );
					}
					return factory( w );
				};
		} else {
			factory( global );
		}

	// Pass this if window is not defined yet
	}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

	// Support: Firefox 18+
	// Can't be in strict mode, several libs including ASP.NET trace
	// the stack via arguments.caller.callee and Firefox dies if
	// you try to trace through "use strict" call chains. (#13335)
	//

	var arr = [];

	var slice = arr.slice;

	var concat = arr.concat;

	var push = arr.push;

	var indexOf = arr.indexOf;

	var class2type = {};

	var toString = class2type.toString;

	var hasOwn = class2type.hasOwnProperty;

	var support = {};



	var
		// Use the correct document accordingly with window argument (sandbox)
		document = window.document,

		version = "2.1.4",

		// Define a local copy of jQuery
		jQuery = function( selector, context ) {
			// The jQuery object is actually just the init constructor 'enhanced'
			// Need init if jQuery is called (just allow error to be thrown if not included)
			return new jQuery.fn.init( selector, context );
		},

		// Support: Android<4.1
		// Make sure we trim BOM and NBSP
		rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

		// Matches dashed string for camelizing
		rmsPrefix = /^-ms-/,
		rdashAlpha = /-([\da-z])/gi,

		// Used by jQuery.camelCase as callback to replace()
		fcamelCase = function( all, letter ) {
			return letter.toUpperCase();
		};

	jQuery.fn = jQuery.prototype = {
		// The current version of jQuery being used
		jquery: version,

		constructor: jQuery,

		// Start with an empty selector
		selector: "",

		// The default length of a jQuery object is 0
		length: 0,

		toArray: function() {
			return slice.call( this );
		},

		// Get the Nth element in the matched element set OR
		// Get the whole matched element set as a clean array
		get: function( num ) {
			return num != null ?

				// Return just the one element from the set
				( num < 0 ? this[ num + this.length ] : this[ num ] ) :

				// Return all the elements in a clean array
				slice.call( this );
		},

		// Take an array of elements and push it onto the stack
		// (returning the new matched element set)
		pushStack: function( elems ) {

			// Build a new jQuery matched element set
			var ret = jQuery.merge( this.constructor(), elems );

			// Add the old object onto the stack (as a reference)
			ret.prevObject = this;
			ret.context = this.context;

			// Return the newly-formed element set
			return ret;
		},

		// Execute a callback for every element in the matched set.
		// (You can seed the arguments with an array of args, but this is
		// only used internally.)
		each: function( callback, args ) {
			return jQuery.each( this, callback, args );
		},

		map: function( callback ) {
			return this.pushStack( jQuery.map(this, function( elem, i ) {
				return callback.call( elem, i, elem );
			}));
		},

		slice: function() {
			return this.pushStack( slice.apply( this, arguments ) );
		},

		first: function() {
			return this.eq( 0 );
		},

		last: function() {
			return this.eq( -1 );
		},

		eq: function( i ) {
			var len = this.length,
				j = +i + ( i < 0 ? len : 0 );
			return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
		},

		end: function() {
			return this.prevObject || this.constructor(null);
		},

		// For internal use only.
		// Behaves like an Array's method, not like a jQuery method.
		push: push,
		sort: arr.sort,
		splice: arr.splice
	};

	jQuery.extend = jQuery.fn.extend = function() {
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[0] || {},
			i = 1,
			length = arguments.length,
			deep = false;

		// Handle a deep copy situation
		if ( typeof target === "boolean" ) {
			deep = target;

			// Skip the boolean and the target
			target = arguments[ i ] || {};
			i++;
		}

		// Handle case when target is a string or something (possible in deep copy)
		if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
			target = {};
		}

		// Extend jQuery itself if only one argument is passed
		if ( i === length ) {
			target = this;
			i--;
		}

		for ( ; i < length; i++ ) {
			// Only deal with non-null/undefined values
			if ( (options = arguments[ i ]) != null ) {
				// Extend the base object
				for ( name in options ) {
					src = target[ name ];
					copy = options[ name ];

					// Prevent never-ending loop
					if ( target === copy ) {
						continue;
					}

					// Recurse if we're merging plain objects or arrays
					if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
						if ( copyIsArray ) {
							copyIsArray = false;
							clone = src && jQuery.isArray(src) ? src : [];

						} else {
							clone = src && jQuery.isPlainObject(src) ? src : {};
						}

						// Never move original objects, clone them
						target[ name ] = jQuery.extend( deep, clone, copy );

					// Don't bring in undefined values
					} else if ( copy !== undefined ) {
						target[ name ] = copy;
					}
				}
			}
		}

		// Return the modified object
		return target;
	};

	jQuery.extend({
		// Unique for each copy of jQuery on the page
		expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

		// Assume jQuery is ready without the ready module
		isReady: true,

		error: function( msg ) {
			throw new Error( msg );
		},

		noop: function() {},

		isFunction: function( obj ) {
			return jQuery.type(obj) === "function";
		},

		isArray: Array.isArray,

		isWindow: function( obj ) {
			return obj != null && obj === obj.window;
		},

		isNumeric: function( obj ) {
			// parseFloat NaNs numeric-cast false positives (null|true|false|"")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			// adding 1 corrects loss of precision from parseFloat (#15100)
			return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
		},

		isPlainObject: function( obj ) {
			// Not plain objects:
			// - Any object or value whose internal [[Class]] property is not "[object Object]"
			// - DOM nodes
			// - window
			if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
				return false;
			}

			if ( obj.constructor &&
					!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}

			// If the function hasn't returned already, we're confident that
			// |obj| is a plain object, created by {} or constructed with new Object
			return true;
		},

		isEmptyObject: function( obj ) {
			var name;
			for ( name in obj ) {
				return false;
			}
			return true;
		},

		type: function( obj ) {
			if ( obj == null ) {
				return obj + "";
			}
			// Support: Android<4.0, iOS<6 (functionish RegExp)
			return typeof obj === "object" || typeof obj === "function" ?
				class2type[ toString.call(obj) ] || "object" :
				typeof obj;
		},

		// Evaluates a script in a global context
		globalEval: function( code ) {
			var script,
				indirect = eval;

			code = jQuery.trim( code );

			if ( code ) {
				// If the code includes a valid, prologue position
				// strict mode pragma, execute code by injecting a
				// script tag into the document.
				if ( code.indexOf("use strict") === 1 ) {
					script = document.createElement("script");
					script.text = code;
					document.head.appendChild( script ).parentNode.removeChild( script );
				} else {
				// Otherwise, avoid the DOM node creation, insertion
				// and removal by using an indirect global eval
					indirect( code );
				}
			}
		},

		// Convert dashed to camelCase; used by the css and data modules
		// Support: IE9-11+
		// Microsoft forgot to hump their vendor prefix (#9572)
		camelCase: function( string ) {
			return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
		},

		nodeName: function( elem, name ) {
			return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
		},

		// args is for internal usage only
		each: function( obj, callback, args ) {
			var value,
				i = 0,
				length = obj.length,
				isArray = isArraylike( obj );

			if ( args ) {
				if ( isArray ) {
					for ( ; i < length; i++ ) {
						value = callback.apply( obj[ i ], args );

						if ( value === false ) {
							break;
						}
					}
				} else {
					for ( i in obj ) {
						value = callback.apply( obj[ i ], args );

						if ( value === false ) {
							break;
						}
					}
				}

			// A special, fast, case for the most common use of each
			} else {
				if ( isArray ) {
					for ( ; i < length; i++ ) {
						value = callback.call( obj[ i ], i, obj[ i ] );

						if ( value === false ) {
							break;
						}
					}
				} else {
					for ( i in obj ) {
						value = callback.call( obj[ i ], i, obj[ i ] );

						if ( value === false ) {
							break;
						}
					}
				}
			}

			return obj;
		},

		// Support: Android<4.1
		trim: function( text ) {
			return text == null ?
				"" :
				( text + "" ).replace( rtrim, "" );
		},

		// results is for internal usage only
		makeArray: function( arr, results ) {
			var ret = results || [];

			if ( arr != null ) {
				if ( isArraylike( Object(arr) ) ) {
					jQuery.merge( ret,
						typeof arr === "string" ?
						[ arr ] : arr
					);
				} else {
					push.call( ret, arr );
				}
			}

			return ret;
		},

		inArray: function( elem, arr, i ) {
			return arr == null ? -1 : indexOf.call( arr, elem, i );
		},

		merge: function( first, second ) {
			var len = +second.length,
				j = 0,
				i = first.length;

			for ( ; j < len; j++ ) {
				first[ i++ ] = second[ j ];
			}

			first.length = i;

			return first;
		},

		grep: function( elems, callback, invert ) {
			var callbackInverse,
				matches = [],
				i = 0,
				length = elems.length,
				callbackExpect = !invert;

			// Go through the array, only saving the items
			// that pass the validator function
			for ( ; i < length; i++ ) {
				callbackInverse = !callback( elems[ i ], i );
				if ( callbackInverse !== callbackExpect ) {
					matches.push( elems[ i ] );
				}
			}

			return matches;
		},

		// arg is for internal usage only
		map: function( elems, callback, arg ) {
			var value,
				i = 0,
				length = elems.length,
				isArray = isArraylike( elems ),
				ret = [];

			// Go through the array, translating each of the items to their new values
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback( elems[ i ], i, arg );

					if ( value != null ) {
						ret.push( value );
					}
				}

			// Go through every key on the object,
			} else {
				for ( i in elems ) {
					value = callback( elems[ i ], i, arg );

					if ( value != null ) {
						ret.push( value );
					}
				}
			}

			// Flatten any nested arrays
			return concat.apply( [], ret );
		},

		// A global GUID counter for objects
		guid: 1,

		// Bind a function to a context, optionally partially applying any
		// arguments.
		proxy: function( fn, context ) {
			var tmp, args, proxy;

			if ( typeof context === "string" ) {
				tmp = fn[ context ];
				context = fn;
				fn = tmp;
			}

			// Quick check to determine if target is callable, in the spec
			// this throws a TypeError, but we will just return undefined.
			if ( !jQuery.isFunction( fn ) ) {
				return undefined;
			}

			// Simulated bind
			args = slice.call( arguments, 2 );
			proxy = function() {
				return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
			};

			// Set the guid of unique handler to the same of original handler, so it can be removed
			proxy.guid = fn.guid = fn.guid || jQuery.guid++;

			return proxy;
		},

		now: Date.now,

		// jQuery.support is not used in Core but other projects attach their
		// properties to it so it needs to exist.
		support: support
	});

	// Populate the class2type map
	jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
		class2type[ "[object " + name + "]" ] = name.toLowerCase();
	});

	function isArraylike( obj ) {

		// Support: iOS 8.2 (not reproducible in simulator)
		// `in` check used to prevent JIT error (gh-2145)
		// hasOwn isn't used here due to false negatives
		// regarding Nodelist length in IE
		var length = "length" in obj && obj.length,
			type = jQuery.type( obj );

		if ( type === "function" || jQuery.isWindow( obj ) ) {
			return false;
		}

		if ( obj.nodeType === 1 && length ) {
			return true;
		}

		return type === "array" || length === 0 ||
			typeof length === "number" && length > 0 && ( length - 1 ) in obj;
	}
	var Sizzle =
	/*!
	 * Sizzle CSS Selector Engine v2.2.0-pre
	 * http://sizzlejs.com/
	 *
	 * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
	 * Released under the MIT license
	 * http://jquery.org/license
	 *
	 * Date: 2014-12-16
	 */
	(function( window ) {

	var i,
		support,
		Expr,
		getText,
		isXML,
		tokenize,
		compile,
		select,
		outermostContext,
		sortInput,
		hasDuplicate,

		// Local document vars
		setDocument,
		document,
		docElem,
		documentIsHTML,
		rbuggyQSA,
		rbuggyMatches,
		matches,
		contains,

		// Instance-specific data
		expando = "sizzle" + 1 * new Date(),
		preferredDoc = window.document,
		dirruns = 0,
		done = 0,
		classCache = createCache(),
		tokenCache = createCache(),
		compilerCache = createCache(),
		sortOrder = function( a, b ) {
			if ( a === b ) {
				hasDuplicate = true;
			}
			return 0;
		},

		// General-purpose constants
		MAX_NEGATIVE = 1 << 31,

		// Instance methods
		hasOwn = ({}).hasOwnProperty,
		arr = [],
		pop = arr.pop,
		push_native = arr.push,
		push = arr.push,
		slice = arr.slice,
		// Use a stripped-down indexOf as it's faster than native
		// http://jsperf.com/thor-indexof-vs-for/5
		indexOf = function( list, elem ) {
			var i = 0,
				len = list.length;
			for ( ; i < len; i++ ) {
				if ( list[i] === elem ) {
					return i;
				}
			}
			return -1;
		},

		booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

		// Regular expressions

		// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
		whitespace = "[\\x20\\t\\r\\n\\f]",
		// http://www.w3.org/TR/css3-syntax/#characters
		characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

		// Loosely modeled on CSS identifier characters
		// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
		// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
		identifier = characterEncoding.replace( "w", "w#" ),

		// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
		attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
			// Operator (capture 2)
			"*([*^$|!~]?=)" + whitespace +
			// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
			"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
			"*\\]",

		pseudos = ":(" + characterEncoding + ")(?:\\((" +
			// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
			// 1. quoted (capture 3; capture 4 or capture 5)
			"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
			// 2. simple (capture 6)
			"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
			// 3. anything else (capture 2)
			".*" +
			")\\)|)",

		// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
		rwhitespace = new RegExp( whitespace + "+", "g" ),
		rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

		rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
		rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

		rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

		rpseudo = new RegExp( pseudos ),
		ridentifier = new RegExp( "^" + identifier + "$" ),

		matchExpr = {
			"ID": new RegExp( "^#(" + characterEncoding + ")" ),
			"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
			"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
			"ATTR": new RegExp( "^" + attributes ),
			"PSEUDO": new RegExp( "^" + pseudos ),
			"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
				"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
				"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
			"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
			// For use in libraries implementing .is()
			// We use this for POS matching in `select`
			"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
				whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
		},

		rinputs = /^(?:input|select|textarea|button)$/i,
		rheader = /^h\d$/i,

		rnative = /^[^{]+\{\s*\[native \w/,

		// Easily-parseable/retrievable ID or TAG or CLASS selectors
		rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

		rsibling = /[+~]/,
		rescape = /'|\\/g,

		// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
		runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
		funescape = function( _, escaped, escapedWhitespace ) {
			var high = "0x" + escaped - 0x10000;
			// NaN means non-codepoint
			// Support: Firefox<24
			// Workaround erroneous numeric interpretation of +"0x"
			return high !== high || escapedWhitespace ?
				escaped :
				high < 0 ?
					// BMP codepoint
					String.fromCharCode( high + 0x10000 ) :
					// Supplemental Plane codepoint (surrogate pair)
					String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
		},

		// Used for iframes
		// See setDocument()
		// Removing the function wrapper causes a "Permission Denied"
		// error in IE
		unloadHandler = function() {
			setDocument();
		};

	// Optimize for push.apply( _, NodeList )
	try {
		push.apply(
			(arr = slice.call( preferredDoc.childNodes )),
			preferredDoc.childNodes
		);
		// Support: Android<4.0
		// Detect silently failing push.apply
		arr[ preferredDoc.childNodes.length ].nodeType;
	} catch ( e ) {
		push = { apply: arr.length ?

			// Leverage slice if possible
			function( target, els ) {
				push_native.apply( target, slice.call(els) );
			} :

			// Support: IE<9
			// Otherwise append directly
			function( target, els ) {
				var j = target.length,
					i = 0;
				// Can't trust NodeList.length
				while ( (target[j++] = els[i++]) ) {}
				target.length = j - 1;
			}
		};
	}

	function Sizzle( selector, context, results, seed ) {
		var match, elem, m, nodeType,
			// QSA vars
			i, groups, old, nid, newContext, newSelector;

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}

		context = context || document;
		results = results || [];
		nodeType = context.nodeType;

		if ( typeof selector !== "string" || !selector ||
			nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

			return results;
		}

		if ( !seed && documentIsHTML ) {

			// Try to shortcut find operations when possible (e.g., not under DocumentFragment)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
				// Speed-up: Sizzle("#ID")
				if ( (m = match[1]) ) {
					if ( nodeType === 9 ) {
						elem = context.getElementById( m );
						// Check parentNode to catch when Blackberry 4.6 returns
						// nodes that are no longer in the document (jQuery #6963)
						if ( elem && elem.parentNode ) {
							// Handle the case where IE, Opera, and Webkit return items
							// by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}
					} else {
						// Context is not a document
						if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
							contains( context, elem ) && elem.id === m ) {
							results.push( elem );
							return results;
						}
					}

				// Speed-up: Sizzle("TAG")
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Speed-up: Sizzle(".CLASS")
				} else if ( (m = match[3]) && support.getElementsByClassName ) {
					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// QSA path
			if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
				nid = old = expando;
				newContext = context;
				newSelector = nodeType !== 1 && selector;

				// qSA works strangely on Element-rooted queries
				// We can work around this by specifying an extra ID on the root
				// and working up from there (Thanks to Andrew Dupont for the technique)
				// IE 8 doesn't work on object elements
				if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
					groups = tokenize( selector );

					if ( (old = context.getAttribute("id")) ) {
						nid = old.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", nid );
					}
					nid = "[id='" + nid + "'] ";

					i = groups.length;
					while ( i-- ) {
						groups[i] = nid + toSelector( groups[i] );
					}
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
					newSelector = groups.join(",");
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch(qsaError) {
					} finally {
						if ( !old ) {
							context.removeAttribute("id");
						}
					}
				}
			}
		}

		// All others
		return select( selector.replace( rtrim, "$1" ), context, results, seed );
	}

	/**
	 * Create key-value caches of limited size
	 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
	 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
	 *	deleting the oldest entry
	 */
	function createCache() {
		var keys = [];

		function cache( key, value ) {
			// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
			if ( keys.push( key + " " ) > Expr.cacheLength ) {
				// Only keep the most recent entries
				delete cache[ keys.shift() ];
			}
			return (cache[ key + " " ] = value);
		}
		return cache;
	}

	/**
	 * Mark a function for special use by Sizzle
	 * @param {Function} fn The function to mark
	 */
	function markFunction( fn ) {
		fn[ expando ] = true;
		return fn;
	}

	/**
	 * Support testing using an element
	 * @param {Function} fn Passed the created div and expects a boolean result
	 */
	function assert( fn ) {
		var div = document.createElement("div");

		try {
			return !!fn( div );
		} catch (e) {
			return false;
		} finally {
			// Remove from its parent by default
			if ( div.parentNode ) {
				div.parentNode.removeChild( div );
			}
			// release memory in IE
			div = null;
		}
	}

	/**
	 * Adds the same handler for all of the specified attrs
	 * @param {String} attrs Pipe-separated list of attributes
	 * @param {Function} handler The method that will be applied
	 */
	function addHandle( attrs, handler ) {
		var arr = attrs.split("|"),
			i = attrs.length;

		while ( i-- ) {
			Expr.attrHandle[ arr[i] ] = handler;
		}
	}

	/**
	 * Checks document order of two siblings
	 * @param {Element} a
	 * @param {Element} b
	 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
	 */
	function siblingCheck( a, b ) {
		var cur = b && a,
			diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
				( ~b.sourceIndex || MAX_NEGATIVE ) -
				( ~a.sourceIndex || MAX_NEGATIVE );

		// Use IE sourceIndex if available on both nodes
		if ( diff ) {
			return diff;
		}

		// Check if b follows a
		if ( cur ) {
			while ( (cur = cur.nextSibling) ) {
				if ( cur === b ) {
					return -1;
				}
			}
		}

		return a ? 1 : -1;
	}

	/**
	 * Returns a function to use in pseudos for input types
	 * @param {String} type
	 */
	function createInputPseudo( type ) {
		return function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === type;
		};
	}

	/**
	 * Returns a function to use in pseudos for buttons
	 * @param {String} type
	 */
	function createButtonPseudo( type ) {
		return function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return (name === "input" || name === "button") && elem.type === type;
		};
	}

	/**
	 * Returns a function to use in pseudos for positionals
	 * @param {Function} fn
	 */
	function createPositionalPseudo( fn ) {
		return markFunction(function( argument ) {
			argument = +argument;
			return markFunction(function( seed, matches ) {
				var j,
					matchIndexes = fn( [], seed.length, argument ),
					i = matchIndexes.length;

				// Match elements found at the specified indexes
				while ( i-- ) {
					if ( seed[ (j = matchIndexes[i]) ] ) {
						seed[j] = !(matches[j] = seed[j]);
					}
				}
			});
		});
	}

	/**
	 * Checks a node for validity as a Sizzle context
	 * @param {Element|Object=} context
	 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
	 */
	function testContext( context ) {
		return context && typeof context.getElementsByTagName !== "undefined" && context;
	}

	// Expose support vars for convenience
	support = Sizzle.support = {};

	/**
	 * Detects XML nodes
	 * @param {Element|Object} elem An element or a document
	 * @returns {Boolean} True iff elem is a non-HTML XML node
	 */
	isXML = Sizzle.isXML = function( elem ) {
		// documentElement is verified for cases where it doesn't yet exist
		// (such as loading iframes in IE - #4833)
		var documentElement = elem && (elem.ownerDocument || elem).documentElement;
		return documentElement ? documentElement.nodeName !== "HTML" : false;
	};

	/**
	 * Sets document-related variables once based on the current document
	 * @param {Element|Object} [doc] An element or document object to use to set the document
	 * @returns {Object} Returns the current document
	 */
	setDocument = Sizzle.setDocument = function( node ) {
		var hasCompare, parent,
			doc = node ? node.ownerDocument || node : preferredDoc;

		// If no document and documentElement is available, return
		if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
			return document;
		}

		// Set our document
		document = doc;
		docElem = doc.documentElement;
		parent = doc.defaultView;

		// Support: IE>8
		// If iframe document is assigned to "document" variable and if iframe has been reloaded,
		// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
		// IE6-8 do not support the defaultView property so parent will be undefined
		if ( parent && parent !== parent.top ) {
			// IE11 does not have attachEvent, so all must suffer
			if ( parent.addEventListener ) {
				parent.addEventListener( "unload", unloadHandler, false );
			} else if ( parent.attachEvent ) {
				parent.attachEvent( "onunload", unloadHandler );
			}
		}

		/* Support tests
		---------------------------------------------------------------------- */
		documentIsHTML = !isXML( doc );

		/* Attributes
		---------------------------------------------------------------------- */

		// Support: IE<8
		// Verify that getAttribute really returns attributes and not properties
		// (excepting IE8 booleans)
		support.attributes = assert(function( div ) {
			div.className = "i";
			return !div.getAttribute("className");
		});

		/* getElement(s)By*
		---------------------------------------------------------------------- */

		// Check if getElementsByTagName("*") returns only elements
		support.getElementsByTagName = assert(function( div ) {
			div.appendChild( doc.createComment("") );
			return !div.getElementsByTagName("*").length;
		});

		// Support: IE<9
		support.getElementsByClassName = rnative.test( doc.getElementsByClassName );

		// Support: IE<10
		// Check if getElementById returns elements by name
		// The broken getElementById methods don't pick up programatically-set names,
		// so use a roundabout getElementsByName test
		support.getById = assert(function( div ) {
			docElem.appendChild( div ).id = expando;
			return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
		});

		// ID find and filter
		if ( support.getById ) {
			Expr.find["ID"] = function( id, context ) {
				if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
					var m = context.getElementById( id );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					return m && m.parentNode ? [ m ] : [];
				}
			};
			Expr.filter["ID"] = function( id ) {
				var attrId = id.replace( runescape, funescape );
				return function( elem ) {
					return elem.getAttribute("id") === attrId;
				};
			};
		} else {
			// Support: IE6/7
			// getElementById is not reliable as a find shortcut
			delete Expr.find["ID"];

			Expr.filter["ID"] =  function( id ) {
				var attrId = id.replace( runescape, funescape );
				return function( elem ) {
					var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
					return node && node.value === attrId;
				};
			};
		}

		// Tag
		Expr.find["TAG"] = support.getElementsByTagName ?
			function( tag, context ) {
				if ( typeof context.getElementsByTagName !== "undefined" ) {
					return context.getElementsByTagName( tag );

				// DocumentFragment nodes don't have gEBTN
				} else if ( support.qsa ) {
					return context.querySelectorAll( tag );
				}
			} :

			function( tag, context ) {
				var elem,
					tmp = [],
					i = 0,
					// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
					results = context.getElementsByTagName( tag );

				// Filter out possible comments
				if ( tag === "*" ) {
					while ( (elem = results[i++]) ) {
						if ( elem.nodeType === 1 ) {
							tmp.push( elem );
						}
					}

					return tmp;
				}
				return results;
			};

		// Class
		Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
			if ( documentIsHTML ) {
				return context.getElementsByClassName( className );
			}
		};

		/* QSA/matchesSelector
		---------------------------------------------------------------------- */

		// QSA and matchesSelector support

		// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
		rbuggyMatches = [];

		// qSa(:focus) reports false when true (Chrome 21)
		// We allow this because of a bug in IE8/9 that throws an error
		// whenever `document.activeElement` is accessed on an iframe
		// So, we allow :focus to pass through QSA all the time to avoid the IE error
		// See http://bugs.jquery.com/ticket/13378
		rbuggyQSA = [];

		if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
			// Build QSA regex
			// Regex strategy adopted from Diego Perini
			assert(function( div ) {
				// Select is set to empty string on purpose
				// This is to test IE's treatment of not explicitly
				// setting a boolean content attribute,
				// since its presence should be enough
				// http://bugs.jquery.com/ticket/12359
				docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
					"<select id='" + expando + "-\f]' msallowcapture=''>" +
					"<option selected=''></option></select>";

				// Support: IE8, Opera 11-12.16
				// Nothing should be selected when empty strings follow ^= or $= or *=
				// The test attribute must be unknown in Opera but "safe" for WinRT
				// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
				if ( div.querySelectorAll("[msallowcapture^='']").length ) {
					rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
				}

				// Support: IE8
				// Boolean attributes and "value" are not treated correctly
				if ( !div.querySelectorAll("[selected]").length ) {
					rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
				}

				// Support: Chrome<29, Android<4.2+, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.7+
				if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
					rbuggyQSA.push("~=");
				}

				// Webkit/Opera - :checked should return selected option elements
				// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
				// IE8 throws error here and will not see later tests
				if ( !div.querySelectorAll(":checked").length ) {
					rbuggyQSA.push(":checked");
				}

				// Support: Safari 8+, iOS 8+
				// https://bugs.webkit.org/show_bug.cgi?id=136851
				// In-page `selector#id sibing-combinator selector` fails
				if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
					rbuggyQSA.push(".#.+[+~]");
				}
			});

			assert(function( div ) {
				// Support: Windows 8 Native Apps
				// The type and name attributes are restricted during .innerHTML assignment
				var input = doc.createElement("input");
				input.setAttribute( "type", "hidden" );
				div.appendChild( input ).setAttribute( "name", "D" );

				// Support: IE8
				// Enforce case-sensitivity of name attribute
				if ( div.querySelectorAll("[name=d]").length ) {
					rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
				}

				// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
				// IE8 throws error here and will not see later tests
				if ( !div.querySelectorAll(":enabled").length ) {
					rbuggyQSA.push( ":enabled", ":disabled" );
				}

				// Opera 10-11 does not throw on post-comma invalid pseudos
				div.querySelectorAll("*,:x");
				rbuggyQSA.push(",.*:");
			});
		}

		if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
			docElem.webkitMatchesSelector ||
			docElem.mozMatchesSelector ||
			docElem.oMatchesSelector ||
			docElem.msMatchesSelector) )) ) {

			assert(function( div ) {
				// Check to see if it's possible to do matchesSelector
				// on a disconnected node (IE 9)
				support.disconnectedMatch = matches.call( div, "div" );

				// This should fail with an exception
				// Gecko does not error, returns false instead
				matches.call( div, "[s!='']:x" );
				rbuggyMatches.push( "!=", pseudos );
			});
		}

		rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
		rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

		/* Contains
		---------------------------------------------------------------------- */
		hasCompare = rnative.test( docElem.compareDocumentPosition );

		// Element contains another
		// Purposefully does not implement inclusive descendent
		// As in, an element does not contain itself
		contains = hasCompare || rnative.test( docElem.contains ) ?
			function( a, b ) {
				var adown = a.nodeType === 9 ? a.documentElement : a,
					bup = b && b.parentNode;
				return a === bup || !!( bup && bup.nodeType === 1 && (
					adown.contains ?
						adown.contains( bup ) :
						a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
				));
			} :
			function( a, b ) {
				if ( b ) {
					while ( (b = b.parentNode) ) {
						if ( b === a ) {
							return true;
						}
					}
				}
				return false;
			};

		/* Sorting
		---------------------------------------------------------------------- */

		// Document order sorting
		sortOrder = hasCompare ?
		function( a, b ) {

			// Flag for duplicate removal
			if ( a === b ) {
				hasDuplicate = true;
				return 0;
			}

			// Sort on method existence if only one input has compareDocumentPosition
			var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
			if ( compare ) {
				return compare;
			}

			// Calculate position if both inputs belong to the same document
			compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
				a.compareDocumentPosition( b ) :

				// Otherwise we know they are disconnected
				1;

			// Disconnected nodes
			if ( compare & 1 ||
				(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

				// Choose the first element that is related to our preferred document
				if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
					return -1;
				}
				if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
					return 1;
				}

				// Maintain original order
				return sortInput ?
					( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
					0;
			}

			return compare & 4 ? -1 : 1;
		} :
		function( a, b ) {
			// Exit early if the nodes are identical
			if ( a === b ) {
				hasDuplicate = true;
				return 0;
			}

			var cur,
				i = 0,
				aup = a.parentNode,
				bup = b.parentNode,
				ap = [ a ],
				bp = [ b ];

			// Parentless nodes are either documents or disconnected
			if ( !aup || !bup ) {
				return a === doc ? -1 :
					b === doc ? 1 :
					aup ? -1 :
					bup ? 1 :
					sortInput ?
					( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
					0;

			// If the nodes are siblings, we can do a quick check
			} else if ( aup === bup ) {
				return siblingCheck( a, b );
			}

			// Otherwise we need full lists of their ancestors for comparison
			cur = a;
			while ( (cur = cur.parentNode) ) {
				ap.unshift( cur );
			}
			cur = b;
			while ( (cur = cur.parentNode) ) {
				bp.unshift( cur );
			}

			// Walk down the tree looking for a discrepancy
			while ( ap[i] === bp[i] ) {
				i++;
			}

			return i ?
				// Do a sibling check if the nodes have a common ancestor
				siblingCheck( ap[i], bp[i] ) :

				// Otherwise nodes in our document sort first
				ap[i] === preferredDoc ? -1 :
				bp[i] === preferredDoc ? 1 :
				0;
		};

		return doc;
	};

	Sizzle.matches = function( expr, elements ) {
		return Sizzle( expr, null, null, elements );
	};

	Sizzle.matchesSelector = function( elem, expr ) {
		// Set document vars if needed
		if ( ( elem.ownerDocument || elem ) !== document ) {
			setDocument( elem );
		}

		// Make sure that attribute selectors are quoted
		expr = expr.replace( rattributeQuotes, "='$1']" );

		if ( support.matchesSelector && documentIsHTML &&
			( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
			( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

			try {
				var ret = matches.call( elem, expr );

				// IE 9's matchesSelector returns false on disconnected nodes
				if ( ret || support.disconnectedMatch ||
						// As well, disconnected nodes are said to be in a document
						// fragment in IE 9
						elem.document && elem.document.nodeType !== 11 ) {
					return ret;
				}
			} catch (e) {}
		}

		return Sizzle( expr, document, null, [ elem ] ).length > 0;
	};

	Sizzle.contains = function( context, elem ) {
		// Set document vars if needed
		if ( ( context.ownerDocument || context ) !== document ) {
			setDocument( context );
		}
		return contains( context, elem );
	};

	Sizzle.attr = function( elem, name ) {
		// Set document vars if needed
		if ( ( elem.ownerDocument || elem ) !== document ) {
			setDocument( elem );
		}

		var fn = Expr.attrHandle[ name.toLowerCase() ],
			// Don't get fooled by Object.prototype properties (jQuery #13807)
			val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
				fn( elem, name, !documentIsHTML ) :
				undefined;

		return val !== undefined ?
			val :
			support.attributes || !documentIsHTML ?
				elem.getAttribute( name ) :
				(val = elem.getAttributeNode(name)) && val.specified ?
					val.value :
					null;
	};

	Sizzle.error = function( msg ) {
		throw new Error( "Syntax error, unrecognized expression: " + msg );
	};

	/**
	 * Document sorting and removing duplicates
	 * @param {ArrayLike} results
	 */
	Sizzle.uniqueSort = function( results ) {
		var elem,
			duplicates = [],
			j = 0,
			i = 0;

		// Unless we *know* we can detect duplicates, assume their presence
		hasDuplicate = !support.detectDuplicates;
		sortInput = !support.sortStable && results.slice( 0 );
		results.sort( sortOrder );

		if ( hasDuplicate ) {
			while ( (elem = results[i++]) ) {
				if ( elem === results[ i ] ) {
					j = duplicates.push( i );
				}
			}
			while ( j-- ) {
				results.splice( duplicates[ j ], 1 );
			}
		}

		// Clear input after sorting to release objects
		// See https://github.com/jquery/sizzle/pull/225
		sortInput = null;

		return results;
	};

	/**
	 * Utility function for retrieving the text value of an array of DOM nodes
	 * @param {Array|Element} elem
	 */
	getText = Sizzle.getText = function( elem ) {
		var node,
			ret = "",
			i = 0,
			nodeType = elem.nodeType;

		if ( !nodeType ) {
			// If no nodeType, this is expected to be an array
			while ( (node = elem[i++]) ) {
				// Do not traverse comment nodes
				ret += getText( node );
			}
		} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
			// Use textContent for elements
			// innerText usage removed for consistency of new lines (jQuery #11153)
			if ( typeof elem.textContent === "string" ) {
				return elem.textContent;
			} else {
				// Traverse its children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
					ret += getText( elem );
				}
			}
		} else if ( nodeType === 3 || nodeType === 4 ) {
			return elem.nodeValue;
		}
		// Do not include comment or processing instruction nodes

		return ret;
	};

	Expr = Sizzle.selectors = {

		// Can be adjusted by the user
		cacheLength: 50,

		createPseudo: markFunction,

		match: matchExpr,

		attrHandle: {},

		find: {},

		relative: {
			">": { dir: "parentNode", first: true },
			" ": { dir: "parentNode" },
			"+": { dir: "previousSibling", first: true },
			"~": { dir: "previousSibling" }
		},

		preFilter: {
			"ATTR": function( match ) {
				match[1] = match[1].replace( runescape, funescape );

				// Move the given value to match[3] whether quoted or unquoted
				match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

				if ( match[2] === "~=" ) {
					match[3] = " " + match[3] + " ";
				}

				return match.slice( 0, 4 );
			},

			"CHILD": function( match ) {
				/* matches from matchExpr["CHILD"]
					1 type (only|nth|...)
					2 what (child|of-type)
					3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
					4 xn-component of xn+y argument ([+-]?\d*n|)
					5 sign of xn-component
					6 x of xn-component
					7 sign of y-component
					8 y of y-component
				*/
				match[1] = match[1].toLowerCase();

				if ( match[1].slice( 0, 3 ) === "nth" ) {
					// nth-* requires argument
					if ( !match[3] ) {
						Sizzle.error( match[0] );
					}

					// numeric x and y parameters for Expr.filter.CHILD
					// remember that false/true cast respectively to 0/1
					match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
					match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

				// other types prohibit arguments
				} else if ( match[3] ) {
					Sizzle.error( match[0] );
				}

				return match;
			},

			"PSEUDO": function( match ) {
				var excess,
					unquoted = !match[6] && match[2];

				if ( matchExpr["CHILD"].test( match[0] ) ) {
					return null;
				}

				// Accept quoted arguments as-is
				if ( match[3] ) {
					match[2] = match[4] || match[5] || "";

				// Strip excess characters from unquoted arguments
				} else if ( unquoted && rpseudo.test( unquoted ) &&
					// Get excess from tokenize (recursively)
					(excess = tokenize( unquoted, true )) &&
					// advance to the next closing parenthesis
					(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

					// excess is a negative index
					match[0] = match[0].slice( 0, excess );
					match[2] = unquoted.slice( 0, excess );
				}

				// Return only captures needed by the pseudo filter method (type and argument)
				return match.slice( 0, 3 );
			}
		},

		filter: {

			"TAG": function( nodeNameSelector ) {
				var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
				return nodeNameSelector === "*" ?
					function() { return true; } :
					function( elem ) {
						return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
					};
			},

			"CLASS": function( className ) {
				var pattern = classCache[ className + " " ];

				return pattern ||
					(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
					classCache( className, function( elem ) {
						return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
					});
			},

			"ATTR": function( name, operator, check ) {
				return function( elem ) {
					var result = Sizzle.attr( elem, name );

					if ( result == null ) {
						return operator === "!=";
					}
					if ( !operator ) {
						return true;
					}

					result += "";

					return operator === "=" ? result === check :
						operator === "!=" ? result !== check :
						operator === "^=" ? check && result.indexOf( check ) === 0 :
						operator === "*=" ? check && result.indexOf( check ) > -1 :
						operator === "$=" ? check && result.slice( -check.length ) === check :
						operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
						operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
						false;
				};
			},

			"CHILD": function( type, what, argument, first, last ) {
				var simple = type.slice( 0, 3 ) !== "nth",
					forward = type.slice( -4 ) !== "last",
					ofType = what === "of-type";

				return first === 1 && last === 0 ?

					// Shortcut for :nth-*(n)
					function( elem ) {
						return !!elem.parentNode;
					} :

					function( elem, context, xml ) {
						var cache, outerCache, node, diff, nodeIndex, start,
							dir = simple !== forward ? "nextSibling" : "previousSibling",
							parent = elem.parentNode,
							name = ofType && elem.nodeName.toLowerCase(),
							useCache = !xml && !ofType;

						if ( parent ) {

							// :(first|last|only)-(child|of-type)
							if ( simple ) {
								while ( dir ) {
									node = elem;
									while ( (node = node[ dir ]) ) {
										if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
											return false;
										}
									}
									// Reverse direction for :only-* (if we haven't yet done so)
									start = dir = type === "only" && !start && "nextSibling";
								}
								return true;
							}

							start = [ forward ? parent.firstChild : parent.lastChild ];

							// non-xml :nth-child(...) stores cache data on `parent`
							if ( forward && useCache ) {
								// Seek `elem` from a previously-cached index
								outerCache = parent[ expando ] || (parent[ expando ] = {});
								cache = outerCache[ type ] || [];
								nodeIndex = cache[0] === dirruns && cache[1];
								diff = cache[0] === dirruns && cache[2];
								node = nodeIndex && parent.childNodes[ nodeIndex ];

								while ( (node = ++nodeIndex && node && node[ dir ] ||

									// Fallback to seeking `elem` from the start
									(diff = nodeIndex = 0) || start.pop()) ) {

									// When found, cache indexes on `parent` and break
									if ( node.nodeType === 1 && ++diff && node === elem ) {
										outerCache[ type ] = [ dirruns, nodeIndex, diff ];
										break;
									}
								}

							// Use previously-cached element index if available
							} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
								diff = cache[1];

							// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
							} else {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
										// Cache the index of each encountered element
										if ( useCache ) {
											(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}

							// Incorporate the offset, then check against cycle size
							diff -= last;
							return diff === first || ( diff % first === 0 && diff / first >= 0 );
						}
					};
			},

			"PSEUDO": function( pseudo, argument ) {
				// pseudo-class names are case-insensitive
				// http://www.w3.org/TR/selectors/#pseudo-classes
				// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
				// Remember that setFilters inherits from pseudos
				var args,
					fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
						Sizzle.error( "unsupported pseudo: " + pseudo );

				// The user may use createPseudo to indicate that
				// arguments are needed to create the filter function
				// just as Sizzle does
				if ( fn[ expando ] ) {
					return fn( argument );
				}

				// But maintain support for old signatures
				if ( fn.length > 1 ) {
					args = [ pseudo, pseudo, "", argument ];
					return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
						markFunction(function( seed, matches ) {
							var idx,
								matched = fn( seed, argument ),
								i = matched.length;
							while ( i-- ) {
								idx = indexOf( seed, matched[i] );
								seed[ idx ] = !( matches[ idx ] = matched[i] );
							}
						}) :
						function( elem ) {
							return fn( elem, 0, args );
						};
				}

				return fn;
			}
		},

		pseudos: {
			// Potentially complex pseudos
			"not": markFunction(function( selector ) {
				// Trim the selector passed to compile
				// to avoid treating leading and trailing
				// spaces as combinators
				var input = [],
					results = [],
					matcher = compile( selector.replace( rtrim, "$1" ) );

				return matcher[ expando ] ?
					markFunction(function( seed, matches, context, xml ) {
						var elem,
							unmatched = matcher( seed, null, xml, [] ),
							i = seed.length;

						// Match elements unmatched by `matcher`
						while ( i-- ) {
							if ( (elem = unmatched[i]) ) {
								seed[i] = !(matches[i] = elem);
							}
						}
					}) :
					function( elem, context, xml ) {
						input[0] = elem;
						matcher( input, null, xml, results );
						// Don't keep the element (issue #299)
						input[0] = null;
						return !results.pop();
					};
			}),

			"has": markFunction(function( selector ) {
				return function( elem ) {
					return Sizzle( selector, elem ).length > 0;
				};
			}),

			"contains": markFunction(function( text ) {
				text = text.replace( runescape, funescape );
				return function( elem ) {
					return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
				};
			}),

			// "Whether an element is represented by a :lang() selector
			// is based solely on the element's language value
			// being equal to the identifier C,
			// or beginning with the identifier C immediately followed by "-".
			// The matching of C against the element's language value is performed case-insensitively.
			// The identifier C does not have to be a valid language name."
			// http://www.w3.org/TR/selectors/#lang-pseudo
			"lang": markFunction( function( lang ) {
				// lang value must be a valid identifier
				if ( !ridentifier.test(lang || "") ) {
					Sizzle.error( "unsupported lang: " + lang );
				}
				lang = lang.replace( runescape, funescape ).toLowerCase();
				return function( elem ) {
					var elemLang;
					do {
						if ( (elemLang = documentIsHTML ?
							elem.lang :
							elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

							elemLang = elemLang.toLowerCase();
							return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
						}
					} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
					return false;
				};
			}),

			// Miscellaneous
			"target": function( elem ) {
				var hash = window.location && window.location.hash;
				return hash && hash.slice( 1 ) === elem.id;
			},

			"root": function( elem ) {
				return elem === docElem;
			},

			"focus": function( elem ) {
				return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
			},

			// Boolean properties
			"enabled": function( elem ) {
				return elem.disabled === false;
			},

			"disabled": function( elem ) {
				return elem.disabled === true;
			},

			"checked": function( elem ) {
				// In CSS3, :checked should return both checked and selected elements
				// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
				var nodeName = elem.nodeName.toLowerCase();
				return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
			},

			"selected": function( elem ) {
				// Accessing this property makes selected-by-default
				// options in Safari work properly
				if ( elem.parentNode ) {
					elem.parentNode.selectedIndex;
				}

				return elem.selected === true;
			},

			// Contents
			"empty": function( elem ) {
				// http://www.w3.org/TR/selectors/#empty-pseudo
				// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
				//   but not by others (comment: 8; processing instruction: 7; etc.)
				// nodeType < 6 works because attributes (2) do not appear as children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
					if ( elem.nodeType < 6 ) {
						return false;
					}
				}
				return true;
			},

			"parent": function( elem ) {
				return !Expr.pseudos["empty"]( elem );
			},

			// Element/input types
			"header": function( elem ) {
				return rheader.test( elem.nodeName );
			},

			"input": function( elem ) {
				return rinputs.test( elem.nodeName );
			},

			"button": function( elem ) {
				var name = elem.nodeName.toLowerCase();
				return name === "input" && elem.type === "button" || name === "button";
			},

			"text": function( elem ) {
				var attr;
				return elem.nodeName.toLowerCase() === "input" &&
					elem.type === "text" &&

					// Support: IE<8
					// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
					( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
			},

			// Position-in-collection
			"first": createPositionalPseudo(function() {
				return [ 0 ];
			}),

			"last": createPositionalPseudo(function( matchIndexes, length ) {
				return [ length - 1 ];
			}),

			"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
				return [ argument < 0 ? argument + length : argument ];
			}),

			"even": createPositionalPseudo(function( matchIndexes, length ) {
				var i = 0;
				for ( ; i < length; i += 2 ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),

			"odd": createPositionalPseudo(function( matchIndexes, length ) {
				var i = 1;
				for ( ; i < length; i += 2 ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),

			"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
				var i = argument < 0 ? argument + length : argument;
				for ( ; --i >= 0; ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),

			"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
				var i = argument < 0 ? argument + length : argument;
				for ( ; ++i < length; ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			})
		}
	};

	Expr.pseudos["nth"] = Expr.pseudos["eq"];

	// Add button/input type pseudos
	for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
		Expr.pseudos[ i ] = createInputPseudo( i );
	}
	for ( i in { submit: true, reset: true } ) {
		Expr.pseudos[ i ] = createButtonPseudo( i );
	}

	// Easy API for creating new setFilters
	function setFilters() {}
	setFilters.prototype = Expr.filters = Expr.pseudos;
	Expr.setFilters = new setFilters();

	tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
		var matched, match, tokens, type,
			soFar, groups, preFilters,
			cached = tokenCache[ selector + " " ];

		if ( cached ) {
			return parseOnly ? 0 : cached.slice( 0 );
		}

		soFar = selector;
		groups = [];
		preFilters = Expr.preFilter;

		while ( soFar ) {

			// Comma and first run
			if ( !matched || (match = rcomma.exec( soFar )) ) {
				if ( match ) {
					// Don't consume trailing commas as valid
					soFar = soFar.slice( match[0].length ) || soFar;
				}
				groups.push( (tokens = []) );
			}

			matched = false;

			// Combinators
			if ( (match = rcombinators.exec( soFar )) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					// Cast descendant combinators to space
					type: match[0].replace( rtrim, " " )
				});
				soFar = soFar.slice( matched.length );
			}

			// Filters
			for ( type in Expr.filter ) {
				if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
					(match = preFilters[ type ]( match ))) ) {
					matched = match.shift();
					tokens.push({
						value: matched,
						type: type,
						matches: match
					});
					soFar = soFar.slice( matched.length );
				}
			}

			if ( !matched ) {
				break;
			}
		}

		// Return the length of the invalid excess
		// if we're just parsing
		// Otherwise, throw an error or return tokens
		return parseOnly ?
			soFar.length :
			soFar ?
				Sizzle.error( selector ) :
				// Cache the tokens
				tokenCache( selector, groups ).slice( 0 );
	};

	function toSelector( tokens ) {
		var i = 0,
			len = tokens.length,
			selector = "";
		for ( ; i < len; i++ ) {
			selector += tokens[i].value;
		}
		return selector;
	}

	function addCombinator( matcher, combinator, base ) {
		var dir = combinator.dir,
			checkNonElements = base && dir === "parentNode",
			doneName = done++;

		return combinator.first ?
			// Check against closest ancestor/preceding element
			function( elem, context, xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						return matcher( elem, context, xml );
					}
				}
			} :

			// Check against all ancestor/preceding elements
			function( elem, context, xml ) {
				var oldCache, outerCache,
					newCache = [ dirruns, doneName ];

				// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
				if ( xml ) {
					while ( (elem = elem[ dir ]) ) {
						if ( elem.nodeType === 1 || checkNonElements ) {
							if ( matcher( elem, context, xml ) ) {
								return true;
							}
						}
					}
				} else {
					while ( (elem = elem[ dir ]) ) {
						if ( elem.nodeType === 1 || checkNonElements ) {
							outerCache = elem[ expando ] || (elem[ expando ] = {});
							if ( (oldCache = outerCache[ dir ]) &&
								oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

								// Assign to newCache so results back-propagate to previous elements
								return (newCache[ 2 ] = oldCache[ 2 ]);
							} else {
								// Reuse newcache so results back-propagate to previous elements
								outerCache[ dir ] = newCache;

								// A match means we're done; a fail means we have to keep checking
								if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
									return true;
								}
							}
						}
					}
				}
			};
	}

	function elementMatcher( matchers ) {
		return matchers.length > 1 ?
			function( elem, context, xml ) {
				var i = matchers.length;
				while ( i-- ) {
					if ( !matchers[i]( elem, context, xml ) ) {
						return false;
					}
				}
				return true;
			} :
			matchers[0];
	}

	function multipleContexts( selector, contexts, results ) {
		var i = 0,
			len = contexts.length;
		for ( ; i < len; i++ ) {
			Sizzle( selector, contexts[i], results );
		}
		return results;
	}

	function condense( unmatched, map, filter, context, xml ) {
		var elem,
			newUnmatched = [],
			i = 0,
			len = unmatched.length,
			mapped = map != null;

		for ( ; i < len; i++ ) {
			if ( (elem = unmatched[i]) ) {
				if ( !filter || filter( elem, context, xml ) ) {
					newUnmatched.push( elem );
					if ( mapped ) {
						map.push( i );
					}
				}
			}
		}

		return newUnmatched;
	}

	function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
		if ( postFilter && !postFilter[ expando ] ) {
			postFilter = setMatcher( postFilter );
		}
		if ( postFinder && !postFinder[ expando ] ) {
			postFinder = setMatcher( postFinder, postSelector );
		}
		return markFunction(function( seed, results, context, xml ) {
			var temp, i, elem,
				preMap = [],
				postMap = [],
				preexisting = results.length,

				// Get initial elements from seed or context
				elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

				// Prefilter to get matcher input, preserving a map for seed-results synchronization
				matcherIn = preFilter && ( seed || !selector ) ?
					condense( elems, preMap, preFilter, context, xml ) :
					elems,

				matcherOut = matcher ?
					// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
					postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

						// ...intermediate processing is necessary
						[] :

						// ...otherwise use results directly
						results :
					matcherIn;

			// Find primary matches
			if ( matcher ) {
				matcher( matcherIn, matcherOut, context, xml );
			}

			// Apply postFilter
			if ( postFilter ) {
				temp = condense( matcherOut, postMap );
				postFilter( temp, [], context, xml );

				// Un-match failing elements by moving them back to matcherIn
				i = temp.length;
				while ( i-- ) {
					if ( (elem = temp[i]) ) {
						matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
					}
				}
			}

			if ( seed ) {
				if ( postFinder || preFilter ) {
					if ( postFinder ) {
						// Get the final matcherOut by condensing this intermediate into postFinder contexts
						temp = [];
						i = matcherOut.length;
						while ( i-- ) {
							if ( (elem = matcherOut[i]) ) {
								// Restore matcherIn since elem is not yet a final match
								temp.push( (matcherIn[i] = elem) );
							}
						}
						postFinder( null, (matcherOut = []), temp, xml );
					}

					// Move matched elements from seed to results to keep them synchronized
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) &&
							(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

							seed[temp] = !(results[temp] = elem);
						}
					}
				}

			// Add elements to results, through postFinder if defined
			} else {
				matcherOut = condense(
					matcherOut === results ?
						matcherOut.splice( preexisting, matcherOut.length ) :
						matcherOut
				);
				if ( postFinder ) {
					postFinder( null, results, matcherOut, xml );
				} else {
					push.apply( results, matcherOut );
				}
			}
		});
	}

	function matcherFromTokens( tokens ) {
		var checkContext, matcher, j,
			len = tokens.length,
			leadingRelative = Expr.relative[ tokens[0].type ],
			implicitRelative = leadingRelative || Expr.relative[" "],
			i = leadingRelative ? 1 : 0,

			// The foundational matcher ensures that elements are reachable from top-level context(s)
			matchContext = addCombinator( function( elem ) {
				return elem === checkContext;
			}, implicitRelative, true ),
			matchAnyContext = addCombinator( function( elem ) {
				return indexOf( checkContext, elem ) > -1;
			}, implicitRelative, true ),
			matchers = [ function( elem, context, xml ) {
				var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
					(checkContext = context).nodeType ?
						matchContext( elem, context, xml ) :
						matchAnyContext( elem, context, xml ) );
				// Avoid hanging onto element (issue #299)
				checkContext = null;
				return ret;
			} ];

		for ( ; i < len; i++ ) {
			if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
				matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
			} else {
				matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

				// Return special upon seeing a positional matcher
				if ( matcher[ expando ] ) {
					// Find the next relative operator (if any) for proper handling
					j = ++i;
					for ( ; j < len; j++ ) {
						if ( Expr.relative[ tokens[j].type ] ) {
							break;
						}
					}
					return setMatcher(
						i > 1 && elementMatcher( matchers ),
						i > 1 && toSelector(
							// If the preceding token was a descendant combinator, insert an implicit any-element `*`
							tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
						).replace( rtrim, "$1" ),
						matcher,
						i < j && matcherFromTokens( tokens.slice( i, j ) ),
						j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
						j < len && toSelector( tokens )
					);
				}
				matchers.push( matcher );
			}
		}

		return elementMatcher( matchers );
	}

	function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
		var bySet = setMatchers.length > 0,
			byElement = elementMatchers.length > 0,
			superMatcher = function( seed, context, xml, results, outermost ) {
				var elem, j, matcher,
					matchedCount = 0,
					i = "0",
					unmatched = seed && [],
					setMatched = [],
					contextBackup = outermostContext,
					// We must always have either seed elements or outermost context
					elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
					// Use integer dirruns iff this is the outermost matcher
					dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
					len = elems.length;

				if ( outermost ) {
					outermostContext = context !== document && context;
				}

				// Add elements passing elementMatchers directly to results
				// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
				// Support: IE<9, Safari
				// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
				for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
					if ( byElement && elem ) {
						j = 0;
						while ( (matcher = elementMatchers[j++]) ) {
							if ( matcher( elem, context, xml ) ) {
								results.push( elem );
								break;
							}
						}
						if ( outermost ) {
							dirruns = dirrunsUnique;
						}
					}

					// Track unmatched elements for set filters
					if ( bySet ) {
						// They will have gone through all possible matchers
						if ( (elem = !matcher && elem) ) {
							matchedCount--;
						}

						// Lengthen the array for every element, matched or not
						if ( seed ) {
							unmatched.push( elem );
						}
					}
				}

				// Apply set filters to unmatched elements
				matchedCount += i;
				if ( bySet && i !== matchedCount ) {
					j = 0;
					while ( (matcher = setMatchers[j++]) ) {
						matcher( unmatched, setMatched, context, xml );
					}

					if ( seed ) {
						// Reintegrate element matches to eliminate the need for sorting
						if ( matchedCount > 0 ) {
							while ( i-- ) {
								if ( !(unmatched[i] || setMatched[i]) ) {
									setMatched[i] = pop.call( results );
								}
							}
						}

						// Discard index placeholder values to get only actual matches
						setMatched = condense( setMatched );
					}

					// Add matches to results
					push.apply( results, setMatched );

					// Seedless set matches succeeding multiple successful matchers stipulate sorting
					if ( outermost && !seed && setMatched.length > 0 &&
						( matchedCount + setMatchers.length ) > 1 ) {

						Sizzle.uniqueSort( results );
					}
				}

				// Override manipulation of globals by nested matchers
				if ( outermost ) {
					dirruns = dirrunsUnique;
					outermostContext = contextBackup;
				}

				return unmatched;
			};

		return bySet ?
			markFunction( superMatcher ) :
			superMatcher;
	}

	compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
		var i,
			setMatchers = [],
			elementMatchers = [],
			cached = compilerCache[ selector + " " ];

		if ( !cached ) {
			// Generate a function of recursive functions that can be used to check each element
			if ( !match ) {
				match = tokenize( selector );
			}
			i = match.length;
			while ( i-- ) {
				cached = matcherFromTokens( match[i] );
				if ( cached[ expando ] ) {
					setMatchers.push( cached );
				} else {
					elementMatchers.push( cached );
				}
			}

			// Cache the compiled function
			cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

			// Save selector and tokenization
			cached.selector = selector;
		}
		return cached;
	};

	/**
	 * A low-level selection function that works with Sizzle's compiled
	 *  selector functions
	 * @param {String|Function} selector A selector or a pre-compiled
	 *  selector function built with Sizzle.compile
	 * @param {Element} context
	 * @param {Array} [results]
	 * @param {Array} [seed] A set of elements to match against
	 */
	select = Sizzle.select = function( selector, context, results, seed ) {
		var i, tokens, token, type, find,
			compiled = typeof selector === "function" && selector,
			match = !seed && tokenize( (selector = compiled.selector || selector) );

		results = results || [];

		// Try to minimize operations if there is no seed and only one group
		if ( match.length === 1 ) {

			// Take a shortcut and set the context if the root selector is an ID
			tokens = match[0] = match[0].slice( 0 );
			if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
					support.getById && context.nodeType === 9 && documentIsHTML &&
					Expr.relative[ tokens[1].type ] ) {

				context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
				if ( !context ) {
					return results;

				// Precompiled matchers will still verify ancestry, so step up a level
				} else if ( compiled ) {
					context = context.parentNode;
				}

				selector = selector.slice( tokens.shift().value.length );
			}

			// Fetch a seed set for right-to-left matching
			i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
			while ( i-- ) {
				token = tokens[i];

				// Abort if we hit a combinator
				if ( Expr.relative[ (type = token.type) ] ) {
					break;
				}
				if ( (find = Expr.find[ type ]) ) {
					// Search, expanding context for leading sibling combinators
					if ( (seed = find(
						token.matches[0].replace( runescape, funescape ),
						rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
					)) ) {

						// If seed is empty or no tokens remain, we can return early
						tokens.splice( i, 1 );
						selector = seed.length && toSelector( tokens );
						if ( !selector ) {
							push.apply( results, seed );
							return results;
						}

						break;
					}
				}
			}
		}

		// Compile and execute a filtering function if one is not provided
		// Provide `match` to avoid retokenization if we modified the selector above
		( compiled || compile( selector, match ) )(
			seed,
			context,
			!documentIsHTML,
			results,
			rsibling.test( selector ) && testContext( context.parentNode ) || context
		);
		return results;
	};

	// One-time assignments

	// Sort stability
	support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

	// Support: Chrome 14-35+
	// Always assume duplicates if they aren't passed to the comparison function
	support.detectDuplicates = !!hasDuplicate;

	// Initialize against the default document
	setDocument();

	// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
	// Detached nodes confoundingly follow *each other*
	support.sortDetached = assert(function( div1 ) {
		// Should return 1, but returns 4 (following)
		return div1.compareDocumentPosition( document.createElement("div") ) & 1;
	});

	// Support: IE<8
	// Prevent attribute/property "interpolation"
	// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
	if ( !assert(function( div ) {
		div.innerHTML = "<a href='#'></a>";
		return div.firstChild.getAttribute("href") === "#" ;
	}) ) {
		addHandle( "type|href|height|width", function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
			}
		});
	}

	// Support: IE<9
	// Use defaultValue in place of getAttribute("value")
	if ( !support.attributes || !assert(function( div ) {
		div.innerHTML = "<input/>";
		div.firstChild.setAttribute( "value", "" );
		return div.firstChild.getAttribute( "value" ) === "";
	}) ) {
		addHandle( "value", function( elem, name, isXML ) {
			if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
				return elem.defaultValue;
			}
		});
	}

	// Support: IE<9
	// Use getAttributeNode to fetch booleans when getAttribute lies
	if ( !assert(function( div ) {
		return div.getAttribute("disabled") == null;
	}) ) {
		addHandle( booleans, function( elem, name, isXML ) {
			var val;
			if ( !isXML ) {
				return elem[ name ] === true ? name.toLowerCase() :
						(val = elem.getAttributeNode( name )) && val.specified ?
						val.value :
					null;
			}
		});
	}

	return Sizzle;

	})( window );



	jQuery.find = Sizzle;
	jQuery.expr = Sizzle.selectors;
	jQuery.expr[":"] = jQuery.expr.pseudos;
	jQuery.unique = Sizzle.uniqueSort;
	jQuery.text = Sizzle.getText;
	jQuery.isXMLDoc = Sizzle.isXML;
	jQuery.contains = Sizzle.contains;



	var rneedsContext = jQuery.expr.match.needsContext;

	var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



	var risSimple = /^.[^:#\[\.,]*$/;

	// Implement the identical functionality for filter and not
	function winnow( elements, qualifier, not ) {
		if ( jQuery.isFunction( qualifier ) ) {
			return jQuery.grep( elements, function( elem, i ) {
				/* jshint -W018 */
				return !!qualifier.call( elem, i, elem ) !== not;
			});

		}

		if ( qualifier.nodeType ) {
			return jQuery.grep( elements, function( elem ) {
				return ( elem === qualifier ) !== not;
			});

		}

		if ( typeof qualifier === "string" ) {
			if ( risSimple.test( qualifier ) ) {
				return jQuery.filter( qualifier, elements, not );
			}

			qualifier = jQuery.filter( qualifier, elements );
		}

		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) >= 0 ) !== not;
		});
	}

	jQuery.filter = function( expr, elems, not ) {
		var elem = elems[ 0 ];

		if ( not ) {
			expr = ":not(" + expr + ")";
		}

		return elems.length === 1 && elem.nodeType === 1 ?
			jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
			jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
				return elem.nodeType === 1;
			}));
	};

	jQuery.fn.extend({
		find: function( selector ) {
			var i,
				len = this.length,
				ret = [],
				self = this;

			if ( typeof selector !== "string" ) {
				return this.pushStack( jQuery( selector ).filter(function() {
					for ( i = 0; i < len; i++ ) {
						if ( jQuery.contains( self[ i ], this ) ) {
							return true;
						}
					}
				}) );
			}

			for ( i = 0; i < len; i++ ) {
				jQuery.find( selector, self[ i ], ret );
			}

			// Needed because $( selector, context ) becomes $( context ).find( selector )
			ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
			ret.selector = this.selector ? this.selector + " " + selector : selector;
			return ret;
		},
		filter: function( selector ) {
			return this.pushStack( winnow(this, selector || [], false) );
		},
		not: function( selector ) {
			return this.pushStack( winnow(this, selector || [], true) );
		},
		is: function( selector ) {
			return !!winnow(
				this,

				// If this is a positional/relative selector, check membership in the returned set
				// so $("p:first").is("p:last") won't return true for a doc with two "p".
				typeof selector === "string" && rneedsContext.test( selector ) ?
					jQuery( selector ) :
					selector || [],
				false
			).length;
		}
	});


	// Initialize a jQuery object


	// A central reference to the root jQuery(document)
	var rootjQuery,

		// A simple way to check for HTML strings
		// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
		// Strict HTML recognition (#11290: must start with <)
		rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

		init = jQuery.fn.init = function( selector, context ) {
			var match, elem;

			// HANDLE: $(""), $(null), $(undefined), $(false)
			if ( !selector ) {
				return this;
			}

			// Handle HTML strings
			if ( typeof selector === "string" ) {
				if ( selector[0] === "<" && selector[ selector.length - 1 ] === ">" && selector.length >= 3 ) {
					// Assume that strings that start and end with <> are HTML and skip the regex check
					match = [ null, selector, null ];

				} else {
					match = rquickExpr.exec( selector );
				}

				// Match html or make sure no context is specified for #id
				if ( match && (match[1] || !context) ) {

					// HANDLE: $(html) -> $(array)
					if ( match[1] ) {
						context = context instanceof jQuery ? context[0] : context;

						// Option to run scripts is true for back-compat
						// Intentionally let the error be thrown if parseHTML is not present
						jQuery.merge( this, jQuery.parseHTML(
							match[1],
							context && context.nodeType ? context.ownerDocument || context : document,
							true
						) );

						// HANDLE: $(html, props)
						if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
							for ( match in context ) {
								// Properties of context are called as methods if possible
								if ( jQuery.isFunction( this[ match ] ) ) {
									this[ match ]( context[ match ] );

								// ...and otherwise set as attributes
								} else {
									this.attr( match, context[ match ] );
								}
							}
						}

						return this;

					// HANDLE: $(#id)
					} else {
						elem = document.getElementById( match[2] );

						// Support: Blackberry 4.6
						// gEBID returns nodes no longer in the document (#6963)
						if ( elem && elem.parentNode ) {
							// Inject the element directly into the jQuery object
							this.length = 1;
							this[0] = elem;
						}

						this.context = document;
						this.selector = selector;
						return this;
					}

				// HANDLE: $(expr, $(...))
				} else if ( !context || context.jquery ) {
					return ( context || rootjQuery ).find( selector );

				// HANDLE: $(expr, context)
				// (which is just equivalent to: $(context).find(expr)
				} else {
					return this.constructor( context ).find( selector );
				}

			// HANDLE: $(DOMElement)
			} else if ( selector.nodeType ) {
				this.context = this[0] = selector;
				this.length = 1;
				return this;

			// HANDLE: $(function)
			// Shortcut for document ready
			} else if ( jQuery.isFunction( selector ) ) {
				return typeof rootjQuery.ready !== "undefined" ?
					rootjQuery.ready( selector ) :
					// Execute immediately if ready is not present
					selector( jQuery );
			}

			if ( selector.selector !== undefined ) {
				this.selector = selector.selector;
				this.context = selector.context;
			}

			return jQuery.makeArray( selector, this );
		};

	// Give the init function the jQuery prototype for later instantiation
	init.prototype = jQuery.fn;

	// Initialize central reference
	rootjQuery = jQuery( document );


	var rparentsprev = /^(?:parents|prev(?:Until|All))/,
		// Methods guaranteed to produce a unique set when starting from a unique set
		guaranteedUnique = {
			children: true,
			contents: true,
			next: true,
			prev: true
		};

	jQuery.extend({
		dir: function( elem, dir, until ) {
			var matched = [],
				truncate = until !== undefined;

			while ( (elem = elem[ dir ]) && elem.nodeType !== 9 ) {
				if ( elem.nodeType === 1 ) {
					if ( truncate && jQuery( elem ).is( until ) ) {
						break;
					}
					matched.push( elem );
				}
			}
			return matched;
		},

		sibling: function( n, elem ) {
			var matched = [];

			for ( ; n; n = n.nextSibling ) {
				if ( n.nodeType === 1 && n !== elem ) {
					matched.push( n );
				}
			}

			return matched;
		}
	});

	jQuery.fn.extend({
		has: function( target ) {
			var targets = jQuery( target, this ),
				l = targets.length;

			return this.filter(function() {
				var i = 0;
				for ( ; i < l; i++ ) {
					if ( jQuery.contains( this, targets[i] ) ) {
						return true;
					}
				}
			});
		},

		closest: function( selectors, context ) {
			var cur,
				i = 0,
				l = this.length,
				matched = [],
				pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
					jQuery( selectors, context || this.context ) :
					0;

			for ( ; i < l; i++ ) {
				for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
					// Always skip document fragments
					if ( cur.nodeType < 11 && (pos ?
						pos.index(cur) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector(cur, selectors)) ) {

						matched.push( cur );
						break;
					}
				}
			}

			return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
		},

		// Determine the position of an element within the set
		index: function( elem ) {

			// No argument, return index in parent
			if ( !elem ) {
				return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
			}

			// Index in selector
			if ( typeof elem === "string" ) {
				return indexOf.call( jQuery( elem ), this[ 0 ] );
			}

			// Locate the position of the desired element
			return indexOf.call( this,

				// If it receives a jQuery object, the first element is used
				elem.jquery ? elem[ 0 ] : elem
			);
		},

		add: function( selector, context ) {
			return this.pushStack(
				jQuery.unique(
					jQuery.merge( this.get(), jQuery( selector, context ) )
				)
			);
		},

		addBack: function( selector ) {
			return this.add( selector == null ?
				this.prevObject : this.prevObject.filter(selector)
			);
		}
	});

	function sibling( cur, dir ) {
		while ( (cur = cur[dir]) && cur.nodeType !== 1 ) {}
		return cur;
	}

	jQuery.each({
		parent: function( elem ) {
			var parent = elem.parentNode;
			return parent && parent.nodeType !== 11 ? parent : null;
		},
		parents: function( elem ) {
			return jQuery.dir( elem, "parentNode" );
		},
		parentsUntil: function( elem, i, until ) {
			return jQuery.dir( elem, "parentNode", until );
		},
		next: function( elem ) {
			return sibling( elem, "nextSibling" );
		},
		prev: function( elem ) {
			return sibling( elem, "previousSibling" );
		},
		nextAll: function( elem ) {
			return jQuery.dir( elem, "nextSibling" );
		},
		prevAll: function( elem ) {
			return jQuery.dir( elem, "previousSibling" );
		},
		nextUntil: function( elem, i, until ) {
			return jQuery.dir( elem, "nextSibling", until );
		},
		prevUntil: function( elem, i, until ) {
			return jQuery.dir( elem, "previousSibling", until );
		},
		siblings: function( elem ) {
			return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
		},
		children: function( elem ) {
			return jQuery.sibling( elem.firstChild );
		},
		contents: function( elem ) {
			return elem.contentDocument || jQuery.merge( [], elem.childNodes );
		}
	}, function( name, fn ) {
		jQuery.fn[ name ] = function( until, selector ) {
			var matched = jQuery.map( this, fn, until );

			if ( name.slice( -5 ) !== "Until" ) {
				selector = until;
			}

			if ( selector && typeof selector === "string" ) {
				matched = jQuery.filter( selector, matched );
			}

			if ( this.length > 1 ) {
				// Remove duplicates
				if ( !guaranteedUnique[ name ] ) {
					jQuery.unique( matched );
				}

				// Reverse order for parents* and prev-derivatives
				if ( rparentsprev.test( name ) ) {
					matched.reverse();
				}
			}

			return this.pushStack( matched );
		};
	});
	var rnotwhite = (/\S+/g);



	// String to Object options format cache
	var optionsCache = {};

	// Convert String-formatted options into Object-formatted ones and store in cache
	function createOptions( options ) {
		var object = optionsCache[ options ] = {};
		jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
			object[ flag ] = true;
		});
		return object;
	}

	/*
	 * Create a callback list using the following parameters:
	 *
	 *	options: an optional list of space-separated options that will change how
	 *			the callback list behaves or a more traditional option object
	 *
	 * By default a callback list will act like an event callback list and can be
	 * "fired" multiple times.
	 *
	 * Possible options:
	 *
	 *	once:			will ensure the callback list can only be fired once (like a Deferred)
	 *
	 *	memory:			will keep track of previous values and will call any callback added
	 *					after the list has been fired right away with the latest "memorized"
	 *					values (like a Deferred)
	 *
	 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
	 *
	 *	stopOnFalse:	interrupt callings when a callback returns false
	 *
	 */
	jQuery.Callbacks = function( options ) {

		// Convert options from String-formatted to Object-formatted if needed
		// (we check in cache first)
		options = typeof options === "string" ?
			( optionsCache[ options ] || createOptions( options ) ) :
			jQuery.extend( {}, options );

		var // Last fire value (for non-forgettable lists)
			memory,
			// Flag to know if list was already fired
			fired,
			// Flag to know if list is currently firing
			firing,
			// First callback to fire (used internally by add and fireWith)
			firingStart,
			// End of the loop when firing
			firingLength,
			// Index of currently firing callback (modified by remove if needed)
			firingIndex,
			// Actual callback list
			list = [],
			// Stack of fire calls for repeatable lists
			stack = !options.once && [],
			// Fire callbacks
			fire = function( data ) {
				memory = options.memory && data;
				fired = true;
				firingIndex = firingStart || 0;
				firingStart = 0;
				firingLength = list.length;
				firing = true;
				for ( ; list && firingIndex < firingLength; firingIndex++ ) {
					if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
						memory = false; // To prevent further calls using add
						break;
					}
				}
				firing = false;
				if ( list ) {
					if ( stack ) {
						if ( stack.length ) {
							fire( stack.shift() );
						}
					} else if ( memory ) {
						list = [];
					} else {
						self.disable();
					}
				}
			},
			// Actual Callbacks object
			self = {
				// Add a callback or a collection of callbacks to the list
				add: function() {
					if ( list ) {
						// First, we save the current length
						var start = list.length;
						(function add( args ) {
							jQuery.each( args, function( _, arg ) {
								var type = jQuery.type( arg );
								if ( type === "function" ) {
									if ( !options.unique || !self.has( arg ) ) {
										list.push( arg );
									}
								} else if ( arg && arg.length && type !== "string" ) {
									// Inspect recursively
									add( arg );
								}
							});
						})( arguments );
						// Do we need to add the callbacks to the
						// current firing batch?
						if ( firing ) {
							firingLength = list.length;
						// With memory, if we're not firing then
						// we should call right away
						} else if ( memory ) {
							firingStart = start;
							fire( memory );
						}
					}
					return this;
				},
				// Remove a callback from the list
				remove: function() {
					if ( list ) {
						jQuery.each( arguments, function( _, arg ) {
							var index;
							while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
								list.splice( index, 1 );
								// Handle firing indexes
								if ( firing ) {
									if ( index <= firingLength ) {
										firingLength--;
									}
									if ( index <= firingIndex ) {
										firingIndex--;
									}
								}
							}
						});
					}
					return this;
				},
				// Check if a given callback is in the list.
				// If no argument is given, return whether or not list has callbacks attached.
				has: function( fn ) {
					return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
				},
				// Remove all callbacks from the list
				empty: function() {
					list = [];
					firingLength = 0;
					return this;
				},
				// Have the list do nothing anymore
				disable: function() {
					list = stack = memory = undefined;
					return this;
				},
				// Is it disabled?
				disabled: function() {
					return !list;
				},
				// Lock the list in its current state
				lock: function() {
					stack = undefined;
					if ( !memory ) {
						self.disable();
					}
					return this;
				},
				// Is it locked?
				locked: function() {
					return !stack;
				},
				// Call all callbacks with the given context and arguments
				fireWith: function( context, args ) {
					if ( list && ( !fired || stack ) ) {
						args = args || [];
						args = [ context, args.slice ? args.slice() : args ];
						if ( firing ) {
							stack.push( args );
						} else {
							fire( args );
						}
					}
					return this;
				},
				// Call all the callbacks with the given arguments
				fire: function() {
					self.fireWith( this, arguments );
					return this;
				},
				// To know if the callbacks have already been called at least once
				fired: function() {
					return !!fired;
				}
			};

		return self;
	};


	jQuery.extend({

		Deferred: function( func ) {
			var tuples = [
					// action, add listener, listener list, final state
					[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
					[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
					[ "notify", "progress", jQuery.Callbacks("memory") ]
				],
				state = "pending",
				promise = {
					state: function() {
						return state;
					},
					always: function() {
						deferred.done( arguments ).fail( arguments );
						return this;
					},
					then: function( /* fnDone, fnFail, fnProgress */ ) {
						var fns = arguments;
						return jQuery.Deferred(function( newDefer ) {
							jQuery.each( tuples, function( i, tuple ) {
								var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
								// deferred[ done | fail | progress ] for forwarding actions to newDefer
								deferred[ tuple[1] ](function() {
									var returned = fn && fn.apply( this, arguments );
									if ( returned && jQuery.isFunction( returned.promise ) ) {
										returned.promise()
											.done( newDefer.resolve )
											.fail( newDefer.reject )
											.progress( newDefer.notify );
									} else {
										newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
									}
								});
							});
							fns = null;
						}).promise();
					},
					// Get a promise for this deferred
					// If obj is provided, the promise aspect is added to the object
					promise: function( obj ) {
						return obj != null ? jQuery.extend( obj, promise ) : promise;
					}
				},
				deferred = {};

			// Keep pipe for back-compat
			promise.pipe = promise.then;

			// Add list-specific methods
			jQuery.each( tuples, function( i, tuple ) {
				var list = tuple[ 2 ],
					stateString = tuple[ 3 ];

				// promise[ done | fail | progress ] = list.add
				promise[ tuple[1] ] = list.add;

				// Handle state
				if ( stateString ) {
					list.add(function() {
						// state = [ resolved | rejected ]
						state = stateString;

					// [ reject_list | resolve_list ].disable; progress_list.lock
					}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
				}

				// deferred[ resolve | reject | notify ]
				deferred[ tuple[0] ] = function() {
					deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
					return this;
				};
				deferred[ tuple[0] + "With" ] = list.fireWith;
			});

			// Make the deferred a promise
			promise.promise( deferred );

			// Call given func if any
			if ( func ) {
				func.call( deferred, deferred );
			}

			// All done!
			return deferred;
		},

		// Deferred helper
		when: function( subordinate /* , ..., subordinateN */ ) {
			var i = 0,
				resolveValues = slice.call( arguments ),
				length = resolveValues.length,

				// the count of uncompleted subordinates
				remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

				// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
				deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

				// Update function for both resolve and progress values
				updateFunc = function( i, contexts, values ) {
					return function( value ) {
						contexts[ i ] = this;
						values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
						if ( values === progressValues ) {
							deferred.notifyWith( contexts, values );
						} else if ( !( --remaining ) ) {
							deferred.resolveWith( contexts, values );
						}
					};
				},

				progressValues, progressContexts, resolveContexts;

			// Add listeners to Deferred subordinates; treat others as resolved
			if ( length > 1 ) {
				progressValues = new Array( length );
				progressContexts = new Array( length );
				resolveContexts = new Array( length );
				for ( ; i < length; i++ ) {
					if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
						resolveValues[ i ].promise()
							.done( updateFunc( i, resolveContexts, resolveValues ) )
							.fail( deferred.reject )
							.progress( updateFunc( i, progressContexts, progressValues ) );
					} else {
						--remaining;
					}
				}
			}

			// If we're not waiting on anything, resolve the master
			if ( !remaining ) {
				deferred.resolveWith( resolveContexts, resolveValues );
			}

			return deferred.promise();
		}
	});


	// The deferred used on DOM ready
	var readyList;

	jQuery.fn.ready = function( fn ) {
		// Add the callback
		jQuery.ready.promise().done( fn );

		return this;
	};

	jQuery.extend({
		// Is the DOM ready to be used? Set to true once it occurs.
		isReady: false,

		// A counter to track how many items to wait for before
		// the ready event fires. See #6781
		readyWait: 1,

		// Hold (or release) the ready event
		holdReady: function( hold ) {
			if ( hold ) {
				jQuery.readyWait++;
			} else {
				jQuery.ready( true );
			}
		},

		// Handle when the DOM is ready
		ready: function( wait ) {

			// Abort if there are pending holds or we're already ready
			if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
				return;
			}

			// Remember that the DOM is ready
			jQuery.isReady = true;

			// If a normal DOM Ready event fired, decrement, and wait if need be
			if ( wait !== true && --jQuery.readyWait > 0 ) {
				return;
			}

			// If there are functions bound, to execute
			readyList.resolveWith( document, [ jQuery ] );

			// Trigger any bound ready events
			if ( jQuery.fn.triggerHandler ) {
				jQuery( document ).triggerHandler( "ready" );
				jQuery( document ).off( "ready" );
			}
		}
	});

	/**
	 * The ready event handler and self cleanup method
	 */
	function completed() {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );
		jQuery.ready();
	}

	jQuery.ready.promise = function( obj ) {
		if ( !readyList ) {

			readyList = jQuery.Deferred();

			// Catch cases where $(document).ready() is called after the browser event has already occurred.
			// We once tried to use readyState "interactive" here, but it caused issues like the one
			// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
			if ( document.readyState === "complete" ) {
				// Handle it asynchronously to allow scripts the opportunity to delay ready
				setTimeout( jQuery.ready );

			} else {

				// Use the handy event callback
				document.addEventListener( "DOMContentLoaded", completed, false );

				// A fallback to window.onload, that will always work
				window.addEventListener( "load", completed, false );
			}
		}
		return readyList.promise( obj );
	};

	// Kick off the DOM ready check even if the user does not
	jQuery.ready.promise();




	// Multifunctional method to get and set values of a collection
	// The value/s can optionally be executed if it's a function
	var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
		var i = 0,
			len = elems.length,
			bulk = key == null;

		// Sets many values
		if ( jQuery.type( key ) === "object" ) {
			chainable = true;
			for ( i in key ) {
				jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
			}

		// Sets one value
		} else if ( value !== undefined ) {
			chainable = true;

			if ( !jQuery.isFunction( value ) ) {
				raw = true;
			}

			if ( bulk ) {
				// Bulk operations run against the entire set
				if ( raw ) {
					fn.call( elems, value );
					fn = null;

				// ...except when executing function values
				} else {
					bulk = fn;
					fn = function( elem, key, value ) {
						return bulk.call( jQuery( elem ), value );
					};
				}
			}

			if ( fn ) {
				for ( ; i < len; i++ ) {
					fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
				}
			}
		}

		return chainable ?
			elems :

			// Gets
			bulk ?
				fn.call( elems ) :
				len ? fn( elems[0], key ) : emptyGet;
	};


	/**
	 * Determines whether an object can have data
	 */
	jQuery.acceptData = function( owner ) {
		// Accepts only:
		//  - Node
		//    - Node.ELEMENT_NODE
		//    - Node.DOCUMENT_NODE
		//  - Object
		//    - Any
		/* jshint -W018 */
		return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
	};


	function Data() {
		// Support: Android<4,
		// Old WebKit does not have Object.preventExtensions/freeze method,
		// return new empty object instead with no [[set]] accessor
		Object.defineProperty( this.cache = {}, 0, {
			get: function() {
				return {};
			}
		});

		this.expando = jQuery.expando + Data.uid++;
	}

	Data.uid = 1;
	Data.accepts = jQuery.acceptData;

	Data.prototype = {
		key: function( owner ) {
			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return the key for a frozen object.
			if ( !Data.accepts( owner ) ) {
				return 0;
			}

			var descriptor = {},
				// Check if the owner object already has a cache key
				unlock = owner[ this.expando ];

			// If not, create one
			if ( !unlock ) {
				unlock = Data.uid++;

				// Secure it in a non-enumerable, non-writable property
				try {
					descriptor[ this.expando ] = { value: unlock };
					Object.defineProperties( owner, descriptor );

				// Support: Android<4
				// Fallback to a less secure definition
				} catch ( e ) {
					descriptor[ this.expando ] = unlock;
					jQuery.extend( owner, descriptor );
				}
			}

			// Ensure the cache object
			if ( !this.cache[ unlock ] ) {
				this.cache[ unlock ] = {};
			}

			return unlock;
		},
		set: function( owner, data, value ) {
			var prop,
				// There may be an unlock assigned to this node,
				// if there is no entry for this "owner", create one inline
				// and set the unlock as though an owner entry had always existed
				unlock = this.key( owner ),
				cache = this.cache[ unlock ];

			// Handle: [ owner, key, value ] args
			if ( typeof data === "string" ) {
				cache[ data ] = value;

			// Handle: [ owner, { properties } ] args
			} else {
				// Fresh assignments by object are shallow copied
				if ( jQuery.isEmptyObject( cache ) ) {
					jQuery.extend( this.cache[ unlock ], data );
				// Otherwise, copy the properties one-by-one to the cache object
				} else {
					for ( prop in data ) {
						cache[ prop ] = data[ prop ];
					}
				}
			}
			return cache;
		},
		get: function( owner, key ) {
			// Either a valid cache is found, or will be created.
			// New caches will be created and the unlock returned,
			// allowing direct access to the newly created
			// empty data object. A valid owner object must be provided.
			var cache = this.cache[ this.key( owner ) ];

			return key === undefined ?
				cache : cache[ key ];
		},
		access: function( owner, key, value ) {
			var stored;
			// In cases where either:
			//
			//   1. No key was specified
			//   2. A string key was specified, but no value provided
			//
			// Take the "read" path and allow the get method to determine
			// which value to return, respectively either:
			//
			//   1. The entire cache object
			//   2. The data stored at the key
			//
			if ( key === undefined ||
					((key && typeof key === "string") && value === undefined) ) {

				stored = this.get( owner, key );

				return stored !== undefined ?
					stored : this.get( owner, jQuery.camelCase(key) );
			}

			// [*]When the key is not a string, or both a key and value
			// are specified, set or extend (existing objects) with either:
			//
			//   1. An object of properties
			//   2. A key and value
			//
			this.set( owner, key, value );

			// Since the "set" path can have two possible entry points
			// return the expected data based on which path was taken[*]
			return value !== undefined ? value : key;
		},
		remove: function( owner, key ) {
			var i, name, camel,
				unlock = this.key( owner ),
				cache = this.cache[ unlock ];

			if ( key === undefined ) {
				this.cache[ unlock ] = {};

			} else {
				// Support array or space separated string of keys
				if ( jQuery.isArray( key ) ) {
					// If "name" is an array of keys...
					// When data is initially created, via ("key", "val") signature,
					// keys will be converted to camelCase.
					// Since there is no way to tell _how_ a key was added, remove
					// both plain key and camelCase key. #12786
					// This will only penalize the array argument path.
					name = key.concat( key.map( jQuery.camelCase ) );
				} else {
					camel = jQuery.camelCase( key );
					// Try the string as a key before any manipulation
					if ( key in cache ) {
						name = [ key, camel ];
					} else {
						// If a key with the spaces exists, use it.
						// Otherwise, create an array by matching non-whitespace
						name = camel;
						name = name in cache ?
							[ name ] : ( name.match( rnotwhite ) || [] );
					}
				}

				i = name.length;
				while ( i-- ) {
					delete cache[ name[ i ] ];
				}
			}
		},
		hasData: function( owner ) {
			return !jQuery.isEmptyObject(
				this.cache[ owner[ this.expando ] ] || {}
			);
		},
		discard: function( owner ) {
			if ( owner[ this.expando ] ) {
				delete this.cache[ owner[ this.expando ] ];
			}
		}
	};
	var data_priv = new Data();

	var data_user = new Data();



	//	Implementation Summary
	//
	//	1. Enforce API surface and semantic compatibility with 1.9.x branch
	//	2. Improve the module's maintainability by reducing the storage
	//		paths to a single mechanism.
	//	3. Use the same single mechanism to support "private" and "user" data.
	//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
	//	5. Avoid exposing implementation details on user objects (eg. expando properties)
	//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

	var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
		rmultiDash = /([A-Z])/g;

	function dataAttr( elem, key, data ) {
		var name;

		// If nothing was found internally, try to fetch any
		// data from the HTML5 data-* attribute
		if ( data === undefined && elem.nodeType === 1 ) {
			name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();
			data = elem.getAttribute( name );

			if ( typeof data === "string" ) {
				try {
					data = data === "true" ? true :
						data === "false" ? false :
						data === "null" ? null :
						// Only convert to a number if it doesn't change the string
						+data + "" === data ? +data :
						rbrace.test( data ) ? jQuery.parseJSON( data ) :
						data;
				} catch( e ) {}

				// Make sure we set the data so it isn't changed later
				data_user.set( elem, key, data );
			} else {
				data = undefined;
			}
		}
		return data;
	}

	jQuery.extend({
		hasData: function( elem ) {
			return data_user.hasData( elem ) || data_priv.hasData( elem );
		},

		data: function( elem, name, data ) {
			return data_user.access( elem, name, data );
		},

		removeData: function( elem, name ) {
			data_user.remove( elem, name );
		},

		// TODO: Now that all calls to _data and _removeData have been replaced
		// with direct calls to data_priv methods, these can be deprecated.
		_data: function( elem, name, data ) {
			return data_priv.access( elem, name, data );
		},

		_removeData: function( elem, name ) {
			data_priv.remove( elem, name );
		}
	});

	jQuery.fn.extend({
		data: function( key, value ) {
			var i, name, data,
				elem = this[ 0 ],
				attrs = elem && elem.attributes;

			// Gets all values
			if ( key === undefined ) {
				if ( this.length ) {
					data = data_user.get( elem );

					if ( elem.nodeType === 1 && !data_priv.get( elem, "hasDataAttrs" ) ) {
						i = attrs.length;
						while ( i-- ) {

							// Support: IE11+
							// The attrs elements can be null (#14894)
							if ( attrs[ i ] ) {
								name = attrs[ i ].name;
								if ( name.indexOf( "data-" ) === 0 ) {
									name = jQuery.camelCase( name.slice(5) );
									dataAttr( elem, name, data[ name ] );
								}
							}
						}
						data_priv.set( elem, "hasDataAttrs", true );
					}
				}

				return data;
			}

			// Sets multiple values
			if ( typeof key === "object" ) {
				return this.each(function() {
					data_user.set( this, key );
				});
			}

			return access( this, function( value ) {
				var data,
					camelKey = jQuery.camelCase( key );

				// The calling jQuery object (element matches) is not empty
				// (and therefore has an element appears at this[ 0 ]) and the
				// `value` parameter was not undefined. An empty jQuery object
				// will result in `undefined` for elem = this[ 0 ] which will
				// throw an exception if an attempt to read a data cache is made.
				if ( elem && value === undefined ) {
					// Attempt to get data from the cache
					// with the key as-is
					data = data_user.get( elem, key );
					if ( data !== undefined ) {
						return data;
					}

					// Attempt to get data from the cache
					// with the key camelized
					data = data_user.get( elem, camelKey );
					if ( data !== undefined ) {
						return data;
					}

					// Attempt to "discover" the data in
					// HTML5 custom data-* attrs
					data = dataAttr( elem, camelKey, undefined );
					if ( data !== undefined ) {
						return data;
					}

					// We tried really hard, but the data doesn't exist.
					return;
				}

				// Set the data...
				this.each(function() {
					// First, attempt to store a copy or reference of any
					// data that might've been store with a camelCased key.
					var data = data_user.get( this, camelKey );

					// For HTML5 data-* attribute interop, we have to
					// store property names with dashes in a camelCase form.
					// This might not apply to all properties...*
					data_user.set( this, camelKey, value );

					// *... In the case of properties that might _actually_
					// have dashes, we need to also store a copy of that
					// unchanged property.
					if ( key.indexOf("-") !== -1 && data !== undefined ) {
						data_user.set( this, key, value );
					}
				});
			}, null, value, arguments.length > 1, null, true );
		},

		removeData: function( key ) {
			return this.each(function() {
				data_user.remove( this, key );
			});
		}
	});


	jQuery.extend({
		queue: function( elem, type, data ) {
			var queue;

			if ( elem ) {
				type = ( type || "fx" ) + "queue";
				queue = data_priv.get( elem, type );

				// Speed up dequeue by getting out quickly if this is just a lookup
				if ( data ) {
					if ( !queue || jQuery.isArray( data ) ) {
						queue = data_priv.access( elem, type, jQuery.makeArray(data) );
					} else {
						queue.push( data );
					}
				}
				return queue || [];
			}
		},

		dequeue: function( elem, type ) {
			type = type || "fx";

			var queue = jQuery.queue( elem, type ),
				startLength = queue.length,
				fn = queue.shift(),
				hooks = jQuery._queueHooks( elem, type ),
				next = function() {
					jQuery.dequeue( elem, type );
				};

			// If the fx queue is dequeued, always remove the progress sentinel
			if ( fn === "inprogress" ) {
				fn = queue.shift();
				startLength--;
			}

			if ( fn ) {

				// Add a progress sentinel to prevent the fx queue from being
				// automatically dequeued
				if ( type === "fx" ) {
					queue.unshift( "inprogress" );
				}

				// Clear up the last queue stop function
				delete hooks.stop;
				fn.call( elem, next, hooks );
			}

			if ( !startLength && hooks ) {
				hooks.empty.fire();
			}
		},

		// Not public - generate a queueHooks object, or return the current one
		_queueHooks: function( elem, type ) {
			var key = type + "queueHooks";
			return data_priv.get( elem, key ) || data_priv.access( elem, key, {
				empty: jQuery.Callbacks("once memory").add(function() {
					data_priv.remove( elem, [ type + "queue", key ] );
				})
			});
		}
	});

	jQuery.fn.extend({
		queue: function( type, data ) {
			var setter = 2;

			if ( typeof type !== "string" ) {
				data = type;
				type = "fx";
				setter--;
			}

			if ( arguments.length < setter ) {
				return jQuery.queue( this[0], type );
			}

			return data === undefined ?
				this :
				this.each(function() {
					var queue = jQuery.queue( this, type, data );

					// Ensure a hooks for this queue
					jQuery._queueHooks( this, type );

					if ( type === "fx" && queue[0] !== "inprogress" ) {
						jQuery.dequeue( this, type );
					}
				});
		},
		dequeue: function( type ) {
			return this.each(function() {
				jQuery.dequeue( this, type );
			});
		},
		clearQueue: function( type ) {
			return this.queue( type || "fx", [] );
		},
		// Get a promise resolved when queues of a certain type
		// are emptied (fx is the type by default)
		promise: function( type, obj ) {
			var tmp,
				count = 1,
				defer = jQuery.Deferred(),
				elements = this,
				i = this.length,
				resolve = function() {
					if ( !( --count ) ) {
						defer.resolveWith( elements, [ elements ] );
					}
				};

			if ( typeof type !== "string" ) {
				obj = type;
				type = undefined;
			}
			type = type || "fx";

			while ( i-- ) {
				tmp = data_priv.get( elements[ i ], type + "queueHooks" );
				if ( tmp && tmp.empty ) {
					count++;
					tmp.empty.add( resolve );
				}
			}
			resolve();
			return defer.promise( obj );
		}
	});
	var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

	var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

	var isHidden = function( elem, el ) {
			// isHidden might be called from jQuery#filter function;
			// in that case, element will be second argument
			elem = el || elem;
			return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
		};

	var rcheckableType = (/^(?:checkbox|radio)$/i);



	(function() {
		var fragment = document.createDocumentFragment(),
			div = fragment.appendChild( document.createElement( "div" ) ),
			input = document.createElement( "input" );

		// Support: Safari<=5.1
		// Check state lost if the name is set (#11217)
		// Support: Windows Web Apps (WWA)
		// `name` and `type` must use .setAttribute for WWA (#14901)
		input.setAttribute( "type", "radio" );
		input.setAttribute( "checked", "checked" );
		input.setAttribute( "name", "t" );

		div.appendChild( input );

		// Support: Safari<=5.1, Android<4.2
		// Older WebKit doesn't clone checked state correctly in fragments
		support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

		// Support: IE<=11+
		// Make sure textarea (and checkbox) defaultValue is properly cloned
		div.innerHTML = "<textarea>x</textarea>";
		support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
	})();
	var strundefined = typeof undefined;



	support.focusinBubbles = "onfocusin" in window;


	var
		rkeyEvent = /^key/,
		rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
		rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
		rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

	function returnTrue() {
		return true;
	}

	function returnFalse() {
		return false;
	}

	function safeActiveElement() {
		try {
			return document.activeElement;
		} catch ( err ) { }
	}

	/*
	 * Helper functions for managing events -- not part of the public interface.
	 * Props to Dean Edwards' addEvent library for many of the ideas.
	 */
	jQuery.event = {

		global: {},

		add: function( elem, types, handler, data, selector ) {

			var handleObjIn, eventHandle, tmp,
				events, t, handleObj,
				special, handlers, type, namespaces, origType,
				elemData = data_priv.get( elem );

			// Don't attach events to noData or text/comment nodes (but allow plain objects)
			if ( !elemData ) {
				return;
			}

			// Caller can pass in an object of custom data in lieu of the handler
			if ( handler.handler ) {
				handleObjIn = handler;
				handler = handleObjIn.handler;
				selector = handleObjIn.selector;
			}

			// Make sure that the handler has a unique ID, used to find/remove it later
			if ( !handler.guid ) {
				handler.guid = jQuery.guid++;
			}

			// Init the element's event structure and main handler, if this is the first
			if ( !(events = elemData.events) ) {
				events = elemData.events = {};
			}
			if ( !(eventHandle = elemData.handle) ) {
				eventHandle = elemData.handle = function( e ) {
					// Discard the second event of a jQuery.event.trigger() and
					// when an event is called after a page has unloaded
					return typeof jQuery !== strundefined && jQuery.event.triggered !== e.type ?
						jQuery.event.dispatch.apply( elem, arguments ) : undefined;
				};
			}

			// Handle multiple events separated by a space
			types = ( types || "" ).match( rnotwhite ) || [ "" ];
			t = types.length;
			while ( t-- ) {
				tmp = rtypenamespace.exec( types[t] ) || [];
				type = origType = tmp[1];
				namespaces = ( tmp[2] || "" ).split( "." ).sort();

				// There *must* be a type, no attaching namespace-only handlers
				if ( !type ) {
					continue;
				}

				// If event changes its type, use the special event handlers for the changed type
				special = jQuery.event.special[ type ] || {};

				// If selector defined, determine special event api type, otherwise given type
				type = ( selector ? special.delegateType : special.bindType ) || type;

				// Update special based on newly reset type
				special = jQuery.event.special[ type ] || {};

				// handleObj is passed to all event handlers
				handleObj = jQuery.extend({
					type: type,
					origType: origType,
					data: data,
					handler: handler,
					guid: handler.guid,
					selector: selector,
					needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
					namespace: namespaces.join(".")
				}, handleObjIn );

				// Init the event handler queue if we're the first
				if ( !(handlers = events[ type ]) ) {
					handlers = events[ type ] = [];
					handlers.delegateCount = 0;

					// Only use addEventListener if the special events handler returns false
					if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
						if ( elem.addEventListener ) {
							elem.addEventListener( type, eventHandle, false );
						}
					}
				}

				if ( special.add ) {
					special.add.call( elem, handleObj );

					if ( !handleObj.handler.guid ) {
						handleObj.handler.guid = handler.guid;
					}
				}

				// Add to the element's handler list, delegates in front
				if ( selector ) {
					handlers.splice( handlers.delegateCount++, 0, handleObj );
				} else {
					handlers.push( handleObj );
				}

				// Keep track of which events have ever been used, for event optimization
				jQuery.event.global[ type ] = true;
			}

		},

		// Detach an event or set of events from an element
		remove: function( elem, types, handler, selector, mappedTypes ) {

			var j, origCount, tmp,
				events, t, handleObj,
				special, handlers, type, namespaces, origType,
				elemData = data_priv.hasData( elem ) && data_priv.get( elem );

			if ( !elemData || !(events = elemData.events) ) {
				return;
			}

			// Once for each type.namespace in types; type may be omitted
			types = ( types || "" ).match( rnotwhite ) || [ "" ];
			t = types.length;
			while ( t-- ) {
				tmp = rtypenamespace.exec( types[t] ) || [];
				type = origType = tmp[1];
				namespaces = ( tmp[2] || "" ).split( "." ).sort();

				// Unbind all events (on this namespace, if provided) for the element
				if ( !type ) {
					for ( type in events ) {
						jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
					}
					continue;
				}

				special = jQuery.event.special[ type ] || {};
				type = ( selector ? special.delegateType : special.bindType ) || type;
				handlers = events[ type ] || [];
				tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

				// Remove matching events
				origCount = j = handlers.length;
				while ( j-- ) {
					handleObj = handlers[ j ];

					if ( ( mappedTypes || origType === handleObj.origType ) &&
						( !handler || handler.guid === handleObj.guid ) &&
						( !tmp || tmp.test( handleObj.namespace ) ) &&
						( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
						handlers.splice( j, 1 );

						if ( handleObj.selector ) {
							handlers.delegateCount--;
						}
						if ( special.remove ) {
							special.remove.call( elem, handleObj );
						}
					}
				}

				// Remove generic event handler if we removed something and no more handlers exist
				// (avoids potential for endless recursion during removal of special event handlers)
				if ( origCount && !handlers.length ) {
					if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
						jQuery.removeEvent( elem, type, elemData.handle );
					}

					delete events[ type ];
				}
			}

			// Remove the expando if it's no longer used
			if ( jQuery.isEmptyObject( events ) ) {
				delete elemData.handle;
				data_priv.remove( elem, "events" );
			}
		},

		trigger: function( event, data, elem, onlyHandlers ) {

			var i, cur, tmp, bubbleType, ontype, handle, special,
				eventPath = [ elem || document ],
				type = hasOwn.call( event, "type" ) ? event.type : event,
				namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

			cur = tmp = elem = elem || document;

			// Don't do events on text and comment nodes
			if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
				return;
			}

			// focus/blur morphs to focusin/out; ensure we're not firing them right now
			if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
				return;
			}

			if ( type.indexOf(".") >= 0 ) {
				// Namespaced trigger; create a regexp to match event type in handle()
				namespaces = type.split(".");
				type = namespaces.shift();
				namespaces.sort();
			}
			ontype = type.indexOf(":") < 0 && "on" + type;

			// Caller can pass in a jQuery.Event object, Object, or just an event type string
			event = event[ jQuery.expando ] ?
				event :
				new jQuery.Event( type, typeof event === "object" && event );

			// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
			event.isTrigger = onlyHandlers ? 2 : 3;
			event.namespace = namespaces.join(".");
			event.namespace_re = event.namespace ?
				new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
				null;

			// Clean up the event in case it is being reused
			event.result = undefined;
			if ( !event.target ) {
				event.target = elem;
			}

			// Clone any incoming data and prepend the event, creating the handler arg list
			data = data == null ?
				[ event ] :
				jQuery.makeArray( data, [ event ] );

			// Allow special events to draw outside the lines
			special = jQuery.event.special[ type ] || {};
			if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
				return;
			}

			// Determine event propagation path in advance, per W3C events spec (#9951)
			// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
			if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

				bubbleType = special.delegateType || type;
				if ( !rfocusMorph.test( bubbleType + type ) ) {
					cur = cur.parentNode;
				}
				for ( ; cur; cur = cur.parentNode ) {
					eventPath.push( cur );
					tmp = cur;
				}

				// Only add window if we got to document (e.g., not plain obj or detached DOM)
				if ( tmp === (elem.ownerDocument || document) ) {
					eventPath.push( tmp.defaultView || tmp.parentWindow || window );
				}
			}

			// Fire handlers on the event path
			i = 0;
			while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

				event.type = i > 1 ?
					bubbleType :
					special.bindType || type;

				// jQuery handler
				handle = ( data_priv.get( cur, "events" ) || {} )[ event.type ] && data_priv.get( cur, "handle" );
				if ( handle ) {
					handle.apply( cur, data );
				}

				// Native handler
				handle = ontype && cur[ ontype ];
				if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
					event.result = handle.apply( cur, data );
					if ( event.result === false ) {
						event.preventDefault();
					}
				}
			}
			event.type = type;

			// If nobody prevented the default action, do it now
			if ( !onlyHandlers && !event.isDefaultPrevented() ) {

				if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
					jQuery.acceptData( elem ) ) {

					// Call a native DOM method on the target with the same name name as the event.
					// Don't do default actions on window, that's where global variables be (#6170)
					if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

						// Don't re-trigger an onFOO event when we call its FOO() method
						tmp = elem[ ontype ];

						if ( tmp ) {
							elem[ ontype ] = null;
						}

						// Prevent re-triggering of the same event, since we already bubbled it above
						jQuery.event.triggered = type;
						elem[ type ]();
						jQuery.event.triggered = undefined;

						if ( tmp ) {
							elem[ ontype ] = tmp;
						}
					}
				}
			}

			return event.result;
		},

		dispatch: function( event ) {

			// Make a writable jQuery.Event from the native event object
			event = jQuery.event.fix( event );

			var i, j, ret, matched, handleObj,
				handlerQueue = [],
				args = slice.call( arguments ),
				handlers = ( data_priv.get( this, "events" ) || {} )[ event.type ] || [],
				special = jQuery.event.special[ event.type ] || {};

			// Use the fix-ed jQuery.Event rather than the (read-only) native event
			args[0] = event;
			event.delegateTarget = this;

			// Call the preDispatch hook for the mapped type, and let it bail if desired
			if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
				return;
			}

			// Determine handlers
			handlerQueue = jQuery.event.handlers.call( this, event, handlers );

			// Run delegates first; they may want to stop propagation beneath us
			i = 0;
			while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
				event.currentTarget = matched.elem;

				j = 0;
				while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

					// Triggered event must either 1) have no namespace, or 2) have namespace(s)
					// a subset or equal to those in the bound event (both can have no namespace).
					if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

						event.handleObj = handleObj;
						event.data = handleObj.data;

						ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
								.apply( matched.elem, args );

						if ( ret !== undefined ) {
							if ( (event.result = ret) === false ) {
								event.preventDefault();
								event.stopPropagation();
							}
						}
					}
				}
			}

			// Call the postDispatch hook for the mapped type
			if ( special.postDispatch ) {
				special.postDispatch.call( this, event );
			}

			return event.result;
		},

		handlers: function( event, handlers ) {
			var i, matches, sel, handleObj,
				handlerQueue = [],
				delegateCount = handlers.delegateCount,
				cur = event.target;

			// Find delegate handlers
			// Black-hole SVG <use> instance trees (#13180)
			// Avoid non-left-click bubbling in Firefox (#3861)
			if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

				for ( ; cur !== this; cur = cur.parentNode || this ) {

					// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
					if ( cur.disabled !== true || event.type !== "click" ) {
						matches = [];
						for ( i = 0; i < delegateCount; i++ ) {
							handleObj = handlers[ i ];

							// Don't conflict with Object.prototype properties (#13203)
							sel = handleObj.selector + " ";

							if ( matches[ sel ] === undefined ) {
								matches[ sel ] = handleObj.needsContext ?
									jQuery( sel, this ).index( cur ) >= 0 :
									jQuery.find( sel, this, null, [ cur ] ).length;
							}
							if ( matches[ sel ] ) {
								matches.push( handleObj );
							}
						}
						if ( matches.length ) {
							handlerQueue.push({ elem: cur, handlers: matches });
						}
					}
				}
			}

			// Add the remaining (directly-bound) handlers
			if ( delegateCount < handlers.length ) {
				handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
			}

			return handlerQueue;
		},

		// Includes some event props shared by KeyEvent and MouseEvent
		props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

		fixHooks: {},

		keyHooks: {
			props: "char charCode key keyCode".split(" "),
			filter: function( event, original ) {

				// Add which for key events
				if ( event.which == null ) {
					event.which = original.charCode != null ? original.charCode : original.keyCode;
				}

				return event;
			}
		},

		mouseHooks: {
			props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
			filter: function( event, original ) {
				var eventDoc, doc, body,
					button = original.button;

				// Calculate pageX/Y if missing and clientX/Y available
				if ( event.pageX == null && original.clientX != null ) {
					eventDoc = event.target.ownerDocument || document;
					doc = eventDoc.documentElement;
					body = eventDoc.body;

					event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
					event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
				}

				// Add which for click: 1 === left; 2 === middle; 3 === right
				// Note: button is not normalized, so don't use it
				if ( !event.which && button !== undefined ) {
					event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
				}

				return event;
			}
		},

		fix: function( event ) {
			if ( event[ jQuery.expando ] ) {
				return event;
			}

			// Create a writable copy of the event object and normalize some properties
			var i, prop, copy,
				type = event.type,
				originalEvent = event,
				fixHook = this.fixHooks[ type ];

			if ( !fixHook ) {
				this.fixHooks[ type ] = fixHook =
					rmouseEvent.test( type ) ? this.mouseHooks :
					rkeyEvent.test( type ) ? this.keyHooks :
					{};
			}
			copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

			event = new jQuery.Event( originalEvent );

			i = copy.length;
			while ( i-- ) {
				prop = copy[ i ];
				event[ prop ] = originalEvent[ prop ];
			}

			// Support: Cordova 2.5 (WebKit) (#13255)
			// All events should have a target; Cordova deviceready doesn't
			if ( !event.target ) {
				event.target = document;
			}

			// Support: Safari 6.0+, Chrome<28
			// Target should not be a text node (#504, #13143)
			if ( event.target.nodeType === 3 ) {
				event.target = event.target.parentNode;
			}

			return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
		},

		special: {
			load: {
				// Prevent triggered image.load events from bubbling to window.load
				noBubble: true
			},
			focus: {
				// Fire native event if possible so blur/focus sequence is correct
				trigger: function() {
					if ( this !== safeActiveElement() && this.focus ) {
						this.focus();
						return false;
					}
				},
				delegateType: "focusin"
			},
			blur: {
				trigger: function() {
					if ( this === safeActiveElement() && this.blur ) {
						this.blur();
						return false;
					}
				},
				delegateType: "focusout"
			},
			click: {
				// For checkbox, fire native event so checked state will be right
				trigger: function() {
					if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
						this.click();
						return false;
					}
				},

				// For cross-browser consistency, don't fire native .click() on links
				_default: function( event ) {
					return jQuery.nodeName( event.target, "a" );
				}
			},

			beforeunload: {
				postDispatch: function( event ) {

					// Support: Firefox 20+
					// Firefox doesn't alert if the returnValue field is not set.
					if ( event.result !== undefined && event.originalEvent ) {
						event.originalEvent.returnValue = event.result;
					}
				}
			}
		},

		simulate: function( type, elem, event, bubble ) {
			// Piggyback on a donor event to simulate a different one.
			// Fake originalEvent to avoid donor's stopPropagation, but if the
			// simulated event prevents default then we do the same on the donor.
			var e = jQuery.extend(
				new jQuery.Event(),
				event,
				{
					type: type,
					isSimulated: true,
					originalEvent: {}
				}
			);
			if ( bubble ) {
				jQuery.event.trigger( e, null, elem );
			} else {
				jQuery.event.dispatch.call( elem, e );
			}
			if ( e.isDefaultPrevented() ) {
				event.preventDefault();
			}
		}
	};

	jQuery.removeEvent = function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	};

	jQuery.Event = function( src, props ) {
		// Allow instantiation without the 'new' keyword
		if ( !(this instanceof jQuery.Event) ) {
			return new jQuery.Event( src, props );
		}

		// Event object
		if ( src && src.type ) {
			this.originalEvent = src;
			this.type = src.type;

			// Events bubbling up the document may have been marked as prevented
			// by a handler lower down the tree; reflect the correct value.
			this.isDefaultPrevented = src.defaultPrevented ||
					src.defaultPrevented === undefined &&
					// Support: Android<4.0
					src.returnValue === false ?
				returnTrue :
				returnFalse;

		// Event type
		} else {
			this.type = src;
		}

		// Put explicitly provided properties onto the event object
		if ( props ) {
			jQuery.extend( this, props );
		}

		// Create a timestamp if incoming event doesn't have one
		this.timeStamp = src && src.timeStamp || jQuery.now();

		// Mark it as fixed
		this[ jQuery.expando ] = true;
	};

	// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
	// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
	jQuery.Event.prototype = {
		isDefaultPrevented: returnFalse,
		isPropagationStopped: returnFalse,
		isImmediatePropagationStopped: returnFalse,

		preventDefault: function() {
			var e = this.originalEvent;

			this.isDefaultPrevented = returnTrue;

			if ( e && e.preventDefault ) {
				e.preventDefault();
			}
		},
		stopPropagation: function() {
			var e = this.originalEvent;

			this.isPropagationStopped = returnTrue;

			if ( e && e.stopPropagation ) {
				e.stopPropagation();
			}
		},
		stopImmediatePropagation: function() {
			var e = this.originalEvent;

			this.isImmediatePropagationStopped = returnTrue;

			if ( e && e.stopImmediatePropagation ) {
				e.stopImmediatePropagation();
			}

			this.stopPropagation();
		}
	};

	// Create mouseenter/leave events using mouseover/out and event-time checks
	// Support: Chrome 15+
	jQuery.each({
		mouseenter: "mouseover",
		mouseleave: "mouseout",
		pointerenter: "pointerover",
		pointerleave: "pointerout"
	}, function( orig, fix ) {
		jQuery.event.special[ orig ] = {
			delegateType: fix,
			bindType: fix,

			handle: function( event ) {
				var ret,
					target = this,
					related = event.relatedTarget,
					handleObj = event.handleObj;

				// For mousenter/leave call the handler if related is outside the target.
				// NB: No relatedTarget if the mouse left/entered the browser window
				if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
					event.type = handleObj.origType;
					ret = handleObj.handler.apply( this, arguments );
					event.type = fix;
				}
				return ret;
			}
		};
	});

	// Support: Firefox, Chrome, Safari
	// Create "bubbling" focus and blur events
	if ( !support.focusinBubbles ) {
		jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

			// Attach a single capturing handler on the document while someone wants focusin/focusout
			var handler = function( event ) {
					jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
				};

			jQuery.event.special[ fix ] = {
				setup: function() {
					var doc = this.ownerDocument || this,
						attaches = data_priv.access( doc, fix );

					if ( !attaches ) {
						doc.addEventListener( orig, handler, true );
					}
					data_priv.access( doc, fix, ( attaches || 0 ) + 1 );
				},
				teardown: function() {
					var doc = this.ownerDocument || this,
						attaches = data_priv.access( doc, fix ) - 1;

					if ( !attaches ) {
						doc.removeEventListener( orig, handler, true );
						data_priv.remove( doc, fix );

					} else {
						data_priv.access( doc, fix, attaches );
					}
				}
			};
		});
	}

	jQuery.fn.extend({

		on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
			var origFn, type;

			// Types can be a map of types/handlers
			if ( typeof types === "object" ) {
				// ( types-Object, selector, data )
				if ( typeof selector !== "string" ) {
					// ( types-Object, data )
					data = data || selector;
					selector = undefined;
				}
				for ( type in types ) {
					this.on( type, selector, data, types[ type ], one );
				}
				return this;
			}

			if ( data == null && fn == null ) {
				// ( types, fn )
				fn = selector;
				data = selector = undefined;
			} else if ( fn == null ) {
				if ( typeof selector === "string" ) {
					// ( types, selector, fn )
					fn = data;
					data = undefined;
				} else {
					// ( types, data, fn )
					fn = data;
					data = selector;
					selector = undefined;
				}
			}
			if ( fn === false ) {
				fn = returnFalse;
			} else if ( !fn ) {
				return this;
			}

			if ( one === 1 ) {
				origFn = fn;
				fn = function( event ) {
					// Can use an empty set, since event contains the info
					jQuery().off( event );
					return origFn.apply( this, arguments );
				};
				// Use same guid so caller can remove using origFn
				fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
			}
			return this.each( function() {
				jQuery.event.add( this, types, fn, data, selector );
			});
		},
		one: function( types, selector, data, fn ) {
			return this.on( types, selector, data, fn, 1 );
		},
		off: function( types, selector, fn ) {
			var handleObj, type;
			if ( types && types.preventDefault && types.handleObj ) {
				// ( event )  dispatched jQuery.Event
				handleObj = types.handleObj;
				jQuery( types.delegateTarget ).off(
					handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
					handleObj.selector,
					handleObj.handler
				);
				return this;
			}
			if ( typeof types === "object" ) {
				// ( types-object [, selector] )
				for ( type in types ) {
					this.off( type, selector, types[ type ] );
				}
				return this;
			}
			if ( selector === false || typeof selector === "function" ) {
				// ( types [, fn] )
				fn = selector;
				selector = undefined;
			}
			if ( fn === false ) {
				fn = returnFalse;
			}
			return this.each(function() {
				jQuery.event.remove( this, types, fn, selector );
			});
		},

		trigger: function( type, data ) {
			return this.each(function() {
				jQuery.event.trigger( type, data, this );
			});
		},
		triggerHandler: function( type, data ) {
			var elem = this[0];
			if ( elem ) {
				return jQuery.event.trigger( type, data, elem, true );
			}
		}
	});


	var
		rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
		rtagName = /<([\w:]+)/,
		rhtml = /<|&#?\w+;/,
		rnoInnerhtml = /<(?:script|style|link)/i,
		// checked="checked" or checked
		rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
		rscriptType = /^$|\/(?:java|ecma)script/i,
		rscriptTypeMasked = /^true\/(.*)/,
		rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

		// We have to close these tags to support XHTML (#13200)
		wrapMap = {

			// Support: IE9
			option: [ 1, "<select multiple='multiple'>", "</select>" ],

			thead: [ 1, "<table>", "</table>" ],
			col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
			tr: [ 2, "<table><tbody>", "</tbody></table>" ],
			td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

			_default: [ 0, "", "" ]
		};

	// Support: IE9
	wrapMap.optgroup = wrapMap.option;

	wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
	wrapMap.th = wrapMap.td;

	// Support: 1.x compatibility
	// Manipulating tables requires a tbody
	function manipulationTarget( elem, content ) {
		return jQuery.nodeName( elem, "table" ) &&
			jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

			elem.getElementsByTagName("tbody")[0] ||
				elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
			elem;
	}

	// Replace/restore the type attribute of script elements for safe DOM manipulation
	function disableScript( elem ) {
		elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
		return elem;
	}
	function restoreScript( elem ) {
		var match = rscriptTypeMasked.exec( elem.type );

		if ( match ) {
			elem.type = match[ 1 ];
		} else {
			elem.removeAttribute("type");
		}

		return elem;
	}

	// Mark scripts as having already been evaluated
	function setGlobalEval( elems, refElements ) {
		var i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			data_priv.set(
				elems[ i ], "globalEval", !refElements || data_priv.get( refElements[ i ], "globalEval" )
			);
		}
	}

	function cloneCopyEvent( src, dest ) {
		var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

		if ( dest.nodeType !== 1 ) {
			return;
		}

		// 1. Copy private data: events, handlers, etc.
		if ( data_priv.hasData( src ) ) {
			pdataOld = data_priv.access( src );
			pdataCur = data_priv.set( dest, pdataOld );
			events = pdataOld.events;

			if ( events ) {
				delete pdataCur.handle;
				pdataCur.events = {};

				for ( type in events ) {
					for ( i = 0, l = events[ type ].length; i < l; i++ ) {
						jQuery.event.add( dest, type, events[ type ][ i ] );
					}
				}
			}
		}

		// 2. Copy user data
		if ( data_user.hasData( src ) ) {
			udataOld = data_user.access( src );
			udataCur = jQuery.extend( {}, udataOld );

			data_user.set( dest, udataCur );
		}
	}

	function getAll( context, tag ) {
		var ret = context.getElementsByTagName ? context.getElementsByTagName( tag || "*" ) :
				context.querySelectorAll ? context.querySelectorAll( tag || "*" ) :
				[];

		return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
			jQuery.merge( [ context ], ret ) :
			ret;
	}

	// Fix IE bugs, see support tests
	function fixInput( src, dest ) {
		var nodeName = dest.nodeName.toLowerCase();

		// Fails to persist the checked state of a cloned checkbox or radio button.
		if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
			dest.checked = src.checked;

		// Fails to return the selected option to the default selected state when cloning options
		} else if ( nodeName === "input" || nodeName === "textarea" ) {
			dest.defaultValue = src.defaultValue;
		}
	}

	jQuery.extend({
		clone: function( elem, dataAndEvents, deepDataAndEvents ) {
			var i, l, srcElements, destElements,
				clone = elem.cloneNode( true ),
				inPage = jQuery.contains( elem.ownerDocument, elem );

			// Fix IE cloning issues
			if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
					!jQuery.isXMLDoc( elem ) ) {

				// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
				destElements = getAll( clone );
				srcElements = getAll( elem );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					fixInput( srcElements[ i ], destElements[ i ] );
				}
			}

			// Copy the events from the original to the clone
			if ( dataAndEvents ) {
				if ( deepDataAndEvents ) {
					srcElements = srcElements || getAll( elem );
					destElements = destElements || getAll( clone );

					for ( i = 0, l = srcElements.length; i < l; i++ ) {
						cloneCopyEvent( srcElements[ i ], destElements[ i ] );
					}
				} else {
					cloneCopyEvent( elem, clone );
				}
			}

			// Preserve script evaluation history
			destElements = getAll( clone, "script" );
			if ( destElements.length > 0 ) {
				setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
			}

			// Return the cloned set
			return clone;
		},

		buildFragment: function( elems, context, scripts, selection ) {
			var elem, tmp, tag, wrap, contains, j,
				fragment = context.createDocumentFragment(),
				nodes = [],
				i = 0,
				l = elems.length;

			for ( ; i < l; i++ ) {
				elem = elems[ i ];

				if ( elem || elem === 0 ) {

					// Add nodes directly
					if ( jQuery.type( elem ) === "object" ) {
						// Support: QtWebKit, PhantomJS
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

					// Convert non-html into a text node
					} else if ( !rhtml.test( elem ) ) {
						nodes.push( context.createTextNode( elem ) );

					// Convert html into DOM nodes
					} else {
						tmp = tmp || fragment.appendChild( context.createElement("div") );

						// Deserialize a standard representation
						tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
						wrap = wrapMap[ tag ] || wrapMap._default;
						tmp.innerHTML = wrap[ 1 ] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[ 2 ];

						// Descend through wrappers to the right content
						j = wrap[ 0 ];
						while ( j-- ) {
							tmp = tmp.lastChild;
						}

						// Support: QtWebKit, PhantomJS
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( nodes, tmp.childNodes );

						// Remember the top-level container
						tmp = fragment.firstChild;

						// Ensure the created nodes are orphaned (#12392)
						tmp.textContent = "";
					}
				}
			}

			// Remove wrapper from fragment
			fragment.textContent = "";

			i = 0;
			while ( (elem = nodes[ i++ ]) ) {

				// #4087 - If origin and destination elements are the same, and this is
				// that element, do not do anything
				if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
					continue;
				}

				contains = jQuery.contains( elem.ownerDocument, elem );

				// Append to fragment
				tmp = getAll( fragment.appendChild( elem ), "script" );

				// Preserve script evaluation history
				if ( contains ) {
					setGlobalEval( tmp );
				}

				// Capture executables
				if ( scripts ) {
					j = 0;
					while ( (elem = tmp[ j++ ]) ) {
						if ( rscriptType.test( elem.type || "" ) ) {
							scripts.push( elem );
						}
					}
				}
			}

			return fragment;
		},

		cleanData: function( elems ) {
			var data, elem, type, key,
				special = jQuery.event.special,
				i = 0;

			for ( ; (elem = elems[ i ]) !== undefined; i++ ) {
				if ( jQuery.acceptData( elem ) ) {
					key = elem[ data_priv.expando ];

					if ( key && (data = data_priv.cache[ key ]) ) {
						if ( data.events ) {
							for ( type in data.events ) {
								if ( special[ type ] ) {
									jQuery.event.remove( elem, type );

								// This is a shortcut to avoid jQuery.event.remove's overhead
								} else {
									jQuery.removeEvent( elem, type, data.handle );
								}
							}
						}
						if ( data_priv.cache[ key ] ) {
							// Discard any remaining `private` data
							delete data_priv.cache[ key ];
						}
					}
				}
				// Discard any remaining `user` data
				delete data_user.cache[ elem[ data_user.expando ] ];
			}
		}
	});

	jQuery.fn.extend({
		text: function( value ) {
			return access( this, function( value ) {
				return value === undefined ?
					jQuery.text( this ) :
					this.empty().each(function() {
						if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
							this.textContent = value;
						}
					});
			}, null, value, arguments.length );
		},

		append: function() {
			return this.domManip( arguments, function( elem ) {
				if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
					var target = manipulationTarget( this, elem );
					target.appendChild( elem );
				}
			});
		},

		prepend: function() {
			return this.domManip( arguments, function( elem ) {
				if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
					var target = manipulationTarget( this, elem );
					target.insertBefore( elem, target.firstChild );
				}
			});
		},

		before: function() {
			return this.domManip( arguments, function( elem ) {
				if ( this.parentNode ) {
					this.parentNode.insertBefore( elem, this );
				}
			});
		},

		after: function() {
			return this.domManip( arguments, function( elem ) {
				if ( this.parentNode ) {
					this.parentNode.insertBefore( elem, this.nextSibling );
				}
			});
		},

		remove: function( selector, keepData /* Internal Use Only */ ) {
			var elem,
				elems = selector ? jQuery.filter( selector, this ) : this,
				i = 0;

			for ( ; (elem = elems[i]) != null; i++ ) {
				if ( !keepData && elem.nodeType === 1 ) {
					jQuery.cleanData( getAll( elem ) );
				}

				if ( elem.parentNode ) {
					if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
						setGlobalEval( getAll( elem, "script" ) );
					}
					elem.parentNode.removeChild( elem );
				}
			}

			return this;
		},

		empty: function() {
			var elem,
				i = 0;

			for ( ; (elem = this[i]) != null; i++ ) {
				if ( elem.nodeType === 1 ) {

					// Prevent memory leaks
					jQuery.cleanData( getAll( elem, false ) );

					// Remove any remaining nodes
					elem.textContent = "";
				}
			}

			return this;
		},

		clone: function( dataAndEvents, deepDataAndEvents ) {
			dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
			deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

			return this.map(function() {
				return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
			});
		},

		html: function( value ) {
			return access( this, function( value ) {
				var elem = this[ 0 ] || {},
					i = 0,
					l = this.length;

				if ( value === undefined && elem.nodeType === 1 ) {
					return elem.innerHTML;
				}

				// See if we can take a shortcut and just use innerHTML
				if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
					!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

					value = value.replace( rxhtmlTag, "<$1></$2>" );

					try {
						for ( ; i < l; i++ ) {
							elem = this[ i ] || {};

							// Remove element nodes and prevent memory leaks
							if ( elem.nodeType === 1 ) {
								jQuery.cleanData( getAll( elem, false ) );
								elem.innerHTML = value;
							}
						}

						elem = 0;

					// If using innerHTML throws an exception, use the fallback method
					} catch( e ) {}
				}

				if ( elem ) {
					this.empty().append( value );
				}
			}, null, value, arguments.length );
		},

		replaceWith: function() {
			var arg = arguments[ 0 ];

			// Make the changes, replacing each context element with the new content
			this.domManip( arguments, function( elem ) {
				arg = this.parentNode;

				jQuery.cleanData( getAll( this ) );

				if ( arg ) {
					arg.replaceChild( elem, this );
				}
			});

			// Force removal if there was no new content (e.g., from empty arguments)
			return arg && (arg.length || arg.nodeType) ? this : this.remove();
		},

		detach: function( selector ) {
			return this.remove( selector, true );
		},

		domManip: function( args, callback ) {

			// Flatten any nested arrays
			args = concat.apply( [], args );

			var fragment, first, scripts, hasScripts, node, doc,
				i = 0,
				l = this.length,
				set = this,
				iNoClone = l - 1,
				value = args[ 0 ],
				isFunction = jQuery.isFunction( value );

			// We can't cloneNode fragments that contain checked, in WebKit
			if ( isFunction ||
					( l > 1 && typeof value === "string" &&
						!support.checkClone && rchecked.test( value ) ) ) {
				return this.each(function( index ) {
					var self = set.eq( index );
					if ( isFunction ) {
						args[ 0 ] = value.call( this, index, self.html() );
					}
					self.domManip( args, callback );
				});
			}

			if ( l ) {
				fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
				first = fragment.firstChild;

				if ( fragment.childNodes.length === 1 ) {
					fragment = first;
				}

				if ( first ) {
					scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
					hasScripts = scripts.length;

					// Use the original fragment for the last item instead of the first because it can end up
					// being emptied incorrectly in certain situations (#8070).
					for ( ; i < l; i++ ) {
						node = fragment;

						if ( i !== iNoClone ) {
							node = jQuery.clone( node, true, true );

							// Keep references to cloned scripts for later restoration
							if ( hasScripts ) {
								// Support: QtWebKit
								// jQuery.merge because push.apply(_, arraylike) throws
								jQuery.merge( scripts, getAll( node, "script" ) );
							}
						}

						callback.call( this[ i ], node, i );
					}

					if ( hasScripts ) {
						doc = scripts[ scripts.length - 1 ].ownerDocument;

						// Reenable scripts
						jQuery.map( scripts, restoreScript );

						// Evaluate executable scripts on first document insertion
						for ( i = 0; i < hasScripts; i++ ) {
							node = scripts[ i ];
							if ( rscriptType.test( node.type || "" ) &&
								!data_priv.access( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

								if ( node.src ) {
									// Optional AJAX dependency, but won't run scripts if not present
									if ( jQuery._evalUrl ) {
										jQuery._evalUrl( node.src );
									}
								} else {
									jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
								}
							}
						}
					}
				}
			}

			return this;
		}
	});

	jQuery.each({
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function( name, original ) {
		jQuery.fn[ name ] = function( selector ) {
			var elems,
				ret = [],
				insert = jQuery( selector ),
				last = insert.length - 1,
				i = 0;

			for ( ; i <= last; i++ ) {
				elems = i === last ? this : this.clone( true );
				jQuery( insert[ i ] )[ original ]( elems );

				// Support: QtWebKit
				// .get() because push.apply(_, arraylike) throws
				push.apply( ret, elems.get() );
			}

			return this.pushStack( ret );
		};
	});


	var iframe,
		elemdisplay = {};

	/**
	 * Retrieve the actual display of a element
	 * @param {String} name nodeName of the element
	 * @param {Object} doc Document object
	 */
	// Called only from within defaultDisplay
	function actualDisplay( name, doc ) {
		var style,
			elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

			// getDefaultComputedStyle might be reliably used only on attached element
			display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

				// Use of this method is a temporary fix (more like optimization) until something better comes along,
				// since it was removed from specification and supported only in FF
				style.display : jQuery.css( elem[ 0 ], "display" );

		// We don't have any data stored on the element,
		// so use "detach" method as fast way to get rid of the element
		elem.detach();

		return display;
	}

	/**
	 * Try to determine the default display value of an element
	 * @param {String} nodeName
	 */
	function defaultDisplay( nodeName ) {
		var doc = document,
			display = elemdisplay[ nodeName ];

		if ( !display ) {
			display = actualDisplay( nodeName, doc );

			// If the simple way fails, read from inside an iframe
			if ( display === "none" || !display ) {

				// Use the already-created iframe if possible
				iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

				// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
				doc = iframe[ 0 ].contentDocument;

				// Support: IE
				doc.write();
				doc.close();

				display = actualDisplay( nodeName, doc );
				iframe.detach();
			}

			// Store the correct default display
			elemdisplay[ nodeName ] = display;
		}

		return display;
	}
	var rmargin = (/^margin/);

	var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

	var getStyles = function( elem ) {
			// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
			// IE throws on elements created in popups
			// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
			if ( elem.ownerDocument.defaultView.opener ) {
				return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
			}

			return window.getComputedStyle( elem, null );
		};



	function curCSS( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// Support: IE9
		// getPropertyValue is only needed for .css('filter') (#12537)
		if ( computed ) {
			ret = computed.getPropertyValue( name ) || computed[ name ];
		}

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// Support: iOS < 6
			// A tribute to the "awesome hack by Dean Edwards"
			// iOS < 6 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		return ret !== undefined ?
			// Support: IE
			// IE returns zIndex value as an integer.
			ret + "" :
			ret;
	}


	function addGetHookIf( conditionFn, hookFn ) {
		// Define the hook, we'll check on the first run if it's really needed.
		return {
			get: function() {
				if ( conditionFn() ) {
					// Hook not needed (or it's not possible to use it due
					// to missing dependency), remove it.
					delete this.get;
					return;
				}

				// Hook needed; redefine it so that the support test is not executed again.
				return (this.get = hookFn).apply( this, arguments );
			}
		};
	}


	(function() {
		var pixelPositionVal, boxSizingReliableVal,
			docElem = document.documentElement,
			container = document.createElement( "div" ),
			div = document.createElement( "div" );

		if ( !div.style ) {
			return;
		}

		// Support: IE9-11+
		// Style of cloned element affects source element cloned (#8908)
		div.style.backgroundClip = "content-box";
		div.cloneNode( true ).style.backgroundClip = "";
		support.clearCloneStyle = div.style.backgroundClip === "content-box";

		container.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;" +
			"position:absolute";
		container.appendChild( div );

		// Executing both pixelPosition & boxSizingReliable tests require only one layout
		// so they're executed at the same time to save the second computation.
		function computePixelPositionAndBoxSizingReliable() {
			div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
				"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
				"border:1px;padding:1px;width:4px;position:absolute";
			div.innerHTML = "";
			docElem.appendChild( container );

			var divStyle = window.getComputedStyle( div, null );
			pixelPositionVal = divStyle.top !== "1%";
			boxSizingReliableVal = divStyle.width === "4px";

			docElem.removeChild( container );
		}

		// Support: node.js jsdom
		// Don't assume that getComputedStyle is a property of the global object
		if ( window.getComputedStyle ) {
			jQuery.extend( support, {
				pixelPosition: function() {

					// This test is executed only once but we still do memoizing
					// since we can use the boxSizingReliable pre-computing.
					// No need to check if the test was already performed, though.
					computePixelPositionAndBoxSizingReliable();
					return pixelPositionVal;
				},
				boxSizingReliable: function() {
					if ( boxSizingReliableVal == null ) {
						computePixelPositionAndBoxSizingReliable();
					}
					return boxSizingReliableVal;
				},
				reliableMarginRight: function() {

					// Support: Android 2.3
					// Check if div with explicit width and no margin-right incorrectly
					// gets computed margin-right based on width of container. (#3333)
					// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
					// This support function is only executed once so no memoizing is needed.
					var ret,
						marginDiv = div.appendChild( document.createElement( "div" ) );

					// Reset CSS: box-sizing; display; margin; border; padding
					marginDiv.style.cssText = div.style.cssText =
						// Support: Firefox<29, Android 2.3
						// Vendor-prefix box-sizing
						"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
						"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
					marginDiv.style.marginRight = marginDiv.style.width = "0";
					div.style.width = "1px";
					docElem.appendChild( container );

					ret = !parseFloat( window.getComputedStyle( marginDiv, null ).marginRight );

					docElem.removeChild( container );
					div.removeChild( marginDiv );

					return ret;
				}
			});
		}
	})();


	// A method for quickly swapping in/out CSS properties to get correct calculations.
	jQuery.swap = function( elem, options, callback, args ) {
		var ret, name,
			old = {};

		// Remember the old values, and insert the new ones
		for ( name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}

		ret = callback.apply( elem, args || [] );

		// Revert the old values
		for ( name in options ) {
			elem.style[ name ] = old[ name ];
		}

		return ret;
	};


	var
		// Swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
		// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
		rdisplayswap = /^(none|table(?!-c[ea]).+)/,
		rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
		rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

		cssShow = { position: "absolute", visibility: "hidden", display: "block" },
		cssNormalTransform = {
			letterSpacing: "0",
			fontWeight: "400"
		},

		cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];

	// Return a css property mapped to a potentially vendor prefixed property
	function vendorPropName( style, name ) {

		// Shortcut for names that are not vendor prefixed
		if ( name in style ) {
			return name;
		}

		// Check for vendor prefixed names
		var capName = name[0].toUpperCase() + name.slice(1),
			origName = name,
			i = cssPrefixes.length;

		while ( i-- ) {
			name = cssPrefixes[ i ] + capName;
			if ( name in style ) {
				return name;
			}
		}

		return origName;
	}

	function setPositiveNumber( elem, value, subtract ) {
		var matches = rnumsplit.exec( value );
		return matches ?
			// Guard against undefined "subtract", e.g., when used as in cssHooks
			Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
			value;
	}

	function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
		var i = extra === ( isBorderBox ? "border" : "content" ) ?
			// If we already have the right measurement, avoid augmentation
			4 :
			// Otherwise initialize for horizontal or vertical properties
			name === "width" ? 1 : 0,

			val = 0;

		for ( ; i < 4; i += 2 ) {
			// Both box models exclude margin, so add it if we want it
			if ( extra === "margin" ) {
				val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
			}

			if ( isBorderBox ) {
				// border-box includes padding, so remove it if we want content
				if ( extra === "content" ) {
					val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
				}

				// At this point, extra isn't border nor margin, so remove border
				if ( extra !== "margin" ) {
					val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
				}
			} else {
				// At this point, extra isn't content, so add padding
				val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

				// At this point, extra isn't content nor padding, so add border
				if ( extra !== "padding" ) {
					val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
				}
			}
		}

		return val;
	}

	function getWidthOrHeight( elem, name, extra ) {

		// Start with offset property, which is equivalent to the border-box value
		var valueIsBorderBox = true,
			val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
			styles = getStyles( elem ),
			isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

		// Some non-html elements return undefined for offsetWidth, so check for null/undefined
		// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
		// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
		if ( val <= 0 || val == null ) {
			// Fall back to computed then uncomputed css if necessary
			val = curCSS( elem, name, styles );
			if ( val < 0 || val == null ) {
				val = elem.style[ name ];
			}

			// Computed unit is not pixels. Stop here and return.
			if ( rnumnonpx.test(val) ) {
				return val;
			}

			// Check for style in case a browser which returns unreliable values
			// for getComputedStyle silently falls back to the reliable elem.style
			valueIsBorderBox = isBorderBox &&
				( support.boxSizingReliable() || val === elem.style[ name ] );

			// Normalize "", auto, and prepare for extra
			val = parseFloat( val ) || 0;
		}

		// Use the active box-sizing model to add/subtract irrelevant styles
		return ( val +
			augmentWidthOrHeight(
				elem,
				name,
				extra || ( isBorderBox ? "border" : "content" ),
				valueIsBorderBox,
				styles
			)
		) + "px";
	}

	function showHide( elements, show ) {
		var display, elem, hidden,
			values = [],
			index = 0,
			length = elements.length;

		for ( ; index < length; index++ ) {
			elem = elements[ index ];
			if ( !elem.style ) {
				continue;
			}

			values[ index ] = data_priv.get( elem, "olddisplay" );
			display = elem.style.display;
			if ( show ) {
				// Reset the inline display of this element to learn if it is
				// being hidden by cascaded rules or not
				if ( !values[ index ] && display === "none" ) {
					elem.style.display = "";
				}

				// Set elements which have been overridden with display: none
				// in a stylesheet to whatever the default browser style is
				// for such an element
				if ( elem.style.display === "" && isHidden( elem ) ) {
					values[ index ] = data_priv.access( elem, "olddisplay", defaultDisplay(elem.nodeName) );
				}
			} else {
				hidden = isHidden( elem );

				if ( display !== "none" || !hidden ) {
					data_priv.set( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
				}
			}
		}

		// Set the display of most of the elements in a second loop
		// to avoid the constant reflow
		for ( index = 0; index < length; index++ ) {
			elem = elements[ index ];
			if ( !elem.style ) {
				continue;
			}
			if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
				elem.style.display = show ? values[ index ] || "" : "none";
			}
		}

		return elements;
	}

	jQuery.extend({

		// Add in style property hooks for overriding the default
		// behavior of getting and setting a style property
		cssHooks: {
			opacity: {
				get: function( elem, computed ) {
					if ( computed ) {

						// We should always get a number back from opacity
						var ret = curCSS( elem, "opacity" );
						return ret === "" ? "1" : ret;
					}
				}
			}
		},

		// Don't automatically add "px" to these possibly-unitless properties
		cssNumber: {
			"columnCount": true,
			"fillOpacity": true,
			"flexGrow": true,
			"flexShrink": true,
			"fontWeight": true,
			"lineHeight": true,
			"opacity": true,
			"order": true,
			"orphans": true,
			"widows": true,
			"zIndex": true,
			"zoom": true
		},

		// Add in properties whose names you wish to fix before
		// setting or getting the value
		cssProps: {
			"float": "cssFloat"
		},

		// Get and set the style property on a DOM Node
		style: function( elem, name, value, extra ) {

			// Don't set styles on text and comment nodes
			if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
				return;
			}

			// Make sure that we're working with the right name
			var ret, type, hooks,
				origName = jQuery.camelCase( name ),
				style = elem.style;

			name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

			// Gets hook for the prefixed version, then unprefixed version
			hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

			// Check if we're setting a value
			if ( value !== undefined ) {
				type = typeof value;

				// Convert "+=" or "-=" to relative numbers (#7345)
				if ( type === "string" && (ret = rrelNum.exec( value )) ) {
					value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
					// Fixes bug #9237
					type = "number";
				}

				// Make sure that null and NaN values aren't set (#7116)
				if ( value == null || value !== value ) {
					return;
				}

				// If a number, add 'px' to the (except for certain CSS properties)
				if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
					value += "px";
				}

				// Support: IE9-11+
				// background-* props affect original clone's values
				if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
					style[ name ] = "inherit";
				}

				// If a hook was provided, use that value, otherwise just set the specified value
				if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {
					style[ name ] = value;
				}

			} else {
				// If a hook was provided get the non-computed value from there
				if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
					return ret;
				}

				// Otherwise just get the value from the style object
				return style[ name ];
			}
		},

		css: function( elem, name, extra, styles ) {
			var val, num, hooks,
				origName = jQuery.camelCase( name );

			// Make sure that we're working with the right name
			name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

			// Try prefixed name followed by the unprefixed name
			hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

			// If a hook was provided get the computed value from there
			if ( hooks && "get" in hooks ) {
				val = hooks.get( elem, true, extra );
			}

			// Otherwise, if a way to get the computed value exists, use that
			if ( val === undefined ) {
				val = curCSS( elem, name, styles );
			}

			// Convert "normal" to computed value
			if ( val === "normal" && name in cssNormalTransform ) {
				val = cssNormalTransform[ name ];
			}

			// Make numeric if forced or a qualifier was provided and val looks numeric
			if ( extra === "" || extra ) {
				num = parseFloat( val );
				return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
			}
			return val;
		}
	});

	jQuery.each([ "height", "width" ], function( i, name ) {
		jQuery.cssHooks[ name ] = {
			get: function( elem, computed, extra ) {
				if ( computed ) {

					// Certain elements can have dimension info if we invisibly show them
					// but it must have a current display style that would benefit
					return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
						jQuery.swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						}) :
						getWidthOrHeight( elem, name, extra );
				}
			},

			set: function( elem, value, extra ) {
				var styles = extra && getStyles( elem );
				return setPositiveNumber( elem, value, extra ?
					augmentWidthOrHeight(
						elem,
						name,
						extra,
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
						styles
					) : 0
				);
			}
		};
	});

	// Support: Android 2.3
	jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
		function( elem, computed ) {
			if ( computed ) {
				return jQuery.swap( elem, { "display": "inline-block" },
					curCSS, [ elem, "marginRight" ] );
			}
		}
	);

	// These hooks are used by animate to expand properties
	jQuery.each({
		margin: "",
		padding: "",
		border: "Width"
	}, function( prefix, suffix ) {
		jQuery.cssHooks[ prefix + suffix ] = {
			expand: function( value ) {
				var i = 0,
					expanded = {},

					// Assumes a single number if not a string
					parts = typeof value === "string" ? value.split(" ") : [ value ];

				for ( ; i < 4; i++ ) {
					expanded[ prefix + cssExpand[ i ] + suffix ] =
						parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
				}

				return expanded;
			}
		};

		if ( !rmargin.test( prefix ) ) {
			jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
		}
	});

	jQuery.fn.extend({
		css: function( name, value ) {
			return access( this, function( elem, name, value ) {
				var styles, len,
					map = {},
					i = 0;

				if ( jQuery.isArray( name ) ) {
					styles = getStyles( elem );
					len = name.length;

					for ( ; i < len; i++ ) {
						map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
					}

					return map;
				}

				return value !== undefined ?
					jQuery.style( elem, name, value ) :
					jQuery.css( elem, name );
			}, name, value, arguments.length > 1 );
		},
		show: function() {
			return showHide( this, true );
		},
		hide: function() {
			return showHide( this );
		},
		toggle: function( state ) {
			if ( typeof state === "boolean" ) {
				return state ? this.show() : this.hide();
			}

			return this.each(function() {
				if ( isHidden( this ) ) {
					jQuery( this ).show();
				} else {
					jQuery( this ).hide();
				}
			});
		}
	});


	function Tween( elem, options, prop, end, easing ) {
		return new Tween.prototype.init( elem, options, prop, end, easing );
	}
	jQuery.Tween = Tween;

	Tween.prototype = {
		constructor: Tween,
		init: function( elem, options, prop, end, easing, unit ) {
			this.elem = elem;
			this.prop = prop;
			this.easing = easing || "swing";
			this.options = options;
			this.start = this.now = this.cur();
			this.end = end;
			this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
		},
		cur: function() {
			var hooks = Tween.propHooks[ this.prop ];

			return hooks && hooks.get ?
				hooks.get( this ) :
				Tween.propHooks._default.get( this );
		},
		run: function( percent ) {
			var eased,
				hooks = Tween.propHooks[ this.prop ];

			if ( this.options.duration ) {
				this.pos = eased = jQuery.easing[ this.easing ](
					percent, this.options.duration * percent, 0, 1, this.options.duration
				);
			} else {
				this.pos = eased = percent;
			}
			this.now = ( this.end - this.start ) * eased + this.start;

			if ( this.options.step ) {
				this.options.step.call( this.elem, this.now, this );
			}

			if ( hooks && hooks.set ) {
				hooks.set( this );
			} else {
				Tween.propHooks._default.set( this );
			}
			return this;
		}
	};

	Tween.prototype.init.prototype = Tween.prototype;

	Tween.propHooks = {
		_default: {
			get: function( tween ) {
				var result;

				if ( tween.elem[ tween.prop ] != null &&
					(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
					return tween.elem[ tween.prop ];
				}

				// Passing an empty string as a 3rd parameter to .css will automatically
				// attempt a parseFloat and fallback to a string if the parse fails.
				// Simple values such as "10px" are parsed to Float;
				// complex values such as "rotate(1rad)" are returned as-is.
				result = jQuery.css( tween.elem, tween.prop, "" );
				// Empty strings, null, undefined and "auto" are converted to 0.
				return !result || result === "auto" ? 0 : result;
			},
			set: function( tween ) {
				// Use step hook for back compat.
				// Use cssHook if its there.
				// Use .style if available and use plain properties where available.
				if ( jQuery.fx.step[ tween.prop ] ) {
					jQuery.fx.step[ tween.prop ]( tween );
				} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
					jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
				} else {
					tween.elem[ tween.prop ] = tween.now;
				}
			}
		}
	};

	// Support: IE9
	// Panic based approach to setting things on disconnected nodes
	Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
		set: function( tween ) {
			if ( tween.elem.nodeType && tween.elem.parentNode ) {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	};

	jQuery.easing = {
		linear: function( p ) {
			return p;
		},
		swing: function( p ) {
			return 0.5 - Math.cos( p * Math.PI ) / 2;
		}
	};

	jQuery.fx = Tween.prototype.init;

	// Back Compat <1.8 extension point
	jQuery.fx.step = {};




	var
		fxNow, timerId,
		rfxtypes = /^(?:toggle|show|hide)$/,
		rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
		rrun = /queueHooks$/,
		animationPrefilters = [ defaultPrefilter ],
		tweeners = {
			"*": [ function( prop, value ) {
				var tween = this.createTween( prop, value ),
					target = tween.cur(),
					parts = rfxnum.exec( value ),
					unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

					// Starting value computation is required for potential unit mismatches
					start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
						rfxnum.exec( jQuery.css( tween.elem, prop ) ),
					scale = 1,
					maxIterations = 20;

				if ( start && start[ 3 ] !== unit ) {
					// Trust units reported by jQuery.css
					unit = unit || start[ 3 ];

					// Make sure we update the tween properties later on
					parts = parts || [];

					// Iteratively approximate from a nonzero starting point
					start = +target || 1;

					do {
						// If previous iteration zeroed out, double until we get *something*.
						// Use string for doubling so we don't accidentally see scale as unchanged below
						scale = scale || ".5";

						// Adjust and apply
						start = start / scale;
						jQuery.style( tween.elem, prop, start + unit );

					// Update scale, tolerating zero or NaN from tween.cur(),
					// break the loop if scale is unchanged or perfect, or if we've just had enough
					} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
				}

				// Update tween properties
				if ( parts ) {
					start = tween.start = +start || +target || 0;
					tween.unit = unit;
					// If a +=/-= token was provided, we're doing a relative animation
					tween.end = parts[ 1 ] ?
						start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
						+parts[ 2 ];
				}

				return tween;
			} ]
		};

	// Animations created synchronously will run synchronously
	function createFxNow() {
		setTimeout(function() {
			fxNow = undefined;
		});
		return ( fxNow = jQuery.now() );
	}

	// Generate parameters to create a standard animation
	function genFx( type, includeWidth ) {
		var which,
			i = 0,
			attrs = { height: type };

		// If we include width, step value is 1 to do all cssExpand values,
		// otherwise step value is 2 to skip over Left and Right
		includeWidth = includeWidth ? 1 : 0;
		for ( ; i < 4 ; i += 2 - includeWidth ) {
			which = cssExpand[ i ];
			attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
		}

		if ( includeWidth ) {
			attrs.opacity = attrs.width = type;
		}

		return attrs;
	}

	function createTween( value, prop, animation ) {
		var tween,
			collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
			index = 0,
			length = collection.length;
		for ( ; index < length; index++ ) {
			if ( (tween = collection[ index ].call( animation, prop, value )) ) {

				// We're done with this property
				return tween;
			}
		}
	}

	function defaultPrefilter( elem, props, opts ) {
		/* jshint validthis: true */
		var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
			anim = this,
			orig = {},
			style = elem.style,
			hidden = elem.nodeType && isHidden( elem ),
			dataShow = data_priv.get( elem, "fxshow" );

		// Handle queue: false promises
		if ( !opts.queue ) {
			hooks = jQuery._queueHooks( elem, "fx" );
			if ( hooks.unqueued == null ) {
				hooks.unqueued = 0;
				oldfire = hooks.empty.fire;
				hooks.empty.fire = function() {
					if ( !hooks.unqueued ) {
						oldfire();
					}
				};
			}
			hooks.unqueued++;

			anim.always(function() {
				// Ensure the complete handler is called before this completes
				anim.always(function() {
					hooks.unqueued--;
					if ( !jQuery.queue( elem, "fx" ).length ) {
						hooks.empty.fire();
					}
				});
			});
		}

		// Height/width overflow pass
		if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
			// Make sure that nothing sneaks out
			// Record all 3 overflow attributes because IE9-10 do not
			// change the overflow attribute when overflowX and
			// overflowY are set to the same value
			opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

			// Set display property to inline-block for height/width
			// animations on inline elements that are having width/height animated
			display = jQuery.css( elem, "display" );

			// Test default display if display is currently "none"
			checkDisplay = display === "none" ?
				data_priv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

			if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
				style.display = "inline-block";
			}
		}

		if ( opts.overflow ) {
			style.overflow = "hidden";
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}

		// show/hide pass
		for ( prop in props ) {
			value = props[ prop ];
			if ( rfxtypes.exec( value ) ) {
				delete props[ prop ];
				toggle = toggle || value === "toggle";
				if ( value === ( hidden ? "hide" : "show" ) ) {

					// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
					if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
						hidden = true;
					} else {
						continue;
					}
				}
				orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

			// Any non-fx value stops us from restoring the original display value
			} else {
				display = undefined;
			}
		}

		if ( !jQuery.isEmptyObject( orig ) ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = data_priv.access( elem, "fxshow", {} );
			}

			// Store state if its toggle - enables .stop().toggle() to "reverse"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}
			if ( hidden ) {
				jQuery( elem ).show();
			} else {
				anim.done(function() {
					jQuery( elem ).hide();
				});
			}
			anim.done(function() {
				var prop;

				data_priv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			});
			for ( prop in orig ) {
				tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

				if ( !( prop in dataShow ) ) {
					dataShow[ prop ] = tween.start;
					if ( hidden ) {
						tween.end = tween.start;
						tween.start = prop === "width" || prop === "height" ? 1 : 0;
					}
				}
			}

		// If this is a noop like .hide().hide(), restore an overwritten display value
		} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
			style.display = display;
		}
	}

	function propFilter( props, specialEasing ) {
		var index, name, easing, value, hooks;

		// camelCase, specialEasing and expand cssHook pass
		for ( index in props ) {
			name = jQuery.camelCase( index );
			easing = specialEasing[ name ];
			value = props[ index ];
			if ( jQuery.isArray( value ) ) {
				easing = value[ 1 ];
				value = props[ index ] = value[ 0 ];
			}

			if ( index !== name ) {
				props[ name ] = value;
				delete props[ index ];
			}

			hooks = jQuery.cssHooks[ name ];
			if ( hooks && "expand" in hooks ) {
				value = hooks.expand( value );
				delete props[ name ];

				// Not quite $.extend, this won't overwrite existing keys.
				// Reusing 'index' because we have the correct "name"
				for ( index in value ) {
					if ( !( index in props ) ) {
						props[ index ] = value[ index ];
						specialEasing[ index ] = easing;
					}
				}
			} else {
				specialEasing[ name ] = easing;
			}
		}
	}

	function Animation( elem, properties, options ) {
		var result,
			stopped,
			index = 0,
			length = animationPrefilters.length,
			deferred = jQuery.Deferred().always( function() {
				// Don't match elem in the :animated selector
				delete tick.elem;
			}),
			tick = function() {
				if ( stopped ) {
					return false;
				}
				var currentTime = fxNow || createFxNow(),
					remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
					// Support: Android 2.3
					// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
					temp = remaining / animation.duration || 0,
					percent = 1 - temp,
					index = 0,
					length = animation.tweens.length;

				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( percent );
				}

				deferred.notifyWith( elem, [ animation, percent, remaining ]);

				if ( percent < 1 && length ) {
					return remaining;
				} else {
					deferred.resolveWith( elem, [ animation ] );
					return false;
				}
			},
			animation = deferred.promise({
				elem: elem,
				props: jQuery.extend( {}, properties ),
				opts: jQuery.extend( true, { specialEasing: {} }, options ),
				originalProperties: properties,
				originalOptions: options,
				startTime: fxNow || createFxNow(),
				duration: options.duration,
				tweens: [],
				createTween: function( prop, end ) {
					var tween = jQuery.Tween( elem, animation.opts, prop, end,
							animation.opts.specialEasing[ prop ] || animation.opts.easing );
					animation.tweens.push( tween );
					return tween;
				},
				stop: function( gotoEnd ) {
					var index = 0,
						// If we are going to the end, we want to run all the tweens
						// otherwise we skip this part
						length = gotoEnd ? animation.tweens.length : 0;
					if ( stopped ) {
						return this;
					}
					stopped = true;
					for ( ; index < length ; index++ ) {
						animation.tweens[ index ].run( 1 );
					}

					// Resolve when we played the last frame; otherwise, reject
					if ( gotoEnd ) {
						deferred.resolveWith( elem, [ animation, gotoEnd ] );
					} else {
						deferred.rejectWith( elem, [ animation, gotoEnd ] );
					}
					return this;
				}
			}),
			props = animation.props;

		propFilter( props, animation.opts.specialEasing );

		for ( ; index < length ; index++ ) {
			result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
			if ( result ) {
				return result;
			}
		}

		jQuery.map( props, createTween, animation );

		if ( jQuery.isFunction( animation.opts.start ) ) {
			animation.opts.start.call( elem, animation );
		}

		jQuery.fx.timer(
			jQuery.extend( tick, {
				elem: elem,
				anim: animation,
				queue: animation.opts.queue
			})
		);

		// attach callbacks from options
		return animation.progress( animation.opts.progress )
			.done( animation.opts.done, animation.opts.complete )
			.fail( animation.opts.fail )
			.always( animation.opts.always );
	}

	jQuery.Animation = jQuery.extend( Animation, {

		tweener: function( props, callback ) {
			if ( jQuery.isFunction( props ) ) {
				callback = props;
				props = [ "*" ];
			} else {
				props = props.split(" ");
			}

			var prop,
				index = 0,
				length = props.length;

			for ( ; index < length ; index++ ) {
				prop = props[ index ];
				tweeners[ prop ] = tweeners[ prop ] || [];
				tweeners[ prop ].unshift( callback );
			}
		},

		prefilter: function( callback, prepend ) {
			if ( prepend ) {
				animationPrefilters.unshift( callback );
			} else {
				animationPrefilters.push( callback );
			}
		}
	});

	jQuery.speed = function( speed, easing, fn ) {
		var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
			complete: fn || !fn && easing ||
				jQuery.isFunction( speed ) && speed,
			duration: speed,
			easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
		};

		opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
			opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

		// Normalize opt.queue - true/undefined/null -> "fx"
		if ( opt.queue == null || opt.queue === true ) {
			opt.queue = "fx";
		}

		// Queueing
		opt.old = opt.complete;

		opt.complete = function() {
			if ( jQuery.isFunction( opt.old ) ) {
				opt.old.call( this );
			}

			if ( opt.queue ) {
				jQuery.dequeue( this, opt.queue );
			}
		};

		return opt;
	};

	jQuery.fn.extend({
		fadeTo: function( speed, to, easing, callback ) {

			// Show any hidden elements after setting opacity to 0
			return this.filter( isHidden ).css( "opacity", 0 ).show()

				// Animate to the value specified
				.end().animate({ opacity: to }, speed, easing, callback );
		},
		animate: function( prop, speed, easing, callback ) {
			var empty = jQuery.isEmptyObject( prop ),
				optall = jQuery.speed( speed, easing, callback ),
				doAnimation = function() {
					// Operate on a copy of prop so per-property easing won't be lost
					var anim = Animation( this, jQuery.extend( {}, prop ), optall );

					// Empty animations, or finishing resolves immediately
					if ( empty || data_priv.get( this, "finish" ) ) {
						anim.stop( true );
					}
				};
				doAnimation.finish = doAnimation;

			return empty || optall.queue === false ?
				this.each( doAnimation ) :
				this.queue( optall.queue, doAnimation );
		},
		stop: function( type, clearQueue, gotoEnd ) {
			var stopQueue = function( hooks ) {
				var stop = hooks.stop;
				delete hooks.stop;
				stop( gotoEnd );
			};

			if ( typeof type !== "string" ) {
				gotoEnd = clearQueue;
				clearQueue = type;
				type = undefined;
			}
			if ( clearQueue && type !== false ) {
				this.queue( type || "fx", [] );
			}

			return this.each(function() {
				var dequeue = true,
					index = type != null && type + "queueHooks",
					timers = jQuery.timers,
					data = data_priv.get( this );

				if ( index ) {
					if ( data[ index ] && data[ index ].stop ) {
						stopQueue( data[ index ] );
					}
				} else {
					for ( index in data ) {
						if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
							stopQueue( data[ index ] );
						}
					}
				}

				for ( index = timers.length; index--; ) {
					if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
						timers[ index ].anim.stop( gotoEnd );
						dequeue = false;
						timers.splice( index, 1 );
					}
				}

				// Start the next in the queue if the last step wasn't forced.
				// Timers currently will call their complete callbacks, which
				// will dequeue but only if they were gotoEnd.
				if ( dequeue || !gotoEnd ) {
					jQuery.dequeue( this, type );
				}
			});
		},
		finish: function( type ) {
			if ( type !== false ) {
				type = type || "fx";
			}
			return this.each(function() {
				var index,
					data = data_priv.get( this ),
					queue = data[ type + "queue" ],
					hooks = data[ type + "queueHooks" ],
					timers = jQuery.timers,
					length = queue ? queue.length : 0;

				// Enable finishing flag on private data
				data.finish = true;

				// Empty the queue first
				jQuery.queue( this, type, [] );

				if ( hooks && hooks.stop ) {
					hooks.stop.call( this, true );
				}

				// Look for any active animations, and finish them
				for ( index = timers.length; index--; ) {
					if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
						timers[ index ].anim.stop( true );
						timers.splice( index, 1 );
					}
				}

				// Look for any animations in the old queue and finish them
				for ( index = 0; index < length; index++ ) {
					if ( queue[ index ] && queue[ index ].finish ) {
						queue[ index ].finish.call( this );
					}
				}

				// Turn off finishing flag
				delete data.finish;
			});
		}
	});

	jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
		var cssFn = jQuery.fn[ name ];
		jQuery.fn[ name ] = function( speed, easing, callback ) {
			return speed == null || typeof speed === "boolean" ?
				cssFn.apply( this, arguments ) :
				this.animate( genFx( name, true ), speed, easing, callback );
		};
	});

	// Generate shortcuts for custom animations
	jQuery.each({
		slideDown: genFx("show"),
		slideUp: genFx("hide"),
		slideToggle: genFx("toggle"),
		fadeIn: { opacity: "show" },
		fadeOut: { opacity: "hide" },
		fadeToggle: { opacity: "toggle" }
	}, function( name, props ) {
		jQuery.fn[ name ] = function( speed, easing, callback ) {
			return this.animate( props, speed, easing, callback );
		};
	});

	jQuery.timers = [];
	jQuery.fx.tick = function() {
		var timer,
			i = 0,
			timers = jQuery.timers;

		fxNow = jQuery.now();

		for ( ; i < timers.length; i++ ) {
			timer = timers[ i ];
			// Checks the timer has not already been removed
			if ( !timer() && timers[ i ] === timer ) {
				timers.splice( i--, 1 );
			}
		}

		if ( !timers.length ) {
			jQuery.fx.stop();
		}
		fxNow = undefined;
	};

	jQuery.fx.timer = function( timer ) {
		jQuery.timers.push( timer );
		if ( timer() ) {
			jQuery.fx.start();
		} else {
			jQuery.timers.pop();
		}
	};

	jQuery.fx.interval = 13;

	jQuery.fx.start = function() {
		if ( !timerId ) {
			timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
		}
	};

	jQuery.fx.stop = function() {
		clearInterval( timerId );
		timerId = null;
	};

	jQuery.fx.speeds = {
		slow: 600,
		fast: 200,
		// Default speed
		_default: 400
	};


	// Based off of the plugin by Clint Helfers, with permission.
	// http://blindsignals.com/index.php/2009/07/jquery-delay/
	jQuery.fn.delay = function( time, type ) {
		time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
		type = type || "fx";

		return this.queue( type, function( next, hooks ) {
			var timeout = setTimeout( next, time );
			hooks.stop = function() {
				clearTimeout( timeout );
			};
		});
	};


	(function() {
		var input = document.createElement( "input" ),
			select = document.createElement( "select" ),
			opt = select.appendChild( document.createElement( "option" ) );

		input.type = "checkbox";

		// Support: iOS<=5.1, Android<=4.2+
		// Default value for a checkbox should be "on"
		support.checkOn = input.value !== "";

		// Support: IE<=11+
		// Must access selectedIndex to make default options select
		support.optSelected = opt.selected;

		// Support: Android<=2.3
		// Options inside disabled selects are incorrectly marked as disabled
		select.disabled = true;
		support.optDisabled = !opt.disabled;

		// Support: IE<=11+
		// An input loses its value after becoming a radio
		input = document.createElement( "input" );
		input.value = "t";
		input.type = "radio";
		support.radioValue = input.value === "t";
	})();


	var nodeHook, boolHook,
		attrHandle = jQuery.expr.attrHandle;

	jQuery.fn.extend({
		attr: function( name, value ) {
			return access( this, jQuery.attr, name, value, arguments.length > 1 );
		},

		removeAttr: function( name ) {
			return this.each(function() {
				jQuery.removeAttr( this, name );
			});
		}
	});

	jQuery.extend({
		attr: function( elem, name, value ) {
			var hooks, ret,
				nType = elem.nodeType;

			// don't get/set attributes on text, comment and attribute nodes
			if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
				return;
			}

			// Fallback to prop when attributes are not supported
			if ( typeof elem.getAttribute === strundefined ) {
				return jQuery.prop( elem, name, value );
			}

			// All attributes are lowercase
			// Grab necessary hook if one is defined
			if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
				name = name.toLowerCase();
				hooks = jQuery.attrHooks[ name ] ||
					( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
			}

			if ( value !== undefined ) {

				if ( value === null ) {
					jQuery.removeAttr( elem, name );

				} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
					return ret;

				} else {
					elem.setAttribute( name, value + "" );
					return value;
				}

			} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
				return ret;

			} else {
				ret = jQuery.find.attr( elem, name );

				// Non-existent attributes return null, we normalize to undefined
				return ret == null ?
					undefined :
					ret;
			}
		},

		removeAttr: function( elem, value ) {
			var name, propName,
				i = 0,
				attrNames = value && value.match( rnotwhite );

			if ( attrNames && elem.nodeType === 1 ) {
				while ( (name = attrNames[i++]) ) {
					propName = jQuery.propFix[ name ] || name;

					// Boolean attributes get special treatment (#10870)
					if ( jQuery.expr.match.bool.test( name ) ) {
						// Set corresponding property to false
						elem[ propName ] = false;
					}

					elem.removeAttribute( name );
				}
			}
		},

		attrHooks: {
			type: {
				set: function( elem, value ) {
					if ( !support.radioValue && value === "radio" &&
						jQuery.nodeName( elem, "input" ) ) {
						var val = elem.value;
						elem.setAttribute( "type", value );
						if ( val ) {
							elem.value = val;
						}
						return value;
					}
				}
			}
		}
	});

	// Hooks for boolean attributes
	boolHook = {
		set: function( elem, value, name ) {
			if ( value === false ) {
				// Remove boolean attributes when set to false
				jQuery.removeAttr( elem, name );
			} else {
				elem.setAttribute( name, name );
			}
			return name;
		}
	};
	jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
		var getter = attrHandle[ name ] || jQuery.find.attr;

		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	});




	var rfocusable = /^(?:input|select|textarea|button)$/i;

	jQuery.fn.extend({
		prop: function( name, value ) {
			return access( this, jQuery.prop, name, value, arguments.length > 1 );
		},

		removeProp: function( name ) {
			return this.each(function() {
				delete this[ jQuery.propFix[ name ] || name ];
			});
		}
	});

	jQuery.extend({
		propFix: {
			"for": "htmlFor",
			"class": "className"
		},

		prop: function( elem, name, value ) {
			var ret, hooks, notxml,
				nType = elem.nodeType;

			// Don't get/set properties on text, comment and attribute nodes
			if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
				return;
			}

			notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

			if ( notxml ) {
				// Fix name and attach hooks
				name = jQuery.propFix[ name ] || name;
				hooks = jQuery.propHooks[ name ];
			}

			if ( value !== undefined ) {
				return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
					ret :
					( elem[ name ] = value );

			} else {
				return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
					ret :
					elem[ name ];
			}
		},

		propHooks: {
			tabIndex: {
				get: function( elem ) {
					return elem.hasAttribute( "tabindex" ) || rfocusable.test( elem.nodeName ) || elem.href ?
						elem.tabIndex :
						-1;
				}
			}
		}
	});

	if ( !support.optSelected ) {
		jQuery.propHooks.selected = {
			get: function( elem ) {
				var parent = elem.parentNode;
				if ( parent && parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
				return null;
			}
		};
	}

	jQuery.each([
		"tabIndex",
		"readOnly",
		"maxLength",
		"cellSpacing",
		"cellPadding",
		"rowSpan",
		"colSpan",
		"useMap",
		"frameBorder",
		"contentEditable"
	], function() {
		jQuery.propFix[ this.toLowerCase() ] = this;
	});




	var rclass = /[\t\r\n\f]/g;

	jQuery.fn.extend({
		addClass: function( value ) {
			var classes, elem, cur, clazz, j, finalValue,
				proceed = typeof value === "string" && value,
				i = 0,
				len = this.length;

			if ( jQuery.isFunction( value ) ) {
				return this.each(function( j ) {
					jQuery( this ).addClass( value.call( this, j, this.className ) );
				});
			}

			if ( proceed ) {
				// The disjunction here is for better compressibility (see removeClass)
				classes = ( value || "" ).match( rnotwhite ) || [];

				for ( ; i < len; i++ ) {
					elem = this[ i ];
					cur = elem.nodeType === 1 && ( elem.className ?
						( " " + elem.className + " " ).replace( rclass, " " ) :
						" "
					);

					if ( cur ) {
						j = 0;
						while ( (clazz = classes[j++]) ) {
							if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
								cur += clazz + " ";
							}
						}

						// only assign if different to avoid unneeded rendering.
						finalValue = jQuery.trim( cur );
						if ( elem.className !== finalValue ) {
							elem.className = finalValue;
						}
					}
				}
			}

			return this;
		},

		removeClass: function( value ) {
			var classes, elem, cur, clazz, j, finalValue,
				proceed = arguments.length === 0 || typeof value === "string" && value,
				i = 0,
				len = this.length;

			if ( jQuery.isFunction( value ) ) {
				return this.each(function( j ) {
					jQuery( this ).removeClass( value.call( this, j, this.className ) );
				});
			}
			if ( proceed ) {
				classes = ( value || "" ).match( rnotwhite ) || [];

				for ( ; i < len; i++ ) {
					elem = this[ i ];
					// This expression is here for better compressibility (see addClass)
					cur = elem.nodeType === 1 && ( elem.className ?
						( " " + elem.className + " " ).replace( rclass, " " ) :
						""
					);

					if ( cur ) {
						j = 0;
						while ( (clazz = classes[j++]) ) {
							// Remove *all* instances
							while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
								cur = cur.replace( " " + clazz + " ", " " );
							}
						}

						// Only assign if different to avoid unneeded rendering.
						finalValue = value ? jQuery.trim( cur ) : "";
						if ( elem.className !== finalValue ) {
							elem.className = finalValue;
						}
					}
				}
			}

			return this;
		},

		toggleClass: function( value, stateVal ) {
			var type = typeof value;

			if ( typeof stateVal === "boolean" && type === "string" ) {
				return stateVal ? this.addClass( value ) : this.removeClass( value );
			}

			if ( jQuery.isFunction( value ) ) {
				return this.each(function( i ) {
					jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
				});
			}

			return this.each(function() {
				if ( type === "string" ) {
					// Toggle individual class names
					var className,
						i = 0,
						self = jQuery( this ),
						classNames = value.match( rnotwhite ) || [];

					while ( (className = classNames[ i++ ]) ) {
						// Check each className given, space separated list
						if ( self.hasClass( className ) ) {
							self.removeClass( className );
						} else {
							self.addClass( className );
						}
					}

				// Toggle whole class name
				} else if ( type === strundefined || type === "boolean" ) {
					if ( this.className ) {
						// store className if set
						data_priv.set( this, "__className__", this.className );
					}

					// If the element has a class name or if we're passed `false`,
					// then remove the whole classname (if there was one, the above saved it).
					// Otherwise bring back whatever was previously saved (if anything),
					// falling back to the empty string if nothing was stored.
					this.className = this.className || value === false ? "" : data_priv.get( this, "__className__" ) || "";
				}
			});
		},

		hasClass: function( selector ) {
			var className = " " + selector + " ",
				i = 0,
				l = this.length;
			for ( ; i < l; i++ ) {
				if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
					return true;
				}
			}

			return false;
		}
	});




	var rreturn = /\r/g;

	jQuery.fn.extend({
		val: function( value ) {
			var hooks, ret, isFunction,
				elem = this[0];

			if ( !arguments.length ) {
				if ( elem ) {
					hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

					if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
						return ret;
					}

					ret = elem.value;

					return typeof ret === "string" ?
						// Handle most common string cases
						ret.replace(rreturn, "") :
						// Handle cases where value is null/undef or number
						ret == null ? "" : ret;
				}

				return;
			}

			isFunction = jQuery.isFunction( value );

			return this.each(function( i ) {
				var val;

				if ( this.nodeType !== 1 ) {
					return;
				}

				if ( isFunction ) {
					val = value.call( this, i, jQuery( this ).val() );
				} else {
					val = value;
				}

				// Treat null/undefined as ""; convert numbers to string
				if ( val == null ) {
					val = "";

				} else if ( typeof val === "number" ) {
					val += "";

				} else if ( jQuery.isArray( val ) ) {
					val = jQuery.map( val, function( value ) {
						return value == null ? "" : value + "";
					});
				}

				hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

				// If set returns undefined, fall back to normal setting
				if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
					this.value = val;
				}
			});
		}
	});

	jQuery.extend({
		valHooks: {
			option: {
				get: function( elem ) {
					var val = jQuery.find.attr( elem, "value" );
					return val != null ?
						val :
						// Support: IE10-11+
						// option.text throws exceptions (#14686, #14858)
						jQuery.trim( jQuery.text( elem ) );
				}
			},
			select: {
				get: function( elem ) {
					var value, option,
						options = elem.options,
						index = elem.selectedIndex,
						one = elem.type === "select-one" || index < 0,
						values = one ? null : [],
						max = one ? index + 1 : options.length,
						i = index < 0 ?
							max :
							one ? index : 0;

					// Loop through all the selected options
					for ( ; i < max; i++ ) {
						option = options[ i ];

						// IE6-9 doesn't update selected after form reset (#2551)
						if ( ( option.selected || i === index ) &&
								// Don't return options that are disabled or in a disabled optgroup
								( support.optDisabled ? !option.disabled : option.getAttribute( "disabled" ) === null ) &&
								( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

							// Get the specific value for the option
							value = jQuery( option ).val();

							// We don't need an array for one selects
							if ( one ) {
								return value;
							}

							// Multi-Selects return an array
							values.push( value );
						}
					}

					return values;
				},

				set: function( elem, value ) {
					var optionSet, option,
						options = elem.options,
						values = jQuery.makeArray( value ),
						i = options.length;

					while ( i-- ) {
						option = options[ i ];
						if ( (option.selected = jQuery.inArray( option.value, values ) >= 0) ) {
							optionSet = true;
						}
					}

					// Force browsers to behave consistently when non-matching value is set
					if ( !optionSet ) {
						elem.selectedIndex = -1;
					}
					return values;
				}
			}
		}
	});

	// Radios and checkboxes getter/setter
	jQuery.each([ "radio", "checkbox" ], function() {
		jQuery.valHooks[ this ] = {
			set: function( elem, value ) {
				if ( jQuery.isArray( value ) ) {
					return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
				}
			}
		};
		if ( !support.checkOn ) {
			jQuery.valHooks[ this ].get = function( elem ) {
				return elem.getAttribute("value") === null ? "on" : elem.value;
			};
		}
	});




	// Return jQuery for attributes-only inclusion


	jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
		"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
		"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

		// Handle event binding
		jQuery.fn[ name ] = function( data, fn ) {
			return arguments.length > 0 ?
				this.on( name, null, data, fn ) :
				this.trigger( name );
		};
	});

	jQuery.fn.extend({
		hover: function( fnOver, fnOut ) {
			return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
		},

		bind: function( types, data, fn ) {
			return this.on( types, null, data, fn );
		},
		unbind: function( types, fn ) {
			return this.off( types, null, fn );
		},

		delegate: function( selector, types, data, fn ) {
			return this.on( types, selector, data, fn );
		},
		undelegate: function( selector, types, fn ) {
			// ( namespace ) or ( selector, types [, fn] )
			return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
		}
	});


	var nonce = jQuery.now();

	var rquery = (/\?/);



	// Support: Android 2.3
	// Workaround failure to string-cast null input
	jQuery.parseJSON = function( data ) {
		return JSON.parse( data + "" );
	};


	// Cross-browser xml parsing
	jQuery.parseXML = function( data ) {
		var xml, tmp;
		if ( !data || typeof data !== "string" ) {
			return null;
		}

		// Support: IE9
		try {
			tmp = new DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} catch ( e ) {
			xml = undefined;
		}

		if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
			jQuery.error( "Invalid XML: " + data );
		}
		return xml;
	};


	var
		rhash = /#.*$/,
		rts = /([?&])_=[^&]*/,
		rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
		// #7653, #8125, #8152: local protocol detection
		rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
		rnoContent = /^(?:GET|HEAD)$/,
		rprotocol = /^\/\//,
		rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

		/* Prefilters
		 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
		 * 2) These are called:
		 *    - BEFORE asking for a transport
		 *    - AFTER param serialization (s.data is a string if s.processData is true)
		 * 3) key is the dataType
		 * 4) the catchall symbol "*" can be used
		 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
		 */
		prefilters = {},

		/* Transports bindings
		 * 1) key is the dataType
		 * 2) the catchall symbol "*" can be used
		 * 3) selection will start with transport dataType and THEN go to "*" if needed
		 */
		transports = {},

		// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
		allTypes = "*/".concat( "*" ),

		// Document location
		ajaxLocation = window.location.href,

		// Segment location into parts
		ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

	// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
	function addToPrefiltersOrTransports( structure ) {

		// dataTypeExpression is optional and defaults to "*"
		return function( dataTypeExpression, func ) {

			if ( typeof dataTypeExpression !== "string" ) {
				func = dataTypeExpression;
				dataTypeExpression = "*";
			}

			var dataType,
				i = 0,
				dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

			if ( jQuery.isFunction( func ) ) {
				// For each dataType in the dataTypeExpression
				while ( (dataType = dataTypes[i++]) ) {
					// Prepend if requested
					if ( dataType[0] === "+" ) {
						dataType = dataType.slice( 1 ) || "*";
						(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

					// Otherwise append
					} else {
						(structure[ dataType ] = structure[ dataType ] || []).push( func );
					}
				}
			}
		};
	}

	// Base inspection function for prefilters and transports
	function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

		var inspected = {},
			seekingTransport = ( structure === transports );

		function inspect( dataType ) {
			var selected;
			inspected[ dataType ] = true;
			jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
				var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
				if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
					options.dataTypes.unshift( dataTypeOrTransport );
					inspect( dataTypeOrTransport );
					return false;
				} else if ( seekingTransport ) {
					return !( selected = dataTypeOrTransport );
				}
			});
			return selected;
		}

		return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
	}

	// A special extend for ajax options
	// that takes "flat" options (not to be deep extended)
	// Fixes #9887
	function ajaxExtend( target, src ) {
		var key, deep,
			flatOptions = jQuery.ajaxSettings.flatOptions || {};

		for ( key in src ) {
			if ( src[ key ] !== undefined ) {
				( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
			}
		}
		if ( deep ) {
			jQuery.extend( true, target, deep );
		}

		return target;
	}

	/* Handles responses to an ajax request:
	 * - finds the right dataType (mediates between content-type and expected dataType)
	 * - returns the corresponding response
	 */
	function ajaxHandleResponses( s, jqXHR, responses ) {

		var ct, type, finalDataType, firstDataType,
			contents = s.contents,
			dataTypes = s.dataTypes;

		// Remove auto dataType and get content-type in the process
		while ( dataTypes[ 0 ] === "*" ) {
			dataTypes.shift();
			if ( ct === undefined ) {
				ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
			}
		}

		// Check if we're dealing with a known content-type
		if ( ct ) {
			for ( type in contents ) {
				if ( contents[ type ] && contents[ type ].test( ct ) ) {
					dataTypes.unshift( type );
					break;
				}
			}
		}

		// Check to see if we have a response for the expected dataType
		if ( dataTypes[ 0 ] in responses ) {
			finalDataType = dataTypes[ 0 ];
		} else {
			// Try convertible dataTypes
			for ( type in responses ) {
				if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
					finalDataType = type;
					break;
				}
				if ( !firstDataType ) {
					firstDataType = type;
				}
			}
			// Or just use first one
			finalDataType = finalDataType || firstDataType;
		}

		// If we found a dataType
		// We add the dataType to the list if needed
		// and return the corresponding response
		if ( finalDataType ) {
			if ( finalDataType !== dataTypes[ 0 ] ) {
				dataTypes.unshift( finalDataType );
			}
			return responses[ finalDataType ];
		}
	}

	/* Chain conversions given the request and the original response
	 * Also sets the responseXXX fields on the jqXHR instance
	 */
	function ajaxConvert( s, response, jqXHR, isSuccess ) {
		var conv2, current, conv, tmp, prev,
			converters = {},
			// Work with a copy of dataTypes in case we need to modify it for conversion
			dataTypes = s.dataTypes.slice();

		// Create converters map with lowercased keys
		if ( dataTypes[ 1 ] ) {
			for ( conv in s.converters ) {
				converters[ conv.toLowerCase() ] = s.converters[ conv ];
			}
		}

		current = dataTypes.shift();

		// Convert to each sequential dataType
		while ( current ) {

			if ( s.responseFields[ current ] ) {
				jqXHR[ s.responseFields[ current ] ] = response;
			}

			// Apply the dataFilter if provided
			if ( !prev && isSuccess && s.dataFilter ) {
				response = s.dataFilter( response, s.dataType );
			}

			prev = current;
			current = dataTypes.shift();

			if ( current ) {

			// There's only work to do if current dataType is non-auto
				if ( current === "*" ) {

					current = prev;

				// Convert response if prev dataType is non-auto and differs from current
				} else if ( prev !== "*" && prev !== current ) {

					// Seek a direct converter
					conv = converters[ prev + " " + current ] || converters[ "* " + current ];

					// If none found, seek a pair
					if ( !conv ) {
						for ( conv2 in converters ) {

							// If conv2 outputs current
							tmp = conv2.split( " " );
							if ( tmp[ 1 ] === current ) {

								// If prev can be converted to accepted input
								conv = converters[ prev + " " + tmp[ 0 ] ] ||
									converters[ "* " + tmp[ 0 ] ];
								if ( conv ) {
									// Condense equivalence converters
									if ( conv === true ) {
										conv = converters[ conv2 ];

									// Otherwise, insert the intermediate dataType
									} else if ( converters[ conv2 ] !== true ) {
										current = tmp[ 0 ];
										dataTypes.unshift( tmp[ 1 ] );
									}
									break;
								}
							}
						}
					}

					// Apply converter (if not an equivalence)
					if ( conv !== true ) {

						// Unless errors are allowed to bubble, catch and return them
						if ( conv && s[ "throws" ] ) {
							response = conv( response );
						} else {
							try {
								response = conv( response );
							} catch ( e ) {
								return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
							}
						}
					}
				}
			}
		}

		return { state: "success", data: response };
	}

	jQuery.extend({

		// Counter for holding the number of active queries
		active: 0,

		// Last-Modified header cache for next request
		lastModified: {},
		etag: {},

		ajaxSettings: {
			url: ajaxLocation,
			type: "GET",
			isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
			global: true,
			processData: true,
			async: true,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			/*
			timeout: 0,
			data: null,
			dataType: null,
			username: null,
			password: null,
			cache: null,
			throws: false,
			traditional: false,
			headers: {},
			*/

			accepts: {
				"*": allTypes,
				text: "text/plain",
				html: "text/html",
				xml: "application/xml, text/xml",
				json: "application/json, text/javascript"
			},

			contents: {
				xml: /xml/,
				html: /html/,
				json: /json/
			},

			responseFields: {
				xml: "responseXML",
				text: "responseText",
				json: "responseJSON"
			},

			// Data converters
			// Keys separate source (or catchall "*") and destination types with a single space
			converters: {

				// Convert anything to text
				"* text": String,

				// Text to html (true = no transformation)
				"text html": true,

				// Evaluate text as a json expression
				"text json": jQuery.parseJSON,

				// Parse text as xml
				"text xml": jQuery.parseXML
			},

			// For options that shouldn't be deep extended:
			// you can add your own custom options here if
			// and when you create one that shouldn't be
			// deep extended (see ajaxExtend)
			flatOptions: {
				url: true,
				context: true
			}
		},

		// Creates a full fledged settings object into target
		// with both ajaxSettings and settings fields.
		// If target is omitted, writes into ajaxSettings.
		ajaxSetup: function( target, settings ) {
			return settings ?

				// Building a settings object
				ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

				// Extending ajaxSettings
				ajaxExtend( jQuery.ajaxSettings, target );
		},

		ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
		ajaxTransport: addToPrefiltersOrTransports( transports ),

		// Main method
		ajax: function( url, options ) {

			// If url is an object, simulate pre-1.5 signature
			if ( typeof url === "object" ) {
				options = url;
				url = undefined;
			}

			// Force options to be an object
			options = options || {};

			var transport,
				// URL without anti-cache param
				cacheURL,
				// Response headers
				responseHeadersString,
				responseHeaders,
				// timeout handle
				timeoutTimer,
				// Cross-domain detection vars
				parts,
				// To know if global events are to be dispatched
				fireGlobals,
				// Loop variable
				i,
				// Create the final options object
				s = jQuery.ajaxSetup( {}, options ),
				// Callbacks context
				callbackContext = s.context || s,
				// Context for global events is callbackContext if it is a DOM node or jQuery collection
				globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,
				// Deferreds
				deferred = jQuery.Deferred(),
				completeDeferred = jQuery.Callbacks("once memory"),
				// Status-dependent callbacks
				statusCode = s.statusCode || {},
				// Headers (they are sent all at once)
				requestHeaders = {},
				requestHeadersNames = {},
				// The jqXHR state
				state = 0,
				// Default abort message
				strAbort = "canceled",
				// Fake xhr
				jqXHR = {
					readyState: 0,

					// Builds headers hashtable if needed
					getResponseHeader: function( key ) {
						var match;
						if ( state === 2 ) {
							if ( !responseHeaders ) {
								responseHeaders = {};
								while ( (match = rheaders.exec( responseHeadersString )) ) {
									responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
								}
							}
							match = responseHeaders[ key.toLowerCase() ];
						}
						return match == null ? null : match;
					},

					// Raw string
					getAllResponseHeaders: function() {
						return state === 2 ? responseHeadersString : null;
					},

					// Caches the header
					setRequestHeader: function( name, value ) {
						var lname = name.toLowerCase();
						if ( !state ) {
							name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
							requestHeaders[ name ] = value;
						}
						return this;
					},

					// Overrides response content-type header
					overrideMimeType: function( type ) {
						if ( !state ) {
							s.mimeType = type;
						}
						return this;
					},

					// Status-dependent callbacks
					statusCode: function( map ) {
						var code;
						if ( map ) {
							if ( state < 2 ) {
								for ( code in map ) {
									// Lazy-add the new callback in a way that preserves old ones
									statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
								}
							} else {
								// Execute the appropriate callbacks
								jqXHR.always( map[ jqXHR.status ] );
							}
						}
						return this;
					},

					// Cancel the request
					abort: function( statusText ) {
						var finalText = statusText || strAbort;
						if ( transport ) {
							transport.abort( finalText );
						}
						done( 0, finalText );
						return this;
					}
				};

			// Attach deferreds
			deferred.promise( jqXHR ).complete = completeDeferred.add;
			jqXHR.success = jqXHR.done;
			jqXHR.error = jqXHR.fail;

			// Remove hash character (#7531: and string promotion)
			// Add protocol if not provided (prefilters might expect it)
			// Handle falsy url in the settings object (#10093: consistency with old signature)
			// We also use the url parameter if available
			s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" )
				.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

			// Alias method option to type as per ticket #12004
			s.type = options.method || options.type || s.method || s.type;

			// Extract dataTypes list
			s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

			// A cross-domain request is in order when we have a protocol:host:port mismatch
			if ( s.crossDomain == null ) {
				parts = rurl.exec( s.url.toLowerCase() );
				s.crossDomain = !!( parts &&
					( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
						( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
							( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
				);
			}

			// Convert data if not already a string
			if ( s.data && s.processData && typeof s.data !== "string" ) {
				s.data = jQuery.param( s.data, s.traditional );
			}

			// Apply prefilters
			inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

			// If request was aborted inside a prefilter, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// We can fire global events as of now if asked to
			// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
			fireGlobals = jQuery.event && s.global;

			// Watch for a new set of requests
			if ( fireGlobals && jQuery.active++ === 0 ) {
				jQuery.event.trigger("ajaxStart");
			}

			// Uppercase the type
			s.type = s.type.toUpperCase();

			// Determine if request has content
			s.hasContent = !rnoContent.test( s.type );

			// Save the URL in case we're toying with the If-Modified-Since
			// and/or If-None-Match header later on
			cacheURL = s.url;

			// More options handling for requests with no content
			if ( !s.hasContent ) {

				// If data is available, append data to url
				if ( s.data ) {
					cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
					// #9682: remove data so that it's not used in an eventual retry
					delete s.data;
				}

				// Add anti-cache in url if needed
				if ( s.cache === false ) {
					s.url = rts.test( cacheURL ) ?

						// If there is already a '_' parameter, set its value
						cacheURL.replace( rts, "$1_=" + nonce++ ) :

						// Otherwise add one to the end
						cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
				}
			}

			// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
			if ( s.ifModified ) {
				if ( jQuery.lastModified[ cacheURL ] ) {
					jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
				}
				if ( jQuery.etag[ cacheURL ] ) {
					jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
				}
			}

			// Set the correct header, if data is being sent
			if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
				jqXHR.setRequestHeader( "Content-Type", s.contentType );
			}

			// Set the Accepts header for the server, depending on the dataType
			jqXHR.setRequestHeader(
				"Accept",
				s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
					s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
					s.accepts[ "*" ]
			);

			// Check for headers option
			for ( i in s.headers ) {
				jqXHR.setRequestHeader( i, s.headers[ i ] );
			}

			// Allow custom headers/mimetypes and early abort
			if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
				// Abort if not done already and return
				return jqXHR.abort();
			}

			// Aborting is no longer a cancellation
			strAbort = "abort";

			// Install callbacks on deferreds
			for ( i in { success: 1, error: 1, complete: 1 } ) {
				jqXHR[ i ]( s[ i ] );
			}

			// Get transport
			transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

			// If no transport, we auto-abort
			if ( !transport ) {
				done( -1, "No Transport" );
			} else {
				jqXHR.readyState = 1;

				// Send global event
				if ( fireGlobals ) {
					globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
				}
				// Timeout
				if ( s.async && s.timeout > 0 ) {
					timeoutTimer = setTimeout(function() {
						jqXHR.abort("timeout");
					}, s.timeout );
				}

				try {
					state = 1;
					transport.send( requestHeaders, done );
				} catch ( e ) {
					// Propagate exception as error if not done
					if ( state < 2 ) {
						done( -1, e );
					// Simply rethrow otherwise
					} else {
						throw e;
					}
				}
			}

			// Callback for when everything is done
			function done( status, nativeStatusText, responses, headers ) {
				var isSuccess, success, error, response, modified,
					statusText = nativeStatusText;

				// Called once
				if ( state === 2 ) {
					return;
				}

				// State is "done" now
				state = 2;

				// Clear timeout if it exists
				if ( timeoutTimer ) {
					clearTimeout( timeoutTimer );
				}

				// Dereference transport for early garbage collection
				// (no matter how long the jqXHR object will be used)
				transport = undefined;

				// Cache response headers
				responseHeadersString = headers || "";

				// Set readyState
				jqXHR.readyState = status > 0 ? 4 : 0;

				// Determine if successful
				isSuccess = status >= 200 && status < 300 || status === 304;

				// Get response data
				if ( responses ) {
					response = ajaxHandleResponses( s, jqXHR, responses );
				}

				// Convert no matter what (that way responseXXX fields are always set)
				response = ajaxConvert( s, response, jqXHR, isSuccess );

				// If successful, handle type chaining
				if ( isSuccess ) {

					// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
					if ( s.ifModified ) {
						modified = jqXHR.getResponseHeader("Last-Modified");
						if ( modified ) {
							jQuery.lastModified[ cacheURL ] = modified;
						}
						modified = jqXHR.getResponseHeader("etag");
						if ( modified ) {
							jQuery.etag[ cacheURL ] = modified;
						}
					}

					// if no content
					if ( status === 204 || s.type === "HEAD" ) {
						statusText = "nocontent";

					// if not modified
					} else if ( status === 304 ) {
						statusText = "notmodified";

					// If we have data, let's convert it
					} else {
						statusText = response.state;
						success = response.data;
						error = response.error;
						isSuccess = !error;
					}
				} else {
					// Extract error from statusText and normalize for non-aborts
					error = statusText;
					if ( status || !statusText ) {
						statusText = "error";
						if ( status < 0 ) {
							status = 0;
						}
					}
				}

				// Set data for the fake xhr object
				jqXHR.status = status;
				jqXHR.statusText = ( nativeStatusText || statusText ) + "";

				// Success/Error
				if ( isSuccess ) {
					deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
				} else {
					deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
				}

				// Status-dependent callbacks
				jqXHR.statusCode( statusCode );
				statusCode = undefined;

				if ( fireGlobals ) {
					globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
						[ jqXHR, s, isSuccess ? success : error ] );
				}

				// Complete
				completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

				if ( fireGlobals ) {
					globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
					// Handle the global AJAX counter
					if ( !( --jQuery.active ) ) {
						jQuery.event.trigger("ajaxStop");
					}
				}
			}

			return jqXHR;
		},

		getJSON: function( url, data, callback ) {
			return jQuery.get( url, data, callback, "json" );
		},

		getScript: function( url, callback ) {
			return jQuery.get( url, undefined, callback, "script" );
		}
	});

	jQuery.each( [ "get", "post" ], function( i, method ) {
		jQuery[ method ] = function( url, data, callback, type ) {
			// Shift arguments if data argument was omitted
			if ( jQuery.isFunction( data ) ) {
				type = type || callback;
				callback = data;
				data = undefined;
			}

			return jQuery.ajax({
				url: url,
				type: method,
				dataType: type,
				data: data,
				success: callback
			});
		};
	});


	jQuery._evalUrl = function( url ) {
		return jQuery.ajax({
			url: url,
			type: "GET",
			dataType: "script",
			async: false,
			global: false,
			"throws": true
		});
	};


	jQuery.fn.extend({
		wrapAll: function( html ) {
			var wrap;

			if ( jQuery.isFunction( html ) ) {
				return this.each(function( i ) {
					jQuery( this ).wrapAll( html.call(this, i) );
				});
			}

			if ( this[ 0 ] ) {

				// The elements to wrap the target around
				wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

				if ( this[ 0 ].parentNode ) {
					wrap.insertBefore( this[ 0 ] );
				}

				wrap.map(function() {
					var elem = this;

					while ( elem.firstElementChild ) {
						elem = elem.firstElementChild;
					}

					return elem;
				}).append( this );
			}

			return this;
		},

		wrapInner: function( html ) {
			if ( jQuery.isFunction( html ) ) {
				return this.each(function( i ) {
					jQuery( this ).wrapInner( html.call(this, i) );
				});
			}

			return this.each(function() {
				var self = jQuery( this ),
					contents = self.contents();

				if ( contents.length ) {
					contents.wrapAll( html );

				} else {
					self.append( html );
				}
			});
		},

		wrap: function( html ) {
			var isFunction = jQuery.isFunction( html );

			return this.each(function( i ) {
				jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
			});
		},

		unwrap: function() {
			return this.parent().each(function() {
				if ( !jQuery.nodeName( this, "body" ) ) {
					jQuery( this ).replaceWith( this.childNodes );
				}
			}).end();
		}
	});


	jQuery.expr.filters.hidden = function( elem ) {
		// Support: Opera <= 12.12
		// Opera reports offsetWidths and offsetHeights less than zero on some elements
		return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
	};
	jQuery.expr.filters.visible = function( elem ) {
		return !jQuery.expr.filters.hidden( elem );
	};




	var r20 = /%20/g,
		rbracket = /\[\]$/,
		rCRLF = /\r?\n/g,
		rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
		rsubmittable = /^(?:input|select|textarea|keygen)/i;

	function buildParams( prefix, obj, traditional, add ) {
		var name;

		if ( jQuery.isArray( obj ) ) {
			// Serialize array item.
			jQuery.each( obj, function( i, v ) {
				if ( traditional || rbracket.test( prefix ) ) {
					// Treat each array item as a scalar.
					add( prefix, v );

				} else {
					// Item is non-scalar (array or object), encode its numeric index.
					buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
				}
			});

		} else if ( !traditional && jQuery.type( obj ) === "object" ) {
			// Serialize object item.
			for ( name in obj ) {
				buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
			}

		} else {
			// Serialize scalar item.
			add( prefix, obj );
		}
	}

	// Serialize an array of form elements or a set of
	// key/values into a query string
	jQuery.param = function( a, traditional ) {
		var prefix,
			s = [],
			add = function( key, value ) {
				// If value is a function, invoke it and return its value
				value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
				s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
			};

		// Set traditional to true for jQuery <= 1.3.2 behavior.
		if ( traditional === undefined ) {
			traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
		}

		// If an array was passed in, assume that it is an array of form elements.
		if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
			// Serialize the form elements
			jQuery.each( a, function() {
				add( this.name, this.value );
			});

		} else {
			// If traditional, encode the "old" way (the way 1.3.2 or older
			// did it), otherwise encode params recursively.
			for ( prefix in a ) {
				buildParams( prefix, a[ prefix ], traditional, add );
			}
		}

		// Return the resulting serialization
		return s.join( "&" ).replace( r20, "+" );
	};

	jQuery.fn.extend({
		serialize: function() {
			return jQuery.param( this.serializeArray() );
		},
		serializeArray: function() {
			return this.map(function() {
				// Can add propHook for "elements" to filter or add form elements
				var elements = jQuery.prop( this, "elements" );
				return elements ? jQuery.makeArray( elements ) : this;
			})
			.filter(function() {
				var type = this.type;

				// Use .is( ":disabled" ) so that fieldset[disabled] works
				return this.name && !jQuery( this ).is( ":disabled" ) &&
					rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
					( this.checked || !rcheckableType.test( type ) );
			})
			.map(function( i, elem ) {
				var val = jQuery( this ).val();

				return val == null ?
					null :
					jQuery.isArray( val ) ?
						jQuery.map( val, function( val ) {
							return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
						}) :
						{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
			}).get();
		}
	});


	jQuery.ajaxSettings.xhr = function() {
		try {
			return new XMLHttpRequest();
		} catch( e ) {}
	};

	var xhrId = 0,
		xhrCallbacks = {},
		xhrSuccessStatus = {
			// file protocol always yields status code 0, assume 200
			0: 200,
			// Support: IE9
			// #1450: sometimes IE returns 1223 when it should be 204
			1223: 204
		},
		xhrSupported = jQuery.ajaxSettings.xhr();

	// Support: IE9
	// Open requests must be manually aborted on unload (#5280)
	// See https://support.microsoft.com/kb/2856746 for more info
	if ( window.attachEvent ) {
		window.attachEvent( "onunload", function() {
			for ( var key in xhrCallbacks ) {
				xhrCallbacks[ key ]();
			}
		});
	}

	support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
	support.ajax = xhrSupported = !!xhrSupported;

	jQuery.ajaxTransport(function( options ) {
		var callback;

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( support.cors || xhrSupported && !options.crossDomain ) {
			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					xhr.open( options.type, options.url, options.async, options.username, options.password );

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						xhr.setRequestHeader( i, headers[ i ] );
					}

					// Callback
					callback = function( type ) {
						return function() {
							if ( callback ) {
								delete xhrCallbacks[ id ];
								callback = xhr.onload = xhr.onerror = null;

								if ( type === "abort" ) {
									xhr.abort();
								} else if ( type === "error" ) {
									complete(
										// file: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								} else {
									complete(
										xhrSuccessStatus[ xhr.status ] || xhr.status,
										xhr.statusText,
										// Support: IE9
										// Accessing binary-data responseText throws an exception
										// (#11426)
										typeof xhr.responseText === "string" ? {
											text: xhr.responseText
										} : undefined,
										xhr.getAllResponseHeaders()
									);
								}
							}
						};
					};

					// Listen to events
					xhr.onload = callback();
					xhr.onerror = callback("error");

					// Create the abort callback
					callback = xhrCallbacks[ id ] = callback("abort");

					try {
						// Do send the request (this may raise an exception)
						xhr.send( options.hasContent && options.data || null );
					} catch ( e ) {
						// #14683: Only rethrow if this hasn't been notified as an error yet
						if ( callback ) {
							throw e;
						}
					}
				},

				abort: function() {
					if ( callback ) {
						callback();
					}
				}
			};
		}
	});




	// Install script dataType
	jQuery.ajaxSetup({
		accepts: {
			script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
		},
		contents: {
			script: /(?:java|ecma)script/
		},
		converters: {
			"text script": function( text ) {
				jQuery.globalEval( text );
				return text;
			}
		}
	});

	// Handle cache's special case and crossDomain
	jQuery.ajaxPrefilter( "script", function( s ) {
		if ( s.cache === undefined ) {
			s.cache = false;
		}
		if ( s.crossDomain ) {
			s.type = "GET";
		}
	});

	// Bind script tag hack transport
	jQuery.ajaxTransport( "script", function( s ) {
		// This transport only deals with cross domain requests
		if ( s.crossDomain ) {
			var script, callback;
			return {
				send: function( _, complete ) {
					script = jQuery("<script>").prop({
						async: true,
						charset: s.scriptCharset,
						src: s.url
					}).on(
						"load error",
						callback = function( evt ) {
							script.remove();
							callback = null;
							if ( evt ) {
								complete( evt.type === "error" ? 404 : 200, evt.type );
							}
						}
					);
					document.head.appendChild( script[ 0 ] );
				},
				abort: function() {
					if ( callback ) {
						callback();
					}
				}
			};
		}
	});




	var oldCallbacks = [],
		rjsonp = /(=)\?(?=&|$)|\?\?/;

	// Default jsonp settings
	jQuery.ajaxSetup({
		jsonp: "callback",
		jsonpCallback: function() {
			var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
			this[ callback ] = true;
			return callback;
		}
	});

	// Detect, normalize options and install callbacks for jsonp requests
	jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

		var callbackName, overwritten, responseContainer,
			jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
				"url" :
				typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
			);

		// Handle iff the expected data type is "jsonp" or we have a parameter to set
		if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

			// Get callback name, remembering preexisting value associated with it
			callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
				s.jsonpCallback() :
				s.jsonpCallback;

			// Insert callback into url or form data
			if ( jsonProp ) {
				s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
			} else if ( s.jsonp !== false ) {
				s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
			}

			// Use data converter to retrieve json after script execution
			s.converters["script json"] = function() {
				if ( !responseContainer ) {
					jQuery.error( callbackName + " was not called" );
				}
				return responseContainer[ 0 ];
			};

			// force json dataType
			s.dataTypes[ 0 ] = "json";

			// Install callback
			overwritten = window[ callbackName ];
			window[ callbackName ] = function() {
				responseContainer = arguments;
			};

			// Clean-up function (fires after converters)
			jqXHR.always(function() {
				// Restore preexisting value
				window[ callbackName ] = overwritten;

				// Save back as free
				if ( s[ callbackName ] ) {
					// make sure that re-using the options doesn't screw things around
					s.jsonpCallback = originalSettings.jsonpCallback;

					// save the callback name for future use
					oldCallbacks.push( callbackName );
				}

				// Call if it was a function and we have a response
				if ( responseContainer && jQuery.isFunction( overwritten ) ) {
					overwritten( responseContainer[ 0 ] );
				}

				responseContainer = overwritten = undefined;
			});

			// Delegate to script
			return "script";
		}
	});




	// data: string of html
	// context (optional): If specified, the fragment will be created in this context, defaults to document
	// keepScripts (optional): If true, will include scripts passed in the html string
	jQuery.parseHTML = function( data, context, keepScripts ) {
		if ( !data || typeof data !== "string" ) {
			return null;
		}
		if ( typeof context === "boolean" ) {
			keepScripts = context;
			context = false;
		}
		context = context || document;

		var parsed = rsingleTag.exec( data ),
			scripts = !keepScripts && [];

		// Single tag
		if ( parsed ) {
			return [ context.createElement( parsed[1] ) ];
		}

		parsed = jQuery.buildFragment( [ data ], context, scripts );

		if ( scripts && scripts.length ) {
			jQuery( scripts ).remove();
		}

		return jQuery.merge( [], parsed.childNodes );
	};


	// Keep a copy of the old load method
	var _load = jQuery.fn.load;

	/**
	 * Load a url into a page
	 */
	jQuery.fn.load = function( url, params, callback ) {
		if ( typeof url !== "string" && _load ) {
			return _load.apply( this, arguments );
		}

		var selector, type, response,
			self = this,
			off = url.indexOf(" ");

		if ( off >= 0 ) {
			selector = jQuery.trim( url.slice( off ) );
			url = url.slice( 0, off );
		}

		// If it's a function
		if ( jQuery.isFunction( params ) ) {

			// We assume that it's the callback
			callback = params;
			params = undefined;

		// Otherwise, build a param string
		} else if ( params && typeof params === "object" ) {
			type = "POST";
		}

		// If we have elements to modify, make the request
		if ( self.length > 0 ) {
			jQuery.ajax({
				url: url,

				// if "type" variable is undefined, then "GET" method will be used
				type: type,
				dataType: "html",
				data: params
			}).done(function( responseText ) {

				// Save response for use in complete callback
				response = arguments;

				self.html( selector ?

					// If a selector was specified, locate the right elements in a dummy div
					// Exclude scripts to avoid IE 'Permission Denied' errors
					jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

					// Otherwise use the full result
					responseText );

			}).complete( callback && function( jqXHR, status ) {
				self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
			});
		}

		return this;
	};




	// Attach a bunch of functions for handling common AJAX events
	jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
		jQuery.fn[ type ] = function( fn ) {
			return this.on( type, fn );
		};
	});




	jQuery.expr.filters.animated = function( elem ) {
		return jQuery.grep(jQuery.timers, function( fn ) {
			return elem === fn.elem;
		}).length;
	};




	var docElem = window.document.documentElement;

	/**
	 * Gets a window from an element
	 */
	function getWindow( elem ) {
		return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
	}

	jQuery.offset = {
		setOffset: function( elem, options, i ) {
			var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
				position = jQuery.css( elem, "position" ),
				curElem = jQuery( elem ),
				props = {};

			// Set position first, in-case top/left are set even on static elem
			if ( position === "static" ) {
				elem.style.position = "relative";
			}

			curOffset = curElem.offset();
			curCSSTop = jQuery.css( elem, "top" );
			curCSSLeft = jQuery.css( elem, "left" );
			calculatePosition = ( position === "absolute" || position === "fixed" ) &&
				( curCSSTop + curCSSLeft ).indexOf("auto") > -1;

			// Need to be able to calculate position if either
			// top or left is auto and position is either absolute or fixed
			if ( calculatePosition ) {
				curPosition = curElem.position();
				curTop = curPosition.top;
				curLeft = curPosition.left;

			} else {
				curTop = parseFloat( curCSSTop ) || 0;
				curLeft = parseFloat( curCSSLeft ) || 0;
			}

			if ( jQuery.isFunction( options ) ) {
				options = options.call( elem, i, curOffset );
			}

			if ( options.top != null ) {
				props.top = ( options.top - curOffset.top ) + curTop;
			}
			if ( options.left != null ) {
				props.left = ( options.left - curOffset.left ) + curLeft;
			}

			if ( "using" in options ) {
				options.using.call( elem, props );

			} else {
				curElem.css( props );
			}
		}
	};

	jQuery.fn.extend({
		offset: function( options ) {
			if ( arguments.length ) {
				return options === undefined ?
					this :
					this.each(function( i ) {
						jQuery.offset.setOffset( this, options, i );
					});
			}

			var docElem, win,
				elem = this[ 0 ],
				box = { top: 0, left: 0 },
				doc = elem && elem.ownerDocument;

			if ( !doc ) {
				return;
			}

			docElem = doc.documentElement;

			// Make sure it's not a disconnected DOM node
			if ( !jQuery.contains( docElem, elem ) ) {
				return box;
			}

			// Support: BlackBerry 5, iOS 3 (original iPhone)
			// If we don't have gBCR, just use 0,0 rather than error
			if ( typeof elem.getBoundingClientRect !== strundefined ) {
				box = elem.getBoundingClientRect();
			}
			win = getWindow( doc );
			return {
				top: box.top + win.pageYOffset - docElem.clientTop,
				left: box.left + win.pageXOffset - docElem.clientLeft
			};
		},

		position: function() {
			if ( !this[ 0 ] ) {
				return;
			}

			var offsetParent, offset,
				elem = this[ 0 ],
				parentOffset = { top: 0, left: 0 };

			// Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
			if ( jQuery.css( elem, "position" ) === "fixed" ) {
				// Assume getBoundingClientRect is there when computed position is fixed
				offset = elem.getBoundingClientRect();

			} else {
				// Get *real* offsetParent
				offsetParent = this.offsetParent();

				// Get correct offsets
				offset = this.offset();
				if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
					parentOffset = offsetParent.offset();
				}

				// Add offsetParent borders
				parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
			}

			// Subtract parent offsets and element margins
			return {
				top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
				left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
			};
		},

		offsetParent: function() {
			return this.map(function() {
				var offsetParent = this.offsetParent || docElem;

				while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
					offsetParent = offsetParent.offsetParent;
				}

				return offsetParent || docElem;
			});
		}
	});

	// Create scrollLeft and scrollTop methods
	jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
		var top = "pageYOffset" === prop;

		jQuery.fn[ method ] = function( val ) {
			return access( this, function( elem, method, val ) {
				var win = getWindow( elem );

				if ( val === undefined ) {
					return win ? win[ prop ] : elem[ method ];
				}

				if ( win ) {
					win.scrollTo(
						!top ? val : window.pageXOffset,
						top ? val : window.pageYOffset
					);

				} else {
					elem[ method ] = val;
				}
			}, method, val, arguments.length, null );
		};
	});

	// Support: Safari<7+, Chrome<37+
	// Add the top/left cssHooks using jQuery.fn.position
	// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
	// getComputedStyle returns percent when specified for top/left/bottom/right;
	// rather than make the css module depend on the offset module, just check for it here
	jQuery.each( [ "top", "left" ], function( i, prop ) {
		jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
			function( elem, computed ) {
				if ( computed ) {
					computed = curCSS( elem, prop );
					// If curCSS returns percentage, fallback to offset
					return rnumnonpx.test( computed ) ?
						jQuery( elem ).position()[ prop ] + "px" :
						computed;
				}
			}
		);
	});


	// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
	jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
		jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
			// Margin is only for outerHeight, outerWidth
			jQuery.fn[ funcName ] = function( margin, value ) {
				var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
					extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

				return access( this, function( elem, type, value ) {
					var doc;

					if ( jQuery.isWindow( elem ) ) {
						// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
						// isn't a whole lot we can do. See pull request at this URL for discussion:
						// https://github.com/jquery/jquery/pull/764
						return elem.document.documentElement[ "client" + name ];
					}

					// Get document width or height
					if ( elem.nodeType === 9 ) {
						doc = elem.documentElement;

						// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
						// whichever is greatest
						return Math.max(
							elem.body[ "scroll" + name ], doc[ "scroll" + name ],
							elem.body[ "offset" + name ], doc[ "offset" + name ],
							doc[ "client" + name ]
						);
					}

					return value === undefined ?
						// Get width or height on the element, requesting but not forcing parseFloat
						jQuery.css( elem, type, extra ) :

						// Set width or height on the element
						jQuery.style( elem, type, value, extra );
				}, type, chainable ? margin : undefined, chainable, null );
			};
		});
	});


	// The number of elements contained in the matched element set
	jQuery.fn.size = function() {
		return this.length;
	};

	jQuery.fn.andSelf = jQuery.fn.addBack;




	// Register as a named AMD module, since jQuery can be concatenated with other
	// files that may use define, but not via a proper concatenation script that
	// understands anonymous AMD modules. A named AMD is safest and most robust
	// way to register. Lowercase jquery is used because AMD module names are
	// derived from file names, and jQuery is normally delivered in a lowercase
	// file name. Do this after creating the global so that if an AMD module wants
	// to call noConflict to hide this version of jQuery, it will work.

	// Note that for maximum portability, libraries that are not jQuery should
	// declare themselves as anonymous modules, and avoid setting a global if an
	// AMD loader is present. jQuery is a special case. For more information, see
	// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

	if ( true ) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
			return jQuery;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}




	var
		// Map over jQuery in case of overwrite
		_jQuery = window.jQuery,

		// Map over the $ in case of overwrite
		_$ = window.$;

	jQuery.noConflict = function( deep ) {
		if ( window.$ === jQuery ) {
			window.$ = _$;
		}

		if ( deep && window.jQuery === jQuery ) {
			window.jQuery = _jQuery;
		}

		return jQuery;
	};

	// Expose jQuery and $ identifiers, even in AMD
	// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
	// and CommonJS for browser emulators (#13566)
	if ( typeof noGlobal === strundefined ) {
		window.jQuery = window.$ = jQuery;
	}




	return jQuery;

	}));


/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	
	var EE = __webpack_require__(72).EventEmitter;

	var counter = new EE();
	var count = 0;

	setInterval(function(){
	  counter.emit("count", count);
	  count++;
	}, 1000);

	module.exports = counter;


/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(80);

	module.exports = {
	  load : function(windowSlot, dataSources){
	    var lastVal = 0;
	    function rerender(){
	      windowSlot.actions.rerender();
	    }
	    dataSources.counter.on("count",function(val){
	      lastVal = val;
	      rerender();
	    });


	    return {
	      render : function(){
	        return $("<p>Hello World " + lastVal + "</p>");
	      }, unload: function(){

	      }
	    }
	  }
	}


/***/ }
/******/ ]);