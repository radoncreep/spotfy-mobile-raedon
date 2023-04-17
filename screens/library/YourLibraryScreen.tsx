import { 
    FlatList, 
    Pressable, 
    StyleProp, 
    StyleSheet, 
    Text, 
    View, 
    ViewStyle
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useCallback, useState } from "react";

import { LibraryScreenHeader } from "../../components"
import { ALBUM_URIS } from "../../lib/archive";
import { LikedArtists } from "./LikedArtists.component";
import {ListHeader} from "./LibraryHeader";
import { LibraryListFooter } from "./ListFooter";


export const YourLibraryScreen = () => {
    const [ numColumns, setNumColumns ] = useState<1 | 2>(1);

    let columnWrapperStyle: StyleProp<ViewStyle> = {
        justifyContent: 'space-between',
        flexDirection: 'row'
    };

    const handleContentViewChange = useCallback(() => {
        setNumColumns((prev) => prev === 1 ? 2 : 1);
    }, []);

    return (
        <SafeAreaView style={styles.container} edges={["top"]}>
            <LibraryScreenHeader />
           
            <FlatList 
                data={ALBUM_URIS}
                contentContainerStyle={[styles.contentContainer]}
                numColumns={numColumns}
                key={numColumns}
                // keyExtractor={(item) => item.albumId}
                style={{
                    flex: 0.8
                }}
                {...(numColumns === 2 && { columnWrapperStyle  })}
                ListHeaderComponent={
                    <ListHeader 
                        handleContentViewChange={handleContentViewChange} 
                    />
                }
                ListHeaderComponentStyle={{
                    paddingVertical: 10
                }}
                ItemSeparatorComponent={() => <View style={{ height: 20}} />}
                renderItem={(props) => <LikedArtists {...props} numColumns={numColumns} />}
                ListFooterComponent={<LibraryListFooter numColumns={numColumns} />}
            />
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        paddingHorizontal: 8,
        paddingTop: 10
    },
    subHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})