import { View, Text, TouchableOpacity, ImageBackground, Image } from 'react-native'
import React from 'react'

const StepSix = ({ setStep, navigation }) => {

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
    
      <View className="h-full flex items-center pt-8 bg-[#a0ebb3]">
        <Image
            source={require('../../assets/logo.png')}
            className="w-32 h-52"
            resizeMode='contain'
        />
        <View className="w-[90%] flex items-center justify-center -mt-5 ">
          <Text className="text-lg font-bold">TUTORIAL</Text>
          <Image
              source={require('../../assets/tut6.png')}
              className="w-52 h-80"
              resizeMode='contain'
          />
          <Text className="text-lg text-center font-semibold mt-5">Customize color of each basket.</Text>
        </View>
        <View className="mt-5 mb-36 flex flex-row">
          <TouchableOpacity className="border-2 rounded-full py-2 px-2 mr-10 " onPress={handleStepBack}>
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

export default StepSix