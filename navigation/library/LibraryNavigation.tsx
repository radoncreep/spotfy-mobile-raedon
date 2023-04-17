import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { YourLibraryScreen } from "../../screens/library/YourLibraryScreen";


type LibraryNavigationParamList = {
    index: undefined;
}

const Stack = createNativeStackNavigator<LibraryNavigationParamList>();

export const LibraryNavigation = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                contentStyle: {
                    backgroundColor: '#121212'
                }
            }}
        >
            <Stack.Screen name="index" component={YourLibraryScreen} />
        </Stack.Navigator>
    )
}