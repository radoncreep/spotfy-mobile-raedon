import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useToken } from "native-base";

import { HomeScreen } from "../../screens/home/HomeScreen";


type HomeNavigationParamList = {
    HomeIndex: undefined;
}

const Stack = createNativeStackNavigator<HomeNavigationParamList>();

export const HomeNavigation = () => {

    return (
        <Stack.Navigator 
            screenOptions={{
                headerShown: false,
                contentStyle: {
                    backgroundColor: '#121212'
                }
            }}
        >
            <Stack.Screen name="HomeIndex" component={HomeScreen} />
            {/* <Stack.Screen name="" component={} /> */}
        </Stack.Navigator>
    )
}