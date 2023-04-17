import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { HomeScreenHeader } from "../../components";
import { HomeScreenStackNavigationProps } from "../../navigation/home/home.navigation.types";
import { FavouriteArtistSection } from "./sections/FavouriteArtists";
import { NewReleaseSection } from "./sections/NewReleases";


export const HomeScreen = ({ navigation, route }: HomeScreenStackNavigationProps) => {

   // isLoading will be used to render some skeleton or placeholder som sh$% like that

   const sections = [NewReleaseSection, FavouriteArtistSection];

    return (
        <SafeAreaView style={styles.container} edges={["top"]}>
            <ScrollView>
                <HomeScreenHeader />

                {sections.map((SectionComponent, index) => (
                    <View key={index}>
                        <SectionComponent navigation={navigation} route={route} />
                    </View>
                ))}

                

                {/* <NewReleaseSection navigation={navigation} route={route} />

                <FavouriteArtistSection navigation={navigation} route={route} /> */}

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