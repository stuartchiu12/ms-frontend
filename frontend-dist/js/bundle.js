webpackJsonp([3],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _classCallCheck2 = __webpack_require__(2);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(4);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(3);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(831);

	var _reactDom = __webpack_require__(30);

	var _redux = __webpack_require__(79);

	var _reactRedux = __webpack_require__(41);

	var _reactRouterRedux = __webpack_require__(812);

	var _CommonUtil = __webpack_require__(96);

	var _MSNotification = __webpack_require__(391);

	var _MSNotification2 = _interopRequireDefault(_MSNotification);

	var _RootReducer = __webpack_require__(389);

	var _RootReducer2 = _interopRequireDefault(_RootReducer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Directory layout:
	//   - frontend/index.js
	//   - frontend/index.template.ejs (used by HtmlWebpackPlugin, @see html5-webpack.yasnippet)
	//   - frontend/components/Sample/Sample.js
	//   - frontend/components/Dashboard/Dashboard.js
	//   - frontend/styles/ (storing global css files)
	//   - frontend-dist/
	//   - node_modules/
	//   - package.json (@see package-reactjs.yasnippet)
	//   - webpack.config.js (@see main-webpack.yasnippet)
	//   - .babelrc (file contents: {"presets": ["react", "es2015"], "plugins": ["transform-object-rest-spread"]})

	__webpack_require__(592); //ie 9

	// Client entry point
	// route saved into store

	// Initialize store

	/* eslint-disable no-underscore-dangle */
	var store = (0, _redux.createStore)((0, _redux.combineReducers)({
	  app: _RootReducer2.default,
	  routing: _reactRouterRedux.routerReducer
	}), {} /* initial state */
	// redux-devtools extension
	// https://github.com/zalmoxisus/redux-devtools-extension
	// - Install Chrome/Firefox addon
	// - Open develop toolbar on Chrome
	// - Or select redux `Redux DevTools` from web page
	// - will crash IE11
	);
	/* eslint-enable */

	// master page stylesheet

	var App = function (_React$Component) {
	  (0, _inherits3.default)(App, _React$Component);

	  function App(props) {
	    (0, _classCallCheck3.default)(this, App);
	    return (0, _possibleConstructorReturn3.default)(this, _React$Component.call(this, props));
	  }

	  App.prototype.render = function render() {
	    // "a full width container, spanning the entire width of your viewport', quoted from bootstrap docuemntation
	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(_MSNotification2.default, null),
	      this.props.children
	    );
	  };

	  return App;
	}(_react2.default.Component);

	// the path is relative to the root directory which defined in webpack.config.js
	//
	// resolve: {
	//   extensions: ['', '.js', '.jsx'],
	//   modules: [
	//     'frontend',
	//     'node_modules'
	//   ],
	//   // root for es2015 import
	//   // @see http://moduscreate.com/es6-es2015-import-no-relative-path-webpack/
	//   root: [
	//     path.resolve('./frontend/components')
	//   ]
	// }


	var rootRoute = {
	  // We use dynamic routes which can be changed programmically
	  // @see https://github.com/ReactTraining/react-router/blob/master/docs/API.md
	  path: (0, _CommonUtil.getRoutePath)(), // the reason we use dynamic route
	  component: App,
	  indexRoute: {
	    getComponent: function getComponent(nextState, cb) {
	      __webpack_require__.e/* nsure */(2, function (require) {
	        // use [yas] elisp error: Symbol's value as variable is void: \./Home/Home\.js if you prefer relative index.js
	        cb(null, __webpack_require__(388).default);
	      });
	    }
	  },
	  childRoutes: [{
	    path: 'sample',
	    getComponent: function getComponent(nextState, cb) {
	      __webpack_require__.e/* nsure */(1, function (require) {
	        cb(null, __webpack_require__(395).default);
	      });
	    }
	  }]
	};
	var history = (0, _reactRouterRedux.syncHistoryWithStore)(_reactRouter.browserHistory, store);

	(0, _reactDom.render)(_react2.default.createElement(
	  _reactRedux.Provider,
	  { store: store },
	  _react2.default.createElement(
	    _reactRouter.Router,
	    { history: history },
	    rootRoute
	  )
	), document.getElementById('app'));

/***/ }),

/***/ 27:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.default = routerWarning;
	exports._resetWarned = _resetWarned;

	var _warning = __webpack_require__(837);

	var _warning2 = _interopRequireDefault(_warning);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var warned = {};

	function routerWarning(falseToWarn, message) {
	  // Only issue deprecation warnings once.
	  if (message.indexOf('deprecated') !== -1) {
	    if (warned[message]) {
	      return;
	    }

	    warned[message] = true;
	  }

	  message = '[react-router] ' + message;

	  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	    args[_key - 2] = arguments[_key];
	  }

	  _warning2.default.apply(undefined, [falseToWarn, message].concat(args));
	}

	function _resetWarned() {
	  warned = {};
	}

/***/ }),

/***/ 51:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	'use strict';

	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */

	var warning = function() {};

	if (true) {
	  warning = function(condition, format, args) {
	    var len = arguments.length;
	    args = new Array(len > 2 ? len - 2 : 0);
	    for (var key = 2; key < len; key++) {
	      args[key - 2] = arguments[key];
	    }
	    if (format === undefined) {
	      throw new Error(
	        '`warning(condition, format, ...args)` requires a warning ' +
	        'message argument'
	      );
	    }

	    if (format.length < 10 || (/^[s\W]*$/).test(format)) {
	      throw new Error(
	        'The warning format should be able to uniquely identify this ' +
	        'warning. Please, use a more descriptive format than: ' + format
	      );
	    }

	    if (!condition) {
	      var argIndex = 0;
	      var message = 'Warning: ' +
	        format.replace(/%s/g, function() {
	          return args[argIndex++];
	        });
	      if (typeof console !== 'undefined') {
	        console.error(message);
	      }
	      try {
	        // This error was thrown as a convenience so that you can use this stack
	        // to find the callsite that caused this warning to fire.
	        throw new Error(message);
	      } catch(x) {}
	    }
	  };
	}

	module.exports = warning;


/***/ }),

/***/ 67:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.isReactChildren = isReactChildren;
	exports.createRouteFromReactElement = createRouteFromReactElement;
	exports.createRoutesFromReactChildren = createRoutesFromReactChildren;
	exports.createRoutes = createRoutes;

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _routerWarning = __webpack_require__(27);

	var _routerWarning2 = _interopRequireDefault(_routerWarning);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function isValidChild(object) {
	  return object == null || _react2.default.isValidElement(object);
	}

	function isReactChildren(object) {
	  return isValidChild(object) || Array.isArray(object) && object.every(isValidChild);
	}

	function checkPropTypes(componentName, propTypes, props) {
	  componentName = componentName || 'UnknownComponent';

	  for (var propName in propTypes) {
	    if (Object.prototype.hasOwnProperty.call(propTypes, propName)) {
	      var error = propTypes[propName](props, propName, componentName);

	      /* istanbul ignore if: error logging */
	      if (error instanceof Error)  true ? (0, _routerWarning2.default)(false, error.message) : void 0;
	    }
	  }
	}

	function createRoute(defaultProps, props) {
	  return _extends({}, defaultProps, props);
	}

	function createRouteFromReactElement(element) {
	  var type = element.type;
	  var route = createRoute(type.defaultProps, element.props);

	  if (type.propTypes) checkPropTypes(type.displayName || type.name, type.propTypes, route);

	  if (route.children) {
	    var childRoutes = createRoutesFromReactChildren(route.children, route);

	    if (childRoutes.length) route.childRoutes = childRoutes;

	    delete route.children;
	  }

	  return route;
	}

	/**
	 * Creates and returns a routes object from the given ReactChildren. JSX
	 * provides a convenient way to visualize how routes in the hierarchy are
	 * nested.
	 *
	 *   import { Route, createRoutesFromReactChildren } from 'react-router'
	 *   
	 *   const routes = createRoutesFromReactChildren(
	 *     <Route component={App}>
	 *       <Route path="home" component={Dashboard}/>
	 *       <Route path="news" component={NewsFeed}/>
	 *     </Route>
	 *   )
	 *
	 * Note: This method is automatically used when you provide <Route> children
	 * to a <Router> component.
	 */
	function createRoutesFromReactChildren(children, parentRoute) {
	  var routes = [];

	  _react2.default.Children.forEach(children, function (element) {
	    if (_react2.default.isValidElement(element)) {
	      // Component classes may have a static create* method.
	      if (element.type.createRouteFromReactElement) {
	        var route = element.type.createRouteFromReactElement(element, parentRoute);

	        if (route) routes.push(route);
	      } else {
	        routes.push(createRouteFromReactElement(element));
	      }
	    }
	  });

	  return routes;
	}

	/**
	 * Creates and returns an array of routes from the given object which
	 * may be a JSX route, a plain object route, or an array of either.
	 */
	function createRoutes(routes) {
	  if (isReactChildren(routes)) {
	    routes = createRoutesFromReactChildren(routes);
	  } else if (routes && !Array.isArray(routes)) {
	    routes = [routes];
	  }

	  return routes;
	}

/***/ }),

/***/ 73:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.extractPath = extractPath;
	exports.parsePath = parsePath;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _warning = __webpack_require__(51);

	var _warning2 = _interopRequireDefault(_warning);

	function extractPath(string) {
	  var match = string.match(/^https?:\/\/[^\/]*/);

	  if (match == null) return string;

	  return string.substring(match[0].length);
	}

	function parsePath(path) {
	  var pathname = extractPath(path);
	  var search = '';
	  var hash = '';

	   true ? _warning2['default'](path === pathname, 'A path must be pathname + search + hash only, not a fully qualified URL like "%s"', path) : undefined;

	  var hashIndex = pathname.indexOf('#');
	  if (hashIndex !== -1) {
	    hash = pathname.substring(hashIndex);
	    pathname = pathname.substring(0, hashIndex);
	  }

	  var searchIndex = pathname.indexOf('?');
	  if (searchIndex !== -1) {
	    search = pathname.substring(searchIndex);
	    pathname = pathname.substring(0, searchIndex);
	  }

	  if (pathname === '') pathname = '/';

	  return {
	    pathname: pathname,
	    search: search,
	    hash: hash
	  };
	}

/***/ }),

/***/ 76:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.routes = exports.route = exports.components = exports.component = exports.history = undefined;
	exports.falsy = falsy;

	var _react = __webpack_require__(1);

	var func = _react.PropTypes.func;
	var object = _react.PropTypes.object;
	var arrayOf = _react.PropTypes.arrayOf;
	var oneOfType = _react.PropTypes.oneOfType;
	var element = _react.PropTypes.element;
	var shape = _react.PropTypes.shape;
	var string = _react.PropTypes.string;
	function falsy(props, propName, componentName) {
	  if (props[propName]) return new Error('<' + componentName + '> should not have a "' + propName + '" prop');
	}

	var history = exports.history = shape({
	  listen: func.isRequired,
	  push: func.isRequired,
	  replace: func.isRequired,
	  go: func.isRequired,
	  goBack: func.isRequired,
	  goForward: func.isRequired
	});

	var component = exports.component = oneOfType([func, string]);
	var components = exports.components = oneOfType([component, object]);
	var route = exports.route = oneOfType([object, element]);
	var routes = exports.routes = oneOfType([route, arrayOf(route)]);

/***/ }),

/***/ 89:
/***/ (function(module, exports) {

	/**
	 * Indicates that navigation was caused by a call to history.push.
	 */
	'use strict';

	exports.__esModule = true;
	var PUSH = 'PUSH';

	exports.PUSH = PUSH;
	/**
	 * Indicates that navigation was caused by a call to history.replace.
	 */
	var REPLACE = 'REPLACE';

	exports.REPLACE = REPLACE;
	/**
	 * Indicates that navigation was caused by some other action such
	 * as using a browser's back/forward buttons and/or manually manipulating
	 * the URL in a browser's location bar. This is the default.
	 *
	 * See https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onpopstate
	 * for more information.
	 */
	var POP = 'POP';

	exports.POP = POP;
	exports['default'] = {
	  PUSH: PUSH,
	  REPLACE: REPLACE,
	  POP: POP
	};

/***/ }),

/***/ 94:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.compilePattern = compilePattern;
	exports.matchPattern = matchPattern;
	exports.getParamNames = getParamNames;
	exports.getParams = getParams;
	exports.formatPattern = formatPattern;

	var _invariant = __webpack_require__(16);

	var _invariant2 = _interopRequireDefault(_invariant);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function escapeRegExp(string) {
	  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	}

	function _compilePattern(pattern) {
	  var regexpSource = '';
	  var paramNames = [];
	  var tokens = [];

	  var match = void 0,
	      lastIndex = 0,
	      matcher = /:([a-zA-Z_$][a-zA-Z0-9_$]*)|\*\*|\*|\(|\)/g;
	  while (match = matcher.exec(pattern)) {
	    if (match.index !== lastIndex) {
	      tokens.push(pattern.slice(lastIndex, match.index));
	      regexpSource += escapeRegExp(pattern.slice(lastIndex, match.index));
	    }

	    if (match[1]) {
	      regexpSource += '([^/]+)';
	      paramNames.push(match[1]);
	    } else if (match[0] === '**') {
	      regexpSource += '(.*)';
	      paramNames.push('splat');
	    } else if (match[0] === '*') {
	      regexpSource += '(.*?)';
	      paramNames.push('splat');
	    } else if (match[0] === '(') {
	      regexpSource += '(?:';
	    } else if (match[0] === ')') {
	      regexpSource += ')?';
	    }

	    tokens.push(match[0]);

	    lastIndex = matcher.lastIndex;
	  }

	  if (lastIndex !== pattern.length) {
	    tokens.push(pattern.slice(lastIndex, pattern.length));
	    regexpSource += escapeRegExp(pattern.slice(lastIndex, pattern.length));
	  }

	  return {
	    pattern: pattern,
	    regexpSource: regexpSource,
	    paramNames: paramNames,
	    tokens: tokens
	  };
	}

	var CompiledPatternsCache = {};

	function compilePattern(pattern) {
	  if (!(pattern in CompiledPatternsCache)) CompiledPatternsCache[pattern] = _compilePattern(pattern);

	  return CompiledPatternsCache[pattern];
	}

	/**
	 * Attempts to match a pattern on the given pathname. Patterns may use
	 * the following special characters:
	 *
	 * - :paramName     Matches a URL segment up to the next /, ?, or #. The
	 *                  captured string is considered a "param"
	 * - ()             Wraps a segment of the URL that is optional
	 * - *              Consumes (non-greedy) all characters up to the next
	 *                  character in the pattern, or to the end of the URL if
	 *                  there is none
	 * - **             Consumes (greedy) all characters up to the next character
	 *                  in the pattern, or to the end of the URL if there is none
	 *
	 *  The function calls callback(error, matched) when finished.
	 * The return value is an object with the following properties:
	 *
	 * - remainingPathname
	 * - paramNames
	 * - paramValues
	 */
	function matchPattern(pattern, pathname) {
	  // Ensure pattern starts with leading slash for consistency with pathname.
	  if (pattern.charAt(0) !== '/') {
	    pattern = '/' + pattern;
	  }

	  var _compilePattern2 = compilePattern(pattern);

	  var regexpSource = _compilePattern2.regexpSource;
	  var paramNames = _compilePattern2.paramNames;
	  var tokens = _compilePattern2.tokens;


	  if (pattern.charAt(pattern.length - 1) !== '/') {
	    regexpSource += '/?'; // Allow optional path separator at end.
	  }

	  // Special-case patterns like '*' for catch-all routes.
	  if (tokens[tokens.length - 1] === '*') {
	    regexpSource += '$';
	  }

	  var match = pathname.match(new RegExp('^' + regexpSource, 'i'));
	  if (match == null) {
	    return null;
	  }

	  var matchedPath = match[0];
	  var remainingPathname = pathname.substr(matchedPath.length);

	  if (remainingPathname) {
	    // Require that the match ends at a path separator, if we didn't match
	    // the full path, so any remaining pathname is a new path segment.
	    if (matchedPath.charAt(matchedPath.length - 1) !== '/') {
	      return null;
	    }

	    // If there is a remaining pathname, treat the path separator as part of
	    // the remaining pathname for properly continuing the match.
	    remainingPathname = '/' + remainingPathname;
	  }

	  return {
	    remainingPathname: remainingPathname,
	    paramNames: paramNames,
	    paramValues: match.slice(1).map(function (v) {
	      return v && decodeURIComponent(v);
	    })
	  };
	}

	function getParamNames(pattern) {
	  return compilePattern(pattern).paramNames;
	}

	function getParams(pattern, pathname) {
	  var match = matchPattern(pattern, pathname);
	  if (!match) {
	    return null;
	  }

	  var paramNames = match.paramNames;
	  var paramValues = match.paramValues;

	  var params = {};

	  paramNames.forEach(function (paramName, index) {
	    params[paramName] = paramValues[index];
	  });

	  return params;
	}

	/**
	 * Returns a version of the given pattern with params interpolated. Throws
	 * if there is a dynamic segment of the pattern for which there is no param.
	 */
	function formatPattern(pattern, params) {
	  params = params || {};

	  var _compilePattern3 = compilePattern(pattern);

	  var tokens = _compilePattern3.tokens;

	  var parenCount = 0,
	      pathname = '',
	      splatIndex = 0;

	  var token = void 0,
	      paramName = void 0,
	      paramValue = void 0;
	  for (var i = 0, len = tokens.length; i < len; ++i) {
	    token = tokens[i];

	    if (token === '*' || token === '**') {
	      paramValue = Array.isArray(params.splat) ? params.splat[splatIndex++] : params.splat;

	      !(paramValue != null || parenCount > 0) ?  true ? (0, _invariant2.default)(false, 'Missing splat #%s for path "%s"', splatIndex, pattern) : (0, _invariant2.default)(false) : void 0;

	      if (paramValue != null) pathname += encodeURI(paramValue);
	    } else if (token === '(') {
	      parenCount += 1;
	    } else if (token === ')') {
	      parenCount -= 1;
	    } else if (token.charAt(0) === ':') {
	      paramName = token.substring(1);
	      paramValue = params[paramName];

	      !(paramValue != null || parenCount > 0) ?  true ? (0, _invariant2.default)(false, 'Missing "%s" parameter for path "%s"', paramName, pattern) : (0, _invariant2.default)(false) : void 0;

	      if (paramValue != null) pathname += encodeURIComponent(paramValue);
	    } else {
	      pathname += token;
	    }
	  }

	  return pathname.replace(/\/+/g, '/');
	}

/***/ }),

/***/ 96:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.multiFieldComparator = exports.validatorAlphaNumeric = exports.validatorRequired = exports.trim = exports.deleteJSON = exports.getJSON = exports.postJSON = exports.getRoutePath = exports.isIE = exports.isEmpty = exports.flatObject = undefined;

	var _stringify = __webpack_require__(397);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _extends2 = __webpack_require__(5);

	var _extends3 = _interopRequireDefault(_extends2);

	var _getIterator2 = __webpack_require__(244);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _keys = __webpack_require__(399);

	var _keys2 = _interopRequireDefault(_keys);

	__webpack_require__(859);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Mockup = null;
	if (true) {
	  Mockup = __webpack_require__(162);
	}

	// flatObject({a:'a1', b:{b1:'b1'}, c:{c1: 'c1'},
	//            {b: 1 } // 1 means ignore field 'b'
	//            {c: 2 } // 2 means spread field 'c'
	//           )
	// got: {a: 'a1', c:{c1: 'c1'}}
	function flatObject(obj, optionalIgnoreDict) {
	  var allKeys = (0, _keys2.default)(obj);
	  var newObj = {};
	  for (var _iterator = allKeys, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
	    var _ref;

	    if (_isArray) {
	      if (_i >= _iterator.length) break;
	      _ref = _iterator[_i++];
	    } else {
	      _i = _iterator.next();
	      if (_i.done) break;
	      _ref = _i.value;
	    }

	    var key = _ref;

	    if (!optionalIgnoreDict || !optionalIgnoreDict[key]) {
	      // copy element
	      newObj[key] = obj[key];
	    } else if (optionalIgnoreDict[key] === 1) {
	      // just ignore
	      // do nothing
	    } else if (optionalIgnoreDict[key] === 2) {
	      // spread obj[key] into newObj
	      for (var _iterator2 = (0, _keys2.default)(obj[key]), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : (0, _getIterator3.default)(_iterator2);;) {
	        var _ref2;

	        if (_isArray2) {
	          if (_i2 >= _iterator2.length) break;
	          _ref2 = _iterator2[_i2++];
	        } else {
	          _i2 = _iterator2.next();
	          if (_i2.done) break;
	          _ref2 = _i2.value;
	        }

	        var k = _ref2;

	        newObj[k] = obj[key][k];
	      }
	    }
	  }
	  return newObj;
	}

	function isIE() {
	  // @see https://github.com/gagle/js-ie-version/blob/master/lib/ie-version.js
	  //"!win.ActiveXObject" is evaluated to true in IE11
	  return window.ActiveXObject !== undefined;
	}

	function getRoutePath(p) {
	  return ( true ? '/' : '/') + (p ? p : '');
	}

	// {{ RESTful API
	function postJSON(url, data, optionalHeaders) {
	  // return promise
	  if (true) {
	    return Mockup.fakedFetch(url, 'POST', data, optionalHeaders);
	  }

	  return fetch(url, {
	    method: 'POST',
	    headers: (0, _extends3.default)({
	      'Content-Type': 'application/json'
	    }, optionalHeaders),
	    body: (0, _stringify2.default)(data)
	  }).then(function (response) {
	    return response.json();
	  });
	}

	function getJSON(url, optionalHeaders) {
	  if (/\?/.test(url)) {
	    // work around ie cache issue
	    url += '&tm=' + new Date().getTime();
	  }
	  if (true) {
	    return Mockup.fakedFetch(url, 'GET', {}, optionalHeaders);
	  }
	  // return promise
	  return fetch(url, {
	    method: 'GET',
	    headers: (0, _extends3.default)({ 'Content-Type': 'application/json' }, optionalHeaders)
	  }).then(function (response) {
	    return response.json();
	  });
	}

	function deleteJSON(url, optionalHeaders) {
	  if (true) {
	    return Mockup.fakedFetch(url, 'DELETE', {}, optionalHeaders);
	  }

	  // return promise
	  return fetch(url, {
	    method: 'DELETE',
	    headers: (0, _extends3.default)({}, optionalHeaders)
	  }).then(function (response) {
	    return response.json();
	  });
	}
	// }}

	function trim(s) {
	  return s.replace(/^[\s]+|[\s]+$/g, '');
	}

	function validatorRequired(val) {
	  console.log('CommonUtil.js: validatorRequired called => ', 'val=', val);
	  return val && val.length > 0;
	}

	function validatorAlphaNumeric(val) {
	  console.log('CommonUtil.js: validatorAlphaNumeric called => ', 'val=', val);
	  return (/^[a-zA-Z0-9]+$/.test(val)
	  );
	}

	function isEmpty(value) {
	  return value === undefined || value === null;
	}

	var multiFieldComparator = function multiFieldComparator(fields) {
	  return function (a, b) {

	    for (var _iterator3 = fields, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : (0, _getIterator3.default)(_iterator3);;) {
	      var _ref3;

	      if (_isArray3) {
	        if (_i3 >= _iterator3.length) break;
	        _ref3 = _iterator3[_i3++];
	      } else {
	        _i3 = _iterator3.next();
	        if (_i3.done) break;
	        _ref3 = _i3.value;
	      }

	      var f = _ref3;

	      if (a[f.prop] === b[f.prop]) {
	        continue;
	      }
	      if (a[f.prop] > b[f.prop]) {
	        return 1 * f.direction;
	      } else {
	        return -1 * f.direction;
	      }
	    }

	    return 0;
	  };
	};

	exports.flatObject = flatObject;
	exports.isEmpty = isEmpty;
	exports.isIE = isIE;
	exports.getRoutePath = getRoutePath;
	exports.postJSON = postJSON;
	exports.getJSON = getJSON;
	exports.deleteJSON = deleteJSON;
	exports.trim = trim;
	exports.validatorRequired = validatorRequired;
	exports.validatorAlphaNumeric = validatorAlphaNumeric;
	exports.multiFieldComparator = multiFieldComparator;

/***/ }),

/***/ 136:
/***/ (function(module, exports) {

	'use strict';

	exports.__esModule = true;
	var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
	exports.canUseDOM = canUseDOM;

/***/ }),

/***/ 137:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _warning = __webpack_require__(51);

	var _warning2 = _interopRequireDefault(_warning);

	var _queryString = __webpack_require__(621);

	var _runTransitionHook = __webpack_require__(198);

	var _runTransitionHook2 = _interopRequireDefault(_runTransitionHook);

	var _PathUtils = __webpack_require__(73);

	var _deprecate = __webpack_require__(197);

	var _deprecate2 = _interopRequireDefault(_deprecate);

	var SEARCH_BASE_KEY = '$searchBase';

	function defaultStringifyQuery(query) {
	  return _queryString.stringify(query).replace(/%20/g, '+');
	}

	var defaultParseQueryString = _queryString.parse;

	function isNestedObject(object) {
	  for (var p in object) {
	    if (Object.prototype.hasOwnProperty.call(object, p) && typeof object[p] === 'object' && !Array.isArray(object[p]) && object[p] !== null) return true;
	  }return false;
	}

	/**
	 * Returns a new createHistory function that may be used to create
	 * history objects that know how to handle URL queries.
	 */
	function useQueries(createHistory) {
	  return function () {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    var history = createHistory(options);

	    var stringifyQuery = options.stringifyQuery;
	    var parseQueryString = options.parseQueryString;

	    if (typeof stringifyQuery !== 'function') stringifyQuery = defaultStringifyQuery;

	    if (typeof parseQueryString !== 'function') parseQueryString = defaultParseQueryString;

	    function addQuery(location) {
	      if (location.query == null) {
	        var search = location.search;

	        location.query = parseQueryString(search.substring(1));
	        location[SEARCH_BASE_KEY] = { search: search, searchBase: '' };
	      }

	      // TODO: Instead of all the book-keeping here, this should just strip the
	      // stringified query from the search.

	      return location;
	    }

	    function appendQuery(location, query) {
	      var _extends2;

	      var searchBaseSpec = location[SEARCH_BASE_KEY];
	      var queryString = query ? stringifyQuery(query) : '';
	      if (!searchBaseSpec && !queryString) {
	        return location;
	      }

	       true ? _warning2['default'](stringifyQuery !== defaultStringifyQuery || !isNestedObject(query), 'useQueries does not stringify nested query objects by default; ' + 'use a custom stringifyQuery function') : undefined;

	      if (typeof location === 'string') location = _PathUtils.parsePath(location);

	      var searchBase = undefined;
	      if (searchBaseSpec && location.search === searchBaseSpec.search) {
	        searchBase = searchBaseSpec.searchBase;
	      } else {
	        searchBase = location.search || '';
	      }

	      var search = searchBase;
	      if (queryString) {
	        search += (search ? '&' : '?') + queryString;
	      }

	      return _extends({}, location, (_extends2 = {
	        search: search
	      }, _extends2[SEARCH_BASE_KEY] = { search: search, searchBase: searchBase }, _extends2));
	    }

	    // Override all read methods with query-aware versions.
	    function listenBefore(hook) {
	      return history.listenBefore(function (location, callback) {
	        _runTransitionHook2['default'](hook, addQuery(location), callback);
	      });
	    }

	    function listen(listener) {
	      return history.listen(function (location) {
	        listener(addQuery(location));
	      });
	    }

	    // Override all write methods with query-aware versions.
	    function push(location) {
	      history.push(appendQuery(location, location.query));
	    }

	    function replace(location) {
	      history.replace(appendQuery(location, location.query));
	    }

	    function createPath(location, query) {
	       true ? _warning2['default'](!query, 'the query argument to createPath is deprecated; use a location descriptor instead') : undefined;

	      return history.createPath(appendQuery(location, query || location.query));
	    }

	    function createHref(location, query) {
	       true ? _warning2['default'](!query, 'the query argument to createHref is deprecated; use a location descriptor instead') : undefined;

	      return history.createHref(appendQuery(location, query || location.query));
	    }

	    function createLocation(location) {
	      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	      }

	      var fullLocation = history.createLocation.apply(history, [appendQuery(location, location.query)].concat(args));
	      if (location.query) {
	        fullLocation.query = location.query;
	      }
	      return addQuery(fullLocation);
	    }

	    // deprecated
	    function pushState(state, path, query) {
	      if (typeof path === 'string') path = _PathUtils.parsePath(path);

	      push(_extends({ state: state }, path, { query: query }));
	    }

	    // deprecated
	    function replaceState(state, path, query) {
	      if (typeof path === 'string') path = _PathUtils.parsePath(path);

	      replace(_extends({ state: state }, path, { query: query }));
	    }

	    return _extends({}, history, {
	      listenBefore: listenBefore,
	      listen: listen,
	      push: push,
	      replace: replace,
	      createPath: createPath,
	      createHref: createHref,
	      createLocation: createLocation,

	      pushState: _deprecate2['default'](pushState, 'pushState is deprecated; use push instead'),
	      replaceState: _deprecate2['default'](replaceState, 'replaceState is deprecated; use replace instead')
	    });
	  };
	}

	exports['default'] = useQueries;
	module.exports = exports['default'];

/***/ }),

/***/ 159:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _invariant = __webpack_require__(16);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _deprecateObjectProperties = __webpack_require__(160);

	var _deprecateObjectProperties2 = _interopRequireDefault(_deprecateObjectProperties);

	var _getRouteParams = __webpack_require__(829);

	var _getRouteParams2 = _interopRequireDefault(_getRouteParams);

	var _RouteUtils = __webpack_require__(67);

	var _routerWarning = __webpack_require__(27);

	var _routerWarning2 = _interopRequireDefault(_routerWarning);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _React$PropTypes = _react2.default.PropTypes;
	var array = _React$PropTypes.array;
	var func = _React$PropTypes.func;
	var object = _React$PropTypes.object;

	/**
	 * A <RouterContext> renders the component tree for a given router state
	 * and sets the history object and the current location in context.
	 */

	var RouterContext = _react2.default.createClass({
	  displayName: 'RouterContext',


	  propTypes: {
	    history: object,
	    router: object.isRequired,
	    location: object.isRequired,
	    routes: array.isRequired,
	    params: object.isRequired,
	    components: array.isRequired,
	    createElement: func.isRequired
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      createElement: _react2.default.createElement
	    };
	  },


	  childContextTypes: {
	    history: object,
	    location: object.isRequired,
	    router: object.isRequired
	  },

	  getChildContext: function getChildContext() {
	    var _props = this.props;
	    var router = _props.router;
	    var history = _props.history;
	    var location = _props.location;

	    if (!router) {
	       true ? (0, _routerWarning2.default)(false, '`<RouterContext>` expects a `router` rather than a `history`') : void 0;

	      router = _extends({}, history, {
	        setRouteLeaveHook: history.listenBeforeLeavingRoute
	      });
	      delete router.listenBeforeLeavingRoute;
	    }

	    if (true) {
	      location = (0, _deprecateObjectProperties2.default)(location, '`context.location` is deprecated, please use a route component\'s `props.location` instead. http://tiny.cc/router-accessinglocation');
	    }

	    return { history: history, location: location, router: router };
	  },
	  createElement: function createElement(component, props) {
	    return component == null ? null : this.props.createElement(component, props);
	  },
	  render: function render() {
	    var _this = this;

	    var _props2 = this.props;
	    var history = _props2.history;
	    var location = _props2.location;
	    var routes = _props2.routes;
	    var params = _props2.params;
	    var components = _props2.components;

	    var element = null;

	    if (components) {
	      element = components.reduceRight(function (element, components, index) {
	        if (components == null) return element; // Don't create new children; use the grandchildren.

	        var route = routes[index];
	        var routeParams = (0, _getRouteParams2.default)(route, params);
	        var props = {
	          history: history,
	          location: location,
	          params: params,
	          route: route,
	          routeParams: routeParams,
	          routes: routes
	        };

	        if ((0, _RouteUtils.isReactChildren)(element)) {
	          props.children = element;
	        } else if (element) {
	          for (var prop in element) {
	            if (Object.prototype.hasOwnProperty.call(element, prop)) props[prop] = element[prop];
	          }
	        }

	        if ((typeof components === 'undefined' ? 'undefined' : _typeof(components)) === 'object') {
	          var elements = {};

	          for (var key in components) {
	            if (Object.prototype.hasOwnProperty.call(components, key)) {
	              // Pass through the key as a prop to createElement to allow
	              // custom createElement functions to know which named component
	              // they're rendering, for e.g. matching up to fetched data.
	              elements[key] = _this.createElement(components[key], _extends({
	                key: key }, props));
	            }
	          }

	          return elements;
	        }

	        return _this.createElement(components, props);
	      }, element);
	    }

	    !(element === null || element === false || _react2.default.isValidElement(element)) ?  true ? (0, _invariant2.default)(false, 'The root route must render a single element') : (0, _invariant2.default)(false) : void 0;

	    return element;
	  }
	});

	exports.default = RouterContext;
	module.exports = exports['default'];

/***/ }),

/***/ 160:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.canUseMembrane = undefined;

	var _routerWarning = __webpack_require__(27);

	var _routerWarning2 = _interopRequireDefault(_routerWarning);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var canUseMembrane = exports.canUseMembrane = false;

	// No-op by default.
	var deprecateObjectProperties = function deprecateObjectProperties(object) {
	  return object;
	};

	if (true) {
	  try {
	    if (Object.defineProperty({}, 'x', {
	      get: function get() {
	        return true;
	      }
	    }).x) {
	      exports.canUseMembrane = canUseMembrane = true;
	    }
	    /* eslint-disable no-empty */
	  } catch (e) {}
	  /* eslint-enable no-empty */

	  if (canUseMembrane) {
	    deprecateObjectProperties = function deprecateObjectProperties(object, message) {
	      // Wrap the deprecated object in a membrane to warn on property access.
	      var membrane = {};

	      var _loop = function _loop(prop) {
	        if (!Object.prototype.hasOwnProperty.call(object, prop)) {
	          return 'continue';
	        }

	        if (typeof object[prop] === 'function') {
	          // Can't use fat arrow here because of use of arguments below.
	          membrane[prop] = function () {
	             true ? (0, _routerWarning2.default)(false, message) : void 0;
	            return object[prop].apply(object, arguments);
	          };
	          return 'continue';
	        }

	        // These properties are non-enumerable to prevent React dev tools from
	        // seeing them and causing spurious warnings when accessing them. In
	        // principle this could be done with a proxy, but support for the
	        // ownKeys trap on proxies is not universal, even among browsers that
	        // otherwise support proxies.
	        Object.defineProperty(membrane, prop, {
	          get: function get() {
	             true ? (0, _routerWarning2.default)(false, message) : void 0;
	            return object[prop];
	          }
	        });
	      };

	      for (var prop in object) {
	        var _ret = _loop(prop);

	        if (_ret === 'continue') continue;
	      }

	      return membrane;
	    };
	  }
	}

	exports.default = deprecateObjectProperties;

/***/ }),

/***/ 162:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _getIterator2 = __webpack_require__(244);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _promise = __webpack_require__(246);

	var _promise2 = _interopRequireDefault(_promise);

	exports.fakedFetch = fakedFetch;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function fakedFetch(url, method, data, optionalHeaders) {
	  console.log('Mockup.js: fakedFetch called', 'url=', url, 'method=', method, 'data=', data);
	  // name of mockup js file should follow existing examples
	  var mockupMatrix = [{ regex: /api\/test$/, file: './test.mock.js' }];

	  for (var _iterator = mockupMatrix, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
	    var _ref;

	    if (_isArray) {
	      if (_i >= _iterator.length) break;
	      _ref = _iterator[_i++];
	    } else {
	      _i = _iterator.next();
	      if (_i.done) break;
	      _ref = _i.value;
	    }

	    var row = _ref;

	    if (row.regex.test(url)) {
	      return __webpack_require__(386)(row.file)[method](url, data, optionalHeaders);
	    }
	  }
	  // unknown API
	  return new _promise2.default();
	}

