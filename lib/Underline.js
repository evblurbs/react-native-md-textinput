'use strict';
import React, {Component} from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    underlineWrapper: {
        height: 1,
        alignItems: 'center'
    }
});

class Underline extends Component {
    static propTypes = {
        duration: PropTypes.number,
        highlightColor: PropTypes.string,
        borderColor: PropTypes.string
    };

    constructor(props) {
        super(props);
        this.state = {
            lineLength: new Animated.Value(0)
        };
        this.wrapperWidth = 0;
    }

    componentDidMount() {
        requestAnimationFrame(() => {
            if (this.refs.wrapper === null) {
                return;
            }
            const container = this.refs.wrapper;  // un-box animated view
            container.measure((left, top, width, height) => {
                this.wrapperWidth = width;
            });
        });
    }

    expandLine() {
        Animated.timing(this.state.lineLength, {
            toValue: this.wrapperWidth,
            duration: this.props.duration
        }).start();
    }

    shrinkLine() {
        Animated.timing(this.state.lineLength, {
            toValue: 0,
            duration: this.props.duration
        }).start();
    }

    render() {
        const {borderColor, highlightColor} = this.props;
        return (
            <View
                style={[styles.underlineWrapper, {
                    backgroundColor: borderColor
                }]}
                ref="wrapper"
            >
                <Animated.View
                    style={[{
                        width: this.state.lineLength,
                        height: 1,
                        backgroundColor: highlightColor
                    }]}
                />
            </View>
        );
    }
}

export default Underline;
