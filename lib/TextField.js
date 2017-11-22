'use strict';
import React, {Component} from "react";
import PropTypes from 'prop-types';
import {View, ViewPropTypes, TextInput, StyleSheet} from "react-native";

import Underline from './Underline';
import FloatingLabel from './FloatingLabel';

export default class TextField extends Component {
  _wrapper: null;
  _input: null;
  _underline: null;
  _floatingLabel: null;

  constructor(props: Object, context: Object) {
    super(props, context);
    this.state = {
      isFocused: false,
      text: props.value,
      height: props.height
    };

    this.bindFunctions();
  }

  bindFunctions() {
    this.onRefWrapper = this.onRefWrapper.bind(this);
    this.onRefInput = this.onRefInput.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onContentSizeChange = this.onContentSizeChange.bind(this);
    this.onRefUnderline = this.onRefUnderline.bind(this);
    this.onRefFloatingLabel = this.onRefFloatingLabel.bind(this);
    this.focus = this.focus.bind(this);
  }

  focus() {
    if ( this.props.editable )
      this._input.focus();
  }
  blur() {
    this._input.blur();
  }
  isFocused() {
    return this.state.isFocused;
  }
  measureLayout(...args){
    this._wrapper.measureLayout(...args)
  }
  componentWillReceiveProps(nextProps: Object){
    if(this.props.text !== nextProps.value){
      nextProps.value.length !== 0 ?
        this._floatingLabel.floatLabel()
        : this._floatingLabel.sinkLabel();
      this.setState({text: nextProps.value});
    }
    if(this.props.height !== nextProps.height){
      this.setState({height: nextProps.height});
    }
  }

  onRefWrapper(_wrapper) {
    this._wrapper = _wrapper
  }

  onRefInput(_input) {
    this._input = _input
  }

  onBlur() {
    this.setState({isFocused: false});
    !this.state.text.length && this._floatingLabel.sinkLabel();
    this._underline.shrinkLine();
    this.props.onBlur && this.props.onBlur();
  }

  onFocus() {
    this.setState({isFocused: true});
    this._floatingLabel.floatLabel();
    this._underline.expandLine();
    this.props.onFocus && this.props.onFocus();
  }

  onChangeText(text) {
    this.setState({text});
    this.props.onChangeText && this.props.onChangeText(text);
  }

  onChange(e) {
    this.props.onChange && this.props.onChange(e);
  }

  onContentSizeChange(e) {
    if(this.props.autoGrow){
      this.setState({height: e.nativeEvent.contentSize.height});
    }
    this.props.onContentSizeChange && this.props.onContentSizeChange(e);
  }

  onRefUnderline(_underline) {
    this._underline = _underline
  }

  onRefFloatingLabel(_floatingLabel) {
    this._floatingLabel = _floatingLabel
  }

  render() {
    let {
      label,
      highlightColor,
      duration,
      labelColor,
      borderColor,
      textColor,
      textFocusColor,
      textBlurColor,
      value,
      dense,
      inputStyle,
      wrapperStyle,
      labelStyle,
      height,
      multiline,
      ...props
    } = this.props;
    return (
      <View
        ref={this.onRefWrapper}
        style={[dense ? styles.denseWrapper : styles.wrapper, this.state.height ? {height: undefined}: null, wrapperStyle]}
        collapsable={false}
      >
        <TextInput
          ref={this.onRefInput}
          style={[dense ? styles.denseTextInput : styles.textInput, {
            color: textColor
          }, (this.state.isFocused && textFocusColor) ? {
            color: textFocusColor
          } : null, (!this.state.isFocused && textBlurColor) ? {
            color: textBlurColor
          } : null, inputStyle,  this.state.height ? {height: this.state.height} : null]}
          multiline={multiline}
          value={this.state.text}
          {...props}

          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChangeText={this.onChangeText}
          onChange={this.onChange}
          onContentSizeChange={this.onContentSizeChange}
        />
        <Underline
          ref={this.onRefUnderline}
          highlightColor={highlightColor}
          duration={duration}
          borderColor={borderColor}
        />
        <FloatingLabel
          ref={this.onRefFloatingLabel}
          isFocused={this.state.isFocused}
          focusHandler={this.focus}
          label={label}
          labelColor={labelColor}
          highlightColor={highlightColor}
          duration={duration}
          dense={dense}
          hasValue={(this.state.text.length) ? true : false}
          style={labelStyle}
          posTop={this.props.posTop}
          posBottom={this.props.posBottom}
        />
      </View>
    );
  }
}

TextField.propTypes = {
  duration: PropTypes.number,
  label: PropTypes.string,
  highlightColor: PropTypes.string,
  labelColor: PropTypes.string,
  borderColor: PropTypes.string,
  textColor: PropTypes.string,
  textFocusColor: PropTypes.string,
  textBlurColor: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChangeText: PropTypes.func,
  onContentSizeChange: PropTypes.func,
  onChange: PropTypes.func,
  value: PropTypes.string,
  dense: PropTypes.bool,
  inputStyle: PropTypes.oneOfType([
    PropTypes.object,
    ViewPropTypes.style
  ]),
  wrapperStyle: PropTypes.oneOfType([
    PropTypes.object,
    ViewPropTypes.style
  ]),
  labelStyle: PropTypes.oneOfType([
    PropTypes.object,
    ViewPropTypes.style
  ]),
  multiline: PropTypes.bool,
  autoGrow: PropTypes.bool,
  height: PropTypes.number,
  editable: PropTypes.bool
};

TextField.defaultProps = {
  duration: 200,
  labelColor: '#9E9E9E',
  borderColor: '#E0E0E0',
  textColor: '#000',
  value: '',
  dense: false,
  underlineColorAndroid: 'rgba(0,0,0,0)',
  multiline: false,
  autoGrow: false,
  height: undefined,
  editable: true
};

const styles = StyleSheet.create({
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
    fontSize: 16,
    height: 34,
    lineHeight: 34,
    textAlignVertical: 'top'
  },
  denseTextInput: {
    fontSize: 13,
    height: 27,
    lineHeight: 24,
    paddingBottom: 3,
    textAlignVertical: 'top'
  }
});
