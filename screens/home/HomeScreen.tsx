import { useQuery } from "@tanstack/react-query";
import { HStack, VStack } from "native-base";
import { FlatList, Image, ListRenderItemInfo, ScrollView, SectionList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Artist, NewReleaseAlbums, NewReleaseItem } from "../../api/browse/browse.types";
import { getNewReleases } from "../../api/browse/BrowseAPI";

import { HomeScreenHeader } from "../../components";
import { Markets } from "../../types/markets";



const FlatListItem = ({ index, item }: ListRenderItemInfo<NewReleaseItem>) => {
    // console.log('item')
    let imageProp = {
        url: item.images[1].url,
        width: item.images[2].width,
        height: item.images[2].height
    }

    const getArtistsString = (artists: Artist[]) => {
        let artistNames = artists.map((artist) => artist.name);

        return artistNames.join(", ");
    }

    const firstCharToUpper = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    return (
        <VStack space={2} maxWidth={140}>
            <Image 
                source={{ uri: imageProp.url }}
                style={{
                    width: 140,
                    height: 150
                }}
            />

            <View style={{ }}>
                <Text style={{ fontSize: 14, fontWeight: '500', color: '#fff' }}>
                    {item.name}
                </Text>
                
                <View style={{ flexDirection: 'row', alignItems: 'center', maxWidth: '100%', overflow: 'hidden' }}>
                    <Text style={{ fontSize: 12, fontWeight: '500', color: 'grey' }}>
                        {firstCharToUpper(item.album_type)}{' '}

                        <View >
                            <Text style={{ color: 'grey', fontSize: 4 }}>{'\u2B24'}</Text>
                        </View>

                        <Text style={{ fontSize: 12, fontWeight: '500', color: 'grey' }} numberOfLines={3} >
                            {' '}{getArtistsString(item.artists)}
                        </Text>
                    </Text>
                </View>
            </View>
        </VStack>
    )
}

export const HomeScreen = () => {

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

   // isLoading will be used to render some skeleton or placeholder som sh$% like that

    return (
        <SafeAreaView style={styles.container} edges={["top"]}>
            {!isLoading ? (
                <ScrollView>
                    <HomeScreenHeader />

                    <View style={{ marginVertical: 20 }}>
                        <View>
                            <Text style={{ color: '#fff', fontSize: 26, fontWeight: '600'}}>Popular New Releases</Text>
                        </View>
                        <FlatList 
                            // ListHeaderComponent={() => (
                            //     <View>
                            //     <Text style={{ color: '#fff', fontSize: 20}}>Popular New Releases</Text>
                            // </View>
                            // )}
                            data={data}
                            renderItem={((props) => <FlatListItem {...props} />)}
                            horizontal={true}
                            ItemSeparatorComponent={() => <View style={{ width: 14}} /> }
                            style={{
                                // flexDirection: 'column'
                                flexWrap: 'nowrap'
                            }}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{
                                marginVertical: 20,
                                // backgroundColor: 'red',
                                alignItems: 'flex-start'
                            }}
                            keyExtractor={({ id }) => id}
                        />
                    </View>
                </ScrollView>
            ) : 
            (
                <Text style={{ color: '#fff'}}>loading</Text>
            )}
            
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 12,
        paddingTop: 2,
    },
})