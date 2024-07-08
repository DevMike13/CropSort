import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import DisclaimerScreen from '../screens/DisclaimerScreen';
import MainScreen from '../screens/MainScreen';
import TutorialScreen from '../screens/TutorialScreen';
import ControlScreen from '../screens/ControlScreen';
import AboutScreen from '../screens/AboutScreen';
import MotherScreen from '../screens/Tabs/MotherScreen';

import { Image, Text, TouchableOpacity } from 'react-native';

const Stack = createStackNavigator();

const AppNavigator = () => {
    
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen 
                    name="Disclaimer" 
                    component={DisclaimerScreen} 
                    options={{ headerShown: false }}
                />
                <Stack.Screen 
                    name="Mother" 
                    component={MotherScreen} 
                    options={({ navigation }) => ({
                        headerShown: true,
                        headerTitle: '',
                        headerShadowVisible: true,
                        headerLeft: () => (
                            <TouchableOpacity className="w-8 h-8 px-2" onPress={() => navigation.navigate('Disclaimer')}>
                                <Image
                                    source={require('../assets/bell.png')}
                                    className="w-8 h-8"
                                    resizeMode='cover'
                                />
                            </TouchableOpacity>
                        ),
                        headerRight: () => (
                            <TouchableOpacity className="w-8 h-8 pr-9" onPress={() => navigation.navigate('Disclaimer')}>
                                <Image
                                    source={require('../assets/graph.png')}
                                    className="w-8 h-8"
                                    resizeMode='cover'
                                />
                            </TouchableOpacity>
                        ),
                    })}
                />
                <Stack.Screen 
                    name="Main" 
                    component={MainScreen} 
                    options={({ navigation }) => ({
                        headerShown: true,
                        headerTitle: '',
                        headerShadowVisible: true,
                        headerLeft: () => (
                            <TouchableOpacity className="w-8 h-8 px-2" onPress={() => navigation.navigate('Disclaimer')}>
                                <Image
                                    source={require('../assets/bell.png')}
                                    className="w-8 h-8"
                                    resizeMode='cover'
                                />
                            </TouchableOpacity>
                        ),
                        headerRight: () => (
                            <TouchableOpacity className="w-8 h-8 pr-9" onPress={() => navigation.navigate('Disclaimer')}>
                                <Image
                                    source={require('../assets/graph.png')}
                                    className="w-8 h-8"
                                    resizeMode='cover'
                                />
                            </TouchableOpacity>
                        ),
                    })}
                />
                <Stack.Screen 
                    name="Tutorial" 
                    component={TutorialScreen} 
                    options={({ navigation }) => ({
                        headerShown: true,
                        headerTitle: '',
                        headerShadowVisible: true,
                        headerLeft: () => (
                            <TouchableOpacity className="w-8 h-8 px-2" onPress={() => navigation.goBack()}>
                                <Image
                                    source={require('../assets/back.png')}
                                    className="w-8 h-8"
                                    resizeMode='cover'
                                />
                            </TouchableOpacity>
                        ),
                    })}
                />
                <Stack.Screen 
                    name="Control" 
                    component={ControlScreen} 
                    options={({ navigation }) => ({
                        headerShown: true,
                        headerTitle: '',
                        headerShadowVisible: true,
                        headerLeft: () => (
                            <TouchableOpacity className="w-8 h-8 px-2" onPress={() => navigation.goBack()}>
                                <Image
                                    source={require('../assets/back.png')}
                                    className="w-8 h-8"
                                    resizeMode='cover'
                                />
                            </TouchableOpacity>
                        ),
                        headerRight: () => (
                            <TouchableOpacity className="w-8 h-8 pr-9" onPress={() => navigation.navigate('Disclaimer')}>
                                <Image
                                    source={require('../assets/graph.png')}
                                    className="w-8 h-8"
                                    resizeMode='cover'
                                />
                            </TouchableOpacity>
                        ),
                    })}
                />
                <Stack.Screen 
                    name="About" 
                    component={AboutScreen} 
                    options={({ navigation }) => ({
                        headerShown: true,
                        headerTitle: '',
                        headerShadowVisible: true,
                        headerLeft: () => (
                            <TouchableOpacity className="w-8 h-8 px-2" onPress={() => navigation.goBack()}>
                                <Image
                                    source={require('../assets/back.png')}
                                    className="w-8 h-8"
                                    resizeMode='cover'
                                />
                            </TouchableOpacity>
                        ),
                    })}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;