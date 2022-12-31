
import { useEffect, useState } from "react";
import { 
    Dimensions,
    FlatList, 
    Keyboard,
    StyleSheet, 
    Text, 
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback, 
    View 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from '@expo/vector-icons';
import { useQuery } from "@tanstack/react-query";
import { LinearGradient } from "expo-linear-gradient";

import { 
    AppErrorFeedback, 
    AppLoader, 
    AppTouchableButton, 
    ArtistAvatarListItem 
} from "../../components";
import { getManyArtists } from "../../api/ArtistsAPI";
import { ViewSeperator } from "../../components/core/ViewSeperator";


const ChooseArtistScreen = () => {
    const [selectedArtists, setSelectedArtists] = useState<Record<string, any>[]>([]);
    const [selectedIndex, setSelectedIndex] = useState<number[]>([]);

    const { data, error, isLoading, refetch } = useQuery({ 
        queryKey: ['artists'], 
        queryFn: getManyArtists,
        enabled: false
    });

    useEffect(() => {
        if (!data) {
            refetch();
        }
        console.log(selectedArtists)
    }, [selectedArtists]);


    if (isLoading) {
        return <AppLoader />;
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
                        <ArtistAvatarListItem 
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