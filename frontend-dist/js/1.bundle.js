webpackJsonp([1],{

/***/ 23:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = get;

	var _lodash = __webpack_require__(612);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _endsWith = __webpack_require__(229);

	var _endsWith2 = _interopRequireDefault(_endsWith);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function get(object, path, defaultValue) {
	  var modelString = path;

	  if (typeof path === 'number') {
	    var result = object[path];

	    return result === undefined ? defaultValue : result;
	  }

	  if (!path.length) return object;

	  if ((0, _endsWith2.default)(modelString, '.')) {
	    modelString = modelString.slice(0, -1);
	  } else if ((0, _endsWith2.default)(modelString, '[]')) {
	    modelString = modelString.slice(0, -2);
	  }

	  return (0, _lodash2.default)(object, modelString, defaultValue);
	}

/***/ }),

/***/ 32:
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	exports.default = isPlainObject;
	// Adapted from https://github.com/jonschlinkert/is-plain-object
	function isObject(val) {
	  return val != null && (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' && Array.isArray(val) === false;
	}

	function isObjectObject(o) {
	  return isObject(o) === true && Object.prototype.toString.call(o) === '[object Object]';
	}

	function isPlainObject(o) {
	  if (isObjectObject(o) === false) return false;

	  // If has modified constructor
	  var ctor = o.constructor;
	  if (typeof ctor !== 'function') return false;

	  // If has modified prototype
	  var prot = ctor.prototype;
	  if (isObjectObject(prot) === false) return false;

	  // If constructor does not have an Object-specific method
	  if (prot.hasOwnProperty('isPrototypeOf') === false) {
	    return false;
	  }

	  // Most likely a plain Object
	  return true;
	}

/***/ }),

/***/ 45:
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function mapValues(object, iteratee) {
	  var result = {};

	  Object.keys(object || {}).forEach(function (key) {
	    result[key] = iteratee(object[key], key, object);
	  });

	  return result;
	}

	exports.default = mapValues;

/***/ }),

/***/ 52:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * This allows you to work with object hierarchies that have been frozen
	 * with Object.freeze().  "get" operations can use the normal JS syntax,
	 * but operations that modify the data will have to return partial copies of
	 * the structure. The portions of the structure that did not change will
	 * === their previous values.
	 *
	 * Inspired by clojure/mori and Immutable.js
	 */

	"use strict";

	var i = exports;

	// we only care about objects or arrays for now
	function weCareAbout(val) {
	  return null !== val &&
	    (Array.isArray(val) ||
	      // This will skip objects created with `new Foo()`
	      // and objects created with `Object.create(proto)`
	      // The benefit is ignoring DOM elements and event emitters,
	      // which are often circular.
	      isObjectLike(val));
	}

	function isObjectLike(val) {
	  return typeof val === "object" &&
	    val.constructor === Object &&
	    Object.getPrototypeOf(val) === Object.prototype;
	}


	function arrayClone(arr) {
	  var index = 0,
	    length = arr.length,
	    result = Array(length);

	  for (; index < length; index += 1) {
	    result[index] = arr[index];
	  }
	  return result;
	}

	function objClone(obj) {
	  var index = 0,
	    keys = Object.keys(obj),
	    length = keys.length,
	    key,
	    result = {};

	  for (; index < length; index += 1) {
	    key = keys[index];
	    result[key] = obj[key];
	  }
	  return result;
	}

	function clone(coll) {
	  if (Array.isArray(coll)) {
	    return arrayClone(coll);
	  } else {
	    return objClone(coll);
	  }
	}

	function freezeIfNeeded(coll) {
	  if (
	      weCareAbout(coll) &&
	      (
	        !Object.isFrozen(coll) &&
	        ("development") !== "production"
	      )) {
	    return baseFreeze(coll, []);
	  }
	  return coll;
	}

	function _freeze(coll) {
	  if (false) {
	    return coll;
	  }
	  if (typeof coll === "object") {
	    return Object.freeze(coll);
	  } else {
	    return coll;
	  }
	}

	function baseFreeze(coll, prevNodes) {
	  if (prevNodes.some(function (node) { return node === coll; })) {
	    throw new Error("object has a reference cycle");
	  }

	  Object.freeze(coll);
	  prevNodes.push(coll);
	  Object.keys(coll).forEach(function (key) {
	    var prop = coll[key];
	    if (weCareAbout(prop)) {
	      baseFreeze(prop, prevNodes);
	    }
	  });
	  prevNodes.pop();

	  return coll;
	}

	/**
	 * recrursively freeze an object and all its child objects
	 * @param  {Object|Array} coll
	 * @return {Object|Array}
	 */
	exports.freeze = function freeze(coll) {
	  if (false) {
	    return coll;
	  }
	  return baseFreeze(coll, []);
	};

	/**
	 * recursively un-freeze an object, by cloning frozen collections
	 * @param  {[type]} coll [description]
	 * @return {[type]}      [description]
	 */
	exports.thaw = function thaw(coll) {
	  if (weCareAbout(coll) && Object.isFrozen(coll)) {
	    var newColl = clone(coll);
	    Object.keys(newColl).forEach(function (key) {
	      newColl[key] = thaw(newColl[key]);
	    });
	    return newColl;
	  }
	  return coll;
	};

	/**
	 * set a value on an object or array
	 * @param  {Object|Array}  coll
	 * @param  {String|Number} key   Key or index
	 * @param  {Object}        value
	 * @return {Object|Array}        new object hierarchy with modifications
	 */
	exports.assoc = function assoc(coll, key, value) {
	  if (coll[key] === value) {
	    return _freeze(coll);
	  }

	  var newObj = clone(coll);

	  newObj[key] = freezeIfNeeded(value);

	  return _freeze(newObj);

	};
	exports.set = exports.assoc;

	/**
	 * un-set a value on an object or array
	 * @param  {Object|Array}  coll
	 * @param  {String|Number} key  Key or Index
	 * @return {Object|Array}       New object or array
	 */
	exports.dissoc = function dissoc(coll, key) {
	  var newObj = clone(coll);

	  delete newObj[key];

	  return _freeze(newObj);
	};
	exports.unset = exports.dissoc;

	/**
	 * set a value deep in a hierarchical structure
	 * @param  {Object|Array} coll
	 * @param  {Array}        path    A list of keys to traverse
	 * @param  {Object}       value
	 * @return {Object|Array}       new object hierarchy with modifications
	 */
	exports.assocIn = function assocIn(coll, path, value) {
	  var key0 = path[0];
	  if (path.length === 1) {
	    // simplest case is a 1-element array.  Just a simple assoc.
	    return i.assoc(coll, key0, value);
	  } else {
	    // break the problem down.  Assoc this object with the first key
	    // and the result of assocIn with the rest of the keys
	    return i.assoc(coll, key0, assocIn(coll[key0] || {}, path.slice(1), value));
	  }
	};
	exports.setIn = exports.assocIn;

	/**
	 * get an object from a hierachy based on an array of keys
	 * @param  {Object|Array} coll
	 * @param  {Array}        path    list of keys
	 * @return {Object}       value, or undefined
	 */
	function baseGet(coll, path) {
	  return (path || []).reduce(function (curr, key) {
	    if (!curr) { return; }
	    return curr[key];
	  }, coll);
	}

	exports.getIn = baseGet;

	/**
	 * Update a value in a hierarchy
	 * @param  {Object|Array}   coll
	 * @param  {Array}          path     list of keys
	 * @param  {Function} callback The existing value with be passed to this.
	 *                             Return the new value to set
	 * @return {Object|Array}      new object hierarchy with modifications
	 */
	exports.updateIn = function updateIn(coll, path, callback) {
	  var existingVal = baseGet(coll, path);
	  return i.assocIn(coll, path, callback(existingVal));
	};


	// generate wrappers for the mutative array methods
	["push", "unshift", "pop", "shift", "reverse", "sort"]
	.forEach(function (methodName) {
	  exports[methodName] = function (arr, val) {
	    var newArr = arrayClone(arr);

	    newArr[methodName](freezeIfNeeded(val));

	    return _freeze(newArr);
	  };

	  exports[methodName].displayName = "icepick." + methodName;
	});

	// splice is special because it is variadic
	exports.splice = function splice(arr/*, args*/) {
	  var newArr = arrayClone(arr),
	    args = rest(arguments).map(freezeIfNeeded);

	  newArr.splice.apply(newArr, args);

	  return _freeze(newArr);
	};

	// slice is non-mutative
	exports.slice = function slice(arr, arg1, arg2) {
	  var newArr = arr.slice(arg1, arg2);

	  return _freeze(newArr);
	};

	["map", "filter"].forEach(function (methodName) {
	  exports[methodName] = function (fn, arr) {
	    var newArr = arr[methodName](fn);

	    return _freeze(newArr);
	  };

	  exports[methodName].displayName = "icepick." + methodName;
	});

	exports.extend =
	exports.assign = function assign(/*...objs*/) {
	  var newObj = rest(arguments).reduce(singleAssign, arguments[0]);

	  return _freeze(newObj);
	};

	function singleAssign(obj1, obj2) {
	  return Object.keys(obj2).reduce(function (obj, key) {
	    return i.assoc(obj, key, obj2[key]);
	  }, obj1);
	}

	exports.merge = merge;
	function merge(target, source, resolver) {
	  if (target == null || source == null) {
	    return target;
	  }
	  return Object.keys(source).reduce(function (obj, key) {
	    var sourceVal = source[key];
	    var targetVal = obj[key];

	    var resolvedSourceVal =
	      resolver ? resolver(targetVal, sourceVal, key) : sourceVal;

	    if (weCareAbout(sourceVal) && weCareAbout(targetVal)) {
	      // if they are both frozen and reference equal, assume they are deep equal
	      if ((
	            (Object.isFrozen(resolvedSourceVal) &&
	              Object.isFrozen(targetVal)) ||
	            ("development") === "production"
	          ) &&
	          resolvedSourceVal === targetVal) {
	        return obj;
	      }
	      if (Array.isArray(sourceVal)) {
	        return i.assoc(obj, key, resolvedSourceVal);
	      }
	      // recursively merge pairs of objects
	      return assocIfDifferent(obj, key,
	        merge(targetVal, resolvedSourceVal, resolver));
	    }

	    // primitive values, stuff with prototypes
	    return assocIfDifferent(obj, key, resolvedSourceVal);
	  }, target);
	}

	function assocIfDifferent(target, key, value) {
	  if (target[key] === value) {
	    return target;
	  }
	  return i.assoc(target, key, value);
	}

	function _slice(array, start) {
	  var begin = start || 0;
	  var len = array.length;
	  len -= begin;
	  len = len < 0 ? 0 : len;
	  var result = new Array(len);
	  for (var i = 0; i < len; i += 1) {
	    result[i] = array[i + begin];
	  }
	  return result;
	}


	function rest(args) {
	  return _slice(args, 1);
	}


	var chainProto = {
	  value: function value() {
	    return this.val;
	  },
	  thru: function thru(fn) {
	    this.val = freezeIfNeeded(fn(this.val));
	    return this;
	  }
	};

	Object.keys(exports).forEach(function (methodName) {
	  chainProto[methodName] = function (/*...args*/) {
	    var args = _slice(arguments);
	    args.unshift(this.val);
	    this.val = exports[methodName].apply(null, args);
	    return this;
	  };
	});

	exports.chain = function chain(val) {
	  var wrapped = Object.create(chainProto);
	  wrapped.val = val;
	  return wrapped;
	};

	// for testing
	exports._weCareAbout = weCareAbout;
	exports._slice = _slice;


/***/ }),

/***/ 59:
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var actionTypes = {
	  BLUR: 'rrf/blur',
	  CHANGE: 'rrf/change',
	  FOCUS: 'rrf/focus',
	  RESET: 'rrf/reset',
	  VALIDATE: 'rrf/validate',
	  SET_DIRTY: 'rrf/setDirty',
	  SET_ERRORS: 'rrf/setErrors',
	  SET_INITIAL: 'rrf/setInitial',
	  SET_PENDING: 'rrf/setPending',
	  SET_PRISTINE: 'rrf/setPristine',
	  SET_SUBMITTED: 'rrf/setSubmitted',
	  SET_SUBMIT_FAILED: 'rrf/setSubmitFailed',
	  SET_TOUCHED: 'rrf/setTouched',
	  SET_UNTOUCHED: 'rrf/setUntouched',
	  SET_VALIDITY: 'rrf/setValidity',
	  SET_VALIDATING: 'rrf/setValidating',
	  SET_FIELDS_VALIDITY: 'rrf/setFieldsValidity',
	  SET_VIEW_VALUE: 'rrf/setViewValue',
	  RESET_VALIDITY: 'rrf/resetValidity',
	  BATCH: 'rrf/batch',
	  NULL: null,
	  ADD_INTENT: 'rrf/addIntent',
	  CLEAR_INTENTS: 'rrf/clearIntents'
	};

	exports.default = actionTypes;

/***/ }),

/***/ 66:
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var initialFieldState = {
	  focus: false,
	  pending: false,
	  pristine: true,
	  submitted: false,
	  submitFailed: false,
	  retouched: false,
	  touched: false,
	  valid: true,
	  validating: false,
	  validated: false,
	  validity: {},
	  errors: {},
	  intents: []
	};

	exports.default = initialFieldState;

/***/ }),

/***/ 75:
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/* eslint-disable */

	var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
	} : function (obj) {
	  return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
	};

	var hasOwnProperty = Object.prototype.hasOwnProperty;

	/**
	 * inlined Object.is polyfill to avoid requiring consumers ship their own
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
	 */
	function is(x, y) {
	  // SameValue algorithm
	  if (x === y) {
	    // Steps 1-5, 7-10
	    // Steps 6.b-6.e: +0 != -0
	    return x !== 0 || 1 / x === 1 / y;
	  } else {
	    // Step 6.a: NaN == NaN
	    return x !== x && y !== y;
	  }
	}

	/**
	 * Performs equality by iterating through keys on an object and returning false
	 * when any key has values which are not strictly equal between the arguments.
	 * Returns true when the values of all keys are strictly equal.
	 */
	function shallowEqual(objA, objB) {
	  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	  if (is(objA, objB)) {
	    return true;
	  }

	  if ((typeof objA === 'undefined' ? 'undefined' : _typeof(objA)) !== 'object' || objA === null || (typeof objB === 'undefined' ? 'undefined' : _typeof(objB)) !== 'object' || objB === null) {
	    return false;
	  }

	  var keysA = Object.keys(objA);
	  var keysB = Object.keys(objB);

	  if (keysA.length !== keysB.length) {
	    return false;
	  }

	  var omitKeys = options.omitKeys,
	      deepKeys = options.deepKeys;

	  // Test for A's keys different from B.

	  for (var i = 0; i < keysA.length; i++) {
	    // if key is an omitted key, skip comparison
	    if (omitKeys && omitKeys.length && ~omitKeys.indexOf(keysA[i])) continue;

	    if (deepKeys && deepKeys.length && ~deepKeys.indexOf(keysA[i])) {
	      var result = shallowEqual(objA[keysA[i]], objB[keysA[i]]);

	      if (!result) return false;
	    } else if (!hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
	      return false;
	    }
	  }

	  return true;
	}

	exports.default = shallowEqual;

/***/ }),

/***/ 93:
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = omit;
	function omit(object, props) {
	  if (object == null) {
	    return {};
	  }
	  var newObject = _extends({}, object);

	  if (typeof props === 'string') {
	    delete newObject[props];
	  } else {
	    props.forEach(function (prop) {
	      delete newObject[prop];
	    });
	  }

	  return newObject;
	}

/***/ }),

/***/ 115:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _fieldActions = __webpack_require__(355);

	var _fieldActions2 = _interopRequireDefault(_fieldActions);

	var _modelActions = __webpack_require__(782);

	var _modelActions2 = _interopRequireDefault(_modelActions);

	var _batchActions = __webpack_require__(225);

	var _batchActions2 = _interopRequireDefault(_batchActions);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var actions = _extends({}, _fieldActions2.default, _modelActions2.default, {
	  batch: _batchActions2.default
	});

	exports.default = actions;

/***/ }),

/***/ 116:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = getFieldFromState;

	var _get = __webpack_require__(23);

	var _get2 = _interopRequireDefault(_get);

	var _toPath = __webpack_require__(157);

	var _toPath2 = _interopRequireDefault(_toPath);

	var _getForm = __webpack_require__(155);

	var _getForm2 = _interopRequireDefault(_getForm);

	var _isPlainObject = __webpack_require__(32);

	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

	var _invariant = __webpack_require__(16);

	var _invariant2 = _interopRequireDefault(_invariant);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var defaultStrategy = {
	  getForm: _getForm2.default
	};

	function getFieldFromState(state, modelString) {
	  var s = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultStrategy;

	  var form = state && '$form' in state ? state : s.getForm(state, modelString);

	  if (!form) return null;

	  if (!modelString.length) return form;

	  (0, _invariant2.default)(form, 'Could not find form for "%s" in the store.', modelString);

	  var formPath = (0, _toPath2.default)(form.$form.model);
	  var fieldPath = (0, _toPath2.default)(modelString).slice(formPath.length);
	  var field = (0, _get2.default)(form, fieldPath);

	  if (!field) return null;
	  if ((0, _isPlainObject2.default)(field) && '$form' in field) return field.$form;

	  return field;
	}

/***/ }),

/***/ 117:
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = getModel;
	function getModel(model, state) {
	  return typeof model === 'function' && state ? model(state) : model;
	}

/***/ }),

/***/ 118:
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = identity;
	function identity(a) {
	  return a;
	}

/***/ }),

/***/ 152:
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var NULL_ACTION = { type: null };

	exports.default = NULL_ACTION;

/***/ }),

/***/ 153:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isValid;
	exports.fieldsValid = fieldsValid;

	var _isPlainObject = __webpack_require__(32);

	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function isValid(formState) {
	  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { async: true };

	  if (!formState) return true;

	  if (!formState.$form) {
	    var errors = formState.errors;


	    if (!Array.isArray(errors) && !(0, _isPlainObject2.default)(errors)) {
	      return !errors;
	    }

	    return Object.keys(formState.errors).every(function (errorKey) {
	      // if specified to ignore async validator keys and
	      // current error key is an async validator key,
	      // treat key as valid
	      if (!options.async && formState.asyncKeys && !!~formState.asyncKeys.indexOf(errorKey)) {
	        return true;
	      }

	      var valid = !formState.errors[errorKey];

	      return valid;
	    });
	  }

	  return Object.keys(formState).every(function (key) {
	    return isValid(formState[key], options);
	  });
	}

	function fieldsValid(formState) {
	  return Object.keys(formState).every(function (key) {
	    return key === '$form' || isValid(formState[key]);
	  });
	}

/***/ }),

/***/ 154:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.createInitialState = createInitialState;
	exports.default = createFormReducer;

	var _get2 = __webpack_require__(23);

	var _get3 = _interopRequireDefault(_get2);

	var _icepick = __webpack_require__(52);

	var _icepick2 = _interopRequireDefault(_icepick);

	var _arraysEqual = __webpack_require__(361);

	var _arraysEqual2 = _interopRequireDefault(_arraysEqual);

	var _isPlainObject = __webpack_require__(32);

	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

	var _mapValues = __webpack_require__(45);

	var _mapValues2 = _interopRequireDefault(_mapValues);

	var _toPath = __webpack_require__(157);

	var _toPath2 = _interopRequireDefault(_toPath);

	var _composeReducers = __webpack_require__(795);

	var _composeReducers2 = _interopRequireDefault(_composeReducers);

	var _batchedEnhancer = __webpack_require__(227);

	var _batchedEnhancer2 = _interopRequireDefault(_batchedEnhancer);

	var _initialFieldState = __webpack_require__(66);

	var _initialFieldState2 = _interopRequireDefault(_initialFieldState);

	var _changeActionReducer = __webpack_require__(794);

	var _changeActionReducer2 = _interopRequireDefault(_changeActionReducer);

	var _formActionsReducer = __webpack_require__(793);

	var _formActionsReducer2 = _interopRequireDefault(_formActionsReducer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function getSubModelString(model, subModel) {
	  if (!model) return subModel;

	  return model + '.' + subModel;
	}

	function createInitialState(model, state) {
	  var customInitialFieldState = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

	  var initialState = void 0;
	  var _options$lazy = options.lazy,
	      lazy = _options$lazy === undefined ? false : _options$lazy;


	  if (Array.isArray(state) || (0, _isPlainObject2.default)(state)) {
	    initialState = lazy ? {} : (0, _mapValues2.default)(state, function (subState, subModel) {
	      return createInitialState(getSubModelString(model, subModel), subState, customInitialFieldState);
	    });
	  } else {
	    return _icepick2.default.merge(_initialFieldState2.default, _extends({
	      initialValue: state,
	      value: state,
	      model: model
	    }, customInitialFieldState));
	  }

	  var initialForm = _icepick2.default.merge(_initialFieldState2.default, _extends({
	    initialValue: state,
	    value: state,
	    model: model
	  }, customInitialFieldState));

	  return _icepick2.default.set(initialState, '$form', initialForm);
	}

	function wrapFormReducer(plugin, modelPath, initialState) {
	  return function () {
	    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
	    var action = arguments[1];

	    if (!action.model) return state;

	    var path = (0, _toPath2.default)(action.model);

	    if (modelPath.length && !(0, _arraysEqual2.default)(path.slice(0, modelPath.length), modelPath)) {
	      return state;
	    }

	    var localPath = path.slice(modelPath.length);

	    return plugin(state, action, localPath);
	  };
	}

	var defaultPlugins = [_formActionsReducer2.default, _changeActionReducer2.default];

	function createFormReducer(model) {
	  var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	  var _options$plugins = options.plugins,
	      plugins = _options$plugins === undefined ? [] : _options$plugins,
	      customInitialFieldState = options.initialFieldState,
	      _options$transformAct = options.transformAction,
	      transformAction = _options$transformAct === undefined ? null : _options$transformAct;

	  var modelPath = (0, _toPath2.default)(model);
	  var initialFormState = createInitialState(model, initialState, customInitialFieldState, options);

	  var wrappedPlugins = plugins.concat(defaultPlugins).map(function (plugin) {
	    return wrapFormReducer(plugin, modelPath, initialFormState);
	  });

	  return (0, _batchedEnhancer2.default)(_composeReducers2.default.apply(undefined, _toConsumableArray(wrappedPlugins)), undefined, {
	    transformAction: transformAction
	  });
	}

/***/ }),

/***/ 155:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.clearGetFormCache = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	exports.getFormStateKey = getFormStateKey;

	var _get = __webpack_require__(23);

	var _get2 = _interopRequireDefault(_get);

	var _isPlainObject = __webpack_require__(32);

	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

	var _pathStartsWith = __webpack_require__(802);

	var _pathStartsWith2 = _interopRequireDefault(_pathStartsWith);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var defaultStrategy = {
	  get: _get2.default,
	  keys: function keys(state) {
	    return Object.keys(state);
	  },
	  isObject: function isObject(state) {
	    return (0, _isPlainObject2.default)(state);
	  }
	};

	function joinPaths() {
	  for (var _len = arguments.length, paths = Array(_len), _key = 0; _key < _len; _key++) {
	    paths[_key] = arguments[_key];
	  }

	  return paths.filter(function (path) {
	    return !!path && path.length;
	  }).join('.');
	}

	function getFormStateKey(state, model) {
	  var s = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultStrategy;
	  var currentPath = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

	  var deepCandidateKeys = [];
	  var result = null;

	  s.keys(state).some(function (key) {
	    var subState = s.get(state, key);

	    if (subState && s.get(subState, '$form')) {
	      var subStateModel = s.get(subState, '$form.model');

	      if ((0, _pathStartsWith2.default)(model, subStateModel) || subStateModel === '') {
	        var _ret = function () {
	          var localPath = (0, _pathStartsWith.pathDifference)(model, subStateModel);

	          var resultPath = [currentPath, key];
	          var currentState = subState;

	          localPath.every(function (segment) {
	            if (s.get(currentState, segment) && s.get(currentState, segment + '.$form')) {
	              currentState = s.get(currentState, segment);
	              resultPath.push(segment);

	              return true;
	            }

	            return false;
	          });

	          result = joinPaths.apply(undefined, resultPath);

	          return {
	            v: true
	          };
	        }();

	        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	      }

	      return false;
	    }

	    if (s.isObject(subState)) {
	      deepCandidateKeys.push(key);
	    }

	    return false;
	  });

	  if (result) return result;

	  deepCandidateKeys.some(function (key) {
	    result = getFormStateKey(s.get(state, key), model, s, joinPaths(currentPath, key));

	    return !!result;
	  });

	  if (result) return result;

	  return null;
	}

	var formStateKeyCache = {};

	var clearGetFormCache = exports.clearGetFormCache = function clearGetFormCache() {
	  return formStateKeyCache = {};
	}; // eslint-disable-line no-return-assign

	var getFormStateKeyCached = function () {
	  return function (state, modelString) {
	    var s = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultStrategy;

	    if (formStateKeyCache[modelString]) return formStateKeyCache[modelString];

	    var result = getFormStateKey(state, modelString, s);

	    formStateKeyCache[modelString] = result; // eslint-disable-line no-return-assign

	    return result;
	  };
	}();

	function getForm(state, modelString) {
	  var s = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultStrategy;

	  var formStateKey = getFormStateKeyCached(state, modelString, s);

	  if (!formStateKey) {
	    return null;
	  }

	  var form = s.get(state, formStateKey);

	  return form;
	}

	exports.default = getForm;

