import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Text, TouchableOpacity, View } from 'react-native';


const TopTab = createMaterialTopTabNavigator();

// function MyTabBar({ state, descriptors, navigation, position }) {
//     return (
//       <View style={{ flexDirection: 'row' }}>
//         {state.routes.map((route, index) => {
//           const { options } = descriptors[route.key];
//           const label =
//             options.tabBarLabel !== undefined
//               ? options.tabBarLabel
//               : options.title !== undefined
//               ? options.title
//               : route.name;
  
//           const isFocused = state.index === index;
  
//           const onPress = () => {
//             const event = navigation.emit({
//               type: 'tabPress',
//               target: route.key,
//               canPreventDefault: true,
//             });
  
//             if (!isFocused && !event.defaultPrevented) {
//               // The `merge: true` option makes sure that the params inside the tab screen are preserved
//               navigation.navigate({ name: route.name, merge: true });
//             }
//           };
  
//           const onLongPress = () => {
//             navigation.emit({
//               type: 'tabLongPress',
//               target: route.key,
//             });
//           };
  
//           const inputRange = state.routes.map((_, i) => i);
//           const opacity = position.interpolate({
//             inputRange,
//             outputRange: inputRange.map(i => (i === index ? 1 : 0)),
//           });
  
//           return (
//             <TouchableOpacity
//               accessibilityRole="button"
//               accessibilityState={isFocused ? { selected: true } : {}}
//               accessibilityLabel={options.tabBarAccessibilityLabel}
//               testID={options.tabBarTestID}
//               onPress={onPress}
//               onLongPress={onLongPress}
//               style={{ flex: 1 }}
//             >
//               <Text style={{ opacity }}>
//                 {label}
//               </Text>
//             </TouchableOpacity>
//           );
//         })}
//       </View>
//     );
// }

export const SearchTopBarNavigation = () => {
    const routes = [
        // { name: "Top", initialParams: undefined, component:  },
        { name: "Artists", initialParams: undefined },
        { name: "Albums", initialParams: undefined },
        { name: "Podcasts", initialParams: undefined },
        { name: "Genre & Moods", initialParams: undefined },
        { name: "Shows", initialParams: undefined },
    ];

    return (
        <TopTab.Navigator>
            {/* <TopTab.Screen name={routes/> */}
        </TopTab.Navigator>
    )
}