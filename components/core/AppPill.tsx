import { Pressable, StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native"


interface AppPillProps {
    containerStyle?: ViewStyle;
    pillText: string;
    pillTextStyle?: TextStyle;
    onPress?: () => void;
}

export const AppPill = ({ containerStyle, pillText, pillTextStyle, onPress }: AppPillProps) => {
    return (
        <Pressable
            onPress={onPress}
            style={[styles.pill, {...containerStyle}]}
        >
            <View>
                <Text
                    style={[styles.pillText, {...pillTextStyle}]}
                >
                    {pillText}
                </Text>
            </View>
        </Pressable>
    )
}


const styles = StyleSheet.create({
    pill: {
        backgroundColor: '#282828',
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderWidth: 0,
        borderRadius: 14
    },
    pillText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'normal'
    }
})