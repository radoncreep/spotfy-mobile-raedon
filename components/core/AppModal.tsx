import { Modal, ModalProps, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


interface AppModalProps extends ModalProps {
    isVisible: boolean;
    children: React.ReactElement;
}

const AppModal = ({ 
    animationType, 
    children,
    isVisible, 
    transparent, 
}: AppModalProps) => {
    return (
        <View style={styles.container}>
            <Modal 
                animationType={animationType}
                visible={isVisible}
                transparent={transparent}
            >
                {children}
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
    }
})

export default AppModal;