/***/ }),

/***/ 156:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.default = wrapWithModelResolver;

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _shallowEqual = __webpack_require__(75);

	var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ReactComponent = _react.PureComponent || _react.Component;

	function resolveModel(model, parentModel) {
	  if (parentModel) {
	    if (model[0] === '.' || model[0] === '[') {
	      return '' + parentModel + model;
	    }

	    if (typeof model === 'function') {
	      return function (state) {
	        return model(state, parentModel);
	      };
	    }
	  }

	  return model;
	}

	function wrapWithModelResolver(WrappedComponent) {
	  var ResolvedModelWrapper = function (_ReactComponent) {
	    _inherits(ResolvedModelWrapper, _ReactComponent);

	    function ResolvedModelWrapper(props, context) {
	      _classCallCheck(this, ResolvedModelWrapper);

	      var _this = _possibleConstructorReturn(this, (ResolvedModelWrapper.__proto__ || Object.getPrototypeOf(ResolvedModelWrapper)).call(this, props, context));

	      _this.model = context.model;
	      _this.store = context.localStore;
	      return _this;
	    }

	    _createClass(ResolvedModelWrapper, [{
	      key: 'shouldComponentUpdate',
	      value: function shouldComponentUpdate(nextProps) {
	        return !(0, _shallowEqual2.default)(this.props, nextProps);
	      }
	    }, {
	      key: 'render',
	      value: function render() {
	        var resolvedModel = resolveModel(this.props.model, this.model);

	        return _react2.default.createElement(WrappedComponent, _extends({}, this.props, {
	          model: resolvedModel,
	          store: this.store || undefined
	        }));
	      }
	    }]);

	    return ResolvedModelWrapper;
	  }(ReactComponent);

	  ResolvedModelWrapper.displayName = 'Modeled(' + WrappedComponent.displayName + ')';

	  ResolvedModelWrapper.propTypes = {
	    model: _react.PropTypes.any
	  };

	  ResolvedModelWrapper.contextTypes = {
	    model: _react.PropTypes.any,
	    localStore: _react.PropTypes.shape({
	      subscribe: _react.PropTypes.func,
	      dispatch: _react.PropTypes.func,
	      getState: _react.PropTypes.func
	    })
	  };

	  return ResolvedModelWrapper;
	}

/***/ }),

/***/ 157:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = toPath;

	var _lodash = __webpack_require__(301);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _endsWith = __webpack_require__(229);

	var _endsWith2 = _interopRequireDefault(_endsWith);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function toPath(value) {
	  var path = value;

	  if ((0, _endsWith2.default)(path, '.')) {
	    path = path.slice(0, -1);
	  } else if ((0, _endsWith2.default)(path, '[]')) {
	    path = path.slice(0, -2);
	  }

	  return (0, _lodash2.default)(path);
	}

/***/ }),

/***/ 158:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.trackable = undefined;

	var _findKey = __webpack_require__(796);

	var _findKey2 = _interopRequireDefault(_findKey);

	var _get2 = __webpack_require__(23);

	var _get3 = _interopRequireDefault(_get2);

	var _iteratee = __webpack_require__(233);

	var _iteratee2 = _interopRequireDefault(_iteratee);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

	function track(model) {
	  for (var _len = arguments.length, predicates = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    predicates[_key - 1] = arguments[_key];
	  }

	  var isPartial = model[0] === '.';

	  return function (fullState, parentModel) {
	    var childModel = isPartial ? model.slice(1) : model;
	    var state = isPartial ? (0, _get3.default)(fullState, parentModel) : fullState;

	    var _childModel$split = childModel.split(/\[\]\.?/),
	        _childModel$split2 = _toArray(_childModel$split),
	        parentModelPath = _childModel$split2[0],
	        childModelPaths = _childModel$split2.slice(1);

	    var fullPath = parentModelPath;
	    var subState = (0, _get3.default)(state, fullPath);

	    predicates.forEach(function (predicate, i) {
	      var childModelPath = childModelPaths[i];
	      var predicateIteratee = (0, _iteratee2.default)(predicate);

	      var subPath = childModelPath ? (0, _findKey2.default)(subState, predicateIteratee) + '.' + childModelPath : '' + (0, _findKey2.default)(subState, predicateIteratee);

	      subState = (0, _get3.default)(subState, subPath);
	      fullPath += '.' + subPath;
	    });

	    return isPartial ? [parentModel, fullPath].join('.') : fullPath;
	  };
	}

	function trackable(actionCreator) {
	  return function (model) {
	    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	      args[_key2 - 1] = arguments[_key2];
	    }

	    if (typeof model === 'function') {
	      return function (dispatch, getState) {
	        var modelPath = model(getState());

	        dispatch(actionCreator.apply(undefined, [modelPath].concat(args)));
	      };
	    }

	    return actionCreator.apply(undefined, [model].concat(args));
	  };
	}

	exports.default = track;
	exports.trackable = trackable;

/***/ }),

/***/ 225:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.dispatchBatchIfNeeded = undefined;

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _actionTypes = __webpack_require__(59);

	var _actionTypes2 = _interopRequireDefault(_actionTypes);

	var _partition3 = __webpack_require__(801);

	var _partition4 = _interopRequireDefault(_partition3);

	var _isPlainObject = __webpack_require__(32);

	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

	var _track = __webpack_require__(158);

	var _nullAction = __webpack_require__(152);

	var _nullAction2 = _interopRequireDefault(_nullAction);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var batch = (0, _track.trackable)(function (model, actions) {
	  var dispatchableActions = actions.filter(function (action) {
	    return !!action;
	  });

	  if (!dispatchableActions.length) return _nullAction2.default;

	  if (dispatchableActions.length && dispatchableActions.every(_isPlainObject2.default)) {
	    if (dispatchableActions.length === 1) {
	      return dispatchableActions[0];
	    }

	    return {
	      type: _actionTypes2.default.BATCH,
	      model: model,
	      actions: dispatchableActions
	    };
	  }

	  var _partition = (0, _partition4.default)(dispatchableActions, function (action) {
	    return typeof action !== 'function';
	  }),
	      _partition2 = _slicedToArray(_partition, 2),
	      plainActions = _partition2[0],
	      actionThunks = _partition2[1];

	  if (!actionThunks.length) {
	    if (plainActions.length > 1) {
	      return {
	        type: _actionTypes2.default.BATCH,
	        model: model,
	        actions: plainActions
	      };
	    } else if (plainActions.length === 1) {
	      return plainActions[0];
	    }
	  }

	  return function (dispatch) {
	    if (plainActions.length > 1) {
	      dispatch({
	        type: _actionTypes2.default.BATCH,
	        model: model,
	        actions: plainActions
	      });
	    } else if (plainActions.length === 1) {
	      dispatch(plainActions[0]);
	    }
	    actionThunks.forEach(dispatch);
	  };
	});

	function dispatchBatchIfNeeded(model, actions, dispatch) {
	  if (!actions.length) return void 0;

	  var dispatchableActions = actions.filter(function (action) {
	    return !!action;
	  });

	  if (!dispatchableActions.length) return void 0;

	  return dispatch(batch(model, dispatchableActions));
	}

	exports.default = batch;
	exports.dispatchBatchIfNeeded = dispatchBatchIfNeeded;

/***/ }),

/***/ 226:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createControlPropsMap = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _isMulti = __webpack_require__(365);

	var _isMulti2 = _interopRequireDefault(_isMulti);

	var _iteratee = __webpack_require__(233);

	var _actions = __webpack_require__(115);

	var _actions2 = _interopRequireDefault(_actions);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function createControlPropsMap() {
	  function getTextValue(value) {
	    if (typeof value === 'string') {
	      return '' + value;
	    } else if (typeof value === 'number') {
	      return value;
	    }

	    return '';
	  }

	  function isChecked(props) {
	    if ((0, _isMulti2.default)(props.model)) {
	      if (!props.modelValue) return false;

	      return props.modelValue.some(function (item) {
	        return item === props.value;
	      });
	    }

	    return !!props.modelValue;
	  }

	  var standardPropsMap = {
	    name: function name(props) {
	      return props.name || props.model;
	    },
	    disabled: function disabled(_ref) {
	      var fieldValue = _ref.fieldValue,
	          _disabled = _ref.disabled;
	      return (0, _iteratee.iterateeValue)(fieldValue, _disabled);
	    },
	    onChange: function onChange(_ref2) {
	      var _onChange = _ref2.onChange;
	      return _onChange;
	    },
	    onBlur: function onBlur(_ref3) {
	      var _onBlur = _ref3.onBlur;
	      return _onBlur;
	    },
	    onFocus: function onFocus(_ref4) {
	      var _onFocus = _ref4.onFocus;
	      return _onFocus;
	    },
	    onKeyPress: function onKeyPress(_ref5) {
	      var _onKeyPress = _ref5.onKeyPress;
	      return _onKeyPress;
	    }
	  };

	  var textPropsMap = _extends({}, standardPropsMap, {
	    value: function value(props) {
	      return !props.defaultValue && !props.hasOwnProperty('value') ? getTextValue(props.viewValue) : props.value;
	    }
	  });

	  return {
	    default: textPropsMap,
	    checkbox: _extends({}, standardPropsMap, {
	      checked: function checked(props) {
	        return props.defaultChecked ? props.checked : isChecked(props);
	      }
	    }),
	    radio: _extends({}, standardPropsMap, {
	      checked: function checked(props) {
	        return props.defaultChecked ? props.checked : props.modelValue === props.value;
	      },
	      value: function value(props) {
	        return props.value;
	      }
	    }),
	    select: _extends({}, standardPropsMap, {
	      value: function value(props) {
	        return props.modelValue;
	      }
	    }),
	    text: textPropsMap,
	    textarea: textPropsMap,
	    file: standardPropsMap,
	    button: standardPropsMap,
	    reset: _extends({}, standardPropsMap, {
	      onClick: function onClick(props) {
	        return function (event) {
	          event.preventDefault();
	          props.dispatch(_actions2.default.reset(props.model));
	        };
	      }
	    })
	  };
	}

	var controlPropsMap = createControlPropsMap();

	exports.default = controlPropsMap;
	exports.createControlPropsMap = createControlPropsMap;

/***/ }),

/***/ 227:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _actionTypes = __webpack_require__(59);

	var _actionTypes2 = _interopRequireDefault(_actionTypes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function createBatchReducer(reducer, initialState) {
	  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	  var transformAction = options.transformAction;


	  return function () {
	    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
	    var action = arguments[1];

	    var transformedAction = transformAction ? transformAction(action) : action;

	    if (transformedAction.type === _actionTypes2.default.BATCH) {
	      return transformedAction.actions.reduce(reducer, state);
	    }

	    return reducer(state, transformedAction);
	  };
	}

	exports.default = createBatchReducer;

/***/ }),

/***/ 228:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createModeler = undefined;

	var _get2 = __webpack_require__(23);

	var _get3 = _interopRequireDefault(_get2);

	var _icepick = __webpack_require__(52);

	var _icepick2 = _interopRequireDefault(_icepick);

	var _arraysEqual = __webpack_require__(361);

	var _arraysEqual2 = _interopRequireDefault(_arraysEqual);

	var _toPath = __webpack_require__(157);

	var _toPath2 = _interopRequireDefault(_toPath);

	var _actionTypes = __webpack_require__(59);

	var _actionTypes2 = _interopRequireDefault(_actionTypes);

	var _batchedEnhancer = __webpack_require__(227);

	var _batchedEnhancer2 = _interopRequireDefault(_batchedEnhancer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function icepickSet(state, path, value) {
	  return _icepick2.default.setIn(state, path, value);
	}

	var defaultStrategy = {
	  get: _get3.default,
	  set: icepickSet,
	  object: {}
	};

	function createModeler() {
	  var strategy = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultStrategy;
	  var getter = strategy.get,
	      setter = strategy.set,
	      object = strategy.object;


	  return function _createModelReducer(model) {
	    var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : object;
	    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	    var modelPath = (0, _toPath2.default)(model);

	    var modelReducer = function modelReducer() {
	      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
	      var action = arguments[1];

	      if (!action.model) {
	        return state;
	      }

	      var path = (0, _toPath2.default)(action.model);

	      if (!(0, _arraysEqual2.default)(path.slice(0, modelPath.length), modelPath)) {
	        return state;
	      }

	      var localPath = path.slice(modelPath.length);

	      switch (action.type) {
	        case _actionTypes2.default.CHANGE:
	        case _actionTypes2.default.LOAD:
	          if (!localPath.length) {
	            return action.value;
	          }

	          if (getter(state, localPath) === action.value) {
	            return state;
	          }

	          return setter(state, localPath, action.value);

	        case _actionTypes2.default.RESET:
	          if (!localPath.length) {
	            return initialState;
	          }

	          if (getter(state, localPath) === getter(initialState, localPath)) {
	            return state;
	          }

	          return setter(state, localPath, getter(initialState, localPath));

	        default:
	          return state;
	      }
	    };

	    return (0, _batchedEnhancer2.default)(modelReducer, initialState, options);
	  };
	}

	var modelReducer = createModeler();

	exports.createModeler = createModeler;
	exports.default = modelReducer;

/***/ }),

/***/ 229:
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = endsWith;
	function endsWith(string, subString) {
	  if (typeof string !== 'string') return false;

	  var lastIndex = string.lastIndexOf(subString);

	  return lastIndex !== -1 && lastIndex + subString.length === string.length;
	}

/***/ }),

/***/ 230:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = getValidity;

	var _getValue = __webpack_require__(231);

	var _getValue2 = _interopRequireDefault(_getValue);

	var _mapValues = __webpack_require__(45);

	var _mapValues2 = _interopRequireDefault(_mapValues);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function getValidity(validators, value) {
	  var modelValue = (0, _getValue2.default)(value);

	  if (typeof validators === 'function') {
	    return validators(modelValue);
	  }

	  return (0, _mapValues2.default)(validators, function (validator) {
	    return getValidity(validator, modelValue);
	  });
	}

/***/ }),

/***/ 231:
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = getValue;

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function isEvent(event) {
	  return !!(event && event.stopPropagation && event.preventDefault);
	}

	function getEventValue(event) {
	  var target = event.target;


	  if (!target) {
	    if (!event.nativeEvent) {
	      return undefined;
	    }

	    return event.nativeEvent.text;
	  }

	  if (target.type === 'file') {
	    return [].concat(_toConsumableArray(target.files)) || target.dataTransfer && [].concat(_toConsumableArray(target.dataTransfer.files));
	  }

	  if (target.multiple) {
	    return [].concat(_toConsumableArray(target.selectedOptions)).map(function (option) {
	      return option.value;
	    });
	  }

	  return target.value;
	}

	function getValue(value) {
	  return isEvent(value) ? getEventValue(value) : value;
	}

/***/ }),

/***/ 232:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isValidityInvalid;

	var _isPlainObject = __webpack_require__(32);

	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function isValidityInvalid(errors) {
	  if (Array.isArray(errors)) {
	    return errors.some(isValidityInvalid);
	  }

	  if ((0, _isPlainObject2.default)(errors)) {
	    return Object.keys(errors).some(function (key) {
	      return isValidityInvalid(errors[key]);
	    });
	  }

	  return !!errors;
	}

/***/ }),

/***/ 233:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	exports.default = iteratee;
	exports.iterateeValue = iterateeValue;

	var _identity = __webpack_require__(118);

	var _identity2 = _interopRequireDefault(_identity);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function matcher(object) {
	  return function (compareObject) {
	    if (compareObject === object) return true;

	    return Object.keys(object).every(function (key) {
	      return object[key] === compareObject[key];
	    });
	  };
	}

	function propChecker(prop) {
	  return function (object) {
	    return object && !!object[prop];
	  };
	}

	function iteratee(value) {
	  if (typeof value === 'function') {
	    return value;
	  }

	  if (value === null) {
	    return _identity2.default;
	  }

	  if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
	    return matcher(value);
	  }

	  return propChecker(value);
	}

	function iterateeValue(data, value) {
	  if (typeof value === 'function') {
	    return value(data);
	  }

	  if (!Array.isArray(value) && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object' && typeof value !== 'string') {
	    return !!value;
	  }

	  return iteratee(value)(data);
	}

/***/ }),

/***/ 234:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = mergeDeep;

	var _icepick = __webpack_require__(52);

	var _icepick2 = _interopRequireDefault(_icepick);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function mergeDeep(target, source) {
	  return _icepick2.default.merge(target, source);
	}

/***/ }),

/***/ 301:
/***/ (function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * lodash (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
	 * Released under MIT license <https://lodash.com/license>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 */

	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;

	/** `Object#toString` result references. */
	var funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    symbolTag = '[object Symbol]';

	/** Used to match property names within property paths. */
	var reLeadingDot = /^\./,
	    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

	/**
	 * Used to match `RegExp`
	 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
	 */
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

	/** Used to match backslashes in property paths. */
	var reEscapeChar = /\\(\\)?/g;

	/** Used to detect host constructors (Safari). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();

	/**
	 * A specialized version of `_.map` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */
	function arrayMap(array, iteratee) {
	  var index = -1,
	      length = array ? array.length : 0,
	      result = Array(length);

	  while (++index < length) {
	    result[index] = iteratee(array[index], index, array);
	  }
	  return result;
	}

	/**
	 * Gets the value at `key` of `object`.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {string} key The key of the property to get.
	 * @returns {*} Returns the property value.
	 */
	function getValue(object, key) {
	  return object == null ? undefined : object[key];
	}

	/**
	 * Checks if `value` is a host object in IE < 9.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
	 */
	function isHostObject(value) {
	  // Many host objects are `Object` objects that can coerce to strings
	  // despite having improperly defined `toString` methods.
	  var result = false;
	  if (value != null && typeof value.toString != 'function') {
	    try {
	      result = !!(value + '');
	    } catch (e) {}
	  }
	  return result;
	}

	/** Used for built-in method references. */
	var arrayProto = Array.prototype,
	    funcProto = Function.prototype,
	    objectProto = Object.prototype;

	/** Used to detect overreaching core-js shims. */
	var coreJsData = root['__core-js_shared__'];

	/** Used to detect methods masquerading as native. */
	var maskSrcKey = (function() {
	  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
	  return uid ? ('Symbol(src)_1.' + uid) : '';
	}());

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);

	/** Built-in value references. */
	var Symbol = root.Symbol,
	    splice = arrayProto.splice;

	/* Built-in method references that are verified to be native. */
	var Map = getNative(root, 'Map'),
	    nativeCreate = getNative(Object, 'create');

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolToString = symbolProto ? symbolProto.toString : undefined;

	/**
	 * Creates a hash object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Hash(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	/**
	 * Removes all key-value entries from the hash.
	 *
	 * @private
	 * @name clear
	 * @memberOf Hash
	 */
	function hashClear() {
	  this.__data__ = nativeCreate ? nativeCreate(null) : {};
	}

	/**
	 * Removes `key` and its value from the hash.
	 *
	 * @private
	 * @name delete
	 * @memberOf Hash
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function hashDelete(key) {
	  return this.has(key) && delete this.__data__[key];
	}

	/**
	 * Gets the hash value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Hash
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function hashGet(key) {
	  var data = this.__data__;
	  if (nativeCreate) {
	    var result = data[key];
	    return result === HASH_UNDEFINED ? undefined : result;
	  }
	  return hasOwnProperty.call(data, key) ? data[key] : undefined;
	}

	/**
	 * Checks if a hash value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Hash
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function hashHas(key) {
	  var data = this.__data__;
	  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
	}

	/**
	 * Sets the hash `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Hash
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the hash instance.
	 */
	function hashSet(key, value) {
	  var data = this.__data__;
	  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
	  return this;
	}

	// Add methods to `Hash`.
	Hash.prototype.clear = hashClear;
	Hash.prototype['delete'] = hashDelete;
	Hash.prototype.get = hashGet;
	Hash.prototype.has = hashHas;
	Hash.prototype.set = hashSet;

	/**
	 * Creates an list cache object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function ListCache(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	/**
	 * Removes all key-value entries from the list cache.
	 *
	 * @private
	 * @name clear
	 * @memberOf ListCache
	 */
	function listCacheClear() {
	  this.__data__ = [];
	}

	/**
	 * Removes `key` and its value from the list cache.
	 *
	 * @private
	 * @name delete
	 * @memberOf ListCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function listCacheDelete(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  if (index < 0) {
	    return false;
	  }
	  var lastIndex = data.length - 1;
	  if (index == lastIndex) {
	    data.pop();
	  } else {
	    splice.call(data, index, 1);
	  }
	  return true;
	}

	/**
	 * Gets the list cache value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf ListCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function listCacheGet(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  return index < 0 ? undefined : data[index][1];
	}

	/**
	 * Checks if a list cache value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf ListCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function listCacheHas(key) {
	  return assocIndexOf(this.__data__, key) > -1;
	}

	/**
	 * Sets the list cache `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf ListCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the list cache instance.
	 */
	function listCacheSet(key, value) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  if (index < 0) {
	    data.push([key, value]);
	  } else {
	    data[index][1] = value;
	  }
	  return this;
	}

	// Add methods to `ListCache`.
	ListCache.prototype.clear = listCacheClear;
	ListCache.prototype['delete'] = listCacheDelete;
	ListCache.prototype.get = listCacheGet;
	ListCache.prototype.has = listCacheHas;
	ListCache.prototype.set = listCacheSet;

	/**
	 * Creates a map cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function MapCache(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	/**
	 * Removes all key-value entries from the map.
	 *
	 * @private
	 * @name clear
	 * @memberOf MapCache
	 */
	function mapCacheClear() {
	  this.__data__ = {
	    'hash': new Hash,
	    'map': new (Map || ListCache),
	    'string': new Hash
	  };
	}

	/**
	 * Removes `key` and its value from the map.
	 *
	 * @private
	 * @name delete
	 * @memberOf MapCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function mapCacheDelete(key) {
	  return getMapData(this, key)['delete'](key);
	}

	/**
	 * Gets the map value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf MapCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function mapCacheGet(key) {
	  return getMapData(this, key).get(key);
	}

	/**
	 * Checks if a map value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf MapCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function mapCacheHas(key) {
	  return getMapData(this, key).has(key);
	}

	/**
	 * Sets the map `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf MapCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the map cache instance.
	 */
	function mapCacheSet(key, value) {
	  getMapData(this, key).set(key, value);
	  return this;
	}

	// Add methods to `MapCache`.
	MapCache.prototype.clear = mapCacheClear;
	MapCache.prototype['delete'] = mapCacheDelete;
	MapCache.prototype.get = mapCacheGet;
	MapCache.prototype.has = mapCacheHas;
	MapCache.prototype.set = mapCacheSet;

	/**
	 * Gets the index at which the `key` is found in `array` of key-value pairs.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} key The key to search for.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function assocIndexOf(array, key) {
	  var length = array.length;
	  while (length--) {
	    if (eq(array[length][0], key)) {
	      return length;
	    }
	  }
	  return -1;
	}

	/**
	 * The base implementation of `_.isNative` without bad shim checks.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function,
	 *  else `false`.
	 */
	function baseIsNative(value) {
	  if (!isObject(value) || isMasked(value)) {
	    return false;
	  }
	  var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
	  return pattern.test(toSource(value));
	}

	/**
	 * The base implementation of `_.toString` which doesn't convert nullish
	 * values to empty strings.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 */
	function baseToString(value) {
	  // Exit early for strings to avoid a performance hit in some environments.
	  if (typeof value == 'string') {
	    return value;
	  }
	  if (isSymbol(value)) {
	    return symbolToString ? symbolToString.call(value) : '';
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}

	/**
	 * Copies the values of `source` to `array`.
	 *
	 * @private
	 * @param {Array} source The array to copy values from.
	 * @param {Array} [array=[]] The array to copy values to.
	 * @returns {Array} Returns `array`.
	 */
	function copyArray(source, array) {
	  var index = -1,
	      length = source.length;

	  array || (array = Array(length));
	  while (++index < length) {
	    array[index] = source[index];
	  }
	  return array;
	}

	/**
	 * Gets the data for `map`.
	 *
	 * @private
	 * @param {Object} map The map to query.
	 * @param {string} key The reference key.
	 * @returns {*} Returns the map data.
	 */
	function getMapData(map, key) {
	  var data = map.__data__;
	  return isKeyable(key)
	    ? data[typeof key == 'string' ? 'string' : 'hash']
	    : data.map;
	}

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = getValue(object, key);
	  return baseIsNative(value) ? value : undefined;
	}

	/**
	 * Checks if `value` is suitable for use as unique object key.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	 */
	function isKeyable(value) {
	  var type = typeof value;
	  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
	    ? (value !== '__proto__')
	    : (value === null);
	}

	/**
	 * Checks if `func` has its source masked.
	 *
	 * @private
	 * @param {Function} func The function to check.
	 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
	 */
	function isMasked(func) {
	  return !!maskSrcKey && (maskSrcKey in func);
	}

	/**
	 * Converts `string` to a property path array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the property path array.
	 */
	var stringToPath = memoize(function(string) {
	  string = toString(string);

	  var result = [];
	  if (reLeadingDot.test(string)) {
	    result.push('');
	  }
	  string.replace(rePropName, function(match, number, quote, string) {
	    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
	  });
	  return result;
	});

	/**
	 * Converts `value` to a string key if it's not a string or symbol.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @returns {string|symbol} Returns the key.
	 */
	function toKey(value) {
	  if (typeof value == 'string' || isSymbol(value)) {
	    return value;
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}

	/**
	 * Converts `func` to its source code.
	 *
	 * @private
	 * @param {Function} func The function to process.
	 * @returns {string} Returns the source code.
	 */
	function toSource(func) {
	  if (func != null) {
	    try {
	      return funcToString.call(func);
	    } catch (e) {}
	    try {
	      return (func + '');
	    } catch (e) {}
	  }
	  return '';
	}

	/**
	 * Creates a function that memoizes the result of `func`. If `resolver` is
	 * provided, it determines the cache key for storing the result based on the
	 * arguments provided to the memoized function. By default, the first argument
	 * provided to the memoized function is used as the map cache key. The `func`
	 * is invoked with the `this` binding of the memoized function.
	 *
	 * **Note:** The cache is exposed as the `cache` property on the memoized
	 * function. Its creation may be customized by replacing the `_.memoize.Cache`
	 * constructor with one whose instances implement the
	 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
	 * method interface of `delete`, `get`, `has`, and `set`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to have its output memoized.
	 * @param {Function} [resolver] The function to resolve the cache key.
	 * @returns {Function} Returns the new memoized function.
	 * @example
	 *
	 * var object = { 'a': 1, 'b': 2 };
	 * var other = { 'c': 3, 'd': 4 };
	 *
	 * var values = _.memoize(_.values);
	 * values(object);
	 * // => [1, 2]
	 *
	 * values(other);
	 * // => [3, 4]
	 *
	 * object.a = 2;
	 * values(object);
	 * // => [1, 2]
	 *
	 * // Modify the result cache.
	 * values.cache.set(object, ['a', 'b']);
	 * values(object);
	 * // => ['a', 'b']
	 *
	 * // Replace `_.memoize.Cache`.
	 * _.memoize.Cache = WeakMap;
	 */
	function memoize(func, resolver) {
	  if (typeof func != 'function' || (resolver && typeof resolver != 'function')) {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  var memoized = function() {
	    var args = arguments,
	        key = resolver ? resolver.apply(this, args) : args[0],
	        cache = memoized.cache;

	    if (cache.has(key)) {
	      return cache.get(key);
	    }
	    var result = func.apply(this, args);
	    memoized.cache = cache.set(key, result);
	    return result;
	  };
	  memoized.cache = new (memoize.Cache || MapCache);
	  return memoized;
	}

	// Assign cache to `_.memoize`.
	memoize.Cache = MapCache;

	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 * var other = { 'a': 1 };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || (value !== value && other !== other);
	}

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8-9 which returns 'object' for typed array and other constructors.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && objectToString.call(value) == symbolTag);
	}

	/**
	 * Converts `value` to a string. An empty string is returned for `null`
	 * and `undefined` values. The sign of `-0` is preserved.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 * @example
	 *
	 * _.toString(null);
	 * // => ''
	 *
	 * _.toString(-0);
	 * // => '-0'
	 *
	 * _.toString([1, 2, 3]);
	 * // => '1,2,3'
	 */
	function toString(value) {
	  return value == null ? '' : baseToString(value);
	}

	/**
	 * Converts `value` to a property path array.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Util
	 * @param {*} value The value to convert.
	 * @returns {Array} Returns the new property path array.
	 * @example
	 *
	 * _.toPath('a.b.c');
	 * // => ['a', 'b', 'c']
	 *
	 * _.toPath('a[0].b.c');
	 * // => ['a', '0', 'b', 'c']
	 */
	function toPath(value) {
	  if (isArray(value)) {
	    return arrayMap(value, toKey);
	  }
	  return isSymbol(value) ? [value] : copyArray(stringToPath(value));
	}

	module.exports = toPath;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),

