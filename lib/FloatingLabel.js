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

var FloatingLabel = function (_Component) {
  _inherits(FloatingLabel, _Component);

  function FloatingLabel(props) {
    _classCallCheck(this, FloatingLabel);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(FloatingLabel).call(this, props));

    if (props.dense) {
      _this.posTop = 12;
      _this.posBottom = 32;
      _this.fontLarge = 13;
      _this.fontSmall = 13;
    } else {
      _this.posTop = 16;
      _this.posBottom = 37;
      _this.fontLarge = 16;
      _this.fontSmall = 12;
    }
    var posTop = props.hasValue ? _this.posTop : _this.posBottom;
    var fontSize = props.hasValue ? _this.fontSmall : _this.fontLarge;
    _this.state = {
      top: new _reactNative.Animated.Value(posTop),
      fontSize: new _reactNative.Animated.Value(fontSize)
    };
    return _this;
  }

  _createClass(FloatingLabel, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      if (this.props.hasValue !== props.hasValue) {
        var posTop = props.hasValue ? this.posTop : this.posBottom;
        var fontSize = props.hasValue ? this.fontSmall : this.fontLarge;

        this.setState({
          top: new _reactNative.Animated.Value(posTop),
          fontSize: new _reactNative.Animated.Value(fontSize)
        });
      }
    }
  }, {
    key: 'floatLabel',
    value: function floatLabel() {
      _reactNative.Animated.parallel([_reactNative.Animated.timing(this.state.top, {
        toValue: this.posTop,
        duration: this.props.duration
      }), _reactNative.Animated.timing(this.state.fontSize, {
        toValue: this.fontSmall,
        duration: this.props.duration
      })]).start();
    }
  }, {
    key: 'sinkLabel',
    value: function sinkLabel() {
      _reactNative.Animated.parallel([_reactNative.Animated.timing(this.state.top, {
        toValue: this.posBottom,
        duration: this.props.duration
      }), _reactNative.Animated.timing(this.state.fontSize, {
        toValue: this.fontLarge,
        duration: this.props.duration
      })]).start();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props;
      var label = _props.label;
      var labelColor = _props.labelColor;
      var highlightColor = _props.highlightColor;


      return _reactNative2.default.createElement(
        _reactNative.Animated.Text,
        {
          style: [{
            fontSize: this.state.fontSize,
            top: this.state.top,
            color: labelColor
          }, styles.labelText, this.props.isFocused && {
            color: highlightColor
          }],
          onPress: function onPress() {
            _this2.props.focusHandler();
          }
        },
        label
      );
    }
  }]);

  return FloatingLabel;
}(_reactNative.Component);

exports.default = FloatingLabel;


FloatingLabel.propTypes = {
  duration: _reactNative.PropTypes.number,
  label: _reactNative.PropTypes.string,
  labelColor: _reactNative.PropTypes.string,
  highlightColor: _reactNative.PropTypes.string,
  dense: _reactNative.PropTypes.bool,
  hasValue: _reactNative.PropTypes.bool
};

var styles = _reactNative.StyleSheet.create({
  labelText: {
    position: 'absolute',
    left: 0,
    backgroundColor: 'rgba(0,0,0,0)'
  }
});