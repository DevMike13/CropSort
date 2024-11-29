import { View, Text, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import firebase from '../../../firebase'; // Importing the Firebase instance
import styles from './account.style';
import Toast from 'react-native-toast-message';
import { Ionicons } from '@expo/vector-icons';

const AccountScreen = () => {
  const [user, setUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [newFullName, setNewFullName] = useState('');
  const [modalNameVisible, setModalNameVisible] = useState(false);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();

  const [isOldPasswordVisible, setIsOldPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsOldPasswordVisible(!isOldPasswordVisible);
  };

  const toggleNewPasswordVisibility = () => {
      setIsNewPasswordVisible(!isNewPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
      setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };
  // Retrieve user data from AsyncStorage when the component mounts
  useEffect(() => {
    const getUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(JSON.parse(storedUser));
          setNewFullName(parsedUser.fullname);
        } else {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],  // Redirect to login if no user is found
          });
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
      await AsyncStorage.removeItem('user');  // Remove user data from AsyncStorage
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],  // Redirect to login screen after logout
      });
    } catch (error) {
      console.log('Error logging out: ', error);
    }
  };

  // Handle change password using Firebase
  const handleChangePassword = async () => {
    if (!newPassword || !confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please fill out both password fields.',
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Passwords do not match.',
      });
      return;
    }

    try {
      const currentUser = firebase.auth().currentUser;
      if (currentUser) {
        // Update password using Firebase Authentication
        const cred = firebase.auth.EmailAuthProvider.credential(currentUser.email, oldPassword);
        await currentUser.reauthenticateWithCredential(cred);

        await currentUser.updatePassword(newPassword);

        // Close modal and reset form fields
        setModalVisible(false);
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');

        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Password updated successfully!',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'User not logged in.',
        });
      }
    } catch (error) {
      console.log('Error updating password: ', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to update password.',
      });
    }
  };

  const handleChangeFullName = async () => {
    if (!newFullName) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please enter a valid full name.',
      });
      return;
    }
  
    try {
      const currentUser = firebase.auth().currentUser;
      if (currentUser) {
        // Get the user's document in Firestore
        const userDocRef = firebase.firestore().collection('users').doc(currentUser.uid);
  
        // Update the full name field
        await userDocRef.update({
          fullname: newFullName,
        });
  
        const updatedUser = { ...user, fullname: newFullName };
        await AsyncStorage.setItem('user', JSON.stringify(updatedUser)); // Save updated user in AsyncStorage
        setUser(updatedUser); // Update the local state

        setModalNameVisible(false);
        setNewFullName('');
  
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Full name updated successfully!',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'User not logged in.',
        });
      }
    } catch (error) {
      console.log('Error updating full name: ', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to update full name.',
      });
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
      <TouchableOpacity
        style={styles.changePasswordButton}
        onPress={() => setModalNameVisible(true)}
      >
        <Text style={styles.changePasswordText}>Change Name</Text>
      </TouchableOpacity>
      {/* Change Password Button */}
      <TouchableOpacity
        style={styles.changePasswordButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.changePasswordText}>Change Password</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      {/* Modal for changing full name */}
      <Modal
        transparent={true}
        visible={modalNameVisible}
        animationType="fade"
        onRequestClose={() => setModalNameVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Change Full Name</Text>

            <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.inInput}
                        placeholder="New Full Name"
                        value={newFullName}
                        onChangeText={setNewFullName}
                        placeholderTextColor="gray"
                    />
                    <View>
                      <Ionicons name="person-outline" size={28} color="gray" />
                    </View>
                </View>
            </View>

            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalNameVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.confirmButton}
                onPress={handleChangeFullName}
              >
                <Text style={styles.confirmButtonText}>Change Full Name</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal for changing password */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Change Password</Text>

            <View style={styles.inputContainer}>
                  <View style={styles.inputWrapper}>
                      <TextInput
                          style={styles.inInput}
                          placeholder="Old Password"
                          value={oldPassword}
                          onChangeText={setOldPassword}
                          secureTextEntry={!isOldPasswordVisible}
                          placeholderTextColor="black"
                      />
                      <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconContainer}>
                          <Ionicons name={isOldPasswordVisible ? 'eye-outline' : 'eye-off-outline'} size={28} color="black" />
                      </TouchableOpacity>
                  </View>
              </View>

            <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.inInput}
                        placeholder="New Password"
                        value={newPassword}
                        onChangeText={setNewPassword}
                        secureTextEntry={!isNewPasswordVisible}
                        placeholderTextColor="black"
                    />
                    <TouchableOpacity onPress={toggleNewPasswordVisibility} style={styles.iconContainer}>
                        <Ionicons name={isNewPasswordVisible ? 'eye-outline' : 'eye-off-outline'} size={28} color="black" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.inInput}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry={!isConfirmPasswordVisible}
                        placeholderTextColor="black"
                    />
                    <TouchableOpacity onPress={toggleConfirmPasswordVisibility} style={styles.iconContainer}>
                        <Ionicons name={isConfirmPasswordVisible ? 'eye-outline' : 'eye-off-outline'} size={28} color="black" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.confirmButton}
                onPress={handleChangePassword}
              >
                <Text style={styles.confirmButtonText}>Change Password</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {modalVisible && (
            <Toast position="top" />
        )}
      </Modal>
      
      {
      modalVisible == true ? (
        <></>
      ) : (
        <Toast position="top" />
      )
      }
    </View>
  );
};

export default AccountScreen;
