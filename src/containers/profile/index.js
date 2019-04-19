import React,{Component} from 'react';
import {View,ImageBackground,Image,AsyncStorage} from 'react-native';
import {TEXTS} from '../../common';
import styles from './styles';
import { Button, TextInput, LoadingModal,AppText,Header } from '../../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import firebase from '../../firebase';

class Profile extends Component{

    constructor(props){
        super(props);

        this.state = {
          userImage: null,
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
        if(this.state.userImage == null){
          AsyncStorage.getItem('userImage')
          .then(userImage => {
            this.setState({
              userImage: userImage
            });
          })
        }

        return(
            <View style={styles.container}>
            <Header menu={true} search={false} back={false} navigation={this.props.navigation} title={TEXTS.profile} date=' '/>
              <View style={[styles.logoStyle]}>
                <Image resizeMode={'contain'} style={styles.logoImageStyle}
                  source={this.state.userImage != null ? {uri: this.state.userImage} : require('../../images/logo2.png')}/>
              </View>
              <View style={{flex: 1, marginLeft: 20}} >
                  <AppText style={[styles.textStyle,{fontWeight: 'bold',}]}>{'First Name: '}<AppText style={[styles.textStyle,{fontWeight: 'normal',}]}>{this.state.user.fname}</AppText></AppText>
                  <AppText style={[styles.textStyle,{fontWeight: 'bold',}]}>{'Last Name: '}<AppText style={[styles.textStyle,{fontWeight: 'normal',}]}>{this.state.user.lname}</AppText></AppText>
                  <AppText style={[styles.textStyle,{fontWeight: 'bold',}]}>{'Email: '}<AppText style={[styles.textStyle,{fontWeight: 'normal',}]}>{this.state.user.userName}</AppText></AppText>
              </View>
            </View>
        );
    }
}


export default Profile;
