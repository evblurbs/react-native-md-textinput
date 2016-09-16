'use strict';
import React, {Component, PropTypes} from "react";
import {View, TouchableWithoutFeedback, TextInput, Text, StyleSheet} from "react-native";

import Underline from './Underline';
import FloatingLabel from './FloatingLabel';

export default class TextField extends Component {
  constructor(props: Object, context: Object) {
    super(props, context);
    this.state = {
      isFocused: false,
      text: props.value,
      height: props.height,
      isUnmasked: false
    };
  }
  focus() {
    this.refs.input.focus();
  }
  blur() {
    this.refs.input.blur();
  }
  isFocused() {
    return this.state.isFocused;
  }
  measureLayout(...args){
    this.refs.wrapper.measureLayout(...args)
  }
  componentWillReceiveProps(nextProps: Object){
    if(this.props.text !== nextProps.value){
      nextProps.value.length !== 0 ?
        this.refs.floatingLabel.floatLabel()
        : this.refs.floatingLabel.sinkLabel();
      this.setState({text: nextProps.value});
    }
    if(this.props.height !== nextProps.height){
      this.setState({height: nextProps.height});
    }
  }
  toggleSecureMask(){
    this.setState({'isUnmasked': !this.state.isUnmasked})
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
      onFocus,
      onBlur,
      onChangeText,
      onChange,
      value,
      dense,
      inputStyle,
      wrapperStyle,
      labelStyle,
      height,
      autoGrow,
      multiline,
      secureTextEntry,
      secureTextAllowUnmask,
      secureTextAllowUnmaskIconOn,
      secureTextAllowUnmaskIconOff,
      ...props
    } = this.props;

    const textInputComposedStyles = [dense ? styles.denseTextInput : styles.textInput, {
			color: textColor
		}, (this.state.isFocused && textFocusColor) ? {
			color: textFocusColor
		} : {}, (!this.state.isFocused && textBlurColor) ? {
			color: textBlurColor
		} : {}, inputStyle,  this.state.height ? {height: this.state.height} : {}]

    return (
      <View style={[dense ? styles.denseWrapper : styles.wrapper, this.state.height ? {height: undefined}: {}, wrapperStyle]} ref="wrapper">
        <View style={[styles.row, styles.flex]}>
          {
            this.props.symbol && this.props.value ?
              <Text style={[textInputComposedStyles, styles.symbol]}>{this.props.symbol}</Text>
            : null
          }
        <View style={styles.flex}>
        <TextInput
          style={[textInputComposedStyles]}
          multiline={multiline}
          onFocus={() => {
            this.setState({isFocused: true});
            this.refs.floatingLabel.floatLabel();
            this.refs.underline.expandLine();
            onFocus && onFocus();
          }}
          onBlur={() => {
            this.setState({isFocused: false});
            !this.state.text.length && this.refs.floatingLabel.sinkLabel();
            this.refs.underline.shrinkLine();
            onBlur && onBlur();
          }}
          onChangeText={(text) => {
            this.setState({text});
            onChangeText && onChangeText(text);
          }}
          onChange={(event) => {
            if(autoGrow){
              this.setState({height: event.nativeEvent.contentSize.height});
            }
            onChange && onChange(event);
          }}
          ref="input"
          value={this.state.text}
          secureTextEntry={secureTextEntry && secureTextAllowUnmask ? !this.state.isUnmasked : props.secureTextEntry}
          {...props}
        />
      </View>
        {
          secureTextEntry && secureTextAllowUnmask ?
              <TouchableWithoutFeedback onPress={this.toggleSecureMask.bind(this)}>
                <View style={{opacity: !this.state.text.length ? 0.38 : 0.54}}>{!this.state.isUnmasked ? secureTextAllowUnmaskIconOn : secureTextAllowUnmaskIconOff}</View>
              </TouchableWithoutFeedback >
              : null
        }
    </View>
        <Underline
          ref="underline"
          highlightColor={highlightColor}
          duration={duration}
          borderColor={borderColor}
        />
        <FloatingLabel
          isFocused={this.state.isFocused}
          ref="floatingLabel"
          focusHandler={this.focus.bind(this)}
          label={label}
          labelColor={labelColor}
          highlightColor={highlightColor}
          duration={duration}
          dense={dense}
          hasValue={(this.state.text.length) ? true : false}
          style={labelStyle}
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
  onChange: PropTypes.func,
  value: PropTypes.string,
  dense: PropTypes.bool,
  inputStyle: PropTypes.object,
  wrapperStyle: PropTypes.object,
  labelStyle: PropTypes.object,
  multiline: PropTypes.bool,
  autoGrow: PropTypes.bool,
  height: PropTypes.oneOfType([PropTypes.oneOf(undefined), PropTypes.number]),
  symbol: PropTypes.string,
  secureTextAllowUnmask: PropTypes.bool,
  secureTextAllowUnmaskIconOn: PropTypes.element,
  secureTextAllowUnmaskIconOff: PropTypes.element
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
  secureTextIsUnmasked: false
};

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  row: {
    flexDirection: 'row'
  },
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
  },
  symbol: {
    textAlignVertical: 'auto',
    lineHeight: undefined,
    height: undefined,
    position: 'relative',
    bottom: -10
  }
});
