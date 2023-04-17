import { FlatList, HStack } from "native-base";
import { Dimensions, Image, ListRenderItemInfo, Pressable, StyleSheet, Text, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';

import { SearchArtistItem, SearchArtists } from "../../../api/search/search.types";
import { ViewSeperator } from "../../../components/core/ViewSeperator";
import ArtistDefaultImage from "../../../assets/images/artistDefaultImage.jpg";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { SearchNavigationParamList } from "../../../navigation/search/SearchNavigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Dispatch, useEffect } from "react";
import { useImageColor } from "../../../hooks/useImageColor";
import { ColorState } from "../../../types/shared";
import { isEmpty } from "../../../utils/helper";


type Props = {
    artistData: SearchArtists['items'];
    handleColorSet: (arg: ColorState) => void;
}

const windowWidth = Dimensions.get("window").width;

interface ItemProps extends ListRenderItemInfo<SearchArtistItem> {
    handleNavigation: (arg: SearchArtistItem) => void;
    handleColorSet: Props['handleColorSet'];
}

const ArtistSearchItem = ({ handleNavigation, item }: ItemProps) => {

    return (
        <Pressable 
            onPress={() => handleNavigation(item)}
            style={styles.itemContainer}
        >
            <HStack style={styles.profile} space={4}>
                <Image 
                    defaultSource={ArtistDefaultImage}
                    source={{ uri: item.images[0] ? item.images[0].url : undefined }}
                    style={styles.image}
                />  
                <Text 
                    style={styles.text} 
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    {item.name}
                </Text>
            </HStack>

            <View style={styles.iconContainer}>
                <AntDesign name="right" size={24} style={styles.caretIcon} />
            </View>
        </Pressable>
    )
}

export const ArtistSearchFilterView = ({ artistData, handleColorSet }: Props) => {
    const navigation = useNavigation<NativeStackNavigationProp<SearchNavigationParamList>>();
    const topArtist = artistData[0];
    const topArtistImageUrl: string = !isEmpty(topArtist.images) ? topArtist.images[0].url : "";
    const res = useImageColor(topArtistImageUrl);

    useEffect(() => {
        handleColorSet(res);

        return () => undefined;
    }, [res]);

    const handleNavigation = (item: SearchArtistItem) => {
        // navigate
        navigation.navigate('ArtistScreen', {...item});
        return;
        // cache visited artiste under search
        console.log("navigate to artist screen")
    }

    return (
        <FlatList
            data={artistData}
            renderItem={(props) => (
                <ArtistSearchItem 
                    {...props} 
                    handleNavigation={handleNavigation} 
                    handleColorSet={handleColorSet}
                />
            )}
            ItemSeparatorComponent={() => <ViewSeperator spacing={10} />}
            contentContainerStyle={{
                paddingVertical: 10,
            }}
        />
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    caretIcon: {
        color: "#fff",
        opacity: 0.6,
    },
    iconContainer: {
        width: windowWidth * (20/100),
        height: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    profile: {
        alignItems: "center",
        width: windowWidth * (80/100),
        overflow: "hidden"
    },
    image: {
        width: 56,
        height: 56,
        borderRadius: 28
    },
    text: {
        fontSize: 14,
        fontWeight: "600",
        color: "#fff"
    }
})