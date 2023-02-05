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
import { useQuery } from "@tanstack/react-query";

import { NewReleaseItem } from "../../../api/browse/browse.types";
import { HomeNavigationParamList } from "../../../types/stackScreen.types";
import { getArtistNameText } from "../../../utils/helper";
import { getAlbum } from "../../../api/album/albumAPI";
import { getArtist } from "../../../api/artists/ArtistsAPI";


type NewReleaseProps = NativeStackScreenProps<HomeNavigationParamList, 'HomeIndex'> & 
    Record<"data", any[]>;

type FlatListItemProp = ListRenderItemInfo<NewReleaseItem> 
& 
    NativeStackScreenProps<HomeNavigationParamList, 'HomeIndex'>;
 
export const NewReleaseSectionItem = ({ index, item, navigation }: FlatListItemProp) => {
    // console.log('rendered')
    let imageProp = {
        url: item.images[1].url,
        width: item.images[2].width,
        height: item.images[2].height
    }

    const albumId = item.id;

    const { data: albumData, isLoading: isLoadingAlbum, error: albumFetchError, refetch: refetchAlbum} = useQuery({
        queryKey: ['album', { albumId }],
        queryFn: () => getAlbum(albumId),
        cacheTime: 60000,
    })

    
    const mainArtist = item.artists[0];
    const { data: artistData, isLoading, error, refetch, isFetching} = useQuery({
        queryKey: [`${mainArtist.name}-image`],
        queryFn: () => getArtist(mainArtist.id),
        select: (data) => {
            return data;
        },
        refetchOnMount: false
    })

    const firstCharToUpper = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    const onPressCard = () => {
        navigation.navigate('Details', { album: albumData!, artist: artistData! });
    }

    return (
        <VStack space={2} maxWidth={140}>
            <TouchableOpacity 
                activeOpacity={0.5}
                onPress={onPressCard}
                disabled={(!albumData && !artistData)}
            >
                <Image 
                    source={{ uri: imageProp.url }}
                    style={{
                        width: 140,
                        height: 150
                    }}
                />
            </TouchableOpacity>

            <View style={{ }}>
                <Text style={{ fontSize: 12, fontWeight: '500', color: '#fff' }}>
                    {item.name}
                </Text>
                
                <View style={{ flexDirection: 'row', alignItems: 'center', maxWidth: '100%', overflow: 'hidden' }}>
                    <Text style={{ fontSize: 12, fontWeight: '500', color: 'grey' }}>
                        {firstCharToUpper(item.album_type)}{' '}

                        <View >
                            <Text style={{ color: 'grey', fontSize: 4 }}>{'\u2B24'}</Text>
                        </View>

                        <Text style={{ fontSize: 12, fontWeight: '500', color: 'grey' }} numberOfLines={3} >
                            {' '}{getArtistNameText(item.artists)}
                        </Text>
                    </Text>
                </View>
            </View>
        </VStack>
    )
}

export const NewReleaseSection = ({ data, navigation, route }: NewReleaseProps) => {

    return (
        <>
            {/* <View>
                <Text style={{ color: '#fff', fontSize: 26, fontWeight: '600'}}>
                    Popular new releases
                </Text>
            </View> */}

            <FlatList 
                data={data}
                renderItem={((props) => <NewReleaseSectionItem {...props} navigation={navigation} route={route} />)}
                horizontal={true}
                ItemSeparatorComponent={() => <View style={{ width: 14}} /> }
                showsHorizontalScrollIndicator={false}
                // contentContainerStyle={{
                //     marginVertical: 20
                // }}
                keyExtractor={({ id }) => id}
            />
        </>
    )
}