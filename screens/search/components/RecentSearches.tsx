import { HStack, VStack } from "native-base";
import { FlatList, Image, ListRenderItemInfo, Pressable, StyleSheet, Text, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';

import ArtistDefaultImage from "../../../assets/images/artistDefaultImage.jpg";

type DumProps = {
    id: string,
    type: string,
    data: {
        name: string,
        imageUrl: string
    }
}

type SearchItemProps = ListRenderItemInfo<DumProps>;

const SearchItem = ({ index, item }: SearchItemProps) => {
    return (
        <View style={styles.itemContainer}>
            <HStack space={4} alignItems="center">
                <Image 
                    defaultSource={ArtistDefaultImage}
                    source={{ uri: item.data.imageUrl }}
                    style={{
                        width: 50,
                        height: 50,
                        borderRadius: 25
                    }}
                />

                <VStack space={1}>
                    <Text style={{ fontSize: 16, fontWeight: "600", color: "#fff"}}>
                        {item.data.name}
                    </Text>

                    <Text style={{ fontSize: 14, fontWeight: "400", color: "#fff", opacity: 0.6}}>
                        {item.type}
                    </Text>
                </VStack>
            </HStack>

            <AntDesign name="close" size={20} color="#B3B3B3" />
        </View>
    )
}

export const BrowseRecentSearches = () => {
    console.log("recent searches")

    // data gotten from cache
    const recentSearches: DumProps[] = [
        {
            id: "rongier",
            type: "Artist",
            data: {
                name: "Rema",
                imageUrl: "https://i.scdn.co/image/ab6761610000e5ebb193cbc1a9e1d99437b20364"
            }
        },
        {
            id: "reofierhf",
            type: "Artist",
            data: {
                name: "Ruger",
                imageUrl: "https://i.scdn.co/image/ab6761610000e5eb911b942eeb2b38302e7c76a8"
            }
        }
    ];


    const handleClearRecentSearches = () => {
        // clear search from cache
        console.log("cleared recent searches");
    }

    return (
        <FlatList 
            data={recentSearches}
            renderItem={(props) => <SearchItem {...props} />}
            contentContainerStyle={{
                // marginVertical: 20
            }}
            ListHeaderComponent={() => (
                <View style={{ marginVertical: 20 }}>
                    <Text style={{ fontSize: 18, color: "#fff", fontWeight: "500"}}>
                        Recent searches
                    </Text>
                </View>
            )}
            ListFooterComponent={() => (
                <Pressable 
                    onPress={handleClearRecentSearches}
                    style={{
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                        borderRadius: 20,
                        alignSelf: "center",
                        marginVertical: 20,
                        borderWidth: 1,
                        borderColor: "#fff"
                    }}
                >
                    <Text style={{ color: "#fff", fontSize: 12 }}>
                        Clear recent searches
                    </Text>
                </Pressable >
            )}
        />
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 6
    }
})