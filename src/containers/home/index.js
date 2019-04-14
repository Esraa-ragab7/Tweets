import React,{Component} from 'react';
import {View,Platform} from 'react-native';
import styles from './styles';
import { TEXTS, COLORS } from '../../common';

class Home extends Component {

    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
          <View style={styles.container}>
            <AppText>test Home Page</AppText>
          </View>
        );
    }
}

export default Home;
