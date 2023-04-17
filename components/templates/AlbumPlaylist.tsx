import { PropsWithChildren } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { HStack, VStack } from "native-base";
import { MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';

import { AlbumResponse } from "../../api/album/album.types";
import { getArtistNameText } from "../../utils/helper";


interface AlbumPlaylistProps extends PropsWithChildren {
    tracks: AlbumResponse['tracks']['items'];
}

type AlbumPlaylistItemProps =  AlbumPlaylistProps['tracks'][0];

const AlbumPlaylistItem = (item: AlbumPlaylistItemProps) => {
    return (
        <View style={styles.listItemContainer}>
            <VStack space={1.5}>
                <Text style={{ color: '#fff', fontSize: 14, fontWeight: '500'}}>
                    {item.name}
                </Text>
                
                <HStack alignItems='center'>
                    {item.explicit && <MaterialIcons name="explicit" size={20} style={{ color: '#fff', opacity: .5 }}/>}
                    <Text style={{ color: '#fff', fontSize: 12, fontWeight: '500', opacity: .5}}>
                        {getArtistNameText(item.artists)}
                    </Text>
                </HStack>
            </VStack>

            <Pressable onPress={() => console.log("pressed options")}>
                <SimpleLineIcons name="options" size={18} style={styles.inactiveIcon} />
            </Pressable>
        </View>
    )
}

export const AlbumPlaylist = ({ tracks }: AlbumPlaylistProps) => {
    return (
        <View>
            {tracks.map((track) => (
                <View key={track.id}>
                    <AlbumPlaylistItem {...track} /> 
                </View>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    listItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10
    },
    inactiveIcon: {
        color: '#fff',
        opacity: 0.6
    }
})