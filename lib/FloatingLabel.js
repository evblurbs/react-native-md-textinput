'use strict';
import React, {Component} from 'react';
import {StyleSheet, Animated} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    labelText: {
        position: 'absolute',
        left: 0,
        backgroundColor: 'rgba(0,0,0,0)'
    }
});

class FloatingLabel extends Component {
    static propTypes = {
        duration: PropTypes.number,
        label: PropTypes.string,
        labelColor: PropTypes.string,
        highlightColor: PropTypes.string,
        dense: PropTypes.bool,
        style: PropTypes.object
    };

    constructor(props) {
        super(props);
        if (props.dense) {
            this.posTop = 12;
            this.posBottom = 32;
            this.fontLarge = 13;
            this.fontSmall = 13;
        } else {
            this.posTop = 16;
            this.posBottom = 37;
            this.fontLarge = 16;
            this.fontSmall = 12;
        }
        const posTop = (props.hasValue) ? this.posTop : this.posBottom;
        const fontSize = (props.hasValue) ? this.fontSmall : this.fontLarge;
        this.state = {
            top: new Animated.Value(posTop),
            fontSize: new Animated.Value(fontSize)
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.hasValue === nextProps.hasValue;
    }

    floatLabel() {
        Animated.parallel([
            Animated.timing(this.state.top, {
                toValue: this.posTop,
                duration: this.props.duration
            }),
            Animated.timing(this.state.fontSize, {
                toValue: this.fontSmall,
                duration: this.props.duration
            })
        ]).start();
    }

    sinkLabel() {
        Animated.parallel([
            Animated.timing(this.state.top, {
                toValue: this.posBottom,
                duration: this.props.duration
            }),
            Animated.timing(this.state.fontSize, {
                toValue: this.fontLarge,
                duration: this.props.duration
            })
        ]).start();
    }

    render() {
        const {label, labelColor, highlightColor, style} = this.props;
        return (
            <Animated.Text
                style={[{
                    fontSize: this.state.fontSize,
                    top: this.state.top,
                    color: labelColor
                }, styles.labelText, this.props.isFocused && {
                    color: highlightColor
                }, style]}
                onPress={() => {
                    this.props.focusHandler();
                }}
            >
                {label}
            </Animated.Text>
        );
    }
}

export default FloatingLabel;
