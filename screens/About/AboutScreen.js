import { View, Text, Image, ImageBackground, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native'
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';


import styles from './about.style';
import { FONT } from '../../constants/theme';

const AboutScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingVertical: 20, dispay: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20 }} nestedScrollEnabled = {true}>
        <View style={styles.contentContainer}>
          <ScrollView contentContainerStyle={{ padding: 20 }} nestedScrollEnabled = {true}>
            <View style={styles.headerContainer}>
              <View style={{ flexDirection: "column", alignItems: "center" }}>
                <Image
                  style={{ width: 60, height: 60}}
                  source={require('../../assets/logo.png')}
                />
              </View>
            </View>
            <Text style={styles.contentText}>
              Cropsort is a system specifically designed to classify crops based on their color to determine their level of
              maturity. It provides an efficient, accurate, and automated solution for categorizing crops, enabling
              farmers and agricultural businesses to streamline sorting processes and ensure consistent quality. By
              focusing on color-based maturity classification, Cropsort helps optimize harvesting and packaging
              decisions, improving productivity and market readiness.
            </Text>
            <Text style={[styles.contentText, { marginTop: 20 }]}>
              Using a color threshold algorithm, Cropsort evaluates the color of crops to assess their maturity stage.
              This algorithm compares the observed color to predefined thresholds representing various maturity
              levels, ensuring precise categorization. Cropsort’s ability to detect subtle differences in color enables
              accurate sorting of crops at different stages of ripeness, helping stakeholders make informed decisions
              and reduce waste while meeting consumer and market demands.
            </Text>
          </ScrollView>
        </View>

        <View style={styles.contentContainer}>
          <ScrollView contentContainerStyle={{ padding: 20 }} nestedScrollEnabled = {true}>
            <View style={styles.headerContainer}>
              <View style={{ width: '100%',flexDirection: "column", alignItems: "center", backgroundColor: 'white', paddingVertical: 10, borderRadius: 100, borderColor: 'black', borderWidth: 1 }}>
                <Text style={styles.headerTitle}>System Requirements</Text>
              </View>
            </View>
            <Text style={styles.titleNumber}>Minimum Requirements:</Text>
            <Text style={styles.contentText}>
              <Text style={styles.titleNumber}>Operating System: </Text>Android 11.0 (Red Velvet) or higher
            </Text>
            <Text style={styles.contentText}>
              <Text style={styles.titleNumber}>Processor: </Text>Quad-core processor with a minimum clock speed of 1.5 GHz
            </Text>
            <Text style={styles.contentText}>
              <Text style={styles.titleNumber}>RAM: </Text>3 GB or more
            </Text>

            <Text style={styles.contentText}>
              <Text style={styles.titleNumber}>Storage: </Text>2 GB of free internal storage for application
              installation and data
            </Text>
            <Text style={styles.contentText}>
              <Text style={styles.titleNumber}>Connectivity: </Text>Wi-Fi/hotspot or mobile data connection for synchronization
            </Text>

            <Text style={styles.contentText}>
              <Text style={styles.titleNumber}>Display: </Text>5.0-inch screen
            </Text>

            <Text style={styles.titleNumber}>Recommended Requirements:</Text>
            <Text style={styles.contentText}>
              <Text style={styles.titleNumber}>Operating System: </Text>Android 11.0 (Red Velvet) or higher
            </Text>

            <Text style={styles.contentText}>
              <Text style={styles.titleNumber}>Processor: </Text>Octa-core processor with a minimum clock speed of 2.0 GHz
            </Text>
            <Text style={styles.contentText}>
              <Text style={styles.titleNumber}>RAM: </Text>4 GB or more
            </Text>
            <Text style={styles.contentText}>
              <Text style={styles.titleNumber}>Storage: </Text>6 GB of free internal storage for good performance
            </Text>
            <Text style={styles.contentText}>
              <Text style={styles.titleNumber}>Connectivity: </Text>Stable Wi-Fi or 4G/5G connection for real-time updates
            </Text>
            <Text style={styles.contentText}>
              <Text style={styles.titleNumber}>Display: </Text>6.0-inch screen
            </Text>

            <Text style={styles.titleDev}>
              Developers:
            </Text>
            <Text style={styles.devText}>
              Carl John Remos
            </Text>
            <Text style={styles.devText}>
              Paulo Solpico
            </Text>
            <Text style={styles.devText}>
              Jamell Sugay
            </Text>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default AboutScreen