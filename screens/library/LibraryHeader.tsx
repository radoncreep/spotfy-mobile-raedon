
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AntDesign, Feather } from '@expo/vector-icons';
import { memo } from "react";


type Props = {
    handleContentViewChange: () => void;
}

export const ListHeader = memo(({ handleContentViewChange }: Props) => {
    const sortBy: string[] = ["Recents", "Recently added", "Alphabetical", "Creator"];

    return (
        <View style={styles.subHeader}>
            <Pressable 
                onPress={() => console.log("sort by?")}
                style={{ 
                        flexDirection: 'row', 
                        flex: .8,  
                        width: 30, 
                        position: 'relative', 
                        alignItems: 'center'
                    }}
                >
                <AntDesign 
                    name="arrowdown" 
                    size={18} 
                    color="#fff" 
                    style={{ 
                        position: 'absolute',
                        left: 10
                    }} 
                    />
                <AntDesign name="arrowup" size={18} color="#fff" />
                
                <Text style={{ color: '#fff', fontSize: 14, fontWeight: 'normal', marginLeft: 12}}>
                    {sortBy[0]}
                </Text>

            </Pressable>

            <Pressable
                onPress={handleContentViewChange}
            >
                <Feather name="grid" size={24} color="#fff" />
                {/* list icon */}
            </Pressable>

        </View>
    )
})


const styles = StyleSheet.create({
    subHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})