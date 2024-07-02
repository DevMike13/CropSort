import { View, Text, TouchableOpacity, ImageBackground, Image, Button, TextInput } from 'react-native'
import Modal from "react-native-modal";
import { ScrollView } from 'react-native-gesture-handler';
import NumericInput from 'react-native-numeric-input'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import firebase from '../firebase';
import LottieView from 'lottie-react-native';

import ColorPicker, { Panel1, Panel5, Swatches, Preview, OpacitySlider, HueSlider } from 'reanimated-color-picker';

const ControlScreen = () => {

  // const [deviceId, setDeviceId] = useState(null);

  const [showModalOne, setShowModalOne] = useState(false);
  const [showModalTwo, setShowModalTwo] = useState(false);
  const [showModalThree, setShowModalThree] = useState(false);

  const [showModalKgOne, setShowModalKgOne] = useState(false);
  const [showModalKgTwo, setShowModalKgTwo] = useState(false);
  const [showModalKgThree, setShowModalKgThree] = useState(false);

  const [colorOne, setColorOne] = useState('#000000');
  const [colorTwo, setColorTwo] = useState('#000000');
  const [colorThree, setColorThree] = useState('#000000');

  const [kgOne, setKgOne] = useState(1);
  const [kgTwo, setKgTwo] = useState(1);
  const [kgThree, setKgThree] = useState(1);

  const [converyorState, setConveyorState] = useState('OFF');
  const [isStarting, setIsStarting] = useState();

  const onSelectColorOne = ({ hex }) => {
    setColorOne(hex);
    console.log(hex);
  };

  const onSelectColorTwo = ({ hex }) => {
    setColorTwo(hex);
    console.log(hex);
  };

  const onSelectColorThree = ({ hex }) => {
    setColorThree(hex);
    console.log(hex);
  };

  const reset = () => {
    setColorOne('#000000');
    setColorTwo('#000000');
    setColorThree('#000000');
    setKgOne(1);
    setKgTwo(1);
    setKgThree(1);
  }

  // BASKET 1
  const setRTDBColorOne = () => {
    const clrOne = colorOne;
    firebase.database().ref('colorOne' ).set(clrOne);
  };

  const setRTDBWeightOne = () => {
    const weightOne = kgOne;
    firebase.database().ref('weightOne').set(weightOne);
  };

  // BASKET 2
  const setRTDBColorTwo = () => {
    const clrTwo = colorTwo;
    firebase.database().ref('colorTwo').set(clrTwo);
  };

  const setRTDBWeightTwo = () => {
    const weightTwo = kgTwo;
    firebase.database().ref('weightTwo').set(weightTwo);
  };

  // BASKET 3
  const setRTDBColorThree = () => {
    const clrThree = colorThree;
    firebase.database().ref('colorThree').set(clrThree);
  };

  const setRTDBWeightThree = () => {
    const weightThree = kgThree;
    firebase.database().ref('weightThree').set(weightThree);
  };


  useEffect(() => {
    const rtdbClrOneRef = firebase.database().ref('colorOne');
    rtdbClrOneRef.on('value', (snapshot) => {
      const newClrOne = snapshot.val();
      setColorOne(newClrOne);
    });

    const rtdbClrTwoRef = firebase.database().ref('colorTwo');
    rtdbClrTwoRef.on('value', (snapshot) => {
      const newClrTwo = snapshot.val();
      setColorTwo(newClrTwo);
    });

    const rtdbClrThreeRef = firebase.database().ref('colorThree');
    rtdbClrThreeRef.on('value', (snapshot) => {
      const newClrThree = snapshot.val();
      setColorThree(newClrThree);
    });

  }, []);

  useEffect(() => {
    // Attach listener for 'value' changes
    const conveyorStateRef = firebase.database().ref('conveyorState');
    conveyorStateRef.on('value', (snapshot) => {
      const newState = snapshot.val();
      setConveyorState(newState); // Update local state
    });

    // Clean up listener on component unmount
    return () => {
      conveyorStateRef.off('value'); // Detach listener
    };
  }, []);

  const toggleConveyor = () => {
    const newState = converyorState === 'ON' ? 'OFF' : 'ON';
    firebase.database().ref('conveyorState').set(newState);
    setConveyorState(newState); // Update local state immediately
  };
  

  // useEffect(() => {
  //   const getDeviceId = async () => {
  //     let id = await AsyncStorage.getItem('device_id');
  //     if (!id) {
  //       id = uuid.v4();
  //       await AsyncStorage.setItem('device_id', id);
  //     }
  //     setDeviceId(id);
  //   };
  //   getDeviceId();
  // }, []);


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
        {/* <Text>Device ID: {deviceId}</Text> */}
        <View className="w-[90%] flex items-center justify-center -mt-8 ">

            {/* BASKET 1 */}
            <View className="flex flex-row items-center gap-5">
              <Text className="text-center font-semibold text-base">Basket 1</Text>
              <TouchableOpacity className="border-2 w-28 h-10 rounded-lg flex flex-row justify-around items-center" onPress={() => setShowModalOne(true)}>
                <View className="h-[75%] w-7" style={{ backgroundColor: colorOne}}>

                </View>
                <Image
                  source={require('../assets/color-picker.png')}
                  className="w-9 h-full"
                  resizeMode='contain'
                />
              </TouchableOpacity>
              <TouchableOpacity className="border-2 w-28 h-10 rounded-lg flex flex-row justify-around items-center" onPress={() => setShowModalKgOne(true)}>
                  <Text className="font-bold text-base">
                    {kgOne} KG
                  </Text>
                  <Image
                    source={require('../assets/weight.png')}
                    className="w-9 h-full"
                    resizeMode='contain'
                  />
              </TouchableOpacity>
            </View>

            {/* BASKET 2 */}
            <View className="flex flex-row items-center gap-5 mt-2">
              <Text className="text-center font-semibold text-base">Basket 2</Text>
              <TouchableOpacity className="border-2 w-28 h-10 rounded-lg flex flex-row justify-around items-center" onPress={() => setShowModalTwo(true)}>
                <View className="h-[75%] w-7" style={{ backgroundColor: colorTwo}}>

                </View>
                <Image
                  source={require('../assets/color-picker.png')}
                  className="w-9 h-full"
                  resizeMode='contain'
                />
              </TouchableOpacity>
              <TouchableOpacity className="border-2 w-28 h-10 rounded-lg flex flex-row justify-around items-center" onPress={() => setShowModalKgTwo(true)}>
                  <Text className="font-bold text-base">
                    {kgTwo} KG
                  </Text>
                  <Image
                    source={require('../assets/weight.png')}
                    className="w-9 h-full"
                    resizeMode='contain'
                  />
              </TouchableOpacity>
            </View>

            {/* BASKET 3 */}
            <View className="flex flex-row items-center gap-5 mt-2">
              <Text className="text-center font-semibold text-base">Basket 3</Text>
              <TouchableOpacity className="border-2 w-28 h-10 rounded-lg flex flex-row justify-around items-center" onPress={() => setShowModalThree(true)}>
                <View className="h-[75%] w-7" style={{ backgroundColor: colorThree}}>

                </View>
                <Image
                  source={require('../assets/color-picker.png')}
                  className="w-9 h-full"
                  resizeMode='contain'
                />
              </TouchableOpacity>
              <TouchableOpacity className="border-2 w-28 h-10 rounded-lg flex flex-row justify-around items-center" onPress={() => setShowModalKgThree(true)}>
                  <Text className="font-bold text-base">
                    {kgThree} KG
                  </Text>
                  <Image
                    source={require('../assets/weight.png')}
                    className="w-9 h-full"
                    resizeMode='contain'
                  />
              </TouchableOpacity>
            </View>

            {/* MODAL 1 */}
            <Modal isVisible={showModalOne}>
              <View className="w-96 bg-slate-100 flex justify-center items-center rounded-lg">
                <ColorPicker style={{ width: '70%' }} value='red' onComplete={onSelectColorOne}>
                  <View className="py-5">
                    <Preview hideInitialColor colorFormat='rgb' />
                  </View>
                  <View className="pt-5 pb-1 px-2 bg-white flex justify-center shadow-2xl rounded-xl">
                    <Swatches colors={['red', 'green', 'blue', 'violet']} />
                  </View>
                </ColorPicker>
                <TouchableOpacity className="bg-green-500 py-3 px-8 my-5 rounded-full" 
                  onPress={() => {
                    setShowModalOne(false);
                    setRTDBColorOne();
                }}>
                  <Text className="text-white">
                    Apply
                  </Text>
                </TouchableOpacity>
              </View>
            </Modal>

            {/* MODAL 2 */}
            <Modal isVisible={showModalTwo}>
              <View className="w-96 bg-slate-100 flex justify-center items-center rounded-lg">
                <ColorPicker style={{ width: '70%' }} value='red' onComplete={onSelectColorTwo}>
                  <View className="py-5">
                    <Preview hideInitialColor colorFormat='rgb' />
                  </View>
                  <View className="pt-5 pb-1 px-2 bg-white flex justify-center shadow-2xl rounded-xl">
                    <Swatches colors={['red', 'green', 'blue', 'violet']} />
                  </View>
                </ColorPicker>
                <TouchableOpacity className="bg-green-500 py-3 px-8 my-5 rounded-full" 
                  onPress={() => {
                    setShowModalTwo(false)
                    setRTDBColorTwo();
                  }}
                >
                  <Text className="text-white">
                    Apply
                  </Text>
                </TouchableOpacity>
              </View>
            </Modal>

            {/* MODAL 3 */}
            <Modal isVisible={showModalThree}>
              <View className="w-96 bg-slate-100 flex justify-center items-center rounded-lg">
                <ColorPicker style={{ width: '70%' }} value='red' onComplete={onSelectColorThree}>
                  <View className="py-5">
                    <Preview hideInitialColor colorFormat='rgb' />
                  </View>
                  <View className="pt-5 pb-1 px-2 bg-white flex justify-center shadow-2xl rounded-xl">
                    <Swatches colors={['red', 'green', 'blue', 'violet']} />
                  </View>
                </ColorPicker>
                <TouchableOpacity className="bg-green-500 py-3 px-8 my-5 rounded-full" 
                  onPress={() => {
                    setShowModalThree(false)
                    setRTDBColorThree();
                  }}
                >
                  <Text className="text-white">
                    Apply
                  </Text>
                </TouchableOpacity>
              </View>
            </Modal>


            {/* KILOGRAMS */}
            {/* --------------------------------------------------------------------- */}
            {/* KILO MODAL 1 */}
            <Modal isVisible={showModalKgOne}>
              <View className="w-96 bg-slate-100 flex justify-center items-center rounded-lg">
                <View className="flex flex-row gap-3 my-5">
                  <NumericInput 
                    totalWidth={200}
                    value={kgOne}
                    onChange={value => setKgOne(value)}
                    minValue={1}
                  />
                </View>
                <TouchableOpacity className="bg-green-500 py-3 px-8 my-5 rounded-full" 
                  onPress={() => {
                    setShowModalKgOne(false)
                    setRTDBWeightOne();
                  }}>
                  <Text className="text-white">
                    Apply
                  </Text>
                </TouchableOpacity>
              </View>
            </Modal>

            {/* KILO MODAL 2 */}
            <Modal isVisible={showModalKgTwo}>
              <View className="w-96 bg-slate-100 flex justify-center items-center rounded-lg">
                <View className="flex flex-row gap-3 my-5">
                  <NumericInput 
                    totalWidth={200}
                    value={kgTwo}
                    onChange={value => setKgTwo(value)}
                    minValue={1}
                  />
                </View>
                <TouchableOpacity className="bg-green-500 py-3 px-8 my-5 rounded-full" 
                  onPress={() => {
                    setShowModalKgTwo(false);
                    setRTDBWeightTwo();
                  }}
                >
                  <Text className="text-white">
                    Apply
                  </Text>
                </TouchableOpacity>
              </View>
            </Modal>

            {/* KILO MODAL 3 */}
            <Modal isVisible={showModalKgThree}>
              <View className="w-96 bg-slate-100 flex justify-center items-center rounded-lg">
                <View className="flex flex-row gap-3 my-5">
                  <NumericInput 
                    totalWidth={200}
                    value={kgThree}
                    onChange={value => setKgThree(value)}
                    minValue={1}
                  />
                </View>
                <TouchableOpacity className="bg-green-500 py-3 px-8 my-5 rounded-full" 
                  onPress={() => {
                    setShowModalKgThree(false)
                    setRTDBWeightThree();
                  }}
                >
                  <Text className="text-white">
                    Apply
                  </Text>
                </TouchableOpacity>
              </View>
            </Modal>

            <Modal isVisible={converyorState == "ON" ? true : false}>
              <View className="w-96 bg-[#f8fafc] flex justify-center items-center rounded-lg">
                <LottieView
                  autoPlay
                  style={{
                    width: 200,
                    height: 200,
                  }}
                  // Find more Lottie files at https://lottiefiles.com/featured
                  source={require('../assets/starting.json')}
                />
                <Text className="text-center font-black text-xl py-7 text-green-400 tracking-[3px] -mt-8">Sorting...</Text>
              </View>
            </Modal>
        </View>
        <View className="mt-auto mb-52 flex flex-row">
          <TouchableOpacity className="border-2 rounded-full py-2 px-5 flex justify-center mr-8" onPress={toggleConveyor}>
            <Text className="text-center font-semibold">Start Sorting</Text>
          </TouchableOpacity>
          <TouchableOpacity className="border-2 rounded-full py-2 px-5 flex justify-center" onPress={reset}>
            <Text className="text-center font-semibold">Reset</Text>
          </TouchableOpacity>
        </View>
      </View>
      
    </ImageBackground>
  )
}

export default ControlScreen