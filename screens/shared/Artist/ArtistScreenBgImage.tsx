import { 
    ImageBackground, 
    Pressable, 
    StyleSheet, 
    Text, 
    View 
} from "react-native";
import { Feather } from '@expo/vector-icons';

import { IArtist } from "../../../types/artist";
import ArtistDefaultImage from "../../../assets/images/artistDefaultImage.jpg";
import { useSafeAreaInsets } from "react-native-safe-area-context";


type BgProps<T> = {
    images: IArtist['images'];
    artistName: IArtist['name'];
    navigation: T;
}

export const ArtistScreenBgImage = 
    <T extends { goBack: () => void}>({ images, artistName, navigation}: BgProps<T>
) => {
    console.log("rendered bg")
    const insets = useSafeAreaInsets();

    const goBack = () => navigation.goBack();

    return (
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
                        {artistName} 
                </Text>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    artistBgImage: {
        flexDirection: 'row',
        height: 300
    }
})
