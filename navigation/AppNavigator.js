import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import Modal from "react-native-modal";
import firebase from '../firebase';
import Toast from 'react-native-toast-message';
import { Ionicons } from '@expo/vector-icons';

import DisclaimerScreen from '../screens/Disclaimer/DisclaimerScreen';
import MainScreen from '../screens/Main/MainScreen';
import TutorialScreen from '../screens/TutorialScreen';
import ControlScreen from '../screens/ControlScreen';
import AboutScreen from '../screens/AboutScreen';
import MotherScreen from '../screens/Tabs/MotherScreen';
import LoginScreen from '../screens/Auth/Login/LoginScreen';
import AccountScreen from '../screens/Auth/Account/AccountScreen';
import RegisterScreen from '../screens/Auth/Register/RegisterScreen';

import { Image, Text, TouchableOpacity, View, Button, ActivityIndicator  } from 'react-native';

const Stack = createStackNavigator();

const AppNavigator = () => {

    const [isModalVisible, setModalVisible] = useState(false);
    const [isInfoModalVisible, setInfoModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [seasonInfo, setSeasonInfo] = useState('');
    const [currentSeason, setCurrentSeason] = useState(0);

    // Function to toggle the modal visibility
    const showModal = () => {
        setModalVisible(true);
    };

    const hideModal = () => {
        setModalVisible(false);
    };

    const showInfoModal = () => {
        setInfoModalVisible(true);
    };

    const hideInfoModal = () => {
        setInfoModalVisible(false);
    };

    const getCurrentSeason = () => {
        const seasonRef = firebase.database().ref('/currentSeason');

        seasonRef.on('value', (snapshot) => {
            const seasonData = snapshot.val();
            console.log('Current season data:', seasonData);
            setSeasonInfo(seasonData);
            setCurrentSeason(seasonData);
            setIsLoading(false);
        });
    };

    const createNewSeason = async () => {
        try {
            setIsLoading(true);

            const startDate = new Date();

            // Store the new season in Firestore
            const db = firebase.firestore();
            await db.collection('seasons').add({
                season_no: currentSeason + 1, // Increment the current season
                start_date: startDate,
            });

            Alert.alert('Success', 'New season created successfully');
        } catch (error) {
            console.error('Error creating new season: ', error);
            Alert.alert('Error', 'Failed to create new season');
        } finally {
            setIsLoading(false);
        }
    };

    // Function to start a new season
    const startNewSeason = async () => {
        setInfoModalVisible(false);
        setModalVisible(false);
        // Update RTDB
        const newSeasonNumber = currentSeason + 1;
        await firebase.database().ref('/currentSeason').set(newSeasonNumber);

        // Get today's date
        const startDate = new Date();

        // Store the new season in Firestore
        const seasonData = {
            season_no: newSeasonNumber,
            start_date: startDate,
        };

        const firestore = firebase.firestore();
        
        // Update the previous season's end_date if exists
        if (currentSeason > 0) {
            // Update end date of the previous season
            const previousSeasonRef = firestore.collection('seasons').doc(`season_${currentSeason}`);
            await previousSeasonRef.update({ end_date: startDate });
        }

        // Add the new season
        await firestore.collection('seasons').doc(`season_${newSeasonNumber}`).set(seasonData);
       
        Toast.show({
            type: 'success',
            position: 'top',
            text1: 'Success!',
            text2: 'Season has been created!',
            visibilityTime: 3000,
        });

        // Update state
        setSeasonInfo(newSeasonNumber);
    };

    useEffect(() => {
        getCurrentSeason();
    }, []);
    
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen 
                    name="Login" 
                    component={LoginScreen} 
                    options={{ headerShown: false }}
                />
                <Stack.Screen 
                    name="Register" 
                    component={RegisterScreen} 
                    options={{ headerShown: false }}
                />
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
                            <TouchableOpacity className="px-2" onPress={() => navigation.navigate("Account")}>
                               <Ionicons name="person-outline" size={26} color="black" />
                            </TouchableOpacity>
                        ),
                        headerRight: () => (
                            <TouchableOpacity className="w-auto h-auto bg-green-400 mr-5 flex justify-center items-center flex-row px-6 py-1.5 rounded-md" onPress={() => showModal()}>
                                <Text>Season: </Text>
                                {
                                    isLoading ? (
                                        <ActivityIndicator size="small" color="#00ff00" />
                                    ) : (
                                        <Text className="ml-3 font-bold text-base bg-orange-200 px-2 rounded-full">{seasonInfo}</Text>
                                    )
                                }
                            </TouchableOpacity>
                        ),
                    })}
                />
                 <Stack.Screen 
                    name="Account" 
                    component={AccountScreen} 
                    options={({ navigation }) => ({
                        headerShown: true,
                        headerTitle: '',
                        headerShadowVisible: true,
                        headerLeft: () => (
                            <TouchableOpacity className="px-2" onPress={() => navigation.goBack()}>
                               <Ionicons name="arrow-back-outline" size={26} color="black" />
                            </TouchableOpacity>
                        ),
                        headerRight: () => (
                            <TouchableOpacity className="w-auto h-auto bg-green-400 mr-5 flex justify-center items-center flex-row px-6 py-1.5 rounded-md" onPress={() => showModal()}>
                                <Text>Season: </Text>
                                {
                                    isLoading ? (
                                        <ActivityIndicator size="small" color="#00ff00" />
                                    ) : (
                                        <Text className="ml-3 font-bold text-base bg-orange-200 px-2 rounded-full">{seasonInfo}</Text>
                                    )
                                }
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
                            <TouchableOpacity className="px-2" onPress={() => navigation.navigate("Account")}>
                                <Ionicons name="person-outline" size={26} color="black" />
                            </TouchableOpacity>
                        ),
                        headerRight: () => (
                            <TouchableOpacity className="w-auto h-auto bg-green-400 mr-5 flex justify-center items-center flex-row px-6 py-1.5 rounded-md" onPress={() => showModal()}>
                                <Text>Season: </Text>
                                {
                                    isLoading ? (
                                        <ActivityIndicator size="small" color="#00ff00" />
                                    ) : (
                                        <Text className="ml-3 font-bold text-base bg-orange-200 px-2 rounded-full">{seasonInfo}</Text>
                                    )
                                }
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
                            <TouchableOpacity className="w-auto h-auto bg-green-400 mr-5 flex justify-center items-center flex-row px-6 py-1.5 rounded-md" onPress={() => showModal()}>
                                <Text>Season: </Text>
                                {
                                    isLoading ? (
                                        <ActivityIndicator size="small" color="#00ff00" />
                                    ) : (
                                        <Text className="ml-3 font-bold text-base bg-orange-200 px-2 rounded-full">{seasonInfo}</Text>
                                    )
                                }
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
            <Toast />
            <Modal
                isVisible={isModalVisible}
                onBackdropPress={hideModal}
                animationIn="slideInUp"
                animationOut="slideOutDown"
            >
                <View className="w-72 p-5 bg-white rounded-whitelg self-center">
                    <View>
                        {
                            seasonInfo ? (
                                <View className="flex flex-row justify-center items-center gap-1 py-5 border border-dashed">
                                    <Text className="font-medium text-base text-gray-700">Current Season: </Text>
                                    <Text className="font-bold text-xl bg-orange-400 text-white px-2 rounded-full">{seasonInfo}</Text>
                                </View>
                            ) : (
                                <View className="flex flex-row justify-center items-center gap-1 py-5 border border-dashed">
                                    <Text className="font-light text-gray-500 italic">No Season Created Yet!</Text>
                                </View>
                            )
                        }
                    </View>
                    
                    <View className="flex flex-row justify-around mt-5">
                        <Button title="Close" color="red" onPress={hideModal} />
                        {currentSeason === 0 ? (
                            <Button title="Start Season" onPress={showInfoModal} />
                        ) : (
                            <Button 
                                title={isLoading ? 'Creating Season...' : 'Create New Season'} 
                                onPress={showInfoModal} 
                                disabled={isLoading} 
                            />
                        )}
                    </View>
                </View>
            </Modal>

            <Modal
                isVisible={isInfoModalVisible}
                animationIn="slideInUp"
                animationOut="slideOutDown"
            >
                <View className="w-80 p-5 bg-white rounded-whitelg self-center">
                        {
                            seasonInfo == 0 ? (
                                <View className="flex flex-row justify-center items-center gap-1 py-5 border border-dashed">
                                    <Text className="font-medium text-base">Would you like start a season?</Text>
                                </View>
                                
                            ) : (
                                <View className="flex flex-col justify-center items-center gap-1 py-5 border border-dashed">
                                    <Text className="text-base">Would you like create new season?</Text>
                                    <Text className="text-xs text-red-500 italic">(Note: This will end the current season.)</Text>
                                </View>
                            )
                        }
                       
                    <View className="flex flex-row justify-around mt-5">
                        <Button title="Cancel" color="red" onPress={hideInfoModal} />
                        <Button title="Yes" onPress={startNewSeason} />
                    </View>
                </View>
            </Modal>
            
        </NavigationContainer>
    );
};

export default AppNavigator;