/***/ }),

/***/ 168:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	// 25.4.1.5 NewPromiseCapability(C)
	var aFunction = __webpack_require__(119);

	function PromiseCapability(C) {
	  var resolve, reject;
	  this.promise = new C(function ($$resolve, $$reject) {
	    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject = $$reject;
	  });
	  this.resolve = aFunction(resolve);
	  this.reject = aFunction(reject);
	}

	module.exports.f = function (C) {
	  return new PromiseCapability(C);
	};


/***/ }),

/***/ 196:
/***/ (function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports.addEventListener = addEventListener;
	exports.removeEventListener = removeEventListener;
	exports.getHashPath = getHashPath;
	exports.replaceHashPath = replaceHashPath;
	exports.getWindowPath = getWindowPath;
	exports.go = go;
	exports.getUserConfirmation = getUserConfirmation;
	exports.supportsHistory = supportsHistory;
	exports.supportsGoWithoutReloadUsingHash = supportsGoWithoutReloadUsingHash;

	function addEventListener(node, event, listener) {
	  if (node.addEventListener) {
	    node.addEventListener(event, listener, false);
	  } else {
	    node.attachEvent('on' + event, listener);
	  }
	}

	function removeEventListener(node, event, listener) {
	  if (node.removeEventListener) {
	    node.removeEventListener(event, listener, false);
	  } else {
	    node.detachEvent('on' + event, listener);
	  }
	}

	function getHashPath() {
	  // We can't use window.location.hash here because it's not
	  // consistent across browsers - Firefox will pre-decode it!
	  return window.location.href.split('#')[1] || '';
	}

	function replaceHashPath(path) {
	  window.location.replace(window.location.pathname + window.location.search + '#' + path);
	}

	function getWindowPath() {
	  return window.location.pathname + window.location.search + window.location.hash;
	}

	function go(n) {
	  if (n) window.history.go(n);
	}

	function getUserConfirmation(message, callback) {
	  callback(window.confirm(message));
	}

	/**
	 * Returns true if the HTML5 history API is supported. Taken from Modernizr.
	 *
	 * https://github.com/Modernizr/Modernizr/blob/master/LICENSE
	 * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js
	 * changed to avoid false negatives for Windows Phones: https://github.com/rackt/react-router/issues/586
	 */

	function supportsHistory() {
	  var ua = navigator.userAgent;
	  if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) {
	    return false;
	  }
	  return window.history && 'pushState' in window.history;
	}

	/**
	 * Returns false if using go(n) with hash history causes a full page reload.
	 */

	function supportsGoWithoutReloadUsingHash() {
	  var ua = navigator.userAgent;
	  return ua.indexOf('Firefox') === -1;
	}

/***/ }),

/***/ 197:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _warning = __webpack_require__(51);

	var _warning2 = _interopRequireDefault(_warning);

	function deprecate(fn, message) {
	  return function () {
	     true ? _warning2['default'](false, '[history] ' + message) : undefined;
	    return fn.apply(this, arguments);
	  };
	}

	exports['default'] = deprecate;
	module.exports = exports['default'];

/***/ }),

/***/ 198:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _warning = __webpack_require__(51);

	var _warning2 = _interopRequireDefault(_warning);

	function runTransitionHook(hook, location, callback) {
	  var result = hook(location, callback);

	  if (hook.length < 2) {
	    // Assume the hook runs synchronously and automatically
	    // call the callback with the return value.
	    callback(result);
	  } else {
	     true ? _warning2['default'](result === undefined, 'You should not "return" in a transition hook with a callback argument; call the callback instead') : undefined;
	  }
	}

	exports['default'] = runTransitionHook;
	module.exports = exports['default'];

/***/ }),

/***/ 235:
/***/ (function(module, exports) {

	"use strict";

	exports.__esModule = true;
	exports.loopAsync = loopAsync;
	exports.mapAsync = mapAsync;
	function loopAsync(turns, work, callback) {
	  var currentTurn = 0,
	      isDone = false;
	  var sync = false,
	      hasNext = false,
	      doneArgs = void 0;

	  function done() {
	    isDone = true;
	    if (sync) {
	      // Iterate instead of recursing if possible.
	      doneArgs = [].concat(Array.prototype.slice.call(arguments));
	      return;
	    }

	    callback.apply(this, arguments);
	  }

	  function next() {
	    if (isDone) {
	      return;
	    }

	    hasNext = true;
	    if (sync) {
	      // Iterate instead of recursing if possible.
	      return;
	    }

	    sync = true;

	    while (!isDone && currentTurn < turns && hasNext) {
	      hasNext = false;
	      work.call(this, currentTurn++, next, done);
	    }

	    sync = false;

	    if (isDone) {
	      // This means the loop finished synchronously.
	      callback.apply(this, doneArgs);
	      return;
	    }

	    if (currentTurn >= turns && hasNext) {
	      isDone = true;
	      callback();
	    }
	  }

	  next();
	}

	function mapAsync(array, work, callback) {
	  var length = array.length;
	  var values = [];

	  if (length === 0) return callback(null, values);

	  var isDone = false,
	      doneCount = 0;

	  function done(index, error, value) {
	    if (isDone) return;

	    if (error) {
	      isDone = true;
	      callback(error);
	    } else {
	      values[index] = value;

	      isDone = ++doneCount === length;

	      if (isDone) callback(null, values);
	    }
	  }

	  array.forEach(function (item, index) {
	    work(item, index, function (error, value) {
	      done(index, error, value);
	    });
	  });
	}

/***/ }),

/***/ 236:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.router = exports.routes = exports.route = exports.components = exports.component = exports.location = exports.history = exports.falsy = exports.locationShape = exports.routerShape = undefined;

	var _react = __webpack_require__(1);

	var _deprecateObjectProperties = __webpack_require__(160);

	var _deprecateObjectProperties2 = _interopRequireDefault(_deprecateObjectProperties);

	var _InternalPropTypes = __webpack_require__(76);

	var InternalPropTypes = _interopRequireWildcard(_InternalPropTypes);

	var _routerWarning = __webpack_require__(27);

	var _routerWarning2 = _interopRequireDefault(_routerWarning);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var func = _react.PropTypes.func;
	var object = _react.PropTypes.object;
	var shape = _react.PropTypes.shape;
	var string = _react.PropTypes.string;
	var routerShape = exports.routerShape = shape({
	  push: func.isRequired,
	  replace: func.isRequired,
	  go: func.isRequired,
	  goBack: func.isRequired,
	  goForward: func.isRequired,
	  setRouteLeaveHook: func.isRequired,
	  isActive: func.isRequired
	});

	var locationShape = exports.locationShape = shape({
	  pathname: string.isRequired,
	  search: string.isRequired,
	  state: object,
	  action: string.isRequired,
	  key: string
	});

	// Deprecated stuff below:

	var falsy = exports.falsy = InternalPropTypes.falsy;
	var history = exports.history = InternalPropTypes.history;
	var location = exports.location = locationShape;
	var component = exports.component = InternalPropTypes.component;
	var components = exports.components = InternalPropTypes.components;
	var route = exports.route = InternalPropTypes.route;
	var routes = exports.routes = InternalPropTypes.routes;
	var router = exports.router = routerShape;

	if (true) {
	  (function () {
	    var deprecatePropType = function deprecatePropType(propType, message) {
	      return function () {
	         true ? (0, _routerWarning2.default)(false, message) : void 0;
	        return propType.apply(undefined, arguments);
	      };
	    };

	    var deprecateInternalPropType = function deprecateInternalPropType(propType) {
	      return deprecatePropType(propType, 'This prop type is not intended for external use, and was previously exported by mistake. These internal prop types are deprecated for external use, and will be removed in a later version.');
	    };

	    var deprecateRenamedPropType = function deprecateRenamedPropType(propType, name) {
	      return deprecatePropType(propType, 'The `' + name + '` prop type is now exported as `' + name + 'Shape` to avoid name conflicts. This export is deprecated and will be removed in a later version.');
	    };

	    exports.falsy = falsy = deprecateInternalPropType(falsy);
	    exports.history = history = deprecateInternalPropType(history);
	    exports.component = component = deprecateInternalPropType(component);
	    exports.components = components = deprecateInternalPropType(components);
	    exports.route = route = deprecateInternalPropType(route);
	    exports.routes = routes = deprecateInternalPropType(routes);

	    exports.location = location = deprecateRenamedPropType(location, 'location');
	    exports.router = router = deprecateRenamedPropType(router, 'router');
	  })();
	}

	var defaultExport = {
	  falsy: falsy,
	  history: history,
	  location: location,
	  component: component,
	  components: components,
	  route: route,
	  // For some reason, routes was never here.
	  router: router
	};

	if (true) {
	  defaultExport = (0, _deprecateObjectProperties2.default)(defaultExport, 'The default export from `react-router/lib/PropTypes` is deprecated. Please use the named exports instead.');
	}

	exports.default = defaultExport;

/***/ }),

/***/ 237:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = createTransitionManager;

	var _routerWarning = __webpack_require__(27);

	var _routerWarning2 = _interopRequireDefault(_routerWarning);

	var _Actions = __webpack_require__(89);

	var _computeChangedRoutes2 = __webpack_require__(827);

	var _computeChangedRoutes3 = _interopRequireDefault(_computeChangedRoutes2);

	var _TransitionUtils = __webpack_require__(824);

	var _isActive2 = __webpack_require__(832);

	var _isActive3 = _interopRequireDefault(_isActive2);

	var _getComponents = __webpack_require__(828);

	var _getComponents2 = _interopRequireDefault(_getComponents);

	var _matchRoutes = __webpack_require__(834);

	var _matchRoutes2 = _interopRequireDefault(_matchRoutes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function hasAnyProperties(object) {
	  for (var p in object) {
	    if (Object.prototype.hasOwnProperty.call(object, p)) return true;
	  }return false;
	}

	function createTransitionManager(history, routes) {
	  var state = {};

	  // Signature should be (location, indexOnly), but needs to support (path,
	  // query, indexOnly)
	  function isActive(location) {
	    var indexOnlyOrDeprecatedQuery = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	    var deprecatedIndexOnly = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

	    var indexOnly = void 0;
	    if (indexOnlyOrDeprecatedQuery && indexOnlyOrDeprecatedQuery !== true || deprecatedIndexOnly !== null) {
	       true ? (0, _routerWarning2.default)(false, '`isActive(pathname, query, indexOnly) is deprecated; use `isActive(location, indexOnly)` with a location descriptor instead. http://tiny.cc/router-isActivedeprecated') : void 0;
	      location = { pathname: location, query: indexOnlyOrDeprecatedQuery };
	      indexOnly = deprecatedIndexOnly || false;
	    } else {
	      location = history.createLocation(location);
	      indexOnly = indexOnlyOrDeprecatedQuery;
	    }

	    return (0, _isActive3.default)(location, indexOnly, state.location, state.routes, state.params);
	  }

	  function createLocationFromRedirectInfo(location) {
	    return history.createLocation(location, _Actions.REPLACE);
	  }

	  var partialNextState = void 0;

	  function match(location, callback) {
	    if (partialNextState && partialNextState.location === location) {
	      // Continue from where we left off.
	      finishMatch(partialNextState, callback);
	    } else {
	      (0, _matchRoutes2.default)(routes, location, function (error, nextState) {
	        if (error) {
	          callback(error);
	        } else if (nextState) {
	          finishMatch(_extends({}, nextState, { location: location }), callback);
	        } else {
	          callback();
	        }
	      });
	    }
	  }

	  function finishMatch(nextState, callback) {
	    var _computeChangedRoutes = (0, _computeChangedRoutes3.default)(state, nextState);

	    var leaveRoutes = _computeChangedRoutes.leaveRoutes;
	    var changeRoutes = _computeChangedRoutes.changeRoutes;
	    var enterRoutes = _computeChangedRoutes.enterRoutes;


	    (0, _TransitionUtils.runLeaveHooks)(leaveRoutes);

	    // Tear down confirmation hooks for left routes
	    leaveRoutes.filter(function (route) {
	      return enterRoutes.indexOf(route) === -1;
	    }).forEach(removeListenBeforeHooksForRoute);

	    // change and enter hooks are run in series
	    (0, _TransitionUtils.runChangeHooks)(changeRoutes, state, nextState, function (error, redirectInfo) {
	      if (error || redirectInfo) return handleErrorOrRedirect(error, redirectInfo);

	      (0, _TransitionUtils.runEnterHooks)(enterRoutes, nextState, finishEnterHooks);
	    });

	    function finishEnterHooks(error, redirectInfo) {
	      if (error || redirectInfo) return handleErrorOrRedirect(error, redirectInfo);

	      // TODO: Fetch components after state is updated.
	      (0, _getComponents2.default)(nextState, function (error, components) {
	        if (error) {
	          callback(error);
	        } else {
	          // TODO: Make match a pure function and have some other API
	          // for "match and update state".
	          callback(null, null, state = _extends({}, nextState, { components: components }));
	        }
	      });
	    }

	    function handleErrorOrRedirect(error, redirectInfo) {
	      if (error) callback(error);else callback(null, createLocationFromRedirectInfo(redirectInfo));
	    }
	  }

	  var RouteGuid = 1;

	  function getRouteID(route) {
	    var create = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

	    return route.__id__ || create && (route.__id__ = RouteGuid++);
	  }

	  var RouteHooks = Object.create(null);

	  function getRouteHooksForRoutes(routes) {
	    return routes.reduce(function (hooks, route) {
	      hooks.push.apply(hooks, RouteHooks[getRouteID(route)]);
	      return hooks;
	    }, []);
	  }

	  function transitionHook(location, callback) {
	    (0, _matchRoutes2.default)(routes, location, function (error, nextState) {
	      if (nextState == null) {
	        // TODO: We didn't actually match anything, but hang
	        // onto error/nextState so we don't have to matchRoutes
	        // again in the listen callback.
	        callback();
	        return;
	      }

	      // Cache some state here so we don't have to
	      // matchRoutes() again in the listen callback.
	      partialNextState = _extends({}, nextState, { location: location });

	      var hooks = getRouteHooksForRoutes((0, _computeChangedRoutes3.default)(state, partialNextState).leaveRoutes);

	      var result = void 0;
	      for (var i = 0, len = hooks.length; result == null && i < len; ++i) {
	        // Passing the location arg here indicates to
	        // the user that this is a transition hook.
	        result = hooks[i](location);
	      }

	      callback(result);
	    });
	  }

	  /* istanbul ignore next: untestable with Karma */
	  function beforeUnloadHook() {
	    // Synchronously check to see if any route hooks want
	    // to prevent the current window/tab from closing.
	    if (state.routes) {
	      var hooks = getRouteHooksForRoutes(state.routes);

	      var message = void 0;
	      for (var i = 0, len = hooks.length; typeof message !== 'string' && i < len; ++i) {
	        // Passing no args indicates to the user that this is a
	        // beforeunload hook. We don't know the next location.
	        message = hooks[i]();
	      }

	      return message;
	    }
	  }

	  var unlistenBefore = void 0,
	      unlistenBeforeUnload = void 0;

	  function removeListenBeforeHooksForRoute(route) {
	    var routeID = getRouteID(route, false);
	    if (!routeID) {
	      return;
	    }

	    delete RouteHooks[routeID];

	    if (!hasAnyProperties(RouteHooks)) {
	      // teardown transition & beforeunload hooks
	      if (unlistenBefore) {
	        unlistenBefore();
	        unlistenBefore = null;
	      }

	      if (unlistenBeforeUnload) {
	        unlistenBeforeUnload();
	        unlistenBeforeUnload = null;
	      }
	    }
	  }

	  /**
	   * Registers the given hook function to run before leaving the given route.
	   *
	   * During a normal transition, the hook function receives the next location
	   * as its only argument and must return either a) a prompt message to show
	   * the user, to make sure they want to leave the page or b) false, to prevent
	   * the transition.
	   *
	   * During the beforeunload event (in browsers) the hook receives no arguments.
	   * In this case it must return a prompt message to prevent the transition.
	   *
	   * Returns a function that may be used to unbind the listener.
	   */
	  function listenBeforeLeavingRoute(route, hook) {
	    // TODO: Warn if they register for a route that isn't currently
	    // active. They're probably doing something wrong, like re-creating
	    // route objects on every location change.
	    var routeID = getRouteID(route);
	    var hooks = RouteHooks[routeID];

	    if (!hooks) {
	      var thereWereNoRouteHooks = !hasAnyProperties(RouteHooks);

	      RouteHooks[routeID] = [hook];

	      if (thereWereNoRouteHooks) {
	        // setup transition & beforeunload hooks
	        unlistenBefore = history.listenBefore(transitionHook);

	        if (history.listenBeforeUnload) unlistenBeforeUnload = history.listenBeforeUnload(beforeUnloadHook);
	      }
	    } else {
	      if (hooks.indexOf(hook) === -1) {
	         true ? (0, _routerWarning2.default)(false, 'adding multiple leave hooks for the same route is deprecated; manage multiple confirmations in your own code instead') : void 0;

	        hooks.push(hook);
	      }
	    }

	    return function () {
	      var hooks = RouteHooks[routeID];

	      if (hooks) {
	        var newHooks = hooks.filter(function (item) {
	          return item !== hook;
	        });

	        if (newHooks.length === 0) {
	          removeListenBeforeHooksForRoute(route);
	        } else {
	          RouteHooks[routeID] = newHooks;
	        }
	      }
	    };
	  }

	  /**
	   * This is the API for stateful environments. As the location
	   * changes, we update state and call the listener. We can also
	   * gracefully handle errors and redirects.
	   */
	  function listen(listener) {
	    // TODO: Only use a single history listener. Otherwise we'll
	    // end up with multiple concurrent calls to match.
	    return history.listen(function (location) {
	      if (state.location === location) {
	        listener(null, state);
	      } else {
	        match(location, function (error, redirectLocation, nextState) {
	          if (error) {
	            listener(error);
	          } else if (redirectLocation) {
	            history.transitionTo(redirectLocation);
	          } else if (nextState) {
	            listener(null, nextState);
	          } else {
	             true ? (0, _routerWarning2.default)(false, 'Location "%s" did not match any routes', location.pathname + location.search + location.hash) : void 0;
	          }
	        });
	      }
	    });
	  }

	  return {
	    isActive: isActive,
	    match: match,
	    listenBeforeLeavingRoute: listenBeforeLeavingRoute,
	    listen: listen
	  };
	}

	//export default useRoutes
	module.exports = exports['default'];

/***/ }),

/***/ 243:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _promise = __webpack_require__(246);

	var _promise2 = _interopRequireDefault(_promise);

	exports.POST = POST;
	exports.DELETE = DELETE;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function POST(url, data, headers) {
	  console.log('test.mock.js: POST called', 'url=', url, 'data=', data);
	  return new _promise2.default(function (resolve, reject) {
	    if (data.username === 'user1' || data.username === 'user2') {
	      resolve({
	        username: null,
	        password: null,
	        token: 'abcd123456'
	      });
	    } else {
	      reject({
	        message: url + ': failed'
	      });
	    }
	  });
	}

	function DELETE(url, data, headers) {
	  return new _promise2.default(function (resolve, reject) {
	    resolve({
	      status: 'success'
	    });
	    reject({
	      message: url + ': failed'
	    });
	  });
	}

/***/ }),

/***/ 244:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(404), __esModule: true };

/***/ }),

/***/ 246:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(412), __esModule: true };

/***/ }),

/***/ 259:
/***/ (function(module, exports) {

	module.exports = function (exec) {
	  try {
	    return { e: false, v: exec() };
	  } catch (e) {
	    return { e: true, v: e };
	  }
	};


/***/ }),

/***/ 260:
/***/ (function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(47);
	var isObject = __webpack_require__(60);
	var newPromiseCapability = __webpack_require__(168);

	module.exports = function (C, x) {
	  anObject(C);
	  if (isObject(x) && x.constructor === C) return x;
	  var promiseCapability = newPromiseCapability.f(C);
	  var resolve = promiseCapability.resolve;
	  resolve(x);
	  return promiseCapability.promise;
	};


/***/ }),

/***/ 262:
/***/ (function(module, exports, __webpack_require__) {

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var anObject = __webpack_require__(47);
	var aFunction = __webpack_require__(119);
	var SPECIES = __webpack_require__(33)('species');
	module.exports = function (O, D) {
	  var C = anObject(O).constructor;
	  var S;
	  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	};


/***/ }),

/***/ 263:
/***/ (function(module, exports, __webpack_require__) {

	var ctx = __webpack_require__(81);
	var invoke = __webpack_require__(421);
	var html = __webpack_require__(248);
	var cel = __webpack_require__(166);
	var global = __webpack_require__(31);
	var process = global.process;
	var setTask = global.setImmediate;
	var clearTask = global.clearImmediate;
	var MessageChannel = global.MessageChannel;
	var Dispatch = global.Dispatch;
	var counter = 0;
	var queue = {};
	var ONREADYSTATECHANGE = 'onreadystatechange';
	var defer, channel, port;
	var run = function () {
	  var id = +this;
	  // eslint-disable-next-line no-prototype-builtins
	  if (queue.hasOwnProperty(id)) {
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listener = function (event) {
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if (!setTask || !clearTask) {
	  setTask = function setImmediate(fn) {
	    var args = [];
	    var i = 1;
	    while (arguments.length > i) args.push(arguments[i++]);
	    queue[++counter] = function () {
	      // eslint-disable-next-line no-new-func
	      invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id) {
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if (__webpack_require__(97)(process) == 'process') {
	    defer = function (id) {
	      process.nextTick(ctx(run, id, 1));
	    };
	  // Sphere (JS game engine) Dispatch API
	  } else if (Dispatch && Dispatch.now) {
	    defer = function (id) {
	      Dispatch.now(ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if (MessageChannel) {
	    channel = new MessageChannel();
	    port = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
	    defer = function (id) {
	      global.postMessage(id + '', '*');
	    };
	    global.addEventListener('message', listener, false);
	  // IE8-
	  } else if (ONREADYSTATECHANGE in cel('script')) {
	    defer = function (id) {
	      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function (id) {
	      setTimeout(ctx(run, id, 1), 0);
	    };
	  }
	}
	module.exports = {
	  set: setTask,
	  clear: clearTask
	};


/***/ }),

/***/ 295:
/***/ (function(module, exports, __webpack_require__) {

	/*eslint-disable no-empty */
	'use strict';

	exports.__esModule = true;
	exports.saveState = saveState;
	exports.readState = readState;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _warning = __webpack_require__(51);

	var _warning2 = _interopRequireDefault(_warning);

	var KeyPrefix = '@@History/';
	var QuotaExceededErrors = ['QuotaExceededError', 'QUOTA_EXCEEDED_ERR'];

	var SecurityError = 'SecurityError';

	function createKey(key) {
	  return KeyPrefix + key;
	}

	function saveState(key, state) {
	  try {
	    if (state == null) {
	      window.sessionStorage.removeItem(createKey(key));
	    } else {
	      window.sessionStorage.setItem(createKey(key), JSON.stringify(state));
	    }
	  } catch (error) {
	    if (error.name === SecurityError) {
	      // Blocking cookies in Chrome/Firefox/Safari throws SecurityError on any
	      // attempt to access window.sessionStorage.
	       true ? _warning2['default'](false, '[history] Unable to save state; sessionStorage is not available due to security settings') : undefined;

	      return;
	    }

	    if (QuotaExceededErrors.indexOf(error.name) >= 0 && window.sessionStorage.length === 0) {
	      // Safari "private mode" throws QuotaExceededError.
	       true ? _warning2['default'](false, '[history] Unable to save state; sessionStorage is not available in Safari private mode') : undefined;

	      return;
	    }

	    throw error;
	  }
	}

	function readState(key) {
	  var json = undefined;
	  try {
	    json = window.sessionStorage.getItem(createKey(key));
	  } catch (error) {
	    if (error.name === SecurityError) {
	      // Blocking cookies in Chrome/Firefox/Safari throws SecurityError on any
	      // attempt to access window.sessionStorage.
	       true ? _warning2['default'](false, '[history] Unable to read state; sessionStorage is not available due to security settings') : undefined;

	      return null;
	    }
	  }

	  if (json) {
	    try {
	      return JSON.parse(json);
	    } catch (error) {
	      // Ignore invalid JSON.
	    }
	  }

	  return null;
	}

/***/ }),

/***/ 296:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _invariant = __webpack_require__(16);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _ExecutionEnvironment = __webpack_require__(136);

	var _DOMUtils = __webpack_require__(196);

	var _createHistory = __webpack_require__(298);

	var _createHistory2 = _interopRequireDefault(_createHistory);

	function createDOMHistory(options) {
	  var history = _createHistory2['default'](_extends({
	    getUserConfirmation: _DOMUtils.getUserConfirmation
	  }, options, {
	    go: _DOMUtils.go
	  }));

	  function listen(listener) {
	    !_ExecutionEnvironment.canUseDOM ?  true ? _invariant2['default'](false, 'DOM history needs a DOM') : _invariant2['default'](false) : undefined;

	    return history.listen(listener);
	  }

	  return _extends({}, history, {
	    listen: listen
	  });
	}

	exports['default'] = createDOMHistory;
	module.exports = exports['default'];

/***/ }),

/***/ 297:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _warning = __webpack_require__(51);

	var _warning2 = _interopRequireDefault(_warning);

	var _invariant = __webpack_require__(16);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _Actions = __webpack_require__(89);

	var _PathUtils = __webpack_require__(73);

	var _ExecutionEnvironment = __webpack_require__(136);

	var _DOMUtils = __webpack_require__(196);

	var _DOMStateStorage = __webpack_require__(295);

	var _createDOMHistory = __webpack_require__(296);

	var _createDOMHistory2 = _interopRequireDefault(_createDOMHistory);

	function isAbsolutePath(path) {
	  return typeof path === 'string' && path.charAt(0) === '/';
	}

	function ensureSlash() {
	  var path = _DOMUtils.getHashPath();

	  if (isAbsolutePath(path)) return true;

	  _DOMUtils.replaceHashPath('/' + path);

	  return false;
	}

	function addQueryStringValueToPath(path, key, value) {
	  return path + (path.indexOf('?') === -1 ? '?' : '&') + (key + '=' + value);
	}

	function stripQueryStringValueFromPath(path, key) {
	  return path.replace(new RegExp('[?&]?' + key + '=[a-zA-Z0-9]+'), '');
	}

	function getQueryStringValueFromPath(path, key) {
	  var match = path.match(new RegExp('\\?.*?\\b' + key + '=(.+?)\\b'));
	  return match && match[1];
	}

	var DefaultQueryKey = '_k';

	function createHashHistory() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  !_ExecutionEnvironment.canUseDOM ?  true ? _invariant2['default'](false, 'Hash history needs a DOM') : _invariant2['default'](false) : undefined;

	  var queryKey = options.queryKey;

	  if (queryKey === undefined || !!queryKey) queryKey = typeof queryKey === 'string' ? queryKey : DefaultQueryKey;

	  function getCurrentLocation() {
	    var path = _DOMUtils.getHashPath();

	    var key = undefined,
	        state = undefined;
	    if (queryKey) {
	      key = getQueryStringValueFromPath(path, queryKey);
	      path = stripQueryStringValueFromPath(path, queryKey);

	      if (key) {
	        state = _DOMStateStorage.readState(key);
	      } else {
	        state = null;
	        key = history.createKey();
	        _DOMUtils.replaceHashPath(addQueryStringValueToPath(path, queryKey, key));
	      }
	    } else {
	      key = state = null;
	    }

	    var location = _PathUtils.parsePath(path);

	    return history.createLocation(_extends({}, location, { state: state }), undefined, key);
	  }

	  function startHashChangeListener(_ref) {
	    var transitionTo = _ref.transitionTo;

	    function hashChangeListener() {
	      if (!ensureSlash()) return; // Always make sure hashes are preceeded with a /.

	      transitionTo(getCurrentLocation());
	    }

	    ensureSlash();
	    _DOMUtils.addEventListener(window, 'hashchange', hashChangeListener);

	    return function () {
	      _DOMUtils.removeEventListener(window, 'hashchange', hashChangeListener);
	    };
	  }

	  function finishTransition(location) {
	    var basename = location.basename;
	    var pathname = location.pathname;
	    var search = location.search;
	    var state = location.state;
	    var action = location.action;
	    var key = location.key;

	    if (action === _Actions.POP) return; // Nothing to do.

	    var path = (basename || '') + pathname + search;

	    if (queryKey) {
	      path = addQueryStringValueToPath(path, queryKey, key);
	      _DOMStateStorage.saveState(key, state);
	    } else {
	      // Drop key and state.
	      location.key = location.state = null;
	    }

	    var currentHash = _DOMUtils.getHashPath();

	    if (action === _Actions.PUSH) {
	      if (currentHash !== path) {
	        window.location.hash = path;
	      } else {
	         true ? _warning2['default'](false, 'You cannot PUSH the same path using hash history') : undefined;
	      }
	    } else if (currentHash !== path) {
	      // REPLACE
	      _DOMUtils.replaceHashPath(path);
	    }
	  }

	  var history = _createDOMHistory2['default'](_extends({}, options, {
	    getCurrentLocation: getCurrentLocation,
	    finishTransition: finishTransition,
	    saveState: _DOMStateStorage.saveState
	  }));

	  var listenerCount = 0,
	      stopHashChangeListener = undefined;

	  function listenBefore(listener) {
	    if (++listenerCount === 1) stopHashChangeListener = startHashChangeListener(history);

	    var unlisten = history.listenBefore(listener);

	    return function () {
	      unlisten();

	      if (--listenerCount === 0) stopHashChangeListener();
	    };
	  }

	  function listen(listener) {
	    if (++listenerCount === 1) stopHashChangeListener = startHashChangeListener(history);

	    var unlisten = history.listen(listener);

	    return function () {
	      unlisten();

	      if (--listenerCount === 0) stopHashChangeListener();
	    };
	  }

	  function push(location) {
	     true ? _warning2['default'](queryKey || location.state == null, 'You cannot use state without a queryKey it will be dropped') : undefined;

	    history.push(location);
	  }

	  function replace(location) {
	     true ? _warning2['default'](queryKey || location.state == null, 'You cannot use state without a queryKey it will be dropped') : undefined;

	    history.replace(location);
	  }

	  var goIsSupportedWithoutReload = _DOMUtils.supportsGoWithoutReloadUsingHash();

	  function go(n) {
	     true ? _warning2['default'](goIsSupportedWithoutReload, 'Hash history go(n) causes a full page reload in this browser') : undefined;

	    history.go(n);
	  }

	  function createHref(path) {
	    return '#' + history.createHref(path);
	  }

	  // deprecated
	  function registerTransitionHook(hook) {
	    if (++listenerCount === 1) stopHashChangeListener = startHashChangeListener(history);

	    history.registerTransitionHook(hook);
	  }

	  // deprecated
	  function unregisterTransitionHook(hook) {
	    history.unregisterTransitionHook(hook);

	    if (--listenerCount === 0) stopHashChangeListener();
	  }

	  // deprecated
	  function pushState(state, path) {
	     true ? _warning2['default'](queryKey || state == null, 'You cannot use state without a queryKey it will be dropped') : undefined;

	    history.pushState(state, path);
	  }

	  // deprecated
	  function replaceState(state, path) {
	     true ? _warning2['default'](queryKey || state == null, 'You cannot use state without a queryKey it will be dropped') : undefined;

	    history.replaceState(state, path);
	  }

	  return _extends({}, history, {
	    listenBefore: listenBefore,
	    listen: listen,
	    push: push,
	    replace: replace,
	    go: go,
	    createHref: createHref,

	    registerTransitionHook: registerTransitionHook, // deprecated - warning is in createHistory
	    unregisterTransitionHook: unregisterTransitionHook, // deprecated - warning is in createHistory
	    pushState: pushState, // deprecated - warning is in createHistory
	    replaceState: replaceState // deprecated - warning is in createHistory
	  });
	}

	exports['default'] = createHashHistory;
	module.exports = exports['default'];

/***/ }),

/***/ 298:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _warning = __webpack_require__(51);

	var _warning2 = _interopRequireDefault(_warning);

	var _deepEqual = __webpack_require__(576);

	var _deepEqual2 = _interopRequireDefault(_deepEqual);

	var _PathUtils = __webpack_require__(73);

	var _AsyncUtils = __webpack_require__(607);

	var _Actions = __webpack_require__(89);

	var _createLocation2 = __webpack_require__(609);

	var _createLocation3 = _interopRequireDefault(_createLocation2);

	var _runTransitionHook = __webpack_require__(198);

	var _runTransitionHook2 = _interopRequireDefault(_runTransitionHook);

	var _deprecate = __webpack_require__(197);

	var _deprecate2 = _interopRequireDefault(_deprecate);

	function createRandomKey(length) {
	  return Math.random().toString(36).substr(2, length);
	}

	function locationsAreEqual(a, b) {
	  return a.pathname === b.pathname && a.search === b.search &&
	  //a.action === b.action && // Different action !== location change.
	  a.key === b.key && _deepEqual2['default'](a.state, b.state);
	}

	var DefaultKeyLength = 6;

	function createHistory() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	  var getCurrentLocation = options.getCurrentLocation;
	  var finishTransition = options.finishTransition;
	  var saveState = options.saveState;
	  var go = options.go;
	  var getUserConfirmation = options.getUserConfirmation;
	  var keyLength = options.keyLength;

	  if (typeof keyLength !== 'number') keyLength = DefaultKeyLength;

	  var transitionHooks = [];

	  function listenBefore(hook) {
	    transitionHooks.push(hook);

	    return function () {
	      transitionHooks = transitionHooks.filter(function (item) {
	        return item !== hook;
	      });
	    };
	  }

	  var allKeys = [];
	  var changeListeners = [];
	  var location = undefined;

	  function getCurrent() {
	    if (pendingLocation && pendingLocation.action === _Actions.POP) {
	      return allKeys.indexOf(pendingLocation.key);
	    } else if (location) {
	      return allKeys.indexOf(location.key);
	    } else {
	      return -1;
	    }
	  }

	  function updateLocation(newLocation) {
	    var current = getCurrent();

	    location = newLocation;

	    if (location.action === _Actions.PUSH) {
	      allKeys = [].concat(allKeys.slice(0, current + 1), [location.key]);
	    } else if (location.action === _Actions.REPLACE) {
	      allKeys[current] = location.key;
	    }

	    changeListeners.forEach(function (listener) {
	      listener(location);
	    });
	  }

	  function listen(listener) {
	    changeListeners.push(listener);

	    if (location) {
	      listener(location);
	    } else {
	      var _location = getCurrentLocation();
	      allKeys = [_location.key];
	      updateLocation(_location);
	    }

	    return function () {
	      changeListeners = changeListeners.filter(function (item) {
	        return item !== listener;
	      });
	    };
	  }

	  function confirmTransitionTo(location, callback) {
	    _AsyncUtils.loopAsync(transitionHooks.length, function (index, next, done) {
	      _runTransitionHook2['default'](transitionHooks[index], location, function (result) {
	        if (result != null) {
	          done(result);
	        } else {
	          next();
	        }
	      });
	    }, function (message) {
	      if (getUserConfirmation && typeof message === 'string') {
	        getUserConfirmation(message, function (ok) {
	          callback(ok !== false);
	        });
	      } else {
	        callback(message !== false);
	      }
	    });
	  }

	  var pendingLocation = undefined;

	  function transitionTo(nextLocation) {
	    if (location && locationsAreEqual(location, nextLocation)) return; // Nothing to do.

	    pendingLocation = nextLocation;

	    confirmTransitionTo(nextLocation, function (ok) {
	      if (pendingLocation !== nextLocation) return; // Transition was interrupted.

	      if (ok) {
	        // treat PUSH to current path like REPLACE to be consistent with browsers
	        if (nextLocation.action === _Actions.PUSH) {
	          var prevPath = createPath(location);
	          var nextPath = createPath(nextLocation);

	          if (nextPath === prevPath && _deepEqual2['default'](location.state, nextLocation.state)) nextLocation.action = _Actions.REPLACE;
	        }

	        if (finishTransition(nextLocation) !== false) updateLocation(nextLocation);
	      } else if (location && nextLocation.action === _Actions.POP) {
	        var prevIndex = allKeys.indexOf(location.key);
	        var nextIndex = allKeys.indexOf(nextLocation.key);

	        if (prevIndex !== -1 && nextIndex !== -1) go(prevIndex - nextIndex); // Restore the URL.
	      }
	    });
	  }

	  function push(location) {
	    transitionTo(createLocation(location, _Actions.PUSH, createKey()));
	  }

	  function replace(location) {
	    transitionTo(createLocation(location, _Actions.REPLACE, createKey()));
	  }

	  function goBack() {
	    go(-1);
	  }

	  function goForward() {
	    go(1);
	  }

	  function createKey() {
	    return createRandomKey(keyLength);
	  }

	  function createPath(location) {
	    if (location == null || typeof location === 'string') return location;

	    var pathname = location.pathname;
	    var search = location.search;
	    var hash = location.hash;

	    var result = pathname;

	    if (search) result += search;

	    if (hash) result += hash;

	    return result;
	  }

	  function createHref(location) {
	    return createPath(location);
	  }

	  function createLocation(location, action) {
	    var key = arguments.length <= 2 || arguments[2] === undefined ? createKey() : arguments[2];

	    if (typeof action === 'object') {
	       true ? _warning2['default'](false, 'The state (2nd) argument to history.createLocation is deprecated; use a ' + 'location descriptor instead') : undefined;

	      if (typeof location === 'string') location = _PathUtils.parsePath(location);

	      location = _extends({}, location, { state: action });

	      action = key;
	      key = arguments[3] || createKey();
	    }

	    return _createLocation3['default'](location, action, key);
	  }

	  // deprecated
	  function setState(state) {
	    if (location) {
	      updateLocationState(location, state);
	      updateLocation(location);
	    } else {
	      updateLocationState(getCurrentLocation(), state);
	    }
	  }

	  function updateLocationState(location, state) {
	    location.state = _extends({}, location.state, state);
	    saveState(location.key, location.state);
	  }

	  // deprecated
	  function registerTransitionHook(hook) {
	    if (transitionHooks.indexOf(hook) === -1) transitionHooks.push(hook);
	  }

	  // deprecated
	  function unregisterTransitionHook(hook) {
	    transitionHooks = transitionHooks.filter(function (item) {
	      return item !== hook;
	    });
	  }

	  // deprecated
	  function pushState(state, path) {
	    if (typeof path === 'string') path = _PathUtils.parsePath(path);

	    push(_extends({ state: state }, path));
	  }

	  // deprecated
	  function replaceState(state, path) {
	    if (typeof path === 'string') path = _PathUtils.parsePath(path);

	    replace(_extends({ state: state }, path));
	  }

	  return {
	    listenBefore: listenBefore,
	    listen: listen,
	    transitionTo: transitionTo,
	    push: push,
	    replace: replace,
	    go: go,
	    goBack: goBack,
	    goForward: goForward,
	    createKey: createKey,
	    createPath: createPath,
	    createHref: createHref,
	    createLocation: createLocation,

	    setState: _deprecate2['default'](setState, 'setState is deprecated; use location.key to save state instead'),
	    registerTransitionHook: _deprecate2['default'](registerTransitionHook, 'registerTransitionHook is deprecated; use listenBefore instead'),
	    unregisterTransitionHook: _deprecate2['default'](unregisterTransitionHook, 'unregisterTransitionHook is deprecated; use the callback returned from listenBefore instead'),
	    pushState: _deprecate2['default'](pushState, 'pushState is deprecated; use push instead'),
	    replaceState: _deprecate2['default'](replaceState, 'replaceState is deprecated; use replace instead')
	  };
	}

	exports['default'] = createHistory;
	module.exports = exports['default'];

/***/ }),

/***/ 299:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _warning = __webpack_require__(51);

	var _warning2 = _interopRequireDefault(_warning);

	var _ExecutionEnvironment = __webpack_require__(136);

	var _PathUtils = __webpack_require__(73);

	var _runTransitionHook = __webpack_require__(198);

	var _runTransitionHook2 = _interopRequireDefault(_runTransitionHook);

	var _deprecate = __webpack_require__(197);

	var _deprecate2 = _interopRequireDefault(_deprecate);

	function useBasename(createHistory) {
	  return function () {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    var history = createHistory(options);

	    var basename = options.basename;

	    var checkedBaseHref = false;

	    function checkBaseHref() {
	      if (checkedBaseHref) {
	        return;
	      }

	      // Automatically use the value of <base href> in HTML
	      // documents as basename if it's not explicitly given.
	      if (basename == null && _ExecutionEnvironment.canUseDOM) {
	        var base = document.getElementsByTagName('base')[0];
	        var baseHref = base && base.getAttribute('href');

	        if (baseHref != null) {
	          basename = baseHref;

	           true ? _warning2['default'](false, 'Automatically setting basename using <base href> is deprecated and will ' + 'be removed in the next major release. The semantics of <base href> are ' + 'subtly different from basename. Please pass the basename explicitly in ' + 'the options to createHistory') : undefined;
	        }
	      }

	      checkedBaseHref = true;
	    }

	    function addBasename(location) {
	      checkBaseHref();

	      if (basename && location.basename == null) {
	        if (location.pathname.indexOf(basename) === 0) {
	          location.pathname = location.pathname.substring(basename.length);
	          location.basename = basename;

	          if (location.pathname === '') location.pathname = '/';
	        } else {
	          location.basename = '';
	        }
	      }

	      return location;
	    }

	    function prependBasename(location) {
	      checkBaseHref();

	      if (!basename) return location;

	      if (typeof location === 'string') location = _PathUtils.parsePath(location);

	      var pname = location.pathname;
	      var normalizedBasename = basename.slice(-1) === '/' ? basename : basename + '/';
	      var normalizedPathname = pname.charAt(0) === '/' ? pname.slice(1) : pname;
	      var pathname = normalizedBasename + normalizedPathname;

	      return _extends({}, location, {
	        pathname: pathname
	      });
	    }

	    // Override all read methods with basename-aware versions.
	    function listenBefore(hook) {
	      return history.listenBefore(function (location, callback) {
	        _runTransitionHook2['default'](hook, addBasename(location), callback);
	      });
	    }

	    function listen(listener) {
	      return history.listen(function (location) {
	        listener(addBasename(location));
	      });
	    }

	    // Override all write methods with basename-aware versions.
	    function push(location) {
	      history.push(prependBasename(location));
	    }

	    function replace(location) {
	      history.replace(prependBasename(location));
	    }

	    function createPath(location) {
	      return history.createPath(prependBasename(location));
	    }

	    function createHref(location) {
	      return history.createHref(prependBasename(location));
	    }

	    function createLocation(location) {
	      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	      }

	      return addBasename(history.createLocation.apply(history, [prependBasename(location)].concat(args)));
	    }

	    // deprecated
	    function pushState(state, path) {
	      if (typeof path === 'string') path = _PathUtils.parsePath(path);

	      push(_extends({ state: state }, path));
	    }

	    // deprecated
	    function replaceState(state, path) {
	      if (typeof path === 'string') path = _PathUtils.parsePath(path);

	      replace(_extends({ state: state }, path));
	    }

	    return _extends({}, history, {
	      listenBefore: listenBefore,
	      listen: listen,
	      push: push,
	      replace: replace,
	      createPath: createPath,
	      createHref: createHref,
	      createLocation: createLocation,

	      pushState: _deprecate2['default'](pushState, 'pushState is deprecated; use push instead'),
	      replaceState: _deprecate2['default'](replaceState, 'replaceState is deprecated; use replace instead')
	    });
	  };
	}

	exports['default'] = useBasename;
	module.exports = exports['default'];

