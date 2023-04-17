import React, { useState } from "react";
import { StyleSheet, TextInput, Text, TextStyle, View, TextInputProps } from "react-native";

import AppTouchableButton from "../../components/core/TouchableButton";


interface FormInputProps {
    inputField: string;
    inputFieldStyle?: TextStyle;
    label: string;
    labelStyle?: TextStyle;
    textInputProps?: TextInputProps;
    onPress: () => void;
    disabledButton?: boolean;
    isButton?: boolean;
    // setTextInputValue: () => void;
}

const FormInputGroup = ({
    inputField,
    inputFieldStyle,
    label,
    labelStyle,
    textInputProps,
    onPress,
    disabledButton,
    isButton=true
}: FormInputProps) => {

    return (
        <View style={styles.container}>
            <Text style={[styles.heading, {...inputFieldStyle}]}>{inputField}</Text>

            <TextInput 
                style={styles.input}
                {...textInputProps}
            />

            <Text style={[styles.label, {...labelStyle}]}>
                {label}
            </Text>

            {isButton && <AppTouchableButton 
                containerStyle={{
                    backgroundColor: disabledButton ? '#282828' : '#fff',
                    padding: 20,
                    borderRadius: 40,
                    width: 140,
                    alignSelf: 'center',
                    marginTop: 40
                }}
                text='Next'
                textStyle={{
                    fontSize: 22,
                    fontWeight: 'bold',
                    color: '#000'
                }}
                onPress={onPress}
                otherProps={{
                    disabled: disabledButton
                }}
            />
            }
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingHorizontal: 20
    },
    input: {
        height: 60,
        marginTop: 2,
        marginBottom: 14,
        paddingHorizontal: 16,
        backgroundColor: '#282828',
        fontSize: 22,
        fontWeight: '400',
        borderRadius: 4,
        color: '#fff'
    },
    heading: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff'
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        color: '#fff',
        paddingLeft: 2,
    }
})

export default FormInputGroup;