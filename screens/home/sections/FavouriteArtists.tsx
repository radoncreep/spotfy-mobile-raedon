import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    View
} from "react-native";
import { IArtist } from "../../../types/artist";
import { getItemFromCache } from "../../../utils/cache";


export const FavouriteArtistSection = () => {
    const [ favouriteArtists, setFavouriteArtists ] = useState<IArtist[] | null>(null);

    useEffect(() => {
        (async () => {
            const favouriteArtists = await getItemFromCache('liked-artists');
            setFavouriteArtists(favouriteArtists)
        })();
    }, []);

    console.log({ favouriteArtists })

    return (
        <>
            <View>
                <Text style={{ color: '#fff', fontSize: 26, fontWeight: '600'}}>
                    Your Favourite Artists
                </Text>
            </View>

            {/* <FlatList 
                data={data}
                renderItem={((props) => <FlatListItem {...props} navigation={navigation} route={route} />)}
                horizontal={true}
                ItemSeparatorComponent={() => <View style={{ width: 14}} /> }
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    marginVertical: 20
                }}
                keyExtractor={({ id }) => id}
            /> */}
        </>
    )
}

const styles = StyleSheet.create({
    container: {

    }
})