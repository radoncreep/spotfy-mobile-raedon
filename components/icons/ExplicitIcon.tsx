import { MaterialIcons } from '@expo/vector-icons';
import { StyleProp, ImageStyle } from 'react-native';

type IconStyle = {
    customStyle?: StyleProp<ImageStyle>;
    iconSize?: number;
}

export const ExplicitIcons = ({ customStyle, iconSize=20 }: IconStyle) => (
    <MaterialIcons 
        name="explicit" 
        size={iconSize} 
        style={[{ color: '#fff', opacity: .5 }, customStyle]}
    />
)