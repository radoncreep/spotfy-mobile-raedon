import { StyleSheet, Text, View } from "react-native";
import { Feather } from '@expo/vector-icons';
import { AppPill } from "../core/AppPill";


export const LibraryScreenHeader = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={{ flex: 0.6, flexDirection: 'row', alignItems: 'center' }}>
                    <View 
                        style={{
                            backgroundColor: 'pink',
                            width: 36,
                            height: 36,
                            borderRadius: 20,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginRight: 6
                        }}    
                    >
                        <Text style={{ color: 'black', fontSize: 22, fontWeight: '500'}}>
                            W
                        </Text>
                    </View>
                    <Text style={styles.headerText}>
                        Your Library
                    </Text>
                </View>

                <View
                    style={{
                        flexDirection: 'row',
                        flex: 0.2,
                        justifyContent: 'space-between',
                    }}
                >
                    <Feather name="search" size={28} color="#fff" />
                    <Feather name="plus" size={28} color="#fff" />            
                </View>
            </View>

            <View style={styles.pillContainer}>
                <AppPill 
                    onPress={() => console.log("p")}
                    pillText="Playlists"
                />
                <AppPill 
                    onPress={() => console.log("p")}
                    pillText="Artists"
                    containerStyle={{
                        marginLeft: 6
                    }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // height: 120,
        // paddingTop: 26,
        flex: .22,
        paddingBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6},
        shadowOpacity: 0.8,
        shadowRadius: 6,  
        justifyContent: 'flex-end',
        // elevation: 5,
        backgroundColor: '#121212',
        // backgroundColor: 'red',
        paddingHorizontal: 10
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        // height: 56,
        // backgroundColor: 'red',
    },
    headerText: {
        fontSize: 28,
        fontWeight: '700',
        color: '#fff'
    },
    pillContainer: {
        flexDirection: 'row',
        // backgroundColor: 'red',
        marginTop: 28
    }
})