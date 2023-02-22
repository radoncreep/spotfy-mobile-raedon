import { useQuery } from "@tanstack/react-query"
import { useState } from "react";
import { FlatList, ImageBackground, ListRenderItemInfo, StyleSheet, Text, View } from "react-native"
import { CategoriesItem, CategoriesParams } from "../../../api/browse/browse.types"
import { getCategories } from "../../../api/browse/BrowseAPI"
import { AppModal } from "../../../components";
import { ViewSeperator } from "../../../components/core/ViewSeperator";
import { isEmpty } from "../../../utils/helper";
import { BrowseSearchModal } from "./BrowseSearchModal";


type BrowseItemProps = ListRenderItemInfo<CategoriesItem>;

const BrowseItem = ({ index, item }: BrowseItemProps) => {
    
    const { name, icons } = item;
    
    return (
        <ImageBackground 
            source={{ uri: isEmpty(icons) ? undefined : icons[0].url }} 
            style={{
                width: 150,
                height: 150,
                padding: 8,
                borderRadius: 100
            }}
        >
            <Text style={[styles.listHeader, { fontSize: 16, fontWeight: "bold"}]}>
                {name}
            </Text>
        </ImageBackground>
    )
}

export const BrowseList = () => {
    let queryParams = {
        country: "NG",
        locale: "en",
        limit: 20
    } as CategoriesParams;

    const TWENTY_FOUR_HRS = 24 * 3600 * 1000;

    const { data: categoriesData, error, isFetching } = useQuery({
        queryKey: ["browse-categories"],
        queryFn: () => getCategories(queryParams),
        select: (data) => data.categories.items,
        staleTime: TWENTY_FOUR_HRS, 
        cacheTime: TWENTY_FOUR_HRS
    });

    if (!categoriesData) {
        //
    }

    if (!isFetching) {
        //
    }

    if (!error) {
        //
    }

    return (
        <View style={styles.container}>
            <Text style={styles.listHeader}>
                Browse all
            </Text>


            <FlatList 
                data={categoriesData}
                renderItem={(props) => (
                    <BrowseItem {...props} />
                )}
                ItemSeparatorComponent={() => <ViewSeperator />}
                numColumns={2}
                columnWrapperStyle={{
                    justifyContent: "space-between"
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
    },
    listHeader: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 18
    },
    itemContainer: {
        // not much here its seems
    }
})