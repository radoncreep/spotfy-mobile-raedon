import { FlatList, VStack } from "native-base"
import { Dimensions, Image, StyleSheet, Text, View } from "react-native"
import { SearchAlbums, SearchArtist } from "../../../api/search/search.types"
import { ViewSeperator } from "../../../components/core/ViewSeperator";


type AlbumSearchViewProps = {
    albumData: SearchAlbums['items'];
}

const getArtistNameText = (artists: SearchArtist[]) => {
    let artistNames = artists.map((artist) => artist.name);

    return artistNames.join(", ");
}

const windowWidth = Dimensions.get("window").width;

export const AlbumSearchView = ({ albumData }: AlbumSearchViewProps) => {

    return (
        <FlatList 
            data={albumData}
            renderItem={(props) => {
                let { item: { images, name, id, artists, release_date } } = props;

                return (
                    <VStack space={2} style={styles.itemContainer}>
                        <Image 
                            source={{ uri: images[0].url }}
                            style={styles.albumImage}
                        />
                        <Text style={{ fontSize: 14, color: "#fff", fontWeight: "400"}}>
                            {name}
                        </Text>

                        <Text style={{ fontSize: 14, color: "#fff", fontWeight: "400", opacity: 0.8}}>
                            {getArtistNameText(artists)}
                        </Text>

                        <Text style={{ fontSize: 12, color: "#fff", fontWeight: "400", opacity: 0.8}}>
                            {release_date.split("-")[0]}
                        </Text>
                    </VStack>
                )
            }}
            numColumns={2}
            columnWrapperStyle={{
                justifyContent: "space-between",
            }}
            ItemSeparatorComponent={() => <ViewSeperator />}
        />
    )  
}

const styles = StyleSheet.create({
    itemContainer: {
        width: windowWidth / 2 - 15,
    },
    albumImage: {
        width: "100%",
        height: 150
    }
})