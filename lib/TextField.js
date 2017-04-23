'use strict';
import React, {Component, PropTypes} from "react";
import {View, TextInput, StyleSheet} from "react-native";

import Underline from './Underline';
import FloatingLabel from './FloatingLabel';

export default class TextField extends Component {
  constructor(props: Object, context: Object) {
    super(props, context);
    this.state = {
      isFocused: false,
      text: props.value,
      height: props.height
    };
  }
  focus() {
    if ( this.props.editable )
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
      ...props
    } = this.props;
    return (
      <View
        ref="wrapper"
        style={[dense ? styles.denseWrapper : styles.wrapper, this.state.height ? {height: undefined}: {}, wrapperStyle]}
        collapsable={false}
      >
        <TextInput
          style={[dense ? styles.denseTextInput : styles.textInput, {
            color: textColor
          }, (this.state.isFocused && textFocusColor) ? {
            color: textFocusColor
          } : {}, (!this.state.isFocused && textBlurColor) ? {
            color: textBlurColor
          } : {}, inputStyle,  this.state.height ? {height: this.state.height} : {}]}
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
          {...props}
        />
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
  onChange: PropTypes.func,
  value: PropTypes.string,
  dense: PropTypes.bool,
  inputStyle: PropTypes.oneOfType([
    PropTypes.object,
    View.propTypes.style
  ]),
  wrapperStyle: PropTypes.oneOfType([
    PropTypes.object,
    View.propTypes.style
  ]),
  labelStyle: PropTypes.oneOfType([
    PropTypes.object,
    View.propTypes.style
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
