import { HStack } from "native-base";
import { ColorValue, View } from "react-native";


type AppRainMeterProp = {
    bgColor?: ColorValue
}

export const AppRainMeter = ({ bgColor="#fff" }: AppRainMeterProp) => {
    return (
        <HStack space={0.5}>
            {new Array(20).fill(0).map((_, index) => (
                <View 
                    key={index}
                    style={{
                        width: 4,
                        height: Math.floor(Math.random() * 40),
                        backgroundColor: bgColor
                    }}
                />
            ))}
        </HStack>
    )
}

