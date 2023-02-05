import { NavigatorScreenParams } from '@react-navigation/native';
import { AlbumResponse } from '../api/album/album.types';
import { NewReleaseItem } from '../api/browse/browse.types';
import { IArtist } from './artist';

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
    Details: NewReleaseItem | { artist: IArtist, album: AlbumResponse };
}