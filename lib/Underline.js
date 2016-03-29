'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactNative = require('react-native');

var _reactNative2 = _interopRequireDefault(_reactNative);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Underline = function (_Component) {
	_inherits(Underline, _Component);

	function Underline(props) {
		_classCallCheck(this, Underline);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Underline).call(this, props));

		_this.state = {
			lineLength: new _reactNative.Animated.Value(0)
		};
		_this.wrapperWidth = 0;
		return _this;
	}

	_createClass(Underline, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this2 = this;

			requestAnimationFrame(function () {
				if (_this2.refs.wrapper == null) {
					return;
				}
				var container = _this2.refs.wrapper; // un-box animated view
				container.measure(function (left, top, width, height) {
					_this2.wrapperWidth = width;
				});
			});
		}
	}, {
		key: 'expandLine',
		value: function expandLine() {
			_reactNative.Animated.timing(this.state.lineLength, {
				toValue: this.wrapperWidth,
				duration: this.props.duration
			}).start();
		}
	}, {
		key: 'shrinkLine',
		value: function shrinkLine() {
			_reactNative.Animated.timing(this.state.lineLength, {
				toValue: 0,
				duration: this.props.duration
			}).start();
		}
	}, {
		key: 'render',
		value: function render() {
			var _props = this.props;
			var borderColor = _props.borderColor;
			var highlightColor = _props.highlightColor;

			return _reactNative2.default.createElement(
				_reactNative.View,
				{
					style: [styles.underlineWrapper, {
						backgroundColor: borderColor
					}],
					ref: 'wrapper'
				},
				_reactNative2.default.createElement(_reactNative.Animated.View, {
					style: [{
						width: this.state.lineLength,
						height: 2,
						backgroundColor: highlightColor
					}] })
			);
		}
	}]);

	return Underline;
}(_reactNative.Component);

exports.default = Underline;


Underline.propTypes = {
	duration: _reactNative.PropTypes.number,
	highlightColor: _reactNative.PropTypes.string,
	borderColor: _reactNative.PropTypes.string
};

var styles = _reactNative.StyleSheet.create({
	underlineWrapper: {
		height: 2,
		alignItems: 'center'
	}
});