import { View, Text, Image, ImageBackground, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';

const MainScreen = () => {

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
   
      <View className="h-full flex items-center pt-16">
        <Image
            source={require('../../assets/logo.png')}
            className="w-2/3 h-72"
            resizeMode='contain'
        />
        <View className="w-[90%] flex items-center justify-center -mt-8">
            
            <TouchableOpacity className="w-1/2 h-12 bg-green-400 flex justify-center rounded-full mt-5" onPress={handleGoToTutorial}>
                <Text className="text-center font-bold text-lg">
                    How to Use
                </Text>
            </TouchableOpacity>
            <TouchableOpacity className="w-1/2 h-12 bg-green-400 flex justify-center rounded-full mt-5" onPress={handleGoToContols}>
                <Text className="text-center font-bold text-lg">
                    Start
                </Text>
            </TouchableOpacity>
            <TouchableOpacity className="w-1/2 h-12 bg-green-400 flex justify-center rounded-full mt-5" onPress={handleGoToAbout}>
                <Text className="text-center font-bold text-lg">
                    About
                </Text>
            </TouchableOpacity>
        </View>
      </View>
    
  )
}

export default MainScreen