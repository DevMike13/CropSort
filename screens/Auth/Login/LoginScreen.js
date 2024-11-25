import { useState, useEffect, createContext, useContext } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, Image, TextInput, Modal, StatusBar  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import firebase from '../../../firebase';

import styles from './login.styles';
import { FONT } from '../../../constants/theme';

const LoginScreen = () => {
    const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoToDisclaimer = () => {
    navigation.reset({
        index: 0,
        routes: [{ name: 'Disclaimer' }],
    });
};

  useEffect(() => {
    const checkLoggedIn = async () => {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Mother' }],
        });
      }
    };
    checkLoggedIn();
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: 'Please enter email and password',
      });
      return;
    }

    setLoading(true);

    try {
      // Firebase Authentication login
      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
      const user = userCredential.user;

      // Save user data in AsyncStorage
      await AsyncStorage.setItem('user', JSON.stringify({ uid: user.uid, email: user.email }));

      // Navigate to the home screen
      navigation.reset({
        index: 0,
        routes: [{ name: 'Mother' }],
      });

      setLoading(false);
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Logged In',
        text2: 'You have logged in successfully!',
      });
    } catch (error) {
      setLoading(false);
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Login failed',
        text2: error.message,
      });
    }
  };


  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {/* <Image
              style={{ width: 70, height: 70}}
              source={require('../../assets/fortopicon.png')}
            /> */}
             <Text style={styles.appTitle}>Welcome Back!</Text>
          </View>
          <Text style={styles.appSubTitle}>Please enter your account here</Text>
        </View>
        <View style={styles.contentContainer}>
            <View style={{ width: "90%"}}>
                <View style={styles.inputContainer}>
                    <View style={styles.inputWrapper}>
                        <TextInput
                          style={styles.inInput}
                          placeholder='Email'
                          value={email}
                          onChangeText={setEmail}
                          keyboardType="email-address"
                          textContentType='emailAddress'
                        />
                    </View>
                </View>
                <View style={styles.inputContainer}>
                    <View style={styles.inputWrapper}>
                        <TextInput
                          style={styles.inInput}
                          placeholder='Password'
                          value={password}
                          onChangeText={setPassword}
                          secureTextEntry={true}
                        />
                    </View>
                </View>
            </View>
            <TouchableOpacity style={styles.loginBtn} onPress={handleLogin} disabled={loading}>
                <Text style={styles.loginBtnText}>{loading ? 'Logging in...' : 'Login'}</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", width: "90%"}}>
              <Text style={{ justifyContent: "center", alignItems: "center", fontFamily: FONT.regular}}>Forgot password? </Text>
              <TouchableOpacity style={{ justifyContent: "center", alignItems: "center"}} ><Text style={{ justifyContent: "center", alignItems: "center", textDecorationLine: "underline", color: "#277df8", fontFamily: FONT.regular }}>Reset it here</Text></TouchableOpacity>
            </View>
            <View style={styles.divider}>
                <View style={styles.dividerLineLeft}>

                </View>
                <Text style={styles.dividerLineText}>Disclaimer</Text>
                <View style={styles.dividerLineRight}>

                </View>
            </View>
            {/* <View style={{ width: "90%"}}>
                <View style={styles.regContainer}>
                    <View style={styles.regWrapper}>
                        <Text style={styles.regText}>I don't have an account?</Text>
                    </View>
                    <TouchableOpacity style={styles.regBtn} onPress={handleRegister}>
                        <Text style={styles.regBtnText}>Register Now!</Text>
                    </TouchableOpacity>
                </View>
            </View> */}
            <View style={{ width: "70%" }}>
                <Text style={{ textAlign: "center", alignItems: "center", fontFamily: FONT.regular }}>
                  By signing up you accept the{' '}
                  <Text style={{ textDecorationLine: 'underline', color: "#277df8", fontFamily: FONT.regular }} >Terms of Use</Text>{' '}
                  and Privacy Policy
              </Text>
              <TouchableOpacity onPress={handleGoToDisclaimer} style={{ marginTop: 20}}>
                <Text style={{ textAlign: "center", alignItems: "center", fontFamily: FONT.regular, textDecorationLine: 'underline', color: "#277df8" }}>
                    Read Desclaimer
                </Text>
              </TouchableOpacity>
            </View>
        </View>
        <Toast position="top"/>
    </SafeAreaView>
  )
}

export default LoginScreen