import { NavigatorScreenParams } from '@react-navigation/native';

export type RootSignupStackParamList = {
    Username: {email: string, password: string, dob: string, gender: string } | undefined;
    Password: {email: string} | undefined;
    DateOfBirth: {email: string, password: string } | undefined;
    Gender: {email: string, password: string, dob: string }  | undefined;
    Email: undefined;
}

export type OnboardStackParamList = {
    OnboardScreen: undefined;
    SignupStack:  NavigatorScreenParams<RootSignupStackParamList>;
    Username: {email: string, password: string, dob: string, gender: string } | undefined;
    Password: {email: string} | undefined;
    DateOfBirth: {email: string, password: string } | undefined;
    Gender: {email: string, password: string, dob: string }  | undefined;
    Email: undefined;
    ChooseArtistScreen: undefined;
}