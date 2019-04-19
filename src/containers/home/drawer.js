import React from 'react'
import { AsyncStorage, StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, NativeModules, Platform } from 'react-native'
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
        },
        userImage: null
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
    AsyncStorage.multiRemove(['user','user_id','userImage'])
    this.props.navigation.navigate('LoginScreen');
  }

  render() {
    if(this.state.userImage == null){
      AsyncStorage.getItem('userImage')
      .then(userImage => {
        this.setState({
          userImage: userImage
        });
      })
    }

    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <View style={[styles.logoStyle]}>
          <Image resizeMode={'contain'} style={styles.logoImageStyle}
            source={this.state.userImage != null ? {uri: this.state.userImage} : require('../../images/logo2.png')}/>
          <AppText style={{marginTop: 20, alignSelf: 'center', fontSize: 20, color: COLORS.white,fontFamily: Platform.OS === 'ios' ? 'Menlo': 'Roboto',fontWeight: 'bold'}}>{this.state.user.fname+" "+this.state.user.lname}</AppText>
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
    backgroundColor: COLORS.twiterColor,
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
    borderRadius: Platform.OS === 'ios' ? 75: 0,
    alignSelf: 'center'
  },
  socialIcons: {
    fontSize: 20,
    color: COLORS.twiterColor
  },
  logoStyle:{
    marginTop: 20,
    marginBottom: 10,
    height: 150
  },
  logoImageStyle:{
    width: 100,
    height: 100,
    alignSelf: 'center',
    borderWidth: 4,
    borderColor: 'white',
    borderRadius: Platform.OS === 'ios' ? 50: 0,
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
    color: COLORS.twiterColor,
    fontSize: 16,
    marginRight: 10,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'Menlo': 'Roboto',
  },
  drawerIcon:{
    marginRight: 10,
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLORS.twiterColor
  }
})
