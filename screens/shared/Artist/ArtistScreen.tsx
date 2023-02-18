import { 
    StyleSheet, 
    Text, 
    View, 
    ScrollView
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { QueryCache, useQuery } from "@tanstack/react-query";


import { ArtistScreenProps } from "./artistScreen.types";
import { getArtistTopTracks } from "../../../api/artist/ArtistsAPI";
import { ArtistTopTracks } from "./ArtistTopTracks";
import { ArtistScreenPlayerControls } from "./PlayerControls";
import { ArtistScreenBgImage } from "./ArtistScreenBgImage";
import { ArtistScreenModal } from "./ArtistScreenModal";
import { useState } from "react";


export const ArtistScreen = ({ navigation, route }: ArtistScreenProps) => {
    const [ modalVisible, setModalVisible ] = useState<boolean>(false);

    const {
        id,
        images,
        name, 
        followers,
    } = route.params;

    const queryCache = new QueryCache({
        onError: (err) => {
            console.log(err)
        },
        onSuccess(data, query) {
            console.log({ data, query })
        },
    })
    

    // const queries = queryCache.find({ queryKey: });
    // if not in cache make a requests
    const { data: topArtistTracks, isFetched, isLoading, isError } = useQuery({
        queryKey: [`${name}-top-tracks`, id],
        queryFn: () => getArtistTopTracks(id),
        cacheTime: 36000,
        select: (data) => {
            return data.tracks;
        }
    });

    if (!topArtistTracks) {
        return null;
    }

    if (isLoading) {
        <Text style={{ color: '#fff'}}>loading</Text>
    }
    // console.log(topArtistTracks[0]);

    return (
        <SafeAreaView 
            edges={["bottom"]} 
            style={[styles.container]}
        >
            <ScrollView style={{ flex: 1 }}>
                
                <ArtistScreenBgImage<ArtistScreenProps['navigation']>
                    images={images}
                    artistName={name}
                    navigation={navigation}
                />

                <View style={styles.lowerSection}>
                    <Text
                        style={{
                            color: '#fff',
                            fontSize: 14,
                            opacity: .6,
                            marginBottom: 2
                        }}
                    >
                        {followers.total.toLocaleString()} followers 
                    </Text>

                    <ArtistScreenPlayerControls setModalVisible={setModalVisible} />

                    <View style={{ marginTop: 20}}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff'}}>
                            Popular
                        </Text>
                        <ArtistTopTracks tracks={topArtistTracks} />
                    </View>
                </View>
            </ScrollView>

            <ArtistScreenModal 
                isVisible={modalVisible} 
                imageSource={images[0].url}
                artistName={name}
                onCloseModal={() => setModalVisible((prev) => !prev)}
            />
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    artistBgImage: {
        flexDirection: 'row',
        height: 300
    },
    
    lowerSection: {
        flex: .5,
        padding: 20
    },
    inactiveIcon: {
        color: '#fff',
        opacity: 0.5
    } // reuse after this commit
})