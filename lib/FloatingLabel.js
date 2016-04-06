'use strict';
/* @flow */

import React, {
  Component,
  StyleSheet,
  Animated,
  PropTypes
} from 'react-native';

export default class FloatingLabel extends Component {
  constructor(props:Object) {
    super(props);
    const labelFontSize = props.style && StyleSheet.flatten(props.style).fontSize;
    
    if (props.dense) {
      this.posTop = 12;
      this.posBottom = 32;
      this.fontLarge = props.inputFontSize;
      this.fontSmall = labelFontSize || 13;
    } else {
      this.posTop = 16;
      this.posBottom = 37;
      this.fontLarge = props.inputFontSize;
      this.fontSmall = labelFontSize || 12;
    }
    let posTop = (props.hasValue) ? this.posTop : this.posBottom;
    let fontSize = (props.hasValue) ? this.fontSmall : this.fontLarge;
    this.state = {
      top: new Animated.Value(posTop),
      fontSize: new Animated.Value(fontSize)
    };
  }

  shouldComponentUpdate(nextProps:Object, nextState:Object):bool {
    return (this.props.hasValue !== nextProps.hasValue) ? false : true;
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

  render():Object {
    const {
      label,
      labelColor,
      highlightColor,
      style,
      isFocused,
      focusHandler
    } = this.props;
    const computedStyle = {
      fontSize: this.state.fontSize,
      top: this.state.top,
      color: isFocused ? highlightColor : labelColor
    };
    return (
      <Animated.Text
        style={[styles.labelText, style, computedStyle]}
        onPress={()=> focusHandler()}
      >
        {label}
      </Animated.Text>
    );
  }
}

FloatingLabel.propTypes = {
  duration: PropTypes.number,
  inputFontSize: PropTypes.number,
  label: PropTypes.string,
  labelColor: PropTypes.string,
  highlightColor: PropTypes.string,
  dense: PropTypes.bool,
  style: PropTypes.any
};

const styles = StyleSheet.create({
  labelText: {
    position: 'absolute',
    left: 0,
    backgroundColor: 'rgba(0,0,0,0)'
  }
});
