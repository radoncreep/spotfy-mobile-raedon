import { useEffect, useMemo, useRef } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { HStack, VStack } from 'native-base';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

import DefaultTrackImage from "../../assets/images/albumDefaultImage.png";
import { getArtistNameText, isEmpty } from '../../utils/helper';
import { ArtistAsItem } from '../../types/artist';
import { useImageColor } from '../../hooks/useImageColor';
import { useAppSelector } from '../../store/hooks';
import { ITrack } from '../../types/tracks';


const MiniPlayer = ({ track }: { track: ITrack }) => {
    const isPlaying = true;
    const artists = [{ name: "Drake" }, { name: "21 Savage" }] as unknown as ArtistAsItem;
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
                    width: 50,
                    height: 55,
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
                <MaterialIcons name="devices-other" size={40} style={{ color: "#fff", opacity: 0.6 }}  />

                {isPlaying ? 
                    <FontAwesome name="play" style={styles.iconStyle} />
                    :
                    <FontAwesome name="pause" style={styles.iconStyle} />
                }
            </HStack>
        </View>
    )
}

export const Player = () => {
    const tracks = useAppSelector((state) => state.player.tracks);
    const sheetRef = useRef<BottomSheet>(null);
    // const artistImage = "https://i.scdn.co/image/ab67616d00001e02f907de96b9a4fbc04accc0d5";

    const currentTrack = tracks[0];
    const artistImage = currentTrack.album.images[0].url;
    

    const colors = useImageColor(artistImage);
    // console.log({ colors })

    const snapPoints = useMemo(() => [20, 80], []);

    return (
        <BottomSheet 
            ref={sheetRef}
            snapPoints={snapPoints}
            index={1}
            detached={true}
            bottomInset={90}
            backgroundStyle={{
                borderRadius: 20,
            }}
            // handleHeight={100}
            handleComponent={() => <></>}
        >
            <View style={[styles.contentContainer, { backgroundColor: colors.colorFour.value || "#515357" }]}>
                <MiniPlayer track={currentTrack} />
            </View>
        </BottomSheet>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: "transparent",
        // borderRadius: 14,
        // overflow: "hidden",
    },
    contentContainer: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 10,
        
    },
    iconStyle: {
        fontSize: 32,
        color: "#fff",
    }
})