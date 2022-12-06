import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ScanScreen from "./screens/ScanScreen";
import ViewScans from "./screens/ViewScans";
import EditScan from "./screens/EditScan";

const Stack = createStackNavigator();
const screenOptionStyle = {
    headerStyle: {
      backgroundColor: "#6435e7",
    },
    headerTintColor: "#fff",
    headerBackTitle: "Back",
};

const SearchAdStackNavigator = () => {
    return (
      <Stack.Navigator screenOptions = {screenOptionStyle}>
        <Stack.Screen name = "View Scans" component = {ViewScans} options = {{  
          headerTitleAlign: 'center',
        }} />
        <Stack.Screen name = "Edit Item" component = {EditScan} options = {{
          headerTitleAlign: 'center',
        }}/>
      </Stack.Navigator>
    );
}

const CreateAdStackNavigator = () => {
    return (
      <Stack.Navigator screenOptions = {screenOptionStyle}>
        <Stack.Screen name = "Scan Code" component = {ScanScreen} options = {{
          headerTitleAlign: 'center',
        }}/>
      </Stack.Navigator>
    );
}

export { SearchAdStackNavigator, CreateAdStackNavigator };

