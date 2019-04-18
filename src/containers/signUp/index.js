import React,{Component} from 'react';
import {View,ImageBackground,Image,AsyncStorage} from 'react-native';
import {TEXTS} from '../../common';
import styles from './styles';
import { Button, TextInput, LoadingModal,AppText } from '../../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Snackbar from 'react-native-snackbar';
import firebase from '../../firebase';

var database = firebase.database();

class SignUp extends Component{

    constructor(props){
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            userName:'',
            password:'',
            error:'',
            confirmPassword: '',
            loading:false
        };

    }

    static navigationOptions = ({navigation})=>{
        return {
            header: null
        }
    }

    onPressSignUp(){
      const {userName,password,firstName,lastName,confirmPassword} = this.state;
      this.setState({error:'',loading:true});

      if(this.validateName(firstName) && this.validateName(lastName) && this.validateMail(userName) && this.validatePassword(password) && this.equalPasswords(password,confirmPassword)){
        firebase.auth().createUserWithEmailAndPassword(userName,password)
        .then(this.onSignUpSuccess.bind(this))
            .catch(error => {
              this.displaySnackbar(error.message)
              this.setState({
                 error: error.message,
                 loading:false
              });
            })
      } else {
        this.setState({
            loading:false
        });
      }
    }

    onSignUpSuccess(){
        this.setState({
          loading:false
        });
this.displaySnackbar(TEXTS.createNewAccountSuccessfully)
        setTimeout( () => {
          const {userName,firstName,lastName} = this.state;
          const user_data = {
            fname: firstName,
            userName: userName,
            lname : lastName
          }
          this.setState({
              firstName: '',
              lastName: '',
              userName:'',
              password:'',
              error:'',
              confirmPassword: ''
           });
          AsyncStorage.setItem('user',JSON.stringify(user_data)).then(() => {
            var user = firebase.auth().currentUser;
            firebase.database().ref('users/' + user.uid).set({
              fname: firstName,
              userName: userName,
              lname : lastName
            });

            this.props.navigation.navigate('HomeScreen');
          })
        },500)
    }

    equalPasswords = (first,second) => {
      if(first == second){
        return true
      } else {
        this.displaySnackbar(TEXTS.passwordsDidnnotMatch)
        this.setState({error : TEXTS.passwordsDidnnotMatch})
        return false;
      }
    }

    validateMail = (text) => {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
      if(reg.test(text) === false)
      {
        this.displaySnackbar(TEXTS.insertCorrectMail)
        this.setState({error : TEXTS.insertCorrectMail})
        return false;
      }
      else {
        return true
      }
    }

    validatePassword = (passInput) => {
      //Validating length
      if (passInput.length < 8) {
        this.displaySnackbar(TEXTS.passwordDescription)
        this.setState({error : TEXTS.passwordDescription})
        return false;
      }

      //check for lower case
        if (!passInput.match(/[a-z]/)) {
          this.displaySnackbar(TEXTS.insertOneLowerCaseLetter)
          this.setState({error : TEXTS.insertOneLowerCaseLetter})
          return false;
        }

        this.setState({error : ""})
        return true
    }

    validateName = (name) => {
      if(name.length < 4)
      {
        this.displaySnackbar(TEXTS.insertCorrectName)
        this.setState({error : TEXTS.insertCorrectName})
        return false;
      }
      else {
        return true
      }
    }

    displaySnackbar = (text) => {
      Snackbar.show({
        title: text,
        duration: Snackbar.LENGTH_SHORT,
      });
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
                      placeholder = {TEXTS.firstName}
                      value = {this.state.firstName}
                      onChangeText={ (firstName)=> this.setState({firstName})  }
                      style={styles.textInputStyle}
                      inputStyle={{color: 'white'}}
                  />
                  <TextInput
                      placeholder = {TEXTS.lastName}
                      value = {this.state.lastName}
                      onChangeText={ (lastName)=> this.setState({lastName})  }
                      style={styles.textInputStyle}
                      inputStyle={{color: 'white'}}
                  />
                  <TextInput
                      placeholder = {TEXTS.userName}
                      value = {this.state.userName}
                      onChangeText={ (userName)=> this.setState({userName})  }
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
                  <TextInput
                      placeholder = {TEXTS.confirmPassword}
                      value = {this.state.confirmPassword}
                      onChangeText={ (confirmPassword)=> this.setState({confirmPassword})  }
                      style={styles.textInputStyle}
                      secureTextEntry
                      inputStyle={{color: 'white'}}
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


export default SignUp;