/***/ }),

/***/ 342:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(1);

	exports.default = {
	  message: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element]).isRequired,
	  action: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.string, _react.PropTypes.node]),
	  onClick: _react.PropTypes.func,
	  style: _react.PropTypes.bool,
	  actionStyle: _react.PropTypes.object,
	  barStyle: _react.PropTypes.object,
	  activeBarStyle: _react.PropTypes.object,
	  dismissAfter: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.number]),
	  onDismiss: _react.PropTypes.func,
	  className: _react.PropTypes.string,
	  activeClassName: _react.PropTypes.string,
	  isActive: _react.PropTypes.bool,
	  title: _react.PropTypes.string
	};

/***/ }),

/***/ 343:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _defaultPropTypes = __webpack_require__(342);

	var _defaultPropTypes2 = _interopRequireDefault(_defaultPropTypes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Notification = function (_Component) {
	  _inherits(Notification, _Component);

	  function Notification(props) {
	    _classCallCheck(this, Notification);

	    var _this = _possibleConstructorReturn(this, (Notification.__proto__ || Object.getPrototypeOf(Notification)).call(this, props));

	    _this.getBarStyle = _this.getBarStyle.bind(_this);
	    _this.getActionStyle = _this.getActionStyle.bind(_this);
	    _this.getTitleStyle = _this.getTitleStyle.bind(_this);
	    _this.handleClick = _this.handleClick.bind(_this);

	    if (props.onDismiss && props.isActive) {
	      _this.dismissTimeout = setTimeout(props.onDismiss, props.dismissAfter);
	    }
	    return _this;
	  }

	  _createClass(Notification, [{
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      if (nextProps.dismissAfter === false) return;

	      // See http://eslint.org/docs/rules/no-prototype-builtins
	      if (!{}.hasOwnProperty.call(nextProps, 'isLast')) {
	        clearTimeout(this.dismissTimeout);
	      }

	      if (nextProps.onDismiss) {
	        if (nextProps.isActive && !this.props.isActive || nextProps.dismissAfter && this.props.dismissAfter === false) {
	          this.dismissTimeout = setTimeout(nextProps.onDismiss, nextProps.dismissAfter);
	        }
	      }
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      if (this.props.dismissAfter) clearTimeout(this.dismissTimeout);
	    }

	    /*
	    * @description Dynamically get the styles for the bar.
	    * @returns {object} result The style.
	    */

	  }, {
	    key: 'getBarStyle',
	    value: function getBarStyle() {
	      if (this.props.style === false) return {};

	      var _props = this.props,
	          isActive = _props.isActive,
	          barStyle = _props.barStyle,
	          activeBarStyle = _props.activeBarStyle;


	      var baseStyle = {
	        position: 'fixed',
	        bottom: '2rem',
	        left: '-100%',
	        width: 'auto',
	        padding: '1rem',
	        margin: 0,
	        color: '#fafafa',
	        font: '1rem normal Roboto, sans-serif',
	        borderRadius: '5px',
	        background: '#212121',
	        borderSizing: 'border-box',
	        boxShadow: '0 0 1px 1px rgba(10, 10, 11, .125)',
	        cursor: 'default',
	        WebKitTransition: '.5s cubic-bezier(0.89, 0.01, 0.5, 1.1)',
	        MozTransition: '.5s cubic-bezier(0.89, 0.01, 0.5, 1.1)',
	        msTransition: '.5s cubic-bezier(0.89, 0.01, 0.5, 1.1)',
	        OTransition: '.5s cubic-bezier(0.89, 0.01, 0.5, 1.1)',
	        transition: '.5s cubic-bezier(0.89, 0.01, 0.5, 1.1)',
	        WebkitTransform: 'translatez(0)',
	        MozTransform: 'translatez(0)',
	        msTransform: 'translatez(0)',
	        OTransform: 'translatez(0)',
	        transform: 'translatez(0)'
	      };

	      return isActive ? _extends({}, baseStyle, { left: '1rem' }, barStyle, activeBarStyle) : _extends({}, baseStyle, barStyle);
	    }

	    /*
	    * @function getActionStyle
	    * @description Dynamically get the styles for the action text.
	    * @returns {object} result The style.
	    */

	  }, {
	    key: 'getActionStyle',
	    value: function getActionStyle() {
	      return this.props.style !== false ? _extends({}, {
	        padding: '0.125rem',
	        marginLeft: '1rem',
	        color: '#f44336',
	        font: '.75rem normal Roboto, sans-serif',
	        lineHeight: '1rem',
	        letterSpacing: '.125ex',
	        textTransform: 'uppercase',
	        borderRadius: '5px',
	        cursor: 'pointer'
	      }, this.props.actionStyle) : {};
	    }

	    /*
	    * @function getTitleStyle
	    * @description Dynamically get the styles for the title.
	    * @returns {object} result The style.
	    */

	  }, {
	    key: 'getTitleStyle',
	    value: function getTitleStyle() {
	      return this.props.style !== false ? _extends({}, {
	        fontWeight: '700',
	        marginRight: '.5rem'
	      }, this.props.titleStyle) : {};
	    }

	    /*
	    * @function handleClick
	    * @description Handle click events on the action button.
	    */

	  }, {
	    key: 'handleClick',
	    value: function handleClick() {
	      if (this.props.onClick && typeof this.props.onClick === 'function') {
	        return this.props.onClick();
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var className = 'notification-bar';

	      if (this.props.isActive) className += ' ' + this.props.activeClassName;
	      if (this.props.className) className += ' ' + this.props.className;

	      return _react2.default.createElement(
	        'div',
	        { className: className, style: this.getBarStyle() },
	        _react2.default.createElement(
	          'div',
	          { className: 'notification-bar-wrapper' },
	          this.props.title ? _react2.default.createElement(
	            'span',
	            {
	              className: 'notification-bar-title',
	              style: this.getTitleStyle()
	            },
	            this.props.title
	          ) : null,
	          _react2.default.createElement(
	            'span',
	            { className: 'notification-bar-message' },
	            this.props.message
	          ),
	          this.props.action ? _react2.default.createElement(
	            'span',
	            {
	              className: 'notification-bar-action',
	              onClick: this.handleClick,
	              style: this.getActionStyle()
	            },
	            this.props.action
	          ) : null
	        )
	      );
	    }
	  }]);

	  return Notification;
	}(_react.Component);

	Notification.propTypes = _defaultPropTypes2.default;

	Notification.defaultProps = {
	  isActive: false,
	  dismissAfter: 2000,
	  activeClassName: 'notification-bar-active'
	};

	exports.default = Notification;

/***/ }),

/***/ 372:
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * This action type will be dispatched by the history actions below.
	 * If you're writing a middleware to watch for navigation events, be sure to
	 * look for actions of this type.
	 */
	var CALL_HISTORY_METHOD = exports.CALL_HISTORY_METHOD = '@@router/CALL_HISTORY_METHOD';

	function updateLocation(method) {
	  return function () {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return {
	      type: CALL_HISTORY_METHOD,
	      payload: { method: method, args: args }
	    };
	  };
	}

	/**
	 * These actions correspond to the history API.
	 * The associated routerMiddleware will capture these events before they get to
	 * your reducer and reissue them as the matching function on your history.
	 */
	var push = exports.push = updateLocation('push');
	var replace = exports.replace = updateLocation('replace');
	var go = exports.go = updateLocation('go');
	var goBack = exports.goBack = updateLocation('goBack');
	var goForward = exports.goForward = updateLocation('goForward');

	var routerActions = exports.routerActions = { push: push, replace: replace, go: go, goBack: goBack, goForward: goForward };

/***/ }),

/***/ 373:
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.routerReducer = routerReducer;
	/**
	 * This action type will be dispatched when your history
	 * receives a location change.
	 */
	var LOCATION_CHANGE = exports.LOCATION_CHANGE = '@@router/LOCATION_CHANGE';

	var initialState = {
	  locationBeforeTransitions: null
	};

	/**
	 * This reducer will update the state with the most recent location history
	 * has transitioned to. This may not be in sync with the router, particularly
	 * if you have asynchronously-loaded routes, so reading from and relying on
	 * this state is discouraged.
	 */
	function routerReducer() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;

	  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	      type = _ref.type,
	      payload = _ref.payload;

	  if (type === LOCATION_CHANGE) {
	    return _extends({}, state, { locationBeforeTransitions: payload });
	  }

	  return state;
	}

/***/ }),

/***/ 374:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _routerWarning = __webpack_require__(27);

	var _routerWarning2 = _interopRequireDefault(_routerWarning);

	var _PropTypes = __webpack_require__(236);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var _React$PropTypes = _react2.default.PropTypes;
	var bool = _React$PropTypes.bool;
	var object = _React$PropTypes.object;
	var string = _React$PropTypes.string;
	var func = _React$PropTypes.func;
	var oneOfType = _React$PropTypes.oneOfType;


	function isLeftClickEvent(event) {
	  return event.button === 0;
	}

	function isModifiedEvent(event) {
	  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
	}

	// TODO: De-duplicate against hasAnyProperties in createTransitionManager.
	function isEmptyObject(object) {
	  for (var p in object) {
	    if (Object.prototype.hasOwnProperty.call(object, p)) return false;
	  }return true;
	}

	function createLocationDescriptor(to, _ref) {
	  var query = _ref.query;
	  var hash = _ref.hash;
	  var state = _ref.state;

	  if (query || hash || state) {
	    return { pathname: to, query: query, hash: hash, state: state };
	  }

	  return to;
	}

	/**
	 * A <Link> is used to create an <a> element that links to a route.
	 * When that route is active, the link gets the value of its
	 * activeClassName prop.
	 *
	 * For example, assuming you have the following route:
	 *
	 *   <Route path="/posts/:postID" component={Post} />
	 *
	 * You could use the following component to link to that route:
	 *
	 *   <Link to={`/posts/${post.id}`} />
	 *
	 * Links may pass along location state and/or query string parameters
	 * in the state/query props, respectively.
	 *
	 *   <Link ... query={{ show: true }} state={{ the: 'state' }} />
	 */
	var Link = _react2.default.createClass({
	  displayName: 'Link',


	  contextTypes: {
	    router: _PropTypes.routerShape
	  },

	  propTypes: {
	    to: oneOfType([string, object]).isRequired,
	    query: object,
	    hash: string,
	    state: object,
	    activeStyle: object,
	    activeClassName: string,
	    onlyActiveOnIndex: bool.isRequired,
	    onClick: func,
	    target: string
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      onlyActiveOnIndex: false,
	      style: {}
	    };
	  },
	  handleClick: function handleClick(event) {
	    var allowTransition = true;

	    if (this.props.onClick) this.props.onClick(event);

	    if (isModifiedEvent(event) || !isLeftClickEvent(event)) return;

	    if (event.defaultPrevented === true) allowTransition = false;

	    // If target prop is set (e.g. to "_blank") let browser handle link.
	    /* istanbul ignore if: untestable with Karma */
	    if (this.props.target) {
	      if (!allowTransition) event.preventDefault();

	      return;
	    }

	    event.preventDefault();

	    if (allowTransition) {
	      var _props = this.props;
	      var to = _props.to;
	      var query = _props.query;
	      var hash = _props.hash;
	      var state = _props.state;

	      var location = createLocationDescriptor(to, { query: query, hash: hash, state: state });

	      this.context.router.push(location);
	    }
	  },
	  render: function render() {
	    var _props2 = this.props;
	    var to = _props2.to;
	    var query = _props2.query;
	    var hash = _props2.hash;
	    var state = _props2.state;
	    var activeClassName = _props2.activeClassName;
	    var activeStyle = _props2.activeStyle;
	    var onlyActiveOnIndex = _props2.onlyActiveOnIndex;

	    var props = _objectWithoutProperties(_props2, ['to', 'query', 'hash', 'state', 'activeClassName', 'activeStyle', 'onlyActiveOnIndex']);

	     true ? (0, _routerWarning2.default)(!(query || hash || state), 'the `query`, `hash`, and `state` props on `<Link>` are deprecated, use `<Link to={{ pathname, query, hash, state }}/>. http://tiny.cc/router-isActivedeprecated') : void 0;

	    // Ignore if rendered outside the context of router, simplifies unit testing.
	    var router = this.context.router;


	    if (router) {
	      var location = createLocationDescriptor(to, { query: query, hash: hash, state: state });
	      props.href = router.createHref(location);

	      if (activeClassName || activeStyle != null && !isEmptyObject(activeStyle)) {
	        if (router.isActive(location, onlyActiveOnIndex)) {
	          if (activeClassName) {
	            if (props.className) {
	              props.className += ' ' + activeClassName;
	            } else {
	              props.className = activeClassName;
	            }
	          }

	          if (activeStyle) props.style = _extends({}, props.style, activeStyle);
	        }
	      }
	    }

	    return _react2.default.createElement('a', _extends({}, props, { onClick: this.handleClick }));
	  }
	});

	exports.default = Link;
	module.exports = exports['default'];

/***/ }),

/***/ 375:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _invariant = __webpack_require__(16);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _RouteUtils = __webpack_require__(67);

	var _PatternUtils = __webpack_require__(94);

	var _InternalPropTypes = __webpack_require__(76);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _React$PropTypes = _react2.default.PropTypes;
	var string = _React$PropTypes.string;
	var object = _React$PropTypes.object;

	/**
	 * A <Redirect> is used to declare another URL path a client should
	 * be sent to when they request a given URL.
	 *
	 * Redirects are placed alongside routes in the route configuration
	 * and are traversed in the same manner.
	 */

	var Redirect = _react2.default.createClass({
	  displayName: 'Redirect',


	  statics: {
	    createRouteFromReactElement: function createRouteFromReactElement(element) {
	      var route = (0, _RouteUtils.createRouteFromReactElement)(element);

	      if (route.from) route.path = route.from;

	      route.onEnter = function (nextState, replace) {
	        var location = nextState.location;
	        var params = nextState.params;


	        var pathname = void 0;
	        if (route.to.charAt(0) === '/') {
	          pathname = (0, _PatternUtils.formatPattern)(route.to, params);
	        } else if (!route.to) {
	          pathname = location.pathname;
	        } else {
	          var routeIndex = nextState.routes.indexOf(route);
	          var parentPattern = Redirect.getRoutePattern(nextState.routes, routeIndex - 1);
	          var pattern = parentPattern.replace(/\/*$/, '/') + route.to;
	          pathname = (0, _PatternUtils.formatPattern)(pattern, params);
	        }

	        replace({
	          pathname: pathname,
	          query: route.query || location.query,
	          state: route.state || location.state
	        });
	      };

	      return route;
	    },
	    getRoutePattern: function getRoutePattern(routes, routeIndex) {
	      var parentPattern = '';

	      for (var i = routeIndex; i >= 0; i--) {
	        var route = routes[i];
	        var pattern = route.path || '';

	        parentPattern = pattern.replace(/\/*$/, '/') + parentPattern;

	        if (pattern.indexOf('/') === 0) break;
	      }

	      return '/' + parentPattern;
	    }
	  },

	  propTypes: {
	    path: string,
	    from: string, // Alias for path
	    to: string.isRequired,
	    query: object,
	    state: object,
	    onEnter: _InternalPropTypes.falsy,
	    children: _InternalPropTypes.falsy
	  },

	  /* istanbul ignore next: sanity check */
	  render: function render() {
	     true ?  true ? (0, _invariant2.default)(false, '<Redirect> elements are for router configuration only and should not be rendered') : (0, _invariant2.default)(false) : void 0;
	  }
	});

	exports.default = Redirect;
	module.exports = exports['default'];

/***/ }),

/***/ 376:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.createRouterObject = createRouterObject;
	exports.createRoutingHistory = createRoutingHistory;

	var _deprecateObjectProperties = __webpack_require__(160);

	var _deprecateObjectProperties2 = _interopRequireDefault(_deprecateObjectProperties);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function createRouterObject(history, transitionManager) {
	  return _extends({}, history, {
	    setRouteLeaveHook: transitionManager.listenBeforeLeavingRoute,
	    isActive: transitionManager.isActive
	  });
	}

	// deprecated
	function createRoutingHistory(history, transitionManager) {
	  history = _extends({}, history, transitionManager);

	  if (true) {
	    history = (0, _deprecateObjectProperties2.default)(history, '`props.history` and `context.history` are deprecated. Please use `context.router`. http://tiny.cc/router-contextchanges');
	  }

	  return history;
	}

/***/ }),

/***/ 377:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.default = createMemoryHistory;

	var _useQueries = __webpack_require__(137);

	var _useQueries2 = _interopRequireDefault(_useQueries);

	var _useBasename = __webpack_require__(299);

	var _useBasename2 = _interopRequireDefault(_useBasename);

	var _createMemoryHistory = __webpack_require__(610);

	var _createMemoryHistory2 = _interopRequireDefault(_createMemoryHistory);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function createMemoryHistory(options) {
	  // signatures and type checking differ between `useRoutes` and
	  // `createMemoryHistory`, have to create `memoryHistory` first because
	  // `useQueries` doesn't understand the signature
	  var memoryHistory = (0, _createMemoryHistory2.default)(options);
	  var createHistory = function createHistory() {
	    return memoryHistory;
	  };
	  var history = (0, _useQueries2.default)((0, _useBasename2.default)(createHistory))(options);
	  history.__v2_compatible__ = true;
	  return history;
	}
	module.exports = exports['default'];

/***/ }),

/***/ 378:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	exports.default = function (createHistory) {
	  var history = void 0;
	  if (canUseDOM) history = (0, _useRouterHistory2.default)(createHistory)();
	  return history;
	};

	var _useRouterHistory = __webpack_require__(379);

	var _useRouterHistory2 = _interopRequireDefault(_useRouterHistory);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

	module.exports = exports['default'];

/***/ }),

/***/ 379:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.default = useRouterHistory;

	var _useQueries = __webpack_require__(137);

	var _useQueries2 = _interopRequireDefault(_useQueries);

	var _useBasename = __webpack_require__(299);

	var _useBasename2 = _interopRequireDefault(_useBasename);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function useRouterHistory(createHistory) {
	  return function (options) {
	    var history = (0, _useQueries2.default)((0, _useBasename2.default)(createHistory))(options);
	    history.__v2_compatible__ = true;
	    return history;
	  };
	}
	module.exports = exports['default'];

/***/ }),

/***/ 386:
/***/ (function(module, exports, __webpack_require__) {

	var map = {
		"./Mockup": 162,
		"./Mockup.js": 162,
		"./test.mock": 243,
		"./test.mock.js": 243
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 386;


/***/ }),

/***/ 389:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _immutabilityHelper = __webpack_require__(611);

	var _immutabilityHelper2 = _interopRequireDefault(_immutabilityHelper);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function RootReducer() {
	  var storeState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  var action = arguments[1];

	  var finalStoreState = void 0;
	  switch (action.type) {
	    case 'EVT_DO_STH':
	      finalStoreState = (0, _immutabilityHelper2.default)(storeState, { foo: { $set: 'foo' } });
	      break;
	    case 'EVT_SHOW_NOTIFICATION':
	      finalStoreState = (0, _immutabilityHelper2.default)(storeState, {
	        showNotification: { $set: action.showNotification },
	        notificationMessage: { $set: action.notificationMessage }
	      });
	      break;
	    case 'EVT_SHOW_MY_MODAL':
	      finalStoreState = (0, _immutabilityHelper2.default)(storeState, { showMyModal: { $set: action.showMyModal } });
	      break;
	    default:
	      finalStoreState = storeState;
	  }
	  console.log('RootReducer.js: RootReducer called => ', 'finalStoreState=', finalStoreState, 'action=', action);
	  return finalStoreState;
	}
	exports.default = RootReducer;

/***/ }),

/***/ 391:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.MSNotification = undefined;

	var _classCallCheck2 = __webpack_require__(2);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(4);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(3);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(41);

	var _reactNotification = __webpack_require__(757);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var MSNotification = exports.MSNotification = function (_React$Component) {
	  (0, _inherits3.default)(MSNotification, _React$Component);

	  function MSNotification(props) {
	    (0, _classCallCheck3.default)(this, MSNotification);
	    return (0, _possibleConstructorReturn3.default)(this, _React$Component.call(this, props));
	  }

	  MSNotification.prototype.getNotificationMessage = function getNotificationMessage() {
	    console.log('MSNotification.js: MSNotification.getNotificationMessage called => ', 'this.props.notificationMessage=', this.props.notificationMessage);
	    return this.props.notificationMessage ? this.props.notificationMessage : '';
	  };

	  MSNotification.prototype.render = function render() {
	    return _react2.default.createElement(_reactNotification.Notification, {
	      isActive: this.props.showNotification,
	      message: this.getNotificationMessage(),
	      action: 'Dismiss',
	      barStyle: {
	        bottom: 'auto',
	        top: '16px',
	        left: 'auto',
	        zIndex: 99999,
	        right: '-100%'
	      },
	      activeBarStyle: {
	        right: '16px'
	      },
	      onDismiss: this.props.close,
	      dismissAfter: 3000,
	      onClick: this.props.close
	    });
	  };

	  return MSNotification;
	}(_react2.default.Component);

	function mapDispatchToProps(dispatch) {
	  return {
	    close: function close() {
	      return dispatch({
	        type: 'EVT_SHOW_NOTIFICATION',
	        showNotification: false
	      });
	    }
	  };
	}

	exports.default = (0, _reactRedux.connect)(function (storeState) {
	  // store state to props
	  return {
	    showNotification: storeState.app.showNotification,
	    notificationMessage: storeState.app.notificationMessage
	  };
	}, mapDispatchToProps)(MSNotification);

/***/ }),

/***/ 397:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(405), __esModule: true };

/***/ }),

/***/ 399:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(409), __esModule: true };

/***/ }),

/***/ 404:
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(179);
	__webpack_require__(123);
	module.exports = __webpack_require__(438);


/***/ }),

/***/ 405:
/***/ (function(module, exports, __webpack_require__) {

	var core = __webpack_require__(22);
	var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
	module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
	  return $JSON.stringify.apply($JSON, arguments);
	};


/***/ }),

/***/ 409:
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(443);
	module.exports = __webpack_require__(22).Object.keys;


/***/ }),

/***/ 412:
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(264);
	__webpack_require__(123);
	__webpack_require__(179);
	__webpack_require__(445);
	__webpack_require__(449);
	__webpack_require__(450);
	module.exports = __webpack_require__(22).Promise;


/***/ }),

/***/ 416:
/***/ (function(module, exports) {

	module.exports = function (it, Constructor, name, forbiddenField) {
	  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};


/***/ }),

/***/ 420:
/***/ (function(module, exports, __webpack_require__) {

	var ctx = __webpack_require__(81);
	var call = __webpack_require__(252);
	var isArrayIter = __webpack_require__(251);
	var anObject = __webpack_require__(47);
	var toLength = __webpack_require__(174);
	var getIterFn = __webpack_require__(178);
	var BREAK = {};
	var RETURN = {};
	var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
	  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
	  var f = ctx(fn, that, entries ? 2 : 1);
	  var index = 0;
	  var length, step, iterator, result;
	  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
	    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	    if (result === BREAK || result === RETURN) return result;
	  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
	    result = call(iterator, f, step.value, entries);
	    if (result === BREAK || result === RETURN) return result;
	  }
	};
	exports.BREAK = BREAK;
	exports.RETURN = RETURN;


/***/ }),

/***/ 421:
/***/ (function(module, exports) {

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	module.exports = function (fn, args, that) {
	  var un = that === undefined;
	  switch (args.length) {
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	  } return fn.apply(that, args);
	};


/***/ }),

/***/ 426:
/***/ (function(module, exports, __webpack_require__) {

	var global = __webpack_require__(31);
	var macrotask = __webpack_require__(263).set;
	var Observer = global.MutationObserver || global.WebKitMutationObserver;
	var process = global.process;
	var Promise = global.Promise;
	var isNode = __webpack_require__(97)(process) == 'process';

	module.exports = function () {
	  var head, last, notify;

	  var flush = function () {
	    var parent, fn;
	    if (isNode && (parent = process.domain)) parent.exit();
	    while (head) {
	      fn = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch (e) {
	        if (head) notify();
	        else last = undefined;
	        throw e;
	      }
	    } last = undefined;
	    if (parent) parent.enter();
	  };

	  // Node.js
	  if (isNode) {
	    notify = function () {
	      process.nextTick(flush);
	    };
	  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
	  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
	    var toggle = true;
	    var node = document.createTextNode('');
	    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
	    notify = function () {
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if (Promise && Promise.resolve) {
	    // Promise.resolve without an argument throws an error in LG WebOS 2
	    var promise = Promise.resolve(undefined);
	    notify = function () {
	      promise.then(flush);
	    };
	  // for other environments - macrotask based on:
	  // - setImmediate
	  // - MessageChannel
	  // - window.postMessag
	  // - onreadystatechange
	  // - setTimeout
	  } else {
	    notify = function () {
	      // strange IE + webpack dev server bug - use .call(global)
	      macrotask.call(global, flush);
	    };
	  }

	  return function (fn) {
	    var task = { fn: fn, next: undefined };
	    if (last) last.next = task;
	    if (!head) {
	      head = task;
	      notify();
	    } last = task;
	  };
	};


/***/ }),

/***/ 431:
/***/ (function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(37);
	var core = __webpack_require__(22);
	var fails = __webpack_require__(82);
	module.exports = function (KEY, exec) {
	  var fn = (core.Object || {})[KEY] || Object[KEY];
	  var exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
	};


/***/ }),

/***/ 432:
/***/ (function(module, exports, __webpack_require__) {

	var hide = __webpack_require__(70);
	module.exports = function (target, src, safe) {
	  for (var key in src) {
	    if (safe && target[key]) target[key] = src[key];
	    else hide(target, key, src[key]);
	  } return target;
	};


/***/ }),

/***/ 434:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var global = __webpack_require__(31);
	var core = __webpack_require__(22);
	var dP = __webpack_require__(61);
	var DESCRIPTORS = __webpack_require__(68);
	var SPECIES = __webpack_require__(33)('species');

	module.exports = function (KEY) {
	  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
	  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
	    configurable: true,
	    get: function () { return this; }
	  });
	};


/***/ }),

/***/ 437:
/***/ (function(module, exports, __webpack_require__) {

	var global = __webpack_require__(31);
	var navigator = global.navigator;

	module.exports = navigator && navigator.userAgent || '';


/***/ }),

/***/ 438:
/***/ (function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(47);
	var get = __webpack_require__(178);
	module.exports = __webpack_require__(22).getIterator = function (it) {
	  var iterFn = get(it);
	  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};


/***/ }),

/***/ 443:
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(121);
	var $keys = __webpack_require__(83);

	__webpack_require__(431)('keys', function () {
	  return function keys(it) {
	    return $keys(toObject(it));
	  };
	});


/***/ }),

