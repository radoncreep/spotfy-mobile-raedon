import { useQuery } from "@tanstack/react-query";
import { 
    Dimensions, 
    FlatList, 
    ImageBackground, 
    ListRenderItemInfo, 
    StyleSheet, 
    Text, 
    View 
} from "react-native";

import { CategoriesItem, CategoriesParams } from "../../../api/browse/browse.types";
import { getCategories } from "../../../api/browse/BrowseAPI";
import { AppError, AppLoader, AppNoData } from "../../../components";
import { ViewSeperator } from "../../../components/core/ViewSeperator";
import { isEmpty } from "../../../utils/helper";
import AlbumDefaultImage from "../../../assets/images/albumDefaultImage.png"


const windowWidth = Dimensions.get("window").width;

type BrowseItemProps = ListRenderItemInfo<CategoriesItem>;

const BrowseItem = ({ index, item }: BrowseItemProps) => {
    
    const { name, icons } = item;
    
    return (
        <ImageBackground 
            defaultSource={AlbumDefaultImage}
            source={{ uri: isEmpty(icons) ? undefined : icons[0].url }} 
            style={{
                width: Math.floor(windowWidth / 2) - 15,
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

    const { data: categoriesData, error, isFetching, isLoading } = useQuery({
        queryKey: ["browse-categories"],
        queryFn: () => getCategories(queryParams),
        select: (data) => data.categories.items,
        staleTime: TWENTY_FOUR_HRS, 
        cacheTime: TWENTY_FOUR_HRS
    });

    if (isLoading) return <AppLoader />;

    if (!categoriesData) return <AppNoData />;

    if (error) {
        const message = "Error fetching data.";
        
        return <AppError message={message} />
    }

    return (
        <View style={styles.container}>
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
                ListHeaderComponent={() => (
                    <Text style={styles.listHeader}>
                        Browse all
                    </Text>
                )}
                ListHeaderComponentStyle={{
                    paddingVertical: 10
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