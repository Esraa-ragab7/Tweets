/*
* This is Reusable Free Spinner
*/

import React from 'react' ;
import {View, ActivityIndicator} from 'react-native';
import PropTypes from 'prop-types';

const Spinner = ({size,color}) =>{

    return(
        <ActivityIndicator size={size} color={color} />
    );
};

Spinner.propTypes = {
    size : PropTypes.string,
    color : PropTypes.string
};

Spinner.defaultProps = {
    size : 'large',
    color : 'black'
}

export  {Spinner};


const styles ={
    spinnerStyle :{
        justifyContent : 'center',
        alignItems:'center'
    }
};