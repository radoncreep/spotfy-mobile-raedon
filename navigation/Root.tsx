
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useAppSelector } from "../store/hooks"
import { AuthenticatedNavigation } from "./Authenticated"
import { OnboardStackNavigator } from "./Onboard"


export const Root = () => {
    const { email, username } = useAppSelector((state) => state.auth);

    console.log({ email, username })

    return (
        <>
            { (!email || !username) ? 
                <OnboardStackNavigator /> : 
                <GestureHandlerRootView style={{ flex: 1 }}>
                    <AuthenticatedNavigation /> 
                </GestureHandlerRootView>
            }
        </>
    )
}