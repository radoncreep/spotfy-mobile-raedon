import { FlatList, Platform, ScrollView, StyleSheet, View } from "react-native";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

import { Dispatch, memo, PropsWithoutRef, useEffect, useState } from "react";

import { AppLoader } from "../../../components";
import { AppPill } from "../../../components";
import { SearchAlbumItem, SearchArtistItem, SearchResponse, SearchTrackItem } from "../../../api/search/search.types";
import { AlbumSearchView } from "./AlbumSearchView";
import { isEmpty } from "../../../utils/helper";
import { ArtistSearchFilterView } from "./ArtistSearchFilterView";
import { TracksSearchResultView } from "./TracksSearchResultView";
import Animated, { SlideInDown, SlideInUp } from "react-native-reanimated";
import { ColorState } from "../../../types/shared";
import { LinearGradient } from "expo-linear-gradient";

type SearchResultViewProps = {
    searchTag: "albums" | "artists" | "tracks";
    data: {
        artists: SearchArtistItem[];
        albums: SearchAlbumItem[];
        tracks: SearchTrackItem[];
    }
    handleColorSet: (arg: ColorState) => void;
};

const SearchResultView = memo(function SearchResultView({ data, searchTag, handleColorSet }: SearchResultViewProps){
        console.log("result view")
    
        return (
            <Animated.View 
                style={{
                    justifyContent: "flex-start",
                }}
            >
                {searchTag.toLowerCase() === "albums" && (
                    <AlbumSearchView albumData={data["albums"] }/>
                )}

                {(searchTag.toLowerCase() === "artists" && !isEmpty(data["artists"])) && (
                    <ArtistSearchFilterView 
                        artistData={data["artists"]} 
                        handleColorSet={handleColorSet} 
                    />
                )}

                {(searchTag.toLowerCase() === "tracks" && !isEmpty(data["tracks"])) && (
                    <TracksSearchResultView tracksData={data["tracks"] }/>
                )}
            </Animated.View>
        )
    }
)


const styles = StyleSheet.create({
    container: {}
})

export { SearchResultView };