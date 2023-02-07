import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useToken } from "native-base";

import { HomeNavigationParamList } from "../../types/stackScreen.types";
import { HomeScreen } from "../../screens/home/HomeScreen";
import { DetailsScreen } from "../../screens/Details/DetailsScreen";


const Stack = createNativeStackNavigator<HomeNavigationParamList>();

export const HomeNavigation = () => {

    return (
        <Stack.Navigator 
            screenOptions={{
                headerShown: false,
                contentStyle: {
                    backgroundColor: '#121212'
                },
                animationDuration: 0,
                animation: "default",
                animationTypeForReplace: "pop"
            }}
            
        >
            <Stack.Screen name="HomeIndex" component={HomeScreen} />
            <Stack.Screen name="AlbumDetails" component={DetailsScreen} />
        </Stack.Navigator>
    )
}