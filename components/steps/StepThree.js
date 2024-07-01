import { View, Text, TouchableOpacity, ImageBackground, Image } from 'react-native'
import React from 'react'

const StepThree = ({ setStep, navigation }) => {

  const handleStepComplete = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleStepBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  return (
    <ImageBackground
      source={require('../../assets/bg-2.jpg')}
    >
      <View className="h-full flex items-center pt-10">
        <Image
            source={require('../../assets/logo.png')}
            className="w-52 h-72"
            resizeMode='contain'
        />
        <View className="w-[90%] flex items-center justify-center -mt-8 ">
            <Text>This is step 3.</Text>
        </View>
        <View className="mt-auto mb-40 flex flex-row">
          <TouchableOpacity className="border-2 rounded-full py-2 px-2 mr-10" onPress={handleStepBack}>
            <Image 
              source={require('../../assets/chevron-left.png')}
              className="w-8 h-8"
              resizeMode='cover'
            />
          </TouchableOpacity>
          <TouchableOpacity className="border-2 rounded-full py-2 px-2" onPress={handleStepComplete}>
            <Image 
              source={require('../../assets/chevron-right.png')}
              className="w-8 h-8"
              resizeMode='cover'
            />
          </TouchableOpacity>
        </View>
      </View>
      
    </ImageBackground>
  )
}

export default StepThree