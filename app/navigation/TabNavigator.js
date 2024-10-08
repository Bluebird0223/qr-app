import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ScannerScreen from "./ScannerScreen"; // Make sure to import your screens
import ListScreen from "./ListScreen";
import ProfileScreen from "./ProfileScreen";
import { TabBarIcon } from "../components/TabBarIcon"; // Ensure the correct path to your TabBarIcon
import { MaterialIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Scanner"
        component={ScannerScreen}
        options={{
          title: 'Scanner',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="qr-code-scanner" color={color} iconType="MaterialIcons" />
          ),
        }}
      />
      <Tab.Screen
        name="List"
        component={ListScreen}
        options={{
          title: 'List',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="list-alt" color={color} iconType="FontAwesome5" />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="user" color={color} iconType="FontAwesome5" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
