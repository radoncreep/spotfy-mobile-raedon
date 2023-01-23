import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { HomeNavigationParamList } from "../../types/stackScreen.types";


export const DetailsScreen = ({ navigation, route }: 
    NativeStackScreenProps<HomeNavigationParamList, 'Details'>
) => {
    return (
        <SafeAreaView style={styles.container} edges={["top"]}>
            <Text style={{ color: '#fff'}}>
                {route.params.name}
            </Text>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})