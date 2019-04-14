//Navigation File
import {createStackNavigator, createAppContainer} from 'react-navigation';
import {COLORS} from '../common';
import Login from '../containers/login';
import Home from '../containers/home';

const NavStack = createStackNavigator({
    LoginScreen : Login,
    HomeScreen : Home
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

const AppNavigation = createAppContainer(NavStack);

export default AppNavigation;
