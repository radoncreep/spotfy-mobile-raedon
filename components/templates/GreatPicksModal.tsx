import { useQueries } from "@tanstack/react-query";
import { Image, Text, View } from "react-native";
import { useEffect, useState } from "react";

import { getArtistTopTracks } from "../../api/artist/ArtistsAPI";
import { IArtist } from "../../types/artist";
import { RecommendationParams } from "../../types/shared";
import { TracksResponse } from "../../types/tracks";
import AppModal from "../core/AppModal";
import { FetchingMusic } from "./FetchingMusic";


type GreatPicksModalProps = {
    pickedArtists: IArtist[];
    handleNavigation: () => void;
}

const GreatPicksModal = ({ pickedArtists, handleNavigation }: GreatPicksModalProps) => {
    const [previewed, setPreviewed ] = useState(false);

    const queriedData = useQueries({
        queries: pickedArtists.map((artist) => {
            return {
                queryKey: ['artist', artist.id],
                queryFn: () => getArtistTopTracks(artist.id),
                select: (data: TracksResponse): RecommendationParams | null => {
                    if (!data) return null;

                    let trackIds: string[] = data.tracks.map((track) => track.id);

                    return {
                        tracksId: trackIds,
                        artistId: artist.id,
                        genres: artist.genres,
                        frequency: 0
                    }
                },
                cacheTime: 300000,
                enabled: previewed
            }
        })
    });

   
    let allSuccessful = queriedData.every((elem) => elem.data !== undefined);

    useEffect(() => {
        setTimeout(() => {
            setPreviewed(false);
        }, 1000);
    }, []); 

    return (
        <AppModal 
            animationType="slide"
            transparent={false}
            isVisible={true}
        >
                {!allSuccessful ? 
                    (
                        <View 
                            style={{ 
                                backgroundColor: 'red', 
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <View style={{ flexDirection: 'row', marginBottom: 10, justifyContent: 'center'}}>
                                {pickedArtists.slice(0, Math.min(pickedArtists.length, 4)).map((artist, index) => {
                                    return (
                                        <View key={index} style={{ width: 40, height: 60,  }} >
                                            <Image 
                                                source={{ uri: artist.images[0].url }} 
                                                style={{
                                                    width: 60,
                                                    height: 60,
                                                    borderRadius: 30
                                                }}
                                            />
                                        </View>
                                    )
                                })}

                                {pickedArtists.length > 4 && (
                                    <View style={{ paddingLeft: 20}}>
                                        <Text style={{ color: "#fff", fontSize: 30, opacity: 0.8}}>....</Text>
                                    </View>
                                )}
                            </View>
                            
                            <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>Great Picks!</Text>
                        </View>
                    ) : (
                        <FetchingMusic 
                            queriedData={queriedData} 
                            handleNavigation={handleNavigation}  
                        />
                    )
                }
        </AppModal>
    )
}

export default GreatPicksModal;