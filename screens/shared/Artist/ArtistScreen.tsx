import { Image, ImageBackground, StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather, Ionicons, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';


import { ArtistScreenProps } from "./artistScreen.types";


export const ArtistScreen = ({ navigation, route }: ArtistScreenProps) => {
    const {
        id,
    } = route.params;
    return (
        <SafeAreaView edges={[]} style={styles.container}>
            <ImageBackground 
                source={{ uri: ""}}
                resizeMode={"cover"}
                style={{}}
            >

            </ImageBackground>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    artistBgImage: {
        flex: 1
    }
})