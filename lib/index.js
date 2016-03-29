'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactNative = require('react-native');

var _reactNative2 = _interopRequireDefault(_reactNative);

var _Underline = require('./Underline');

var _Underline2 = _interopRequireDefault(_Underline);

var _FloatingLabel = require('./FloatingLabel');

var _FloatingLabel2 = _interopRequireDefault(_FloatingLabel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TextField = function (_Component) {
    _inherits(TextField, _Component);

    function TextField(props, context) {
        _classCallCheck(this, TextField);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TextField).call(this, props, context));

        _this.state = {
            isFocused: false,
            text: props.value
        };
        return _this;
    }

    _createClass(TextField, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(props) {
            if (this.props.value !== props.value) {
                this.setState({
                    text: props.value
                });
            }
        }
    }, {
        key: 'focus',
        value: function focus() {
            this.refs.input.focus();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props;
            var label = _props.label;
            var highlightColor = _props.highlightColor;
            var duration = _props.duration;
            var labelColor = _props.labelColor;
            var borderColor = _props.borderColor;
            var _onFocus = _props.onFocus;
            var _onBlur = _props.onBlur;
            var _onChangeText = _props.onChangeText;
            var value = _props.value;
            var dense = _props.dense;


            var childProps = {
                autoFocus: this.props.autoFocus,
                defaultValue: this.props.defaultValue,
                keyboardAppearance: this.props.keyboardAppearance,
                keyboardType: this.props.keyboardType,
                secureTextEntry: this.props.secureTextEntry,
                style: this.props.style,
                underlineColorAndroid: this.props.underlineColorAndroid
            };

            return _reactNative2.default.createElement(
                _reactNative.View,
                { style: dense ? styles.denseWrapper : styles.wrapper, ref: 'wrapper' },
                _reactNative2.default.createElement(_reactNative.TextInput, _extends({
                    style: dense ? styles.denseTextInput : styles.textInput,
                    onFocus: function onFocus() {
                        _this2.setState({ isFocused: true });
                        _this2.refs.floatingLabel.floatLabel();
                        _this2.refs.underline.expandLine();
                        _onFocus && _onFocus();
                    },
                    onBlur: function onBlur() {
                        _this2.setState({ isFocused: false });
                        !_this2.state.text.length && _this2.refs.floatingLabel.sinkLabel();
                        _this2.refs.underline.shrinkLine();
                        _onBlur && _onBlur();
                    },
                    onChangeText: function onChangeText(text) {
                        _this2.setState({ text: text });
                        _onChangeText && _onChangeText(text);
                    },
                    ref: 'input',
                    value: this.state.text
                }, childProps)),
                _reactNative2.default.createElement(_Underline2.default, {
                    ref: 'underline',
                    highlightColor: highlightColor,
                    duration: duration,
                    borderColor: borderColor
                }),
                _reactNative2.default.createElement(_FloatingLabel2.default, {
                    isFocused: this.state.isFocused,
                    ref: 'floatingLabel',
                    focusHandler: this.focus.bind(this),
                    label: label,
                    labelColor: labelColor,
                    highlightColor: highlightColor,
                    duration: duration,
                    dense: dense,
                    hasValue: this.state.text.length ? true : false
                })
            );
        }
    }]);

    return TextField;
}(_reactNative.Component);

exports.default = TextField;


TextField.propTypes = {
    duration: _reactNative.PropTypes.number,
    label: _reactNative.PropTypes.string,
    highlightColor: _reactNative.PropTypes.string,
    onFocus: _reactNative.PropTypes.func,
    onBlur: _reactNative.PropTypes.func,
    onChangeText: _reactNative.PropTypes.func,
    value: _reactNative.PropTypes.string,
    dense: _reactNative.PropTypes.bool
};

TextField.defaultProps = {
    duration: 200,
    labelColor: '#9E9E9E',
    borderColor: '#E0E0E0',
    value: '',
    dense: false,
    underlineColorAndroid: 'rgba(0,0,0,0)'
};

var styles = _reactNative.StyleSheet.create({
    wrapper: {
        height: 72,
        paddingTop: 30,
        paddingBottom: 7,
        position: 'relative'
    },
    denseWrapper: {
        height: 60,
        paddingTop: 28,
        paddingBottom: 4,
        position: 'relative'
    },
    textInput: {
        fontSize: 18,
        height: 34,
        lineHeight: 34
    },
    denseTextInput: {
        fontSize: 13,
        height: 27,
        lineHeight: 24,
        paddingBottom: 3
    }
});