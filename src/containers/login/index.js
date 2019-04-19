import React,{Component} from 'react';
import {View,ImageBackground,Image,AsyncStorage} from 'react-native';
import {TEXTS} from '../../common';
import styles from './styles';
import { Button, TextInput, LoadingModal,AppText } from '../../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import firebase from '../../firebase';

class Login extends Component{

    constructor(props){
        super(props);

        this.state = {
            user_name:'',
            password:'',
            error:'',
            loading:false
        };
    }

    static navigationOptions = ({navigation})=>{
        return {
            header: null
        }
    }

    onPressLogin(){
      const {user_name,password} = this.state;
      this.setState({error:'',loading:true});

      if(user_name.length == 0 || password.length == 0){
          this.setState({loading : false, error : TEXTS.error})
      }else{
          firebase.auth().signInWithEmailAndPassword(user_name,password)
          .then( this.onLoginSuccess.bind(this))
              .catch( this.onLoginFail.bind(this))
      }
    }

    onLoginSuccess(){
      var user = firebase.auth().currentUser;
      this.setState({
          user_name:'',
          password:'',
          error:'',
          loading:false
      });
      firebase.database().ref('/users/' + user.uid).once('value').then((snapshot)=>{
        var username = (snapshot.val() && snapshot.val().userName) || 'Anonymous';
        var fname = (snapshot.val() && snapshot.val().fname) || 'Anonymous';
        var lname = (snapshot.val() && snapshot.val().lname) || 'Anonymous';
        const user_data = {
          fname: fname,
          userName: username,
          lname : lname
        }
        setTimeout( () => {
          AsyncStorage.setItem('user',JSON.stringify(user_data)).then(() => {
            this.props.navigation.navigate('HomeScreen');
          })
        },300)
      }).catch((error)=>{
        this.setState({
           error: error.message ,
           loading:false
        });
      });
    }

    onLoginFail(){
        this.setState({
           error: TEXTS.error ,
           loading:false
        });
    }

    onPressSignUp(){
      this.props.navigation.navigate('SignUpScreen');
    }

    render(){
        const {navigate} = this.props.navigation;
        return(
          <ImageBackground
            source={require('../../images/cover.png')}
            style={{width: '100%', height: '100%'}}
          >
            <KeyboardAwareScrollView>
              <View style={[styles.container,styles.logoStyle]}>
                <Image resizeMode={'contain'} style={styles.logoImageStyle}
                  source={require('../../images/logo.png')}/>
              </View>
              <View style={styles.container} >
                  <TextInput
                      placeholder = {TEXTS.userName}
                      value = {this.state.user_name}
                      onChangeText={ (user_name)=> this.setState({user_name})  }
                      style={styles.textInputStyle}
                      inputStyle={{color: 'white'}}
                      keyboardType='email-address'
                  />
                  <TextInput
                      placeholder = {TEXTS.password}
                      value = {this.state.password}
                      onChangeText={ (password)=> this.setState({password})  }
                      style={styles.textInputStyle}
                      secureTextEntry
                      inputStyle={{color: 'white'}}
                  />
                  <Button
                      title={TEXTS.login}
                      onPress= { this.onPressLogin.bind(this) }
                      disabled={false}
                      style={styles.loginButton}
                      titleSize={22}
                  />
                  <Button
                      title={TEXTS.signUp}
                      onPress= { ()=> this.onPressSignUp() }
                      disabled={false}
                      style={styles.loginButton}
                      titleSize={22}
                  />
                  <LoadingModal visible={this.state.loading} />

                  <AppText style={styles.errorTextStyle}>{this.state.error}</AppText>

              </View>
            </KeyboardAwareScrollView>
          </ImageBackground>
        );
    }
}


export default Login;
