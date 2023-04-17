import { Dispatch, SetStateAction } from "react";
import { 
    Text, 
    TouchableWithoutFeedback, 
    View 
} from "react-native";
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';
import { VStack } from "native-base";

import AppProfileAvatar from "./ProfileAvatar";


interface IRenderArtistAvatar {
    index: number;
    item: Record<string, any>;
    selectedIndex: number[];
    setSelectedIndex: Dispatch<SetStateAction<number[]>>;
}

const ArtistAvatarListItem = ({ index, item, selectedIndex, setSelectedIndex }: IRenderArtistAvatar) => {
    
    const handleSelectProfile = (item: Record<string, any>) => {        
        Haptics.selectionAsync();

        setSelectedIndex((prev) => {
            if (prev.length > 0) {
                if (prev.includes(index)) {
                    const filter = prev.filter((currentIndex) => currentIndex !== index);
                    return filter;
                }
                return [...prev, index]
            }
            return [index]
        })
    }

    const isSelected = (selectedIndex: number[], index: number): boolean => {
        return selectedIndex.includes(index);
    }

    return (
        <TouchableWithoutFeedback
            style={{
                padding: 10,
                backgroundColor: '#fff'
            }}
            onPress={() => handleSelectProfile(item)}
        >
            <VStack 
                space={2.5} 
                style={{ 
                    paddingVertical: 10, 
                    alignItems: 'center',
                    position: 'relative',
                    maxHeight: 140
                }}
            >
                <AppProfileAvatar imageSource={item.images[0].url}/>

                <Text style={{ color: '#fff', fontWeight: '500'}}>{item['name']}</Text>

                <>
                    {isSelected(selectedIndex, index) && 
                        <View 
                            style={{ 
                                backgroundColor: '#fff', 
                                borderRadius: 40, 
                                paddingHorizontal: 2, 
                                paddingVertical: 1 ,
                                position: 'absolute',
                                zIndex: 1,
                                right: 0,
                                top: 20
                            }}
                        >
                            <Ionicons name="checkmark" size={24} color="#000" />
                        </View>
                    }
                </>
            </VStack>
        </TouchableWithoutFeedback>
    )
}

export default ArtistAvatarListItem;