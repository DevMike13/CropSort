import { View, Text, Image, ImageBackground, TouchableOpacity, SafeAreaView } from 'react-native'
import { useNavigation } from '@react-navigation/native';

import styles from './home.style';

const HomeScreen = () => {
    const navigation = useNavigation();

    const handleGoToMain = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Main' }],
        });
    };

    const handleGoToTutorial = () => {
      navigation.navigate('Tutorial');
    }

    const handleGoToContols = () => {
      navigation.navigate('Control');
    }

    const handleGoToAbout = () => {
      navigation.navigate('About');
    }

  return (
    <SafeAreaView style={styles.container}>
      <Image
          source={require('../../../assets/logo.png')}
          style={{ width: 150, height: 150 }}
          resizeMode='contain'
      />
      <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btn} onPress={handleGoToTutorial}>
              <Text style={styles.btnText}>
                  How to Use
              </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={handleGoToContols}>
              <Text style={styles.btnText}>
                  Start
              </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={handleGoToAbout}>
              <Text style={styles.btnText}>
                  About
              </Text>
          </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen