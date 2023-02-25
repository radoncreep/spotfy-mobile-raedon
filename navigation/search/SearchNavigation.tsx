import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { IArtistResponse } from "../../api/artist/artist.types";

import { HomeScreen } from "../../screens/home/HomeScreen";
import { SearchScreen } from "../../screens/search/SearchScreen";
import { ArtistScreen } from "../../screens/shared/Artist/ArtistScreen";


export type SearchNavigationParamList = {
    SearchIndex: undefined
    ArtistScreen: IArtistResponse;
}

const Stack = createNativeStackNavigator<SearchNavigationParamList>();

export const SearchNavigation = () => {
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
            <Stack.Screen name="SearchIndex" component={SearchScreen} />
            <Stack.Screen name="ArtistScreen" component={ArtistScreen} />
            {/* <Stack.Screen name="" component={} /> */}
        </Stack.Navigator>
    )
}