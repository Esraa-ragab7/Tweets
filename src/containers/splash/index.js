import React, { Component } from 'react'
import { Image, ImageBackground, StyleSheet, Text, AsyncStorage } from 'react-native'
import {TEXTS,COLORS} from '../../common';
import firebase from '../../firebase';

class SplashScene extends Component {

  constructor(props){
    super(props);
    console.disableYellowBox = true;
  }

  componentDidMount(){
    // firebase.auth().onAuthStateChanged((user) => {
    AsyncStorage.getItem('user')
      .then(user => {

            setTimeout( () => {
              if(user) {
                this.props.navigation.navigate('HomeScreen');
              } else {
                this.props.navigation.navigate('LoginScreen');
              }
            },2000);
      })
    // });
  }

  render() {
      return (
        <ImageBackground
          source={require('../../images/cover.png')}
          style={{width: '100%', height: '100%'}}
        >
        <Image resizeMode={'contain'} style={{width: 100, height: "100%", alignSelf: 'center'}}
          source={require('../../images/logo.png')}/>
        </ImageBackground>
      );
  }
}

export default SplashScene;

var styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#250454',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    marginBottom: 20,
  },
  logoText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 30,
    textAlign: 'center',
  },
  text: {
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
  },
  imageStyle: {
    height: 100,
    width: 100,
  },
})
