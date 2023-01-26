import { PropsWithChildren } from "react";
import { FlatList, ListRenderItemInfo, StyleSheet, Text, View } from "react-native";

import { AlbumResponse } from "../../api/album/album.types";
import { VStack } from "native-base";


interface AlbumPlaylistProps extends PropsWithChildren {
    tracks: AlbumResponse['tracks']['items'];
}

type AlbumPlaylistItemProps =  ListRenderItemInfo<AlbumPlaylistProps['tracks'][0]>;

const AlbumPlaylistItem = ({ index, item }: AlbumPlaylistItemProps) => {
    return (
        <View style={styles.listItemContainer}>
            <VStack space={1.5}>
                <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold'}}>
                    {item.name}
                </Text>
            </VStack>
        </View>
    )
}

export const AlbumPlaylist = ({ tracks }: AlbumPlaylistProps) => {

    return (
        <View>
            <FlatList 
                data={tracks}
                renderItem={(props) => <AlbumPlaylistItem {...props} />}
                scrollEnabled={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    listItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})