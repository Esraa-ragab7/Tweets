import React,{Component} from 'react'
import { StyleSheet, Text, View, Image, Platform, TouchableOpacity } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { COLORS, EX } from '../../common';
import Feather from 'react-native-vector-icons/Feather';

class Header extends Component {

  openDrawer = () => {
    navigation.openDrawer()
  }

  render() {
    const {
        navigation,
        title,
        date,
        search,
        menu,
        back,
        underline
    } = this.props;

    return (
      <View style={[styles.container]}>
      { menu == false ? null : <TouchableOpacity style={[styles.socialIconView,{ marginLeft: 5,marginRight: 5, justifyContent: 'center', alignItems: 'center',}]} onPress = {() => {
          navigation.openDrawer()
        }
      }>
          <Feather style={styles.socialIcons} name={'menu'}/>
      </TouchableOpacity>

      }
        { search == false ? null : <TouchableOpacity style={[styles.socialIconView]}>
                <Feather style={styles.socialIcons} name={'search'}/>
            </TouchableOpacity> }
        { back ? <TouchableOpacity style={[styles.socialIconView]} onPress={()=>this.props.navigation.goBack()}>
                <Feather style={styles.socialIcons} name={'arrow-left'}/>
            </TouchableOpacity> : null }
        <View style={{flex: 1, marginLeft: 5,marginRight: 5, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.title}>{title}</Text>
        </View>


      </View>
    );
  }
}

export {Header};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.twiterColor,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 5,
    width: EX.width,
    borderColor: COLORS.gold,
    height: Platform.OS === 'ios' ? 50 : 45,
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
  socialIconView: {
    height: 30,
    width: 30,
  },
  socialIcons: {
    color: COLORS.white,
    fontSize: 30,
    alignSelf: 'center'
  },
  title: {
    fontSize: 20,
    color: COLORS.white,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'Menlo': 'Roboto',
    textAlign: 'center',
    alignSelf: 'center'
  },
  date: {
    fontSize: 12,
    color: COLORS.white,
    textAlign: 'center'
  }
})
