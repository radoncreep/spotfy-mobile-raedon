import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Picker } from '@react-native-picker/picker';

import { AppFormInputGroup } from "../../components";
import { OnboardStackParamList } from "../../types/stackScreen.types";


type GenderScreenProps = NativeStackScreenProps<OnboardStackParamList, 'Gender'>;
    
export const GenderScreen = ({ navigation, route }: GenderScreenProps) => {

    const [ selectedGender, setSelectedGender ] = useState<string>('Male');

    const handlePress = () => {
        navigation.navigate('Username', {
            email: route.params!['email'], 
            password: "",
            dob: route.params!['dob'],
            gender: selectedGender
        })
    }

    return (
        <View style={styles.container}>
             <AppFormInputGroup 
                inputField="What's your gender?"
                inputFieldStyle={{
                    fontSize: 26
                }}
                onPress={handlePress}
                label="Select a gender below."
                textInputProps={{
                    editable: false,
                    value: selectedGender
                }}
            />

            <Picker
                selectedValue={selectedGender}
                onValueChange={(itemValue, itemIndex) =>
                    setSelectedGender(itemValue)
                }
                itemStyle={{
                    color: '#fff'
                }}
            >
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
                <Picker.Item label="Non-binary" value="non-binary" />
            </Picker>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    input: {}
})