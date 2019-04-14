/*
* This is Reusable Modal With Spinner Using to Loading
*/
import React from 'react' ;
import {View, StyleSheet} from 'react-native';
import {AppText, Spinner, AppModal } from '../index';

import PropTypes from 'prop-types';

const LoadingModal = ({visible, size}) =>{
    return(
        <AppModal visible={visible}>
            <View style={styles.container}>
                <Spinner size={size}/>
                <AppText style={styles.loading}>Loading...</AppText>
            </View>
        </AppModal>
    );
};

export  {LoadingModal};

LoadingModal.propTypes = {
    visible : PropTypes.bool.isRequired,
    size : PropTypes.string
}

LoadingModal.defaultProps = {
    visible : false,
    size : 'large'
}

const styles = StyleSheet.create({
    container:{
        flexDirection : 'row',
        alignItems :'center',
        justifyContent:'center'
    },
    loading:{
        marginLeft : 15,
        fontWeight:'bold'
    }
});