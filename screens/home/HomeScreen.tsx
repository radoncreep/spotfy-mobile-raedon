import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { HomeScreenHeader } from "../../components";
import { HomeScreenStackNavigationProps } from "./homeScreen.types";
import { FavouriteArtistSection } from "./sections/FavouriteArtists";
import { NewReleaseSection } from "./sections/NewReleases";


export const HomeScreen = ({ navigation, route }: HomeScreenStackNavigationProps) => {

   // isLoading will be used to render some skeleton or placeholder som sh$% like that

    return (
        <SafeAreaView style={styles.container} edges={["top"]}>
            <ScrollView>
                <HomeScreenHeader />

                <View style={{ marginVertical: 20 }}>
                    <NewReleaseSection navigation={navigation} route={route} />
                </View>

                <FavouriteArtistSection />

            </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 12,
        paddingTop: 2,
    },
})