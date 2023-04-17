
import { useContext, useEffect, useState } from "react";
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
    ArtistAvatarListItem, 
    GreatPicksModal
} from "../../../components";
import { getManyArtists } from "../../../api/artist/ArtistsAPI";
import { ViewSeperator } from "../../../components/core/ViewSeperator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { OnboardStackParamList } from "../../../types/stackScreen.types";
import { AuthContext } from "../../../store/Auth.context";
import { mergeItemInCache, setItemInCache } from "../../../utils/cache";
import { useAppDispatch } from "../../../store/hooks";
import { login } from "../../../store/features/auth.slice";


const ChooseArtistScreen = (
    { navigation, route }: NativeStackScreenProps<OnboardStackParamList, 'ChooseArtistScreen'>
) => {
    const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);
    const [isDone, setIsDone]= useState<boolean>(false);
    // const { dispatch } = useContext(AuthContext);
    const dispatch = useAppDispatch();
 
    const { data, error, isLoading, refetch } = useQuery({ 
        queryKey: ['artists'], 
        queryFn: getManyArtists,
        enabled: true,
        staleTime: Infinity,
        cacheTime: Infinity,
        select(data) {
            let res = data.filter((d) => d.genres.length > 0);

            return res;
        },
    });

    if (isLoading) {
        return <AppLoader />;
    }

    if (!data) {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{ color: '#fff'}}>No data.</Text>
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
                            color: '#000', // dynamic, depends on the theme 
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

    const getSelectedArtists = (selectedIndexes: number[], artists: typeof data) => {
        const userSelectedArtists = selectedIndexes.map((selectedIdx) => artists[selectedIdx]);
        setItemInCache('favourite-artists', userSelectedArtists);

        return userSelectedArtists;
    }
    
    const handleNavigation = () => {
       let allRoutes = navigation.getState().routes;
       let routeCount = allRoutes.length;
       let previousRoute = allRoutes[routeCount - 2];
       console.log(allRoutes.map((route) => route.name))
       
       const payload = {
           username: 'Victor',
           email: 'victor@mail.com',
           password: 'password',
           dob: '20-01-2023',
           gender: 'male'
       }
       if (previousRoute && previousRoute.name === "OnboardScreen") {
           dispatch(login(payload));
       } else {
        // dispatch with actual login state.
        console.log("dispatched from auth navigation")
       }

    }

    return (
        <SafeAreaView style={styles.container} edges={["top"]}>
            {/* use sticky header */}
            <View style={{ flex: 1 }}>

                <FlatList 
                    data={data}
                    renderItem={({ index, item }) => 
                        (
                            <ArtistAvatarListItem 
                                item={item} 
                                index={index} 
                                selectedIndex={selectedIndexes} 
                                setSelectedIndex={setSelectedIndexes}
                            />
                        )
                    }
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
                    {selectedIndexes.length >= 3 && (
                        <AppTouchableButton 
                            text="Done"
                            onPress={() => setIsDone(true)}
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
                                borderRadius: 40,
                            }}
                        />
                    )}
                </LinearGradient>
            </View>

            { isDone && 
                <GreatPicksModal 
                    pickedArtists={getSelectedArtists(selectedIndexes, data)} 
                    handleNavigation={handleNavigation}
                />
            }   
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