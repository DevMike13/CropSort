import { View, Text, TouchableOpacity, ImageBackground, Image } from 'react-native'
import React from 'react'

const StepSeven = ({ setStep, navigation }) => {
    const handleStepFinish = () => {
        navigation.navigate('Mother')
      };
    
      const handleStepBack = () => {
        setStep((prevStep) => prevStep - 1);
      };
  return (
      <View className="h-full flex items-center bg-[#a0ebb3]">
        <Image
            source={require('../../assets/logo.png')}
            className="w-32 h-52"
            resizeMode='contain'
        />
        <View className="w-[90%] flex items-center justify-center -mt-5 ">
          <Text className="text-lg font-bold">TUTORIAL</Text>
          <Image
              source={require('../../assets/tut7.png')}
              className="w-52 h-80"
              resizeMode='contain'
          />
          <Text className="text-lg text-center font-semibold mt-5">Result of the weight and customized color of each basket are shown in the CropSort Application.</Text>
        </View>
        <View className="mt-5 mb-24 flex flex-row">
          <TouchableOpacity className="border-2 rounded-full py-2 px-2 mr-2" onPress={handleStepBack}>
            <Image 
              source={require('../../assets/chevron-left.png')}
              className="w-7 h-7"
              resizeMode='cover'
            />
          </TouchableOpacity>
          <TouchableOpacity className="border-2 rounded-full py-2 px-5 flex justify-center" onPress={handleStepFinish}>
            <Text className="text-center font-semibold">Finish</Text>
          </TouchableOpacity>
        </View>
      </View>
  )
}

export default StepSeven