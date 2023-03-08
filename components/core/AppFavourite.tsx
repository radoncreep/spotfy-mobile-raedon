import { Pressable, ViewStyle } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';


interface Props {
    isFavorite: boolean;
    handleIsFavorite: () => void;
    favIconStyle?: ViewStyle;
    notFavIconStyle?: ViewStyle;
}

export const AppFavouriteIcons = ({isFavorite, handleIsFavorite, favIconStyle, notFavIconStyle }: Props) => {
    return (
        <Pressable onPress={handleIsFavorite}>
            {!isFavorite ? (
                <MaterialIcons 
                    name="favorite-outline" 
                    size={24} 
                    style={[{
                        opacity: 0.8,
                        color: "#fff",
                        fontSize: 30
                    },
                    favIconStyle
                ]} 
                />
            ): (
                <MaterialIcons 
                    name="favorite" 
                    size={30} 
                    color='#57B65F'
                    style={{ ...notFavIconStyle }}
                />
            )}
        </Pressable>
    )
}