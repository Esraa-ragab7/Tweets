import React from 'react';
import {Text} from 'react-native';


const AppText = ({children, ...rest})=>(
    <Text {...rest} >{children}</Text>
);

export {AppText};