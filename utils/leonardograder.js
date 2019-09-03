(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 63);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
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

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = __webpack_require__(58);

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = __webpack_require__(57);

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(8), __webpack_require__(7)))

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* tslint:disable:prefer-for-of */
/* tslint:disable*/
Object.defineProperty(exports, "__esModule", { value: true });
var jsonPath = __webpack_require__(3);
var util_1 = __webpack_require__(0);
var EqualsCheckingOperator_1 = __webpack_require__(30);
var FormulaEqualsOperator_1 = __webpack_require__(29);
var Utils = /** @class */ (function () {
    function Utils() {
    }
    Utils.AdjustRowIndexForBlanks = function (matchedRows, solrows, subRows) {
        var adjustedMatchedRowsMatrix = [];
        for (var i = 0; i < matchedRows.length; i++) {
            var nonBlankSolIndex = matchedRows[i][0];
            var nonBlankSubIndex = matchedRows[i][1];
            var actualSolIndex = solrows[nonBlankSolIndex]["actualIndex"];
            var actualSubIndex = subRows[nonBlankSubIndex]["actualIndex"];
            adjustedMatchedRowsMatrix[i] = [];
            adjustedMatchedRowsMatrix[i][0] = actualSolIndex;
            adjustedMatchedRowsMatrix[i][1] = actualSubIndex;
        }
        return adjustedMatchedRowsMatrix;
    };
    Utils.GetBlanAndNonBlankRows = function (rows) {
        var BlanAndNonBlankRows = {
            "BlankRows": [],
            "NonBlankRows": [],
        };
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            var cells = row["#cells"];
            if (util_1.isNullOrUndefined(cells)) {
                cells = [];
            }
            var allCellsBlank = true;
            for (var j = 0; j < cells.length; j++) {
                if (!util_1.isNullOrUndefined(cells[j].value) && cells[j].value.toString().length > 0) {
                    allCellsBlank = false;
                    break;
                }
            }
            row["actualIndex"] = i;
            if (allCellsBlank == true) {
                BlanAndNonBlankRows.BlankRows.push(row);
            }
            else {
                BlanAndNonBlankRows.NonBlankRows.push(row);
            }
        }
        return BlanAndNonBlankRows;
    };
    Utils.MatchPositionally = function (childSolRows, childSubRows) {
        var matchedRows = [];
        for (var i = 0; i < childSolRows.length; i++) {
            for (var j = 0; j < childSubRows.length; j++) {
                if (childSolRows[i]["index"] == childSubRows[j]["index"]) {
                    var rowPair = [i, j];
                    matchedRows.push(rowPair);
                    break;
                }
            }
        }
        return matchedRows;
    };
    Utils.GetNodes = function (node, path, skipValidationsNode, skipNonStructuralNodes) {
        if (skipValidationsNode === void 0) { skipValidationsNode = false; }
        if (skipNonStructuralNodes === void 0) { skipNonStructuralNodes = false; }
        var returnObj = [];
        var processedPath = "";
        if (util_1.isArray(path)) {
            processedPath = jsonPath.stringify(path);
        }
        else {
            processedPath = path;
        }
        var nodes = jsonPath.nodes(node, processedPath);
        if (skipValidationsNode === true || skipNonStructuralNodes === true) {
            for (var i = 0; i < nodes.length; i++) {
                var isValidationNode = false;
                var isNonStructuralNode = false;
                for (var j = 0; j < nodes[i].path.length; j++) {
                    if (skipValidationsNode === true && nodes[i].path[j] === 'validations') {
                        isValidationNode = true;
                        break;
                    }
                    else if (skipNonStructuralNodes === true && nodes[i].path[j].toString().indexOf('#') === -1) {
                        isNonStructuralNode = true;
                        continue;
                    }
                    returnObj.push(nodes[i]);
                }
            }
        }
        else {
            returnObj = nodes;
        }
        return returnObj;
    };
    Utils.GetFirstNode = function (node, path, skipValidationsNode, skipNonStructuralNodes) {
        if (skipValidationsNode === void 0) { skipValidationsNode = false; }
        if (skipNonStructuralNodes === void 0) { skipNonStructuralNodes = false; }
        return this.GetNodes(node, path, skipValidationsNode, skipNonStructuralNodes)[0];
    };
    Utils.GetCheckingOperator = function (operator) {
        // TOOD : This needs to come from Object Factory
        switch (operator.toLocaleLowerCase()) {
            case 'equals': {
                return new EqualsCheckingOperator_1.EqualsCheckingOperator();
            }
            case 'formula-equals': {
                return new FormulaEqualsOperator_1.FormulaEqualsOperator();
            }
        }
    };
    Utils.GenerateMatchedElementNode = function (matchedElementNode, solutionPath, submissionPath, matchStatus) {
        var previousSolPath = matchedElementNode.solpath;
        var previousSubPath = matchedElementNode.subpath;
        var node = {};
        // For the Root Node, this case will be hit
        if (util_1.isNullOrUndefined(previousSolPath) || matchStatus === 'extra') {
            previousSolPath = '$';
        }
        // For the Root Node, this case will be hit
        if (util_1.isNullOrUndefined(previousSubPath) || matchStatus === 'missing') {
            previousSubPath = '$';
        }
        if (matchStatus === 'missing') {
            node.subpath = '';
            node.solpath = previousSolPath + "['" + solutionPath + "']";
        }
        else if (matchStatus === 'extra') {
            node.subpath = previousSubPath + "['" + submissionPath + "']";
            node.solpath = '';
        }
        else {
            node.subpath = previousSubPath + "['" + submissionPath + "']";
            node.solpath = previousSolPath + "['" + solutionPath + "']";
        }
        node.matchstatus = matchStatus;
        return node;
    };
    /**
     *
     * @param solArray The Solution Children Nodes that were called for Matching
     * @param subArray The Submission Children Nodes that were called for Matching
     * @param matchedElmentsMatrix The Output of Munkres
     * @param matchedElementsJson The Inner Matched Elements Json that is to be updated
     */
    Utils.SolveMatchedElementsMatrix = function (solArray, subArray, matchedElmentsMatrix, matchedElementsJson) {
        var maxCountOfNodes = solArray.length > subArray.length ? solArray.length : subArray.length;
        var matchCount = matchedElmentsMatrix.length;
        var foundSubNodes = [];
        //Fetching the Node Name Entry from Matched Element Json. E.g - The Node where #Sheets Entry is there
        var matchedNode = matchedElementsJson.node[0];
        matchedNode.node = [];
        var _loop_1 = function (k) {
            var solNodePresent = matchedElmentsMatrix.find(function (element) { return element[0] === k; });
            var subNodePresent = matchedElmentsMatrix.find(function (element) { return element[1] === k; });
            if (solNodePresent !== undefined) {
                matchedNode.node.push(Utils.GenerateMatchedElementNode(matchedNode, solNodePresent[0], solNodePresent[1], 'match'));
            }
            else if (solNodePresent === undefined && k < solArray.length) {
                matchedNode.node.push(Utils.GenerateMatchedElementNode(matchedNode, k.toString(), null, 'missing'));
            }
            if (subNodePresent !== undefined || (subNodePresent === undefined && k >= subArray.length)) {
                foundSubNodes.push(k);
            }
        };
        for (var k = 0; k < maxCountOfNodes; k++) {
            _loop_1(k);
        }
        for (var i = 0; i < maxCountOfNodes; i++) {
            if (foundSubNodes.indexOf(i) === -1) {
                matchedNode.node.push(Utils.GenerateMatchedElementNode(matchedNode, null, i.toString(), 'extra'));
            }
        }
    };
    Utils.Base26ToBase10 = function (sBase26) {
        var nRetVal = 0;
        var nLen = sBase26.length;
        for (var i = nLen - 1; i >= 0; i--) {
            nRetVal = nRetVal + (sBase26[i].charCodeAt(0) - 'A'.charCodeAt(0) + 1) * Math.pow(26, nLen - 1 - i);
        }
        return nRetVal;
    };
    Utils.IsBlankObject = function (object) {
        return (Object.keys(object).length === 0 && object.constructor === Object);
    };
    /**
     * function to fetch user submitted value for a validation
     * @param matcherOutput: matcher output
     * @param map: Map of JsonPath from solutionJson cell to SubmissionJson Cell
     */
    Utils.GetSolutionToSubmissionJSONMap = function (matcherOutput, map) {
        if (map === void 0) { map = { "matchedAndMissing": {}, "extra": [] }; }
        var nodes = matcherOutput.node;
        nodes.forEach(function (nodeElem) {
            if (nodeElem.matchstatus == "match") {
                map["matchedAndMissing"][nodeElem.solpath] = nodeElem.subpath;
            }
            else if (nodeElem.matchstatus == "missing") {
                map["matchedAndMissing"][nodeElem.solpath] = null;
            }
            else if (nodeElem.matchstatus == "extra") {
                map["extra"].push(nodeElem.subpath);
            }
            if (nodeElem["node"] != null) {
                Utils.GetSolutionToSubmissionJSONMap(nodeElem, map);
            }
        }.bind(this));
        return map;
    };
    Utils.GetLevenCost = function (a, b) {
        var arr = [];
        var charCodeCache = [];
        if (a === b) {
            return 0;
        }
        var swap = a;
        // Swapping the strings if `a` is longer than `b` so we know which one is the
        // shortest & which one is the longest
        if (a.length > b.length) {
            a = b;
            b = swap;
        }
        var aLen = a.length;
        var bLen = b.length;
        if (aLen === 0) {
            return bLen;
        }
        if (bLen === 0) {
            return aLen;
        }
        // Performing suffix trimming:
        // We can linearly drop suffix common to both strings since they
        // don't increase distance at all
        // Note: `~-` is the bitwise way to perform a `- 1` operation
        while (aLen > 0 && (a.charCodeAt(~-aLen) === b.charCodeAt(~-bLen))) {
            aLen--;
            bLen--;
        }
        if (aLen === 0) {
            return bLen;
        }
        // Performing prefix trimming
        // We can linearly drop prefix common to both strings since they
        // don't increase distance at all
        var start = 0;
        while (start < aLen && (a.charCodeAt(start) === b.charCodeAt(start))) {
            start++;
        }
        aLen -= start;
        bLen -= start;
        if (aLen === 0) {
            return bLen;
        }
        var bCharCode;
        var ret;
        var tmp;
        var tmp2;
        var i = 0;
        var j = 0;
        while (i < aLen) {
            charCodeCache[start + i] = a.charCodeAt(start + i);
            arr[i] = ++i;
        }
        while (j < bLen) {
            bCharCode = b.charCodeAt(start + j);
            tmp = j++;
            ret = j;
            for (i = 0; i < aLen; i++) {
                tmp2 = bCharCode === charCodeCache[start + i] ? tmp : tmp + 0.9;
                tmp = arr[i];
                ret = arr[i] = tmp > ret ? tmp2 > ret ? ret + 1 : tmp2 : tmp2 > tmp ? tmp + 1 : tmp2;
            }
        }
        return ret;
    };
    /**
     * @param cellRef The cell reference which is to be converted into coordinates
     * This code is being used in Hints generation as well in addition to Matcher Algorithm
     */
    Utils.GetCellCoordinatesFromRef = function (cellRef) {
        var coordinates = { 'row': null, 'col': null };
        var coordinateGroup = /([A-Z]*)([0-9]*)+/.exec(cellRef);
        coordinates.row = coordinateGroup[2];
        coordinates.col = Utils.Base26ToBase10(coordinateGroup[1]);
        return coordinates;
    };
    return Utils;
}());
exports.Utils = Utils;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

/**
 * This is a helper function for getting values from parameter/options
 * objects.
 *
 * @param args The object we are extracting values from
 * @param name The name of the property we are getting.
 * @param defaultValue An optional value to return if the property is missing
 * from the object. If this is not specified and the property is missing, an
 * error will be thrown.
 */
function getArg(aArgs, aName, aDefaultValue) {
  if (aName in aArgs) {
    return aArgs[aName];
  } else if (arguments.length === 3) {
    return aDefaultValue;
  } else {
    throw new Error('"' + aName + '" is a required argument.');
  }
}
exports.getArg = getArg;

var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/;
var dataUrlRegexp = /^data:.+\,.+$/;

function urlParse(aUrl) {
  var match = aUrl.match(urlRegexp);
  if (!match) {
    return null;
  }
  return {
    scheme: match[1],
    auth: match[2],
    host: match[3],
    port: match[4],
    path: match[5]
  };
}
exports.urlParse = urlParse;

function urlGenerate(aParsedUrl) {
  var url = '';
  if (aParsedUrl.scheme) {
    url += aParsedUrl.scheme + ':';
  }
  url += '//';
  if (aParsedUrl.auth) {
    url += aParsedUrl.auth + '@';
  }
  if (aParsedUrl.host) {
    url += aParsedUrl.host;
  }
  if (aParsedUrl.port) {
    url += ":" + aParsedUrl.port
  }
  if (aParsedUrl.path) {
    url += aParsedUrl.path;
  }
  return url;
}
exports.urlGenerate = urlGenerate;

/**
 * Normalizes a path, or the path portion of a URL:
 *
 * - Replaces consecutive slashes with one slash.
 * - Removes unnecessary '.' parts.
 * - Removes unnecessary '<dir>/..' parts.
 *
 * Based on code in the Node.js 'path' core module.
 *
 * @param aPath The path or url to normalize.
 */
function normalize(aPath) {
  var path = aPath;
  var url = urlParse(aPath);
  if (url) {
    if (!url.path) {
      return aPath;
    }
    path = url.path;
  }
  var isAbsolute = exports.isAbsolute(path);

  var parts = path.split(/\/+/);
  for (var part, up = 0, i = parts.length - 1; i >= 0; i--) {
    part = parts[i];
    if (part === '.') {
      parts.splice(i, 1);
    } else if (part === '..') {
      up++;
    } else if (up > 0) {
      if (part === '') {
        // The first part is blank if the path is absolute. Trying to go
        // above the root is a no-op. Therefore we can remove all '..' parts
        // directly after the root.
        parts.splice(i + 1, up);
        up = 0;
      } else {
        parts.splice(i, 2);
        up--;
      }
    }
  }
  path = parts.join('/');

  if (path === '') {
    path = isAbsolute ? '/' : '.';
  }

  if (url) {
    url.path = path;
    return urlGenerate(url);
  }
  return path;
}
exports.normalize = normalize;

/**
 * Joins two paths/URLs.
 *
 * @param aRoot The root path or URL.
 * @param aPath The path or URL to be joined with the root.
 *
 * - If aPath is a URL or a data URI, aPath is returned, unless aPath is a
 *   scheme-relative URL: Then the scheme of aRoot, if any, is prepended
 *   first.
 * - Otherwise aPath is a path. If aRoot is a URL, then its path portion
 *   is updated with the result and aRoot is returned. Otherwise the result
 *   is returned.
 *   - If aPath is absolute, the result is aPath.
 *   - Otherwise the two paths are joined with a slash.
 * - Joining for example 'http://' and 'www.example.com' is also supported.
 */
function join(aRoot, aPath) {
  if (aRoot === "") {
    aRoot = ".";
  }
  if (aPath === "") {
    aPath = ".";
  }
  var aPathUrl = urlParse(aPath);
  var aRootUrl = urlParse(aRoot);
  if (aRootUrl) {
    aRoot = aRootUrl.path || '/';
  }

  // `join(foo, '//www.example.org')`
  if (aPathUrl && !aPathUrl.scheme) {
    if (aRootUrl) {
      aPathUrl.scheme = aRootUrl.scheme;
    }
    return urlGenerate(aPathUrl);
  }

  if (aPathUrl || aPath.match(dataUrlRegexp)) {
    return aPath;
  }

  // `join('http://', 'www.example.com')`
  if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
    aRootUrl.host = aPath;
    return urlGenerate(aRootUrl);
  }

  var joined = aPath.charAt(0) === '/'
    ? aPath
    : normalize(aRoot.replace(/\/+$/, '') + '/' + aPath);

  if (aRootUrl) {
    aRootUrl.path = joined;
    return urlGenerate(aRootUrl);
  }
  return joined;
}
exports.join = join;

exports.isAbsolute = function (aPath) {
  return aPath.charAt(0) === '/' || urlRegexp.test(aPath);
};

/**
 * Make a path relative to a URL or another path.
 *
 * @param aRoot The root path or URL.
 * @param aPath The path or URL to be made relative to aRoot.
 */
function relative(aRoot, aPath) {
  if (aRoot === "") {
    aRoot = ".";
  }

  aRoot = aRoot.replace(/\/$/, '');

  // It is possible for the path to be above the root. In this case, simply
  // checking whether the root is a prefix of the path won't work. Instead, we
  // need to remove components from the root one by one, until either we find
  // a prefix that fits, or we run out of components to remove.
  var level = 0;
  while (aPath.indexOf(aRoot + '/') !== 0) {
    var index = aRoot.lastIndexOf("/");
    if (index < 0) {
      return aPath;
    }

    // If the only part of the root that is left is the scheme (i.e. http://,
    // file:///, etc.), one or more slashes (/), or simply nothing at all, we
    // have exhausted all components, so the path is not relative to the root.
    aRoot = aRoot.slice(0, index);
    if (aRoot.match(/^([^\/]+:\/)?\/*$/)) {
      return aPath;
    }

    ++level;
  }

  // Make sure we add a "../" for each component we removed from the root.
  return Array(level + 1).join("../") + aPath.substr(aRoot.length + 1);
}
exports.relative = relative;

var supportsNullProto = (function () {
  var obj = Object.create(null);
  return !('__proto__' in obj);
}());

function identity (s) {
  return s;
}

/**
 * Because behavior goes wacky when you set `__proto__` on objects, we
 * have to prefix all the strings in our set with an arbitrary character.
 *
 * See https://github.com/mozilla/source-map/pull/31 and
 * https://github.com/mozilla/source-map/issues/30
 *
 * @param String aStr
 */
function toSetString(aStr) {
  if (isProtoString(aStr)) {
    return '$' + aStr;
  }

  return aStr;
}
exports.toSetString = supportsNullProto ? identity : toSetString;

function fromSetString(aStr) {
  if (isProtoString(aStr)) {
    return aStr.slice(1);
  }

  return aStr;
}
exports.fromSetString = supportsNullProto ? identity : fromSetString;

function isProtoString(s) {
  if (!s) {
    return false;
  }

  var length = s.length;

  if (length < 9 /* "__proto__".length */) {
    return false;
  }

  if (s.charCodeAt(length - 1) !== 95  /* '_' */ ||
      s.charCodeAt(length - 2) !== 95  /* '_' */ ||
      s.charCodeAt(length - 3) !== 111 /* 'o' */ ||
      s.charCodeAt(length - 4) !== 116 /* 't' */ ||
      s.charCodeAt(length - 5) !== 111 /* 'o' */ ||
      s.charCodeAt(length - 6) !== 114 /* 'r' */ ||
      s.charCodeAt(length - 7) !== 112 /* 'p' */ ||
      s.charCodeAt(length - 8) !== 95  /* '_' */ ||
      s.charCodeAt(length - 9) !== 95  /* '_' */) {
    return false;
  }

  for (var i = length - 10; i >= 0; i--) {
    if (s.charCodeAt(i) !== 36 /* '$' */) {
      return false;
    }
  }

  return true;
}

/**
 * Comparator between two mappings where the original positions are compared.
 *
 * Optionally pass in `true` as `onlyCompareGenerated` to consider two
 * mappings with the same original source/line/column, but different generated
 * line and column the same. Useful when searching for a mapping with a
 * stubbed out mapping.
 */
function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
  var cmp = strcmp(mappingA.source, mappingB.source);
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalLine - mappingB.originalLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalColumn - mappingB.originalColumn;
  if (cmp !== 0 || onlyCompareOriginal) {
    return cmp;
  }

  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.generatedLine - mappingB.generatedLine;
  if (cmp !== 0) {
    return cmp;
  }

  return strcmp(mappingA.name, mappingB.name);
}
exports.compareByOriginalPositions = compareByOriginalPositions;

/**
 * Comparator between two mappings with deflated source and name indices where
 * the generated positions are compared.
 *
 * Optionally pass in `true` as `onlyCompareGenerated` to consider two
 * mappings with the same generated line and column, but different
 * source/name/original line and column the same. Useful when searching for a
 * mapping with a stubbed out mapping.
 */
function compareByGeneratedPositionsDeflated(mappingA, mappingB, onlyCompareGenerated) {
  var cmp = mappingA.generatedLine - mappingB.generatedLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
  if (cmp !== 0 || onlyCompareGenerated) {
    return cmp;
  }

  cmp = strcmp(mappingA.source, mappingB.source);
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalLine - mappingB.originalLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalColumn - mappingB.originalColumn;
  if (cmp !== 0) {
    return cmp;
  }

  return strcmp(mappingA.name, mappingB.name);
}
exports.compareByGeneratedPositionsDeflated = compareByGeneratedPositionsDeflated;

function strcmp(aStr1, aStr2) {
  if (aStr1 === aStr2) {
    return 0;
  }

  if (aStr1 === null) {
    return 1; // aStr2 !== null
  }

  if (aStr2 === null) {
    return -1; // aStr1 !== null
  }

  if (aStr1 > aStr2) {
    return 1;
  }

  return -1;
}

/**
 * Comparator between two mappings with inflated source and name strings where
 * the generated positions are compared.
 */
function compareByGeneratedPositionsInflated(mappingA, mappingB) {
  var cmp = mappingA.generatedLine - mappingB.generatedLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = strcmp(mappingA.source, mappingB.source);
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalLine - mappingB.originalLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalColumn - mappingB.originalColumn;
  if (cmp !== 0) {
    return cmp;
  }

  return strcmp(mappingA.name, mappingB.name);
}
exports.compareByGeneratedPositionsInflated = compareByGeneratedPositionsInflated;

/**
 * Strip any JSON XSSI avoidance prefix from the string (as documented
 * in the source maps specification), and then parse the string as
 * JSON.
 */
function parseSourceMapInput(str) {
  return JSON.parse(str.replace(/^\)]}'[^\n]*\n/, ''));
}
exports.parseSourceMapInput = parseSourceMapInput;

/**
 * Compute the URL of a source given the the source root, the source's
 * URL, and the source map's URL.
 */
function computeSourceURL(sourceRoot, sourceURL, sourceMapURL) {
  sourceURL = sourceURL || '';

  if (sourceRoot) {
    // This follows what Chrome does.
    if (sourceRoot[sourceRoot.length - 1] !== '/' && sourceURL[0] !== '/') {
      sourceRoot += '/';
    }
    // The spec says:
    //   Line 4: An optional source root, useful for relocating source
    //   files on a server or removing repeated values in the
    //   “sources” entry.  This value is prepended to the individual
    //   entries in the “source” field.
    sourceURL = sourceRoot + sourceURL;
  }

  // Historically, SourceMapConsumer did not take the sourceMapURL as
  // a parameter.  This mode is still somewhat supported, which is why
  // this code block is conditional.  However, it's preferable to pass
  // the source map URL to SourceMapConsumer, so that this function
  // can implement the source URL resolution algorithm as outlined in
  // the spec.  This block is basically the equivalent of:
  //    new URL(sourceURL, sourceMapURL).toString()
  // ... except it avoids using URL, which wasn't available in the
  // older releases of node still supported by this library.
  //
  // The spec says:
  //   If the sources are not absolute URLs after prepending of the
  //   “sourceRoot”, the sources are resolved relative to the
  //   SourceMap (like resolving script src in a html document).
  if (sourceMapURL) {
    var parsed = urlParse(sourceMapURL);
    if (!parsed) {
      throw new Error("sourceMapURL could not be parsed");
    }
    if (parsed.path) {
      // Strip the last path component, but keep the "/".
      var index = parsed.path.lastIndexOf('/');
      if (index >= 0) {
        parsed.path = parsed.path.substring(0, index + 1);
      }
    }
    sourceURL = join(urlGenerate(parsed), sourceURL);
  }

  return normalize(sourceURL);
}
exports.computeSourceURL = computeSourceURL;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(16);


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationStatus = {
    PASS: "pass",
    FAIL: "fail",
    PARTIAL: "partial"
};
exports.RuleStatus = {
    PASS: "pass",
    FAIL: "fail",
    PARTIAL: "partial"
};
exports.Rules = {
    ALL: "All",
    ANY: "Any",
    SUM: "Sum",
    VALIDATION: "Validation"
};
exports.FeedbackText = {
    SUCCESS: "SuccessText",
    FAILURE: "FailureText"
};
exports.HintsType = {
    CELLBASED: "CellBased",
    RULEBASED: "RuleBased"
};


/***/ }),
/* 5 */
/***/ (function(module, exports) {

/**
 * Introduction
 * ============
 *
 * The Munkres module provides an implementation of the Munkres algorithm
 * (also called the Hungarian algorithm or the Kuhn-Munkres algorithm),
 * useful for solving the Assignment Problem.
 *
 * Assignment Problem
 * ==================
 *
 * Let C be an n×n-matrix representing the costs of each of n workers
 * to perform any of n jobs. The assignment problem is to assign jobs to
 * workers in a way that minimizes the total cost. Since each worker can perform
 * only one job and each job can be assigned to only one worker the assignments
 * represent an independent set of the matrix C.
 *
 * One way to generate the optimal set is to create all permutations of
 * the indices necessary to traverse the matrix so that no row and column
 * are used more than once. For instance, given this matrix (expressed in
 * Python)
 *
 *  matrix = [[5, 9, 1],
 *        [10, 3, 2],
 *        [8, 7, 4]]
 *
 * You could use this code to generate the traversal indices::
 *
 *  def permute(a, results):
 *    if len(a) == 1:
 *      results.insert(len(results), a)
 *
 *    else:
 *      for i in range(0, len(a)):
 *        element = a[i]
 *        a_copy = [a[j] for j in range(0, len(a)) if j != i]
 *        subresults = []
 *        permute(a_copy, subresults)
 *        for subresult in subresults:
 *          result = [element] + subresult
 *          results.insert(len(results), result)
 *
 *  results = []
 *  permute(range(len(matrix)), results) # [0, 1, 2] for a 3x3 matrix
 *
 * After the call to permute(), the results matrix would look like this::
 *
 *  [[0, 1, 2],
 *   [0, 2, 1],
 *   [1, 0, 2],
 *   [1, 2, 0],
 *   [2, 0, 1],
 *   [2, 1, 0]]
 *
 * You could then use that index matrix to loop over the original cost matrix
 * and calculate the smallest cost of the combinations
 *
 *  n = len(matrix)
 *  minval = sys.maxsize
 *  for row in range(n):
 *    cost = 0
 *    for col in range(n):
 *      cost += matrix[row][col]
 *    minval = min(cost, minval)
 *
 *  print minval
 *
 * While this approach works fine for small matrices, it does not scale. It
 * executes in O(n!) time: Calculating the permutations for an n×x-matrix
 * requires n! operations. For a 12×12 matrix, that’s 479,001,600
 * traversals. Even if you could manage to perform each traversal in just one
 * millisecond, it would still take more than 133 hours to perform the entire
 * traversal. A 20×20 matrix would take 2,432,902,008,176,640,000 operations. At
 * an optimistic millisecond per operation, that’s more than 77 million years.
 *
 * The Munkres algorithm runs in O(n³) time, rather than O(n!). This
 * package provides an implementation of that algorithm.
 *
 * This version is based on
 * http://csclab.murraystate.edu/~bob.pilgrim/445/munkres.html
 *
 * This version was originally written for Python by Brian Clapper from the
 * algorithm at the above web site (The ``Algorithm::Munkres`` Perl version,
 * in CPAN, was clearly adapted from the same web site.) and ported to
 * JavaScript by Anna Henningsen (addaleax).
 *
 * Usage
 * =====
 *
 * Construct a Munkres object
 *
 *  var m = new Munkres();
 *
 * Then use it to compute the lowest cost assignment from a cost matrix. Here’s
 * a sample program
 *
 *  var matrix = [[5, 9, 1],
 *           [10, 3, 2],
 *           [8, 7, 4]];
 *  var m = new Munkres();
 *  var indices = m.compute(matrix);
 *  console.log(format_matrix(matrix), 'Lowest cost through this matrix:');
 *  var total = 0;
 *  for (var i = 0; i < indices.length; ++i) {
 *    var row = indices[l][0], col = indices[l][1];
 *    var value = matrix[row][col];
 *    total += value;
 *
 *    console.log('(' + rol + ', ' + col + ') -> ' + value);
 *  }
 *
 *  console.log('total cost:', total);
 *
 * Running that program produces::
 *
 *  Lowest cost through this matrix:
 *  [5, 9, 1]
 *  [10, 3, 2]
 *  [8, 7, 4]
 *  (0, 0) -> 5
 *  (1, 1) -> 3
 *  (2, 2) -> 4
 *  total cost: 12
 *
 * The instantiated Munkres object can be used multiple times on different
 * matrices.
 *
 * Non-square Cost Matrices
 * ========================
 *
 * The Munkres algorithm assumes that the cost matrix is square. However, it's
 * possible to use a rectangular matrix if you first pad it with 0 values to make
 * it square. This module automatically pads rectangular cost matrices to make
 * them square.
 *
 * Notes:
 *
 * - The module operates on a *copy* of the caller's matrix, so any padding will
 *   not be seen by the caller.
 * - The cost matrix must be rectangular or square. An irregular matrix will
 *   *not* work.
 *
 * Calculating Profit, Rather than Cost
 * ====================================
 *
 * The cost matrix is just that: A cost matrix. The Munkres algorithm finds
 * the combination of elements (one from each row and column) that results in
 * the smallest cost. It’s also possible to use the algorithm to maximize
 * profit. To do that, however, you have to convert your profit matrix to a
 * cost matrix. The simplest way to do that is to subtract all elements from a
 * large value.
 *
 * The ``munkres`` module provides a convenience method for creating a cost
 * matrix from a profit matrix, i.e. make_cost_matrix.
 *
 * References
 * ==========
 *
 * 1. http://www.public.iastate.edu/~ddoty/HungarianAlgorithm.html
 *
 * 2. Harold W. Kuhn. The Hungarian Method for the assignment problem.
 *    *Naval Research Logistics Quarterly*, 2:83-97, 1955.
 *
 * 3. Harold W. Kuhn. Variants of the Hungarian method for assignment
 *    problems. *Naval Research Logistics Quarterly*, 3: 253-258, 1956.
 *
 * 4. Munkres, J. Algorithms for the Assignment and Transportation Problems.
 *    *Journal of the Society of Industrial and Applied Mathematics*,
 *    5(1):32-38, March, 1957.
 *
 * 5. https://en.wikipedia.org/wiki/Hungarian_algorithm
 *
 * Copyright and License
 * =====================
 * 
 * Copyright 2008-2016 Brian M. Clapper
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * A very large numerical value which can be used like an integer
 * (i. e., adding integers of similar size does not result in overflow).
 */
var MAX_SIZE = parseInt(Number.MAX_SAFE_INTEGER/2) || ((1 << 26)*(1 << 26));

/**
 * A default value to pad the cost matrix with if it is not quadratic.
 */
var DEFAULT_PAD_VALUE = 0;

// ---------------------------------------------------------------------------
// Classes
// ---------------------------------------------------------------------------

/**
 * Calculate the Munkres solution to the classical assignment problem.
 * See the module documentation for usage.
 * @constructor
 */
function Munkres() {
  this.C = null;

  this.row_covered = [];
  this.col_covered = [];
  this.n = 0;
  this.Z0_r = 0;
  this.Z0_c = 0;
  this.marked = null;
  this.path = null;
}

/**
 * Pad a possibly non-square matrix to make it square.
 *
 * @param {Array} matrix An array of arrays containing the matrix cells
 * @param {Number} [pad_value] The value used to pad a rectangular matrix
 *
 * @return {Array} An array of arrays representing the padded matrix
 */
Munkres.prototype.pad_matrix = function(matrix, pad_value) {
  pad_value = pad_value || DEFAULT_PAD_VALUE;

  var max_columns = 0;
  var total_rows = matrix.length;
  var i;

  for (i = 0; i < total_rows; ++i)
    if (matrix[i].length > max_columns)
      max_columns = matrix[i].length;

  total_rows = max_columns > total_rows ? max_columns : total_rows;

  var new_matrix = [];

  for (i = 0; i < total_rows; ++i) {
    var row = matrix[i] || [];
    var new_row = row.slice();

    // If this row is too short, pad it
    while (total_rows > new_row.length)
      new_row.push(pad_value);

    new_matrix.push(new_row);
  }

  return new_matrix;
};

/**
 * Compute the indices for the lowest-cost pairings between rows and columns
 * in the database. Returns a list of (row, column) tuples that can be used
 * to traverse the matrix.
 *
 * **WARNING**: This code handles square and rectangular matrices.
 * It does *not* handle irregular matrices.
 *
 * @param {Array} cost_matrix The cost matrix. If this cost matrix is not square,
 *                            it will be padded with DEFAULT_PAD_VALUE. Optionally,
 *                            the pad value can be specified via options.padValue.
 *                            This method does *not* modify the caller's matrix.
 *                            It operates on a copy of the matrix.
 * @param {Object} [options] Additional options to pass in
 * @param {Number} [options.padValue] The value to use to pad a rectangular cost_matrix
 *
 * @return {Array} An array of ``(row, column)`` arrays that describe the lowest
 *                 cost path through the matrix
 */
Munkres.prototype.compute = function(cost_matrix, options) {

  options = options || {};
  options.padValue = options.padValue || DEFAULT_PAD_VALUE;

  this.C = this.pad_matrix(cost_matrix, options.padValue);
  this.n = this.C.length;
  this.original_length = cost_matrix.length;
  this.original_width = cost_matrix[0].length;

  var nfalseArray = []; /* array of n false values */
  while (nfalseArray.length < this.n)
    nfalseArray.push(false);
  this.row_covered = nfalseArray.slice();
  this.col_covered = nfalseArray.slice();
  this.Z0_r = 0;
  this.Z0_c = 0;
  this.path =   this.__make_matrix(this.n * 2, 0);
  this.marked = this.__make_matrix(this.n, 0);

  var step = 1;

  var steps = { 1 : this.__step1,
                2 : this.__step2,
                3 : this.__step3,
                4 : this.__step4,
                5 : this.__step5,
                6 : this.__step6 };

  while (true) {
    var func = steps[step];
    if (!func) // done
      break;

    step = func.apply(this);
  }

  var results = [];
  for (var i = 0; i < this.original_length; ++i)
    for (var j = 0; j < this.original_width; ++j)
      if (this.marked[i][j] == 1)
        results.push([i, j]);

  return results;
};

/**
 * Create an n×n matrix, populating it with the specific value.
 *
 * @param {Number} n Matrix dimensions
 * @param {Number} val Value to populate the matrix with
 *
 * @return {Array} An array of arrays representing the newly created matrix
 */
Munkres.prototype.__make_matrix = function(n, val) {
  var matrix = [];
  for (var i = 0; i < n; ++i) {
    matrix[i] = [];
    for (var j = 0; j < n; ++j)
      matrix[i][j] = val;
  }

  return matrix;
};

/**
 * For each row of the matrix, find the smallest element and
 * subtract it from every element in its row. Go to Step 2.
 */
Munkres.prototype.__step1 = function() {
  for (var i = 0; i < this.n; ++i) {
    // Find the minimum value for this row and subtract that minimum
    // from every element in the row.
    var minval = Math.min.apply(Math, this.C[i]);

    for (var j = 0; j < this.n; ++j)
      this.C[i][j] -= minval;
  }

  return 2;
};

/**
 * Find a zero (Z) in the resulting matrix. If there is no starred
 * zero in its row or column, star Z. Repeat for each element in the
 * matrix. Go to Step 3.
 */
Munkres.prototype.__step2 = function() {
  for (var i = 0; i < this.n; ++i) {
    for (var j = 0; j < this.n; ++j) {
      if (this.C[i][j] === 0 &&
        !this.col_covered[j] &&
        !this.row_covered[i])
      {
        this.marked[i][j] = 1;
        this.col_covered[j] = true;
        this.row_covered[i] = true;
        break;
      }
    }
  }

  this.__clear_covers();

  return 3;
};

/**
 * Cover each column containing a starred zero. If K columns are
 * covered, the starred zeros describe a complete set of unique
 * assignments. In this case, Go to DONE, otherwise, Go to Step 4.
 */
Munkres.prototype.__step3 = function() {
  var count = 0;

  for (var i = 0; i < this.n; ++i) {
    for (var j = 0; j < this.n; ++j) {
      if (this.marked[i][j] == 1 && this.col_covered[j] == false) {
        this.col_covered[j] = true;
        ++count;
      }
    }
  }

  return (count >= this.n) ? 7 : 4;
};

/**
 * Find a noncovered zero and prime it. If there is no starred zero
 * in the row containing this primed zero, Go to Step 5. Otherwise,
 * cover this row and uncover the column containing the starred
 * zero. Continue in this manner until there are no uncovered zeros
 * left. Save the smallest uncovered value and Go to Step 6.
 */

Munkres.prototype.__step4 = function() {
  var done = false;
  var row = -1, col = -1, star_col = -1;

  while (!done) {
    var z = this.__find_a_zero();
    row = z[0];
    col = z[1];

    if (row < 0)
      return 6;

    this.marked[row][col] = 2;
    star_col = this.__find_star_in_row(row);
    if (star_col >= 0) {
      col = star_col;
      this.row_covered[row] = true;
      this.col_covered[col] = false;
    } else {
      this.Z0_r = row;
      this.Z0_c = col;
      return 5;
    }
  }
};

/**
 * Construct a series of alternating primed and starred zeros as
 * follows. Let Z0 represent the uncovered primed zero found in Step 4.
 * Let Z1 denote the starred zero in the column of Z0 (if any).
 * Let Z2 denote the primed zero in the row of Z1 (there will always
 * be one). Continue until the series terminates at a primed zero
 * that has no starred zero in its column. Unstar each starred zero
 * of the series, star each primed zero of the series, erase all
 * primes and uncover every line in the matrix. Return to Step 3
 */
Munkres.prototype.__step5 = function() {
  var count = 0;

  this.path[count][0] = this.Z0_r;
  this.path[count][1] = this.Z0_c;
  var done = false;

  while (!done) {
    var row = this.__find_star_in_col(this.path[count][1]);
    if (row >= 0) {
      count++;
      this.path[count][0] = row;
      this.path[count][1] = this.path[count-1][1];
    } else {
      done = true;
    }

    if (!done) {
      var col = this.__find_prime_in_row(this.path[count][0]);
      count++;
      this.path[count][0] = this.path[count-1][0];
      this.path[count][1] = col;
    }
  }

  this.__convert_path(this.path, count);
  this.__clear_covers();
  this.__erase_primes();
  return 3;
};

/**
 * Add the value found in Step 4 to every element of each covered
 * row, and subtract it from every element of each uncovered column.
 * Return to Step 4 without altering any stars, primes, or covered
 * lines.
 */
Munkres.prototype.__step6 = function() {
  var minval = this.__find_smallest();

  for (var i = 0; i < this.n; ++i) {
    for (var j = 0; j < this.n; ++j) {
      if (this.row_covered[i])
        this.C[i][j] += minval;
      if (!this.col_covered[j])
        this.C[i][j] -= minval;
    }
  }

  return 4;
};

/**
 * Find the smallest uncovered value in the matrix.
 *
 * @return {Number} The smallest uncovered value, or MAX_SIZE if no value was found
 */
Munkres.prototype.__find_smallest = function() {
  var minval = MAX_SIZE;

  for (var i = 0; i < this.n; ++i)
    for (var j = 0; j < this.n; ++j)
      if (!this.row_covered[i] && !this.col_covered[j])
        if (minval > this.C[i][j])
          minval = this.C[i][j];

  return minval;
};

/**
 * Find the first uncovered element with value 0.
 *
 * @return {Array} The indices of the found element or [-1, -1] if not found
 */
Munkres.prototype.__find_a_zero = function() {
  for (var i = 0; i < this.n; ++i)
    for (var j = 0; j < this.n; ++j)
      if (this.C[i][j] === 0 &&
        !this.row_covered[i] &&
        !this.col_covered[j])
        return [i, j];

  return [-1, -1];
};

/**
 * Find the first starred element in the specified row. Returns
 * the column index, or -1 if no starred element was found.
 *
 * @param {Number} row The index of the row to search
 * @return {Number}
 */

Munkres.prototype.__find_star_in_row = function(row) {
  for (var j = 0; j < this.n; ++j)
    if (this.marked[row][j] == 1)
      return j;

  return -1;
};

/**
 * Find the first starred element in the specified column.
 *
 * @return {Number} The row index, or -1 if no starred element was found
 */
Munkres.prototype.__find_star_in_col = function(col) {
  for (var i = 0; i < this.n; ++i)
    if (this.marked[i][col] == 1)
      return i;

  return -1;
};

/**
 * Find the first prime element in the specified row.
 *
 * @return {Number} The column index, or -1 if no prime element was found
 */

Munkres.prototype.__find_prime_in_row = function(row) {
  for (var j = 0; j < this.n; ++j)
    if (this.marked[row][j] == 2)
      return j;

  return -1;
};

Munkres.prototype.__convert_path = function(path, count) {
  for (var i = 0; i <= count; ++i)
    this.marked[path[i][0]][path[i][1]] =
      (this.marked[path[i][0]][path[i][1]] == 1) ? 0 : 1;
};

/** Clear all covered matrix cells */
Munkres.prototype.__clear_covers = function() {
  for (var i = 0; i < this.n; ++i) {
    this.row_covered[i] = false;
    this.col_covered[i] = false;
  }
};

/** Erase all prime markings */
Munkres.prototype.__erase_primes = function() {
  for (var i = 0; i < this.n; ++i)
    for (var j = 0; j < this.n; ++j)
      if (this.marked[i][j] == 2)
        this.marked[i][j] = 0;
};

// ---------------------------------------------------------------------------
// Functions
// ---------------------------------------------------------------------------

/**
 * Create a cost matrix from a profit matrix by calling
 * 'inversion_function' to invert each value. The inversion
 * function must take one numeric argument (of any type) and return
 * another numeric argument which is presumed to be the cost inverse
 * of the original profit.
 *
 * This is a static method. Call it like this:
 *
 *  cost_matrix = make_cost_matrix(matrix[, inversion_func]);
 *
 * For example:
 *
 *  cost_matrix = make_cost_matrix(matrix, function(x) { return MAXIMUM - x; });
 *
 * @param {Array} profit_matrix An array of arrays representing the matrix
 *                              to convert from a profit to a cost matrix
 * @param {Function} [inversion_function] The function to use to invert each
 *                                       entry in the profit matrix
 *
 * @return {Array} The converted matrix
 */
function make_cost_matrix (profit_matrix, inversion_function) {
  var i, j;
  if (!inversion_function) {
    var maximum = -1.0/0.0;
    for (i = 0; i < profit_matrix.length; ++i)
      for (j = 0; j < profit_matrix[i].length; ++j)
        if (profit_matrix[i][j] > maximum)
          maximum = profit_matrix[i][j];

    inversion_function = function(x) { return maximum - x; };
  }

  var cost_matrix = [];

  for (i = 0; i < profit_matrix.length; ++i) {
    var row = profit_matrix[i];
    cost_matrix[i] = [];

    for (j = 0; j < row.length; ++j)
      cost_matrix[i][j] = inversion_function(profit_matrix[i][j]);
  }

  return cost_matrix;
}

/**
 * Convenience function: Converts the contents of a matrix of integers
 * to a printable string.
 *
 * @param {Array} matrix The matrix to print
 *
 * @return {String} The formatted matrix
 */
function format_matrix(matrix) {
  var columnWidths = [];
  var i, j;
  for (i = 0; i < matrix.length; ++i) {
    for (j = 0; j < matrix[i].length; ++j) {
      var entryWidth = String(matrix[i][j]).length;

      if (!columnWidths[j] || entryWidth >= columnWidths[j])
        columnWidths[j] = entryWidth;
    }
  }

  var formatted = '';
  for (i = 0; i < matrix.length; ++i) {
    for (j = 0; j < matrix[i].length; ++j) {
      var s = String(matrix[i][j]);

      // pad at front with spaces
      while (s.length < columnWidths[j])
        s = ' ' + s;

      formatted += s;

      // separate columns
      if (j != matrix[i].length - 1)
        formatted += ' ';
    }

    if (i != matrix[i].length - 1)
      formatted += '\n';
  }

  return formatted;
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

function computeMunkres(cost_matrix, options) {
  var m = new Munkres();
  return m.compute(cost_matrix, options);
}

computeMunkres.version = "1.2.2";
computeMunkres.format_matrix = format_matrix;
computeMunkres.make_cost_matrix = make_cost_matrix;
computeMunkres.Munkres = Munkres; // backwards compatibility

if (typeof module !== 'undefined' && module.exports) {
  module.exports = computeMunkres;
}


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var DefaultOOOMatcher_1 = __webpack_require__(26);
var PositionalMatcher_1 = __webpack_require__(25);
var SheetOOOMatchingStrategy_1 = __webpack_require__(24);
var RowOOOMatchingStrategy_1 = __webpack_require__(23);
var CellOOOMatchingStrategy_1 = __webpack_require__(9);
var Factory = /** @class */ (function () {
    function Factory() {
    }
    Factory.GetObject = function (name) {
        switch (name) {
            case 'DefaultOOOMatcher': return new DefaultOOOMatcher_1.DefaultOOOMatcher();
            case 'PositionalMatcher': return new PositionalMatcher_1.PositionalMatcher();
            case 'SheetOOOMatchingStrategy': return new SheetOOOMatchingStrategy_1.SheetOOOMatchingStrategy();
            case 'RowOOOMatchingStrategy': return new RowOOOMatchingStrategy_1.RowOOOMatchingStrategy();
            case 'CellOOOMatchingStrategy': return new CellOOOMatchingStrategy_1.CellOOOMatchingStrategy();
        }
    };
    return Factory;
}());
exports.Factory = Factory;


/***/ }),
/* 7 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
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
    var timeout = runTimeout(cleanUpNextTick);
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
    runClearTimeout(timeout);
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
        runTimeout(drainQueue);
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
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 8 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var munkres = __webpack_require__(5);
var util_1 = __webpack_require__(0);
var Utils_1 = __webpack_require__(1);
var CellOOOMatchingStrategy = /** @class */ (function () {
    function CellOOOMatchingStrategy() {
    }
    /**
     *
     * @param solutionJson The Solution Cells Array
     * @param submissionJson The Submission Cells Array
     * @param matchedElementsJson The Inner Matched Elements JSON
     */
    CellOOOMatchingStrategy.prototype.MatchNodes = function (solutionJson, submissionJson, matchedElementsJson, matchSettings) {
        if (util_1.isNullOrUndefined(solutionJson)) {
            matchedElementsJson.node[0].node = [];
            for (var i = 0; i < submissionJson.length; i++) {
                matchedElementsJson.node[0].node.push(Utils_1.Utils.GenerateMatchedElementNode(matchedElementsJson.node[0], null, i.toString(), 'extra'));
            }
        }
        else if (util_1.isNullOrUndefined(submissionJson)) {
            matchedElementsJson.node[0].node = [];
            for (var i = 0; i < solutionJson.length; i++) {
                matchedElementsJson.node[0].node.push(Utils_1.Utils.GenerateMatchedElementNode(matchedElementsJson.node[0], i.toString(), null, 'missing'));
            }
        }
        else {
            var matchedNodesMatrix = void 0;
            if (matchSettings.cellRefWeightage == 1) {
                matchedNodesMatrix = Utils_1.Utils.MatchPositionally(solutionJson, submissionJson);
            }
            else {
                var matchCostMatrix = this.ReturnCellCost(solutionJson, submissionJson, matchedElementsJson, matchSettings);
                matchedNodesMatrix = munkres(matchCostMatrix);
            }
            Utils_1.Utils.SolveMatchedElementsMatrix(solutionJson, submissionJson, matchedNodesMatrix, matchedElementsJson);
        }
    };
    /**
     * Returns the Cost to Match Solution & Submission Cells Arrays
     * @param solutionCellArray The Solution Cell Array
     * @param submissionCellArray The Submission Cell Array
     * @param matchSettings The Match Settings JSON
     */
    CellOOOMatchingStrategy.prototype.ReturnCellCost = function (solutionCellArray, submissionCellArray, matchingStrategy, matchSettings) {
        var maxCountOfCells = solutionCellArray.length > submissionCellArray.length ? solutionCellArray.length : submissionCellArray.length;
        var cellCostMatrix = [];
        var solCellsLength = solutionCellArray.length;
        var subCellsLength = submissionCellArray.length;
        var maxRows = 200;
        var maxCols = 50;
        if (!util_1.isNullOrUndefined(matchSettings.maxRows)) {
            maxRows = matchSettings.maxRows;
        }
        if (!util_1.isNullOrUndefined(matchSettings.maxCols)) {
            maxCols = matchSettings.maxCols;
        }
        var rowDeltaFactor = 100 / maxRows;
        var colDeltaFactor = 100 / maxCols;
        for (var solCellIndex = 0; solCellIndex < solCellsLength; solCellIndex++) {
            cellCostMatrix[solCellIndex] = [];
            var solCell = '';
            if (!util_1.isNullOrUndefined(solutionCellArray[solCellIndex].value)) {
                solCell = solutionCellArray[solCellIndex].value;
            }
            for (var subCellIndex = 0; subCellIndex < subCellsLength; subCellIndex++) {
                var subCell = '';
                if (!util_1.isNullOrUndefined(submissionCellArray[subCellIndex].value)) {
                    subCell = submissionCellArray[subCellIndex].value;
                }
                var weightageCellValue = parseFloat(matchSettings.textWeightage);
                var weightageRef = parseFloat(matchSettings.cellRefWeightage);
                var costBlankNonBlank = 0;
                var costCellValue;
                var cellSolValueNumerical = parseFloat(solCell);
                var cellSubValueNumerical = parseFloat(subCell);
                if (isNaN(cellSolValueNumerical) || isNaN(cellSubValueNumerical)) {
                    //If either cell isn't a number, evaluate cost for them as strings(LD)
                    var solStringLength = solCell.toString().length;
                    var subStringLength = subCell.toString().length;
                    if (solStringLength == 0 && subStringLength != 0) {
                        costCellValue = 100;
                    }
                    else if (solStringLength == 0 && subStringLength == 0) {
                        costCellValue = 0;
                    }
                    else {
                        var levenDist = Utils_1.Utils.GetLevenCost(solCell.toString(), subCell.toString());
                        costCellValue = (levenDist / Math.max(solStringLength, subStringLength)) * 100;
                    }
                }
                else {
                    //If both cells are numbers, evaluate cost for them as numbers
                    var additionFactor = (Math.abs(cellSolValueNumerical - cellSubValueNumerical)) * 0.0001;
                    if (cellSolValueNumerical != cellSubValueNumerical) {
                        costCellValue = Math.abs(cellSolValueNumerical - cellSubValueNumerical) / Math.max(Math.abs(cellSolValueNumerical + additionFactor), Math.abs(cellSubValueNumerical + additionFactor)) * 100;
                    }
                    else {
                        costCellValue = 0;
                    }
                }
                var solCordinates = Utils_1.Utils.GetCellCoordinatesFromRef(solutionCellArray[solCellIndex].ref);
                var subCoordinates = Utils_1.Utils.GetCellCoordinatesFromRef(submissionCellArray[subCellIndex].ref);
                var rowDelta = Math.abs(solCordinates.row - subCoordinates.row);
                var colDelta = Math.abs(solCordinates.col - subCoordinates.col);
                //cost calculation
                var cost = (costCellValue * weightageCellValue) + (colDelta * colDeltaFactor * (weightageRef / 2)) + (rowDelta * rowDeltaFactor * (weightageRef / 2));
                cellCostMatrix[solCellIndex][subCellIndex] = cost;
            }
        }
        return cellCostMatrix;
    };
    return CellOOOMatchingStrategy;
}());
exports.CellOOOMatchingStrategy = CellOOOMatchingStrategy;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var util = __webpack_require__(2);
var has = Object.prototype.hasOwnProperty;
var hasNativeMap = typeof Map !== "undefined";

/**
 * A data structure which is a combination of an array and a set. Adding a new
 * member is O(1), testing for membership is O(1), and finding the index of an
 * element is O(1). Removing elements from the set is not supported. Only
 * strings are supported for membership.
 */
function ArraySet() {
  this._array = [];
  this._set = hasNativeMap ? new Map() : Object.create(null);
}

/**
 * Static method for creating ArraySet instances from an existing array.
 */
ArraySet.fromArray = function ArraySet_fromArray(aArray, aAllowDuplicates) {
  var set = new ArraySet();
  for (var i = 0, len = aArray.length; i < len; i++) {
    set.add(aArray[i], aAllowDuplicates);
  }
  return set;
};

/**
 * Return how many unique items are in this ArraySet. If duplicates have been
 * added, than those do not count towards the size.
 *
 * @returns Number
 */
ArraySet.prototype.size = function ArraySet_size() {
  return hasNativeMap ? this._set.size : Object.getOwnPropertyNames(this._set).length;
};

/**
 * Add the given string to this set.
 *
 * @param String aStr
 */
ArraySet.prototype.add = function ArraySet_add(aStr, aAllowDuplicates) {
  var sStr = hasNativeMap ? aStr : util.toSetString(aStr);
  var isDuplicate = hasNativeMap ? this.has(aStr) : has.call(this._set, sStr);
  var idx = this._array.length;
  if (!isDuplicate || aAllowDuplicates) {
    this._array.push(aStr);
  }
  if (!isDuplicate) {
    if (hasNativeMap) {
      this._set.set(aStr, idx);
    } else {
      this._set[sStr] = idx;
    }
  }
};

/**
 * Is the given string a member of this set?
 *
 * @param String aStr
 */
ArraySet.prototype.has = function ArraySet_has(aStr) {
  if (hasNativeMap) {
    return this._set.has(aStr);
  } else {
    var sStr = util.toSetString(aStr);
    return has.call(this._set, sStr);
  }
};

/**
 * What is the index of the given string in the array?
 *
 * @param String aStr
 */
ArraySet.prototype.indexOf = function ArraySet_indexOf(aStr) {
  if (hasNativeMap) {
    var idx = this._set.get(aStr);
    if (idx >= 0) {
        return idx;
    }
  } else {
    var sStr = util.toSetString(aStr);
    if (has.call(this._set, sStr)) {
      return this._set[sStr];
    }
  }

  throw new Error('"' + aStr + '" is not in the set.');
};

/**
 * What is the element at the given index?
 *
 * @param Number aIdx
 */
ArraySet.prototype.at = function ArraySet_at(aIdx) {
  if (aIdx >= 0 && aIdx < this._array.length) {
    return this._array[aIdx];
  }
  throw new Error('No element indexed by ' + aIdx);
};

/**
 * Returns the array representation of this set (which has the proper indices
 * indicated by indexOf). Note that this is a copy of the internal array used
 * for storing the members so that no one can mess with internal state.
 */
ArraySet.prototype.toArray = function ArraySet_toArray() {
  return this._array.slice();
};

exports.ArraySet = ArraySet;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 *
 * Based on the Base 64 VLQ implementation in Closure Compiler:
 * https://code.google.com/p/closure-compiler/source/browse/trunk/src/com/google/debugging/sourcemap/Base64VLQ.java
 *
 * Copyright 2011 The Closure Compiler Authors. All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *  * Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above
 *    copyright notice, this list of conditions and the following
 *    disclaimer in the documentation and/or other materials provided
 *    with the distribution.
 *  * Neither the name of Google Inc. nor the names of its
 *    contributors may be used to endorse or promote products derived
 *    from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

var base64 = __webpack_require__(38);

// A single base 64 digit can contain 6 bits of data. For the base 64 variable
// length quantities we use in the source map spec, the first bit is the sign,
// the next four bits are the actual value, and the 6th bit is the
// continuation bit. The continuation bit tells us whether there are more
// digits in this value following this digit.
//
//   Continuation
//   |    Sign
//   |    |
//   V    V
//   101011

var VLQ_BASE_SHIFT = 5;

// binary: 100000
var VLQ_BASE = 1 << VLQ_BASE_SHIFT;

// binary: 011111
var VLQ_BASE_MASK = VLQ_BASE - 1;

// binary: 100000
var VLQ_CONTINUATION_BIT = VLQ_BASE;

/**
 * Converts from a two-complement value to a value where the sign bit is
 * placed in the least significant bit.  For example, as decimals:
 *   1 becomes 2 (10 binary), -1 becomes 3 (11 binary)
 *   2 becomes 4 (100 binary), -2 becomes 5 (101 binary)
 */
function toVLQSigned(aValue) {
  return aValue < 0
    ? ((-aValue) << 1) + 1
    : (aValue << 1) + 0;
}

/**
 * Converts to a two-complement value from a value where the sign bit is
 * placed in the least significant bit.  For example, as decimals:
 *   2 (10 binary) becomes 1, 3 (11 binary) becomes -1
 *   4 (100 binary) becomes 2, 5 (101 binary) becomes -2
 */
function fromVLQSigned(aValue) {
  var isNegative = (aValue & 1) === 1;
  var shifted = aValue >> 1;
  return isNegative
    ? -shifted
    : shifted;
}

/**
 * Returns the base 64 VLQ encoded value.
 */
exports.encode = function base64VLQ_encode(aValue) {
  var encoded = "";
  var digit;

  var vlq = toVLQSigned(aValue);

  do {
    digit = vlq & VLQ_BASE_MASK;
    vlq >>>= VLQ_BASE_SHIFT;
    if (vlq > 0) {
      // There are still more digits in this value, so we must make sure the
      // continuation bit is marked.
      digit |= VLQ_CONTINUATION_BIT;
    }
    encoded += base64.encode(digit);
  } while (vlq > 0);

  return encoded;
};

/**
 * Decodes the next base 64 VLQ value from the given string and returns the
 * value and the rest of the string via the out parameter.
 */
exports.decode = function base64VLQ_decode(aStr, aIndex, aOutParam) {
  var strLen = aStr.length;
  var result = 0;
  var shift = 0;
  var continuation, digit;

  do {
    if (aIndex >= strLen) {
      throw new Error("Expected more digits in base 64 VLQ value.");
    }

    digit = base64.decode(aStr.charCodeAt(aIndex++));
    if (digit === -1) {
      throw new Error("Invalid base64 digit: " + aStr.charAt(aIndex - 1));
    }

    continuation = !!(digit & VLQ_CONTINUATION_BIT);
    digit &= VLQ_BASE_MASK;
    result = result + (digit << shift);
    shift += VLQ_BASE_SHIFT;
  } while (continuation);

  aOutParam.value = fromVLQSigned(result);
  aOutParam.rest = aIndex;
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var base64VLQ = __webpack_require__(11);
var util = __webpack_require__(2);
var ArraySet = __webpack_require__(10).ArraySet;
var MappingList = __webpack_require__(37).MappingList;

/**
 * An instance of the SourceMapGenerator represents a source map which is
 * being built incrementally. You may pass an object with the following
 * properties:
 *
 *   - file: The filename of the generated source.
 *   - sourceRoot: A root for all relative URLs in this source map.
 */
function SourceMapGenerator(aArgs) {
  if (!aArgs) {
    aArgs = {};
  }
  this._file = util.getArg(aArgs, 'file', null);
  this._sourceRoot = util.getArg(aArgs, 'sourceRoot', null);
  this._skipValidation = util.getArg(aArgs, 'skipValidation', false);
  this._sources = new ArraySet();
  this._names = new ArraySet();
  this._mappings = new MappingList();
  this._sourcesContents = null;
}

SourceMapGenerator.prototype._version = 3;

/**
 * Creates a new SourceMapGenerator based on a SourceMapConsumer
 *
 * @param aSourceMapConsumer The SourceMap.
 */
SourceMapGenerator.fromSourceMap =
  function SourceMapGenerator_fromSourceMap(aSourceMapConsumer) {
    var sourceRoot = aSourceMapConsumer.sourceRoot;
    var generator = new SourceMapGenerator({
      file: aSourceMapConsumer.file,
      sourceRoot: sourceRoot
    });
    aSourceMapConsumer.eachMapping(function (mapping) {
      var newMapping = {
        generated: {
          line: mapping.generatedLine,
          column: mapping.generatedColumn
        }
      };

      if (mapping.source != null) {
        newMapping.source = mapping.source;
        if (sourceRoot != null) {
          newMapping.source = util.relative(sourceRoot, newMapping.source);
        }

        newMapping.original = {
          line: mapping.originalLine,
          column: mapping.originalColumn
        };

        if (mapping.name != null) {
          newMapping.name = mapping.name;
        }
      }

      generator.addMapping(newMapping);
    });
    aSourceMapConsumer.sources.forEach(function (sourceFile) {
      var sourceRelative = sourceFile;
      if (sourceRoot !== null) {
        sourceRelative = util.relative(sourceRoot, sourceFile);
      }

      if (!generator._sources.has(sourceRelative)) {
        generator._sources.add(sourceRelative);
      }

      var content = aSourceMapConsumer.sourceContentFor(sourceFile);
      if (content != null) {
        generator.setSourceContent(sourceFile, content);
      }
    });
    return generator;
  };

/**
 * Add a single mapping from original source line and column to the generated
 * source's line and column for this source map being created. The mapping
 * object should have the following properties:
 *
 *   - generated: An object with the generated line and column positions.
 *   - original: An object with the original line and column positions.
 *   - source: The original source file (relative to the sourceRoot).
 *   - name: An optional original token name for this mapping.
 */
SourceMapGenerator.prototype.addMapping =
  function SourceMapGenerator_addMapping(aArgs) {
    var generated = util.getArg(aArgs, 'generated');
    var original = util.getArg(aArgs, 'original', null);
    var source = util.getArg(aArgs, 'source', null);
    var name = util.getArg(aArgs, 'name', null);

    if (!this._skipValidation) {
      this._validateMapping(generated, original, source, name);
    }

    if (source != null) {
      source = String(source);
      if (!this._sources.has(source)) {
        this._sources.add(source);
      }
    }

    if (name != null) {
      name = String(name);
      if (!this._names.has(name)) {
        this._names.add(name);
      }
    }

    this._mappings.add({
      generatedLine: generated.line,
      generatedColumn: generated.column,
      originalLine: original != null && original.line,
      originalColumn: original != null && original.column,
      source: source,
      name: name
    });
  };

/**
 * Set the source content for a source file.
 */
SourceMapGenerator.prototype.setSourceContent =
  function SourceMapGenerator_setSourceContent(aSourceFile, aSourceContent) {
    var source = aSourceFile;
    if (this._sourceRoot != null) {
      source = util.relative(this._sourceRoot, source);
    }

    if (aSourceContent != null) {
      // Add the source content to the _sourcesContents map.
      // Create a new _sourcesContents map if the property is null.
      if (!this._sourcesContents) {
        this._sourcesContents = Object.create(null);
      }
      this._sourcesContents[util.toSetString(source)] = aSourceContent;
    } else if (this._sourcesContents) {
      // Remove the source file from the _sourcesContents map.
      // If the _sourcesContents map is empty, set the property to null.
      delete this._sourcesContents[util.toSetString(source)];
      if (Object.keys(this._sourcesContents).length === 0) {
        this._sourcesContents = null;
      }
    }
  };

/**
 * Applies the mappings of a sub-source-map for a specific source file to the
 * source map being generated. Each mapping to the supplied source file is
 * rewritten using the supplied source map. Note: The resolution for the
 * resulting mappings is the minimium of this map and the supplied map.
 *
 * @param aSourceMapConsumer The source map to be applied.
 * @param aSourceFile Optional. The filename of the source file.
 *        If omitted, SourceMapConsumer's file property will be used.
 * @param aSourceMapPath Optional. The dirname of the path to the source map
 *        to be applied. If relative, it is relative to the SourceMapConsumer.
 *        This parameter is needed when the two source maps aren't in the same
 *        directory, and the source map to be applied contains relative source
 *        paths. If so, those relative source paths need to be rewritten
 *        relative to the SourceMapGenerator.
 */
SourceMapGenerator.prototype.applySourceMap =
  function SourceMapGenerator_applySourceMap(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
    var sourceFile = aSourceFile;
    // If aSourceFile is omitted, we will use the file property of the SourceMap
    if (aSourceFile == null) {
      if (aSourceMapConsumer.file == null) {
        throw new Error(
          'SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, ' +
          'or the source map\'s "file" property. Both were omitted.'
        );
      }
      sourceFile = aSourceMapConsumer.file;
    }
    var sourceRoot = this._sourceRoot;
    // Make "sourceFile" relative if an absolute Url is passed.
    if (sourceRoot != null) {
      sourceFile = util.relative(sourceRoot, sourceFile);
    }
    // Applying the SourceMap can add and remove items from the sources and
    // the names array.
    var newSources = new ArraySet();
    var newNames = new ArraySet();

    // Find mappings for the "sourceFile"
    this._mappings.unsortedForEach(function (mapping) {
      if (mapping.source === sourceFile && mapping.originalLine != null) {
        // Check if it can be mapped by the source map, then update the mapping.
        var original = aSourceMapConsumer.originalPositionFor({
          line: mapping.originalLine,
          column: mapping.originalColumn
        });
        if (original.source != null) {
          // Copy mapping
          mapping.source = original.source;
          if (aSourceMapPath != null) {
            mapping.source = util.join(aSourceMapPath, mapping.source)
          }
          if (sourceRoot != null) {
            mapping.source = util.relative(sourceRoot, mapping.source);
          }
          mapping.originalLine = original.line;
          mapping.originalColumn = original.column;
          if (original.name != null) {
            mapping.name = original.name;
          }
        }
      }

      var source = mapping.source;
      if (source != null && !newSources.has(source)) {
        newSources.add(source);
      }

      var name = mapping.name;
      if (name != null && !newNames.has(name)) {
        newNames.add(name);
      }

    }, this);
    this._sources = newSources;
    this._names = newNames;

    // Copy sourcesContents of applied map.
    aSourceMapConsumer.sources.forEach(function (sourceFile) {
      var content = aSourceMapConsumer.sourceContentFor(sourceFile);
      if (content != null) {
        if (aSourceMapPath != null) {
          sourceFile = util.join(aSourceMapPath, sourceFile);
        }
        if (sourceRoot != null) {
          sourceFile = util.relative(sourceRoot, sourceFile);
        }
        this.setSourceContent(sourceFile, content);
      }
    }, this);
  };

/**
 * A mapping can have one of the three levels of data:
 *
 *   1. Just the generated position.
 *   2. The Generated position, original position, and original source.
 *   3. Generated and original position, original source, as well as a name
 *      token.
 *
 * To maintain consistency, we validate that any new mapping being added falls
 * in to one of these categories.
 */
SourceMapGenerator.prototype._validateMapping =
  function SourceMapGenerator_validateMapping(aGenerated, aOriginal, aSource,
                                              aName) {
    // When aOriginal is truthy but has empty values for .line and .column,
    // it is most likely a programmer error. In this case we throw a very
    // specific error message to try to guide them the right way.
    // For example: https://github.com/Polymer/polymer-bundler/pull/519
    if (aOriginal && typeof aOriginal.line !== 'number' && typeof aOriginal.column !== 'number') {
        throw new Error(
            'original.line and original.column are not numbers -- you probably meant to omit ' +
            'the original mapping entirely and only map the generated position. If so, pass ' +
            'null for the original mapping instead of an object with empty or null values.'
        );
    }

    if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
        && aGenerated.line > 0 && aGenerated.column >= 0
        && !aOriginal && !aSource && !aName) {
      // Case 1.
      return;
    }
    else if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
             && aOriginal && 'line' in aOriginal && 'column' in aOriginal
             && aGenerated.line > 0 && aGenerated.column >= 0
             && aOriginal.line > 0 && aOriginal.column >= 0
             && aSource) {
      // Cases 2 and 3.
      return;
    }
    else {
      throw new Error('Invalid mapping: ' + JSON.stringify({
        generated: aGenerated,
        source: aSource,
        original: aOriginal,
        name: aName
      }));
    }
  };

/**
 * Serialize the accumulated mappings in to the stream of base 64 VLQs
 * specified by the source map format.
 */
SourceMapGenerator.prototype._serializeMappings =
  function SourceMapGenerator_serializeMappings() {
    var previousGeneratedColumn = 0;
    var previousGeneratedLine = 1;
    var previousOriginalColumn = 0;
    var previousOriginalLine = 0;
    var previousName = 0;
    var previousSource = 0;
    var result = '';
    var next;
    var mapping;
    var nameIdx;
    var sourceIdx;

    var mappings = this._mappings.toArray();
    for (var i = 0, len = mappings.length; i < len; i++) {
      mapping = mappings[i];
      next = ''

      if (mapping.generatedLine !== previousGeneratedLine) {
        previousGeneratedColumn = 0;
        while (mapping.generatedLine !== previousGeneratedLine) {
          next += ';';
          previousGeneratedLine++;
        }
      }
      else {
        if (i > 0) {
          if (!util.compareByGeneratedPositionsInflated(mapping, mappings[i - 1])) {
            continue;
          }
          next += ',';
        }
      }

      next += base64VLQ.encode(mapping.generatedColumn
                                 - previousGeneratedColumn);
      previousGeneratedColumn = mapping.generatedColumn;

      if (mapping.source != null) {
        sourceIdx = this._sources.indexOf(mapping.source);
        next += base64VLQ.encode(sourceIdx - previousSource);
        previousSource = sourceIdx;

        // lines are stored 0-based in SourceMap spec version 3
        next += base64VLQ.encode(mapping.originalLine - 1
                                   - previousOriginalLine);
        previousOriginalLine = mapping.originalLine - 1;

        next += base64VLQ.encode(mapping.originalColumn
                                   - previousOriginalColumn);
        previousOriginalColumn = mapping.originalColumn;

        if (mapping.name != null) {
          nameIdx = this._names.indexOf(mapping.name);
          next += base64VLQ.encode(nameIdx - previousName);
          previousName = nameIdx;
        }
      }

      result += next;
    }

    return result;
  };

SourceMapGenerator.prototype._generateSourcesContent =
  function SourceMapGenerator_generateSourcesContent(aSources, aSourceRoot) {
    return aSources.map(function (source) {
      if (!this._sourcesContents) {
        return null;
      }
      if (aSourceRoot != null) {
        source = util.relative(aSourceRoot, source);
      }
      var key = util.toSetString(source);
      return Object.prototype.hasOwnProperty.call(this._sourcesContents, key)
        ? this._sourcesContents[key]
        : null;
    }, this);
  };

/**
 * Externalize the source map.
 */
SourceMapGenerator.prototype.toJSON =
  function SourceMapGenerator_toJSON() {
    var map = {
      version: this._version,
      sources: this._sources.toArray(),
      names: this._names.toArray(),
      mappings: this._serializeMappings()
    };
    if (this._file != null) {
      map.file = this._file;
    }
    if (this._sourceRoot != null) {
      map.sourceRoot = this._sourceRoot;
    }
    if (this._sourcesContents) {
      map.sourcesContent = this._generateSourcesContent(map.sources, map.sourceRoot);
    }

    return map;
  };

/**
 * Render the source map being generated to a string.
 */
SourceMapGenerator.prototype.toString =
  function SourceMapGenerator_toString() {
    return JSON.stringify(this.toJSON());
  };

exports.SourceMapGenerator = SourceMapGenerator;


/***/ }),
/* 13 */
/***/ (function(module, exports) {

/*
  Copyright (C) 2013-2014 Yusuke Suzuki <utatane.tea@gmail.com>
  Copyright (C) 2014 Ivan Nikulin <ifaaan@gmail.com>

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

(function () {
    'use strict';

    var ES6Regex, ES5Regex, NON_ASCII_WHITESPACES, IDENTIFIER_START, IDENTIFIER_PART, ch;

    // See `tools/generate-identifier-regex.js`.
    ES5Regex = {
        // ECMAScript 5.1/Unicode v7.0.0 NonAsciiIdentifierStart:
        NonAsciiIdentifierStart: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B2\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA7AD\uA7B0\uA7B1\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB5F\uAB64\uAB65\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/,
        // ECMAScript 5.1/Unicode v7.0.0 NonAsciiIdentifierPart:
        NonAsciiIdentifierPart: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B2\u08E4-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58\u0C59\u0C60-\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D60-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFC-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA69D\uA69F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA7AD\uA7B0\uA7B1\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB5F\uAB64\uAB65\uABC0-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2D\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/
    };

    ES6Regex = {
        // ECMAScript 6/Unicode v7.0.0 NonAsciiIdentifierStart:
        NonAsciiIdentifierStart: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B2\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA7AD\uA7B0\uA7B1\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB5F\uAB64\uAB65\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDE00-\uDE11\uDE13-\uDE2B\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF5D-\uDF61]|\uD805[\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDE00-\uDE2F\uDE44\uDE80-\uDEAA]|\uD806[\uDCA0-\uDCDF\uDCFF\uDEC0-\uDEF8]|\uD808[\uDC00-\uDF98]|\uD809[\uDC00-\uDC6E]|[\uD80C\uD840-\uD868\uD86A-\uD86C][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D]|\uD87E[\uDC00-\uDE1D]/,
        // ECMAScript 6/Unicode v7.0.0 NonAsciiIdentifierPart:
        NonAsciiIdentifierPart: /[\xAA\xB5\xB7\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B2\u08E4-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58\u0C59\u0C60-\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D60-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1369-\u1371\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFC-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA69D\uA69F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA7AD\uA7B0\uA7B1\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB5F\uAB64\uAB65\uABC0-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2D\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDD0-\uDDDA\uDE00-\uDE11\uDE13-\uDE37\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF01-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9]|\uD806[\uDCA0-\uDCE9\uDCFF\uDEC0-\uDEF8]|\uD808[\uDC00-\uDF98]|\uD809[\uDC00-\uDC6E]|[\uD80C\uD840-\uD868\uD86A-\uD86C][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/
    };

    function isDecimalDigit(ch) {
        return 0x30 <= ch && ch <= 0x39;  // 0..9
    }

    function isHexDigit(ch) {
        return 0x30 <= ch && ch <= 0x39 ||  // 0..9
            0x61 <= ch && ch <= 0x66 ||     // a..f
            0x41 <= ch && ch <= 0x46;       // A..F
    }

    function isOctalDigit(ch) {
        return ch >= 0x30 && ch <= 0x37;  // 0..7
    }

    // 7.2 White Space

    NON_ASCII_WHITESPACES = [
        0x1680, 0x180E,
        0x2000, 0x2001, 0x2002, 0x2003, 0x2004, 0x2005, 0x2006, 0x2007, 0x2008, 0x2009, 0x200A,
        0x202F, 0x205F,
        0x3000,
        0xFEFF
    ];

    function isWhiteSpace(ch) {
        return ch === 0x20 || ch === 0x09 || ch === 0x0B || ch === 0x0C || ch === 0xA0 ||
            ch >= 0x1680 && NON_ASCII_WHITESPACES.indexOf(ch) >= 0;
    }

    // 7.3 Line Terminators

    function isLineTerminator(ch) {
        return ch === 0x0A || ch === 0x0D || ch === 0x2028 || ch === 0x2029;
    }

    // 7.6 Identifier Names and Identifiers

    function fromCodePoint(cp) {
        if (cp <= 0xFFFF) { return String.fromCharCode(cp); }
        var cu1 = String.fromCharCode(Math.floor((cp - 0x10000) / 0x400) + 0xD800);
        var cu2 = String.fromCharCode(((cp - 0x10000) % 0x400) + 0xDC00);
        return cu1 + cu2;
    }

    IDENTIFIER_START = new Array(0x80);
    for(ch = 0; ch < 0x80; ++ch) {
        IDENTIFIER_START[ch] =
            ch >= 0x61 && ch <= 0x7A ||  // a..z
            ch >= 0x41 && ch <= 0x5A ||  // A..Z
            ch === 0x24 || ch === 0x5F;  // $ (dollar) and _ (underscore)
    }

    IDENTIFIER_PART = new Array(0x80);
    for(ch = 0; ch < 0x80; ++ch) {
        IDENTIFIER_PART[ch] =
            ch >= 0x61 && ch <= 0x7A ||  // a..z
            ch >= 0x41 && ch <= 0x5A ||  // A..Z
            ch >= 0x30 && ch <= 0x39 ||  // 0..9
            ch === 0x24 || ch === 0x5F;  // $ (dollar) and _ (underscore)
    }

    function isIdentifierStartES5(ch) {
        return ch < 0x80 ? IDENTIFIER_START[ch] : ES5Regex.NonAsciiIdentifierStart.test(fromCodePoint(ch));
    }

    function isIdentifierPartES5(ch) {
        return ch < 0x80 ? IDENTIFIER_PART[ch] : ES5Regex.NonAsciiIdentifierPart.test(fromCodePoint(ch));
    }

    function isIdentifierStartES6(ch) {
        return ch < 0x80 ? IDENTIFIER_START[ch] : ES6Regex.NonAsciiIdentifierStart.test(fromCodePoint(ch));
    }

    function isIdentifierPartES6(ch) {
        return ch < 0x80 ? IDENTIFIER_PART[ch] : ES6Regex.NonAsciiIdentifierPart.test(fromCodePoint(ch));
    }

    module.exports = {
        isDecimalDigit: isDecimalDigit,
        isHexDigit: isHexDigit,
        isOctalDigit: isOctalDigit,
        isWhiteSpace: isWhiteSpace,
        isLineTerminator: isLineTerminator,
        isIdentifierStartES5: isIdentifierStartES5,
        isIdentifierPartES5: isIdentifierPartES5,
        isIdentifierStartES6: isIdentifierStartES6,
        isIdentifierPartES6: isIdentifierPartES6
    };
}());
/* vim: set sw=4 ts=4 et tw=80 : */


/***/ }),
/* 14 */
/***/ (function(module, exports) {



/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = {
  identifier: "[a-zA-Z_]+[a-zA-Z0-9_]*",
  integer: "-?(?:0|[1-9][0-9]*)",
  qq_string: "\"(?:\\\\[\"bfnrt/\\\\]|\\\\u[a-fA-F0-9]{4}|[^\"\\\\])*\"",
  q_string: "'(?:\\\\[\'bfnrt/\\\\]|\\\\u[a-fA-F0-9]{4}|[^\'\\\\])*'"
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var assert = __webpack_require__(60);
var dict = __webpack_require__(15);
var Parser = __webpack_require__(56);
var Handlers = __webpack_require__(49);

var JSONPath = function() {
  this.initialize.apply(this, arguments);
};

JSONPath.prototype.initialize = function() {
  this.parser = new Parser();
  this.handlers = new Handlers();
};

JSONPath.prototype.parse = function(string) {
  assert.ok(_is_string(string), "we need a path");
  return this.parser.parse(string);
};

JSONPath.prototype.parent = function(obj, string) {

  assert.ok(obj instanceof Object, "obj needs to be an object");
  assert.ok(string, "we need a path");

  var node = this.nodes(obj, string)[0];
  var key = node.path.pop(); /* jshint unused:false */
  return this.value(obj, node.path);
}

JSONPath.prototype.apply = function(obj, string, fn) {

  assert.ok(obj instanceof Object, "obj needs to be an object");
  assert.ok(string, "we need a path");
  assert.equal(typeof fn, "function", "fn needs to be function")

  var nodes = this.nodes(obj, string).sort(function(a, b) {
    // sort nodes so we apply from the bottom up
    return b.path.length - a.path.length;
  });

  nodes.forEach(function(node) {
    var key = node.path.pop();
    var parent = this.value(obj, this.stringify(node.path));
    var val = node.value = fn.call(obj, parent[key]);
    parent[key] = val;
  }, this);

  return nodes;
}

JSONPath.prototype.value = function(obj, path, value) {

  assert.ok(obj instanceof Object, "obj needs to be an object");
  assert.ok(path, "we need a path");

  if (arguments.length >= 3) {
    var node = this.nodes(obj, path).shift();
    if (!node) return this._vivify(obj, path, value);
    var key = node.path.slice(-1).shift();
    var parent = this.parent(obj, this.stringify(node.path));
    parent[key] = value;
  }
  return this.query(obj, this.stringify(path), 1).shift();
}

JSONPath.prototype._vivify = function(obj, string, value) {

  var self = this;

  assert.ok(obj instanceof Object, "obj needs to be an object");
  assert.ok(string, "we need a path");

  var path = this.parser.parse(string)
    .map(function(component) { return component.expression.value });

  var setValue = function(path, value) {
    var key = path.pop();
    var node = self.value(obj, path);
    if (!node) {
      setValue(path.concat(), typeof key === 'string' ? {} : []);
      node = self.value(obj, path);
    }
    node[key] = value;
  }
  setValue(path, value);
  return this.query(obj, string)[0];
}

JSONPath.prototype.query = function(obj, string, count) {

  assert.ok(obj instanceof Object, "obj needs to be an object");
  assert.ok(_is_string(string), "we need a path");

  var results = this.nodes(obj, string, count)
    .map(function(r) { return r.value });

  return results;
};

JSONPath.prototype.paths = function(obj, string, count) {

  assert.ok(obj instanceof Object, "obj needs to be an object");
  assert.ok(string, "we need a path");

  var results = this.nodes(obj, string, count)
    .map(function(r) { return r.path });

  return results;
};

JSONPath.prototype.nodes = function(obj, string, count) {

  assert.ok(obj instanceof Object, "obj needs to be an object");
  assert.ok(string, "we need a path");

  if (count === 0) return [];

  var path = this.parser.parse(string);
  var handlers = this.handlers;

  var partials = [ { path: ['$'], value: obj } ];
  var matches = [];

  if (path.length && path[0].expression.type == 'root') path.shift();

  if (!path.length) return partials;

  path.forEach(function(component, index) {

    if (matches.length >= count) return;
    var handler = handlers.resolve(component);
    var _partials = [];

    partials.forEach(function(p) {

      if (matches.length >= count) return;
      var results = handler(component, p, count);

      if (index == path.length - 1) {
        // if we're through the components we're done
        matches = matches.concat(results || []);
      } else {
        // otherwise accumulate and carry on through
        _partials = _partials.concat(results || []);
      }
    });

    partials = _partials;

  });

  return count ? matches.slice(0, count) : matches;
};

JSONPath.prototype.stringify = function(path) {

  assert.ok(path, "we need a path");

  var string = '$';

  var templates = {
    'descendant-member': '..{{value}}',
    'child-member': '.{{value}}',
    'descendant-subscript': '..[{{value}}]',
    'child-subscript': '[{{value}}]'
  };

  path = this._normalize(path);

  path.forEach(function(component) {

    if (component.expression.type == 'root') return;

    var key = [component.scope, component.operation].join('-');
    var template = templates[key];
    var value;

    if (component.expression.type == 'string_literal') {
      value = JSON.stringify(component.expression.value)
    } else {
      value = component.expression.value;
    }

    if (!template) throw new Error("couldn't find template " + key);

    string += template.replace(/{{value}}/, value);
  });

  return string;
}

JSONPath.prototype._normalize = function(path) {

  assert.ok(path, "we need a path");

  if (typeof path == "string") {

    return this.parser.parse(path);

  } else if (Array.isArray(path) && typeof path[0] == "string") {

    var _path = [ { expression: { type: "root", value: "$" } } ];

    path.forEach(function(component, index) {

      if (component == '$' && index === 0) return;

      if (typeof component == "string" && component.match("^" + dict.identifier + "$")) {

        _path.push({
          operation: 'member',
          scope: 'child',
          expression: { value: component, type: 'identifier' }
        });

      } else {

        var type = typeof component == "number" ?
          'numeric_literal' : 'string_literal';

        _path.push({
          operation: 'subscript',
          scope: 'child',
          expression: { value: component, type: type }
        });
      }
    });

    return _path;

  } else if (Array.isArray(path) && typeof path[0] == "object") {

    return path
  }

  throw new Error("couldn't understand path " + path);
}

function _is_string(obj) {
  return Object.prototype.toString.call(obj) == '[object String]';
}

JSONPath.Handlers = Handlers;
JSONPath.Parser = Parser;

var instance = new JSONPath;
instance.JSONPath = JSONPath;

module.exports = instance;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* tslint:disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Settings = {
    "engineSettings": {
        "version": "1.0.0",
        "name": "DefaultGradingEngine",
        "matchSettings": {
            "matcher": "DefaultOOOMatcher",
            "matchingStrategies": {
                "#sheets": {
                    "type": "SheetOOOMatchingStrategy",
                    "textWeightage": ""
                },
                "#rows": {
                    "type": "RowOOOMatchingStrategy",
                    "textWeightage": "0.8",
                    "cellRefWeightage": "0.2",
                    "maxRows": "200",
                    "maxColumns": "50"
                },
                "#cells": {
                    "type": "CellOOOMatchingStrategy",
                    "textWeightage": "0.8",
                    "cellRefWeightage": "0.2",
                    "maxRows": "200",
                    "maxColumns": "50"
                }
            }
        }
    }
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GradeResults = /** @class */ (function () {
    function GradeResults() {
    }
    return GradeResults;
}());
exports.GradeResults = GradeResults;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.trialbalanceScoringRulesJson = {
    "type": "Sum",
    "rules": [
        {
            "type": "Sum",
            "rules": [
                {
                    "type": "All",
                    "feedback": {
                        "successText": "Checking for success",
                        "failureText": "Checking for failure"
                    },
                    "rules": [
                        {
                            "type": "Validation",
                            "id": 1000
                        },
                        {
                            "type": "Validation",
                            "id": 1001
                        },
                        {
                            "type": "Validation",
                            "id": 1002
                        },
                        {
                            "type": "Validation",
                            "id": 5800
                        }
                    ],
                    "score": 4
                },
                {
                    "type": "Any",
                    "feedback": {
                        "successText": "Checking for success",
                        "failureText": "Checking for failure"
                    },
                    "rules": [
                        {
                            "type": "Validation",
                            "id": 1100
                        },
                        {
                            "type": "Validation",
                            "id": 1101
                        },
                        {
                            "type": "Validation",
                            "id": 1102
                        },
                        {
                            "type": "Validation",
                            "id": 5900
                        }
                    ],
                    "score": 4
                },
                {
                    "type": "Sum",
                    "rules": [
                        {
                            "type": "Validation",
                            "id": 1200,
                            "score": 1,
                            "feedback": {
                                "successText": "Checking for success",
                                "failureText": "Checking for failure"
                            },
                        },
                        {
                            "type": "Validation",
                            "id": 1201,
                            "score": 1,
                            "feedback": {
                                "successText": "Checking for success",
                                "failureText": "Checking for failure"
                            },
                        },
                        {
                            "type": "Validation",
                            "id": 1202,
                            "score": 1,
                            "feedback": {
                                "successText": "Checking for success",
                                "failureText": "Checking for failure"
                            },
                        },
                        {
                            "type": "Validation",
                            "id": 6000,
                            "score": 1,
                            "feedback": {
                                "successText": "Checking for success",
                                "failureText": "Checking for failure"
                            },
                        }
                    ],
                    "score": 4
                }
            ]
        },
        {
            "type": "Sum",
            "rules": [
                {
                    "type": "All",
                    "feedback": {
                        "successText": "Checking for success",
                        "failureText": "Checking for failure"
                    },
                    "rules": [
                        {
                            "type": "Validation",
                            "id": 1300
                        },
                        {
                            "type": "Validation",
                            "id": 1400
                        }
                    ],
                    "score": 6
                },
                {
                    "type": "All",
                    "feedback": {
                        "successText": "Checking for success",
                        "failureText": "Checking for failure"
                    },
                    "rules": [
                        {
                            "type": "Validation",
                            "id": 1600
                        },
                        {
                            "type": "Validation",
                            "id": 1700
                        }
                    ],
                    "score": 6
                },
                {
                    "type": "All",
                    "feedback": {
                        "successText": "Checking for success",
                        "failureText": "Checking for failure"
                    },
                    "rules": [
                        {
                            "type": "Validation",
                            "id": 1900
                        },
                        {
                            "type": "Validation",
                            "id": 2000
                        }
                    ],
                    "score": 6
                },
                {
                    "type": "All",
                    "feedback": {
                        "successText": "Checking for success",
                        "failureText": "Checking for failure"
                    },
                    "rules": [
                        {
                            "type": "Validation",
                            "id": 2200
                        },
                        {
                            "type": "Validation",
                            "id": 2300
                        }
                    ],
                    "score": 6
                },
                {
                    "type": "All",
                    "feedback": {
                        "successText": "Checking for success",
                        "failureText": "Checking for failure"
                    },
                    "rules": [
                        {
                            "type": "Validation",
                            "id": 2500
                        },
                        {
                            "type": "Validation",
                            "id": 2600
                        }
                    ],
                    "score": 6
                },
                {
                    "type": "Sum",
                    "rules": [
                        {
                            "type": "Validation",
                            "id": 2800,
                            "score": 3,
                            "feedback": {
                                "successText": "Checking for success",
                                "failureText": "Checking for failure"
                            },
                        },
                        {
                            "type": "Validation",
                            "id": 3000,
                            "score": 3,
                            "feedback": {
                                "successText": "Checking for success",
                                "failureText": "Checking for failure"
                            },
                        }
                    ],
                    "score": 6
                },
                {
                    "type": "Sum",
                    "rules": [
                        {
                            "type": "Validation",
                            "id": 3100,
                            "score": 3,
                            "feedback": {
                                "successText": "Checking for success",
                                "failureText": "Checking for failure"
                            },
                        },
                        {
                            "type": "Validation",
                            "id": 3300,
                            "score": 3,
                            "feedback": {
                                "successText": "Checking for success",
                                "failureText": "Checking for failure"
                            },
                        }
                    ],
                    "score": 6
                },
                {
                    "type": "Sum",
                    "rules": [
                        {
                            "type": "Validation",
                            "id": 3400,
                            "score": 3,
                            "feedback": {
                                "successText": "Checking for success",
                                "failureText": "Checking for failure"
                            },
                        },
                        {
                            "type": "Validation",
                            "id": 3600,
                            "score": 3,
                            "feedback": {
                                "successText": "Checking for success",
                                "failureText": "Checking for failure"
                            },
                        }
                    ],
                    "score": 6
                },
                {
                    "type": "Sum",
                    "rules": [
                        {
                            "type": "Validation",
                            "id": 3700,
                            "score": 3,
                            "feedback": {
                                "successText": "Checking for success",
                                "failureText": "Checking for failure"
                            },
                        },
                        {
                            "type": "Validation",
                            "id": 3800,
                            "score": 3,
                            "feedback": {
                                "successText": "Checking for success",
                                "failureText": "Checking for failure"
                            },
                        }
                    ],
                    "score": 6
                },
                {
                    "type": "Sum",
                    "rules": [
                        {
                            "type": "Validation",
                            "id": 4000,
                            "score": 3,
                            "feedback": {
                                "successText": "Checking for success",
                                "failureText": "Checking for failure"
                            },
                        },
                        {
                            "type": "Validation",
                            "id": 4200,
                            "score": 3,
                            "feedback": {
                                "successText": "Checking for success",
                                "failureText": "Checking for failure"
                            },
                        }
                    ],
                    "score": 6
                },
                {
                    "type": "All",
                    "feedback": {
                        "successText": "Checking for success",
                        "failureText": "Checking for failure"
                    },
                    "rules": [
                        {
                            "type": "Validation",
                            "id": 4300
                        },
                        {
                            "type": "Validation",
                            "id": 4400
                        }
                    ],
                    "score": 6
                },
                {
                    "type": "All",
                    "feedback": {
                        "successText": "Checking for success",
                        "failureText": "Checking for failure"
                    },
                    "rules": [
                        {
                            "type": "Validation",
                            "id": 4600
                        },
                        {
                            "type": "Validation",
                            "id": 4700
                        }
                    ],
                    "score": 6
                },
                {
                    "type": "All",
                    "feedback": {
                        "successText": "Checking for success",
                        "failureText": "Checking for failure"
                    },
                    "rules": [
                        {
                            "type": "Validation",
                            "id": 4900
                        },
                        {
                            "type": "Validation",
                            "id": 5000
                        }
                    ],
                    "score": 6
                },
                {
                    "type": "All",
                    "feedback": {
                        "successText": "Checking for success",
                        "failureText": "Checking for failure"
                    },
                    "rules": [
                        {
                            "type": "Validation",
                            "id": 5200
                        },
                        {
                            "type": "Validation",
                            "id": 5300
                        }
                    ],
                    "score": 6
                }
            ]
        },
        {
            "type": "All",
            "feedback": {
                "successText": "Checking for success",
                "failureText": "Checking for failure"
            },
            "rules": [
                {
                    "type": "Validation",
                    "id": 5500
                },
                {
                    "type": "Validation",
                    "id": 5600
                },
                {
                    "type": "Validation",
                    "id": 5700
                }
            ],
            "score": 4
        }
    ],
    "score": 100
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* tslint:disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.submissionJson = {
    "defaults": {
        "rowHeight": 21,
        "columnWidth": 106
    },
    "#sheets": [
        {
            "name": "Solution",
            "id": "sid2uW6mN",
            "selection": "A1:C1",
            "activeCell": "A1",
            "frozenRows": 0,
            "frozenColumns": 0,
            "showGridLines": true,
            "defaults": {
                "cellFontAttrs": {
                    "family": "Arial",
                    "size": "12"
                }
            },
            "#rows": [
                {
                    "visible": true,
                    "index": 0,
                    "#cells": [
                        {
                            "value": "Fantasy Group",
                            "index": 0,
                            "ref": "A1",
                            "style": {
                                "background": "#d3d3d3",
                                "textAlign": "center",
                                "verticalAlign": "bottom",
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "top": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "bottom": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "right": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            },
                            "fontAttrs": {
                                "def": {
                                    "color": "#000000",
                                    "family": "Calibri",
                                    "size": 11,
                                    "bold": true
                                }
                            }
                        },
                        {
                            "index": 1,
                            "ref": "B1",
                            "style": {
                                "background": "#d3d3d3",
                                "verticalAlign": "bottom",
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "top": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "bottom": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "right": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            },
                            "fontAttrs": {
                                "def": {
                                    "color": "#000000",
                                    "family": "Calibri",
                                    "size": 11,
                                    "bold": true
                                }
                            }
                        },
                        {
                            "index": 2,
                            "ref": "C1",
                            "style": {
                                "background": "#d3d3d3",
                                "verticalAlign": "bottom",
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "top": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "bottom": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "right": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            },
                            "fontAttrs": {
                                "def": {
                                    "color": "#000000",
                                    "family": "Calibri",
                                    "size": 11,
                                    "bold": true
                                }
                            }
                        },
                        {
                            "index": 3,
                            "ref": "D1",
                            "style": {
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            }
                        }
                    ]
                },
                {
                    "visible": true,
                    "index": 1,
                    "#cells": [
                        {
                            "value": "Trial Balance",
                            "index": 0,
                            "ref": "A2",
                            "style": {
                                "background": "#d3d3d3",
                                "textAlign": "center",
                                "verticalAlign": "bottom",
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "top": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "bottom": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "right": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            },
                            "fontAttrs": {
                                "def": {
                                    "color": "#000000",
                                    "family": "Calibri",
                                    "size": 11,
                                    "bold": true
                                }
                            }
                        },
                        {
                            "index": 1,
                            "ref": "B2",
                            "style": {
                                "background": "#d3d3d3",
                                "verticalAlign": "bottom",
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "top": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "bottom": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "right": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            },
                            "fontAttrs": {
                                "def": {
                                    "color": "#000000",
                                    "family": "Calibri",
                                    "size": 11,
                                    "bold": true
                                }
                            }
                        },
                        {
                            "index": 2,
                            "ref": "C2",
                            "style": {
                                "background": "#d3d3d3",
                                "verticalAlign": "bottom",
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "top": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "bottom": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "right": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            },
                            "fontAttrs": {
                                "def": {
                                    "color": "#000000",
                                    "family": "Calibri",
                                    "size": 11,
                                    "bold": true
                                }
                            }
                        },
                        {
                            "index": 3,
                            "ref": "D2",
                            "style": {
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            }
                        }
                    ]
                },
                {
                    "visible": true,
                    "index": 2,
                    "#cells": [
                        {
                            "value": 43190,
                            "index": 0,
                            "ref": "A3",
                            "style": {
                                "background": "#d3d3d3",
                                "textAlign": "center",
                                "format": "mmmm\\ d\\,\\ yyyy",
                                "verticalAlign": "bottom",
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "top": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "bottom": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "right": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            },
                            "fontAttrs": {
                                "def": {
                                    "color": "#000000",
                                    "family": "Calibri",
                                    "size": 11,
                                    "bold": true
                                }
                            }
                        },
                        {
                            "index": 1,
                            "ref": "B3",
                            "style": {
                                "background": "#d3d3d3",
                                "format": "mmmm\\ d\\,\\ yyyy",
                                "verticalAlign": "bottom",
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "top": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "bottom": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "right": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            },
                            "fontAttrs": {
                                "def": {
                                    "color": "#000000",
                                    "family": "Calibri",
                                    "size": 11,
                                    "bold": true
                                }
                            }
                        },
                        {
                            "index": 2,
                            "ref": "C3",
                            "style": {
                                "background": "#d3d3d3",
                                "format": "mmmm\\ d\\,\\ yyyy",
                                "verticalAlign": "bottom",
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "top": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "bottom": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "right": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            },
                            "fontAttrs": {
                                "def": {
                                    "color": "#000000",
                                    "family": "Calibri",
                                    "size": 11,
                                    "bold": true
                                }
                            }
                        },
                        {
                            "index": 3,
                            "ref": "D3",
                            "style": {
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            }
                        }
                    ]
                },
                {
                    "visible": true,
                    "index": 3,
                    "#cells": [
                        {
                            "index": 0,
                            "ref": "A4",
                            "style": {
                                "background": "#d3d3d3",
                                "verticalAlign": "bottom",
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "top": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "bottom": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "right": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            },
                            "fontAttrs": {
                                "def": {
                                    "color": "#000000",
                                    "family": "Calibri",
                                    "size": 11,
                                    "bold": true
                                }
                            }
                        },
                        {
                            "value": "Balance",
                            "index": 1,
                            "ref": "B4",
                            "style": {
                                "background": "#d3d3d3",
                                "textAlign": "center",
                                "verticalAlign": "bottom",
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "top": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "bottom": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "right": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            },
                            "fontAttrs": {
                                "def": {
                                    "color": "#000000",
                                    "family": "Calibri",
                                    "size": 11,
                                    "bold": true
                                }
                            }
                        },
                        {
                            "index": 2,
                            "ref": "C4",
                            "style": {
                                "background": "#d3d3d3",
                                "verticalAlign": "bottom",
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "top": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "bottom": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "right": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            },
                            "fontAttrs": {
                                "def": {
                                    "color": "#000000",
                                    "family": "Calibri",
                                    "size": 11,
                                    "bold": true
                                }
                            }
                        },
                        {
                            "index": 3,
                            "ref": "D4",
                            "style": {
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            }
                        }
                    ]
                },
                {
                    "visible": true,
                    "index": 4,
                    "#cells": [
                        {
                            "value": "Account Title",
                            "index": 0,
                            "ref": "A5",
                            "style": {
                                "background": "#d3d3d3",
                                "verticalAlign": "bottom",
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "top": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "bottom": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "right": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            },
                            "fontAttrs": {
                                "def": {
                                    "color": "#000000",
                                    "family": "Calibri",
                                    "size": 11,
                                    "bold": true
                                }
                            }
                        },
                        {
                            "value": "Debit",
                            "index": 1,
                            "ref": "B5",
                            "style": {
                                "background": "#d3d3d3",
                                "textAlign": "center",
                                "verticalAlign": "bottom",
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "top": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "bottom": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "right": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            },
                            "fontAttrs": {
                                "def": {
                                    "color": "#000000",
                                    "family": "Calibri",
                                    "size": 11,
                                    "bold": true
                                }
                            }
                        },
                        {
                            "value": "Credit",
                            "index": 2,
                            "ref": "C5",
                            "style": {
                                "background": "#d3d3d3",
                                "textAlign": "center",
                                "verticalAlign": "bottom",
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "top": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "bottom": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "right": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            },
                            "fontAttrs": {
                                "def": {
                                    "color": "#000000",
                                    "family": "Calibri",
                                    "size": 11,
                                    "bold": true
                                }
                            }
                        },
                        {
                            "index": 3,
                            "ref": "D5",
                            "style": {
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            }
                        }
                    ]
                },
                {
                    "visible": true,
                    "index": 5,
                    "#cells": [
                        {
                            "value": "Cash",
                            "index": 0,
                            "ref": "A6",
                            "style": {
                                "verticalAlign": "bottom",
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "top": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "bottom": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "right": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            },
                            "fontAttrs": {
                                "def": {
                                    "color": "#000000",
                                    "size": 10
                                }
                            }
                        },
                        {
                            "value": 17300,
                            "index": 1,
                            "ref": "B6",
                            "style": {
                                "format": "\"$\"#,##0",
                                "verticalAlign": "center",
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "top": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "bottom": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "right": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            },
                            "fontAttrs": {
                                "def": {
                                    "color": "#000000",
                                    "family": "Calibri",
                                    "size": 11
                                }
                            }
                        },
                        {
                            "index": 2,
                            "ref": "C6",
                            "style": {
                                "format": "\"$\"#,##0",
                                "verticalAlign": "bottom",
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "top": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "bottom": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "right": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            },
                            "fontAttrs": {
                                "def": {
                                    "color": "#000000",
                                    "size": 10
                                }
                            }
                        },
                        {
                            "index": 3,
                            "ref": "D6",
                            "style": {
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            }
                        }
                    ]
                },
                {
                    "visible": true,
                    "index": 6,
                    "height": 20,
                    "#cells": [
                        {
                            "value": "Accounts Receivable",
                            "index": 0,
                            "ref": "A7",
                            "style": {
                                "verticalAlign": "center",
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "top": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "bottom": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "right": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            },
                            "fontAttrs": {
                                "def": {
                                    "color": "#000000",
                                    "family": "Calibri",
                                    "size": 11
                                }
                            }
                        },
                        {
                            "value": 33550,
                            "index": 1,
                            "ref": "B7",
                            "style": {
                                "format": "\"$\"#,##0",
                                "verticalAlign": "center",
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "top": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "bottom": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "right": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            },
                            "fontAttrs": {
                                "def": {
                                    "color": "#000000",
                                    "family": "Calibri",
                                    "size": 11
                                }
                            }
                        },
                        {
                            "index": 2,
                            "ref": "C7",
                            "style": {
                                "format": "\"$\"#,##0",
                                "verticalAlign": "bottom",
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "top": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "bottom": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "right": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            },
                            "fontAttrs": {
                                "def": {
                                    "color": "#000000",
                                    "size": 10
                                }
                            }
                        },
                        {
                            "index": 3,
                            "ref": "D7",
                            "style": {
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            }
                        }
                    ]
                },
                {
                    "visible": true,
                    "index": 7,
                    "height": 20,
                    "#cells": [
                        {
                            "value": "Supplies",
                            "index": 0,
                            "ref": "A8",
                            "style": {
                                "verticalAlign": "center",
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "top": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "bottom": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "right": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            },
                            "fontAttrs": {
                                "def": {
                                    "color": "#000000",
                                    "family": "Calibri",
                                    "size": 11
                                }
                            }
                        },
                        {
                            "value": 6910,
                            "index": 1,
                            "ref": "B8",
                            "style": {
                                "format": "\"$\"#,##0",
                                "verticalAlign": "center",
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "top": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "bottom": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "right": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            },
                            "fontAttrs": {
                                "def": {
                                    "color": "#000000",
                                    "family": "Calibri",
                                    "size": 11
                                }
                            }
                        },
                        {
                            "index": 2,
                            "ref": "C8",
                            "style": {
                                "format": "\"$\"#,##0",
                                "verticalAlign": "bottom",
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "top": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "bottom": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "right": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            },
                            "fontAttrs": {
                                "def": {
                                    "color": "#000000",
                                    "size": 10
                                }
                            }
                        },
                        {
                            "index": 3,
                            "ref": "D8",
                            "style": {
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            }
                        }
                    ]
                },
                {
                    "visible": true,
                    "index": 8,
                    "height": 20,
                    "#cells": [
                        {
                            "value": "Prepaid Insurance",
                            "index": 0,
                            "ref": "A9",
                            "style": {
                                "verticalAlign": "center",
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "top": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "bottom": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "right": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            },
                            "fontAttrs": {
                                "def": {
                                    "color": "#000000",
                                    "family": "Calibri",
                                    "size": 11
                                }
                            }
                        },
                        {
                            "value": 1960,
                            "index": 1,
                            "ref": "B9",
                            "style": {
                                "format": "\"$\"#,##0",
                                "verticalAlign": "center",
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "top": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "bottom": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "right": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            },
                            "fontAttrs": {
                                "def": {
                                    "color": "#000000",
                                    "family": "Calibri",
                                    "size": 11
                                }
                            }
                        },
                        {
                            "index": 2,
                            "ref": "C9",
                            "style": {
                                "format": "\"$\"#,##0",
                                "verticalAlign": "bottom",
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "top": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "bottom": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "right": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            },
                            "fontAttrs": {
                                "def": {
                                    "color": "#000000",
                                    "size": 10
                                }
                            }
                        },
                        {
                            "index": 3,
                            "ref": "D9",
                            "style": {
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            }
                        }
                    ]
                },
                {
                    "visible": true,
                    "index": 9,
                    "height": 20,
                    "#cells": [
                        {
                            "value": "Equipment",
                            "index": 0,
                            "ref": "A10",
                            "style": {
                                "verticalAlign": "center",
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "top": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "bottom": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "right": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            },
                            "fontAttrs": {
                                "def": {
                                    "color": "#000000",
                                    "family": "Calibri",
                                    "size": 11
                                }
                            }
                        },
                        {
                            "value": 176650,
                            "index": 1,
                            "ref": "B10",
                            "style": {
                                "format": "\"$\"#,##0",
                                "verticalAlign": "center",
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "top": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "bottom": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "right": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            },
                            "fontAttrs": {
                                "def": {
                                    "color": "#000000",
                                    "family": "Calibri",
                                    "size": 11
                                }
                            }
                        },
                        {
                            "index": 2,
                            "ref": "C10",
                            "style": {
                                "format": "\"$\"#,##0",
                                "verticalAlign": "bottom",
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "top": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "bottom": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "right": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            },
                            "fontAttrs": {
                                "def": {
                                    "color": "#000000",
                                    "size": 10
                                }
                            }
                        },
                        {
                            "index": 3,
                            "ref": "D10",
                            "style": {
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            }
                        }
                    ]
                },
                {
                    "visible": true,
                    "index": 10,
                    "height": 20,
                    "#cells": [
                        {
                            "value": "Accounts Payable",
                            "index": 0,
                            "ref": "A11",
                            "style": {
                                "verticalAlign": "center",
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "top": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "bottom": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "right": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            },
                            "fontAttrs": {
                                "def": {
                                    "color": "#000000",
                                    "family": "Calibri",
                                    "size": 11
                                }
                            }
                        },
                        {
                            "index": 1,
                            "ref": "B11",
                            "style": {
                                "format": "\"$\"#,##0",
                                "verticalAlign": "bottom",
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "top": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "bottom": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "right": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            },
                            "fontAttrs": {
                                "def": {
                                    "color": "#000000",
                                    "size": 10
                                }
                            }
                        },
                        {
                            "value": 26000,
                            "index": 2,
                            "ref": "C11",
                            "style": {
                                "format": "\"$\"#,##0",
                                "verticalAlign": "center",
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "top": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "bottom": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "right": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            },
                            "fontAttrs": {
                                "def": {
                                    "color": "#000000",
                                    "family": "Calibri",
                                    "size": 11
                                }
                            }
                        },
                        {
                            "index": 3,
                            "ref": "D11",
                            "style": {
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            }
                        }
                    ]
                },
                {
                    "visible": true,
                    "index": 11,
                    "height": 20,
                    "#cells": [
                        {
                            "value": "Notes Payable",
                            "index": 0,
                            "ref": "A12",
                            "style": {
                                "verticalAlign": "center",
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "top": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "bottom": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "right": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            },
                            "fontAttrs": {
                                "def": {
                                    "color": "#000000",
                                    "family": "Calibri",
                                    "size": 11
                                }
                            }
                        },
                        {
                            "index": 1,
                            "ref": "B12",
                            "style": {
                                "format": "\"$\"#,##0",
                                "verticalAlign": "bottom",
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "top": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "bottom": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "right": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            },
                            "fontAttrs": {
                                "def": {
                                    "color": "#000000",
                                    "size": 10
                                }
                            }
                        },
                        {
                            "value": 88090,
                            "index": 2,
                            "ref": "C12",
                            "style": {
                                "format": "\"$\"#,##0",
                                "verticalAlign": "center",
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "top": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "bottom": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "right": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            },
                            "fontAttrs": {
                                "def": {
                                    "color": "#000000",
                                    "family": "Calibri",
                                    "size": 11
                                }
                            }
                        },
                        {
                            "index": 3,
                            "ref": "D12",
                            "style": {
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            }
                        }
                    ]
                },
                {
                    "visible": true,
                    "index": 12,
                    "height": 20,
                    "#cells": [
                        {
                            "value": "Owner's, Capital",
                            "index": 0,
                            "ref": "A13",
                            "style": {
                                "verticalAlign": "center",
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "top": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "bottom": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "right": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            },
                            "fontAttrs": {
                                "def": {
                                    "color": "#000000",
                                    "family": "Calibri",
                                    "size": 11
                                }
                            }
                        },
                        {
                            "index": 1,
                            "ref": "B13",
                            "style": {
                                "format": "\"$\"#,##0",
                                "verticalAlign": "bottom",
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "top": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "bottom": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "right": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            },
                            "fontAttrs": {
                                "def": {
                                    "color": "#000000",
                                    "size": 10
                                }
                            }
                        },
                        {
                            "value": 145835,
                            "index": 2,
                            "ref": "C13",
                            "style": {
                                "format": "\"$\"#,##0",
                                "verticalAlign": "center",
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "top": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "bottom": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "right": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            },
                            "fontAttrs": {
                                "def": {
                                    "color": "#000000",
                                    "family": "Calibri",
                                    "size": 11
                                }
                            }
                        },
                        {
                            "index": 3,
                            "ref": "D13",
                            "style": {
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            }
                        }
                    ]
                },
                {
                    "visible": true,
                    "index": 13,
                    "height": 20,
                    "#cells": [
                        {
                            "value": "Owner's, Drawing",
                            "index": 0,
                            "ref": "A14",
                            "style": {
                                "verticalAlign": "center",
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "top": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "bottom": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "right": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            },
                            "fontAttrs": {
                                "def": {
                                    "color": "#000000",
                                    "family": "Calibri",
                                    "size": 11
                                }
                            }
                        },
                        {
                            "value": 114920,
                            "index": 1,
                            "ref": "B14",
                            "style": {
                                "format": "\"$\"#,##0",
                                "verticalAlign": "center",
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "top": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "bottom": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "right": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            },
                            "fontAttrs": {
                                "def": {
                                    "color": "#000000",
                                    "family": "Calibri",
                                    "size": 11
                                }
                            }
                        },
                        {
                            "index": 2,
                            "ref": "C14",
                            "style": {
                                "format": "\"$\"#,##0",
                                "verticalAlign": "bottom",
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "top": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "bottom": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "right": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            },
                            "fontAttrs": {
                                "def": {
                                    "color": "#000000",
                                    "size": 10
                                }
                            }
                        },
                        {
                            "index": 3,
                            "ref": "D14",
                            "style": {
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            }
                        }
                    ]
                },
                {
                    "visible": true,
                    "index": 14,
                    "height": 20,
                    "#cells": [
                        {
                            "value": "Fees Earned",
                            "index": 0,
                            "ref": "A15",
                            "style": {
                                "verticalAlign": "center",
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "top": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "bottom": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "right": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            },
                            "fontAttrs": {
                                "def": {
                                    "color": "#000000",
                                    "family": "Calibri",
                                    "size": 11
                                }
                            }
                        },
                        {
                            "index": 1,
                            "ref": "B15",
                            "style": {
                                "format": "\"$\"#,##0",
                                "verticalAlign": "bottom",
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "top": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "bottom": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "right": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            },
                            "fontAttrs": {
                                "def": {
                                    "color": "#000000",
                                    "size": 10
                                }
                            }
                        },
                        {
                            "value": 409255,
                            "index": 2,
                            "ref": "C15",
                            "style": {
                                "format": "\"$\"#,##0",
                                "verticalAlign": "center",
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "top": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "bottom": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "right": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            },
                            "fontAttrs": {
                                "def": {
                                    "color": "#000000",
                                    "family": "Calibri",
                                    "size": 11
                                }
                            }
                        },
                        {
                            "index": 3,
                            "ref": "D15",
                            "style": {
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            }
                        }
                    ]
                },
                {
                    "visible": true,
                    "index": 15,
                    "height": 20,
                    "#cells": [
                        {
                            "value": "Wages Expense",
                            "index": 0,
                            "ref": "A16",
                            "style": {
                                "verticalAlign": "center",
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "top": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "bottom": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "right": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            },
                            "fontAttrs": {
                                "def": {
                                    "color": "#000000",
                                    "family": "Calibri",
                                    "size": 11
                                }
                            }
                        },
                        {
                            "value": 243250,
                            "index": 1,
                            "ref": "B16",
                            "style": {
                                "format": "\"$\"#,##0",
                                "verticalAlign": "center",
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "top": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "bottom": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "right": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            },
                            "fontAttrs": {
                                "def": {
                                    "color": "#000000",
                                    "family": "Calibri",
                                    "size": 11
                                }
                            }
                        },
                        {
                            "index": 2,
                            "ref": "C16",
                            "style": {
                                "format": "\"$\"#,##0",
                                "verticalAlign": "bottom",
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "top": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "bottom": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "right": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            },
                            "fontAttrs": {
                                "def": {
                                    "color": "#000000",
                                    "size": 10
                                }
                            }
                        },
                        {
                            "index": 3,
                            "ref": "D16",
                            "style": {
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            }
                        }
                    ]
                },
                {
                    "visible": true,
                    "index": 16,
                    "height": 20,
                    "#cells": [
                        {
                            "value": "Rent Expense",
                            "index": 0,
                            "ref": "A17",
                            "style": {
                                "verticalAlign": "center",
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "top": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "bottom": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "right": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            },
                            "fontAttrs": {
                                "def": {
                                    "color": "#000000",
                                    "family": "Calibri",
                                    "size": 11
                                }
                            }
                        },
                        {
                            "value": 46870,
                            "index": 1,
                            "ref": "B17",
                            "style": {
                                "format": "\"$\"#,##0",
                                "verticalAlign": "center",
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "top": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "bottom": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "right": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            },
                            "fontAttrs": {
                                "def": {
                                    "color": "#000000",
                                    "family": "Calibri",
                                    "size": 11
                                }
                            }
                        },
                        {
                            "index": 2,
                            "ref": "C17",
                            "style": {
                                "format": "\"$\"#,##0",
                                "verticalAlign": "bottom",
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "top": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "bottom": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "right": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            },
                            "fontAttrs": {
                                "def": {
                                    "color": "#000000",
                                    "size": 10
                                }
                            }
                        },
                        {
                            "index": 3,
                            "ref": "D17",
                            "style": {
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            }
                        }
                    ]
                },
                {
                    "visible": true,
                    "index": 17,
                    "height": 20,
                    "#cells": [
                        {
                            "value": "Advertising Expense",
                            "index": 0,
                            "ref": "A18",
                            "style": {
                                "verticalAlign": "center",
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "top": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "bottom": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "right": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            },
                            "fontAttrs": {
                                "def": {
                                    "color": "#000000",
                                    "family": "Calibri",
                                    "size": 11
                                }
                            }
                        },
                        {
                            "value": 22930,
                            "index": 1,
                            "ref": "B18",
                            "style": {
                                "format": "\"$\"#,##0",
                                "verticalAlign": "center",
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "top": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "bottom": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "right": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            },
                            "fontAttrs": {
                                "def": {
                                    "color": "#000000",
                                    "family": "Calibri",
                                    "size": 11
                                }
                            }
                        },
                        {
                            "index": 2,
                            "ref": "C18",
                            "style": {
                                "format": "\"$\"#,##0",
                                "verticalAlign": "bottom",
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "top": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "bottom": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "right": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            },
                            "fontAttrs": {
                                "def": {
                                    "color": "#000000",
                                    "size": 10
                                }
                            }
                        },
                        {
                            "index": 3,
                            "ref": "D18",
                            "style": {
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            }
                        }
                    ]
                },
                {
                    "visible": true,
                    "index": 18,
                    "height": 20,
                    "#cells": [
                        {
                            "value": "Misc. Expense",
                            "index": 0,
                            "ref": "A19",
                            "style": {
                                "verticalAlign": "center",
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "top": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "bottom": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "right": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            },
                            "fontAttrs": {
                                "def": {
                                    "color": "#000000",
                                    "family": "Calibri",
                                    "size": 11
                                }
                            }
                        },
                        {
                            "value": 4840,
                            "index": 1,
                            "ref": "B19",
                            "style": {
                                "format": "\"$\"#,##0",
                                "verticalAlign": "center",
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "top": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "bottom": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "right": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            },
                            "fontAttrs": {
                                "def": {
                                    "color": "#000000",
                                    "family": "Calibri",
                                    "size": 11
                                }
                            }
                        },
                        {
                            "index": 2,
                            "ref": "C19",
                            "style": {
                                "format": "\"$\"#,##0",
                                "verticalAlign": "bottom",
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "top": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "bottom": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "right": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            },
                            "fontAttrs": {
                                "def": {
                                    "color": "#000000",
                                    "size": 10
                                }
                            }
                        },
                        {
                            "index": 3,
                            "ref": "D19",
                            "style": {
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            }
                        }
                    ]
                },
                {
                    "visible": true,
                    "index": 19,
                    "#cells": [
                        {
                            "value": "Totals",
                            "index": 0,
                            "ref": "A20",
                            "style": {
                                "verticalAlign": "bottom",
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "top": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "bottom": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "right": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            },
                            "fontAttrs": {
                                "def": {
                                    "color": "#000000",
                                    "family": "Calibri",
                                    "size": 11,
                                    "bold": true
                                }
                            }
                        },
                        {
                            "value": 669180,
                            "index": 1,
                            "ref": "B20",
                            "style": {
                                "textAlign": "right",
                                "format": "\"$\"#,##0.00",
                                "verticalAlign": "bottom",
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "top": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "bottom": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "right": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            },
                            "fontAttrs": {
                                "def": {
                                    "color": "#000000",
                                    "family": "Calibri",
                                    "size": 11
                                }
                            }
                        },
                        {
                            "value": 669180,
                            "index": 2,
                            "ref": "C20",
                            "style": {
                                "textAlign": "right",
                                "format": "\"$\"#,##0.00",
                                "verticalAlign": "bottom",
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "top": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "bottom": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "right": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            },
                            "fontAttrs": {
                                "def": {
                                    "color": "#000000",
                                    "family": "Calibri",
                                    "size": 11
                                }
                            }
                        },
                        {
                            "index": 3,
                            "ref": "D20",
                            "style": {
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            }
                        }
                    ]
                },
                {
                    "visible": true,
                    "index": 20,
                    "#cells": [
                        {
                            "index": 0,
                            "ref": "A21",
                            "style": {
                                "border": {
                                    "top": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            }
                        },
                        {
                            "index": 1,
                            "ref": "B21",
                            "style": {
                                "border": {
                                    "top": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            }
                        },
                        {
                            "index": 2,
                            "ref": "C21",
                            "style": {
                                "border": {
                                    "top": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            }
                        }
                    ]
                }
            ],
            "#columns": [
                {
                    "visible": true,
                    "index": 0,
                    "width": 179
                },
                {
                    "visible": true,
                    "index": 1,
                    "width": 139
                },
                {
                    "visible": true,
                    "index": 2,
                    "width": 132
                }
            ],
            "#mergedCells": [
                "A1:C1",
                "A2:C2",
                "A3:C3",
                "B4:C4"
            ]
        }
    ]
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* tslint:disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.solutionJson = {
    "activeSheet": "Addresses",
    "defaults": {
        "columnWidth": 64,
        "rowHeight": 20,
        "cellStyle": {
            "wrap": false,
            "textAlign": "general",
            "verticalAlign": "bottom"
        },
        "cellFontAttrs": {
            "family": "Calibri",
            "size": 11,
            "color": "#000000",
            "bold": false,
            "italic": false,
            "underline": false
        }
    },
    "#sheets": [
        {
            "name": "Addresses",
            "maxColIndexEdited": 6,
            "maxRowIndexEdited": 59,
            "selection": "H29:H29",
            "activeCell": "H29:H29",
            "frozenRows": 0,
            "frozenColumns": 0,
            "showGridLines": true,
            "defaults": {
                "columnWidth": 64,
                "rowHeight": 20,
                "cellStyle": {
                    "wrap": false,
                    "textAlign": "general",
                    "verticalAlign": "bottom"
                },
                "cellFontAttrs": {
                    "family": "Calibri",
                    "size": 11,
                    "color": "#000000",
                    "bold": false,
                    "italic": false,
                    "underline": false
                }
            },
            "id": "sidZ1NGebu",
            "#rows": [
                {
                    "index": 0,
                    "visible": true,
                    "height": 20,
                    "#cells": [
                        {
                            "ref": "A1",
                            "value": "StudentID",
                            "index": 0,
                            "style": {
                                "background": "#C0C0C0",
                                "textAlign": "center",
                                "format": "General",
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "right": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "top": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "BJYbE1UGN"
                                },
                                {
                                    "validate": "fontAttrs.def.bold",
                                    "operator": "equals",
                                    "id": "S1xYWEJIM4"
                                }
                            ]
                        },
                        {
                            "ref": "B1",
                            "value": "LastName",
                            "index": 1,
                            "style": {
                                "background": "#C0C0C0",
                                "textAlign": "center",
                                "format": "General",
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "right": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "top": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "rkbFWVJIMN"
                                }
                            ]
                        },
                        {
                            "ref": "C1",
                            "value": "FirstName",
                            "index": 2,
                            "style": {
                                "background": "#C0C0C0",
                                "textAlign": "center",
                                "format": "General",
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "right": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "top": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "SJzKZN1LGV"
                                }
                            ]
                        },
                        {
                            "ref": "D1",
                            "value": "Address",
                            "index": 3,
                            "style": {
                                "background": "#C0C0C0",
                                "textAlign": "center",
                                "format": "General",
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "right": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "top": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "HJ7KWNJLGE"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "ryNYWV1UME"
                                }
                            ]
                        },
                        {
                            "ref": "E1",
                            "value": "City",
                            "index": 4,
                            "style": {
                                "background": "#C0C0C0",
                                "textAlign": "center",
                                "format": "General",
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "right": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "top": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "SyrFb4J8GV"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "r18K-EJUMV"
                                }
                            ]
                        },
                        {
                            "ref": "F1",
                            "value": "State",
                            "index": 5,
                            "style": {
                                "background": "#C0C0C0",
                                "textAlign": "center",
                                "format": "General",
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "right": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "top": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "B1PKW4JLMN"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "ryOtW4yLME"
                                }
                            ]
                        },
                        {
                            "ref": "G1",
                            "value": "Zip",
                            "index": 6,
                            "style": {
                                "background": "#C0C0C0",
                                "textAlign": "center",
                                "format": "General",
                                "border": {
                                    "left": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "right": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    },
                                    "top": {
                                        "clr": "#000000",
                                        "type": "thin"
                                    }
                                }
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "ryFKZNyLMV"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "SkqtWNk8zN"
                                }
                            ]
                        }
                    ]
                },
                {
                    "index": 1,
                    "visible": true,
                    "height": 20,
                    "#cells": [
                        {
                            "ref": "A2",
                            "value": "lc0015773",
                            "index": 0,
                            "style": {
                                "wrap": true,
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "BJjFZEk8fE"
                                },
                                {
                                    "validate": "fontAttrs.def.bold",
                                    "operator": "equals",
                                    "id": "rk3YbEyUzN"
                                }
                            ]
                        },
                        {
                            "ref": "B2",
                            "value": "Kummer",
                            "index": 1,
                            "style": {
                                "wrap": true,
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "SJTKb41LfV"
                                }
                            ]
                        },
                        {
                            "ref": "C2",
                            "value": "Sheila",
                            "index": 2,
                            "style": {
                                "wrap": true,
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "ry0t-VyLMV"
                                }
                            ]
                        },
                        {
                            "ref": "D2",
                            "value": "156 Knollwood Road",
                            "index": 3,
                            "style": {
                                "wrap": true,
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "Sy1xYbVJIfE"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "SkeetbEJLMV"
                                }
                            ]
                        },
                        {
                            "ref": "E2",
                            "value": "Dallas",
                            "index": 4,
                            "style": {
                                "wrap": true,
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "HJWlFWVkUGN"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "r1feKZEkIGN"
                                }
                            ]
                        },
                        {
                            "ref": "F2",
                            "value": "PA",
                            "index": 5,
                            "style": {
                                "wrap": true,
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "r1Xet-VJUG4"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "SJ4lFbNyUzE"
                                }
                            ]
                        },
                        {
                            "ref": "G2",
                            "value": 18612,
                            "index": 6,
                            "style": {
                                "wrap": true,
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "SJBlFbEJIzV"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "B1LgYWVyUGN"
                                }
                            ]
                        }
                    ]
                },
                {
                    "index": 2,
                    "visible": true,
                    "height": 20,
                    "#cells": [
                        {
                            "ref": "A3",
                            "value": "lc0015778",
                            "index": 0,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "BJPxFZ4JUf4"
                                },
                                {
                                    "validate": "fontAttrs.def.bold",
                                    "operator": "equals",
                                    "id": "SkdeYbNJIGV"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "HkKxFZVJIME"
                                }
                            ]
                        },
                        {
                            "ref": "B3",
                            "value": "Ray",
                            "index": 1,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "H1qeYZNyLzE"
                                }
                            ]
                        },
                        {
                            "ref": "C3",
                            "value": "Brian",
                            "index": 2,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "rJjlKbNkIfN"
                                }
                            ]
                        },
                        {
                            "ref": "D3",
                            "value": "56 Lake Street",
                            "index": 3,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "Sy3xt-4yUMN"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "BkagtbEkUGV"
                                }
                            ]
                        },
                        {
                            "ref": "E3",
                            "value": "Lyon Station",
                            "index": 4,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "HkAlK-Nk8fV"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "ryJWFZEyUzN"
                                }
                            ]
                        },
                        {
                            "ref": "F3",
                            "value": "PA",
                            "index": 5,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "ryxWKZN1Iz4"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "HJWbF-NkUG4"
                                }
                            ]
                        },
                        {
                            "ref": "G3",
                            "value": 19536,
                            "index": 6,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "H1MZtW41UMN"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "r1XZF-NJUMV"
                                }
                            ]
                        }
                    ]
                },
                {
                    "index": 3,
                    "visible": true,
                    "height": 20,
                    "#cells": [
                        {
                            "ref": "A4",
                            "value": "lc0054871",
                            "index": 0,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "ry4WtbN1IME"
                                },
                                {
                                    "validate": "fontAttrs.def.bold",
                                    "operator": "equals",
                                    "id": "rJrbKbEkIME"
                                }
                            ]
                        },
                        {
                            "ref": "B4",
                            "value": "Leslie",
                            "index": 1,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "ByLbt-4kLGE"
                                },
                                {
                                    "validate": "fontAttrs.def.bold",
                                    "operator": "equals",
                                    "id": "rkDbYZV18fN"
                                }
                            ]
                        },
                        {
                            "ref": "C4",
                            "value": "Cheryl",
                            "index": 2,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "rJdZKWNJLGE"
                                }
                            ]
                        },
                        {
                            "ref": "D4",
                            "value": "115 Leslie Lane",
                            "index": 3,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "BkFZKZVyUMV"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "B1c-tZNyLzE"
                                }
                            ]
                        },
                        {
                            "ref": "E4",
                            "value": "Mohrsville",
                            "index": 4,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "SJibtbNJUG4"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "Bk3bYWVkUfE"
                                }
                            ]
                        },
                        {
                            "ref": "F4",
                            "value": "PA",
                            "index": 5,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "Bya-K-4yUzE"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "r1CZtZ41UzV"
                                }
                            ]
                        },
                        {
                            "ref": "G4",
                            "value": 19541,
                            "index": 6,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "HJ1GK-E1LzV"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "rygGtbEyIfE"
                                }
                            ]
                        }
                    ]
                },
                {
                    "index": 4,
                    "visible": true,
                    "height": 20,
                    "#cells": [
                        {
                            "ref": "A5",
                            "value": "lc0098580",
                            "index": 0,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "BkbztZEJ8GN"
                                },
                                {
                                    "validate": "fontAttrs.def.bold",
                                    "operator": "equals",
                                    "id": "SkGMFbV18fV"
                                }
                            ]
                        },
                        {
                            "ref": "B5",
                            "value": "Goyette",
                            "index": 1,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "rkXGt-NJLGV"
                                },
                                {
                                    "validate": "fontAttrs.def.bold",
                                    "operator": "equals",
                                    "id": "rkEzFbE1UzV"
                                }
                            ]
                        },
                        {
                            "ref": "C5",
                            "value": "Alonzo",
                            "index": 2,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "ByrfKZV18G4"
                                },
                                {
                                    "validate": "fontAttrs.def.bold",
                                    "operator": "equals",
                                    "id": "SkUfYbN1UM4"
                                }
                            ]
                        },
                        {
                            "ref": "D5",
                            "value": "681 North Main St.",
                            "index": 3,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "S1wzt-418MV"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "Sy_fKbNk8G4"
                                }
                            ]
                        },
                        {
                            "ref": "E5",
                            "value": "Old Forge",
                            "index": 4,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "ryKMYbN1IME"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "rycft-VJLME"
                                }
                            ]
                        },
                        {
                            "ref": "F5",
                            "value": "PA",
                            "index": 5,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "H1jzYbEyUfN"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "By3Mt-EyUME"
                                }
                            ]
                        },
                        {
                            "ref": "G5",
                            "value": 18630,
                            "index": 6,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "r1afFZNJ8z4"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "r1AfYZ4kLzV"
                                }
                            ]
                        }
                    ]
                },
                {
                    "index": 5,
                    "visible": true,
                    "height": 20,
                    "#cells": [
                        {
                            "ref": "A6",
                            "value": "lc0247910",
                            "index": 0,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "rJJmtbEyUf4"
                                }
                            ]
                        },
                        {
                            "ref": "B6",
                            "value": "Ahern",
                            "index": 1,
                            "style": {
                                "wrap": true,
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "rklXFZN1LzN"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "ry-XF-Vk8GN"
                                }
                            ]
                        },
                        {
                            "ref": "C6",
                            "value": "Sophie",
                            "index": 2,
                            "style": {
                                "wrap": true,
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "BkMQKZNJLMV"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "SyXmFZ4JUzE"
                                }
                            ]
                        },
                        {
                            "ref": "D6",
                            "value": "211 Deer Run Rd.",
                            "index": 3,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "rkN7YbEkIfE"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "SkBmKbV1UfV"
                                }
                            ]
                        },
                        {
                            "ref": "E6",
                            "value": "Cornell",
                            "index": 4,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "ryLmYZ4kIfN"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "r1PXFWVyIfE"
                                }
                            ]
                        },
                        {
                            "ref": "F6",
                            "value": "NY",
                            "index": 5,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "SJ_XtbVy8zE"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "H1K7t-4J8ME"
                                }
                            ]
                        },
                        {
                            "ref": "G6",
                            "value": 10613,
                            "index": 6,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "rkqXY-VJ8fV"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "Syj7tWNJLzV"
                                }
                            ]
                        }
                    ]
                },
                {
                    "index": 6,
                    "visible": true,
                    "height": 20,
                    "#cells": [
                        {
                            "ref": "A7",
                            "value": "lc0247911",
                            "index": 0,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "Sk3mtb4yIfV"
                                }
                            ]
                        },
                        {
                            "ref": "B7",
                            "value": "Anderson",
                            "index": 1,
                            "style": {
                                "wrap": true,
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "rJTmFbNy8GV"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "r10XK-41LfE"
                                }
                            ]
                        },
                        {
                            "ref": "C7",
                            "value": "Daphne",
                            "index": 2,
                            "style": {
                                "wrap": true,
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "Sy14YbVkUM4"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "H1gVt-V1LfV"
                                }
                            ]
                        },
                        {
                            "ref": "D7",
                            "value": "171 Wyoming Ave.",
                            "index": 3,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "SkZEtb4k8zN"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "ByG4KbE18zV"
                                }
                            ]
                        },
                        {
                            "ref": "E7",
                            "value": "Exeter",
                            "index": 4,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "Hy7VKWNJUME"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "rkN4tWNkLG4"
                                }
                            ]
                        },
                        {
                            "ref": "F7",
                            "value": "PA",
                            "index": 5,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "HJSEYbNJLMV"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "By8Nt-NJIMN"
                                }
                            ]
                        },
                        {
                            "ref": "G7",
                            "value": 16102,
                            "index": 6,
                            "style": {
                                "format": "0"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "SJP4FZEkLMN"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "ryuVKbN1LGN"
                                }
                            ]
                        }
                    ]
                },
                {
                    "index": 7,
                    "visible": true,
                    "height": 20,
                    "#cells": [
                        {
                            "ref": "A8",
                            "value": "lc0247912",
                            "index": 0,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "BytNF-EJ8fV"
                                }
                            ]
                        },
                        {
                            "ref": "B8",
                            "value": "Asmal",
                            "index": 1,
                            "style": {
                                "wrap": true,
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "SkcNKZ4kIGN"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "rko4YbEJUMN"
                                }
                            ]
                        },
                        {
                            "ref": "C8",
                            "value": "Jamal",
                            "index": 2,
                            "style": {
                                "wrap": true,
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "Bk2VFb4JLGN"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "HyTNKWE18zV"
                                }
                            ]
                        },
                        {
                            "ref": "D8",
                            "value": "166 State Street",
                            "index": 3,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "HyAVt-V18GN"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "BJJStWEkLGE"
                                }
                            ]
                        },
                        {
                            "ref": "E8",
                            "value": "Kingston",
                            "index": 4,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "HylrFWEyLz4"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "Bk-BtWVJIM4"
                                }
                            ]
                        },
                        {
                            "ref": "F8",
                            "value": "PA",
                            "index": 5,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "S1GSYbNkIGE"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "rymHFZEyIzE"
                                }
                            ]
                        },
                        {
                            "ref": "G8",
                            "value": 18708,
                            "index": 6,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "B1NHK-EJIGE"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "SkSrYWVJLM4"
                                }
                            ]
                        }
                    ]
                },
                {
                    "index": 8,
                    "visible": true,
                    "height": 20,
                    "#cells": [
                        {
                            "ref": "A9",
                            "value": "lc0247913",
                            "index": 0,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "ByIBF-4yLG4"
                                }
                            ]
                        },
                        {
                            "ref": "B9",
                            "value": "Sudell",
                            "index": 1,
                            "style": {
                                "wrap": true,
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "rywrK-NkUfV"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "Hy_St-EkLzN"
                                }
                            ]
                        },
                        {
                            "ref": "C9",
                            "value": "Robert",
                            "index": 2,
                            "style": {
                                "wrap": true,
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "HJtHKWEkIf4"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "SJcrF-NyLzV"
                                }
                            ]
                        },
                        {
                            "ref": "D9",
                            "value": "164 South Road",
                            "index": 3,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "HyjBYWE1LGV"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "B1nHYWNyUGN"
                                }
                            ]
                        },
                        {
                            "ref": "E9",
                            "value": "Wilkes-Barre",
                            "index": 4,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "B16SY-EJIMV"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "SyRHKbNJUfV"
                                }
                            ]
                        },
                        {
                            "ref": "F9",
                            "value": "PA",
                            "index": 5,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "rJ1UY-VJ8G4"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "r1eLKZVkLG4"
                                }
                            ]
                        },
                        {
                            "ref": "G9",
                            "value": 18702,
                            "index": 6,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "SyZLtbEy8z4"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "S1GIFZEkLM4"
                                }
                            ]
                        }
                    ]
                },
                {
                    "index": 9,
                    "visible": true,
                    "height": 20,
                    "#cells": [
                        {
                            "ref": "A10",
                            "value": "lc0247914",
                            "index": 0,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "SyQUFZE1IGE"
                                }
                            ]
                        },
                        {
                            "ref": "B10",
                            "value": "Bianchi",
                            "index": 1,
                            "style": {
                                "wrap": true,
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "rJVLtbE1LfV"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "rkS8F-4kUzE"
                                }
                            ]
                        },
                        {
                            "ref": "C10",
                            "value": "Carlo",
                            "index": 2,
                            "style": {
                                "wrap": true,
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "BJI8tbN18fN"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "ryvIKZN1UGV"
                                }
                            ]
                        },
                        {
                            "ref": "D10",
                            "value": "468 Northampton St.",
                            "index": 3,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "BkOLF-418GV"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "BkKIK-4JUzN"
                                }
                            ]
                        },
                        {
                            "ref": "E10",
                            "value": "Scranton",
                            "index": 4,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "BJq8YZNJIMN"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "rki8Y-EyIzV"
                                }
                            ]
                        },
                        {
                            "ref": "F10",
                            "value": "PA",
                            "index": 5,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "B138YZEk8MV"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "ry6UY-E18zV"
                                }
                            ]
                        },
                        {
                            "ref": "G10",
                            "value": 19505,
                            "index": 6,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "HyCUY-VkUfE"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "S1JDK-Ey8zV"
                                }
                            ]
                        }
                    ]
                },
                {
                    "index": 10,
                    "visible": true,
                    "height": 20,
                    "#cells": [
                        {
                            "ref": "A11",
                            "value": "lc0247915",
                            "index": 0,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "H1gPFW4y8M4"
                                }
                            ]
                        },
                        {
                            "ref": "B11",
                            "value": "Castellena",
                            "index": 1,
                            "style": {
                                "wrap": true,
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "SybwKW4yIzE"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "HkzvFWEyIfE"
                                }
                            ]
                        },
                        {
                            "ref": "C11",
                            "value": "Fernando",
                            "index": 2,
                            "style": {
                                "wrap": true,
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "HJmPt-4yIGV"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "rkEwFbN18MV"
                                }
                            ]
                        },
                        {
                            "ref": "D11",
                            "value": "57 Pine Stree",
                            "index": 3,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "rJSvK-N1IMN"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "SkLwtb4yIz4"
                                }
                            ]
                        },
                        {
                            "ref": "E11",
                            "value": "Pittsburgh",
                            "index": 4,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "HywwtZEJ8GE"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "SkOvt-Ny8zE"
                                }
                            ]
                        },
                        {
                            "ref": "F11",
                            "value": "PA",
                            "index": 5,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "BkFvYZ4yIfV"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "BycwYZEJUG4"
                                }
                            ]
                        },
                        {
                            "ref": "G11",
                            "value": 15283,
                            "index": 6,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "HksPFZ4kUG4"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "S1nwYb4J8G4"
                                }
                            ]
                        }
                    ]
                },
                {
                    "index": 11,
                    "visible": true,
                    "height": 20,
                    "#cells": [
                        {
                            "ref": "A12",
                            "value": "lc0247916",
                            "index": 0,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "SkaDKbNkUMV"
                                }
                            ]
                        },
                        {
                            "ref": "B12",
                            "value": "Simeone",
                            "index": 1,
                            "style": {
                                "wrap": true,
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "SkRDYZNyUzE"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "HyyuKbEkUzV"
                                }
                            ]
                        },
                        {
                            "ref": "C12",
                            "value": "Alison",
                            "index": 2,
                            "style": {
                                "wrap": true,
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "HkgdKW4JLGV"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "SyWuYZ41UGV"
                                }
                            ]
                        },
                        {
                            "ref": "D12",
                            "value": "331 Wellesley St.",
                            "index": 3,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "SyGOFW4kLMV"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "HJQOFbVk8zN"
                                }
                            ]
                        },
                        {
                            "ref": "E12",
                            "value": "Weston",
                            "index": 4,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "ryVdtZEkUMV"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "BJB_tW418fN"
                                }
                            ]
                        },
                        {
                            "ref": "F12",
                            "value": "MA",
                            "index": 5,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "ByL_Kb4yLfE"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "Skwut-NJLzV"
                                }
                            ]
                        },
                        {
                            "ref": "G12",
                            "value": 20455,
                            "index": 6,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "HJdOFWEyUfN"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "r1tdK-E1UGN"
                                }
                            ]
                        }
                    ]
                },
                {
                    "index": 12,
                    "visible": true,
                    "height": 20,
                    "#cells": [
                        {
                            "ref": "A13",
                            "value": "lc0247917",
                            "index": 0,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "r19uKZV1IGN"
                                }
                            ]
                        },
                        {
                            "ref": "B13",
                            "value": "Conti",
                            "index": 1,
                            "style": {
                                "wrap": true,
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "BJi_FbNy8GN"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "H1nOYbNkUz4"
                                }
                            ]
                        },
                        {
                            "ref": "C13",
                            "value": "Emilio",
                            "index": 2,
                            "style": {
                                "wrap": true,
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "rJa_Y-4JIfV"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "B10OYW4yIMN"
                                }
                            ]
                        },
                        {
                            "ref": "D13",
                            "value": "222 Lacawanna Ave.",
                            "index": 3,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "HyJKYWEJUf4"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "BkeFYZEkUfN"
                                }
                            ]
                        },
                        {
                            "ref": "E13",
                            "value": "Pittsburgh",
                            "index": 4,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "SyZtF-Ek8zE"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "SJGFKZEkUM4"
                                }
                            ]
                        },
                        {
                            "ref": "F13",
                            "value": "PA",
                            "index": 5,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "rJmFY-N1LG4"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "B1EtKW4yIMV"
                                }
                            ]
                        },
                        {
                            "ref": "G13",
                            "value": 15285,
                            "index": 6,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "B1SFYZVkUMN"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "BJ8tKbE1Iz4"
                                }
                            ]
                        }
                    ]
                },
                {
                    "index": 13,
                    "visible": true,
                    "height": 20,
                    "#cells": [
                        {
                            "ref": "A14",
                            "value": "lc0247918",
                            "index": 0,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "HyvtYbNkIz4"
                                }
                            ]
                        },
                        {
                            "ref": "B14",
                            "value": "Dewilde",
                            "index": 1,
                            "style": {
                                "wrap": true,
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "HkOKKbNyUGN"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "rkYKFWEJ8zE"
                                }
                            ]
                        },
                        {
                            "ref": "C14",
                            "value": "Lydia",
                            "index": 2,
                            "style": {
                                "wrap": true,
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "B19tFZNkIz4"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "SyitF-4k8MN"
                                }
                            ]
                        },
                        {
                            "ref": "D14",
                            "value": "533 W. Main St.",
                            "index": 3,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "HkhKK-NyIf4"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "S16YtWVyUME"
                                }
                            ]
                        },
                        {
                            "ref": "E14",
                            "value": "Rye",
                            "index": 4,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "ByCtYbEk8zE"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "S1kcY-EyLMN"
                                }
                            ]
                        },
                        {
                            "ref": "F14",
                            "value": "NY",
                            "index": 5,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "S1e5tWNkIfN"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "B1W9FWE1UfN"
                                }
                            ]
                        },
                        {
                            "ref": "G14",
                            "value": 10581,
                            "index": 6,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "Syf9YbEkIM4"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "SyQ5FbVyUz4"
                                }
                            ]
                        }
                    ]
                },
                {
                    "index": 14,
                    "visible": true,
                    "height": 20,
                    "#cells": [
                        {
                            "ref": "A15",
                            "value": "lc0247919",
                            "index": 0,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "HJE5YbNyIMV"
                                }
                            ]
                        },
                        {
                            "ref": "B15",
                            "value": "Neher",
                            "index": 1,
                            "style": {
                                "wrap": true,
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "Bkr9YW4JIG4"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "HyU5YZ4JIGN"
                                }
                            ]
                        },
                        {
                            "ref": "C15",
                            "value": "Dawn",
                            "index": 2,
                            "style": {
                                "wrap": true,
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "SJvctZNk8f4"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "rJu9K-EJUMV"
                                }
                            ]
                        },
                        {
                            "ref": "D15",
                            "value": "16 Hospital St.",
                            "index": 3,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "ByY9FbNJ8G4"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "r1c5Yb4J8M4"
                                }
                            ]
                        },
                        {
                            "ref": "E15",
                            "value": "Verplanck",
                            "index": 4,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "rJjcYbNkIzV"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "Byn5YZ4JUzV"
                                }
                            ]
                        },
                        {
                            "ref": "F15",
                            "value": "NY",
                            "index": 5,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "B1T9tb4J8GE"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "r10ctZNyIzN"
                                }
                            ]
                        },
                        {
                            "ref": "G15",
                            "value": 10596,
                            "index": 6,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "rJyjtWVkIzN"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "BkxjFZEkUGN"
                                }
                            ]
                        }
                    ]
                },
                {
                    "index": 15,
                    "visible": true,
                    "height": 20,
                    "#cells": [
                        {
                            "ref": "A16",
                            "value": "lc0247920",
                            "index": 0,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "B1-oKWEkIMN"
                                }
                            ]
                        },
                        {
                            "ref": "B16",
                            "value": "Hadley",
                            "index": 1,
                            "style": {
                                "wrap": true,
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "B1Mot-EkIG4"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "B1QitZ4yUG4"
                                }
                            ]
                        },
                        {
                            "ref": "C16",
                            "value": "Maggie",
                            "index": 2,
                            "style": {
                                "wrap": true,
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "HkNiKZVJUGN"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "HJBsFZVyLz4"
                                }
                            ]
                        },
                        {
                            "ref": "D16",
                            "value": "405 E. 54th Street",
                            "index": 3,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "rJIiFbVyLf4"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "HJPjtZE18zN"
                                }
                            ]
                        },
                        {
                            "ref": "E16",
                            "value": "New York",
                            "index": 4,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "ryuoFbEk8fE"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "ByFotbVJLGV"
                                }
                            ]
                        },
                        {
                            "ref": "F16",
                            "value": "NY",
                            "index": 5,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "SyqsYbVJIMN"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "SkjjFZV1UfE"
                                }
                            ]
                        },
                        {
                            "ref": "G16",
                            "value": 10020,
                            "index": 6,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "ry2itbNkLGN"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "HyajFWVJUGE"
                                }
                            ]
                        }
                    ]
                },
                {
                    "index": 16,
                    "visible": true,
                    "height": 20,
                    "#cells": [
                        {
                            "ref": "A17",
                            "value": "lc0247921",
                            "index": 0,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "r1CjFbEJLG4"
                                }
                            ]
                        },
                        {
                            "ref": "B17",
                            "value": "Hesse",
                            "index": 1,
                            "style": {
                                "wrap": true,
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "BkynKbV1UMV"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "HJg3FZNyUMN"
                                }
                            ]
                        },
                        {
                            "ref": "C17",
                            "value": "Mallory",
                            "index": 2,
                            "style": {
                                "wrap": true,
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "r1-nFZVyIGN"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "r1G2YbVJ8fE"
                                }
                            ]
                        },
                        {
                            "ref": "D17",
                            "value": "3 Pershing Street",
                            "index": 3,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "By72FZ4JUGV"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "Hk4hY-N1LMV"
                                }
                            ]
                        },
                        {
                            "ref": "E17",
                            "value": "Scarsdale",
                            "index": 4,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "r1HhK-N18z4"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "B18hY-VkLz4"
                                }
                            ]
                        },
                        {
                            "ref": "F17",
                            "value": "NY",
                            "index": 5,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "SJD2KWEkIzV"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "Hy_nYb4kIfV"
                                }
                            ]
                        },
                        {
                            "ref": "G17",
                            "value": 10583,
                            "index": 6,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "ByF2tWN1LMN"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "SJ9hKW4y8MV"
                                }
                            ]
                        }
                    ]
                },
                {
                    "index": 17,
                    "visible": true,
                    "height": 20,
                    "#cells": [
                        {
                            "ref": "A18",
                            "value": "lc0247922",
                            "index": 0,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "Skj2FWNk8zE"
                                }
                            ]
                        },
                        {
                            "ref": "B18",
                            "value": "Ballo",
                            "index": 1,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "HkhhYb4kLzE"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "BypnYW4JIz4"
                                }
                            ]
                        },
                        {
                            "ref": "C18",
                            "value": "Stephen",
                            "index": 2,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "H1ChKWVy8MN"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "BkJaF-EyUGN"
                                }
                            ]
                        },
                        {
                            "ref": "D18",
                            "value": "17 Exeter Street",
                            "index": 3,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "SyxpKbE1UGE"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "H1-TK-EyUGV"
                                }
                            ]
                        },
                        {
                            "ref": "E18",
                            "value": "Thornwood",
                            "index": 4,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "rkfpFWNkIzN"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "H1XpKbVy8f4"
                                }
                            ]
                        },
                        {
                            "ref": "F18",
                            "value": "NJ",
                            "index": 5,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "rkVaYZEJ8GN"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "HJraYb4kLG4"
                                }
                            ]
                        },
                        {
                            "ref": "G18",
                            "value": 10594,
                            "index": 6,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "H1L6F-NyIGV"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "r1vaFWNyIf4"
                                }
                            ]
                        }
                    ]
                },
                {
                    "index": 18,
                    "visible": true,
                    "height": 20,
                    "#cells": [
                        {
                            "ref": "A19",
                            "value": "lc0247923",
                            "index": 0,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "r1uaK-4yIfE"
                                }
                            ]
                        },
                        {
                            "ref": "B19",
                            "value": "Barner",
                            "index": 1,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "H1YpKZNkIME"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "Bk9TKW4k8GN"
                                }
                            ]
                        },
                        {
                            "ref": "C19",
                            "value": "Richard",
                            "index": 2,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "HyjTKWEkUMV"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "Sy2atZEyIGN"
                                }
                            ]
                        },
                        {
                            "ref": "D19",
                            "value": "52 Chase Road",
                            "index": 3,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "B1p6FbVJLzE"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "H10aYb4yUzV"
                                }
                            ]
                        },
                        {
                            "ref": "E19",
                            "value": "Atlantic City",
                            "index": 4,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "rJJRt-4k8ME"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "Skl0KZEyIM4"
                                }
                            ]
                        },
                        {
                            "ref": "F19",
                            "value": "NJ",
                            "index": 5,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "Byb0tbVkIzV"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "rkGRKZ4J8ME"
                                }
                            ]
                        },
                        {
                            "ref": "G19",
                            "value": 10031,
                            "index": 6,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "rkmCY-4kLzV"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "B1NCtbV1LGN"
                                }
                            ]
                        }
                    ]
                },
                {
                    "index": 19,
                    "visible": true,
                    "height": 20,
                    "#cells": [
                        {
                            "ref": "A20",
                            "value": "lc0247924",
                            "index": 0,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "SJBCKWNkIMV"
                                },
                                {
                                    "validate": "fontAttrs.def.bold",
                                    "operator": "equals",
                                    "id": "HJLRt-EyIfN"
                                }
                            ]
                        },
                        {
                            "ref": "B20",
                            "value": "Stanton",
                            "index": 1,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "ryDRFZV18z4"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "BkdRY-Vk8f4"
                                }
                            ]
                        },
                        {
                            "ref": "C20",
                            "value": "Sherrill",
                            "index": 2,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "SJKRFZ4y8zE"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "HJq0KbVyIME"
                                }
                            ]
                        },
                        {
                            "ref": "D20",
                            "value": "664 Lanning Lane",
                            "index": 3,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "Bkj0tWN1LMN"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "H12RKWV1If4"
                                }
                            ]
                        },
                        {
                            "ref": "E20",
                            "value": "White Plains",
                            "index": 4,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "HypRFZ418fV"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "rJ00FbVJLfE"
                                }
                            ]
                        },
                        {
                            "ref": "F20",
                            "value": "NJ",
                            "index": 5,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "rJJklYZEJ8GE"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "H1lygt-VJ8fN"
                                }
                            ]
                        },
                        {
                            "ref": "G20",
                            "value": 10602,
                            "index": 6,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "r1bkgY-Nk8fV"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "HJMylKWVJLGE"
                                }
                            ]
                        }
                    ]
                },
                {
                    "index": 20,
                    "visible": true,
                    "height": 20,
                    "#cells": [
                        {
                            "ref": "A21",
                            "value": "lc0247925",
                            "index": 0,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "B1mJetZ4kIzV"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "By41eFWVkUfE"
                                }
                            ]
                        },
                        {
                            "ref": "B21",
                            "value": "Buzitski",
                            "index": 1,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "S1r1gYW4yIf4"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "SJU1et-4JIGN"
                                }
                            ]
                        },
                        {
                            "ref": "C21",
                            "value": "John",
                            "index": 2,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "ByDkeFbN1LGV"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "ByOJxY-VyLGE"
                                }
                            ]
                        },
                        {
                            "ref": "D21",
                            "value": "25 Tioga Ave",
                            "index": 3,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "HyKklKbEkIfN"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "H19JeF-4JIfV"
                                }
                            ]
                        },
                        {
                            "ref": "E21",
                            "value": "Kingston",
                            "index": 4,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "BJo1gF-VJLMV"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "H13Jlt-V18GV"
                                }
                            ]
                        },
                        {
                            "ref": "F21",
                            "value": "PA",
                            "index": 5,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "HJaygF-4JUzN"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "r1AklYWVk8G4"
                                }
                            ]
                        },
                        {
                            "ref": "G21",
                            "value": 18701,
                            "index": 6,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "H1yggYZVkUM4"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "rkxllF-418M4"
                                }
                            ]
                        }
                    ]
                },
                {
                    "index": 21,
                    "visible": true,
                    "height": 20,
                    "#cells": [
                        {
                            "ref": "A22",
                            "value": "lc0247926",
                            "index": 0,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "rybegtbNyLfN"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "HkGexYZNJIfE"
                                }
                            ]
                        },
                        {
                            "ref": "B22",
                            "value": "Fleming",
                            "index": 1,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "HJXgetb4yIzE"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "SJExeK-EJ8z4"
                                }
                            ]
                        },
                        {
                            "ref": "C22",
                            "value": "William",
                            "index": 2,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "B1BegKbV1UfV"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "ByIllY-41Lf4"
                                }
                            ]
                        },
                        {
                            "ref": "D22",
                            "value": "35 Hannibal Lane",
                            "index": 3,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "BJwgeYbNkIGE"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "B1OgeFbEJLz4"
                                }
                            ]
                        },
                        {
                            "ref": "E22",
                            "value": "Plymouth",
                            "index": 4,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "H1tlxKWV1LzV"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "rJ9xlY-VJLM4"
                                }
                            ]
                        },
                        {
                            "ref": "F22",
                            "value": "PA",
                            "index": 5,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "Bkoget-V1IMN"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "HyhggK-Ek8MN"
                                }
                            ]
                        },
                        {
                            "ref": "G22",
                            "value": 10587,
                            "index": 6,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "Sk6lxFW418GE"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "r1CleFZNkIzV"
                                }
                            ]
                        }
                    ]
                },
                {
                    "index": 22,
                    "visible": true,
                    "height": 20,
                    "#cells": [
                        {
                            "ref": "A23",
                            "value": "lc0247927",
                            "index": 0,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "By1WeKWN1Lf4"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "rkeWeYbVJLfE"
                                }
                            ]
                        },
                        {
                            "ref": "B23",
                            "value": "Gosciewski",
                            "index": 1,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "H1-ZxtZ4kIz4"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "Byf-lYWEJLzE"
                                }
                            ]
                        },
                        {
                            "ref": "C23",
                            "value": "Barbara",
                            "index": 2,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "ByQ-eF-Vy8GE"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "BkEWgKb4kUGE"
                                }
                            ]
                        },
                        {
                            "ref": "D23",
                            "value": "5 Marilyn Drive",
                            "index": 3,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "r1rWgFZVy8GV"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "BkLWxYZNy8fE"
                                }
                            ]
                        },
                        {
                            "ref": "E23",
                            "value": "Shenorock",
                            "index": 4,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "SkP-gK-VkUM4"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "Sk_ZetWEkLGN"
                                }
                            ]
                        },
                        {
                            "ref": "F23",
                            "value": "NJ",
                            "index": 5,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "S1KZeYZNkIGV"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "H19-gtWEy8f4"
                                }
                            ]
                        },
                        {
                            "ref": "G23",
                            "value": 10051,
                            "index": 6,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "BkoZgKb4y8MV"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "H13-gFZVkUGN"
                                }
                            ]
                        }
                    ]
                },
                {
                    "index": 23,
                    "visible": true,
                    "height": 20,
                    "#cells": [
                        {
                            "ref": "A24",
                            "value": "lc0247928",
                            "index": 0,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "SkpZeKW4k8zV"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "S1AZxFZ418MV"
                                }
                            ]
                        },
                        {
                            "ref": "B24",
                            "value": "Grula",
                            "index": 1,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "B1yzxtWV1UME"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "SkeMgKWNJIzV"
                                }
                            ]
                        },
                        {
                            "ref": "C24",
                            "value": "Joseph",
                            "index": 2,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "Sk-MlFbNyIfE"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "rkfGgY-4J8M4"
                                }
                            ]
                        },
                        {
                            "ref": "D24",
                            "value": "101 Fair Street",
                            "index": 3,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "B1XfxF-NyLzE"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "r1VGeKbV1UzN"
                                }
                            ]
                        },
                        {
                            "ref": "E24",
                            "value": "Tarrytown",
                            "index": 4,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "BJrMltZNkIG4"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "HyLzeF-VJLfV"
                                }
                            ]
                        },
                        {
                            "ref": "F24",
                            "value": "NY",
                            "index": 5,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "B1wMgF-NyLG4"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "SkOfxYZ4kLfE"
                                }
                            ]
                        },
                        {
                            "ref": "G24",
                            "value": 10591,
                            "index": 6,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "B1tGlYbNyLfE"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "B19MlYb4kLzV"
                                }
                            ]
                        }
                    ]
                },
                {
                    "index": 24,
                    "visible": true,
                    "height": 20,
                    "#cells": [
                        {
                            "ref": "A25",
                            "value": "lc0247929",
                            "index": 0,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "SJsMeFbEkLfV"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "rk3zgFWEkLf4"
                                }
                            ]
                        },
                        {
                            "ref": "B25",
                            "value": "Kivler",
                            "index": 1,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "SkpfgYZNyLMN"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "ryRzeFZVk8MN"
                                }
                            ]
                        },
                        {
                            "ref": "C25",
                            "value": "Sandra",
                            "index": 2,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "SkyXgt-NyLfV"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "r1e7eKZEk8fE"
                                }
                            ]
                        },
                        {
                            "ref": "D25",
                            "value": "117 Railroad St.",
                            "index": 3,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "HkbXlFbVJLf4"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "rkGXeY-E1UGV"
                                }
                            ]
                        },
                        {
                            "ref": "E25",
                            "value": "Glen Lyon",
                            "index": 4,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "rJmQgYZ4kIfN"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "SkEmeK-V1Lz4"
                                }
                            ]
                        },
                        {
                            "ref": "F25",
                            "value": "PA",
                            "index": 5,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "SyHmxFb4JIME"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "B18XxF-4yIME"
                                }
                            ]
                        },
                        {
                            "ref": "G25",
                            "value": 18671,
                            "index": 6,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "BkDQxK-VJLzN"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "rJ_QeKZNJIfN"
                                }
                            ]
                        }
                    ]
                },
                {
                    "index": 25,
                    "visible": true,
                    "height": 20,
                    "#cells": [
                        {
                            "ref": "A26",
                            "value": "lc0247930",
                            "index": 0,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "B1KmlYb4kIfV"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "Sy5mgtZEJUME"
                                }
                            ]
                        },
                        {
                            "ref": "B26",
                            "value": "Meade",
                            "index": 1,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "B1sXgK-N1Uz4"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "ry2QgKZ418GE"
                                }
                            ]
                        },
                        {
                            "ref": "C26",
                            "value": "Marshall",
                            "index": 2,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "HJa7eFZE1IM4"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "SkAXlFWEJIGE"
                                }
                            ]
                        },
                        {
                            "ref": "D26",
                            "value": "12  Siveley St.",
                            "index": 3,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "Sy1NeFWNyLGE"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "H1l4xFbEkUME"
                                }
                            ]
                        },
                        {
                            "ref": "E26",
                            "value": "Ashley",
                            "index": 4,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "ByZ4lKZEk8zV"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "ByfNlFZE1UME"
                                }
                            ]
                        },
                        {
                            "ref": "F26",
                            "value": "PA",
                            "index": 5,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "Sy7VeKbEJLzE"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "ryN4eFZ4kLGE"
                                }
                            ]
                        },
                        {
                            "ref": "G26",
                            "value": 18706,
                            "index": 6,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "rkrNet-V1IzV"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "ry8NxK-V18GN"
                                }
                            ]
                        }
                    ]
                },
                {
                    "index": 26,
                    "visible": true,
                    "height": 20,
                    "#cells": [
                        {
                            "ref": "A27",
                            "value": "lc0247931",
                            "index": 0,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "B1v4xYbNyUfN"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "BJuVltZN1UfE"
                                }
                            ]
                        },
                        {
                            "ref": "B27",
                            "value": "Ostopick",
                            "index": 1,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "rkF4lF-E1IfV"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "SJ94gFWN18zE"
                                }
                            ]
                        },
                        {
                            "ref": "C27",
                            "value": "Anastasia",
                            "index": 2,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "Byj4xKb4JUfN"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "BkhNlt-NyIGN"
                                }
                            ]
                        },
                        {
                            "ref": "D27",
                            "value": "7 N. Walnut St.",
                            "index": 3,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "rk6EgFbVkIGN"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "S1C4lFbEyIf4"
                                }
                            ]
                        },
                        {
                            "ref": "E27",
                            "value": "Cape May",
                            "index": 4,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "r1JHlY-4kIGV"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "HyxSxYb41LfV"
                                }
                            ]
                        },
                        {
                            "ref": "F27",
                            "value": "NJ",
                            "index": 5,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "BkZHlYZNyLzN"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "H1MreYZ4JIzV"
                                }
                            ]
                        },
                        {
                            "ref": "G27",
                            "value": 22222,
                            "index": 6,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "S1mBeKWV1LGN"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "SyNSeKbNkUM4"
                                }
                            ]
                        }
                    ]
                },
                {
                    "index": 27,
                    "visible": true,
                    "height": 20,
                    "#cells": [
                        {
                            "ref": "A28",
                            "value": "lc0247932",
                            "index": 0,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "ByBHxYZNyLfE"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "r1IHxtbVk8fN"
                                }
                            ]
                        },
                        {
                            "ref": "B28",
                            "value": "Sheckler",
                            "index": 1,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "S1wrgKZ4JUGE"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "SkOreKbNkLM4"
                                }
                            ]
                        },
                        {
                            "ref": "C28",
                            "value": "Morris",
                            "index": 2,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "HktrxKWVkLM4"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "HJ5SeK-N18z4"
                                }
                            ]
                        },
                        {
                            "ref": "D28",
                            "value": "10 Sandra St.",
                            "index": 3,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "ryiBeFb4yLM4"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "BynSltW418GN"
                                }
                            ]
                        },
                        {
                            "ref": "E28",
                            "value": "Shrub Oak",
                            "index": 4,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "ryTrltZNy8fN"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "ryASlKbNyLGE"
                                }
                            ]
                        },
                        {
                            "ref": "F28",
                            "value": "NY",
                            "index": 5,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "BJJ8lK-NyLfV"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "Bkg8lYWVyUfN"
                                }
                            ]
                        },
                        {
                            "ref": "G28",
                            "value": 10588,
                            "index": 6,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "rkWLeY-4JLzE"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "SJzIlKZVkLMN"
                                }
                            ]
                        }
                    ]
                },
                {
                    "index": 28,
                    "visible": true,
                    "height": 20,
                    "#cells": [
                        {
                            "ref": "A29",
                            "value": "lc0578926",
                            "index": 0,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "SJmUeFbE1IzV"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "HJ4LeYW4kUGN"
                                }
                            ]
                        },
                        {
                            "ref": "B29",
                            "value": "Weiner",
                            "index": 1,
                            "style": {
                                "wrap": true,
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "SyBLgKbVyUfV"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "HJIIlK-NJ8f4"
                                }
                            ]
                        },
                        {
                            "ref": "C29",
                            "value": "Johanna",
                            "index": 2,
                            "style": {
                                "wrap": true,
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "HyPLetbV18fV"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "S1dUxKZEJIfN"
                                }
                            ]
                        },
                        {
                            "ref": "D29",
                            "value": "68 Carroll Street",
                            "index": 3,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "HJt8xYW4JUfV"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "H19LeY-4JLME"
                                }
                            ]
                        },
                        {
                            "ref": "E29",
                            "value": "Farmington",
                            "index": 4,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "HyjIlKZEk8GN"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "SkhUlKZEy8zN"
                                }
                            ]
                        },
                        {
                            "ref": "F29",
                            "value": "CT",
                            "index": 5,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "rJTLxtWEJLfN"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "BkALxtWEJLMV"
                                }
                            ]
                        },
                        {
                            "ref": "G29",
                            "value": 66032,
                            "index": 6,
                            "style": {
                                "format": "General"
                            },
                            "validations": [
                                {
                                    "validate": "value",
                                    "operator": "equals",
                                    "id": "HJkDlt-Ny8fE"
                                },
                                {
                                    "validate": "style.format",
                                    "operator": "equals",
                                    "id": "HkxDgKZ4JLME"
                                }
                            ]
                        }
                    ]
                },
                {
                    "index": 59,
                    "visible": true,
                    "height": 20
                }
            ],
            "#columns": [
                {
                    "visible": true,
                    "width": 69,
                    "index": 0
                },
                {
                    "visible": true,
                    "width": 84,
                    "index": 1
                },
                {
                    "visible": true,
                    "width": 71,
                    "index": 2
                },
                {
                    "visible": true,
                    "width": 174,
                    "index": 3
                },
                {
                    "visible": true,
                    "width": 117,
                    "index": 4
                },
                {
                    "visible": true,
                    "width": 64,
                    "index": 9
                }
            ],
            "#mergedCells": []
        }
    ]
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Enums_1 = __webpack_require__(4);
var jsonPath = __webpack_require__(3);
var Utils_1 = __webpack_require__(1);
var HintsGenerator = /** @class */ (function () {
    function HintsGenerator() {
        /*
            validationIDToCellRefMap: {
                <validationId>: {
                    <cellRef>: <jsonPath of Cell>,
                    <validationObj>: <validation obj of validation id from checkerOutput>
                }
            }
        */
        this.validationIDToCellRefMap = {};
        this.solutionToSubmissionJSONMap = {};
        /*
            ruleIdToValidationIdMap: {
                <ruleId>: <Array of validations IDs lying in the rule ID>
            }
        */
        this.ruleIdToValidationIdMap = {};
    }
    HintsGenerator.prototype.generateHints = function (graderOutput, userSubmissionJson, hintsJson, hintsMeta) {
        if (hintsJson == undefined) {
            return { userSubmissionJsonWithHints: userSubmissionJson };
        }
        if (hintsJson.type && (hintsJson.type.toLowerCase() === Enums_1.HintsType.RULEBASED.toLowerCase())) {
            var result = {
                hintsMeta: {
                    remainingHints: 0
                }
            };
            var scoredJson = graderOutput.scoredJson;
            hintsMeta = hintsMeta || hintsJson.hintsMeta;
            if (hintsMeta == undefined || hintsMeta.remainingHints == undefined) {
                result.hintsMeta.remainingHints = hintsJson.data.length;
            }
            else {
                result.hintsMeta = hintsMeta;
            }
            while (result.hintsMeta.remainingHints > 0) {
                var currentHintMeta = hintsJson.data[hintsJson.data.length - result.hintsMeta.remainingHints];
                result.hintsMeta.remainingHints--;
                var showHints = false;
                for (var i = 0; i < currentHintMeta.ruleIds.length; i++) {
                    var ruleId = currentHintMeta.ruleIds[i];
                    var isIncorrect = false;
                    var ruleNode = this.getStatusNodes(scoredJson, ruleId);
                    if (ruleNode != undefined && ruleNode.status != Enums_1.RuleStatus.PASS) {
                        //user filled data is incorrect hence display hints. 
                        showHints = true;
                        this.computeHints(graderOutput, currentHintMeta, userSubmissionJson);
                        break;
                    }
                }
                if (showHints) {
                    var shownHints = result.hintsMeta['shownHints'];
                    shownHints = shownHints || [];
                    shownHints.push(currentHintMeta.idx);
                    result["userSubmissionJsonWithHints"] = userSubmissionJson;
                    return result;
                }
                // test for next hint available goto:10
            }
            // All hints consumed and All data filled is correct && set hints consumed value equal to total hints
            result["userSubmissionJsonWithHints"] = userSubmissionJson;
            return result;
        }
    };
    /**
     *
     * @param scoredJson : Scorer Output
     * @param ruleId : rule Id generated by Paint
     * returns: Scored Rule Object
     */
    HintsGenerator.prototype.getStatusNodes = function (scoredJson, ruleId) {
        return jsonPath.query(scoredJson, "$..[?(@.id=='" + ruleId + "')]")[0];
    };
    HintsGenerator.prototype.computeHints = function (graderOutput, currentHintsMeta, userSubmissionJson) {
        var ruleIdsCount = currentHintsMeta.ruleIds.length;
        this.solutionToSubmissionJSONMap = Utils_1.Utils.GetSolutionToSubmissionJSONMap(graderOutput.matchedElementsJson)["matchedAndMissing"];
        for (var idx = 0; idx < ruleIdsCount; idx++) {
            var ruleId = currentHintsMeta.ruleIds[idx];
            if (this.ruleIdToValidationIdMap[ruleId] == undefined) {
                this.createRuleIdToValidationIdMap(graderOutput.scoredJson, ruleId);
            }
        }
        var showCellValues = false;
        var hintsAlreadySet = false;
        if (currentHintsMeta.tooltip && currentHintsMeta.tooltip.length > 0) {
            // Display tooltip on cells
            if (currentHintsMeta.tooltip.length == 1 && currentHintsMeta.tooltip[0].targetCell == undefined) {
                this.createValidationIDToCellRefMap(graderOutput.solutionJson);
                if (currentHintsMeta.showCellValues != false) {
                    showCellValues = true;
                    hintsAlreadySet = true;
                }
                var showTooltip = true;
                this.setHintsDataOnUserSubmission(userSubmissionJson, graderOutput.solutionJson, showCellValues, showTooltip, currentHintsMeta.tooltip[0].text);
            }
            else {
                this.setHintsTooltipDataByTargetCell(currentHintsMeta, userSubmissionJson, graderOutput.solutionJson);
            }
        }
        if (currentHintsMeta.showCellValues != false && hintsAlreadySet == false) {
            this.createValidationIDToCellRefMap(graderOutput.solutionJson);
            this.setHintsDataOnUserSubmission(userSubmissionJson, graderOutput.solutionJson);
        }
    };
    /**
     * this function is used to set hints tooltip when target cell is given
     * @param currentHintsMeta
     * @param userSubmissionJson
     * @param solutionJson
     */
    HintsGenerator.prototype.setHintsTooltipDataByTargetCell = function (currentHintsMeta, userSubmissionJson, solutionJson) {
        var tooltipCount = currentHintsMeta.tooltip.length;
        var sheetIdIdxMap = {};
        var sheetCount = solutionJson['#sheets'].length;
        for (var idx = 0; idx < sheetCount; idx++) {
            sheetIdIdxMap[solutionJson['#sheets'][idx]['id']] = idx;
        }
        for (var idx = 0; idx < tooltipCount; idx++) {
            var currentTooltip = currentHintsMeta.tooltip[idx];
            if (currentTooltip.targetCell && currentTooltip.targetCell.sheetId && currentTooltip.targetCell.cellRef) {
                var cellCrd = Utils_1.Utils.GetCellCoordinatesFromRef(currentTooltip.targetCell.cellRef);
                var sheetIdx = sheetIdIdxMap[currentTooltip.targetCell.sheetId];
                var solCellJsonPath = "$['#sheets']['" + Number(sheetIdx) + "']['#rows']['" + (Number(cellCrd.row) - 1) + "']['#cells']['" + (Number(cellCrd.col) - 1) + "']";
                var userSubmissionJSONPathRef = this.solutionToSubmissionJSONMap[solCellJsonPath];
                if (userSubmissionJSONPathRef) {
                    this.setTooltipText(userSubmissionJson, userSubmissionJSONPathRef, currentTooltip.text);
                }
            }
        }
    };
    HintsGenerator.prototype.setTooltipText = function (userSubmissionJson, userSubmissionJSONPathRef, tooltipText) {
        var targetCellRefObj = jsonPath.value(userSubmissionJson, userSubmissionJSONPathRef);
        targetCellRefObj["hint"] = {
            "text": tooltipText
        };
    };
    HintsGenerator.prototype.createValidationIDToCellRefMap = function (checkerOutput) {
        var validationsIdsObj = jsonPath.nodes(checkerOutput, "$..validate");
        var validationIdsCount = validationsIdsObj.length;
        for (var count = 0; count < validationIdsCount; count++) {
            var element = validationsIdsObj[count];
            element.path = element.path.map(String);
            element.path.pop();
            var validationPath = jsonPath.stringify(element.path);
            var validationObject = jsonPath.value(checkerOutput, validationPath);
            element.path.splice(-2);
            var cellRef = jsonPath.stringify(element.path);
            this.validationIDToCellRefMap[validationObject.id] = {
                cellRef: cellRef.replace(/"/g, '\''),
                validationObj: validationObject
            };
        }
    };
    HintsGenerator.prototype.createRuleIdToValidationIdMap = function (scoredJson, ruleId) {
        this.ruleIdToValidationIdMap[ruleId] = [];
        var rootScoredObj = jsonPath.nodes(scoredJson, "$..[?(@.id=='" + ruleId + "')]");
        var validations = jsonPath.query(rootScoredObj[0].value, "$..[?(@.type=='" + Enums_1.Rules.VALIDATION + "')]");
        var validationIdsArr = jsonPath.query(validations, "$..id");
        this.ruleIdToValidationIdMap[ruleId] = validationIdsArr;
    };
    HintsGenerator.prototype.setHintsDataOnUserSubmission = function (userSubmissionJson, solutionJson, showCellValues, showTooltip, tooltipText) {
        if (showCellValues === void 0) { showCellValues = true; }
        if (showTooltip === void 0) { showTooltip = false; }
        var rowMajorCellObj = {
            jsonPath: '',
            cellRef: ''
        };
        for (var ruleId in this.ruleIdToValidationIdMap) {
            var currentRule = this.ruleIdToValidationIdMap[ruleId];
            var validationIdsCount = currentRule.length;
            for (var idx = 0; idx < validationIdsCount; idx++) {
                var validationId = currentRule[idx];
                // this cellRef belongs to Solution JSON
                var solCellRef = this.validationIDToCellRefMap[validationId].cellRef;
                var userSubCellRef = this.solutionToSubmissionJSONMap[solCellRef];
                if (userSubCellRef) {
                    if (showTooltip) {
                        rowMajorCellObj = this.getRowMajorCellJSONPthRef(userSubmissionJson, rowMajorCellObj, userSubCellRef);
                    }
                    if (showCellValues) {
                        var solCellObj = jsonPath.value(solutionJson, solCellRef);
                        // this destCellObj is the cell object of submission json corresponding to the cellRef of solution JSON
                        var userSubCellObj = jsonPath.value(userSubmissionJson, userSubCellRef);
                        var prop = this.validationIDToCellRefMap[validationId].validationObj.validate;
                        this.setValidationValue(solCellObj, userSubCellObj, prop.split('.')); // logic to set correct data on user submission
                    }
                }
            }
        }
        if (showTooltip && rowMajorCellObj.jsonPath.trim() != '') {
            this.setTooltipText(userSubmissionJson, rowMajorCellObj.jsonPath, tooltipText);
        }
    };
    HintsGenerator.prototype.getRowMajorCellJSONPthRef = function (userSubmissionJson, rowMajorCellObj, userSubCellRef) {
        var userSubCellRefObj = jsonPath.value(userSubmissionJson, userSubCellRef);
        if (rowMajorCellObj.cellRef == '') {
            return {
                jsonPath: userSubCellRef,
                cellRef: userSubCellRefObj.ref
            };
        }
        else {
            var currentRMCrd = Utils_1.Utils.GetCellCoordinatesFromRef(rowMajorCellObj.cellRef);
            var userCellRefCrd = Utils_1.Utils.GetCellCoordinatesFromRef(userSubCellRefObj.ref);
            if (Number(currentRMCrd.row) == Number(userCellRefCrd.row)) {
                if (Number(currentRMCrd.col) > Number(userCellRefCrd.col)) {
                    return {
                        jsonPath: userSubCellRef,
                        cellRef: userSubCellRefObj.ref
                    };
                }
                else {
                    return rowMajorCellObj;
                }
            }
            else if (Number(currentRMCrd.row) > Number(userCellRefCrd.row)) {
                return {
                    jsonPath: userSubCellRef,
                    cellRef: userSubCellRefObj.ref
                };
            }
            else {
                return rowMajorCellObj;
            }
        }
    };
    HintsGenerator.prototype.setValidationValue = function (src, dstn, pathAry) {
        var l = pathAry.length;
        var i = 0;
        for (l; l > 0; l--, i++) {
            if (!dstn[pathAry[i]]) {
                dstn[pathAry[i]] = {};
            }
            if (l == 1) {
                dstn[pathAry[i]] = src[pathAry[i]];
            }
            else {
                src = src[pathAry[i]];
                dstn = dstn[pathAry[i]];
            }
        }
    };
    return HintsGenerator;
}());
exports.HintsGenerator = HintsGenerator;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:max-line-length */
/* tslint:disable */
var munkres = __webpack_require__(5);
var util_1 = __webpack_require__(0);
var Utils_1 = __webpack_require__(1);
var CellOOOMatchingStrategy_1 = __webpack_require__(9);
var RowOOOMatchingStrategy = /** @class */ (function () {
    function RowOOOMatchingStrategy() {
    }
    /**
     *
     * @param solutionRowsJson Solution Row Array
     * @param submissionRowsJson Submission Row Array
     * @param matchedElementsJson Inner Matched Element JSON
     */
    RowOOOMatchingStrategy.prototype.MatchNodes = function (solutionRowsJson, submissionRowsJson, matchedElementsJson, matchSettings) {
        if (util_1.isNullOrUndefined(solutionRowsJson)) {
            matchedElementsJson.node[0].node = [];
            for (var i = 0; i < submissionRowsJson.length; i++) {
                matchedElementsJson.node[0].node.push(Utils_1.Utils.GenerateMatchedElementNode(matchedElementsJson.node[0], null, i.toString(), 'extra'));
            }
        }
        else if (util_1.isNullOrUndefined(submissionRowsJson)) {
            matchedElementsJson.node[0].node = [];
            for (var i = 0; i < solutionRowsJson.length; i++) {
                matchedElementsJson.node[0].node.push(Utils_1.Utils.GenerateMatchedElementNode(matchedElementsJson.node[0], i.toString(), null, 'missing'));
            }
        }
        else {
            var totalCellMatchingCost = 0;
            var solrows = solutionRowsJson;
            var subRows = submissionRowsJson;
            //Creating Cell Matching Strategy Object
            var cellMatcher = new CellOOOMatchingStrategy_1.CellOOOMatchingStrategy();
            var rowCostMatrix = [];
            var matchedRows = [];
            //If we are running Positional Matcher, as in 0% weightage on text & 100% on Position then
            //we need not call the Cell Cost Caluclator since we just want to match rows based on Row Index
            if (matchSettings.cellRefWeightage == 1) {
                matchedRows = Utils_1.Utils.MatchPositionally(solrows, subRows);
            }
            else {
                //We are Matching in 2 Phases
                // Phase I - First Match the Textual Rows
                //Phjase II - Match the Extra/Missing Rows (From Phase I) + Blanks Rows as One Set
                var BlankAndNonBlanSolutionRows = Utils_1.Utils.GetBlanAndNonBlankRows(solrows);
                var BlankAndNonBlanSubmissionRows = Utils_1.Utils.GetBlanAndNonBlankRows(subRows);
                solrows = BlankAndNonBlanSolutionRows.NonBlankRows;
                subRows = BlankAndNonBlanSubmissionRows.NonBlankRows;
                for (var i = 0; i < solrows.length; i++) {
                    rowCostMatrix[i] = [];
                    for (var j = 0; j < subRows.length; j++) {
                        var solCells = solrows[i]['#cells'];
                        var subCells = subRows[j]['#cells'];
                        //In case the cells array is blank, we add in the cells array with blank calues since blanks will have 100 cost when matched with texts
                        var updatedRow = this.PopulateBlanCellsIfNotDefined(solCells, subCells);
                        solCells = updatedRow.solutionCells;
                        subCells = updatedRow.submissionCells;
                        var matchedCells = void 0;
                        var cellCostMatrix = cellMatcher.ReturnCellCost(solCells, subCells, '', matchSettings);
                        matchedCells = munkres(cellCostMatrix);
                        totalCellMatchingCost = this.getCellMatchingCostForRow(cellCostMatrix, matchedCells);
                        rowCostMatrix[i][j] = totalCellMatchingCost;
                    }
                }
                if (rowCostMatrix.length > 0) {
                    matchedRows = munkres(rowCostMatrix);
                }
                var missingAndBlankSolRows = [];
                var extraAndBlankSubRows = [];
                var _loop_1 = function (i) {
                    var matchedSolRow = matchedRows.find(function (element) { return element[0] === i; });
                    if (util_1.isNullOrUndefined(matchedSolRow)) {
                        missingAndBlankSolRows.push(solrows[i]);
                    }
                };
                for (var i = 0; i < solrows.length; i++) {
                    _loop_1(i);
                }
                missingAndBlankSolRows = missingAndBlankSolRows.concat(BlankAndNonBlanSolutionRows.BlankRows);
                var _loop_2 = function (i) {
                    var matchedSubRow = matchedRows.find(function (element) { return element[1] === i; });
                    if (util_1.isNullOrUndefined(matchedSubRow)) {
                        extraAndBlankSubRows.push(subRows[i]);
                    }
                };
                for (var i = 0; i < subRows.length; i++) {
                    _loop_2(i);
                }
                extraAndBlankSubRows = extraAndBlankSubRows.concat(BlankAndNonBlanSubmissionRows.BlankRows);
                //Adjust the matched Rows Index so as to translate from Non Blank Array to Full Array
                matchedRows = Utils_1.Utils.AdjustRowIndexForBlanks(matchedRows, solrows, subRows);
                //Now we'll fetch the Missing Extra's from the above round of Textual Row Matching and will club them with the Blanks
                //for the purpose of matching. Matching will be based on whatever weightage was passed in for matching rows
                rowCostMatrix = [];
                for (var i = 0; i < missingAndBlankSolRows.length; i++) {
                    rowCostMatrix[i] = [];
                    for (var j = 0; j < extraAndBlankSubRows.length; j++) {
                        var solCells = missingAndBlankSolRows[i]['#cells'];
                        var subCells = extraAndBlankSubRows[j]['#cells'];
                        //In case the cells array is blank, we add in the cells array with blank calues since blanks will have 100 cost when matched with texts
                        var updatedRow = this.PopulateBlanCellsIfNotDefined(solCells, subCells);
                        solCells = updatedRow.solutionCells;
                        subCells = updatedRow.submissionCells;
                        var matchedCells = void 0;
                        var cellCostMatrix = cellMatcher.ReturnCellCost(solCells, subCells, '', matchSettings);
                        matchedCells = munkres(cellCostMatrix);
                        totalCellMatchingCost = this.getCellMatchingCostForRow(cellCostMatrix, matchedCells);
                        rowCostMatrix[i][j] = totalCellMatchingCost;
                    }
                }
                if (rowCostMatrix.length > 0) {
                    var secondPassMatchedRows = munkres(rowCostMatrix);
                    secondPassMatchedRows = Utils_1.Utils.AdjustRowIndexForBlanks(secondPassMatchedRows, missingAndBlankSolRows, extraAndBlankSubRows);
                    matchedRows = matchedRows.concat(secondPassMatchedRows);
                }
            }
            Utils_1.Utils.SolveMatchedElementsMatrix(solutionRowsJson, submissionRowsJson, matchedRows, matchedElementsJson);
        }
    };
    /**
     *
     * @param TwoDArray The Cost Matrix
     * @param matchedCells Output of Munkres
     */
    RowOOOMatchingStrategy.prototype.getCellMatchingCostForRow = function (TwoDArray, matchedCells) {
        var sum = 0;
        var numOfSubCells = TwoDArray.length;
        var numOfSolCells = TwoDArray[0].length;
        for (var i = 0; i < matchedCells.length; i++) {
            var matchedCell = matchedCells[i];
            sum = sum + (parseFloat(TwoDArray[matchedCell[0]][matchedCell[1]]));
        }
        //We need to add in Extra Cost for Extra's and Missing
        //Suppose we have a 5x3 matrix with 5 Cells in the Solution & 3 in the Submission
        //The matchedCells matrix will have just 3 Pairs
        //The difference of the Solution Cell Count and Submission Cell count will be the Number of Extra & missing Cells
        sum += Math.abs(numOfSolCells - numOfSubCells) * 100;
        //Blindly adding the cost of all matched cells to generate Row Cost isn't working
        //Need to normalize the cost so that the playing field is level when matching a Solution Row with 2 Cells with a 
        //Submission Rows with 2 Cells OR a Submission Row with 5 cells
        //Dividing the overall cost by the product of the Number of Solution Cells and Number of Submission Cells
        sum = sum / (numOfSolCells * numOfSubCells);
        return sum;
    };
    RowOOOMatchingStrategy.prototype.PopulateBlanCellsIfNotDefined = function (solCells, subCells) {
        //In case the cells array is blank, we add in the cells array with blank calues since blanks will have 100 cost when matched with texts
        if (util_1.isNullOrUndefined(solCells) && !util_1.isNullOrUndefined(subCells)) {
            solCells = subCells;
            solCells.forEach(function (element) {
                element.value = "";
            });
        }
        else if (!util_1.isNullOrUndefined(solCells) && util_1.isNullOrUndefined(subCells)) {
            subCells = solCells;
            subCells.forEach(function (element) {
                element.value = "";
            });
        }
        else if (util_1.isNullOrUndefined(solCells) && util_1.isNullOrUndefined(subCells)) {
            var solCells_1 = [];
            solCells_1.push({ value: '' });
            var subCells_1 = [];
            subCells_1.push({ value: '' });
        }
        return { "solutionCells": solCells, "submissionCells": subCells };
    };
    return RowOOOMatchingStrategy;
}());
exports.RowOOOMatchingStrategy = RowOOOMatchingStrategy;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// tslint:disable:max-line-length
Object.defineProperty(exports, "__esModule", { value: true });
var munkres = __webpack_require__(5);
var util_1 = __webpack_require__(0);
var Utils_1 = __webpack_require__(1);
var SheetOOOMatchingStrategy = /** @class */ (function () {
    function SheetOOOMatchingStrategy() {
    }
    /**
     *
     * @param solutionJson The Solution JSON having Sheet Array
     * @param submissionJson The Submission JSON having Sheet Array
     * @param matchedElementsJson The Matched Elements JSON
     */
    SheetOOOMatchingStrategy.prototype.MatchNodes = function (solutionJson, submissionJson, matchedElementsJson, matchSettings) {
        var solArrLength = solutionJson.length;
        var subArrLength = submissionJson.length;
        var matchCostMatrix = new Array(solArrLength);
        for (var i = 0; i < solArrLength; i++) {
            var solValue = '';
            //Check if Name Node Exists in Solution Sheet Node
            if (!util_1.isNullOrUndefined(solutionJson[i].name)) {
                solValue = solutionJson[i].name;
            }
            matchCostMatrix[i] = new Array(subArrLength);
            for (var j = 0; j < subArrLength; j++) {
                var subValue = '';
                //Check if Name Node Exists in Submission Sheet Node
                if (!util_1.isNullOrUndefined(submissionJson[j].name)) {
                    subValue = submissionJson[j].name;
                }
                matchCostMatrix[i][j] = Utils_1.Utils.GetLevenCost(solValue, subValue);
            }
        }
        //Invoke Munkres in order to evaluate the Cost Matrix
        var matchedNodesMatrix = munkres(matchCostMatrix);
        //Update Matched Elements JSON in accordance with Output of Munkres
        matchedElementsJson = Utils_1.Utils.SolveMatchedElementsMatrix(solutionJson, submissionJson, matchedNodesMatrix, matchedElementsJson);
    };
    return SheetOOOMatchingStrategy;
}());
exports.SheetOOOMatchingStrategy = SheetOOOMatchingStrategy;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* tslint:disable:one-line */
/* tslint:disable:max-line-length */
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = __webpack_require__(1);
var util_1 = __webpack_require__(0);
var PositionalMatcher = /** @class */ (function () {
    function PositionalMatcher() {
        this.solPath = '';
        this.subPath = '';
    }
    PositionalMatcher.prototype.Match = function (solutionJson, submissionJson, matchSettings) {
        var solutionJsonNode;
        solutionJsonNode = solutionJson;
        var matchedElementsJson = {};
        // Fetching Root Node First
        var path = '$.*';
        var solChildren = Utils_1.Utils.GetNodes(solutionJson, path, true, true);
        var subChildren = Utils_1.Utils.GetNodes(submissionJson, path, true, true);
        this.RecursiveMatch(solChildren, subChildren, matchedElementsJson);
        return matchedElementsJson;
    };
    PositionalMatcher.prototype.RecursiveMatch = function (solutionNode, submissionNode, matchedElementsJson) {
        var maxCountOfNodes = solutionNode.length > submissionNode.length ? solutionNode.length : submissionNode.length;
        var path = '$.*';
        for (var i = 0; i < maxCountOfNodes; i++) {
            if (i > submissionNode.length - 1) {
                if (typeof solutionNode[i]['value'] === 'object') {
                    var missingsolutionNodes = Utils_1.Utils.GetNodes(solutionNode[i]['value'], path, true, true);
                    if (util_1.isNullOrUndefined(matchedElementsJson.node)) {
                        matchedElementsJson.node = [];
                    }
                    matchedElementsJson.node.push(Utils_1.Utils.GenerateMatchedElementNode(matchedElementsJson, solutionNode[i]['path'][1], '', 'missing'));
                    // matchedElementsJson.node[matchedElementsJson.node.length - 1].node = [];
                    this.RecursiveMatch(missingsolutionNodes, [], matchedElementsJson.node);
                }
                else {
                }
            }
            else if (i > solutionNode.length - 1) {
                if (typeof submissionNode[i]['value'] === 'object') {
                    var extrasubmissionNodes = Utils_1.Utils.GetNodes(submissionNode[i]['value'], path, true, true);
                    if (util_1.isNullOrUndefined(matchedElementsJson.node)) {
                        matchedElementsJson.node = [];
                    }
                    matchedElementsJson.node.push(Utils_1.Utils.GenerateMatchedElementNode(matchedElementsJson, '', submissionNode[i]['path'][1], 'extra'));
                    // matchedElementsJson.node[matchedElementsJson.node.length - 1].node = [];
                    this.RecursiveMatch([], extrasubmissionNodes, matchedElementsJson.node[matchedElementsJson.node.length - 1]);
                }
                else {
                }
            }
            else if (solutionNode[i]['path'][1] === submissionNode[i]['path'][1]) {
                if (typeof solutionNode[i]['value'] === 'object' && typeof submissionNode[i]['value'] === 'object') {
                    if (util_1.isNullOrUndefined(matchedElementsJson.node)) {
                        matchedElementsJson.node = [];
                    }
                    matchedElementsJson.node.push(Utils_1.Utils.GenerateMatchedElementNode(matchedElementsJson, solutionNode[i]['path'][1], submissionNode[i]['path'][1], 'match'));
                    if (!Array.isArray(solutionNode[i]['value']) && !Array.isArray(solutionNode[i]['value'])) {
                        var childSolutionNode = Utils_1.Utils.GetNodes(solutionNode[i]['value'], path, true, true);
                        var childSubmissionNode = Utils_1.Utils.GetNodes(submissionNode[i]['value'], path, true, true);
                        // matchedElementsJson.node[matchedElementsJson.node.length - 1].node = [];
                        // matchedElementsJson.node[matchedElementsJson.node.length - 1].node.push(Utils.GenerateMatchedElementNode(matchedElementsJson.node, '0', '0', 'match'));
                        this.RecursiveMatch(childSolutionNode, childSubmissionNode, matchedElementsJson.node[matchedElementsJson.node.length - 1]);
                    }
                    else {
                        var maxCountOfValues = solutionNode[i]['value'].length > submissionNode[i]['value'].length ? solutionNode[i]['value'].length : submissionNode[i]['value'].length;
                        matchedElementsJson.node[matchedElementsJson.node.length - 1].node = [];
                        for (var j = 0; j < maxCountOfValues; j++) {
                            if (j > submissionNode[i]['value'].length - 1) {
                                if (typeof solutionNode[i]['value'] === 'object') {
                                    var missingInnersolutionNodes = Utils_1.Utils.GetNodes(solutionNode[i]['value'][j], path, true, true);
                                    if (util_1.isNullOrUndefined(matchedElementsJson.node[matchedElementsJson.node.length - 1].node)) {
                                        matchedElementsJson.node[matchedElementsJson.node.length - 1].node = [];
                                    }
                                    matchedElementsJson.node[matchedElementsJson.node.length - 1].node.push(Utils_1.Utils.GenerateMatchedElementNode(matchedElementsJson.node[matchedElementsJson.node.length - 1], j.toString(), '', 'missing'));
                                    this.RecursiveMatch(missingInnersolutionNodes, [], matchedElementsJson.node[matchedElementsJson.node.length - 1].node[matchedElementsJson.node[matchedElementsJson.node.length - 1].node.length - 1]);
                                }
                                else {
                                }
                            }
                            else if (j > solutionNode[i]['value'].length - 1) {
                                if (typeof submissionNode[i]['value'] === 'object') {
                                    var extraInnersubmissionNodes = Utils_1.Utils.GetNodes(submissionNode[i]['value'][j], path, true, true);
                                    if (util_1.isNullOrUndefined(matchedElementsJson.node[matchedElementsJson.node.length - 1].node)) {
                                        matchedElementsJson.node[matchedElementsJson.node.length - 1].node = [];
                                    }
                                    matchedElementsJson.node[matchedElementsJson.node.length - 1].node.push(Utils_1.Utils.GenerateMatchedElementNode(matchedElementsJson.node[matchedElementsJson.node.length - 1], '', j.toString(), 'extra'));
                                    this.RecursiveMatch([], extraInnersubmissionNodes, matchedElementsJson.node[matchedElementsJson.node.length - 1].node[matchedElementsJson.node[matchedElementsJson.node.length - 1].node.length - 1]);
                                }
                                else {
                                }
                            }
                            else {
                                if (typeof solutionNode[i]['value'][j] === 'object' && typeof submissionNode[i]['value'][j] === 'object') {
                                    var childSolutionNode = Utils_1.Utils.GetNodes(solutionNode[i]['value'][j], path, true, true);
                                    var childSubmissionNode = Utils_1.Utils.GetNodes(submissionNode[i]['value'][j], path, true, true);
                                    if (util_1.isNullOrUndefined(matchedElementsJson.node[matchedElementsJson.node.length - 1].node)) {
                                        matchedElementsJson.node[matchedElementsJson.node.length - 1].node = [];
                                    }
                                    matchedElementsJson.node[matchedElementsJson.node.length - 1].node.push(Utils_1.Utils.GenerateMatchedElementNode(matchedElementsJson.node[matchedElementsJson.node.length - 1], j.toString(), j.toString(), 'match'));
                                    this.RecursiveMatch(childSolutionNode, childSubmissionNode, matchedElementsJson.node[matchedElementsJson.node.length - 1].node[matchedElementsJson.node[matchedElementsJson.node.length - 1].node.length - 1]);
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    PositionalMatcher.prototype.GenerateMatchedElementNode = function (matchedElementNode, solutionPath, submissionPath, matchStatus) {
        var previousSolPath = matchedElementNode.solpath;
        var previousSubPath = matchedElementNode.subpath;
        var node = {};
        // For the Root Node, this case will be hit
        if (util_1.isNullOrUndefined(previousSolPath) || matchStatus === 'extra') {
            previousSolPath = '$';
        }
        // For the Root Node, this case will be hit
        if (util_1.isNullOrUndefined(previousSubPath) || matchStatus === 'missing') {
            previousSubPath = '$';
        }
        if (matchStatus === 'missing') {
            node.subpath = '';
            node.solpath = previousSolPath + "['" + solutionPath + "']";
        }
        else if (matchStatus === 'extra') {
            node.subpath = previousSubPath + "['" + submissionPath + "']";
            node.solpath = '';
        }
        else {
            node.subpath = previousSubPath + "['" + submissionPath + "']";
            node.solpath = previousSolPath + "['" + solutionPath + "']";
        }
        node.matchstatus = matchStatus;
        return node;
    };
    return PositionalMatcher;
}());
exports.PositionalMatcher = PositionalMatcher;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = __webpack_require__(0);
var Factory_1 = __webpack_require__(6);
var Utils_1 = __webpack_require__(1);
var DefaultOOOMatcher = /** @class */ (function () {
    function DefaultOOOMatcher() {
        this.path = "$.*";
    }
    /**
     *
     * @param solutionJson The Entire Solution JSON
     * @param submissionJson The Entire Submission JSON
     * @param matchsettings The Match Settings JSON
     */
    DefaultOOOMatcher.prototype.Match = function (solutionJson, submissionJson, matchsettings) {
        this.MatchSettings = matchsettings;
        this.SolutionJson = solutionJson;
        this.SubmissionJson = submissionJson;
        var matchedElementsJson = {};
        // Fetching Root Node in the Solution Json
        var solChildren = Utils_1.Utils.GetFirstNode(solutionJson, this.path, true, true);
        //Finding the same node in the Submission Json
        var subChildren = Utils_1.Utils.GetFirstNode(submissionJson, solChildren.path, true, true);
        //Call Recursive Match for the Root Node
        this.RecursiveMatch(solChildren, subChildren, matchedElementsJson, this.MatchSettings);
        return matchedElementsJson;
    };
    /**
     *
     * @param solChildren The Solution Nodes to Match
     * @param subChildren The Submission Nodes to Match
     * @param matchedElementsJson The Matched Element Json Till this Element
     */
    DefaultOOOMatcher.prototype.RecursiveMatch = function (solChildren, subChildren, matchedElementsJson, matchSettings) {
        // Add an entry in the MatchedElementsJson for the Node Name
        if (!util_1.isArray(matchedElementsJson.node)) {
            matchedElementsJson.node = [];
        }
        var nodeName = '';
        if (typeof solChildren == 'undefined' || Utils_1.Utils.IsBlankObject(solChildren)) {
            matchedElementsJson.node.push(Utils_1.Utils.GenerateMatchedElementNode(matchedElementsJson, '', subChildren.path[1], 'extra'));
            nodeName = subChildren.path[1];
        }
        else if (typeof subChildren == 'undefined' || Utils_1.Utils.IsBlankObject(subChildren)) {
            matchedElementsJson.node.push(Utils_1.Utils.GenerateMatchedElementNode(matchedElementsJson, solChildren.path[1], '', 'missing'));
            nodeName = solChildren.path[1];
        }
        else {
            matchedElementsJson.node.push(Utils_1.Utils.GenerateMatchedElementNode(matchedElementsJson, solChildren.path[1], subChildren.path[1], 'match'));
            nodeName = solChildren.path[1];
        }
        //Find Matching Strategy for the Node Name
        var matchingStartegy;
        if (!util_1.isNullOrUndefined(this.MatchSettings.matchingStrategies[nodeName])) {
            matchingStartegy = Factory_1.Factory.GetObject(this.MatchSettings.matchingStrategies[nodeName].type);
            if (util_1.isNullOrUndefined(matchingStartegy)) {
                return;
            }
        }
        else {
            return;
        }
        //Invoke Matching Strategy
        if (typeof solChildren == 'undefined') {
            solChildren = [];
            solChildren.value = [];
        }
        if (typeof subChildren == 'undefined') {
            subChildren = [];
            subChildren.value = [];
        }
        matchingStartegy.MatchNodes(solChildren.value, subChildren.value, matchedElementsJson, this.MatchSettings.matchingStrategies[nodeName]);
        //Find the Inner Matched Element Node added by the previous Matching Strategy Call
        var innerMatchedElement = matchedElementsJson.node[matchedElementsJson.node.length - 1];
        //Traverse the Inner Matched Elements Node
        for (var i = 0; i < innerMatchedElement.node.length; i++) {
            if (innerMatchedElement.node[i].matchstatus == "match") {
                //Find the Solution Element that was matched
                var solNodeAtMatchedPath = Utils_1.Utils.GetFirstNode(this.SolutionJson, innerMatchedElement.node[i].solpath, true, true);
                //Find the Submission Element that was matched
                var subNodeAtMatchedPath = Utils_1.Utils.GetFirstNode(this.SubmissionJson, innerMatchedElement.node[i].subpath, true, true);
                //Find the Children of the Solution Element that was matched
                var nextSolElementsToMatch = Utils_1.Utils.GetNodes(solNodeAtMatchedPath.value, this.path, true, true);
                for (var j = 0; j < nextSolElementsToMatch.length; j++) {
                    //Get corresponding Submission Elements to match next
                    var nextSubElementsToMatch = Utils_1.Utils.GetFirstNode(subNodeAtMatchedPath.value, nextSolElementsToMatch[j].path, true, true);
                    //Invoke Recursive Match on the Child Solution & Submission Node
                    this.RecursiveMatch(nextSolElementsToMatch[j], nextSubElementsToMatch, innerMatchedElement.node[i], matchSettings);
                }
            }
            else if (innerMatchedElement.node[i].matchstatus == "missing") {
                //Find the Solution Element that was matched 
                var solNodeAtMatchedPath = Utils_1.Utils.GetFirstNode(this.SolutionJson, innerMatchedElement.node[i].solpath, true, true);
                //The Node is missing in the Submission
                var subNodeAtMatchedPath = {};
                //Find the Children of the Solution Element that was matched
                var nextSolElementsToMatch = Utils_1.Utils.GetNodes(solNodeAtMatchedPath.value, this.path, true, true);
                for (var j = 0; j < nextSolElementsToMatch.length; j++) {
                    //Invoke Recursive Match on the Child Solution & Submission Node
                    this.RecursiveMatch(nextSolElementsToMatch[j], subNodeAtMatchedPath, innerMatchedElement.node[i], matchSettings);
                }
            }
            else if (innerMatchedElement.node[i].matchstatus == "extra") {
                //Extra, So the Node is blank in the SOlution
                var solNodeAtMatchedPath = {};
                //Find the Submission Element that was matched 
                var subNodeAtMatchedPath = Utils_1.Utils.GetFirstNode(this.SubmissionJson, innerMatchedElement.node[i].subpath, true, true);
                //Find the Children of the Submission Element that was matched
                var nextSubElementsToMatch = Utils_1.Utils.GetNodes(subNodeAtMatchedPath.value, this.path, true, true);
                for (var j = 0; j < nextSubElementsToMatch.length; j++) {
                    //Invoke Recursive Match on the Child Solution & Submission Node
                    this.RecursiveMatch(solNodeAtMatchedPath, nextSubElementsToMatch[j], innerMatchedElement.node[i], matchSettings);
                }
            }
        }
    };
    return DefaultOOOMatcher;
}());
exports.DefaultOOOMatcher = DefaultOOOMatcher;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var jsonPath = __webpack_require__(3);
var Enums_1 = __webpack_require__(4);
var DefaultScorer = /** @class */ (function () {
    function DefaultScorer() {
    }
    /**
     * This a public function available, to evaluate score based on the graded submission provide by the checker
     * @param gradedSubmission - Output of the checker for a particular submission
     * @param scoringRules - Scoring rules json.
     */
    DefaultScorer.prototype.Score = function (gradedSubmission, scoringRules, hintsModuleInstance) {
        scoringRules = JSON.parse(JSON.stringify(scoringRules));
        this.validationNodes = this.getValidationNodes(gradedSubmission);
        this.hintsPenaltyMap = hintsModuleInstance && hintsModuleInstance.isAvailable && hintsModuleInstance.getRuleIDToPenaltyMap();
        this.computeScore(scoringRules);
        return scoringRules;
    };
    /**
     * it is a recursive function, A rule node is provided as an input and is updtaed based ont he rules/condition being applied
     * Note - Root node should not be of validation type.
     * @param scoringRule
     */
    DefaultScorer.prototype.computeScore = function (scoringRule) {
        var ruleType = scoringRule.type;
        var ruleResult = (ruleType === Enums_1.Rules.ALL) ? true : false;
        var ruleScore = 0;
        if (scoringRule.rules) {
            scoringRule.rules.forEach(function (rule) {
                if (rule.type == Enums_1.Rules.VALIDATION) {
                    var validationRule = this.getValidationNodeFromId(rule.id);
                    if (validationRule) {
                        rule.status = validationRule.status;
                        switch (ruleType) {
                            case Enums_1.Rules.ALL: {
                                ruleResult = ruleResult && (rule.status === Enums_1.ValidationStatus.PASS);
                                break;
                            }
                            case Enums_1.Rules.ANY: {
                                ruleResult = ruleResult || (rule.status === Enums_1.ValidationStatus.PASS);
                                break;
                            }
                            case Enums_1.Rules.SUM: {
                                if (rule.status === Enums_1.ValidationStatus.PASS) {
                                    ruleScore += rule.score;
                                }
                                break;
                            }
                            default:
                                break;
                        }
                    }
                }
                else {
                    this.computeScore(rule);
                    switch (ruleType) {
                        case Enums_1.Rules.ALL: {
                            ruleResult = ruleResult && (rule.status == Enums_1.RuleStatus.PASS);
                            break;
                        }
                        case Enums_1.Rules.ANY: {
                            ruleResult = ruleResult || (rule.status == Enums_1.RuleStatus.PASS);
                            break;
                        }
                        case Enums_1.Rules.SUM: {
                            ruleScore += rule.gotScore;
                            break;
                        }
                        default:
                            break;
                    }
                }
            }.bind(this));
        }
        if (ruleType === Enums_1.Rules.SUM) {
            scoringRule.gotScore = ruleScore;
            if (ruleScore < scoringRule.score) {
                scoringRule.status = ruleScore == 0 ? Enums_1.RuleStatus.FAIL : Enums_1.RuleStatus.PARTIAL;
            }
            else {
                scoringRule.status = Enums_1.RuleStatus.PASS;
            }
        }
        else {
            scoringRule.gotScore = ruleResult === true ? scoringRule.score : 0;
            scoringRule.status = ruleResult === true ? Enums_1.RuleStatus.PASS : Enums_1.RuleStatus.FAIL;
        }
        // Reducing the gotscore, if the user has consumed the hint associated with the rule
        var initialScore = scoringRule.gotScore;
        scoringRule.hintPenaltyApplied = false;
        if (this.hintsPenaltyMap && this.hintsPenaltyMap[scoringRule.id]) {
            scoringRule.gotScore -= this.hintsPenaltyMap[scoringRule.id];
            scoringRule.gotScore < 0 ? scoringRule.gotScore = 0 : null;
            // passing the information if the score is deducted because of hints
            initialScore != scoringRule.gotScore ? scoringRule.hintPenaltyApplied = true : null;
        }
    };
    /**
     * This fucntion returns collection of all the  validation nodes within the gradedSubmission
     * @param gradedSubmission - It is ajson , in the case of scorer it is the output of the checker
     * return - Collection of validation nodes in a flat array.
     */
    DefaultScorer.prototype.getValidationNodes = function (gradedSubmission) {
        var validationNodes = jsonPath.query(gradedSubmission, "$..validations");
        return [].concat.apply([], validationNodes);
    };
    /**
     * this function returns the reference of the valdiation node corresponding to the unique id passed to the function
     * @param validationId A unique id corresponding to a validation node
     * return - The reference of the validation node corresponding to the id provided
     */
    DefaultScorer.prototype.getValidationNodeFromId = function (validationId) {
        return this.validationNodes.find(function (validation) {
            return (validation.id === validationId);
        });
    };
    return DefaultScorer;
}());
exports.DefaultScorer = DefaultScorer;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Enums_1 = __webpack_require__(4);
var Utils_1 = __webpack_require__(1);
var jsonPath = __webpack_require__(3);
var FeedbackConfigGenerator = /** @class */ (function () {
    function FeedbackConfigGenerator() {
    }
    /**
     * creating feedback config
     * @param scoringRules: Checker output with feedback text
     * @param solutionJSON: final document with validations
     * @param matcherOutput
     * @param submissionJSON: user submission
     */
    FeedbackConfigGenerator.prototype.GenerateFeedback = function (scoringRules, solutionJSON, submissionJSON, matcherOutput) {
        var feedbackRulesJSON = this.updateFeedbackInScoringRules(scoringRules);
        this.submissionJSON = submissionJSON;
        var solutionToSubmissionJSONMap = Utils_1.Utils.GetSolutionToSubmissionJSONMap(matcherOutput);
        var flatRuleObj = {};
        var validationRuleMap = {};
        this.createValidationRuleMap(feedbackRulesJSON, flatRuleObj, validationRuleMap);
        var feedbackConfig = this.createCompleteCellBasedFeedbackConfig(flatRuleObj, validationRuleMap, solutionJSON, solutionToSubmissionJSONMap);
        return { feedbackCellConf: feedbackConfig, flatRuleJson: flatRuleObj };
    };
    /**
     * Creates Flat Rule JSON
     * Creates validation to its outermost Rule map
     * @param feedbackRulesJSON
     *
     * @param flatRuleObj:  Flat json object having Rules and Validation objects
     * {
            "Rule1": {
                "rules": [
                "S1wpRFGSe8"
                ],
                "id": "Rule1",
                "status": "pass",
                "type": "Sum",
                "obtainedScore": 3
            },
            "S1wpRFGSe8": {
                "id": "S1wpRFGSe8",
                "status": "pass",
                "type": "Validation",
                "feedbackText": "Value Should be 2000",
                "score": 3,
                "targetCell": {
                    "sheetIndex": "0",
                    "rowIndex": 1,
                    "cellIndex": 1
                },
                "submittedData": {
                "propName": "value",
                "value": 2000
                }
            }
        }
     * @param validationRuleMap: Map for validations to outermost Rule
     * @param parentRule
     * This function is required to generate the Flat rule JSON. Please note that this flat rule Json completed in the function createCompleteCellBasedFeedbackConfig as well.
     */
    FeedbackConfigGenerator.prototype.createValidationRuleMap = function (feedbackRulesJSON, flatRuleObj, validationRuleMap, parentRule) {
        if (flatRuleObj === void 0) { flatRuleObj = {}; }
        if (validationRuleMap === void 0) { validationRuleMap = {}; }
        if (parentRule === void 0) { parentRule = null; }
        var shouldRet = true;
        var validationArr = [];
        if (feedbackRulesJSON.rules) {
            for (var _i = 0, _a = feedbackRulesJSON.rules; _i < _a.length; _i++) {
                var feedbackRule = _a[_i];
                switch (feedbackRule.type) {
                    case Enums_1.Rules.SUM:
                    case Enums_1.Rules.ALL:
                    case Enums_1.Rules.ANY: {
                        flatRuleObj[feedbackRule.id] = {
                            status: feedbackRule.status,
                            obtainerScore: feedbackRule.score,
                            rules: []
                        };
                        if (parentRule != null) {
                            flatRuleObj[parentRule].rules.push(feedbackRule.id);
                        }
                        var validationRetArr = this.createValidationRuleMap(feedbackRule, flatRuleObj, validationRuleMap, feedbackRule.id);
                        if (validationRetArr) {
                            validationArr = validationArr.concat(validationRetArr);
                        }
                        // code inside if block will be executed for the outermost rules only
                        if (parentRule == null) {
                            shouldRet = false;
                            for (var _b = 0, validationArr_1 = validationArr; _b < validationArr_1.length; _b++) {
                                var validationId = validationArr_1[_b];
                                // check to ensure that one validation is present only at one location in the feedbackRulesJSON (ScoringRulesJSON) AND one validation ID CAN_NOT be present inside two scoring rules
                                if (!(validationRuleMap[validationId]))
                                    validationRuleMap[validationId] = feedbackRule.id;
                            }
                            validationArr.length = 0;
                        }
                        break;
                    }
                    case Enums_1.Rules.VALIDATION: {
                        flatRuleObj[feedbackRule.id] = feedbackRule;
                        validationArr.push(feedbackRule.id);
                        if (flatRuleObj[parentRule] && flatRuleObj[parentRule].rules)
                            flatRuleObj[parentRule].rules.push(feedbackRule.id);
                        break;
                    }
                    default: break;
                }
            }
            if (shouldRet) {
                return validationArr;
            }
        }
    };
    /**
     * This function performs 2 tasks:
     * 1. target cell is added to validations residing in flatRuleObj
     * 2. generates the cell based feedback Config json
     *
     * @param flatRuleObj: Flat json object having Rules and Validation objects
     * @param validationRuleMap: Map for validations to outermost Rule
     * {"S1wpRFGSe8":"Rule1"}
     * @param solutionJSON
     * @param solutionToSubmissionJSONMap: JsonPath Map for Solution json to Submission json
     *
     *  @param feedbackCellConfig
     *  {
            "0.1.1": {
            "status": "pass",
                "ruleCollection": [
                "Rule1"
                ]
            },
            "0.1.2": {
            "status": "fail ",
            "ruleCollection": [
                "Rule2"
                ]
            }
        }
     *
     */
    FeedbackConfigGenerator.prototype.createCompleteCellBasedFeedbackConfig = function (flatRuleObj, validationRuleMap, solutionJSON, solutionToSubmissionJSONMap) {
        var feedbackConfig = { "matched": {}, "extra": {}, "missing": {} };
        var sheetsData = Object.values(solutionJSON["#sheets"]);
        for (var sheetIndex = 0; sheetIndex < sheetsData.length; sheetIndex++) {
            var rowsData = Object.values(sheetsData[sheetIndex]["#rows"]);
            for (var rowIndex = 0; rowIndex < rowsData.length; rowIndex++) {
                var cellsData = Object.values(rowsData[rowIndex]["#cells"]);
                for (var cellIndex = 0; cellIndex < cellsData.length; cellIndex++) {
                    var validations = cellsData[cellIndex]["validations"];
                    var solutionJSONPath = "$['#sheets']['" + sheetIndex + "']['#rows']['" + rowIndex + "']['#cells']['" + cellIndex + "']";
                    var userSubmissionJSONPathRef = solutionToSubmissionJSONMap["matchedAndMissing"][solutionJSONPath];
                    // var to hold cell ref on which this feedback willbe shown
                    var submissionCell = void 0;
                    // match or missing based on matcher output
                    var cellStatus = void 0;
                    if (validations) {
                        // If the cell is missing in the submission, Do nothing for now.
                        if (userSubmissionJSONPathRef) {
                            submissionCell = this.getCellRefIndex(userSubmissionJSONPathRef, this.submissionJSON);
                            cellStatus = "matched";
                        }
                        else {
                            submissionCell = this.getCellRefIndex(solutionJSONPath, solutionJSON);
                            cellStatus = "missing";
                        }
                        var feedbackCellConfig = void 0;
                        feedbackCellConfig = feedbackConfig[cellStatus][submissionCell.sheetIndex + "." + submissionCell.rowIndex + "." + submissionCell.cellIndex] = {};
                        feedbackCellConfig.ruleCollection = [];
                        for (var _i = 0, validations_1 = validations; _i < validations_1.length; _i++) {
                            var validation = validations_1[_i];
                            // considering that a validation is present inside one Scoring Rule only AND 
                            // validationRuleMap has one Rule ID against a Validation ID 
                            if (feedbackCellConfig.ruleCollection.indexOf(validationRuleMap[validation.id]) == -1) {
                                feedbackCellConfig.ruleCollection.push(validationRuleMap[validation.id]);
                            }
                            if (!(feedbackCellConfig.status)) {
                                feedbackCellConfig.status = flatRuleObj[validation.id].status;
                            }
                            else if (flatRuleObj[validation.id].status != feedbackCellConfig.status) {
                                feedbackCellConfig.status = Enums_1.RuleStatus.PARTIAL;
                            }
                            flatRuleObj[validation.id].targetCell = submissionCell;
                            var cellData = this.getCellRefObj(userSubmissionJSONPathRef);
                            var submissionPropval = this.getPropVal(cellData, validation.validate);
                            flatRuleObj[validation.id].submittedData = submissionPropval;
                        }
                    }
                    /// LEONARDO-2125 handling for cells marked as missing by grader
                    else if (userSubmissionJSONPathRef == null) {
                        submissionCell = this.getCellRefIndex(solutionJSONPath, solutionJSON);
                        cellStatus = "missing";
                        feedbackConfig[cellStatus][submissionCell.sheetIndex + "." + submissionCell.rowIndex + "." + submissionCell.cellIndex] =
                            {
                                status: cellStatus,
                                feedback: "Entries in this cell are missing.",
                                targetCell: submissionCell
                            };
                    }
                }
            }
        }
        //Feedback generation for extra cells in submissionJSON
        var extras = solutionToSubmissionJSONMap["extra"];
        var extrasCount = extras.length;
        for (var idx = 0; idx < extrasCount; idx++) {
            var submissionCell = extras[idx];
            var submissionCellJSON = this.getCellRefIndex(submissionCell, this.submissionJSON);
            if (submissionCellJSON.cellIndex !== undefined) {
                feedbackConfig["extra"][submissionCellJSON.sheetIndex + "." + submissionCellJSON.rowIndex + "." + submissionCellJSON.cellIndex] = {
                    status: "extra",
                    feedback: "Entries made in this cell were not found in the solution document.",
                    targetCell: submissionCellJSON
                };
            }
        }
        return feedbackConfig;
    };
    /**
     * function to fetch user submitted value for a validation
     * @param cellObj: concerned cell object
     * @param propName: property whose user submitted value is to be extracted
     */
    FeedbackConfigGenerator.prototype.getPropVal = function (cellObj, propName) {
        if (cellObj) {
            var userPropName = propName.split(".");
            return { property: userPropName[userPropName.length - 1] || "", value: cellObj[propName] || "" };
        }
    };
    /**
     *
     * @param cellJSONPath
     * return:
     *
     * {
     * index:0,
     * fontAttr:{}
     * style:{}
     * value:""
     * formula:""
     * }
     */
    FeedbackConfigGenerator.prototype.getCellRefObj = function (cellJSONPath) {
        if (cellJSONPath) {
            var cellStringNodes = cellJSONPath.split("['");
            cellStringNodes.shift();
            cellStringNodes = cellStringNodes.map(function (str) { return str.substr(0, str.length - 2); });
            var rowObj = this.submissionJSON && this.submissionJSON["#sheets"] && this.submissionJSON["#sheets"][cellStringNodes[1]] && this.submissionJSON["#sheets"][cellStringNodes[1]]["#rows"] && this.submissionJSON["#sheets"][cellStringNodes[1]]["#rows"][cellStringNodes[3]];
            return rowObj["#cells"][cellStringNodes[5]];
        }
    };
    FeedbackConfigGenerator.prototype.getCellRefIndex = function (cellJSONPath, gridJSON) {
        var cellStringNodes = cellJSONPath.split("['");
        cellStringNodes.shift();
        cellStringNodes = cellStringNodes.map(function (str) { return str.substr(0, str.length - 2); });
        var rowObj = gridJSON && gridJSON["#sheets"] && gridJSON["#sheets"][cellStringNodes[1]] && gridJSON["#sheets"][cellStringNodes[1]]["#rows"] && gridJSON["#sheets"][cellStringNodes[1]]["#rows"][cellStringNodes[3]];
        return {
            "sheetIndex": cellStringNodes[1],
            //cellStringNodes[3] - value in case of arrays for rows and cells
            "rowIndex": rowObj && rowObj.index,
            //cellStringNodes[5] - value in case of arrays for rows and cells
            "cellIndex": rowObj && rowObj["#cells"] && rowObj["#cells"][cellStringNodes[5]] && rowObj["#cells"][cellStringNodes[5]].index
        };
    };
    /**
     * This a private function available, to generate feedback based on the ouput generated by the scorer.
     * @param gradedSubmission - Output of the checker for a particular submission
     * @param scoringRules - Scoring rules json.
     */
    FeedbackConfigGenerator.prototype.updateFeedbackInScoringRules = function (scoringRules) {
        this.ruleNodes = this.getRuleNodes(scoringRules);
        this.computeFeedbackForEachRule();
        return scoringRules;
    };
    /**
     * it is a recursive function, A rule node is provided as an input and is updtaed based ont he rules/condition being applied
     * @param scoringRule
     */
    FeedbackConfigGenerator.prototype.computeFeedbackForEachRule = function () {
        this.ruleNodes.forEach(function (ruleNode) {
            if (ruleNode.feedback) {
                if (ruleNode.status == Enums_1.RuleStatus.PASS) {
                    ruleNode.feedback = ruleNode.feedback.successText || ' ';
                }
                else {
                    ruleNode.feedback = ruleNode.feedback.failureText || ' ';
                }
            }
        });
    };
    /**
     * This fucntion returns collection of all the  validation nodes within the gradedSubmission
     * @param scoredSubmission - It is the output of the scorer
     * return - Collection of rule nodes in a flat array.
     */
    FeedbackConfigGenerator.prototype.getRuleNodes = function (scoredSubmission) {
        var ruleNodes = jsonPath.query(scoredSubmission, "$..rules");
        ruleNodes = [].concat.apply([], ruleNodes);
        return ruleNodes;
    };
    return FeedbackConfigGenerator;
}());
exports.FeedbackConfigGenerator = FeedbackConfigGenerator;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = __webpack_require__(1);
var util_1 = __webpack_require__(0);
var FormulaEqualsOperator = /** @class */ (function () {
    function FormulaEqualsOperator() {
    }
    FormulaEqualsOperator.prototype.EvaluateOperator = function (solutionJson, submissionJson, matchedElementNode, validationNode) {
        var isValidationPassed = false;
        var solPath = matchedElementNode.solpath;
        var subPath = matchedElementNode.subpath;
        var matchstatus = matchedElementNode.matchstatus;
        if (matchstatus === 'match') {
            var solFormulaNode = Utils_1.Utils.GetNodes(solutionJson, solPath, true)[0].value;
            var subFormulaNode = Utils_1.Utils.GetNodes(submissionJson, subPath, true)[0].value;
            var solFormula = Utils_1.Utils.GetNodes(solFormulaNode, validationNode.validate, false);
            var subFormula = Utils_1.Utils.GetNodes(subFormulaNode, validationNode.validate, false);
            if (util_1.isNullOrUndefined(subFormula[0]) && util_1.isNullOrUndefined(solFormula[0])) {
                isValidationPassed = true;
            }
            else if (util_1.isNullOrUndefined(subFormula[0]) && !solFormula[0].value && isNaN(solFormula[0].value)) {
                isValidationPassed = true;
            }
            else if (util_1.isNullOrUndefined(solFormula[0]) && !subFormula[0].value && isNaN(subFormula[0].value)) {
                isValidationPassed = true;
            }
            else if (util_1.isNullOrUndefined(subFormula[0]) || util_1.isNullOrUndefined(solFormula[0])) {
                isValidationPassed = false;
            }
            else {
                var normalizedLeftValue = this.applyTolerance(solFormula[0].value, validationNode.extrainfo);
                var normalizedRightValue = this.applyTolerance(subFormula[0].value, validationNode.extrainfo);
                if (normalizedLeftValue === normalizedRightValue) {
                    isValidationPassed = true;
                }
                else {
                    return false;
                }
            }
        }
        else if (matchstatus == "missing") {
            isValidationPassed = false;
        }
        return isValidationPassed;
    };
    /* Applies the tolerance to the value for e.g ignore case, trim whitespace etc. */
    FormulaEqualsOperator.prototype.applyTolerance = function (value, tolerance) {
        var normalizedValue = value;
        if (tolerance) {
            var ignoreCase = tolerance.ignoreCase && typeof value === "string";
            var trimWhitespace = tolerance.trimWhitespace && typeof value === "string";
            if (ignoreCase) {
                normalizedValue = normalizedValue.toLowerCase();
            }
            if (trimWhitespace) {
                normalizedValue = normalizedValue.trim();
            }
        }
        return normalizedValue;
    };
    return FormulaEqualsOperator;
}());
exports.FormulaEqualsOperator = FormulaEqualsOperator;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = __webpack_require__(1);
var util_1 = __webpack_require__(0);
var EqualsCheckingOperator = /** @class */ (function () {
    function EqualsCheckingOperator() {
    }
    EqualsCheckingOperator.prototype.EvaluateOperator = function (solutionJson, submissionJson, matchedElementNode, validationNode) {
        var isValidationPassed = false;
        var solPath = matchedElementNode.solpath;
        var subPath = matchedElementNode.subpath;
        var matchstatus = matchedElementNode.matchstatus;
        if (matchstatus === 'match') {
            var solNode = Utils_1.Utils.GetNodes(solutionJson, solPath, true)[0].value;
            var subNode = Utils_1.Utils.GetNodes(submissionJson, subPath, true)[0].value;
            var solValue = Utils_1.Utils.GetNodes(solNode, validationNode.validate, false);
            var subValue = Utils_1.Utils.GetNodes(subNode, validationNode.validate, false);
            if (util_1.isNullOrUndefined(subValue[0]) && util_1.isNullOrUndefined(solValue[0])) {
                isValidationPassed = true;
            }
            else if (util_1.isNullOrUndefined(subValue[0]) && !solValue[0].value && isNaN(solValue[0].value)) {
                isValidationPassed = true;
            }
            else if (util_1.isNullOrUndefined(solValue[0]) && !subValue[0].value && isNaN(subValue[0].value)) {
                isValidationPassed = true;
            }
            else if (util_1.isNullOrUndefined(subValue[0]) || util_1.isNullOrUndefined(solValue[0])) {
                isValidationPassed = false;
            }
            else {
                var normalizedLeftValue = this.applyTolerance(solValue[0].value, validationNode.extrainfo);
                var normalizedRightValue = this.applyTolerance(subValue[0].value, validationNode.extrainfo);
                if (normalizedLeftValue === normalizedRightValue) {
                    isValidationPassed = true;
                }
                else {
                    return this.CheckPrecisionForValues(normalizedLeftValue, normalizedRightValue);
                }
            }
        }
        else if (matchstatus == "missing") {
            isValidationPassed = false;
        }
        return isValidationPassed;
    };
    EqualsCheckingOperator.prototype.CheckPrecisionForValues = function (normalizedLeftValue, normalizedRightValue) {
        var isValidationPassed = false;
        var floatLeft = parseFloat(normalizedLeftValue);
        var floatRight = parseFloat(normalizedRightValue);
        if (floatLeft != NaN && floatRight != NaN) {
            var delta = Math.abs(floatLeft - floatRight);
            if (floatLeft > 1.0) {
                if (delta < 0.001) {
                    isValidationPassed = true;
                }
                else {
                    isValidationPassed = false;
                }
            }
            else {
                var decimalPart = parseInt(floatLeft.toString().split(".")[1]);
                var toleranceNum = floatLeft / (decimalPart * 1000);
                if (delta < toleranceNum) {
                    isValidationPassed = true;
                }
                else {
                    isValidationPassed = false;
                }
            }
        }
        return isValidationPassed;
    };
    /* Applies the tolerance to the value for e.g ignore case, trim whitespace etc. */
    EqualsCheckingOperator.prototype.applyTolerance = function (value, tolerance) {
        var normalizedValue = value;
        if (tolerance) {
            var ignoreCase = tolerance.ignoreCase && typeof value === "string";
            var trimWhitespace = tolerance.trimWhitespace && typeof value === "string";
            if (ignoreCase) {
                normalizedValue = normalizedValue.toLowerCase();
            }
            if (trimWhitespace) {
                normalizedValue = normalizedValue.trim();
            }
        }
        return normalizedValue;
    };
    return EqualsCheckingOperator;
}());
exports.EqualsCheckingOperator = EqualsCheckingOperator;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//     Underscore.js 1.7.0
//     http://underscorejs.org
//     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    concat           = ArrayProto.concat,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object.
  if (true) {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {}

  // Current version.
  _.VERSION = '1.7.0';

  // Internal function that returns an efficient (for current engines) version
  // of the passed-in callback, to be repeatedly applied in other Underscore
  // functions.
  var createCallback = function(func, context, argCount) {
    if (context === void 0) return func;
    switch (argCount == null ? 3 : argCount) {
      case 1: return function(value) {
        return func.call(context, value);
      };
      case 2: return function(value, other) {
        return func.call(context, value, other);
      };
      case 3: return function(value, index, collection) {
        return func.call(context, value, index, collection);
      };
      case 4: return function(accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      };
    }
    return function() {
      return func.apply(context, arguments);
    };
  };

  // A mostly-internal function to generate callbacks that can be applied
  // to each element in a collection, returning the desired result — either
  // identity, an arbitrary callback, a property matcher, or a property accessor.
  _.iteratee = function(value, context, argCount) {
    if (value == null) return _.identity;
    if (_.isFunction(value)) return createCallback(value, context, argCount);
    if (_.isObject(value)) return _.matches(value);
    return _.property(value);
  };

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles raw objects in addition to array-likes. Treats all
  // sparse array-likes as if they were dense.
  _.each = _.forEach = function(obj, iteratee, context) {
    if (obj == null) return obj;
    iteratee = createCallback(iteratee, context);
    var i, length = obj.length;
    if (length === +length) {
      for (i = 0; i < length; i++) {
        iteratee(obj[i], i, obj);
      }
    } else {
      var keys = _.keys(obj);
      for (i = 0, length = keys.length; i < length; i++) {
        iteratee(obj[keys[i]], keys[i], obj);
      }
    }
    return obj;
  };

  // Return the results of applying the iteratee to each element.
  _.map = _.collect = function(obj, iteratee, context) {
    if (obj == null) return [];
    iteratee = _.iteratee(iteratee, context);
    var keys = obj.length !== +obj.length && _.keys(obj),
        length = (keys || obj).length,
        results = Array(length),
        currentKey;
    for (var index = 0; index < length; index++) {
      currentKey = keys ? keys[index] : index;
      results[index] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  };

  var reduceError = 'Reduce of empty array with no initial value';

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`.
  _.reduce = _.foldl = _.inject = function(obj, iteratee, memo, context) {
    if (obj == null) obj = [];
    iteratee = createCallback(iteratee, context, 4);
    var keys = obj.length !== +obj.length && _.keys(obj),
        length = (keys || obj).length,
        index = 0, currentKey;
    if (arguments.length < 3) {
      if (!length) throw new TypeError(reduceError);
      memo = obj[keys ? keys[index++] : index++];
    }
    for (; index < length; index++) {
      currentKey = keys ? keys[index] : index;
      memo = iteratee(memo, obj[currentKey], currentKey, obj);
    }
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  _.reduceRight = _.foldr = function(obj, iteratee, memo, context) {
    if (obj == null) obj = [];
    iteratee = createCallback(iteratee, context, 4);
    var keys = obj.length !== + obj.length && _.keys(obj),
        index = (keys || obj).length,
        currentKey;
    if (arguments.length < 3) {
      if (!index) throw new TypeError(reduceError);
      memo = obj[keys ? keys[--index] : --index];
    }
    while (index--) {
      currentKey = keys ? keys[index] : index;
      memo = iteratee(memo, obj[currentKey], currentKey, obj);
    }
    return memo;
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var result;
    predicate = _.iteratee(predicate, context);
    _.some(obj, function(value, index, list) {
      if (predicate(value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    if (obj == null) return results;
    predicate = _.iteratee(predicate, context);
    _.each(obj, function(value, index, list) {
      if (predicate(value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, _.negate(_.iteratee(predicate)), context);
  };

  // Determine whether all of the elements match a truth test.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    if (obj == null) return true;
    predicate = _.iteratee(predicate, context);
    var keys = obj.length !== +obj.length && _.keys(obj),
        length = (keys || obj).length,
        index, currentKey;
    for (index = 0; index < length; index++) {
      currentKey = keys ? keys[index] : index;
      if (!predicate(obj[currentKey], currentKey, obj)) return false;
    }
    return true;
  };

  // Determine if at least one element in the object matches a truth test.
  // Aliased as `any`.
  _.some = _.any = function(obj, predicate, context) {
    if (obj == null) return false;
    predicate = _.iteratee(predicate, context);
    var keys = obj.length !== +obj.length && _.keys(obj),
        length = (keys || obj).length,
        index, currentKey;
    for (index = 0; index < length; index++) {
      currentKey = keys ? keys[index] : index;
      if (predicate(obj[currentKey], currentKey, obj)) return true;
    }
    return false;
  };

  // Determine if the array or object contains a given value (using `===`).
  // Aliased as `include`.
  _.contains = _.include = function(obj, target) {
    if (obj == null) return false;
    if (obj.length !== +obj.length) obj = _.values(obj);
    return _.indexOf(obj, target) >= 0;
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      return (isFunc ? method : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matches(attrs));
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matches(attrs));
  };

  // Return the maximum element (or element-based computation).
  _.max = function(obj, iteratee, context) {
    var result = -Infinity, lastComputed = -Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = obj.length === +obj.length ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value > result) {
          result = value;
        }
      }
    } else {
      iteratee = _.iteratee(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iteratee, context) {
    var result = Infinity, lastComputed = Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = obj.length === +obj.length ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value < result) {
          result = value;
        }
      }
    } else {
      iteratee = _.iteratee(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed < lastComputed || computed === Infinity && result === Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Shuffle a collection, using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  _.shuffle = function(obj) {
    var set = obj && obj.length === +obj.length ? obj : _.values(obj);
    var length = set.length;
    var shuffled = Array(length);
    for (var index = 0, rand; index < length; index++) {
      rand = _.random(0, index);
      if (rand !== index) shuffled[index] = shuffled[rand];
      shuffled[rand] = set[index];
    }
    return shuffled;
  };

  // Sample **n** random values from a collection.
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (obj.length !== +obj.length) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };

  // Sort the object's values by a criterion produced by an iteratee.
  _.sortBy = function(obj, iteratee, context) {
    iteratee = _.iteratee(iteratee, context);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iteratee(value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, iteratee, context) {
      var result = {};
      iteratee = _.iteratee(iteratee, context);
      _.each(obj, function(value, index) {
        var key = iteratee(value, index, obj);
        behavior(result, value, key);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, value, key) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key]++; else result[key] = 1;
  });

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iteratee, context) {
    iteratee = _.iteratee(iteratee, context, 1);
    var value = iteratee(obj);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = low + high >>> 1;
      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
    }
    return low;
  };

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (obj.length === +obj.length) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return obj.length === +obj.length ? obj.length : _.keys(obj).length;
  };

  // Split a collection into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = function(obj, predicate, context) {
    predicate = _.iteratee(predicate, context);
    var pass = [], fail = [];
    _.each(obj, function(value, key, obj) {
      (predicate(value, key, obj) ? pass : fail).push(value);
    });
    return [pass, fail];
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[0];
    if (n < 0) return [];
    return slice.call(array, 0, n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[array.length - 1];
    return slice.call(array, Math.max(array.length - n, 0));
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, n == null || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, strict, output) {
    if (shallow && _.every(input, _.isArray)) {
      return concat.apply(output, input);
    }
    for (var i = 0, length = input.length; i < length; i++) {
      var value = input[i];
      if (!_.isArray(value) && !_.isArguments(value)) {
        if (!strict) output.push(value);
      } else if (shallow) {
        push.apply(output, value);
      } else {
        flatten(value, shallow, strict, output);
      }
    }
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, false, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
    if (array == null) return [];
    if (!_.isBoolean(isSorted)) {
      context = iteratee;
      iteratee = isSorted;
      isSorted = false;
    }
    if (iteratee != null) iteratee = _.iteratee(iteratee, context);
    var result = [];
    var seen = [];
    for (var i = 0, length = array.length; i < length; i++) {
      var value = array[i];
      if (isSorted) {
        if (!i || seen !== value) result.push(value);
        seen = value;
      } else if (iteratee) {
        var computed = iteratee(value, i, array);
        if (_.indexOf(seen, computed) < 0) {
          seen.push(computed);
          result.push(value);
        }
      } else if (_.indexOf(result, value) < 0) {
        result.push(value);
      }
    }
    return result;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(flatten(arguments, true, true, []));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    if (array == null) return [];
    var result = [];
    var argsLength = arguments.length;
    for (var i = 0, length = array.length; i < length; i++) {
      var item = array[i];
      if (_.contains(result, item)) continue;
      for (var j = 1; j < argsLength; j++) {
        if (!_.contains(arguments[j], item)) break;
      }
      if (j === argsLength) result.push(item);
    }
    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = flatten(slice.call(arguments, 1), true, true, []);
    return _.filter(array, function(value){
      return !_.contains(rest, value);
    });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function(array) {
    if (array == null) return [];
    var length = _.max(arguments, 'length').length;
    var results = Array(length);
    for (var i = 0; i < length; i++) {
      results[i] = _.pluck(arguments, i);
    }
    return results;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    if (list == null) return {};
    var result = {};
    for (var i = 0, length = list.length; i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // Return the position of the first occurrence of an item in an array,
  // or -1 if the item is not included in the array.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i = 0, length = array.length;
    if (isSorted) {
      if (typeof isSorted == 'number') {
        i = isSorted < 0 ? Math.max(0, length + isSorted) : isSorted;
      } else {
        i = _.sortedIndex(array, item);
        return array[i] === item ? i : -1;
      }
    }
    for (; i < length; i++) if (array[i] === item) return i;
    return -1;
  };

  _.lastIndexOf = function(array, item, from) {
    if (array == null) return -1;
    var idx = array.length;
    if (typeof from == 'number') {
      idx = from < 0 ? idx + from + 1 : Math.min(idx, from + 1);
    }
    while (--idx >= 0) if (array[idx] === item) return idx;
    return -1;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = step || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var range = Array(length);

    for (var idx = 0; idx < length; idx++, start += step) {
      range[idx] = start;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Reusable constructor function for prototype setting.
  var Ctor = function(){};

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    var args, bound;
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
    args = slice.call(arguments, 2);
    bound = function() {
      if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
      Ctor.prototype = func.prototype;
      var self = new Ctor;
      Ctor.prototype = null;
      var result = func.apply(self, args.concat(slice.call(arguments)));
      if (_.isObject(result)) return result;
      return self;
    };
    return bound;
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder, allowing any combination of arguments to be pre-filled.
  _.partial = function(func) {
    var boundArgs = slice.call(arguments, 1);
    return function() {
      var position = 0;
      var args = boundArgs.slice();
      for (var i = 0, length = args.length; i < length; i++) {
        if (args[i] === _) args[i] = arguments[position++];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return func.apply(this, args);
    };
  };

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = function(obj) {
    var i, length = arguments.length, key;
    if (length <= 1) throw new Error('bindAll must be passed function names');
    for (i = 1; i < length; i++) {
      key = arguments[i];
      obj[key] = _.bind(obj[key], obj);
    }
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memoize = function(key) {
      var cache = memoize.cache;
      var address = hasher ? hasher.apply(this, arguments) : key;
      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
      return cache[address];
    };
    memoize.cache = {};
    return memoize;
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){
      return func.apply(null, args);
    }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
      var last = _.now() - timestamp;

      if (last < wait && last > 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };

  // Returns a negated version of the passed-in predicate.
  _.negate = function(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var args = arguments;
    var start = args.length - 1;
    return function() {
      var i = start;
      var result = args[start].apply(this, arguments);
      while (i--) result = args[i].call(this, result);
      return result;
    };
  };

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Returns a function that will only be executed before being called N times.
  _.before = function(times, func) {
    var memo;
    return function() {
      if (--times > 0) {
        memo = func.apply(this, arguments);
      } else {
        func = null;
      }
      return memo;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = _.partial(_.before, 2);

  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    if (!_.isObject(obj)) return obj;
    var source, prop;
    for (var i = 1, length = arguments.length; i < length; i++) {
      source = arguments[i];
      for (prop in source) {
        if (hasOwnProperty.call(source, prop)) {
            obj[prop] = source[prop];
        }
      }
    }
    return obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(obj, iteratee, context) {
    var result = {}, key;
    if (obj == null) return result;
    if (_.isFunction(iteratee)) {
      iteratee = createCallback(iteratee, context);
      for (key in obj) {
        var value = obj[key];
        if (iteratee(value, key, obj)) result[key] = value;
      }
    } else {
      var keys = concat.apply([], slice.call(arguments, 1));
      obj = new Object(obj);
      for (var i = 0, length = keys.length; i < length; i++) {
        key = keys[i];
        if (key in obj) result[key] = obj[key];
      }
    }
    return result;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj, iteratee, context) {
    if (_.isFunction(iteratee)) {
      iteratee = _.negate(iteratee);
    } else {
      var keys = _.map(concat.apply([], slice.call(arguments, 1)), String);
      iteratee = function(value, key) {
        return !_.contains(keys, key);
      };
    }
    return _.pick(obj, iteratee, context);
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    if (!_.isObject(obj)) return obj;
    for (var i = 1, length = arguments.length; i < length; i++) {
      var source = arguments[i];
      for (var prop in source) {
        if (obj[prop] === void 0) obj[prop] = source[prop];
      }
    }
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a === 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className !== toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
      case '[object RegExp]':
      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return '' + a === '' + b;
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive.
        // Object(NaN) is equivalent to NaN
        if (+a !== +a) return +b !== +b;
        // An `egal` comparison is performed for other numeric values.
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a === +b;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] === a) return bStack[length] === b;
    }
    // Objects with different constructors are not equivalent, but `Object`s
    // from different frames are.
    var aCtor = a.constructor, bCtor = b.constructor;
    if (
      aCtor !== bCtor &&
      // Handle Object.create(x) cases
      'constructor' in a && 'constructor' in b &&
      !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
        _.isFunction(bCtor) && bCtor instanceof bCtor)
    ) {
      return false;
    }
    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);
    var size, result;
    // Recursively compare objects and arrays.
    if (className === '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size === b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          if (!(result = eq(a[size], b[size], aStack, bStack))) break;
        }
      }
    } else {
      // Deep compare objects.
      var keys = _.keys(a), key;
      size = keys.length;
      // Ensure that both objects contain the same number of properties before comparing deep equality.
      result = _.keys(b).length === size;
      if (result) {
        while (size--) {
          // Deep compare each member
          key = keys[size];
          if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
        }
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return result;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b, [], []);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (_.isArray(obj) || _.isString(obj) || _.isArguments(obj)) return obj.length === 0;
    for (var key in obj) if (_.has(obj, key)) return false;
    return true;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) === '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) === '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return _.has(obj, 'callee');
    };
  }

  // Optimize `isFunction` if appropriate. Work around an IE 11 bug.
  if (true) {
    _.isFunction = function(obj) {
      return typeof obj == 'function' || false;
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj !== +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return obj != null && hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iteratees.
  _.identity = function(value) {
    return value;
  };

  _.constant = function(value) {
    return function() {
      return value;
    };
  };

  _.noop = function(){};

  _.property = function(key) {
    return function(obj) {
      return obj[key];
    };
  };

  // Returns a predicate for checking whether an object has a given set of `key:value` pairs.
  _.matches = function(attrs) {
    var pairs = _.pairs(attrs), length = pairs.length;
    return function(obj) {
      if (obj == null) return !length;
      obj = new Object(obj);
      for (var i = 0; i < length; i++) {
        var pair = pairs[i], key = pair[0];
        if (pair[1] !== obj[key] || !(key in obj)) return false;
      }
      return true;
    };
  };

  // Run a function **n** times.
  _.times = function(n, iteratee, context) {
    var accum = Array(Math.max(0, n));
    iteratee = createCallback(iteratee, context, 1);
    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() {
    return new Date().getTime();
  };

   // List of HTML entities for escaping.
  var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
  };
  var unescapeMap = _.invert(escapeMap);

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  var createEscaper = function(map) {
    var escaper = function(match) {
      return map[match];
    };
    // Regexes for identifying a key that needs to be escaped
    var source = '(?:' + _.keys(map).join('|') + ')';
    var testRegexp = RegExp(source);
    var replaceRegexp = RegExp(source, 'g');
    return function(string) {
      string = string == null ? '' : '' + string;
      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
  };
  _.escape = createEscaper(escapeMap);
  _.unescape = createEscaper(unescapeMap);

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property) {
    if (object == null) return void 0;
    var value = object[property];
    return _.isFunction(value) ? object[property]() : value;
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

  var escapeChar = function(match) {
    return '\\' + escapes[match];
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  // NB: `oldSettings` only exists for backwards compatibility.
  _.template = function(text, settings, oldSettings) {
    if (!settings && oldSettings) settings = oldSettings;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset).replace(escaper, escapeChar);
      index = offset + match.length;

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      } else if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      } else if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }

      // Adobe VMs need the match returned to produce the correct offest.
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + 'return __p;\n';

    try {
      var render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled source as a convenience for precompilation.
    var argument = settings.variable || 'obj';
    template.source = 'function(' + argument + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function. Start chaining a wrapped Underscore object.
  _.chain = function(obj) {
    var instance = _(obj);
    instance._chain = true;
    return instance;
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(obj) {
    return this._chain ? _(obj).chain() : obj;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    _.each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result.call(this, func.apply(_, args));
      };
    });
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
      return result.call(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  _.each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result.call(this, method.apply(this._wrapped, arguments));
    };
  });

  // Extracts the result from a wrapped and chained object.
  _.prototype.value = function() {
    return this._wrapped;
  };

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function() {
      return _;
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  }
}.call(this));


/***/ }),
/* 32 */
/***/ (function(module) {

module.exports = {"_args":[["escodegen@1.9.1","/opt/atlassian/pipelines/agent/build"]],"_from":"escodegen@1.9.1","_id":"escodegen@1.9.1","_inBundle":false,"_integrity":"sha512-6hTjO1NAWkHnDk3OqQ4YrCuwwmGHL9S3nPlzBOUG/R44rda3wLNrfvQ5fkSGjyhHFKM7ALPKcKGrwvCLe0lC7Q==","_location":"/static-eval/escodegen","_phantomChildren":{},"_requested":{"type":"version","registry":true,"raw":"escodegen@1.9.1","name":"escodegen","escapedName":"escodegen","rawSpec":"1.9.1","saveSpec":null,"fetchSpec":"1.9.1"},"_requiredBy":["/static-eval"],"_resolved":"https://registry.npmjs.org/escodegen/-/escodegen-1.9.1.tgz","_spec":"1.9.1","_where":"/opt/atlassian/pipelines/agent/build","bin":{"esgenerate":"./bin/esgenerate.js","escodegen":"./bin/escodegen.js"},"bugs":{"url":"https://github.com/estools/escodegen/issues"},"dependencies":{"esprima":"^3.1.3","estraverse":"^4.2.0","esutils":"^2.0.2","optionator":"^0.8.1","source-map":"~0.6.1"},"description":"ECMAScript code generator","devDependencies":{"acorn":"^4.0.4","bluebird":"^3.4.7","bower-registry-client":"^1.0.0","chai":"^3.5.0","commonjs-everywhere":"^0.9.7","gulp":"^3.8.10","gulp-eslint":"^3.0.1","gulp-mocha":"^3.0.1","semver":"^5.1.0"},"engines":{"node":">=4.0"},"files":["LICENSE.BSD","README.md","bin","escodegen.js","package.json"],"homepage":"http://github.com/estools/escodegen","license":"BSD-2-Clause","main":"escodegen.js","maintainers":[{"name":"Yusuke Suzuki","email":"utatane.tea@gmail.com","url":"http://github.com/Constellation"}],"name":"escodegen","optionalDependencies":{"source-map":"~0.6.1"},"repository":{"type":"git","url":"git+ssh://git@github.com/estools/escodegen.git"},"scripts":{"build":"cjsify -a path: tools/entry-point.js > escodegen.browser.js","build-min":"cjsify -ma path: tools/entry-point.js > escodegen.browser.min.js","lint":"gulp lint","release":"node tools/release.js","test":"gulp travis","unit-test":"gulp test"},"version":"1.9.1"};

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var SourceMapGenerator = __webpack_require__(12).SourceMapGenerator;
var util = __webpack_require__(2);

// Matches a Windows-style `\r\n` newline or a `\n` newline used by all other
// operating systems these days (capturing the result).
var REGEX_NEWLINE = /(\r?\n)/;

// Newline character code for charCodeAt() comparisons
var NEWLINE_CODE = 10;

// Private symbol for identifying `SourceNode`s when multiple versions of
// the source-map library are loaded. This MUST NOT CHANGE across
// versions!
var isSourceNode = "$$$isSourceNode$$$";

/**
 * SourceNodes provide a way to abstract over interpolating/concatenating
 * snippets of generated JavaScript source code while maintaining the line and
 * column information associated with the original source code.
 *
 * @param aLine The original line number.
 * @param aColumn The original column number.
 * @param aSource The original source's filename.
 * @param aChunks Optional. An array of strings which are snippets of
 *        generated JS, or other SourceNodes.
 * @param aName The original identifier.
 */
function SourceNode(aLine, aColumn, aSource, aChunks, aName) {
  this.children = [];
  this.sourceContents = {};
  this.line = aLine == null ? null : aLine;
  this.column = aColumn == null ? null : aColumn;
  this.source = aSource == null ? null : aSource;
  this.name = aName == null ? null : aName;
  this[isSourceNode] = true;
  if (aChunks != null) this.add(aChunks);
}

/**
 * Creates a SourceNode from generated code and a SourceMapConsumer.
 *
 * @param aGeneratedCode The generated code
 * @param aSourceMapConsumer The SourceMap for the generated code
 * @param aRelativePath Optional. The path that relative sources in the
 *        SourceMapConsumer should be relative to.
 */
SourceNode.fromStringWithSourceMap =
  function SourceNode_fromStringWithSourceMap(aGeneratedCode, aSourceMapConsumer, aRelativePath) {
    // The SourceNode we want to fill with the generated code
    // and the SourceMap
    var node = new SourceNode();

    // All even indices of this array are one line of the generated code,
    // while all odd indices are the newlines between two adjacent lines
    // (since `REGEX_NEWLINE` captures its match).
    // Processed fragments are accessed by calling `shiftNextLine`.
    var remainingLines = aGeneratedCode.split(REGEX_NEWLINE);
    var remainingLinesIndex = 0;
    var shiftNextLine = function() {
      var lineContents = getNextLine();
      // The last line of a file might not have a newline.
      var newLine = getNextLine() || "";
      return lineContents + newLine;

      function getNextLine() {
        return remainingLinesIndex < remainingLines.length ?
            remainingLines[remainingLinesIndex++] : undefined;
      }
    };

    // We need to remember the position of "remainingLines"
    var lastGeneratedLine = 1, lastGeneratedColumn = 0;

    // The generate SourceNodes we need a code range.
    // To extract it current and last mapping is used.
    // Here we store the last mapping.
    var lastMapping = null;

    aSourceMapConsumer.eachMapping(function (mapping) {
      if (lastMapping !== null) {
        // We add the code from "lastMapping" to "mapping":
        // First check if there is a new line in between.
        if (lastGeneratedLine < mapping.generatedLine) {
          // Associate first line with "lastMapping"
          addMappingWithCode(lastMapping, shiftNextLine());
          lastGeneratedLine++;
          lastGeneratedColumn = 0;
          // The remaining code is added without mapping
        } else {
          // There is no new line in between.
          // Associate the code between "lastGeneratedColumn" and
          // "mapping.generatedColumn" with "lastMapping"
          var nextLine = remainingLines[remainingLinesIndex] || '';
          var code = nextLine.substr(0, mapping.generatedColumn -
                                        lastGeneratedColumn);
          remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn -
                                              lastGeneratedColumn);
          lastGeneratedColumn = mapping.generatedColumn;
          addMappingWithCode(lastMapping, code);
          // No more remaining code, continue
          lastMapping = mapping;
          return;
        }
      }
      // We add the generated code until the first mapping
      // to the SourceNode without any mapping.
      // Each line is added as separate string.
      while (lastGeneratedLine < mapping.generatedLine) {
        node.add(shiftNextLine());
        lastGeneratedLine++;
      }
      if (lastGeneratedColumn < mapping.generatedColumn) {
        var nextLine = remainingLines[remainingLinesIndex] || '';
        node.add(nextLine.substr(0, mapping.generatedColumn));
        remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn);
        lastGeneratedColumn = mapping.generatedColumn;
      }
      lastMapping = mapping;
    }, this);
    // We have processed all mappings.
    if (remainingLinesIndex < remainingLines.length) {
      if (lastMapping) {
        // Associate the remaining code in the current line with "lastMapping"
        addMappingWithCode(lastMapping, shiftNextLine());
      }
      // and add the remaining lines without any mapping
      node.add(remainingLines.splice(remainingLinesIndex).join(""));
    }

    // Copy sourcesContent into SourceNode
    aSourceMapConsumer.sources.forEach(function (sourceFile) {
      var content = aSourceMapConsumer.sourceContentFor(sourceFile);
      if (content != null) {
        if (aRelativePath != null) {
          sourceFile = util.join(aRelativePath, sourceFile);
        }
        node.setSourceContent(sourceFile, content);
      }
    });

    return node;

    function addMappingWithCode(mapping, code) {
      if (mapping === null || mapping.source === undefined) {
        node.add(code);
      } else {
        var source = aRelativePath
          ? util.join(aRelativePath, mapping.source)
          : mapping.source;
        node.add(new SourceNode(mapping.originalLine,
                                mapping.originalColumn,
                                source,
                                code,
                                mapping.name));
      }
    }
  };

/**
 * Add a chunk of generated JS to this source node.
 *
 * @param aChunk A string snippet of generated JS code, another instance of
 *        SourceNode, or an array where each member is one of those things.
 */
SourceNode.prototype.add = function SourceNode_add(aChunk) {
  if (Array.isArray(aChunk)) {
    aChunk.forEach(function (chunk) {
      this.add(chunk);
    }, this);
  }
  else if (aChunk[isSourceNode] || typeof aChunk === "string") {
    if (aChunk) {
      this.children.push(aChunk);
    }
  }
  else {
    throw new TypeError(
      "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
    );
  }
  return this;
};

/**
 * Add a chunk of generated JS to the beginning of this source node.
 *
 * @param aChunk A string snippet of generated JS code, another instance of
 *        SourceNode, or an array where each member is one of those things.
 */
SourceNode.prototype.prepend = function SourceNode_prepend(aChunk) {
  if (Array.isArray(aChunk)) {
    for (var i = aChunk.length-1; i >= 0; i--) {
      this.prepend(aChunk[i]);
    }
  }
  else if (aChunk[isSourceNode] || typeof aChunk === "string") {
    this.children.unshift(aChunk);
  }
  else {
    throw new TypeError(
      "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
    );
  }
  return this;
};

/**
 * Walk over the tree of JS snippets in this node and its children. The
 * walking function is called once for each snippet of JS and is passed that
 * snippet and the its original associated source's line/column location.
 *
 * @param aFn The traversal function.
 */
SourceNode.prototype.walk = function SourceNode_walk(aFn) {
  var chunk;
  for (var i = 0, len = this.children.length; i < len; i++) {
    chunk = this.children[i];
    if (chunk[isSourceNode]) {
      chunk.walk(aFn);
    }
    else {
      if (chunk !== '') {
        aFn(chunk, { source: this.source,
                     line: this.line,
                     column: this.column,
                     name: this.name });
      }
    }
  }
};

/**
 * Like `String.prototype.join` except for SourceNodes. Inserts `aStr` between
 * each of `this.children`.
 *
 * @param aSep The separator.
 */
SourceNode.prototype.join = function SourceNode_join(aSep) {
  var newChildren;
  var i;
  var len = this.children.length;
  if (len > 0) {
    newChildren = [];
    for (i = 0; i < len-1; i++) {
      newChildren.push(this.children[i]);
      newChildren.push(aSep);
    }
    newChildren.push(this.children[i]);
    this.children = newChildren;
  }
  return this;
};

/**
 * Call String.prototype.replace on the very right-most source snippet. Useful
 * for trimming whitespace from the end of a source node, etc.
 *
 * @param aPattern The pattern to replace.
 * @param aReplacement The thing to replace the pattern with.
 */
SourceNode.prototype.replaceRight = function SourceNode_replaceRight(aPattern, aReplacement) {
  var lastChild = this.children[this.children.length - 1];
  if (lastChild[isSourceNode]) {
    lastChild.replaceRight(aPattern, aReplacement);
  }
  else if (typeof lastChild === 'string') {
    this.children[this.children.length - 1] = lastChild.replace(aPattern, aReplacement);
  }
  else {
    this.children.push(''.replace(aPattern, aReplacement));
  }
  return this;
};

/**
 * Set the source content for a source file. This will be added to the SourceMapGenerator
 * in the sourcesContent field.
 *
 * @param aSourceFile The filename of the source file
 * @param aSourceContent The content of the source file
 */
SourceNode.prototype.setSourceContent =
  function SourceNode_setSourceContent(aSourceFile, aSourceContent) {
    this.sourceContents[util.toSetString(aSourceFile)] = aSourceContent;
  };

/**
 * Walk over the tree of SourceNodes. The walking function is called for each
 * source file content and is passed the filename and source content.
 *
 * @param aFn The traversal function.
 */
SourceNode.prototype.walkSourceContents =
  function SourceNode_walkSourceContents(aFn) {
    for (var i = 0, len = this.children.length; i < len; i++) {
      if (this.children[i][isSourceNode]) {
        this.children[i].walkSourceContents(aFn);
      }
    }

    var sources = Object.keys(this.sourceContents);
    for (var i = 0, len = sources.length; i < len; i++) {
      aFn(util.fromSetString(sources[i]), this.sourceContents[sources[i]]);
    }
  };

/**
 * Return the string representation of this source node. Walks over the tree
 * and concatenates all the various snippets together to one string.
 */
SourceNode.prototype.toString = function SourceNode_toString() {
  var str = "";
  this.walk(function (chunk) {
    str += chunk;
  });
  return str;
};

/**
 * Returns the string representation of this source node along with a source
 * map.
 */
SourceNode.prototype.toStringWithSourceMap = function SourceNode_toStringWithSourceMap(aArgs) {
  var generated = {
    code: "",
    line: 1,
    column: 0
  };
  var map = new SourceMapGenerator(aArgs);
  var sourceMappingActive = false;
  var lastOriginalSource = null;
  var lastOriginalLine = null;
  var lastOriginalColumn = null;
  var lastOriginalName = null;
  this.walk(function (chunk, original) {
    generated.code += chunk;
    if (original.source !== null
        && original.line !== null
        && original.column !== null) {
      if(lastOriginalSource !== original.source
         || lastOriginalLine !== original.line
         || lastOriginalColumn !== original.column
         || lastOriginalName !== original.name) {
        map.addMapping({
          source: original.source,
          original: {
            line: original.line,
            column: original.column
          },
          generated: {
            line: generated.line,
            column: generated.column
          },
          name: original.name
        });
      }
      lastOriginalSource = original.source;
      lastOriginalLine = original.line;
      lastOriginalColumn = original.column;
      lastOriginalName = original.name;
      sourceMappingActive = true;
    } else if (sourceMappingActive) {
      map.addMapping({
        generated: {
          line: generated.line,
          column: generated.column
        }
      });
      lastOriginalSource = null;
      sourceMappingActive = false;
    }
    for (var idx = 0, length = chunk.length; idx < length; idx++) {
      if (chunk.charCodeAt(idx) === NEWLINE_CODE) {
        generated.line++;
        generated.column = 0;
        // Mappings end at eol
        if (idx + 1 === length) {
          lastOriginalSource = null;
          sourceMappingActive = false;
        } else if (sourceMappingActive) {
          map.addMapping({
            source: original.source,
            original: {
              line: original.line,
              column: original.column
            },
            generated: {
              line: generated.line,
              column: generated.column
            },
            name: original.name
          });
        }
      } else {
        generated.column++;
      }
    }
  });
  this.walkSourceContents(function (sourceFile, sourceContent) {
    map.setSourceContent(sourceFile, sourceContent);
  });

  return { code: generated.code, map: map };
};

exports.SourceNode = SourceNode;


/***/ }),
/* 34 */
/***/ (function(module, exports) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

// It turns out that some (most?) JavaScript engines don't self-host
// `Array.prototype.sort`. This makes sense because C++ will likely remain
// faster than JS when doing raw CPU-intensive sorting. However, when using a
// custom comparator function, calling back and forth between the VM's C++ and
// JIT'd JS is rather slow *and* loses JIT type information, resulting in
// worse generated code for the comparator function than would be optimal. In
// fact, when sorting with a comparator, these costs outweigh the benefits of
// sorting in C++. By using our own JS-implemented Quick Sort (below), we get
// a ~3500ms mean speed-up in `bench/bench.html`.

/**
 * Swap the elements indexed by `x` and `y` in the array `ary`.
 *
 * @param {Array} ary
 *        The array.
 * @param {Number} x
 *        The index of the first item.
 * @param {Number} y
 *        The index of the second item.
 */
function swap(ary, x, y) {
  var temp = ary[x];
  ary[x] = ary[y];
  ary[y] = temp;
}

/**
 * Returns a random integer within the range `low .. high` inclusive.
 *
 * @param {Number} low
 *        The lower bound on the range.
 * @param {Number} high
 *        The upper bound on the range.
 */
function randomIntInRange(low, high) {
  return Math.round(low + (Math.random() * (high - low)));
}

/**
 * The Quick Sort algorithm.
 *
 * @param {Array} ary
 *        An array to sort.
 * @param {function} comparator
 *        Function to use to compare two items.
 * @param {Number} p
 *        Start index of the array
 * @param {Number} r
 *        End index of the array
 */
function doQuickSort(ary, comparator, p, r) {
  // If our lower bound is less than our upper bound, we (1) partition the
  // array into two pieces and (2) recurse on each half. If it is not, this is
  // the empty array and our base case.

  if (p < r) {
    // (1) Partitioning.
    //
    // The partitioning chooses a pivot between `p` and `r` and moves all
    // elements that are less than or equal to the pivot to the before it, and
    // all the elements that are greater than it after it. The effect is that
    // once partition is done, the pivot is in the exact place it will be when
    // the array is put in sorted order, and it will not need to be moved
    // again. This runs in O(n) time.

    // Always choose a random pivot so that an input array which is reverse
    // sorted does not cause O(n^2) running time.
    var pivotIndex = randomIntInRange(p, r);
    var i = p - 1;

    swap(ary, pivotIndex, r);
    var pivot = ary[r];

    // Immediately after `j` is incremented in this loop, the following hold
    // true:
    //
    //   * Every element in `ary[p .. i]` is less than or equal to the pivot.
    //
    //   * Every element in `ary[i+1 .. j-1]` is greater than the pivot.
    for (var j = p; j < r; j++) {
      if (comparator(ary[j], pivot) <= 0) {
        i += 1;
        swap(ary, i, j);
      }
    }

    swap(ary, i + 1, j);
    var q = i + 1;

    // (2) Recurse on each half.

    doQuickSort(ary, comparator, p, q - 1);
    doQuickSort(ary, comparator, q + 1, r);
  }
}

/**
 * Sort the given array in-place with the given comparator function.
 *
 * @param {Array} ary
 *        An array to sort.
 * @param {function} comparator
 *        Function to use to compare two items.
 */
exports.quickSort = function (ary, comparator) {
  doQuickSort(ary, comparator, 0, ary.length - 1);
};


/***/ }),
/* 35 */
/***/ (function(module, exports) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

exports.GREATEST_LOWER_BOUND = 1;
exports.LEAST_UPPER_BOUND = 2;

/**
 * Recursive implementation of binary search.
 *
 * @param aLow Indices here and lower do not contain the needle.
 * @param aHigh Indices here and higher do not contain the needle.
 * @param aNeedle The element being searched for.
 * @param aHaystack The non-empty array being searched.
 * @param aCompare Function which takes two elements and returns -1, 0, or 1.
 * @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
 *     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 */
function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare, aBias) {
  // This function terminates when one of the following is true:
  //
  //   1. We find the exact element we are looking for.
  //
  //   2. We did not find the exact element, but we can return the index of
  //      the next-closest element.
  //
  //   3. We did not find the exact element, and there is no next-closest
  //      element than the one we are searching for, so we return -1.
  var mid = Math.floor((aHigh - aLow) / 2) + aLow;
  var cmp = aCompare(aNeedle, aHaystack[mid], true);
  if (cmp === 0) {
    // Found the element we are looking for.
    return mid;
  }
  else if (cmp > 0) {
    // Our needle is greater than aHaystack[mid].
    if (aHigh - mid > 1) {
      // The element is in the upper half.
      return recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare, aBias);
    }

    // The exact needle element was not found in this haystack. Determine if
    // we are in termination case (3) or (2) and return the appropriate thing.
    if (aBias == exports.LEAST_UPPER_BOUND) {
      return aHigh < aHaystack.length ? aHigh : -1;
    } else {
      return mid;
    }
  }
  else {
    // Our needle is less than aHaystack[mid].
    if (mid - aLow > 1) {
      // The element is in the lower half.
      return recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare, aBias);
    }

    // we are in termination case (3) or (2) and return the appropriate thing.
    if (aBias == exports.LEAST_UPPER_BOUND) {
      return mid;
    } else {
      return aLow < 0 ? -1 : aLow;
    }
  }
}

/**
 * This is an implementation of binary search which will always try and return
 * the index of the closest element if there is no exact hit. This is because
 * mappings between original and generated line/col pairs are single points,
 * and there is an implicit region between each of them, so a miss just means
 * that you aren't on the very start of a region.
 *
 * @param aNeedle The element you are looking for.
 * @param aHaystack The array that is being searched.
 * @param aCompare A function which takes the needle and an element in the
 *     array and returns -1, 0, or 1 depending on whether the needle is less
 *     than, equal to, or greater than the element, respectively.
 * @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
 *     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 *     Defaults to 'binarySearch.GREATEST_LOWER_BOUND'.
 */
exports.search = function search(aNeedle, aHaystack, aCompare, aBias) {
  if (aHaystack.length === 0) {
    return -1;
  }

  var index = recursiveSearch(-1, aHaystack.length, aNeedle, aHaystack,
                              aCompare, aBias || exports.GREATEST_LOWER_BOUND);
  if (index < 0) {
    return -1;
  }

  // We have found either the exact element, or the next-closest element than
  // the one we are searching for. However, there may be more than one such
  // element. Make sure we always return the smallest of these.
  while (index - 1 >= 0) {
    if (aCompare(aHaystack[index], aHaystack[index - 1], true) !== 0) {
      break;
    }
    --index;
  }

  return index;
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var util = __webpack_require__(2);
var binarySearch = __webpack_require__(35);
var ArraySet = __webpack_require__(10).ArraySet;
var base64VLQ = __webpack_require__(11);
var quickSort = __webpack_require__(34).quickSort;

function SourceMapConsumer(aSourceMap, aSourceMapURL) {
  var sourceMap = aSourceMap;
  if (typeof aSourceMap === 'string') {
    sourceMap = util.parseSourceMapInput(aSourceMap);
  }

  return sourceMap.sections != null
    ? new IndexedSourceMapConsumer(sourceMap, aSourceMapURL)
    : new BasicSourceMapConsumer(sourceMap, aSourceMapURL);
}

SourceMapConsumer.fromSourceMap = function(aSourceMap, aSourceMapURL) {
  return BasicSourceMapConsumer.fromSourceMap(aSourceMap, aSourceMapURL);
}

/**
 * The version of the source mapping spec that we are consuming.
 */
SourceMapConsumer.prototype._version = 3;

// `__generatedMappings` and `__originalMappings` are arrays that hold the
// parsed mapping coordinates from the source map's "mappings" attribute. They
// are lazily instantiated, accessed via the `_generatedMappings` and
// `_originalMappings` getters respectively, and we only parse the mappings
// and create these arrays once queried for a source location. We jump through
// these hoops because there can be many thousands of mappings, and parsing
// them is expensive, so we only want to do it if we must.
//
// Each object in the arrays is of the form:
//
//     {
//       generatedLine: The line number in the generated code,
//       generatedColumn: The column number in the generated code,
//       source: The path to the original source file that generated this
//               chunk of code,
//       originalLine: The line number in the original source that
//                     corresponds to this chunk of generated code,
//       originalColumn: The column number in the original source that
//                       corresponds to this chunk of generated code,
//       name: The name of the original symbol which generated this chunk of
//             code.
//     }
//
// All properties except for `generatedLine` and `generatedColumn` can be
// `null`.
//
// `_generatedMappings` is ordered by the generated positions.
//
// `_originalMappings` is ordered by the original positions.

SourceMapConsumer.prototype.__generatedMappings = null;
Object.defineProperty(SourceMapConsumer.prototype, '_generatedMappings', {
  configurable: true,
  enumerable: true,
  get: function () {
    if (!this.__generatedMappings) {
      this._parseMappings(this._mappings, this.sourceRoot);
    }

    return this.__generatedMappings;
  }
});

SourceMapConsumer.prototype.__originalMappings = null;
Object.defineProperty(SourceMapConsumer.prototype, '_originalMappings', {
  configurable: true,
  enumerable: true,
  get: function () {
    if (!this.__originalMappings) {
      this._parseMappings(this._mappings, this.sourceRoot);
    }

    return this.__originalMappings;
  }
});

SourceMapConsumer.prototype._charIsMappingSeparator =
  function SourceMapConsumer_charIsMappingSeparator(aStr, index) {
    var c = aStr.charAt(index);
    return c === ";" || c === ",";
  };

/**
 * Parse the mappings in a string in to a data structure which we can easily
 * query (the ordered arrays in the `this.__generatedMappings` and
 * `this.__originalMappings` properties).
 */
SourceMapConsumer.prototype._parseMappings =
  function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
    throw new Error("Subclasses must implement _parseMappings");
  };

SourceMapConsumer.GENERATED_ORDER = 1;
SourceMapConsumer.ORIGINAL_ORDER = 2;

SourceMapConsumer.GREATEST_LOWER_BOUND = 1;
SourceMapConsumer.LEAST_UPPER_BOUND = 2;

/**
 * Iterate over each mapping between an original source/line/column and a
 * generated line/column in this source map.
 *
 * @param Function aCallback
 *        The function that is called with each mapping.
 * @param Object aContext
 *        Optional. If specified, this object will be the value of `this` every
 *        time that `aCallback` is called.
 * @param aOrder
 *        Either `SourceMapConsumer.GENERATED_ORDER` or
 *        `SourceMapConsumer.ORIGINAL_ORDER`. Specifies whether you want to
 *        iterate over the mappings sorted by the generated file's line/column
 *        order or the original's source/line/column order, respectively. Defaults to
 *        `SourceMapConsumer.GENERATED_ORDER`.
 */
SourceMapConsumer.prototype.eachMapping =
  function SourceMapConsumer_eachMapping(aCallback, aContext, aOrder) {
    var context = aContext || null;
    var order = aOrder || SourceMapConsumer.GENERATED_ORDER;

    var mappings;
    switch (order) {
    case SourceMapConsumer.GENERATED_ORDER:
      mappings = this._generatedMappings;
      break;
    case SourceMapConsumer.ORIGINAL_ORDER:
      mappings = this._originalMappings;
      break;
    default:
      throw new Error("Unknown order of iteration.");
    }

    var sourceRoot = this.sourceRoot;
    mappings.map(function (mapping) {
      var source = mapping.source === null ? null : this._sources.at(mapping.source);
      source = util.computeSourceURL(sourceRoot, source, this._sourceMapURL);
      return {
        source: source,
        generatedLine: mapping.generatedLine,
        generatedColumn: mapping.generatedColumn,
        originalLine: mapping.originalLine,
        originalColumn: mapping.originalColumn,
        name: mapping.name === null ? null : this._names.at(mapping.name)
      };
    }, this).forEach(aCallback, context);
  };

/**
 * Returns all generated line and column information for the original source,
 * line, and column provided. If no column is provided, returns all mappings
 * corresponding to a either the line we are searching for or the next
 * closest line that has any mappings. Otherwise, returns all mappings
 * corresponding to the given line and either the column we are searching for
 * or the next closest column that has any offsets.
 *
 * The only argument is an object with the following properties:
 *
 *   - source: The filename of the original source.
 *   - line: The line number in the original source.  The line number is 1-based.
 *   - column: Optional. the column number in the original source.
 *    The column number is 0-based.
 *
 * and an array of objects is returned, each with the following properties:
 *
 *   - line: The line number in the generated source, or null.  The
 *    line number is 1-based.
 *   - column: The column number in the generated source, or null.
 *    The column number is 0-based.
 */
SourceMapConsumer.prototype.allGeneratedPositionsFor =
  function SourceMapConsumer_allGeneratedPositionsFor(aArgs) {
    var line = util.getArg(aArgs, 'line');

    // When there is no exact match, BasicSourceMapConsumer.prototype._findMapping
    // returns the index of the closest mapping less than the needle. By
    // setting needle.originalColumn to 0, we thus find the last mapping for
    // the given line, provided such a mapping exists.
    var needle = {
      source: util.getArg(aArgs, 'source'),
      originalLine: line,
      originalColumn: util.getArg(aArgs, 'column', 0)
    };

    needle.source = this._findSourceIndex(needle.source);
    if (needle.source < 0) {
      return [];
    }

    var mappings = [];

    var index = this._findMapping(needle,
                                  this._originalMappings,
                                  "originalLine",
                                  "originalColumn",
                                  util.compareByOriginalPositions,
                                  binarySearch.LEAST_UPPER_BOUND);
    if (index >= 0) {
      var mapping = this._originalMappings[index];

      if (aArgs.column === undefined) {
        var originalLine = mapping.originalLine;

        // Iterate until either we run out of mappings, or we run into
        // a mapping for a different line than the one we found. Since
        // mappings are sorted, this is guaranteed to find all mappings for
        // the line we found.
        while (mapping && mapping.originalLine === originalLine) {
          mappings.push({
            line: util.getArg(mapping, 'generatedLine', null),
            column: util.getArg(mapping, 'generatedColumn', null),
            lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
          });

          mapping = this._originalMappings[++index];
        }
      } else {
        var originalColumn = mapping.originalColumn;

        // Iterate until either we run out of mappings, or we run into
        // a mapping for a different line than the one we were searching for.
        // Since mappings are sorted, this is guaranteed to find all mappings for
        // the line we are searching for.
        while (mapping &&
               mapping.originalLine === line &&
               mapping.originalColumn == originalColumn) {
          mappings.push({
            line: util.getArg(mapping, 'generatedLine', null),
            column: util.getArg(mapping, 'generatedColumn', null),
            lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
          });

          mapping = this._originalMappings[++index];
        }
      }
    }

    return mappings;
  };

exports.SourceMapConsumer = SourceMapConsumer;

/**
 * A BasicSourceMapConsumer instance represents a parsed source map which we can
 * query for information about the original file positions by giving it a file
 * position in the generated source.
 *
 * The first parameter is the raw source map (either as a JSON string, or
 * already parsed to an object). According to the spec, source maps have the
 * following attributes:
 *
 *   - version: Which version of the source map spec this map is following.
 *   - sources: An array of URLs to the original source files.
 *   - names: An array of identifiers which can be referrenced by individual mappings.
 *   - sourceRoot: Optional. The URL root from which all sources are relative.
 *   - sourcesContent: Optional. An array of contents of the original source files.
 *   - mappings: A string of base64 VLQs which contain the actual mappings.
 *   - file: Optional. The generated file this source map is associated with.
 *
 * Here is an example source map, taken from the source map spec[0]:
 *
 *     {
 *       version : 3,
 *       file: "out.js",
 *       sourceRoot : "",
 *       sources: ["foo.js", "bar.js"],
 *       names: ["src", "maps", "are", "fun"],
 *       mappings: "AA,AB;;ABCDE;"
 *     }
 *
 * The second parameter, if given, is a string whose value is the URL
 * at which the source map was found.  This URL is used to compute the
 * sources array.
 *
 * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit?pli=1#
 */
function BasicSourceMapConsumer(aSourceMap, aSourceMapURL) {
  var sourceMap = aSourceMap;
  if (typeof aSourceMap === 'string') {
    sourceMap = util.parseSourceMapInput(aSourceMap);
  }

  var version = util.getArg(sourceMap, 'version');
  var sources = util.getArg(sourceMap, 'sources');
  // Sass 3.3 leaves out the 'names' array, so we deviate from the spec (which
  // requires the array) to play nice here.
  var names = util.getArg(sourceMap, 'names', []);
  var sourceRoot = util.getArg(sourceMap, 'sourceRoot', null);
  var sourcesContent = util.getArg(sourceMap, 'sourcesContent', null);
  var mappings = util.getArg(sourceMap, 'mappings');
  var file = util.getArg(sourceMap, 'file', null);

  // Once again, Sass deviates from the spec and supplies the version as a
  // string rather than a number, so we use loose equality checking here.
  if (version != this._version) {
    throw new Error('Unsupported version: ' + version);
  }

  if (sourceRoot) {
    sourceRoot = util.normalize(sourceRoot);
  }

  sources = sources
    .map(String)
    // Some source maps produce relative source paths like "./foo.js" instead of
    // "foo.js".  Normalize these first so that future comparisons will succeed.
    // See bugzil.la/1090768.
    .map(util.normalize)
    // Always ensure that absolute sources are internally stored relative to
    // the source root, if the source root is absolute. Not doing this would
    // be particularly problematic when the source root is a prefix of the
    // source (valid, but why??). See github issue #199 and bugzil.la/1188982.
    .map(function (source) {
      return sourceRoot && util.isAbsolute(sourceRoot) && util.isAbsolute(source)
        ? util.relative(sourceRoot, source)
        : source;
    });

  // Pass `true` below to allow duplicate names and sources. While source maps
  // are intended to be compressed and deduplicated, the TypeScript compiler
  // sometimes generates source maps with duplicates in them. See Github issue
  // #72 and bugzil.la/889492.
  this._names = ArraySet.fromArray(names.map(String), true);
  this._sources = ArraySet.fromArray(sources, true);

  this._absoluteSources = this._sources.toArray().map(function (s) {
    return util.computeSourceURL(sourceRoot, s, aSourceMapURL);
  });

  this.sourceRoot = sourceRoot;
  this.sourcesContent = sourcesContent;
  this._mappings = mappings;
  this._sourceMapURL = aSourceMapURL;
  this.file = file;
}

BasicSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
BasicSourceMapConsumer.prototype.consumer = SourceMapConsumer;

/**
 * Utility function to find the index of a source.  Returns -1 if not
 * found.
 */
BasicSourceMapConsumer.prototype._findSourceIndex = function(aSource) {
  var relativeSource = aSource;
  if (this.sourceRoot != null) {
    relativeSource = util.relative(this.sourceRoot, relativeSource);
  }

  if (this._sources.has(relativeSource)) {
    return this._sources.indexOf(relativeSource);
  }

  // Maybe aSource is an absolute URL as returned by |sources|.  In
  // this case we can't simply undo the transform.
  var i;
  for (i = 0; i < this._absoluteSources.length; ++i) {
    if (this._absoluteSources[i] == aSource) {
      return i;
    }
  }

  return -1;
};

/**
 * Create a BasicSourceMapConsumer from a SourceMapGenerator.
 *
 * @param SourceMapGenerator aSourceMap
 *        The source map that will be consumed.
 * @param String aSourceMapURL
 *        The URL at which the source map can be found (optional)
 * @returns BasicSourceMapConsumer
 */
BasicSourceMapConsumer.fromSourceMap =
  function SourceMapConsumer_fromSourceMap(aSourceMap, aSourceMapURL) {
    var smc = Object.create(BasicSourceMapConsumer.prototype);

    var names = smc._names = ArraySet.fromArray(aSourceMap._names.toArray(), true);
    var sources = smc._sources = ArraySet.fromArray(aSourceMap._sources.toArray(), true);
    smc.sourceRoot = aSourceMap._sourceRoot;
    smc.sourcesContent = aSourceMap._generateSourcesContent(smc._sources.toArray(),
                                                            smc.sourceRoot);
    smc.file = aSourceMap._file;
    smc._sourceMapURL = aSourceMapURL;
    smc._absoluteSources = smc._sources.toArray().map(function (s) {
      return util.computeSourceURL(smc.sourceRoot, s, aSourceMapURL);
    });

    // Because we are modifying the entries (by converting string sources and
    // names to indices into the sources and names ArraySets), we have to make
    // a copy of the entry or else bad things happen. Shared mutable state
    // strikes again! See github issue #191.

    var generatedMappings = aSourceMap._mappings.toArray().slice();
    var destGeneratedMappings = smc.__generatedMappings = [];
    var destOriginalMappings = smc.__originalMappings = [];

    for (var i = 0, length = generatedMappings.length; i < length; i++) {
      var srcMapping = generatedMappings[i];
      var destMapping = new Mapping;
      destMapping.generatedLine = srcMapping.generatedLine;
      destMapping.generatedColumn = srcMapping.generatedColumn;

      if (srcMapping.source) {
        destMapping.source = sources.indexOf(srcMapping.source);
        destMapping.originalLine = srcMapping.originalLine;
        destMapping.originalColumn = srcMapping.originalColumn;

        if (srcMapping.name) {
          destMapping.name = names.indexOf(srcMapping.name);
        }

        destOriginalMappings.push(destMapping);
      }

      destGeneratedMappings.push(destMapping);
    }

    quickSort(smc.__originalMappings, util.compareByOriginalPositions);

    return smc;
  };

/**
 * The version of the source mapping spec that we are consuming.
 */
BasicSourceMapConsumer.prototype._version = 3;

/**
 * The list of original sources.
 */
Object.defineProperty(BasicSourceMapConsumer.prototype, 'sources', {
  get: function () {
    return this._absoluteSources.slice();
  }
});

/**
 * Provide the JIT with a nice shape / hidden class.
 */
function Mapping() {
  this.generatedLine = 0;
  this.generatedColumn = 0;
  this.source = null;
  this.originalLine = null;
  this.originalColumn = null;
  this.name = null;
}

/**
 * Parse the mappings in a string in to a data structure which we can easily
 * query (the ordered arrays in the `this.__generatedMappings` and
 * `this.__originalMappings` properties).
 */
BasicSourceMapConsumer.prototype._parseMappings =
  function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
    var generatedLine = 1;
    var previousGeneratedColumn = 0;
    var previousOriginalLine = 0;
    var previousOriginalColumn = 0;
    var previousSource = 0;
    var previousName = 0;
    var length = aStr.length;
    var index = 0;
    var cachedSegments = {};
    var temp = {};
    var originalMappings = [];
    var generatedMappings = [];
    var mapping, str, segment, end, value;

    while (index < length) {
      if (aStr.charAt(index) === ';') {
        generatedLine++;
        index++;
        previousGeneratedColumn = 0;
      }
      else if (aStr.charAt(index) === ',') {
        index++;
      }
      else {
        mapping = new Mapping();
        mapping.generatedLine = generatedLine;

        // Because each offset is encoded relative to the previous one,
        // many segments often have the same encoding. We can exploit this
        // fact by caching the parsed variable length fields of each segment,
        // allowing us to avoid a second parse if we encounter the same
        // segment again.
        for (end = index; end < length; end++) {
          if (this._charIsMappingSeparator(aStr, end)) {
            break;
          }
        }
        str = aStr.slice(index, end);

        segment = cachedSegments[str];
        if (segment) {
          index += str.length;
        } else {
          segment = [];
          while (index < end) {
            base64VLQ.decode(aStr, index, temp);
            value = temp.value;
            index = temp.rest;
            segment.push(value);
          }

          if (segment.length === 2) {
            throw new Error('Found a source, but no line and column');
          }

          if (segment.length === 3) {
            throw new Error('Found a source and line, but no column');
          }

          cachedSegments[str] = segment;
        }

        // Generated column.
        mapping.generatedColumn = previousGeneratedColumn + segment[0];
        previousGeneratedColumn = mapping.generatedColumn;

        if (segment.length > 1) {
          // Original source.
          mapping.source = previousSource + segment[1];
          previousSource += segment[1];

          // Original line.
          mapping.originalLine = previousOriginalLine + segment[2];
          previousOriginalLine = mapping.originalLine;
          // Lines are stored 0-based
          mapping.originalLine += 1;

          // Original column.
          mapping.originalColumn = previousOriginalColumn + segment[3];
          previousOriginalColumn = mapping.originalColumn;

          if (segment.length > 4) {
            // Original name.
            mapping.name = previousName + segment[4];
            previousName += segment[4];
          }
        }

        generatedMappings.push(mapping);
        if (typeof mapping.originalLine === 'number') {
          originalMappings.push(mapping);
        }
      }
    }

    quickSort(generatedMappings, util.compareByGeneratedPositionsDeflated);
    this.__generatedMappings = generatedMappings;

    quickSort(originalMappings, util.compareByOriginalPositions);
    this.__originalMappings = originalMappings;
  };

/**
 * Find the mapping that best matches the hypothetical "needle" mapping that
 * we are searching for in the given "haystack" of mappings.
 */
BasicSourceMapConsumer.prototype._findMapping =
  function SourceMapConsumer_findMapping(aNeedle, aMappings, aLineName,
                                         aColumnName, aComparator, aBias) {
    // To return the position we are searching for, we must first find the
    // mapping for the given position and then return the opposite position it
    // points to. Because the mappings are sorted, we can use binary search to
    // find the best mapping.

    if (aNeedle[aLineName] <= 0) {
      throw new TypeError('Line must be greater than or equal to 1, got '
                          + aNeedle[aLineName]);
    }
    if (aNeedle[aColumnName] < 0) {
      throw new TypeError('Column must be greater than or equal to 0, got '
                          + aNeedle[aColumnName]);
    }

    return binarySearch.search(aNeedle, aMappings, aComparator, aBias);
  };

/**
 * Compute the last column for each generated mapping. The last column is
 * inclusive.
 */
BasicSourceMapConsumer.prototype.computeColumnSpans =
  function SourceMapConsumer_computeColumnSpans() {
    for (var index = 0; index < this._generatedMappings.length; ++index) {
      var mapping = this._generatedMappings[index];

      // Mappings do not contain a field for the last generated columnt. We
      // can come up with an optimistic estimate, however, by assuming that
      // mappings are contiguous (i.e. given two consecutive mappings, the
      // first mapping ends where the second one starts).
      if (index + 1 < this._generatedMappings.length) {
        var nextMapping = this._generatedMappings[index + 1];

        if (mapping.generatedLine === nextMapping.generatedLine) {
          mapping.lastGeneratedColumn = nextMapping.generatedColumn - 1;
          continue;
        }
      }

      // The last mapping for each line spans the entire line.
      mapping.lastGeneratedColumn = Infinity;
    }
  };

/**
 * Returns the original source, line, and column information for the generated
 * source's line and column positions provided. The only argument is an object
 * with the following properties:
 *
 *   - line: The line number in the generated source.  The line number
 *     is 1-based.
 *   - column: The column number in the generated source.  The column
 *     number is 0-based.
 *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
 *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
 *
 * and an object is returned with the following properties:
 *
 *   - source: The original source file, or null.
 *   - line: The line number in the original source, or null.  The
 *     line number is 1-based.
 *   - column: The column number in the original source, or null.  The
 *     column number is 0-based.
 *   - name: The original identifier, or null.
 */
BasicSourceMapConsumer.prototype.originalPositionFor =
  function SourceMapConsumer_originalPositionFor(aArgs) {
    var needle = {
      generatedLine: util.getArg(aArgs, 'line'),
      generatedColumn: util.getArg(aArgs, 'column')
    };

    var index = this._findMapping(
      needle,
      this._generatedMappings,
      "generatedLine",
      "generatedColumn",
      util.compareByGeneratedPositionsDeflated,
      util.getArg(aArgs, 'bias', SourceMapConsumer.GREATEST_LOWER_BOUND)
    );

    if (index >= 0) {
      var mapping = this._generatedMappings[index];

      if (mapping.generatedLine === needle.generatedLine) {
        var source = util.getArg(mapping, 'source', null);
        if (source !== null) {
          source = this._sources.at(source);
          source = util.computeSourceURL(this.sourceRoot, source, this._sourceMapURL);
        }
        var name = util.getArg(mapping, 'name', null);
        if (name !== null) {
          name = this._names.at(name);
        }
        return {
          source: source,
          line: util.getArg(mapping, 'originalLine', null),
          column: util.getArg(mapping, 'originalColumn', null),
          name: name
        };
      }
    }

    return {
      source: null,
      line: null,
      column: null,
      name: null
    };
  };

/**
 * Return true if we have the source content for every source in the source
 * map, false otherwise.
 */
BasicSourceMapConsumer.prototype.hasContentsOfAllSources =
  function BasicSourceMapConsumer_hasContentsOfAllSources() {
    if (!this.sourcesContent) {
      return false;
    }
    return this.sourcesContent.length >= this._sources.size() &&
      !this.sourcesContent.some(function (sc) { return sc == null; });
  };

/**
 * Returns the original source content. The only argument is the url of the
 * original source file. Returns null if no original source content is
 * available.
 */
BasicSourceMapConsumer.prototype.sourceContentFor =
  function SourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
    if (!this.sourcesContent) {
      return null;
    }

    var index = this._findSourceIndex(aSource);
    if (index >= 0) {
      return this.sourcesContent[index];
    }

    var relativeSource = aSource;
    if (this.sourceRoot != null) {
      relativeSource = util.relative(this.sourceRoot, relativeSource);
    }

    var url;
    if (this.sourceRoot != null
        && (url = util.urlParse(this.sourceRoot))) {
      // XXX: file:// URIs and absolute paths lead to unexpected behavior for
      // many users. We can help them out when they expect file:// URIs to
      // behave like it would if they were running a local HTTP server. See
      // https://bugzilla.mozilla.org/show_bug.cgi?id=885597.
      var fileUriAbsPath = relativeSource.replace(/^file:\/\//, "");
      if (url.scheme == "file"
          && this._sources.has(fileUriAbsPath)) {
        return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)]
      }

      if ((!url.path || url.path == "/")
          && this._sources.has("/" + relativeSource)) {
        return this.sourcesContent[this._sources.indexOf("/" + relativeSource)];
      }
    }

    // This function is used recursively from
    // IndexedSourceMapConsumer.prototype.sourceContentFor. In that case, we
    // don't want to throw if we can't find the source - we just want to
    // return null, so we provide a flag to exit gracefully.
    if (nullOnMissing) {
      return null;
    }
    else {
      throw new Error('"' + relativeSource + '" is not in the SourceMap.');
    }
  };

/**
 * Returns the generated line and column information for the original source,
 * line, and column positions provided. The only argument is an object with
 * the following properties:
 *
 *   - source: The filename of the original source.
 *   - line: The line number in the original source.  The line number
 *     is 1-based.
 *   - column: The column number in the original source.  The column
 *     number is 0-based.
 *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
 *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
 *
 * and an object is returned with the following properties:
 *
 *   - line: The line number in the generated source, or null.  The
 *     line number is 1-based.
 *   - column: The column number in the generated source, or null.
 *     The column number is 0-based.
 */
BasicSourceMapConsumer.prototype.generatedPositionFor =
  function SourceMapConsumer_generatedPositionFor(aArgs) {
    var source = util.getArg(aArgs, 'source');
    source = this._findSourceIndex(source);
    if (source < 0) {
      return {
        line: null,
        column: null,
        lastColumn: null
      };
    }

    var needle = {
      source: source,
      originalLine: util.getArg(aArgs, 'line'),
      originalColumn: util.getArg(aArgs, 'column')
    };

    var index = this._findMapping(
      needle,
      this._originalMappings,
      "originalLine",
      "originalColumn",
      util.compareByOriginalPositions,
      util.getArg(aArgs, 'bias', SourceMapConsumer.GREATEST_LOWER_BOUND)
    );

    if (index >= 0) {
      var mapping = this._originalMappings[index];

      if (mapping.source === needle.source) {
        return {
          line: util.getArg(mapping, 'generatedLine', null),
          column: util.getArg(mapping, 'generatedColumn', null),
          lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
        };
      }
    }

    return {
      line: null,
      column: null,
      lastColumn: null
    };
  };

exports.BasicSourceMapConsumer = BasicSourceMapConsumer;

/**
 * An IndexedSourceMapConsumer instance represents a parsed source map which
 * we can query for information. It differs from BasicSourceMapConsumer in
 * that it takes "indexed" source maps (i.e. ones with a "sections" field) as
 * input.
 *
 * The first parameter is a raw source map (either as a JSON string, or already
 * parsed to an object). According to the spec for indexed source maps, they
 * have the following attributes:
 *
 *   - version: Which version of the source map spec this map is following.
 *   - file: Optional. The generated file this source map is associated with.
 *   - sections: A list of section definitions.
 *
 * Each value under the "sections" field has two fields:
 *   - offset: The offset into the original specified at which this section
 *       begins to apply, defined as an object with a "line" and "column"
 *       field.
 *   - map: A source map definition. This source map could also be indexed,
 *       but doesn't have to be.
 *
 * Instead of the "map" field, it's also possible to have a "url" field
 * specifying a URL to retrieve a source map from, but that's currently
 * unsupported.
 *
 * Here's an example source map, taken from the source map spec[0], but
 * modified to omit a section which uses the "url" field.
 *
 *  {
 *    version : 3,
 *    file: "app.js",
 *    sections: [{
 *      offset: {line:100, column:10},
 *      map: {
 *        version : 3,
 *        file: "section.js",
 *        sources: ["foo.js", "bar.js"],
 *        names: ["src", "maps", "are", "fun"],
 *        mappings: "AAAA,E;;ABCDE;"
 *      }
 *    }],
 *  }
 *
 * The second parameter, if given, is a string whose value is the URL
 * at which the source map was found.  This URL is used to compute the
 * sources array.
 *
 * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit#heading=h.535es3xeprgt
 */
function IndexedSourceMapConsumer(aSourceMap, aSourceMapURL) {
  var sourceMap = aSourceMap;
  if (typeof aSourceMap === 'string') {
    sourceMap = util.parseSourceMapInput(aSourceMap);
  }

  var version = util.getArg(sourceMap, 'version');
  var sections = util.getArg(sourceMap, 'sections');

  if (version != this._version) {
    throw new Error('Unsupported version: ' + version);
  }

  this._sources = new ArraySet();
  this._names = new ArraySet();

  var lastOffset = {
    line: -1,
    column: 0
  };
  this._sections = sections.map(function (s) {
    if (s.url) {
      // The url field will require support for asynchronicity.
      // See https://github.com/mozilla/source-map/issues/16
      throw new Error('Support for url field in sections not implemented.');
    }
    var offset = util.getArg(s, 'offset');
    var offsetLine = util.getArg(offset, 'line');
    var offsetColumn = util.getArg(offset, 'column');

    if (offsetLine < lastOffset.line ||
        (offsetLine === lastOffset.line && offsetColumn < lastOffset.column)) {
      throw new Error('Section offsets must be ordered and non-overlapping.');
    }
    lastOffset = offset;

    return {
      generatedOffset: {
        // The offset fields are 0-based, but we use 1-based indices when
        // encoding/decoding from VLQ.
        generatedLine: offsetLine + 1,
        generatedColumn: offsetColumn + 1
      },
      consumer: new SourceMapConsumer(util.getArg(s, 'map'), aSourceMapURL)
    }
  });
}

IndexedSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
IndexedSourceMapConsumer.prototype.constructor = SourceMapConsumer;

/**
 * The version of the source mapping spec that we are consuming.
 */
IndexedSourceMapConsumer.prototype._version = 3;

/**
 * The list of original sources.
 */
Object.defineProperty(IndexedSourceMapConsumer.prototype, 'sources', {
  get: function () {
    var sources = [];
    for (var i = 0; i < this._sections.length; i++) {
      for (var j = 0; j < this._sections[i].consumer.sources.length; j++) {
        sources.push(this._sections[i].consumer.sources[j]);
      }
    }
    return sources;
  }
});

/**
 * Returns the original source, line, and column information for the generated
 * source's line and column positions provided. The only argument is an object
 * with the following properties:
 *
 *   - line: The line number in the generated source.  The line number
 *     is 1-based.
 *   - column: The column number in the generated source.  The column
 *     number is 0-based.
 *
 * and an object is returned with the following properties:
 *
 *   - source: The original source file, or null.
 *   - line: The line number in the original source, or null.  The
 *     line number is 1-based.
 *   - column: The column number in the original source, or null.  The
 *     column number is 0-based.
 *   - name: The original identifier, or null.
 */
IndexedSourceMapConsumer.prototype.originalPositionFor =
  function IndexedSourceMapConsumer_originalPositionFor(aArgs) {
    var needle = {
      generatedLine: util.getArg(aArgs, 'line'),
      generatedColumn: util.getArg(aArgs, 'column')
    };

    // Find the section containing the generated position we're trying to map
    // to an original position.
    var sectionIndex = binarySearch.search(needle, this._sections,
      function(needle, section) {
        var cmp = needle.generatedLine - section.generatedOffset.generatedLine;
        if (cmp) {
          return cmp;
        }

        return (needle.generatedColumn -
                section.generatedOffset.generatedColumn);
      });
    var section = this._sections[sectionIndex];

    if (!section) {
      return {
        source: null,
        line: null,
        column: null,
        name: null
      };
    }

    return section.consumer.originalPositionFor({
      line: needle.generatedLine -
        (section.generatedOffset.generatedLine - 1),
      column: needle.generatedColumn -
        (section.generatedOffset.generatedLine === needle.generatedLine
         ? section.generatedOffset.generatedColumn - 1
         : 0),
      bias: aArgs.bias
    });
  };

/**
 * Return true if we have the source content for every source in the source
 * map, false otherwise.
 */
IndexedSourceMapConsumer.prototype.hasContentsOfAllSources =
  function IndexedSourceMapConsumer_hasContentsOfAllSources() {
    return this._sections.every(function (s) {
      return s.consumer.hasContentsOfAllSources();
    });
  };

/**
 * Returns the original source content. The only argument is the url of the
 * original source file. Returns null if no original source content is
 * available.
 */
IndexedSourceMapConsumer.prototype.sourceContentFor =
  function IndexedSourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
    for (var i = 0; i < this._sections.length; i++) {
      var section = this._sections[i];

      var content = section.consumer.sourceContentFor(aSource, true);
      if (content) {
        return content;
      }
    }
    if (nullOnMissing) {
      return null;
    }
    else {
      throw new Error('"' + aSource + '" is not in the SourceMap.');
    }
  };

/**
 * Returns the generated line and column information for the original source,
 * line, and column positions provided. The only argument is an object with
 * the following properties:
 *
 *   - source: The filename of the original source.
 *   - line: The line number in the original source.  The line number
 *     is 1-based.
 *   - column: The column number in the original source.  The column
 *     number is 0-based.
 *
 * and an object is returned with the following properties:
 *
 *   - line: The line number in the generated source, or null.  The
 *     line number is 1-based. 
 *   - column: The column number in the generated source, or null.
 *     The column number is 0-based.
 */
IndexedSourceMapConsumer.prototype.generatedPositionFor =
  function IndexedSourceMapConsumer_generatedPositionFor(aArgs) {
    for (var i = 0; i < this._sections.length; i++) {
      var section = this._sections[i];

      // Only consider this section if the requested source is in the list of
      // sources of the consumer.
      if (section.consumer._findSourceIndex(util.getArg(aArgs, 'source')) === -1) {
        continue;
      }
      var generatedPosition = section.consumer.generatedPositionFor(aArgs);
      if (generatedPosition) {
        var ret = {
          line: generatedPosition.line +
            (section.generatedOffset.generatedLine - 1),
          column: generatedPosition.column +
            (section.generatedOffset.generatedLine === generatedPosition.line
             ? section.generatedOffset.generatedColumn - 1
             : 0)
        };
        return ret;
      }
    }

    return {
      line: null,
      column: null
    };
  };

/**
 * Parse the mappings in a string in to a data structure which we can easily
 * query (the ordered arrays in the `this.__generatedMappings` and
 * `this.__originalMappings` properties).
 */
IndexedSourceMapConsumer.prototype._parseMappings =
  function IndexedSourceMapConsumer_parseMappings(aStr, aSourceRoot) {
    this.__generatedMappings = [];
    this.__originalMappings = [];
    for (var i = 0; i < this._sections.length; i++) {
      var section = this._sections[i];
      var sectionMappings = section.consumer._generatedMappings;
      for (var j = 0; j < sectionMappings.length; j++) {
        var mapping = sectionMappings[j];

        var source = section.consumer._sources.at(mapping.source);
        source = util.computeSourceURL(section.consumer.sourceRoot, source, this._sourceMapURL);
        this._sources.add(source);
        source = this._sources.indexOf(source);

        var name = null;
        if (mapping.name) {
          name = section.consumer._names.at(mapping.name);
          this._names.add(name);
          name = this._names.indexOf(name);
        }

        // The mappings coming from the consumer for the section have
        // generated positions relative to the start of the section, so we
        // need to offset them to be relative to the start of the concatenated
        // generated file.
        var adjustedMapping = {
          source: source,
          generatedLine: mapping.generatedLine +
            (section.generatedOffset.generatedLine - 1),
          generatedColumn: mapping.generatedColumn +
            (section.generatedOffset.generatedLine === mapping.generatedLine
            ? section.generatedOffset.generatedColumn - 1
            : 0),
          originalLine: mapping.originalLine,
          originalColumn: mapping.originalColumn,
          name: name
        };

        this.__generatedMappings.push(adjustedMapping);
        if (typeof adjustedMapping.originalLine === 'number') {
          this.__originalMappings.push(adjustedMapping);
        }
      }
    }

    quickSort(this.__generatedMappings, util.compareByGeneratedPositionsDeflated);
    quickSort(this.__originalMappings, util.compareByOriginalPositions);
  };

exports.IndexedSourceMapConsumer = IndexedSourceMapConsumer;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2014 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var util = __webpack_require__(2);

/**
 * Determine whether mappingB is after mappingA with respect to generated
 * position.
 */
function generatedPositionAfter(mappingA, mappingB) {
  // Optimized for most common case
  var lineA = mappingA.generatedLine;
  var lineB = mappingB.generatedLine;
  var columnA = mappingA.generatedColumn;
  var columnB = mappingB.generatedColumn;
  return lineB > lineA || lineB == lineA && columnB >= columnA ||
         util.compareByGeneratedPositionsInflated(mappingA, mappingB) <= 0;
}

/**
 * A data structure to provide a sorted view of accumulated mappings in a
 * performance conscious manner. It trades a neglibable overhead in general
 * case for a large speedup in case of mappings being added in order.
 */
function MappingList() {
  this._array = [];
  this._sorted = true;
  // Serves as infimum
  this._last = {generatedLine: -1, generatedColumn: 0};
}

/**
 * Iterate through internal items. This method takes the same arguments that
 * `Array.prototype.forEach` takes.
 *
 * NOTE: The order of the mappings is NOT guaranteed.
 */
MappingList.prototype.unsortedForEach =
  function MappingList_forEach(aCallback, aThisArg) {
    this._array.forEach(aCallback, aThisArg);
  };

/**
 * Add the given source mapping.
 *
 * @param Object aMapping
 */
MappingList.prototype.add = function MappingList_add(aMapping) {
  if (generatedPositionAfter(this._last, aMapping)) {
    this._last = aMapping;
    this._array.push(aMapping);
  } else {
    this._sorted = false;
    this._array.push(aMapping);
  }
};

/**
 * Returns the flat, sorted array of mappings. The mappings are sorted by
 * generated position.
 *
 * WARNING: This method returns internal data without copying, for
 * performance. The return value must NOT be mutated, and should be treated as
 * an immutable borrow. If you want to take ownership, you must make your own
 * copy.
 */
MappingList.prototype.toArray = function MappingList_toArray() {
  if (!this._sorted) {
    this._array.sort(util.compareByGeneratedPositionsInflated);
    this._sorted = true;
  }
  return this._array;
};

exports.MappingList = MappingList;


/***/ }),
/* 38 */
/***/ (function(module, exports) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var intToCharMap = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');

/**
 * Encode an integer in the range of 0 to 63 to a single base 64 digit.
 */
exports.encode = function (number) {
  if (0 <= number && number < intToCharMap.length) {
    return intToCharMap[number];
  }
  throw new TypeError("Must be between 0 and 63: " + number);
};

/**
 * Decode a single base 64 character code digit to an integer. Returns -1 on
 * failure.
 */
exports.decode = function (charCode) {
  var bigA = 65;     // 'A'
  var bigZ = 90;     // 'Z'

  var littleA = 97;  // 'a'
  var littleZ = 122; // 'z'

  var zero = 48;     // '0'
  var nine = 57;     // '9'

  var plus = 43;     // '+'
  var slash = 47;    // '/'

  var littleOffset = 26;
  var numberOffset = 52;

  // 0 - 25: ABCDEFGHIJKLMNOPQRSTUVWXYZ
  if (bigA <= charCode && charCode <= bigZ) {
    return (charCode - bigA);
  }

  // 26 - 51: abcdefghijklmnopqrstuvwxyz
  if (littleA <= charCode && charCode <= littleZ) {
    return (charCode - littleA + littleOffset);
  }

  // 52 - 61: 0123456789
  if (zero <= charCode && charCode <= nine) {
    return (charCode - zero + numberOffset);
  }

  // 62: +
  if (charCode == plus) {
    return 62;
  }

  // 63: /
  if (charCode == slash) {
    return 63;
  }

  // Invalid base64 digit.
  return -1;
};


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * Copyright 2009-2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE.txt or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
exports.SourceMapGenerator = __webpack_require__(12).SourceMapGenerator;
exports.SourceMapConsumer = __webpack_require__(36).SourceMapConsumer;
exports.SourceNode = __webpack_require__(33).SourceNode;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

/*
  Copyright (C) 2013 Yusuke Suzuki <utatane.tea@gmail.com>

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

(function () {
    'use strict';

    var code = __webpack_require__(13);

    function isStrictModeReservedWordES6(id) {
        switch (id) {
        case 'implements':
        case 'interface':
        case 'package':
        case 'private':
        case 'protected':
        case 'public':
        case 'static':
        case 'let':
            return true;
        default:
            return false;
        }
    }

    function isKeywordES5(id, strict) {
        // yield should not be treated as keyword under non-strict mode.
        if (!strict && id === 'yield') {
            return false;
        }
        return isKeywordES6(id, strict);
    }

    function isKeywordES6(id, strict) {
        if (strict && isStrictModeReservedWordES6(id)) {
            return true;
        }

        switch (id.length) {
        case 2:
            return (id === 'if') || (id === 'in') || (id === 'do');
        case 3:
            return (id === 'var') || (id === 'for') || (id === 'new') || (id === 'try');
        case 4:
            return (id === 'this') || (id === 'else') || (id === 'case') ||
                (id === 'void') || (id === 'with') || (id === 'enum');
        case 5:
            return (id === 'while') || (id === 'break') || (id === 'catch') ||
                (id === 'throw') || (id === 'const') || (id === 'yield') ||
                (id === 'class') || (id === 'super');
        case 6:
            return (id === 'return') || (id === 'typeof') || (id === 'delete') ||
                (id === 'switch') || (id === 'export') || (id === 'import');
        case 7:
            return (id === 'default') || (id === 'finally') || (id === 'extends');
        case 8:
            return (id === 'function') || (id === 'continue') || (id === 'debugger');
        case 10:
            return (id === 'instanceof');
        default:
            return false;
        }
    }

    function isReservedWordES5(id, strict) {
        return id === 'null' || id === 'true' || id === 'false' || isKeywordES5(id, strict);
    }

    function isReservedWordES6(id, strict) {
        return id === 'null' || id === 'true' || id === 'false' || isKeywordES6(id, strict);
    }

    function isRestrictedWord(id) {
        return id === 'eval' || id === 'arguments';
    }

    function isIdentifierNameES5(id) {
        var i, iz, ch;

        if (id.length === 0) { return false; }

        ch = id.charCodeAt(0);
        if (!code.isIdentifierStartES5(ch)) {
            return false;
        }

        for (i = 1, iz = id.length; i < iz; ++i) {
            ch = id.charCodeAt(i);
            if (!code.isIdentifierPartES5(ch)) {
                return false;
            }
        }
        return true;
    }

    function decodeUtf16(lead, trail) {
        return (lead - 0xD800) * 0x400 + (trail - 0xDC00) + 0x10000;
    }

    function isIdentifierNameES6(id) {
        var i, iz, ch, lowCh, check;

        if (id.length === 0) { return false; }

        check = code.isIdentifierStartES6;
        for (i = 0, iz = id.length; i < iz; ++i) {
            ch = id.charCodeAt(i);
            if (0xD800 <= ch && ch <= 0xDBFF) {
                ++i;
                if (i >= iz) { return false; }
                lowCh = id.charCodeAt(i);
                if (!(0xDC00 <= lowCh && lowCh <= 0xDFFF)) {
                    return false;
                }
                ch = decodeUtf16(ch, lowCh);
            }
            if (!check(ch)) {
                return false;
            }
            check = code.isIdentifierPartES6;
        }
        return true;
    }

    function isIdentifierES5(id, strict) {
        return isIdentifierNameES5(id) && !isReservedWordES5(id, strict);
    }

    function isIdentifierES6(id, strict) {
        return isIdentifierNameES6(id) && !isReservedWordES6(id, strict);
    }

    module.exports = {
        isKeywordES5: isKeywordES5,
        isKeywordES6: isKeywordES6,
        isReservedWordES5: isReservedWordES5,
        isReservedWordES6: isReservedWordES6,
        isRestrictedWord: isRestrictedWord,
        isIdentifierNameES5: isIdentifierNameES5,
        isIdentifierNameES6: isIdentifierNameES6,
        isIdentifierES5: isIdentifierES5,
        isIdentifierES6: isIdentifierES6
    };
}());
/* vim: set sw=4 ts=4 et tw=80 : */


/***/ }),
/* 41 */
/***/ (function(module, exports) {

/*
  Copyright (C) 2013 Yusuke Suzuki <utatane.tea@gmail.com>

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS 'AS IS'
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

(function () {
    'use strict';

    function isExpression(node) {
        if (node == null) { return false; }
        switch (node.type) {
            case 'ArrayExpression':
            case 'AssignmentExpression':
            case 'BinaryExpression':
            case 'CallExpression':
            case 'ConditionalExpression':
            case 'FunctionExpression':
            case 'Identifier':
            case 'Literal':
            case 'LogicalExpression':
            case 'MemberExpression':
            case 'NewExpression':
            case 'ObjectExpression':
            case 'SequenceExpression':
            case 'ThisExpression':
            case 'UnaryExpression':
            case 'UpdateExpression':
                return true;
        }
        return false;
    }

    function isIterationStatement(node) {
        if (node == null) { return false; }
        switch (node.type) {
            case 'DoWhileStatement':
            case 'ForInStatement':
            case 'ForStatement':
            case 'WhileStatement':
                return true;
        }
        return false;
    }

    function isStatement(node) {
        if (node == null) { return false; }
        switch (node.type) {
            case 'BlockStatement':
            case 'BreakStatement':
            case 'ContinueStatement':
            case 'DebuggerStatement':
            case 'DoWhileStatement':
            case 'EmptyStatement':
            case 'ExpressionStatement':
            case 'ForInStatement':
            case 'ForStatement':
            case 'IfStatement':
            case 'LabeledStatement':
            case 'ReturnStatement':
            case 'SwitchStatement':
            case 'ThrowStatement':
            case 'TryStatement':
            case 'VariableDeclaration':
            case 'WhileStatement':
            case 'WithStatement':
                return true;
        }
        return false;
    }

    function isSourceElement(node) {
      return isStatement(node) || node != null && node.type === 'FunctionDeclaration';
    }

    function trailingStatement(node) {
        switch (node.type) {
        case 'IfStatement':
            if (node.alternate != null) {
                return node.alternate;
            }
            return node.consequent;

        case 'LabeledStatement':
        case 'ForStatement':
        case 'ForInStatement':
        case 'WhileStatement':
        case 'WithStatement':
            return node.body;
        }
        return null;
    }

    function isProblematicIfStatement(node) {
        var current;

        if (node.type !== 'IfStatement') {
            return false;
        }
        if (node.alternate == null) {
            return false;
        }
        current = node.consequent;
        do {
            if (current.type === 'IfStatement') {
                if (current.alternate == null)  {
                    return true;
                }
            }
            current = trailingStatement(current);
        } while (current);

        return false;
    }

    module.exports = {
        isExpression: isExpression,
        isStatement: isStatement,
        isIterationStatement: isIterationStatement,
        isSourceElement: isSourceElement,
        isProblematicIfStatement: isProblematicIfStatement,

        trailingStatement: trailingStatement
    };
}());
/* vim: set sw=4 ts=4 et tw=80 : */


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

/*
  Copyright (C) 2013 Yusuke Suzuki <utatane.tea@gmail.com>

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/


(function () {
    'use strict';

    exports.ast = __webpack_require__(41);
    exports.code = __webpack_require__(13);
    exports.keyword = __webpack_require__(40);
}());
/* vim: set sw=4 ts=4 et tw=80 : */


/***/ }),
/* 43 */
/***/ (function(module) {

module.exports = {"_args":[["estraverse@4.2.0","/opt/atlassian/pipelines/agent/build"]],"_from":"estraverse@4.2.0","_id":"estraverse@4.2.0","_inBundle":false,"_integrity":"sha1-De4/7TH81GlhjOc0IJn8GvoL2xM=","_location":"/static-eval/estraverse","_phantomChildren":{},"_requested":{"type":"version","registry":true,"raw":"estraverse@4.2.0","name":"estraverse","escapedName":"estraverse","rawSpec":"4.2.0","saveSpec":null,"fetchSpec":"4.2.0"},"_requiredBy":["/static-eval/escodegen"],"_resolved":"https://registry.npmjs.org/estraverse/-/estraverse-4.2.0.tgz","_spec":"4.2.0","_where":"/opt/atlassian/pipelines/agent/build","bugs":{"url":"https://github.com/estools/estraverse/issues"},"description":"ECMAScript JS AST traversal functions","devDependencies":{"babel-preset-es2015":"^6.3.13","babel-register":"^6.3.13","chai":"^2.1.1","espree":"^1.11.0","gulp":"^3.8.10","gulp-bump":"^0.2.2","gulp-filter":"^2.0.0","gulp-git":"^1.0.1","gulp-tag-version":"^1.2.1","jshint":"^2.5.6","mocha":"^2.1.0"},"engines":{"node":">=0.10.0"},"homepage":"https://github.com/estools/estraverse","license":"BSD-2-Clause","main":"estraverse.js","maintainers":[{"name":"Yusuke Suzuki","email":"utatane.tea@gmail.com","url":"http://github.com/Constellation"}],"name":"estraverse","repository":{"type":"git","url":"git+ssh://git@github.com/estools/estraverse.git"},"scripts":{"lint":"jshint estraverse.js","test":"npm run-script lint && npm run-script unit-test","unit-test":"mocha --compilers js:babel-register"},"version":"4.2.0"};

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

/*
  Copyright (C) 2012-2013 Yusuke Suzuki <utatane.tea@gmail.com>
  Copyright (C) 2012 Ariya Hidayat <ariya.hidayat@gmail.com>

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
/*jslint vars:false, bitwise:true*/
/*jshint indent:4*/
/*global exports:true*/
(function clone(exports) {
    'use strict';

    var Syntax,
        isArray,
        VisitorOption,
        VisitorKeys,
        objectCreate,
        objectKeys,
        BREAK,
        SKIP,
        REMOVE;

    function ignoreJSHintError() { }

    isArray = Array.isArray;
    if (!isArray) {
        isArray = function isArray(array) {
            return Object.prototype.toString.call(array) === '[object Array]';
        };
    }

    function deepCopy(obj) {
        var ret = {}, key, val;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                val = obj[key];
                if (typeof val === 'object' && val !== null) {
                    ret[key] = deepCopy(val);
                } else {
                    ret[key] = val;
                }
            }
        }
        return ret;
    }

    function shallowCopy(obj) {
        var ret = {}, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                ret[key] = obj[key];
            }
        }
        return ret;
    }
    ignoreJSHintError(shallowCopy);

    // based on LLVM libc++ upper_bound / lower_bound
    // MIT License

    function upperBound(array, func) {
        var diff, len, i, current;

        len = array.length;
        i = 0;

        while (len) {
            diff = len >>> 1;
            current = i + diff;
            if (func(array[current])) {
                len = diff;
            } else {
                i = current + 1;
                len -= diff + 1;
            }
        }
        return i;
    }

    function lowerBound(array, func) {
        var diff, len, i, current;

        len = array.length;
        i = 0;

        while (len) {
            diff = len >>> 1;
            current = i + diff;
            if (func(array[current])) {
                i = current + 1;
                len -= diff + 1;
            } else {
                len = diff;
            }
        }
        return i;
    }
    ignoreJSHintError(lowerBound);

    objectCreate = Object.create || (function () {
        function F() { }

        return function (o) {
            F.prototype = o;
            return new F();
        };
    })();

    objectKeys = Object.keys || function (o) {
        var keys = [], key;
        for (key in o) {
            keys.push(key);
        }
        return keys;
    };

    function extend(to, from) {
        var keys = objectKeys(from), key, i, len;
        for (i = 0, len = keys.length; i < len; i += 1) {
            key = keys[i];
            to[key] = from[key];
        }
        return to;
    }

    Syntax = {
        AssignmentExpression: 'AssignmentExpression',
        AssignmentPattern: 'AssignmentPattern',
        ArrayExpression: 'ArrayExpression',
        ArrayPattern: 'ArrayPattern',
        ArrowFunctionExpression: 'ArrowFunctionExpression',
        AwaitExpression: 'AwaitExpression', // CAUTION: It's deferred to ES7.
        BlockStatement: 'BlockStatement',
        BinaryExpression: 'BinaryExpression',
        BreakStatement: 'BreakStatement',
        CallExpression: 'CallExpression',
        CatchClause: 'CatchClause',
        ClassBody: 'ClassBody',
        ClassDeclaration: 'ClassDeclaration',
        ClassExpression: 'ClassExpression',
        ComprehensionBlock: 'ComprehensionBlock',  // CAUTION: It's deferred to ES7.
        ComprehensionExpression: 'ComprehensionExpression',  // CAUTION: It's deferred to ES7.
        ConditionalExpression: 'ConditionalExpression',
        ContinueStatement: 'ContinueStatement',
        DebuggerStatement: 'DebuggerStatement',
        DirectiveStatement: 'DirectiveStatement',
        DoWhileStatement: 'DoWhileStatement',
        EmptyStatement: 'EmptyStatement',
        ExportAllDeclaration: 'ExportAllDeclaration',
        ExportDefaultDeclaration: 'ExportDefaultDeclaration',
        ExportNamedDeclaration: 'ExportNamedDeclaration',
        ExportSpecifier: 'ExportSpecifier',
        ExpressionStatement: 'ExpressionStatement',
        ForStatement: 'ForStatement',
        ForInStatement: 'ForInStatement',
        ForOfStatement: 'ForOfStatement',
        FunctionDeclaration: 'FunctionDeclaration',
        FunctionExpression: 'FunctionExpression',
        GeneratorExpression: 'GeneratorExpression',  // CAUTION: It's deferred to ES7.
        Identifier: 'Identifier',
        IfStatement: 'IfStatement',
        ImportDeclaration: 'ImportDeclaration',
        ImportDefaultSpecifier: 'ImportDefaultSpecifier',
        ImportNamespaceSpecifier: 'ImportNamespaceSpecifier',
        ImportSpecifier: 'ImportSpecifier',
        Literal: 'Literal',
        LabeledStatement: 'LabeledStatement',
        LogicalExpression: 'LogicalExpression',
        MemberExpression: 'MemberExpression',
        MetaProperty: 'MetaProperty',
        MethodDefinition: 'MethodDefinition',
        ModuleSpecifier: 'ModuleSpecifier',
        NewExpression: 'NewExpression',
        ObjectExpression: 'ObjectExpression',
        ObjectPattern: 'ObjectPattern',
        Program: 'Program',
        Property: 'Property',
        RestElement: 'RestElement',
        ReturnStatement: 'ReturnStatement',
        SequenceExpression: 'SequenceExpression',
        SpreadElement: 'SpreadElement',
        Super: 'Super',
        SwitchStatement: 'SwitchStatement',
        SwitchCase: 'SwitchCase',
        TaggedTemplateExpression: 'TaggedTemplateExpression',
        TemplateElement: 'TemplateElement',
        TemplateLiteral: 'TemplateLiteral',
        ThisExpression: 'ThisExpression',
        ThrowStatement: 'ThrowStatement',
        TryStatement: 'TryStatement',
        UnaryExpression: 'UnaryExpression',
        UpdateExpression: 'UpdateExpression',
        VariableDeclaration: 'VariableDeclaration',
        VariableDeclarator: 'VariableDeclarator',
        WhileStatement: 'WhileStatement',
        WithStatement: 'WithStatement',
        YieldExpression: 'YieldExpression'
    };

    VisitorKeys = {
        AssignmentExpression: ['left', 'right'],
        AssignmentPattern: ['left', 'right'],
        ArrayExpression: ['elements'],
        ArrayPattern: ['elements'],
        ArrowFunctionExpression: ['params', 'body'],
        AwaitExpression: ['argument'], // CAUTION: It's deferred to ES7.
        BlockStatement: ['body'],
        BinaryExpression: ['left', 'right'],
        BreakStatement: ['label'],
        CallExpression: ['callee', 'arguments'],
        CatchClause: ['param', 'body'],
        ClassBody: ['body'],
        ClassDeclaration: ['id', 'superClass', 'body'],
        ClassExpression: ['id', 'superClass', 'body'],
        ComprehensionBlock: ['left', 'right'],  // CAUTION: It's deferred to ES7.
        ComprehensionExpression: ['blocks', 'filter', 'body'],  // CAUTION: It's deferred to ES7.
        ConditionalExpression: ['test', 'consequent', 'alternate'],
        ContinueStatement: ['label'],
        DebuggerStatement: [],
        DirectiveStatement: [],
        DoWhileStatement: ['body', 'test'],
        EmptyStatement: [],
        ExportAllDeclaration: ['source'],
        ExportDefaultDeclaration: ['declaration'],
        ExportNamedDeclaration: ['declaration', 'specifiers', 'source'],
        ExportSpecifier: ['exported', 'local'],
        ExpressionStatement: ['expression'],
        ForStatement: ['init', 'test', 'update', 'body'],
        ForInStatement: ['left', 'right', 'body'],
        ForOfStatement: ['left', 'right', 'body'],
        FunctionDeclaration: ['id', 'params', 'body'],
        FunctionExpression: ['id', 'params', 'body'],
        GeneratorExpression: ['blocks', 'filter', 'body'],  // CAUTION: It's deferred to ES7.
        Identifier: [],
        IfStatement: ['test', 'consequent', 'alternate'],
        ImportDeclaration: ['specifiers', 'source'],
        ImportDefaultSpecifier: ['local'],
        ImportNamespaceSpecifier: ['local'],
        ImportSpecifier: ['imported', 'local'],
        Literal: [],
        LabeledStatement: ['label', 'body'],
        LogicalExpression: ['left', 'right'],
        MemberExpression: ['object', 'property'],
        MetaProperty: ['meta', 'property'],
        MethodDefinition: ['key', 'value'],
        ModuleSpecifier: [],
        NewExpression: ['callee', 'arguments'],
        ObjectExpression: ['properties'],
        ObjectPattern: ['properties'],
        Program: ['body'],
        Property: ['key', 'value'],
        RestElement: [ 'argument' ],
        ReturnStatement: ['argument'],
        SequenceExpression: ['expressions'],
        SpreadElement: ['argument'],
        Super: [],
        SwitchStatement: ['discriminant', 'cases'],
        SwitchCase: ['test', 'consequent'],
        TaggedTemplateExpression: ['tag', 'quasi'],
        TemplateElement: [],
        TemplateLiteral: ['quasis', 'expressions'],
        ThisExpression: [],
        ThrowStatement: ['argument'],
        TryStatement: ['block', 'handler', 'finalizer'],
        UnaryExpression: ['argument'],
        UpdateExpression: ['argument'],
        VariableDeclaration: ['declarations'],
        VariableDeclarator: ['id', 'init'],
        WhileStatement: ['test', 'body'],
        WithStatement: ['object', 'body'],
        YieldExpression: ['argument']
    };

    // unique id
    BREAK = {};
    SKIP = {};
    REMOVE = {};

    VisitorOption = {
        Break: BREAK,
        Skip: SKIP,
        Remove: REMOVE
    };

    function Reference(parent, key) {
        this.parent = parent;
        this.key = key;
    }

    Reference.prototype.replace = function replace(node) {
        this.parent[this.key] = node;
    };

    Reference.prototype.remove = function remove() {
        if (isArray(this.parent)) {
            this.parent.splice(this.key, 1);
            return true;
        } else {
            this.replace(null);
            return false;
        }
    };

    function Element(node, path, wrap, ref) {
        this.node = node;
        this.path = path;
        this.wrap = wrap;
        this.ref = ref;
    }

    function Controller() { }

    // API:
    // return property path array from root to current node
    Controller.prototype.path = function path() {
        var i, iz, j, jz, result, element;

        function addToPath(result, path) {
            if (isArray(path)) {
                for (j = 0, jz = path.length; j < jz; ++j) {
                    result.push(path[j]);
                }
            } else {
                result.push(path);
            }
        }

        // root node
        if (!this.__current.path) {
            return null;
        }

        // first node is sentinel, second node is root element
        result = [];
        for (i = 2, iz = this.__leavelist.length; i < iz; ++i) {
            element = this.__leavelist[i];
            addToPath(result, element.path);
        }
        addToPath(result, this.__current.path);
        return result;
    };

    // API:
    // return type of current node
    Controller.prototype.type = function () {
        var node = this.current();
        return node.type || this.__current.wrap;
    };

    // API:
    // return array of parent elements
    Controller.prototype.parents = function parents() {
        var i, iz, result;

        // first node is sentinel
        result = [];
        for (i = 1, iz = this.__leavelist.length; i < iz; ++i) {
            result.push(this.__leavelist[i].node);
        }

        return result;
    };

    // API:
    // return current node
    Controller.prototype.current = function current() {
        return this.__current.node;
    };

    Controller.prototype.__execute = function __execute(callback, element) {
        var previous, result;

        result = undefined;

        previous  = this.__current;
        this.__current = element;
        this.__state = null;
        if (callback) {
            result = callback.call(this, element.node, this.__leavelist[this.__leavelist.length - 1].node);
        }
        this.__current = previous;

        return result;
    };

    // API:
    // notify control skip / break
    Controller.prototype.notify = function notify(flag) {
        this.__state = flag;
    };

    // API:
    // skip child nodes of current node
    Controller.prototype.skip = function () {
        this.notify(SKIP);
    };

    // API:
    // break traversals
    Controller.prototype['break'] = function () {
        this.notify(BREAK);
    };

    // API:
    // remove node
    Controller.prototype.remove = function () {
        this.notify(REMOVE);
    };

    Controller.prototype.__initialize = function(root, visitor) {
        this.visitor = visitor;
        this.root = root;
        this.__worklist = [];
        this.__leavelist = [];
        this.__current = null;
        this.__state = null;
        this.__fallback = null;
        if (visitor.fallback === 'iteration') {
            this.__fallback = objectKeys;
        } else if (typeof visitor.fallback === 'function') {
            this.__fallback = visitor.fallback;
        }

        this.__keys = VisitorKeys;
        if (visitor.keys) {
            this.__keys = extend(objectCreate(this.__keys), visitor.keys);
        }
    };

    function isNode(node) {
        if (node == null) {
            return false;
        }
        return typeof node === 'object' && typeof node.type === 'string';
    }

    function isProperty(nodeType, key) {
        return (nodeType === Syntax.ObjectExpression || nodeType === Syntax.ObjectPattern) && 'properties' === key;
    }

    Controller.prototype.traverse = function traverse(root, visitor) {
        var worklist,
            leavelist,
            element,
            node,
            nodeType,
            ret,
            key,
            current,
            current2,
            candidates,
            candidate,
            sentinel;

        this.__initialize(root, visitor);

        sentinel = {};

        // reference
        worklist = this.__worklist;
        leavelist = this.__leavelist;

        // initialize
        worklist.push(new Element(root, null, null, null));
        leavelist.push(new Element(null, null, null, null));

        while (worklist.length) {
            element = worklist.pop();

            if (element === sentinel) {
                element = leavelist.pop();

                ret = this.__execute(visitor.leave, element);

                if (this.__state === BREAK || ret === BREAK) {
                    return;
                }
                continue;
            }

            if (element.node) {

                ret = this.__execute(visitor.enter, element);

                if (this.__state === BREAK || ret === BREAK) {
                    return;
                }

                worklist.push(sentinel);
                leavelist.push(element);

                if (this.__state === SKIP || ret === SKIP) {
                    continue;
                }

                node = element.node;
                nodeType = node.type || element.wrap;
                candidates = this.__keys[nodeType];
                if (!candidates) {
                    if (this.__fallback) {
                        candidates = this.__fallback(node);
                    } else {
                        throw new Error('Unknown node type ' + nodeType + '.');
                    }
                }

                current = candidates.length;
                while ((current -= 1) >= 0) {
                    key = candidates[current];
                    candidate = node[key];
                    if (!candidate) {
                        continue;
                    }

                    if (isArray(candidate)) {
                        current2 = candidate.length;
                        while ((current2 -= 1) >= 0) {
                            if (!candidate[current2]) {
                                continue;
                            }
                            if (isProperty(nodeType, candidates[current])) {
                                element = new Element(candidate[current2], [key, current2], 'Property', null);
                            } else if (isNode(candidate[current2])) {
                                element = new Element(candidate[current2], [key, current2], null, null);
                            } else {
                                continue;
                            }
                            worklist.push(element);
                        }
                    } else if (isNode(candidate)) {
                        worklist.push(new Element(candidate, key, null, null));
                    }
                }
            }
        }
    };

    Controller.prototype.replace = function replace(root, visitor) {
        var worklist,
            leavelist,
            node,
            nodeType,
            target,
            element,
            current,
            current2,
            candidates,
            candidate,
            sentinel,
            outer,
            key;

        function removeElem(element) {
            var i,
                key,
                nextElem,
                parent;

            if (element.ref.remove()) {
                // When the reference is an element of an array.
                key = element.ref.key;
                parent = element.ref.parent;

                // If removed from array, then decrease following items' keys.
                i = worklist.length;
                while (i--) {
                    nextElem = worklist[i];
                    if (nextElem.ref && nextElem.ref.parent === parent) {
                        if  (nextElem.ref.key < key) {
                            break;
                        }
                        --nextElem.ref.key;
                    }
                }
            }
        }

        this.__initialize(root, visitor);

        sentinel = {};

        // reference
        worklist = this.__worklist;
        leavelist = this.__leavelist;

        // initialize
        outer = {
            root: root
        };
        element = new Element(root, null, null, new Reference(outer, 'root'));
        worklist.push(element);
        leavelist.push(element);

        while (worklist.length) {
            element = worklist.pop();

            if (element === sentinel) {
                element = leavelist.pop();

                target = this.__execute(visitor.leave, element);

                // node may be replaced with null,
                // so distinguish between undefined and null in this place
                if (target !== undefined && target !== BREAK && target !== SKIP && target !== REMOVE) {
                    // replace
                    element.ref.replace(target);
                }

                if (this.__state === REMOVE || target === REMOVE) {
                    removeElem(element);
                }

                if (this.__state === BREAK || target === BREAK) {
                    return outer.root;
                }
                continue;
            }

            target = this.__execute(visitor.enter, element);

            // node may be replaced with null,
            // so distinguish between undefined and null in this place
            if (target !== undefined && target !== BREAK && target !== SKIP && target !== REMOVE) {
                // replace
                element.ref.replace(target);
                element.node = target;
            }

            if (this.__state === REMOVE || target === REMOVE) {
                removeElem(element);
                element.node = null;
            }

            if (this.__state === BREAK || target === BREAK) {
                return outer.root;
            }

            // node may be null
            node = element.node;
            if (!node) {
                continue;
            }

            worklist.push(sentinel);
            leavelist.push(element);

            if (this.__state === SKIP || target === SKIP) {
                continue;
            }

            nodeType = node.type || element.wrap;
            candidates = this.__keys[nodeType];
            if (!candidates) {
                if (this.__fallback) {
                    candidates = this.__fallback(node);
                } else {
                    throw new Error('Unknown node type ' + nodeType + '.');
                }
            }

            current = candidates.length;
            while ((current -= 1) >= 0) {
                key = candidates[current];
                candidate = node[key];
                if (!candidate) {
                    continue;
                }

                if (isArray(candidate)) {
                    current2 = candidate.length;
                    while ((current2 -= 1) >= 0) {
                        if (!candidate[current2]) {
                            continue;
                        }
                        if (isProperty(nodeType, candidates[current])) {
                            element = new Element(candidate[current2], [key, current2], 'Property', new Reference(candidate, current2));
                        } else if (isNode(candidate[current2])) {
                            element = new Element(candidate[current2], [key, current2], null, new Reference(candidate, current2));
                        } else {
                            continue;
                        }
                        worklist.push(element);
                    }
                } else if (isNode(candidate)) {
                    worklist.push(new Element(candidate, key, null, new Reference(node, key)));
                }
            }
        }

        return outer.root;
    };

    function traverse(root, visitor) {
        var controller = new Controller();
        return controller.traverse(root, visitor);
    }

    function replace(root, visitor) {
        var controller = new Controller();
        return controller.replace(root, visitor);
    }

    function extendCommentRange(comment, tokens) {
        var target;

        target = upperBound(tokens, function search(token) {
            return token.range[0] > comment.range[0];
        });

        comment.extendedRange = [comment.range[0], comment.range[1]];

        if (target !== tokens.length) {
            comment.extendedRange[1] = tokens[target].range[0];
        }

        target -= 1;
        if (target >= 0) {
            comment.extendedRange[0] = tokens[target].range[1];
        }

        return comment;
    }

    function attachComments(tree, providedComments, tokens) {
        // At first, we should calculate extended comment ranges.
        var comments = [], comment, len, i, cursor;

        if (!tree.range) {
            throw new Error('attachComments needs range information');
        }

        // tokens array is empty, we attach comments to tree as 'leadingComments'
        if (!tokens.length) {
            if (providedComments.length) {
                for (i = 0, len = providedComments.length; i < len; i += 1) {
                    comment = deepCopy(providedComments[i]);
                    comment.extendedRange = [0, tree.range[0]];
                    comments.push(comment);
                }
                tree.leadingComments = comments;
            }
            return tree;
        }

        for (i = 0, len = providedComments.length; i < len; i += 1) {
            comments.push(extendCommentRange(deepCopy(providedComments[i]), tokens));
        }

        // This is based on John Freeman's implementation.
        cursor = 0;
        traverse(tree, {
            enter: function (node) {
                var comment;

                while (cursor < comments.length) {
                    comment = comments[cursor];
                    if (comment.extendedRange[1] > node.range[0]) {
                        break;
                    }

                    if (comment.extendedRange[1] === node.range[0]) {
                        if (!node.leadingComments) {
                            node.leadingComments = [];
                        }
                        node.leadingComments.push(comment);
                        comments.splice(cursor, 1);
                    } else {
                        cursor += 1;
                    }
                }

                // already out of owned node
                if (cursor === comments.length) {
                    return VisitorOption.Break;
                }

                if (comments[cursor].extendedRange[0] > node.range[1]) {
                    return VisitorOption.Skip;
                }
            }
        });

        cursor = 0;
        traverse(tree, {
            leave: function (node) {
                var comment;

                while (cursor < comments.length) {
                    comment = comments[cursor];
                    if (node.range[1] < comment.extendedRange[0]) {
                        break;
                    }

                    if (node.range[1] === comment.extendedRange[0]) {
                        if (!node.trailingComments) {
                            node.trailingComments = [];
                        }
                        node.trailingComments.push(comment);
                        comments.splice(cursor, 1);
                    } else {
                        cursor += 1;
                    }
                }

                // already out of owned node
                if (cursor === comments.length) {
                    return VisitorOption.Break;
                }

                if (comments[cursor].extendedRange[0] > node.range[1]) {
                    return VisitorOption.Skip;
                }
            }
        });

        return tree;
    }

    exports.version = __webpack_require__(43).version;
    exports.Syntax = Syntax;
    exports.traverse = traverse;
    exports.replace = replace;
    exports.attachComments = attachComments;
    exports.VisitorKeys = VisitorKeys;
    exports.VisitorOption = VisitorOption;
    exports.Controller = Controller;
    exports.cloneEnvironment = function () { return clone({}); };

    return exports;
}(exports));
/* vim: set sw=4 ts=4 et tw=80 : */


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/*
  Copyright (C) 2012-2014 Yusuke Suzuki <utatane.tea@gmail.com>
  Copyright (C) 2015 Ingvar Stepanyan <me@rreverser.com>
  Copyright (C) 2014 Ivan Nikulin <ifaaan@gmail.com>
  Copyright (C) 2012-2013 Michael Ficarra <escodegen.copyright@michael.ficarra.me>
  Copyright (C) 2012-2013 Mathias Bynens <mathias@qiwi.be>
  Copyright (C) 2013 Irakli Gozalishvili <rfobic@gmail.com>
  Copyright (C) 2012 Robert Gust-Bardon <donate@robert.gust-bardon.org>
  Copyright (C) 2012 John Freeman <jfreeman08@gmail.com>
  Copyright (C) 2011-2012 Ariya Hidayat <ariya.hidayat@gmail.com>
  Copyright (C) 2012 Joost-Wim Boekesteijn <joost-wim@boekesteijn.nl>
  Copyright (C) 2012 Kris Kowal <kris.kowal@cixar.com>
  Copyright (C) 2012 Arpad Borsos <arpad.borsos@googlemail.com>

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

/*global exports:true, require:true, global:true*/
(function () {
    'use strict';

    var Syntax,
        Precedence,
        BinaryPrecedence,
        SourceNode,
        estraverse,
        esutils,
        base,
        indent,
        json,
        renumber,
        hexadecimal,
        quotes,
        escapeless,
        newline,
        space,
        parentheses,
        semicolons,
        safeConcatenation,
        directive,
        extra,
        parse,
        sourceMap,
        sourceCode,
        preserveBlankLines,
        FORMAT_MINIFY,
        FORMAT_DEFAULTS;

    estraverse = __webpack_require__(44);
    esutils = __webpack_require__(42);

    Syntax = estraverse.Syntax;

    // Generation is done by generateExpression.
    function isExpression(node) {
        return CodeGenerator.Expression.hasOwnProperty(node.type);
    }

    // Generation is done by generateStatement.
    function isStatement(node) {
        return CodeGenerator.Statement.hasOwnProperty(node.type);
    }

    Precedence = {
        Sequence: 0,
        Yield: 1,
        Await: 1,
        Assignment: 1,
        Conditional: 2,
        ArrowFunction: 2,
        LogicalOR: 3,
        LogicalAND: 4,
        BitwiseOR: 5,
        BitwiseXOR: 6,
        BitwiseAND: 7,
        Equality: 8,
        Relational: 9,
        BitwiseSHIFT: 10,
        Additive: 11,
        Multiplicative: 12,
        Unary: 13,
        Postfix: 14,
        Call: 15,
        New: 16,
        TaggedTemplate: 17,
        Member: 18,
        Primary: 19
    };

    BinaryPrecedence = {
        '||': Precedence.LogicalOR,
        '&&': Precedence.LogicalAND,
        '|': Precedence.BitwiseOR,
        '^': Precedence.BitwiseXOR,
        '&': Precedence.BitwiseAND,
        '==': Precedence.Equality,
        '!=': Precedence.Equality,
        '===': Precedence.Equality,
        '!==': Precedence.Equality,
        'is': Precedence.Equality,
        'isnt': Precedence.Equality,
        '<': Precedence.Relational,
        '>': Precedence.Relational,
        '<=': Precedence.Relational,
        '>=': Precedence.Relational,
        'in': Precedence.Relational,
        'instanceof': Precedence.Relational,
        '<<': Precedence.BitwiseSHIFT,
        '>>': Precedence.BitwiseSHIFT,
        '>>>': Precedence.BitwiseSHIFT,
        '+': Precedence.Additive,
        '-': Precedence.Additive,
        '*': Precedence.Multiplicative,
        '%': Precedence.Multiplicative,
        '/': Precedence.Multiplicative
    };

    //Flags
    var F_ALLOW_IN = 1,
        F_ALLOW_CALL = 1 << 1,
        F_ALLOW_UNPARATH_NEW = 1 << 2,
        F_FUNC_BODY = 1 << 3,
        F_DIRECTIVE_CTX = 1 << 4,
        F_SEMICOLON_OPT = 1 << 5;

    //Expression flag sets
    //NOTE: Flag order:
    // F_ALLOW_IN
    // F_ALLOW_CALL
    // F_ALLOW_UNPARATH_NEW
    var E_FTT = F_ALLOW_CALL | F_ALLOW_UNPARATH_NEW,
        E_TTF = F_ALLOW_IN | F_ALLOW_CALL,
        E_TTT = F_ALLOW_IN | F_ALLOW_CALL | F_ALLOW_UNPARATH_NEW,
        E_TFF = F_ALLOW_IN,
        E_FFT = F_ALLOW_UNPARATH_NEW,
        E_TFT = F_ALLOW_IN | F_ALLOW_UNPARATH_NEW;

    //Statement flag sets
    //NOTE: Flag order:
    // F_ALLOW_IN
    // F_FUNC_BODY
    // F_DIRECTIVE_CTX
    // F_SEMICOLON_OPT
    var S_TFFF = F_ALLOW_IN,
        S_TFFT = F_ALLOW_IN | F_SEMICOLON_OPT,
        S_FFFF = 0x00,
        S_TFTF = F_ALLOW_IN | F_DIRECTIVE_CTX,
        S_TTFF = F_ALLOW_IN | F_FUNC_BODY;

    function getDefaultOptions() {
        // default options
        return {
            indent: null,
            base: null,
            parse: null,
            comment: false,
            format: {
                indent: {
                    style: '    ',
                    base: 0,
                    adjustMultilineComment: false
                },
                newline: '\n',
                space: ' ',
                json: false,
                renumber: false,
                hexadecimal: false,
                quotes: 'single',
                escapeless: false,
                compact: false,
                parentheses: true,
                semicolons: true,
                safeConcatenation: false,
                preserveBlankLines: false
            },
            moz: {
                comprehensionExpressionStartsWithAssignment: false,
                starlessGenerator: false
            },
            sourceMap: null,
            sourceMapRoot: null,
            sourceMapWithCode: false,
            directive: false,
            raw: true,
            verbatim: null,
            sourceCode: null
        };
    }

    function stringRepeat(str, num) {
        var result = '';

        for (num |= 0; num > 0; num >>>= 1, str += str) {
            if (num & 1) {
                result += str;
            }
        }

        return result;
    }

    function hasLineTerminator(str) {
        return (/[\r\n]/g).test(str);
    }

    function endsWithLineTerminator(str) {
        var len = str.length;
        return len && esutils.code.isLineTerminator(str.charCodeAt(len - 1));
    }

    function merge(target, override) {
        var key;
        for (key in override) {
            if (override.hasOwnProperty(key)) {
                target[key] = override[key];
            }
        }
        return target;
    }

    function updateDeeply(target, override) {
        var key, val;

        function isHashObject(target) {
            return typeof target === 'object' && target instanceof Object && !(target instanceof RegExp);
        }

        for (key in override) {
            if (override.hasOwnProperty(key)) {
                val = override[key];
                if (isHashObject(val)) {
                    if (isHashObject(target[key])) {
                        updateDeeply(target[key], val);
                    } else {
                        target[key] = updateDeeply({}, val);
                    }
                } else {
                    target[key] = val;
                }
            }
        }
        return target;
    }

    function generateNumber(value) {
        var result, point, temp, exponent, pos;

        if (value !== value) {
            throw new Error('Numeric literal whose value is NaN');
        }
        if (value < 0 || (value === 0 && 1 / value < 0)) {
            throw new Error('Numeric literal whose value is negative');
        }

        if (value === 1 / 0) {
            return json ? 'null' : renumber ? '1e400' : '1e+400';
        }

        result = '' + value;
        if (!renumber || result.length < 3) {
            return result;
        }

        point = result.indexOf('.');
        if (!json && result.charCodeAt(0) === 0x30  /* 0 */ && point === 1) {
            point = 0;
            result = result.slice(1);
        }
        temp = result;
        result = result.replace('e+', 'e');
        exponent = 0;
        if ((pos = temp.indexOf('e')) > 0) {
            exponent = +temp.slice(pos + 1);
            temp = temp.slice(0, pos);
        }
        if (point >= 0) {
            exponent -= temp.length - point - 1;
            temp = +(temp.slice(0, point) + temp.slice(point + 1)) + '';
        }
        pos = 0;
        while (temp.charCodeAt(temp.length + pos - 1) === 0x30  /* 0 */) {
            --pos;
        }
        if (pos !== 0) {
            exponent -= pos;
            temp = temp.slice(0, pos);
        }
        if (exponent !== 0) {
            temp += 'e' + exponent;
        }
        if ((temp.length < result.length ||
                    (hexadecimal && value > 1e12 && Math.floor(value) === value && (temp = '0x' + value.toString(16)).length < result.length)) &&
                +temp === value) {
            result = temp;
        }

        return result;
    }

    // Generate valid RegExp expression.
    // This function is based on https://github.com/Constellation/iv Engine

    function escapeRegExpCharacter(ch, previousIsBackslash) {
        // not handling '\' and handling \u2028 or \u2029 to unicode escape sequence
        if ((ch & ~1) === 0x2028) {
            return (previousIsBackslash ? 'u' : '\\u') + ((ch === 0x2028) ? '2028' : '2029');
        } else if (ch === 10 || ch === 13) {  // \n, \r
            return (previousIsBackslash ? '' : '\\') + ((ch === 10) ? 'n' : 'r');
        }
        return String.fromCharCode(ch);
    }

    function generateRegExp(reg) {
        var match, result, flags, i, iz, ch, characterInBrack, previousIsBackslash;

        result = reg.toString();

        if (reg.source) {
            // extract flag from toString result
            match = result.match(/\/([^/]*)$/);
            if (!match) {
                return result;
            }

            flags = match[1];
            result = '';

            characterInBrack = false;
            previousIsBackslash = false;
            for (i = 0, iz = reg.source.length; i < iz; ++i) {
                ch = reg.source.charCodeAt(i);

                if (!previousIsBackslash) {
                    if (characterInBrack) {
                        if (ch === 93) {  // ]
                            characterInBrack = false;
                        }
                    } else {
                        if (ch === 47) {  // /
                            result += '\\';
                        } else if (ch === 91) {  // [
                            characterInBrack = true;
                        }
                    }
                    result += escapeRegExpCharacter(ch, previousIsBackslash);
                    previousIsBackslash = ch === 92;  // \
                } else {
                    // if new RegExp("\\\n') is provided, create /\n/
                    result += escapeRegExpCharacter(ch, previousIsBackslash);
                    // prevent like /\\[/]/
                    previousIsBackslash = false;
                }
            }

            return '/' + result + '/' + flags;
        }

        return result;
    }

    function escapeAllowedCharacter(code, next) {
        var hex;

        if (code === 0x08  /* \b */) {
            return '\\b';
        }

        if (code === 0x0C  /* \f */) {
            return '\\f';
        }

        if (code === 0x09  /* \t */) {
            return '\\t';
        }

        hex = code.toString(16).toUpperCase();
        if (json || code > 0xFF) {
            return '\\u' + '0000'.slice(hex.length) + hex;
        } else if (code === 0x0000 && !esutils.code.isDecimalDigit(next)) {
            return '\\0';
        } else if (code === 0x000B  /* \v */) { // '\v'
            return '\\x0B';
        } else {
            return '\\x' + '00'.slice(hex.length) + hex;
        }
    }

    function escapeDisallowedCharacter(code) {
        if (code === 0x5C  /* \ */) {
            return '\\\\';
        }

        if (code === 0x0A  /* \n */) {
            return '\\n';
        }

        if (code === 0x0D  /* \r */) {
            return '\\r';
        }

        if (code === 0x2028) {
            return '\\u2028';
        }

        if (code === 0x2029) {
            return '\\u2029';
        }

        throw new Error('Incorrectly classified character');
    }

    function escapeDirective(str) {
        var i, iz, code, quote;

        quote = quotes === 'double' ? '"' : '\'';
        for (i = 0, iz = str.length; i < iz; ++i) {
            code = str.charCodeAt(i);
            if (code === 0x27  /* ' */) {
                quote = '"';
                break;
            } else if (code === 0x22  /* " */) {
                quote = '\'';
                break;
            } else if (code === 0x5C  /* \ */) {
                ++i;
            }
        }

        return quote + str + quote;
    }

    function escapeString(str) {
        var result = '', i, len, code, singleQuotes = 0, doubleQuotes = 0, single, quote;

        for (i = 0, len = str.length; i < len; ++i) {
            code = str.charCodeAt(i);
            if (code === 0x27  /* ' */) {
                ++singleQuotes;
            } else if (code === 0x22  /* " */) {
                ++doubleQuotes;
            } else if (code === 0x2F  /* / */ && json) {
                result += '\\';
            } else if (esutils.code.isLineTerminator(code) || code === 0x5C  /* \ */) {
                result += escapeDisallowedCharacter(code);
                continue;
            } else if (!esutils.code.isIdentifierPartES5(code) && (json && code < 0x20  /* SP */ || !json && !escapeless && (code < 0x20  /* SP */ || code > 0x7E  /* ~ */))) {
                result += escapeAllowedCharacter(code, str.charCodeAt(i + 1));
                continue;
            }
            result += String.fromCharCode(code);
        }

        single = !(quotes === 'double' || (quotes === 'auto' && doubleQuotes < singleQuotes));
        quote = single ? '\'' : '"';

        if (!(single ? singleQuotes : doubleQuotes)) {
            return quote + result + quote;
        }

        str = result;
        result = quote;

        for (i = 0, len = str.length; i < len; ++i) {
            code = str.charCodeAt(i);
            if ((code === 0x27  /* ' */ && single) || (code === 0x22  /* " */ && !single)) {
                result += '\\';
            }
            result += String.fromCharCode(code);
        }

        return result + quote;
    }

    /**
     * flatten an array to a string, where the array can contain
     * either strings or nested arrays
     */
    function flattenToString(arr) {
        var i, iz, elem, result = '';
        for (i = 0, iz = arr.length; i < iz; ++i) {
            elem = arr[i];
            result += Array.isArray(elem) ? flattenToString(elem) : elem;
        }
        return result;
    }

    /**
     * convert generated to a SourceNode when source maps are enabled.
     */
    function toSourceNodeWhenNeeded(generated, node) {
        if (!sourceMap) {
            // with no source maps, generated is either an
            // array or a string.  if an array, flatten it.
            // if a string, just return it
            if (Array.isArray(generated)) {
                return flattenToString(generated);
            } else {
                return generated;
            }
        }
        if (node == null) {
            if (generated instanceof SourceNode) {
                return generated;
            } else {
                node = {};
            }
        }
        if (node.loc == null) {
            return new SourceNode(null, null, sourceMap, generated, node.name || null);
        }
        return new SourceNode(node.loc.start.line, node.loc.start.column, (sourceMap === true ? node.loc.source || null : sourceMap), generated, node.name || null);
    }

    function noEmptySpace() {
        return (space) ? space : ' ';
    }

    function join(left, right) {
        var leftSource,
            rightSource,
            leftCharCode,
            rightCharCode;

        leftSource = toSourceNodeWhenNeeded(left).toString();
        if (leftSource.length === 0) {
            return [right];
        }

        rightSource = toSourceNodeWhenNeeded(right).toString();
        if (rightSource.length === 0) {
            return [left];
        }

        leftCharCode = leftSource.charCodeAt(leftSource.length - 1);
        rightCharCode = rightSource.charCodeAt(0);

        if ((leftCharCode === 0x2B  /* + */ || leftCharCode === 0x2D  /* - */) && leftCharCode === rightCharCode ||
            esutils.code.isIdentifierPartES5(leftCharCode) && esutils.code.isIdentifierPartES5(rightCharCode) ||
            leftCharCode === 0x2F  /* / */ && rightCharCode === 0x69  /* i */) { // infix word operators all start with `i`
            return [left, noEmptySpace(), right];
        } else if (esutils.code.isWhiteSpace(leftCharCode) || esutils.code.isLineTerminator(leftCharCode) ||
                esutils.code.isWhiteSpace(rightCharCode) || esutils.code.isLineTerminator(rightCharCode)) {
            return [left, right];
        }
        return [left, space, right];
    }

    function addIndent(stmt) {
        return [base, stmt];
    }

    function withIndent(fn) {
        var previousBase;
        previousBase = base;
        base += indent;
        fn(base);
        base = previousBase;
    }

    function calculateSpaces(str) {
        var i;
        for (i = str.length - 1; i >= 0; --i) {
            if (esutils.code.isLineTerminator(str.charCodeAt(i))) {
                break;
            }
        }
        return (str.length - 1) - i;
    }

    function adjustMultilineComment(value, specialBase) {
        var array, i, len, line, j, spaces, previousBase, sn;

        array = value.split(/\r\n|[\r\n]/);
        spaces = Number.MAX_VALUE;

        // first line doesn't have indentation
        for (i = 1, len = array.length; i < len; ++i) {
            line = array[i];
            j = 0;
            while (j < line.length && esutils.code.isWhiteSpace(line.charCodeAt(j))) {
                ++j;
            }
            if (spaces > j) {
                spaces = j;
            }
        }

        if (typeof specialBase !== 'undefined') {
            // pattern like
            // {
            //   var t = 20;  /*
            //                 * this is comment
            //                 */
            // }
            previousBase = base;
            if (array[1][spaces] === '*') {
                specialBase += ' ';
            }
            base = specialBase;
        } else {
            if (spaces & 1) {
                // /*
                //  *
                //  */
                // If spaces are odd number, above pattern is considered.
                // We waste 1 space.
                --spaces;
            }
            previousBase = base;
        }

        for (i = 1, len = array.length; i < len; ++i) {
            sn = toSourceNodeWhenNeeded(addIndent(array[i].slice(spaces)));
            array[i] = sourceMap ? sn.join('') : sn;
        }

        base = previousBase;

        return array.join('\n');
    }

    function generateComment(comment, specialBase) {
        if (comment.type === 'Line') {
            if (endsWithLineTerminator(comment.value)) {
                return '//' + comment.value;
            } else {
                // Always use LineTerminator
                var result = '//' + comment.value;
                if (!preserveBlankLines) {
                    result += '\n';
                }
                return result;
            }
        }
        if (extra.format.indent.adjustMultilineComment && /[\n\r]/.test(comment.value)) {
            return adjustMultilineComment('/*' + comment.value + '*/', specialBase);
        }
        return '/*' + comment.value + '*/';
    }

    function addComments(stmt, result) {
        var i, len, comment, save, tailingToStatement, specialBase, fragment,
            extRange, range, prevRange, prefix, infix, suffix, count;

        if (stmt.leadingComments && stmt.leadingComments.length > 0) {
            save = result;

            if (preserveBlankLines) {
                comment = stmt.leadingComments[0];
                result = [];

                extRange = comment.extendedRange;
                range = comment.range;

                prefix = sourceCode.substring(extRange[0], range[0]);
                count = (prefix.match(/\n/g) || []).length;
                if (count > 0) {
                    result.push(stringRepeat('\n', count));
                    result.push(addIndent(generateComment(comment)));
                } else {
                    result.push(prefix);
                    result.push(generateComment(comment));
                }

                prevRange = range;

                for (i = 1, len = stmt.leadingComments.length; i < len; i++) {
                    comment = stmt.leadingComments[i];
                    range = comment.range;

                    infix = sourceCode.substring(prevRange[1], range[0]);
                    count = (infix.match(/\n/g) || []).length;
                    result.push(stringRepeat('\n', count));
                    result.push(addIndent(generateComment(comment)));

                    prevRange = range;
                }

                suffix = sourceCode.substring(range[1], extRange[1]);
                count = (suffix.match(/\n/g) || []).length;
                result.push(stringRepeat('\n', count));
            } else {
                comment = stmt.leadingComments[0];
                result = [];
                if (safeConcatenation && stmt.type === Syntax.Program && stmt.body.length === 0) {
                    result.push('\n');
                }
                result.push(generateComment(comment));
                if (!endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
                    result.push('\n');
                }

                for (i = 1, len = stmt.leadingComments.length; i < len; ++i) {
                    comment = stmt.leadingComments[i];
                    fragment = [generateComment(comment)];
                    if (!endsWithLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) {
                        fragment.push('\n');
                    }
                    result.push(addIndent(fragment));
                }
            }

            result.push(addIndent(save));
        }

        if (stmt.trailingComments) {

            if (preserveBlankLines) {
                comment = stmt.trailingComments[0];
                extRange = comment.extendedRange;
                range = comment.range;

                prefix = sourceCode.substring(extRange[0], range[0]);
                count = (prefix.match(/\n/g) || []).length;

                if (count > 0) {
                    result.push(stringRepeat('\n', count));
                    result.push(addIndent(generateComment(comment)));
                } else {
                    result.push(prefix);
                    result.push(generateComment(comment));
                }
            } else {
                tailingToStatement = !endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString());
                specialBase = stringRepeat(' ', calculateSpaces(toSourceNodeWhenNeeded([base, result, indent]).toString()));
                for (i = 0, len = stmt.trailingComments.length; i < len; ++i) {
                    comment = stmt.trailingComments[i];
                    if (tailingToStatement) {
                        // We assume target like following script
                        //
                        // var t = 20;  /**
                        //               * This is comment of t
                        //               */
                        if (i === 0) {
                            // first case
                            result = [result, indent];
                        } else {
                            result = [result, specialBase];
                        }
                        result.push(generateComment(comment, specialBase));
                    } else {
                        result = [result, addIndent(generateComment(comment))];
                    }
                    if (i !== len - 1 && !endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
                        result = [result, '\n'];
                    }
                }
            }
        }

        return result;
    }

    function generateBlankLines(start, end, result) {
        var j, newlineCount = 0;

        for (j = start; j < end; j++) {
            if (sourceCode[j] === '\n') {
                newlineCount++;
            }
        }

        for (j = 1; j < newlineCount; j++) {
            result.push(newline);
        }
    }

    function parenthesize(text, current, should) {
        if (current < should) {
            return ['(', text, ')'];
        }
        return text;
    }

    function generateVerbatimString(string) {
        var i, iz, result;
        result = string.split(/\r\n|\n/);
        for (i = 1, iz = result.length; i < iz; i++) {
            result[i] = newline + base + result[i];
        }
        return result;
    }

    function generateVerbatim(expr, precedence) {
        var verbatim, result, prec;
        verbatim = expr[extra.verbatim];

        if (typeof verbatim === 'string') {
            result = parenthesize(generateVerbatimString(verbatim), Precedence.Sequence, precedence);
        } else {
            // verbatim is object
            result = generateVerbatimString(verbatim.content);
            prec = (verbatim.precedence != null) ? verbatim.precedence : Precedence.Sequence;
            result = parenthesize(result, prec, precedence);
        }

        return toSourceNodeWhenNeeded(result, expr);
    }

    function CodeGenerator() {
    }

    // Helpers.

    CodeGenerator.prototype.maybeBlock = function(stmt, flags) {
        var result, noLeadingComment, that = this;

        noLeadingComment = !extra.comment || !stmt.leadingComments;

        if (stmt.type === Syntax.BlockStatement && noLeadingComment) {
            return [space, this.generateStatement(stmt, flags)];
        }

        if (stmt.type === Syntax.EmptyStatement && noLeadingComment) {
            return ';';
        }

        withIndent(function () {
            result = [
                newline,
                addIndent(that.generateStatement(stmt, flags))
            ];
        });

        return result;
    };

    CodeGenerator.prototype.maybeBlockSuffix = function (stmt, result) {
        var ends = endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString());
        if (stmt.type === Syntax.BlockStatement && (!extra.comment || !stmt.leadingComments) && !ends) {
            return [result, space];
        }
        if (ends) {
            return [result, base];
        }
        return [result, newline, base];
    };

    function generateIdentifier(node) {
        return toSourceNodeWhenNeeded(node.name, node);
    }

    function generateAsyncPrefix(node, spaceRequired) {
        return node.async ? 'async' + (spaceRequired ? noEmptySpace() : space) : '';
    }

    function generateStarSuffix(node) {
        var isGenerator = node.generator && !extra.moz.starlessGenerator;
        return isGenerator ? '*' + space : '';
    }

    function generateMethodPrefix(prop) {
        var func = prop.value;
        if (func.async) {
            return generateAsyncPrefix(func, !prop.computed);
        } else {
            // avoid space before method name
            return generateStarSuffix(func) ? '*' : '';
        }
    }

    CodeGenerator.prototype.generatePattern = function (node, precedence, flags) {
        if (node.type === Syntax.Identifier) {
            return generateIdentifier(node);
        }
        return this.generateExpression(node, precedence, flags);
    };

    CodeGenerator.prototype.generateFunctionParams = function (node) {
        var i, iz, result, hasDefault;

        hasDefault = false;

        if (node.type === Syntax.ArrowFunctionExpression &&
                !node.rest && (!node.defaults || node.defaults.length === 0) &&
                node.params.length === 1 && node.params[0].type === Syntax.Identifier) {
            // arg => { } case
            result = [generateAsyncPrefix(node, true), generateIdentifier(node.params[0])];
        } else {
            result = node.type === Syntax.ArrowFunctionExpression ? [generateAsyncPrefix(node, false)] : [];
            result.push('(');
            if (node.defaults) {
                hasDefault = true;
            }
            for (i = 0, iz = node.params.length; i < iz; ++i) {
                if (hasDefault && node.defaults[i]) {
                    // Handle default values.
                    result.push(this.generateAssignment(node.params[i], node.defaults[i], '=', Precedence.Assignment, E_TTT));
                } else {
                    result.push(this.generatePattern(node.params[i], Precedence.Assignment, E_TTT));
                }
                if (i + 1 < iz) {
                    result.push(',' + space);
                }
            }

            if (node.rest) {
                if (node.params.length) {
                    result.push(',' + space);
                }
                result.push('...');
                result.push(generateIdentifier(node.rest));
            }

            result.push(')');
        }

        return result;
    };

    CodeGenerator.prototype.generateFunctionBody = function (node) {
        var result, expr;

        result = this.generateFunctionParams(node);

        if (node.type === Syntax.ArrowFunctionExpression) {
            result.push(space);
            result.push('=>');
        }

        if (node.expression) {
            result.push(space);
            expr = this.generateExpression(node.body, Precedence.Assignment, E_TTT);
            if (expr.toString().charAt(0) === '{') {
                expr = ['(', expr, ')'];
            }
            result.push(expr);
        } else {
            result.push(this.maybeBlock(node.body, S_TTFF));
        }

        return result;
    };

    CodeGenerator.prototype.generateIterationForStatement = function (operator, stmt, flags) {
        var result = ['for' + space + '('], that = this;
        withIndent(function () {
            if (stmt.left.type === Syntax.VariableDeclaration) {
                withIndent(function () {
                    result.push(stmt.left.kind + noEmptySpace());
                    result.push(that.generateStatement(stmt.left.declarations[0], S_FFFF));
                });
            } else {
                result.push(that.generateExpression(stmt.left, Precedence.Call, E_TTT));
            }

            result = join(result, operator);
            result = [join(
                result,
                that.generateExpression(stmt.right, Precedence.Sequence, E_TTT)
            ), ')'];
        });
        result.push(this.maybeBlock(stmt.body, flags));
        return result;
    };

    CodeGenerator.prototype.generatePropertyKey = function (expr, computed) {
        var result = [];

        if (computed) {
            result.push('[');
        }

        result.push(this.generateExpression(expr, Precedence.Sequence, E_TTT));

        if (computed) {
            result.push(']');
        }

        return result;
    };

    CodeGenerator.prototype.generateAssignment = function (left, right, operator, precedence, flags) {
        if (Precedence.Assignment < precedence) {
            flags |= F_ALLOW_IN;
        }

        return parenthesize(
            [
                this.generateExpression(left, Precedence.Call, flags),
                space + operator + space,
                this.generateExpression(right, Precedence.Assignment, flags)
            ],
            Precedence.Assignment,
            precedence
        );
    };

    CodeGenerator.prototype.semicolon = function (flags) {
        if (!semicolons && flags & F_SEMICOLON_OPT) {
            return '';
        }
        return ';';
    };

    // Statements.

    CodeGenerator.Statement = {

        BlockStatement: function (stmt, flags) {
            var range, content, result = ['{', newline], that = this;

            withIndent(function () {
                // handle functions without any code
                if (stmt.body.length === 0 && preserveBlankLines) {
                    range = stmt.range;
                    if (range[1] - range[0] > 2) {
                        content = sourceCode.substring(range[0] + 1, range[1] - 1);
                        if (content[0] === '\n') {
                            result = ['{'];
                        }
                        result.push(content);
                    }
                }

                var i, iz, fragment, bodyFlags;
                bodyFlags = S_TFFF;
                if (flags & F_FUNC_BODY) {
                    bodyFlags |= F_DIRECTIVE_CTX;
                }

                for (i = 0, iz = stmt.body.length; i < iz; ++i) {
                    if (preserveBlankLines) {
                        // handle spaces before the first line
                        if (i === 0) {
                            if (stmt.body[0].leadingComments) {
                                range = stmt.body[0].leadingComments[0].extendedRange;
                                content = sourceCode.substring(range[0], range[1]);
                                if (content[0] === '\n') {
                                    result = ['{'];
                                }
                            }
                            if (!stmt.body[0].leadingComments) {
                                generateBlankLines(stmt.range[0], stmt.body[0].range[0], result);
                            }
                        }

                        // handle spaces between lines
                        if (i > 0) {
                            if (!stmt.body[i - 1].trailingComments  && !stmt.body[i].leadingComments) {
                                generateBlankLines(stmt.body[i - 1].range[1], stmt.body[i].range[0], result);
                            }
                        }
                    }

                    if (i === iz - 1) {
                        bodyFlags |= F_SEMICOLON_OPT;
                    }

                    if (stmt.body[i].leadingComments && preserveBlankLines) {
                        fragment = that.generateStatement(stmt.body[i], bodyFlags);
                    } else {
                        fragment = addIndent(that.generateStatement(stmt.body[i], bodyFlags));
                    }

                    result.push(fragment);
                    if (!endsWithLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) {
                        if (preserveBlankLines && i < iz - 1) {
                            // don't add a new line if there are leading coments
                            // in the next statement
                            if (!stmt.body[i + 1].leadingComments) {
                                result.push(newline);
                            }
                        } else {
                            result.push(newline);
                        }
                    }

                    if (preserveBlankLines) {
                        // handle spaces after the last line
                        if (i === iz - 1) {
                            if (!stmt.body[i].trailingComments) {
                                generateBlankLines(stmt.body[i].range[1], stmt.range[1], result);
                            }
                        }
                    }
                }
            });

            result.push(addIndent('}'));
            return result;
        },

        BreakStatement: function (stmt, flags) {
            if (stmt.label) {
                return 'break ' + stmt.label.name + this.semicolon(flags);
            }
            return 'break' + this.semicolon(flags);
        },

        ContinueStatement: function (stmt, flags) {
            if (stmt.label) {
                return 'continue ' + stmt.label.name + this.semicolon(flags);
            }
            return 'continue' + this.semicolon(flags);
        },

        ClassBody: function (stmt, flags) {
            var result = [ '{', newline], that = this;

            withIndent(function (indent) {
                var i, iz;

                for (i = 0, iz = stmt.body.length; i < iz; ++i) {
                    result.push(indent);
                    result.push(that.generateExpression(stmt.body[i], Precedence.Sequence, E_TTT));
                    if (i + 1 < iz) {
                        result.push(newline);
                    }
                }
            });

            if (!endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
                result.push(newline);
            }
            result.push(base);
            result.push('}');
            return result;
        },

        ClassDeclaration: function (stmt, flags) {
            var result, fragment;
            result  = ['class'];
            if (stmt.id) {
                result = join(result, this.generateExpression(stmt.id, Precedence.Sequence, E_TTT));
            }
            if (stmt.superClass) {
                fragment = join('extends', this.generateExpression(stmt.superClass, Precedence.Assignment, E_TTT));
                result = join(result, fragment);
            }
            result.push(space);
            result.push(this.generateStatement(stmt.body, S_TFFT));
            return result;
        },

        DirectiveStatement: function (stmt, flags) {
            if (extra.raw && stmt.raw) {
                return stmt.raw + this.semicolon(flags);
            }
            return escapeDirective(stmt.directive) + this.semicolon(flags);
        },

        DoWhileStatement: function (stmt, flags) {
            // Because `do 42 while (cond)` is Syntax Error. We need semicolon.
            var result = join('do', this.maybeBlock(stmt.body, S_TFFF));
            result = this.maybeBlockSuffix(stmt.body, result);
            return join(result, [
                'while' + space + '(',
                this.generateExpression(stmt.test, Precedence.Sequence, E_TTT),
                ')' + this.semicolon(flags)
            ]);
        },

        CatchClause: function (stmt, flags) {
            var result, that = this;
            withIndent(function () {
                var guard;

                result = [
                    'catch' + space + '(',
                    that.generateExpression(stmt.param, Precedence.Sequence, E_TTT),
                    ')'
                ];

                if (stmt.guard) {
                    guard = that.generateExpression(stmt.guard, Precedence.Sequence, E_TTT);
                    result.splice(2, 0, ' if ', guard);
                }
            });
            result.push(this.maybeBlock(stmt.body, S_TFFF));
            return result;
        },

        DebuggerStatement: function (stmt, flags) {
            return 'debugger' + this.semicolon(flags);
        },

        EmptyStatement: function (stmt, flags) {
            return ';';
        },

        ExportDefaultDeclaration: function (stmt, flags) {
            var result = [ 'export' ], bodyFlags;

            bodyFlags = (flags & F_SEMICOLON_OPT) ? S_TFFT : S_TFFF;

            // export default HoistableDeclaration[Default]
            // export default AssignmentExpression[In] ;
            result = join(result, 'default');
            if (isStatement(stmt.declaration)) {
                result = join(result, this.generateStatement(stmt.declaration, bodyFlags));
            } else {
                result = join(result, this.generateExpression(stmt.declaration, Precedence.Assignment, E_TTT) + this.semicolon(flags));
            }
            return result;
        },

        ExportNamedDeclaration: function (stmt, flags) {
            var result = [ 'export' ], bodyFlags, that = this;

            bodyFlags = (flags & F_SEMICOLON_OPT) ? S_TFFT : S_TFFF;

            // export VariableStatement
            // export Declaration[Default]
            if (stmt.declaration) {
                return join(result, this.generateStatement(stmt.declaration, bodyFlags));
            }

            // export ExportClause[NoReference] FromClause ;
            // export ExportClause ;
            if (stmt.specifiers) {
                if (stmt.specifiers.length === 0) {
                    result = join(result, '{' + space + '}');
                } else if (stmt.specifiers[0].type === Syntax.ExportBatchSpecifier) {
                    result = join(result, this.generateExpression(stmt.specifiers[0], Precedence.Sequence, E_TTT));
                } else {
                    result = join(result, '{');
                    withIndent(function (indent) {
                        var i, iz;
                        result.push(newline);
                        for (i = 0, iz = stmt.specifiers.length; i < iz; ++i) {
                            result.push(indent);
                            result.push(that.generateExpression(stmt.specifiers[i], Precedence.Sequence, E_TTT));
                            if (i + 1 < iz) {
                                result.push(',' + newline);
                            }
                        }
                    });
                    if (!endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
                        result.push(newline);
                    }
                    result.push(base + '}');
                }

                if (stmt.source) {
                    result = join(result, [
                        'from' + space,
                        // ModuleSpecifier
                        this.generateExpression(stmt.source, Precedence.Sequence, E_TTT),
                        this.semicolon(flags)
                    ]);
                } else {
                    result.push(this.semicolon(flags));
                }
            }
            return result;
        },

        ExportAllDeclaration: function (stmt, flags) {
            // export * FromClause ;
            return [
                'export' + space,
                '*' + space,
                'from' + space,
                // ModuleSpecifier
                this.generateExpression(stmt.source, Precedence.Sequence, E_TTT),
                this.semicolon(flags)
            ];
        },

        ExpressionStatement: function (stmt, flags) {
            var result, fragment;

            function isClassPrefixed(fragment) {
                var code;
                if (fragment.slice(0, 5) !== 'class') {
                    return false;
                }
                code = fragment.charCodeAt(5);
                return code === 0x7B  /* '{' */ || esutils.code.isWhiteSpace(code) || esutils.code.isLineTerminator(code);
            }

            function isFunctionPrefixed(fragment) {
                var code;
                if (fragment.slice(0, 8) !== 'function') {
                    return false;
                }
                code = fragment.charCodeAt(8);
                return code === 0x28 /* '(' */ || esutils.code.isWhiteSpace(code) || code === 0x2A  /* '*' */ || esutils.code.isLineTerminator(code);
            }

            function isAsyncPrefixed(fragment) {
                var code, i, iz;
                if (fragment.slice(0, 5) !== 'async') {
                    return false;
                }
                if (!esutils.code.isWhiteSpace(fragment.charCodeAt(5))) {
                    return false;
                }
                for (i = 6, iz = fragment.length; i < iz; ++i) {
                    if (!esutils.code.isWhiteSpace(fragment.charCodeAt(i))) {
                        break;
                    }
                }
                if (i === iz) {
                    return false;
                }
                if (fragment.slice(i, i + 8) !== 'function') {
                    return false;
                }
                code = fragment.charCodeAt(i + 8);
                return code === 0x28 /* '(' */ || esutils.code.isWhiteSpace(code) || code === 0x2A  /* '*' */ || esutils.code.isLineTerminator(code);
            }

            result = [this.generateExpression(stmt.expression, Precedence.Sequence, E_TTT)];
            // 12.4 '{', 'function', 'class' is not allowed in this position.
            // wrap expression with parentheses
            fragment = toSourceNodeWhenNeeded(result).toString();
            if (fragment.charCodeAt(0) === 0x7B  /* '{' */ ||  // ObjectExpression
                    isClassPrefixed(fragment) ||
                    isFunctionPrefixed(fragment) ||
                    isAsyncPrefixed(fragment) ||
                    (directive && (flags & F_DIRECTIVE_CTX) && stmt.expression.type === Syntax.Literal && typeof stmt.expression.value === 'string')) {
                result = ['(', result, ')' + this.semicolon(flags)];
            } else {
                result.push(this.semicolon(flags));
            }
            return result;
        },

        ImportDeclaration: function (stmt, flags) {
            // ES6: 15.2.1 valid import declarations:
            //     - import ImportClause FromClause ;
            //     - import ModuleSpecifier ;
            var result, cursor, that = this;

            // If no ImportClause is present,
            // this should be `import ModuleSpecifier` so skip `from`
            // ModuleSpecifier is StringLiteral.
            if (stmt.specifiers.length === 0) {
                // import ModuleSpecifier ;
                return [
                    'import',
                    space,
                    // ModuleSpecifier
                    this.generateExpression(stmt.source, Precedence.Sequence, E_TTT),
                    this.semicolon(flags)
                ];
            }

            // import ImportClause FromClause ;
            result = [
                'import'
            ];
            cursor = 0;

            // ImportedBinding
            if (stmt.specifiers[cursor].type === Syntax.ImportDefaultSpecifier) {
                result = join(result, [
                        this.generateExpression(stmt.specifiers[cursor], Precedence.Sequence, E_TTT)
                ]);
                ++cursor;
            }

            if (stmt.specifiers[cursor]) {
                if (cursor !== 0) {
                    result.push(',');
                }

                if (stmt.specifiers[cursor].type === Syntax.ImportNamespaceSpecifier) {
                    // NameSpaceImport
                    result = join(result, [
                            space,
                            this.generateExpression(stmt.specifiers[cursor], Precedence.Sequence, E_TTT)
                    ]);
                } else {
                    // NamedImports
                    result.push(space + '{');

                    if ((stmt.specifiers.length - cursor) === 1) {
                        // import { ... } from "...";
                        result.push(space);
                        result.push(this.generateExpression(stmt.specifiers[cursor], Precedence.Sequence, E_TTT));
                        result.push(space + '}' + space);
                    } else {
                        // import {
                        //    ...,
                        //    ...,
                        // } from "...";
                        withIndent(function (indent) {
                            var i, iz;
                            result.push(newline);
                            for (i = cursor, iz = stmt.specifiers.length; i < iz; ++i) {
                                result.push(indent);
                                result.push(that.generateExpression(stmt.specifiers[i], Precedence.Sequence, E_TTT));
                                if (i + 1 < iz) {
                                    result.push(',' + newline);
                                }
                            }
                        });
                        if (!endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
                            result.push(newline);
                        }
                        result.push(base + '}' + space);
                    }
                }
            }

            result = join(result, [
                'from' + space,
                // ModuleSpecifier
                this.generateExpression(stmt.source, Precedence.Sequence, E_TTT),
                this.semicolon(flags)
            ]);
            return result;
        },

        VariableDeclarator: function (stmt, flags) {
            var itemFlags = (flags & F_ALLOW_IN) ? E_TTT : E_FTT;
            if (stmt.init) {
                return [
                    this.generateExpression(stmt.id, Precedence.Assignment, itemFlags),
                    space,
                    '=',
                    space,
                    this.generateExpression(stmt.init, Precedence.Assignment, itemFlags)
                ];
            }
            return this.generatePattern(stmt.id, Precedence.Assignment, itemFlags);
        },

        VariableDeclaration: function (stmt, flags) {
            // VariableDeclarator is typed as Statement,
            // but joined with comma (not LineTerminator).
            // So if comment is attached to target node, we should specialize.
            var result, i, iz, node, bodyFlags, that = this;

            result = [ stmt.kind ];

            bodyFlags = (flags & F_ALLOW_IN) ? S_TFFF : S_FFFF;

            function block() {
                node = stmt.declarations[0];
                if (extra.comment && node.leadingComments) {
                    result.push('\n');
                    result.push(addIndent(that.generateStatement(node, bodyFlags)));
                } else {
                    result.push(noEmptySpace());
                    result.push(that.generateStatement(node, bodyFlags));
                }

                for (i = 1, iz = stmt.declarations.length; i < iz; ++i) {
                    node = stmt.declarations[i];
                    if (extra.comment && node.leadingComments) {
                        result.push(',' + newline);
                        result.push(addIndent(that.generateStatement(node, bodyFlags)));
                    } else {
                        result.push(',' + space);
                        result.push(that.generateStatement(node, bodyFlags));
                    }
                }
            }

            if (stmt.declarations.length > 1) {
                withIndent(block);
            } else {
                block();
            }

            result.push(this.semicolon(flags));

            return result;
        },

        ThrowStatement: function (stmt, flags) {
            return [join(
                'throw',
                this.generateExpression(stmt.argument, Precedence.Sequence, E_TTT)
            ), this.semicolon(flags)];
        },

        TryStatement: function (stmt, flags) {
            var result, i, iz, guardedHandlers;

            result = ['try', this.maybeBlock(stmt.block, S_TFFF)];
            result = this.maybeBlockSuffix(stmt.block, result);

            if (stmt.handlers) {
                // old interface
                for (i = 0, iz = stmt.handlers.length; i < iz; ++i) {
                    result = join(result, this.generateStatement(stmt.handlers[i], S_TFFF));
                    if (stmt.finalizer || i + 1 !== iz) {
                        result = this.maybeBlockSuffix(stmt.handlers[i].body, result);
                    }
                }
            } else {
                guardedHandlers = stmt.guardedHandlers || [];

                for (i = 0, iz = guardedHandlers.length; i < iz; ++i) {
                    result = join(result, this.generateStatement(guardedHandlers[i], S_TFFF));
                    if (stmt.finalizer || i + 1 !== iz) {
                        result = this.maybeBlockSuffix(guardedHandlers[i].body, result);
                    }
                }

                // new interface
                if (stmt.handler) {
                    if (Array.isArray(stmt.handler)) {
                        for (i = 0, iz = stmt.handler.length; i < iz; ++i) {
                            result = join(result, this.generateStatement(stmt.handler[i], S_TFFF));
                            if (stmt.finalizer || i + 1 !== iz) {
                                result = this.maybeBlockSuffix(stmt.handler[i].body, result);
                            }
                        }
                    } else {
                        result = join(result, this.generateStatement(stmt.handler, S_TFFF));
                        if (stmt.finalizer) {
                            result = this.maybeBlockSuffix(stmt.handler.body, result);
                        }
                    }
                }
            }
            if (stmt.finalizer) {
                result = join(result, ['finally', this.maybeBlock(stmt.finalizer, S_TFFF)]);
            }
            return result;
        },

        SwitchStatement: function (stmt, flags) {
            var result, fragment, i, iz, bodyFlags, that = this;
            withIndent(function () {
                result = [
                    'switch' + space + '(',
                    that.generateExpression(stmt.discriminant, Precedence.Sequence, E_TTT),
                    ')' + space + '{' + newline
                ];
            });
            if (stmt.cases) {
                bodyFlags = S_TFFF;
                for (i = 0, iz = stmt.cases.length; i < iz; ++i) {
                    if (i === iz - 1) {
                        bodyFlags |= F_SEMICOLON_OPT;
                    }
                    fragment = addIndent(this.generateStatement(stmt.cases[i], bodyFlags));
                    result.push(fragment);
                    if (!endsWithLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) {
                        result.push(newline);
                    }
                }
            }
            result.push(addIndent('}'));
            return result;
        },

        SwitchCase: function (stmt, flags) {
            var result, fragment, i, iz, bodyFlags, that = this;
            withIndent(function () {
                if (stmt.test) {
                    result = [
                        join('case', that.generateExpression(stmt.test, Precedence.Sequence, E_TTT)),
                        ':'
                    ];
                } else {
                    result = ['default:'];
                }

                i = 0;
                iz = stmt.consequent.length;
                if (iz && stmt.consequent[0].type === Syntax.BlockStatement) {
                    fragment = that.maybeBlock(stmt.consequent[0], S_TFFF);
                    result.push(fragment);
                    i = 1;
                }

                if (i !== iz && !endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
                    result.push(newline);
                }

                bodyFlags = S_TFFF;
                for (; i < iz; ++i) {
                    if (i === iz - 1 && flags & F_SEMICOLON_OPT) {
                        bodyFlags |= F_SEMICOLON_OPT;
                    }
                    fragment = addIndent(that.generateStatement(stmt.consequent[i], bodyFlags));
                    result.push(fragment);
                    if (i + 1 !== iz && !endsWithLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) {
                        result.push(newline);
                    }
                }
            });
            return result;
        },

        IfStatement: function (stmt, flags) {
            var result, bodyFlags, semicolonOptional, that = this;
            withIndent(function () {
                result = [
                    'if' + space + '(',
                    that.generateExpression(stmt.test, Precedence.Sequence, E_TTT),
                    ')'
                ];
            });
            semicolonOptional = flags & F_SEMICOLON_OPT;
            bodyFlags = S_TFFF;
            if (semicolonOptional) {
                bodyFlags |= F_SEMICOLON_OPT;
            }
            if (stmt.alternate) {
                result.push(this.maybeBlock(stmt.consequent, S_TFFF));
                result = this.maybeBlockSuffix(stmt.consequent, result);
                if (stmt.alternate.type === Syntax.IfStatement) {
                    result = join(result, ['else ', this.generateStatement(stmt.alternate, bodyFlags)]);
                } else {
                    result = join(result, join('else', this.maybeBlock(stmt.alternate, bodyFlags)));
                }
            } else {
                result.push(this.maybeBlock(stmt.consequent, bodyFlags));
            }
            return result;
        },

        ForStatement: function (stmt, flags) {
            var result, that = this;
            withIndent(function () {
                result = ['for' + space + '('];
                if (stmt.init) {
                    if (stmt.init.type === Syntax.VariableDeclaration) {
                        result.push(that.generateStatement(stmt.init, S_FFFF));
                    } else {
                        // F_ALLOW_IN becomes false.
                        result.push(that.generateExpression(stmt.init, Precedence.Sequence, E_FTT));
                        result.push(';');
                    }
                } else {
                    result.push(';');
                }

                if (stmt.test) {
                    result.push(space);
                    result.push(that.generateExpression(stmt.test, Precedence.Sequence, E_TTT));
                    result.push(';');
                } else {
                    result.push(';');
                }

                if (stmt.update) {
                    result.push(space);
                    result.push(that.generateExpression(stmt.update, Precedence.Sequence, E_TTT));
                    result.push(')');
                } else {
                    result.push(')');
                }
            });

            result.push(this.maybeBlock(stmt.body, flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF));
            return result;
        },

        ForInStatement: function (stmt, flags) {
            return this.generateIterationForStatement('in', stmt, flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF);
        },

        ForOfStatement: function (stmt, flags) {
            return this.generateIterationForStatement('of', stmt, flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF);
        },

        LabeledStatement: function (stmt, flags) {
            return [stmt.label.name + ':', this.maybeBlock(stmt.body, flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF)];
        },

        Program: function (stmt, flags) {
            var result, fragment, i, iz, bodyFlags;
            iz = stmt.body.length;
            result = [safeConcatenation && iz > 0 ? '\n' : ''];
            bodyFlags = S_TFTF;
            for (i = 0; i < iz; ++i) {
                if (!safeConcatenation && i === iz - 1) {
                    bodyFlags |= F_SEMICOLON_OPT;
                }

                if (preserveBlankLines) {
                    // handle spaces before the first line
                    if (i === 0) {
                        if (!stmt.body[0].leadingComments) {
                            generateBlankLines(stmt.range[0], stmt.body[i].range[0], result);
                        }
                    }

                    // handle spaces between lines
                    if (i > 0) {
                        if (!stmt.body[i - 1].trailingComments && !stmt.body[i].leadingComments) {
                            generateBlankLines(stmt.body[i - 1].range[1], stmt.body[i].range[0], result);
                        }
                    }
                }

                fragment = addIndent(this.generateStatement(stmt.body[i], bodyFlags));
                result.push(fragment);
                if (i + 1 < iz && !endsWithLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) {
                    if (preserveBlankLines) {
                        if (!stmt.body[i + 1].leadingComments) {
                            result.push(newline);
                        }
                    } else {
                        result.push(newline);
                    }
                }

                if (preserveBlankLines) {
                    // handle spaces after the last line
                    if (i === iz - 1) {
                        if (!stmt.body[i].trailingComments) {
                            generateBlankLines(stmt.body[i].range[1], stmt.range[1], result);
                        }
                    }
                }
            }
            return result;
        },

        FunctionDeclaration: function (stmt, flags) {
            return [
                generateAsyncPrefix(stmt, true),
                'function',
                generateStarSuffix(stmt) || noEmptySpace(),
                stmt.id ? generateIdentifier(stmt.id) : '',
                this.generateFunctionBody(stmt)
            ];
        },

        ReturnStatement: function (stmt, flags) {
            if (stmt.argument) {
                return [join(
                    'return',
                    this.generateExpression(stmt.argument, Precedence.Sequence, E_TTT)
                ), this.semicolon(flags)];
            }
            return ['return' + this.semicolon(flags)];
        },

        WhileStatement: function (stmt, flags) {
            var result, that = this;
            withIndent(function () {
                result = [
                    'while' + space + '(',
                    that.generateExpression(stmt.test, Precedence.Sequence, E_TTT),
                    ')'
                ];
            });
            result.push(this.maybeBlock(stmt.body, flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF));
            return result;
        },

        WithStatement: function (stmt, flags) {
            var result, that = this;
            withIndent(function () {
                result = [
                    'with' + space + '(',
                    that.generateExpression(stmt.object, Precedence.Sequence, E_TTT),
                    ')'
                ];
            });
            result.push(this.maybeBlock(stmt.body, flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF));
            return result;
        }

    };

    merge(CodeGenerator.prototype, CodeGenerator.Statement);

    // Expressions.

    CodeGenerator.Expression = {

        SequenceExpression: function (expr, precedence, flags) {
            var result, i, iz;
            if (Precedence.Sequence < precedence) {
                flags |= F_ALLOW_IN;
            }
            result = [];
            for (i = 0, iz = expr.expressions.length; i < iz; ++i) {
                result.push(this.generateExpression(expr.expressions[i], Precedence.Assignment, flags));
                if (i + 1 < iz) {
                    result.push(',' + space);
                }
            }
            return parenthesize(result, Precedence.Sequence, precedence);
        },

        AssignmentExpression: function (expr, precedence, flags) {
            return this.generateAssignment(expr.left, expr.right, expr.operator, precedence, flags);
        },

        ArrowFunctionExpression: function (expr, precedence, flags) {
            return parenthesize(this.generateFunctionBody(expr), Precedence.ArrowFunction, precedence);
        },

        ConditionalExpression: function (expr, precedence, flags) {
            if (Precedence.Conditional < precedence) {
                flags |= F_ALLOW_IN;
            }
            return parenthesize(
                [
                    this.generateExpression(expr.test, Precedence.LogicalOR, flags),
                    space + '?' + space,
                    this.generateExpression(expr.consequent, Precedence.Assignment, flags),
                    space + ':' + space,
                    this.generateExpression(expr.alternate, Precedence.Assignment, flags)
                ],
                Precedence.Conditional,
                precedence
            );
        },

        LogicalExpression: function (expr, precedence, flags) {
            return this.BinaryExpression(expr, precedence, flags);
        },

        BinaryExpression: function (expr, precedence, flags) {
            var result, currentPrecedence, fragment, leftSource;
            currentPrecedence = BinaryPrecedence[expr.operator];

            if (currentPrecedence < precedence) {
                flags |= F_ALLOW_IN;
            }

            fragment = this.generateExpression(expr.left, currentPrecedence, flags);

            leftSource = fragment.toString();

            if (leftSource.charCodeAt(leftSource.length - 1) === 0x2F /* / */ && esutils.code.isIdentifierPartES5(expr.operator.charCodeAt(0))) {
                result = [fragment, noEmptySpace(), expr.operator];
            } else {
                result = join(fragment, expr.operator);
            }

            fragment = this.generateExpression(expr.right, currentPrecedence + 1, flags);

            if (expr.operator === '/' && fragment.toString().charAt(0) === '/' ||
            expr.operator.slice(-1) === '<' && fragment.toString().slice(0, 3) === '!--') {
                // If '/' concats with '/' or `<` concats with `!--`, it is interpreted as comment start
                result.push(noEmptySpace());
                result.push(fragment);
            } else {
                result = join(result, fragment);
            }

            if (expr.operator === 'in' && !(flags & F_ALLOW_IN)) {
                return ['(', result, ')'];
            }
            return parenthesize(result, currentPrecedence, precedence);
        },

        CallExpression: function (expr, precedence, flags) {
            var result, i, iz;
            // F_ALLOW_UNPARATH_NEW becomes false.
            result = [this.generateExpression(expr.callee, Precedence.Call, E_TTF)];
            result.push('(');
            for (i = 0, iz = expr['arguments'].length; i < iz; ++i) {
                result.push(this.generateExpression(expr['arguments'][i], Precedence.Assignment, E_TTT));
                if (i + 1 < iz) {
                    result.push(',' + space);
                }
            }
            result.push(')');

            if (!(flags & F_ALLOW_CALL)) {
                return ['(', result, ')'];
            }
            return parenthesize(result, Precedence.Call, precedence);
        },

        NewExpression: function (expr, precedence, flags) {
            var result, length, i, iz, itemFlags;
            length = expr['arguments'].length;

            // F_ALLOW_CALL becomes false.
            // F_ALLOW_UNPARATH_NEW may become false.
            itemFlags = (flags & F_ALLOW_UNPARATH_NEW && !parentheses && length === 0) ? E_TFT : E_TFF;

            result = join(
                'new',
                this.generateExpression(expr.callee, Precedence.New, itemFlags)
            );

            if (!(flags & F_ALLOW_UNPARATH_NEW) || parentheses || length > 0) {
                result.push('(');
                for (i = 0, iz = length; i < iz; ++i) {
                    result.push(this.generateExpression(expr['arguments'][i], Precedence.Assignment, E_TTT));
                    if (i + 1 < iz) {
                        result.push(',' + space);
                    }
                }
                result.push(')');
            }

            return parenthesize(result, Precedence.New, precedence);
        },

        MemberExpression: function (expr, precedence, flags) {
            var result, fragment;

            // F_ALLOW_UNPARATH_NEW becomes false.
            result = [this.generateExpression(expr.object, Precedence.Call, (flags & F_ALLOW_CALL) ? E_TTF : E_TFF)];

            if (expr.computed) {
                result.push('[');
                result.push(this.generateExpression(expr.property, Precedence.Sequence, flags & F_ALLOW_CALL ? E_TTT : E_TFT));
                result.push(']');
            } else {
                if (expr.object.type === Syntax.Literal && typeof expr.object.value === 'number') {
                    fragment = toSourceNodeWhenNeeded(result).toString();
                    // When the following conditions are all true,
                    //   1. No floating point
                    //   2. Don't have exponents
                    //   3. The last character is a decimal digit
                    //   4. Not hexadecimal OR octal number literal
                    // we should add a floating point.
                    if (
                            fragment.indexOf('.') < 0 &&
                            !/[eExX]/.test(fragment) &&
                            esutils.code.isDecimalDigit(fragment.charCodeAt(fragment.length - 1)) &&
                            !(fragment.length >= 2 && fragment.charCodeAt(0) === 48)  // '0'
                            ) {
                        result.push(' ');
                    }
                }
                result.push('.');
                result.push(generateIdentifier(expr.property));
            }

            return parenthesize(result, Precedence.Member, precedence);
        },

        MetaProperty: function (expr, precedence, flags) {
            var result;
            result = [];
            result.push(expr.meta);
            result.push('.');
            result.push(expr.property);
            return parenthesize(result, Precedence.Member, precedence);
        },

        UnaryExpression: function (expr, precedence, flags) {
            var result, fragment, rightCharCode, leftSource, leftCharCode;
            fragment = this.generateExpression(expr.argument, Precedence.Unary, E_TTT);

            if (space === '') {
                result = join(expr.operator, fragment);
            } else {
                result = [expr.operator];
                if (expr.operator.length > 2) {
                    // delete, void, typeof
                    // get `typeof []`, not `typeof[]`
                    result = join(result, fragment);
                } else {
                    // Prevent inserting spaces between operator and argument if it is unnecessary
                    // like, `!cond`
                    leftSource = toSourceNodeWhenNeeded(result).toString();
                    leftCharCode = leftSource.charCodeAt(leftSource.length - 1);
                    rightCharCode = fragment.toString().charCodeAt(0);

                    if (((leftCharCode === 0x2B  /* + */ || leftCharCode === 0x2D  /* - */) && leftCharCode === rightCharCode) ||
                            (esutils.code.isIdentifierPartES5(leftCharCode) && esutils.code.isIdentifierPartES5(rightCharCode))) {
                        result.push(noEmptySpace());
                        result.push(fragment);
                    } else {
                        result.push(fragment);
                    }
                }
            }
            return parenthesize(result, Precedence.Unary, precedence);
        },

        YieldExpression: function (expr, precedence, flags) {
            var result;
            if (expr.delegate) {
                result = 'yield*';
            } else {
                result = 'yield';
            }
            if (expr.argument) {
                result = join(
                    result,
                    this.generateExpression(expr.argument, Precedence.Yield, E_TTT)
                );
            }
            return parenthesize(result, Precedence.Yield, precedence);
        },

        AwaitExpression: function (expr, precedence, flags) {
            var result = join(
                expr.all ? 'await*' : 'await',
                this.generateExpression(expr.argument, Precedence.Await, E_TTT)
            );
            return parenthesize(result, Precedence.Await, precedence);
        },

        UpdateExpression: function (expr, precedence, flags) {
            if (expr.prefix) {
                return parenthesize(
                    [
                        expr.operator,
                        this.generateExpression(expr.argument, Precedence.Unary, E_TTT)
                    ],
                    Precedence.Unary,
                    precedence
                );
            }
            return parenthesize(
                [
                    this.generateExpression(expr.argument, Precedence.Postfix, E_TTT),
                    expr.operator
                ],
                Precedence.Postfix,
                precedence
            );
        },

        FunctionExpression: function (expr, precedence, flags) {
            var result = [
                generateAsyncPrefix(expr, true),
                'function'
            ];
            if (expr.id) {
                result.push(generateStarSuffix(expr) || noEmptySpace());
                result.push(generateIdentifier(expr.id));
            } else {
                result.push(generateStarSuffix(expr) || space);
            }
            result.push(this.generateFunctionBody(expr));
            return result;
        },

        ArrayPattern: function (expr, precedence, flags) {
            return this.ArrayExpression(expr, precedence, flags, true);
        },

        ArrayExpression: function (expr, precedence, flags, isPattern) {
            var result, multiline, that = this;
            if (!expr.elements.length) {
                return '[]';
            }
            multiline = isPattern ? false : expr.elements.length > 1;
            result = ['[', multiline ? newline : ''];
            withIndent(function (indent) {
                var i, iz;
                for (i = 0, iz = expr.elements.length; i < iz; ++i) {
                    if (!expr.elements[i]) {
                        if (multiline) {
                            result.push(indent);
                        }
                        if (i + 1 === iz) {
                            result.push(',');
                        }
                    } else {
                        result.push(multiline ? indent : '');
                        result.push(that.generateExpression(expr.elements[i], Precedence.Assignment, E_TTT));
                    }
                    if (i + 1 < iz) {
                        result.push(',' + (multiline ? newline : space));
                    }
                }
            });
            if (multiline && !endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
                result.push(newline);
            }
            result.push(multiline ? base : '');
            result.push(']');
            return result;
        },

        RestElement: function(expr, precedence, flags) {
            return '...' + this.generatePattern(expr.argument);
        },

        ClassExpression: function (expr, precedence, flags) {
            var result, fragment;
            result = ['class'];
            if (expr.id) {
                result = join(result, this.generateExpression(expr.id, Precedence.Sequence, E_TTT));
            }
            if (expr.superClass) {
                fragment = join('extends', this.generateExpression(expr.superClass, Precedence.Assignment, E_TTT));
                result = join(result, fragment);
            }
            result.push(space);
            result.push(this.generateStatement(expr.body, S_TFFT));
            return result;
        },

        MethodDefinition: function (expr, precedence, flags) {
            var result, fragment;
            if (expr['static']) {
                result = ['static' + space];
            } else {
                result = [];
            }
            if (expr.kind === 'get' || expr.kind === 'set') {
                fragment = [
                    join(expr.kind, this.generatePropertyKey(expr.key, expr.computed)),
                    this.generateFunctionBody(expr.value)
                ];
            } else {
                fragment = [
                    generateMethodPrefix(expr),
                    this.generatePropertyKey(expr.key, expr.computed),
                    this.generateFunctionBody(expr.value)
                ];
            }
            return join(result, fragment);
        },

        Property: function (expr, precedence, flags) {
            if (expr.kind === 'get' || expr.kind === 'set') {
                return [
                    expr.kind, noEmptySpace(),
                    this.generatePropertyKey(expr.key, expr.computed),
                    this.generateFunctionBody(expr.value)
                ];
            }

            if (expr.shorthand) {
                if (expr.value.type === "AssignmentPattern") {
                    return this.AssignmentPattern(expr.value, Precedence.Sequence, E_TTT);
                }
                return this.generatePropertyKey(expr.key, expr.computed);
            }

            if (expr.method) {
                return [
                    generateMethodPrefix(expr),
                    this.generatePropertyKey(expr.key, expr.computed),
                    this.generateFunctionBody(expr.value)
                ];
            }

            return [
                this.generatePropertyKey(expr.key, expr.computed),
                ':' + space,
                this.generateExpression(expr.value, Precedence.Assignment, E_TTT)
            ];
        },

        ObjectExpression: function (expr, precedence, flags) {
            var multiline, result, fragment, that = this;

            if (!expr.properties.length) {
                return '{}';
            }
            multiline = expr.properties.length > 1;

            withIndent(function () {
                fragment = that.generateExpression(expr.properties[0], Precedence.Sequence, E_TTT);
            });

            if (!multiline) {
                // issues 4
                // Do not transform from
                //   dejavu.Class.declare({
                //       method2: function () {}
                //   });
                // to
                //   dejavu.Class.declare({method2: function () {
                //       }});
                if (!hasLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) {
                    return [ '{', space, fragment, space, '}' ];
                }
            }

            withIndent(function (indent) {
                var i, iz;
                result = [ '{', newline, indent, fragment ];

                if (multiline) {
                    result.push(',' + newline);
                    for (i = 1, iz = expr.properties.length; i < iz; ++i) {
                        result.push(indent);
                        result.push(that.generateExpression(expr.properties[i], Precedence.Sequence, E_TTT));
                        if (i + 1 < iz) {
                            result.push(',' + newline);
                        }
                    }
                }
            });

            if (!endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
                result.push(newline);
            }
            result.push(base);
            result.push('}');
            return result;
        },

        AssignmentPattern: function(expr, precedence, flags) {
            return this.generateAssignment(expr.left, expr.right, '=', precedence, flags);
        },

        ObjectPattern: function (expr, precedence, flags) {
            var result, i, iz, multiline, property, that = this;
            if (!expr.properties.length) {
                return '{}';
            }

            multiline = false;
            if (expr.properties.length === 1) {
                property = expr.properties[0];
                if (property.value.type !== Syntax.Identifier) {
                    multiline = true;
                }
            } else {
                for (i = 0, iz = expr.properties.length; i < iz; ++i) {
                    property = expr.properties[i];
                    if (!property.shorthand) {
                        multiline = true;
                        break;
                    }
                }
            }
            result = ['{', multiline ? newline : '' ];

            withIndent(function (indent) {
                var i, iz;
                for (i = 0, iz = expr.properties.length; i < iz; ++i) {
                    result.push(multiline ? indent : '');
                    result.push(that.generateExpression(expr.properties[i], Precedence.Sequence, E_TTT));
                    if (i + 1 < iz) {
                        result.push(',' + (multiline ? newline : space));
                    }
                }
            });

            if (multiline && !endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
                result.push(newline);
            }
            result.push(multiline ? base : '');
            result.push('}');
            return result;
        },

        ThisExpression: function (expr, precedence, flags) {
            return 'this';
        },

        Super: function (expr, precedence, flags) {
            return 'super';
        },

        Identifier: function (expr, precedence, flags) {
            return generateIdentifier(expr);
        },

        ImportDefaultSpecifier: function (expr, precedence, flags) {
            return generateIdentifier(expr.id || expr.local);
        },

        ImportNamespaceSpecifier: function (expr, precedence, flags) {
            var result = ['*'];
            var id = expr.id || expr.local;
            if (id) {
                result.push(space + 'as' + noEmptySpace() + generateIdentifier(id));
            }
            return result;
        },

        ImportSpecifier: function (expr, precedence, flags) {
            var imported = expr.imported;
            var result = [ imported.name ];
            var local = expr.local;
            if (local && local.name !== imported.name) {
                result.push(noEmptySpace() + 'as' + noEmptySpace() + generateIdentifier(local));
            }
            return result;
        },

        ExportSpecifier: function (expr, precedence, flags) {
            var local = expr.local;
            var result = [ local.name ];
            var exported = expr.exported;
            if (exported && exported.name !== local.name) {
                result.push(noEmptySpace() + 'as' + noEmptySpace() + generateIdentifier(exported));
            }
            return result;
        },

        Literal: function (expr, precedence, flags) {
            var raw;
            if (expr.hasOwnProperty('raw') && parse && extra.raw) {
                try {
                    raw = parse(expr.raw).body[0].expression;
                    if (raw.type === Syntax.Literal) {
                        if (raw.value === expr.value) {
                            return expr.raw;
                        }
                    }
                } catch (e) {
                    // not use raw property
                }
            }

            if (expr.value === null) {
                return 'null';
            }

            if (typeof expr.value === 'string') {
                return escapeString(expr.value);
            }

            if (typeof expr.value === 'number') {
                return generateNumber(expr.value);
            }

            if (typeof expr.value === 'boolean') {
                return expr.value ? 'true' : 'false';
            }

            if (expr.regex) {
              return '/' + expr.regex.pattern + '/' + expr.regex.flags;
            }
            return generateRegExp(expr.value);
        },

        GeneratorExpression: function (expr, precedence, flags) {
            return this.ComprehensionExpression(expr, precedence, flags);
        },

        ComprehensionExpression: function (expr, precedence, flags) {
            // GeneratorExpression should be parenthesized with (...), ComprehensionExpression with [...]
            // Due to https://bugzilla.mozilla.org/show_bug.cgi?id=883468 position of expr.body can differ in Spidermonkey and ES6

            var result, i, iz, fragment, that = this;
            result = (expr.type === Syntax.GeneratorExpression) ? ['('] : ['['];

            if (extra.moz.comprehensionExpressionStartsWithAssignment) {
                fragment = this.generateExpression(expr.body, Precedence.Assignment, E_TTT);
                result.push(fragment);
            }

            if (expr.blocks) {
                withIndent(function () {
                    for (i = 0, iz = expr.blocks.length; i < iz; ++i) {
                        fragment = that.generateExpression(expr.blocks[i], Precedence.Sequence, E_TTT);
                        if (i > 0 || extra.moz.comprehensionExpressionStartsWithAssignment) {
                            result = join(result, fragment);
                        } else {
                            result.push(fragment);
                        }
                    }
                });
            }

            if (expr.filter) {
                result = join(result, 'if' + space);
                fragment = this.generateExpression(expr.filter, Precedence.Sequence, E_TTT);
                result = join(result, [ '(', fragment, ')' ]);
            }

            if (!extra.moz.comprehensionExpressionStartsWithAssignment) {
                fragment = this.generateExpression(expr.body, Precedence.Assignment, E_TTT);

                result = join(result, fragment);
            }

            result.push((expr.type === Syntax.GeneratorExpression) ? ')' : ']');
            return result;
        },

        ComprehensionBlock: function (expr, precedence, flags) {
            var fragment;
            if (expr.left.type === Syntax.VariableDeclaration) {
                fragment = [
                    expr.left.kind, noEmptySpace(),
                    this.generateStatement(expr.left.declarations[0], S_FFFF)
                ];
            } else {
                fragment = this.generateExpression(expr.left, Precedence.Call, E_TTT);
            }

            fragment = join(fragment, expr.of ? 'of' : 'in');
            fragment = join(fragment, this.generateExpression(expr.right, Precedence.Sequence, E_TTT));

            return [ 'for' + space + '(', fragment, ')' ];
        },

        SpreadElement: function (expr, precedence, flags) {
            return [
                '...',
                this.generateExpression(expr.argument, Precedence.Assignment, E_TTT)
            ];
        },

        TaggedTemplateExpression: function (expr, precedence, flags) {
            var itemFlags = E_TTF;
            if (!(flags & F_ALLOW_CALL)) {
                itemFlags = E_TFF;
            }
            var result = [
                this.generateExpression(expr.tag, Precedence.Call, itemFlags),
                this.generateExpression(expr.quasi, Precedence.Primary, E_FFT)
            ];
            return parenthesize(result, Precedence.TaggedTemplate, precedence);
        },

        TemplateElement: function (expr, precedence, flags) {
            // Don't use "cooked". Since tagged template can use raw template
            // representation. So if we do so, it breaks the script semantics.
            return expr.value.raw;
        },

        TemplateLiteral: function (expr, precedence, flags) {
            var result, i, iz;
            result = [ '`' ];
            for (i = 0, iz = expr.quasis.length; i < iz; ++i) {
                result.push(this.generateExpression(expr.quasis[i], Precedence.Primary, E_TTT));
                if (i + 1 < iz) {
                    result.push('${' + space);
                    result.push(this.generateExpression(expr.expressions[i], Precedence.Sequence, E_TTT));
                    result.push(space + '}');
                }
            }
            result.push('`');
            return result;
        },

        ModuleSpecifier: function (expr, precedence, flags) {
            return this.Literal(expr, precedence, flags);
        }

    };

    merge(CodeGenerator.prototype, CodeGenerator.Expression);

    CodeGenerator.prototype.generateExpression = function (expr, precedence, flags) {
        var result, type;

        type = expr.type || Syntax.Property;

        if (extra.verbatim && expr.hasOwnProperty(extra.verbatim)) {
            return generateVerbatim(expr, precedence);
        }

        result = this[type](expr, precedence, flags);


        if (extra.comment) {
            result = addComments(expr, result);
        }
        return toSourceNodeWhenNeeded(result, expr);
    };

    CodeGenerator.prototype.generateStatement = function (stmt, flags) {
        var result,
            fragment;

        result = this[stmt.type](stmt, flags);

        // Attach comments

        if (extra.comment) {
            result = addComments(stmt, result);
        }

        fragment = toSourceNodeWhenNeeded(result).toString();
        if (stmt.type === Syntax.Program && !safeConcatenation && newline === '' &&  fragment.charAt(fragment.length - 1) === '\n') {
            result = sourceMap ? toSourceNodeWhenNeeded(result).replaceRight(/\s+$/, '') : fragment.replace(/\s+$/, '');
        }

        return toSourceNodeWhenNeeded(result, stmt);
    };

    function generateInternal(node) {
        var codegen;

        codegen = new CodeGenerator();
        if (isStatement(node)) {
            return codegen.generateStatement(node, S_TFFF);
        }

        if (isExpression(node)) {
            return codegen.generateExpression(node, Precedence.Sequence, E_TTT);
        }

        throw new Error('Unknown node type: ' + node.type);
    }

    function generate(node, options) {
        var defaultOptions = getDefaultOptions(), result, pair;

        if (options != null) {
            // Obsolete options
            //
            //   `options.indent`
            //   `options.base`
            //
            // Instead of them, we can use `option.format.indent`.
            if (typeof options.indent === 'string') {
                defaultOptions.format.indent.style = options.indent;
            }
            if (typeof options.base === 'number') {
                defaultOptions.format.indent.base = options.base;
            }
            options = updateDeeply(defaultOptions, options);
            indent = options.format.indent.style;
            if (typeof options.base === 'string') {
                base = options.base;
            } else {
                base = stringRepeat(indent, options.format.indent.base);
            }
        } else {
            options = defaultOptions;
            indent = options.format.indent.style;
            base = stringRepeat(indent, options.format.indent.base);
        }
        json = options.format.json;
        renumber = options.format.renumber;
        hexadecimal = json ? false : options.format.hexadecimal;
        quotes = json ? 'double' : options.format.quotes;
        escapeless = options.format.escapeless;
        newline = options.format.newline;
        space = options.format.space;
        if (options.format.compact) {
            newline = space = indent = base = '';
        }
        parentheses = options.format.parentheses;
        semicolons = options.format.semicolons;
        safeConcatenation = options.format.safeConcatenation;
        directive = options.directive;
        parse = json ? null : options.parse;
        sourceMap = options.sourceMap;
        sourceCode = options.sourceCode;
        preserveBlankLines = options.format.preserveBlankLines && sourceCode !== null;
        extra = options;

        if (sourceMap) {
            if (!exports.browser) {
                // We assume environment is node.js
                // And prevent from including source-map by browserify
                SourceNode = __webpack_require__(39).SourceNode;
            } else {
                SourceNode = global.sourceMap.SourceNode;
            }
        }

        result = generateInternal(node);

        if (!sourceMap) {
            pair = {code: result.toString(), map: null};
            return options.sourceMapWithCode ? pair : pair.code;
        }


        pair = result.toStringWithSourceMap({
            file: options.file,
            sourceRoot: options.sourceMapRoot
        });

        if (options.sourceContent) {
            pair.map.setSourceContent(options.sourceMap,
                                      options.sourceContent);
        }

        if (options.sourceMapWithCode) {
            return pair;
        }

        return pair.map.toString();
    }

    FORMAT_MINIFY = {
        indent: {
            style: '',
            base: 0
        },
        renumber: true,
        hexadecimal: true,
        quotes: 'auto',
        escapeless: true,
        compact: true,
        parentheses: false,
        semicolons: false
    };

    FORMAT_DEFAULTS = getDefaultOptions().format;

    exports.version = __webpack_require__(32).version;
    exports.generate = generate;
    exports.attachComments = estraverse.attachComments;
    exports.Precedence = updateDeeply({}, Precedence);
    exports.browser = false;
    exports.FORMAT_MINIFY = FORMAT_MINIFY;
    exports.FORMAT_DEFAULTS = FORMAT_DEFAULTS;
}());
/* vim: set sw=4 ts=4 et tw=80 : */

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(8)))

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var unparse = __webpack_require__(45).generate;

module.exports = function (ast, vars) {
    if (!vars) vars = {};
    var FAIL = {};
    
    var result = (function walk (node, scopeVars) {
        if (node.type === 'Literal') {
            return node.value;
        }
        else if (node.type === 'UnaryExpression'){
            var val = walk(node.argument)
            if (node.operator === '+') return +val
            if (node.operator === '-') return -val
            if (node.operator === '~') return ~val
            if (node.operator === '!') return !val
            return FAIL
        }
        else if (node.type === 'ArrayExpression') {
            var xs = [];
            for (var i = 0, l = node.elements.length; i < l; i++) {
                var x = walk(node.elements[i]);
                if (x === FAIL) return FAIL;
                xs.push(x);
            }
            return xs;
        }
        else if (node.type === 'ObjectExpression') {
            var obj = {};
            for (var i = 0; i < node.properties.length; i++) {
                var prop = node.properties[i];
                var value = prop.value === null
                    ? prop.value
                    : walk(prop.value)
                ;
                if (value === FAIL) return FAIL;
                obj[prop.key.value || prop.key.name] = value;
            }
            return obj;
        }
        else if (node.type === 'BinaryExpression' ||
                 node.type === 'LogicalExpression') {
            var l = walk(node.left);
            if (l === FAIL) return FAIL;
            var r = walk(node.right);
            if (r === FAIL) return FAIL;
            
            var op = node.operator;
            if (op === '==') return l == r;
            if (op === '===') return l === r;
            if (op === '!=') return l != r;
            if (op === '!==') return l !== r;
            if (op === '+') return l + r;
            if (op === '-') return l - r;
            if (op === '*') return l * r;
            if (op === '/') return l / r;
            if (op === '%') return l % r;
            if (op === '<') return l < r;
            if (op === '<=') return l <= r;
            if (op === '>') return l > r;
            if (op === '>=') return l >= r;
            if (op === '|') return l | r;
            if (op === '&') return l & r;
            if (op === '^') return l ^ r;
            if (op === '&&') return l && r;
            if (op === '||') return l || r;
            
            return FAIL;
        }
        else if (node.type === 'Identifier') {
            if ({}.hasOwnProperty.call(vars, node.name)) {
                return vars[node.name];
            }
            else return FAIL;
        }
        else if (node.type === 'ThisExpression') {
            if ({}.hasOwnProperty.call(vars, 'this')) {
                return vars['this'];
            }
            else return FAIL;
        }
        else if (node.type === 'CallExpression') {
            var callee = walk(node.callee);
            if (callee === FAIL) return FAIL;
            if (typeof callee !== 'function') return FAIL;
            
            var ctx = node.callee.object ? walk(node.callee.object) : FAIL;
            if (ctx === FAIL) ctx = null;

            var args = [];
            for (var i = 0, l = node.arguments.length; i < l; i++) {
                var x = walk(node.arguments[i]);
                if (x === FAIL) return FAIL;
                args.push(x);
            }
            return callee.apply(ctx, args);
        }
        else if (node.type === 'MemberExpression') {
            var obj = walk(node.object);
            // do not allow access to methods on Function 
            if((obj === FAIL) || (typeof obj == 'function')){
                return FAIL;
            }
            if (node.property.type === 'Identifier') {
                return obj[node.property.name];
            }
            var prop = walk(node.property);
            if (prop === FAIL) return FAIL;
            return obj[prop];
        }
        else if (node.type === 'ConditionalExpression') {
            var val = walk(node.test)
            if (val === FAIL) return FAIL;
            return val ? walk(node.consequent) : walk(node.alternate)
        }
        else if (node.type === 'ExpressionStatement') {
            var val = walk(node.expression)
            if (val === FAIL) return FAIL;
            return val;
        }
        else if (node.type === 'ReturnStatement') {
            return walk(node.argument)
        }
        else if (node.type === 'FunctionExpression') {
            
            var bodies = node.body.body;
            
            // Create a "scope" for our arguments
            var oldVars = {};
            Object.keys(vars).forEach(function(element){
                oldVars[element] = vars[element];
            })

            node.params.forEach(function(key) {
                if(key.type == 'Identifier'){
                  vars[key.name] = null;
                }
            });
            for(var i in bodies){
                if(walk(bodies[i]) === FAIL){
                    return FAIL;
                }
            }
            // restore the vars and scope after we walk
            vars = oldVars;
            
            var keys = Object.keys(vars);
            var vals = keys.map(function(key) {
                return vars[key];
            });
            return Function(keys.join(', '), 'return ' + unparse(node)).apply(null, vals);
        }
        else if (node.type === 'TemplateLiteral') {
            var str = '';
            for (var i = 0; i < node.expressions.length; i++) {
                str += walk(node.quasis[i]);
                str += walk(node.expressions[i]);
            }
            str += walk(node.quasis[i]);
            return str;
        }
        else if (node.type === 'TaggedTemplateExpression') {
            var tag = walk(node.tag);
            var quasi = node.quasi;
            var strings = quasi.quasis.map(walk);
            var values = quasi.expressions.map(walk);
            return tag.apply(null, [strings].concat(values));
        }
        else if (node.type === 'TemplateElement') {
            return node.value.cooked;
        }
        else return FAIL;
    })(ast);
    
    return result === FAIL ? undefined : result;
};


/***/ }),
/* 47 */
/***/ (function(module, exports) {

module.exports = function(arr, start, end, step) {

  if (typeof start == 'string') throw new Error("start cannot be a string");
  if (typeof end == 'string') throw new Error("end cannot be a string");
  if (typeof step == 'string') throw new Error("step cannot be a string");

  var len = arr.length;

  if (step === 0) throw new Error("step cannot be zero");
  step = step ? integer(step) : 1;

  // normalize negative values
  start = start < 0 ? len + start : start;
  end = end < 0 ? len + end : end;

  // default extents to extents
  start = integer(start === 0 ? 0 : !start ? (step > 0 ? 0 : len - 1) : start);
  end = integer(end === 0 ? 0 : !end ? (step > 0 ? len : -1) : end);

  // clamp extents
  start = step > 0 ? Math.max(0, start) : Math.min(len, start);
  end = step > 0 ? Math.min(end, len) : Math.max(-1, end);

  // return empty if extents are backwards
  if (step > 0 && end <= start) return [];
  if (step < 0 && start <= end) return [];

  var result = [];

  for (var i = start; i != end; i += step) {
    if ((step < 0 && i <= end) || (step > 0 && i >= end)) break;
    result.push(arr[i]);
  }

  return result;
}

function integer(val) {
  return String(val).match(/^[0-9]+$/) ? parseInt(val) :
    Number.isFinite(val) ? parseInt(val, 10) : 0;
}


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
  Copyright (C) 2013 Ariya Hidayat <ariya.hidayat@gmail.com>
  Copyright (C) 2013 Thaddee Tyl <thaddee.tyl@gmail.com>
  Copyright (C) 2013 Mathias Bynens <mathias@qiwi.be>
  Copyright (C) 2012 Ariya Hidayat <ariya.hidayat@gmail.com>
  Copyright (C) 2012 Mathias Bynens <mathias@qiwi.be>
  Copyright (C) 2012 Joost-Wim Boekesteijn <joost-wim@boekesteijn.nl>
  Copyright (C) 2012 Kris Kowal <kris.kowal@cixar.com>
  Copyright (C) 2012 Yusuke Suzuki <utatane.tea@gmail.com>
  Copyright (C) 2012 Arpad Borsos <arpad.borsos@googlemail.com>
  Copyright (C) 2011 Ariya Hidayat <ariya.hidayat@gmail.com>

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

/*jslint bitwise:true plusplus:true */
/*global esprima:true, define:true, exports:true, window: true,
throwErrorTolerant: true,
throwError: true, generateStatement: true, peek: true,
parseAssignmentExpression: true, parseBlock: true, parseExpression: true,
parseFunctionDeclaration: true, parseFunctionExpression: true,
parseFunctionSourceElements: true, parseVariableIdentifier: true,
parseLeftHandSideExpression: true,
parseUnaryExpression: true,
parseStatement: true, parseSourceElement: true */

(function (root, factory) {
    'use strict';

    // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js,
    // Rhino, and plain browser loading.

    /* istanbul ignore next */
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
}(this, function (exports) {
    'use strict';

    var Token,
        TokenName,
        FnExprTokens,
        Syntax,
        PropertyKind,
        Messages,
        Regex,
        SyntaxTreeDelegate,
        source,
        strict,
        index,
        lineNumber,
        lineStart,
        length,
        delegate,
        lookahead,
        state,
        extra;

    Token = {
        BooleanLiteral: 1,
        EOF: 2,
        Identifier: 3,
        Keyword: 4,
        NullLiteral: 5,
        NumericLiteral: 6,
        Punctuator: 7,
        StringLiteral: 8,
        RegularExpression: 9
    };

    TokenName = {};
    TokenName[Token.BooleanLiteral] = 'Boolean';
    TokenName[Token.EOF] = '<end>';
    TokenName[Token.Identifier] = 'Identifier';
    TokenName[Token.Keyword] = 'Keyword';
    TokenName[Token.NullLiteral] = 'Null';
    TokenName[Token.NumericLiteral] = 'Numeric';
    TokenName[Token.Punctuator] = 'Punctuator';
    TokenName[Token.StringLiteral] = 'String';
    TokenName[Token.RegularExpression] = 'RegularExpression';

    // A function following one of those tokens is an expression.
    FnExprTokens = ['(', '{', '[', 'in', 'typeof', 'instanceof', 'new',
                    'return', 'case', 'delete', 'throw', 'void',
                    // assignment operators
                    '=', '+=', '-=', '*=', '/=', '%=', '<<=', '>>=', '>>>=',
                    '&=', '|=', '^=', ',',
                    // binary/unary operators
                    '+', '-', '*', '/', '%', '++', '--', '<<', '>>', '>>>', '&',
                    '|', '^', '!', '~', '&&', '||', '?', ':', '===', '==', '>=',
                    '<=', '<', '>', '!=', '!=='];

    Syntax = {
        AssignmentExpression: 'AssignmentExpression',
        ArrayExpression: 'ArrayExpression',
        BlockStatement: 'BlockStatement',
        BinaryExpression: 'BinaryExpression',
        BreakStatement: 'BreakStatement',
        CallExpression: 'CallExpression',
        CatchClause: 'CatchClause',
        ConditionalExpression: 'ConditionalExpression',
        ContinueStatement: 'ContinueStatement',
        DoWhileStatement: 'DoWhileStatement',
        DebuggerStatement: 'DebuggerStatement',
        EmptyStatement: 'EmptyStatement',
        ExpressionStatement: 'ExpressionStatement',
        ForStatement: 'ForStatement',
        ForInStatement: 'ForInStatement',
        FunctionDeclaration: 'FunctionDeclaration',
        FunctionExpression: 'FunctionExpression',
        Identifier: 'Identifier',
        IfStatement: 'IfStatement',
        Literal: 'Literal',
        LabeledStatement: 'LabeledStatement',
        LogicalExpression: 'LogicalExpression',
        MemberExpression: 'MemberExpression',
        NewExpression: 'NewExpression',
        ObjectExpression: 'ObjectExpression',
        Program: 'Program',
        Property: 'Property',
        ReturnStatement: 'ReturnStatement',
        SequenceExpression: 'SequenceExpression',
        SwitchStatement: 'SwitchStatement',
        SwitchCase: 'SwitchCase',
        ThisExpression: 'ThisExpression',
        ThrowStatement: 'ThrowStatement',
        TryStatement: 'TryStatement',
        UnaryExpression: 'UnaryExpression',
        UpdateExpression: 'UpdateExpression',
        VariableDeclaration: 'VariableDeclaration',
        VariableDeclarator: 'VariableDeclarator',
        WhileStatement: 'WhileStatement',
        WithStatement: 'WithStatement'
    };

    PropertyKind = {
        Data: 1,
        Get: 2,
        Set: 4
    };

    // Error messages should be identical to V8.
    Messages = {
        UnexpectedToken:  'Unexpected token %0',
        UnexpectedNumber:  'Unexpected number',
        UnexpectedString:  'Unexpected string',
        UnexpectedIdentifier:  'Unexpected identifier',
        UnexpectedReserved:  'Unexpected reserved word',
        UnexpectedEOS:  'Unexpected end of input',
        NewlineAfterThrow:  'Illegal newline after throw',
        InvalidRegExp: 'Invalid regular expression',
        UnterminatedRegExp:  'Invalid regular expression: missing /',
        InvalidLHSInAssignment:  'Invalid left-hand side in assignment',
        InvalidLHSInForIn:  'Invalid left-hand side in for-in',
        MultipleDefaultsInSwitch: 'More than one default clause in switch statement',
        NoCatchOrFinally:  'Missing catch or finally after try',
        UnknownLabel: 'Undefined label \'%0\'',
        Redeclaration: '%0 \'%1\' has already been declared',
        IllegalContinue: 'Illegal continue statement',
        IllegalBreak: 'Illegal break statement',
        IllegalReturn: 'Illegal return statement',
        StrictModeWith:  'Strict mode code may not include a with statement',
        StrictCatchVariable:  'Catch variable may not be eval or arguments in strict mode',
        StrictVarName:  'Variable name may not be eval or arguments in strict mode',
        StrictParamName:  'Parameter name eval or arguments is not allowed in strict mode',
        StrictParamDupe: 'Strict mode function may not have duplicate parameter names',
        StrictFunctionName:  'Function name may not be eval or arguments in strict mode',
        StrictOctalLiteral:  'Octal literals are not allowed in strict mode.',
        StrictDelete:  'Delete of an unqualified identifier in strict mode.',
        StrictDuplicateProperty:  'Duplicate data property in object literal not allowed in strict mode',
        AccessorDataProperty:  'Object literal may not have data and accessor property with the same name',
        AccessorGetSet:  'Object literal may not have multiple get/set accessors with the same name',
        StrictLHSAssignment:  'Assignment to eval or arguments is not allowed in strict mode',
        StrictLHSPostfix:  'Postfix increment/decrement may not have eval or arguments operand in strict mode',
        StrictLHSPrefix:  'Prefix increment/decrement may not have eval or arguments operand in strict mode',
        StrictReservedWord:  'Use of future reserved word in strict mode'
    };

    // See also tools/generate-unicode-regex.py.
    Regex = {
        NonAsciiIdentifierStart: new RegExp('[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F0\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]'),
        NonAsciiIdentifierPart: new RegExp('[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0\u08A2-\u08AC\u08E4-\u08FE\u0900-\u0963\u0966-\u096F\u0971-\u0977\u0979-\u097F\u0981-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C01-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58\u0C59\u0C60-\u0C63\u0C66-\u0C6F\u0C82\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D02\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D60-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F0\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191C\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1CD0-\u1CD2\u1CD4-\u1CF6\u1D00-\u1DE6\u1DFC-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA697\uA69F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA827\uA840-\uA873\uA880-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A\uAA7B\uAA80-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE26\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]')
    };

    // Ensure the condition is true, otherwise throw an error.
    // This is only to have a better contract semantic, i.e. another safety net
    // to catch a logic error. The condition shall be fulfilled in normal case.
    // Do NOT use this to enforce a certain condition on any user input.

    function assert(condition, message) {
        /* istanbul ignore if */
        if (!condition) {
            throw new Error('ASSERT: ' + message);
        }
    }

    function isDecimalDigit(ch) {
        return (ch >= 48 && ch <= 57);   // 0..9
    }

    function isHexDigit(ch) {
        return '0123456789abcdefABCDEF'.indexOf(ch) >= 0;
    }

    function isOctalDigit(ch) {
        return '01234567'.indexOf(ch) >= 0;
    }


    // 7.2 White Space

    function isWhiteSpace(ch) {
        return (ch === 0x20) || (ch === 0x09) || (ch === 0x0B) || (ch === 0x0C) || (ch === 0xA0) ||
            (ch >= 0x1680 && [0x1680, 0x180E, 0x2000, 0x2001, 0x2002, 0x2003, 0x2004, 0x2005, 0x2006, 0x2007, 0x2008, 0x2009, 0x200A, 0x202F, 0x205F, 0x3000, 0xFEFF].indexOf(ch) >= 0);
    }

    // 7.3 Line Terminators

    function isLineTerminator(ch) {
        return (ch === 0x0A) || (ch === 0x0D) || (ch === 0x2028) || (ch === 0x2029);
    }

    // 7.6 Identifier Names and Identifiers

    function isIdentifierStart(ch) {
        return (ch == 0x40) ||  (ch === 0x24) || (ch === 0x5F) ||  // $ (dollar) and _ (underscore)
            (ch >= 0x41 && ch <= 0x5A) ||         // A..Z
            (ch >= 0x61 && ch <= 0x7A) ||         // a..z
            (ch === 0x5C) ||                      // \ (backslash)
            ((ch >= 0x80) && Regex.NonAsciiIdentifierStart.test(String.fromCharCode(ch)));
    }

    function isIdentifierPart(ch) {
        return (ch === 0x24) || (ch === 0x5F) ||  // $ (dollar) and _ (underscore)
            (ch >= 0x41 && ch <= 0x5A) ||         // A..Z
            (ch >= 0x61 && ch <= 0x7A) ||         // a..z
            (ch >= 0x30 && ch <= 0x39) ||         // 0..9
            (ch === 0x5C) ||                      // \ (backslash)
            ((ch >= 0x80) && Regex.NonAsciiIdentifierPart.test(String.fromCharCode(ch)));
    }

    // 7.6.1.2 Future Reserved Words

    function isFutureReservedWord(id) {
        switch (id) {
        case 'class':
        case 'enum':
        case 'export':
        case 'extends':
        case 'import':
        case 'super':
            return true;
        default:
            return false;
        }
    }

    function isStrictModeReservedWord(id) {
        switch (id) {
        case 'implements':
        case 'interface':
        case 'package':
        case 'private':
        case 'protected':
        case 'public':
        case 'static':
        case 'yield':
        case 'let':
            return true;
        default:
            return false;
        }
    }

    function isRestrictedWord(id) {
        return id === 'eval' || id === 'arguments';
    }

    // 7.6.1.1 Keywords

    function isKeyword(id) {
        if (strict && isStrictModeReservedWord(id)) {
            return true;
        }

        // 'const' is specialized as Keyword in V8.
        // 'yield' and 'let' are for compatiblity with SpiderMonkey and ES.next.
        // Some others are from future reserved words.

        switch (id.length) {
        case 2:
            return (id === 'if') || (id === 'in') || (id === 'do');
        case 3:
            return (id === 'var') || (id === 'for') || (id === 'new') ||
                (id === 'try') || (id === 'let');
        case 4:
            return (id === 'this') || (id === 'else') || (id === 'case') ||
                (id === 'void') || (id === 'with') || (id === 'enum');
        case 5:
            return (id === 'while') || (id === 'break') || (id === 'catch') ||
                (id === 'throw') || (id === 'const') || (id === 'yield') ||
                (id === 'class') || (id === 'super');
        case 6:
            return (id === 'return') || (id === 'typeof') || (id === 'delete') ||
                (id === 'switch') || (id === 'export') || (id === 'import');
        case 7:
            return (id === 'default') || (id === 'finally') || (id === 'extends');
        case 8:
            return (id === 'function') || (id === 'continue') || (id === 'debugger');
        case 10:
            return (id === 'instanceof');
        default:
            return false;
        }
    }

    // 7.4 Comments

    function addComment(type, value, start, end, loc) {
        var comment, attacher;

        assert(typeof start === 'number', 'Comment must have valid position');

        // Because the way the actual token is scanned, often the comments
        // (if any) are skipped twice during the lexical analysis.
        // Thus, we need to skip adding a comment if the comment array already
        // handled it.
        if (state.lastCommentStart >= start) {
            return;
        }
        state.lastCommentStart = start;

        comment = {
            type: type,
            value: value
        };
        if (extra.range) {
            comment.range = [start, end];
        }
        if (extra.loc) {
            comment.loc = loc;
        }
        extra.comments.push(comment);
        if (extra.attachComment) {
            extra.leadingComments.push(comment);
            extra.trailingComments.push(comment);
        }
    }

    function skipSingleLineComment(offset) {
        var start, loc, ch, comment;

        start = index - offset;
        loc = {
            start: {
                line: lineNumber,
                column: index - lineStart - offset
            }
        };

        while (index < length) {
            ch = source.charCodeAt(index);
            ++index;
            if (isLineTerminator(ch)) {
                if (extra.comments) {
                    comment = source.slice(start + offset, index - 1);
                    loc.end = {
                        line: lineNumber,
                        column: index - lineStart - 1
                    };
                    addComment('Line', comment, start, index - 1, loc);
                }
                if (ch === 13 && source.charCodeAt(index) === 10) {
                    ++index;
                }
                ++lineNumber;
                lineStart = index;
                return;
            }
        }

        if (extra.comments) {
            comment = source.slice(start + offset, index);
            loc.end = {
                line: lineNumber,
                column: index - lineStart
            };
            addComment('Line', comment, start, index, loc);
        }
    }

    function skipMultiLineComment() {
        var start, loc, ch, comment;

        if (extra.comments) {
            start = index - 2;
            loc = {
                start: {
                    line: lineNumber,
                    column: index - lineStart - 2
                }
            };
        }

        while (index < length) {
            ch = source.charCodeAt(index);
            if (isLineTerminator(ch)) {
                if (ch === 0x0D && source.charCodeAt(index + 1) === 0x0A) {
                    ++index;
                }
                ++lineNumber;
                ++index;
                lineStart = index;
                if (index >= length) {
                    throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
                }
            } else if (ch === 0x2A) {
                // Block comment ends with '*/'.
                if (source.charCodeAt(index + 1) === 0x2F) {
                    ++index;
                    ++index;
                    if (extra.comments) {
                        comment = source.slice(start + 2, index - 2);
                        loc.end = {
                            line: lineNumber,
                            column: index - lineStart
                        };
                        addComment('Block', comment, start, index, loc);
                    }
                    return;
                }
                ++index;
            } else {
                ++index;
            }
        }

        throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
    }

    function skipComment() {
        var ch, start;

        start = (index === 0);
        while (index < length) {
            ch = source.charCodeAt(index);

            if (isWhiteSpace(ch)) {
                ++index;
            } else if (isLineTerminator(ch)) {
                ++index;
                if (ch === 0x0D && source.charCodeAt(index) === 0x0A) {
                    ++index;
                }
                ++lineNumber;
                lineStart = index;
                start = true;
            } else if (ch === 0x2F) { // U+002F is '/'
                ch = source.charCodeAt(index + 1);
                if (ch === 0x2F) {
                    ++index;
                    ++index;
                    skipSingleLineComment(2);
                    start = true;
                } else if (ch === 0x2A) {  // U+002A is '*'
                    ++index;
                    ++index;
                    skipMultiLineComment();
                } else {
                    break;
                }
            } else if (start && ch === 0x2D) { // U+002D is '-'
                // U+003E is '>'
                if ((source.charCodeAt(index + 1) === 0x2D) && (source.charCodeAt(index + 2) === 0x3E)) {
                    // '-->' is a single-line comment
                    index += 3;
                    skipSingleLineComment(3);
                } else {
                    break;
                }
            } else if (ch === 0x3C) { // U+003C is '<'
                if (source.slice(index + 1, index + 4) === '!--') {
                    ++index; // `<`
                    ++index; // `!`
                    ++index; // `-`
                    ++index; // `-`
                    skipSingleLineComment(4);
                } else {
                    break;
                }
            } else {
                break;
            }
        }
    }

    function scanHexEscape(prefix) {
        var i, len, ch, code = 0;

        len = (prefix === 'u') ? 4 : 2;
        for (i = 0; i < len; ++i) {
            if (index < length && isHexDigit(source[index])) {
                ch = source[index++];
                code = code * 16 + '0123456789abcdef'.indexOf(ch.toLowerCase());
            } else {
                return '';
            }
        }
        return String.fromCharCode(code);
    }

    function getEscapedIdentifier() {
        var ch, id;

        ch = source.charCodeAt(index++);
        id = String.fromCharCode(ch);

        // '\u' (U+005C, U+0075) denotes an escaped character.
        if (ch === 0x5C) {
            if (source.charCodeAt(index) !== 0x75) {
                throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
            }
            ++index;
            ch = scanHexEscape('u');
            if (!ch || ch === '\\' || !isIdentifierStart(ch.charCodeAt(0))) {
                throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
            }
            id = ch;
        }

        while (index < length) {
            ch = source.charCodeAt(index);
            if (!isIdentifierPart(ch)) {
                break;
            }
            ++index;
            id += String.fromCharCode(ch);

            // '\u' (U+005C, U+0075) denotes an escaped character.
            if (ch === 0x5C) {
                id = id.substr(0, id.length - 1);
                if (source.charCodeAt(index) !== 0x75) {
                    throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
                }
                ++index;
                ch = scanHexEscape('u');
                if (!ch || ch === '\\' || !isIdentifierPart(ch.charCodeAt(0))) {
                    throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
                }
                id += ch;
            }
        }

        return id;
    }

    function getIdentifier() {
        var start, ch;

        start = index++;
        while (index < length) {
            ch = source.charCodeAt(index);
            if (ch === 0x5C) {
                // Blackslash (U+005C) marks Unicode escape sequence.
                index = start;
                return getEscapedIdentifier();
            }
            if (isIdentifierPart(ch)) {
                ++index;
            } else {
                break;
            }
        }

        return source.slice(start, index);
    }

    function scanIdentifier() {
        var start, id, type;

        start = index;

        // Backslash (U+005C) starts an escaped character.
        id = (source.charCodeAt(index) === 0x5C) ? getEscapedIdentifier() : getIdentifier();

        // There is no keyword or literal with only one character.
        // Thus, it must be an identifier.
        if (id.length === 1) {
            type = Token.Identifier;
        } else if (isKeyword(id)) {
            type = Token.Keyword;
        } else if (id === 'null') {
            type = Token.NullLiteral;
        } else if (id === 'true' || id === 'false') {
            type = Token.BooleanLiteral;
        } else {
            type = Token.Identifier;
        }

        return {
            type: type,
            value: id,
            lineNumber: lineNumber,
            lineStart: lineStart,
            start: start,
            end: index
        };
    }


    // 7.7 Punctuators

    function scanPunctuator() {
        var start = index,
            code = source.charCodeAt(index),
            code2,
            ch1 = source[index],
            ch2,
            ch3,
            ch4;

        switch (code) {

        // Check for most common single-character punctuators.
        case 0x2E:  // . dot
        case 0x28:  // ( open bracket
        case 0x29:  // ) close bracket
        case 0x3B:  // ; semicolon
        case 0x2C:  // , comma
        case 0x7B:  // { open curly brace
        case 0x7D:  // } close curly brace
        case 0x5B:  // [
        case 0x5D:  // ]
        case 0x3A:  // :
        case 0x3F:  // ?
        case 0x7E:  // ~
            ++index;
            if (extra.tokenize) {
                if (code === 0x28) {
                    extra.openParenToken = extra.tokens.length;
                } else if (code === 0x7B) {
                    extra.openCurlyToken = extra.tokens.length;
                }
            }
            return {
                type: Token.Punctuator,
                value: String.fromCharCode(code),
                lineNumber: lineNumber,
                lineStart: lineStart,
                start: start,
                end: index
            };

        default:
            code2 = source.charCodeAt(index + 1);

            // '=' (U+003D) marks an assignment or comparison operator.
            if (code2 === 0x3D) {
                switch (code) {
                case 0x2B:  // +
                case 0x2D:  // -
                case 0x2F:  // /
                case 0x3C:  // <
                case 0x3E:  // >
                case 0x5E:  // ^
                case 0x7C:  // |
                case 0x25:  // %
                case 0x26:  // &
                case 0x2A:  // *
                    index += 2;
                    return {
                        type: Token.Punctuator,
                        value: String.fromCharCode(code) + String.fromCharCode(code2),
                        lineNumber: lineNumber,
                        lineStart: lineStart,
                        start: start,
                        end: index
                    };

                case 0x21: // !
                case 0x3D: // =
                    index += 2;

                    // !== and ===
                    if (source.charCodeAt(index) === 0x3D) {
                        ++index;
                    }
                    return {
                        type: Token.Punctuator,
                        value: source.slice(start, index),
                        lineNumber: lineNumber,
                        lineStart: lineStart,
                        start: start,
                        end: index
                    };
                }
            }
        }

        // 4-character punctuator: >>>=

        ch4 = source.substr(index, 4);

        if (ch4 === '>>>=') {
            index += 4;
            return {
                type: Token.Punctuator,
                value: ch4,
                lineNumber: lineNumber,
                lineStart: lineStart,
                start: start,
                end: index
            };
        }

        // 3-character punctuators: === !== >>> <<= >>=

        ch3 = ch4.substr(0, 3);

        if (ch3 === '>>>' || ch3 === '<<=' || ch3 === '>>=') {
            index += 3;
            return {
                type: Token.Punctuator,
                value: ch3,
                lineNumber: lineNumber,
                lineStart: lineStart,
                start: start,
                end: index
            };
        }

        // Other 2-character punctuators: ++ -- << >> && ||
        ch2 = ch3.substr(0, 2);

        if ((ch1 === ch2[1] && ('+-<>&|'.indexOf(ch1) >= 0)) || ch2 === '=>') {
            index += 2;
            return {
                type: Token.Punctuator,
                value: ch2,
                lineNumber: lineNumber,
                lineStart: lineStart,
                start: start,
                end: index
            };
        }

        // 1-character punctuators: < > = ! + - * % & | ^ /
        if ('<>=!+-*%&|^/'.indexOf(ch1) >= 0) {
            ++index;
            return {
                type: Token.Punctuator,
                value: ch1,
                lineNumber: lineNumber,
                lineStart: lineStart,
                start: start,
                end: index
            };
        }

        throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
    }

    // 7.8.3 Numeric Literals

    function scanHexLiteral(start) {
        var number = '';

        while (index < length) {
            if (!isHexDigit(source[index])) {
                break;
            }
            number += source[index++];
        }

        if (number.length === 0) {
            throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
        }

        if (isIdentifierStart(source.charCodeAt(index))) {
            throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
        }

        return {
            type: Token.NumericLiteral,
            value: parseInt('0x' + number, 16),
            lineNumber: lineNumber,
            lineStart: lineStart,
            start: start,
            end: index
        };
    }

    function scanOctalLiteral(start) {
        var number = '0' + source[index++];
        while (index < length) {
            if (!isOctalDigit(source[index])) {
                break;
            }
            number += source[index++];
        }

        if (isIdentifierStart(source.charCodeAt(index)) || isDecimalDigit(source.charCodeAt(index))) {
            throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
        }

        return {
            type: Token.NumericLiteral,
            value: parseInt(number, 8),
            octal: true,
            lineNumber: lineNumber,
            lineStart: lineStart,
            start: start,
            end: index
        };
    }

    function scanNumericLiteral() {
        var number, start, ch;

        ch = source[index];
        assert(isDecimalDigit(ch.charCodeAt(0)) || (ch === '.'),
            'Numeric literal must start with a decimal digit or a decimal point');

        start = index;
        number = '';
        if (ch !== '.') {
            number = source[index++];
            ch = source[index];

            // Hex number starts with '0x'.
            // Octal number starts with '0'.
            if (number === '0') {
                if (ch === 'x' || ch === 'X') {
                    ++index;
                    return scanHexLiteral(start);
                }
                if (isOctalDigit(ch)) {
                    return scanOctalLiteral(start);
                }

                // decimal number starts with '0' such as '09' is illegal.
                if (ch && isDecimalDigit(ch.charCodeAt(0))) {
                    throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
                }
            }

            while (isDecimalDigit(source.charCodeAt(index))) {
                number += source[index++];
            }
            ch = source[index];
        }

        if (ch === '.') {
            number += source[index++];
            while (isDecimalDigit(source.charCodeAt(index))) {
                number += source[index++];
            }
            ch = source[index];
        }

        if (ch === 'e' || ch === 'E') {
            number += source[index++];

            ch = source[index];
            if (ch === '+' || ch === '-') {
                number += source[index++];
            }
            if (isDecimalDigit(source.charCodeAt(index))) {
                while (isDecimalDigit(source.charCodeAt(index))) {
                    number += source[index++];
                }
            } else {
                throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
            }
        }

        if (isIdentifierStart(source.charCodeAt(index))) {
            throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
        }

        return {
            type: Token.NumericLiteral,
            value: parseFloat(number),
            lineNumber: lineNumber,
            lineStart: lineStart,
            start: start,
            end: index
        };
    }

    // 7.8.4 String Literals

    function scanStringLiteral() {
        var str = '', quote, start, ch, code, unescaped, restore, octal = false, startLineNumber, startLineStart;
        startLineNumber = lineNumber;
        startLineStart = lineStart;

        quote = source[index];
        assert((quote === '\'' || quote === '"'),
            'String literal must starts with a quote');

        start = index;
        ++index;

        while (index < length) {
            ch = source[index++];

            if (ch === quote) {
                quote = '';
                break;
            } else if (ch === '\\') {
                ch = source[index++];
                if (!ch || !isLineTerminator(ch.charCodeAt(0))) {
                    switch (ch) {
                    case 'u':
                    case 'x':
                        restore = index;
                        unescaped = scanHexEscape(ch);
                        if (unescaped) {
                            str += unescaped;
                        } else {
                            index = restore;
                            str += ch;
                        }
                        break;
                    case 'n':
                        str += '\n';
                        break;
                    case 'r':
                        str += '\r';
                        break;
                    case 't':
                        str += '\t';
                        break;
                    case 'b':
                        str += '\b';
                        break;
                    case 'f':
                        str += '\f';
                        break;
                    case 'v':
                        str += '\x0B';
                        break;

                    default:
                        if (isOctalDigit(ch)) {
                            code = '01234567'.indexOf(ch);

                            // \0 is not octal escape sequence
                            if (code !== 0) {
                                octal = true;
                            }

                            if (index < length && isOctalDigit(source[index])) {
                                octal = true;
                                code = code * 8 + '01234567'.indexOf(source[index++]);

                                // 3 digits are only allowed when string starts
                                // with 0, 1, 2, 3
                                if ('0123'.indexOf(ch) >= 0 &&
                                        index < length &&
                                        isOctalDigit(source[index])) {
                                    code = code * 8 + '01234567'.indexOf(source[index++]);
                                }
                            }
                            str += String.fromCharCode(code);
                        } else {
                            str += ch;
                        }
                        break;
                    }
                } else {
                    ++lineNumber;
                    if (ch ===  '\r' && source[index] === '\n') {
                        ++index;
                    }
                    lineStart = index;
                }
            } else if (isLineTerminator(ch.charCodeAt(0))) {
                break;
            } else {
                str += ch;
            }
        }

        if (quote !== '') {
            throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
        }

        return {
            type: Token.StringLiteral,
            value: str,
            octal: octal,
            startLineNumber: startLineNumber,
            startLineStart: startLineStart,
            lineNumber: lineNumber,
            lineStart: lineStart,
            start: start,
            end: index
        };
    }

    function testRegExp(pattern, flags) {
        var value;
        try {
            value = new RegExp(pattern, flags);
        } catch (e) {
            throwError({}, Messages.InvalidRegExp);
        }
        return value;
    }

    function scanRegExpBody() {
        var ch, str, classMarker, terminated, body;

        ch = source[index];
        assert(ch === '/', 'Regular expression literal must start with a slash');
        str = source[index++];

        classMarker = false;
        terminated = false;
        while (index < length) {
            ch = source[index++];
            str += ch;
            if (ch === '\\') {
                ch = source[index++];
                // ECMA-262 7.8.5
                if (isLineTerminator(ch.charCodeAt(0))) {
                    throwError({}, Messages.UnterminatedRegExp);
                }
                str += ch;
            } else if (isLineTerminator(ch.charCodeAt(0))) {
                throwError({}, Messages.UnterminatedRegExp);
            } else if (classMarker) {
                if (ch === ']') {
                    classMarker = false;
                }
            } else {
                if (ch === '/') {
                    terminated = true;
                    break;
                } else if (ch === '[') {
                    classMarker = true;
                }
            }
        }

        if (!terminated) {
            throwError({}, Messages.UnterminatedRegExp);
        }

        // Exclude leading and trailing slash.
        body = str.substr(1, str.length - 2);
        return {
            value: body,
            literal: str
        };
    }

    function scanRegExpFlags() {
        var ch, str, flags, restore;

        str = '';
        flags = '';
        while (index < length) {
            ch = source[index];
            if (!isIdentifierPart(ch.charCodeAt(0))) {
                break;
            }

            ++index;
            if (ch === '\\' && index < length) {
                ch = source[index];
                if (ch === 'u') {
                    ++index;
                    restore = index;
                    ch = scanHexEscape('u');
                    if (ch) {
                        flags += ch;
                        for (str += '\\u'; restore < index; ++restore) {
                            str += source[restore];
                        }
                    } else {
                        index = restore;
                        flags += 'u';
                        str += '\\u';
                    }
                    throwErrorTolerant({}, Messages.UnexpectedToken, 'ILLEGAL');
                } else {
                    str += '\\';
                    throwErrorTolerant({}, Messages.UnexpectedToken, 'ILLEGAL');
                }
            } else {
                flags += ch;
                str += ch;
            }
        }

        return {
            value: flags,
            literal: str
        };
    }

    function scanRegExp() {
        var start, body, flags, pattern, value;

        lookahead = null;
        skipComment();
        start = index;

        body = scanRegExpBody();
        flags = scanRegExpFlags();
        value = testRegExp(body.value, flags.value);

        if (extra.tokenize) {
            return {
                type: Token.RegularExpression,
                value: value,
                lineNumber: lineNumber,
                lineStart: lineStart,
                start: start,
                end: index
            };
        }

        return {
            literal: body.literal + flags.literal,
            value: value,
            start: start,
            end: index
        };
    }

    function collectRegex() {
        var pos, loc, regex, token;

        skipComment();

        pos = index;
        loc = {
            start: {
                line: lineNumber,
                column: index - lineStart
            }
        };

        regex = scanRegExp();
        loc.end = {
            line: lineNumber,
            column: index - lineStart
        };

        /* istanbul ignore next */
        if (!extra.tokenize) {
            // Pop the previous token, which is likely '/' or '/='
            if (extra.tokens.length > 0) {
                token = extra.tokens[extra.tokens.length - 1];
                if (token.range[0] === pos && token.type === 'Punctuator') {
                    if (token.value === '/' || token.value === '/=') {
                        extra.tokens.pop();
                    }
                }
            }

            extra.tokens.push({
                type: 'RegularExpression',
                value: regex.literal,
                range: [pos, index],
                loc: loc
            });
        }

        return regex;
    }

    function isIdentifierName(token) {
        return token.type === Token.Identifier ||
            token.type === Token.Keyword ||
            token.type === Token.BooleanLiteral ||
            token.type === Token.NullLiteral;
    }

    function advanceSlash() {
        var prevToken,
            checkToken;
        // Using the following algorithm:
        // https://github.com/mozilla/sweet.js/wiki/design
        prevToken = extra.tokens[extra.tokens.length - 1];
        if (!prevToken) {
            // Nothing before that: it cannot be a division.
            return collectRegex();
        }
        if (prevToken.type === 'Punctuator') {
            if (prevToken.value === ']') {
                return scanPunctuator();
            }
            if (prevToken.value === ')') {
                checkToken = extra.tokens[extra.openParenToken - 1];
                if (checkToken &&
                        checkToken.type === 'Keyword' &&
                        (checkToken.value === 'if' ||
                         checkToken.value === 'while' ||
                         checkToken.value === 'for' ||
                         checkToken.value === 'with')) {
                    return collectRegex();
                }
                return scanPunctuator();
            }
            if (prevToken.value === '}') {
                // Dividing a function by anything makes little sense,
                // but we have to check for that.
                if (extra.tokens[extra.openCurlyToken - 3] &&
                        extra.tokens[extra.openCurlyToken - 3].type === 'Keyword') {
                    // Anonymous function.
                    checkToken = extra.tokens[extra.openCurlyToken - 4];
                    if (!checkToken) {
                        return scanPunctuator();
                    }
                } else if (extra.tokens[extra.openCurlyToken - 4] &&
                        extra.tokens[extra.openCurlyToken - 4].type === 'Keyword') {
                    // Named function.
                    checkToken = extra.tokens[extra.openCurlyToken - 5];
                    if (!checkToken) {
                        return collectRegex();
                    }
                } else {
                    return scanPunctuator();
                }
                // checkToken determines whether the function is
                // a declaration or an expression.
                if (FnExprTokens.indexOf(checkToken.value) >= 0) {
                    // It is an expression.
                    return scanPunctuator();
                }
                // It is a declaration.
                return collectRegex();
            }
            return collectRegex();
        }
        if (prevToken.type === 'Keyword') {
            return collectRegex();
        }
        return scanPunctuator();
    }

    function advance() {
        var ch;

        skipComment();

        if (index >= length) {
            return {
                type: Token.EOF,
                lineNumber: lineNumber,
                lineStart: lineStart,
                start: index,
                end: index
            };
        }

        ch = source.charCodeAt(index);

        if (isIdentifierStart(ch)) {
            return scanIdentifier();
        }

        // Very common: ( and ) and ;
        if (ch === 0x28 || ch === 0x29 || ch === 0x3B) {
            return scanPunctuator();
        }

        // String literal starts with single quote (U+0027) or double quote (U+0022).
        if (ch === 0x27 || ch === 0x22) {
            return scanStringLiteral();
        }


        // Dot (.) U+002E can also start a floating-point number, hence the need
        // to check the next character.
        if (ch === 0x2E) {
            if (isDecimalDigit(source.charCodeAt(index + 1))) {
                return scanNumericLiteral();
            }
            return scanPunctuator();
        }

        if (isDecimalDigit(ch)) {
            return scanNumericLiteral();
        }

        // Slash (/) U+002F can also start a regex.
        if (extra.tokenize && ch === 0x2F) {
            return advanceSlash();
        }

        return scanPunctuator();
    }

    function collectToken() {
        var loc, token, range, value;

        skipComment();
        loc = {
            start: {
                line: lineNumber,
                column: index - lineStart
            }
        };

        token = advance();
        loc.end = {
            line: lineNumber,
            column: index - lineStart
        };

        if (token.type !== Token.EOF) {
            value = source.slice(token.start, token.end);
            extra.tokens.push({
                type: TokenName[token.type],
                value: value,
                range: [token.start, token.end],
                loc: loc
            });
        }

        return token;
    }

    function lex() {
        var token;

        token = lookahead;
        index = token.end;
        lineNumber = token.lineNumber;
        lineStart = token.lineStart;

        lookahead = (typeof extra.tokens !== 'undefined') ? collectToken() : advance();

        index = token.end;
        lineNumber = token.lineNumber;
        lineStart = token.lineStart;

        return token;
    }

    function peek() {
        var pos, line, start;

        pos = index;
        line = lineNumber;
        start = lineStart;
        lookahead = (typeof extra.tokens !== 'undefined') ? collectToken() : advance();
        index = pos;
        lineNumber = line;
        lineStart = start;
    }

    function Position(line, column) {
        this.line = line;
        this.column = column;
    }

    function SourceLocation(startLine, startColumn, line, column) {
        this.start = new Position(startLine, startColumn);
        this.end = new Position(line, column);
    }

    SyntaxTreeDelegate = {

        name: 'SyntaxTree',

        processComment: function (node) {
            var lastChild, trailingComments;

            if (node.type === Syntax.Program) {
                if (node.body.length > 0) {
                    return;
                }
            }

            if (extra.trailingComments.length > 0) {
                if (extra.trailingComments[0].range[0] >= node.range[1]) {
                    trailingComments = extra.trailingComments;
                    extra.trailingComments = [];
                } else {
                    extra.trailingComments.length = 0;
                }
            } else {
                if (extra.bottomRightStack.length > 0 &&
                        extra.bottomRightStack[extra.bottomRightStack.length - 1].trailingComments &&
                        extra.bottomRightStack[extra.bottomRightStack.length - 1].trailingComments[0].range[0] >= node.range[1]) {
                    trailingComments = extra.bottomRightStack[extra.bottomRightStack.length - 1].trailingComments;
                    delete extra.bottomRightStack[extra.bottomRightStack.length - 1].trailingComments;
                }
            }

            // Eating the stack.
            while (extra.bottomRightStack.length > 0 && extra.bottomRightStack[extra.bottomRightStack.length - 1].range[0] >= node.range[0]) {
                lastChild = extra.bottomRightStack.pop();
            }

            if (lastChild) {
                if (lastChild.leadingComments && lastChild.leadingComments[lastChild.leadingComments.length - 1].range[1] <= node.range[0]) {
                    node.leadingComments = lastChild.leadingComments;
                    delete lastChild.leadingComments;
                }
            } else if (extra.leadingComments.length > 0 && extra.leadingComments[extra.leadingComments.length - 1].range[1] <= node.range[0]) {
                node.leadingComments = extra.leadingComments;
                extra.leadingComments = [];
            }


            if (trailingComments) {
                node.trailingComments = trailingComments;
            }

            extra.bottomRightStack.push(node);
        },

        markEnd: function (node, startToken) {
            if (extra.range) {
                node.range = [startToken.start, index];
            }
            if (extra.loc) {
                node.loc = new SourceLocation(
                    startToken.startLineNumber === undefined ?  startToken.lineNumber : startToken.startLineNumber,
                    startToken.start - (startToken.startLineStart === undefined ?  startToken.lineStart : startToken.startLineStart),
                    lineNumber,
                    index - lineStart
                );
                this.postProcess(node);
            }

            if (extra.attachComment) {
                this.processComment(node);
            }
            return node;
        },

        postProcess: function (node) {
            if (extra.source) {
                node.loc.source = extra.source;
            }
            return node;
        },

        createArrayExpression: function (elements) {
            return {
                type: Syntax.ArrayExpression,
                elements: elements
            };
        },

        createAssignmentExpression: function (operator, left, right) {
            return {
                type: Syntax.AssignmentExpression,
                operator: operator,
                left: left,
                right: right
            };
        },

        createBinaryExpression: function (operator, left, right) {
            var type = (operator === '||' || operator === '&&') ? Syntax.LogicalExpression :
                        Syntax.BinaryExpression;
            return {
                type: type,
                operator: operator,
                left: left,
                right: right
            };
        },

        createBlockStatement: function (body) {
            return {
                type: Syntax.BlockStatement,
                body: body
            };
        },

        createBreakStatement: function (label) {
            return {
                type: Syntax.BreakStatement,
                label: label
            };
        },

        createCallExpression: function (callee, args) {
            return {
                type: Syntax.CallExpression,
                callee: callee,
                'arguments': args
            };
        },

        createCatchClause: function (param, body) {
            return {
                type: Syntax.CatchClause,
                param: param,
                body: body
            };
        },

        createConditionalExpression: function (test, consequent, alternate) {
            return {
                type: Syntax.ConditionalExpression,
                test: test,
                consequent: consequent,
                alternate: alternate
            };
        },

        createContinueStatement: function (label) {
            return {
                type: Syntax.ContinueStatement,
                label: label
            };
        },

        createDebuggerStatement: function () {
            return {
                type: Syntax.DebuggerStatement
            };
        },

        createDoWhileStatement: function (body, test) {
            return {
                type: Syntax.DoWhileStatement,
                body: body,
                test: test
            };
        },

        createEmptyStatement: function () {
            return {
                type: Syntax.EmptyStatement
            };
        },

        createExpressionStatement: function (expression) {
            return {
                type: Syntax.ExpressionStatement,
                expression: expression
            };
        },

        createForStatement: function (init, test, update, body) {
            return {
                type: Syntax.ForStatement,
                init: init,
                test: test,
                update: update,
                body: body
            };
        },

        createForInStatement: function (left, right, body) {
            return {
                type: Syntax.ForInStatement,
                left: left,
                right: right,
                body: body,
                each: false
            };
        },

        createFunctionDeclaration: function (id, params, defaults, body) {
            return {
                type: Syntax.FunctionDeclaration,
                id: id,
                params: params,
                defaults: defaults,
                body: body,
                rest: null,
                generator: false,
                expression: false
            };
        },

        createFunctionExpression: function (id, params, defaults, body) {
            return {
                type: Syntax.FunctionExpression,
                id: id,
                params: params,
                defaults: defaults,
                body: body,
                rest: null,
                generator: false,
                expression: false
            };
        },

        createIdentifier: function (name) {
            return {
                type: Syntax.Identifier,
                name: name
            };
        },

        createIfStatement: function (test, consequent, alternate) {
            return {
                type: Syntax.IfStatement,
                test: test,
                consequent: consequent,
                alternate: alternate
            };
        },

        createLabeledStatement: function (label, body) {
            return {
                type: Syntax.LabeledStatement,
                label: label,
                body: body
            };
        },

        createLiteral: function (token) {
            return {
                type: Syntax.Literal,
                value: token.value,
                raw: source.slice(token.start, token.end)
            };
        },

        createMemberExpression: function (accessor, object, property) {
            return {
                type: Syntax.MemberExpression,
                computed: accessor === '[',
                object: object,
                property: property
            };
        },

        createNewExpression: function (callee, args) {
            return {
                type: Syntax.NewExpression,
                callee: callee,
                'arguments': args
            };
        },

        createObjectExpression: function (properties) {
            return {
                type: Syntax.ObjectExpression,
                properties: properties
            };
        },

        createPostfixExpression: function (operator, argument) {
            return {
                type: Syntax.UpdateExpression,
                operator: operator,
                argument: argument,
                prefix: false
            };
        },

        createProgram: function (body) {
            return {
                type: Syntax.Program,
                body: body
            };
        },

        createProperty: function (kind, key, value) {
            return {
                type: Syntax.Property,
                key: key,
                value: value,
                kind: kind
            };
        },

        createReturnStatement: function (argument) {
            return {
                type: Syntax.ReturnStatement,
                argument: argument
            };
        },

        createSequenceExpression: function (expressions) {
            return {
                type: Syntax.SequenceExpression,
                expressions: expressions
            };
        },

        createSwitchCase: function (test, consequent) {
            return {
                type: Syntax.SwitchCase,
                test: test,
                consequent: consequent
            };
        },

        createSwitchStatement: function (discriminant, cases) {
            return {
                type: Syntax.SwitchStatement,
                discriminant: discriminant,
                cases: cases
            };
        },

        createThisExpression: function () {
            return {
                type: Syntax.ThisExpression
            };
        },

        createThrowStatement: function (argument) {
            return {
                type: Syntax.ThrowStatement,
                argument: argument
            };
        },

        createTryStatement: function (block, guardedHandlers, handlers, finalizer) {
            return {
                type: Syntax.TryStatement,
                block: block,
                guardedHandlers: guardedHandlers,
                handlers: handlers,
                finalizer: finalizer
            };
        },

        createUnaryExpression: function (operator, argument) {
            if (operator === '++' || operator === '--') {
                return {
                    type: Syntax.UpdateExpression,
                    operator: operator,
                    argument: argument,
                    prefix: true
                };
            }
            return {
                type: Syntax.UnaryExpression,
                operator: operator,
                argument: argument,
                prefix: true
            };
        },

        createVariableDeclaration: function (declarations, kind) {
            return {
                type: Syntax.VariableDeclaration,
                declarations: declarations,
                kind: kind
            };
        },

        createVariableDeclarator: function (id, init) {
            return {
                type: Syntax.VariableDeclarator,
                id: id,
                init: init
            };
        },

        createWhileStatement: function (test, body) {
            return {
                type: Syntax.WhileStatement,
                test: test,
                body: body
            };
        },

        createWithStatement: function (object, body) {
            return {
                type: Syntax.WithStatement,
                object: object,
                body: body
            };
        }
    };

    // Return true if there is a line terminator before the next token.

    function peekLineTerminator() {
        var pos, line, start, found;

        pos = index;
        line = lineNumber;
        start = lineStart;
        skipComment();
        found = lineNumber !== line;
        index = pos;
        lineNumber = line;
        lineStart = start;

        return found;
    }

    // Throw an exception

    function throwError(token, messageFormat) {
        var error,
            args = Array.prototype.slice.call(arguments, 2),
            msg = messageFormat.replace(
                /%(\d)/g,
                function (whole, index) {
                    assert(index < args.length, 'Message reference must be in range');
                    return args[index];
                }
            );

        if (typeof token.lineNumber === 'number') {
            error = new Error('Line ' + token.lineNumber + ': ' + msg);
            error.index = token.start;
            error.lineNumber = token.lineNumber;
            error.column = token.start - lineStart + 1;
        } else {
            error = new Error('Line ' + lineNumber + ': ' + msg);
            error.index = index;
            error.lineNumber = lineNumber;
            error.column = index - lineStart + 1;
        }

        error.description = msg;
        throw error;
    }

    function throwErrorTolerant() {
        try {
            throwError.apply(null, arguments);
        } catch (e) {
            if (extra.errors) {
                extra.errors.push(e);
            } else {
                throw e;
            }
        }
    }


    // Throw an exception because of the token.

    function throwUnexpected(token) {
        if (token.type === Token.EOF) {
            throwError(token, Messages.UnexpectedEOS);
        }

        if (token.type === Token.NumericLiteral) {
            throwError(token, Messages.UnexpectedNumber);
        }

        if (token.type === Token.StringLiteral) {
            throwError(token, Messages.UnexpectedString);
        }

        if (token.type === Token.Identifier) {
            throwError(token, Messages.UnexpectedIdentifier);
        }

        if (token.type === Token.Keyword) {
            if (isFutureReservedWord(token.value)) {
                throwError(token, Messages.UnexpectedReserved);
            } else if (strict && isStrictModeReservedWord(token.value)) {
                throwErrorTolerant(token, Messages.StrictReservedWord);
                return;
            }
            throwError(token, Messages.UnexpectedToken, token.value);
        }

        // BooleanLiteral, NullLiteral, or Punctuator.
        throwError(token, Messages.UnexpectedToken, token.value);
    }

    // Expect the next token to match the specified punctuator.
    // If not, an exception will be thrown.

    function expect(value) {
        var token = lex();
        if (token.type !== Token.Punctuator || token.value !== value) {
            throwUnexpected(token);
        }
    }

    // Expect the next token to match the specified keyword.
    // If not, an exception will be thrown.

    function expectKeyword(keyword) {
        var token = lex();
        if (token.type !== Token.Keyword || token.value !== keyword) {
            throwUnexpected(token);
        }
    }

    // Return true if the next token matches the specified punctuator.

    function match(value) {
        return lookahead.type === Token.Punctuator && lookahead.value === value;
    }

    // Return true if the next token matches the specified keyword

    function matchKeyword(keyword) {
        return lookahead.type === Token.Keyword && lookahead.value === keyword;
    }

    // Return true if the next token is an assignment operator

    function matchAssign() {
        var op;

        if (lookahead.type !== Token.Punctuator) {
            return false;
        }
        op = lookahead.value;
        return op === '=' ||
            op === '*=' ||
            op === '/=' ||
            op === '%=' ||
            op === '+=' ||
            op === '-=' ||
            op === '<<=' ||
            op === '>>=' ||
            op === '>>>=' ||
            op === '&=' ||
            op === '^=' ||
            op === '|=';
    }

    function consumeSemicolon() {
        var line;

        // Catch the very common case first: immediately a semicolon (U+003B).
        if (source.charCodeAt(index) === 0x3B || match(';')) {
            lex();
            return;
        }

        line = lineNumber;
        skipComment();
        if (lineNumber !== line) {
            return;
        }

        if (lookahead.type !== Token.EOF && !match('}')) {
            throwUnexpected(lookahead);
        }
    }

    // Return true if provided expression is LeftHandSideExpression

    function isLeftHandSide(expr) {
        return expr.type === Syntax.Identifier || expr.type === Syntax.MemberExpression;
    }

    // 11.1.4 Array Initialiser

    function parseArrayInitialiser() {
        var elements = [], startToken;

        startToken = lookahead;
        expect('[');

        while (!match(']')) {
            if (match(',')) {
                lex();
                elements.push(null);
            } else {
                elements.push(parseAssignmentExpression());

                if (!match(']')) {
                    expect(',');
                }
            }
        }

        lex();

        return delegate.markEnd(delegate.createArrayExpression(elements), startToken);
    }

    // 11.1.5 Object Initialiser

    function parsePropertyFunction(param, first) {
        var previousStrict, body, startToken;

        previousStrict = strict;
        startToken = lookahead;
        body = parseFunctionSourceElements();
        if (first && strict && isRestrictedWord(param[0].name)) {
            throwErrorTolerant(first, Messages.StrictParamName);
        }
        strict = previousStrict;
        return delegate.markEnd(delegate.createFunctionExpression(null, param, [], body), startToken);
    }

    function parseObjectPropertyKey() {
        var token, startToken;

        startToken = lookahead;
        token = lex();

        // Note: This function is called only from parseObjectProperty(), where
        // EOF and Punctuator tokens are already filtered out.

        if (token.type === Token.StringLiteral || token.type === Token.NumericLiteral) {
            if (strict && token.octal) {
                throwErrorTolerant(token, Messages.StrictOctalLiteral);
            }
            return delegate.markEnd(delegate.createLiteral(token), startToken);
        }

        return delegate.markEnd(delegate.createIdentifier(token.value), startToken);
    }

    function parseObjectProperty() {
        var token, key, id, value, param, startToken;

        token = lookahead;
        startToken = lookahead;

        if (token.type === Token.Identifier) {

            id = parseObjectPropertyKey();

            // Property Assignment: Getter and Setter.

            if (token.value === 'get' && !match(':')) {
                key = parseObjectPropertyKey();
                expect('(');
                expect(')');
                value = parsePropertyFunction([]);
                return delegate.markEnd(delegate.createProperty('get', key, value), startToken);
            }
            if (token.value === 'set' && !match(':')) {
                key = parseObjectPropertyKey();
                expect('(');
                token = lookahead;
                if (token.type !== Token.Identifier) {
                    expect(')');
                    throwErrorTolerant(token, Messages.UnexpectedToken, token.value);
                    value = parsePropertyFunction([]);
                } else {
                    param = [ parseVariableIdentifier() ];
                    expect(')');
                    value = parsePropertyFunction(param, token);
                }
                return delegate.markEnd(delegate.createProperty('set', key, value), startToken);
            }
            expect(':');
            value = parseAssignmentExpression();
            return delegate.markEnd(delegate.createProperty('init', id, value), startToken);
        }
        if (token.type === Token.EOF || token.type === Token.Punctuator) {
            throwUnexpected(token);
        } else {
            key = parseObjectPropertyKey();
            expect(':');
            value = parseAssignmentExpression();
            return delegate.markEnd(delegate.createProperty('init', key, value), startToken);
        }
    }

    function parseObjectInitialiser() {
        var properties = [], property, name, key, kind, map = {}, toString = String, startToken;

        startToken = lookahead;

        expect('{');

        while (!match('}')) {
            property = parseObjectProperty();

            if (property.key.type === Syntax.Identifier) {
                name = property.key.name;
            } else {
                name = toString(property.key.value);
            }
            kind = (property.kind === 'init') ? PropertyKind.Data : (property.kind === 'get') ? PropertyKind.Get : PropertyKind.Set;

            key = '$' + name;
            if (Object.prototype.hasOwnProperty.call(map, key)) {
                if (map[key] === PropertyKind.Data) {
                    if (strict && kind === PropertyKind.Data) {
                        throwErrorTolerant({}, Messages.StrictDuplicateProperty);
                    } else if (kind !== PropertyKind.Data) {
                        throwErrorTolerant({}, Messages.AccessorDataProperty);
                    }
                } else {
                    if (kind === PropertyKind.Data) {
                        throwErrorTolerant({}, Messages.AccessorDataProperty);
                    } else if (map[key] & kind) {
                        throwErrorTolerant({}, Messages.AccessorGetSet);
                    }
                }
                map[key] |= kind;
            } else {
                map[key] = kind;
            }

            properties.push(property);

            if (!match('}')) {
                expect(',');
            }
        }

        expect('}');

        return delegate.markEnd(delegate.createObjectExpression(properties), startToken);
    }

    // 11.1.6 The Grouping Operator

    function parseGroupExpression() {
        var expr;

        expect('(');

        expr = parseExpression();

        expect(')');

        return expr;
    }


    // 11.1 Primary Expressions

    function parsePrimaryExpression() {
        var type, token, expr, startToken;

        if (match('(')) {
            return parseGroupExpression();
        }

        if (match('[')) {
            return parseArrayInitialiser();
        }

        if (match('{')) {
            return parseObjectInitialiser();
        }

        type = lookahead.type;
        startToken = lookahead;

        if (type === Token.Identifier) {
            expr =  delegate.createIdentifier(lex().value);
        } else if (type === Token.StringLiteral || type === Token.NumericLiteral) {
            if (strict && lookahead.octal) {
                throwErrorTolerant(lookahead, Messages.StrictOctalLiteral);
            }
            expr = delegate.createLiteral(lex());
        } else if (type === Token.Keyword) {
            if (matchKeyword('function')) {
                return parseFunctionExpression();
            }
            if (matchKeyword('this')) {
                lex();
                expr = delegate.createThisExpression();
            } else {
                throwUnexpected(lex());
            }
        } else if (type === Token.BooleanLiteral) {
            token = lex();
            token.value = (token.value === 'true');
            expr = delegate.createLiteral(token);
        } else if (type === Token.NullLiteral) {
            token = lex();
            token.value = null;
            expr = delegate.createLiteral(token);
        } else if (match('/') || match('/=')) {
            if (typeof extra.tokens !== 'undefined') {
                expr = delegate.createLiteral(collectRegex());
            } else {
                expr = delegate.createLiteral(scanRegExp());
            }
            peek();
        } else {
            throwUnexpected(lex());
        }

        return delegate.markEnd(expr, startToken);
    }

    // 11.2 Left-Hand-Side Expressions

    function parseArguments() {
        var args = [];

        expect('(');

        if (!match(')')) {
            while (index < length) {
                args.push(parseAssignmentExpression());
                if (match(')')) {
                    break;
                }
                expect(',');
            }
        }

        expect(')');

        return args;
    }

    function parseNonComputedProperty() {
        var token, startToken;

        startToken = lookahead;
        token = lex();

        if (!isIdentifierName(token)) {
            throwUnexpected(token);
        }

        return delegate.markEnd(delegate.createIdentifier(token.value), startToken);
    }

    function parseNonComputedMember() {
        expect('.');

        return parseNonComputedProperty();
    }

    function parseComputedMember() {
        var expr;

        expect('[');

        expr = parseExpression();

        expect(']');

        return expr;
    }

    function parseNewExpression() {
        var callee, args, startToken;

        startToken = lookahead;
        expectKeyword('new');
        callee = parseLeftHandSideExpression();
        args = match('(') ? parseArguments() : [];

        return delegate.markEnd(delegate.createNewExpression(callee, args), startToken);
    }

    function parseLeftHandSideExpressionAllowCall() {
        var previousAllowIn, expr, args, property, startToken;

        startToken = lookahead;

        previousAllowIn = state.allowIn;
        state.allowIn = true;
        expr = matchKeyword('new') ? parseNewExpression() : parsePrimaryExpression();
        state.allowIn = previousAllowIn;

        for (;;) {
            if (match('.')) {
                property = parseNonComputedMember();
                expr = delegate.createMemberExpression('.', expr, property);
            } else if (match('(')) {
                args = parseArguments();
                expr = delegate.createCallExpression(expr, args);
            } else if (match('[')) {
                property = parseComputedMember();
                expr = delegate.createMemberExpression('[', expr, property);
            } else {
                break;
            }
            delegate.markEnd(expr, startToken);
        }

        return expr;
    }

    function parseLeftHandSideExpression() {
        var previousAllowIn, expr, property, startToken;

        startToken = lookahead;

        previousAllowIn = state.allowIn;
        expr = matchKeyword('new') ? parseNewExpression() : parsePrimaryExpression();
        state.allowIn = previousAllowIn;

        while (match('.') || match('[')) {
            if (match('[')) {
                property = parseComputedMember();
                expr = delegate.createMemberExpression('[', expr, property);
            } else {
                property = parseNonComputedMember();
                expr = delegate.createMemberExpression('.', expr, property);
            }
            delegate.markEnd(expr, startToken);
        }

        return expr;
    }

    // 11.3 Postfix Expressions

    function parsePostfixExpression() {
        var expr, token, startToken = lookahead;

        expr = parseLeftHandSideExpressionAllowCall();

        if (lookahead.type === Token.Punctuator) {
            if ((match('++') || match('--')) && !peekLineTerminator()) {
                // 11.3.1, 11.3.2
                if (strict && expr.type === Syntax.Identifier && isRestrictedWord(expr.name)) {
                    throwErrorTolerant({}, Messages.StrictLHSPostfix);
                }

                if (!isLeftHandSide(expr)) {
                    throwErrorTolerant({}, Messages.InvalidLHSInAssignment);
                }

                token = lex();
                expr = delegate.markEnd(delegate.createPostfixExpression(token.value, expr), startToken);
            }
        }

        return expr;
    }

    // 11.4 Unary Operators

    function parseUnaryExpression() {
        var token, expr, startToken;

        if (lookahead.type !== Token.Punctuator && lookahead.type !== Token.Keyword) {
            expr = parsePostfixExpression();
        } else if (match('++') || match('--')) {
            startToken = lookahead;
            token = lex();
            expr = parseUnaryExpression();
            // 11.4.4, 11.4.5
            if (strict && expr.type === Syntax.Identifier && isRestrictedWord(expr.name)) {
                throwErrorTolerant({}, Messages.StrictLHSPrefix);
            }

            if (!isLeftHandSide(expr)) {
                throwErrorTolerant({}, Messages.InvalidLHSInAssignment);
            }

            expr = delegate.createUnaryExpression(token.value, expr);
            expr = delegate.markEnd(expr, startToken);
        } else if (match('+') || match('-') || match('~') || match('!')) {
            startToken = lookahead;
            token = lex();
            expr = parseUnaryExpression();
            expr = delegate.createUnaryExpression(token.value, expr);
            expr = delegate.markEnd(expr, startToken);
        } else if (matchKeyword('delete') || matchKeyword('void') || matchKeyword('typeof')) {
            startToken = lookahead;
            token = lex();
            expr = parseUnaryExpression();
            expr = delegate.createUnaryExpression(token.value, expr);
            expr = delegate.markEnd(expr, startToken);
            if (strict && expr.operator === 'delete' && expr.argument.type === Syntax.Identifier) {
                throwErrorTolerant({}, Messages.StrictDelete);
            }
        } else {
            expr = parsePostfixExpression();
        }

        return expr;
    }

    function binaryPrecedence(token, allowIn) {
        var prec = 0;

        if (token.type !== Token.Punctuator && token.type !== Token.Keyword) {
            return 0;
        }

        switch (token.value) {
        case '||':
            prec = 1;
            break;

        case '&&':
            prec = 2;
            break;

        case '|':
            prec = 3;
            break;

        case '^':
            prec = 4;
            break;

        case '&':
            prec = 5;
            break;

        case '==':
        case '!=':
        case '===':
        case '!==':
            prec = 6;
            break;

        case '<':
        case '>':
        case '<=':
        case '>=':
        case 'instanceof':
            prec = 7;
            break;

        case 'in':
            prec = allowIn ? 7 : 0;
            break;

        case '<<':
        case '>>':
        case '>>>':
            prec = 8;
            break;

        case '+':
        case '-':
            prec = 9;
            break;

        case '*':
        case '/':
        case '%':
            prec = 11;
            break;

        default:
            break;
        }

        return prec;
    }

    // 11.5 Multiplicative Operators
    // 11.6 Additive Operators
    // 11.7 Bitwise Shift Operators
    // 11.8 Relational Operators
    // 11.9 Equality Operators
    // 11.10 Binary Bitwise Operators
    // 11.11 Binary Logical Operators

    function parseBinaryExpression() {
        var marker, markers, expr, token, prec, stack, right, operator, left, i;

        marker = lookahead;
        left = parseUnaryExpression();

        token = lookahead;
        prec = binaryPrecedence(token, state.allowIn);
        if (prec === 0) {
            return left;
        }
        token.prec = prec;
        lex();

        markers = [marker, lookahead];
        right = parseUnaryExpression();

        stack = [left, token, right];

        while ((prec = binaryPrecedence(lookahead, state.allowIn)) > 0) {

            // Reduce: make a binary expression from the three topmost entries.
            while ((stack.length > 2) && (prec <= stack[stack.length - 2].prec)) {
                right = stack.pop();
                operator = stack.pop().value;
                left = stack.pop();
                expr = delegate.createBinaryExpression(operator, left, right);
                markers.pop();
                marker = markers[markers.length - 1];
                delegate.markEnd(expr, marker);
                stack.push(expr);
            }

            // Shift.
            token = lex();
            token.prec = prec;
            stack.push(token);
            markers.push(lookahead);
            expr = parseUnaryExpression();
            stack.push(expr);
        }

        // Final reduce to clean-up the stack.
        i = stack.length - 1;
        expr = stack[i];
        markers.pop();
        while (i > 1) {
            expr = delegate.createBinaryExpression(stack[i - 1].value, stack[i - 2], expr);
            i -= 2;
            marker = markers.pop();
            delegate.markEnd(expr, marker);
        }

        return expr;
    }


    // 11.12 Conditional Operator

    function parseConditionalExpression() {
        var expr, previousAllowIn, consequent, alternate, startToken;

        startToken = lookahead;

        expr = parseBinaryExpression();

        if (match('?')) {
            lex();
            previousAllowIn = state.allowIn;
            state.allowIn = true;
            consequent = parseAssignmentExpression();
            state.allowIn = previousAllowIn;
            expect(':');
            alternate = parseAssignmentExpression();

            expr = delegate.createConditionalExpression(expr, consequent, alternate);
            delegate.markEnd(expr, startToken);
        }

        return expr;
    }

    // 11.13 Assignment Operators

    function parseAssignmentExpression() {
        var token, left, right, node, startToken;

        token = lookahead;
        startToken = lookahead;

        node = left = parseConditionalExpression();

        if (matchAssign()) {
            // LeftHandSideExpression
            if (!isLeftHandSide(left)) {
                throwErrorTolerant({}, Messages.InvalidLHSInAssignment);
            }

            // 11.13.1
            if (strict && left.type === Syntax.Identifier && isRestrictedWord(left.name)) {
                throwErrorTolerant(token, Messages.StrictLHSAssignment);
            }

            token = lex();
            right = parseAssignmentExpression();
            node = delegate.markEnd(delegate.createAssignmentExpression(token.value, left, right), startToken);
        }

        return node;
    }

    // 11.14 Comma Operator

    function parseExpression() {
        var expr, startToken = lookahead;

        expr = parseAssignmentExpression();

        if (match(',')) {
            expr = delegate.createSequenceExpression([ expr ]);

            while (index < length) {
                if (!match(',')) {
                    break;
                }
                lex();
                expr.expressions.push(parseAssignmentExpression());
            }

            delegate.markEnd(expr, startToken);
        }

        return expr;
    }

    // 12.1 Block

    function parseStatementList() {
        var list = [],
            statement;

        while (index < length) {
            if (match('}')) {
                break;
            }
            statement = parseSourceElement();
            if (typeof statement === 'undefined') {
                break;
            }
            list.push(statement);
        }

        return list;
    }

    function parseBlock() {
        var block, startToken;

        startToken = lookahead;
        expect('{');

        block = parseStatementList();

        expect('}');

        return delegate.markEnd(delegate.createBlockStatement(block), startToken);
    }

    // 12.2 Variable Statement

    function parseVariableIdentifier() {
        var token, startToken;

        startToken = lookahead;
        token = lex();

        if (token.type !== Token.Identifier) {
            throwUnexpected(token);
        }

        return delegate.markEnd(delegate.createIdentifier(token.value), startToken);
    }

    function parseVariableDeclaration(kind) {
        var init = null, id, startToken;

        startToken = lookahead;
        id = parseVariableIdentifier();

        // 12.2.1
        if (strict && isRestrictedWord(id.name)) {
            throwErrorTolerant({}, Messages.StrictVarName);
        }

        if (kind === 'const') {
            expect('=');
            init = parseAssignmentExpression();
        } else if (match('=')) {
            lex();
            init = parseAssignmentExpression();
        }

        return delegate.markEnd(delegate.createVariableDeclarator(id, init), startToken);
    }

    function parseVariableDeclarationList(kind) {
        var list = [];

        do {
            list.push(parseVariableDeclaration(kind));
            if (!match(',')) {
                break;
            }
            lex();
        } while (index < length);

        return list;
    }

    function parseVariableStatement() {
        var declarations;

        expectKeyword('var');

        declarations = parseVariableDeclarationList();

        consumeSemicolon();

        return delegate.createVariableDeclaration(declarations, 'var');
    }

    // kind may be `const` or `let`
    // Both are experimental and not in the specification yet.
    // see http://wiki.ecmascript.org/doku.php?id=harmony:const
    // and http://wiki.ecmascript.org/doku.php?id=harmony:let
    function parseConstLetDeclaration(kind) {
        var declarations, startToken;

        startToken = lookahead;

        expectKeyword(kind);

        declarations = parseVariableDeclarationList(kind);

        consumeSemicolon();

        return delegate.markEnd(delegate.createVariableDeclaration(declarations, kind), startToken);
    }

    // 12.3 Empty Statement

    function parseEmptyStatement() {
        expect(';');
        return delegate.createEmptyStatement();
    }

    // 12.4 Expression Statement

    function parseExpressionStatement() {
        var expr = parseExpression();
        consumeSemicolon();
        return delegate.createExpressionStatement(expr);
    }

    // 12.5 If statement

    function parseIfStatement() {
        var test, consequent, alternate;

        expectKeyword('if');

        expect('(');

        test = parseExpression();

        expect(')');

        consequent = parseStatement();

        if (matchKeyword('else')) {
            lex();
            alternate = parseStatement();
        } else {
            alternate = null;
        }

        return delegate.createIfStatement(test, consequent, alternate);
    }

    // 12.6 Iteration Statements

    function parseDoWhileStatement() {
        var body, test, oldInIteration;

        expectKeyword('do');

        oldInIteration = state.inIteration;
        state.inIteration = true;

        body = parseStatement();

        state.inIteration = oldInIteration;

        expectKeyword('while');

        expect('(');

        test = parseExpression();

        expect(')');

        if (match(';')) {
            lex();
        }

        return delegate.createDoWhileStatement(body, test);
    }

    function parseWhileStatement() {
        var test, body, oldInIteration;

        expectKeyword('while');

        expect('(');

        test = parseExpression();

        expect(')');

        oldInIteration = state.inIteration;
        state.inIteration = true;

        body = parseStatement();

        state.inIteration = oldInIteration;

        return delegate.createWhileStatement(test, body);
    }

    function parseForVariableDeclaration() {
        var token, declarations, startToken;

        startToken = lookahead;
        token = lex();
        declarations = parseVariableDeclarationList();

        return delegate.markEnd(delegate.createVariableDeclaration(declarations, token.value), startToken);
    }

    function parseForStatement() {
        var init, test, update, left, right, body, oldInIteration;

        init = test = update = null;

        expectKeyword('for');

        expect('(');

        if (match(';')) {
            lex();
        } else {
            if (matchKeyword('var') || matchKeyword('let')) {
                state.allowIn = false;
                init = parseForVariableDeclaration();
                state.allowIn = true;

                if (init.declarations.length === 1 && matchKeyword('in')) {
                    lex();
                    left = init;
                    right = parseExpression();
                    init = null;
                }
            } else {
                state.allowIn = false;
                init = parseExpression();
                state.allowIn = true;

                if (matchKeyword('in')) {
                    // LeftHandSideExpression
                    if (!isLeftHandSide(init)) {
                        throwErrorTolerant({}, Messages.InvalidLHSInForIn);
                    }

                    lex();
                    left = init;
                    right = parseExpression();
                    init = null;
                }
            }

            if (typeof left === 'undefined') {
                expect(';');
            }
        }

        if (typeof left === 'undefined') {

            if (!match(';')) {
                test = parseExpression();
            }
            expect(';');

            if (!match(')')) {
                update = parseExpression();
            }
        }

        expect(')');

        oldInIteration = state.inIteration;
        state.inIteration = true;

        body = parseStatement();

        state.inIteration = oldInIteration;

        return (typeof left === 'undefined') ?
                delegate.createForStatement(init, test, update, body) :
                delegate.createForInStatement(left, right, body);
    }

    // 12.7 The continue statement

    function parseContinueStatement() {
        var label = null, key;

        expectKeyword('continue');

        // Optimize the most common form: 'continue;'.
        if (source.charCodeAt(index) === 0x3B) {
            lex();

            if (!state.inIteration) {
                throwError({}, Messages.IllegalContinue);
            }

            return delegate.createContinueStatement(null);
        }

        if (peekLineTerminator()) {
            if (!state.inIteration) {
                throwError({}, Messages.IllegalContinue);
            }

            return delegate.createContinueStatement(null);
        }

        if (lookahead.type === Token.Identifier) {
            label = parseVariableIdentifier();

            key = '$' + label.name;
            if (!Object.prototype.hasOwnProperty.call(state.labelSet, key)) {
                throwError({}, Messages.UnknownLabel, label.name);
            }
        }

        consumeSemicolon();

        if (label === null && !state.inIteration) {
            throwError({}, Messages.IllegalContinue);
        }

        return delegate.createContinueStatement(label);
    }

    // 12.8 The break statement

    function parseBreakStatement() {
        var label = null, key;

        expectKeyword('break');

        // Catch the very common case first: immediately a semicolon (U+003B).
        if (source.charCodeAt(index) === 0x3B) {
            lex();

            if (!(state.inIteration || state.inSwitch)) {
                throwError({}, Messages.IllegalBreak);
            }

            return delegate.createBreakStatement(null);
        }

        if (peekLineTerminator()) {
            if (!(state.inIteration || state.inSwitch)) {
                throwError({}, Messages.IllegalBreak);
            }

            return delegate.createBreakStatement(null);
        }

        if (lookahead.type === Token.Identifier) {
            label = parseVariableIdentifier();

            key = '$' + label.name;
            if (!Object.prototype.hasOwnProperty.call(state.labelSet, key)) {
                throwError({}, Messages.UnknownLabel, label.name);
            }
        }

        consumeSemicolon();

        if (label === null && !(state.inIteration || state.inSwitch)) {
            throwError({}, Messages.IllegalBreak);
        }

        return delegate.createBreakStatement(label);
    }

    // 12.9 The return statement

    function parseReturnStatement() {
        var argument = null;

        expectKeyword('return');

        if (!state.inFunctionBody) {
            throwErrorTolerant({}, Messages.IllegalReturn);
        }

        // 'return' followed by a space and an identifier is very common.
        if (source.charCodeAt(index) === 0x20) {
            if (isIdentifierStart(source.charCodeAt(index + 1))) {
                argument = parseExpression();
                consumeSemicolon();
                return delegate.createReturnStatement(argument);
            }
        }

        if (peekLineTerminator()) {
            return delegate.createReturnStatement(null);
        }

        if (!match(';')) {
            if (!match('}') && lookahead.type !== Token.EOF) {
                argument = parseExpression();
            }
        }

        consumeSemicolon();

        return delegate.createReturnStatement(argument);
    }

    // 12.10 The with statement

    function parseWithStatement() {
        var object, body;

        if (strict) {
            // TODO(ikarienator): Should we update the test cases instead?
            skipComment();
            throwErrorTolerant({}, Messages.StrictModeWith);
        }

        expectKeyword('with');

        expect('(');

        object = parseExpression();

        expect(')');

        body = parseStatement();

        return delegate.createWithStatement(object, body);
    }

    // 12.10 The swith statement

    function parseSwitchCase() {
        var test, consequent = [], statement, startToken;

        startToken = lookahead;
        if (matchKeyword('default')) {
            lex();
            test = null;
        } else {
            expectKeyword('case');
            test = parseExpression();
        }
        expect(':');

        while (index < length) {
            if (match('}') || matchKeyword('default') || matchKeyword('case')) {
                break;
            }
            statement = parseStatement();
            consequent.push(statement);
        }

        return delegate.markEnd(delegate.createSwitchCase(test, consequent), startToken);
    }

    function parseSwitchStatement() {
        var discriminant, cases, clause, oldInSwitch, defaultFound;

        expectKeyword('switch');

        expect('(');

        discriminant = parseExpression();

        expect(')');

        expect('{');

        cases = [];

        if (match('}')) {
            lex();
            return delegate.createSwitchStatement(discriminant, cases);
        }

        oldInSwitch = state.inSwitch;
        state.inSwitch = true;
        defaultFound = false;

        while (index < length) {
            if (match('}')) {
                break;
            }
            clause = parseSwitchCase();
            if (clause.test === null) {
                if (defaultFound) {
                    throwError({}, Messages.MultipleDefaultsInSwitch);
                }
                defaultFound = true;
            }
            cases.push(clause);
        }

        state.inSwitch = oldInSwitch;

        expect('}');

        return delegate.createSwitchStatement(discriminant, cases);
    }

    // 12.13 The throw statement

    function parseThrowStatement() {
        var argument;

        expectKeyword('throw');

        if (peekLineTerminator()) {
            throwError({}, Messages.NewlineAfterThrow);
        }

        argument = parseExpression();

        consumeSemicolon();

        return delegate.createThrowStatement(argument);
    }

    // 12.14 The try statement

    function parseCatchClause() {
        var param, body, startToken;

        startToken = lookahead;
        expectKeyword('catch');

        expect('(');
        if (match(')')) {
            throwUnexpected(lookahead);
        }

        param = parseVariableIdentifier();
        // 12.14.1
        if (strict && isRestrictedWord(param.name)) {
            throwErrorTolerant({}, Messages.StrictCatchVariable);
        }

        expect(')');
        body = parseBlock();
        return delegate.markEnd(delegate.createCatchClause(param, body), startToken);
    }

    function parseTryStatement() {
        var block, handlers = [], finalizer = null;

        expectKeyword('try');

        block = parseBlock();

        if (matchKeyword('catch')) {
            handlers.push(parseCatchClause());
        }

        if (matchKeyword('finally')) {
            lex();
            finalizer = parseBlock();
        }

        if (handlers.length === 0 && !finalizer) {
            throwError({}, Messages.NoCatchOrFinally);
        }

        return delegate.createTryStatement(block, [], handlers, finalizer);
    }

    // 12.15 The debugger statement

    function parseDebuggerStatement() {
        expectKeyword('debugger');

        consumeSemicolon();

        return delegate.createDebuggerStatement();
    }

    // 12 Statements

    function parseStatement() {
        var type = lookahead.type,
            expr,
            labeledBody,
            key,
            startToken;

        if (type === Token.EOF) {
            throwUnexpected(lookahead);
        }

        if (type === Token.Punctuator && lookahead.value === '{') {
            return parseBlock();
        }

        startToken = lookahead;

        if (type === Token.Punctuator) {
            switch (lookahead.value) {
            case ';':
                return delegate.markEnd(parseEmptyStatement(), startToken);
            case '(':
                return delegate.markEnd(parseExpressionStatement(), startToken);
            default:
                break;
            }
        }

        if (type === Token.Keyword) {
            switch (lookahead.value) {
            case 'break':
                return delegate.markEnd(parseBreakStatement(), startToken);
            case 'continue':
                return delegate.markEnd(parseContinueStatement(), startToken);
            case 'debugger':
                return delegate.markEnd(parseDebuggerStatement(), startToken);
            case 'do':
                return delegate.markEnd(parseDoWhileStatement(), startToken);
            case 'for':
                return delegate.markEnd(parseForStatement(), startToken);
            case 'function':
                return delegate.markEnd(parseFunctionDeclaration(), startToken);
            case 'if':
                return delegate.markEnd(parseIfStatement(), startToken);
            case 'return':
                return delegate.markEnd(parseReturnStatement(), startToken);
            case 'switch':
                return delegate.markEnd(parseSwitchStatement(), startToken);
            case 'throw':
                return delegate.markEnd(parseThrowStatement(), startToken);
            case 'try':
                return delegate.markEnd(parseTryStatement(), startToken);
            case 'var':
                return delegate.markEnd(parseVariableStatement(), startToken);
            case 'while':
                return delegate.markEnd(parseWhileStatement(), startToken);
            case 'with':
                return delegate.markEnd(parseWithStatement(), startToken);
            default:
                break;
            }
        }

        expr = parseExpression();

        // 12.12 Labelled Statements
        if ((expr.type === Syntax.Identifier) && match(':')) {
            lex();

            key = '$' + expr.name;
            if (Object.prototype.hasOwnProperty.call(state.labelSet, key)) {
                throwError({}, Messages.Redeclaration, 'Label', expr.name);
            }

            state.labelSet[key] = true;
            labeledBody = parseStatement();
            delete state.labelSet[key];
            return delegate.markEnd(delegate.createLabeledStatement(expr, labeledBody), startToken);
        }

        consumeSemicolon();

        return delegate.markEnd(delegate.createExpressionStatement(expr), startToken);
    }

    // 13 Function Definition

    function parseFunctionSourceElements() {
        var sourceElement, sourceElements = [], token, directive, firstRestricted,
            oldLabelSet, oldInIteration, oldInSwitch, oldInFunctionBody, startToken;

        startToken = lookahead;
        expect('{');

        while (index < length) {
            if (lookahead.type !== Token.StringLiteral) {
                break;
            }
            token = lookahead;

            sourceElement = parseSourceElement();
            sourceElements.push(sourceElement);
            if (sourceElement.expression.type !== Syntax.Literal) {
                // this is not directive
                break;
            }
            directive = source.slice(token.start + 1, token.end - 1);
            if (directive === 'use strict') {
                strict = true;
                if (firstRestricted) {
                    throwErrorTolerant(firstRestricted, Messages.StrictOctalLiteral);
                }
            } else {
                if (!firstRestricted && token.octal) {
                    firstRestricted = token;
                }
            }
        }

        oldLabelSet = state.labelSet;
        oldInIteration = state.inIteration;
        oldInSwitch = state.inSwitch;
        oldInFunctionBody = state.inFunctionBody;

        state.labelSet = {};
        state.inIteration = false;
        state.inSwitch = false;
        state.inFunctionBody = true;

        while (index < length) {
            if (match('}')) {
                break;
            }
            sourceElement = parseSourceElement();
            if (typeof sourceElement === 'undefined') {
                break;
            }
            sourceElements.push(sourceElement);
        }

        expect('}');

        state.labelSet = oldLabelSet;
        state.inIteration = oldInIteration;
        state.inSwitch = oldInSwitch;
        state.inFunctionBody = oldInFunctionBody;

        return delegate.markEnd(delegate.createBlockStatement(sourceElements), startToken);
    }

    function parseParams(firstRestricted) {
        var param, params = [], token, stricted, paramSet, key, message;
        expect('(');

        if (!match(')')) {
            paramSet = {};
            while (index < length) {
                token = lookahead;
                param = parseVariableIdentifier();
                key = '$' + token.value;
                if (strict) {
                    if (isRestrictedWord(token.value)) {
                        stricted = token;
                        message = Messages.StrictParamName;
                    }
                    if (Object.prototype.hasOwnProperty.call(paramSet, key)) {
                        stricted = token;
                        message = Messages.StrictParamDupe;
                    }
                } else if (!firstRestricted) {
                    if (isRestrictedWord(token.value)) {
                        firstRestricted = token;
                        message = Messages.StrictParamName;
                    } else if (isStrictModeReservedWord(token.value)) {
                        firstRestricted = token;
                        message = Messages.StrictReservedWord;
                    } else if (Object.prototype.hasOwnProperty.call(paramSet, key)) {
                        firstRestricted = token;
                        message = Messages.StrictParamDupe;
                    }
                }
                params.push(param);
                paramSet[key] = true;
                if (match(')')) {
                    break;
                }
                expect(',');
            }
        }

        expect(')');

        return {
            params: params,
            stricted: stricted,
            firstRestricted: firstRestricted,
            message: message
        };
    }

    function parseFunctionDeclaration() {
        var id, params = [], body, token, stricted, tmp, firstRestricted, message, previousStrict, startToken;

        startToken = lookahead;

        expectKeyword('function');
        token = lookahead;
        id = parseVariableIdentifier();
        if (strict) {
            if (isRestrictedWord(token.value)) {
                throwErrorTolerant(token, Messages.StrictFunctionName);
            }
        } else {
            if (isRestrictedWord(token.value)) {
                firstRestricted = token;
                message = Messages.StrictFunctionName;
            } else if (isStrictModeReservedWord(token.value)) {
                firstRestricted = token;
                message = Messages.StrictReservedWord;
            }
        }

        tmp = parseParams(firstRestricted);
        params = tmp.params;
        stricted = tmp.stricted;
        firstRestricted = tmp.firstRestricted;
        if (tmp.message) {
            message = tmp.message;
        }

        previousStrict = strict;
        body = parseFunctionSourceElements();
        if (strict && firstRestricted) {
            throwError(firstRestricted, message);
        }
        if (strict && stricted) {
            throwErrorTolerant(stricted, message);
        }
        strict = previousStrict;

        return delegate.markEnd(delegate.createFunctionDeclaration(id, params, [], body), startToken);
    }

    function parseFunctionExpression() {
        var token, id = null, stricted, firstRestricted, message, tmp, params = [], body, previousStrict, startToken;

        startToken = lookahead;
        expectKeyword('function');

        if (!match('(')) {
            token = lookahead;
            id = parseVariableIdentifier();
            if (strict) {
                if (isRestrictedWord(token.value)) {
                    throwErrorTolerant(token, Messages.StrictFunctionName);
                }
            } else {
                if (isRestrictedWord(token.value)) {
                    firstRestricted = token;
                    message = Messages.StrictFunctionName;
                } else if (isStrictModeReservedWord(token.value)) {
                    firstRestricted = token;
                    message = Messages.StrictReservedWord;
                }
            }
        }

        tmp = parseParams(firstRestricted);
        params = tmp.params;
        stricted = tmp.stricted;
        firstRestricted = tmp.firstRestricted;
        if (tmp.message) {
            message = tmp.message;
        }

        previousStrict = strict;
        body = parseFunctionSourceElements();
        if (strict && firstRestricted) {
            throwError(firstRestricted, message);
        }
        if (strict && stricted) {
            throwErrorTolerant(stricted, message);
        }
        strict = previousStrict;

        return delegate.markEnd(delegate.createFunctionExpression(id, params, [], body), startToken);
    }

    // 14 Program

    function parseSourceElement() {
        if (lookahead.type === Token.Keyword) {
            switch (lookahead.value) {
            case 'const':
            case 'let':
                return parseConstLetDeclaration(lookahead.value);
            case 'function':
                return parseFunctionDeclaration();
            default:
                return parseStatement();
            }
        }

        if (lookahead.type !== Token.EOF) {
            return parseStatement();
        }
    }

    function parseSourceElements() {
        var sourceElement, sourceElements = [], token, directive, firstRestricted;

        while (index < length) {
            token = lookahead;
            if (token.type !== Token.StringLiteral) {
                break;
            }

            sourceElement = parseSourceElement();
            sourceElements.push(sourceElement);
            if (sourceElement.expression.type !== Syntax.Literal) {
                // this is not directive
                break;
            }
            directive = source.slice(token.start + 1, token.end - 1);
            if (directive === 'use strict') {
                strict = true;
                if (firstRestricted) {
                    throwErrorTolerant(firstRestricted, Messages.StrictOctalLiteral);
                }
            } else {
                if (!firstRestricted && token.octal) {
                    firstRestricted = token;
                }
            }
        }

        while (index < length) {
            sourceElement = parseSourceElement();
            /* istanbul ignore if */
            if (typeof sourceElement === 'undefined') {
                break;
            }
            sourceElements.push(sourceElement);
        }
        return sourceElements;
    }

    function parseProgram() {
        var body, startToken;

        skipComment();
        peek();
        startToken = lookahead;
        strict = false;

        body = parseSourceElements();
        return delegate.markEnd(delegate.createProgram(body), startToken);
    }

    function filterTokenLocation() {
        var i, entry, token, tokens = [];

        for (i = 0; i < extra.tokens.length; ++i) {
            entry = extra.tokens[i];
            token = {
                type: entry.type,
                value: entry.value
            };
            if (extra.range) {
                token.range = entry.range;
            }
            if (extra.loc) {
                token.loc = entry.loc;
            }
            tokens.push(token);
        }

        extra.tokens = tokens;
    }

    function tokenize(code, options) {
        var toString,
            token,
            tokens;

        toString = String;
        if (typeof code !== 'string' && !(code instanceof String)) {
            code = toString(code);
        }

        delegate = SyntaxTreeDelegate;
        source = code;
        index = 0;
        lineNumber = (source.length > 0) ? 1 : 0;
        lineStart = 0;
        length = source.length;
        lookahead = null;
        state = {
            allowIn: true,
            labelSet: {},
            inFunctionBody: false,
            inIteration: false,
            inSwitch: false,
            lastCommentStart: -1
        };

        extra = {};

        // Options matching.
        options = options || {};

        // Of course we collect tokens here.
        options.tokens = true;
        extra.tokens = [];
        extra.tokenize = true;
        // The following two fields are necessary to compute the Regex tokens.
        extra.openParenToken = -1;
        extra.openCurlyToken = -1;

        extra.range = (typeof options.range === 'boolean') && options.range;
        extra.loc = (typeof options.loc === 'boolean') && options.loc;

        if (typeof options.comment === 'boolean' && options.comment) {
            extra.comments = [];
        }
        if (typeof options.tolerant === 'boolean' && options.tolerant) {
            extra.errors = [];
        }

        try {
            peek();
            if (lookahead.type === Token.EOF) {
                return extra.tokens;
            }

            token = lex();
            while (lookahead.type !== Token.EOF) {
                try {
                    token = lex();
                } catch (lexError) {
                    token = lookahead;
                    if (extra.errors) {
                        extra.errors.push(lexError);
                        // We have to break on the first error
                        // to avoid infinite loops.
                        break;
                    } else {
                        throw lexError;
                    }
                }
            }

            filterTokenLocation();
            tokens = extra.tokens;
            if (typeof extra.comments !== 'undefined') {
                tokens.comments = extra.comments;
            }
            if (typeof extra.errors !== 'undefined') {
                tokens.errors = extra.errors;
            }
        } catch (e) {
            throw e;
        } finally {
            extra = {};
        }
        return tokens;
    }

    function parse(code, options) {
        var program, toString;

        toString = String;
        if (typeof code !== 'string' && !(code instanceof String)) {
            code = toString(code);
        }

        delegate = SyntaxTreeDelegate;
        source = code;
        index = 0;
        lineNumber = (source.length > 0) ? 1 : 0;
        lineStart = 0;
        length = source.length;
        lookahead = null;
        state = {
            allowIn: true,
            labelSet: {},
            inFunctionBody: false,
            inIteration: false,
            inSwitch: false,
            lastCommentStart: -1
        };

        extra = {};
        if (typeof options !== 'undefined') {
            extra.range = (typeof options.range === 'boolean') && options.range;
            extra.loc = (typeof options.loc === 'boolean') && options.loc;
            extra.attachComment = (typeof options.attachComment === 'boolean') && options.attachComment;

            if (extra.loc && options.source !== null && options.source !== undefined) {
                extra.source = toString(options.source);
            }

            if (typeof options.tokens === 'boolean' && options.tokens) {
                extra.tokens = [];
            }
            if (typeof options.comment === 'boolean' && options.comment) {
                extra.comments = [];
            }
            if (typeof options.tolerant === 'boolean' && options.tolerant) {
                extra.errors = [];
            }
            if (extra.attachComment) {
                extra.range = true;
                extra.comments = [];
                extra.bottomRightStack = [];
                extra.trailingComments = [];
                extra.leadingComments = [];
            }
        }

        try {
            program = parseProgram();
            if (typeof extra.comments !== 'undefined') {
                program.comments = extra.comments;
            }
            if (typeof extra.tokens !== 'undefined') {
                filterTokenLocation();
                program.tokens = extra.tokens;
            }
            if (typeof extra.errors !== 'undefined') {
                program.errors = extra.errors;
            }
        } catch (e) {
            throw e;
        } finally {
            extra = {};
        }

        return program;
    }

    // Sync with *.json manifests.
    exports.version = '1.2.2';

    exports.tokenize = tokenize;

    exports.parse = parse;

    // Deep copy.
   /* istanbul ignore next */
    exports.Syntax = (function () {
        var name, types = {};

        if (typeof Object.create === 'function') {
            types = Object.create(null);
        }

        for (name in Syntax) {
            if (Syntax.hasOwnProperty(name)) {
                types[name] = Syntax[name];
            }
        }

        if (typeof Object.freeze === 'function') {
            Object.freeze(types);
        }

        return types;
    }());

}));
/* vim: set sw=4 ts=4 et tw=80 : */



/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var aesprim = __webpack_require__(48);
var slice = __webpack_require__(47);
var _evaluate = __webpack_require__(46);
var _uniq = __webpack_require__(31).uniq;

var Handlers = function() {
  return this.initialize.apply(this, arguments);
}

Handlers.prototype.initialize = function() {
  this.traverse = traverser(true);
  this.descend = traverser();
}

Handlers.prototype.keys = Object.keys;

Handlers.prototype.resolve = function(component) {

  var key = [ component.operation, component.scope, component.expression.type ].join('-');
  var method = this._fns[key];

  if (!method) throw new Error("couldn't resolve key: " + key);
  return method.bind(this);
};

Handlers.prototype.register = function(key, handler) {

  if (!handler instanceof Function) {
    throw new Error("handler must be a function");
  }

  this._fns[key] = handler;
};

Handlers.prototype._fns = {

  'member-child-identifier': function(component, partial) {
    var key = component.expression.value;
    var value = partial.value;
    if (value instanceof Object && key in value) {
      return [ { value: value[key], path: partial.path.concat(key) } ]
    }
  },

  'member-descendant-identifier':
    _traverse(function(key, value, ref) { return key == ref }),

  'subscript-child-numeric_literal':
    _descend(function(key, value, ref) { return key === ref }),

  'member-child-numeric_literal':
    _descend(function(key, value, ref) { return String(key) === String(ref) }),

  'subscript-descendant-numeric_literal':
    _traverse(function(key, value, ref) { return key === ref }),

  'member-child-wildcard':
    _descend(function() { return true }),

  'member-descendant-wildcard':
    _traverse(function() { return true }),

  'subscript-descendant-wildcard':
    _traverse(function() { return true }),

  'subscript-child-wildcard':
    _descend(function() { return true }),

  'subscript-child-slice': function(component, partial) {
    if (is_array(partial.value)) {
      var args = component.expression.value.split(':').map(_parse_nullable_int);
      var values = partial.value.map(function(v, i) { return { value: v, path: partial.path.concat(i) } });
      return slice.apply(null, [values].concat(args));
    }
  },

  'subscript-child-union': function(component, partial) {
    var results = [];
    component.expression.value.forEach(function(component) {
      var _component = { operation: 'subscript', scope: 'child', expression: component.expression };
      var handler = this.resolve(_component);
      var _results = handler(_component, partial);
      if (_results) {
        results = results.concat(_results);
      }
    }, this);

    return unique(results);
  },

  'subscript-descendant-union': function(component, partial, count) {

    var jp = __webpack_require__(3);
    var self = this;

    var results = [];
    var nodes = jp.nodes(partial, '$..*').slice(1);

    nodes.forEach(function(node) {
      if (results.length >= count) return;
      component.expression.value.forEach(function(component) {
        var _component = { operation: 'subscript', scope: 'child', expression: component.expression };
        var handler = self.resolve(_component);
        var _results = handler(_component, node);
        results = results.concat(_results);
      });
    });

    return unique(results);
  },

  'subscript-child-filter_expression': function(component, partial, count) {

    // slice out the expression from ?(expression)
    var src = component.expression.value.slice(2, -1);
    var ast = aesprim.parse(src).body[0].expression;

    var passable = function(key, value) {
      return evaluate(ast, { '@': value });
    }

    return this.descend(partial, null, passable, count);

  },

  'subscript-descendant-filter_expression': function(component, partial, count) {

    // slice out the expression from ?(expression)
    var src = component.expression.value.slice(2, -1);
    var ast = aesprim.parse(src).body[0].expression;

    var passable = function(key, value) {
      return evaluate(ast, { '@': value });
    }

    return this.traverse(partial, null, passable, count);
  },

  'subscript-child-script_expression': function(component, partial) {
    var exp = component.expression.value.slice(1, -1);
    return eval_recurse(partial, exp, '$[{{value}}]');
  },

  'member-child-script_expression': function(component, partial) {
    var exp = component.expression.value.slice(1, -1);
    return eval_recurse(partial, exp, '$.{{value}}');
  },

  'member-descendant-script_expression': function(component, partial) {
    var exp = component.expression.value.slice(1, -1);
    return eval_recurse(partial, exp, '$..value');
  }
};

Handlers.prototype._fns['subscript-child-string_literal'] =
	Handlers.prototype._fns['member-child-identifier'];

Handlers.prototype._fns['member-descendant-numeric_literal'] =
    Handlers.prototype._fns['subscript-descendant-string_literal'] =
    Handlers.prototype._fns['member-descendant-identifier'];

function eval_recurse(partial, src, template) {

  var jp = __webpack_require__(16);
  var ast = aesprim.parse(src).body[0].expression;
  var value = evaluate(ast, { '@': partial.value });
  var path = template.replace(/\{\{\s*value\s*\}\}/g, value);

  var results = jp.nodes(partial.value, path);
  results.forEach(function(r) {
    r.path = partial.path.concat(r.path.slice(1));
  });

  return results;
}

function is_array(val) {
  return Array.isArray(val);
}

function is_object(val) {
  // is this a non-array, non-null object?
  return val && !(val instanceof Array) && val instanceof Object;
}

function traverser(recurse) {

  return function(partial, ref, passable, count) {

    var value = partial.value;
    var path = partial.path;

    var results = [];

    var descend = function(value, path) {

      if (is_array(value)) {
        value.forEach(function(element, index) {
          if (results.length >= count) { return }
          if (passable(index, element, ref)) {
            results.push({ path: path.concat(index), value: element });
          }
        });
        value.forEach(function(element, index) {
          if (results.length >= count) { return }
          if (recurse) {
            descend(element, path.concat(index));
          }
        });
      } else if (is_object(value)) {
        this.keys(value).forEach(function(k) {
          if (results.length >= count) { return }
          if (passable(k, value[k], ref)) {
            results.push({ path: path.concat(k), value: value[k] });
          }
        })
        this.keys(value).forEach(function(k) {
          if (results.length >= count) { return }
          if (recurse) {
            descend(value[k], path.concat(k));
          }
        });
      }
    }.bind(this);
    descend(value, path);
    return results;
  }
}

function _descend(passable) {
  return function(component, partial, count) {
    return this.descend(partial, component.expression.value, passable, count);
  }
}

function _traverse(passable) {
  return function(component, partial, count) {
    return this.traverse(partial, component.expression.value, passable, count);
  }
}

function evaluate() {
  try { return _evaluate.apply(this, arguments) }
  catch (e) { }
}

function unique(results) {
  results = results.filter(function(d) { return d })
  return _uniq(
    results,
    function(r) { return r.path.map(function(c) { return String(c).replace('-', '--') }).join('-') }
  );
}

function _parse_nullable_int(val) {
  var sval = String(val);
  return sval.match(/^-?[0-9]+$/) ? parseInt(sval) : null;
}

module.exports = Handlers;


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

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

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(7)))

/***/ }),
/* 51 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

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
symbols_: {"error":2,"JSON_PATH":3,"DOLLAR":4,"PATH_COMPONENTS":5,"LEADING_CHILD_MEMBER_EXPRESSION":6,"PATH_COMPONENT":7,"MEMBER_COMPONENT":8,"SUBSCRIPT_COMPONENT":9,"CHILD_MEMBER_COMPONENT":10,"DESCENDANT_MEMBER_COMPONENT":11,"DOT":12,"MEMBER_EXPRESSION":13,"DOT_DOT":14,"STAR":15,"IDENTIFIER":16,"SCRIPT_EXPRESSION":17,"INTEGER":18,"END":19,"CHILD_SUBSCRIPT_COMPONENT":20,"DESCENDANT_SUBSCRIPT_COMPONENT":21,"[":22,"SUBSCRIPT":23,"]":24,"SUBSCRIPT_EXPRESSION":25,"SUBSCRIPT_EXPRESSION_LIST":26,"SUBSCRIPT_EXPRESSION_LISTABLE":27,",":28,"STRING_LITERAL":29,"ARRAY_SLICE":30,"FILTER_EXPRESSION":31,"QQ_STRING":32,"Q_STRING":33,"$accept":0,"$end":1},
terminals_: {2:"error",4:"DOLLAR",12:"DOT",14:"DOT_DOT",15:"STAR",16:"IDENTIFIER",17:"SCRIPT_EXPRESSION",18:"INTEGER",19:"END",22:"[",24:"]",28:",",30:"ARRAY_SLICE",31:"FILTER_EXPRESSION",32:"QQ_STRING",33:"Q_STRING"},
productions_: [0,[3,1],[3,2],[3,1],[3,2],[5,1],[5,2],[7,1],[7,1],[8,1],[8,1],[10,2],[6,1],[11,2],[13,1],[13,1],[13,1],[13,1],[13,1],[9,1],[9,1],[20,3],[21,4],[23,1],[23,1],[26,1],[26,3],[27,1],[27,1],[27,1],[25,1],[25,1],[25,1],[29,1],[29,1]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */
/**/) {
/* this == yyval */
if (!yy.ast) {
    yy.ast = _ast;
    _ast.initialize();
}

var $0 = $$.length - 1;
switch (yystate) {
case 1:yy.ast.set({ expression: { type: "root", value: $$[$0] } }); yy.ast.unshift(); return yy.ast.yield()
break;
case 2:yy.ast.set({ expression: { type: "root", value: $$[$0-1] } }); yy.ast.unshift(); return yy.ast.yield()
break;
case 3:yy.ast.unshift(); return yy.ast.yield()
break;
case 4:yy.ast.set({ operation: "member", scope: "child", expression: { type: "identifier", value: $$[$0-1] }}); yy.ast.unshift(); return yy.ast.yield()
break;
case 5:
break;
case 6:
break;
case 7:yy.ast.set({ operation: "member" }); yy.ast.push()
break;
case 8:yy.ast.set({ operation: "subscript" }); yy.ast.push() 
break;
case 9:yy.ast.set({ scope: "child" })
break;
case 10:yy.ast.set({ scope: "descendant" })
break;
case 11:
break;
case 12:yy.ast.set({ scope: "child", operation: "member" })
break;
case 13:
break;
case 14:yy.ast.set({ expression: { type: "wildcard", value: $$[$0] } })
break;
case 15:yy.ast.set({ expression: { type: "identifier", value: $$[$0] } })
break;
case 16:yy.ast.set({ expression: { type: "script_expression", value: $$[$0] } })
break;
case 17:yy.ast.set({ expression: { type: "numeric_literal", value: parseInt($$[$0]) } })
break;
case 18:
break;
case 19:yy.ast.set({ scope: "child" })
break;
case 20:yy.ast.set({ scope: "descendant" })
break;
case 21:
break;
case 22:
break;
case 23:
break;
case 24:$$[$0].length > 1? yy.ast.set({ expression: { type: "union", value: $$[$0] } }) : this.$ = $$[$0]
break;
case 25:this.$ = [$$[$0]]
break;
case 26:this.$ = $$[$0-2].concat($$[$0])
break;
case 27:this.$ = { expression: { type: "numeric_literal", value: parseInt($$[$0]) } }; yy.ast.set(this.$)
break;
case 28:this.$ = { expression: { type: "string_literal", value: $$[$0] } }; yy.ast.set(this.$)
break;
case 29:this.$ = { expression: { type: "slice", value: $$[$0] } }; yy.ast.set(this.$)
break;
case 30:this.$ = { expression: { type: "wildcard", value: $$[$0] } }; yy.ast.set(this.$)
break;
case 31:this.$ = { expression: { type: "script_expression", value: $$[$0] } }; yy.ast.set(this.$)
break;
case 32:this.$ = { expression: { type: "filter_expression", value: $$[$0] } }; yy.ast.set(this.$)
break;
case 33:this.$ = $$[$0]
break;
case 34:this.$ = $$[$0]
break;
}
},
table: [{3:1,4:[1,2],6:3,13:4,15:[1,5],16:[1,6],17:[1,7],18:[1,8],19:[1,9]},{1:[3]},{1:[2,1],5:10,7:11,8:12,9:13,10:14,11:15,12:[1,18],14:[1,19],20:16,21:17,22:[1,20]},{1:[2,3],5:21,7:11,8:12,9:13,10:14,11:15,12:[1,18],14:[1,19],20:16,21:17,22:[1,20]},{1:[2,12],12:[2,12],14:[2,12],22:[2,12]},{1:[2,14],12:[2,14],14:[2,14],22:[2,14]},{1:[2,15],12:[2,15],14:[2,15],22:[2,15]},{1:[2,16],12:[2,16],14:[2,16],22:[2,16]},{1:[2,17],12:[2,17],14:[2,17],22:[2,17]},{1:[2,18],12:[2,18],14:[2,18],22:[2,18]},{1:[2,2],7:22,8:12,9:13,10:14,11:15,12:[1,18],14:[1,19],20:16,21:17,22:[1,20]},{1:[2,5],12:[2,5],14:[2,5],22:[2,5]},{1:[2,7],12:[2,7],14:[2,7],22:[2,7]},{1:[2,8],12:[2,8],14:[2,8],22:[2,8]},{1:[2,9],12:[2,9],14:[2,9],22:[2,9]},{1:[2,10],12:[2,10],14:[2,10],22:[2,10]},{1:[2,19],12:[2,19],14:[2,19],22:[2,19]},{1:[2,20],12:[2,20],14:[2,20],22:[2,20]},{13:23,15:[1,5],16:[1,6],17:[1,7],18:[1,8],19:[1,9]},{13:24,15:[1,5],16:[1,6],17:[1,7],18:[1,8],19:[1,9],22:[1,25]},{15:[1,29],17:[1,30],18:[1,33],23:26,25:27,26:28,27:32,29:34,30:[1,35],31:[1,31],32:[1,36],33:[1,37]},{1:[2,4],7:22,8:12,9:13,10:14,11:15,12:[1,18],14:[1,19],20:16,21:17,22:[1,20]},{1:[2,6],12:[2,6],14:[2,6],22:[2,6]},{1:[2,11],12:[2,11],14:[2,11],22:[2,11]},{1:[2,13],12:[2,13],14:[2,13],22:[2,13]},{15:[1,29],17:[1,30],18:[1,33],23:38,25:27,26:28,27:32,29:34,30:[1,35],31:[1,31],32:[1,36],33:[1,37]},{24:[1,39]},{24:[2,23]},{24:[2,24],28:[1,40]},{24:[2,30]},{24:[2,31]},{24:[2,32]},{24:[2,25],28:[2,25]},{24:[2,27],28:[2,27]},{24:[2,28],28:[2,28]},{24:[2,29],28:[2,29]},{24:[2,33],28:[2,33]},{24:[2,34],28:[2,34]},{24:[1,41]},{1:[2,21],12:[2,21],14:[2,21],22:[2,21]},{18:[1,33],27:42,29:34,30:[1,35],32:[1,36],33:[1,37]},{1:[2,22],12:[2,22],14:[2,22],22:[2,22]},{24:[2,26],28:[2,26]}],
defaultActions: {27:[2,23],29:[2,30],30:[2,31],31:[2,32]},
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
var _ast = {

  initialize: function() {
    this._nodes = [];
    this._node = {};
    this._stash = [];
  },

  set: function(props) {
    for (var k in props) this._node[k] = props[k];
    return this._node;
  },

  node: function(obj) {
    if (arguments.length) this._node = obj;
    return this._node;
  },

  push: function() {
    this._nodes.push(this._node);
    this._node = {};
  },

  unshift: function() {
    this._nodes.unshift(this._node);
    this._node = {};
  },

  yield: function() {
    var _nodes = this._nodes;
    this.initialize();
    return _nodes;
  }
};
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
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START
/**/) {

var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:return 4
break;
case 1:return 14
break;
case 2:return 12
break;
case 3:return 15
break;
case 4:return 16
break;
case 5:return 22
break;
case 6:return 24
break;
case 7:return 28
break;
case 8:return 30
break;
case 9:return 18
break;
case 10:yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2); return 32;
break;
case 11:yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2); return 33;
break;
case 12:return 17
break;
case 13:return 31
break;
}
},
rules: [/^(?:\$)/,/^(?:\.\.)/,/^(?:\.)/,/^(?:\*)/,/^(?:[a-zA-Z_]+[a-zA-Z0-9_]*)/,/^(?:\[)/,/^(?:\])/,/^(?:,)/,/^(?:((-?(?:0|[1-9][0-9]*)))?\:((-?(?:0|[1-9][0-9]*)))?(\:((-?(?:0|[1-9][0-9]*)))?)?)/,/^(?:(-?(?:0|[1-9][0-9]*)))/,/^(?:"(?:\\["bfnrt/\\]|\\u[a-fA-F0-9]{4}|[^"\\])*")/,/^(?:'(?:\\['bfnrt/\\]|\\u[a-fA-F0-9]{4}|[^'\\])*')/,/^(?:\(.+?\)(?=\]))/,/^(?:\?\(.+?\)(?=\]))/],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13],"inclusive":true}}
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
    var source = __webpack_require__(14).readFileSync(__webpack_require__(50).normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && __webpack_require__.c[__webpack_require__.s] === module) {
  exports.main(process.argv.slice(1));
}
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(7), __webpack_require__(51)(module)))

/***/ }),
/* 53 */
/***/ (function(module, exports) {

if (!yy.ast) {
    yy.ast = _ast;
    _ast.initialize();
}


/***/ }),
/* 54 */
/***/ (function(module, exports) {

var _ast = {

  initialize: function() {
    this._nodes = [];
    this._node = {};
    this._stash = [];
  },

  set: function(props) {
    for (var k in props) this._node[k] = props[k];
    return this._node;
  },

  node: function(obj) {
    if (arguments.length) this._node = obj;
    return this._node;
  },

  push: function() {
    this._nodes.push(this._node);
    this._node = {};
  },

  unshift: function() {
    this._nodes.unshift(this._node);
    this._node = {};
  },

  yield: function() {
    var _nodes = this._nodes;
    this.initialize();
    return _nodes;
  }
};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var dict = __webpack_require__(15);
var fs = __webpack_require__(14);
var grammar = {

    lex: {

        macros: {
            esc: "\\\\",
            int: dict.integer
        },

        rules: [
            ["\\$", "return 'DOLLAR'"],
            ["\\.\\.", "return 'DOT_DOT'"],
            ["\\.", "return 'DOT'"],
            ["\\*", "return 'STAR'"],
            [dict.identifier, "return 'IDENTIFIER'"],
            ["\\[", "return '['"],
            ["\\]", "return ']'"],
            [",", "return ','"],
            ["({int})?\\:({int})?(\\:({int})?)?", "return 'ARRAY_SLICE'"],
            ["{int}", "return 'INTEGER'"],
            [dict.qq_string, "yytext = yytext.substr(1,yyleng-2); return 'QQ_STRING';"],
            [dict.q_string, "yytext = yytext.substr(1,yyleng-2); return 'Q_STRING';"],
            ["\\(.+?\\)(?=\\])", "return 'SCRIPT_EXPRESSION'"],
            ["\\?\\(.+?\\)(?=\\])", "return 'FILTER_EXPRESSION'"]
        ]
    },

    start: "JSON_PATH",

    bnf: {

        JSON_PATH: [
                [ 'DOLLAR',                 'yy.ast.set({ expression: { type: "root", value: $1 } }); yy.ast.unshift(); return yy.ast.yield()' ],
                [ 'DOLLAR PATH_COMPONENTS', 'yy.ast.set({ expression: { type: "root", value: $1 } }); yy.ast.unshift(); return yy.ast.yield()' ],
                [ 'LEADING_CHILD_MEMBER_EXPRESSION',                 'yy.ast.unshift(); return yy.ast.yield()' ],
                [ 'LEADING_CHILD_MEMBER_EXPRESSION PATH_COMPONENTS', 'yy.ast.set({ operation: "member", scope: "child", expression: { type: "identifier", value: $1 }}); yy.ast.unshift(); return yy.ast.yield()' ] ],

        PATH_COMPONENTS: [
                [ 'PATH_COMPONENT',                 '' ],
                [ 'PATH_COMPONENTS PATH_COMPONENT', '' ] ],

        PATH_COMPONENT: [
                [ 'MEMBER_COMPONENT',    'yy.ast.set({ operation: "member" }); yy.ast.push()' ],
                [ 'SUBSCRIPT_COMPONENT', 'yy.ast.set({ operation: "subscript" }); yy.ast.push() ' ] ],

        MEMBER_COMPONENT: [
                [ 'CHILD_MEMBER_COMPONENT',      'yy.ast.set({ scope: "child" })' ],
                [ 'DESCENDANT_MEMBER_COMPONENT', 'yy.ast.set({ scope: "descendant" })' ] ],

        CHILD_MEMBER_COMPONENT: [
                [ 'DOT MEMBER_EXPRESSION', '' ] ],

        LEADING_CHILD_MEMBER_EXPRESSION: [
                [ 'MEMBER_EXPRESSION', 'yy.ast.set({ scope: "child", operation: "member" })' ] ],

        DESCENDANT_MEMBER_COMPONENT: [
                [ 'DOT_DOT MEMBER_EXPRESSION', '' ] ],

        MEMBER_EXPRESSION: [
                [ 'STAR',              'yy.ast.set({ expression: { type: "wildcard", value: $1 } })' ],
                [ 'IDENTIFIER',        'yy.ast.set({ expression: { type: "identifier", value: $1 } })' ],
                [ 'SCRIPT_EXPRESSION', 'yy.ast.set({ expression: { type: "script_expression", value: $1 } })' ],
                [ 'INTEGER',           'yy.ast.set({ expression: { type: "numeric_literal", value: parseInt($1) } })' ],
                [ 'END',               '' ] ],

        SUBSCRIPT_COMPONENT: [
                [ 'CHILD_SUBSCRIPT_COMPONENT',      'yy.ast.set({ scope: "child" })' ],
                [ 'DESCENDANT_SUBSCRIPT_COMPONENT', 'yy.ast.set({ scope: "descendant" })' ] ],

        CHILD_SUBSCRIPT_COMPONENT: [
                [ '[ SUBSCRIPT ]', '' ] ],

        DESCENDANT_SUBSCRIPT_COMPONENT: [
                [ 'DOT_DOT [ SUBSCRIPT ]', '' ] ],

        SUBSCRIPT: [
                [ 'SUBSCRIPT_EXPRESSION', '' ],
                [ 'SUBSCRIPT_EXPRESSION_LIST', '$1.length > 1? yy.ast.set({ expression: { type: "union", value: $1 } }) : $$ = $1' ] ],

        SUBSCRIPT_EXPRESSION_LIST: [
                [ 'SUBSCRIPT_EXPRESSION_LISTABLE', '$$ = [$1]'],
                [ 'SUBSCRIPT_EXPRESSION_LIST , SUBSCRIPT_EXPRESSION_LISTABLE', '$$ = $1.concat($3)' ] ],

        SUBSCRIPT_EXPRESSION_LISTABLE: [
                [ 'INTEGER',           '$$ = { expression: { type: "numeric_literal", value: parseInt($1) } }; yy.ast.set($$)' ],
                [ 'STRING_LITERAL',    '$$ = { expression: { type: "string_literal", value: $1 } }; yy.ast.set($$)' ],
                [ 'ARRAY_SLICE',       '$$ = { expression: { type: "slice", value: $1 } }; yy.ast.set($$)' ] ],

        SUBSCRIPT_EXPRESSION: [
                [ 'STAR',              '$$ = { expression: { type: "wildcard", value: $1 } }; yy.ast.set($$)' ],
                [ 'SCRIPT_EXPRESSION', '$$ = { expression: { type: "script_expression", value: $1 } }; yy.ast.set($$)' ],
                [ 'FILTER_EXPRESSION', '$$ = { expression: { type: "filter_expression", value: $1 } }; yy.ast.set($$)' ] ],

        STRING_LITERAL: [
                [ 'QQ_STRING', "$$ = $1" ],
                [ 'Q_STRING',  "$$ = $1" ] ]
    }
};
if (fs.readFileSync) {
  grammar.moduleInclude = fs.readFileSync(/*require.resolve*/(54));
  grammar.actionInclude = fs.readFileSync(/*require.resolve*/(53));
}

module.exports = grammar;


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

var grammar = __webpack_require__(55);
var gparser = __webpack_require__(52);

var Parser = function() {

  var parser = new gparser.Parser();

  var _parseError = parser.parseError;
  parser.yy.parseError = function() {
    if (parser.yy.ast) {
      parser.yy.ast.initialize();
    }
    _parseError.apply(parser, arguments);
  }

  return parser;

};

Parser.grammar = grammar;
module.exports = Parser;


/***/ }),
/* 57 */
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}


/***/ }),
/* 58 */
/***/ (function(module, exports) {

module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var objectAssign = __webpack_require__(59);

// compare and isBuffer taken from https://github.com/feross/buffer/blob/680e9e5e488f22aac27599a57dc844a6315928dd/index.js
// original notice:

/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
function compare(a, b) {
  if (a === b) {
    return 0;
  }

  var x = a.length;
  var y = b.length;

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break;
    }
  }

  if (x < y) {
    return -1;
  }
  if (y < x) {
    return 1;
  }
  return 0;
}
function isBuffer(b) {
  if (global.Buffer && typeof global.Buffer.isBuffer === 'function') {
    return global.Buffer.isBuffer(b);
  }
  return !!(b != null && b._isBuffer);
}

// based on node assert, original notice:
// NB: The URL to the CommonJS spec is kept just for tradition.
//     node-assert has evolved a lot since then, both in API and behavior.

// http://wiki.commonjs.org/wiki/Unit_Testing/1.0
//
// THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
//
// Originally from narwhal.js (http://narwhaljs.org)
// Copyright (c) 2009 Thomas Robinson <280north.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var util = __webpack_require__(0);
var hasOwn = Object.prototype.hasOwnProperty;
var pSlice = Array.prototype.slice;
var functionsHaveNames = (function () {
  return function foo() {}.name === 'foo';
}());
function pToString (obj) {
  return Object.prototype.toString.call(obj);
}
function isView(arrbuf) {
  if (isBuffer(arrbuf)) {
    return false;
  }
  if (typeof global.ArrayBuffer !== 'function') {
    return false;
  }
  if (typeof ArrayBuffer.isView === 'function') {
    return ArrayBuffer.isView(arrbuf);
  }
  if (!arrbuf) {
    return false;
  }
  if (arrbuf instanceof DataView) {
    return true;
  }
  if (arrbuf.buffer && arrbuf.buffer instanceof ArrayBuffer) {
    return true;
  }
  return false;
}
// 1. The assert module provides functions that throw
// AssertionError's when particular conditions are not met. The
// assert module must conform to the following interface.

var assert = module.exports = ok;

// 2. The AssertionError is defined in assert.
// new assert.AssertionError({ message: message,
//                             actual: actual,
//                             expected: expected })

var regex = /\s*function\s+([^\(\s]*)\s*/;
// based on https://github.com/ljharb/function.prototype.name/blob/adeeeec8bfcc6068b187d7d9fb3d5bb1d3a30899/implementation.js
function getName(func) {
  if (!util.isFunction(func)) {
    return;
  }
  if (functionsHaveNames) {
    return func.name;
  }
  var str = func.toString();
  var match = str.match(regex);
  return match && match[1];
}
assert.AssertionError = function AssertionError(options) {
  this.name = 'AssertionError';
  this.actual = options.actual;
  this.expected = options.expected;
  this.operator = options.operator;
  if (options.message) {
    this.message = options.message;
    this.generatedMessage = false;
  } else {
    this.message = getMessage(this);
    this.generatedMessage = true;
  }
  var stackStartFunction = options.stackStartFunction || fail;
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, stackStartFunction);
  } else {
    // non v8 browsers so we can have a stacktrace
    var err = new Error();
    if (err.stack) {
      var out = err.stack;

      // try to strip useless frames
      var fn_name = getName(stackStartFunction);
      var idx = out.indexOf('\n' + fn_name);
      if (idx >= 0) {
        // once we have located the function frame
        // we need to strip out everything before it (and its line)
        var next_line = out.indexOf('\n', idx + 1);
        out = out.substring(next_line + 1);
      }

      this.stack = out;
    }
  }
};

// assert.AssertionError instanceof Error
util.inherits(assert.AssertionError, Error);

function truncate(s, n) {
  if (typeof s === 'string') {
    return s.length < n ? s : s.slice(0, n);
  } else {
    return s;
  }
}
function inspect(something) {
  if (functionsHaveNames || !util.isFunction(something)) {
    return util.inspect(something);
  }
  var rawname = getName(something);
  var name = rawname ? ': ' + rawname : '';
  return '[Function' +  name + ']';
}
function getMessage(self) {
  return truncate(inspect(self.actual), 128) + ' ' +
         self.operator + ' ' +
         truncate(inspect(self.expected), 128);
}

// At present only the three keys mentioned above are used and
// understood by the spec. Implementations or sub modules can pass
// other keys to the AssertionError's constructor - they will be
// ignored.

// 3. All of the following functions must throw an AssertionError
// when a corresponding condition is not met, with a message that
// may be undefined if not provided.  All assertion methods provide
// both the actual and expected values to the assertion error for
// display purposes.

function fail(actual, expected, message, operator, stackStartFunction) {
  throw new assert.AssertionError({
    message: message,
    actual: actual,
    expected: expected,
    operator: operator,
    stackStartFunction: stackStartFunction
  });
}

// EXTENSION! allows for well behaved errors defined elsewhere.
assert.fail = fail;

// 4. Pure assertion tests whether a value is truthy, as determined
// by !!guard.
// assert.ok(guard, message_opt);
// This statement is equivalent to assert.equal(true, !!guard,
// message_opt);. To test strictly for the value true, use
// assert.strictEqual(true, guard, message_opt);.

function ok(value, message) {
  if (!value) fail(value, true, message, '==', assert.ok);
}
assert.ok = ok;

// 5. The equality assertion tests shallow, coercive equality with
// ==.
// assert.equal(actual, expected, message_opt);

assert.equal = function equal(actual, expected, message) {
  if (actual != expected) fail(actual, expected, message, '==', assert.equal);
};

// 6. The non-equality assertion tests for whether two objects are not equal
// with != assert.notEqual(actual, expected, message_opt);

assert.notEqual = function notEqual(actual, expected, message) {
  if (actual == expected) {
    fail(actual, expected, message, '!=', assert.notEqual);
  }
};

// 7. The equivalence assertion tests a deep equality relation.
// assert.deepEqual(actual, expected, message_opt);

assert.deepEqual = function deepEqual(actual, expected, message) {
  if (!_deepEqual(actual, expected, false)) {
    fail(actual, expected, message, 'deepEqual', assert.deepEqual);
  }
};

assert.deepStrictEqual = function deepStrictEqual(actual, expected, message) {
  if (!_deepEqual(actual, expected, true)) {
    fail(actual, expected, message, 'deepStrictEqual', assert.deepStrictEqual);
  }
};

function _deepEqual(actual, expected, strict, memos) {
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;
  } else if (isBuffer(actual) && isBuffer(expected)) {
    return compare(actual, expected) === 0;

  // 7.2. If the expected value is a Date object, the actual value is
  // equivalent if it is also a Date object that refers to the same time.
  } else if (util.isDate(actual) && util.isDate(expected)) {
    return actual.getTime() === expected.getTime();

  // 7.3 If the expected value is a RegExp object, the actual value is
  // equivalent if it is also a RegExp object with the same source and
  // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
  } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
    return actual.source === expected.source &&
           actual.global === expected.global &&
           actual.multiline === expected.multiline &&
           actual.lastIndex === expected.lastIndex &&
           actual.ignoreCase === expected.ignoreCase;

  // 7.4. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if ((actual === null || typeof actual !== 'object') &&
             (expected === null || typeof expected !== 'object')) {
    return strict ? actual === expected : actual == expected;

  // If both values are instances of typed arrays, wrap their underlying
  // ArrayBuffers in a Buffer each to increase performance
  // This optimization requires the arrays to have the same type as checked by
  // Object.prototype.toString (aka pToString). Never perform binary
  // comparisons for Float*Arrays, though, since e.g. +0 === -0 but their
  // bit patterns are not identical.
  } else if (isView(actual) && isView(expected) &&
             pToString(actual) === pToString(expected) &&
             !(actual instanceof Float32Array ||
               actual instanceof Float64Array)) {
    return compare(new Uint8Array(actual.buffer),
                   new Uint8Array(expected.buffer)) === 0;

  // 7.5 For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else if (isBuffer(actual) !== isBuffer(expected)) {
    return false;
  } else {
    memos = memos || {actual: [], expected: []};

    var actualIndex = memos.actual.indexOf(actual);
    if (actualIndex !== -1) {
      if (actualIndex === memos.expected.indexOf(expected)) {
        return true;
      }
    }

    memos.actual.push(actual);
    memos.expected.push(expected);

    return objEquiv(actual, expected, strict, memos);
  }
}

function isArguments(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
}

function objEquiv(a, b, strict, actualVisitedObjects) {
  if (a === null || a === undefined || b === null || b === undefined)
    return false;
  // if one is a primitive, the other must be same
  if (util.isPrimitive(a) || util.isPrimitive(b))
    return a === b;
  if (strict && Object.getPrototypeOf(a) !== Object.getPrototypeOf(b))
    return false;
  var aIsArgs = isArguments(a);
  var bIsArgs = isArguments(b);
  if ((aIsArgs && !bIsArgs) || (!aIsArgs && bIsArgs))
    return false;
  if (aIsArgs) {
    a = pSlice.call(a);
    b = pSlice.call(b);
    return _deepEqual(a, b, strict);
  }
  var ka = objectKeys(a);
  var kb = objectKeys(b);
  var key, i;
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length !== kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] !== kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!_deepEqual(a[key], b[key], strict, actualVisitedObjects))
      return false;
  }
  return true;
}

// 8. The non-equivalence assertion tests for any deep inequality.
// assert.notDeepEqual(actual, expected, message_opt);

assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
  if (_deepEqual(actual, expected, false)) {
    fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
  }
};

assert.notDeepStrictEqual = notDeepStrictEqual;
function notDeepStrictEqual(actual, expected, message) {
  if (_deepEqual(actual, expected, true)) {
    fail(actual, expected, message, 'notDeepStrictEqual', notDeepStrictEqual);
  }
}


// 9. The strict equality assertion tests strict equality, as determined by ===.
// assert.strictEqual(actual, expected, message_opt);

assert.strictEqual = function strictEqual(actual, expected, message) {
  if (actual !== expected) {
    fail(actual, expected, message, '===', assert.strictEqual);
  }
};

// 10. The strict non-equality assertion tests for strict inequality, as
// determined by !==.  assert.notStrictEqual(actual, expected, message_opt);

assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
  if (actual === expected) {
    fail(actual, expected, message, '!==', assert.notStrictEqual);
  }
};

function expectedException(actual, expected) {
  if (!actual || !expected) {
    return false;
  }

  if (Object.prototype.toString.call(expected) == '[object RegExp]') {
    return expected.test(actual);
  }

  try {
    if (actual instanceof expected) {
      return true;
    }
  } catch (e) {
    // Ignore.  The instanceof check doesn't work for arrow functions.
  }

  if (Error.isPrototypeOf(expected)) {
    return false;
  }

  return expected.call({}, actual) === true;
}

function _tryBlock(block) {
  var error;
  try {
    block();
  } catch (e) {
    error = e;
  }
  return error;
}

function _throws(shouldThrow, block, expected, message) {
  var actual;

  if (typeof block !== 'function') {
    throw new TypeError('"block" argument must be a function');
  }

  if (typeof expected === 'string') {
    message = expected;
    expected = null;
  }

  actual = _tryBlock(block);

  message = (expected && expected.name ? ' (' + expected.name + ').' : '.') +
            (message ? ' ' + message : '.');

  if (shouldThrow && !actual) {
    fail(actual, expected, 'Missing expected exception' + message);
  }

  var userProvidedMessage = typeof message === 'string';
  var isUnwantedException = !shouldThrow && util.isError(actual);
  var isUnexpectedException = !shouldThrow && actual && !expected;

  if ((isUnwantedException &&
      userProvidedMessage &&
      expectedException(actual, expected)) ||
      isUnexpectedException) {
    fail(actual, expected, 'Got unwanted exception' + message);
  }

  if ((shouldThrow && actual && expected &&
      !expectedException(actual, expected)) || (!shouldThrow && actual)) {
    throw actual;
  }
}

// 11. Expected to throw an error:
// assert.throws(block, Error_opt, message_opt);

assert.throws = function(block, /*optional*/error, /*optional*/message) {
  _throws(true, block, error, message);
};

// EXTENSION! This is annoying to write outside this module.
assert.doesNotThrow = function(block, /*optional*/error, /*optional*/message) {
  _throws(false, block, error, message);
};

assert.ifError = function(err) { if (err) throw err; };

// Expose a strict only variant of assert
function strict(value, message) {
  if (!value) fail(value, true, message, '==', strict);
}
assert.strict = objectAssign(strict, assert, {
  equal: assert.strictEqual,
  deepEqual: assert.deepStrictEqual,
  notEqual: assert.notStrictEqual,
  notDeepEqual: assert.notDeepStrictEqual
});
assert.strict.strict = assert.strict;

var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    if (hasOwn.call(obj, key)) keys.push(key);
  }
  return keys;
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(8)))

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* tslint:disable:max-line-length */
/* tslint:disable:one-line */
/* tslint:disable:prefer-for-of */
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = __webpack_require__(1);
var util_1 = __webpack_require__(0);
var Enums_1 = __webpack_require__(4);
var DefaultChecker = /** @class */ (function () {
    function DefaultChecker() {
    }
    DefaultChecker.prototype.Check = function (solutionJson, submissionJson, matchedElementsJson) {
        var matchedElementsNode = Utils_1.Utils.GetNodes(matchedElementsJson, '$.node', true);
        this.RecursiveCheck(solutionJson, submissionJson, matchedElementsNode);
        return solutionJson;
    };
    DefaultChecker.prototype.RecursiveCheck = function (solutionJson, submissionJson, matchedElementsNode) {
        // Since there will always be just one value for $.node (either object or array), we can safely just check the first index
        var nodes = matchedElementsNode[0].value;
        if (!util_1.isArray(nodes)) {
            nodes = [];
            nodes.push(matchedElementsNode[0].value);
        }
        for (var i = 0; i < nodes.length; i++) {
            var solpath = nodes[i].solpath;
            var subpath = nodes[i].subpath;
            var matchstatus = nodes[i].matchstatus;
            if (matchstatus == "extra") {
                continue;
            }
            var solNode = Utils_1.Utils.GetNodes(solutionJson, solpath, false);
            var validationsNode = Utils_1.Utils.GetNodes(solNode[0].value, '$.validations', false);
            // Check if Validations Node Exists
            var validations = void 0;
            if (validationsNode.length > 0) {
                validations = validationsNode[0].value;
                for (var j = 0; j < validations.length; j++) {
                    var operator = validations[j].operator;
                    // TODO: Check Operator Type and call the Operator Class that will handle this...
                    var CheckingOperator = Utils_1.Utils.GetCheckingOperator(operator);
                    var isValidationPassed = CheckingOperator.EvaluateOperator(solutionJson, submissionJson, nodes[i], validations[j]);
                    if (isValidationPassed) {
                        validations[j].status = Enums_1.ValidationStatus.PASS;
                    }
                    else {
                        validations[j].status = Enums_1.ValidationStatus.FAIL;
                    }
                }
            }
            var innerNode = Utils_1.Utils.GetNodes(nodes[i], '$.node', true);
            // If there are no more inner elements to access, return
            if (util_1.isNullOrUndefined(innerNode) || innerNode.length === 0) {
                continue;
            }
            else {
                this.RecursiveCheck(solutionJson, submissionJson, innerNode);
            }
        }
    };
    return DefaultChecker;
}());
exports.DefaultChecker = DefaultChecker;


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var DefaultChecker_1 = __webpack_require__(61);
var FeedbackConfigGenerator_1 = __webpack_require__(28);
var DefaultScorer_1 = __webpack_require__(27);
var Factory_1 = __webpack_require__(6);
var HintsGenerator_1 = __webpack_require__(22);
var DefaultGradingEngine = /** @class */ (function () {
    function DefaultGradingEngine() {
    }
    DefaultGradingEngine.prototype.Grade = function (solutionJson, submissionJson, scoringRulesJson, settings, hintsModuleInstance) {
        // Here we will basically call the matcher and checker
        var matcher = Factory_1.Factory.GetObject(settings.engineSettings.matchSettings.matcher);
        var matcherOutput = matcher.Match(solutionJson, submissionJson, settings.engineSettings.matchSettings);
        var checker = new DefaultChecker_1.DefaultChecker();
        var updatedSolutionJson = checker.Check(solutionJson, submissionJson, matcherOutput);
        var updatedScoringRuleJson;
        if (scoringRulesJson) {
            var scorer = new DefaultScorer_1.DefaultScorer();
            updatedScoringRuleJson = scorer.Score(updatedSolutionJson, scoringRulesJson, hintsModuleInstance);
        }
        else {
            updatedScoringRuleJson = {};
        }
        var gradeResults = { matchedElementsJson: matcherOutput, solutionJson: updatedSolutionJson, scoredJson: updatedScoringRuleJson };
        return gradeResults;
    };
    DefaultGradingEngine.prototype.GenerateFeedback = function (scoringRules, solutionJson, submissionJson, matcherOutput) {
        var feedbackConfigGenerator = new FeedbackConfigGenerator_1.FeedbackConfigGenerator();
        var feedback = feedbackConfigGenerator.GenerateFeedback(scoringRules, solutionJson, submissionJson, matcherOutput);
        return feedback;
    };
    DefaultGradingEngine.prototype.GenerateHints = function (SolutionJson, userSubmissionJson, scoringRulesJson, engineSettings, hintsJson, hintsMeta) {
        var gradeOutput = this.Grade(SolutionJson, userSubmissionJson, scoringRulesJson, engineSettings);
        var hintsGeneratorEngine = new HintsGenerator_1.HintsGenerator();
        return hintsGeneratorEngine.generateHints(gradeOutput, userSubmissionJson, hintsJson, hintsMeta);
    };
    return DefaultGradingEngine;
}());
exports.DefaultGradingEngine = DefaultGradingEngine;


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var DefaultGradingEngine_1 = __webpack_require__(62);
var sampleSolutionJson = __webpack_require__(21);
var sampleSubmissionJson = __webpack_require__(20);
var sampleScoringRulesJson = __webpack_require__(19);
var GradeResults_1 = __webpack_require__(18);
var Settings_1 = __webpack_require__(17);
var Factory_1 = __webpack_require__(6);
var LeonardoGrader = /** @class */ (function () {
    function LeonardoGrader() {
    }
    LeonardoGrader.prototype.Grade = function (solutionJson, submissionJson, scoringRulesJson, engineSettings, hintsModuleInstance) {
        try {
            if (engineSettings === undefined || engineSettings.length === 0) {
                engineSettings = Settings_1.Settings;
            }
            var gradingEngine = new DefaultGradingEngine_1.DefaultGradingEngine();
            if (solutionJson === undefined || solutionJson.length === 0) {
                solutionJson = sampleSolutionJson.solutionJson;
            }
            if (submissionJson === undefined || submissionJson.length === 0) {
                submissionJson = sampleSubmissionJson.submissionJson;
            }
            if (scoringRulesJson === undefined || scoringRulesJson.length === 0) {
                scoringRulesJson = sampleScoringRulesJson;
            }
            var returnObj = gradingEngine.Grade(solutionJson, submissionJson, scoringRulesJson, engineSettings, hintsModuleInstance);
            return returnObj;
        }
        catch (e) {
            return new GradeResults_1.GradeResults;
        }
    };
    LeonardoGrader.prototype.GenerateFeedback = function (scoringRulesJson, solutionJson, submissionJson, matcherOutput) {
        var gradingEngine = new DefaultGradingEngine_1.DefaultGradingEngine();
        var feedbackJSON = gradingEngine.GenerateFeedback(scoringRulesJson, solutionJson, submissionJson, matcherOutput);
        return feedbackJSON;
    };
    LeonardoGrader.prototype.GenerateHints = function (solutionJson, submissionJson, scoringRulesJson, engineSettings, hintsJson, hintsMeta) {
        var gradingEngine = new DefaultGradingEngine_1.DefaultGradingEngine();
        var userSubmissionWithHints = gradingEngine.GenerateHints(solutionJson, submissionJson, scoringRulesJson, engineSettings, hintsJson, hintsMeta);
        return userSubmissionWithHints;
    };
    LeonardoGrader.prototype.GenerateMatcherOutput = function (solutionJson, submissionJson, settings) {
        try {
            if (settings === undefined || settings.length === 0) {
                settings = Settings_1.Settings;
            }
            var gradingEngine = new DefaultGradingEngine_1.DefaultGradingEngine();
            if (solutionJson === undefined || solutionJson.length === 0) {
                solutionJson = sampleSolutionJson;
            }
            if (submissionJson === undefined || submissionJson.length === 0) {
                submissionJson = sampleSubmissionJson;
            }
            var matcher = Factory_1.Factory.GetObject(settings.engineSettings.matchSettings.matcher);
            return matcher.Match(solutionJson, submissionJson, settings.engineSettings.matchSettings);
        }
        catch (e) {
            return {};
        }
    };
    return LeonardoGrader;
}());
exports.default = LeonardoGrader;
// const leonardoGrader: LeonardoGrader = new LeonardoGrader();
// leonardoGrader.Grade('', '', '', '', '');


/***/ })
/******/ ]);
});
//# sourceMappingURL=leonardograder.js.map