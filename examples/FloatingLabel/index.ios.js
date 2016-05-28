/**
 * Sample React Native App
 * that demos the react-native-md-textinput
 */
'use strict';
import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  ScrollView
} from "react-native";

import TextField from 'react-native-md-textinput';

class FloatingLabel extends Component {
  constructor(props: Object) {
    super(props);
    this.inputs = {
      name: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      country: ''
    };
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.welcome}>
          React Native Material Design TextInput
        </Text>
        <TextField
          label={'Name'}
          highlightColor={'#00BCD4'}
          onChangeText={(text) => {
            this.inputs.name = text;
          }}
          value={'Jane'}
          dense={true}
        />
        <TextField
          label={'Address'}
          highlightColor={'#FF5722'}
          onChangeText={(text) => {
            this.inputs.address = text;
          }}
          returnKeyType={'next'}
          onSubmitEditing={() => {
            this.refs.cityInput.focus();
          }}
          dense={true}
        />
        <TextField
          label={'City'}
          highlightColor={'#673AB7'}
          labelColor={'#000'}
          onChangeText={(text) => {
            this.inputs.city = text;
          }}
          ref="cityInput"
          inputStyle={{
            marginLeft: 20,
            marginRight: 20,
            height: 64,
            lineHeight: 64
          }}
          wrapperStyle={{
            height: 102
          }}
          labelStyle={{
            color: '#000',
            fontSize: 15
          }}
        />
        <TextField
          label={'State'}
          highlightColor={'#E91E63'}
          textColor={'#E91E63'}
          onChangeText={(text) => {
            this.inputs.state = text;
          }}
          value={'WA'}
        />
        <TextField
          label={'Zip'}
          highlightColor={'#F44336'}
          textBlurColor={'#9E9E9E'}
          textFocusColor={'#F44336'}
          onChangeText={(text) => {
            this.inputs.zip = text;
          }}
          onBlur={() => {
            console.log(this.inputs);
          }}
          keyboardType={'numeric'}
          value={'98122'}
        />
        <TextField
          label={'Country'}
          highlightColor={'#009688'}
          onChangeText={(text) => {
            this.inputs.country = text;
          }}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 50,
    marginLeft: 16,
    marginRight: 16
  },
  welcome: {
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
    color: '#333'
  }
});

AppRegistry.registerComponent('FloatingLabel', () => FloatingLabel);
