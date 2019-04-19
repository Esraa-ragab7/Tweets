import React from 'react';
import {View, StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native';
import { AppText } from '../AppText';
import { COLORS } from '../../common';


const Button = ({title, style, titleSize, loading, ...rest})=>{
    return(
        <TouchableOpacity style={[styles.container,style]} {...rest}  >
            {
              loading ? <ActivityIndicator size="large" color="white" /> : <AppText style={[styles.titleStyle, titleSize? {fontSize: titleSize}: null]} >{title}</AppText>
            }

        </TouchableOpacity>
    );
}

export {Button};


const styles = StyleSheet.create({
    container:{
        height:40,
        width:"80%",
        borderRadius:5,
        backgroundColor:COLORS.main,
        alignItems:'center',
        justifyContent:'center'
    },
    titleStyle:{
        color:COLORS.white
    }
});
