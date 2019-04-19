import {StyleSheet,Platform} from 'react-native';
import { COLORS } from '../../common';

export default styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor: 'white'
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
      alignSelf: 'center',
      width: 150,
      height: 150,
      borderRadius: Platform.OS === 'ios' ? 75: 0,
      borderColor: COLORS.white,
      borderWidth: 4
    },
    all:{
      flex: 1,
    },
    logoStyle:{
      padding: 20,
      marginBottom: 20,
      width: "100%",
      backgroundColor: COLORS.twiterColor2,
      textAlign: 'center',
      justifyContent: 'center'
    },
    textStyle:{
      color: COLORS.main,
      fontSize: 17,
      marginBottom: 20,
      fontFamily: Platform.OS === 'ios' ? 'Menlo': 'Roboto',
    }
});
