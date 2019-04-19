import React,{Component} from 'react';
import {View, TextInput, Text, StyleSheet, I18nManager,    Keyboard} from 'react-native';

class CustomField extends Component{
    render(){
        const {
            value,
            placeholder,
            onChangeText,
            secureTextEntry,
            autoCapitalize,
            keyboardType,
            error,
            style,
            inputStyle,
            maxLength,
            multiline,
            returnKeyType,
            editable
        } = this.props;

        return(
            <View style={[styles.container,style ,{ borderBottomColor: error? '#ed1c24' : '#ccc' }]} >
                { value && value.length > 0 ? <Text style={styles.label} >{placeholder}</Text>: null }

                <TextInput
                    placeholder={placeholder}
                    onChangeText={   onChangeText }
                    value={value || "" }
                    style={[styles.input, inputStyle]}
                    maxLength = {maxLength || 30}
                    underlineColorAndroid={'transparent'}
                    secureTextEntry={secureTextEntry}
                    placeholderTextColor="#C7C7C7"
                    autoCorrect = {false}
                    autoCapitalize=  {autoCapitalize || "none"}
                    multiline={multiline || false }
                    keyboardType={keyboardType || "default"}
                    returnKeyType={ returnKeyType || "default" }
                    onSubmitEditing={ ()=> Keyboard.dismiss()}
                    editable={editable}
                />
            </View>
        );
    }
}
export {CustomField as TextInput };


const styles = StyleSheet.create({
    container:{
        minHeight:40,
        borderBottomWidth:1,
        justifyContent:'center',
        marginHorizontal:10
    },
    label :{
        fontSize:12,
        color: '#aaa',
        textAlign:'right',
        marginTop:5
    },
    input:{
        fontSize:16,
        textAlign: 'right'

    }
})
