import { View, Text, TouchableOpacity, ImageBackground, Image, Button, TextInput } from 'react-native'
import Modal from "react-native-modal";
import { ScrollView } from 'react-native-gesture-handler';
import NumericInput from 'react-native-numeric-input'
import React, { useState } from 'react'

import ColorPicker, { Panel1, Panel5, Swatches, Preview, OpacitySlider, HueSlider } from 'reanimated-color-picker';

const ControlScreen = () => {

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

  // Note: 👇 This can be a `worklet` function.
  const onSelectColorOne = ({ hex }) => {
    // do something with the selected color.
    setColorOne(hex);
    console.log(hex);
  };

  const onSelectColorTwo = ({ hex }) => {
    // do something with the selected color.
    setColorTwo(hex);
    console.log(hex);
  };

  const onSelectColorThree = ({ hex }) => {
    // do something with the selected color.
    setColorThree(hex);
    console.log(hex);
  };

  const addKgOne = () => {
    setKgOne(prevKgOne => prevKgOne + 1);
  }

  const minusKgOne = () => {
    setKgOne(kgOne - 1);
  }

  

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
                <TouchableOpacity className="bg-green-500 py-3 px-8 my-5 rounded-full" onPress={() => setShowModalOne(false)}>
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
                <TouchableOpacity className="bg-green-500 py-3 px-8 my-5 rounded-full" onPress={() => setShowModalTwo(false)}>
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
                <TouchableOpacity className="bg-green-500 py-3 px-8 my-5 rounded-full" onPress={() => setShowModalThree(false)}>
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
                <TouchableOpacity className="bg-green-500 py-3 px-8 my-5 rounded-full" onPress={() => setShowModalKgOne(false)}>
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
                <TouchableOpacity className="bg-green-500 py-3 px-8 my-5 rounded-full" onPress={() => setShowModalKgTwo(false)}>
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
                <TouchableOpacity className="bg-green-500 py-3 px-8 my-5 rounded-full" onPress={() => setShowModalKgThree(false)}>
                  <Text className="text-white">
                    Apply
                  </Text>
                </TouchableOpacity>
              </View>
            </Modal>
        </View>
        <View className="mt-auto mb-40 flex flex-row">
          <TouchableOpacity className="border-2 rounded-full py-2 px-5 flex justify-center">
            <Text className="text-center font-semibold">Reset</Text>
          </TouchableOpacity>
        </View>
      </View>
      
    </ImageBackground>
  )
}

export default ControlScreen