/***/ 445:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY = __webpack_require__(99);
	var global = __webpack_require__(31);
	var ctx = __webpack_require__(81);
	var classof = __webpack_require__(247);
	var $export = __webpack_require__(37);
	var isObject = __webpack_require__(60);
	var aFunction = __webpack_require__(119);
	var anInstance = __webpack_require__(416);
	var forOf = __webpack_require__(420);
	var speciesConstructor = __webpack_require__(262);
	var task = __webpack_require__(263).set;
	var microtask = __webpack_require__(426)();
	var newPromiseCapabilityModule = __webpack_require__(168);
	var perform = __webpack_require__(259);
	var userAgent = __webpack_require__(437);
	var promiseResolve = __webpack_require__(260);
	var PROMISE = 'Promise';
	var TypeError = global.TypeError;
	var process = global.process;
	var versions = process && process.versions;
	var v8 = versions && versions.v8 || '';
	var $Promise = global[PROMISE];
	var isNode = classof(process) == 'process';
	var empty = function () { /* empty */ };
	var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
	var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

	var USE_NATIVE = !!function () {
	  try {
	    // correct subclassing with @@species support
	    var promise = $Promise.resolve(1);
	    var FakePromise = (promise.constructor = {})[__webpack_require__(33)('species')] = function (exec) {
	      exec(empty, empty);
	    };
	    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    return (isNode || typeof PromiseRejectionEvent == 'function')
	      && promise.then(empty) instanceof FakePromise
	      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
	      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
	      // we can't detect it synchronously, so just check versions
	      && v8.indexOf('6.6') !== 0
	      && userAgent.indexOf('Chrome/66') === -1;
	  } catch (e) { /* empty */ }
	}();

	// helpers
	var isThenable = function (it) {
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var notify = function (promise, isReject) {
	  if (promise._n) return;
	  promise._n = true;
	  var chain = promise._c;
	  microtask(function () {
	    var value = promise._v;
	    var ok = promise._s == 1;
	    var i = 0;
	    var run = function (reaction) {
	      var handler = ok ? reaction.ok : reaction.fail;
	      var resolve = reaction.resolve;
	      var reject = reaction.reject;
	      var domain = reaction.domain;
	      var result, then, exited;
	      try {
	        if (handler) {
	          if (!ok) {
	            if (promise._h == 2) onHandleUnhandled(promise);
	            promise._h = 1;
	          }
	          if (handler === true) result = value;
	          else {
	            if (domain) domain.enter();
	            result = handler(value); // may throw
	            if (domain) {
	              domain.exit();
	              exited = true;
	            }
	          }
	          if (result === reaction.promise) {
	            reject(TypeError('Promise-chain cycle'));
	          } else if (then = isThenable(result)) {
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch (e) {
	        if (domain && !exited) domain.exit();
	        reject(e);
	      }
	    };
	    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
	    promise._c = [];
	    promise._n = false;
	    if (isReject && !promise._h) onUnhandled(promise);
	  });
	};
	var onUnhandled = function (promise) {
	  task.call(global, function () {
	    var value = promise._v;
	    var unhandled = isUnhandled(promise);
	    var result, handler, console;
	    if (unhandled) {
	      result = perform(function () {
	        if (isNode) {
	          process.emit('unhandledRejection', value, promise);
	        } else if (handler = global.onunhandledrejection) {
	          handler({ promise: promise, reason: value });
	        } else if ((console = global.console) && console.error) {
	          console.error('Unhandled promise rejection', value);
	        }
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
	    } promise._a = undefined;
	    if (unhandled && result.e) throw result.v;
	  });
	};
	var isUnhandled = function (promise) {
	  return promise._h !== 1 && (promise._a || promise._c).length === 0;
	};
	var onHandleUnhandled = function (promise) {
	  task.call(global, function () {
	    var handler;
	    if (isNode) {
	      process.emit('rejectionHandled', promise);
	    } else if (handler = global.onrejectionhandled) {
	      handler({ promise: promise, reason: promise._v });
	    }
	  });
	};
	var $reject = function (value) {
	  var promise = this;
	  if (promise._d) return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  promise._v = value;
	  promise._s = 2;
	  if (!promise._a) promise._a = promise._c.slice();
	  notify(promise, true);
	};
	var $resolve = function (value) {
	  var promise = this;
	  var then;
	  if (promise._d) return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  try {
	    if (promise === value) throw TypeError("Promise can't be resolved itself");
	    if (then = isThenable(value)) {
	      microtask(function () {
	        var wrapper = { _w: promise, _d: false }; // wrap
	        try {
	          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	        } catch (e) {
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      promise._v = value;
	      promise._s = 1;
	      notify(promise, false);
	    }
	  } catch (e) {
	    $reject.call({ _w: promise, _d: false }, e); // wrap
	  }
	};

	// constructor polyfill
	if (!USE_NATIVE) {
	  // 25.4.3.1 Promise(executor)
	  $Promise = function Promise(executor) {
	    anInstance(this, $Promise, PROMISE, '_h');
	    aFunction(executor);
	    Internal.call(this);
	    try {
	      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
	    } catch (err) {
	      $reject.call(this, err);
	    }
	  };
	  // eslint-disable-next-line no-unused-vars
	  Internal = function Promise(executor) {
	    this._c = [];             // <- awaiting reactions
	    this._a = undefined;      // <- checked in isUnhandled reactions
	    this._s = 0;              // <- state
	    this._d = false;          // <- done
	    this._v = undefined;      // <- value
	    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
	    this._n = false;          // <- notify
	  };
	  Internal.prototype = __webpack_require__(432)($Promise.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected) {
	      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
	      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail = typeof onRejected == 'function' && onRejected;
	      reaction.domain = isNode ? process.domain : undefined;
	      this._c.push(reaction);
	      if (this._a) this._a.push(reaction);
	      if (this._s) notify(this, false);
	      return reaction.promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function (onRejected) {
	      return this.then(undefined, onRejected);
	    }
	  });
	  OwnPromiseCapability = function () {
	    var promise = new Internal();
	    this.promise = promise;
	    this.resolve = ctx($resolve, promise, 1);
	    this.reject = ctx($reject, promise, 1);
	  };
	  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
	    return C === $Promise || C === Wrapper
	      ? new OwnPromiseCapability(C)
	      : newGenericPromiseCapability(C);
	  };
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
	__webpack_require__(120)($Promise, PROMISE);
	__webpack_require__(434)(PROMISE);
	Wrapper = __webpack_require__(22)[PROMISE];

	// statics
	$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r) {
	    var capability = newPromiseCapability(this);
	    var $$reject = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x) {
	    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
	  }
	});
	$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(254)(function (iter) {
	  $Promise.all(iter)['catch'](empty);
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable) {
	    var C = this;
	    var capability = newPromiseCapability(C);
	    var resolve = capability.resolve;
	    var reject = capability.reject;
	    var result = perform(function () {
	      var values = [];
	      var index = 0;
	      var remaining = 1;
	      forOf(iterable, false, function (promise) {
	        var $index = index++;
	        var alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        C.resolve(promise).then(function (value) {
	          if (alreadyCalled) return;
	          alreadyCalled = true;
	          values[$index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if (result.e) reject(result.v);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable) {
	    var C = this;
	    var capability = newPromiseCapability(C);
	    var reject = capability.reject;
	    var result = perform(function () {
	      forOf(iterable, false, function (promise) {
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if (result.e) reject(result.v);
	    return capability.promise;
	  }
	});


/***/ }),

/***/ 449:
/***/ (function(module, exports, __webpack_require__) {

	// https://github.com/tc39/proposal-promise-finally
	'use strict';
	var $export = __webpack_require__(37);
	var core = __webpack_require__(22);
	var global = __webpack_require__(31);
	var speciesConstructor = __webpack_require__(262);
	var promiseResolve = __webpack_require__(260);

	$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
	  var C = speciesConstructor(this, core.Promise || global.Promise);
	  var isFunction = typeof onFinally == 'function';
	  return this.then(
	    isFunction ? function (x) {
	      return promiseResolve(C, onFinally()).then(function () { return x; });
	    } : onFinally,
	    isFunction ? function (e) {
	      return promiseResolve(C, onFinally()).then(function () { throw e; });
	    } : onFinally
	  );
	} });


/***/ }),

/***/ 450:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/tc39/proposal-promise-try
	var $export = __webpack_require__(37);
	var newPromiseCapability = __webpack_require__(168);
	var perform = __webpack_require__(259);

	$export($export.S, 'Promise', { 'try': function (callbackfn) {
	  var promiseCapability = newPromiseCapability.f(this);
	  var result = perform(callbackfn);
	  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
	  return promiseCapability.promise;
	} });


/***/ }),

/***/ 576:
/***/ (function(module, exports, __webpack_require__) {

	var pSlice = Array.prototype.slice;
	var objectKeys = __webpack_require__(578);
	var isArguments = __webpack_require__(577);

	var deepEqual = module.exports = function (actual, expected, opts) {
	  if (!opts) opts = {};
	  // 7.1. All identical values are equivalent, as determined by ===.
	  if (actual === expected) {
	    return true;

	  } else if (actual instanceof Date && expected instanceof Date) {
	    return actual.getTime() === expected.getTime();

	  // 7.3. Other pairs that do not both pass typeof value == 'object',
	  // equivalence is determined by ==.
	  } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
	    return opts.strict ? actual === expected : actual == expected;

	  // 7.4. For all other Object pairs, including Array objects, equivalence is
	  // determined by having the same number of owned properties (as verified
	  // with Object.prototype.hasOwnProperty.call), the same set of keys
	  // (although not necessarily the same order), equivalent values for every
	  // corresponding key, and an identical 'prototype' property. Note: this
	  // accounts for both named and indexed properties on Arrays.
	  } else {
	    return objEquiv(actual, expected, opts);
	  }
	}

	function isUndefinedOrNull(value) {
	  return value === null || value === undefined;
	}

	function isBuffer (x) {
	  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
	  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
	    return false;
	  }
	  if (x.length > 0 && typeof x[0] !== 'number') return false;
	  return true;
	}

	function objEquiv(a, b, opts) {
	  var i, key;
	  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
	    return false;
	  // an identical 'prototype' property.
	  if (a.prototype !== b.prototype) return false;
	  //~~~I've managed to break Object.keys through screwy arguments passing.
	  //   Converting to array solves the problem.
	  if (isArguments(a)) {
	    if (!isArguments(b)) {
	      return false;
	    }
	    a = pSlice.call(a);
	    b = pSlice.call(b);
	    return deepEqual(a, b, opts);
	  }
	  if (isBuffer(a)) {
	    if (!isBuffer(b)) {
	      return false;
	    }
	    if (a.length !== b.length) return false;
	    for (i = 0; i < a.length; i++) {
	      if (a[i] !== b[i]) return false;
	    }
	    return true;
	  }
	  try {
	    var ka = objectKeys(a),
	        kb = objectKeys(b);
	  } catch (e) {//happens when one is a string literal and the other isn't
	    return false;
	  }
	  // having the same number of owned properties (keys incorporates
	  // hasOwnProperty)
	  if (ka.length != kb.length)
	    return false;
	  //the same set of keys (although not necessarily the same order),
	  ka.sort();
	  kb.sort();
	  //~~~cheap key test
	  for (i = ka.length - 1; i >= 0; i--) {
	    if (ka[i] != kb[i])
	      return false;
	  }
	  //equivalent values for every corresponding key, and
	  //~~~possibly expensive deep test
	  for (i = ka.length - 1; i >= 0; i--) {
	    key = ka[i];
	    if (!deepEqual(a[key], b[key], opts)) return false;
	  }
	  return typeof a === typeof b;
	}


/***/ }),

/***/ 577:
/***/ (function(module, exports) {

	var supportsArgumentsClass = (function(){
	  return Object.prototype.toString.call(arguments)
	})() == '[object Arguments]';

	exports = module.exports = supportsArgumentsClass ? supported : unsupported;

	exports.supported = supported;
	function supported(object) {
	  return Object.prototype.toString.call(object) == '[object Arguments]';
	};

	exports.unsupported = unsupported;
	function unsupported(object){
	  return object &&
	    typeof object == 'object' &&
	    typeof object.length == 'number' &&
	    Object.prototype.hasOwnProperty.call(object, 'callee') &&
	    !Object.prototype.propertyIsEnumerable.call(object, 'callee') ||
	    false;
	};


/***/ }),

/***/ 578:
/***/ (function(module, exports) {

	exports = module.exports = typeof Object.keys === 'function'
	  ? Object.keys : shim;

	exports.shim = shim;
	function shim (obj) {
	  var keys = [];
	  for (var key in obj) keys.push(key);
	  return keys;
	}


/***/ }),

/***/ 592:
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * https://github.com/es-shims/es5-shim
	 * @license es5-shim Copyright 2009-2015 by contributors, MIT License
	 * see https://github.com/es-shims/es5-shim/blob/master/LICENSE
	 */

	// vim: ts=4 sts=4 sw=4 expandtab

	// Add semicolon to prevent IIFE from being passed as argument to concatenated code.
	;

	// UMD (Universal Module Definition)
	// see https://github.com/umdjs/umd/blob/master/templates/returnExports.js
	(function (root, factory) {
	    'use strict';

	    /* global define, exports, module */
	    if (true) {
	        // AMD. Register as an anonymous module.
	        !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports === 'object') {
	        // Node. Does not work with strict CommonJS, but
	        // only CommonJS-like enviroments that support module.exports,
	        // like Node.
	        module.exports = factory();
	    } else {
	        // Browser globals (root is window)
	        root.returnExports = factory();
	    }
	}(this, function () {
	    /**
	     * Brings an environment as close to ECMAScript 5 compliance
	     * as is possible with the facilities of erstwhile engines.
	     *
	     * Annotated ES5: http://es5.github.com/ (specific links below)
	     * ES5 Spec: http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-262.pdf
	     * Required reading: http://javascriptweblog.wordpress.com/2011/12/05/extending-javascript-natives/
	     */

	    // Shortcut to an often accessed properties, in order to avoid multiple
	    // dereference that costs universally. This also holds a reference to known-good
	    // functions.
	    var $Array = Array;
	    var ArrayPrototype = $Array.prototype;
	    var $Object = Object;
	    var ObjectPrototype = $Object.prototype;
	    var $Function = Function;
	    var FunctionPrototype = $Function.prototype;
	    var $String = String;
	    var StringPrototype = $String.prototype;
	    var $Number = Number;
	    var NumberPrototype = $Number.prototype;
	    var array_slice = ArrayPrototype.slice;
	    var array_splice = ArrayPrototype.splice;
	    var array_push = ArrayPrototype.push;
	    var array_unshift = ArrayPrototype.unshift;
	    var array_concat = ArrayPrototype.concat;
	    var array_join = ArrayPrototype.join;
	    var call = FunctionPrototype.call;
	    var apply = FunctionPrototype.apply;
	    var max = Math.max;
	    var min = Math.min;

	    // Having a toString local variable name breaks in Opera so use to_string.
	    var to_string = ObjectPrototype.toString;

	    /* global Symbol */
	    /* eslint-disable one-var-declaration-per-line, no-redeclare, max-statements-per-line */
	    var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';
	    var isCallable; /* inlined from https://npmjs.com/is-callable */ var fnToStr = Function.prototype.toString, constructorRegex = /^\s*class /, isES6ClassFn = function isES6ClassFn(value) { try { var fnStr = fnToStr.call(value); var singleStripped = fnStr.replace(/\/\/.*\n/g, ''); var multiStripped = singleStripped.replace(/\/\*[.\s\S]*\*\//g, ''); var spaceStripped = multiStripped.replace(/\n/mg, ' ').replace(/ {2}/g, ' '); return constructorRegex.test(spaceStripped); } catch (e) { return false; /* not a function */ } }, tryFunctionObject = function tryFunctionObject(value) { try { if (isES6ClassFn(value)) { return false; } fnToStr.call(value); return true; } catch (e) { return false; } }, fnClass = '[object Function]', genClass = '[object GeneratorFunction]', isCallable = function isCallable(value) { if (!value) { return false; } if (typeof value !== 'function' && typeof value !== 'object') { return false; } if (hasToStringTag) { return tryFunctionObject(value); } if (isES6ClassFn(value)) { return false; } var strClass = to_string.call(value); return strClass === fnClass || strClass === genClass; };

	    var isRegex; /* inlined from https://npmjs.com/is-regex */ var regexExec = RegExp.prototype.exec, tryRegexExec = function tryRegexExec(value) { try { regexExec.call(value); return true; } catch (e) { return false; } }, regexClass = '[object RegExp]'; isRegex = function isRegex(value) { if (typeof value !== 'object') { return false; } return hasToStringTag ? tryRegexExec(value) : to_string.call(value) === regexClass; };
	    var isString; /* inlined from https://npmjs.com/is-string */ var strValue = String.prototype.valueOf, tryStringObject = function tryStringObject(value) { try { strValue.call(value); return true; } catch (e) { return false; } }, stringClass = '[object String]'; isString = function isString(value) { if (typeof value === 'string') { return true; } if (typeof value !== 'object') { return false; } return hasToStringTag ? tryStringObject(value) : to_string.call(value) === stringClass; };
	    /* eslint-enable one-var-declaration-per-line, no-redeclare, max-statements-per-line */

	    /* inlined from http://npmjs.com/define-properties */
	    var supportsDescriptors = $Object.defineProperty && (function () {
	        try {
	            var obj = {};
	            $Object.defineProperty(obj, 'x', { enumerable: false, value: obj });
	            for (var _ in obj) { // jscs:ignore disallowUnusedVariables
	                return false;
	            }
	            return obj.x === obj;
	        } catch (e) { /* this is ES3 */
	            return false;
	        }
	    }());
	    var defineProperties = (function (has) {
	        // Define configurable, writable, and non-enumerable props
	        // if they don't exist.
	        var defineProperty;
	        if (supportsDescriptors) {
	            defineProperty = function (object, name, method, forceAssign) {
	                if (!forceAssign && (name in object)) {
	                    return;
	                }
	                $Object.defineProperty(object, name, {
	                    configurable: true,
	                    enumerable: false,
	                    writable: true,
	                    value: method
	                });
	            };
	        } else {
	            defineProperty = function (object, name, method, forceAssign) {
	                if (!forceAssign && (name in object)) {
	                    return;
	                }
	                object[name] = method;
	            };
	        }
	        return function defineProperties(object, map, forceAssign) {
	            for (var name in map) {
	                if (has.call(map, name)) {
	                    defineProperty(object, name, map[name], forceAssign);
	                }
	            }
	        };
	    }(ObjectPrototype.hasOwnProperty));

	    //
	    // Util
	    // ======
	    //

	    /* replaceable with https://npmjs.com/package/es-abstract /helpers/isPrimitive */
	    var isPrimitive = function isPrimitive(input) {
	        var type = typeof input;
	        return input === null || (type !== 'object' && type !== 'function');
	    };

	    var isActualNaN = $Number.isNaN || function isActualNaN(x) {
	        return x !== x;
	    };

	    var ES = {
	        // ES5 9.4
	        // http://es5.github.com/#x9.4
	        // http://jsperf.com/to-integer
	        /* replaceable with https://npmjs.com/package/es-abstract ES5.ToInteger */
	        ToInteger: function ToInteger(num) {
	            var n = +num;
	            if (isActualNaN(n)) {
	                n = 0;
	            } else if (n !== 0 && n !== (1 / 0) && n !== -(1 / 0)) {
	                n = (n > 0 || -1) * Math.floor(Math.abs(n));
	            }
	            return n;
	        },

	        /* replaceable with https://npmjs.com/package/es-abstract ES5.ToPrimitive */
	        ToPrimitive: function ToPrimitive(input) {
	            var val, valueOf, toStr;
	            if (isPrimitive(input)) {
	                return input;
	            }
	            valueOf = input.valueOf;
	            if (isCallable(valueOf)) {
	                val = valueOf.call(input);
	                if (isPrimitive(val)) {
	                    return val;
	                }
	            }
	            toStr = input.toString;
	            if (isCallable(toStr)) {
	                val = toStr.call(input);
	                if (isPrimitive(val)) {
	                    return val;
	                }
	            }
	            throw new TypeError();
	        },

	        // ES5 9.9
	        // http://es5.github.com/#x9.9
	        /* replaceable with https://npmjs.com/package/es-abstract ES5.ToObject */
	        ToObject: function (o) {
	            if (o == null) { // this matches both null and undefined
	                throw new TypeError("can't convert " + o + ' to object');
	            }
	            return $Object(o);
	        },

	        /* replaceable with https://npmjs.com/package/es-abstract ES5.ToUint32 */
	        ToUint32: function ToUint32(x) {
	            return x >>> 0;
	        }
	    };

	    //
	    // Function
	    // ========
	    //

	    // ES-5 15.3.4.5
	    // http://es5.github.com/#x15.3.4.5

	    var Empty = function Empty() {};

	    defineProperties(FunctionPrototype, {
	        bind: function bind(that) { // .length is 1
	            // 1. Let Target be the this value.
	            var target = this;
	            // 2. If IsCallable(Target) is false, throw a TypeError exception.
	            if (!isCallable(target)) {
	                throw new TypeError('Function.prototype.bind called on incompatible ' + target);
	            }
	            // 3. Let A be a new (possibly empty) internal list of all of the
	            //   argument values provided after thisArg (arg1, arg2 etc), in order.
	            // XXX slicedArgs will stand in for "A" if used
	            var args = array_slice.call(arguments, 1); // for normal call
	            // 4. Let F be a new native ECMAScript object.
	            // 11. Set the [[Prototype]] internal property of F to the standard
	            //   built-in Function prototype object as specified in 15.3.3.1.
	            // 12. Set the [[Call]] internal property of F as described in
	            //   15.3.4.5.1.
	            // 13. Set the [[Construct]] internal property of F as described in
	            //   15.3.4.5.2.
	            // 14. Set the [[HasInstance]] internal property of F as described in
	            //   15.3.4.5.3.
	            var bound;
	            var binder = function () {

	                if (this instanceof bound) {
	                    // 15.3.4.5.2 [[Construct]]
	                    // When the [[Construct]] internal method of a function object,
	                    // F that was created using the bind function is called with a
	                    // list of arguments ExtraArgs, the following steps are taken:
	                    // 1. Let target be the value of F's [[TargetFunction]]
	                    //   internal property.
	                    // 2. If target has no [[Construct]] internal method, a
	                    //   TypeError exception is thrown.
	                    // 3. Let boundArgs be the value of F's [[BoundArgs]] internal
	                    //   property.
	                    // 4. Let args be a new list containing the same values as the
	                    //   list boundArgs in the same order followed by the same
	                    //   values as the list ExtraArgs in the same order.
	                    // 5. Return the result of calling the [[Construct]] internal
	                    //   method of target providing args as the arguments.

	                    var result = apply.call(
	                        target,
	                        this,
	                        array_concat.call(args, array_slice.call(arguments))
	                    );
	                    if ($Object(result) === result) {
	                        return result;
	                    }
	                    return this;

	                } else {
	                    // 15.3.4.5.1 [[Call]]
	                    // When the [[Call]] internal method of a function object, F,
	                    // which was created using the bind function is called with a
	                    // this value and a list of arguments ExtraArgs, the following
	                    // steps are taken:
	                    // 1. Let boundArgs be the value of F's [[BoundArgs]] internal
	                    //   property.
	                    // 2. Let boundThis be the value of F's [[BoundThis]] internal
	                    //   property.
	                    // 3. Let target be the value of F's [[TargetFunction]] internal
	                    //   property.
	                    // 4. Let args be a new list containing the same values as the
	                    //   list boundArgs in the same order followed by the same
	                    //   values as the list ExtraArgs in the same order.
	                    // 5. Return the result of calling the [[Call]] internal method
	                    //   of target providing boundThis as the this value and
	                    //   providing args as the arguments.

	                    // equiv: target.call(this, ...boundArgs, ...args)
	                    return apply.call(
	                        target,
	                        that,
	                        array_concat.call(args, array_slice.call(arguments))
	                    );

	                }

	            };

	            // 15. If the [[Class]] internal property of Target is "Function", then
	            //     a. Let L be the length property of Target minus the length of A.
	            //     b. Set the length own property of F to either 0 or L, whichever is
	            //       larger.
	            // 16. Else set the length own property of F to 0.

	            var boundLength = max(0, target.length - args.length);

	            // 17. Set the attributes of the length own property of F to the values
	            //   specified in 15.3.5.1.
	            var boundArgs = [];
	            for (var i = 0; i < boundLength; i++) {
	                array_push.call(boundArgs, '$' + i);
	            }

	            // XXX Build a dynamic function with desired amount of arguments is the only
	            // way to set the length property of a function.
	            // In environments where Content Security Policies enabled (Chrome extensions,
	            // for ex.) all use of eval or Function costructor throws an exception.
	            // However in all of these environments Function.prototype.bind exists
	            // and so this code will never be executed.
	            bound = $Function('binder', 'return function (' + array_join.call(boundArgs, ',') + '){ return binder.apply(this, arguments); }')(binder);

	            if (target.prototype) {
	                Empty.prototype = target.prototype;
	                bound.prototype = new Empty();
	                // Clean up dangling references.
	                Empty.prototype = null;
	            }

	            // TODO
	            // 18. Set the [[Extensible]] internal property of F to true.

	            // TODO
	            // 19. Let thrower be the [[ThrowTypeError]] function Object (13.2.3).
	            // 20. Call the [[DefineOwnProperty]] internal method of F with
	            //   arguments "caller", PropertyDescriptor {[[Get]]: thrower, [[Set]]:
	            //   thrower, [[Enumerable]]: false, [[Configurable]]: false}, and
	            //   false.
	            // 21. Call the [[DefineOwnProperty]] internal method of F with
	            //   arguments "arguments", PropertyDescriptor {[[Get]]: thrower,
	            //   [[Set]]: thrower, [[Enumerable]]: false, [[Configurable]]: false},
	            //   and false.

	            // TODO
	            // NOTE Function objects created using Function.prototype.bind do not
	            // have a prototype property or the [[Code]], [[FormalParameters]], and
	            // [[Scope]] internal properties.
	            // XXX can't delete prototype in pure-js.

	            // 22. Return F.
	            return bound;
	        }
	    });

	    // _Please note: Shortcuts are defined after `Function.prototype.bind` as we
	    // use it in defining shortcuts.
	    var owns = call.bind(ObjectPrototype.hasOwnProperty);
	    var toStr = call.bind(ObjectPrototype.toString);
	    var arraySlice = call.bind(array_slice);
	    var arraySliceApply = apply.bind(array_slice);
	    /* globals document */
	    if (typeof document === 'object' && document && document.documentElement) {
	        try {
	            arraySlice(document.documentElement.childNodes);
	        } catch (e) {
	            var origArraySlice = arraySlice;
	            var origArraySliceApply = arraySliceApply;
	            arraySlice = function arraySliceIE(arr) {
	                var r = [];
	                var i = arr.length;
	                while (i-- > 0) {
	                    r[i] = arr[i];
	                }
	                return origArraySliceApply(r, origArraySlice(arguments, 1));
	            };
	            arraySliceApply = function arraySliceApplyIE(arr, args) {
	                return origArraySliceApply(arraySlice(arr), args);
	            };
	        }
	    }
	    var strSlice = call.bind(StringPrototype.slice);
	    var strSplit = call.bind(StringPrototype.split);
	    var strIndexOf = call.bind(StringPrototype.indexOf);
	    var pushCall = call.bind(array_push);
	    var isEnum = call.bind(ObjectPrototype.propertyIsEnumerable);
	    var arraySort = call.bind(ArrayPrototype.sort);

	    //
	    // Array
	    // =====
	    //

	    var isArray = $Array.isArray || function isArray(obj) {
	        return toStr(obj) === '[object Array]';
	    };

	    // ES5 15.4.4.12
	    // http://es5.github.com/#x15.4.4.13
	    // Return len+argCount.
	    // [bugfix, ielt8]
	    // IE < 8 bug: [].unshift(0) === undefined but should be "1"
	    var hasUnshiftReturnValueBug = [].unshift(0) !== 1;
	    defineProperties(ArrayPrototype, {
	        unshift: function () {
	            array_unshift.apply(this, arguments);
	            return this.length;
	        }
	    }, hasUnshiftReturnValueBug);

	    // ES5 15.4.3.2
	    // http://es5.github.com/#x15.4.3.2
	    // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/isArray
	    defineProperties($Array, { isArray: isArray });

	    // The IsCallable() check in the Array functions
	    // has been replaced with a strict check on the
	    // internal class of the object to trap cases where
	    // the provided function was actually a regular
	    // expression literal, which in V8 and
	    // JavaScriptCore is a typeof "function".  Only in
	    // V8 are regular expression literals permitted as
	    // reduce parameters, so it is desirable in the
	    // general case for the shim to match the more
	    // strict and common behavior of rejecting regular
	    // expressions.

	    // ES5 15.4.4.18
	    // http://es5.github.com/#x15.4.4.18
	    // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/array/forEach

	    // Check failure of by-index access of string characters (IE < 9)
	    // and failure of `0 in boxedString` (Rhino)
	    var boxedString = $Object('a');
	    var splitString = boxedString[0] !== 'a' || !(0 in boxedString);

	    var properlyBoxesContext = function properlyBoxed(method) {
	        // Check node 0.6.21 bug where third parameter is not boxed
	        var properlyBoxesNonStrict = true;
	        var properlyBoxesStrict = true;
	        var threwException = false;
	        if (method) {
	            try {
	                method.call('foo', function (_, __, context) {
	                    if (typeof context !== 'object') {
	                        properlyBoxesNonStrict = false;
	                    }
	                });

	                method.call([1], function () {
	                    'use strict';

	                    properlyBoxesStrict = typeof this === 'string';
	                }, 'x');
	            } catch (e) {
	                threwException = true;
	            }
	        }
	        return !!method && !threwException && properlyBoxesNonStrict && properlyBoxesStrict;
	    };

	    defineProperties(ArrayPrototype, {
	        forEach: function forEach(callbackfn/*, thisArg*/) {
	            var object = ES.ToObject(this);
	            var self = splitString && isString(this) ? strSplit(this, '') : object;
	            var i = -1;
	            var length = ES.ToUint32(self.length);
	            var T;
	            if (arguments.length > 1) {
	                T = arguments[1];
	            }

	            // If no callback function or if callback is not a callable function
	            if (!isCallable(callbackfn)) {
	                throw new TypeError('Array.prototype.forEach callback must be a function');
	            }

	            while (++i < length) {
	                if (i in self) {
	                    // Invoke the callback function with call, passing arguments:
	                    // context, property value, property key, thisArg object
	                    if (typeof T === 'undefined') {
	                        callbackfn(self[i], i, object);
	                    } else {
	                        callbackfn.call(T, self[i], i, object);
	                    }
	                }
	            }
	        }
	    }, !properlyBoxesContext(ArrayPrototype.forEach));

	    // ES5 15.4.4.19
	    // http://es5.github.com/#x15.4.4.19
	    // https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/map
	    defineProperties(ArrayPrototype, {
	        map: function map(callbackfn/*, thisArg*/) {
	            var object = ES.ToObject(this);
	            var self = splitString && isString(this) ? strSplit(this, '') : object;
	            var length = ES.ToUint32(self.length);
	            var result = $Array(length);
	            var T;
	            if (arguments.length > 1) {
	                T = arguments[1];
	            }

	            // If no callback function or if callback is not a callable function
	            if (!isCallable(callbackfn)) {
	                throw new TypeError('Array.prototype.map callback must be a function');
	            }

	            for (var i = 0; i < length; i++) {
	                if (i in self) {
	                    if (typeof T === 'undefined') {
	                        result[i] = callbackfn(self[i], i, object);
	                    } else {
	                        result[i] = callbackfn.call(T, self[i], i, object);
	                    }
	                }
	            }
	            return result;
	        }
	    }, !properlyBoxesContext(ArrayPrototype.map));

	    // ES5 15.4.4.20
	    // http://es5.github.com/#x15.4.4.20
	    // https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/filter
	    defineProperties(ArrayPrototype, {
	        filter: function filter(callbackfn/*, thisArg*/) {
	            var object = ES.ToObject(this);
	            var self = splitString && isString(this) ? strSplit(this, '') : object;
	            var length = ES.ToUint32(self.length);
	            var result = [];
	            var value;
	            var T;
	            if (arguments.length > 1) {
	                T = arguments[1];
	            }

	            // If no callback function or if callback is not a callable function
	            if (!isCallable(callbackfn)) {
	                throw new TypeError('Array.prototype.filter callback must be a function');
	            }

	            for (var i = 0; i < length; i++) {
	                if (i in self) {
	                    value = self[i];
	                    if (typeof T === 'undefined' ? callbackfn(value, i, object) : callbackfn.call(T, value, i, object)) {
	                        pushCall(result, value);
	                    }
	                }
	            }
	            return result;
	        }
	    }, !properlyBoxesContext(ArrayPrototype.filter));

	    // ES5 15.4.4.16
	    // http://es5.github.com/#x15.4.4.16
	    // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/every
	    defineProperties(ArrayPrototype, {
	        every: function every(callbackfn/*, thisArg*/) {
	            var object = ES.ToObject(this);
	            var self = splitString && isString(this) ? strSplit(this, '') : object;
	            var length = ES.ToUint32(self.length);
	            var T;
	            if (arguments.length > 1) {
	                T = arguments[1];
	            }

	            // If no callback function or if callback is not a callable function
	            if (!isCallable(callbackfn)) {
	                throw new TypeError('Array.prototype.every callback must be a function');
	            }

	            for (var i = 0; i < length; i++) {
	                if (i in self && !(typeof T === 'undefined' ? callbackfn(self[i], i, object) : callbackfn.call(T, self[i], i, object))) {
	                    return false;
	                }
	            }
	            return true;
	        }
	    }, !properlyBoxesContext(ArrayPrototype.every));

	    // ES5 15.4.4.17
	    // http://es5.github.com/#x15.4.4.17
	    // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/some
	    defineProperties(ArrayPrototype, {
	        some: function some(callbackfn/*, thisArg */) {
	            var object = ES.ToObject(this);
	            var self = splitString && isString(this) ? strSplit(this, '') : object;
	            var length = ES.ToUint32(self.length);
	            var T;
	            if (arguments.length > 1) {
	                T = arguments[1];
	            }

	            // If no callback function or if callback is not a callable function
	            if (!isCallable(callbackfn)) {
	                throw new TypeError('Array.prototype.some callback must be a function');
	            }

	            for (var i = 0; i < length; i++) {
	                if (i in self && (typeof T === 'undefined' ? callbackfn(self[i], i, object) : callbackfn.call(T, self[i], i, object))) {
	                    return true;
	                }
	            }
	            return false;
	        }
	    }, !properlyBoxesContext(ArrayPrototype.some));

	    // ES5 15.4.4.21
	    // http://es5.github.com/#x15.4.4.21
	    // https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/reduce
	    var reduceCoercesToObject = false;
	    if (ArrayPrototype.reduce) {
	        reduceCoercesToObject = typeof ArrayPrototype.reduce.call('es5', function (_, __, ___, list) {
	            return list;
	        }) === 'object';
	    }
	    defineProperties(ArrayPrototype, {
	        reduce: function reduce(callbackfn/*, initialValue*/) {
	            var object = ES.ToObject(this);
	            var self = splitString && isString(this) ? strSplit(this, '') : object;
	            var length = ES.ToUint32(self.length);

	            // If no callback function or if callback is not a callable function
	            if (!isCallable(callbackfn)) {
	                throw new TypeError('Array.prototype.reduce callback must be a function');
	            }

	            // no value to return if no initial value and an empty array
	            if (length === 0 && arguments.length === 1) {
	                throw new TypeError('reduce of empty array with no initial value');
	            }

	            var i = 0;
	            var result;
	            if (arguments.length >= 2) {
	                result = arguments[1];
	            } else {
	                do {
	                    if (i in self) {
	                        result = self[i++];
	                        break;
	                    }

	                    // if array contains no values, no initial value to return
	                    if (++i >= length) {
	                        throw new TypeError('reduce of empty array with no initial value');
	                    }
	                } while (true);
	            }

	            for (; i < length; i++) {
	                if (i in self) {
	                    result = callbackfn(result, self[i], i, object);
	                }
	            }

	            return result;
	        }
	    }, !reduceCoercesToObject);

	    // ES5 15.4.4.22
	    // http://es5.github.com/#x15.4.4.22
	    // https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/reduceRight
	    var reduceRightCoercesToObject = false;
	    if (ArrayPrototype.reduceRight) {
	        reduceRightCoercesToObject = typeof ArrayPrototype.reduceRight.call('es5', function (_, __, ___, list) {
	            return list;
	        }) === 'object';
	    }
	    defineProperties(ArrayPrototype, {
	        reduceRight: function reduceRight(callbackfn/*, initial*/) {
	            var object = ES.ToObject(this);
	            var self = splitString && isString(this) ? strSplit(this, '') : object;
	            var length = ES.ToUint32(self.length);

	            // If no callback function or if callback is not a callable function
	            if (!isCallable(callbackfn)) {
	                throw new TypeError('Array.prototype.reduceRight callback must be a function');
	            }

	            // no value to return if no initial value, empty array
	            if (length === 0 && arguments.length === 1) {
	                throw new TypeError('reduceRight of empty array with no initial value');
	            }

	            var result;
	            var i = length - 1;
	            if (arguments.length >= 2) {
	                result = arguments[1];
	            } else {
	                do {
	                    if (i in self) {
	                        result = self[i--];
	                        break;
	                    }

	                    // if array contains no values, no initial value to return
	                    if (--i < 0) {
	                        throw new TypeError('reduceRight of empty array with no initial value');
	                    }
	                } while (true);
	            }

	            if (i < 0) {
	                return result;
	            }

	            do {
	                if (i in self) {
	                    result = callbackfn(result, self[i], i, object);
	                }
	            } while (i--);

	            return result;
	        }
	    }, !reduceRightCoercesToObject);

	    // ES5 15.4.4.14
	    // http://es5.github.com/#x15.4.4.14
	    // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/indexOf
	    var hasFirefox2IndexOfBug = ArrayPrototype.indexOf && [0, 1].indexOf(1, 2) !== -1;
	    defineProperties(ArrayPrototype, {
	        indexOf: function indexOf(searchElement/*, fromIndex */) {
	            var self = splitString && isString(this) ? strSplit(this, '') : ES.ToObject(this);
	            var length = ES.ToUint32(self.length);

	            if (length === 0) {
	                return -1;
	            }

	            var i = 0;
	            if (arguments.length > 1) {
	                i = ES.ToInteger(arguments[1]);
	            }

	            // handle negative indices
	            i = i >= 0 ? i : max(0, length + i);
	            for (; i < length; i++) {
	                if (i in self && self[i] === searchElement) {
	                    return i;
	                }
	            }
	            return -1;
	        }
	    }, hasFirefox2IndexOfBug);

	    // ES5 15.4.4.15
	    // http://es5.github.com/#x15.4.4.15
	    // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/lastIndexOf
	    var hasFirefox2LastIndexOfBug = ArrayPrototype.lastIndexOf && [0, 1].lastIndexOf(0, -3) !== -1;
	    defineProperties(ArrayPrototype, {
	        lastIndexOf: function lastIndexOf(searchElement/*, fromIndex */) {
	            var self = splitString && isString(this) ? strSplit(this, '') : ES.ToObject(this);
	            var length = ES.ToUint32(self.length);

	            if (length === 0) {
	                return -1;
	            }
	            var i = length - 1;
	            if (arguments.length > 1) {
	                i = min(i, ES.ToInteger(arguments[1]));
	            }
	            // handle negative indices
	            i = i >= 0 ? i : length - Math.abs(i);
	            for (; i >= 0; i--) {
	                if (i in self && searchElement === self[i]) {
	                    return i;
	                }
	            }
	            return -1;
	        }
	    }, hasFirefox2LastIndexOfBug);

	    // ES5 15.4.4.12
	    // http://es5.github.com/#x15.4.4.12
	    var spliceNoopReturnsEmptyArray = (function () {
	        var a = [1, 2];
	        var result = a.splice();
	        return a.length === 2 && isArray(result) && result.length === 0;
	    }());
	    defineProperties(ArrayPrototype, {
	        // Safari 5.0 bug where .splice() returns undefined
	        splice: function splice(start, deleteCount) {
	            if (arguments.length === 0) {
	                return [];
	            } else {
	                return array_splice.apply(this, arguments);
	            }
	        }
	    }, !spliceNoopReturnsEmptyArray);

	    var spliceWorksWithEmptyObject = (function () {
	        var obj = {};
	        ArrayPrototype.splice.call(obj, 0, 0, 1);
	        return obj.length === 1;
	    }());
	    defineProperties(ArrayPrototype, {
	        splice: function splice(start, deleteCount) {
	            if (arguments.length === 0) {
	                return [];
	            }
	            var args = arguments;
	            this.length = max(ES.ToInteger(this.length), 0);
	            if (arguments.length > 0 && typeof deleteCount !== 'number') {
	                args = arraySlice(arguments);
	                if (args.length < 2) {
	                    pushCall(args, this.length - start);
	                } else {
	                    args[1] = ES.ToInteger(deleteCount);
	                }
	            }
	            return array_splice.apply(this, args);
	        }
	    }, !spliceWorksWithEmptyObject);
	    var spliceWorksWithLargeSparseArrays = (function () {
	        // Per https://github.com/es-shims/es5-shim/issues/295
	        // Safari 7/8 breaks with sparse arrays of size 1e5 or greater
	        var arr = new $Array(1e5);
	        // note: the index MUST be 8 or larger or the test will false pass
	        arr[8] = 'x';
	        arr.splice(1, 1);
	        // note: this test must be defined *after* the indexOf shim
	        // per https://github.com/es-shims/es5-shim/issues/313
	        return arr.indexOf('x') === 7;
	    }());
	    var spliceWorksWithSmallSparseArrays = (function () {
	        // Per https://github.com/es-shims/es5-shim/issues/295
	        // Opera 12.15 breaks on this, no idea why.
	        var n = 256;
	        var arr = [];
	        arr[n] = 'a';
	        arr.splice(n + 1, 0, 'b');
	        return arr[n] === 'a';
	    }());
	    defineProperties(ArrayPrototype, {
	        splice: function splice(start, deleteCount) {
	            var O = ES.ToObject(this);
	            var A = [];
	            var len = ES.ToUint32(O.length);
	            var relativeStart = ES.ToInteger(start);
	            var actualStart = relativeStart < 0 ? max((len + relativeStart), 0) : min(relativeStart, len);
	            var actualDeleteCount = min(max(ES.ToInteger(deleteCount), 0), len - actualStart);

	            var k = 0;
	            var from;
	            while (k < actualDeleteCount) {
	                from = $String(actualStart + k);
	                if (owns(O, from)) {
	                    A[k] = O[from];
	                }
	                k += 1;
	            }

	            var items = arraySlice(arguments, 2);
	            var itemCount = items.length;
	            var to;
	            if (itemCount < actualDeleteCount) {
	                k = actualStart;
	                var maxK = len - actualDeleteCount;
	                while (k < maxK) {
	                    from = $String(k + actualDeleteCount);
	                    to = $String(k + itemCount);
	                    if (owns(O, from)) {
	                        O[to] = O[from];
	                    } else {
	                        delete O[to];
	                    }
	                    k += 1;
	                }
	                k = len;
	                var minK = len - actualDeleteCount + itemCount;
	                while (k > minK) {
	                    delete O[k - 1];
	                    k -= 1;
	                }
	            } else if (itemCount > actualDeleteCount) {
	                k = len - actualDeleteCount;
	                while (k > actualStart) {
	                    from = $String(k + actualDeleteCount - 1);
	                    to = $String(k + itemCount - 1);
	                    if (owns(O, from)) {
	                        O[to] = O[from];
	                    } else {
	                        delete O[to];
	                    }
	                    k -= 1;
	                }
	            }
	            k = actualStart;
	            for (var i = 0; i < items.length; ++i) {
	                O[k] = items[i];
	                k += 1;
	            }
	            O.length = len - actualDeleteCount + itemCount;

	            return A;
	        }
	    }, !spliceWorksWithLargeSparseArrays || !spliceWorksWithSmallSparseArrays);

	    var originalJoin = ArrayPrototype.join;
	    var hasStringJoinBug;
	    try {
	        hasStringJoinBug = Array.prototype.join.call('123', ',') !== '1,2,3';
	    } catch (e) {
	        hasStringJoinBug = true;
	    }
	    if (hasStringJoinBug) {
	        defineProperties(ArrayPrototype, {
	            join: function join(separator) {
	                var sep = typeof separator === 'undefined' ? ',' : separator;
	                return originalJoin.call(isString(this) ? strSplit(this, '') : this, sep);
	            }
	        }, hasStringJoinBug);
	    }

	    var hasJoinUndefinedBug = [1, 2].join(undefined) !== '1,2';
	    if (hasJoinUndefinedBug) {
	        defineProperties(ArrayPrototype, {
	            join: function join(separator) {
	                var sep = typeof separator === 'undefined' ? ',' : separator;
	                return originalJoin.call(this, sep);
	            }
	        }, hasJoinUndefinedBug);
	    }

	    var pushShim = function push(item) {
	        var O = ES.ToObject(this);
	        var n = ES.ToUint32(O.length);
	        var i = 0;
	        while (i < arguments.length) {
	            O[n + i] = arguments[i];
	            i += 1;
	        }
	        O.length = n + i;
	        return n + i;
	    };

	    var pushIsNotGeneric = (function () {
	        var obj = {};
	        var result = Array.prototype.push.call(obj, undefined);
	        return result !== 1 || obj.length !== 1 || typeof obj[0] !== 'undefined' || !owns(obj, 0);
	    }());
	    defineProperties(ArrayPrototype, {
	        push: function push(item) {
	            if (isArray(this)) {
	                return array_push.apply(this, arguments);
	            }
	            return pushShim.apply(this, arguments);
	        }
	    }, pushIsNotGeneric);

	    // This fixes a very weird bug in Opera 10.6 when pushing `undefined
	    var pushUndefinedIsWeird = (function () {
	        var arr = [];
	        var result = arr.push(undefined);
	        return result !== 1 || arr.length !== 1 || typeof arr[0] !== 'undefined' || !owns(arr, 0);
	    }());
	    defineProperties(ArrayPrototype, { push: pushShim }, pushUndefinedIsWeird);

	    // ES5 15.2.3.14
	    // http://es5.github.io/#x15.4.4.10
	    // Fix boxed string bug
	    defineProperties(ArrayPrototype, {
	        slice: function (start, end) {
	            var arr = isString(this) ? strSplit(this, '') : this;
	            return arraySliceApply(arr, arguments);
	        }
	    }, splitString);

	    var sortIgnoresNonFunctions = (function () {
	        try {
	            [1, 2].sort(null);
	        } catch (e) {
	            try {
	                [1, 2].sort({});
	            } catch (e2) {
	                return false;
	            }
	        }
	        return true;
	    }());
	    var sortThrowsOnRegex = (function () {
	        // this is a problem in Firefox 4, in which `typeof /a/ === 'function'`
	        try {
	            [1, 2].sort(/a/);
	            return false;
	        } catch (e) {}
	        return true;
	    }());
	    var sortIgnoresUndefined = (function () {
	        // applies in IE 8, for one.
	        try {
	            [1, 2].sort(undefined);
	            return true;
	        } catch (e) {}
	        return false;
	    }());
	    defineProperties(ArrayPrototype, {
	        sort: function sort(compareFn) {
	            if (typeof compareFn === 'undefined') {
	                return arraySort(this);
	            }
	            if (!isCallable(compareFn)) {
	                throw new TypeError('Array.prototype.sort callback must be a function');
	            }
	            return arraySort(this, compareFn);
	        }
	    }, sortIgnoresNonFunctions || !sortIgnoresUndefined || !sortThrowsOnRegex);

	    //
	    // Object
	    // ======
	    //

	    // ES5 15.2.3.14
	    // http://es5.github.com/#x15.2.3.14

	    // http://whattheheadsaid.com/2010/10/a-safer-object-keys-compatibility-implementation
	    var hasDontEnumBug = !isEnum({ 'toString': null }, 'toString'); // jscs:ignore disallowQuotedKeysInObjects
	    var hasProtoEnumBug = isEnum(function () {}, 'prototype');
	    var hasStringEnumBug = !owns('x', '0');
	    var equalsConstructorPrototype = function (o) {
	        var ctor = o.constructor;
	        return ctor && ctor.prototype === o;
	    };
	    var excludedKeys = {
	        $applicationCache: true,
	        $console: true,
	        $external: true,
	        $frame: true,
	        $frameElement: true,
	        $frames: true,
	        $innerHeight: true,
	        $innerWidth: true,
	        $outerHeight: true,
	        $outerWidth: true,
	        $pageXOffset: true,
	        $pageYOffset: true,
	        $parent: true,
	        $scrollLeft: true,
	        $scrollTop: true,
	        $scrollX: true,
	        $scrollY: true,
	        $self: true,
	        $webkitIndexedDB: true,
	        $webkitStorageInfo: true,
	        $window: true,

	        $width: true,
	        $height: true,
	        $top: true,
	        $localStorage: true
	    };
	    var hasAutomationEqualityBug = (function () {
	        /* globals window */
	        if (typeof window === 'undefined') {
	            return false;
	        }
	        for (var k in window) {
	            try {
	                if (!excludedKeys['$' + k] && owns(window, k) && window[k] !== null && typeof window[k] === 'object') {
	                    equalsConstructorPrototype(window[k]);
	                }
	            } catch (e) {
	                return true;
	            }
	        }
	        return false;
	    }());
	    var equalsConstructorPrototypeIfNotBuggy = function (object) {
	        if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
	            return equalsConstructorPrototype(object);
	        }
	        try {
	            return equalsConstructorPrototype(object);
	        } catch (e) {
	            return false;
	        }
	    };
	    var dontEnums = [
	        'toString',
	        'toLocaleString',
	        'valueOf',
	        'hasOwnProperty',
	        'isPrototypeOf',
	        'propertyIsEnumerable',
	        'constructor'
	    ];
	    var dontEnumsLength = dontEnums.length;

	    // taken directly from https://github.com/ljharb/is-arguments/blob/master/index.js
	    // can be replaced with require('is-arguments') if we ever use a build process instead
	    var isStandardArguments = function isArguments(value) {
	        return toStr(value) === '[object Arguments]';
	    };
	    var isLegacyArguments = function isArguments(value) {
	        return value !== null
	            && typeof value === 'object'
	            && typeof value.length === 'number'
	            && value.length >= 0
	            && !isArray(value)
	            && isCallable(value.callee);
	    };
	    var isArguments = isStandardArguments(arguments) ? isStandardArguments : isLegacyArguments;

	    defineProperties($Object, {
	        keys: function keys(object) {
	            var isFn = isCallable(object);
	            var isArgs = isArguments(object);
	            var isObject = object !== null && typeof object === 'object';
	            var isStr = isObject && isString(object);

	            if (!isObject && !isFn && !isArgs) {
	                throw new TypeError('Object.keys called on a non-object');
	            }

	            var theKeys = [];
	            var skipProto = hasProtoEnumBug && isFn;
	            if ((isStr && hasStringEnumBug) || isArgs) {
	                for (var i = 0; i < object.length; ++i) {
	                    pushCall(theKeys, $String(i));
	                }
	            }

	            if (!isArgs) {
	                for (var name in object) {
	                    if (!(skipProto && name === 'prototype') && owns(object, name)) {
	                        pushCall(theKeys, $String(name));
	                    }
	                }
	            }

	            if (hasDontEnumBug) {
	                var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);
	                for (var j = 0; j < dontEnumsLength; j++) {
	                    var dontEnum = dontEnums[j];
	                    if (!(skipConstructor && dontEnum === 'constructor') && owns(object, dontEnum)) {
	                        pushCall(theKeys, dontEnum);
	                    }
	                }
	            }
	            return theKeys;
	        }
	    });

	    var keysWorksWithArguments = $Object.keys && (function () {
	        // Safari 5.0 bug
	        return $Object.keys(arguments).length === 2;
	    }(1, 2));
	    var keysHasArgumentsLengthBug = $Object.keys && (function () {
	        var argKeys = $Object.keys(arguments);
	        return arguments.length !== 1 || argKeys.length !== 1 || argKeys[0] !== 1;
	    }(1));
	    var originalKeys = $Object.keys;
	    defineProperties($Object, {
	        keys: function keys(object) {
	            if (isArguments(object)) {
	                return originalKeys(arraySlice(object));
	            } else {
	                return originalKeys(object);
	            }
	        }
	    }, !keysWorksWithArguments || keysHasArgumentsLengthBug);

	    //
	    // Date
	    // ====
	    //

	    var hasNegativeMonthYearBug = new Date(-3509827329600292).getUTCMonth() !== 0;
	    var aNegativeTestDate = new Date(-1509842289600292);
	    var aPositiveTestDate = new Date(1449662400000);
	    var hasToUTCStringFormatBug = aNegativeTestDate.toUTCString() !== 'Mon, 01 Jan -45875 11:59:59 GMT';
	    var hasToDateStringFormatBug;
	    var hasToStringFormatBug;
	    var timeZoneOffset = aNegativeTestDate.getTimezoneOffset();
	    if (timeZoneOffset < -720) {
	        hasToDateStringFormatBug = aNegativeTestDate.toDateString() !== 'Tue Jan 02 -45875';
	        hasToStringFormatBug = !(/^Thu Dec 10 2015 \d\d:\d\d:\d\d GMT[-+]\d\d\d\d(?: |$)/).test(String(aPositiveTestDate));
	    } else {
	        hasToDateStringFormatBug = aNegativeTestDate.toDateString() !== 'Mon Jan 01 -45875';
	        hasToStringFormatBug = !(/^Wed Dec 09 2015 \d\d:\d\d:\d\d GMT[-+]\d\d\d\d(?: |$)/).test(String(aPositiveTestDate));
	    }

	    var originalGetFullYear = call.bind(Date.prototype.getFullYear);
	    var originalGetMonth = call.bind(Date.prototype.getMonth);
	    var originalGetDate = call.bind(Date.prototype.getDate);
	    var originalGetUTCFullYear = call.bind(Date.prototype.getUTCFullYear);
	    var originalGetUTCMonth = call.bind(Date.prototype.getUTCMonth);
	    var originalGetUTCDate = call.bind(Date.prototype.getUTCDate);
	    var originalGetUTCDay = call.bind(Date.prototype.getUTCDay);
	    var originalGetUTCHours = call.bind(Date.prototype.getUTCHours);
	    var originalGetUTCMinutes = call.bind(Date.prototype.getUTCMinutes);
	    var originalGetUTCSeconds = call.bind(Date.prototype.getUTCSeconds);
	    var originalGetUTCMilliseconds = call.bind(Date.prototype.getUTCMilliseconds);
	    var dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	    var monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	    var daysInMonth = function daysInMonth(month, year) {
	        return originalGetDate(new Date(year, month, 0));
	    };

	    defineProperties(Date.prototype, {
	        getFullYear: function getFullYear() {
	            if (!this || !(this instanceof Date)) {
	                throw new TypeError('this is not a Date object.');
	            }
	            var year = originalGetFullYear(this);
	            if (year < 0 && originalGetMonth(this) > 11) {
	                return year + 1;
	            }
	            return year;
	        },
	        getMonth: function getMonth() {
	            if (!this || !(this instanceof Date)) {
	                throw new TypeError('this is not a Date object.');
	            }
	            var year = originalGetFullYear(this);
	            var month = originalGetMonth(this);
	            if (year < 0 && month > 11) {
	                return 0;
	            }
	            return month;
	        },
	        getDate: function getDate() {
	            if (!this || !(this instanceof Date)) {
	                throw new TypeError('this is not a Date object.');
	            }
	            var year = originalGetFullYear(this);
	            var month = originalGetMonth(this);
	            var date = originalGetDate(this);
	            if (year < 0 && month > 11) {
	                if (month === 12) {
	                    return date;
	                }
	                var days = daysInMonth(0, year + 1);
	                return (days - date) + 1;
	            }
	            return date;
	        },
	        getUTCFullYear: function getUTCFullYear() {
	            if (!this || !(this instanceof Date)) {
	                throw new TypeError('this is not a Date object.');
	            }
	            var year = originalGetUTCFullYear(this);
	            if (year < 0 && originalGetUTCMonth(this) > 11) {
	                return year + 1;
	            }
	            return year;
	        },
	        getUTCMonth: function getUTCMonth() {
	            if (!this || !(this instanceof Date)) {
	                throw new TypeError('this is not a Date object.');
	            }
	            var year = originalGetUTCFullYear(this);
	            var month = originalGetUTCMonth(this);
	            if (year < 0 && month > 11) {
	                return 0;
	            }
	            return month;
	        },
	        getUTCDate: function getUTCDate() {
	            if (!this || !(this instanceof Date)) {
	                throw new TypeError('this is not a Date object.');
	            }
	            var year = originalGetUTCFullYear(this);
	            var month = originalGetUTCMonth(this);
	            var date = originalGetUTCDate(this);
	            if (year < 0 && month > 11) {
	                if (month === 12) {
	                    return date;
	                }
	                var days = daysInMonth(0, year + 1);
	                return (days - date) + 1;
	            }
	            return date;
	        }
	    }, hasNegativeMonthYearBug);

	    defineProperties(Date.prototype, {
	        toUTCString: function toUTCString() {
	            if (!this || !(this instanceof Date)) {
	                throw new TypeError('this is not a Date object.');
	            }
	            var day = originalGetUTCDay(this);
	            var date = originalGetUTCDate(this);
	            var month = originalGetUTCMonth(this);
	            var year = originalGetUTCFullYear(this);
	            var hour = originalGetUTCHours(this);
	            var minute = originalGetUTCMinutes(this);
	            var second = originalGetUTCSeconds(this);
	            return dayName[day] + ', '
	                + (date < 10 ? '0' + date : date) + ' '
	                + monthName[month] + ' '
	                + year + ' '
	                + (hour < 10 ? '0' + hour : hour) + ':'
	                + (minute < 10 ? '0' + minute : minute) + ':'
	                + (second < 10 ? '0' + second : second) + ' GMT';
	        }
	    }, hasNegativeMonthYearBug || hasToUTCStringFormatBug);

	    // Opera 12 has `,`
	    defineProperties(Date.prototype, {
	        toDateString: function toDateString() {
	            if (!this || !(this instanceof Date)) {
	                throw new TypeError('this is not a Date object.');
	            }
	            var day = this.getDay();
	            var date = this.getDate();
	            var month = this.getMonth();
	            var year = this.getFullYear();
	            return dayName[day] + ' '
	                + monthName[month] + ' '
	                + (date < 10 ? '0' + date : date) + ' '
	                + year;
	        }
	    }, hasNegativeMonthYearBug || hasToDateStringFormatBug);

	    // can't use defineProperties here because of toString enumeration issue in IE <= 8
	    if (hasNegativeMonthYearBug || hasToStringFormatBug) {
	        Date.prototype.toString = function toString() {
	            if (!this || !(this instanceof Date)) {
	                throw new TypeError('this is not a Date object.');
	            }
	            var day = this.getDay();
	            var date = this.getDate();
	            var month = this.getMonth();
	            var year = this.getFullYear();
	            var hour = this.getHours();
	            var minute = this.getMinutes();
	            var second = this.getSeconds();
	            var timezoneOffset = this.getTimezoneOffset();
	            var hoursOffset = Math.floor(Math.abs(timezoneOffset) / 60);
	            var minutesOffset = Math.floor(Math.abs(timezoneOffset) % 60);
	            return dayName[day] + ' '
	                + monthName[month] + ' '
	                + (date < 10 ? '0' + date : date) + ' '
	                + year + ' '
	                + (hour < 10 ? '0' + hour : hour) + ':'
	                + (minute < 10 ? '0' + minute : minute) + ':'
	                + (second < 10 ? '0' + second : second) + ' GMT'
	                + (timezoneOffset > 0 ? '-' : '+')
	                + (hoursOffset < 10 ? '0' + hoursOffset : hoursOffset)
	                + (minutesOffset < 10 ? '0' + minutesOffset : minutesOffset);
	        };
	        if (supportsDescriptors) {
	            $Object.defineProperty(Date.prototype, 'toString', {
	                configurable: true,
	                enumerable: false,
	                writable: true
	            });
	        }
	    }

	    // ES5 15.9.5.43
	    // http://es5.github.com/#x15.9.5.43
	    // This function returns a String value represent the instance in time
	    // represented by this Date object. The format of the String is the Date Time
	    // string format defined in 15.9.1.15. All fields are present in the String.
	    // The time zone is always UTC, denoted by the suffix Z. If the time value of
	    // this object is not a finite Number a RangeError exception is thrown.
	    var negativeDate = -62198755200000;
	    var negativeYearString = '-000001';
	    var hasNegativeDateBug = Date.prototype.toISOString && new Date(negativeDate).toISOString().indexOf(negativeYearString) === -1; // eslint-disable-line max-len
	    var hasSafari51DateBug = Date.prototype.toISOString && new Date(-1).toISOString() !== '1969-12-31T23:59:59.999Z';

	    var getTime = call.bind(Date.prototype.getTime);

	    defineProperties(Date.prototype, {
	        toISOString: function toISOString() {
	            if (!isFinite(this) || !isFinite(getTime(this))) {
	                // Adope Photoshop requires the second check.
	                throw new RangeError('Date.prototype.toISOString called on non-finite value.');
	            }

	            var year = originalGetUTCFullYear(this);

	            var month = originalGetUTCMonth(this);
	            // see https://github.com/es-shims/es5-shim/issues/111
	            year += Math.floor(month / 12);
	            month = ((month % 12) + 12) % 12;

	            // the date time string format is specified in 15.9.1.15.
	            var result = [
	                month + 1,
	                originalGetUTCDate(this),
	                originalGetUTCHours(this),
	                originalGetUTCMinutes(this),
	                originalGetUTCSeconds(this)
	            ];
	            year = (
	                (year < 0 ? '-' : (year > 9999 ? '+' : ''))
	                + strSlice('00000' + Math.abs(year), (0 <= year && year <= 9999) ? -4 : -6)
	            );

	            for (var i = 0; i < result.length; ++i) {
	                // pad months, days, hours, minutes, and seconds to have two digits.
	                result[i] = strSlice('00' + result[i], -2);
	            }
	            // pad milliseconds to have three digits.
	            return (
	                year + '-' + arraySlice(result, 0, 2).join('-')
	                + 'T' + arraySlice(result, 2).join(':') + '.'
	                + strSlice('000' + originalGetUTCMilliseconds(this), -3) + 'Z'
	            );
	        }
	    }, hasNegativeDateBug || hasSafari51DateBug);

	    // ES5 15.9.5.44
	    // http://es5.github.com/#x15.9.5.44
	    // This function provides a String representation of a Date object for use by
	    // JSON.stringify (15.12.3).
	    var dateToJSONIsSupported = (function () {
	        try {
	            return Date.prototype.toJSON
	                && new Date(NaN).toJSON() === null
	                && new Date(negativeDate).toJSON().indexOf(negativeYearString) !== -1
	                && Date.prototype.toJSON.call({ // generic
	                    toISOString: function () { return true; }
	                });
	        } catch (e) {
	            return false;
	        }
	    }());
	    if (!dateToJSONIsSupported) {
	        Date.prototype.toJSON = function toJSON(key) {
	            // When the toJSON method is called with argument key, the following
	            // steps are taken:

	            // 1.  Let O be the result of calling ToObject, giving it the this
	            // value as its argument.
	            // 2. Let tv be ES.ToPrimitive(O, hint Number).
	            var O = $Object(this);
	            var tv = ES.ToPrimitive(O);
	            // 3. If tv is a Number and is not finite, return null.
	            if (typeof tv === 'number' && !isFinite(tv)) {
	                return null;
	            }
	            // 4. Let toISO be the result of calling the [[Get]] internal method of
	            // O with argument "toISOString".
	            var toISO = O.toISOString;
	            // 5. If IsCallable(toISO) is false, throw a TypeError exception.
	            if (!isCallable(toISO)) {
	                throw new TypeError('toISOString property is not callable');
	            }
	            // 6. Return the result of calling the [[Call]] internal method of
	            //  toISO with O as the this value and an empty argument list.
	            return toISO.call(O);

	            // NOTE 1 The argument is ignored.

	            // NOTE 2 The toJSON function is intentionally generic; it does not
	            // require that its this value be a Date object. Therefore, it can be
	            // transferred to other kinds of objects for use as a method. However,
	            // it does require that any such object have a toISOString method. An
	            // object is free to use the argument key to filter its
	            // stringification.
	        };
	    }

	    // ES5 15.9.4.2
	    // http://es5.github.com/#x15.9.4.2
	    // based on work shared by Daniel Friesen (dantman)
	    // http://gist.github.com/303249
	    var supportsExtendedYears = Date.parse('+033658-09-27T01:46:40.000Z') === 1e15;
	    var acceptsInvalidDates = !isNaN(Date.parse('2012-04-04T24:00:00.500Z')) || !isNaN(Date.parse('2012-11-31T23:59:59.000Z')) || !isNaN(Date.parse('2012-12-31T23:59:60.000Z'));
	    var doesNotParseY2KNewYear = isNaN(Date.parse('2000-01-01T00:00:00.000Z'));
	    if (doesNotParseY2KNewYear || acceptsInvalidDates || !supportsExtendedYears) {
	        // XXX global assignment won't work in embeddings that use
	        // an alternate object for the context.
	        /* global Date: true */
	        var maxSafeUnsigned32Bit = Math.pow(2, 31) - 1;
	        var hasSafariSignedIntBug = isActualNaN(new Date(1970, 0, 1, 0, 0, 0, maxSafeUnsigned32Bit + 1).getTime());
	        // eslint-disable-next-line no-implicit-globals, no-global-assign
	        Date = (function (NativeDate) {
	            // Date.length === 7
	            var DateShim = function Date(Y, M, D, h, m, s, ms) {
	                var length = arguments.length;
	                var date;
	                if (this instanceof NativeDate) {
	                    var seconds = s;
	                    var millis = ms;
	                    if (hasSafariSignedIntBug && length >= 7 && ms > maxSafeUnsigned32Bit) {
	                        // work around a Safari 8/9 bug where it treats the seconds as signed
	                        var msToShift = Math.floor(ms / maxSafeUnsigned32Bit) * maxSafeUnsigned32Bit;
	                        var sToShift = Math.floor(msToShift / 1e3);
	                        seconds += sToShift;
	                        millis -= sToShift * 1e3;
	                    }
	                    date = length === 1 && $String(Y) === Y // isString(Y)
	                        // We explicitly pass it through parse:
	                        ? new NativeDate(DateShim.parse(Y))
	                        // We have to manually make calls depending on argument
	                        // length here
	                        : length >= 7 ? new NativeDate(Y, M, D, h, m, seconds, millis)
	                            : length >= 6 ? new NativeDate(Y, M, D, h, m, seconds)
	                                : length >= 5 ? new NativeDate(Y, M, D, h, m)
	                                    : length >= 4 ? new NativeDate(Y, M, D, h)
	                                        : length >= 3 ? new NativeDate(Y, M, D)
	                                            : length >= 2 ? new NativeDate(Y, M)
	                                                : length >= 1 ? new NativeDate(Y instanceof NativeDate ? +Y : Y)
	                                                    : new NativeDate();
	                } else {
	                    date = NativeDate.apply(this, arguments);
	                }
	                if (!isPrimitive(date)) {
	                    // Prevent mixups with unfixed Date object
	                    defineProperties(date, { constructor: DateShim }, true);
	                }
	                return date;
	            };

	            // 15.9.1.15 Date Time String Format.
	            var isoDateExpression = new RegExp('^'
	                + '(\\d{4}|[+-]\\d{6})' // four-digit year capture or sign + 6-digit extended year
	                + '(?:-(\\d{2})' // optional month capture
	                + '(?:-(\\d{2})' // optional day capture
	                + '(?:' // capture hours:minutes:seconds.milliseconds
	                    + 'T(\\d{2})' // hours capture
	                    + ':(\\d{2})' // minutes capture
	                    + '(?:' // optional :seconds.milliseconds
	                        + ':(\\d{2})' // seconds capture
	                        + '(?:(\\.\\d{1,}))?' // milliseconds capture
	                    + ')?'
	                + '(' // capture UTC offset component
	                    + 'Z|' // UTC capture
	                    + '(?:' // offset specifier +/-hours:minutes
	                        + '([-+])' // sign capture
	                        + '(\\d{2})' // hours offset capture
	                        + ':(\\d{2})' // minutes offset capture
	                    + ')'
	                + ')?)?)?)?'
	            + '$');

	            var months = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365];

	            var dayFromMonth = function dayFromMonth(year, month) {
	                var t = month > 1 ? 1 : 0;
	                return (
	                    months[month]
	                    + Math.floor((year - 1969 + t) / 4)
	                    - Math.floor((year - 1901 + t) / 100)
	                    + Math.floor((year - 1601 + t) / 400)
	                    + (365 * (year - 1970))
	                );
	            };

	            var toUTC = function toUTC(t) {
	                var s = 0;
	                var ms = t;
	                if (hasSafariSignedIntBug && ms > maxSafeUnsigned32Bit) {
	                    // work around a Safari 8/9 bug where it treats the seconds as signed
	                    var msToShift = Math.floor(ms / maxSafeUnsigned32Bit) * maxSafeUnsigned32Bit;
	                    var sToShift = Math.floor(msToShift / 1e3);
	                    s += sToShift;
	                    ms -= sToShift * 1e3;
	                }
	                return $Number(new NativeDate(1970, 0, 1, 0, 0, s, ms));
	            };

	            // Copy any custom methods a 3rd party library may have added
	            for (var key in NativeDate) {
	                if (owns(NativeDate, key)) {
	                    DateShim[key] = NativeDate[key];
	                }
	            }

	            // Copy "native" methods explicitly; they may be non-enumerable
	            defineProperties(DateShim, {
	                now: NativeDate.now,
	                UTC: NativeDate.UTC
	            }, true);
	            DateShim.prototype = NativeDate.prototype;
	            defineProperties(DateShim.prototype, { constructor: DateShim }, true);

	            // Upgrade Date.parse to handle simplified ISO 8601 strings
	            var parseShim = function parse(string) {
	                var match = isoDateExpression.exec(string);
	                if (match) {
	                    // parse months, days, hours, minutes, seconds, and milliseconds
	                    // provide default values if necessary
	                    // parse the UTC offset component
	                    var year = $Number(match[1]),
	                        month = $Number(match[2] || 1) - 1,
	                        day = $Number(match[3] || 1) - 1,
	                        hour = $Number(match[4] || 0),
	                        minute = $Number(match[5] || 0),
	                        second = $Number(match[6] || 0),
	                        millisecond = Math.floor($Number(match[7] || 0) * 1000),
	                        // When time zone is missed, local offset should be used
	                        // (ES 5.1 bug)
	                        // see https://bugs.ecmascript.org/show_bug.cgi?id=112
	                        isLocalTime = Boolean(match[4] && !match[8]),
	                        signOffset = match[9] === '-' ? 1 : -1,
	                        hourOffset = $Number(match[10] || 0),
	                        minuteOffset = $Number(match[11] || 0),
	                        result;
	                    var hasMinutesOrSecondsOrMilliseconds = minute > 0 || second > 0 || millisecond > 0;
	                    if (
	                        hour < (hasMinutesOrSecondsOrMilliseconds ? 24 : 25)
	                        && minute < 60 && second < 60 && millisecond < 1000
	                        && month > -1 && month < 12 && hourOffset < 24
	                        && minuteOffset < 60 // detect invalid offsets
	                        && day > -1
	                        && day < (dayFromMonth(year, month + 1) - dayFromMonth(year, month))
	                    ) {
	                        result = (
	                            ((dayFromMonth(year, month) + day) * 24)
	                            + hour
	                            + (hourOffset * signOffset)
	                        ) * 60;
	                        result = ((
	                            ((result + minute + (minuteOffset * signOffset)) * 60)
	                            + second
	                        ) * 1000) + millisecond;
	                        if (isLocalTime) {
	                            result = toUTC(result);
	                        }
	                        if (-8.64e15 <= result && result <= 8.64e15) {
	                            return result;
	                        }
	                    }
	                    return NaN;
	                }
	                return NativeDate.parse.apply(this, arguments);
	            };
	            defineProperties(DateShim, { parse: parseShim });

	            return DateShim;
	        }(Date));
	        /* global Date: false */
	    }

	    // ES5 15.9.4.4
	    // http://es5.github.com/#x15.9.4.4
	    if (!Date.now) {
	        Date.now = function now() {
	            return new Date().getTime();
	        };
	    }

	    //
	    // Number
	    // ======
	    //

	    // ES5.1 15.7.4.5
	    // http://es5.github.com/#x15.7.4.5
	    var hasToFixedBugs = NumberPrototype.toFixed && (
	        (0.00008).toFixed(3) !== '0.000'
	        || (0.9).toFixed(0) !== '1'
	        || (1.255).toFixed(2) !== '1.25'
	        || (1000000000000000128).toFixed(0) !== '1000000000000000128'
	    );

	    var toFixedHelpers = {
	        base: 1e7,
	        size: 6,
	        data: [0, 0, 0, 0, 0, 0],
	        multiply: function multiply(n, c) {
	            var i = -1;
	            var c2 = c;
	            while (++i < toFixedHelpers.size) {
	                c2 += n * toFixedHelpers.data[i];
	                toFixedHelpers.data[i] = c2 % toFixedHelpers.base;
	                c2 = Math.floor(c2 / toFixedHelpers.base);
	            }
	        },
	        divide: function divide(n) {
	            var i = toFixedHelpers.size;
	            var c = 0;
	            while (--i >= 0) {
	                c += toFixedHelpers.data[i];
	                toFixedHelpers.data[i] = Math.floor(c / n);
	                c = (c % n) * toFixedHelpers.base;
	            }
	        },
	        numToString: function numToString() {
	            var i = toFixedHelpers.size;
	            var s = '';
	            while (--i >= 0) {
	                if (s !== '' || i === 0 || toFixedHelpers.data[i] !== 0) {
	                    var t = $String(toFixedHelpers.data[i]);
	                    if (s === '') {
	                        s = t;
	                    } else {
	                        s += strSlice('0000000', 0, 7 - t.length) + t;
	                    }
	                }
	            }
	            return s;
	        },
	        pow: function pow(x, n, acc) {
	            return (n === 0 ? acc : (n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc)));
	        },
	        log: function log(x) {
	            var n = 0;
	            var x2 = x;
	            while (x2 >= 4096) {
	                n += 12;
	                x2 /= 4096;
	            }
	            while (x2 >= 2) {
	                n += 1;
	                x2 /= 2;
	            }
	            return n;
	        }
	    };

	    var toFixedShim = function toFixed(fractionDigits) {
	        var f, x, s, m, e, z, j, k;

	        // Test for NaN and round fractionDigits down
	        f = $Number(fractionDigits);
	        f = isActualNaN(f) ? 0 : Math.floor(f);

	        if (f < 0 || f > 20) {
	            throw new RangeError('Number.toFixed called with invalid number of decimals');
	        }

	        x = $Number(this);

	        if (isActualNaN(x)) {
	            return 'NaN';
	        }

	        // If it is too big or small, return the string value of the number
	        if (x <= -1e21 || x >= 1e21) {
	            return $String(x);
	        }

	        s = '';

	        if (x < 0) {
	            s = '-';
	            x = -x;
	        }

	        m = '0';

	        if (x > 1e-21) {
	            // 1e-21 < x < 1e21
	            // -70 < log2(x) < 70
	            e = toFixedHelpers.log(x * toFixedHelpers.pow(2, 69, 1)) - 69;
	            z = (e < 0 ? x * toFixedHelpers.pow(2, -e, 1) : x / toFixedHelpers.pow(2, e, 1));
	            z *= 0x10000000000000; // Math.pow(2, 52);
	            e = 52 - e;

	            // -18 < e < 122
	            // x = z / 2 ^ e
	            if (e > 0) {
	                toFixedHelpers.multiply(0, z);
	                j = f;

	                while (j >= 7) {
	                    toFixedHelpers.multiply(1e7, 0);
	                    j -= 7;
	                }

	                toFixedHelpers.multiply(toFixedHelpers.pow(10, j, 1), 0);
	                j = e - 1;

	                while (j >= 23) {
	                    toFixedHelpers.divide(1 << 23);
	                    j -= 23;
	                }

	                toFixedHelpers.divide(1 << j);
	                toFixedHelpers.multiply(1, 1);
	                toFixedHelpers.divide(2);
	                m = toFixedHelpers.numToString();
	            } else {
	                toFixedHelpers.multiply(0, z);
	                toFixedHelpers.multiply(1 << (-e), 0);
	                m = toFixedHelpers.numToString() + strSlice('0.00000000000000000000', 2, 2 + f);
	            }
	        }

	        if (f > 0) {
	            k = m.length;

	            if (k <= f) {
	                m = s + strSlice('0.0000000000000000000', 0, f - k + 2) + m;
	            } else {
	                m = s + strSlice(m, 0, k - f) + '.' + strSlice(m, k - f);
	            }
	        } else {
	            m = s + m;
	        }

	        return m;
	    };
	    defineProperties(NumberPrototype, { toFixed: toFixedShim }, hasToFixedBugs);

	    var hasToPrecisionUndefinedBug = (function () {
	        try {
	            return 1.0.toPrecision(undefined) === '1';
	        } catch (e) {
	            return true;
	        }
	    }());
	    var originalToPrecision = NumberPrototype.toPrecision;
	    defineProperties(NumberPrototype, {
	        toPrecision: function toPrecision(precision) {
	            return typeof precision === 'undefined' ? originalToPrecision.call(this) : originalToPrecision.call(this, precision);
	        }
	    }, hasToPrecisionUndefinedBug);

	    //
	    // String
	    // ======
	    //

	    // ES5 15.5.4.14
	    // http://es5.github.com/#x15.5.4.14

	    // [bugfix, IE lt 9, firefox 4, Konqueror, Opera, obscure browsers]
	    // Many browsers do not split properly with regular expressions or they
	    // do not perform the split correctly under obscure conditions.
	    // See http://blog.stevenlevithan.com/archives/cross-browser-split
	    // I've tested in many browsers and this seems to cover the deviant ones:
	    //    'ab'.split(/(?:ab)*/) should be ["", ""], not [""]
	    //    '.'.split(/(.?)(.?)/) should be ["", ".", "", ""], not ["", ""]
	    //    'tesst'.split(/(s)*/) should be ["t", undefined, "e", "s", "t"], not
	    //       [undefined, "t", undefined, "e", ...]
	    //    ''.split(/.?/) should be [], not [""]
	    //    '.'.split(/()()/) should be ["."], not ["", "", "."]

	    if (
	        'ab'.split(/(?:ab)*/).length !== 2
	        || '.'.split(/(.?)(.?)/).length !== 4
	        || 'tesst'.split(/(s)*/)[1] === 't'
	        || 'test'.split(/(?:)/, -1).length !== 4
	        || ''.split(/.?/).length
	        || '.'.split(/()()/).length > 1
	    ) {
	        (function () {
	            var compliantExecNpcg = typeof (/()??/).exec('')[1] === 'undefined'; // NPCG: nonparticipating capturing group
	            var maxSafe32BitInt = Math.pow(2, 32) - 1;

	            StringPrototype.split = function (separator, limit) {
	                var string = String(this);
	                if (typeof separator === 'undefined' && limit === 0) {
	                    return [];
	                }

	                // If `separator` is not a regex, use native split
	                if (!isRegex(separator)) {
	                    return strSplit(this, separator, limit);
	                }

	                var output = [];
	                var flags = (separator.ignoreCase ? 'i' : '')
	                            + (separator.multiline ? 'm' : '')
	                            + (separator.unicode ? 'u' : '') // in ES6
	                            + (separator.sticky ? 'y' : ''), // Firefox 3+ and ES6
	                    lastLastIndex = 0,
	                    // Make `global` and avoid `lastIndex` issues by working with a copy
	                    separator2, match, lastIndex, lastLength;
	                var separatorCopy = new RegExp(separator.source, flags + 'g');
	                if (!compliantExecNpcg) {
	                    // Doesn't need flags gy, but they don't hurt
	                    separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
	                }
	                /* Values for `limit`, per the spec:
	                 * If undefined: 4294967295 // maxSafe32BitInt
	                 * If 0, Infinity, or NaN: 0
	                 * If positive number: limit = Math.floor(limit); if (limit > 4294967295) limit -= 4294967296;
	                 * If negative number: 4294967296 - Math.floor(Math.abs(limit))
	                 * If other: Type-convert, then use the above rules
	                 */
	                var splitLimit = typeof limit === 'undefined' ? maxSafe32BitInt : ES.ToUint32(limit);
	                match = separatorCopy.exec(string);
	                while (match) {
	                    // `separatorCopy.lastIndex` is not reliable cross-browser
	                    lastIndex = match.index + match[0].length;
	                    if (lastIndex > lastLastIndex) {
	                        pushCall(output, strSlice(string, lastLastIndex, match.index));
	                        // Fix browsers whose `exec` methods don't consistently return `undefined` for
	                        // nonparticipating capturing groups
	                        if (!compliantExecNpcg && match.length > 1) {
	                            /* eslint-disable no-loop-func */
	                            match[0].replace(separator2, function () {
	                                for (var i = 1; i < arguments.length - 2; i++) {
	                                    if (typeof arguments[i] === 'undefined') {
	                                        match[i] = void 0;
	                                    }
	                                }
	                            });
	                            /* eslint-enable no-loop-func */
	                        }
	                        if (match.length > 1 && match.index < string.length) {
	                            array_push.apply(output, arraySlice(match, 1));
	                        }
	                        lastLength = match[0].length;
	                        lastLastIndex = lastIndex;
	                        if (output.length >= splitLimit) {
	                            break;
	                        }
	                    }
	                    if (separatorCopy.lastIndex === match.index) {
	                        separatorCopy.lastIndex++; // Avoid an infinite loop
	                    }
	                    match = separatorCopy.exec(string);
	                }
	                if (lastLastIndex === string.length) {
	                    if (lastLength || !separatorCopy.test('')) {
	                        pushCall(output, '');
	                    }
	                } else {
	                    pushCall(output, strSlice(string, lastLastIndex));
	                }
	                return output.length > splitLimit ? arraySlice(output, 0, splitLimit) : output;
	            };
	        }());

	    // [bugfix, chrome]
	    // If separator is undefined, then the result array contains just one String,
	    // which is the this value (converted to a String). If limit is not undefined,
	    // then the output array is truncated so that it contains no more than limit
	    // elements.
	    // "0".split(undefined, 0) -> []
	    } else if ('0'.split(void 0, 0).length) {
	        StringPrototype.split = function split(separator, limit) {
	            if (typeof separator === 'undefined' && limit === 0) {
	                return [];
	            }
	            return strSplit(this, separator, limit);
	        };
	    }

	    var str_replace = StringPrototype.replace;
	    var replaceReportsGroupsCorrectly = (function () {
	        var groups = [];
	        'x'.replace(/x(.)?/g, function (match, group) {
	            pushCall(groups, group);
	        });
	        return groups.length === 1 && typeof groups[0] === 'undefined';
	    }());

	    if (!replaceReportsGroupsCorrectly) {
	        StringPrototype.replace = function replace(searchValue, replaceValue) {
	            var isFn = isCallable(replaceValue);
	            var hasCapturingGroups = isRegex(searchValue) && (/\)[*?]/).test(searchValue.source);
	            if (!isFn || !hasCapturingGroups) {
	                return str_replace.call(this, searchValue, replaceValue);
	            } else {
	                var wrappedReplaceValue = function (match) {
	                    var length = arguments.length;
	                    var originalLastIndex = searchValue.lastIndex;
	                    searchValue.lastIndex = 0;
	                    var args = searchValue.exec(match) || [];
	                    searchValue.lastIndex = originalLastIndex;
	                    pushCall(args, arguments[length - 2], arguments[length - 1]);
	                    return replaceValue.apply(this, args);
	                };
	                return str_replace.call(this, searchValue, wrappedReplaceValue);
	            }
	        };
	    }

	    // ECMA-262, 3rd B.2.3
	    // Not an ECMAScript standard, although ECMAScript 3rd Edition has a
	    // non-normative section suggesting uniform semantics and it should be
	    // normalized across all browsers
	    // [bugfix, IE lt 9] IE < 9 substr() with negative value not working in IE
	    var string_substr = StringPrototype.substr;
	    var hasNegativeSubstrBug = ''.substr && '0b'.substr(-1) !== 'b';
	    defineProperties(StringPrototype, {
	        substr: function substr(start, length) {
	            var normalizedStart = start;
	            if (start < 0) {
	                normalizedStart = max(this.length + start, 0);
	            }
	            return string_substr.call(this, normalizedStart, length);
	        }
	    }, hasNegativeSubstrBug);

	    // ES5 15.5.4.20
	    // whitespace from: http://es5.github.io/#x15.5.4.20
	    var ws = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003'
	        + '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028'
	        + '\u2029\uFEFF';
	    var zeroWidth = '\u200b';
	    var wsRegexChars = '[' + ws + ']';
	    var trimBeginRegexp = new RegExp('^' + wsRegexChars + wsRegexChars + '*');
	    var trimEndRegexp = new RegExp(wsRegexChars + wsRegexChars + '*$');
	    var hasTrimWhitespaceBug = StringPrototype.trim && (ws.trim() || !zeroWidth.trim());
	    defineProperties(StringPrototype, {
	        // http://blog.stevenlevithan.com/archives/faster-trim-javascript
	        // http://perfectionkills.com/whitespace-deviations/
	        trim: function trim() {
	            if (typeof this === 'undefined' || this === null) {
	                throw new TypeError("can't convert " + this + ' to object');
	            }
	            return $String(this).replace(trimBeginRegexp, '').replace(trimEndRegexp, '');
	        }
	    }, hasTrimWhitespaceBug);
	    var trim = call.bind(String.prototype.trim);

	    var hasLastIndexBug = StringPrototype.lastIndexOf && 'abcあい'.lastIndexOf('あい', 2) !== -1;
	    defineProperties(StringPrototype, {
	        lastIndexOf: function lastIndexOf(searchString) {
	            if (typeof this === 'undefined' || this === null) {
	                throw new TypeError("can't convert " + this + ' to object');
	            }
	            var S = $String(this);
	            var searchStr = $String(searchString);
	            var numPos = arguments.length > 1 ? $Number(arguments[1]) : NaN;
	            var pos = isActualNaN(numPos) ? Infinity : ES.ToInteger(numPos);
	            var start = min(max(pos, 0), S.length);
	            var searchLen = searchStr.length;
	            var k = start + searchLen;
	            while (k > 0) {
	                k = max(0, k - searchLen);
	                var index = strIndexOf(strSlice(S, k, start + searchLen), searchStr);
	                if (index !== -1) {
	                    return k + index;
	                }
	            }
	            return -1;
	        }
	    }, hasLastIndexBug);

	    var originalLastIndexOf = StringPrototype.lastIndexOf;
	    defineProperties(StringPrototype, {
	        lastIndexOf: function lastIndexOf(searchString) {
	            return originalLastIndexOf.apply(this, arguments);
	        }
	    }, StringPrototype.lastIndexOf.length !== 1);

	    // ES-5 15.1.2.2
	    // eslint-disable-next-line radix
	    if (parseInt(ws + '08') !== 8 || parseInt(ws + '0x16') !== 22) {
	        /* global parseInt: true */
	        parseInt = (function (origParseInt) {
	            var hexRegex = /^[-+]?0[xX]/;
	            return function parseInt(str, radix) {
	                if (typeof str === 'symbol') {
	                    // handle Symbols in node 8.3/8.4
	                    // eslint-disable-next-line no-implicit-coercion, no-unused-expressions
	                    '' + str; // jscs:ignore disallowImplicitTypeConversion
	                }

	                var string = trim(String(str));
	                var defaultedRadix = $Number(radix) || (hexRegex.test(string) ? 16 : 10);
	                return origParseInt(string, defaultedRadix);
	            };
	        }(parseInt));
	    }

	    // https://es5.github.io/#x15.1.2.3
	    if (1 / parseFloat('-0') !== -Infinity) {
	        /* global parseFloat: true */
	        parseFloat = (function (origParseFloat) {
	            return function parseFloat(string) {
	                var inputString = trim(String(string));
	                var result = origParseFloat(inputString);
	                return result === 0 && strSlice(inputString, 0, 1) === '-' ? -0 : result;
	            };
	        }(parseFloat));
	    }

	    if (String(new RangeError('test')) !== 'RangeError: test') {
	        var errorToStringShim = function toString() {
	            if (typeof this === 'undefined' || this === null) {
	                throw new TypeError("can't convert " + this + ' to object');
	            }
	            var name = this.name;
	            if (typeof name === 'undefined') {
	                name = 'Error';
	            } else if (typeof name !== 'string') {
	                name = $String(name);
	            }
	            var msg = this.message;
	            if (typeof msg === 'undefined') {
	                msg = '';
	            } else if (typeof msg !== 'string') {
	                msg = $String(msg);
	            }
	            if (!name) {
	                return msg;
	            }
	            if (!msg) {
	                return name;
	            }
	            return name + ': ' + msg;
	        };
	        // can't use defineProperties here because of toString enumeration issue in IE <= 8
	        Error.prototype.toString = errorToStringShim;
	    }

	    if (supportsDescriptors) {
	        var ensureNonEnumerable = function (obj, prop) {
	            if (isEnum(obj, prop)) {
	                var desc = Object.getOwnPropertyDescriptor(obj, prop);
	                if (desc.configurable) {
	                    desc.enumerable = false;
	                    Object.defineProperty(obj, prop, desc);
	                }
	            }
	        };
	        ensureNonEnumerable(Error.prototype, 'message');
	        if (Error.prototype.message !== '') {
	            Error.prototype.message = '';
	        }
	        ensureNonEnumerable(Error.prototype, 'name');
	    }

	    if (String(/a/mig) !== '/a/gim') {
	        var regexToString = function toString() {
	            var str = '/' + this.source + '/';
	            if (this.global) {
	                str += 'g';
	            }
	            if (this.ignoreCase) {
	                str += 'i';
	            }
	            if (this.multiline) {
	                str += 'm';
	            }
	            return str;
	        };
	        // can't use defineProperties here because of toString enumeration issue in IE <= 8
	        RegExp.prototype.toString = regexToString;
	    }
	}));


/***/ }),

/***/ 607:
/***/ (function(module, exports) {

	"use strict";

	exports.__esModule = true;
	var _slice = Array.prototype.slice;
	exports.loopAsync = loopAsync;

	function loopAsync(turns, work, callback) {
	  var currentTurn = 0,
	      isDone = false;
	  var sync = false,
	      hasNext = false,
	      doneArgs = undefined;

	  function done() {
	    isDone = true;
	    if (sync) {
	      // Iterate instead of recursing if possible.
	      doneArgs = [].concat(_slice.call(arguments));
	      return;
	    }

	    callback.apply(this, arguments);
	  }

	  function next() {
	    if (isDone) {
	      return;
	    }

	    hasNext = true;
	    if (sync) {
	      // Iterate instead of recursing if possible.
	      return;
	    }

	    sync = true;

	    while (!isDone && currentTurn < turns && hasNext) {
	      hasNext = false;
	      work.call(this, currentTurn++, next, done);
	    }

	    sync = false;

	    if (isDone) {
	      // This means the loop finished synchronously.
	      callback.apply(this, doneArgs);
	      return;
	    }

	    if (currentTurn >= turns && hasNext) {
	      isDone = true;
	      callback();
	    }
	  }

	  next();
	}

/***/ }),

/***/ 608:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _invariant = __webpack_require__(16);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _Actions = __webpack_require__(89);

	var _PathUtils = __webpack_require__(73);

	var _ExecutionEnvironment = __webpack_require__(136);

	var _DOMUtils = __webpack_require__(196);

	var _DOMStateStorage = __webpack_require__(295);

	var _createDOMHistory = __webpack_require__(296);

	var _createDOMHistory2 = _interopRequireDefault(_createDOMHistory);

	/**
	 * Creates and returns a history object that uses HTML5's history API
	 * (pushState, replaceState, and the popstate event) to manage history.
	 * This is the recommended method of managing history in browsers because
	 * it provides the cleanest URLs.
	 *
	 * Note: In browsers that do not support the HTML5 history API full
	 * page reloads will be used to preserve URLs.
	 */
	function createBrowserHistory() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  !_ExecutionEnvironment.canUseDOM ?  true ? _invariant2['default'](false, 'Browser history needs a DOM') : _invariant2['default'](false) : undefined;

	  var forceRefresh = options.forceRefresh;

	  var isSupported = _DOMUtils.supportsHistory();
	  var useRefresh = !isSupported || forceRefresh;

	  function getCurrentLocation(historyState) {
	    try {
	      historyState = historyState || window.history.state || {};
	    } catch (e) {
	      historyState = {};
	    }

	    var path = _DOMUtils.getWindowPath();
	    var _historyState = historyState;
	    var key = _historyState.key;

	    var state = undefined;
	    if (key) {
	      state = _DOMStateStorage.readState(key);
	    } else {
	      state = null;
	      key = history.createKey();

	      if (isSupported) window.history.replaceState(_extends({}, historyState, { key: key }), null);
	    }

	    var location = _PathUtils.parsePath(path);

	    return history.createLocation(_extends({}, location, { state: state }), undefined, key);
	  }

	  function startPopStateListener(_ref) {
	    var transitionTo = _ref.transitionTo;

	    function popStateListener(event) {
	      if (event.state === undefined) return; // Ignore extraneous popstate events in WebKit.

	      transitionTo(getCurrentLocation(event.state));
	    }

	    _DOMUtils.addEventListener(window, 'popstate', popStateListener);

	    return function () {
	      _DOMUtils.removeEventListener(window, 'popstate', popStateListener);
	    };
	  }

	  function finishTransition(location) {
	    var basename = location.basename;
	    var pathname = location.pathname;
	    var search = location.search;
	    var hash = location.hash;
	    var state = location.state;
	    var action = location.action;
	    var key = location.key;

	    if (action === _Actions.POP) return; // Nothing to do.

	    _DOMStateStorage.saveState(key, state);

	    var path = (basename || '') + pathname + search + hash;
	    var historyState = {
	      key: key
	    };

	    if (action === _Actions.PUSH) {
	      if (useRefresh) {
	        window.location.href = path;
	        return false; // Prevent location update.
	      } else {
	          window.history.pushState(historyState, null, path);
	        }
	    } else {
	      // REPLACE
	      if (useRefresh) {
	        window.location.replace(path);
	        return false; // Prevent location update.
	      } else {
	          window.history.replaceState(historyState, null, path);
	        }
	    }
	  }

	  var history = _createDOMHistory2['default'](_extends({}, options, {
	    getCurrentLocation: getCurrentLocation,
	    finishTransition: finishTransition,
	    saveState: _DOMStateStorage.saveState
	  }));

	  var listenerCount = 0,
	      stopPopStateListener = undefined;

	  function listenBefore(listener) {
	    if (++listenerCount === 1) stopPopStateListener = startPopStateListener(history);

	    var unlisten = history.listenBefore(listener);

	    return function () {
	      unlisten();

	      if (--listenerCount === 0) stopPopStateListener();
	    };
	  }

	  function listen(listener) {
	    if (++listenerCount === 1) stopPopStateListener = startPopStateListener(history);

	    var unlisten = history.listen(listener);

	    return function () {
	      unlisten();

	      if (--listenerCount === 0) stopPopStateListener();
	    };
	  }

	  // deprecated
	  function registerTransitionHook(hook) {
	    if (++listenerCount === 1) stopPopStateListener = startPopStateListener(history);

	    history.registerTransitionHook(hook);
	  }

	  // deprecated
	  function unregisterTransitionHook(hook) {
	    history.unregisterTransitionHook(hook);

	    if (--listenerCount === 0) stopPopStateListener();
	  }

	  return _extends({}, history, {
	    listenBefore: listenBefore,
	    listen: listen,
	    registerTransitionHook: registerTransitionHook,
	    unregisterTransitionHook: unregisterTransitionHook
	  });
	}

	exports['default'] = createBrowserHistory;
	module.exports = exports['default'];

/***/ }),

