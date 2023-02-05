import { useQueries } from "@tanstack/react-query";
import { Image, Text, View } from "react-native";
import { useEffect, useState } from "react";

import { getArtistTopTracks } from "../../api/artists/ArtistsAPI";
import { IArtist } from "../../types/artist";
import { RecommendationParams } from "../../types/shared";
import { TracksResponse } from "../../types/tracks";
import AppModal from "../core/AppModal";
import { FetchingMusic } from "./FetchingMusic";
import { setItemInCache } from "../../utils/cache";


type GreatPicksModalProps = {
    selectedArtists: IArtist[];
    handleNavigation: () => void;
}

const GreatPicksModal = ({ selectedArtists, handleNavigation }: GreatPicksModalProps) => {
    const [previewed, setPreviewed ] = useState(false);

    const queriedData = useQueries({
        queries: selectedArtists.map((artist) => {
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

    const cacheSelectedArtist = (artists: IArtist[]) => {
        setItemInCache('liked-artists', artists);
    }

    useEffect(() => {
        cacheSelectedArtist(selectedArtists);

        setTimeout(() => {
            setPreviewed(true);
        }, 2000)
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
                                backgroundColor: '#121212', 
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                
                            }}
                        >
                            <View style={{ flexDirection: 'row', marginBottom: 10, justifyContent: 'center'}}>
                                {selectedArtists.map((artist, index) => {
                                    return (
                                        <View key={index} style={{ width: 40, height: 60,  }} >
                                            { index < 4 &&
                                                <Image 
                                                    source={{ uri: artist.images[0].url }} 
                                                    style={{
                                                        width: 60,
                                                        height: 60,
                                                        borderRadius: 30
                                                    }}
                                                />
                                            }
                                        </View>
                                    )
                                })}
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