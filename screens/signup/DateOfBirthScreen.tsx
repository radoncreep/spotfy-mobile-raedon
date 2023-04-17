import React, { useState, useEffect } from "react";
import { Platform, StyleSheet, Pressable, Text, View } from "react-native";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import DateTimePicker from '@react-native-community/datetimepicker';

import { OnboardStackParamList } from "../../types/stackScreen.types";
import { AppFormInputGroup } from "../../components";


type DateOfBirthScreenProps =  NativeStackScreenProps<OnboardStackParamList, 'DateOfBirth'>;
   
export const DateOfBirthScreen = ({ navigation, route }: DateOfBirthScreenProps) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    const [ disabledButton, setDisabledButton ] = useState(true);
    const [ show, setShow ] = useState(Platform.OS === "ios" ? true : false);
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState<"date" | "time">('date');

    const platform = Platform.OS;

    console.log(route.params)

    const handlePress = () => {
        navigation.navigate('Gender', {
            email: route.params!['email'], 
            password: route.params!['password'],
            dob: date.toDateString()
        })
    }

    const onChange = (event: any, selectedDate: any) => {
        const currentDate = selectedDate;
        // setShow(false);
        setDate(currentDate);
        
    }; 

    const showMode = (currentMode: "date" | "time") => {
        if (Platform.OS === 'android') {
            setShow(false);
            // for iOS, add a button that closes the picker
        }
        setMode(currentMode);
    };

    const dateToString = (date: Date): string => {
        const [dayName, month, dateNum, year] = date.toDateString().split(" ");

        return `${dateNum} ${month} ${year}`;
    }

    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }}>
                <AppFormInputGroup 
                    inputField="What's your date of birth?"
                    inputFieldStyle={{
                        fontSize: 26
                    }}
                    onPress={handlePress}
                    label="Select a date below."
                    textInputProps={{
                        autoCorrect: false,
                        value: dateToString(date),
                        editable: false
                    }}
                    disabledButton={disabledButton}
                />
            </View>

            <View style={styles.pickerContainer}>
                <View style={{ alignSelf: 'flex-end', marginRight: 12 }}>
                    <Pressable
                        onPress={() =>{
                            // if (date.getFullYear() <= currentYear - 5) {
                                setDisabledButton(false);
                            // } else {
                            //     setDisabledButton(true);
                            // }
                        }}
                    >
                        <Text 
                            style={{
                                color: '#fff',
                                fontSize: 18,
                                fontWeight: 'normal'
                            }}
                        >
                            Done
                        </Text>
                    </Pressable>
                </View>

                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        onChange={onChange}
                        display="spinner"
                        minimumDate={new Date(1950, 0, 1)}
                        maximumDate={new Date(currentYear - 5, 10, 20)}
                        // textColor="#B3B3B3"
                        onError={(error) => {
                            console.log(error);
                        }}
                    />
                )}
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'orange'
    },
    pickerContainer: {
        borderTopWidth: 1,
        borderTopColor: '#121212',
        paddingVertical: 10,
        shadowColor: '#000',
        shadowOpacity: 1,
        // backgroundColor: 'red',
        flex: 1,
    },
})