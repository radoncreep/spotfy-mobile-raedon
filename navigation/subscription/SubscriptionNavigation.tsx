import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { HomeScreen } from "../../screens/home/HomeScreen";


type SubscriptionNavigationParamList = {
    HomeIndex: undefined;
}

const Stack = createNativeStackNavigator<SubscriptionNavigationParamList>();

export const SubscriptionNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="HomeIndex" component={HomeScreen} />
            {/* <Stack.Screen name="" component={} /> */}
        </Stack.Navigator>
    )
}