import { 
    FlatList, 
    Image, 
    ListRenderItemInfo, 
    Text, 
    TouchableHighlight,
    View 
} from "react-native";
import { VStack } from "native-base";
import { useQuery } from "@tanstack/react-query";

import { NewReleaseItem } from "../../../api/browse/browse.types";
import { firstCharToUpper, getArtistNameText } from "../../../utils/helper";
import { Markets } from "../../../types/markets";
import { getNewReleases } from "../../../api/browse/BrowseAPI";
import { HomeScreenStackNavigationProps } from "../../../navigation/home/home.navigation.types";


type NewReleaseSectionProps = HomeScreenStackNavigationProps;

type FlatListItemProp = ListRenderItemInfo<NewReleaseItem> & NewReleaseSectionProps;
 
const FlatListItem = ({ index, item, navigation }: FlatListItemProp) => {
    let imageProp = {
        url: item.images[1].url,
        width: item.images[2].width,
        height: item.images[2].height
    }

    const onPressCard = () => {
        navigation.navigate('AlbumScreen', { ...item });
    }

    return (
        <VStack space={2} maxWidth={140}>
            <TouchableHighlight 
                activeOpacity={0.7}
                onPress={onPressCard}
            >
                <Image 
                    source={{ uri: imageProp.url }}
                    style={{
                        width: 140,
                        height: 150
                    }}
                />
            </TouchableHighlight>

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

export const NewReleaseSection = ({ navigation, route }: NewReleaseSectionProps) => {
    // writing a test query to reuse 
    // get location of user -dummy in this case from cache fr if not use default NG
    let country: Markets[keyof Markets] = "NG";

    const { data, isLoading, error } = useQuery({
        queryKey: ['new-releases', country],
        queryFn: () => getNewReleases({ country, limit: 10 }),
        select: (data): NewReleaseItem[] => {
            return data.albums.items;
        },
    });

    if (!data) return null;

    if (error) {
        console.log("Error loading new release ", { error });
    }

    return (
        <>
            <View>
                <Text style={{ color: '#fff', fontSize: 24, fontWeight: '600'}}>
                    Popular new releases
                </Text>
            </View>

            <FlatList 
                data={data}
                renderItem={((props) => <FlatListItem {...props} navigation={navigation} route={route} />)}
                horizontal={true}
                ItemSeparatorComponent={() => <View style={{ width: 14}} /> }
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    marginVertical: 12
                }}
                keyExtractor={({ id }) => id}
            />
        </>
    )
}