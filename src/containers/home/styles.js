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
      padding: 10,
      paddingLeft: 10,
      paddingRight: 10,
      borderBottomWidth: 1,
      borderBottomColor: 'gray',
    },
    listItem:{
      textAlign: 'center',
      flexDirection: 'row'
    },
    listView:{
      flex: 1,
      backgroundColor: 'white'
    }
});