/***/ 355:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createFieldActions = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _get2 = __webpack_require__(23);

	var _get3 = _interopRequireDefault(_get2);

	var _mapValues = __webpack_require__(45);

	var _mapValues2 = _interopRequireDefault(_mapValues);

	var _actionTypes = __webpack_require__(59);

	var _actionTypes2 = _interopRequireDefault(_actionTypes);

	var _batchActions = __webpack_require__(225);

	var _batchActions2 = _interopRequireDefault(_batchActions);

	var _getValidity = __webpack_require__(230);

	var _getValidity2 = _interopRequireDefault(_getValidity);

	var _isValidityValid = __webpack_require__(367);

	var _isValidityValid2 = _interopRequireDefault(_isValidityValid);

	var _isValidityInvalid = __webpack_require__(232);

	var _isValidityInvalid2 = _interopRequireDefault(_isValidityInvalid);

	var _invertValidity = __webpack_require__(364);

	var _invertValidity2 = _interopRequireDefault(_invertValidity);

	var _track = __webpack_require__(158);

	var _getForm = __webpack_require__(155);

	var _getForm2 = _interopRequireDefault(_getForm);

	var _getFieldFromState = __webpack_require__(116);

	var _getFieldFromState2 = _interopRequireDefault(_getFieldFromState);

	var _nullAction = __webpack_require__(152);

	var _nullAction2 = _interopRequireDefault(_nullAction);

	var _isNative = __webpack_require__(366);

	var _isNative2 = _interopRequireDefault(_isNative);

	var _invariant = __webpack_require__(16);

	var _invariant2 = _interopRequireDefault(_invariant);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var defaultStrategies = {
	  get: _get3.default,
	  getForm: _getForm2.default,
	  getFieldFromState: _getFieldFromState2.default
	};

	function createFieldActions() {
	  var s = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultStrategies;

	  var addIntent = function addIntent(model, intent) {
	    return {
	      type: _actionTypes2.default.ADD_INTENT,
	      model: model,
	      intent: intent
	    };
	  };

	  var clearIntents = function clearIntents(model, intents) {
	    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	    return {
	      type: _actionTypes2.default.CLEAR_INTENTS,
	      model: model,
	      intents: intents,
	      options: options
	    };
	  };

	  var focus = function focus(model, value) {
	    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	    return _extends({
	      type: _actionTypes2.default.FOCUS,
	      model: model,
	      value: value
	    }, options);
	  };

	  var silentFocus = function silentFocus(model, value) {
	    return focus(model, value, {
	      silent: true
	    });
	  };

	  var blur = function blur(model) {
	    return {
	      type: _actionTypes2.default.BLUR,
	      model: model
	    };
	  };

	  var setPristine = function setPristine(model) {
	    return {
	      type: _actionTypes2.default.SET_PRISTINE,
	      model: model
	    };
	  };

	  var setDirty = function setDirty(model) {
	    return {
	      type: _actionTypes2.default.SET_DIRTY,
	      model: model
	    };
	  };

	  var setInitial = function setInitial(model) {
	    return {
	      type: _actionTypes2.default.SET_INITIAL,
	      model: model
	    };
	  };

	  var setPending = function setPending(model) {
	    var pending = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
	    return {
	      type: _actionTypes2.default.SET_PENDING,
	      model: model,
	      pending: pending
	    };
	  };

	  var setValidating = function setValidating(model) {
	    var validating = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
	    return {
	      type: _actionTypes2.default.SET_VALIDATING,
	      model: model,
	      validating: validating
	    };
	  };

	  var setValidity = function setValidity(model, validity) {
	    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	    return _extends({
	      type: options.errors ? _actionTypes2.default.SET_ERRORS : _actionTypes2.default.SET_VALIDITY,
	      model: model
	    }, options, _defineProperty({}, options.errors ? 'errors' : 'validity', validity));
	  };

	  var resetValidity = function resetValidity(model) {
	    var omitKeys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	    return {
	      type: _actionTypes2.default.RESET_VALIDITY,
	      model: model,
	      omitKeys: omitKeys
	    };
	  };

	  var setFieldsValidity = function setFieldsValidity(model, fieldsValidity) {
	    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	    return {
	      type: _actionTypes2.default.SET_FIELDS_VALIDITY,
	      model: model,
	      fieldsValidity: fieldsValidity,
	      options: options
	    };
	  };

	  var setErrors = function setErrors(model, errors) {
	    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	    return setValidity(model, errors, _extends({}, options, {
	      errors: true
	    }));
	  };

	  var setFieldsErrors = function setFieldsErrors(model, fieldsErrors, options) {
	    return setFieldsValidity(model, fieldsErrors, _extends({}, options, {
	      errors: true
	    }));
	  };

	  var resetErrors = resetValidity;

	  var setTouched = function setTouched(model) {
	    return {
	      type: _actionTypes2.default.SET_TOUCHED,
	      model: model
	    };
	  };

	  var setUntouched = function setUntouched(model) {
	    return {
	      type: _actionTypes2.default.SET_UNTOUCHED,
	      model: model
	    };
	  };

	  var asyncSetValidity = function asyncSetValidity(model, validator) {
	    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	    return function (dispatch, getState) {
	      var value = s.get(getState(), model);

	      dispatch(setValidating(model, true));

	      var done = function done(validity) {
	        dispatch(setValidity(model, validity, _extends({
	          async: true
	        }, options)));
	      };

	      var immediateResult = validator(value, done);

	      if (typeof immediateResult !== 'undefined') {
	        done(immediateResult);
	      }
	    };
	  };

	  var asyncSetErrors = function asyncSetErrors(model, validator) {
	    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	    return asyncSetValidity(model, validator, _extends({
	      errors: true
	    }, options));
	  };

	  var setSubmitted = function setSubmitted(model) {
	    var submitted = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
	    return {
	      type: _actionTypes2.default.SET_SUBMITTED,
	      model: model,
	      submitted: submitted
	    };
	  };

	  var setSubmitFailed = function setSubmitFailed(model) {
	    var submitFailed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
	    return {
	      type: _actionTypes2.default.SET_SUBMIT_FAILED,
	      model: model,
	      submitFailed: submitFailed
	    };
	  };

	  var submit = function submit(model, promise) {
	    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	    if (typeof promise === 'undefined') {
	      return addIntent(model, { type: 'submit' });
	    }

	    return function (dispatch, getState) {
	      if (options.validate) {
	        var form = s.getForm(getState(), model);

	        (0, _invariant2.default)(form, 'Unable to submit form with validation. ' + 'Could not find form for "%s" in the store.', model);

	        if (!form.$form.valid) {
	          return dispatch(_nullAction2.default);
	        }

	        dispatch(setPending(model, true));
	      } else if (options.validators || options.errors) {
	        var validators = options.validators || options.errors;
	        var isErrors = options.errors;
	        var value = s.get(getState(), model);
	        var validity = (0, _getValidity2.default)(validators, value);
	        var valid = options.errors ? !(0, _isValidityInvalid2.default)(validity) : (0, _isValidityValid2.default)(validity);

	        if (!valid) {
	          return dispatch(isErrors ? setErrors(model, validity) : setValidity(model, validity));
	        }

	        dispatch((0, _batchActions2.default)(model, [setValidity(model, isErrors ? (0, _invertValidity2.default)(validity) : validity), setPending(model, true)]));
	      } else {
	        dispatch(setPending(model, true));
	      }

	      var errorsAction = options.fields ? setFieldsErrors : setErrors;

	      promise.then(function (response) {
	        dispatch((0, _batchActions2.default)(model, [setSubmitted(model, true), setValidity(model, response)]));
	      }).catch(function (error) {
	        if (!_isNative2.default) console.error(error);

	        dispatch((0, _batchActions2.default)(model, [setSubmitFailed(model), errorsAction(model, error)]));
	      });

	      return promise;
	    };
	  };

	  var submitFields = function submitFields(model, promise) {
	    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	    return submit(model, promise, _extends({}, options, {
	      fields: true
	    }));
	  };

	  var validSubmit = function validSubmit(model, promise) {
	    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	    return submit(model, promise, _extends({}, options, {
	      validate: true
	    }));
	  };

	  var validate = function validate(model, validators) {
	    return function (dispatch, getState) {
	      var value = s.get(getState(), model);
	      var validity = (0, _getValidity2.default)(validators, value);

	      dispatch(setValidity(model, validity));
	    };
	  };

	  var validateErrors = function validateErrors(model, errorValidators) {
	    return function (dispatch, getState) {
	      var value = s.get(getState(), model);
	      var errors = (0, _getValidity2.default)(errorValidators, value);

	      dispatch(setValidity(model, errors, { errors: true }));
	    };
	  };

	  var validateFields = function validateFields(model, fieldValidators) {
	    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	    return function (dispatch, getState) {
	      var modelValue = s.get(getState(), model);

	      var fieldsValidity = (0, _mapValues2.default)(fieldValidators, function (validator, field) {
	        var fieldValue = field ? s.get(modelValue, field) : modelValue;

	        var fieldValidity = (0, _getValidity2.default)(validator, fieldValue);

	        return fieldValidity;
	      });

	      var fieldsValiditySetter = options.errors ? setFieldsErrors : setFieldsValidity;

	      dispatch(fieldsValiditySetter(model, fieldsValidity));
	    };
	  };

	  var validateFieldsErrors = function validateFieldsErrors(model, fieldErrorsValidators) {
	    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	    return validateFields(model, fieldErrorsValidators, _extends({}, options, {
	      errors: true
	    }));
	  };

	  return (0, _mapValues2.default)({
	    blur: blur,
	    focus: focus,
	    silentFocus: silentFocus,
	    submit: submit,
	    submitFields: submitFields,
	    validSubmit: validSubmit,
	    setDirty: setDirty,
	    setErrors: setErrors,
	    setInitial: setInitial,
	    setPending: setPending,
	    setValidating: setValidating,
	    setPristine: setPristine,
	    setSubmitted: setSubmitted,
	    setSubmitFailed: setSubmitFailed,
	    setTouched: setTouched,
	    setUntouched: setUntouched,
	    setValidity: setValidity,
	    setFieldsValidity: setFieldsValidity,
	    setFieldsErrors: setFieldsErrors,
	    resetValidity: resetValidity,
	    resetErrors: resetErrors,
	    validate: validate,
	    validateErrors: validateErrors,
	    validateFields: validateFields,
	    validateFieldsErrors: validateFieldsErrors,
	    asyncSetValidity: asyncSetValidity,
	    asyncSetErrors: asyncSetErrors,
	    addIntent: addIntent,
	    clearIntents: clearIntents
	  }, _track.trackable);
	}

	exports.createFieldActions = createFieldActions;
	exports.default = createFieldActions();

/***/ }),

