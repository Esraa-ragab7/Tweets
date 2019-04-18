import {StyleSheet} from 'react-native';
import { COLORS } from '../../common';

export default styles = StyleSheet.create({
    container:{
      flex:1,
      alignItems:'center',
      justifyContent:'center',
    },
    textInputStyle:{
      width:"80%",
      marginBottom:10,
      borderBottomColor:'red',
    },
    loginButton:{
      marginTop:20,
      backgroundColor:COLORS.twiterColor,
      height:50,
      borderRadius:10
    },
    errorTextStyle:{
      fontSize:16,
      marginTop:20,
      color:'red',
      textAlign:'center'
    },
    logoImageStyle:{
      flex: 1,
      alignSelf: 'center'
    },
    all:{
      flex: 1,
    },
    logoStyle:{
      marginTop: 50,
      marginBottom: 50,
      height: 150
    }
});
