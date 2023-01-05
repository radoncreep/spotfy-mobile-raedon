import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { HomeScreen } from "../../screens/home/HomeScreen";


type SearchNavigationParamList = {
}

const Stack = createNativeStackNavigator<SearchNavigationParamList>();

export const SearchNavigation = () => {
    return (
        <Stack.Navigator>
            {/* <Stack.Screen name="HomeIndex" component={HomeScreen} /> */}
            {/* <Stack.Screen name="" component={} /> */}
        </Stack.Navigator>
    )
}