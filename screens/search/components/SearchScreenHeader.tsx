import { StyleSheet, Text, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';


export const SearchScreenHeader = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Search
            </Text>

            <AntDesign name="camerao" size={32} color="#fff" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    text: {
        color: "#fff",
        fontSize: 32,
        fontWeight: "bold"
    }
})