import { StyleSheet, View } from "react-native"
import { SearchResponse } from "../../../api/search/search.types"


type BrowseTopBarProps = {
    routes: SearchResponse[keyof SearchResponse][];
    onChangeRoute: () => void;
}

export const BrowseTopBar = ({ routes }: BrowseTopBarProps) => {
    return (
        <View style={styles.container}>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    }
})