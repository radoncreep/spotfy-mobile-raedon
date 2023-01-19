import { useContext } from "react"
import { AuthContext } from "../store/Auth.context"
import { AuthenticatedNavigation } from "./Authenticated"
import { OnboardStackNavigator } from "./Onboard"


export const Root = () => {
    const { state } = useContext(AuthContext);

    console.log({state});

    return (
        <>
            { state === null ? <OnboardStackNavigator /> : <AuthenticatedNavigation /> }
        </>
    )
}