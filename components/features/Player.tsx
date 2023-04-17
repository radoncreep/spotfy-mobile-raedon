import { useEffect, useMemo, useRef, useState } from 'react';
import { Dimensions, Pressable, StyleSheet, View } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

import { useImageColor } from '../../hooks/useImageColor';
import { useAppSelector } from '../../store/hooks';
import { MaxPlayer } from './MaxPlayer';
import { MiniPlayer } from './MiniPlayer';


const screenHeight = Dimensions.get("screen").height;

export const Player = () => {
    const { 
        currentTrackIndex, 
        playlistType, 
        tracks
    } = useAppSelector((state) => state.player);

    const currentTrack = tracks[currentTrackIndex];
    console.log(currentTrack)
    const artistImage = currentTrack.album.images[0].url;
    
    const colors = useImageColor(artistImage);
    // console.log(Object.values(colors).map((val) => val.value));

    const sheetRef = useRef<BottomSheet>(null);
    const [sheetIndex, setSheetIndex] = useState<number>(0);

    const maxPoint = screenHeight;

    const snapPoints = useMemo(() => [60, maxPoint], []);

    useEffect(() => {
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
        paddingTop: 6,
        alignItems: "center"
    },
    iconStyle: {
        fontSize: 22,
        color: "#fff",
    }
})