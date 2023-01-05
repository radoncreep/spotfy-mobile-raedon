import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { HomeScreen } from "../../screens/home/HomeScreen";


type HomeNavigationParamList = {
    HomeIndex: undefined;
}

const Stack = createNativeStackNavigator<HomeNavigationParamList>();

export const HomeNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="HomeIndex" component={HomeScreen} />
            {/* <Stack.Screen name="" component={} /> */}
        </Stack.Navigator>
    )
}