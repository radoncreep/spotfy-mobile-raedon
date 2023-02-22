import { VStack } from "native-base"
import { useState } from "react"
import { StyleSheet, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { BrowseList } from "./components/BrowseListItems"
import { BrowseSearchModal } from "./components/BrowseSearchModal"

import { SearchInput } from "./components/SearchInput"
import { SearchScreenHeader } from "./components/SearchScreenHeader"


export const SearchScreen = () => {
    const [ isVisible, setIsVisible ] = useState<boolean>(false);

    return (
        <SafeAreaView style={styles.container}>
            <VStack space={4} flex={1} pb={20}>
                <SearchScreenHeader />

                <SearchInput setIsVisible={setIsVisible}/>

                <BrowseList />
            </VStack>

            <BrowseSearchModal
                isVisible={isVisible}
                setIsVisible={setIsVisible}
            />
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