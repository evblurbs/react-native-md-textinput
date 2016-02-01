# React Native Material Design TextInput

React Native TextInput styled with Material Design.

![demo](/demo.gif)

## Installation
```
npm install react-native-md-textinput
```

## Usage

To going to refer to the `react-native-md-textinput` Component as `TextField`. You can name it whatever you like when importing it.

The most basic usage is to import the `TextField` Component and render it with the props `label` and `highlightColor`. Note that this example uses the [ScrollView](https://facebook.github.io/react-native/docs/scrollview.html) Component. This allows the keyboard to be dismissed when finished editing, and the height of `TextField` Component is preserved, as it's wrapper has style of `flex` set to `1`.<sup>1</sup>

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

1. There is a TODO to look into wether the `flex` styling is needed.

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

## Props

Below are the props you can pass to the React Component to customize the TextInput.

Prop | Type | Default | description
-----|------|---------|------------
label | string | | This string appears as the label.
highlightColor | string | | This string represents the hex code, rgb, or rgba color of the textInput label and underline when it is active/focused on.
duration | number | `200` | A number representing the duration of floating label and underline animations in milliseconds.
labelColor | string | `#9E9E9E` | This string represents the hex code, rgb, or rgba color of the textInput label when it is inactive.
borderColor | string | `#E0E0E0` | This string represents the hex code, rgb, or rgba color of the textInput underline when it is inactive.

## TODO

- [ ] Handle fields with an initial value
- [ ] Look into wether the Component should have `flex` set to `1`
- [ ] Support multi-line TextInput fields
- [ ] Support dense style
- [ ] Support character limit
- [ ] Add option for dark theme
