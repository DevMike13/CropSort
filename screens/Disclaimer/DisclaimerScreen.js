import { View, Text, Image, ImageBackground, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';


import styles from './disclaimer.style';
import { FONT } from '../../constants/theme';

const DisclaimerScreen = () => {
    const navigation = useNavigation();

    const handleGoToLogin = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    };
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
      <Text style={styles.appTitle}>DISCLAIMER</Text>
      <View style={styles.contentContainer}>
        <ScrollView contentContainerStyle={{ padding: 20 }}>
            <Text style={styles.contentText}>
                Regarding the functioning, performance, and fitness of the <Text className="font-bold">CROPSORT</Text>  software for a given use, the creators make no express or implied guarantees or warranties of any sort and the software is offered "as is".
                Users understand that the program serves as a tool to facilitate interactions with the CROPSORT hardware and some factors, such as device compatibility, network circumstances, and user-specific setups, may affect how effective the application is.
            </Text>
            <Text style={[styles.contentText, { marginTop: 20 }]}>
              The developers and researchers behind <Text className="font-bold">CROPSORT</Text> cannot guarantee the absolute correctness, completeness, or suitability of the content for any specific purpose. Users a responsible for verifying the information and ensuring its compatibility with their specific needs and circumstances.
            </Text>
        </ScrollView>
      </View>
      <TouchableOpacity style={styles.agreeBtn} onPress={handleGoToLogin}>
        <Text style={styles.btnText}>Agree</Text>
      </TouchableOpacity>
  
    </SafeAreaView>
  )
}

export default DisclaimerScreen