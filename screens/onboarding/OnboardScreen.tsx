import React, { useContext } from "react";
import { ImageBackground, Platform, Pressable, Text, View, StyleSheet } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { Heading, VStack } from "native-base";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Reactotron from "reactotron-react-native";


import { IMAGES } from "../../lib/constants";
import { AppTouchableButton } from "../../components";
import { OnboardStackParamList } from "../../types/stackScreen.types";
import { AuthContext } from "../../store/Auth.context";


type Socials = "Google" | "Facebook" | "Apple";


const RenderOAuthButtons = ({ navigation, route }: NativeStackScreenProps<OnboardStackParamList, 'OnboardScreen'>) => {
    const socials: Socials[] = ["Google", "Facebook", "Apple"];
    const { dispatch } = useContext(AuthContext);

    const renderLeftIcon = (social: Socials) => {
        switch (social) {
            case 'Apple':
                return <FontAwesome name="apple" size={24} color="#fff" />;
            case 'Facebook':
                return <MaterialIcons name="facebook" size={24} color="#0000ff" />;
            default:
                return <AntDesign name="google" size={24} color="red" />;
        }
    }

    const handlePress = () => {
        Reactotron.log!("hi there")
        // dispatch({
        //     type: 'login',
        //     payload: {
        //         username: 'Victor',
        //         email: 'victor@mail.com',
        //         password: 'password',
        //         dob: '20-01-2023',
        //         gender: 'male'
        //     }
        // })
        navigation.navigate('ChooseArtistScreen');
    }

    return (
        <>
            {socials.map((social: Socials) => {
                
                return ( 
                    <View key={social}>
                        {Platform.OS === "android" && social === "Apple" ? 
                            null :
                            <AppTouchableButton 
                                
                                text={`Continue with ${social}`}
                                onPress={handlePress}
                                containerStyle={{
                                    borderRadius: 20,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    width: '100%',
                                    paddingHorizontal: 14,
                                    paddingVertical: 10,
                                    borderWidth: .2,
                                    borderColor: 'grey'
                                }}
                                leftIcon={renderLeftIcon(social)}
                                textStyle={{
                                    fontWeight: 'bold',
                                    fontSize: 20,
                                    color: '#fff',
                                    textAlign: 'center'
                                }}
                            />
                        }
                    </View>
                )
            })
            }
        </>
    )
}


export const OnboardScreen = (
    { navigation, route }: NativeStackScreenProps<OnboardStackParamList, 'OnboardScreen'>
) => {
    const { onboard_bg } = IMAGES;

    const handleSignupPress = () => {
        navigation.navigate('Email');
    };

    return (   
        <View style={styles.container}>
            <ImageBackground
                source={onboard_bg} 
                resizeMode="cover"
                style={styles.bg_image}
            >
                <LinearGradient
                    colors={['rgba(0, 0, 0, 0.5)', '#121212']}
                    locations={[0, 0.55]}
                    style={styles.gradient_container}
                >
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            paddingBottom: 40
                        }}
                    >
                        <View style={{ marginVertical: 10 }}>
                            <FontAwesome name="spotify" size={72} color="#fff" />
                        </View>

                        <View 
                            style={{ marginBottom: 26 }}
                        >
                            <Heading color='#fff' size='2xl' textAlign='center'>
                                Millions of Songs.
                            </Heading>
                            <Heading color='#fff' size='2xl' textAlign='center'>
                                Free on Spotify.
                            </Heading>
                        </View>

                        <VStack 
                            bgColor='blue' 
                            width='100%' 
                            paddingX='6'
                            space='3'
                        >
                            <AppTouchableButton 
                                text='Sign up free'
                                onPress={handleSignupPress} 
                                containerStyle={{
                                    backgroundColor: '#57B65F',
                                    paddingHorizontal: 14,
                                    paddingVertical: 10,
                                    alignItems: 'center',
                                    borderRadius: 50
                                }}
                                textStyle={{
                                    fontWeight: 'bold',
                                    fontSize: 20,
                                    color: '#000'
                                }}
                            /> 

                            <RenderOAuthButtons navigation={navigation} route={route} />
                        </VStack>

                        <View style={{ marginTop: 40 }}>
                            <Pressable onPress={() => console.log("login")}>
                                <Text style={{color: '#fff', fontSize: 20, fontWeight: 'bold'}}>Login</Text>
                            </Pressable>
                        </View>

                    </View>
                </LinearGradient>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000'
    },
    bg_image: {
        flex: 1
    },
    gradient_container: {
        flex: 1,
    }
})