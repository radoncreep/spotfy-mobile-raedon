import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { 
    FlatList, 
    Image, 
    ListRenderItemInfo, 
    Text, 
    TouchableOpacity, 
    View 
} from "react-native";
import { VStack } from "native-base";

import { HomeNavigationParamList } from "../../../types/stackScreen.types";
import { getArtistNameText } from "../../../utils/helper";
import { IArtist } from "../../../types/artist";


type FlatListItemProp = ListRenderItemInfo<IArtist> 
& 
    NativeStackScreenProps<HomeNavigationParamList, 'HomeIndex'>;
 
export const FavouriteArtistSectionItem = ({ index, item, navigation }: FlatListItemProp) => {
    let imageProp = {
        url: item.images[1].url,
        width: item.images[2].width,
        height: item.images[2].height
    }


    const firstCharToUpper = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    const onPressCard = () => {
        navigation.navigate('Details', { ...item });
    }

    return null;
}
