import { 
    Dimensions,
    FlatList, 
    Image, 
    ListRenderItemInfo, 
    Pressable, 
    ScrollView, 
    StyleProp, 
    StyleSheet, 
    Text, 
    View, 
    ViewStyle
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { AntDesign, Feather } from '@expo/vector-icons';
import { useState } from "react";

import { LibraryScreenHeader } from "../../components"
import { ALBUM_URIS } from "../../lib/archive";
import { ArtistData } from "../../types/artist.types";

interface LikedArtistsProps extends ListRenderItemInfo<ArtistData> {
    numColumns: 1 | 2
}


const LikedArtists = ({ item, index, numColumns }: LikedArtistsProps) => {
    console.log({ numColumns })
    const { width } = Dimensions.get("window");

    
    return (
        <>
            {numColumns === 1 ? 
                (
                    <View
                        style={{
                            flexDirection: numColumns === 1 ? 'row' : 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Image 
                            source={{ uri: item.images[0].url }}
                            style={{
                                width: 70,
                                height: 70,
                                borderRadius: 45,
                            }}
                        />

                        <View style={{ marginLeft: 10}}>
                            <Text
                                style={{
                                    color: '#fff',
                                    fontSize: 14,
                                    fontWeight: 'normal',
                                }} 
                            >
                                {item.artist}
                            </Text>
                            <Text
                                style={{
                                    color: '#fff',
                                    fontSize: 12,
                                    fontWeight: 'normal',
                                    opacity: .6,
                                }} 
                            >
                                Artist
                            </Text>
                        </View>
                    </View>
                ) : 
                (
                    <View
                        style={{
                            alignItems: 'center',
                        }}
                    >
                        <Image 
                            source={{ uri: item.images[0].url }}
                            style={{
                                width: ((width / 2) - 20),
                                height: ((width / 2) - 20),
                                borderRadius: (((width / 2) - 20) / 2),
                            }}
                        />

                        <View style={{ marginTop: 6 }}>
                            <Text
                                style={{
                                    color: '#fff',
                                    fontSize: 14,
                                    fontWeight: 'normal',
                                }} 
                            >
                                {item.artist}
                            </Text>
                            <Text
                                style={{
                                    color: '#fff',
                                    fontSize: 12,
                                    fontWeight: 'normal',
                                    opacity: .6,
                                    textAlign: 'center'
                                }} 
                            >
                                Artist
                            </Text>
                        </View>
                    </View>
                ) 
            }
        </>
    )
}

const SubHeader = ({ 
    handleContentViewChange, 
}: { 
    handleContentViewChange: () => void;
}) => {
    const sortBy: string[] = ["Recents", "Recently added", "Alphabetical", "Creator"];

    return (
        <View style={styles.subHeader}>
            <Pressable 
                onPress={() => console.log("sort by?")}
                style={{ 
                        flexDirection: 'row', 
                        flex: .8,  
                        width: 30, 
                        position: 'relative', 
                        alignItems: 'center'
                    }}
                >
                <AntDesign 
                    name="arrowdown" 
                    size={18} 
                    color="#fff" 
                    style={{ 
                        position: 'absolute',
                        left: 10
                    }} 
                    />
                <AntDesign name="arrowup" size={18} color="#fff" />
                
                <Text style={{ color: '#fff', fontSize: 14, fontWeight: 'normal', marginLeft: 12}}>
                    {sortBy[0]}
                </Text>

            </Pressable>

            <Pressable
                onPress={handleContentViewChange}
            >
                <Feather name="grid" size={24} color="#fff" />
                {/* list icon */}
            </Pressable>

        </View>
    )
}

export const LibraryContentFooter = ({ numColumns }: { numColumns: 1 | 2 }) => {
    return (
        <View 
            style={{ 
                flexDirection: numColumns === 1 ? 'column' : 'row',
                marginVertical: 10 
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View 
                    style={{ 
                        backgroundColor: '#282828',
                        width: 70,
                        height: 70,
                        borderRadius: 45,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Feather name="plus" size={46} color="#B3B3B3" /> 
                </View>

                <Text
                    style={{
                        color: '#fff',
                        fontSize: 14,
                        fontWeight: 'normal',
                        marginLeft: 6
                    }} 
                > Add Artists</Text>
            </View>

            <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                <View
                    style={{
                        backgroundColor: '#282828',
                        width: 70,
                        height: 70,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Feather name="plus" size={46} color="#B3B3B3" /> 
                </View>

                <Text
                    style={{
                        color: '#fff',
                        fontSize: 14,
                        fontWeight: 'normal',
                        marginLeft: 6
                    }} 
                >Add podcasts and shows</Text>
            </View>
        </View>
    )
}


export const YourLibraryScreen = () => {
    const [ numColumns, setNumColumns ] = useState<1 | 2>(1);

    let columnWrapperStyle: StyleProp<ViewStyle> = {
        justifyContent: 'space-between',
        flexDirection: 'row'
    };

    const handleContentViewChange = () => {
        setNumColumns((prev) => prev === 1 ? 2 : 1);
    }

    return (
        <SafeAreaView style={styles.container} edges={["top"]}>
            <LibraryScreenHeader />

            <FlatList 
                ListHeaderComponent={
                    <SubHeader 
                        handleContentViewChange={handleContentViewChange} 
                    />
                }
                ListHeaderComponentStyle={{
                    paddingVertical: 10
                }}
                data={ALBUM_URIS}
                renderItem={(props) => <LikedArtists {...props} numColumns={numColumns} />}
                contentContainerStyle={[
                    styles.contentContainer,
                    {
                        // backgroundColor: 'red'
                        
                    }
                ]}
                ItemSeparatorComponent={() => <View style={{ height: 20}} />}
                numColumns={numColumns}
                key={numColumns}
                // keyExtractor={(item) => item.albumId}
                style={{
                    flex: 0.8
                }}
                {...(numColumns === 2 && { columnWrapperStyle  })}
                ListFooterComponent={<LibraryContentFooter numColumns={numColumns} />}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'red'
    },
    contentContainer: {
        paddingHorizontal: 8,
        paddingTop: 10
    },
    subHeader: {
        // backgroundColor: 'red',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})