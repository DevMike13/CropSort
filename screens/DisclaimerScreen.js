import { View, Text, Image, ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const DisclaimerScreen = () => {
    const navigation = useNavigation();

    const handleGoToMain = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Main' }],
        });
    };
  return (
    <ImageBackground
      source={require('../assets/bg-2.jpg')}
    >
      <View className="h-full flex items-center pt-16">
        <Image
            source={require('../assets/logo.png')}
            className="w-2/3 h-72"
            resizeMode='contain'
        />
        <View className="w-[90%] flex items-center justify-center -mt-8">
            <Text className="text-4xl font-black uppercase">Disclaimer</Text>
            <Text className="text-center font-medium mb-5">
                Regarding the functioning, performance, and fitness of the <Text className="font-bold">CROPSORT</Text>  software for a given use, the creators make no express or implied guarantees or warranties of any sort and the software is offered "as is".
                Users understand that the program serves as a tool to facilitate interactions with the CROPSORT hardware and some factors, such as device compatibility, network circumstances, and user-specific setups, may affect how effective the application is.
            </Text>
            <Text className="text-center font-medium">
            The developers and researchers behind <Text className="font-bold">CROPSORT</Text> cannot guarantee the absolute correctness, completeness, or suitability of the content for any specific purpose. Users a responsible for verifying the information and ensuring its compatibility with their specific needs and circumstances.
            </Text>
            <TouchableOpacity className="w-32 h-12 bg-green-400 flex justify-center rounded-full mt-10" onPress={handleGoToMain}>
                <Text className="text-center font-bold text-lg">
                    Agree
                </Text>
            </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  )
}

export default DisclaimerScreen