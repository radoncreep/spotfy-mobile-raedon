import { FlatList, HStack, VStack } from "native-base";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SimpleLineIcons } from '@expo/vector-icons';


import { SearchTracks } from "../../../api/search/search.types"
import TrackDefaultImage from "../../../assets/images/albumDefaultImage.png";
import { ExplicitIcons } from "../../../components";
import { ViewSeperator } from "../../../components/core/ViewSeperator";
import { getArtistNameText, isEmpty } from "../../../utils/helper";


type Props = { 
    tracksData: SearchTracks['items'];
}

export const TracksSearchResultView = ({ tracksData }: Props) => {

    const handleTrackOptions = () => {
        // do sum'n
    }

    return (
        <FlatList 
            data={tracksData}
            renderItem={({ item }) => {
                const trackImage = !isEmpty(item.album.images) ? item.album.images[0].url : undefined; 

                return (
                    <View style={styles.itemContainer}>
                        <HStack 
                            space={4}
                            alignItems="center"
                        >
                            <Image 
                                defaultSource={TrackDefaultImage}
                                source={{ uri: trackImage }}
                                style={styles.image}
                            /> 

                            <VStack alignItems={"flex-start"}>
                                <Text style={styles.text}>
                                    {item.name}
                                </Text>

                                <HStack space={1} alignItems="center">
                                    <ExplicitIcons />

                                    <Text style={[styles.text, { opacity: 0.6, fontSize: 12 }]}>
                                        {getArtistNameText(item.artists)}
                                    </Text>
                                </HStack>
                            </VStack>

                        </HStack>

                        <Pressable onPress={handleTrackOptions}>
                            <SimpleLineIcons name="options" size={18} style={{color: "#fff", opacity: 0.6}} />
                        </Pressable>
                    </View>
                )
            }}
            ItemSeparatorComponent={() => <ViewSeperator />}
        />
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    trackInfo: {
        alignSelf: "flex-start",
        flexGrow: 1,
        backgroundColor: "orange"
    },
    image: {
        width: 50,
        height: 54
    },
    text: {
        fontSize: 14,
        fontWeight: "600",
        color: "#fff" // use global styles kidss
    }
})