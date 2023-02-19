import { Dispatch } from "react";
import { Modal, ModalProps, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BrowseRecentSearches } from "./RecentSearches";


interface BrowseSearchModalProps extends ModalProps {
    isVisible: boolean;
    setIsVisible: Dispatch<React.SetStateAction<boolean>>;
}


export const BrowseSearchModal = ({ isVisible, setIsVisible }: BrowseSearchModalProps) => {
    const insets = useSafeAreaInsets();

    console.log(isVisible)
    return (
        <Modal 
            animationType="slide"
            visible={isVisible}
        >
            <View style={[styles.container]}>
                <View style={[styles.modalHeader,  { paddingTop: insets.top + 10 }]}>
                    <View style={styles.inputContainer}>
                        <Feather name="search" size={18} color="#fff" /> 

                        <TextInput 
                            autoFocus={isVisible}
                            placeholder="What do you want to listen to?"
                            placeholderTextColor="#B3B3B3"
                            style={styles.input}
                        />
                    </View>

                    <Pressable 
                        style={{ marginLeft: 20 }}
                        onPress={() => setIsVisible(false)}
                    >
                        <Text style={styles.text}>Cancel</Text>
                    </Pressable>
                </View>

                <View style={styles.modalBody}>
                    <BrowseRecentSearches />
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#121212",
        flex: 1
    },
    input: {
        fontSize: 14,
        color: '#fff',
        fontWeight: "600",
        marginLeft: 4,
        paddingHorizontal: 4
    },
    inputContainer: {
        backgroundColor: '#3d3d3d',
        paddingHorizontal: 10,
        flexDirection: 'row',
        paddingVertical: 6,
        borderRadius: 8,
        flexGrow: 1,
    },
    modalBody: {
        paddingHorizontal: 10,
        flex: 1
    },
    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#282828",
        paddingHorizontal: 10,
        paddingBottom: 10
    },
    modalFooter: {

    },
    text: {
        color: '#fff',
        fontSize: 14
    }
});