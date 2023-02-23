import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { HomeScreen } from "../../screens/home/HomeScreen";

import { AlbumScreen } from "../../screens/shared/Album/AlbumScreen";
import { ArtistScreen } from "../../screens/shared/Artist/ArtistScreen";
import { HomeNavigationParamList } from "./home.navigation.types";


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
            <Stack.Screen name="AlbumScreen" component={AlbumScreen} />
            <Stack.Screen name="ArtistScreen" component={ArtistScreen} />
        </Stack.Navigator>
    )
}