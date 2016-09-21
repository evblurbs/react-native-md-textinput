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
<<<<<<< HEAD
      height: props.height
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

	componentDidMount() {
		// force to animate if it has isFocused
		const { disabled, isFocused, value } = this.props;
		if (disabled) {
			this.refs.input.setNativeProps({'editable':false});
		}

		// auto expand if that input text has value (text)
		if (isFocused || value) {
			this.refs.underline.expandLine();
			setTimeout(() => { 
				this.refs.floatingLabel.floatLabel();
			}, 0);
		} 
	}

	componentWillReceiveProps({
		text: nextText,
		isFocused: nextIsFocused,
		disabled: nextDisable,
		height: nextHeight,
		value: nextValue,
	}: Object) {
		const { text, height, isFocused, disabled, value } = this.props;
		if (nextDisable) {
			this.refs.input.setNativeProps({'editable': false});
		} else {
			this.refs.input.setNativeProps({'editable': true});
		}                                                              

    if(text !== nextValue){
      nextValue.length !== 0 ?
        this.refs.floatingLabel.floatLabel()
        : this.refs.floatingLabel.sinkLabel();
      this.setState({text: nextValue});
    }

    if(height !== nextHeight){
      this.setState({height: nextHeight});
    }

		// force to animate if it has isFocused
		if (nextIsFocused) {
			this.refs.underline.expandLine();
			setTimeout(() => { 
				this.refs.floatingLabel.floatLabel();
			}, 0);
		} else {
			// there is no text
			if (!(value || nextValue)) {
				setTimeout(() => { 
					this.refs.underline.shrinkLine();
				}, 0);
				!this.state.text.length && this.refs.floatingLabel.sinkLabel();
			}
=======
			height: props.height
    };
  }
	componentWillReceiveProps(nextProps: Object){
		if(this.props.text != nextProps.value){
			nextProps.value.length !== 0 ? this.refs.floatingLabel.floatLabel() : this.refs.floatingLabel.sinkLabel()
			this.setState({text: nextProps.value})
>>>>>>> 8359f45b38499116ac37a493252b82a35fc25b86
		}
		if(this.props.height !== nextProps.height){
			this.setState({height: nextProps.height});
		}
	}
  focus() {
	this.refs.input.focus();
  }

  measureLayout(...args){
  	this.refs.wrapper.measureLayout(...args)
  }

  render() {
<<<<<<< HEAD
		const PADDING_BOTTOM = 30;                      
    const {
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
			isFocused,
			labelAnimatedOpts,
      ...props
    } = this.props;
		return (
      <View style={[dense ? styles.denseWrapper : styles.wrapper, this.state.height ? {height: undefined}: {height: this.state.height + PADDING_BOTTOM}, wrapperStyle]} ref="wrapper">
        <TextInput
          style={[dense ? styles.denseTextInput : styles.textInput, {
            color: textColor
          }, (this.state.isFocused && textFocusColor) ? {
            color: textFocusColor
          } : {}, (!this.state.isFocused && textBlurColor) ? {
            color: textBlurColor
          } : {}, inputStyle, this.state.height ? {height: this.state.height} : {}]}
          multiline={multiline}
=======
		let {
			label,
			highlightColor,
			duration,
			labelColor,
			borderColor,
			onFocus,
			onBlur,
			onChange,
			value,
			dense,
			multiline,
			autoGrow,
      textInputFontFamily,
      labelFontFamily,
      keepHightlightColor,
			...props
		} = this.props;
    return (
      <View style={dense ? styles.denseWrapper : styles.wrapper} ref="wrapper">
        <TextInput
          style={[textInputFontFamily ? {fontFamily: textInputFontFamily} : {}, dense ? styles.denseTextInput : styles.textInput, this.state.height ? {height: this.state.height} : {}]}
					multiline={this.props.multiline}
>>>>>>> 8359f45b38499116ac37a493252b82a35fc25b86
          onFocus={() => {
            this.setState({isFocused: true});
            this.refs.underline.expandLine();
						onFocus && onFocus();
						setTimeout(() => { 
							this.refs.floatingLabel.floatLabel();
						}, 0);
          }}
          onBlur={() => {
            this.setState({isFocused: false});
            !this.state.text.length && this.refs.floatingLabel.sinkLabel();
            this.refs.underline.shrinkLine();
						onBlur && onBlur();
          }}
<<<<<<< HEAD
          onChangeText={(text) => {
            this.setState({text});
            this.setState({isFocused: true});
            onChangeText && onChangeText(text);
          }}
					onChange={(event) => {
            if(autoGrow){
							this.setState({
								height: event.nativeEvent.contentSize.height,
							});
            }
=======
          onChange={(event) => {
						if(autoGrow){
							this.setState({text: event.nativeEvent.text, height: event.nativeEvent.contentSize.height});
						}else{
							this.setState({text: event.nativeEvent.text});
						}
						onChange && onChange(event);
>>>>>>> 8359f45b38499116ac37a493252b82a35fc25b86
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
<<<<<<< HEAD
          labelColor={labelColor}
          highlightColor={highlightColor}
          duration={duration}
          dense={dense}
          hasValue={(this.state.text.length) ? true : false}
          style={labelStyle}
					labelAnimatedOpts={labelAnimatedOpts}
=======
					labelColor={labelColor}
					highlightColor={highlightColor}
					duration={duration}
					dense={dense}
          keepHightlightColor={keepHightlightColor}
          labelFontFamily={labelFontFamily}
					hasValue={(this.state.text.length) ? true : false}
>>>>>>> 8359f45b38499116ac37a493252b82a35fc25b86
        />
      </View>
    );
  }
}

TextField.propTypes = {
<<<<<<< HEAD
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
  height: PropTypes.oneOfType([PropTypes.oneOf(undefined), PropTypes.number])
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
  height: undefined
=======
	duration: PropTypes.number,
	label: PropTypes.string,
	highlightColor: PropTypes.string,
	onFocus: PropTypes.func,
	onBlur: PropTypes.func,
	onChange: PropTypes.func,
	value: PropTypes.string,
	dense: PropTypes.bool,
	multiline: PropTypes.bool,
	autoGrow: PropTypes.bool,
  textInputFontFamily: PropTypes.string,
  labelFontFamily: PropTypes.string,
  keepHightlightColor: PropTypes.bool
};

TextField.defaultProps = {
	duration: 200,
	labelColor: '#9E9E9E',
	borderColor: '#E0E0E0',
	value: '',
	dense: false,
	underlineColorAndroid: 'rgba(0,0,0,0)',
	multiline: false,
	autoGrow: false,
	height: false,
  keepHightlightColor: false
>>>>>>> 8359f45b38499116ac37a493252b82a35fc25b86
};

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 30,
    paddingBottom: 7,
    position: 'relative'
  },
<<<<<<< HEAD
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
=======
	denseWrapper: {
		paddingTop: 28,
		paddingBottom: 4,
		position: 'relative'
	},
  textInput: {
    fontSize: 16,
		height: 34,
		lineHeight: 34,
>>>>>>> 8359f45b38499116ac37a493252b82a35fc25b86
  },
  denseTextInput: {
    fontSize: 13,
    height: 27,
    lineHeight: 24,
    paddingBottom: 3,
    textAlignVertical: 'top'
  }
});
