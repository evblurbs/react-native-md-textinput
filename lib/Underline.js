'use strict';
import React, {Component} from "react";
import PropTypes from 'prop-types';
import {View, StyleSheet, Animated} from "react-native";

export default class Underline extends Component {
  _wrapper: null;

  constructor(props: Object) {
    super(props);
    this.state = {
      lineLength: new Animated.Value(0),
    };
    this.wrapperWidth = 0;
    this.onRefWrapper = this.onRefWrapper.bind(this);
  }
  componentDidMount() {
    requestAnimationFrame(() => {
      if (this._wrapper == null) {
        return;
      }
      const container = this._wrapper;  // un-box animated view
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

  onRefWrapper(_wrapper) {
    this._wrapper = _wrapper
  }

  render() {
    let {
      borderColor,
      highlightColor
    } = this.props;
    return (
      <View
        ref={this.onRefWrapper}
        style={[styles.underlineWrapper, {
          backgroundColor: borderColor
        }]}
      >
        <Animated.View
          style={[
            styles.wrapperHighlight,
            {
              width: this.state.lineLength,
              backgroundColor: highlightColor
            }
          ]}>
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
  },
  wrapperHighlight: {
    height: 1
  }
});
