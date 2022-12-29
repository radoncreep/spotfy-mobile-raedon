import { Center, Heading, Icon, VStack } from "native-base";
import React from "react";
import { 
    Dimensions,
    FlatList, 
    FlatListProps, 
    Keyboard,
    ListRenderItemInfo, 
    ScrollView, 
    StyleSheet, 
    Text, 
    TextInput,
    TouchableWithoutFeedback, 
    View 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from '@expo/vector-icons';

import { ALBUM_URIS } from "../../lib/archive";
import { ArtistData } from "../../types/artist.types";
import { AppProfileAvatar, AppTouchableButton } from "../../components";
import { LinearGradient } from "expo-linear-gradient";

const ChooseArtistScreen = () => {

    // const api = () => {}
    const renderProfileAvatar = ({ index, item }: ListRenderItemInfo<ArtistData>) => {
        return (
            <VStack 
                space={2.5} 
                style={{ 
                    // backgroundColor: 'red', 
                    paddingVertical: 10, 
                    alignItems: 'center'
                }}
            >
                {/* <Center> */}
                    <AppProfileAvatar imageSource={item.images[0].url}/>
                    <Text style={{ color: '#fff', fontWeight: '500'}}>{item.artist}</Text>
                {/* </Center> */}
            </VStack>
        )
    }

    return (
        <SafeAreaView style={styles.container} edges={["top"]}>
            {/* <TouchableWithoutFeedback
                onPress={Keyboard.dismiss} accessible={false}
            >
                <View>
                    <Text style={styles.heading}>
                        Choose 3 or more artists you like.
                    </Text>

                    <View style={styles.inputContainer}>
                        <Feather name="search" size={24} color="black" />
                        <TextInput 
                            style={styles.input}
                            placeholder="Search"
                            placeholderTextColor='#000'
                            autoCorrect={false}
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback> */}

            {/* use sticky header */}
            <View style={{ flex: 1 }}> 
                <FlatList 
                    data={ALBUM_URIS}
                    renderItem={renderProfileAvatar}
                    style={{
                        marginTop: 20
                        // flex: 1,
                        // backgroundColor: 'orange'
                    }}
                    columnWrapperStyle={{
                        alignItems: "center",
                        justifyContent: "space-between"
                    }}
                    numColumns={3}
                    showsVerticalScrollIndicator={false} // use custom bar bookmarked in browser
                    ListHeaderComponent={
                        <TouchableWithoutFeedback
                            onPress={Keyboard.dismiss} accessible={false}
                        >
                            <View>
                                <Text style={styles.heading}>
                                    Choose 3 or more artists you like.
                                </Text>

                                <View style={styles.inputContainer}>
                                    <Feather name="search" size={24} color="black" />
                                    <TextInput 
                                        style={styles.input}
                                        placeholder="Search"
                                        placeholderTextColor='#000'
                                        autoCorrect={false}
                                    />
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    }
                    // StickyHeaderComponent={}
                />
            </View>
    
            <View 
                style={{ 
                    borderWidth: 0, 
                    borderTopWidth: 0,
                    position: 'absolute',
                    bottom: 0,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    width: Dimensions.get('screen').width,
                    height: 150
                }}
            >
                <LinearGradient
                    colors={['rgba(0, 0, 0, 0.05)', '#121212']}
                    locations={[0, 0.8]}
                    style={{
                        height: '100%',
                        paddingTop: 20
                    }}
                >
                    <AppTouchableButton 
                        text="Done"
                        onPress={() => console.log("done")}
                        textStyle={{
                            color: "#000",
                            fontSize: 14,
                            fontWeight: 'bold'
                        }}
                        containerStyle={{
                            backgroundColor: '#fff',
                            paddingVertical: 16,
                            width: 120,
                            alignSelf: 'center',
                            borderRadius: 40
                        }}
                    />
                </LinearGradient>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#000',
        paddingHorizontal: 20,
        paddingTop: 32
    },
    heading: { 
        fontSize: 34, 
        color: '#fff', 
        fontWeight: '700',
        marginBottom: 14
    },
    input: {
        fontSize: 16,
        fontWeight: '500',
        paddingLeft: 6,
        flex: 1,
        paddingVertical: 10
    },
    inputContainer: {
        borderWidth: 0,
        backgroundColor: '#fff', 
        color: '#000',
        flexDirection: 'row',
        paddingVertical: 6,
        paddingHorizontal: 5,
        borderRadius: 4,
        alignItems: 'center'
    }
})

export default ChooseArtistScreen;