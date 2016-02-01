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
  constructor(props: Object, context: Object) {
    super(props, context);
    this.state = {
      isFocused: false,
      text: ''
    };
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
			...props
		} = this.props;
    return (
      <View style={styles.wrapper} ref="wrapper">
        <View style={[styles.inputWrapper, this.state.isFocused && styles.inputWrapperActive]}>
          <TextInput
            style={styles.textInput}
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
              this.setState({text: text});
							onChangeText && onChangeText(text);
            }}
            ref="input"
						{...props}
          />
					<Underline
						ref="underline"
						highlightColor={highlightColor}
						duration={duration}
						borderColor={borderColor}
					/>
        </View>
        <FloatingLabel
          isFocused={this.state.isFocused}
          ref="floatingLabel"
          focusHandler={this.focus.bind(this)}
          label={label}
					labelColor={labelColor}
					highlightColor={highlightColor}
					duration={duration}
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
	onChangeText: PropTypes.func
};

TextField.defaultProps = {
	duration: 200,
	labelColor: '#9E9E9E',
	borderColor: '#E0E0E0'
};

const styles = StyleSheet.create({
  wrapper: {
    height: 72,
    flex: 1,
    paddingTop: 28,
    paddingBottom: 8,
    position: 'relative'
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    lineHeight: 16
  },
  inputWrapper: {
    borderWidth: 0,
    height: 32,
    flex: 1
  }
});
