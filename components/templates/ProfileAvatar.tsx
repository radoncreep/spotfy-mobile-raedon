import React from "react";
import { Image, StyleSheet, ViewStyle } from "react-native";


type ProfileAvatarProps = {
    imageSource: string;
    containerStyle?: ViewStyle
}

const ProfileAvatar = ({ imageSource, containerStyle }: ProfileAvatarProps) => {
    return (
        <Image 
            source={{uri: imageSource}}
            style={styles.image}
        />
    )
}

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
        borderRadius: 50
    }
})

export default ProfileAvatar;