/***/ 356:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createControlClass = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(41);

	var _redux = __webpack_require__(79);

	var _identity = __webpack_require__(118);

	var _identity2 = _interopRequireDefault(_identity);

	var _shallowEqual = __webpack_require__(75);

	var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

	var _get2 = __webpack_require__(23);

	var _get3 = _interopRequireDefault(_get2);

	var _merge = __webpack_require__(234);

	var _merge2 = _interopRequireDefault(_merge);

	var _mapValues = __webpack_require__(45);

	var _mapValues2 = _interopRequireDefault(_mapValues);

	var _isPlainObject = __webpack_require__(32);

	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

	var _icepick = __webpack_require__(52);

	var _icepick2 = _interopRequireDefault(_icepick);

	var _omit = __webpack_require__(93);

	var _omit2 = _interopRequireDefault(_omit);

	var _actionTypes = __webpack_require__(59);

	var _actionTypes2 = _interopRequireDefault(_actionTypes);

	var _getValue = __webpack_require__(231);

	var _getValue2 = _interopRequireDefault(_getValue);

	var _getValidity = __webpack_require__(230);

	var _getValidity2 = _interopRequireDefault(_getValidity);

	var _invertValidity = __webpack_require__(364);

	var _invertValidity2 = _interopRequireDefault(_invertValidity);

	var _getFieldFromState = __webpack_require__(116);

	var _getFieldFromState2 = _interopRequireDefault(_getFieldFromState);

	var _getModel = __webpack_require__(117);

	var _getModel2 = _interopRequireDefault(_getModel);

	var _persistEventWithCallback = __webpack_require__(803);

	var _persistEventWithCallback2 = _interopRequireDefault(_persistEventWithCallback);

	var _actions = __webpack_require__(115);

	var _actions2 = _interopRequireDefault(_actions);

	var _controlPropsMap = __webpack_require__(226);

	var _controlPropsMap2 = _interopRequireDefault(_controlPropsMap);

	var _validityKeys = __webpack_require__(787);

	var _validityKeys2 = _interopRequireDefault(_validityKeys);

	var _batchActions = __webpack_require__(225);

	var _resolveModel = __webpack_require__(156);

	var _resolveModel2 = _interopRequireDefault(_resolveModel);

	var _isNative = __webpack_require__(366);

	var _isNative2 = _interopRequireDefault(_isNative);

	var _initialFieldState = __webpack_require__(66);

	var _initialFieldState2 = _interopRequireDefault(_initialFieldState);

	var _containsEvent = __webpack_require__(362);

	var _containsEvent2 = _interopRequireDefault(_containsEvent);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var findDOMNode = !_isNative2.default ? __webpack_require__(30).findDOMNode : null;

	var disallowedProps = ['changeAction', 'getFieldFromState', 'store'];

	function getReadOnlyValue(props) {
	  var modelValue = props.modelValue,
	      controlProps = props.controlProps;


	  switch (controlProps.type) {
	    case 'checkbox':
	      return typeof controlProps.value !== 'undefined' ? controlProps.value : !modelValue; // simple checkbox

	    case 'radio':
	    default:
	      return controlProps.value;
	  }
	}

	function mergeOrSetErrors(model, errors) {
	  return _actions2.default.setErrors(model, errors, {
	    merge: (0, _isPlainObject2.default)(errors)
	  });
	}

	var propTypes = {
	  model: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.string]).isRequired,
	  modelValue: _react.PropTypes.any,
	  viewValue: _react.PropTypes.any,
	  control: _react.PropTypes.any,
	  onLoad: _react.PropTypes.func,
	  onSubmit: _react.PropTypes.func,
	  fieldValue: _react.PropTypes.object,
	  mapProps: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.object]),
	  changeAction: _react.PropTypes.func,
	  updateOn: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.string), _react.PropTypes.string]),
	  validateOn: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.string), _react.PropTypes.string]),
	  validators: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.object]),
	  asyncValidateOn: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.string), _react.PropTypes.string]),
	  asyncValidators: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.object]),
	  errors: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.object]),
	  controlProps: _react.PropTypes.object,
	  component: _react.PropTypes.any,
	  dispatch: _react.PropTypes.func,
	  parser: _react.PropTypes.func,
	  ignore: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.string), _react.PropTypes.string]),
	  dynamic: _react.PropTypes.bool,
	  store: _react.PropTypes.shape({
	    subscribe: _react.PropTypes.func,
	    dispatch: _react.PropTypes.func,
	    getState: _react.PropTypes.func
	  }),
	  getRef: _react.PropTypes.func
	};

	var defaultStrategy = {
	  get: _get3.default,
	  getFieldFromState: _getFieldFromState2.default,
	  actions: _actions2.default
	};

	function createControlClass() {
	  var customControlPropsMap = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  var s = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultStrategy;

	  var controlPropsMap = _extends({}, _controlPropsMap2.default, customControlPropsMap);

	  var emptyControlProps = {};

	  var Control = function (_Component) {
	    _inherits(Control, _Component);

	    function Control(props) {
	      _classCallCheck(this, Control);

	      var _this = _possibleConstructorReturn(this, (Control.__proto__ || Object.getPrototypeOf(Control)).call(this, props));

	      _this.getChangeAction = _this.getChangeAction.bind(_this);
	      _this.getValidateAction = _this.getValidateAction.bind(_this);

	      _this.handleKeyPress = _this.handleKeyPress.bind(_this);
	      _this.createEventHandler = _this.createEventHandler.bind(_this);
	      _this.handleFocus = _this.createEventHandler('focus').bind(_this);
	      _this.handleBlur = _this.createEventHandler('blur').bind(_this);
	      _this.handleUpdate = _this.createEventHandler('change').bind(_this);
	      _this.handleChange = _this.handleChange.bind(_this);
	      _this.handleLoad = _this.handleLoad.bind(_this);
	      _this.getMappedProps = _this.getMappedProps.bind(_this);
	      _this.attachNode = _this.attachNode.bind(_this);

	      _this.willValidate = false;

	      _this.state = {
	        viewValue: props.modelValue
	      };
	      return _this;
	    }

	    _createClass(Control, [{
	      key: 'componentDidMount',
	      value: function componentDidMount() {
	        this.attachNode();
	        this.handleLoad();
	      }
	    }, {
	      key: 'componentWillReceiveProps',
	      value: function componentWillReceiveProps(nextProps) {
	        if (nextProps.modelValue !== this.props.modelValue) {
	          this.setViewValue(nextProps.modelValue);
	        }
	      }
	    }, {
	      key: 'shouldComponentUpdate',
	      value: function shouldComponentUpdate(nextProps, nextState) {
	        return !(0, _shallowEqual2.default)(this.props, nextProps, {
	          deepKeys: ['controlProps'],
	          omitKeys: ['mapProps']
	        }) || !(0, _shallowEqual2.default)(this.state.viewValue, nextState.viewValue);
	      }
	    }, {
	      key: 'componentDidUpdate',
	      value: function componentDidUpdate() {
	        this.handleIntents();
	      }
	    }, {
	      key: 'componentWillUnmount',
	      value: function componentWillUnmount() {
	        var _props = this.props,
	            model = _props.model,
	            fieldValue = _props.fieldValue,
	            dispatch = _props.dispatch,
	            _props$validators = _props.validators,
	            validators = _props$validators === undefined ? {} : _props$validators,
	            _props$errors = _props.errors,
	            errors = _props$errors === undefined ? {} : _props$errors;


	        if (fieldValue && !fieldValue.valid) {
	          var keys = Object.keys(validators).concat(Object.keys(errors), this.willValidate ? _validityKeys2.default : []);

	          dispatch(_actions2.default.resetValidity(model, keys));
	        }
	      }
	    }, {
	      key: 'getMappedProps',
	      value: function getMappedProps() {
	        var props = this.props;
	        var mapProps = props.mapProps;
	        var viewValue = this.state.viewValue;

	        var originalProps = _extends({}, props, props.controlProps, {
	          onFocus: this.handleFocus,
	          onBlur: this.handleBlur,
	          onChange: this.handleChange,
	          onKeyPress: this.handleKeyPress,
	          viewValue: viewValue
	        });

	        if ((0, _isPlainObject2.default)(mapProps)) {
	          return (0, _mapValues2.default)(mapProps, function (value, key) {
	            if (typeof value === 'function' && key !== 'component') {
	              return value(originalProps);
	            }

	            return value;
	          });
	        }

	        return mapProps(originalProps);
	      }
	    }, {
	      key: 'getChangeAction',
	      value: function getChangeAction(event) {
	        var _props2 = this.props,
	            model = _props2.model,
	            modelValue = _props2.modelValue,
	            changeAction = _props2.changeAction;

	        var value = this.isReadOnlyValue() ? getReadOnlyValue(this.props) : event;

	        return changeAction(model, (0, _getValue2.default)(value), {
	          currentValue: modelValue
	        });
	      }
	    }, {
	      key: 'getValidateAction',
	      value: function getValidateAction(value, eventName) {
	        var _props3 = this.props,
	            validators = _props3.validators,
	            errors = _props3.errors,
	            model = _props3.model,
	            modelValue = _props3.modelValue,
	            updateOn = _props3.updateOn,
	            fieldValue = _props3.fieldValue;


	        if (!validators && !errors && _isNative2.default) return false;

	        var nodeErrors = this.getNodeErrors();

	        // If it is not a change event, use the model value.
	        var valueToValidate = (0, _containsEvent2.default)(updateOn, eventName) ? value : modelValue;

	        if (validators || errors) {
	          var fieldValidity = (0, _getValidity2.default)(validators, valueToValidate);
	          var fieldErrors = (0, _merge2.default)((0, _getValidity2.default)(errors, valueToValidate), nodeErrors);

	          var mergedErrors = validators ? (0, _merge2.default)((0, _invertValidity2.default)(fieldValidity), fieldErrors) : fieldErrors;

	          if (!fieldValue || !(0, _shallowEqual2.default)(mergedErrors, fieldValue.errors)) {
	            return mergeOrSetErrors(model, mergedErrors);
	          }
	        } else if (nodeErrors && Object.keys(nodeErrors).length) {
	          return mergeOrSetErrors(model, nodeErrors);
	        }

	        return false;
	      }
	    }, {
	      key: 'getAsyncValidateAction',
	      value: function getAsyncValidateAction(value, eventName) {
	        var _props4 = this.props,
	            asyncValidators = _props4.asyncValidators,
	            fieldValue = _props4.fieldValue,
	            model = _props4.model,
	            modelValue = _props4.modelValue,
	            updateOn = _props4.updateOn,
	            dispatch = _props4.dispatch;

	        // If there are no async validators,
	        // do not run async validation

	        if (!asyncValidators) return false;

	        // If it is not a change event, use the model value.
	        var valueToValidate = (0, _containsEvent2.default)(updateOn, eventName) ? value : modelValue;

	        // If any sync validity is invalid,
	        // do not run async validation
	        var asyncValidatorKeys = Object.keys(asyncValidators);
	        var syncValid = Object.keys(fieldValue.validity).every(function (key) {
	          // If validity is based on async validator, skip
	          if (!!~asyncValidatorKeys.indexOf(key)) return true;

	          return fieldValue.validity[key];
	        });

	        if (!syncValid) return false;

	        dispatch(_actions2.default.setValidating(model, true));

	        (0, _mapValues2.default)(asyncValidators, function (validator, key) {
	          var outerDone = function outerDone(valid) {
	            var validity = _icepick2.default.merge(fieldValue.validity, _defineProperty({}, key, valid));

	            dispatch(_actions2.default.setValidity(model, validity));
	          };

	          validator((0, _getValue2.default)(valueToValidate), outerDone);
	        });

	        return valueToValidate;
	      }
	    }, {
	      key: 'getNodeErrors',
	      value: function getNodeErrors() {
	        var node = this.node,
	            fieldValue = this.props.fieldValue;


	        if (!node || !node.willValidate) {
	          this.willValidate = false;
	          return null;
	        }

	        this.willValidate = true;

	        var nodeErrors = {};

	        _validityKeys2.default.forEach(function (key) {
	          var errorValidity = node.validity[key];

	          // If the key is invalid or they key was
	          // previously invalid and is now valid,
	          // set its validity
	          if (errorValidity || fieldValue && fieldValue.errors[key]) {
	            nodeErrors[key] = errorValidity;
	          }
	        });

	        return nodeErrors;
	      }
	    }, {
	      key: 'setViewValue',
	      value: function setViewValue(viewValue) {
	        if (!this.isReadOnlyValue()) {
	          this.setState({ viewValue: this.parse(viewValue) });
	        }
	      }
	    }, {
	      key: 'isReadOnlyValue',
	      value: function isReadOnlyValue() {
	        var _props5 = this.props,
	            component = _props5.component,
	            controlProps = _props5.controlProps;


	        return component === 'input' && ~['radio', 'checkbox'].indexOf(controlProps.type);
	      }
	    }, {
	      key: 'handleIntents',
	      value: function handleIntents() {
	        var _this2 = this;

	        var _props6 = this.props,
	            model = _props6.model,
	            modelValue = _props6.modelValue,
	            fieldValue = _props6.fieldValue,
	            intents = _props6.fieldValue.intents,
	            controlProps = _props6.controlProps,
	            dispatch = _props6.dispatch,
	            updateOn = _props6.updateOn,
	            _props6$validateOn = _props6.validateOn,
	            validateOn = _props6$validateOn === undefined ? updateOn : _props6$validateOn;


	        if (!intents.length) return;

	        intents.forEach(function (intent) {
	          switch (intent.type) {
	            case _actionTypes2.default.FOCUS:
	              {
	                if (_isNative2.default) return;

	                var focused = fieldValue.focus;

	                if (focused && _this2.node.focus && (!_this2.isReadOnlyValue() || typeof intent.value === 'undefined' || intent.value === controlProps.value)) {
	                  _this2.node.focus();

	                  dispatch(_actions2.default.clearIntents(model, intent));
	                }

	                return;
	              }
	            case 'validate':
	              if ((0, _containsEvent2.default)(validateOn, 'change')) {
	                dispatch(_actions2.default.clearIntents(model, intent));
	                _this2.validate();
	              }
	              return;

	            case 'load':
	              if (!(0, _shallowEqual2.default)(modelValue, intent.value)) {
	                dispatch(_actions2.default.clearIntents(model, intent));
	                dispatch(_actions2.default.load(model, intent.value));
	              }
	              return;

	            default:
	              return;
	          }
	        });
	      }
	    }, {
	      key: 'parse',
	      value: function parse(value) {
	        return this.props.parser ? this.props.parser(value) : value;
	      }
	    }, {
	      key: 'handleChange',
	      value: function handleChange(event) {
	        this.setViewValue((0, _getValue2.default)(event));
	        this.handleUpdate(event);
	      }
	    }, {
	      key: 'handleKeyPress',
	      value: function handleKeyPress(event) {
	        var _props7 = this.props,
	            onKeyPress = _props7.controlProps.onKeyPress,
	            dispatch = _props7.dispatch;

	        // Get the value from the event
	        // in case updateOn="blur" (or something other than "change")

	        var parsedValue = this.parse((0, _getValue2.default)(event));

	        if (event.key === 'Enter') {
	          dispatch(this.getChangeAction(parsedValue));
	        }

	        if (onKeyPress) onKeyPress(event);
	      }
	    }, {
	      key: 'handleLoad',
	      value: function handleLoad() {
	        var _props8 = this.props,
	            model = _props8.model,
	            modelValue = _props8.modelValue,
	            fieldValue = _props8.fieldValue,
	            _props8$controlProps = _props8.controlProps,
	            controlProps = _props8$controlProps === undefined ? emptyControlProps : _props8$controlProps,
	            onLoad = _props8.onLoad,
	            dispatch = _props8.dispatch,
	            changeAction = _props8.changeAction,
	            parser = _props8.parser;

	        var defaultValue = undefined;

	        if (controlProps.hasOwnProperty('defaultValue')) {
	          defaultValue = controlProps.defaultValue;
	        } else if (controlProps.hasOwnProperty('defaultChecked')) {
	          defaultValue = controlProps.defaultChecked;
	        }

	        var loadActions = [this.getValidateAction(defaultValue)];

	        if (typeof defaultValue !== 'undefined') {
	          loadActions.push(changeAction(model, defaultValue));
	        } else {
	          if (parser) {
	            var parsedValue = parser(modelValue);

	            if (parsedValue !== modelValue) {
	              loadActions.push(changeAction(model, parsedValue));
	            }
	          }
	        }

	        (0, _batchActions.dispatchBatchIfNeeded)(model, loadActions, dispatch);

	        if (onLoad) onLoad(modelValue, fieldValue, this.node);
	      }
	    }, {
	      key: 'createEventHandler',
	      value: function createEventHandler(eventName) {
	        var _this3 = this;

	        var _props9 = this.props,
	            dispatch = _props9.dispatch,
	            model = _props9.model,
	            updateOn = _props9.updateOn,
	            _props9$validateOn = _props9.validateOn,
	            validateOn = _props9$validateOn === undefined ? updateOn : _props9$validateOn,
	            asyncValidateOn = _props9.asyncValidateOn,
	            _props9$controlProps = _props9.controlProps,
	            controlProps = _props9$controlProps === undefined ? emptyControlProps : _props9$controlProps,
	            parser = _props9.parser,
	            ignore = _props9.ignore;


	        var eventAction = {
	          focus: _actions2.default.silentFocus,
	          blur: _actions2.default.blur
	        }[eventName];

	        var controlEventHandler = {
	          focus: controlProps.onFocus,
	          blur: controlProps.onBlur,
	          change: controlProps.onChange
	        }[eventName];

	        var dispatchBatchActions = function dispatchBatchActions(persistedEvent) {
	          var eventActions = [eventAction && eventAction(model), (0, _containsEvent2.default)(validateOn, eventName) && _this3.getValidateAction(persistedEvent, eventName), (0, _containsEvent2.default)(updateOn, eventName) && _this3.getChangeAction(persistedEvent)];

	          (0, _batchActions.dispatchBatchIfNeeded)(model, eventActions, dispatch);

	          return persistedEvent;
	        };

	        return function (event) {
	          if ((0, _containsEvent2.default)(ignore, eventName)) {
	            return controlEventHandler ? controlEventHandler(event) : event;
	          }

	          if (_this3.isReadOnlyValue()) {
	            return (0, _redux.compose)(dispatchBatchActions, (0, _persistEventWithCallback2.default)(controlEventHandler || _identity2.default))(event);
	          }

	          return (0, _redux.compose)(function (e) {
	            if ((0, _containsEvent2.default)(asyncValidateOn, eventName)) {
	              _this3.getAsyncValidateAction(e, eventName);
	            }

	            return e;
	          }, dispatchBatchActions, parser, _getValue2.default, (0, _persistEventWithCallback2.default)(controlEventHandler || _identity2.default))(event);
	        };
	      }
	    }, {
	      key: 'attachNode',
	      value: function attachNode() {
	        var node = findDOMNode && findDOMNode(this);

	        if (node) this.node = node;
	      }
	    }, {
	      key: 'validate',
	      value: function validate() {
	        var _props10 = this.props,
	            model = _props10.model,
	            modelValue = _props10.modelValue,
	            fieldValue = _props10.fieldValue,
	            validators = _props10.validators,
	            errorValidators = _props10.errors,
	            dispatch = _props10.dispatch;


	        if (!validators && !errorValidators) return modelValue;
	        if (!fieldValue) return modelValue;

	        var fieldValidity = (0, _getValidity2.default)(validators, modelValue);
	        var fieldErrors = (0, _getValidity2.default)(errorValidators, modelValue);

	        var errors = validators ? (0, _merge2.default)((0, _invertValidity2.default)(fieldValidity), fieldErrors) : fieldErrors;

	        if (!(0, _shallowEqual2.default)(errors, fieldValue.errors)) {
	          dispatch(mergeOrSetErrors(model, errors));
	        }

	        return modelValue;
	      }
	    }, {
	      key: 'render',
	      value: function render() {
	        var _props11 = this.props,
	            _props11$controlProps = _props11.controlProps,
	            controlProps = _props11$controlProps === undefined ? emptyControlProps : _props11$controlProps,
	            component = _props11.component,
	            control = _props11.control,
	            getRef = _props11.getRef;


	        var mappedProps = (0, _omit2.default)(this.getMappedProps(), disallowedProps);

	        if (getRef) {
	          mappedProps.ref = getRef;
	        }

	        // If there is an existing control, clone it
	        if (control) {
	          return (0, _react.cloneElement)(control, mappedProps, controlProps.children);
	        }

	        return (0, _react.createElement)(component, _extends({}, controlProps, mappedProps));
	      }
	    }]);

	    return Control;
	  }(_react.Component);

	  Control.displayName = 'Control';

	   true ? Control.propTypes = propTypes : void 0;

	  Control.defaultProps = {
	    changeAction: s.actions.change,
	    updateOn: 'change',
	    asyncValidateOn: 'blur',
	    parser: _identity2.default,
	    controlProps: emptyControlProps,
	    ignore: [],
	    dynamic: false,
	    mapProps: controlPropsMap.default,
	    component: 'input'
	  };

	  function mapStateToProps(state, props) {
	    var model = props.model,
	        _props$controlProps = props.controlProps,
	        controlProps = _props$controlProps === undefined ? (0, _omit2.default)(props, Object.keys(propTypes)) : _props$controlProps;


	    var modelString = (0, _getModel2.default)(model, state);
	    var fieldValue = s.getFieldFromState(state, modelString) || _initialFieldState2.default;

	    return {
	      model: modelString,
	      modelValue: s.get(state, modelString),
	      fieldValue: fieldValue,
	      controlProps: controlProps
	    };
	  }

	  var ConnectedControl = (0, _resolveModel2.default)((0, _reactRedux.connect)(mapStateToProps)(Control));

	  /* eslint-disable react/prop-types */
	  ConnectedControl.input = function (props) {
	    return _react2.default.createElement(ConnectedControl, _extends({
	      component: 'input',
	      mapProps: _extends({}, controlPropsMap.default, props.mapProps)
	    }, (0, _omit2.default)(props, 'mapProps')));
	  };

	  ConnectedControl.text = function (props) {
	    return _react2.default.createElement(ConnectedControl, _extends({
	      component: 'input',
	      mapProps: _extends({}, controlPropsMap.text, {
	        type: 'text'
	      }, props.mapProps)
	    }, (0, _omit2.default)(props, 'mapProps')));
	  };

	  ConnectedControl.textarea = function (props) {
	    return _react2.default.createElement(ConnectedControl, _extends({
	      component: 'textarea',
	      mapProps: _extends({}, controlPropsMap.textarea, props.mapProps)
	    }, (0, _omit2.default)(props, 'mapProps')));
	  };

	  ConnectedControl.radio = function (props) {
	    return _react2.default.createElement(ConnectedControl, _extends({
	      component: 'input',
	      type: 'radio',
	      mapProps: _extends({}, controlPropsMap.radio, props.mapProps)
	    }, (0, _omit2.default)(props, 'mapProps')));
	  };

	  ConnectedControl.checkbox = function (props) {
	    return _react2.default.createElement(ConnectedControl, _extends({
	      component: 'input',
	      type: 'checkbox',
	      mapProps: _extends({}, controlPropsMap.checkbox, props.mapProps),
	      changeAction: props.changeAction || s.actions.checkWithValue
	    }, (0, _omit2.default)(props, 'mapProps')));
	  };

	  ConnectedControl.file = function (props) {
	    return _react2.default.createElement(ConnectedControl, _extends({
	      component: 'input',
	      type: 'file',
	      mapProps: _extends({}, controlPropsMap.file, props.mapProps)
	    }, (0, _omit2.default)(props, 'mapProps')));
	  };

	  ConnectedControl.select = function (props) {
	    return _react2.default.createElement(ConnectedControl, _extends({
	      component: 'select',
	      mapProps: _extends({}, controlPropsMap.select, props.mapProps)
	    }, (0, _omit2.default)(props, 'mapProps')));
	  };

	  ConnectedControl.button = function (props) {
	    return _react2.default.createElement(ConnectedControl, _extends({
	      component: 'button',
	      mapProps: _extends({}, controlPropsMap.button, props.mapProps)
	    }, (0, _omit2.default)(props, 'mapProps')));
	  };

	  ConnectedControl.reset = function (props) {
	    return _react2.default.createElement(ConnectedControl, _extends({
	      component: 'button',
	      type: 'reset',
	      mapProps: _extends({}, controlPropsMap.reset, props.mapProps)
	    }, (0, _omit2.default)(props, 'mapProps')));
	  };

	  return ConnectedControl;
	}

	exports.createControlClass = createControlClass;
	exports.default = createControlClass();

/***/ }),

/***/ 357:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createFormClass = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(41);

	var _shallowEqual = __webpack_require__(75);

	var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

	var _get2 = __webpack_require__(23);

	var _get3 = _interopRequireDefault(_get2);

	var _mapValues = __webpack_require__(45);

	var _mapValues2 = _interopRequireDefault(_mapValues);

	var _merge = __webpack_require__(234);

	var _merge2 = _interopRequireDefault(_merge);

	var _omit = __webpack_require__(93);

	var _omit2 = _interopRequireDefault(_omit);

	var _actions = __webpack_require__(115);

	var _actions2 = _interopRequireDefault(_actions);

	var _getValidity = __webpack_require__(230);

	var _getValidity2 = _interopRequireDefault(_getValidity);

	var _invertValidators = __webpack_require__(800);

	var _invertValidators2 = _interopRequireDefault(_invertValidators);

	var _isValidityInvalid = __webpack_require__(232);

	var _isValidityInvalid2 = _interopRequireDefault(_isValidityInvalid);

	var _isValid = __webpack_require__(153);

	var _isValid2 = _interopRequireDefault(_isValid);

	var _getForm = __webpack_require__(155);

	var _getForm2 = _interopRequireDefault(_getForm);

	var _getModel = __webpack_require__(117);

	var _getModel2 = _interopRequireDefault(_getModel);

	var _getField = __webpack_require__(798);

	var _getField2 = _interopRequireDefault(_getField);

	var _deepCompareChildren = __webpack_require__(363);

	var _deepCompareChildren2 = _interopRequireDefault(_deepCompareChildren);

	var _containsEvent = __webpack_require__(362);

	var _containsEvent2 = _interopRequireDefault(_containsEvent);

	var _invariant = __webpack_require__(16);

	var _invariant2 = _interopRequireDefault(_invariant);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var propTypes = {
	  component: _react.PropTypes.any,
	  validators: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.func]),
	  errors: _react.PropTypes.object,
	  validateOn: _react.PropTypes.oneOf(['change', 'submit']),
	  model: _react.PropTypes.string.isRequired,
	  modelValue: _react.PropTypes.any,
	  formValue: _react.PropTypes.object,
	  onSubmit: _react.PropTypes.func,
	  onSubmitFailed: _react.PropTypes.func,
	  dispatch: _react.PropTypes.func,
	  children: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.node]),
	  store: _react.PropTypes.shape({
	    subscribe: _react.PropTypes.func,
	    dispatch: _react.PropTypes.func,
	    getState: _react.PropTypes.func
	  }),
	  onUpdate: _react.PropTypes.func,
	  onChange: _react.PropTypes.func,
	  getRef: _react.PropTypes.func,
	  getDispatch: _react.PropTypes.func
	};

	var defaultStrategy = {
	  get: _get3.default,
	  getForm: _getForm2.default,
	  actions: _actions2.default
	};

	function createFormClass() {
	  var s = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultStrategy;

	  var Form = function (_Component) {
	    _inherits(Form, _Component);

	    function Form(props) {
	      _classCallCheck(this, Form);

	      var _this = _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props));

	      _this.handleSubmit = _this.handleSubmit.bind(_this);
	      _this.handleReset = _this.handleReset.bind(_this);
	      _this.handleValidSubmit = _this.handleValidSubmit.bind(_this);
	      _this.handleInvalidSubmit = _this.handleInvalidSubmit.bind(_this);
	      _this.attachNode = _this.attachNode.bind(_this);
	      return _this;
	    }

	    _createClass(Form, [{
	      key: 'getChildContext',
	      value: function getChildContext() {
	        return {
	          model: this.props.model,
	          localStore: this.props.store
	        };
	      }
	    }, {
	      key: 'componentDidMount',
	      value: function componentDidMount() {
	        this.handleUpdate();
	        this.handleChange();

	        if ((0, _containsEvent2.default)(this.props.validateOn, 'change')) {
	          this.validate(this.props, true);
	        }

	        if (this.props.getDispatch) {
	          this.props.getDispatch(this.props.dispatch);
	        }
	      }
	    }, {
	      key: 'componentWillReceiveProps',
	      value: function componentWillReceiveProps(nextProps) {
	        if ((0, _containsEvent2.default)(nextProps.validateOn, 'change')) {
	          this.validate(nextProps);
	        }
	      }
	    }, {
	      key: 'shouldComponentUpdate',
	      value: function shouldComponentUpdate(nextProps) {
	        return (0, _deepCompareChildren2.default)(this, nextProps);
	      }
	    }, {
	      key: 'componentDidUpdate',
	      value: function componentDidUpdate(prevProps) {
	        this.handleIntents();

	        if (!(0, _shallowEqual2.default)(prevProps.formValue, this.props.formValue)) {
	          this.handleUpdate();
	        }

	        if (!(0, _shallowEqual2.default)(prevProps.modelValue, this.props.modelValue)) {
	          this.handleChange();
	        }
	      }
	    }, {
	      key: 'handleUpdate',
	      value: function handleUpdate() {
	        if (this.props.onUpdate) {
	          this.props.onUpdate(this.props.formValue);
	        }
	      }
	    }, {
	      key: 'handleChange',
	      value: function handleChange() {
	        if (this.props.onChange) {
	          this.props.onChange(this.props.modelValue);
	        }
	      }
	    }, {
	      key: 'attachNode',
	      value: function attachNode(node) {
	        if (!node) return;

	        this._node = node;

	        this._node.submit = this.handleSubmit;
	        if (this.props.getRef) this.props.getRef(node);
	      }
	    }, {
	      key: 'validate',
	      value: function validate(nextProps) {
	        var initial = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	        var _props = this.props,
	            model = _props.model,
	            dispatch = _props.dispatch,
	            formValue = _props.formValue,
	            modelValue = _props.modelValue;
	        var validators = nextProps.validators,
	            errors = nextProps.errors;


	        if (!formValue) return;

	        if (!validators && !errors && modelValue !== nextProps.modelValue) {
	          // If the form is invalid (due to async validity)
	          // but its fields are valid and the value has changed,
	          // the form should be "valid" again.
	          if ((0, _isValid2.default)(formValue, { async: false })) {
	            dispatch(s.actions.setValidity(model, true));
	          }

	          return;
	        }

	        var validatorsChanged = validators !== this.props.validators || errors !== this.props.errors;

	        var fieldsErrors = {};
	        var validityChanged = false;

	        // this is (internally) mutative for performance reasons.
	        var validateField = function validateField(errorValidator, field) {
	          if (!!~field.indexOf('[]')) {
	            (function () {
	              var _field$split = field.split('[]'),
	                  _field$split2 = _slicedToArray(_field$split, 2),
	                  parentModel = _field$split2[0],
	                  childModel = _field$split2[1];

	              var nextValue = parentModel ? s.get(nextProps.modelValue, parentModel) : nextProps.modelValue;

	              nextValue.forEach(function (subValue, index) {
	                validateField(errorValidator, parentModel + '[' + index + ']' + childModel);
	              });
	            })();
	          } else {
	            var nextValue = field ? s.get(nextProps.modelValue, field) : nextProps.modelValue;

	            var currentValue = field ? s.get(modelValue, field) : modelValue;

	            var currentErrors = (0, _getField2.default)(formValue, field).errors;

	            // If the validators didn't change, the validity didn't change.
	            if (!initial && !validatorsChanged && nextValue === currentValue) {
	              fieldsErrors[field] = (0, _getField2.default)(formValue, field).errors;
	            } else {
	              var fieldErrors = (0, _getValidity2.default)(errorValidator, nextValue);

	              if (!validityChanged && !(0, _shallowEqual2.default)(fieldErrors, currentErrors)) {
	                validityChanged = true;
	              }

	              // Changed the below for a test that errors and validations
	              // get merged correctly, but it appears this wasn't actually
	              // supported for the same field? Also could have the side
	              // effect that errors wouldn't get cleared?
	              // fieldsErrors[field] = merge(fieldsErrors[field] || {}, fieldErrors);

	              fieldsErrors[field] = fieldErrors;
	            }
	          }
	        };

	        // Run errors first, validations should take precendence.
	        // When run below will replace the contents of the fieldErrors[].
	        (0, _mapValues2.default)(errors, validateField);

	        if (typeof validators === 'function') {
	          var field = '';

	          var nextValue = field ? s.get(nextProps.modelValue, field) : nextProps.modelValue;

	          var currentValue = field ? s.get(modelValue, field) : modelValue;

	          // If the validators didn't change, the validity didn't change.
	          if (!initial && !validatorsChanged && nextValue === currentValue) {
	            // TODO this will only set the errors on form when using the function.
	            // How handle? Safe to assume will be no dispatch?
	            // fieldsErrors[field] = getField(formValue, field).errors;
	          } else {
	            (function () {
	              var multiFieldErrors = (0, _getValidity2.default)(validators, nextValue);

	              if (multiFieldErrors) {
	                Object.keys(multiFieldErrors).forEach(function (key) {
	                  // key will be the model value to apply errors to.
	                  var fieldErrors = multiFieldErrors[key];
	                  var currentErrors = (0, _getField2.default)(formValue, key).errors;

	                  // Invert validators
	                  Object.keys(fieldErrors).forEach(function (validationName) {
	                    fieldErrors[validationName] = !fieldErrors[validationName];
	                  });

	                  if (!validityChanged && !(0, _shallowEqual2.default)(fieldErrors, currentErrors)) {
	                    validityChanged = true;
	                  }

	                  fieldsErrors[key] = fieldErrors;
	                });
	              }
	            })();
	          }
	        } else if (validators) {
	          var errorValidators = (0, _invertValidators2.default)(validators);

	          (0, _mapValues2.default)(errorValidators, validateField);
	        }

	        // Compute form-level validity
	        if (!fieldsErrors.hasOwnProperty('')) {
	          fieldsErrors[''] = false;
	          validityChanged = validityChanged || (0, _isValidityInvalid2.default)(formValue.$form.errors);
	        }

	        if (validityChanged) {
	          dispatch(s.actions.setFieldsErrors(model, fieldsErrors));
	        }
	      }
	    }, {
	      key: 'handleValidSubmit',
	      value: function handleValidSubmit() {
	        var _props2 = this.props,
	            dispatch = _props2.dispatch,
	            model = _props2.model,
	            modelValue = _props2.modelValue,
	            onSubmit = _props2.onSubmit;


	        dispatch(s.actions.setPending(model));

	        if (onSubmit) onSubmit(modelValue);
	      }
	    }, {
	      key: 'handleInvalidSubmit',
	      value: function handleInvalidSubmit() {
	        var _props3 = this.props,
	            onSubmitFailed = _props3.onSubmitFailed,
	            formValue = _props3.formValue,
	            dispatch = _props3.dispatch;


	        if (onSubmitFailed) {
	          onSubmitFailed(formValue);
	        }

	        if (!formValue.$form.submitFailed) {
	          dispatch(s.actions.setSubmitFailed(this.props.model));
	        }
	      }
	    }, {
	      key: 'handleReset',
	      value: function handleReset(e) {
	        if (e) e.preventDefault();

	        this.props.dispatch(s.actions.reset(this.props.model));
	      }
	    }, {
	      key: 'handleIntents',
	      value: function handleIntents() {
	        var _this2 = this;

	        var _props4 = this.props,
	            model = _props4.model,
	            formValue = _props4.formValue,
	            dispatch = _props4.dispatch;


	        formValue.$form.intents.forEach(function (intent) {
	          switch (intent.type) {
	            case 'submit':
	              {
	                dispatch(s.actions.clearIntents(model, intent));

	                if ((0, _isValid2.default)(formValue, { async: false })) {
	                  _this2.handleValidSubmit();
	                } else {
	                  _this2.handleInvalidSubmit();
	                }

	                return;
	              }

	            default:
	              return;
	          }
	        });
	      }
	    }, {
	      key: 'handleSubmit',
	      value: function handleSubmit(e) {
	        if (e) e.preventDefault();

	        var _props5 = this.props,
	            model = _props5.model,
	            modelValue = _props5.modelValue,
	            formValue = _props5.formValue,
	            onSubmit = _props5.onSubmit,
	            dispatch = _props5.dispatch,
	            validators = _props5.validators,
	            errorValidators = _props5.errors;


	        var formValid = formValue ? formValue.$form.valid : true;

	        if (!validators && onSubmit && formValid) {
	          onSubmit(modelValue);

	          return modelValue;
	        }

	        var finalErrorValidators = validators ? (0, _merge2.default)((0, _invertValidators2.default)(validators), errorValidators) : errorValidators;

	        var fieldsValidity = {};

	        // this is (internally) mutative for performance reasons.
	        var validateField = function validateField(validator, field) {
	          if (!!~field.indexOf('[]')) {
	            (function () {
	              var _field$split3 = field.split('[]'),
	                  _field$split4 = _slicedToArray(_field$split3, 2),
	                  parentModel = _field$split4[0],
	                  childModel = _field$split4[1];

	              var fieldValue = parentModel ? s.get(modelValue, parentModel) : modelValue;

	              fieldValue.forEach(function (subValue, index) {
	                validateField(validator, parentModel + '[' + index + ']' + childModel);
	              });
	            })();
	          } else {
	            var fieldValue = field ? s.get(modelValue, field) : modelValue;

	            var fieldValidity = (0, _getValidity2.default)(validator, fieldValue);

	            fieldsValidity[field] = fieldValidity;
	          }
	        };

	        (0, _mapValues2.default)(finalErrorValidators, validateField);

	        dispatch(s.actions.batch(model, [s.actions.setFieldsErrors(model, fieldsValidity), s.actions.addIntent(model, { type: 'submit' })]));

	        return modelValue;
	      }
	    }, {
	      key: 'render',
	      value: function render() {
	        var _props6 = this.props,
	            component = _props6.component,
	            children = _props6.children,
	            formValue = _props6.formValue;


	        var allowedProps = (0, _omit2.default)(this.props, Object.keys(propTypes));
	        var renderableChildren = typeof children === 'function' ? children(formValue) : children;

	        return _react2.default.createElement(component, _extends({}, allowedProps, {
	          onSubmit: this.handleSubmit,
	          onReset: this.handleReset,
	          ref: this.attachNode
	        }), renderableChildren);
	      }
	    }]);

	    return Form;
	  }(_react.Component);

	   true ? Form.propTypes = propTypes : void 0;

	  Form.defaultProps = {
	    validateOn: 'change',
	    component: 'form'
	  };

	  Form.childContextTypes = {
	    model: _react.PropTypes.any,
	    localStore: _react.PropTypes.shape({
	      subscribe: _react.PropTypes.func,
	      dispatch: _react.PropTypes.func,
	      getState: _react.PropTypes.func
	    })
	  };

	  function mapStateToProps(state, _ref) {
	    var model = _ref.model;

	    var modelString = (0, _getModel2.default)(model, state);
	    var form = s.getForm(state, modelString);

	    (0, _invariant2.default)(form, 'Unable to create Form component. ' + 'Could not find form for "%s" in the store.', modelString);

	    return {
	      model: modelString,
	      modelValue: s.get(state, modelString),
	      formValue: form
	    };
	  }

	  return (0, _reactRedux.connect)(mapStateToProps)(Form);
	}

	exports.createFormClass = createFormClass;
	exports.default = createFormClass();

