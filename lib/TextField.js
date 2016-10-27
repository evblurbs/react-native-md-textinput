'use strict';
/* @flow */

import React, {
	Component, PropTypes } from 'react'; import {
	View,
	TextInput,
	StyleSheet
} from 'react-native';

import Underline from './Underline';
import FloatingLabel from './FloatingLabel';

export default class TextField extends Component {
  constructor(props: Object, context: Object) {
    super(props, context);
    this.state = {
      isFocused: false,
      text: props.value
    };
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
	
  focus() {
		this.refs.input.focus();
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
			dense,
			...props
		} = this.props;
    return (
      <View style={dense ? styles.denseWrapper : styles.wrapper} ref="wrapper">
        <TextInput
          style={dense ? styles.denseTextInput : styles.textInput}
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
          isFocused={this.state.isFocused}
          ref="floatingLabel"
          focusHandler={this.focus.bind(this)}
          label={label}
					labelColor={labelColor}
					highlightColor={highlightColor}
					duration={duration}
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
		height: 40,
		paddingTop: 30,
		paddingBottom: 4,
		position: 'relative'
	},
  textInput: {
    fontSize: 16,
		height: 40,
		lineHeight: 34
  },
	denseTextInput: {
		fontSize: 13,
		height: 37,
		lineHeight: 24,
		paddingBottom: 3
	}
});
