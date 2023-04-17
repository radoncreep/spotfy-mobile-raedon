import React, { useEffect, useState } from "react";
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AppFormInputGroup } from "../../components";
import { OnboardStackParamList } from "../../types/stackScreen.types";


type EmailScreenProps = NativeStackScreenProps<OnboardStackParamList, 'Email'>;

export const EmailScreen = ({ navigation, route }: EmailScreenProps) => {
    const [ disabledButton, setDisabledButton ] = useState(true);
    const [ email, setEmail ] = useState<string>("");

    const handlePress = () => {
        navigation.navigate('Password', {email});
    }

    return (
        <AppFormInputGroup 
            inputField="What's your email?"
            onPress={handlePress}
            label="You'll need to confirm this email later."
            textInputProps={{
                onChangeText: (text) => {
                    let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
                    
                    if (!regex.test(text)) {
                        setDisabledButton(true)
                    } else {
                        setDisabledButton(false);
                        setEmail(text);
                    }
                },
                autoComplete: "email",
                keyboardType: 'email-address',
                spellCheck: false
            }}
            disabledButton={disabledButton}
        />
    )
}
