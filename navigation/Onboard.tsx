import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { OnboardScreen } from "../screens/onboarding/OnboardScreen";
// import { SignupStackNavigator } from "./authentication/Signup";
import { OnboardStackParamList } from "../types/stackScreen.types";
import ChooseArtistScreen from "../screens/shared/ChooseArtist/ChooseArtistScreen";
import { DateOfBirthScreen, EmailScreen, GenderScreen, PasswordScreen, UsernameScreen } from "../screens/signup";
import { AppScreenHeader } from "../components";


const Stack = createNativeStackNavigator<OnboardStackParamList>();

export const OnboardStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                options={{ headerShown: false }} 
                name="OnboardScreen" 
                component={OnboardScreen}  
            />
            <Stack.Group 
                screenOptions={{
                    headerTitle: 'Create account',
                    headerBackVisible: true,
                    contentStyle: {
                        backgroundColor: '#121212'
                    },
                    header: (props) => (<AppScreenHeader {...props} />),
                }}
            >
                <Stack.Screen name="Email" component={EmailScreen} />
                <Stack.Screen name="Password" component={PasswordScreen} />
                <Stack.Screen name="DateOfBirth" component={DateOfBirthScreen} />
                <Stack.Screen name="Gender" component={GenderScreen} />
                <Stack.Screen name="Username" component={UsernameScreen} />
            </Stack.Group>
            <Stack.Screen 
                options={{ 
                    headerShown: false, 
                    // presentation: 'modal',
                    contentStyle: {
                        backgroundColor: '#121212'
                    },
                    header: (props) => (<AppScreenHeader {...props} />),
                }} 
                name="ChooseArtistScreen" 
                component={ChooseArtistScreen}  
            />
        </Stack.Navigator>
    )
}