webpackJsonp([2],{

/***/ 388:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.Dashboard = undefined;

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

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Dashboard = exports.Dashboard = function (_React$Component) {
	  (0, _inherits3.default)(Dashboard, _React$Component);

	  Dashboard.prototype.componentDidMount = function componentDidMount() {};

	  function Dashboard(props) {
	    (0, _classCallCheck3.default)(this, Dashboard);

	    var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call(this, props));

	    _this.state = {};
	    return _this;
	  }

	  Dashboard.prototype.render = function render() {
	    var _this2 = this;

	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(
	        'h1',
	        null,
	        'Dashboard'
	      ),
	      _react2.default.createElement(
	        _reactBootstrap.ButtonToolbar,
	        null,
	        _react2.default.createElement(
	          _reactBootstrap.ButtonGroup,
	          null,
	          _react2.default.createElement(
	            _reactBootstrap.Button,
	            { onClick: function onClick() {
	                return _this2.context.router.push((0, _CommonUtil.getRoutePath)('sample'));
	              } },
	            'Go to sample page'
	          )
	        )
	      ),
	      _react2.default.createElement(
	        'p',
	        { style: { marginTop: 32 } },
	        'Place your sample below this line (Dashboard/Dashboard.js):'
	      ),
	      _react2.default.createElement('hr', { style: { border: '1px solid black' } })
	    );
	  };

	  return Dashboard;
	}(_react2.default.Component);

	// latest way to dispatch


	Dashboard.contextTypes = {
	  // @see https://github.com/grommet/grommet/issues/441
	  router: _react2.default.PropTypes.object.isRequired
	};

	exports.default = (0, _reactRedux.connect)(function (storeState) {
	  // store state to props
	  return {};
	})(Dashboard);

/***/ })

});