import { View, Text, TouchableOpacity, ImageBackground, Image } from 'react-native'
import React from 'react'

const StepFive = ({ setStep, navigation }) => {
     
  const handleStepFinish = () => {
    navigation.navigate('Mother')
  };

  const handleStepComplete = () => {
    setStep((prevStep) => prevStep + 1);
  };

    const handleStepBack = () => {
        setStep((prevStep) => prevStep - 1);
    };
  return (
      <View className="h-full flex items-center pt-6 bg-[#a0ebb3]">
        <Image
            source={require('../../assets/logo.png')}
            className="w-32 h-52"
            resizeMode='contain'
        />
        <View className="w-[90%] flex items-center justify-center -mt-6 ">
          <Text className="text-lg font-bold">TUTORIAL</Text>
          <Image
              source={require('../../assets/tut5.png')}
              className="w-52 h-80"
              resizeMode='contain'
          />
          <Text className="text-lg text-center font-semibold mt-5">Click this color wheel button to customize color.</Text>
        </View>
        <View className="mt-5 mb-32 flex flex-row">
          <TouchableOpacity className="border-2 rounded-full py-2 px-2 mr-10" onPress={handleStepBack}>
            <Image 
              source={require('../../assets/chevron-left.png')}
              className="w-7 h-7"
              resizeMode='cover'
            />
          </TouchableOpacity>
          <TouchableOpacity className="border-2 rounded-full py-2 px-2 " onPress={handleStepComplete}>
            <Image 
              source={require('../../assets/chevron-right.png')}
              className="w-7 h-7"
              resizeMode='cover'
            />
          </TouchableOpacity>
        </View>
      </View>
  )
}

export default StepFive