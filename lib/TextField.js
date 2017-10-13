'use strict';
import React, {Component} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

import Underline from './Underline';
import FloatingLabel from './FloatingLabel';

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
        lineHeight: 34
    },
    denseTextInput: {
        fontSize: 13,
        height: 27,
        lineHeight: 24,
        paddingBottom: 3
    }
});

class TextField extends Component {
    static propTypes = {
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
        value: PropTypes.string,
        dense: PropTypes.bool,
        inputStyle: PropTypes.object,
        wrapperStyle: PropTypes.object,
        labelStyle: PropTypes.object
    };

    static defaultProps = {
        duration: 200,
        labelColor: '#9E9E9E',
        borderColor: '#E0E0E0',
        textColor: '#000',
        value: '',
        dense: false,
        underlineColorAndroid: 'rgba(0,0,0,0)'
    };

    constructor(props, context) {
        super(props, context);
        this.state = {
            isFocused: false,
            text: props.value
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.text !== nextProps.value) {
            nextProps.value.length !== 0 ?
                this.refs.floatingLabel.floatLabel()
                : this.refs.floatingLabel.sinkLabel();
            this.setState({text: nextProps.value});
        }
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

    render() {
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
            value,
            dense,
            inputStyle,
            wrapperStyle,
            labelStyle,
            ...props
        } = this.props;
        return (
            <View style={[dense ? styles.denseWrapper : styles.wrapper, wrapperStyle]} ref="wrapper">
                <TextInput
                    style={[dense ? styles.denseTextInput : styles.textInput, {
                        color: textColor
                    }, (this.state.isFocused && textFocusColor) ? {
                        color: textFocusColor
                    } : {}, (!this.state.isFocused && textBlurColor) ? {
                        color: textBlurColor
                    } : {}, inputStyle]}
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
                    onChangeText={text => {
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
                    hasValue={!!(this.state.text.length)}
                    style={labelStyle}
                />
            </View>
        );
    }
}

export default TextField;
