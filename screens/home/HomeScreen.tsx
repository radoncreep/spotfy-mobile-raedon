import { FlatList, ListRenderItemInfo, ScrollView, SectionList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { HomeScreenHeader } from "../../components";

const data = [
    {
        title: 'aimge',
        image: 'fwefwffwe'
    },
    {
        title: 'fwefw',
        image: 'wefwf'
    },
    {
        title: 'fwefw',
        image: 'fwefw'
    },
    {
        title: 'aimge',
        image: 'fwefwffwe'
    },
    {
        title: 'fwefw',
        image: 'wefwf'
    },
    {
        title: 'fwefw',
        image: 'fwefw'
    }
];

const FlatListItem = ({ index, item }: ListRenderItemInfo<typeof data[0]>) => {
    console.log('item')
    return (
        <View 
        style={{ marginTop: 20 }}
        >
            <View 
                style={{
                    height: 100,
                    width: 100,
                    backgroundColor: '#fff',
                    opacity: .6
                }}
            />

            {/* <Text 
                ellipsizeMode="tail"
                numberOfLines={2}
            >
                Some random text you might not get to see after the data comes in
            </Text> */}
        </View>
    )
}

export const HomeScreen = () => {
    

    return (
        <SafeAreaView style={styles.container} edges={["top"]}>
            <ScrollView >
                <HomeScreenHeader />

                <FlatList 
                    // ListHeaderComponent={() => <Text style={{ color: '#fff', fontSize: 20}}>Newly added</Text>}
                    ListHeaderComponentStyle={{
                        // backgroundColor: 'red'
                    }}
                    data={data}
                    renderItem={((props) => <FlatListItem {...props} />)}
                    horizontal={true}
                />

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