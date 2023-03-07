import { useEffect, useMemo, useRef, useState } from 'react';
import { Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { HStack, VStack } from 'native-base';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

import DefaultTrackImage from "../../assets/images/albumDefaultImage.png";
import { getArtistNameText, isEmpty } from '../../utils/helper';
import { ArtistAsItem } from '../../types/artist';
import { useImageColor } from '../../hooks/useImageColor';
import { useAppSelector } from '../../store/hooks';
import { ITrack } from '../../types/tracks';
import { MaxPlayer } from './MaxPlayer';


const screenHeight = Dimensions.get("screen").height;
console.log({ screenHeight });

const MiniPlayer = ({ track }: { track: ITrack }) => {
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
    const { currentTrackIndex, playlistType, tracks} = useAppSelector((state) => state.player);
    const currentTrack = tracks[currentTrackIndex];
    const artistImage = currentTrack.album.images[0].url;
    
    const colors = useImageColor(artistImage);
    console.log(Object.values(colors).map((val) => val.value));

    const sheetRef = useRef<BottomSheet>(null);
    const [sheetIndex, setSheetIndex] = useState<number>(0);

    console.log({ sheetIndex })

    // console.log({ colors })
    const maxPoint = screenHeight - 100;

    const snapPoints = useMemo(() => [80, maxPoint], []);

    useEffect(() => {
        console.log("sheet ref changed")
        sheetRef.current?.snapToIndex(sheetIndex);
    }, [sheetIndex])

    const handleSetSheetIndex = (index: number) => {
        setSheetIndex(index);
    }

    return (
        <BottomSheet 
            ref={sheetRef}
            snapPoints={snapPoints}
            index={0}
            detached={true}
            bottomInset={90}
            backgroundStyle={{
                borderRadius: 20,
            }}
            // handleHeight={}
            handleComponent={() => <></>}
            onChange={handleSetSheetIndex}
        >
            {sheetIndex === 0 && 
                <Pressable 
                    onPress={() => handleSetSheetIndex(1)}
                    style={[styles.contentMini, { backgroundColor: colors.colorFour.value || "#515357" }]}
                >
                    <MiniPlayer track={currentTrack} />
                </Pressable>
            }  

            {sheetIndex === 1 && 
                <View style={[styles.contentMax, { 
                    backgroundColor: colors.colorOne.value || "#515357", 
                    // paddingTop: 
                }]}>
                    <MaxPlayer track={currentTrack} handleSetSheetIndex={handleSetSheetIndex} />
                </View>
            }
        </BottomSheet>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    contentMax: {
        flex: 1,
    },
    contentMini: {
        flex: 1,
        justifyContent: "flex-start",
        paddingHorizontal: 10,
        paddingTop: 10,
        alignItems: "center"
    },
    iconStyle: {
        fontSize: 32,
        color: "#fff",
    }
})