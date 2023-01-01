import { Image, Text, View } from "react-native";
import AppModal from "../core/AppModal";


type GreatPicksModalProps = {
    artistImages: Record<string, any>[],
}

const GreatPicksModal = ({ artistImages }: GreatPicksModalProps) => {
    return (
        <AppModal 
            animationType="slide"
            transparent={false}
            isVisible={true}
        >
            <View 
                style={{ 
                    backgroundColor: '#121212', 
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    
                }}
            >
                <View style={{ flexDirection: 'row', marginBottom: 10, justifyContent: 'center'}}>
                    {artistImages.map((artist, index) => {
                        return (
                            <View key={index} style={{ width: 40, height: 60,  }} >
                                { index < 4 &&
                                    <Image 
                                        source={{ uri: artist.images[0].url }} 
                                        style={{
                                            width: 60,
                                            height: 60,
                                            borderRadius: 30
                                        }}
                                    />
                                }
                            </View>
                        )
                    })}
                </View>
                
                <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>Great Picks!</Text>
            </View>
        </AppModal>
    )
}

export default GreatPicksModal;