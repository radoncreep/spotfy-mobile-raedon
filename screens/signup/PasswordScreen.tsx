import React, { useState } from "react";
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AppFormInputGroup } from "../../components";
import { OnboardStackParamList } from "../../types/stackScreen.types";


type PasswordScreenProps = NativeStackScreenProps<OnboardStackParamList, 'Password'>;

export const PasswordScreen = ({ navigation, route }: PasswordScreenProps) => {
    const [ disabledButton, setDisabledButton ] = useState(true);
    const [ password, setPassword ] = useState<string>("");

    const handlePress = () => {
        navigation.navigate('DateOfBirth', {
            email: route.params!['email'], 
            password
        })
    }

    return (
        <AppFormInputGroup 
            inputField="Create a password"
            onPress={handlePress}
            label="Use at least 4 characters."
            textInputProps={{
                onChangeText: (text) => {

                    if (text.length < 4) {
                        setDisabledButton(true)
                    } else {
                        setDisabledButton(false);
                        setPassword(text);
                    }
                },
                autoCorrect: false,
                textContentType: 'newPassword',
                secureTextEntry: true
            }}
            disabledButton={disabledButton}
        />
    )
}
