import React from 'react'
import { AsyncStorage, StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, NativeModules } from 'react-native'
import { NavigationActions, StackActions } from 'react-navigation'
import {TEXTS,COLORS} from '../../common';
import { Button, TextInput, AppText, Header } from '../../components';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const { RNTwitterSignIn } = NativeModules;
import firebase from '../../firebase';

class Drawer extends React.Component {

  constructor(props){
      super(props);

      this.state = {
        imageUrl: '',
        name: '',
        user: {
          fname: "",
          lname: "",
          userName: ""
        }
      }
  }

  componentDidMount(){

    AsyncStorage.getItem('user')
      .then(user => {
          this.setState({
            user: JSON.parse(user)
          });
      })

  }

  logout = () => {
    RNTwitterSignIn.logOut()
    firebase.auth().signOut().then(()=>
      this.onSignOutSuccess()
    ).catch();

  }

  onSignOutSuccess(){
    AsyncStorage.multiRemove(['user','user_id'])
    this.props.navigation.navigate('LoginScreen');
  }

  render() {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <View style={[styles.logoStyle]}>
          <Image resizeMode={'contain'} style={styles.logoImageStyle}
            source={require('../../images/logo.png')}/>
          <AppText style={{marginTop: 20, alignSelf: 'center', fontSize: 20, color: COLORS.white}}>{this.state.user.fname+" "+this.state.user.lname}</AppText>
        </View>
        <View style={{flex: 1,marginTop: 10, backgroundColor: 'white'}}>
          <TouchableOpacity onPress = {() => navigation.navigate('MainPageScreen')} style={styles.drawerItem}>
            <View style={styles.drawerIcon}>
              <Entypo style={styles.socialIcons} name={'home'}/>
            </View>
            <AppText style={styles.drawerText}>{TEXTS.home}</AppText>
          </TouchableOpacity>

          <TouchableOpacity onPress = {() => navigation.navigate('ProfileScreen',{ user: this.state.user })} style={styles.drawerItem}>
            <View style={styles.drawerIcon}>
              <Entypo style={styles.socialIcons} name={'user'}/>
            </View>
            <AppText style={styles.drawerText}>{TEXTS.profile}</AppText>
          </TouchableOpacity>

          <TouchableOpacity  onPress={this.logout} style={styles.drawerItem}>
            <View style={styles.drawerIcon}>
              <Entypo style={[styles.socialIcons,{fontSize: 16}]} name={'log-out'}/>
            </View>
            <AppText style={styles.drawerText}>{TEXTS.logOut}</AppText>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default Drawer;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.main,
    paddingTop: 40,
  },
  uglyDrawerItem: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#891B05',
    padding: 15,
    margin: 5,
    borderRadius: 2,
    borderColor: '#891B05',
    borderWidth: 1,
    textAlign: 'center'
  },
  userPhoto: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: 'center'
  },
  socialIcons: {
    fontSize: 20,
    color: COLORS.drawerTextColor
  },
  logoStyle:{
    marginTop: 20,
    marginBottom: 10,
    height: 150
  },
  logoImageStyle:{
    flex: 1,
    height: 100,
    alignSelf: 'center'
  },
  drawerItem:{
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 50,
    alignItems: 'center',
    paddingLeft: 20
  },
  drawerText:{
    flex:1,
    color: COLORS.main,
    fontSize: 20,
    marginRight: 10
  },
  drawerIcon:{
    marginRight: 10,
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLORS.main
  }
})
