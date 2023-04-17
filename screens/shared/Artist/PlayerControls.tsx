import { HStack } from "native-base";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import { Dispatch, useState } from "react";

type ControlsProps = {
    isFollowingArtist: boolean;
    setisFollowingArtist: Dispatch<React.SetStateAction<boolean>>;
    setModalVisible: Dispatch<React.SetStateAction<boolean>>;
}

export const ArtistScreenPlayerControls = ({ 
    isFollowingArtist, setisFollowingArtist, setModalVisible 
}: ControlsProps) => {

    const handleFollowArtist = (artist: any) => {
        // add or remove artist data in cache under "favourite-artists"
        setisFollowingArtist((prev) => !prev);
    }

    return (
        <View style={styles.controls}>
            <HStack space={4} alignItems="center">
                <Pressable 
                    style={{ 
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                        borderWidth: 1,
                        borderColor: 'grey',
                        borderRadius: 20,
                        minWidth: 80,
                        alignItems: "center",
                    }}
                    onPress={() => handleFollowArtist("")}>
                    <Text 
                        style={{ 
                            color: "#fff", 
                            opacity: isFollowingArtist ? 1 : 0.8,
                            fontSize: 14,
                            fontWeight: '500'
                        }}
                    >
                        {isFollowingArtist ? "Following" : "Follow"}
                    </Text>
                </Pressable>

                <Pressable onPress={() => setModalVisible((prev) => !prev)}>
                    <SimpleLineIcons name="options" size={22} style={styles.inactiveIcon} />
                </Pressable>

            </HStack>

            <HStack alignItems="center" space={2}>
                <Ionicons name="ios-shuffle-outline" size={40} color="#57B65F" />

                <Ionicons name="play-circle-sharp" size={60} color="#57B65F" />
            </HStack>
        </View>
    )
}

const styles = StyleSheet.create({
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    inactiveIcon: {
        color: '#fff',
        opacity: 0.6
    }
})