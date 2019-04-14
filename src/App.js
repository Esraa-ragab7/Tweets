import React, { Component } from 'react';
import {StyleSheet,SafeAreaView,Platform, StatusBar} from 'react-native';
import Navigation from './navigation';
import { COLORS } from './common';

export default class App extends Component {

  render() {
    return (
        <SafeAreaView style={{flex:1, backgroundColor:COLORS.main}} >
          <StatusBar backgroundColor={COLORS.main} barStyle={"light-content"} />
          <Navigation />
        </SafeAreaView>
    );
  }
}
