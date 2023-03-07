import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';


interface Props {
    isPlaying: boolean;
}

export const AppPausePlayIcon = ({ isPlaying }: Props) => {
    return (
        <>
            {isPlaying ? 
                <FontAwesome name="play" style={styles.iconStyle} />
                :
                <FontAwesome name="pause" style={styles.iconStyle} />
            }
        </>
    )
}

const styles = StyleSheet.create({
    contentMini: {
        flex: 1,
        justifyContent: "flex-start",
        paddingHorizontal: 10,
        paddingTop: 6,
        alignItems: "center"
    },
    iconStyle: {
        fontSize: 22,
        color: "#fff",
    }
})