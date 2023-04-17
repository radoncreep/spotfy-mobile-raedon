import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { VStack } from "native-base";
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

import { AppFormInputGroup, AppTouchableButton } from "../../components";
import { OnboardStackParamList } from "../../types/stackScreen.types";
import { useAppDispatch } from "../../store/hooks";
import { login } from "../../store/features/auth.slice";


type UsernameScreenProps = NativeStackScreenProps<OnboardStackParamList, 'Username'>;

export const UsernameScreen = ({ navigation, route }: UsernameScreenProps) => {
    const [ disabledButton, setDisabledButton ] = useState(true);
    const [ username, setUsername ] = useState<string>("");
    const [ checked, setChecked ] = useState(false);
    const dispatch = useAppDispatch();

    const handlePress = () => {
        const loginValues = {...route.params, username};
        dispatch(login(loginValues))
        
        navigation.reset({
            index: 0,
            routes: [{ name: 'ChooseArtistScreen'}]
        })
    }

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            if (username.length >= 4 && checked) {
                setDisabledButton(false)
            } else {
                setDisabledButton(true);
            }
        }

        return () => {mounted = false};
    }, [username, checked])

    return (
        <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
            <AppFormInputGroup 
                inputField="What's your name?"
                onPress={() => {}}
                label="This appears on your Spotify profile."
                textInputProps={{
                    onChangeText: (text) => {
                        setUsername(text)
                    }
                }}
                isButton={false}
            />

            <View style={styles.seperator} />           

            <VStack 
                space={6}
                style={styles.section2}
            >
                <Text style={styles.text}>
                    By tapping on "Creat account", you agree to the Spotify Terms of Use.
                </Text>

                <Text style={[styles.text, { color: '#57B65F' }]}>
                    Terms of Use
                </Text>

                <Text style={styles.text}>
                    By tapping on "Creat account", you agree to the Spotify Terms of Use.
                </Text>

                <Text style={styles.text}>
                    To learn more about how Spotify collects, uses, shares and protects your personal
                    data, please see the Spotify Privacy Policy.
                </Text>

                <Text style={[styles.text, { color: '#57B65F' }]}>
                    Privacy Policy
                </Text>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={[styles.text, { width: '80%' }]}>
                        Share my registration data with Spotify's content providers for marketing 
                        purposes.
                    </Text>

                    <Pressable
                        onPress={() => setChecked((prev) => !prev)}
                    >
                        {checked ? 
                            <AntDesign name="checkcircle" size={30} color="#57B65F"/>
                            :
                            <MaterialIcons name="radio-button-unchecked" size={30} color="grey" />
                        }
                    </Pressable>
                </View>
            </VStack>

            <AppTouchableButton 
                text="Create account"
                textStyle={{
                    color: '#000'
                }}
                onPress={handlePress}
                containerStyle={{
                    backgroundColor: disabledButton ? '#282828' : '#fff',
                    alignSelf: 'center',
                    paddingHorizontal: 20,
                    paddingVertical: 12,
                    borderRadius: 40
                }} 
                otherProps={{
                    disabled: disabledButton
                }}       
            />
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 40
    },
    section2: {
        paddingHorizontal: 20,
        marginBottom: 60
    },
    seperator: {
        backgroundColor: '#282828',
        height: 2,
        marginVertical: 10,
        width: '88%',
        alignSelf: 'center'
    },
    text: {
        fontWeight: '500',
        fontSize: 16,
        color: '#fff',
        lineHeight: 24
    }
})