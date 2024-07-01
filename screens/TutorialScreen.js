import { View, Text } from 'react-native'
import React from 'react'

import Stepper from '../components/Stepper'

const TutorialScreen = ({ navigation }) => {
  return (
    <View>
      <Stepper navigation={navigation} />
    </View>
  )
}

export default TutorialScreen