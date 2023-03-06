import { useEffect, useMemo, useRef } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { HStack, VStack } from 'native-base';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

import DefaultTrackImage from "../../assets/images/albumDefaultImage.png";
import { getArtistNameText } from '../../utils/helper';
import { ArtistAsItem } from '../../types/artist';
import { useImageColor } from '../../hooks/useImageColor';


const MiniPlayer = ({ artistImage }: { artistImage: string }) => {
    const isPlaying = true;
    const artists = [{ name: "Drake" }, { name: "21 Savage" }] as unknown as ArtistAsItem;

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
                source={{ uri: artistImage }}
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
                    numberOfLines={1}>
                    Headlineseprogrejgopejgpoerjgpoerjpgerjgpoejgpoejrgpojepogjerpjgegeoprjgpoerjgoperjg
                </Text>

                {/* ARTISTE AND FEATURES */}
                <Text style={{ color: "#fff", fontSize: 14, fontWeight: "500", opacity: 0.8 }}>
                    {/* {getArtistNameText(artists)} */}
                    Drake, 21 Savage
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
    const sheetRef = useRef<BottomSheet>(null);
    // const artistImage = "https://i.scdn.co/image/ab67616d00001e02f907de96b9a4fbc04accc0d5";
    const artistImage = "https://i.scdn.co/image/ab67616d00001e022887f8c05b5a9f1cb105be29";
    

    const colors = useImageColor(artistImage);
    console.log({ colors })

    const snapPoints = useMemo(() => ['20%', '50%'], []);

    return (
        // <View style={styles.container}>
            <BottomSheet 
                ref={sheetRef}
                snapPoints={[20, 80]}
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
                    <MiniPlayer artistImage={artistImage} />
                </View>
            </BottomSheet>
        // </View>
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