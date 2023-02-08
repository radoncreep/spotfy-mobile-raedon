import { NavigatorScreenParams } from '@react-navigation/native';
import { Artist, NewReleaseItem } from '../api/browse/browse.types';


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

export type HomeNavigationParamList = {
    HomeIndex: undefined;
    AlbumScreen: NewReleaseItem;
    ArtistScreen: Artist
}