/***/ }),

/***/ 358:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createModelReducerEnhancer = undefined;

	var _modelReducer2 = __webpack_require__(228);

	var _modelReducer3 = _interopRequireDefault(_modelReducer2);

	var _nullAction = __webpack_require__(152);

	var _nullAction2 = _interopRequireDefault(_nullAction);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function createModelReducerEnhancer() {
	  var modelReducerCreator = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _modelReducer3.default;
	  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	  return function modelReducerEnhancer(reducer, model) {
	    var initialState = void 0;
	    try {
	      initialState = reducer(undefined, _nullAction2.default);
	    } catch (error) {
	      initialState = null;
	    }

	    var _modelReducer = modelReducerCreator(model, initialState, options);

	    return function () {
	      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
	      var action = arguments[1];

	      var updatedState = _modelReducer(state, action);

	      return reducer(updatedState, action);
	    };
	  };
	}

	var modelReducerEnhancer = createModelReducerEnhancer(_modelReducer3.default);

	exports.createModelReducerEnhancer = createModelReducerEnhancer;
	exports.default = modelReducerEnhancer;

/***/ }),

/***/ 359:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.track = exports.getModel = exports.getField = exports.form = exports.batched = exports.modeled = exports.createFieldClass = exports.Fieldset = exports.Errors = exports.LocalForm = exports.Form = exports.Control = exports.Field = exports.controls = exports.actionTypes = exports.actions = exports.initialFieldState = exports.createForms = exports.combineForms = exports.modelReducer = exports.formReducer = undefined;

	var _actions = __webpack_require__(115);

	var _actions2 = _interopRequireDefault(_actions);

	var _actionTypes = __webpack_require__(59);

	var _actionTypes2 = _interopRequireDefault(_actionTypes);

	var _fieldComponent = __webpack_require__(784);

	var _fieldComponent2 = _interopRequireDefault(_fieldComponent);

	var _fieldsetComponent = __webpack_require__(785);

	var _fieldsetComponent2 = _interopRequireDefault(_fieldsetComponent);

	var _controlComponent = __webpack_require__(356);

	var _controlComponent2 = _interopRequireDefault(_controlComponent);

	var _formComponent = __webpack_require__(357);

	var _formComponent2 = _interopRequireDefault(_formComponent);

	var _localFormComponent = __webpack_require__(786);

	var _localFormComponent2 = _interopRequireDefault(_localFormComponent);

	var _errorsComponent = __webpack_require__(783);

	var _errorsComponent2 = _interopRequireDefault(_errorsComponent);

	var _controlPropsMap = __webpack_require__(226);

	var _controlPropsMap2 = _interopRequireDefault(_controlPropsMap);

	var _modeledEnhancer = __webpack_require__(358);

	var _modeledEnhancer2 = _interopRequireDefault(_modeledEnhancer);

	var _batchedEnhancer = __webpack_require__(227);

	var _batchedEnhancer2 = _interopRequireDefault(_batchedEnhancer);

	var _formReducer = __webpack_require__(154);

	var _formReducer2 = _interopRequireDefault(_formReducer);

	var _initialFieldState = __webpack_require__(66);

	var _initialFieldState2 = _interopRequireDefault(_initialFieldState);

	var _formsReducer = __webpack_require__(360);

	var _formsReducer2 = _interopRequireDefault(_formsReducer);

	var _modelReducer = __webpack_require__(228);

	var _modelReducer2 = _interopRequireDefault(_modelReducer);

	var _track = __webpack_require__(158);

	var _track2 = _interopRequireDefault(_track);

	var _getFieldFromState = __webpack_require__(116);

	var _getFieldFromState2 = _interopRequireDefault(_getFieldFromState);

	var _get = __webpack_require__(23);

	var _get2 = _interopRequireDefault(_get);

	var _form = __webpack_require__(788);

	var _form2 = _interopRequireDefault(_form);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.formReducer = _formReducer2.default;
	exports.modelReducer = _modelReducer2.default;
	exports.combineForms = _formsReducer2.default;
	exports.createForms = _formsReducer.createForms;
	exports.initialFieldState = _initialFieldState2.default;
	exports.actions = _actions2.default;
	exports.actionTypes = _actionTypes2.default;
	exports.controls = _controlPropsMap2.default;
	exports.Field = _fieldComponent2.default;
	exports.Control = _controlComponent2.default;
	exports.Form = _formComponent2.default;
	exports.LocalForm = _localFormComponent2.default;
	exports.Errors = _errorsComponent2.default;
	exports.Fieldset = _fieldsetComponent2.default;
	exports.createFieldClass = _fieldComponent.createFieldClass;
	exports.modeled = _modeledEnhancer2.default;
	exports.batched = _batchedEnhancer2.default;
	exports.form = _form2.default;
	exports.getField = _getFieldFromState2.default;
	exports.getModel = _get2.default;
	exports.track = _track2.default;

/***/ }),

/***/ 360:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createForms = exports.createFormCombiner = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _modeledEnhancer = __webpack_require__(358);

	var _modeledEnhancer2 = _interopRequireDefault(_modeledEnhancer);

	var _modelReducer = __webpack_require__(228);

	var _modelReducer2 = _interopRequireDefault(_modelReducer);

	var _formReducer = __webpack_require__(154);

	var _formReducer2 = _interopRequireDefault(_formReducer);

	var _redux = __webpack_require__(79);

	var _identity = __webpack_require__(118);

	var _identity2 = _interopRequireDefault(_identity);

	var _nullAction = __webpack_require__(152);

	var _nullAction2 = _interopRequireDefault(_nullAction);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var defaults = {
	  key: 'forms',
	  plugins: []
	};

	function getSubModelString(model, subModel) {
	  if (!model) return subModel;

	  return model + '.' + subModel;
	}

	var defaultStrategy = {
	  modelReducer: _modelReducer2.default,
	  formReducer: _formReducer2.default,
	  modeled: _modeledEnhancer2.default,
	  toJS: _identity2.default
	};

	function createFormCombiner() {
	  var strategy = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultStrategy;

	  function createForms(forms) {
	    var model = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
	    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	    var formKeys = Object.keys(forms);
	    var modelReducers = {};
	    var initialFormState = {};
	    var optionsWithDefaults = _extends({}, defaults, options);
	    var key = optionsWithDefaults.key,
	        plugins = optionsWithDefaults.plugins;


	    formKeys.forEach(function (formKey) {
	      var formValue = forms[formKey];
	      var subModel = getSubModelString(model, formKey);

	      if (typeof formValue === 'function') {
	        var initialState = void 0;
	        try {
	          initialState = formValue(undefined, _nullAction2.default);
	        } catch (error) {
	          initialState = null;
	        }

	        modelReducers[formKey] = strategy.modeled(formValue, subModel);
	        initialFormState[formKey] = initialState;
	      } else {
	        modelReducers[formKey] = strategy.modelReducer(subModel, formValue);
	        initialFormState[formKey] = strategy.toJS(formValue);
	      }
	    });

	    return _extends({}, modelReducers, _defineProperty({}, key, strategy.formReducer(model, initialFormState, { plugins: plugins })));
	  }

	  function combineForms(forms) {
	    var model = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
	    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	    var mappedReducers = createForms(forms, model, options);

	    return (0, _redux.combineReducers)(mappedReducers);
	  }

	  return {
	    createForms: createForms,
	    combineForms: combineForms
	  };
	}

	var _createFormCombiner = createFormCombiner(),
	    defaultCombineForms = _createFormCombiner.combineForms,
	    defaultCreateForms = _createFormCombiner.createForms;

	exports.default = defaultCombineForms;
	exports.createFormCombiner = createFormCombiner;
	exports.createForms = defaultCreateForms;

/***/ }),

/***/ 361:
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = arraysEqual;
	function arraysEqual(firstArray, secondArray) {
	  return firstArray && secondArray && firstArray.length === secondArray.length && firstArray.every(function (item, index) {
	    return item === secondArray[index];
	  });
	}

/***/ }),

/***/ 362:
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = containsEvent;
	function containsEvent(events, event) {
	  if (typeof events === 'string') {
	    return events === event;
	  }

	  return !!~events.indexOf(event);
	}

/***/ }),

/***/ 363:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.compareChildren = compareChildren;
	exports.default = deepCompareChildren;

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _shallowCompare = __webpack_require__(848);

	var _shallowCompare2 = _interopRequireDefault(_shallowCompare);

	var _shallowEqual = __webpack_require__(75);

	var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function compareChildren(props, nextProps) {
	  var children = props.children;
	  var nextChildren = nextProps.children;

	  // If the number of children changed, then children are different.
	  // If there are no children, use shallowCompare in parent function
	  // to determine if component should update (false && true == false)

	  if (_react2.default.Children.count(children) !== _react2.default.Children.count(nextChildren) || !_react2.default.Children.count(children) || !_react2.default.Children.count(nextChildren)) {
	    return true;
	  }

	  var childrenArray = _react2.default.Children.toArray(children);
	  var nextChildrenArray = _react2.default.Children.toArray(nextChildren);

	  // React.Children.toArray strip's `false` children so lengths
	  // can change
	  if (childrenArray.length !== nextChildrenArray.length) {
	    return false;
	  }

	  return [].concat(childrenArray).some(function (child, i) {
	    var nextChild = nextChildrenArray[i];

	    if (!child.props || !nextChild.props) {
	      return !(0, _shallowEqual2.default)(child, nextChild);
	    }

	    /* eslint-disable no-use-before-define */
	    return deepCompareChildren(child, nextChild.props, nextChild.state);
	  });
	}

	function deepCompareChildren(instance, nextProps, nextState) {
	  if (!instance.props.children) return (0, _shallowCompare2.default)(instance, nextProps, nextState);

	  return (0, _shallowCompare2.default)(instance, nextProps, nextState) || compareChildren(instance.props, nextProps);
	}

/***/ }),

/***/ 364:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = invertValidity;

	var _isPlainObject = __webpack_require__(32);

	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

	var _mapValues = __webpack_require__(45);

	var _mapValues2 = _interopRequireDefault(_mapValues);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function invertValidity(validity) {
	  if ((0, _isPlainObject2.default)(validity)) {
	    return (0, _mapValues2.default)(validity, invertValidity);
	  }

	  return !validity;
	}

/***/ }),

/***/ 365:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isMulti;

	var _endsWith = __webpack_require__(229);

	var _endsWith2 = _interopRequireDefault(_endsWith);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function isMulti(model) {
	  return (0, _endsWith2.default)(model, '[]');
	}

/***/ }),

/***/ 366:
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var isReactNative = typeof window !== 'undefined' && window.navigator && window.navigator.product && window.navigator.product === 'ReactNative';

	exports.default = isReactNative;

/***/ }),

/***/ 367:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isValidityValid;

	var _isPlainObject = __webpack_require__(32);

	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function isValidityValid(validity) {
	  if ((0, _isPlainObject2.default)(validity)) {
	    return Object.keys(validity).every(function (key) {
	      return isValidityValid(validity[key]);
	    });
	  }

	  return !!validity;
	}

/***/ }),

/***/ 368:
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = map;
	function map(values, iteratee) {
	  if (Array.isArray(values)) {
	    return values.map(iteratee);
	  }

	  var result = Object.keys(values).map(function (key) {
	    return iteratee(values[key], key, values);
	  });

	  return result;
	}

/***/ }),

/***/ 369:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = updateParentForms;

	var _icepick = __webpack_require__(52);

	var _icepick2 = _interopRequireDefault(_icepick);

	var _get = __webpack_require__(23);

	var _get2 = _interopRequireDefault(_get);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function updateParentForms(state, localPath, updater) {
	  var parentLocalPath = localPath.slice(0, -1);

	  var value = parentLocalPath.length ? (0, _get2.default)(state, parentLocalPath) : state;

	  if (!value) return state;

	  var form = value.$form;

	  var updatedValue = typeof updater === 'function' ? updater(value) : updater;

	  var newState = _icepick2.default.setIn(state, [].concat(_toConsumableArray(parentLocalPath), ['$form']), _icepick2.default.merge(form, updatedValue));

	  if (!parentLocalPath.length) return newState;

	  return updateParentForms(newState, parentLocalPath, updater);
	}

/***/ }),

/***/ 390:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _classCallCheck2 = __webpack_require__(2);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(4);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(3);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactBootstrap = __webpack_require__(108);

	var _reactReduxForm = __webpack_require__(359);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var MSFormInput = function (_React$Component) {
	  (0, _inherits3.default)(MSFormInput, _React$Component);

	  function MSFormInput() {
	    (0, _classCallCheck3.default)(this, MSFormInput);
	    return (0, _possibleConstructorReturn3.default)(this, _React$Component.apply(this, arguments));
	  }

	  MSFormInput.prototype.getFormControlWidth = function getFormControlWidth() {
	    return 12 - this.getLabelWidth();
	  };

	  MSFormInput.prototype.getLabelWidth = function getLabelWidth() {
	    return this.props.labelWidth ? this.props.labelWidth : 2;
	  };

	  MSFormInput.prototype.showErrors = function showErrors(field) {
	    return field.touched && !field.focus;
	  };

	  MSFormInput.prototype.render = function render() {
	    // please use '<input>' instead of 'FormControl', react-redux-form problem
	    return _react2.default.createElement(
	      _reactBootstrap.FormGroup,
	      null,
	      _react2.default.createElement(
	        _reactBootstrap.Col,
	        { sm: this.getLabelWidth() },
	        _react2.default.createElement(
	          _reactBootstrap.ControlLabel,
	          null,
	          this.props.children
	        )
	      ),
	      _react2.default.createElement(
	        _reactBootstrap.Col,
	        { sm: this.getFormControlWidth() },
	        _react2.default.createElement(
	          _reactReduxForm.Field,
	          { model: this.props.model },
	          _react2.default.createElement('input', {
	            id: this.props.id,
	            className: 'form-control',
	            type: this.props.type ? this.props.type : 'text',
	            autoFocus: this.props.autoFocus })
	        ),
	        _react2.default.createElement(
	          'small',
	          { id: this.props.id ? this.props.id + 'Errors' : null },
	          _react2.default.createElement(_reactReduxForm.Errors, { model: this.props.model, messages: this.props.messages, show: this.showErrors }),
	          this.props.extraModel ? _react2.default.createElement(_reactReduxForm.Errors, { model: this.props.extraModel, messages: this.props.messages, show: this.showErrors }) : null
	        )
	      )
	    );
	  };

	  return MSFormInput;
	}(_react2.default.Component);

	exports.default = MSFormInput;

/***/ }),

/***/ 392:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.MyModal = undefined;

	var _classCallCheck2 = __webpack_require__(2);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(4);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(3);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(41);

	var _reactReduxForm = __webpack_require__(359);

	var _MSFormInput = __webpack_require__(390);

	var _MSFormInput2 = _interopRequireDefault(_MSFormInput);

	var _CommonUtil = __webpack_require__(96);

	var _reactBootstrap = __webpack_require__(108);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var MyModal = exports.MyModal = function (_React$Component) {
	  (0, _inherits3.default)(MyModal, _React$Component);

	  function MyModal(props) {
	    (0, _classCallCheck3.default)(this, MyModal);

	    var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call(this, props));

	    _this.close = _this.close.bind(_this);
	    _this.save = _this.save.bind(_this);
	    _this.formValidators = {
	      username: { required: _CommonUtil.validatorRequired, alphaNumeric: _CommonUtil.validatorAlphaNumeric },
	      password: { required: _CommonUtil.validatorRequired }
	    };
	    _this.state = {
	      username: '',
	      password: '',
	      resultMessage: null
	    };
	    return _this;
	  }

	  MyModal.prototype.close = function close() {
	    this.props.close();
	  };

	  MyModal.prototype.save = function save(values) {
	    var self = this;
	    console.log('MyModal.js: MyModal.save called => ', 'values=', values);
	    this.props.loginNow(values).then(function (token) {
	      console.log('MyModal.js: MyModal.save called => ', 'token=', token);
	      if (!token) {
	        self.setState({
	          resultMessage: 'Token is null. User name should be either `user1` or `user2`!'
	        });
	      } else {
	        self.props.showNotificationMessage('Operation is successful! Got token: ' + token);
	        self.close();
	      }
	    });
	  };

	  MyModal.prototype.render = function render() {
	    return _react2.default.createElement(
	      _reactBootstrap.Modal,
	      { show: this.props.showMyModal, onHide: this.close },
	      _react2.default.createElement(
	        _reactReduxForm.LocalForm,
	        {
	          model: 'user',
	          validators: this.formValidators,
	          onSubmit: this.save,
	          className: 'form-horizontal'
	        },
	        _react2.default.createElement(
	          _reactBootstrap.Modal.Header,
	          { closeButton: true },
	          _react2.default.createElement(
	            _reactBootstrap.Modal.Title,
	            null,
	            'Login'
	          )
	        ),
	        _react2.default.createElement(
	          _reactBootstrap.Modal.Body,
	          null,
	          _react2.default.createElement(
	            _MSFormInput2.default,
	            {
	              type: 'text',
	              labelWidth: 5,
	              messages: { required: 'Required', alphaNumeric: 'User name should be alphanumeric' },
	              model: '.username',
	              autoFocus: true },
	            'User name *'
	          ),
	          _react2.default.createElement(
	            _MSFormInput2.default,
	            {
	              type: 'password',
	              labelWidth: 5,
	              messages: { required: 'Required' },
	              model: '.password' },
	            'Password *'
	          ),
	          this.state.resultMessage ? _react2.default.createElement(
	            'div',
	            { style: { color: 'red' } },
	            this.state.resultMessage
	          ) : null
	        ),
	        _react2.default.createElement(
	          _reactBootstrap.Modal.Footer,
	          null,
	          _react2.default.createElement(
	            _reactBootstrap.Button,
	            { type: 'submit' },
	            'OK'
	          ),
	          _react2.default.createElement(
	            _reactBootstrap.Button,
	            { onClick: this.close },
	            'Cancel'
	          )
	        )
	      )
	    );
	  };

	  return MyModal;
	}(_react2.default.Component);

	// latest way to use react-router 2.x


	MyModal.contextTypes = {
	  // @see https://github.com/grommet/grommet/issues/441
	  router: _react2.default.PropTypes.object.isRequired
	};

	function mapDispatchToProps(dispatch) {
	  return {
	    loginNow: function loginNow(values) {
	      console.log('MyModal.js: ?.loginNow called => ', 'values=', values);
	      return (0, _CommonUtil.postJSON)((0, _CommonUtil.getRoutePath)('api/test'), {
	        username: values.username,
	        password: values.password
	      }).then(function (resp) {
	        return resp && resp.token ? resp.token : null;
	      }, function (err) {
	        return null;
	      });
	    },
	    showNotificationMessage: function showNotificationMessage(msg) {
	      return dispatch({
	        type: 'EVT_SHOW_NOTIFICATION',
	        showNotification: true,
	        notificationMessage: msg
	      });
	    },
	    close: function close() {
	      return dispatch({
	        type: 'EVT_SHOW_MY_MODAL',
	        showMyModal: false
	      });
	    }
	  };
	}
	exports.default = (0, _reactRedux.connect)(function (storeState) {
	  // store state to props
	  return {
	    showMyModal: storeState.app.showMyModal
	  };
	}, mapDispatchToProps)(MyModal);

/***/ }),

/***/ 393:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _assign = __webpack_require__(163);

	var _assign2 = _interopRequireDefault(_assign);

	var _CommonUtil = __webpack_require__(96);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var rows = [{ id: 105, name: 'b', family: 'abc', score: 8 }, { id: 102, name: 'g', family: 'def', score: 12 }, { id: 103, name: 'c', family: 'tom', score: 55 }, { id: 104, name: 'x', family: 'sam', score: 100 }, { id: 101, name: 'b1', family: 'tim', score: 55 }, { id: 99, name: 'a', family: 'david', score: 12 }];

	var defaultSortOrder = { name: 0, family: 0, id: 0, score: 0 };

	function reducer() {
	    var _Object$assign2, _Object$assign3, _Object$assign4;

	    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    var action = arguments[1];
	    var prop = action.prop,
	        newDirection = action.newDirection;

	    var sortColumn = void 0,
	        sortDirections = void 0,
	        rows2 = void 0,
	        index = void 0;
	    switch (action.type) {

	        case 'RESET_COLUMN':

	            index = state.sortColumn.findIndex(function (a) {
	                return a.prop === prop;
	            });
	            sortColumn = state.sortColumn.slice();
	            if (index > -1) {
	                sortColumn.splice(index, 1);
	            }
	            sortDirections = (0, _assign2.default)({}, state.sortDirections, (_Object$assign2 = {}, _Object$assign2[prop] = 0, _Object$assign2));
	            rows2 = rows.slice();
	            rows2.sort((0, _CommonUtil.multiFieldComparator)(sortColumn));
	            return { rows: rows2, sortColumn: sortColumn, sortDirections: sortDirections };

	        case 'SET_NEW_DIRECTION':

	            sortColumn = [{ prop: prop, direction: newDirection }];
	            sortDirections = (0, _assign2.default)({}, defaultSortOrder, (_Object$assign3 = {}, _Object$assign3[prop] = newDirection, _Object$assign3));

	            rows2 = rows.slice();
	            rows2.sort((0, _CommonUtil.multiFieldComparator)(sortColumn));
	            return { rows: rows2, sortDirections: sortDirections, sortColumn: sortColumn };

	        case 'ADD_NEW_DIRECTION':

	            sortColumn = state.sortColumn.slice();
	            //if pressing alt on already pressed column , then ignore
	            index = sortColumn.findIndex(function (a) {
	                return a.prop === prop;
	            });
	            if (index > -1) {
	                sortColumn[index] = { prop: prop, direction: newDirection };
	            } else {
	                sortColumn.push({ prop: prop, direction: newDirection });
	            }
	            sortDirections = (0, _assign2.default)({}, state.sortDirections, (_Object$assign4 = {}, _Object$assign4[prop] = newDirection, _Object$assign4));
	            rows2 = state.rows.slice();
	            rows2.sort((0, _CommonUtil.multiFieldComparator)(sortColumn));
	            return { rows: rows2, sortDirections: sortDirections, sortColumn: sortColumn };

	        case 'RESET':
	            break;
	    }

	    return { rows: rows.slice(), sortDirections: (0, _assign2.default)({}, defaultSortOrder), sortColumn: [] };
	}

	exports.default = reducer;

