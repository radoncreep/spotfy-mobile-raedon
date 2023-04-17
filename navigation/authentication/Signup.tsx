import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { 
    DateOfBirthScreen, 
    EmailScreen, 
    GenderScreen, 
    PasswordScreen, 
    UsernameScreen 
} from "../../screens/signup";
import { AppScreenHeader } from "../../components";
import { RootSignupStackParamList } from "../../types/stackScreen.types";


const Stack = createNativeStackNavigator<RootSignupStackParamList>();

export const SignupStackNavigator = () => {
    return (
        <Stack.Navigator
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
        </Stack.Navigator>
    )   
}