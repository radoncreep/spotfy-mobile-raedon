import { Text, View } from 'react-native';


const AppLoader = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text 
                style={{ 
                    color: '#fff', // dynameic, depends on the theme 
                    fontSize: 22,
                    fontWeight: 'bold'
                }}
            >
                Loading...
            </Text>
        </View>
    )
}

export default AppLoader;