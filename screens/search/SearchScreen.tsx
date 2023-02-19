import { VStack } from "native-base"
import { StyleSheet, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { BrowseList } from "./components/BrowseList"

import { SearchInput } from "./components/SearchInput"
import { SearchScreenHeader } from "./components/SearchScreenHeader"


export const SearchScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <VStack space={4} flex={1} pb={20}>
                <SearchScreenHeader />

                <SearchInput />

                <BrowseList />
            </VStack>
        </SafeAreaView>       
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingTop: 20,
        flex: 1,
    }
})