import { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, Image, TextInput, Modal, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import firebase from '../../../firebase';
import { Ionicons } from '@expo/vector-icons';

import styles from './register.style';
import { COLORS, FONT } from '../../../constants/theme';

const RegisterScreen = () => {
    const navigation = useNavigation();

    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
    };

    const handleGoToLogin = () => {
        navigation.navigate("Login");
    }

    const handleRegister = async () => {
        if (!fullname || !email || !password || !confirmPassword) {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Error',
                text2: 'All fields are required',
            });
            return;
        }

        if (password !== confirmPassword) {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Error',
                text2: 'Passwords do not match',
            });
            return;
        }

        setLoading(true);

        try {
            // Create user in Firebase Authentication
            const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;

            // Save user data in Firestore
            await firebase.firestore().collection('users').doc(user.uid).set({
                fullname,
                email,
                userType: 'farmer',
                isApproved: false,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            });

            setLoading(false);

            // Navigate to the login screen
            Toast.show({
                type: 'success',
                position: 'top',
                text1: 'Registration Successful',
                text2: 'You can now log in',
            });

            setTimeout(() => {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                });
            }, 3000);

        } catch (error) {
            setLoading(false);
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Registration Failed',
                text2: error.message,
            });
        }
    };

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={{ flexDirection: "column", alignItems: "center" }}>
            <Image
              style={{ width: 100, height: 100}}
              source={require('../../../assets/logo.png')}
            />
             <Text style={styles.appTitle}>Welcome Farmer!</Text>
          </View>
          <Text style={styles.appSubTitle}>Please create your account here</Text>
        </View>
        <View style={{ width: "90%", marginVertical: 20, paddingLeft: 10, justifyContent: "center", alignItems: "center" }}>
            
            <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                <TextInput
                    style={styles.inInput}
                    placeholder='Fullname'
                    value={fullname}
                    onChangeText={setFullname}
                    placeholderTextColor="gray"
                />
                <View>
                    <Ionicons name="person-outline" size={28} color="gray" />
                </View>
                </View>
            </View>
            <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                <TextInput
                    style={styles.inInput}
                    placeholder='Email'
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    textContentType='emailAddress'
                    placeholderTextColor="gray"
                />
                <View>
                    <Ionicons name="mail-outline" size={28} color="gray" />
                </View>
                </View>
            </View>
        
            <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                <TextInput
                    style={styles.inInput}
                    placeholder='Password'
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!isPasswordVisible}
                    placeholderTextColor="gray"
                />
                <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconContainer}>
                    <Ionicons name={isPasswordVisible ? 'eye-outline' : 'eye-off-outline'} size={28} color="gray" />
                </TouchableOpacity>
                </View>
            </View>
            <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                <TextInput
                    style={styles.inInput}
                    placeholder='Confirm Password'
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!isConfirmPasswordVisible}
                    placeholderTextColor="gray"
                />
                <TouchableOpacity onPress={toggleConfirmPasswordVisibility} style={styles.iconContainer}>
                    <Ionicons name={isConfirmPasswordVisible ? 'eye-outline' : 'eye-off-outline'} size={28} color="gray" />
                </TouchableOpacity>
                </View>
            </View>
            
                <TouchableOpacity style={styles.loginBtn} onPress={handleRegister} disabled={loading}>
                    <Text style={styles.loginBtnText}>{loading ? 'Registering...' : 'Register'}</Text>
                </TouchableOpacity>
          
                <Text style={{ textAlign: "center", alignItems: "center", fontFamily: FONT.regular }}>
                    Already have an account?{' '}
                  <Text style={{ textDecorationLine: 'underline', color: "#277df8", fontFamily: FONT.regular }} onPress={handleGoToLogin}>Login</Text>{' '}
              </Text>
        </View>
        <Toast position="top"/>
    </SafeAreaView>
  )
}

export default RegisterScreen