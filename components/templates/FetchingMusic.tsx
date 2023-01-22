import { useEffect} from 'react';
import { useQueries, UseQueryResult } from "@tanstack/react-query";
import { Text, View } from "react-native";

import { getRecommendations } from "../../api/browse/BrowseAPI";
import { RecommendationParams } from "../../types/shared";


type FetchingMusicProps = {
    queriedData: UseQueryResult<RecommendationParams | null>[];
    handleNavigation: () => void;
}

export const FetchingMusic = ({ queriedData, handleNavigation }: FetchingMusicProps) => {
    const queries2 = useQueries({
        queries: queriedData.map((qd) => {
            const genres = qd.data?.genres!;
            const tracksId = qd.data?.tracksId!;
            const artistId = qd.data?.artistId!;

            return {
                queryKey: [genres[0]],
                queryFn: () => getRecommendations({ genres, tracksId, artistId })
            }
        })
    })

    queries2.forEach((query) => console.log(query.isFetching))

    const allSuccessful = queries2.every((elem) => elem.data !== undefined);

    useEffect(() => {
        let mounted = true;

        if (mounted) handleNavigation();

        return () => { mounted = false };
    }, [allSuccessful]);

    if (!allSuccessful) {
        return (
            <View
                style={{ 
                    backgroundColor: '#121212', 
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    
                }}
            >
                <Text style={{ color: '#fff', fontSize: 26, fontWeight: '500' }}>
                    Fetching Music...
                </Text>
            </View>
        )
    }

    return null;
}