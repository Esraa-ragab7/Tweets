import React,{Component} from 'react';
import {View,ImageBackground,Image} from 'react-native';
import {TEXTS} from '../../common';
import styles from './styles';
import { Button, TextInput, LoadingModal,AppText } from '../../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class Login extends Component{

    constructor(props){
        super(props);

        this.state = {
            email:'',
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

        const {email,password} = this.state;
        this.setState({error:'',loading:true});

        if(email.length == 0 || password.length == 0){
            this.setState({loading : false, error : TEXTS.error})
        }else{

        }
    }


    onLoginSuccess(){
        this.setState({
            email:'',
            password:'',
            error:'',
            loading:false
        });
        this.props.navigation.navigate('HomeScreen');
    }

    onLoginFail(){
        this.setState({
           error: TEXTS.error ,
           loading:false
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
                <Image resizeMode={'center'} style={{flex: 1, alignSelf: 'center'}}
                  source={require('../../images/logo.png')}/>
              </View>
              <View style={styles.container} >
                  <TextInput
                      placeholder = {TEXTS.email}
                      value = {this.state.email}
                      onChangeText={ (email)=> this.setState({email})  }
                      style={styles.textInputStyle}
                      inputStyle={{color: 'white'}}
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
                      onPress= { ()=> this.onPressLogin() }
                      disabled={false}
                      style={styles.loginButton}
                      titleSize={22}
                  />
                  <Button
                      title={TEXTS.signUp}
                      onPress= { ()=> this.onPressLogin() }
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
