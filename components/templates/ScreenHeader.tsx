import React from 'react';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { getHeaderTitle } from '@react-navigation/elements';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView} from 'react-native-safe-area-context';


const ScreenHeader = (
    { navigation, route, options, back }: NativeStackHeaderProps
) => {

    const headerTitle = getHeaderTitle(options, route.name);

    // console.log(Dimensions.get('screen').width)

    return (
        <SafeAreaView style={styles.container} edges={["top"]}>

            <View 
                style={{ 
                    flex: 1, 
                    flexDirection: 'row', 
                    justifyContent: 'flex-start', 
                    alignItems: 'center',
                    paddingLeft: 10
                }}
            >
                <Pressable 
                    onPress={() => navigation.goBack()}
                    style={{ flex: 0.3 }}
                >
                    <Feather name="chevron-left" size={30} color="#fff" />
                </Pressable>
                <Text style={styles.heading}>
                    {headerTitle}
                </Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 100,
        flexDirection: 'row',
        backgroundColor: '#121212',
        shadowColor: '#000',
        shadowOpacity: 1
    },
    heading: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 24,
        flex: 0.7
    }
})

export default ScreenHeader;