/***/ 609:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _warning = __webpack_require__(51);

	var _warning2 = _interopRequireDefault(_warning);

	var _Actions = __webpack_require__(89);

	var _PathUtils = __webpack_require__(73);

	function createLocation() {
	  var location = arguments.length <= 0 || arguments[0] === undefined ? '/' : arguments[0];
	  var action = arguments.length <= 1 || arguments[1] === undefined ? _Actions.POP : arguments[1];
	  var key = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

	  var _fourthArg = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

	  if (typeof location === 'string') location = _PathUtils.parsePath(location);

	  if (typeof action === 'object') {
	     true ? _warning2['default'](false, 'The state (2nd) argument to createLocation is deprecated; use a ' + 'location descriptor instead') : undefined;

	    location = _extends({}, location, { state: action });

	    action = key || _Actions.POP;
	    key = _fourthArg;
	  }

	  var pathname = location.pathname || '/';
	  var search = location.search || '';
	  var hash = location.hash || '';
	  var state = location.state || null;

	  return {
	    pathname: pathname,
	    search: search,
	    hash: hash,
	    state: state,
	    action: action,
	    key: key
	  };
	}

	exports['default'] = createLocation;
	module.exports = exports['default'];

/***/ }),

/***/ 610:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _warning = __webpack_require__(51);

	var _warning2 = _interopRequireDefault(_warning);

	var _invariant = __webpack_require__(16);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _PathUtils = __webpack_require__(73);

	var _Actions = __webpack_require__(89);

	var _createHistory = __webpack_require__(298);

	var _createHistory2 = _interopRequireDefault(_createHistory);

	function createStateStorage(entries) {
	  return entries.filter(function (entry) {
	    return entry.state;
	  }).reduce(function (memo, entry) {
	    memo[entry.key] = entry.state;
	    return memo;
	  }, {});
	}

	function createMemoryHistory() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  if (Array.isArray(options)) {
	    options = { entries: options };
	  } else if (typeof options === 'string') {
	    options = { entries: [options] };
	  }

	  var history = _createHistory2['default'](_extends({}, options, {
	    getCurrentLocation: getCurrentLocation,
	    finishTransition: finishTransition,
	    saveState: saveState,
	    go: go
	  }));

	  var _options = options;
	  var entries = _options.entries;
	  var current = _options.current;

	  if (typeof entries === 'string') {
	    entries = [entries];
	  } else if (!Array.isArray(entries)) {
	    entries = ['/'];
	  }

	  entries = entries.map(function (entry) {
	    var key = history.createKey();

	    if (typeof entry === 'string') return { pathname: entry, key: key };

	    if (typeof entry === 'object' && entry) return _extends({}, entry, { key: key });

	     true ?  true ? _invariant2['default'](false, 'Unable to create history entry from %s', entry) : _invariant2['default'](false) : undefined;
	  });

	  if (current == null) {
	    current = entries.length - 1;
	  } else {
	    !(current >= 0 && current < entries.length) ?  true ? _invariant2['default'](false, 'Current index must be >= 0 and < %s, was %s', entries.length, current) : _invariant2['default'](false) : undefined;
	  }

	  var storage = createStateStorage(entries);

	  function saveState(key, state) {
	    storage[key] = state;
	  }

	  function readState(key) {
	    return storage[key];
	  }

	  function getCurrentLocation() {
	    var entry = entries[current];
	    var basename = entry.basename;
	    var pathname = entry.pathname;
	    var search = entry.search;

	    var path = (basename || '') + pathname + (search || '');

	    var key = undefined,
	        state = undefined;
	    if (entry.key) {
	      key = entry.key;
	      state = readState(key);
	    } else {
	      key = history.createKey();
	      state = null;
	      entry.key = key;
	    }

	    var location = _PathUtils.parsePath(path);

	    return history.createLocation(_extends({}, location, { state: state }), undefined, key);
	  }

	  function canGo(n) {
	    var index = current + n;
	    return index >= 0 && index < entries.length;
	  }

	  function go(n) {
	    if (n) {
	      if (!canGo(n)) {
	         true ? _warning2['default'](false, 'Cannot go(%s) there is not enough history', n) : undefined;
	        return;
	      }

	      current += n;

	      var currentLocation = getCurrentLocation();

	      // change action to POP
	      history.transitionTo(_extends({}, currentLocation, { action: _Actions.POP }));
	    }
	  }

	  function finishTransition(location) {
	    switch (location.action) {
	      case _Actions.PUSH:
	        current += 1;

	        // if we are not on the top of stack
	        // remove rest and push new
	        if (current < entries.length) entries.splice(current);

	        entries.push(location);
	        saveState(location.key, location.state);
	        break;
	      case _Actions.REPLACE:
	        entries[current] = location;
	        saveState(location.key, location.state);
	        break;
	    }
	  }

	  return history;
	}

	exports['default'] = createMemoryHistory;
	module.exports = exports['default'];

