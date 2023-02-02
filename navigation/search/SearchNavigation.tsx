import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { HomeScreen } from "../../screens/home/HomeScreen";
import { SearchScreen } from "../../screens/search/SearchScreen";


type SearchNavigationParamList = {
    search: undefined
}

const Stack = createNativeStackNavigator<SearchNavigationParamList>();

export const SearchNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="search" component={SearchScreen} />
            {/* <Stack.Screen name="" component={} /> */}
        </Stack.Navigator>
    )
}