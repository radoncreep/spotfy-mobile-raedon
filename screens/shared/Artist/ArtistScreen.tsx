import { 
    Image, 
    ImageBackground, 
    StyleSheet, 
    Text, 
    View, 
    ScrollView, 
    Pressable 
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather, Ionicons, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';


import { ArtistScreenProps } from "./artistScreen.types";
import { QueryCache, useQuery } from "@tanstack/react-query";
import { HStack } from "native-base";
import { getArtistTopTracks } from "../../../api/artist/ArtistsAPI";
import { ArtistTopTracks } from "./ArtistTopTracks";
import ArtistDefaultImage from "../../../assets/images/artistDefaultImage.jpg";


export const ArtistScreen = ({ navigation, route }: ArtistScreenProps) => {
    const insets = useSafeAreaInsets();
    const [isFollowingArtist, setisFollowingArtist] = useState<boolean>(false);

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

    const handleFollowArtist = (artist: any) => {
        // add or remove artist data in cache under "favourite-artists"
        setisFollowingArtist((prev) => !prev);
    }
    
    const goBack = () => navigation.goBack();

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
                <ImageBackground 
                    source={{ uri: images[0].url }}
                    defaultSource={ArtistDefaultImage}
                    resizeMode={"cover"}
                    style={[
                        styles.artistBgImage, 
                        { paddingTop: insets.top + 10}
                    ]}
                >
                    <View 
                        style={{ 
                            flex: 1, 
                            paddingHorizontal: 20,
                            paddingBottom: 10
                        }}
                    >
                        <Pressable 
                            onPress={goBack}
                            style={{ 
                                backgroundColor: '#000', 
                                opacity: .6, 
                                width: 32, 
                                height: 32, 
                                borderRadius: 16,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <Feather name="chevron-left" size={28} color="#fff"  />
                        </Pressable>

                        <Text 
                            style={{ 
                                fontSize: 54, 
                                fontWeight: 'bold', 
                                color: '#fff',
                                marginTop: "auto"
                            }}>
                                {name} 
                        </Text>
                    </View>
                </ImageBackground>

                {/* Lower section */}
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

                    {/* Controls and Info */}
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

                            <Pressable onPress={() => handleFollowArtist("")}>
                                <SimpleLineIcons name="options" size={22} style={styles.inactiveIcon} />
                            </Pressable>

                        </HStack>

                        <HStack alignItems="center" space={2}>
                            <Ionicons name="ios-shuffle-outline" size={40} color="#57B65F" />

                            <Ionicons name="play-circle-sharp" size={60} color="#57B65F" />
                        </HStack>
                    </View>

                    {/* Tracks View */}
                    <View style={{ marginTop: 20}}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff'}}>
                            Popular
                        </Text>
                        <ArtistTopTracks tracks={topArtistTracks} />
                    </View>
                </View>
            </ScrollView>
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
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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