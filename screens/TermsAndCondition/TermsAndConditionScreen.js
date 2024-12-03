import { View, Text, Image, ImageBackground, TouchableOpacity, SafeAreaView, ScrollView, BackHandler, ActivityIndicator } from 'react-native'
import { useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';
import { Checkbox } from "react-native-paper";
import Toast from 'react-native-toast-message';


import styles from './terms.style';
import { FONT } from '../../constants/theme';

const TermsAndConditionScreen = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Check AsyncStorage for existing agreement
    const checkAgreement = async () => {
      const hasAgreed = await AsyncStorage.getItem("termsAccepted");
      if (hasAgreed === "true") {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Register' }],
        });
      }
    };
    checkAgreement();
  }, []);

  // useEffect(() => {
  //   const clearTermsAccepted = async () => {
  //     await AsyncStorage.removeItem("termsAccepted");
  //   };
  //   clearTermsAccepted();
  // }, []);

  const handleAgree = async () => {
    if (isChecked) {
      await AsyncStorage.setItem("termsAccepted", "true");
      navigation.reset({
        index: 0,
        routes: [{ name: 'Register' }],
      });
    } else {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Agreement Required',
        text2: 'Please check the box to agree to the terms and conditions.',
      });
    }
  };

  const handleDisagree = () => {
    BackHandler.exitApp();
  };

  const navigation = useNavigation();

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={{ flexDirection: "column", alignItems: "center" }}>
          <Image
            style={{ width: 100, height: 100}}
            source={require('../../assets/logo.png')}
          />
        </View>
      </View>
      <Text style={styles.appTitle}>TERMS AND CONDITIONS</Text>
      <View style={styles.contentContainer}>
        <ScrollView contentContainerStyle={{ padding: 20 }}>
            <Text style={styles.contentTitle}>Terms of use:</Text>
            <Text style={styles.titleNumber}>1. Acceptance of Terms</Text>
            <Text style={styles.contentText}>
              By using the CropSort application,
              you agree to these Terms of Use.
              Continued use after updates implies
              acceptance of the revised terms.
            </Text>

            <Text style={styles.titleNumber}>2. Use of the App</Text>
            <Text style={styles.contentText}>
              CropSort must be used only for its intended
              purpose and in compliance
              with applicable laws. Misuse of the app,
              such as tampering or interference, is strictly prohibited.
            </Text>

            <Text style={styles.titleNumber}>3. Accuracy of Information</Text>
            <Text style={styles.contentText}>
              While CropSort strives to provide accurate
              results, we do not guarantee error-free
              or fully reliable outputs. Use the app's
              results at your own discretion.
            </Text>

            <Text style={styles.titleNumber}>4. User Agreement</Text>
            <Text style={styles.contentText}>
              You agree to provide accurate information,
              use the app responsibly, and adhere to
              these terms. Non-compliance may result in
              suspension or termination of access.
            </Text>
            
            <Text style={styles.titleNumber}>5. Limitation of Liability</Text>
            <Text style={styles.contentText}>
              CropSort is provided "as is," and we are not
              liable for damages, losses, or inaccuracies
              arising from its use. Use the app at your own risk.
            </Text>

        </ScrollView>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", margin: 20 }}>
        <Checkbox
          status={isChecked ? "checked" : "unchecked"}
          onPress={() => setIsChecked(!isChecked)}
          color="green"
        />
        <Text style={styles.contentText}>I accept the terms and conditions</Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 20, gap: 20 }}>
        <TouchableOpacity
          style={[styles.agreeBtn, { opacity: isChecked ? 1 : 0.5 }]}
          onPress={handleAgree}
          disabled={!isChecked}
        >
          <Text style={styles.btnText}>Agree</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.disagreeBtn}
          onPress={handleDisagree}
        >
          <Text style={styles.disbtnText}>Disagree</Text>
        </TouchableOpacity>
      </View>
  
    </SafeAreaView>
  )
}

export default TermsAndConditionScreen