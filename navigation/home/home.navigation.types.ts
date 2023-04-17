import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { IArtistResponse } from "../../api/artist/artist.types";
import { NewReleaseItem } from "../../api/browse/browse.types";

export type HomeNavigationParamList = {
    HomeIndex: undefined;
    AlbumScreen: NewReleaseItem;
    ArtistScreen: IArtistResponse
}

export type HomeScreenStackNavigationProps = NativeStackScreenProps<HomeNavigationParamList, 'HomeIndex'>

