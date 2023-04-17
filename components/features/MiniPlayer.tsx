import { Image, StyleSheet, Text, View } from 'react-native';
import { HStack, VStack } from 'native-base';


import DefaultTrackImage from "../../assets/images/albumDefaultImage.png";
import { getArtistNameText, isEmpty } from '../../utils/helper';
import { ITrack } from '../../types/tracks';
import { AppPausePlayIcon } from '../core/AppPausePlay';
import { AppDeviceIcon } from '../core/AppDevicesIcon';


export const MiniPlayer = ({ track }: { track: ITrack }) => {
    const isPlaying = true;
    const trackImages = track.album.images;

    return (
        <View
            style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <Image 
                defaultSource={DefaultTrackImage}
                source={{ uri: !isEmpty(trackImages) ? trackImages[0].url : undefined }}
                style={{
                    width: 40,
                    height: 40,
                    borderRadius: 4
                }}
            />

            <VStack space={1} flexGrow={1} paddingX={4} width={100}>
                {/* SONG TITLE */}
                <Text 
                    style={{ 
                        color: "#fff", 
                        fontSize: 14, 
                        overflow: "hidden",
                        fontWeight: "600" 
                    }} 
                    numberOfLines={1}
                >
                    {track.name}
                </Text>

                {/* ARTISTE AND FEATURES */}
                <Text 
                    style={{ color: "#fff", fontSize: 14, fontWeight: "500", opacity: 0.8 }}
                    numberOfLines={1}
                >
                    {getArtistNameText(track.artists)}
                </Text>
            </VStack>

            <HStack space={6} style={{ marginRight: 6, padding: 8 }} alignItems="center">
                <AppDeviceIcon />

                <AppPausePlayIcon isPlaying={isPlaying} />
            </HStack>
        </View>
    )
}

const styles = StyleSheet.create({
    contentMini: {
        flex: 1,
        justifyContent: "flex-start",
        paddingHorizontal: 10,
        paddingTop: 6,
        alignItems: "center"
    },
    iconStyle: {
        fontSize: 22,
        color: "#fff",
    }
})