/***/ }),

/***/ 394:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _classCallCheck2 = __webpack_require__(2);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(4);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(3);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(41);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var SortingHeader = function (_React$Component) {
	  (0, _inherits3.default)(SortingHeader, _React$Component);

	  function SortingHeader() {
	    (0, _classCallCheck3.default)(this, SortingHeader);
	    return (0, _possibleConstructorReturn3.default)(this, _React$Component.apply(this, arguments));
	  }

	  SortingHeader.prototype.render = function render() {
	    var _this2 = this;

	    var ulStyle = { listStyle: 'none', display: 'inline', paddingLeft: 0 };
	    var arrows = void 0;
	    if (!this.props.direction) {
	      arrows = _react2.default.createElement(
	        'ul',
	        { style: ulStyle },
	        _react2.default.createElement(
	          'li',
	          null,
	          '\u25B5'
	        ),
	        _react2.default.createElement(
	          'li',
	          null,
	          '\u25BF'
	        )
	      );
	    } else if (this.props.direction > 0) {
	      arrows = _react2.default.createElement(
	        'ul',
	        { style: ulStyle },
	        _react2.default.createElement(
	          'li',
	          null,
	          '\u25B4'
	        ),
	        _react2.default.createElement(
	          'li',
	          null,
	          '\u25BF'
	        )
	      );
	    } else {
	      arrows = _react2.default.createElement(
	        'ul',
	        { style: ulStyle },
	        _react2.default.createElement(
	          'li',
	          null,
	          '\u25B5'
	        ),
	        _react2.default.createElement(
	          'li',
	          null,
	          '\u25BE'
	        )
	      );
	    }

	    return _react2.default.createElement(
	      'th',
	      { style: { 'width': '70px', verticalAlign: 'top', height: '10px', border: '1px solid black' },
	        onClick: function onClick(event) {
	          _this2.props.sortRow(_this2.props.prop, event.ctrlKey);
	        } },
	      _react2.default.createElement(
	        'span',
	        null,
	        this.props.label
	      ),
	      arrows
	    );
	  };

	  return SortingHeader;
	}(_react2.default.Component);

	function mapStateToProps(state) {
	  return state;
	}

	function mapDispatchToProps(dispatch) {

	  function sortRow(prop, ctrlPressed) {

	    var newDirection = 0;

	    if (newDirection === 0) {
	      if (ctrlPressed) {
	        dispatch({ type: 'RESET_COLUMN', prop: prop, newDirection: newDirection });
	      } else {
	        dispatch({ type: 'RESET', prop: prop, newDirection: newDirection });
	      }
	    } else {
	      if (ctrlPressed) {
	        dispatch({ type: 'ADD_NEW_DIRECTION', prop: prop, newDirection: newDirection });
	      } else {
	        dispatch({ type: 'SET_NEW_DIRECTION', prop: prop, newDirection: newDirection });
	      }
	    }
	  }

	  return { sortRow: sortRow };
	}

	var SortingTableOrig = function (_React$Component2) {
	  (0, _inherits3.default)(SortingTableOrig, _React$Component2);

	  function SortingTableOrig() {
	    (0, _classCallCheck3.default)(this, SortingTableOrig);
	    return (0, _possibleConstructorReturn3.default)(this, _React$Component2.apply(this, arguments));
	  }

	  SortingTableOrig.prototype.render = function render() {
	    return _react2.default.createElement(
	      'table',
	      { cellPadding: '10' },
	      _react2.default.createElement(
	        'thead',
	        null,
	        _react2.default.createElement(
	          'tr',
	          null,
	          _react2.default.createElement(SortingHeader, { label: 'ID', prop: 'id', sortRow: this.sortRow.bind(this), direction: this.state.sortDirections['id'] }),
	          _react2.default.createElement(SortingHeader, { label: 'Name', prop: 'name', sortRow: this.sortRow.bind(this), direction: this.state.sortDirections['name'] }),
	          _react2.default.createElement(SortingHeader, { label: 'Family', prop: 'family', sortRow: this.sortRow.bind(this), direction: this.state.sortDirections['family'] }),
	          _react2.default.createElement(SortingHeader, { label: 'Score', prop: 'score', sortRow: this.sortRow.bind(this), direction: this.state.sortDirections['score'] })
	        )
	      ),
	      _react2.default.createElement(
	        'tbody',
	        null,
	        this.state.rows.map(function (r) {
	          return _react2.default.createElement(
	            'tr',
	            { key: r.id },
	            _react2.default.createElement(
	              'td',
	              null,
	              r.id
	            ),
	            _react2.default.createElement(
	              'td',
	              null,
	              r.name
	            ),
	            _react2.default.createElement(
	              'td',
	              null,
	              r.family
	            ),
	            _react2.default.createElement(
	              'td',
	              null,
	              r.score
	            )
	          );
	        })
	      )
	    );
	  };

	  return SortingTableOrig;
	}(_react2.default.Component);

	var SortingTable = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(SortingTableOrig);
	exports.default = SortingTable;

/***/ }),

/***/ 395:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.Sample = undefined;

	var _classCallCheck2 = __webpack_require__(2);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(4);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(3);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(41);

	var _reactBootstrap = __webpack_require__(108);

	var _CommonUtil = __webpack_require__(96);

	var _SortingTable = __webpack_require__(394);

	var _SortingTable2 = _interopRequireDefault(_SortingTable);

	var _MyModal = __webpack_require__(392);

	var _MyModal2 = _interopRequireDefault(_MyModal);

	var _MyReducer = __webpack_require__(393);

	var _MyReducer2 = _interopRequireDefault(_MyReducer);

	var _redux = __webpack_require__(79);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var store = (0, _redux.createStore)(_MyReducer2.default);

	var Sample = exports.Sample = function (_React$Component) {
	  (0, _inherits3.default)(Sample, _React$Component);

	  function Sample(props) {
	    (0, _classCallCheck3.default)(this, Sample);

	    var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call(this, props));

	    _this.state = {};
	    return _this;
	  }

	  Sample.prototype.showMyModal = function showMyModal() {
	    console.log('showMyModal called');
	    this.props.showMyModal();
	  };

	  Sample.prototype.render = function render() {
	    var _this2 = this;

	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(
	        'h1',
	        null,
	        'Components samples'
	      ),
	      _react2.default.createElement(
	        _reactBootstrap.ButtonGroup,
	        null,
	        _react2.default.createElement(
	          _reactBootstrap.Button,
	          { onClick: function onClick() {
	              return _this2.context.router.push((0, _CommonUtil.getRoutePath)());
	            } },
	          'Goto Dashboard'
	        )
	      ),
	      _react2.default.createElement(
	        'h2',
	        null,
	        'Modal, Button toolbar:'
	      ),
	      _react2.default.createElement(
	        _reactBootstrap.ButtonToolbar,
	        null,
	        _react2.default.createElement(
	          _reactBootstrap.ButtonGroup,
	          null,
	          _react2.default.createElement(
	            _reactBootstrap.Button,
	            { onClick: this.showMyModal.bind(this) },
	            'Show my modal'
	          )
	        )
	      ),
	      _react2.default.createElement(
	        'h2',
	        null,
	        'Table:'
	      ),
	      _react2.default.createElement(
	        'div',
	        { className: 'container-fluid' },
	        _react2.default.createElement(
	          'div',
	          { className: 'row' },
	          _react2.default.createElement(
	            'div',
	            { className: 'col-xs-12' },
	            _react2.default.createElement(
	              _reactRedux.Provider,
	              { store: store },
	              _react2.default.createElement(_SortingTable2.default, null)
	            )
	          )
	        )
	      ),
	      _react2.default.createElement(_MyModal2.default, null)
	    );
	  };

	  return Sample;
	}(_react2.default.Component);

	// latest way to dispatch


	Sample.contextTypes = {
	  // @see https://github.com/grommet/grommet/issues/441
	  router: _react2.default.PropTypes.object.isRequired
	};

	function mapDispatchToProps(dispatch) {
	  return {
	    showMyModal: function showMyModal() {
	      return dispatch({
	        type: 'EVT_SHOW_MY_MODAL',
	        showMyModal: true
	      });
	    }
	  };
	}

	exports.default = (0, _reactRedux.connect)(function (storeState) {
	  // store state to props
	  return {};
	}, mapDispatchToProps)(Sample);

/***/ }),

/***/ 612:
/***/ (function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * lodash (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
	 * Released under MIT license <https://lodash.com/license>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 */

	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;

	/** `Object#toString` result references. */
	var funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    symbolTag = '[object Symbol]';

	/** Used to match property names within property paths. */
	var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
	    reIsPlainProp = /^\w*$/,
	    reLeadingDot = /^\./,
	    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

	/**
	 * Used to match `RegExp`
	 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
	 */
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

	/** Used to match backslashes in property paths. */
	var reEscapeChar = /\\(\\)?/g;

	/** Used to detect host constructors (Safari). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();

	/**
	 * Gets the value at `key` of `object`.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {string} key The key of the property to get.
	 * @returns {*} Returns the property value.
	 */
	function getValue(object, key) {
	  return object == null ? undefined : object[key];
	}

	/**
	 * Checks if `value` is a host object in IE < 9.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
	 */
	function isHostObject(value) {
	  // Many host objects are `Object` objects that can coerce to strings
	  // despite having improperly defined `toString` methods.
	  var result = false;
	  if (value != null && typeof value.toString != 'function') {
	    try {
	      result = !!(value + '');
	    } catch (e) {}
	  }
	  return result;
	}

	/** Used for built-in method references. */
	var arrayProto = Array.prototype,
	    funcProto = Function.prototype,
	    objectProto = Object.prototype;

	/** Used to detect overreaching core-js shims. */
	var coreJsData = root['__core-js_shared__'];

	/** Used to detect methods masquerading as native. */
	var maskSrcKey = (function() {
	  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
	  return uid ? ('Symbol(src)_1.' + uid) : '';
	}());

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);

	/** Built-in value references. */
	var Symbol = root.Symbol,
	    splice = arrayProto.splice;

	/* Built-in method references that are verified to be native. */
	var Map = getNative(root, 'Map'),
	    nativeCreate = getNative(Object, 'create');

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolToString = symbolProto ? symbolProto.toString : undefined;

	/**
	 * Creates a hash object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Hash(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	/**
	 * Removes all key-value entries from the hash.
	 *
	 * @private
	 * @name clear
	 * @memberOf Hash
	 */
	function hashClear() {
	  this.__data__ = nativeCreate ? nativeCreate(null) : {};
	}

	/**
	 * Removes `key` and its value from the hash.
	 *
	 * @private
	 * @name delete
	 * @memberOf Hash
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function hashDelete(key) {
	  return this.has(key) && delete this.__data__[key];
	}

	/**
	 * Gets the hash value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Hash
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function hashGet(key) {
	  var data = this.__data__;
	  if (nativeCreate) {
	    var result = data[key];
	    return result === HASH_UNDEFINED ? undefined : result;
	  }
	  return hasOwnProperty.call(data, key) ? data[key] : undefined;
	}

	/**
	 * Checks if a hash value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Hash
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function hashHas(key) {
	  var data = this.__data__;
	  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
	}

	/**
	 * Sets the hash `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Hash
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the hash instance.
	 */
	function hashSet(key, value) {
	  var data = this.__data__;
	  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
	  return this;
	}

	// Add methods to `Hash`.
	Hash.prototype.clear = hashClear;
	Hash.prototype['delete'] = hashDelete;
	Hash.prototype.get = hashGet;
	Hash.prototype.has = hashHas;
	Hash.prototype.set = hashSet;

	/**
	 * Creates an list cache object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function ListCache(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	/**
	 * Removes all key-value entries from the list cache.
	 *
	 * @private
	 * @name clear
	 * @memberOf ListCache
	 */
	function listCacheClear() {
	  this.__data__ = [];
	}

	/**
	 * Removes `key` and its value from the list cache.
	 *
	 * @private
	 * @name delete
	 * @memberOf ListCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function listCacheDelete(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  if (index < 0) {
	    return false;
	  }
	  var lastIndex = data.length - 1;
	  if (index == lastIndex) {
	    data.pop();
	  } else {
	    splice.call(data, index, 1);
	  }
	  return true;
	}

	/**
	 * Gets the list cache value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf ListCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function listCacheGet(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  return index < 0 ? undefined : data[index][1];
	}

	/**
	 * Checks if a list cache value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf ListCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function listCacheHas(key) {
	  return assocIndexOf(this.__data__, key) > -1;
	}

	/**
	 * Sets the list cache `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf ListCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the list cache instance.
	 */
	function listCacheSet(key, value) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  if (index < 0) {
	    data.push([key, value]);
	  } else {
	    data[index][1] = value;
	  }
	  return this;
	}

	// Add methods to `ListCache`.
	ListCache.prototype.clear = listCacheClear;
	ListCache.prototype['delete'] = listCacheDelete;
	ListCache.prototype.get = listCacheGet;
	ListCache.prototype.has = listCacheHas;
	ListCache.prototype.set = listCacheSet;

	/**
	 * Creates a map cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function MapCache(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	/**
	 * Removes all key-value entries from the map.
	 *
	 * @private
	 * @name clear
	 * @memberOf MapCache
	 */
	function mapCacheClear() {
	  this.__data__ = {
	    'hash': new Hash,
	    'map': new (Map || ListCache),
	    'string': new Hash
	  };
	}

	/**
	 * Removes `key` and its value from the map.
	 *
	 * @private
	 * @name delete
	 * @memberOf MapCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function mapCacheDelete(key) {
	  return getMapData(this, key)['delete'](key);
	}

	/**
	 * Gets the map value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf MapCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function mapCacheGet(key) {
	  return getMapData(this, key).get(key);
	}

	/**
	 * Checks if a map value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf MapCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function mapCacheHas(key) {
	  return getMapData(this, key).has(key);
	}

	/**
	 * Sets the map `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf MapCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the map cache instance.
	 */
	function mapCacheSet(key, value) {
	  getMapData(this, key).set(key, value);
	  return this;
	}

	// Add methods to `MapCache`.
	MapCache.prototype.clear = mapCacheClear;
	MapCache.prototype['delete'] = mapCacheDelete;
	MapCache.prototype.get = mapCacheGet;
	MapCache.prototype.has = mapCacheHas;
	MapCache.prototype.set = mapCacheSet;

	/**
	 * Gets the index at which the `key` is found in `array` of key-value pairs.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} key The key to search for.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function assocIndexOf(array, key) {
	  var length = array.length;
	  while (length--) {
	    if (eq(array[length][0], key)) {
	      return length;
	    }
	  }
	  return -1;
	}

	/**
	 * The base implementation of `_.get` without support for default values.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @returns {*} Returns the resolved value.
	 */
	function baseGet(object, path) {
	  path = isKey(path, object) ? [path] : castPath(path);

	  var index = 0,
	      length = path.length;

	  while (object != null && index < length) {
	    object = object[toKey(path[index++])];
	  }
	  return (index && index == length) ? object : undefined;
	}

	/**
	 * The base implementation of `_.isNative` without bad shim checks.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function,
	 *  else `false`.
	 */
	function baseIsNative(value) {
	  if (!isObject(value) || isMasked(value)) {
	    return false;
	  }
	  var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
	  return pattern.test(toSource(value));
	}

	/**
	 * The base implementation of `_.toString` which doesn't convert nullish
	 * values to empty strings.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 */
	function baseToString(value) {
	  // Exit early for strings to avoid a performance hit in some environments.
	  if (typeof value == 'string') {
	    return value;
	  }
	  if (isSymbol(value)) {
	    return symbolToString ? symbolToString.call(value) : '';
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}

	/**
	 * Casts `value` to a path array if it's not one.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @returns {Array} Returns the cast property path array.
	 */
	function castPath(value) {
	  return isArray(value) ? value : stringToPath(value);
	}

	/**
	 * Gets the data for `map`.
	 *
	 * @private
	 * @param {Object} map The map to query.
	 * @param {string} key The reference key.
	 * @returns {*} Returns the map data.
	 */
	function getMapData(map, key) {
	  var data = map.__data__;
	  return isKeyable(key)
	    ? data[typeof key == 'string' ? 'string' : 'hash']
	    : data.map;
	}

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = getValue(object, key);
	  return baseIsNative(value) ? value : undefined;
	}

	/**
	 * Checks if `value` is a property name and not a property path.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {Object} [object] The object to query keys on.
	 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
	 */
	function isKey(value, object) {
	  if (isArray(value)) {
	    return false;
	  }
	  var type = typeof value;
	  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
	      value == null || isSymbol(value)) {
	    return true;
	  }
	  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
	    (object != null && value in Object(object));
	}

	/**
	 * Checks if `value` is suitable for use as unique object key.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	 */
	function isKeyable(value) {
	  var type = typeof value;
	  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
	    ? (value !== '__proto__')
	    : (value === null);
	}

	/**
	 * Checks if `func` has its source masked.
	 *
	 * @private
	 * @param {Function} func The function to check.
	 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
	 */
	function isMasked(func) {
	  return !!maskSrcKey && (maskSrcKey in func);
	}

	/**
	 * Converts `string` to a property path array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the property path array.
	 */
	var stringToPath = memoize(function(string) {
	  string = toString(string);

	  var result = [];
	  if (reLeadingDot.test(string)) {
	    result.push('');
	  }
	  string.replace(rePropName, function(match, number, quote, string) {
	    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
	  });
	  return result;
	});

	/**
	 * Converts `value` to a string key if it's not a string or symbol.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @returns {string|symbol} Returns the key.
	 */
	function toKey(value) {
	  if (typeof value == 'string' || isSymbol(value)) {
	    return value;
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}

	/**
	 * Converts `func` to its source code.
	 *
	 * @private
	 * @param {Function} func The function to process.
	 * @returns {string} Returns the source code.
	 */
	function toSource(func) {
	  if (func != null) {
	    try {
	      return funcToString.call(func);
	    } catch (e) {}
	    try {
	      return (func + '');
	    } catch (e) {}
	  }
	  return '';
	}

	/**
	 * Creates a function that memoizes the result of `func`. If `resolver` is
	 * provided, it determines the cache key for storing the result based on the
	 * arguments provided to the memoized function. By default, the first argument
	 * provided to the memoized function is used as the map cache key. The `func`
	 * is invoked with the `this` binding of the memoized function.
	 *
	 * **Note:** The cache is exposed as the `cache` property on the memoized
	 * function. Its creation may be customized by replacing the `_.memoize.Cache`
	 * constructor with one whose instances implement the
	 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
	 * method interface of `delete`, `get`, `has`, and `set`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to have its output memoized.
	 * @param {Function} [resolver] The function to resolve the cache key.
	 * @returns {Function} Returns the new memoized function.
	 * @example
	 *
	 * var object = { 'a': 1, 'b': 2 };
	 * var other = { 'c': 3, 'd': 4 };
	 *
	 * var values = _.memoize(_.values);
	 * values(object);
	 * // => [1, 2]
	 *
	 * values(other);
	 * // => [3, 4]
	 *
	 * object.a = 2;
	 * values(object);
	 * // => [1, 2]
	 *
	 * // Modify the result cache.
	 * values.cache.set(object, ['a', 'b']);
	 * values(object);
	 * // => ['a', 'b']
	 *
	 * // Replace `_.memoize.Cache`.
	 * _.memoize.Cache = WeakMap;
	 */
	function memoize(func, resolver) {
	  if (typeof func != 'function' || (resolver && typeof resolver != 'function')) {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  var memoized = function() {
	    var args = arguments,
	        key = resolver ? resolver.apply(this, args) : args[0],
	        cache = memoized.cache;

	    if (cache.has(key)) {
	      return cache.get(key);
	    }
	    var result = func.apply(this, args);
	    memoized.cache = cache.set(key, result);
	    return result;
	  };
	  memoized.cache = new (memoize.Cache || MapCache);
	  return memoized;
	}

	// Assign cache to `_.memoize`.
	memoize.Cache = MapCache;

	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 * var other = { 'a': 1 };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || (value !== value && other !== other);
	}

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8-9 which returns 'object' for typed array and other constructors.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && objectToString.call(value) == symbolTag);
	}

	/**
	 * Converts `value` to a string. An empty string is returned for `null`
	 * and `undefined` values. The sign of `-0` is preserved.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 * @example
	 *
	 * _.toString(null);
	 * // => ''
	 *
	 * _.toString(-0);
	 * // => '-0'
	 *
	 * _.toString([1, 2, 3]);
	 * // => '1,2,3'
	 */
	function toString(value) {
	  return value == null ? '' : baseToString(value);
	}

	/**
	 * Gets the value at `path` of `object`. If the resolved value is
	 * `undefined`, the `defaultValue` is returned in its place.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.7.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
	 * @returns {*} Returns the resolved value.
	 * @example
	 *
	 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
	 *
	 * _.get(object, 'a[0].b.c');
	 * // => 3
	 *
	 * _.get(object, ['a', '0', 'b', 'c']);
	 * // => 3
	 *
	 * _.get(object, 'a.b.c', 'default');
	 * // => 'default'
	 */
	function get(object, path, defaultValue) {
	  var result = object == null ? undefined : baseGet(object, path);
	  return result === undefined ? defaultValue : result;
	}

	module.exports = get;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),

