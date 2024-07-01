import React, { useState } from 'react';
import { View } from 'react-native';

import StepOne from './steps/StepOne';
import StepTwo from './steps/StepTwo';
import StepThree from './steps/StepThree';
import StepFour from './steps/StepFour';

const Stepper = ({ navigation }) => {

    const [step, setStep] = useState(1);
  return (
    <View className="h-full bg-slate-600">
      {step === 1 && <StepOne setStep={setStep} navigation={navigation}/>}
      {step === 2 && <StepTwo setStep={setStep} navigation={navigation}/>}
      {step === 3 && <StepThree setStep={setStep} navigation={navigation}/>}
      {step === 4 && <StepFour setStep={setStep} navigation={navigation} />}
    </View>
  )
}

export default Stepper