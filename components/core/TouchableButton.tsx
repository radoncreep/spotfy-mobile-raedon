import React, { memo } from 'react';
import { 
    Text, 
    TextStyle, 
    TouchableOpacity, 
    StyleSheet, 
    View, 
    ViewStyle,
    TouchableOpacityProps
} from 'react-native';

type TouchableButtonProps = {
    onPress: () => void;
    text: string;
    textStyle?: TextStyle;
    containerStyle?: ViewStyle;
    leftIcon?: JSX.Element;
    rightIcon?: JSX.Element;
    otherProps?: TouchableOpacityProps;
}

const TouchableButton = ({
    onPress,
    text,
    textStyle,
    containerStyle,
    leftIcon,
    rightIcon,
    otherProps
}: TouchableButtonProps) => {
    return (
        <TouchableOpacity 
            onPress={onPress}
            style={[styles.container, {...containerStyle}]}
            {...otherProps}
        >
            {leftIcon && 
                <View>
                    {leftIcon}
                </View>
            }

            <View style={{ flexDirection: 'row', flex: (leftIcon || rightIcon) && 1, justifyContent: 'center'}}>
                <Text style={[styles.text, {...textStyle}]}>
                    {text}
                </Text>
            </View>

            {rightIcon && 
                <View>
                    {rightIcon}
                </View> 
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {},
    text: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#fff',
        textAlign: 'center'
    },
    icon: {}
});

export default memo(TouchableButton);