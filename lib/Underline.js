'use strict';
import React, {Component, PropTypes} from "react";
import {View, StyleSheet, Animated} from "react-native";

export default class Underline extends Component {
  constructor(props: Object) {
    super(props);
    this.state = {
      lineLength: new Animated.Value(0),
    };
    this.wrapperWidth = 0;
  }
  measure(e) {
	  this.wrapperWidth = e.nativeEvent.layout.width
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
    let {
      borderColor,
      highlightColor
    } = this.props;
    return (
      <View
        style={[styles.underlineWrapper, {
          backgroundColor: borderColor
        }]}
        onLayout={this.measure.bind(this)}
      >
        <Animated.View
          style={[{
            width: this.state.lineLength,
            height: 1,
            backgroundColor: highlightColor
          }]}>
        </Animated.View>
      </View>
    );
  }
}

Underline.propTypes = {
  duration: PropTypes.number,
  highlightColor: PropTypes.string,
  borderColor: PropTypes.string
};

const styles = StyleSheet.create({
  underlineWrapper: {
    height: 1,
    alignItems: 'center'
  }
});
