import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeNavigation } from './home/HomeNavigation';
import { SearchNavigation } from './search/SearchNavigation';
import { LibraryNavigation } from './library/LibraryNavigation';
import { SubscriptionNavigation } from './subscription/SubscriptionNavigation';


type BottomTabContainerParamList = {

}

const Tab = createBottomTabNavigator();

export default function Root() {
    return (
        <Tab.Navigator>
            <Tab.Screen name='Home' component={HomeNavigation} />
            <Tab.Screen name='Search' component={SearchNavigation} />
            <Tab.Screen name='Your Library' component={LibraryNavigation} />
            <Tab.Screen name='Premium' component={SubscriptionNavigation} />
        </Tab.Navigator>
    )
}