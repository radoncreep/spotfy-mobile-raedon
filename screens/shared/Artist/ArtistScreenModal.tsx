import { HStack, VStack } from "native-base";
import { Image, ImageProps, Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { AppRainMeter } from "../../../components";
import { BlurView } from 'expo-blur';
import { AntDesign, Entypo, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { Dispatch } from "react";


type ArtistScreenModalProps = {
    isVisible: boolean;
    imageSource: string;
    artistName: string;
    isFollowingArtist: boolean;
    setisFollowingArtist: Dispatch<React.SetStateAction<boolean>>;
    onCloseModal: () => void;
}

type IconAndTextProps = {
    onPress: () => void;
    text: string;
}

const IconAndText = ({ onPress, text }: IconAndTextProps) => {

    const renderIcons = (iconName: string) => {

        switch (iconName) {
            case "Stop Following":
                return <AntDesign name="close" size={36} color="#57B65F" />;
            case "Don't play this artist":
                return <MaterialCommunityIcons name="cancel" size={36} color="#fff" />;
            case "Share":
                return <Entypo name="share-alternative" size={36} color="#fff" />;
            case "Go to radio":
                return<Feather name="radio" size={36} color="#fff" />;
            case "Follow":
                return <AntDesign name="adduser" size={36} color="#fff" />;
            default:
                return <></>;
        }
    }

    return(
        <Pressable onPress={onPress}>
            <HStack alignItems="center" space={4}>
                {renderIcons(text)}

                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: "600",
                        color: "#fff",
                        opacity: .9
                    }}
                >
                    {text}
                </Text>
            </HStack>
        </Pressable>
    )
}

export const ArtistScreenModal = ({
    imageSource, 
    isVisible, 
    artistName, 
    onCloseModal,
    isFollowingArtist,
    setisFollowingArtist
}: ArtistScreenModalProps
) => {
    return (
        <Modal 
            animationType="slide"
            visible={isVisible}
            transparent
            statusBarTranslucent
        >
            <BlurView style={{ flex: 1}}>
                <ScrollView contentContainerStyle={styles.modalBody}>
                    <VStack 
                        style={{ marginBottom: 40 }}
                        alignItems="center"
                        space={5}
                    > 
                        <VStack space={10} style={styles.imageCard}>
                            <Image 
                                source={{ uri: imageSource}}
                                style={styles.image}
                            />

                            <HStack space={4} justifyContent="space-between" alignItems="center">
                                <FontAwesome name="spotify" size={40} color="#fff" />

                                <AppRainMeter />
                            </HStack>
                        </VStack>

                        <Text style={{ fontSize: 26, fontWeight: "bold", color: "#fff" }}>
                            {artistName}
                        </Text>
                    </VStack>

                    <VStack space={4} style={styles.controls}>
                        <IconAndText 
                            text={!isFollowingArtist ? "Follow" : "Stop Following"} // or add artist
                            onPress={() => setisFollowingArtist((prev) => !prev)}
                        />
                        <IconAndText 
                            text="Don't play this artist" // remove from favourite artist
                            onPress={() => console.log("hi")}
                        />
                        <IconAndText 
                            text="Share" // deep link to share link
                            onPress={() => console.log("hi")}
                        />
                        <IconAndText 
                            text="Go to radio" // navigate to radio screen
                            onPress={() => console.log("hi")}
                        />
                    </VStack>

            </ScrollView>

            <Pressable 
                style={styles.modalFooter}
                onPress={onCloseModal}
            >
                <Text style={{ fontSize: 20, fontWeight: "500", color: "#fff" }}>
                    Close
                </Text>
            </Pressable>
        </BlurView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalBody: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: "flex-end",
        paddingBottom: 40
    },
    modalFooter: {
        flexDirection: "row", 
        justifyContent: "center", 
        paddingVertical: 40
    },
    image: {
        width: 180,
        height: 180,
        borderRadius: 90
    },
    imageCard: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
        alignSelf: 'center',
        padding: 24
    },
    textAndIcon: {
        color: '#fff',
        opacity: .8,
    },
    controls: {
        // justifyItems: "flex-end"
    }
})