/***/ 782:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.createModelActions = createModelActions;

	var _get2 = __webpack_require__(23);

	var _get3 = _interopRequireDefault(_get2);

	var _identity = __webpack_require__(118);

	var _identity2 = _interopRequireDefault(_identity);

	var _icepick = __webpack_require__(52);

	var _icepick2 = _interopRequireDefault(_icepick);

	var _getValue = __webpack_require__(231);

	var _getValue2 = _interopRequireDefault(_getValue);

	var _isMulti = __webpack_require__(365);

	var _isMulti2 = _interopRequireDefault(_isMulti);

	var _actionTypes = __webpack_require__(59);

	var _actionTypes2 = _interopRequireDefault(_actionTypes);

	var _mapValues = __webpack_require__(45);

	var _mapValues2 = _interopRequireDefault(_mapValues);

	var _track = __webpack_require__(158);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var defaultStrategies = {
	  get: _get3.default,
	  getValue: _getValue2.default,
	  splice: _icepick2.default.splice,
	  merge: _icepick2.default.merge,
	  remove: _icepick2.default.dissoc,
	  push: _icepick2.default.push,
	  length: function length(value) {
	    return value.length;
	  },
	  object: {},
	  array: []
	};

	function optionsFromArgs(args, index) {
	  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	  if (typeof index === 'undefined') return undefined;

	  return _extends({}, options, args[index]);
	}

	function createModelActions() {
	  var s = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultStrategies;

	  var change = function change(model, value) {
	    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	    // option defaults
	    var changeOptions = _extends({
	      silent: false,
	      multi: (0, _isMulti2.default)(model)
	    }, options);

	    return _extends({
	      type: _actionTypes2.default.CHANGE,
	      model: model,
	      value: s.getValue(value)
	    }, changeOptions);
	  };

	  function createModifierAction(modifier, defaultValue, optionsIndex, getOptions) {
	    var actionCreator = function actionCreator(model) {
	      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	      }

	      return function (dispatch, getState) {
	        var modelValue = s.get(getState(), model, defaultValue);
	        var value = modifier.apply(undefined, [modelValue].concat(args));

	        var options = getOptions ? getOptions.apply(undefined, [value].concat(args)) : undefined;

	        dispatch(change(model, value, optionsFromArgs(args, optionsIndex - 1, options)));
	      };
	    };

	    actionCreator.withValue = function (model) {
	      for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	        args[_key2 - 1] = arguments[_key2];
	      }

	      return function (value) {
	        var options = getOptions ? getOptions.apply(undefined, [value].concat(args)) : undefined;

	        change(model, modifier.apply(undefined, [value].concat(args)), optionsFromArgs(args, optionsIndex - 1, options));
	      };
	    };

	    return actionCreator;
	  }

	  var xor = createModifierAction(function (value, item) {
	    var iteratee = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (_item) {
	      return _item === item;
	    };

	    var valueWithoutItem = value.filter(function (_item) {
	      return !iteratee(_item);
	    });

	    return s.length(value) === s.length(valueWithoutItem) ? [].concat(_toConsumableArray(value), [item]) : valueWithoutItem;
	  }, s.array, 3);

	  var push = createModifierAction(function (value, item) {
	    return s.push(value || s.array, item);
	  }, s.array, 2);

	  var toggle = createModifierAction(function (value) {
	    return !value;
	  }, undefined, 1);

	  var checkWithValue = function checkWithValue(model, value) {
	    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	    var currentValue = options.currentValue;


	    if ((0, _isMulti2.default)(model)) {
	      var valueWithItem = currentValue || s.array;
	      var valueWithoutItem = (valueWithItem || s.array).filter(function (item) {
	        return item !== value;
	      });
	      var multiValue = s.length(valueWithoutItem) === s.length(valueWithItem) ? s.push(valueWithItem, value) : valueWithoutItem;

	      return change(model, multiValue);
	    }

	    return change(model, !currentValue);
	  };

	  var check = function check(model, value) {
	    return function (dispatch, getState) {
	      var modelValue = s.get(getState(), model);

	      var action = checkWithValue(model, value, {
	        currentValue: modelValue
	      });

	      dispatch(action);
	    };
	  };

	  var filter = createModifierAction(function (value, iteratee) {
	    return value.filter(iteratee);
	  }, s.array, 2);

	  var reset = function reset(model) {
	    return {
	      type: _actionTypes2.default.RESET,
	      model: model
	    };
	  };

	  var map = createModifierAction(function (value) {
	    var iteratee = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _identity2.default;
	    return value.map(iteratee);
	  }, s.array, 2);

	  var remove = createModifierAction(function (value, index) {
	    return s.splice(value, index, 1);
	  }, s.array, 2, function (_, index) {
	    return { removeKeys: [index] };
	  });

	  var move = createModifierAction(function (value, indexFrom, indexTo) {
	    if (indexFrom >= s.length(value) || indexTo >= s.length(value)) {
	      throw new Error('Error moving array item: invalid bounds ' + indexFrom + ', ' + indexTo);
	    }

	    var item = s.get(value, indexFrom);
	    var removed = s.splice(value, indexFrom, 1);
	    var inserted = s.splice(removed, indexTo, 0, item);

	    return inserted;
	  }, s.array, 3);

	  var merge = createModifierAction(s.merge, {}, 2);

	  var omit = createModifierAction(function (value) {
	    var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

	    var propsArray = typeof props === 'string' ? [props] : props;

	    var newValue = propsArray.reduce(function (acc, prop) {
	      return s.remove(acc, prop);
	    }, value);

	    return newValue;
	  }, {}, 2, function (_, props) {
	    return { removeKeys: props };
	  });

	  var load = function load(model, values) {
	    return change(model, values, {
	      silent: true,
	      load: true
	    });
	  };

	  return (0, _mapValues2.default)({
	    change: change,
	    xor: xor,
	    push: push,
	    toggle: toggle,
	    check: check,
	    checkWithValue: checkWithValue,
	    filter: filter,
	    reset: reset,
	    map: map,
	    remove: remove,
	    move: move,
	    merge: merge,
	    omit: omit,
	    load: load
	  }, _track.trackable);
	}

	exports.default = createModelActions();

/***/ }),

/***/ 783:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createErrorsClass = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(41);

	var _get2 = __webpack_require__(23);

	var _get3 = _interopRequireDefault(_get2);

	var _map = __webpack_require__(368);

	var _map2 = _interopRequireDefault(_map);

	var _iteratee = __webpack_require__(233);

	var _iteratee2 = _interopRequireDefault(_iteratee);

	var _isPlainObject = __webpack_require__(32);

	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

	var _omit = __webpack_require__(93);

	var _omit2 = _interopRequireDefault(_omit);

	var _getForm = __webpack_require__(155);

	var _getForm2 = _interopRequireDefault(_getForm);

	var _getFieldFromState = __webpack_require__(116);

	var _getFieldFromState2 = _interopRequireDefault(_getFieldFromState);

	var _getModel = __webpack_require__(117);

	var _getModel2 = _interopRequireDefault(_getModel);

	var _isValid = __webpack_require__(153);

	var _isValid2 = _interopRequireDefault(_isValid);

	var _resolveModel = __webpack_require__(156);

	var _resolveModel2 = _interopRequireDefault(_resolveModel);

	var _initialFieldState = __webpack_require__(66);

	var _initialFieldState2 = _interopRequireDefault(_initialFieldState);

	var _shallowEqual = __webpack_require__(75);

	var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

	var _invariant = __webpack_require__(16);

	var _invariant2 = _interopRequireDefault(_invariant);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var defaultStrategy = {
	  get: _get3.default,
	  getForm: _getForm2.default,
	  getFieldFromState: _getFieldFromState2.default
	};

	var propTypes = {
	  // Computed props
	  modelValue: _react.PropTypes.any,
	  formValue: _react.PropTypes.object,
	  fieldValue: _react.PropTypes.object,

	  // Provided props
	  model: _react.PropTypes.string.isRequired,
	  messages: _react.PropTypes.objectOf(_react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.func, _react.PropTypes.bool])),
	  show: _react.PropTypes.any,
	  wrapper: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.func, _react.PropTypes.element]),
	  component: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.func, _react.PropTypes.element]),
	  dispatch: _react.PropTypes.func,
	  dynamic: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.arrayOf(_react.PropTypes.string)]),
	  store: _react.PropTypes.shape({
	    subscribe: _react.PropTypes.func,
	    dispatch: _react.PropTypes.func,
	    getState: _react.PropTypes.func
	  })
	};

	function showErrors(field, form) {
	  var show = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

	  if (typeof show === 'function') {
	    return show(field, form);
	  }

	  if (!Array.isArray(show) && (typeof show === 'undefined' ? 'undefined' : _typeof(show)) !== 'object' && typeof show !== 'string') {
	    return !!show;
	  }

	  return (0, _iteratee2.default)(show)(field);
	}

	function createErrorsClass() {
	  var s = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultStrategy;

	  var Errors = function (_Component) {
	    _inherits(Errors, _Component);

	    function Errors() {
	      _classCallCheck(this, Errors);

	      return _possibleConstructorReturn(this, (Errors.__proto__ || Object.getPrototypeOf(Errors)).apply(this, arguments));
	    }

	    _createClass(Errors, [{
	      key: 'shouldComponentUpdate',
	      value: function shouldComponentUpdate(nextProps) {
	        var fieldValue = nextProps.fieldValue,
	            formValue = nextProps.formValue;
	        var dynamic = this.props.dynamic;


	        if (dynamic) {
	          return !(0, _shallowEqual2.default)(this.props, nextProps);
	        }

	        return fieldValue !== this.props.fieldValue || formValue !== this.props.formValue;
	      }
	    }, {
	      key: 'mapErrorMessages',
	      value: function mapErrorMessages(errors) {
	        var _this2 = this;

	        var messages = this.props.messages;


	        if (typeof errors === 'string') {
	          return this.renderError(errors, 'error');
	        }

	        if (!errors) return null;

	        return (0, _map2.default)(errors, function (error, key) {
	          var message = messages[key];

	          if (error) {
	            if (message || typeof error === 'string') {
	              return _this2.renderError(message || error, key);
	            } else if ((0, _isPlainObject2.default)(error)) {
	              return _this2.mapErrorMessages(error);
	            }
	          }

	          return false;
	        }).reduce(function (a, b) {
	          return b ? a.concat(b) : a;
	        }, []);
	      }
	    }, {
	      key: 'renderError',
	      value: function renderError(message, key) {
	        var _props = this.props,
	            component = _props.component,
	            model = _props.model,
	            modelValue = _props.modelValue,
	            fieldValue = _props.fieldValue,
	            errors = _props.fieldValue.errors;


	        var errorProps = {
	          key: key,
	          model: model,
	          modelValue: modelValue,
	          fieldValue: fieldValue
	        };

	        var messageString = typeof message === 'function' ? message(modelValue, errors[key]) : message;

	        if (!messageString) return null;

	        var allowedProps = typeof component === 'function' ? errorProps : { key: key };

	        return _react2.default.createElement(component, allowedProps, messageString);
	      }
	    }, {
	      key: 'render',
	      value: function render() {
	        var _props2 = this.props,
	            fieldValue = _props2.fieldValue,
	            formValue = _props2.formValue,
	            show = _props2.show,
	            wrapper = _props2.wrapper;


	        var allowedProps = typeof wrapper === 'function' ? this.props : (0, _omit2.default)(this.props, Object.keys(propTypes));

	        if (!showErrors(fieldValue, formValue, show)) {
	          return null;
	        }

	        var errorMessages = (0, _isValid2.default)(fieldValue) ? null : this.mapErrorMessages(fieldValue.errors);

	        if (!errorMessages) return null;

	        return _react2.default.createElement(wrapper, allowedProps, errorMessages);
	      }
	    }]);

	    return Errors;
	  }(_react.Component);

	   true ? Errors.propTypes = propTypes : void 0;

	  Errors.defaultProps = {
	    wrapper: 'div',
	    component: 'span',
	    messages: {},
	    show: true,
	    dynamic: true
	  };

	  function mapStateToProps(state, _ref) {
	    var model = _ref.model;

	    var modelString = (0, _getModel2.default)(model, state);

	    var form = s.getForm(state, modelString);
	    (0, _invariant2.default)(form, 'Unable to retrieve errors. ' + 'Could not find form for "%s" in the store.', modelString);

	    var formValue = form.$form;
	    var fieldValue = s.getFieldFromState(state, modelString) || _initialFieldState2.default;

	    return {
	      model: modelString,
	      modelValue: s.get(state, modelString),
	      formValue: formValue,
	      fieldValue: fieldValue
	    };
	  }

	  return (0, _resolveModel2.default)((0, _reactRedux.connect)(mapStateToProps)(Errors));
	}

	exports.createErrorsClass = createErrorsClass;
	exports.default = createErrorsClass();

/***/ }),

/***/ 784:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createFieldClass = exports.controlPropsMap = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _get2 = __webpack_require__(23);

	var _get3 = _interopRequireDefault(_get2);

	var _identity = __webpack_require__(118);

	var _identity2 = _interopRequireDefault(_identity);

	var _omit = __webpack_require__(93);

	var _omit2 = _interopRequireDefault(_omit);

	var _isPlainObject = __webpack_require__(32);

	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

	var _pick = __webpack_require__(804);

	var _pick2 = _interopRequireDefault(_pick);

	var _reactRedux = __webpack_require__(41);

	var _invariant = __webpack_require__(16);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _actions = __webpack_require__(115);

	var _actions2 = _interopRequireDefault(_actions);

	var _controlComponent = __webpack_require__(356);

	var _controlComponent2 = _interopRequireDefault(_controlComponent);

	var _controlPropsMap2 = __webpack_require__(226);

	var _controlPropsMap3 = _interopRequireDefault(_controlPropsMap2);

	var _deepCompareChildren = __webpack_require__(363);

	var _deepCompareChildren2 = _interopRequireDefault(_deepCompareChildren);

	var _shallowCompareWithoutChildren = __webpack_require__(805);

	var _shallowCompareWithoutChildren2 = _interopRequireDefault(_shallowCompareWithoutChildren);

	var _getModel = __webpack_require__(117);

	var _getModel2 = _interopRequireDefault(_getModel);

	var _getFieldFromState = __webpack_require__(116);

	var _getFieldFromState2 = _interopRequireDefault(_getFieldFromState);

	var _resolveModel = __webpack_require__(156);

	var _resolveModel2 = _interopRequireDefault(_resolveModel);

	var _initialFieldState = __webpack_require__(66);

	var _initialFieldState2 = _interopRequireDefault(_initialFieldState);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var fieldPropTypes = {
	  model: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.string]).isRequired,
	  component: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.string]),
	  parser: _react.PropTypes.func,
	  updateOn: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.string), _react.PropTypes.string]),
	  changeAction: _react.PropTypes.func,
	  validators: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.object]),
	  asyncValidators: _react.PropTypes.object,
	  validateOn: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.string), _react.PropTypes.string]),
	  asyncValidateOn: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.string), _react.PropTypes.string]),
	  errors: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.object]),
	  mapProps: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.object]),
	  componentMap: _react.PropTypes.object,
	  dynamic: _react.PropTypes.bool,
	  dispatch: _react.PropTypes.func,
	  getRef: _react.PropTypes.func,

	  // Calculated props
	  fieldValue: _react.PropTypes.object,
	  store: _react.PropTypes.shape({
	    subscribe: _react.PropTypes.func,
	    dispatch: _react.PropTypes.func,
	    getState: _react.PropTypes.func
	  })
	};

	function getControlType(control, props, options) {
	  var _controlPropsMap = options.controlPropsMap;


	  var controlDisplayNames = Object.keys(_controlPropsMap).filter(function (controlKey) {
	    var propsMap = _controlPropsMap[controlKey];

	    if ((0, _isPlainObject2.default)(propsMap) && propsMap.component) {
	      return control.type === propsMap.component;
	    }

	    return false;
	  });

	  if (controlDisplayNames.length) return controlDisplayNames[0];

	  try {
	    var controlDisplayName = control.constructor.displayName || control.type.displayName || control.type.name || control.type;

	    if (controlDisplayName === 'input') {
	      controlDisplayName = _controlPropsMap[control.props.type] ? control.props.type : 'text';
	    }

	    return _controlPropsMap[controlDisplayName] ? controlDisplayName : null;
	  } catch (error) {
	    return undefined;
	  }
	}

	var defaultStrategy = {
	  Control: _controlComponent2.default,
	  controlPropTypes: fieldPropTypes,
	  getFieldFromState: _getFieldFromState2.default,
	  actions: _actions2.default
	};

	function createFieldClass() {
	  var customControlPropsMap = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  var s = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultStrategy;

	  // Use the fieldPropTypes if no controlProptypes have been defined to
	  // maintain backwards compatibiltiy.
	  var controlPropTypes = s.controlPropTypes || fieldPropTypes;

	  function mapStateToProps(state, props) {
	    var model = props.model;


	    var modelString = (0, _getModel2.default)(model, state);
	    var fieldValue = s.getFieldFromState(state, modelString) || _initialFieldState2.default;

	    return {
	      model: modelString,
	      fieldValue: fieldValue
	    };
	  }

	  var options = {
	    controlPropsMap: _extends({}, _controlPropsMap3.default, customControlPropsMap)
	  };

	  // TODO: refactor
	  var defaultControlPropsMap = {
	    checkbox: {
	      changeAction: s.actions.checkWithValue
	    }
	  };

	  var Field = function (_Component) {
	    _inherits(Field, _Component);

	    function Field() {
	      _classCallCheck(this, Field);

	      return _possibleConstructorReturn(this, (Field.__proto__ || Object.getPrototypeOf(Field)).apply(this, arguments));
	    }

	    _createClass(Field, [{
	      key: 'shouldComponentUpdate',
	      value: function shouldComponentUpdate(nextProps) {
	        var dynamic = this.props.dynamic;


	        if (dynamic) {
	          return (0, _deepCompareChildren2.default)(this, nextProps);
	        }

	        return (0, _shallowCompareWithoutChildren2.default)(this, nextProps);
	      }
	    }, {
	      key: 'createControlComponent',
	      value: function createControlComponent(control) {
	        var props = this.props;


	        if (!control || !control.props || control instanceof _controlComponent2.default) {
	          return control;
	        }

	        var controlType = getControlType(control, props, options);
	        var _props$mapProps = props.mapProps,
	            mapProps = _props$mapProps === undefined ? options.controlPropsMap[controlType] : _props$mapProps;


	        var controlProps = (0, _pick2.default)(props, Object.keys(controlPropTypes));

	        if (!mapProps) {
	          return _react2.default.cloneElement(control, null, this.mapChildrenToControl(control.props.children));
	        }

	        return _react2.default.createElement(s.Control, _extends({}, controlProps, {
	          control: control,
	          controlProps: control.props,
	          component: control.type,
	          mapProps: mapProps
	        }, defaultControlPropsMap[controlType] || {}));
	      }
	    }, {
	      key: 'mapChildrenToControl',
	      value: function mapChildrenToControl(children) {
	        var _this2 = this;

	        if (_react2.default.Children.count(children) > 1) {
	          return _react2.default.Children.map(children, function (child) {
	            return _this2.createControlComponent(child);
	          });
	        }

	        return this.createControlComponent(children);
	      }
	    }, {
	      key: 'render',
	      value: function render() {
	        var _props = this.props,
	            component = _props.component,
	            children = _props.children,
	            fieldValue = _props.fieldValue;


	        var allowedProps = (0, _omit2.default)(this.props, Object.keys(controlPropTypes));
	        var renderableChildren = typeof children === 'function' ? children(fieldValue) : children;

	        if (!component) {
	          (0, _invariant2.default)(_react2.default.Children.count(renderableChildren) === 1, 'Empty wrapper components for <Field> are only possible' + 'when there is a single child. Please check the children' + ('passed into <Field model="' + this.props.model + '">.'));

	          return this.createControlComponent(renderableChildren);
	        }

	        return _react2.default.createElement(component, allowedProps, this.mapChildrenToControl(renderableChildren));
	      }
	    }]);

	    return Field;
	  }(_react.Component);

	  if (true) {
	     true ? Field.propTypes = fieldPropTypes : void 0;
	  }

	  Field.defaultProps = {
	    updateOn: 'change',
	    asyncValidateOn: 'blur',
	    parser: _identity2.default,
	    changeAction: _actions2.default.change,
	    dynamic: true,
	    component: 'div'
	  };

	  return (0, _resolveModel2.default)((0, _reactRedux.connect)(mapStateToProps)(Field));
	}

	exports.controlPropsMap = _controlPropsMap3.default;
	exports.createFieldClass = createFieldClass;
	exports.default = createFieldClass(_controlPropsMap3.default);

/***/ }),

/***/ 785:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(41);

	var _getModel = __webpack_require__(117);

	var _getModel2 = _interopRequireDefault(_getModel);

	var _omit = __webpack_require__(93);

	var _omit2 = _interopRequireDefault(_omit);

	var _resolveModel = __webpack_require__(156);

	var _resolveModel2 = _interopRequireDefault(_resolveModel);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var propTypes = {
	  model: _react.PropTypes.string.isRequired,
	  component: _react.PropTypes.any,
	  dispatch: _react.PropTypes.func,
	  store: _react.PropTypes.shape({
	    subscribe: _react.PropTypes.func,
	    dispatch: _react.PropTypes.func,
	    getState: _react.PropTypes.func
	  })
	};

	var Fieldset = function (_Component) {
	  _inherits(Fieldset, _Component);

	  function Fieldset() {
	    _classCallCheck(this, Fieldset);

	    return _possibleConstructorReturn(this, (Fieldset.__proto__ || Object.getPrototypeOf(Fieldset)).apply(this, arguments));
	  }

	  _createClass(Fieldset, [{
	    key: 'getChildContext',
	    value: function getChildContext() {
	      return { model: this.props.model };
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var component = this.props.component;


	      var allowedProps = (0, _omit2.default)(this.props, Object.keys(propTypes));

	      return _react2.default.createElement(component, allowedProps);
	    }
	  }]);

	  return Fieldset;
	}(_react.Component);

	Fieldset.displayName = 'Fieldset';

	Fieldset.childContextTypes = {
	  model: _react.PropTypes.any
	};

	 true ? Fieldset.propTypes = propTypes : void 0;

	Fieldset.defaultProps = {
	  component: 'div'
	};

	function mapStateToProps(state, _ref) {
	  var model = _ref.model;

	  var modelString = (0, _getModel2.default)(model, state);

	  return {
	    model: modelString
	  };
	}

	exports.default = (0, _resolveModel2.default)((0, _reactRedux.connect)(mapStateToProps)(Fieldset));

/***/ }),

/***/ 786:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _formComponent = __webpack_require__(357);

	var _formComponent2 = _interopRequireDefault(_formComponent);

	var _formsReducer = __webpack_require__(360);

	var _formsReducer2 = _interopRequireDefault(_formsReducer);

	var _redux = __webpack_require__(79);

	var _omit = __webpack_require__(93);

	var _omit2 = _interopRequireDefault(_omit);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var LocalForm = function (_React$Component) {
	  _inherits(LocalForm, _React$Component);

	  function LocalForm(props) {
	    _classCallCheck(this, LocalForm);

	    var _this = _possibleConstructorReturn(this, (LocalForm.__proto__ || Object.getPrototypeOf(LocalForm)).call(this, props));

	    _this.store = props.store || (0, _redux.createStore)((0, _formsReducer2.default)(_defineProperty({}, props.model, props.initialState)));
	    return _this;
	  }

	  _createClass(LocalForm, [{
	    key: 'render',
	    value: function render() {
	      var allowedProps = (0, _omit2.default)(this.props, ['store', 'initialState']);

	      return _react2.default.createElement(_formComponent2.default, _extends({ store: this.store }, allowedProps));
	    }
	  }]);

	  return LocalForm;
	}(_react2.default.Component);

	LocalForm.displayName = 'LocalForm';

	 true ? LocalForm.propTypes = {
	  store: _react.PropTypes.shape({
	    subscribe: _react.PropTypes.func,
	    dispatch: _react.PropTypes.func,
	    getState: _react.PropTypes.func
	  }),

	  // provided props
	  initialState: _react.PropTypes.any,
	  model: _react.PropTypes.string.isRequired
	} : void 0;

	LocalForm.defaultProps = {
	  initialState: {},
	  model: 'local'
	};

	exports.default = LocalForm;

/***/ }),

/***/ 787:
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var validityKeys = ['badInput', 'customError', 'patternMismatch', 'rangeOverflow', 'rangeUnderflow', 'stepMismatch', 'tooLong', 'tooShort', 'typeMismatch', 'valueMissing'];

	exports.default = validityKeys;

/***/ }),

/***/ 788:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.isRetouched = exports.isTouched = exports.isPending = exports.isValid = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = formSelector;

	var _isValid = __webpack_require__(153);

	var _isValid2 = _interopRequireDefault(_isValid);

	var _isPending = __webpack_require__(789);

	var _isPending2 = _interopRequireDefault(_isPending);

	var _isTouched = __webpack_require__(792);

	var _isTouched2 = _interopRequireDefault(_isTouched);

	var _isRetouched = __webpack_require__(791);

	var _isRetouched2 = _interopRequireDefault(_isRetouched);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function formSelector(formState) {
	  return _extends({}, formState, {
	    get valid() {
	      return (0, _isValid2.default)(formState);
	    },
	    get pending() {
	      return (0, _isPending2.default)(formState);
	    },
	    get touched() {
	      return (0, _isTouched2.default)(formState);
	    },
	    get retouched() {
	      return (0, _isRetouched2.default)(formState);
	    }
	  });
	}

	exports.isValid = _isValid2.default;
	exports.isPending = _isPending2.default;
	exports.isTouched = _isTouched2.default;
	exports.isRetouched = _isRetouched2.default;

/***/ }),

/***/ 789:
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isPending;
	function isPending(formState) {
	  if (!formState) return false;

	  // Field is pending
	  if (!formState.$form) {
	    return formState.pending;
	  }

	  // Any field in form is pending
	  return Object.keys(formState).some(function (key) {
	    return isPending(formState[key]);
	  });
	}

/***/ }),

/***/ 790:
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isPristine;
	function isPristine(formState) {
	  if (!formState) return false;

	  // Form is pristine
	  if (!formState.$form) {
	    return formState.pristine;
	  }

	  // Every field in form is pristine
	  return Object.keys(formState).every(function (key) {
	    if (key === '$form') return true;

	    return isPristine(formState[key]);
	  });
	}

/***/ }),

/***/ 791:
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isRetouched;
	function isRetouched(formState) {
	  if (!formState) return false;

	  // Field is pending
	  if (!formState.$form) {
	    return formState.retouched;
	  }

	  // Any field in form is pending
	  return Object.keys(formState).some(function (key) {
	    return isRetouched(formState[key]);
	  });
	}

/***/ }),

/***/ 792:
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isTouched;
	function isTouched(formState) {
	  if (!formState) return false;

	  // Field is touched
	  if (!formState.$form) {
	    return formState.touched;
	  }

	  // Any field in form is touched
	  return Object.keys(formState).some(function (key) {
	    return isTouched(formState[key]);
	  });
	}

/***/ }),

