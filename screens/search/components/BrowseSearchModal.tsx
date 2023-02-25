import { Dispatch, useEffect, useMemo, useState } from "react";
import { Dimensions, Modal, ModalProps, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BrowseRecentSearches } from "./RecentSearches";
import { SearchParams, SearchResponse } from "../../../api/search/search.types";

import { isEmpty } from "../../../utils/helper";
import { SearchResultView } from "./SearchResultView";
import { useQuery } from "@tanstack/react-query";
import { getSearch } from "../../../api/search/searchAPI";
import { AppLoader } from "../../../components";


interface BrowseSearchModalProps {
    setIsVisible: Dispatch<React.SetStateAction<boolean>>;
}

const windowWidth = Dimensions.get("window").width;

export const BrowseSearchModal = ({ setIsVisible }: BrowseSearchModalProps) => {
    const insets = useSafeAreaInsets();
    const [searchValue, setSearchValue] = useState<SearchParams['searchQuery']>("");
    const [debouncedSearchValue, setDebouncedSearchValue] = useState<SearchParams['searchQuery']>("");

    const queryFnParam: SearchParams = {
        searchQuery: searchValue,
        type: ["artist", "track", "album"],
        limit: 20,
        market: "NG" // get user location although api priotizes token location over this
    }

    const { data: searchResult, isLoading, error, isFetching, refetch } = useQuery({
        queryKey: [`search-${searchValue}`],
        queryFn: () => getSearch(queryFnParam),
        enabled: false
    })

    console.log({isFetching, searchValue});

    console.log("search res", isEmpty(searchResult))

    
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
    
    return (
        // <Modal 
        //     animationType="slide"
        //     visible={isVisible}
        // >
            <View style={[styles.container]}>
                <View style={[styles.modalHeader,  { paddingTop: insets.top + 10 }]}>
                    <View style={styles.inputContainer}>
                        <Feather name="search" size={18} color="#fff" /> 

                        <TextInput 
                            // autoFocus={isVisible}
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

                <View style={styles.modalBody}>
                    { (isEmpty(searchValue) && isEmpty(searchResult)) && <BrowseRecentSearches /> }

                    { (!isEmpty(searchValue) && isLoading) && <AppLoader /> }

                    { !isEmpty(searchResult) &&
                        <SearchResultView
                          data={searchResult as SearchResponse}  
                          isLoading={isLoading}
                          error={error}
                        //   setIsVisible={setIsVisible}
                        />
                    } 
                </View>
            </View>
        // </Modal>
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