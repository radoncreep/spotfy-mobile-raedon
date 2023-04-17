import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Image, ImageBackground, StyleSheet, Text, View, ScrollView, Pressable, Platform } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather, Ionicons, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';


import { useImageColor } from "../../../hooks/useImageColor";
import { firstCharToUpper, getMonthName } from "../../../utils/helper";
import { HStack, VStack } from "native-base";
import { useQuery } from "@tanstack/react-query";
import { getArtist } from "../../../api/artist/ArtistsAPI";
import { getAlbum } from "../../../api/album/albumAPI";
import { AlbumPlaylist } from "../../../components";
import { HomeNavigationParamList } from "../../../navigation/home/home.navigation.types";
import { AppFavouriteIcons } from "../../../components/core/AppFavourite";



export const AlbumScreen = ({ navigation, route }: 
    NativeStackScreenProps<HomeNavigationParamList, 'AlbumScreen'>
) => {
    const insets = useSafeAreaInsets();
    const [ isFavorite, setIsFavorite ] = useState(false);

    const { 
        name, 
        artists, 
        images, 
        release_date, 
        album_type,
        id: albumId
    } = route.params;
    const contentImage = images[0];
    const [release_year, release_month, release_day] = release_date.split('-');
    const mainArtist = artists[0];

    const { data: artistImage, isLoading, error} = useQuery({
        queryKey: [`${mainArtist.name}-image`],
        queryFn: () => getArtist(mainArtist.id),
        select: (data) => {
            return data.images[0].url;
        },
        // cacheTime: 0,
        enabled: true
    })

    const { data: album, isLoading: isLoadingAlbum, error: albumFetchError} = useQuery({
        queryKey: ['album', { albumId }],
        queryFn: () => getAlbum(albumId),
        // cacheTime: 0,
        enabled: true
    })

    const handleIsFavorite = () => setIsFavorite((prev) => !prev);

    return (
        <SafeAreaView 
            style={styles.container} 
            edges={['right', 'left', ]} 
        >
            <ScrollView>
                <LinearGradient
                    colors={['orange', '#121212']}
                    locations={[0, 0.55]}
                    style={[styles.gradient_container, { paddingTop: insets.top + 20 }]}
                >
                    <View style={styles.imageContainer}>
                        <Pressable 
                            onPress={() => navigation.goBack() }
                            style={{ flex: 0.1, top: -5 }}
                        >
                            <Feather name="chevron-left" size={30} color="#fff"  />
                        </Pressable>

                        {/* USE FALLBACK IMAGE IF IMAGE HASNT LOADED */}
                        <View 
                            style={{ 
                                alignItems: 'center', 
                                flex: 0.8, 
                                shadowColor: '#121212', 
                                shadowOpacity: 1, 
                                shadowOffset: { width: 0, height: 8}, 
                                shadowRadius: 10,
                                marginBottom: 20
                            }}
                        >
                            <Image 
                                source={{ uri: contentImage.url }} 
                                style={{
                                    width: 260,
                                    height: 260,
                                }}
                            />
                        </View>
                    </View>
                        
                    <View style={{ paddingHorizontal: 10, flex: 1 }}>
                        <VStack  space={1.5}>
                            <Text style={{ fontSize: 24, fontWeight: "bold", color: '#fff'}}>{name}</Text>
                            
                            <HStack alignItems='center' style={{ alignSelf: 'flex-start'}} space={2}>
                                { artistImage && 
                                    <Image 
                                        source={{ uri: artistImage }} 
                                        style={{ width: 20, height: 20, borderRadius: 30 }}
                                    /> 
                                }

                                <Text style={{ fontSize: 12, fontWeight: "bold", color: '#fff'}}>{mainArtist.name}</Text>
                            </HStack>

                            <Text style={{ fontSize: 12, fontWeight: '500', color: '#fff', opacity: .6 }}>
                                {firstCharToUpper(album_type)}{' '}

                                <View >
                                    <Text style={{ color: '#fff', opacity: .6, fontSize: 5 }}>{'\u2B24'}</Text>
                                </View>

                                <Text>{' '}{release_year}</Text>
                            </Text>
                        </VStack>

                        {/* Tracks controls */}
                        <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center', justifyContent: 'space-between' }}>
                            <HStack space="1.5">
                                <AppFavouriteIcons
                                    isFavorite={isFavorite}
                                    handleIsFavorite={handleIsFavorite}
                                />

                                <Pressable onPress={() => console.log("pressed options")}>
                                    <SimpleLineIcons name="options" size={22} style={styles.inactiveIcon} />
                                </Pressable>
                            </HStack>

                            <HStack alignItems="center" space={2}>
                                <Ionicons name="ios-shuffle-outline" size={30} color="#57B65F" />

                                <Ionicons name="play-circle-sharp" size={48} color="#57B65F" />
                            </HStack>
                        </View>

                        {/* Tracks list */}
                        {album && (
                            <AlbumPlaylist tracks={album.tracks.items} />
                        )}

                        {/*release date */}
                        <View style={{ marginVertical: 30, alignSelf: 'flex-start', paddingHorizontal: 10 }}>
                            <Text 
                                style={{ fontSize: 12, fontWeight: '600', color: '#fff', opacity: .9 }}
                            >
                                {`${getMonthName(release_month, Platform.OS)} ${release_day}, ${release_year}`}
                            </Text>
                        </View>

                        {/* profile image and name*/}
                        <HStack space={2} alignItems="center">
                            <Image 
                                source={{ uri: artistImage }}
                                style={{
                                    width: 60,
                                    height: 60,
                                    borderRadius: 30
                                }}
                            />

                            <Text
                                style={{ fontSize: 14, fontWeight: '600', color: '#fff', opacity: .9 }}
                            >
                                {mainArtist.name}
                            </Text>
                        </HStack>

                    </View>
                </LinearGradient>
                
                {/* Copyright data */}
                <View style={{ flexDirection: 'row', justifyContent: 'center', flex: 1, marginTop: 40 }}>
                    <Text
                        style={{ fontSize: 12, fontWeight: '600', color: '#fff', opacity: .9, textAlign: 'center' }}
                    >
                        {album?.copyrights[0].text}
                    </Text>
                </View>
               
            </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    bg_image: {
        flex: 1
    },
    container: {
        flex: 1
    },
    gradient_container: {
        flex: 1,
        backgroundColor: 'pink'
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        // backgroundColor: 'red', 
        alignItems: 'flex-start'
    },
    inactiveIcon: {
        color: '#fff',
        opacity: 0.6
    }
})