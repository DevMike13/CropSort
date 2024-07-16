import { View, Text, TouchableOpacity, ImageBackground, Image } from 'react-native'
import React from 'react'

const StepOne = ({ setStep, navigation }) => {

    const handleStepComplete = () => {
        setStep((prevStep) => prevStep + 1);
    };
  return (
    <ImageBackground
      source={require('../../assets/bg-2.jpg')}
    >
      <View className="h-full flex items-center">
        <Image
            source={require('../../assets/logo.png')}
            className="w-32 h-52"
            resizeMode='contain'
        />
        <View className="w-[90%] flex items-center justify-center -mt-8 ">
          <Image
              source={require('../../assets/tut1.png')}
              className="w-52 h-80"
              resizeMode='contain'
          />
          <Text className="text-lg text-center font-semibold mt-5">Click Start, and for the application to load the main activity</Text>
        </View>
        <TouchableOpacity className="mt-auto mb-40 border-2 rounded-full py-2 px-2" onPress={handleStepComplete}>
          <Image 
            source={require('../../assets/chevron-right.png')}
            className="w-8 h-8"
            resizeMode='cover'
          />
        </TouchableOpacity>
      </View>
      
    </ImageBackground>
  )
}

export default StepOne