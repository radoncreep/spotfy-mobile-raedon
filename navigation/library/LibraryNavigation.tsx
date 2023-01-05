import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { HomeScreen } from "../../screens/home/HomeScreen";


type LibraryNavigationParamList = {
    HomeIndex: undefined;
}

const Stack = createNativeStackNavigator<LibraryNavigationParamList>();

export const LibraryNavigation = () => {
    return (
        <Stack.Navigator>
            {/* <Stack.Screen name="HomeIndex" component={HomeScreen} /> */}
            {/* <Stack.Screen name="" component={} /> */}
        </Stack.Navigator>
    )
}