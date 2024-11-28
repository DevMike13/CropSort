import { View, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeScreen from './Home/HomeScreen';
import RepInvScreen from './RI/RepInvScreen';
import HistoryScreen from './History/HistoryScreen';
import AccountScreen from './Accounts/AccountScreen';

import { COLORS, FONT, SIZES } from '../../constants/theme';

const Tab = createBottomTabNavigator();

const MotherScreen = ({ navigation }) => {
    const [userType, setUserType] = useState(null);

    useEffect(() => {
    const fetchUserType = async () => {
        try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUserType(parsedUser.userType); // Extract userType
        }
        } catch (error) {
        console.error('Error fetching userType:', error);
        }
    };

    fetchUserType();
    }, []);

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
                    fontSize: 10
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

    {userType === 'admin' && (
        <Tab.Screen
          name="Accounts"
          component={AccountScreen}
          options={{
            tabBarLabel: (tabInfo) => (
              <Text
                style={{
                  color: tabInfo.focused ? 'green' : COLORS.gray4,
                  fontFamily: tabInfo.focused ? FONT.bold : FONT.regular,
                  fontSize: SIZES.small,
                }}
              >
                Administrator
              </Text>
            ),
            tabBarIcon: (iconInfo) => (
              <Ionicons
                name={iconInfo.focused ? "cog" : "cog-outline"}
                size={iconInfo.focused ? 24 : 20}
                color={iconInfo.focused ? 'green' : COLORS.gray4}
              />
            ),
            headerTitle: "",
            headerStyle: {
              backgroundColor: COLORS.lightWhite,
            },
            headerShadowVisible: false,
            headerShown: false,
          }}
        />
      )}
    </Tab.Navigator>
  )
}

export default MotherScreen