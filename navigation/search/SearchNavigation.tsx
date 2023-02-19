import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { HomeScreen } from "../../screens/home/HomeScreen";
import { SearchScreen } from "../../screens/search/SearchScreen";


type SearchNavigationParamList = {
    search: undefined
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
            <Stack.Screen name="search" component={SearchScreen} />
            {/* <Stack.Screen name="" component={} /> */}
        </Stack.Navigator>
    )
}