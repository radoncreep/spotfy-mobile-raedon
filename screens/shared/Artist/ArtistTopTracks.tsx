import { useCallback, useState } from "react";
import { HStack, VStack } from "native-base";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';

import { AppImage, ExplicitIcons } from "../../../components";
import { TracksResponse } from "../../../types/tracks";
import { ArtistScreenProps } from "./artistScreen.types";


interface ArtistTopTracksProps {
    tracks: TracksResponse['tracks']
}


export const ArtistTopTracks = (
    { tracks, 
        // navigation, route 
    }: ArtistTopTracksProps
) => {
    const [favorites, setFavorites] = useState<string[]>([]);
    const [playing, setPlaying] = useState<string>("");

    console.log({ favorites })

    const handleSelectedAsFavourite = (id: string) => {
        setFavorites((prevState) => {
            const filter = prevState.includes(id) ? 
                prevState.filter((prevId) => prevId !== id) : [...prevState, id];

            return filter;
        })
    }

    const handleNumberOfListens = useCallback((popularity: number) => {
        return (Math.floor(Math.random() * popularity * 1000)).toLocaleString();
    }, []);

    const handlePlayTrack = (trackId: string) => {
        // more to be done here - probably using toolkit to manage player state
        setPlaying(trackId);
    }

    return (
        <View style={styles.container}>
            {tracks.map((track, index) => (
                <Pressable 
                    onPress={() => {
                        handlePlayTrack(track.id)
                    }}
                    key={track.id}
                >
                    <HStack space={2} alignItems="center" mt={2.5}>
                        <View style={{ width: 20 }}>
                            <Text style={styles.textStyles}>{index+1}</Text>
                        </View>

                        <AppImage 
                            src={track.album.images[0].url}
                            imageType="album"
                        />

                        <VStack alignItems="flex-start" flex={1}>
                            <Text  
                                style={{
                                    color: playing === track.id ? "#57B65F" : "#fff",
                                }}
                            >
                                {playing === track.id && "..."} 
                                {track.name} {" "}
                            </Text>

                            <HStack space={2}>
                                {track.explicit && <ExplicitIcons />}

                                <Text style={styles.textStyles}>
                                    {handleNumberOfListens(track.popularity)}
                                </Text>
                            </HStack>
                        </VStack>                    

                        {/* favourite icon */}
                        <Pressable 
                            onPress={() => handleSelectedAsFavourite(track.id)}
                        >
                            {!favorites.includes(track.id) ? (
                                <MaterialIcons 
                                    name="favorite-outline" 
                                    size={24} 
                                    style={styles.inactiveIcon} 
                                />
                            ): (
                                <MaterialIcons 
                                    name="favorite" 
                                    size={24} 
                                    color='#57B65F'
                                />
                            )}
                        </Pressable>

                        <Pressable onPress={() => console.log("pressed options")}>
                            <SimpleLineIcons name="options" size={22} style={styles.inactiveIcon} />
                        </Pressable>

                        {/* options icon */}
                    </HStack>
                </Pressable>

            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // flexDirection: 'row',
        // justifyContent: 'space-evenly'
    },
    textStyles: {
        fontSize: 12,
        color: '#fff',
        fontWeight: '500',
        textAlign: 'left'
    },
    inactiveIcon: {
        color: '#fff',
        opacity: 0.6
    }
})