/***/ }),

/***/ 611:
/***/ (function(module, exports, __webpack_require__) {

	var invariant = __webpack_require__(16);

	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var splice = Array.prototype.splice;

	var assign = Object.assign || function assign(target, source) {
	  var keys = getAllKeys(source);
	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    if (hasOwnProperty.call(source, key)) {
	      target[key] = source[key];
	    }
	  }
	  return target;
	}

	var getAllKeys = typeof Object.getOwnPropertySymbols === 'function' ?
	  function(obj) { return Object.keys(obj).concat(Object.getOwnPropertySymbols(obj)) } :
	  function(obj) { return Object.keys(obj) }
	;

	function copy(object) {
	  if (object instanceof Array) {
	    return object.slice();
	  } else if (object && typeof object === 'object') {
	    return assign(new object.constructor(), object);
	  } else {
	    return object;
	  }
	}


	function newContext() {
	  var commands = assign({}, defaultCommands);
	  update.extend = function(directive, fn) {
	    commands[directive] = fn;
	  }

	  return update;

	  function update(object, spec) {
	    invariant(
	      !Array.isArray(spec),
	      'update(): You provided an invalid spec to update(). The spec may ' +
	      'not contain an array except as the value of $set, $push, $unshift, ' +
	      '$splice or any custom command allowing an array value.'
	    );

	    invariant(
	      typeof spec === 'object' && spec !== null,
	      'update(): You provided an invalid spec to update(). The spec and ' +
	      'every included key path must be plain objects containing one of the ' +
	      'following commands: %s.',
	      Object.keys(commands).join(', ')
	    );

	    var nextObject = object;
	    var specKeys = getAllKeys(spec)
	    var index, key;
	    for (index = 0; index < specKeys.length; index++) {
	      var key = specKeys[index];
	      if (hasOwnProperty.call(commands, key)) {
	        nextObject = commands[key](spec[key], nextObject, spec, object);
	      } else {
	        var nextValueForKey = update(object[key], spec[key]);
	        if (nextValueForKey !== nextObject[key]) {
	          if (nextObject === object) {
	            nextObject = copy(object);
	          }
	          nextObject[key] = nextValueForKey;
	        }
	      }
	    }
	    return nextObject;
	  }

	}

	var defaultCommands = {
	  $push: function(value, original, spec) {
	    invariantPushAndUnshift(original, spec, '$push');
	    return original.concat(value);
	  },
	  $unshift: function(value, original, spec) {
	    invariantPushAndUnshift(original, spec, '$unshift');
	    return value.concat(original);
	  },
	  $splice: function(value, nextObject, spec, object) {
	    var originalValue = nextObject === object ? copy(object) : nextObject;
	    invariantSplices(originalValue, spec);
	    value.forEach(function(args) {
	      invariantSplice(args);
	      splice.apply(originalValue, args);
	    });
	    return originalValue;
	  },
	  $set: function(value, original, spec) {
	    invariantSet(spec);
	    return value;
	  },
	  $merge: function(value, nextObject, spec, object) {
	    var originalValue = nextObject === object ? copy(object) : nextObject;
	    invariantMerge(originalValue, value);
	    getAllKeys(value).forEach(function(key) {
	      originalValue[key] = value[key];
	    });
	    return originalValue;
	  },
	  $apply: function(value, original) {
	    invariantApply(value);
	    return value(original);
	  }
	};



	module.exports = newContext();
	module.exports.newContext = newContext;


	// invariants

	function invariantPushAndUnshift(value, spec, command) {
	  invariant(
	    Array.isArray(value),
	    'update(): expected target of %s to be an array; got %s.',
	    command,
	    value
	  );
	  var specValue = spec[command];
	  invariant(
	    Array.isArray(specValue),
	    'update(): expected spec of %s to be an array; got %s. ' +
	    'Did you forget to wrap your parameter in an array?',
	    command,
	    specValue
	  );
	}

	function invariantSplices(value, spec) {
	  invariant(
	    Array.isArray(value),
	    'Expected $splice target to be an array; got %s',
	    value
	  );
	  invariantSplice(spec['$splice']);
	}

	function invariantSplice(value) {
	  invariant(
	    Array.isArray(value),
	    'update(): expected spec of $splice to be an array of arrays; got %s. ' +
	    'Did you forget to wrap your parameters in an array?',
	    value
	  );
	}

	function invariantApply(fn) {
	  invariant(
	    typeof fn === 'function',
	    'update(): expected spec of $apply to be a function; got %s.',
	    fn
	  );
	}

	function invariantSet(spec) {
	  invariant(
	    Object.keys(spec).length === 1,
	    'Cannot have more than one key in an object with $set'
	  );
	}

	function invariantMerge(target, specValue) {
	  invariant(
	    specValue && typeof specValue === 'object',
	    'update(): $merge expects a spec of type \'object\'; got %s',
	    specValue
	  );
	  invariant(
	    target && typeof target === 'object',
	    'update(): $merge expects a target of type \'object\'; got %s',
	    target
	  );
	}


/***/ }),

/***/ 621:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var strictUriEncode = __webpack_require__(853);

	exports.extract = function (str) {
		return str.split('?')[1] || '';
	};

	exports.parse = function (str) {
		if (typeof str !== 'string') {
			return {};
		}

		str = str.trim().replace(/^(\?|#|&)/, '');

		if (!str) {
			return {};
		}

		return str.split('&').reduce(function (ret, param) {
			var parts = param.replace(/\+/g, ' ').split('=');
			// Firefox (pre 40) decodes `%3D` to `=`
			// https://github.com/sindresorhus/query-string/pull/37
			var key = parts.shift();
			var val = parts.length > 0 ? parts.join('=') : undefined;

			key = decodeURIComponent(key);

			// missing `=` should be `null`:
			// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
			val = val === undefined ? null : decodeURIComponent(val);

			if (!ret.hasOwnProperty(key)) {
				ret[key] = val;
			} else if (Array.isArray(ret[key])) {
				ret[key].push(val);
			} else {
				ret[key] = [ret[key], val];
			}

			return ret;
		}, {});
	};

	exports.stringify = function (obj) {
		return obj ? Object.keys(obj).sort().map(function (key) {
			var val = obj[key];

			if (val === undefined) {
				return '';
			}

			if (val === null) {
				return key;
			}

			if (Array.isArray(val)) {
				return val.slice().sort().map(function (val2) {
					return strictUriEncode(key) + '=' + strictUriEncode(val2);
				}).join('&');
			}

			return strictUriEncode(key) + '=' + strictUriEncode(val);
		}).filter(function (x) {
			return x.length > 0;
		}).join('&') : '';
	};


/***/ }),

