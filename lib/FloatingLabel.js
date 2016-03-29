'use strict';
/* @flow */

import React, {
	Component,
  StyleSheet,
  Animated,
	PropTypes
} from 'react-native';

export default class FloatingLabel extends Component {
  constructor(props: Object) {
    super(props);
		if(props.dense) {
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
		let posTop = (props.hasValue) ? this.posTop : this.posBottom;
		let fontSize = (props.hasValue) ? this.fontSmall : this.fontLarge;
    this.state = {
      top: new Animated.Value(posTop),
      fontSize: new Animated.Value(fontSize)
    };
  }
  componentWillReceiveProps(props) {
    if (this.props.hasValue !== props.hasValue) {
      let posTop = (props.hasValue) ? this.posTop : this.posBottom;
      let fontSize = (props.hasValue) ? this.fontSmall : this.fontLarge;

      this.setState({
        top: new Animated.Value(posTop),
        fontSize: new Animated.Value(fontSize)
      });
    }
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
  render() : Object {
		let {
			label,
			labelColor,
			highlightColor
		} = this.props;

    return (
      <Animated.Text
        style={[{
          fontSize: this.state.fontSize,
          top: this.state.top,
					color: labelColor
        }, styles.labelText, this.props.isFocused && {
					color: highlightColor
				}]}
        onPress={()=> {
          this.props.focusHandler();
        }}
      >
        {label}
      </Animated.Text>
    );
  }
}

FloatingLabel.propTypes = {
	duration: PropTypes.number,
	label: PropTypes.string,
	labelColor: PropTypes.string,
	highlightColor: PropTypes.string,
	dense: PropTypes.bool,
	hasValue: PropTypes.bool,
};

const styles = StyleSheet.create({
  labelText: {
    position: 'absolute',
    left: 0,
    backgroundColor: 'rgba(0,0,0,0)'
  }
});
