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
    
    return (
        <View
            style={{
                flexDirection: numColumns === 1 ? 'row' : 'column',
                alignItems: 'center',
                // backgroundColor: 'red',
                flex: 1,
                height: 170,
                padding: 10
            }}
        >
            {/* Image */}
            <Image 
                source={{ uri: item.images[0].url }}
                style={{
                    // flex: 1,
                    width: numColumns === 1 ? 70 : '100%',
                    height: numColumns === 1 ? 70 : '100%',
                    borderRadius: numColumns === 1 ? 45 : 100,
                    marginRight: 10
                }}
            />
            {/* artist name */}
            <View style={{ alignItems: 'center'}}>
                <Text
                    style={{
                        color: '#fff',
                        fontSize: 16,
                        fontWeight: 'normal'
                    }} 
                >
                    {item.artist}
                </Text>
                <Text
                    style={{
                        color: '#fff',
                        fontSize: 14,
                        fontWeight: 'normal',
                        opacity: .6
                    }} 
                >
                    Artist
                </Text>
            </View>
        </View>
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
                        // backgroundColor: 'green',  
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


export const YourLibraryScreen = () => {
    const [ numColumns, setNumColumns ] = useState<1 | 2>(1);
    const { width, height }= Dimensions.get("window");

    let columnWrapperStyle: StyleProp<ViewStyle> = {
        borderColor: 'green',
        borderWidth: 1, 
        flexDirection: 'row',
        // height: '25%'
    }

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
                style={{
                    flex: 0.8
                }}
                {...(numColumns === 2 && { columnWrapperStyle  })}
                
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