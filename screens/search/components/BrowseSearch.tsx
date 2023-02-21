import { Dispatch, useEffect, useMemo, useState } from "react";
import { Modal, ModalProps, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BrowseRecentSearches } from "./RecentSearches";
import { SearchParams, SearchResponse } from "../../../api/search/search.types";

import { isEmpty } from "../../../utils/helper";
import { SearchResultView } from "../sections/SearchResultView";
import { useQuery } from "@tanstack/react-query";
import { getSearch } from "../../../api/search/searchAPI";


interface BrowseSearchModalProps extends ModalProps {
    isVisible: boolean;
    setIsVisible: Dispatch<React.SetStateAction<boolean>>;
}


export const BrowseSearchModal = ({ isVisible, setIsVisible }: BrowseSearchModalProps) => {
    const insets = useSafeAreaInsets();
    const [searchValue, setSearchValue] = useState<SearchParams['searchQuery']>("");
    const [debouncedSearchValue, setDebouncedSearchValue] = useState<SearchParams['searchQuery']>("");

    const queryFnParam: SearchParams = {
        searchQuery: debouncedSearchValue,
        type: ["artist", "track", "album"],
        limit: 3,
        market: "NG" // get user location although api priotizes token location over this
    }

    const { data: searchResult, isLoading, error, isFetching, refetch } = useQuery({
        queryKey: [`search-${searchValue}`],
        queryFn: () => getSearch(queryFnParam),
        enabled: false,
        // select: (data) => {
        //     // transform data here
        //     // return {
        //     //     top: data,
        //     //     aritst: data.artists,
        //     //     albums: data.albums
        //     // }
        // }
    })

    console.log({isFetching, searchValue});

    useEffect(() => {
        let timeoutId = setTimeout(() => {
            setSearchValue(debouncedSearchValue);
        }, 1000)

        return () => {
            clearTimeout(timeoutId)
        }
    }, [debouncedSearchValue]);

    useEffect(() => {
        console.log({searchValue})
        if (!isEmpty(searchValue))
            refetch();
    }, [searchValue, refetch])
    

    return (
        <Modal 
            animationType="slide"
            visible={isVisible}
        >
            <View style={[styles.container]}>
                <View style={[styles.modalHeader,  { paddingTop: insets.top + 10 }]}>
                    <View style={styles.inputContainer}>
                        <Feather name="search" size={18} color="#fff" /> 

                        <TextInput 
                            autoFocus={isVisible}
                            placeholder="What do you want to listen to?"
                            placeholderTextColor="#B3B3B3"
                            style={styles.input}
                            onChangeText={(text) => setDebouncedSearchValue(text)}
                            autoCapitalize="none"
                        />
                    </View>

                    <Pressable 
                        style={{ marginLeft: 20 }}
                        onPress={() => setIsVisible(false)}
                    >
                        <Text style={styles.text}>Cancel</Text>
                    </Pressable>
                </View>

                <View style={styles.modalBody}>
                    { (isEmpty(searchValue) && isEmpty(searchResult)) ? <BrowseRecentSearches /> : 
                        <SearchResultView
                          data={searchResult as SearchResponse}  
                          isLoading={isLoading}
                          error={error}
                        />
                    } 
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#121212",
        flex: 1
    },
    input: {
        fontSize: 14,
        color: '#fff',
        fontWeight: "600",
        marginLeft: 4,
        paddingHorizontal: 4
    },
    inputContainer: {
        backgroundColor: '#3d3d3d',
        paddingHorizontal: 10,
        flexDirection: 'row',
        paddingVertical: 6,
        borderRadius: 8,
        flexGrow: 1,
    },
    modalBody: {
        paddingHorizontal: 10,
        flex: 1
    },
    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#282828",
        paddingHorizontal: 10,
        paddingBottom: 10
    },
    modalFooter: {

    },
    text: {
        color: '#fff',
        fontSize: 14
    }
});