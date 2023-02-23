import { useEffect, useState } from "react";
import {
    FlatList,
    Image,
    ListRenderItemInfo,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from "react-native";

import { HomeScreenStackNavigationProps } from "../../../navigation/home/home.navigation.types";
import { IArtist } from "../../../types/artist";
import { getItemFromCache } from "../../../utils/cache";


type FavouriteArtistSectionProps = HomeScreenStackNavigationProps;

type FavouriteArtistSectionItemProps = ListRenderItemInfo<IArtist> & FavouriteArtistSectionProps;

const FavouriteArtistSectionItem = (props: FavouriteArtistSectionItemProps) => {
    const { navigation } = props;
    const artistData = props.item;

    const navigateToArtistScreen = () => navigation.navigate('ArtistScreen', {...artistData});

    return (
        <TouchableHighlight onPress={navigateToArtistScreen}>
            <View style={styles.artistCardView}>
                <Image 
                    source={{ uri: artistData.images[0].url }}
                    style={styles.artistImage}
                />
                <Text style={styles.artistName}>{artistData.name}</Text>
            </View>
        </TouchableHighlight>
    )
}

export const FavouriteArtistSection = ({ navigation, route }: FavouriteArtistSectionProps) => {
    const [ favouriteArtists, setFavouriteArtists ] = useState<IArtist[] | null>(null);
    console.log("render artist section ", favouriteArtists?.length);

    useEffect(() => {
        (async () => {
            const favouriteArtists = await getItemFromCache('favourite-artists');
            setFavouriteArtists(favouriteArtists)
        })();
    }, []);


    console.log({ favouriteArtists })

    return (
        <>
            <View>
                <Text style={{ color: '#fff', fontSize: 24, fontWeight: '600'}}>
                    Your favourite artists
                </Text>
            </View>

            <FlatList 
                data={favouriteArtists}
                renderItem={((props) => <FavouriteArtistSectionItem {...props} navigation={navigation} route={route} />)}
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

const styles = StyleSheet.create({
    container: {

    },
    artistImage: {
        width: 140,
        height: 140,
        borderRadius: 70,
        marginBottom: 6
    },
    artistName: {
        fontSize: 12,
        fontWeight: '500',
        color: '#fff'
    },
    artistCardView: {
        alignItems: 'center'
    }
})