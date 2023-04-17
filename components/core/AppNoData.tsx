import { Text, View } from "react-native";


export const AppNoData = () => {
    return (
        <View style={{ 
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#121211"
        }}>
            <Text style={{ fontSize: 10, fontWeight: "700", color: "#fff"}}>
                Sorry, No data.
            </Text>
        </View>
    )
}