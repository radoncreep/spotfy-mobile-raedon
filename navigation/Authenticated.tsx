import React from 'react';
import { View, Text, TouchableOpacity, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeNavigation } from './home/HomeNavigation';
import { SearchNavigation } from './search/SearchNavigation';
import { LibraryNavigation } from './library/LibraryNavigation';
import { SubscriptionNavigation } from './subscription/SubscriptionNavigation';

import { Octicons, Ionicons, Entypo } from '@expo/vector-icons';


function CustomBottomTab({ descriptors, insets, navigation, state }: BottomTabBarProps) {
    return (
        <View 
            style={{ 
                flexDirection: 'row',
                height: 60,
                alignItems: 'center',
                justifyContent: 'space-evenly' 
            }} 
        >
            {state.routes.map((route, index) => {
                const {options} = descriptors[route.key];
                const label = options.title ?? route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true
                    })

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate({ 
                            name: route.name, 
                            merge: true, 
                            params: route.params 
                        })
                    }
                }

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key
                    })
                }

                return (
                    <TouchableOpacity
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{ flex: 1 }}
                        key={route.key}
                    >
                        <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
                            {label}
                        </Text>
                    </TouchableOpacity>

                )
            })}
        </View>
    )
}

type BottomTabContainerParamList = {

}

const Tab = createBottomTabNavigator();




export const AuthenticatedNavigation = () => {
    return (
        <Tab.Navigator 
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {              
                    let iconStyle: StyleProp<TextStyle> = {
                        color: '#fff',
                        opacity: focused ? 1 : 0.4
                    }

                    switch (route.name) {
                        case "Home":
                            return <Octicons name="home" size={24} style={{...iconStyle}} />
                        case "Search":
                            return <Octicons name="search" size={24} style={{...iconStyle}} />
                        case "Your Library":
                            return <Ionicons name="ios-library-outline" size={24} style={{...iconStyle}} />
                        default:
                            return <Entypo name="spotify" size={24} style={{...iconStyle}} />
                    }
                },
                tabBarShowLabel: true,
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#121212',
                    borderWidth: 0,
                    borderColor: '#FFF',
                    borderTopColor: 'transparent',
                    shadowColor: '#ffff',
                    shadowOpacity: .1
                },
                tabBarLabel: ({ focused, color, children, position }) => {
                    return (
                        <Text 
                            style={{ 
                                color: '#fff',
                                opacity: focused ? 1 : 0.4,
                                fontWeight: '500',
                                fontSize: 12
                            }}
                        >
                            {route.name}
                        </Text>
                    )
                }
            })}
            sceneContainerStyle={{
                backgroundColor: '#000'
            }}

            // tabBar={(props) => <CustomBottomTab {...props} />}
        > 
            <Tab.Screen name='Home' component={HomeNavigation} />
            <Tab.Screen name='Search' component={SearchNavigation} />
            <Tab.Screen name='Your Library' component={LibraryNavigation} />
            <Tab.Screen name='Premium' component={SubscriptionNavigation} />
        </Tab.Navigator>
    )
}