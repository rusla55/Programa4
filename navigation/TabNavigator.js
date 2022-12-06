import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SearchAdStackNavigator, CreateAdStackNavigator } from "./StackNavigator";
import Ionicons from "react-native-vector-icons/Ionicons";

const searchPage = "All Scans";
const addPage = "Scan";

const Tab = createBottomTabNavigator();
export default function TabNavigator(){
    return(
        <Tab.Navigator 
            initialRouteName = {addPage}
            screenOptions = {({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    let routeName = route.name;
                    if (routeName == searchPage){
                        iconName = focused ? "search-sharp" : "search-outline";
                    } else if (routeName == addPage){
                        iconName = focused ? "add-circle" : "add-circle-outline";
                    }
                    return <Ionicons name = { iconName } size = {size} color = {color}/>
                },
            })}>
            
            <Tab.Screen name = {searchPage} component = {SearchAdStackNavigator} options = {{ headerShown: false }}/>
            <Tab.Screen name = {addPage} component = {CreateAdStackNavigator} options = {{ headerShown: false }}/>
        </Tab.Navigator>
    )
}