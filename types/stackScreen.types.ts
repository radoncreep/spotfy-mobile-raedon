import { NavigatorScreenParams } from '@react-navigation/native';

import { NewReleaseItem } from '../api/browse/browse.types';
import { IArtistResponse } from '../api/artist/artist.types';


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
    Username: {email: string, password: string, dob: string, gender: string };
    Password: {email: string};
    DateOfBirth: {email: string, password: string };
    Gender: {email: string, password: string, dob: string };
    Email: undefined;
    ChooseArtistScreen: {email: string, password: string, dob: string, gender: string, username: string } | undefined;
}