/***/ 793:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	exports.default = formActionsReducer;

	var _actionTypes = __webpack_require__(59);

	var _actionTypes2 = _interopRequireDefault(_actionTypes);

	var _updateField = __webpack_require__(806);

	var _updateField2 = _interopRequireDefault(_updateField);

	var _updateParentForms = __webpack_require__(369);

	var _updateParentForms2 = _interopRequireDefault(_updateParentForms);

	var _updateSubFields = __webpack_require__(807);

	var _updateSubFields2 = _interopRequireDefault(_updateSubFields);

	var _getFieldForm = __webpack_require__(797);

	var _getFieldForm2 = _interopRequireDefault(_getFieldForm);

	var _isPristine = __webpack_require__(790);

	var _isPristine2 = _interopRequireDefault(_isPristine);

	var _map = __webpack_require__(368);

	var _map2 = _interopRequireDefault(_map);

	var _isPlainObject = __webpack_require__(32);

	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

	var _mapValues = __webpack_require__(45);

	var _mapValues2 = _interopRequireDefault(_mapValues);

	var _inverse = __webpack_require__(799);

	var _inverse2 = _interopRequireDefault(_inverse);

	var _merge = __webpack_require__(234);

	var _merge2 = _interopRequireDefault(_merge);

	var _isValid = __webpack_require__(153);

	var _isValid2 = _interopRequireDefault(_isValid);

	var _isValidityValid = __webpack_require__(367);

	var _isValidityValid2 = _interopRequireDefault(_isValidityValid);

	var _isValidityInvalid = __webpack_require__(232);

	var _isValidityInvalid2 = _interopRequireDefault(_isValidityInvalid);

	var _fieldActions = __webpack_require__(355);

	var _fieldActions2 = _interopRequireDefault(_fieldActions);

	var _toPath = __webpack_require__(157);

	var _toPath2 = _interopRequireDefault(_toPath);

	var _initialFieldState = __webpack_require__(66);

	var _initialFieldState2 = _interopRequireDefault(_initialFieldState);

	var _icepick = __webpack_require__(52);

	var _icepick2 = _interopRequireDefault(_icepick);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var resetFieldState = function resetFieldState(field, key) {
	  if (!(0, _isPlainObject2.default)(field)) return field;

	  var intents = [{ type: 'validate' }];
	  var resetValue = field.initialValue;

	  if ('loadedValue' in field && field.initialValue !== field.loadedValue) {
	    intents.push({ type: 'load', value: field.loadedValue });
	    resetValue = field.loadedValue;
	  }

	  if (key === '$form') {
	    return _icepick2.default.assign(_initialFieldState2.default, {
	      value: resetValue,
	      model: field.model,
	      intents: intents
	    });
	  }

	  if (field.$form) return (0, _mapValues2.default)(field, resetFieldState);

	  return _icepick2.default.assign(_initialFieldState2.default, {
	    value: resetValue,
	    model: field.model,
	    intents: intents
	  });
	};

	var setInitialFieldState = function setInitialFieldState(field, key) {
	  if (!(0, _isPlainObject2.default)(field)) return field;

	  if (key === '$form') {
	    return _icepick2.default.assign(_initialFieldState2.default, {
	      value: field.value,
	      model: field.model
	    });
	  }

	  if (field.$form) return (0, _mapValues2.default)(field, resetFieldState);

	  return _icepick2.default.assign(_initialFieldState2.default, {
	    value: field.value,
	    model: field.model
	  });
	};

	var addIntent = function addIntent(intents, newIntent) {
	  if (!intents) return [newIntent];
	  if (intents.some(function (intent) {
	    return intent.type === newIntent.type;
	  })) return intents;

	  return intents.concat(newIntent);
	};

	var clearIntents = function clearIntents(intents, oldIntent) {
	  if (!intents || typeof oldIntent === 'undefined') return [];
	  return intents.filter(function (intent) {
	    return intent.type !== oldIntent.type;
	  });
	};

	function formActionsReducer(state, action, localPath) {
	  var _getFieldAndForm = (0, _updateField.getFieldAndForm)(state, localPath),
	      _getFieldAndForm2 = _slicedToArray(_getFieldAndForm, 1),
	      field = _getFieldAndForm2[0];

	  var fieldState = field && field.$form ? field.$form : field;
	  var intents = fieldState.intents;


	  var fieldUpdates = {};
	  var subFieldUpdates = {};
	  var parentFormUpdates = void 0;

	  switch (action.type) {
	    case _actionTypes2.default.FOCUS:
	      {
	        fieldUpdates = {
	          focus: true,
	          intents: action.silent ? intents : addIntent(intents, action)
	        };

	        break;
	      }

	    case _actionTypes2.default.BLUR:
	    case _actionTypes2.default.SET_TOUCHED:
	      {
	        var fieldForm = (0, _getFieldForm2.default)(state, localPath).$form;

	        fieldUpdates = {
	          focus: action.type === _actionTypes2.default.BLUR ? false : field.focus,
	          touched: true,
	          retouched: fieldForm ? !!(fieldForm.submitted || fieldForm.submitFailed) : false
	        };

	        parentFormUpdates = {
	          touched: true,
	          retouched: fieldUpdates.retouched
	        };

	        break;
	      }

	    case _actionTypes2.default.SET_UNTOUCHED:
	      {
	        fieldUpdates = {
	          focus: false,
	          touched: false
	        };

	        break;
	      }

	    case _actionTypes2.default.SET_PRISTINE:
	    case _actionTypes2.default.SET_DIRTY:
	      {
	        var pristine = action.type === _actionTypes2.default.SET_PRISTINE;

	        fieldUpdates = {
	          pristine: pristine
	        };

	        subFieldUpdates = {
	          pristine: pristine
	        };

	        parentFormUpdates = function parentFormUpdates(form) {
	          return { pristine: (0, _isPristine2.default)(form) };
	        };

	        break;
	      }

	    case _actionTypes2.default.SET_VALIDATING:
	      {
	        fieldUpdates = {
	          validating: action.validating,
	          validated: !action.validating
	        };

	        break;
	      }

	    case _actionTypes2.default.SET_VALIDITY:
	    case _actionTypes2.default.SET_ERRORS:
	      {
	        var _fieldUpdates;

	        var isErrors = action.type === _actionTypes2.default.SET_ERRORS;
	        var validity = void 0;
	        if (isErrors) {
	          validity = action.merge ? (0, _merge2.default)(_extends({}, fieldState.errors), action.errors) : action.errors;
	        } else {
	          validity = action.merge ? (0, _merge2.default)(_extends({}, fieldState.validity), action.validity) : action.validity;
	        }

	        var inverseValidity = (0, _isPlainObject2.default)(validity) ? (0, _mapValues2.default)(validity, _inverse2.default) : !validity;

	        // If the field is a form, its validity is
	        // also based on whether its fields are all valid.
	        var areFieldsValid = field && field.$form ? (0, _isValid.fieldsValid)(field) : true;

	        fieldUpdates = (_fieldUpdates = {}, _defineProperty(_fieldUpdates, isErrors ? 'errors' : 'validity', validity), _defineProperty(_fieldUpdates, isErrors ? 'validity' : 'errors', inverseValidity), _defineProperty(_fieldUpdates, 'validating', false), _defineProperty(_fieldUpdates, 'validated', true), _defineProperty(_fieldUpdates, 'valid', areFieldsValid && (isErrors ? !(0, _isValidityInvalid2.default)(validity) : (0, _isValidityValid2.default)(validity))), _fieldUpdates);

	        if (action.async) {
	          fieldUpdates.asyncKeys = Object.keys(isErrors ? action.errors : action.validity);
	        }

	        parentFormUpdates = function parentFormUpdates(form) {
	          return { valid: (0, _isValid2.default)(form) };
	        };

	        break;
	      }

	    case _actionTypes2.default.SET_FIELDS_VALIDITY:
	      {
	        return (0, _map2.default)(action.fieldsValidity, function (fieldValidity, subField) {
	          return _fieldActions2.default.setValidity(subField, fieldValidity, action.options);
	        }).reduce(function (accState, subAction) {
	          return formActionsReducer(accState, subAction, localPath.concat((0, _toPath2.default)(subAction.model)));
	        }, state);
	      }

	    case _actionTypes2.default.RESET_VALIDITY:
	      {
	        var _ret = function () {
	          var validity = _extends({}, fieldState.validity);
	          var errors = _extends({}, fieldState.errors);
	          var valid = void 0;

	          if (action.omitKeys) {
	            action.omitKeys.forEach(function (key) {
	              delete validity[key];
	              delete errors[key];
	            });
	            valid = (0, _isValidityValid2.default)(validity);
	          } else {
	            validity = _initialFieldState2.default.validity;
	            errors = _initialFieldState2.default.errors;
	            valid = _initialFieldState2.default.valid;
	          }

	          fieldUpdates = {
	            valid: valid,
	            validity: validity,
	            errors: errors
	          };

	          subFieldUpdates = {
	            valid: _initialFieldState2.default.valid,
	            validity: _initialFieldState2.default.validity,
	            errors: _initialFieldState2.default.errors
	          };

	          return 'break';
	        }();

	        if (_ret === 'break') break;
	      }

	    case _actionTypes2.default.SET_PENDING:
	      {
	        fieldUpdates = {
	          pending: action.pending,
	          submitted: false,
	          submitFailed: false,
	          retouched: false
	        };

	        parentFormUpdates = { pending: action.pending };

	        break;
	      }

	    case _actionTypes2.default.SET_SUBMITTED:
	      {
	        var submitted = !!action.submitted;

	        fieldUpdates = {
	          pending: false,
	          submitted: submitted,
	          submitFailed: submitted ? false : fieldState && fieldState.submitFailed,
	          touched: true,
	          retouched: false
	        };

	        subFieldUpdates = {
	          submitted: submitted,
	          submitFailed: submitted ? false : fieldUpdates.submitFailed,
	          retouched: false
	        };

	        break;
	      }

	    case _actionTypes2.default.SET_SUBMIT_FAILED:
	      {
	        fieldUpdates = {
	          pending: false,
	          submitted: fieldState.submitted && !action.submitFailed,
	          submitFailed: !!action.submitFailed,
	          touched: true,
	          retouched: false
	        };

	        subFieldUpdates = {
	          pending: false,
	          submitted: !action.submitFailed,
	          submitFailed: !!action.submitFailed,
	          touched: true,
	          retouched: false
	        };

	        break;
	      }

	    case _actionTypes2.default.RESET:
	      {
	        return (0, _updateField2.default)(state, localPath, resetFieldState, resetFieldState);
	      }

	    case _actionTypes2.default.SET_INITIAL:
	      {
	        return (0, _updateField2.default)(state, localPath, setInitialFieldState, setInitialFieldState);
	      }

	    case _actionTypes2.default.ADD_INTENT:
	      {
	        fieldUpdates = {
	          intents: addIntent(intents, action.intent)
	        };

	        break;
	      }

	    case _actionTypes2.default.CLEAR_INTENTS:
	      {
	        fieldUpdates = {
	          intents: clearIntents(intents, action.intent)
	        };

	        break;
	      }

	    default:
	      return state;
	  }

	  var updatedField = (0, _updateField2.default)(state, localPath, fieldUpdates);
	  var updatedSubFields = Object.keys(subFieldUpdates).length ? (0, _updateSubFields2.default)(updatedField, localPath, subFieldUpdates) : updatedField;
	  var updatedParentForms = parentFormUpdates ? (0, _updateParentForms2.default)(updatedSubFields, localPath, parentFormUpdates) : updatedSubFields;

	  return updatedParentForms;
	}

/***/ }),

/***/ 794:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = changeActionReducer;

	var _actionTypes = __webpack_require__(59);

	var _actionTypes2 = _interopRequireDefault(_actionTypes);

	var _icepick = __webpack_require__(52);

	var _icepick2 = _interopRequireDefault(_icepick);

	var _get = __webpack_require__(23);

	var _get2 = _interopRequireDefault(_get);

	var _shallowEqual = __webpack_require__(75);

	var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

	var _isPlainObject = __webpack_require__(32);

	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

	var _mapValues = __webpack_require__(45);

	var _mapValues2 = _interopRequireDefault(_mapValues);

	var _formReducer = __webpack_require__(154);

	var _initialFieldState = __webpack_require__(66);

	var _initialFieldState2 = _interopRequireDefault(_initialFieldState);

	var _updateParentForms = __webpack_require__(369);

	var _updateParentForms2 = _interopRequireDefault(_updateParentForms);

	var _invariant = __webpack_require__(16);

	var _invariant2 = _interopRequireDefault(_invariant);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function updateFieldValue(field, action) {
	  var parentModel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
	  var value = action.value,
	      removeKeys = action.removeKeys,
	      silent = action.silent,
	      load = action.load,
	      model = action.model;


	  var fieldState = field && field.$form ? field.$form : field;

	  var changedFieldProps = {
	    validated: false,
	    retouched: fieldState.submitted ? true : fieldState.retouched,
	    intents: [{ type: 'validate' }],
	    pristine: silent ? fieldState.pristine : false,
	    loadedValue: load ? value : fieldState.loadedValue
	  };

	  if ((0, _shallowEqual2.default)(field.value, value)) {
	    return _icepick2.default.merge(field, changedFieldProps);
	  }

	  if (removeKeys) {
	    var _ret = function () {
	      (0, _invariant2.default)(field && field.$form, 'Unable to remove keys. ' + 'Field for "%s" in store is not an array/object.', model);

	      var valueIsArray = Array.isArray(field.$form.value);
	      var removeKeysArray = Array.isArray(removeKeys) ? removeKeys : [removeKeys];

	      var result = void 0;

	      if (valueIsArray) {
	        result = [];

	        Object.keys(field).forEach(function (key) {
	          if (!!~removeKeysArray.indexOf(+key) || key === '$form') return;

	          result[key] = field[key];
	        });

	        return {
	          v: _extends({}, _icepick2.default.set(result.filter(function (f) {
	            return f;
	          }), '$form', field.$form))
	        };
	      }

	      result = _extends({}, field);

	      Object.keys(field).forEach(function (key) {
	        if (!!~removeKeysArray.indexOf(key)) {
	          delete result['' + key];
	        }
	      });

	      return {
	        v: result
	      };
	    }();

	    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	  }

	  if (!Array.isArray(value) && !(0, _isPlainObject2.default)(value)) {
	    return _icepick2.default.merge(field, _icepick2.default.set(changedFieldProps, 'value', value));
	  }

	  var updatedField = (0, _mapValues2.default)(value, function (subValue, index) {
	    // TODO: refactor
	    var subField = field[index] || (0, _formReducer.createInitialState)('' + (parentModel ? parentModel + '.' : '') + model + '.' + index, subValue);

	    if (Object.hasOwnProperty.call(subField, '$form')) {
	      return updateFieldValue(subField, {
	        model: index,
	        value: subValue,
	        load: load
	      }, parentModel ? parentModel + '.' + model : model);
	    }

	    if ((0, _shallowEqual2.default)(subValue, subField.value)) {
	      return subField;
	    }

	    return _icepick2.default.merge(subField, _icepick2.default.assign(changedFieldProps, {
	      value: subValue,
	      loadedValue: load ? subValue : subField.loadedValue
	    }));
	  });

	  var dirtyFormState = _icepick2.default.merge(field.$form || _initialFieldState2.default, _icepick2.default.set(changedFieldProps, 'retouched', field.submitted || field.$form && field.$form.retouched));

	  return _icepick2.default.set(updatedField, '$form', _icepick2.default.set(dirtyFormState, 'value', value));
	}

	function getFormValue(form) {
	  if (form && !form.$form) {
	    return typeof form.loadedValue !== 'undefined' ? form.loadedValue : form.initialValue;
	  }

	  var result = (0, _mapValues2.default)(form, function (field, key) {
	    if (key === '$form') return undefined;

	    return getFormValue(field);
	  });

	  delete result.$form;

	  return result;
	}

	function changeActionReducer(state, action, localPath) {
	  if (action.type !== _actionTypes2.default.CHANGE) return state;

	  var field = (0, _get2.default)(state, localPath, (0, _formReducer.createInitialState)(action.model, action.value));

	  var updatedField = updateFieldValue(field, action);

	  if (!localPath.length) return updatedField;

	  var updatedState = _icepick2.default.setIn(state, localPath, updatedField);

	  if (action.silent) {
	    return (0, _updateParentForms2.default)(updatedState, localPath, function (form) {
	      var formValue = getFormValue(form);

	      return {
	        value: formValue,
	        loadedValue: formValue
	      };
	    });
	  }

	  return (0, _updateParentForms2.default)(updatedState, localPath, { pristine: false });
	}

/***/ }),

/***/ 795:
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = compose;
	function compose() {
	  for (var _len = arguments.length, reducers = Array(_len), _key = 0; _key < _len; _key++) {
	    reducers[_key] = arguments[_key];
	  }

	  return function (state, action) {
	    return reducers.reduceRight(function (prevState, reducer) {
	      return reducer(prevState, action);
	    }, state);
	  };
	}

/***/ }),

/***/ 796:
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = findKey;
	function findKey(object, predicate) {
	  var resultKey = void 0;

	  Object.keys(object).some(function (key) {
	    var isKey = predicate(object[key], key, object);

	    if (isKey) {
	      resultKey = key;
	      return true;
	    }

	    return false;
	  });

	  return resultKey;
	}

/***/ }),

/***/ 797:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = getFieldForm;

	var _get = __webpack_require__(23);

	var _get2 = _interopRequireDefault(_get);

	var _invariant = __webpack_require__(16);

	var _invariant2 = _interopRequireDefault(_invariant);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function getFieldForm(state, path) {
	  var formPath = path.slice(0, -1);

	  if (!formPath.length) return state;

	  var form = (0, _get2.default)(state, formPath);

	  (0, _invariant2.default)(form, 'Could not find form for "%s" in the store.', formPath.join('.'));

	  return form;
	}

/***/ }),

/***/ 798:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = getField;

	var _isPlainObject = __webpack_require__(32);

	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

	var _get = __webpack_require__(23);

	var _get2 = _interopRequireDefault(_get);

	var _initialFieldState = __webpack_require__(66);

	var _initialFieldState2 = _interopRequireDefault(_initialFieldState);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function getField(state, path) {
	  if (true) {
	    if (!(0, _isPlainObject2.default)(state)) {
	      throw new Error('Could not retrieve field \'' + path + '\' ' + 'from an invalid/empty form state.');
	    }
	  }

	  var result = (0, _get2.default)(state, path, _initialFieldState2.default);

	  if ('$form' in result) return result.$form;

	  return result;
	}

/***/ }),

/***/ 799:
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = inverse;
	function inverse(value) {
	  return !value;
	}

/***/ }),

/***/ 800:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = invertValidators;

	var _mapValues = __webpack_require__(45);

	var _mapValues2 = _interopRequireDefault(_mapValues);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function invertValidators(validators) {
	  if (typeof validators === 'function') {
	    return function (val) {
	      return !validators(val);
	    };
	  }

	  return (0, _mapValues2.default)(validators, invertValidators);
	}

/***/ }),

/***/ 801:
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = partition;
	function partition(collection, predicate) {
	  var result = [[], []];

	  collection.forEach(function (item, index) {
	    if (predicate(item, index, collection)) {
	      result[0].push(item);
	    } else {
	      result[1].push(item);
	    }
	  });

	  return result;
	}

/***/ }),

/***/ 802:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = pathStartsWith;
	exports.pathDifference = pathDifference;

	var _lodash = __webpack_require__(301);

	var _lodash2 = _interopRequireDefault(_lodash);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function pathStartsWith(pathString, subPathString) {
	  if (pathString === subPathString) return true;

	  var path = (0, _lodash2.default)(pathString);
	  var subPath = (0, _lodash2.default)(subPathString);

	  var startsWithSubPath = subPath.every(function (segment, index) {
	    return path[index] === segment;
	  });

	  return startsWithSubPath;
	}

	function pathDifference(pathString, subPathString) {
	  if (pathString === subPathString) return [];

	  var path = (0, _lodash2.default)(pathString);
	  var subPath = (0, _lodash2.default)(subPathString);

	  var difference = path.reduce(function (acc, segment, index) {
	    if (segment === subPath[index]) return acc;

	    acc.push(segment);

	    return acc;
	  }, []);

	  return difference;
	}

/***/ }),

/***/ 803:
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = persistEventWithCallback;
	function persistEventWithCallback(callback) {
	  return function (event) {
	    if (event && event.persist) {
	      event.persist();
	    }

	    callback(event);
	    return event;
	  };
	}

/***/ }),

/***/ 804:
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = pick;
	function pick(object, props) {
	  var result = {};

	  for (var i = 0; i < props.length; i++) {
	    var prop = props[i];
	    result[prop] = object[prop];
	  }

	  return result;
	}

/***/ }),

/***/ 805:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = shallowCompareWithoutChildren;

	var _react = __webpack_require__(1);

	var _shallowEqual = __webpack_require__(75);

	var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function shallowCompareWithoutChildren(instance, nextProps) {
	  return !(0, _shallowEqual2.default)(instance.props, nextProps, { omitKeys: ['children'] }) || _react.Children.count(instance.props.children) !== _react.Children.count(nextProps.children);
	}

/***/ }),

/***/ 806:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	exports.getFieldAndForm = getFieldAndForm;
	exports.default = updateField;

	var _icepick = __webpack_require__(52);

	var _icepick2 = _interopRequireDefault(_icepick);

	var _get = __webpack_require__(23);

	var _get2 = _interopRequireDefault(_get);

	var _mapValues = __webpack_require__(45);

	var _mapValues2 = _interopRequireDefault(_mapValues);

	var _formReducer = __webpack_require__(154);

	var _invariant = __webpack_require__(16);

	var _invariant2 = _interopRequireDefault(_invariant);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function assocIn(state, path, value, fn) {
	  if (!path.length) return _icepick2.default.assign(state, value);
	  if (!fn) return _icepick2.default.assocIn(state, path, value);

	  var key0 = path[0];

	  if (path.length === 1) {
	    return fn(_icepick2.default.assoc(state, key0, value));
	  }

	  return fn(_icepick2.default.assoc(state, key0, assocIn(state[key0] || {}, path.slice(1), value, fn)));
	}

	function tempInitialState(path) {
	  var initialValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

	  if (path.length === 1) return _defineProperty({}, path[0], initialValue);

	  return _defineProperty({}, path[0], tempInitialState(path.slice(1), initialValue));
	}

	function getFieldAndForm(formState, modelPath) {
	  var field = (0, _get2.default)(formState, modelPath);
	  var form = formState;

	  (0, _invariant2.default)(form, 'Could not find form for "%s" in the store.', modelPath);

	  if (!field) {
	    var initialValue = (0, _get2.default)(formState.$form.initialValue, modelPath);

	    form = _icepick2.default.merge((0, _formReducer.createInitialState)(formState.$form.model, tempInitialState(modelPath, initialValue)), formState);

	    field = (0, _get2.default)(form, modelPath);
	  }

	  return [field, form];
	}

	function updateField(state, path, newState, newSubState, updater) {
	  var _getFieldAndForm = getFieldAndForm(state, path),
	      _getFieldAndForm2 = _slicedToArray(_getFieldAndForm, 2),
	      field = _getFieldAndForm2[0],
	      fullState = _getFieldAndForm2[1];

	  if (!field) return state;

	  var isForm = field.hasOwnProperty('$form');
	  var fieldPath = isForm ? _icepick2.default.push(path, '$form') : path;

	  var fieldState = isForm ? field.$form : field;

	  var updatedFieldState = typeof newState === 'function' ? newState(fieldState) : newState;

	  if (isForm && newSubState) {
	    var formState = (0, _mapValues2.default)(field, function (subState, key) {
	      if (key === '$form') {
	        return _icepick2.default.assign(fieldState, updatedFieldState);
	      }

	      var updatedSubState = typeof newSubState === 'function' ? newSubState(subState, updatedFieldState) : newSubState;

	      return _icepick2.default.assign(subState, updatedSubState);
	    });

	    if (!path.length) return formState;

	    return assocIn(fullState, path, formState, updater);
	  }

	  return assocIn(fullState, fieldPath, _icepick2.default.assign(fieldState, updatedFieldState), updater);
	}

/***/ }),

/***/ 807:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	exports.default = updateSubFields;

	var _get = __webpack_require__(23);

	var _get2 = _interopRequireDefault(_get);

	var _icepick = __webpack_require__(52);

	var _icepick2 = _interopRequireDefault(_icepick);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function updateSubField(subField, newSubState) {
	  // Form
	  if (subField && subField.$form) {
	    var _ret = function () {
	      // intermediate value - not mutated outside function
	      var result = {};

	      Object.keys(subField).forEach(function (key) {
	        if (key === '$form') {
	          result.$form = _icepick2.default.assign(subField.$form, newSubState);
	        } else {
	          result[key] = updateSubField(subField[key], newSubState);
	        }
	      });

	      return {
	        v: result
	      };
	    }();

	    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	  }

	  // Field
	  return _icepick2.default.assign(subField, newSubState);
	}

	function updateSubFields(state, localPath, newState) {
	  var field = (0, _get2.default)(state, localPath);

	  // only forms can have fields -
	  // skip if field is not a form
	  if (!field || !field.$form) return state;

	  // intermediate value - not mutated outside function
	  var updatedField = {};

	  Object.keys(field).forEach(function (key) {
	    if (key === '$form') {
	      updatedField.$form = field.$form;
	    } else {
	      updatedField[key] = updateSubField(field[key], newState);
	    }
	  });

	  if (!localPath.length) return updatedField;

	  return _icepick2.default.assocIn(state, localPath, updatedField);
	}

/***/ }),

/***/ 848:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	var shallowEqual = __webpack_require__(135);

	/**
	 * Does a shallow comparison for props and state.
	 * See ReactComponentWithPureRenderMixin
	 * See also https://facebook.github.io/react/docs/shallow-compare.html
	 */
	function shallowCompare(instance, nextProps, nextState) {
	  return !shallowEqual(instance.props, nextProps) || !shallowEqual(instance.state, nextState);
	}

	module.exports = shallowCompare;

/***/ })

});