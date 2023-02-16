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
import { QueryCache } from "@tanstack/react-query";


export const ArtistScreen = ({ navigation, route }: ArtistScreenProps) => {
    const insets = useSafeAreaInsets();

    const {
        id,
        images,
        name, 
        followers
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

    // console.log({ queries })
    
    const goBack = () => navigation.goBack();

    return (
        <SafeAreaView 
            edges={["bottom"]} 
            style={[styles.container]}
        >
            <ImageBackground 
                source={{ uri: images[0].url }}
                resizeMode={"cover"}
                // defaultSource={} static image asset
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
                        fontSize: 12,
                        opacity: .6
                    }}
                >
                    {followers.total.toLocaleString()} followers 
                </Text>

                {/* Controls and Info */}
                <View style={styles.controls}>
                    <Pressable 
                        style={{ 
                            paddingVertical: 4,
                            paddingHorizontal: 10,
                            borderWidth: 1,
                            borderColor: 'grey',
                            borderRadius: 20
                        }}
                        onPress={() => console.log("clicked following")}>
                        <Text style={{ color: "#fff", opacity: .8 }}>following</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    artistBgImage: {
        flex: .5,
        flexDirection: 'row',
        // bottom: 0,
        // position: 'absolute'
    },
    controls: {
        flexDirection: 'row'        
    },
    lowerSection: {
        flex: .5,
        padding: 20
    }
})