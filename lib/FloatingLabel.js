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
		let posTop = (props.hasValue) ? 16 : 34;
		let fontSize = (props.hasValue) ? 10 : 16;
    this.state = {
      top: new Animated.Value(posTop),
      fontSize: new Animated.Value(fontSize)
    };
  }
	shouldComponentUpdate(nextProps: Object, nextState: Object) : bool {
		return (this.props.hasValue !== nextProps.hasValue) ? false : true;
	}
  floatLabel() {
    Animated.parallel([
      Animated.timing(this.state.top, {
        toValue: 16,
        duration: this.props.duration
      }),
      Animated.timing(this.state.fontSize, {
        toValue: 10,
        duration: this.props.duration
      })
    ]).start();
  }
  sinkLabel() {
    Animated.parallel([
      Animated.timing(this.state.top, {
        toValue: 34,
        duration: this.props.duration
      }),
      Animated.timing(this.state.fontSize, {
        toValue: 16,
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
	highlightColor: PropTypes.string
};

const styles = StyleSheet.create({
  labelText: {
    position: 'absolute',
    left: 1,
    backgroundColor: 'rgba(0,0,0,0)'
  }
});
