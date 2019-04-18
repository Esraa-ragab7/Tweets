import {StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
    container:{
        ...StyleSheet.absoluteFillObject
    },
    map:{
        ...StyleSheet.absoluteFillObject,
    },
    searchBoxContainer:{
      position:'absolute',
      top:0,
      left:0,
      right:0
    },
    itemView:{
      width: "100%",
      alignItems: 'center',
      justifyContent: 'center',
      paddingLeft: 30,
      paddingRight: 30,
      marginTop: 10,
      marginBottom: 10
    },
    listItem:{
      width: "100%",
      borderRadius: 5,
      borderWidth: 1,
      textAlign: 'center',
      borderColor: 'black',
      padding: 10,
    },
    listView:{
      flex: 1,
      backgroundColor: 'white'
    }
});
