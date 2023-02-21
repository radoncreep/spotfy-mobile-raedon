import { ScrollView, StyleSheet, View } from "react-native";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

import { getSearch } from "../../../api/search/searchAPI";
import { AppLoader } from "../../../components";
import { AppPill } from "../../../components";
import { SearchParams, SearchResponse } from "../../../api/search/search.types";
import { PropsWithoutRef } from "react";


type SearchResultViewProps = {
    data: SearchResponse;
    isLoading: boolean;
    error: any;
};


export const SearchResultView = ({ data, isLoading, error }: SearchResultViewProps) => {
    console.log("rendered search modal")

    const tabs = ["Top", "Artists", "Songs", "Albums", "Podcasts", "Genre"];


    
    // console.log(isFetching)

    // if (!searchResult) {}

    // if (isFetching && isLoading) {
    //     return <AppLoader />;
    // }

    // if (error) {}

    return (
        <View style={styles.container}>
            <ScrollView 
                horizontal
                contentContainerStyle={styles.pillsContainer}
            >
                {tabs.map((tab, index) => (
                    <View key={index} style={{ marginHorizontal: 4}}>
                        <AppPill 
                            pillText={tab}
                            pillTextStyle={{
                                fontSize: 14,
                                fontWeight: '400',
                                
                            }}
                        /> 
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    },
    pillsContainer: {
        paddingVertical: 8,
        justifyContent: "space-around"
    }
})