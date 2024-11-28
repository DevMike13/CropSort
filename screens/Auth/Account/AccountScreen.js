import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import styles from './account.style';

const AccountScreen = () => {
    const [user, setUser] = useState(null);
  const navigation = useNavigation();

  // Retrieve user data from AsyncStorage when the component mounts
  useEffect(() => {
    const getUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));  // Parse the user data
        } else {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });  // Redirect to login if no user is found
        }
      } catch (error) {
        console.log('Error fetching user data: ', error);
      }
    };

    getUserData();
  }, [navigation]);

  // Logout function
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('user'); // Remove user data from AsyncStorage
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
        });  // Redirect to login screen after logout
    } catch (error) {
      console.log('Error logging out: ', error);
    }
  };
  return (
    <View style={styles.container}>
      

      {user ? (
        <View style={styles.accountInfo}>
          <Text style={styles.title}>Account Details</Text>
          <Text style={styles.label}>Full Name: </Text>
          <Text style={styles.userDetailsText}>
            {user.fullname}
          </Text>
          <Text style={styles.label}>Email: </Text>
          <Text style={styles.userDetailsText}>
            {user.email}
          </Text>
          <Text style={styles.label}>User Type: </Text>
          <Text style={styles.userDetailsText}>
            {user.userType}
          </Text>
        </View>
      ) : (
        <Text style={styles.noUserText}>No user found. Please log in.</Text>
      )}

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

export default AccountScreen