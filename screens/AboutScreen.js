import { View, Text, TouchableOpacity, ImageBackground, Image } from 'react-native'
import React from 'react'

const AboutScreen = () => {
  return (
    <ImageBackground
    source={require('../assets/bg-2.jpg')}
  >
    <View className="h-full flex items-center pt-10">
      <Image
          source={require('../assets/logo.png')}
          className="w-52 h-72"
          resizeMode='contain'
      />
      <View className="w-[80%] flex items-center justify-center -mt-8 bg-green-300 rounded-lg">
          <Text className="text-center font-semibold text-xl py-5">About Cropsort</Text>
          <View className="w-full h-[1px] bg-slate-400"></View>
          <Text className="text-center font-medium text-base py-10 px-5">
            Cropsort is a system with device and application that help farmers efficiently sort their crops based on color. Through this application they can customize and estimate the weight of every basket that device sorted.
          </Text>
      </View>
    </View>
    
  </ImageBackground>
  )
}

export default AboutScreen