import { Text, View } from "react-native";
import { Feather } from '@expo/vector-icons';
import { memo } from "react";


export const LibraryListFooter = memo(({ numColumns }: { numColumns: 1 | 2 }) => {
    return (
        <View 
            style={{ 
                flexDirection: numColumns === 1 ? 'column' : 'row',
                marginVertical: 10 
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View 
                    style={{ 
                        backgroundColor: '#282828',
                        width: 70,
                        height: 70,
                        borderRadius: 45,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Feather name="plus" size={46} color="#B3B3B3" /> 
                </View>

                <Text
                    style={{
                        color: '#fff',
                        fontSize: 14,
                        fontWeight: 'normal',
                        marginLeft: 6
                    }} 
                > Add Artists</Text>
            </View>

            <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                <View
                    style={{
                        backgroundColor: '#282828',
                        width: 70,
                        height: 70,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Feather name="plus" size={46} color="#B3B3B3" /> 
                </View>

                <Text
                    style={{
                        color: '#fff',
                        fontSize: 14,
                        fontWeight: 'normal',
                        marginLeft: 6
                    }} 
                >Add podcasts and shows</Text>
            </View>
        </View>
    )
});