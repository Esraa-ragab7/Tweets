import React,{Component} from 'react';
import {View,ImageBackground,Image} from 'react-native';
import {TEXTS} from '../../common';
import styles from './styles';
import { Button, TextInput, LoadingModal,AppText,Header } from '../../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import firebase from '../../firebase';

class Profile extends Component{

    constructor(props){
        super(props);

        this.state = {
            user: this.props.navigation.getParam('user', {
              fname: "",
              lname: "",
              userName: ""
            })
        };
    }

    static navigationOptions = ({navigation})=>{
        return {
            header: null
        }
    }

    render(){
        const {navigate} = this.props.navigation;

        return(
            <View style={styles.container}>
            <Header menu={true} search={false} back={false} navigation={this.props.navigation} title={TEXTS.profile} date=' '/>
              <View style={[styles.logoStyle]}>
                <Image resizeMode={'contain'} style={styles.logoImageStyle}
                  source={require('../../images/logo.png')}/>
              </View>
              <View style={{flex: 1, alignItems: 'center'}} >
                  <AppText style={styles.textStyle}>{'Email: '+this.state.user.userName}</AppText>
                  <AppText style={styles.textStyle}>{'First Name: '+this.state.user.fname}</AppText>
                  <AppText style={styles.textStyle}>{'Last Name: '+this.state.user.lname}</AppText>
              </View>
            </View>
        );
    }
}


export default Profile;
