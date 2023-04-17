import { Text, View } from 'react-native';


const ErrorFeedback = ({error}: {error: Error}) => {
    return (
        <View>
            <Text 
                style={{ 
                    color: '#fff', // dynameic, depends on the theme 
                    fontSize: 22,
                    fontWeight: '500'
                }}
            >
                {error.message ?? "An error occured."}
            </Text>
        </View>
    )
}

export default ErrorFeedback;