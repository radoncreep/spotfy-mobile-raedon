import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


import { HomeScreenHeader } from "../../components";
import { HomeNavigationParamList } from "../../types/stackScreen.types";
import { NewReleaseSection } from "./sections/NewReleases";


export const HomeScreen = ({ navigation, route }: NativeStackScreenProps<HomeNavigationParamList, 'HomeIndex'>) => {

   // isLoading will be used to render some skeleton or placeholder som sh$% like that

    return (
        <SafeAreaView style={styles.container} edges={["top"]}>
            <ScrollView>
                <HomeScreenHeader />

                <View style={{ marginVertical: 20 }}>
                    <NewReleaseSection navigation={navigation} route={route} />
                </View>

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