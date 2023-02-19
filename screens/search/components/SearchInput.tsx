import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { Feather } from '@expo/vector-icons';


export const SearchInput = () => {
    return (
        <Pressable 
            onPress={() => console.log("search")}
            style={styles.container}
        >
            <Feather name="search" size={28} color="black" />

            <TextInput 
                placeholder="What do you want to listen to?"
                placeholderTextColor="#000"
                style={styles.input}
            />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        flexDirection: 'row',
        paddingVertical: 10,
        borderRadius: 8
    },
    input: {
        // backgroundColor: 'red',
        flexGrow: 1,
        color: '#000',
        fontSize: 16,
        fontWeight: '400',
        marginLeft: 8,
    }
})