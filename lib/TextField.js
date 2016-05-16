'use strict';
/* @flow */

import React, {
  Component,
  View,
  TextInput,
  StyleSheet,
  PropTypes
} from 'react-native';

import Underline from './Underline';
import FloatingLabel from './FloatingLabel';

export default class TextField extends Component {
  constructor(props:Object, context:Object) {
    super(props, context);
    this.state = {
      isFocused: false,
      text: props.value
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

  componentWillReceiveProps(props) {
    this.setState({text: props.value})
    this.refs.floatingLabel.floatLabel();
  }

  render() {
    let {
      label,
      highlightColor,
      duration,
      labelColor,
      borderColor,
      onFocus,
      onBlur,
      onChangeText,
      value,
      wrapperStyle,
      inputStyle,
      labelStyle,
      dense,
      ...props
    } = this.props;
    const fontSize = inputStyle && StyleSheet.flatten(inputStyle).fontSize || 16;

    return (
      <View style={[dense ? styles.denseWrapper : styles.wrapper, wrapperStyle]} ref="wrapper">
        <TextInput
          style={[{fontSize}, dense ? styles.denseTextInput : styles.textInput, inputStyle]}
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
          style={labelStyle}
          isFocused={this.state.isFocused}
          ref="floatingLabel"
          focusHandler={this.focus.bind(this)}
          label={label}
          labelColor={labelColor}
          highlightColor={highlightColor}
          duration={duration}
          inputFontSize={fontSize}
          dense={dense}
          hasValue={(this.state.text.length) ? true : false}
        />
      </View>
    );
  }
}

TextField.propTypes = {
  duration: PropTypes.number,
  label: PropTypes.string,
  highlightColor: PropTypes.string,
  wrapperStyle: PropTypes.any,
  inputStyle: PropTypes.any,
  labelStyle: PropTypes.any,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChangeText: PropTypes.func,
  value: PropTypes.string,
  dense: PropTypes.bool
};

TextField.defaultProps = {
  duration: 200,
  labelColor: '#9E9E9E',
  borderColor: '#E0E0E0',
  value: '',
  dense: false,
  underlineColorAndroid: 'rgba(0,0,0,0)'
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
    height: 34,
    lineHeight: 34
  },
  denseTextInput: {
    height: 27,
    lineHeight: 24,
    paddingBottom: 3
  }
});
