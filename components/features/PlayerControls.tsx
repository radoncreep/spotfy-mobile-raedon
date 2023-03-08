import { Pressable, StyleSheet, View } from "react-native"
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';

export const PlayerControls = () => {
    return (
        <View style={styles.container}>
            {/* Shuffle  */}
            <Pressable>
                <Entypo name="shuffle" size={30} color="#fff" />
            </Pressable>

            {/* previous */}
            <Pressable>
                <Entypo name="controller-jump-to-start" size={44} color="#fff" />
            </Pressable>

            {/* Play */}
            <Pressable>
                <AntDesign name="play" size={70} color="#fff" />
            </Pressable>

            {/* next */}
            <Pressable>
                <Entypo name="controller-next" size={44} color="#fff" />
            </Pressable>

            {/* remove */}
            <Pressable>
                <Ionicons name="remove-circle-outline" size={30} color="#fff" />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    }
})