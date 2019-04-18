//Navigation File
import {createStackNavigator, createAppContainer, createDrawerNavigator, createSwitchNavigator} from 'react-navigation';
import {COLORS} from '../common';
import Login from '../containers/login';
import Home from '../containers/home';
import SignUp from '../containers/signUp';
import Splash from '../containers/splash';
import Drawer from '../containers/home/drawer';
import Profile from '../containers/profile';

const DrawerNavigation = createDrawerNavigator({
  MainPageScreen : Home,
  ProfileScreen: Profile,
}, {
  contentComponent: Drawer,
  gesturesEnabled: false
})

const NavStack = createStackNavigator({
    LoginScreen : Login,
    SignUpScreen : SignUp
},{
    initialRouteName : 'LoginScreen',
    navigationOptions : ({navigation})=>{
        return{
            headerTitleStyle:{ color:COLORS.white, marginLeft:20 },
            headerBackTitle:null,
            headerStyle : { backgroundColor:COLORS.main },
            headerTintColor: COLORS.white
        }
    }
})


const RootNavigation = createSwitchNavigator({
    SplashScreen : Splash,
    LoginScreen : NavStack,
    HomeScreen : DrawerNavigation,
},{
    initialRouteName : 'SplashScreen'
});


const AppNavigation = createAppContainer(RootNavigation);

export default AppNavigation;
