import { Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { AntDesign, Entypo, MaterialIcons } from '@expo/vector-icons';

import { ITrack } from "../../types/tracks";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppImage } from "../core/AppImage";
import { HStack, VStack } from "native-base";
import { getArtistNameText, millisToMinutesAndSeconds } from "../../utils/helper";
import { AppFavouriteIcons } from "../core/AppFavourite";
import { useState } from "react";
import { PlayerControls } from "./PlayerControls";

interface IMaxPlayer {
    track: ITrack;
    handleSetSheetIndex: (index: number) => void;
}

const screenWidth = Dimensions.get("screen").width;

export const MaxPlayer = ({ track, handleSetSheetIndex }: IMaxPlayer) => {
    const insets = useSafeAreaInsets();
    const [isFavorite, setIsFavorite] = useState(false);

    const handleIsFavorite = () => setIsFavorite((prev) => !prev);

    console.log("track type ", track.type, track.album.album_type)

    return (
        <ScrollView style={{ paddingTop: insets.top + 10, paddingHorizontal: 16 }}>
            {/* HEADER */}
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Pressable onPress={() => handleSetSheetIndex(0)}>
                    <AntDesign name="down" size={24} color="#fff" />
                </Pressable>

                <View style={{ flexGrow: 1, flexDirection: "row", justifyContent: "center" }}>
                    <Text style={styles.text}>
                        {track.artists[0].name}
                    </Text>
                </View>

                <Entypo name="dots-three-horizontal" size={24} color="#fff" />
            </View>

            {/* IMAGE */}
            <View style={{ alignItems: "center", marginVertical: 40 }}>
                <AppImage 
                    src={track.album.images[0].url}
                    dimensions={{
                        width: 300,
                        height: 320
                    }}
                    imageType={"album"}
                />
            </View>

            {/* TITLE ARTIST AND FAV ICON */}
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <VStack alignItems="flex-start" width={screenWidth - 100} space={1}>
                    <Text 
                        numberOfLines={1}
                        style={{ fontSize: 22, fontWeight: "bold", color: "#fff"}}
                    >
                        {track.name}
                    </Text>

                    <Text 
                        numberOfLines={1}
                        style={{ fontSize: 14, fontWeight: "500", color: "#fff"}}
                    >
                        {track.artists[0].name}
                    </Text>
                </VStack>

                <AppFavouriteIcons 
                    isFavorite={isFavorite}
                    handleIsFavorite={handleIsFavorite}
                />
            </View>


            {/* CONTROLS */}
            {/* PROGRESS BAR */}
            <VStack space={2} style={{ marginVertical: 30 }}>
                <View style={{height: 5, width: "100%", backgroundColor: "#fff", opacity: 0.4, borderRadius: 4 }}>
                    <View />
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={styles.text}>0:00</Text>
                    <Text style={styles.text}>-{millisToMinutesAndSeconds(track.duration_ms)}</Text>
                </View>
            </VStack>

            <PlayerControls />

            {/* DEVICES AND SHARE */}

            {/* LYRICS */}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 14,
        color: "#fff",
        opacity: 0.9,
        fontWeight: "600"
    }
})