/***/ 757:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _notification = __webpack_require__(343);

	Object.defineProperty(exports, 'Notification', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_notification).default;
	  }
	});

	var _notificationStack = __webpack_require__(758);

	Object.defineProperty(exports, 'NotificationStack', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_notificationStack).default;
	  }
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ 758:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* eslint-disable react/jsx-no-bind */


	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _stackedNotification = __webpack_require__(759);

	var _stackedNotification2 = _interopRequireDefault(_stackedNotification);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function defaultStyleFactory(index, style) {
	  return _extends({}, style, { bottom: 2 + index * 4 + 'rem' });
	}

	/**
	* The notification list does not have any state, so use a
	* pure function here. It just needs to return the stacked array
	* of notification components.
	*/
	var NotificationStack = function NotificationStack(props) {
	  return _react2.default.createElement(
	    'div',
	    { className: 'notification-list' },
	    props.notifications.map(function (notification, index) {
	      var isLast = index === 0 && props.notifications.length === 1;
	      var dismissNow = isLast || !props.dismissInOrder;

	      // Handle styles
	      var barStyle = props.barStyleFactory(index, notification.barStyle);
	      var activeBarStyle = props.activeBarStyleFactory(index, notification.activeBarStyle);

	      // Allow onClick from notification stack or individual notifications
	      var onClick = notification.onClick || props.onClick;
	      var onDismiss = props.onDismiss;

	      var dismissAfter = notification.dismissAfter;


	      if (dismissAfter !== false) {
	        if (dismissAfter == null) dismissAfter = props.dismissAfter;
	        if (!dismissNow) dismissAfter += index * 1000;
	      }

	      return _react2.default.createElement(_stackedNotification2.default, _extends({}, notification, {
	        key: notification.key,
	        isLast: isLast,
	        action: notification.action || props.action,
	        dismissAfter: dismissAfter,
	        onDismiss: onDismiss.bind(undefined, notification),
	        onClick: onClick.bind(undefined, notification),
	        activeBarStyle: activeBarStyle,
	        barStyle: barStyle
	      }));
	    })
	  );
	};

	/* eslint-disable react/no-unused-prop-types, react/forbid-prop-types */

	NotificationStack.propTypes = {
	  activeBarStyleFactory: _react.PropTypes.func,
	  barStyleFactory: _react.PropTypes.func,
	  dismissInOrder: _react.PropTypes.bool,
	  notifications: _react.PropTypes.array.isRequired,
	  onDismiss: _react.PropTypes.func.isRequired,
	  onClick: _react.PropTypes.func,
	  action: _react.PropTypes.string
	};

	NotificationStack.defaultProps = {
	  activeBarStyleFactory: defaultStyleFactory,
	  barStyleFactory: defaultStyleFactory,
	  dismissInOrder: true,
	  dismissAfter: 1000,
	  onClick: function onClick() {}
	};

	/* eslint-enable no-alert, no-console */

	exports.default = NotificationStack;

/***/ }),

/***/ 759:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _defaultPropTypes = __webpack_require__(342);

	var _defaultPropTypes2 = _interopRequireDefault(_defaultPropTypes);

	var _notification = __webpack_require__(343);

	var _notification2 = _interopRequireDefault(_notification);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var StackedNotification = function (_Component) {
	  _inherits(StackedNotification, _Component);

	  function StackedNotification(props) {
	    _classCallCheck(this, StackedNotification);

	    var _this = _possibleConstructorReturn(this, (StackedNotification.__proto__ || Object.getPrototypeOf(StackedNotification)).call(this, props));

	    _this.state = {
	      isActive: false
	    };

	    _this.handleClick = _this.handleClick.bind(_this);
	    return _this;
	  }

	  _createClass(StackedNotification, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.activeTimeout = setTimeout(this.setState.bind(this, {
	        isActive: true
	      }), 1);

	      this.dismiss(this.props.dismissAfter);
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      if (nextProps.dismissAfter !== this.props.dismissAfter) {
	        this.dismiss(nextProps.dismissAfter);
	      }
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      clearTimeout(this.activeTimeout);
	      clearTimeout(this.dismissTimeout);
	    }
	  }, {
	    key: 'dismiss',
	    value: function dismiss(dismissAfter) {
	      if (dismissAfter === false) return;

	      this.dismissTimeout = setTimeout(this.setState.bind(this, {
	        isActive: false
	      }), dismissAfter);
	    }

	    /*
	    * @function handleClick
	    * @description Bind deactivate Notification function to Notification click handler
	    */

	  }, {
	    key: 'handleClick',
	    value: function handleClick() {
	      if (this.props.onClick && typeof this.props.onClick === 'function') {
	        return this.props.onClick(this.setState.bind(this, { isActive: false }));
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      return _react2.default.createElement(_notification2.default, _extends({}, this.props, {
	        onClick: this.handleClick,
	        onDismiss: function onDismiss() {
	          return setTimeout(_this2.props.onDismiss, 300);
	        },
	        isActive: this.state.isActive
	      }));
	    }
	  }]);

	  return StackedNotification;
	}(_react.Component);

	StackedNotification.propTypes = _defaultPropTypes2.default;

	exports.default = StackedNotification;

/***/ }),

/***/ 812:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.routerMiddleware = exports.routerActions = exports.goForward = exports.goBack = exports.go = exports.replace = exports.push = exports.CALL_HISTORY_METHOD = exports.routerReducer = exports.LOCATION_CHANGE = exports.syncHistoryWithStore = undefined;

	var _reducer = __webpack_require__(373);

	Object.defineProperty(exports, 'LOCATION_CHANGE', {
	  enumerable: true,
	  get: function get() {
	    return _reducer.LOCATION_CHANGE;
	  }
	});
	Object.defineProperty(exports, 'routerReducer', {
	  enumerable: true,
	  get: function get() {
	    return _reducer.routerReducer;
	  }
	});

	var _actions = __webpack_require__(372);

	Object.defineProperty(exports, 'CALL_HISTORY_METHOD', {
	  enumerable: true,
	  get: function get() {
	    return _actions.CALL_HISTORY_METHOD;
	  }
	});
	Object.defineProperty(exports, 'push', {
	  enumerable: true,
	  get: function get() {
	    return _actions.push;
	  }
	});
	Object.defineProperty(exports, 'replace', {
	  enumerable: true,
	  get: function get() {
	    return _actions.replace;
	  }
	});
	Object.defineProperty(exports, 'go', {
	  enumerable: true,
	  get: function get() {
	    return _actions.go;
	  }
	});
	Object.defineProperty(exports, 'goBack', {
	  enumerable: true,
	  get: function get() {
	    return _actions.goBack;
	  }
	});
	Object.defineProperty(exports, 'goForward', {
	  enumerable: true,
	  get: function get() {
	    return _actions.goForward;
	  }
	});
	Object.defineProperty(exports, 'routerActions', {
	  enumerable: true,
	  get: function get() {
	    return _actions.routerActions;
	  }
	});

	var _sync = __webpack_require__(814);

	var _sync2 = _interopRequireDefault(_sync);

	var _middleware = __webpack_require__(813);

	var _middleware2 = _interopRequireDefault(_middleware);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	exports.syncHistoryWithStore = _sync2['default'];
	exports.routerMiddleware = _middleware2['default'];

/***/ }),

/***/ 813:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports['default'] = routerMiddleware;

	var _actions = __webpack_require__(372);

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	/**
	 * This middleware captures CALL_HISTORY_METHOD actions to redirect to the
	 * provided history object. This will prevent these actions from reaching your
	 * reducer or any middleware that comes after this one.
	 */
	function routerMiddleware(history) {
	  return function () {
	    return function (next) {
	      return function (action) {
	        if (action.type !== _actions.CALL_HISTORY_METHOD) {
	          return next(action);
	        }

	        var _action$payload = action.payload,
	            method = _action$payload.method,
	            args = _action$payload.args;

	        history[method].apply(history, _toConsumableArray(args));
	      };
	    };
	  };
	}

/***/ }),

/***/ 814:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports['default'] = syncHistoryWithStore;

	var _reducer = __webpack_require__(373);

	var defaultSelectLocationState = function defaultSelectLocationState(state) {
	  return state.routing;
	};

	/**
	 * This function synchronizes your history state with the Redux store.
	 * Location changes flow from history to the store. An enhanced history is
	 * returned with a listen method that responds to store updates for location.
	 *
	 * When this history is provided to the router, this means the location data
	 * will flow like this:
	 * history.push -> store.dispatch -> enhancedHistory.listen -> router
	 * This ensures that when the store state changes due to a replay or other
	 * event, the router will be updated appropriately and can transition to the
	 * correct router state.
	 */
	function syncHistoryWithStore(history, store) {
	  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
	      _ref$selectLocationSt = _ref.selectLocationState,
	      selectLocationState = _ref$selectLocationSt === undefined ? defaultSelectLocationState : _ref$selectLocationSt,
	      _ref$adjustUrlOnRepla = _ref.adjustUrlOnReplay,
	      adjustUrlOnReplay = _ref$adjustUrlOnRepla === undefined ? true : _ref$adjustUrlOnRepla;

	  // Ensure that the reducer is mounted on the store and functioning properly.
	  if (typeof selectLocationState(store.getState()) === 'undefined') {
	    throw new Error('Expected the routing state to be available either as `state.routing` ' + 'or as the custom expression you can specify as `selectLocationState` ' + 'in the `syncHistoryWithStore()` options. ' + 'Ensure you have added the `routerReducer` to your store\'s ' + 'reducers via `combineReducers` or whatever method you use to isolate ' + 'your reducers.');
	  }

	  var initialLocation = void 0;
	  var isTimeTraveling = void 0;
	  var unsubscribeFromStore = void 0;
	  var unsubscribeFromHistory = void 0;
	  var currentLocation = void 0;

	  // What does the store say about current location?
	  var getLocationInStore = function getLocationInStore(useInitialIfEmpty) {
	    var locationState = selectLocationState(store.getState());
	    return locationState.locationBeforeTransitions || (useInitialIfEmpty ? initialLocation : undefined);
	  };

	  // Init initialLocation with potential location in store
	  initialLocation = getLocationInStore();

	  // If the store is replayed, update the URL in the browser to match.
	  if (adjustUrlOnReplay) {
	    var handleStoreChange = function handleStoreChange() {
	      var locationInStore = getLocationInStore(true);
	      if (currentLocation === locationInStore || initialLocation === locationInStore) {
	        return;
	      }

	      // Update address bar to reflect store state
	      isTimeTraveling = true;
	      currentLocation = locationInStore;
	      history.transitionTo(_extends({}, locationInStore, {
	        action: 'PUSH'
	      }));
	      isTimeTraveling = false;
	    };

	    unsubscribeFromStore = store.subscribe(handleStoreChange);
	    handleStoreChange();
	  }

	  // Whenever location changes, dispatch an action to get it in the store
	  var handleLocationChange = function handleLocationChange(location) {
	    // ... unless we just caused that location change
	    if (isTimeTraveling) {
	      return;
	    }

	    // Remember where we are
	    currentLocation = location;

	    // Are we being called for the first time?
	    if (!initialLocation) {
	      // Remember as a fallback in case state is reset
	      initialLocation = location;

	      // Respect persisted location, if any
	      if (getLocationInStore()) {
	        return;
	      }
	    }

	    // Tell the store to update by dispatching an action
	    store.dispatch({
	      type: _reducer.LOCATION_CHANGE,
	      payload: location
	    });
	  };
	  unsubscribeFromHistory = history.listen(handleLocationChange);

	  // support history 3.x
	  if (history.getCurrentLocation) {
	    handleLocationChange(history.getCurrentLocation());
	  }

	  // The enhanced history uses store as source of truth
	  return _extends({}, history, {
	    // The listeners are subscribed to the store instead of history
	    listen: function listen(listener) {
	      // Copy of last location.
	      var lastPublishedLocation = getLocationInStore(true);

	      // Keep track of whether we unsubscribed, as Redux store
	      // only applies changes in subscriptions on next dispatch
	      var unsubscribed = false;
	      var unsubscribeFromStore = store.subscribe(function () {
	        var currentLocation = getLocationInStore(true);
	        if (currentLocation === lastPublishedLocation) {
	          return;
	        }
	        lastPublishedLocation = currentLocation;
	        if (!unsubscribed) {
	          listener(lastPublishedLocation);
	        }
	      });

	      // History listeners expect a synchronous call. Make the first call to the
	      // listener after subscribing to the store, in case the listener causes a
	      // location change (e.g. when it redirects)
	      listener(lastPublishedLocation);

	      // Let user unsubscribe later
	      return function () {
	        unsubscribed = true;
	        unsubscribeFromStore();
	      };
	    },


	    // It also provides a way to destroy internal listeners
	    unsubscribe: function unsubscribe() {
	      if (adjustUrlOnReplay) {
	        unsubscribeFromStore();
	      }
	      unsubscribeFromHistory();
	    }
	  });
	}

/***/ }),

/***/ 815:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _routerWarning = __webpack_require__(27);

	var _routerWarning2 = _interopRequireDefault(_routerWarning);

	var _InternalPropTypes = __webpack_require__(76);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * A mixin that adds the "history" instance variable to components.
	 */
	var History = {

	  contextTypes: {
	    history: _InternalPropTypes.history
	  },

	  componentWillMount: function componentWillMount() {
	     true ? (0, _routerWarning2.default)(false, 'the `History` mixin is deprecated, please access `context.router` with your own `contextTypes`. http://tiny.cc/router-historymixin') : void 0;
	    this.history = this.context.history;
	  }
	};

	exports.default = History;
	module.exports = exports['default'];

/***/ }),

/***/ 816:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _Link = __webpack_require__(374);

	var _Link2 = _interopRequireDefault(_Link);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * An <IndexLink> is used to link to an <IndexRoute>.
	 */
	var IndexLink = _react2.default.createClass({
	  displayName: 'IndexLink',
	  render: function render() {
	    return _react2.default.createElement(_Link2.default, _extends({}, this.props, { onlyActiveOnIndex: true }));
	  }
	});

	exports.default = IndexLink;
	module.exports = exports['default'];

/***/ }),

/***/ 817:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _routerWarning = __webpack_require__(27);

	var _routerWarning2 = _interopRequireDefault(_routerWarning);

	var _invariant = __webpack_require__(16);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _Redirect = __webpack_require__(375);

	var _Redirect2 = _interopRequireDefault(_Redirect);

	var _InternalPropTypes = __webpack_require__(76);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _React$PropTypes = _react2.default.PropTypes;
	var string = _React$PropTypes.string;
	var object = _React$PropTypes.object;

	/**
	 * An <IndexRedirect> is used to redirect from an indexRoute.
	 */

	var IndexRedirect = _react2.default.createClass({
	  displayName: 'IndexRedirect',


	  statics: {
	    createRouteFromReactElement: function createRouteFromReactElement(element, parentRoute) {
	      /* istanbul ignore else: sanity check */
	      if (parentRoute) {
	        parentRoute.indexRoute = _Redirect2.default.createRouteFromReactElement(element);
	      } else {
	         true ? (0, _routerWarning2.default)(false, 'An <IndexRedirect> does not make sense at the root of your route config') : void 0;
	      }
	    }
	  },

	  propTypes: {
	    to: string.isRequired,
	    query: object,
	    state: object,
	    onEnter: _InternalPropTypes.falsy,
	    children: _InternalPropTypes.falsy
	  },

	  /* istanbul ignore next: sanity check */
	  render: function render() {
	     true ?  true ? (0, _invariant2.default)(false, '<IndexRedirect> elements are for router configuration only and should not be rendered') : (0, _invariant2.default)(false) : void 0;
	  }
	});

	exports.default = IndexRedirect;
	module.exports = exports['default'];

/***/ }),

/***/ 818:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _routerWarning = __webpack_require__(27);

	var _routerWarning2 = _interopRequireDefault(_routerWarning);

	var _invariant = __webpack_require__(16);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _RouteUtils = __webpack_require__(67);

	var _InternalPropTypes = __webpack_require__(76);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var func = _react2.default.PropTypes.func;

	/**
	 * An <IndexRoute> is used to specify its parent's <Route indexRoute> in
	 * a JSX route config.
	 */

	var IndexRoute = _react2.default.createClass({
	  displayName: 'IndexRoute',


	  statics: {
	    createRouteFromReactElement: function createRouteFromReactElement(element, parentRoute) {
	      /* istanbul ignore else: sanity check */
	      if (parentRoute) {
	        parentRoute.indexRoute = (0, _RouteUtils.createRouteFromReactElement)(element);
	      } else {
	         true ? (0, _routerWarning2.default)(false, 'An <IndexRoute> does not make sense at the root of your route config') : void 0;
	      }
	    }
	  },

	  propTypes: {
	    path: _InternalPropTypes.falsy,
	    component: _InternalPropTypes.component,
	    components: _InternalPropTypes.components,
	    getComponent: func,
	    getComponents: func
	  },

	  /* istanbul ignore next: sanity check */
	  render: function render() {
	     true ?  true ? (0, _invariant2.default)(false, '<IndexRoute> elements are for router configuration only and should not be rendered') : (0, _invariant2.default)(false) : void 0;
	  }
	});

	exports.default = IndexRoute;
	module.exports = exports['default'];

/***/ }),

/***/ 819:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _routerWarning = __webpack_require__(27);

	var _routerWarning2 = _interopRequireDefault(_routerWarning);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _invariant = __webpack_require__(16);

	var _invariant2 = _interopRequireDefault(_invariant);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var object = _react2.default.PropTypes.object;

	/**
	 * The Lifecycle mixin adds the routerWillLeave lifecycle method to a
	 * component that may be used to cancel a transition or prompt the user
	 * for confirmation.
	 *
	 * On standard transitions, routerWillLeave receives a single argument: the
	 * location we're transitioning to. To cancel the transition, return false.
	 * To prompt the user for confirmation, return a prompt message (string).
	 *
	 * During the beforeunload event (assuming you're using the useBeforeUnload
	 * history enhancer), routerWillLeave does not receive a location object
	 * because it isn't possible for us to know the location we're transitioning
	 * to. In this case routerWillLeave must return a prompt message to prevent
	 * the user from closing the window/tab.
	 */

	var Lifecycle = {

	  contextTypes: {
	    history: object.isRequired,
	    // Nested children receive the route as context, either
	    // set by the route component using the RouteContext mixin
	    // or by some other ancestor.
	    route: object
	  },

	  propTypes: {
	    // Route components receive the route object as a prop.
	    route: object
	  },

	  componentDidMount: function componentDidMount() {
	     true ? (0, _routerWarning2.default)(false, 'the `Lifecycle` mixin is deprecated, please use `context.router.setRouteLeaveHook(route, hook)`. http://tiny.cc/router-lifecyclemixin') : void 0;
	    !this.routerWillLeave ?  true ? (0, _invariant2.default)(false, 'The Lifecycle mixin requires you to define a routerWillLeave method') : (0, _invariant2.default)(false) : void 0;

	    var route = this.props.route || this.context.route;

	    !route ?  true ? (0, _invariant2.default)(false, 'The Lifecycle mixin must be used on either a) a <Route component> or ' + 'b) a descendant of a <Route component> that uses the RouteContext mixin') : (0, _invariant2.default)(false) : void 0;

	    this._unlistenBeforeLeavingRoute = this.context.history.listenBeforeLeavingRoute(route, this.routerWillLeave);
	  },
	  componentWillUnmount: function componentWillUnmount() {
	    if (this._unlistenBeforeLeavingRoute) this._unlistenBeforeLeavingRoute();
	  }
	};

	exports.default = Lifecycle;
	module.exports = exports['default'];

/***/ }),

/***/ 820:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _invariant = __webpack_require__(16);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _RouteUtils = __webpack_require__(67);

	var _InternalPropTypes = __webpack_require__(76);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _React$PropTypes = _react2.default.PropTypes;
	var string = _React$PropTypes.string;
	var func = _React$PropTypes.func;

	/**
	 * A <Route> is used to declare which components are rendered to the
	 * page when the URL matches a given pattern.
	 *
	 * Routes are arranged in a nested tree structure. When a new URL is
	 * requested, the tree is searched depth-first to find a route whose
	 * path matches the URL.  When one is found, all routes in the tree
	 * that lead to it are considered "active" and their components are
	 * rendered into the DOM, nested in the same order as in the tree.
	 */

	var Route = _react2.default.createClass({
	  displayName: 'Route',


	  statics: {
	    createRouteFromReactElement: _RouteUtils.createRouteFromReactElement
	  },

	  propTypes: {
	    path: string,
	    component: _InternalPropTypes.component,
	    components: _InternalPropTypes.components,
	    getComponent: func,
	    getComponents: func
	  },

	  /* istanbul ignore next: sanity check */
	  render: function render() {
	     true ?  true ? (0, _invariant2.default)(false, '<Route> elements are for router configuration only and should not be rendered') : (0, _invariant2.default)(false) : void 0;
	  }
	});

	exports.default = Route;
	module.exports = exports['default'];

/***/ }),

/***/ 821:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _routerWarning = __webpack_require__(27);

	var _routerWarning2 = _interopRequireDefault(_routerWarning);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var object = _react2.default.PropTypes.object;

	/**
	 * The RouteContext mixin provides a convenient way for route
	 * components to set the route in context. This is needed for
	 * routes that render elements that want to use the Lifecycle
	 * mixin to prevent transitions.
	 */

	var RouteContext = {

	  propTypes: {
	    route: object.isRequired
	  },

	  childContextTypes: {
	    route: object.isRequired
	  },

	  getChildContext: function getChildContext() {
	    return {
	      route: this.props.route
	    };
	  },
	  componentWillMount: function componentWillMount() {
	     true ? (0, _routerWarning2.default)(false, 'The `RouteContext` mixin is deprecated. You can provide `this.props.route` on context with your own `contextTypes`. http://tiny.cc/router-routecontextmixin') : void 0;
	  }
	};

	exports.default = RouteContext;
	module.exports = exports['default'];

/***/ }),

/***/ 822:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createHashHistory = __webpack_require__(297);

	var _createHashHistory2 = _interopRequireDefault(_createHashHistory);

	var _useQueries = __webpack_require__(137);

	var _useQueries2 = _interopRequireDefault(_useQueries);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _createTransitionManager = __webpack_require__(237);

	var _createTransitionManager2 = _interopRequireDefault(_createTransitionManager);

	var _InternalPropTypes = __webpack_require__(76);

	var _RouterContext = __webpack_require__(159);

	var _RouterContext2 = _interopRequireDefault(_RouterContext);

	var _RouteUtils = __webpack_require__(67);

	var _RouterUtils = __webpack_require__(376);

	var _routerWarning = __webpack_require__(27);

	var _routerWarning2 = _interopRequireDefault(_routerWarning);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function isDeprecatedHistory(history) {
	  return !history || !history.__v2_compatible__;
	}

	var _React$PropTypes = _react2.default.PropTypes;
	var func = _React$PropTypes.func;
	var object = _React$PropTypes.object;

	/**
	 * A <Router> is a high-level API for automatically setting up
	 * a router that renders a <RouterContext> with all the props
	 * it needs each time the URL changes.
	 */

	var Router = _react2.default.createClass({
	  displayName: 'Router',


	  propTypes: {
	    history: object,
	    children: _InternalPropTypes.routes,
	    routes: _InternalPropTypes.routes, // alias for children
	    render: func,
	    createElement: func,
	    onError: func,
	    onUpdate: func,

	    // PRIVATE: For client-side rehydration of server match.
	    matchContext: object
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      render: function render(props) {
	        return _react2.default.createElement(_RouterContext2.default, props);
	      }
	    };
	  },
	  getInitialState: function getInitialState() {
	    return {
	      location: null,
	      routes: null,
	      params: null,
	      components: null
	    };
	  },
	  handleError: function handleError(error) {
	    if (this.props.onError) {
	      this.props.onError.call(this, error);
	    } else {
	      // Throw errors by default so we don't silently swallow them!
	      throw error; // This error probably occurred in getChildRoutes or getComponents.
	    }
	  },
	  componentWillMount: function componentWillMount() {
	    var _this = this;

	    var _props = this.props;
	    var parseQueryString = _props.parseQueryString;
	    var stringifyQuery = _props.stringifyQuery;

	     true ? (0, _routerWarning2.default)(!(parseQueryString || stringifyQuery), '`parseQueryString` and `stringifyQuery` are deprecated. Please create a custom history. http://tiny.cc/router-customquerystring') : void 0;

	    var _createRouterObjects = this.createRouterObjects();

	    var history = _createRouterObjects.history;
	    var transitionManager = _createRouterObjects.transitionManager;
	    var router = _createRouterObjects.router;


	    this._unlisten = transitionManager.listen(function (error, state) {
	      if (error) {
	        _this.handleError(error);
	      } else {
	        _this.setState(state, _this.props.onUpdate);
	      }
	    });

	    this.history = history;
	    this.router = router;
	  },
	  createRouterObjects: function createRouterObjects() {
	    var matchContext = this.props.matchContext;

	    if (matchContext) {
	      return matchContext;
	    }

	    var history = this.props.history;
	    var _props2 = this.props;
	    var routes = _props2.routes;
	    var children = _props2.children;


	    if (isDeprecatedHistory(history)) {
	      history = this.wrapDeprecatedHistory(history);
	    }

	    var transitionManager = (0, _createTransitionManager2.default)(history, (0, _RouteUtils.createRoutes)(routes || children));
	    var router = (0, _RouterUtils.createRouterObject)(history, transitionManager);
	    var routingHistory = (0, _RouterUtils.createRoutingHistory)(history, transitionManager);

	    return { history: routingHistory, transitionManager: transitionManager, router: router };
	  },
	  wrapDeprecatedHistory: function wrapDeprecatedHistory(history) {
	    var _props3 = this.props;
	    var parseQueryString = _props3.parseQueryString;
	    var stringifyQuery = _props3.stringifyQuery;


	    var createHistory = void 0;
	    if (history) {
	       true ? (0, _routerWarning2.default)(false, 'It appears you have provided a deprecated history object to `<Router/>`, please use a history provided by ' + 'React Router with `import { browserHistory } from \'react-router\'` or `import { hashHistory } from \'react-router\'`. ' + 'If you are using a custom history please create it with `useRouterHistory`, see http://tiny.cc/router-usinghistory for details.') : void 0;
	      createHistory = function createHistory() {
	        return history;
	      };
	    } else {
	       true ? (0, _routerWarning2.default)(false, '`Router` no longer defaults the history prop to hash history. Please use the `hashHistory` singleton instead. http://tiny.cc/router-defaulthistory') : void 0;
	      createHistory = _createHashHistory2.default;
	    }

	    return (0, _useQueries2.default)(createHistory)({ parseQueryString: parseQueryString, stringifyQuery: stringifyQuery });
	  },


	  /* istanbul ignore next: sanity check */
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	     true ? (0, _routerWarning2.default)(nextProps.history === this.props.history, 'You cannot change <Router history>; it will be ignored') : void 0;

	     true ? (0, _routerWarning2.default)((nextProps.routes || nextProps.children) === (this.props.routes || this.props.children), 'You cannot change <Router routes>; it will be ignored') : void 0;
	  },
	  componentWillUnmount: function componentWillUnmount() {
	    if (this._unlisten) this._unlisten();
	  },
	  render: function render() {
	    var _state = this.state;
	    var location = _state.location;
	    var routes = _state.routes;
	    var params = _state.params;
	    var components = _state.components;
	    var _props4 = this.props;
	    var createElement = _props4.createElement;
	    var render = _props4.render;

	    var props = _objectWithoutProperties(_props4, ['createElement', 'render']);

	    if (location == null) return null; // Async match

	    // Only forward non-Router-specific props to routing context, as those are
	    // the only ones that might be custom routing context props.
	    Object.keys(Router.propTypes).forEach(function (propType) {
	      return delete props[propType];
	    });

	    return render(_extends({}, props, {
	      history: this.history,
	      router: this.router,
	      location: location,
	      routes: routes,
	      params: params,
	      components: components,
	      createElement: createElement
	    }));
	  }
	});

	exports.default = Router;
	module.exports = exports['default'];

/***/ }),

/***/ 823:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _RouterContext = __webpack_require__(159);

	var _RouterContext2 = _interopRequireDefault(_RouterContext);

	var _routerWarning = __webpack_require__(27);

	var _routerWarning2 = _interopRequireDefault(_routerWarning);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var RoutingContext = _react2.default.createClass({
	  displayName: 'RoutingContext',
	  componentWillMount: function componentWillMount() {
	     true ? (0, _routerWarning2.default)(false, '`RoutingContext` has been renamed to `RouterContext`. Please use `import { RouterContext } from \'react-router\'`. http://tiny.cc/router-routercontext') : void 0;
	  },
	  render: function render() {
	    return _react2.default.createElement(_RouterContext2.default, this.props);
	  }
	});

	exports.default = RoutingContext;
	module.exports = exports['default'];

/***/ }),

/***/ 824:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.runEnterHooks = runEnterHooks;
	exports.runChangeHooks = runChangeHooks;
	exports.runLeaveHooks = runLeaveHooks;

	var _AsyncUtils = __webpack_require__(235);

	var _routerWarning = __webpack_require__(27);

	var _routerWarning2 = _interopRequireDefault(_routerWarning);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function createTransitionHook(hook, route, asyncArity) {
	  return function () {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    hook.apply(route, args);

	    if (hook.length < asyncArity) {
	      var callback = args[args.length - 1];
	      // Assume hook executes synchronously and
	      // automatically call the callback.
	      callback();
	    }
	  };
	}

	function getEnterHooks(routes) {
	  return routes.reduce(function (hooks, route) {
	    if (route.onEnter) hooks.push(createTransitionHook(route.onEnter, route, 3));

	    return hooks;
	  }, []);
	}

	function getChangeHooks(routes) {
	  return routes.reduce(function (hooks, route) {
	    if (route.onChange) hooks.push(createTransitionHook(route.onChange, route, 4));
	    return hooks;
	  }, []);
	}

	function runTransitionHooks(length, iter, callback) {
	  if (!length) {
	    callback();
	    return;
	  }

	  var redirectInfo = void 0;
	  function replace(location, deprecatedPathname, deprecatedQuery) {
	    if (deprecatedPathname) {
	       true ? (0, _routerWarning2.default)(false, '`replaceState(state, pathname, query) is deprecated; use `replace(location)` with a location descriptor instead. http://tiny.cc/router-isActivedeprecated') : void 0;
	      redirectInfo = {
	        pathname: deprecatedPathname,
	        query: deprecatedQuery,
	        state: location
	      };

	      return;
	    }

	    redirectInfo = location;
	  }

	  (0, _AsyncUtils.loopAsync)(length, function (index, next, done) {
	    iter(index, replace, function (error) {
	      if (error || redirectInfo) {
	        done(error, redirectInfo); // No need to continue.
	      } else {
	          next();
	        }
	    });
	  }, callback);
	}

	/**
	 * Runs all onEnter hooks in the given array of routes in order
	 * with onEnter(nextState, replace, callback) and calls
	 * callback(error, redirectInfo) when finished. The first hook
	 * to use replace short-circuits the loop.
	 *
	 * If a hook needs to run asynchronously, it may use the callback
	 * function. However, doing so will cause the transition to pause,
	 * which could lead to a non-responsive UI if the hook is slow.
	 */
	function runEnterHooks(routes, nextState, callback) {
	  var hooks = getEnterHooks(routes);
	  return runTransitionHooks(hooks.length, function (index, replace, next) {
	    hooks[index](nextState, replace, next);
	  }, callback);
	}

	/**
	 * Runs all onChange hooks in the given array of routes in order
	 * with onChange(prevState, nextState, replace, callback) and calls
	 * callback(error, redirectInfo) when finished. The first hook
	 * to use replace short-circuits the loop.
	 *
	 * If a hook needs to run asynchronously, it may use the callback
	 * function. However, doing so will cause the transition to pause,
	 * which could lead to a non-responsive UI if the hook is slow.
	 */
	function runChangeHooks(routes, state, nextState, callback) {
	  var hooks = getChangeHooks(routes);
	  return runTransitionHooks(hooks.length, function (index, replace, next) {
	    hooks[index](state, nextState, replace, next);
	  }, callback);
	}

	/**
	 * Runs all onLeave hooks in the given array of routes in order.
	 */
	function runLeaveHooks(routes) {
	  for (var i = 0, len = routes.length; i < len; ++i) {
	    if (routes[i].onLeave) routes[i].onLeave.call(routes[i]);
	  }
	}

/***/ }),

/***/ 825:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _RouterContext = __webpack_require__(159);

	var _RouterContext2 = _interopRequireDefault(_RouterContext);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
	    middlewares[_key] = arguments[_key];
	  }

	  var withContext = middlewares.map(function (m) {
	    return m.renderRouterContext;
	  }).filter(function (f) {
	    return f;
	  });
	  var withComponent = middlewares.map(function (m) {
	    return m.renderRouteComponent;
	  }).filter(function (f) {
	    return f;
	  });
	  var makeCreateElement = function makeCreateElement() {
	    var baseCreateElement = arguments.length <= 0 || arguments[0] === undefined ? _react.createElement : arguments[0];
	    return function (Component, props) {
	      return withComponent.reduceRight(function (previous, renderRouteComponent) {
	        return renderRouteComponent(previous, props);
	      }, baseCreateElement(Component, props));
	    };
	  };

	  return function (renderProps) {
	    return withContext.reduceRight(function (previous, renderRouterContext) {
	      return renderRouterContext(previous, renderProps);
	    }, _react2.default.createElement(_RouterContext2.default, _extends({}, renderProps, {
	      createElement: makeCreateElement(renderProps.createElement)
	    })));
	  };
	};

	module.exports = exports['default'];

/***/ }),

/***/ 826:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _createBrowserHistory = __webpack_require__(608);

	var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);

	var _createRouterHistory = __webpack_require__(378);

	var _createRouterHistory2 = _interopRequireDefault(_createRouterHistory);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = (0, _createRouterHistory2.default)(_createBrowserHistory2.default);
	module.exports = exports['default'];

/***/ }),

/***/ 827:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _PatternUtils = __webpack_require__(94);

	function routeParamsChanged(route, prevState, nextState) {
	  if (!route.path) return false;

	  var paramNames = (0, _PatternUtils.getParamNames)(route.path);

	  return paramNames.some(function (paramName) {
	    return prevState.params[paramName] !== nextState.params[paramName];
	  });
	}

	/**
	 * Returns an object of { leaveRoutes, changeRoutes, enterRoutes } determined by
	 * the change from prevState to nextState. We leave routes if either
	 * 1) they are not in the next state or 2) they are in the next state
	 * but their params have changed (i.e. /users/123 => /users/456).
	 *
	 * leaveRoutes are ordered starting at the leaf route of the tree
	 * we're leaving up to the common parent route. enterRoutes are ordered
	 * from the top of the tree we're entering down to the leaf route.
	 *
	 * changeRoutes are any routes that didn't leave or enter during
	 * the transition.
	 */
	function computeChangedRoutes(prevState, nextState) {
	  var prevRoutes = prevState && prevState.routes;
	  var nextRoutes = nextState.routes;

	  var leaveRoutes = void 0,
	      changeRoutes = void 0,
	      enterRoutes = void 0;
	  if (prevRoutes) {
	    (function () {
	      var parentIsLeaving = false;
	      leaveRoutes = prevRoutes.filter(function (route) {
	        if (parentIsLeaving) {
	          return true;
	        } else {
	          var isLeaving = nextRoutes.indexOf(route) === -1 || routeParamsChanged(route, prevState, nextState);
	          if (isLeaving) parentIsLeaving = true;
	          return isLeaving;
	        }
	      });

	      // onLeave hooks start at the leaf route.
	      leaveRoutes.reverse();

	      enterRoutes = [];
	      changeRoutes = [];

	      nextRoutes.forEach(function (route) {
	        var isNew = prevRoutes.indexOf(route) === -1;
	        var paramsChanged = leaveRoutes.indexOf(route) !== -1;

	        if (isNew || paramsChanged) enterRoutes.push(route);else changeRoutes.push(route);
	      });
	    })();
	  } else {
	    leaveRoutes = [];
	    changeRoutes = [];
	    enterRoutes = nextRoutes;
	  }

	  return {
	    leaveRoutes: leaveRoutes,
	    changeRoutes: changeRoutes,
	    enterRoutes: enterRoutes
	  };
	}

	exports.default = computeChangedRoutes;
	module.exports = exports['default'];

