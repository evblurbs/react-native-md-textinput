# React Native Material Design TextInput

React Native TextInput styled with Material Design.

![demo](/demo.gif)

## Installation
```
npm install react-native-md-textinput
```

## Usage

I'm going to refer to the `react-native-md-textinput` Component as `TextField`. You can name it whatever you like when importing it.

The most basic usage is to import the `TextField` Component and render it with the props `label` and `highlightColor`. Note that this example uses the [ScrollView](https://facebook.github.io/react-native/docs/scrollview.html) Component. This allows the keyboard to be dismissed when users tap outside the input and keyboard area.

```javascript
import TextField from 'react-native-md-textinput';

class App extends React.Component {
  render() {
    return (
      <ScrollView>
        <TextField label={'Name'} highlightColor={'#00BCD4'} />
      </ScrollView>
    );
  }
}
```

### TextInput

To customize the `TextInput` that is rendered inside the `TextField` Component, simply pass props the `TextInput` accepts to the `TextField` Component. You can find the props the `TextInput` Component accepts [here](https://facebook.github.io/react-native/docs/textinput.html#props).

Here is an example of how to change the keyboard type to `numeric`.

```javascript
import TextField from 'react-native-md-textinput';

class App extends React.Component {
  render() {
    return (
      <ScrollView>
        <TextField
          label={'Name'}
          highlightColor={'#00BCD4'}
          keyboardType={'numeric'}
        />
      </ScrollView>
    );
  }
}
```

### Dense Styling

To use the "dense" styling that matches the [Material Design Style Guide](https://www.google.com/design/spec/components/text-fields.html#text-fields-labels), you can set the prop `dense` to `true`. By default, this prop is set to `false`.

![demo dense](/demo-dense.gif)

## Props

Below are the props you can pass to the React Component to customize the TextInput.

Prop | Type | Default | description
-----|------|---------|------------
label | string | | This string appears as the label.
highlightColor | string | | This string represents the hex code, rgb, or rgba color of the textInput label and underline when it is active/focused on.
duration | number | `200` | A number representing the duration of floating label and underline animations in milliseconds.
labelColor | string | `#9E9E9E` | This string represents the hex code, rgb, or rgba color of the textInput label when it is inactive.
borderColor | string | `#E0E0E0` | This string represents the hex code, rgb, or rgba color of the textInput underline when it is inactive.
dense | bool | `false` | If true, it will render the "dense" input field which is smaller in height and has smaller font sizes. You can view more [here](https://www.google.com/design/spec/components/text-fields.html#text-fields-labels).
underlineColorAndroid | string | `rgba(0,0,0,0)` | This sets the default underline color on Android to transparent ([Issue #1](https://github.com/evblurbs/react-native-md-textinput/issues/1)).
inputStyle | Object | | Style Object to override the styles of the TextInput. WARNING: Diverging from the default Material Design styles can cause conflicts and side effects. Override at your own risk.
wrapperStyle | Object | | Style Object to override the styles of the View that wraps the TextInput. WARNING: Diverging from the default Material Design styles can cause conflicts and side effects. Override at your own risk.
labelStyle | Object | | Style Object to override the styles of the Label that animates on focus of the TextInput. WARNING: Diverging from the default Material Design styles can cause conflicts and side effects. Override at your own risk.

## TODO

- [ ] Support multi-line TextInput fields
- [ ] Support character limit
- [ ] Add option for dark theme
