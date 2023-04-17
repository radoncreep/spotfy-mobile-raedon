import { StyleSheet, Text, View } from "react-native";
import { AntDesign, Feather, Ionicons  } from '@expo/vector-icons';


export const HomeScreenHeader = () => {
    return (
        <View style={styles.header}>
            <View style={{ flex: 0.6 }}>
                <Text style={styles.headerText}>
                    Good evening
                </Text>
            </View>

            <View
                style={{
                    flexDirection: 'row',
                    flex: 0.3,
                    // backgroundColor: 'green',
                    justifyContent: 'space-between'
                }}
            >
                <Ionicons name="notifications-outline" size={26} color="#fff" />
                <Feather name="clock" size={26} color="#fff" />
                <AntDesign name="setting" size={26} color="#fff" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        height: 56,
        marginBottom: 14
    },
    headerText: {
        fontSize: 26,
        fontWeight: '700',
        color: '#fff'
    }
})