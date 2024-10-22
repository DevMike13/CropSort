import { View, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'

import HomeScreen from './Home/HomeScreen';
import RepInvScreen from './RI/RepInvScreen';
import HistoryScreen from './History/HistoryScreen';

import { COLORS, FONT, SIZES } from '../../constants/theme';

const Tab = createBottomTabNavigator();

const MotherScreen = ({ navigation }) => {
  return (
    <Tab.Navigator 
        screenOptions={{
        tabBarStyle: {
            height: 60,
            paddingTop: 10,
            paddingBottom: 10,
            borderTopLeftRadius: SIZES.medium,
            borderTopRightRadius: SIZES.medium
        },
        }}
    >
        <Tab.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{
            tabBarLabel: (tabInfo) => {
                return (
                <Text
                    style={{ 
                    color: tabInfo.focused ? 'green' : COLORS.gray4, 
                    fontFamily: tabInfo.focused ? FONT.bold : FONT.regular, 
                    fontSize: SIZES.small
                    }}
                >
                    Home
                </Text>
                );
            },
            tabBarIcon: (iconInfo) => {
                return (
                <Ionicons
                    name={iconInfo.focused ? "home" : "home-outline"}
                    size={iconInfo.focused ? 24 : 20}
                    color={iconInfo.focused ? 'green' : COLORS.gray4}
                />
                );
            },
            headerTitle: "",
            headerStyle:{
                backgroundColor:COLORS.lightWhite,
            },
            headerShown: false,
            headerShadowVisible: false
            }}
        />

        <Tab.Screen 
            name="RI" 
            component={RepInvScreen} 
            options={{
            tabBarLabel: (tabInfo) => {
                return (
                <Text
                    style={{ 
                    color: tabInfo.focused ? 'green' : COLORS.gray4, 
                    fontFamily: tabInfo.focused ? FONT.bold : FONT.regular,
                    fontSize: SIZES.small
                    }}
                >
                    Report & Inventory
                </Text>
                );
            },
            tabBarIcon: (iconInfo) => {
                return (
                <Ionicons
                    name={iconInfo.focused ? "bar-chart" : "bar-chart-outline"} 
                    size={iconInfo.focused ? 24 : 20}
                    color={iconInfo.focused ? 'green' : COLORS.gray4}
                />
                );
            },
            headerTitle: "",
            headerStyle:{
                backgroundColor:COLORS.lightWhite,
            },
            headerShadowVisible: false,
            headerShown: false,
            }}
        />

        <Tab.Screen 
            name="History" 
            component={HistoryScreen} 
            options={{
            tabBarLabel: (tabInfo) => {
                return (
                <Text
                    style={{ 
                    color: tabInfo.focused ? 'green' : COLORS.gray4, 
                    fontFamily: tabInfo.focused ? FONT.bold : FONT.regular,
                    fontSize: SIZES.small
                    }}
                >
                    History
                </Text>
                );
            },
            tabBarIcon: (iconInfo) => {
                return (
                    <Ionicons
                        name={iconInfo.focused ? "repeat" : "repeat-outline"} 
                        size={iconInfo.focused ? 24 : 20}
                        color={iconInfo.focused ? 'green' : COLORS.gray4}
                    />
                );
            },
            headerTitle: "",
            headerStyle:{
                backgroundColor:COLORS.lightWhite,
            },
            headerShadowVisible: false,
            headerShown: false,
            }}
        />
    </Tab.Navigator>
  )
}

export default MotherScreen