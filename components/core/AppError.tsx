import { StyleSheet, Text, View } from "react-native"


type AppErrorProps = {
    message: string;
}

export const AppError = ({ message }: AppErrorProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                {message}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    },
    text: {
        fontSize: 18,
        fontWeight: "600",
        color: "#fff"
    }
})