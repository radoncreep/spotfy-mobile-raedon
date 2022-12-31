import { Center, Heading, Icon, Pressable, VStack } from "native-base";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { 
    Button,
    Dimensions,
    FlatList, 
    FlatListProps, 
    Keyboard,
    ListRenderItemInfo, 
    ScrollView, 
    StyleSheet, 
    Text, 
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback, 
    Vibration,
    View 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from '@expo/vector-icons';
import { useQuery } from "@tanstack/react-query";
import * as Haptics from 'expo-haptics';

import { ArtistData } from "../../types/artist.types";
import { AppErrorFeedback, AppProfileAvatar, AppTouchableButton } from "../../components";
import { LinearGradient } from "expo-linear-gradient";
import { getManyArtists } from "../../api/ArtistsAPI";
import { Ionicons } from '@expo/vector-icons';
import { ViewSeperator } from "../../components/core/ViewSeperator";

interface IRenderArtistAvatar {
    index: number;
    item: Record<string, any>;
    selectedIndex: number[];
    setSelectedIndex: Dispatch<SetStateAction<number[]>>;
}

const RenderArtistAvatar = ({ index, item, selectedIndex, setSelectedIndex }: IRenderArtistAvatar) => {

    const handleSelectProfile = (item: Record<string, any>) => {
        
        Haptics.selectionAsync();

        // if state is empty add new item
        // if state not empty,
        // - item exists in state: 
        // - item doesnt exist in state
        setSelectedIndex((prev) => {
            if (prev.length > 0) {
                if (prev.includes(index)) {
                    const filter = prev.filter((currentIndex) => currentIndex !== index);
                    return filter
                }
                return [...prev, index]
            }
            return [index]
        })
    }

    const isSelected = (selectedIndex: number[], index: number): boolean => {
        return selectedIndex.includes(index);
    }
    // console.log(selected)

    return (
        <TouchableWithoutFeedback
            style={{
                padding: 10,
                backgroundColor: '#fff'
            }}
            onPress={handleSelectProfile}
        >
            <VStack 
                space={2.5} 
                style={{ 
                    paddingVertical: 10, 
                    alignItems: 'center',
                    position: 'relative',
                    // backgroundColor: 'red',
                    maxHeight: 140
                }}
            >
                <AppProfileAvatar imageSource={item.images[0].url}/>
                <Text style={{ color: '#fff', fontWeight: '500'}}>{item['name']}</Text>

                <>
                    {isSelected(selectedIndex, index) && 
                        <View 
                            style={{ 
                                backgroundColor: '#fff', 
                                borderRadius: 40, 
                                paddingHorizontal: 2, 
                                paddingVertical: 1 ,
                                position: 'absolute',
                                zIndex: 1,
                                right: 0,
                                top: 20
                            }}
                        >
                            <Ionicons name="checkmark" size={24} color="#000" />
                        </View>
                    }
                </>
            </VStack>
        </TouchableWithoutFeedback>
    )
}


const ChooseArtistScreen = () => {
    const [selectedArtists, setSelectedArtists] = useState<Record<string, any>[]>([]);
    const [selectedIndex, setSelectedIndex] = useState<number[]>([]);

    const { data, error, isLoading, refetch } = useQuery({ 
        queryKey: ['artists'], 
        queryFn: getManyArtists,
        enabled: false
    });

    console.log("SELECTED ", selectedIndex)

    useEffect(() => {
        if (!data) {
            refetch();
        }
        console.log(selectedArtists)
    }, [selectedArtists])

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text 
                    style={{ 
                        color: '#fff', // dynameic, depends on the theme 
                        fontSize: 22,
                        fontWeight: 'bold'
                    }}
                >
                    Loading...
                </Text>
            </View>
        )
    }

    if (error) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <AppErrorFeedback error={error as Error} />
                
                <ViewSeperator />

                <TouchableOpacity
                    style={{
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                        backgroundColor: '#fff',
                        borderRadius: 40
                    }}
                    onPress={() => refetch()}
                >
                    <Text 
                        style={{ 
                            color: '#000', // dynameic, depends on the theme 
                            fontSize: 22,
                            fontWeight: 'bold'
                        }}
                    >
                        Try again.
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
    

    return (
        <SafeAreaView style={styles.container} edges={["top"]}>
            {/* use sticky header */}
            <View style={{ flex: 1 }}>

                <FlatList 
                    data={data}
                    renderItem={({ index, item }) => (
                        <RenderArtistAvatar 
                            item={item} 
                            index={index} 
                            selectedIndex={selectedIndex} 
                            setSelectedIndex={setSelectedIndex}
                        />
                    )}
                    style={{
                        marginTop: 20
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
                        onPress={() => setSelectedArtists([])}
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