/***/ }),

/***/ 828:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _AsyncUtils = __webpack_require__(235);

	var _deprecateObjectProperties = __webpack_require__(160);

	var _routerWarning = __webpack_require__(27);

	var _routerWarning2 = _interopRequireDefault(_routerWarning);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function getComponentsForRoute(nextState, route, callback) {
	  if (route.component || route.components) {
	    callback(null, route.component || route.components);
	    return;
	  }

	  var getComponent = route.getComponent || route.getComponents;
	  if (!getComponent) {
	    callback();
	    return;
	  }

	  var location = nextState.location;

	  var nextStateWithLocation = void 0;

	  if (("development") !== 'production' && _deprecateObjectProperties.canUseMembrane) {
	    nextStateWithLocation = _extends({}, nextState);

	    // I don't use deprecateObjectProperties here because I want to keep the
	    // same code path between development and production, in that we just
	    // assign extra properties to the copy of the state object in both cases.

	    var _loop = function _loop(prop) {
	      if (!Object.prototype.hasOwnProperty.call(location, prop)) {
	        return 'continue';
	      }

	      Object.defineProperty(nextStateWithLocation, prop, {
	        get: function get() {
	           true ? (0, _routerWarning2.default)(false, 'Accessing location properties from the first argument to `getComponent` and `getComponents` is deprecated. That argument is now the router state (`nextState`) rather than the location. To access the location, use `nextState.location`.') : void 0;
	          return location[prop];
	        }
	      });
	    };

	    for (var prop in location) {
	      var _ret = _loop(prop);

	      if (_ret === 'continue') continue;
	    }
	  } else {
	    nextStateWithLocation = _extends({}, nextState, location);
	  }

	  getComponent.call(route, nextStateWithLocation, callback);
	}

	/**
	 * Asynchronously fetches all components needed for the given router
	 * state and calls callback(error, components) when finished.
	 *
	 * Note: This operation may finish synchronously if no routes have an
	 * asynchronous getComponents method.
	 */
	function getComponents(nextState, callback) {
	  (0, _AsyncUtils.mapAsync)(nextState.routes, function (route, index, callback) {
	    getComponentsForRoute(nextState, route, callback);
	  }, callback);
	}

	exports.default = getComponents;
	module.exports = exports['default'];

/***/ }),

/***/ 829:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _PatternUtils = __webpack_require__(94);

	/**
	 * Extracts an object of params the given route cares about from
	 * the given params object.
	 */
	function getRouteParams(route, params) {
	  var routeParams = {};

	  if (!route.path) return routeParams;

	  var paramNames = (0, _PatternUtils.getParamNames)(route.path);

	  for (var p in params) {
	    if (Object.prototype.hasOwnProperty.call(params, p) && paramNames.indexOf(p) !== -1) {
	      routeParams[p] = params[p];
	    }
	  }

	  return routeParams;
	}

	exports.default = getRouteParams;
	module.exports = exports['default'];

/***/ }),

/***/ 830:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _createHashHistory = __webpack_require__(297);

	var _createHashHistory2 = _interopRequireDefault(_createHashHistory);

	var _createRouterHistory = __webpack_require__(378);

	var _createRouterHistory2 = _interopRequireDefault(_createRouterHistory);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = (0, _createRouterHistory2.default)(_createHashHistory2.default);
	module.exports = exports['default'];

/***/ }),

/***/ 831:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.createMemoryHistory = exports.hashHistory = exports.browserHistory = exports.applyRouterMiddleware = exports.formatPattern = exports.useRouterHistory = exports.match = exports.routerShape = exports.locationShape = exports.PropTypes = exports.RoutingContext = exports.RouterContext = exports.createRoutes = exports.useRoutes = exports.RouteContext = exports.Lifecycle = exports.History = exports.Route = exports.Redirect = exports.IndexRoute = exports.IndexRedirect = exports.withRouter = exports.IndexLink = exports.Link = exports.Router = undefined;

	var _RouteUtils = __webpack_require__(67);

	Object.defineProperty(exports, 'createRoutes', {
	  enumerable: true,
	  get: function get() {
	    return _RouteUtils.createRoutes;
	  }
	});

	var _PropTypes2 = __webpack_require__(236);

	Object.defineProperty(exports, 'locationShape', {
	  enumerable: true,
	  get: function get() {
	    return _PropTypes2.locationShape;
	  }
	});
	Object.defineProperty(exports, 'routerShape', {
	  enumerable: true,
	  get: function get() {
	    return _PropTypes2.routerShape;
	  }
	});

	var _PatternUtils = __webpack_require__(94);

	Object.defineProperty(exports, 'formatPattern', {
	  enumerable: true,
	  get: function get() {
	    return _PatternUtils.formatPattern;
	  }
	});

	var _Router2 = __webpack_require__(822);

	var _Router3 = _interopRequireDefault(_Router2);

	var _Link2 = __webpack_require__(374);

	var _Link3 = _interopRequireDefault(_Link2);

	var _IndexLink2 = __webpack_require__(816);

	var _IndexLink3 = _interopRequireDefault(_IndexLink2);

	var _withRouter2 = __webpack_require__(836);

	var _withRouter3 = _interopRequireDefault(_withRouter2);

	var _IndexRedirect2 = __webpack_require__(817);

	var _IndexRedirect3 = _interopRequireDefault(_IndexRedirect2);

	var _IndexRoute2 = __webpack_require__(818);

	var _IndexRoute3 = _interopRequireDefault(_IndexRoute2);

	var _Redirect2 = __webpack_require__(375);

	var _Redirect3 = _interopRequireDefault(_Redirect2);

	var _Route2 = __webpack_require__(820);

	var _Route3 = _interopRequireDefault(_Route2);

	var _History2 = __webpack_require__(815);

	var _History3 = _interopRequireDefault(_History2);

	var _Lifecycle2 = __webpack_require__(819);

	var _Lifecycle3 = _interopRequireDefault(_Lifecycle2);

	var _RouteContext2 = __webpack_require__(821);

	var _RouteContext3 = _interopRequireDefault(_RouteContext2);

	var _useRoutes2 = __webpack_require__(835);

	var _useRoutes3 = _interopRequireDefault(_useRoutes2);

	var _RouterContext2 = __webpack_require__(159);

	var _RouterContext3 = _interopRequireDefault(_RouterContext2);

	var _RoutingContext2 = __webpack_require__(823);

	var _RoutingContext3 = _interopRequireDefault(_RoutingContext2);

	var _PropTypes3 = _interopRequireDefault(_PropTypes2);

	var _match2 = __webpack_require__(833);

	var _match3 = _interopRequireDefault(_match2);

	var _useRouterHistory2 = __webpack_require__(379);

	var _useRouterHistory3 = _interopRequireDefault(_useRouterHistory2);

	var _applyRouterMiddleware2 = __webpack_require__(825);

	var _applyRouterMiddleware3 = _interopRequireDefault(_applyRouterMiddleware2);

	var _browserHistory2 = __webpack_require__(826);

	var _browserHistory3 = _interopRequireDefault(_browserHistory2);

	var _hashHistory2 = __webpack_require__(830);

	var _hashHistory3 = _interopRequireDefault(_hashHistory2);

	var _createMemoryHistory2 = __webpack_require__(377);

	var _createMemoryHistory3 = _interopRequireDefault(_createMemoryHistory2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.Router = _Router3.default; /* components */

	exports.Link = _Link3.default;
	exports.IndexLink = _IndexLink3.default;
	exports.withRouter = _withRouter3.default;

	/* components (configuration) */

	exports.IndexRedirect = _IndexRedirect3.default;
	exports.IndexRoute = _IndexRoute3.default;
	exports.Redirect = _Redirect3.default;
	exports.Route = _Route3.default;

	/* mixins */

	exports.History = _History3.default;
	exports.Lifecycle = _Lifecycle3.default;
	exports.RouteContext = _RouteContext3.default;

	/* utils */

	exports.useRoutes = _useRoutes3.default;
	exports.RouterContext = _RouterContext3.default;
	exports.RoutingContext = _RoutingContext3.default;
	exports.PropTypes = _PropTypes3.default;
	exports.match = _match3.default;
	exports.useRouterHistory = _useRouterHistory3.default;
	exports.applyRouterMiddleware = _applyRouterMiddleware3.default;

	/* histories */

	exports.browserHistory = _browserHistory3.default;
	exports.hashHistory = _hashHistory3.default;
	exports.createMemoryHistory = _createMemoryHistory3.default;

/***/ }),

/***/ 832:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.default = isActive;

	var _PatternUtils = __webpack_require__(94);

	function deepEqual(a, b) {
	  if (a == b) return true;

	  if (a == null || b == null) return false;

	  if (Array.isArray(a)) {
	    return Array.isArray(b) && a.length === b.length && a.every(function (item, index) {
	      return deepEqual(item, b[index]);
	    });
	  }

	  if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) === 'object') {
	    for (var p in a) {
	      if (!Object.prototype.hasOwnProperty.call(a, p)) {
	        continue;
	      }

	      if (a[p] === undefined) {
	        if (b[p] !== undefined) {
	          return false;
	        }
	      } else if (!Object.prototype.hasOwnProperty.call(b, p)) {
	        return false;
	      } else if (!deepEqual(a[p], b[p])) {
	        return false;
	      }
	    }

	    return true;
	  }

	  return String(a) === String(b);
	}

	/**
	 * Returns true if the current pathname matches the supplied one, net of
	 * leading and trailing slash normalization. This is sufficient for an
	 * indexOnly route match.
	 */
	function pathIsActive(pathname, currentPathname) {
	  // Normalize leading slash for consistency. Leading slash on pathname has
	  // already been normalized in isActive. See caveat there.
	  if (currentPathname.charAt(0) !== '/') {
	    currentPathname = '/' + currentPathname;
	  }

	  // Normalize the end of both path names too. Maybe `/foo/` shouldn't show
	  // `/foo` as active, but in this case, we would already have failed the
	  // match.
	  if (pathname.charAt(pathname.length - 1) !== '/') {
	    pathname += '/';
	  }
	  if (currentPathname.charAt(currentPathname.length - 1) !== '/') {
	    currentPathname += '/';
	  }

	  return currentPathname === pathname;
	}

	/**
	 * Returns true if the given pathname matches the active routes and params.
	 */
	function routeIsActive(pathname, routes, params) {
	  var remainingPathname = pathname,
	      paramNames = [],
	      paramValues = [];

	  // for...of would work here but it's probably slower post-transpilation.
	  for (var i = 0, len = routes.length; i < len; ++i) {
	    var route = routes[i];
	    var pattern = route.path || '';

	    if (pattern.charAt(0) === '/') {
	      remainingPathname = pathname;
	      paramNames = [];
	      paramValues = [];
	    }

	    if (remainingPathname !== null && pattern) {
	      var matched = (0, _PatternUtils.matchPattern)(pattern, remainingPathname);
	      if (matched) {
	        remainingPathname = matched.remainingPathname;
	        paramNames = [].concat(paramNames, matched.paramNames);
	        paramValues = [].concat(paramValues, matched.paramValues);
	      } else {
	        remainingPathname = null;
	      }

	      if (remainingPathname === '') {
	        // We have an exact match on the route. Just check that all the params
	        // match.
	        // FIXME: This doesn't work on repeated params.
	        return paramNames.every(function (paramName, index) {
	          return String(paramValues[index]) === String(params[paramName]);
	        });
	      }
	    }
	  }

	  return false;
	}

	/**
	 * Returns true if all key/value pairs in the given query are
	 * currently active.
	 */
	function queryIsActive(query, activeQuery) {
	  if (activeQuery == null) return query == null;

	  if (query == null) return true;

	  return deepEqual(query, activeQuery);
	}

	/**
	 * Returns true if a <Link> to the given pathname/query combination is
	 * currently active.
	 */
	function isActive(_ref, indexOnly, currentLocation, routes, params) {
	  var pathname = _ref.pathname;
	  var query = _ref.query;

	  if (currentLocation == null) return false;

	  // TODO: This is a bit ugly. It keeps around support for treating pathnames
	  // without preceding slashes as absolute paths, but possibly also works
	  // around the same quirks with basenames as in matchRoutes.
	  if (pathname.charAt(0) !== '/') {
	    pathname = '/' + pathname;
	  }

	  if (!pathIsActive(pathname, currentLocation.pathname)) {
	    // The path check is necessary and sufficient for indexOnly, but otherwise
	    // we still need to check the routes.
	    if (indexOnly || !routeIsActive(pathname, routes, params)) {
	      return false;
	    }
	  }

	  return queryIsActive(query, currentLocation.query);
	}
	module.exports = exports['default'];

/***/ }),

/***/ 833:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _invariant = __webpack_require__(16);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _createMemoryHistory = __webpack_require__(377);

	var _createMemoryHistory2 = _interopRequireDefault(_createMemoryHistory);

	var _createTransitionManager = __webpack_require__(237);

	var _createTransitionManager2 = _interopRequireDefault(_createTransitionManager);

	var _RouteUtils = __webpack_require__(67);

	var _RouterUtils = __webpack_require__(376);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	/**
	 * A high-level API to be used for server-side rendering.
	 *
	 * This function matches a location to a set of routes and calls
	 * callback(error, redirectLocation, renderProps) when finished.
	 *
	 * Note: You probably don't want to use this in a browser unless you're using
	 * server-side rendering with async routes.
	 */
	function match(_ref, callback) {
	  var history = _ref.history;
	  var routes = _ref.routes;
	  var location = _ref.location;

	  var options = _objectWithoutProperties(_ref, ['history', 'routes', 'location']);

	  !(history || location) ?  true ? (0, _invariant2.default)(false, 'match needs a history or a location') : (0, _invariant2.default)(false) : void 0;

	  history = history ? history : (0, _createMemoryHistory2.default)(options);
	  var transitionManager = (0, _createTransitionManager2.default)(history, (0, _RouteUtils.createRoutes)(routes));

	  var unlisten = void 0;

	  if (location) {
	    // Allow match({ location: '/the/path', ... })
	    location = history.createLocation(location);
	  } else {
	    // Pick up the location from the history via synchronous history.listen
	    // call if needed.
	    unlisten = history.listen(function (historyLocation) {
	      location = historyLocation;
	    });
	  }

	  var router = (0, _RouterUtils.createRouterObject)(history, transitionManager);
	  history = (0, _RouterUtils.createRoutingHistory)(history, transitionManager);

	  transitionManager.match(location, function (error, redirectLocation, nextState) {
	    callback(error, redirectLocation, nextState && _extends({}, nextState, {
	      history: history,
	      router: router,
	      matchContext: { history: history, transitionManager: transitionManager, router: router }
	    }));

	    // Defer removing the listener to here to prevent DOM histories from having
	    // to unwind DOM event listeners unnecessarily, in case callback renders a
	    // <Router> and attaches another history listener.
	    if (unlisten) {
	      unlisten();
	    }
	  });
	}

	exports.default = match;
	module.exports = exports['default'];

/***/ }),

/***/ 834:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.default = matchRoutes;

	var _routerWarning = __webpack_require__(27);

	var _routerWarning2 = _interopRequireDefault(_routerWarning);

	var _AsyncUtils = __webpack_require__(235);

	var _PatternUtils = __webpack_require__(94);

	var _RouteUtils = __webpack_require__(67);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function getChildRoutes(route, location, callback) {
	  if (route.childRoutes) {
	    return [null, route.childRoutes];
	  }
	  if (!route.getChildRoutes) {
	    return [];
	  }

	  var sync = true,
	      result = void 0;

	  route.getChildRoutes(location, function (error, childRoutes) {
	    childRoutes = !error && (0, _RouteUtils.createRoutes)(childRoutes);
	    if (sync) {
	      result = [error, childRoutes];
	      return;
	    }

	    callback(error, childRoutes);
	  });

	  sync = false;
	  return result; // Might be undefined.
	}

	function getIndexRoute(route, location, callback) {
	  if (route.indexRoute) {
	    callback(null, route.indexRoute);
	  } else if (route.getIndexRoute) {
	    route.getIndexRoute(location, function (error, indexRoute) {
	      callback(error, !error && (0, _RouteUtils.createRoutes)(indexRoute)[0]);
	    });
	  } else if (route.childRoutes) {
	    (function () {
	      var pathless = route.childRoutes.filter(function (childRoute) {
	        return !childRoute.path;
	      });

	      (0, _AsyncUtils.loopAsync)(pathless.length, function (index, next, done) {
	        getIndexRoute(pathless[index], location, function (error, indexRoute) {
	          if (error || indexRoute) {
	            var routes = [pathless[index]].concat(Array.isArray(indexRoute) ? indexRoute : [indexRoute]);
	            done(error, routes);
	          } else {
	            next();
	          }
	        });
	      }, function (err, routes) {
	        callback(null, routes);
	      });
	    })();
	  } else {
	    callback();
	  }
	}

	function assignParams(params, paramNames, paramValues) {
	  return paramNames.reduce(function (params, paramName, index) {
	    var paramValue = paramValues && paramValues[index];

	    if (Array.isArray(params[paramName])) {
	      params[paramName].push(paramValue);
	    } else if (paramName in params) {
	      params[paramName] = [params[paramName], paramValue];
	    } else {
	      params[paramName] = paramValue;
	    }

	    return params;
	  }, params);
	}

	function createParams(paramNames, paramValues) {
	  return assignParams({}, paramNames, paramValues);
	}

	function matchRouteDeep(route, location, remainingPathname, paramNames, paramValues, callback) {
	  var pattern = route.path || '';

	  if (pattern.charAt(0) === '/') {
	    remainingPathname = location.pathname;
	    paramNames = [];
	    paramValues = [];
	  }

	  // Only try to match the path if the route actually has a pattern, and if
	  // we're not just searching for potential nested absolute paths.
	  if (remainingPathname !== null && pattern) {
	    try {
	      var matched = (0, _PatternUtils.matchPattern)(pattern, remainingPathname);
	      if (matched) {
	        remainingPathname = matched.remainingPathname;
	        paramNames = [].concat(paramNames, matched.paramNames);
	        paramValues = [].concat(paramValues, matched.paramValues);
	      } else {
	        remainingPathname = null;
	      }
	    } catch (error) {
	      callback(error);
	    }

	    // By assumption, pattern is non-empty here, which is the prerequisite for
	    // actually terminating a match.
	    if (remainingPathname === '') {
	      var _ret2 = function () {
	        var match = {
	          routes: [route],
	          params: createParams(paramNames, paramValues)
	        };

	        getIndexRoute(route, location, function (error, indexRoute) {
	          if (error) {
	            callback(error);
	          } else {
	            if (Array.isArray(indexRoute)) {
	              var _match$routes;

	               true ? (0, _routerWarning2.default)(indexRoute.every(function (route) {
	                return !route.path;
	              }), 'Index routes should not have paths') : void 0;
	              (_match$routes = match.routes).push.apply(_match$routes, indexRoute);
	            } else if (indexRoute) {
	               true ? (0, _routerWarning2.default)(!indexRoute.path, 'Index routes should not have paths') : void 0;
	              match.routes.push(indexRoute);
	            }

	            callback(null, match);
	          }
	        });

	        return {
	          v: void 0
	        };
	      }();

	      if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
	    }
	  }

	  if (remainingPathname != null || route.childRoutes) {
	    // Either a) this route matched at least some of the path or b)
	    // we don't have to load this route's children asynchronously. In
	    // either case continue checking for matches in the subtree.
	    var onChildRoutes = function onChildRoutes(error, childRoutes) {
	      if (error) {
	        callback(error);
	      } else if (childRoutes) {
	        // Check the child routes to see if any of them match.
	        matchRoutes(childRoutes, location, function (error, match) {
	          if (error) {
	            callback(error);
	          } else if (match) {
	            // A child route matched! Augment the match and pass it up the stack.
	            match.routes.unshift(route);
	            callback(null, match);
	          } else {
	            callback();
	          }
	        }, remainingPathname, paramNames, paramValues);
	      } else {
	        callback();
	      }
	    };

	    var result = getChildRoutes(route, location, onChildRoutes);
	    if (result) {
	      onChildRoutes.apply(undefined, result);
	    }
	  } else {
	    callback();
	  }
	}

	/**
	 * Asynchronously matches the given location to a set of routes and calls
	 * callback(error, state) when finished. The state object will have the
	 * following properties:
	 *
	 * - routes       An array of routes that matched, in hierarchical order
	 * - params       An object of URL parameters
	 *
	 * Note: This operation may finish synchronously if no routes have an
	 * asynchronous getChildRoutes method.
	 */
	function matchRoutes(routes, location, callback, remainingPathname) {
	  var paramNames = arguments.length <= 4 || arguments[4] === undefined ? [] : arguments[4];
	  var paramValues = arguments.length <= 5 || arguments[5] === undefined ? [] : arguments[5];

	  if (remainingPathname === undefined) {
	    // TODO: This is a little bit ugly, but it works around a quirk in history
	    // that strips the leading slash from pathnames when using basenames with
	    // trailing slashes.
	    if (location.pathname.charAt(0) !== '/') {
	      location = _extends({}, location, {
	        pathname: '/' + location.pathname
	      });
	    }
	    remainingPathname = location.pathname;
	  }

	  (0, _AsyncUtils.loopAsync)(routes.length, function (index, next, done) {
	    matchRouteDeep(routes[index], location, remainingPathname, paramNames, paramValues, function (error, match) {
	      if (error || match) {
	        done(error, match);
	      } else {
	        next();
	      }
	    });
	  }, callback);
	}
	module.exports = exports['default'];

/***/ }),

/***/ 835:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _useQueries = __webpack_require__(137);

	var _useQueries2 = _interopRequireDefault(_useQueries);

	var _createTransitionManager = __webpack_require__(237);

	var _createTransitionManager2 = _interopRequireDefault(_createTransitionManager);

	var _routerWarning = __webpack_require__(27);

	var _routerWarning2 = _interopRequireDefault(_routerWarning);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	/**
	 * Returns a new createHistory function that may be used to create
	 * history objects that know about routing.
	 *
	 * Enhances history objects with the following methods:
	 *
	 * - listen((error, nextState) => {})
	 * - listenBeforeLeavingRoute(route, (nextLocation) => {})
	 * - match(location, (error, redirectLocation, nextState) => {})
	 * - isActive(pathname, query, indexOnly=false)
	 */
	function useRoutes(createHistory) {
	   true ? (0, _routerWarning2.default)(false, '`useRoutes` is deprecated. Please use `createTransitionManager` instead.') : void 0;

	  return function () {
	    var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    var routes = _ref.routes;

	    var options = _objectWithoutProperties(_ref, ['routes']);

	    var history = (0, _useQueries2.default)(createHistory)(options);
	    var transitionManager = (0, _createTransitionManager2.default)(history, routes);
	    return _extends({}, history, transitionManager);
	  };
	}

	exports.default = useRoutes;
	module.exports = exports['default'];

/***/ }),

/***/ 836:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = withRouter;

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _hoistNonReactStatics = __webpack_require__(300);

	var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

	var _PropTypes = __webpack_require__(236);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function getDisplayName(WrappedComponent) {
	  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
	}

	function withRouter(WrappedComponent) {
	  var WithRouter = _react2.default.createClass({
	    displayName: 'WithRouter',

	    contextTypes: { router: _PropTypes.routerShape },
	    render: function render() {
	      return _react2.default.createElement(WrappedComponent, _extends({}, this.props, { router: this.context.router }));
	    }
	  });

	  WithRouter.displayName = 'withRouter(' + getDisplayName(WrappedComponent) + ')';
	  WithRouter.WrappedComponent = WrappedComponent;

	  return (0, _hoistNonReactStatics2.default)(WithRouter, WrappedComponent);
	}
	module.exports = exports['default'];

/***/ }),

/***/ 837:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	'use strict';

	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */

	var warning = function() {};

	if (true) {
	  warning = function(condition, format, args) {
	    var len = arguments.length;
	    args = new Array(len > 2 ? len - 2 : 0);
	    for (var key = 2; key < len; key++) {
	      args[key - 2] = arguments[key];
	    }
	    if (format === undefined) {
	      throw new Error(
	        '`warning(condition, format, ...args)` requires a warning ' +
	        'message argument'
	      );
	    }

	    if (format.length < 10 || (/^[s\W]*$/).test(format)) {
	      throw new Error(
	        'The warning format should be able to uniquely identify this ' +
	        'warning. Please, use a more descriptive format than: ' + format
	      );
	    }

	    if (!condition) {
	      var argIndex = 0;
	      var message = 'Warning: ' +
	        format.replace(/%s/g, function() {
	          return args[argIndex++];
	        });
	      if (typeof console !== 'undefined') {
	        console.error(message);
	      }
	      try {
	        // This error was thrown as a convenience so that you can use this stack
	        // to find the callsite that caused this warning to fire.
	        throw new Error(message);
	      } catch(x) {}
	    }
	  };
	}

	module.exports = warning;


/***/ }),

/***/ 853:
/***/ (function(module, exports) {

	'use strict';
	module.exports = function (str) {
		return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
			return '%' + c.charCodeAt(0).toString(16).toUpperCase();
		});
	};


/***/ }),

/***/ 859:
/***/ (function(module, exports) {

	(function(self) {
	  'use strict';

	  if (self.fetch) {
	    return
	  }

	  function normalizeName(name) {
	    if (typeof name !== 'string') {
	      name = String(name)
	    }
	    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
	      throw new TypeError('Invalid character in header field name')
	    }
	    return name.toLowerCase()
	  }

	  function normalizeValue(value) {
	    if (typeof value !== 'string') {
	      value = String(value)
	    }
	    return value
	  }

	  function Headers(headers) {
	    this.map = {}

	    if (headers instanceof Headers) {
	      headers.forEach(function(value, name) {
	        this.append(name, value)
	      }, this)

	    } else if (headers) {
	      Object.getOwnPropertyNames(headers).forEach(function(name) {
	        this.append(name, headers[name])
	      }, this)
	    }
	  }

	  Headers.prototype.append = function(name, value) {
	    name = normalizeName(name)
	    value = normalizeValue(value)
	    var list = this.map[name]
	    if (!list) {
	      list = []
	      this.map[name] = list
	    }
	    list.push(value)
	  }

	  Headers.prototype['delete'] = function(name) {
	    delete this.map[normalizeName(name)]
	  }

	  Headers.prototype.get = function(name) {
	    var values = this.map[normalizeName(name)]
	    return values ? values[0] : null
	  }

	  Headers.prototype.getAll = function(name) {
	    return this.map[normalizeName(name)] || []
	  }

	  Headers.prototype.has = function(name) {
	    return this.map.hasOwnProperty(normalizeName(name))
	  }

	  Headers.prototype.set = function(name, value) {
	    this.map[normalizeName(name)] = [normalizeValue(value)]
	  }

	  Headers.prototype.forEach = function(callback, thisArg) {
	    Object.getOwnPropertyNames(this.map).forEach(function(name) {
	      this.map[name].forEach(function(value) {
	        callback.call(thisArg, value, name, this)
	      }, this)
	    }, this)
	  }

	  function consumed(body) {
	    if (body.bodyUsed) {
	      return Promise.reject(new TypeError('Already read'))
	    }
	    body.bodyUsed = true
	  }

	  function fileReaderReady(reader) {
	    return new Promise(function(resolve, reject) {
	      reader.onload = function() {
	        resolve(reader.result)
	      }
	      reader.onerror = function() {
	        reject(reader.error)
	      }
	    })
	  }

	  function readBlobAsArrayBuffer(blob) {
	    var reader = new FileReader()
	    reader.readAsArrayBuffer(blob)
	    return fileReaderReady(reader)
	  }

	  function readBlobAsText(blob) {
	    var reader = new FileReader()
	    reader.readAsText(blob)
	    return fileReaderReady(reader)
	  }

	  var support = {
	    blob: 'FileReader' in self && 'Blob' in self && (function() {
	      try {
	        new Blob()
	        return true
	      } catch(e) {
	        return false
	      }
	    })(),
	    formData: 'FormData' in self,
	    arrayBuffer: 'ArrayBuffer' in self
	  }

	  function Body() {
	    this.bodyUsed = false


	    this._initBody = function(body) {
	      this._bodyInit = body
	      if (typeof body === 'string') {
	        this._bodyText = body
	      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
	        this._bodyBlob = body
	      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
	        this._bodyFormData = body
	      } else if (!body) {
	        this._bodyText = ''
	      } else if (support.arrayBuffer && ArrayBuffer.prototype.isPrototypeOf(body)) {
	        // Only support ArrayBuffers for POST method.
	        // Receiving ArrayBuffers happens via Blobs, instead.
	      } else {
	        throw new Error('unsupported BodyInit type')
	      }

	      if (!this.headers.get('content-type')) {
	        if (typeof body === 'string') {
	          this.headers.set('content-type', 'text/plain;charset=UTF-8')
	        } else if (this._bodyBlob && this._bodyBlob.type) {
	          this.headers.set('content-type', this._bodyBlob.type)
	        }
	      }
	    }

	    if (support.blob) {
	      this.blob = function() {
	        var rejected = consumed(this)
	        if (rejected) {
	          return rejected
	        }

	        if (this._bodyBlob) {
	          return Promise.resolve(this._bodyBlob)
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as blob')
	        } else {
	          return Promise.resolve(new Blob([this._bodyText]))
	        }
	      }

	      this.arrayBuffer = function() {
	        return this.blob().then(readBlobAsArrayBuffer)
	      }

	      this.text = function() {
	        var rejected = consumed(this)
	        if (rejected) {
	          return rejected
	        }

	        if (this._bodyBlob) {
	          return readBlobAsText(this._bodyBlob)
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as text')
	        } else {
	          return Promise.resolve(this._bodyText)
	        }
	      }
	    } else {
	      this.text = function() {
	        var rejected = consumed(this)
	        return rejected ? rejected : Promise.resolve(this._bodyText)
	      }
	    }

	    if (support.formData) {
	      this.formData = function() {
	        return this.text().then(decode)
	      }
	    }

	    this.json = function() {
	      return this.text().then(JSON.parse)
	    }

	    return this
	  }

	  // HTTP methods whose capitalization should be normalized
	  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

	  function normalizeMethod(method) {
	    var upcased = method.toUpperCase()
	    return (methods.indexOf(upcased) > -1) ? upcased : method
	  }

	  function Request(input, options) {
	    options = options || {}
	    var body = options.body
	    if (Request.prototype.isPrototypeOf(input)) {
	      if (input.bodyUsed) {
	        throw new TypeError('Already read')
	      }
	      this.url = input.url
	      this.credentials = input.credentials
	      if (!options.headers) {
	        this.headers = new Headers(input.headers)
	      }
	      this.method = input.method
	      this.mode = input.mode
	      if (!body) {
	        body = input._bodyInit
	        input.bodyUsed = true
	      }
	    } else {
	      this.url = input
	    }

	    this.credentials = options.credentials || this.credentials || 'omit'
	    if (options.headers || !this.headers) {
	      this.headers = new Headers(options.headers)
	    }
	    this.method = normalizeMethod(options.method || this.method || 'GET')
	    this.mode = options.mode || this.mode || null
	    this.referrer = null

	    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
	      throw new TypeError('Body not allowed for GET or HEAD requests')
	    }
	    this._initBody(body)
	  }

	  Request.prototype.clone = function() {
	    return new Request(this)
	  }

	  function decode(body) {
	    var form = new FormData()
	    body.trim().split('&').forEach(function(bytes) {
	      if (bytes) {
	        var split = bytes.split('=')
	        var name = split.shift().replace(/\+/g, ' ')
	        var value = split.join('=').replace(/\+/g, ' ')
	        form.append(decodeURIComponent(name), decodeURIComponent(value))
	      }
	    })
	    return form
	  }

	  function headers(xhr) {
	    var head = new Headers()
	    var pairs = (xhr.getAllResponseHeaders() || '').trim().split('\n')
	    pairs.forEach(function(header) {
	      var split = header.trim().split(':')
	      var key = split.shift().trim()
	      var value = split.join(':').trim()
	      head.append(key, value)
	    })
	    return head
	  }

	  Body.call(Request.prototype)

	  function Response(bodyInit, options) {
	    if (!options) {
	      options = {}
	    }

	    this.type = 'default'
	    this.status = options.status
	    this.ok = this.status >= 200 && this.status < 300
	    this.statusText = options.statusText
	    this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers)
	    this.url = options.url || ''
	    this._initBody(bodyInit)
	  }

	  Body.call(Response.prototype)

	  Response.prototype.clone = function() {
	    return new Response(this._bodyInit, {
	      status: this.status,
	      statusText: this.statusText,
	      headers: new Headers(this.headers),
	      url: this.url
	    })
	  }

	  Response.error = function() {
	    var response = new Response(null, {status: 0, statusText: ''})
	    response.type = 'error'
	    return response
	  }

	  var redirectStatuses = [301, 302, 303, 307, 308]

	  Response.redirect = function(url, status) {
	    if (redirectStatuses.indexOf(status) === -1) {
	      throw new RangeError('Invalid status code')
	    }

	    return new Response(null, {status: status, headers: {location: url}})
	  }

	  self.Headers = Headers
	  self.Request = Request
	  self.Response = Response

	  self.fetch = function(input, init) {
	    return new Promise(function(resolve, reject) {
	      var request
	      if (Request.prototype.isPrototypeOf(input) && !init) {
	        request = input
	      } else {
	        request = new Request(input, init)
	      }

	      var xhr = new XMLHttpRequest()

	      function responseURL() {
	        if ('responseURL' in xhr) {
	          return xhr.responseURL
	        }

	        // Avoid security warnings on getResponseHeader when not allowed by CORS
	        if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
	          return xhr.getResponseHeader('X-Request-URL')
	        }

	        return
	      }

	      xhr.onload = function() {
	        var status = (xhr.status === 1223) ? 204 : xhr.status
	        if (status < 100 || status > 599) {
	          reject(new TypeError('Network request failed'))
	          return
	        }
	        var options = {
	          status: status,
	          statusText: xhr.statusText,
	          headers: headers(xhr),
	          url: responseURL()
	        }
	        var body = 'response' in xhr ? xhr.response : xhr.responseText
	        resolve(new Response(body, options))
	      }

	      xhr.onerror = function() {
	        reject(new TypeError('Network request failed'))
	      }

	      xhr.ontimeout = function() {
	        reject(new TypeError('Network request failed'))
	      }

	      xhr.open(request.method, request.url, true)

	      if (request.credentials === 'include') {
	        xhr.withCredentials = true
	      }

	      if ('responseType' in xhr && support.blob) {
	        xhr.responseType = 'blob'
	      }

	      request.headers.forEach(function(value, name) {
	        xhr.setRequestHeader(name, value)
	      })

	      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
	    })
	  }
	  self.fetch.polyfill = true
	})(typeof self !== 'undefined' ? self : this);


/***/ })

});