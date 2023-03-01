import { Dispatch, useCallback, useEffect, useMemo, useState } from "react";
import { Dimensions, Modal, ModalProps, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BrowseRecentSearches } from "./RecentSearches";
import { SearchParams, SearchResponse } from "../../../api/search/search.types";

import { isEmpty } from "../../../utils/helper";
import { SearchResultView } from "./SearchResultView";
import { useQuery } from "@tanstack/react-query";
import { getSearch } from "../../../api/search/searchAPI";
import { AppLoader, AppPill } from "../../../components";
import Animated, { SlideInDown, SlideInRight, SlideInUp, SlideOutDown, SlideOutUp } from "react-native-reanimated";
import { ColorState } from "../../../types/shared";
import { LinearGradient } from "expo-linear-gradient";


interface BrowseSearchModalProps {
    setIsVisible: Dispatch<React.SetStateAction<boolean>>;
}

const windowWidth = Dimensions.get("window").width;

export const BrowseSearchModal = ({ setIsVisible }: BrowseSearchModalProps) => {
    const insets = useSafeAreaInsets();
    const [searchValue, setSearchValue] = useState<SearchParams['searchQuery']>("");
    const [debouncedSearchValue, setDebouncedSearchValue] = useState<SearchParams['searchQuery']>("");
    const [viewColorSet, setViewColorSet] = useState<ColorState | null>(null);
    const [activeTag, setActiveTag] = useState<number>(0);
    const [ searchTags, setSearchTags ] = useState<(keyof SearchResponse)[] | null>(null);


    const queryFnParam: SearchParams = {
        searchQuery: searchValue,
        type: ["artist", "track", "album"],
        limit: 20,
        market: "NG"
    }

    const { data: searchResult, isLoading, error, isFetching, refetch } = useQuery({
        queryKey: [`search-${searchValue}`],
        queryFn: () => getSearch(queryFnParam),
        select: (data) => {
            return {
                artists: data.artists?.items,
                albums: data.albums?.items,
                tracks: data.tracks?.items
            }
        },
        enabled: false
    })

    const handleColorSet = useCallback((viewColors: ColorState) => {
        console.log(viewColors)
        if (searchResult) {
            setViewColorSet(viewColors);
            return;
        }
        setViewColorSet(null);
    }, [searchResult]);
    
    useEffect(() => {
        let timeoutId = setTimeout(() => {
            setSearchValue(debouncedSearchValue);
        }, 1000)
        
        return () => clearTimeout(timeoutId);
    }, [debouncedSearchValue]);
    
    useEffect(() => {
        if (!isEmpty(searchValue)) refetch();
    }, [searchValue, refetch])
    
    const handleCancelModal = () => {
        setIsVisible(false);
        setSearchValue("");
    } 

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            if (searchResult && mounted) {
                let tags = Object.keys(searchResult).map((t) => 
                    (t.charAt(0).toLocaleUpperCase() + t.slice(1, t.length)) as keyof SearchResponse
                );
    
                setSearchTags(tags);
            } else {
                setSearchTags(null);
            }
        }

        return () => { mounted = false; }
    }, [searchResult])
    
    return (
        <Animated.View style={[styles.container]}>
            <LinearGradient
                colors={
                    [
                        !isEmpty(searchValue) ? viewColorSet?.colorOne.value || "transparent" : "transparent", 
                        'transparent'
                    ]
                }
                // locations={[0.4, 1]}ß
                style={styles.background}
            >
                <Animated.View 
                    entering={SlideInUp}
                    style={
                        [styles.modalHeader, 
                            { 
                                paddingTop: insets.top + 10, 
                                // backgroundColor: 'rgba(18, 18, 18, 0.5)'
                            }
                        ]
                    }
                >
                    <View 
                        style={{ 
                            flexDirection: "row", 
                            justifyContent: "space-between", 
                            alignItems: "center", 
                            marginBottom: 10
                        }}>
                        <View style={styles.inputContainer}>
                            <Feather name="search" size={18} color="#fff" /> 

                            <TextInput 
                                placeholder="What do you want to listen to?"
                                placeholderTextColor="#B3B3B3"
                                style={styles.input}
                                onChangeText={(text) => setDebouncedSearchValue(text)}
                                autoCapitalize="none"
                            />
                        </View>

                        <Pressable 
                            style={{ marginLeft: 20, width: windowWidth * (22/100) }}
                            onPress={handleCancelModal}
                        >
                            <Text style={styles.text}>Cancel</Text>
                        </Pressable>
                    </View>

                    {searchTags !== null && <ScrollView 
                        horizontal
                        contentContainerStyle={styles.pillsContainer}
                    >
                        {searchTags.map((tag, index) => {
                            console.log(tag)
                            return (
                                <View key={index+tag} style={{ marginHorizontal: 4 }}>
                                    <AppPill 
                                        pillText={tag}
                                        pillTextStyle={{
                                            fontSize: 14,
                                            fontWeight: '500',
                                            color: activeTag === index ? "#000" : "#fff",
                                        }}
                                        containerStyle={{
                                            backgroundColor: activeTag === index ? "#57B65F" : "#282828",
                                            height: 30,
                                            paddingHorizontal: 20,
                                            borderRadius: 20, 
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}
                                        onPress={() => setActiveTag(index)}
                                    /> 
                                </View>
                            )
                        })}
                    </ScrollView>
                    }
                </Animated.View>

                <Animated.View style={styles.modalBody}>
                    { (isEmpty(searchValue) && isEmpty(searchResult)) && <BrowseRecentSearches /> }

                    { (searchResult !== undefined && !isEmpty(searchResult) && searchTags !== null)  &&
                        <SearchResultView
                            searchTag={searchTags[activeTag]}
                            data={searchResult}  
                            handleColorSet={handleColorSet}
                        />
                    } 
                </Animated.View>
            </LinearGradient>

        </Animated.View>
    )
}

{/* { (!isEmpty(searchValue) && isLoading) && <AppLoader /> } */}


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#121212",
        flex: 1
    },
    background: {
        flex: 1,
    },
    input: {
        fontSize: 14,
        color: '#fff',
        fontWeight: "600",
        marginLeft: 4,
        paddingHorizontal: 4,
        width: "100%",
    },
    inputContainer: {
        backgroundColor: '#3d3d3d',
        paddingHorizontal: 10,
        flexDirection: 'row',
        paddingVertical: 6,
        borderRadius: 8,
        width: windowWidth * (78/100),
        overflow: "hidden"
    },
    modalBody: {
        flex: 1,
        paddingHorizontal: 12
    },
    modalHeader: {
        paddingHorizontal: 10,
        paddingBottom: 10,
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 6},
        // shadowOpacity: 0.8,
        // shadowRadius: 16,  
    },
    modalFooter: {

    },
    text: {
        color: '#fff',
        fontSize: 14
    },
    pillsContainer: {
        flex: 1,
        paddingVertical: 10,
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 10},
        // shadowOpacity: 0.8,
        // shadowRadius: 6,  
    }
});