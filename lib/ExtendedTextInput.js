import React, { TextInput, PropTypes } from 'react-native';

export default class ExtendedTextInput extends TextInput {
    focus() {
        this._component.focus();
    }

    componentWillReceiveProps(nextProps) {
        const {focus} = nextProps;

        focus && this.focus();
    }
}

ExtendedTextInput.propTypes = {
    focus: PropTypes.bool
};

ExtendedTextInput.defaultProps = {
    focus: false
};
