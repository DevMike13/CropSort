import { View, Text, TouchableOpacity, ImageBackground, Image, Button, TextInput } from 'react-native'
import Modal from "react-native-modal";
import { ScrollView } from 'react-native-gesture-handler';
import NumericInput from 'react-native-numeric-input'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SelectList } from 'react-native-dropdown-select-list';
import uuid from 'react-native-uuid';
import firebase from '../firebase';
import LottieView from 'lottie-react-native';
import RadioGroup from 'react-native-radio-buttons-group';

import ColorPicker, { Panel1, Panel5, Swatches, Preview, OpacitySlider, HueSlider } from 'reanimated-color-picker';

const ControlScreen = () => {

  // const [deviceId, setDeviceId] = useState(null);
  const [radioButtons, setRadioButtons] = useState([]);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedColorValue, setSelectedColorValue] = useState('');

  const [showModalOne, setShowModalOne] = useState(false);
  const [showModalTwo, setShowModalTwo] = useState(false);
  const [showModalThree, setShowModalThree] = useState(false);

  const [showModalKgOne, setShowModalKgOne] = useState(false);
  const [showModalKgTwo, setShowModalKgTwo] = useState(false);
  const [showModalKgThree, setShowModalKgThree] = useState(false);

  const [colorOne, setColorOne] = useState('');
  const [colorTwo, setColorTwo] = useState('');
  const [colorThree, setColorThree] = useState('');

  const [kgOne, setKgOne] = useState(1);
  const [kgTwo, setKgTwo] = useState(1);
  const [kgThree, setKgThree] = useState(1);

  const [currentCrop, setCurrentCrop] = useState("Tomato");

  const colorOptionsForTomato = [
    { id: '1', label: 'Red', value: 'red' },
    { id: '2', label: 'Green', value: 'green' },
    { id: '3', label: 'Orange', value: 'orange' },
    { id: '4', label: 'Yellow', value: 'yellow' },
  ];

  const colorOptionsForCucumber = [
    { id: '1', label: 'Green', value: 'green' },
    { id: '2', label: 'Yellow', value: 'yellow' },
    { id: '3', label: 'Yellow Green', value: 'yellow green' },
  ];

  const colorOptionsForChili = [
    { id: '1', label: 'Red', value: 'red' },
    { id: '2', label: 'Green', value: 'green' },
    { id: '3', label: 'Yellow', value: 'yellow' },
    { id: '4', label: 'Yellow Green', value: 'yellow green' },
  ];

  const crops = [
    {key: '1', value: 'Tomato'},
    {key: '2', value: 'Cucumber'},
    {key: '3', value: 'Chili'},
  ];

  const updateColorOptions = (crop) => {
    setCurrentCrop(crop);
    setSelectedColor(''); // Reset selected color ID when changing crops
    setSelectedColorValue(''); // Reset selected color value

    switch (crop) {
      case 'Tomato':
        setRadioButtons(colorOptionsForTomato);
        break;
      case 'Cucumber':
        setRadioButtons(colorOptionsForCucumber);
        break;
      case 'Chili':
        setRadioButtons(colorOptionsForChili);
        break;
      default:
        setRadioButtons([]);
    }
  };
  useEffect(() => {
    updateColorOptions(currentCrop); // Update color options for the default crop (Tomato)
  }, []);

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

    firebase.database().ref('colorOne').set('#000000');
    firebase.database().ref('colorTwo').set('#000000');
    firebase.database().ref('colorThree').set('#000000');
    
    setKgOne(0);
    setKgTwo(0);
    setKgThree(0);

    firebase.database().ref('weightOne').set(0);
    firebase.database().ref('weightTwo').set(0);
    firebase.database().ref('weightThree').set(0);

    firebase.database().ref('currentCrop').set('Tomato');
    setCurrentCrop('Tomato')
  }

  // BASKET 1
  const setRTDBColorOne = () => {
    const clrOne = colorOne;
    firebase.database().ref('colorOne').set(clrOne);
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

    const rtdbCurrentCropRef = firebase.database().ref('currentCrop');
    rtdbCurrentCropRef.on('value', (snapshot) => {
      const newCurrentCrop = snapshot.val();
      setCurrentCrop(newCurrentCrop);
    });

    return () => {
      rtdbCurrentCropRef.off('value'); // Detach listener
    };
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

  useEffect(() => {
    const rtdbWeightOne = firebase.database().ref('weightOne');
    rtdbWeightOne.on('value', (snapshot) => {
      const newWeightOne = snapshot.val();
      setKgOne(newWeightOne);
    });

    const rtdbWeightTwo = firebase.database().ref('weightTwo');
    rtdbWeightTwo.on('value', (snapshot) => {
      const newWeightTwo = snapshot.val();
      setKgTwo(newWeightTwo);
    });

    const rtdbWeightThree = firebase.database().ref('weightThree');
    rtdbWeightThree.on('value', (snapshot) => {
      const newWeightThree = snapshot.val();
      setKgThree(newWeightThree);
    });
  }, []);

  const toggleConveyor = () => {
    const newState = converyorState === 'ON' ? 'OFF' : 'ON';
    firebase.database().ref('conveyorState').set(newState);
    setConveyorState(newState); // Update local state immediately

    // CROP
    firebase.database().ref('currentCrop').set(currentCrop);
    setCurrentCrop(currentCrop);
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
      <View className="h-full flex items-center">
        <Image
            source={require('../assets/logo.png')}
            className="w-52 h-40 "
            resizeMode='contain'
        />
        {
          currentCrop === 'Tomato' && (
            <Image
              source={require('../assets/tomato.png')}
              className="w-52 h-28"
              resizeMode='contain'
            />
        )}
        {
          currentCrop === 'Cucumber' && (
            <Image
              source={require('../assets/cucumber.png')}
              className="w-52 h-28 "
              resizeMode='contain'
            />
        )}
        {
          currentCrop === 'Chili' && (
            <Image
              source={require('../assets/chili.png')}
              className="w-52 h-28 "
              resizeMode='contain'
            />
        )}
        <View className="w-[50%] mb-5">
          <SelectList
            setSelected={(val) => updateColorOptions(val)}
            data={crops} 
            search={false}
            save="value"
            placeholder='Ex: Tomato'
            defaultOption={{ key: '1', value: 'Tomato' }}
          />
        </View>
        {/* <Text>Device ID: {deviceId}</Text> */}
        <View className="w-[90%] flex items-center justify-center mb-10">

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
              <TouchableOpacity className="border-2 w-28 h-10 rounded-lg flex flex-row justify-around items-center" 
                // onPress={() => setShowModalKgOne(true)}
              >
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
              <TouchableOpacity className="border-2 w-28 h-10 rounded-lg flex flex-row justify-around items-center" 
                // onPress={() => setShowModalKgTwo(true)}
              >
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
              <TouchableOpacity className="border-2 w-28 h-10 rounded-lg flex flex-row justify-around items-center" 
                // onPress={() => setShowModalKgThree(true)}
              >
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
              <View className="bg-slate-100 flex justify-center items-center rounded-lg">
                {currentCrop && (
                  <>
                    <View className="py-5 flex justify-center items-center">
                      <Text>Select a Color for {currentCrop}</Text>
                      <RadioGroup 
                        radioButtons={radioButtons}
                        onPress={(selectedId) => {
                          setSelectedColor(selectedId);
                          const selectedOption = radioButtons.find(rb => rb.id === selectedId);
                          if (selectedOption) {
                            setColorOne(selectedOption.value);
                            console.log("Selected Color Value:", selectedOption.value);
                          }
                        }}
                        selectedId={selectedColor}
                        layout={'row'}
                        containerStyle={{ paddingVertical: 10}}
                      />
                    </View>
                  </>
                )}
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
              <View className="bg-slate-100 flex justify-center items-center rounded-lg">
                {currentCrop && (
                  <>
                    <Text>Select a Color for {currentCrop}:</Text>
                    <RadioGroup 
                      radioButtons={radioButtons}
                      onPress={(selectedId) => {
                        setSelectedColor(selectedId);
                        const selectedOption = radioButtons.find(rb => rb.id === selectedId);
                        if (selectedOption) {
                          setColorTwo(selectedOption.value);
                          console.log("Selected Color Value:", selectedOption.value);
                        }
                      }}
                      selectedId={selectedColor}
                      layout={'row'}
                    />
                  </>
                )}
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
              <View className="bg-slate-100 flex justify-center items-center rounded-lg">
                {currentCrop && (
                  <>
                    <Text>Select a Color for {currentCrop}:</Text>
                    <RadioGroup 
                      radioButtons={radioButtons}
                      onPress={(selectedId) => {
                        setSelectedColor(selectedId);
                        const selectedOption = radioButtons.find(rb => rb.id === selectedId);
                        if (selectedOption) {
                          setColorThree(selectedOption.value);
                          console.log("Selected Color Value:", selectedOption.value);
                        }
                      }}
                      selectedId={selectedColor}
                      layout={'row'}
                    />
                  </>
                )}
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
              <View className="bg-slate-100 flex justify-center items-center rounded-lg">
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
              <View className="bg-[#f8fafc] flex justify-center items-center rounded-lg">
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
        <View className="mb-52 flex flex-row">
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