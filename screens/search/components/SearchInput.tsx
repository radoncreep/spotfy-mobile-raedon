import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Feather } from '@expo/vector-icons';
import { Dispatch } from "react";


type SearchInputProps = {
    setIsVisible: Dispatch<React.SetStateAction<boolean>>;
}

export const SearchInput = ({ setIsVisible }: SearchInputProps) => {
    return (
        <Pressable 
            onPress={() => setIsVisible(true)}
            style={styles.container}
        >
            <Feather name="search" size={28} color="black" />

            <View style={styles.input}>
                <Text style={{ color: "#000"}}>
                    What do you want to listen to?
                </Text>
            </View>
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
        flexGrow: 1,
        color: '#000',
        fontSize: 16,
        fontWeight: '400',
        marginLeft: 8,
        justifyContent: "center"
    }
})