import { View, Text, TouchableOpacity, ActivityIndicator, Image, TextInput, ScrollView, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons';
import firebase from '../../../../firebase';
import Modal from "react-native-modal";
import { SelectList } from 'react-native-dropdown-select-list';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import NumericInput from 'react-native-numeric-input';
import Toast from 'react-native-toast-message';

import styles from './inventory.style';

const Inventory = () => {
  const [stocks, setStocks] = useState({});
  const [dispatchList, setDispatchList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingList, setLoadingList] = useState(true);

  const [showAddModal, setShowAddModal] = useState(false);
  const [selected, setSelected] = useState("");

  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [quantity, setQuantity] = useState(1);

  const [storeName, setStoreName] = useState('');
  const [price, setPrice] = useState(0);

  const [showStockModal, setShowStockModal] = useState(false);

  const handleInputChange = (text) => {
    setStoreName(text);
  };

  const handlePriceChange = (price) => {
    setPrice(price);
  };

  const handleDateChange = (event, selected) => {
    setShowPicker(false); 
    if (selected) {
      setSelectedDate(selected);
    }
  };

  const formattedDate = `${selectedDate.toLocaleString('en-US', { month: 'long' })}`;

  const crops = [
    {key: '1', value: 'Tomato'},
    {key: '2', value: 'Cucumber'},
    {key: '3', value: 'Chili'},
  ]

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const stockDocumentRef = firebase.firestore().collection('stock').doc('stocks');
        
        // Subscribe to real-time updates
        const unsubscribe = stockDocumentRef.onSnapshot((doc) => {
          if (doc.exists) {
            setStocks(doc.data());
            setLoading(false);
          } else {
            console.log('No such document!');
          }
        });

        // Clean up the listener when component unmounts
        return () => unsubscribe();
      } catch (error) {
        console.error('Error getting document:', error);
      }
    };

    fetchStockData();
  }, []);

  useEffect(() => {
    const fetchDispatchList = async () => {
      try {
        const dispatchListRef = firebase.firestore().collection('dispatch_list');

        // Subscribe to real-time updates
        const unsubscribe = dispatchListRef.onSnapshot((querySnapshot) => {
          const list = [];
          querySnapshot.forEach((doc) => {
            list.push({ id: doc.id, ...doc.data() });
          });
          setDispatchList(list);
          // console.log(dispatchList.length);
          setLoadingList(false);
        });

        // Clean up the listener when component unmounts
        return () => unsubscribe();
      } catch (error) {
        console.error('Error getting dispatch list:', error);
      }
    };

    fetchDispatchList();
  }, []);

  const handleAddDispatch = async () => {
    try {
      // Validate input fields (if needed)
      if (!quantity || !storeName || !selected || !selectedDate || !price) {
        console.log('Fill all the fields');
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error!',
          text2: 'Fill all the fields',
          visibilityTime: 3000,
        });
        return;
      }

      // Convert orderDate to Firestore timestamp
      const timestamp = firebase.firestore.Timestamp.fromDate(selectedDate);

      const stockDocumentRef = firebase.firestore().collection('stock').doc('stocks');

      await firebase.firestore().runTransaction(async (transaction) => {
        const stockDoc = await transaction.get(stockDocumentRef);
        if (!stockDoc.exists) {
          // throw new Error("Stock document does not exist!");
          Toast.show({
            type: 'error',
            position: 'top',
            text1: 'Error!',
            text2: 'Stock document does not exist!',
            visibilityTime: 3000,
          });
          return;
        }
  
        // Get current stock value
        const currentStock = stockDoc.data()[selected.toLowerCase()];
        if (currentStock < quantity) {
          // throw new Error(`Insufficient stock for ${selected}`);
          Toast.show({
            type: 'error',
            position: 'top',
            text1: 'Error!',
            text2: `Insufficient stock for ${selected}`,
            visibilityTime: 3000,
          });

          return;
        }
  
        // Decrement stock value
        const newStock = currentStock - quantity;
        transaction.update(stockDocumentRef, { [selected.toLowerCase()]: newStock });
  
        // Add data to Firestore collection
        await firebase.firestore().collection('dispatch_list').add({
          bundles: parseInt(quantity, 10),
          buyer_name: storeName,
          crop: selected,
          order_date: timestamp,
          price: parseInt(price, 10),
        });
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Success!',
          text2: 'Dispatch added successfully.',
          visibilityTime: 3000,
        });
        console.log('Dispatch added successfully.');
      });

      // Clear input fields after successful addition
      setQuantity(1);
      setStoreName('');
      setSelected('');
      setSelectedDate(new Date()); // Reset orderDate to current date/time
      setPrice('');
    } catch (error) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error!',
        text2: `Error adding dispatch: ${error}`,
        visibilityTime: 3000,
      });
      console.error('Error adding dispatch:', error);
    }
  };

  const handleAddStock = async () => {
    try {
      // Validate input fields (if needed)
      if (!quantity || !selected) {
        console.log('Fill all the fields');
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error!',
          text2: 'Fill all the fields',
          visibilityTime: 3000,
        });
        return;
      }

      const stockDocumentRef = firebase.firestore().collection('stock').doc('stocks');

      // Run transaction
      await firebase.firestore().runTransaction(async (transaction) => {
        const stockDoc = await transaction.get(stockDocumentRef);
        if (!stockDoc.exists) {
          throw new Error("Stock document does not exist!");
        }

        // Get current stock value
        const currentStock = stockDoc.data()[selected.toLowerCase()];

        // Increment stock value
        const newStock = currentStock + quantity;
        transaction.update(stockDocumentRef, { [selected.toLowerCase()]: newStock });
      });

      // Clear input fields after successful addition
      setQuantity(1);
      setSelected('');

      // Alert or console log success
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Success!',
        text2: 'Stock added successfully.',
        visibilityTime: 3000,
      });
      console.log('Stock added successfully.');
    } catch (error) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error!',
        text2: `Error adding stock: ${error}`,
        visibilityTime: 3000,
      });
      console.error('Error adding stock:', error);
    }
  };

  return (
    <View className="w-full h-auto">
      <View className="mx-1 px-2">
        <View className="flex flex-row justify-between items-center my-3">
          <Text className="text-lg font-semibold">Total Stock: </Text>
          <TouchableOpacity className="flex flex-row bg-green-500 px-2 py-1 rounded-lg" onPress={() => setShowStockModal(true)}>
            <Ionicons 
              name='add'
              color='white'
              size={18}
            />
            <Text className="text-white">Add Stock</Text>
          </TouchableOpacity>
        </View>
        {/* MODAL */}
        <Modal isVisible={showStockModal}>
          <View className="w-96 h-auto bg-slate-100 flex justify-center items-center rounded-lg">
            <Text className="py-4 font-bold text-lg">Add Stock</Text>
            <View className="w-[90%] mt-5">
              <Text className="font-semibold text-base">
                Select Crop
              </Text>
              <SelectList
                setSelected={(val) => setSelected(val)} 
                data={crops} 
                search={false}
                save="value"
                placeholder='Ex: Tomato'
              />
            </View>
            <View className="w-[90%] mt-5 flex flex-row items-center">
              <Text className="font-semibold text-base mr-8">
                Quantity :
              </Text>
              <NumericInput 
                totalWidth={200}
                value={quantity}
                onChange={value => setQuantity(value)}
                minValue={1}
                totalHeight={50} 
              />
            </View>
            
            
            <View className="w-full mt-8 mb-5 flex flex-row justify-around">
              <TouchableOpacity className="py-3 px-8 bg-gray-200 rounded-md" onPress={() => {setShowStockModal(false)}}>
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity className="py-3 px-9 bg-green-600 rounded-md" onPress={() => {
                handleAddStock(),
                setShowStockModal(false)
                }}>
                <Text className="text-white">Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {/* MODAL END */}
        {loading ? (
          <View className="py-5 flex flex-col justify-center items-center">
           <ActivityIndicator size="large" color="#1C64F2" />
           <Text>Fetching...</Text>
          </View>
        ) : (
          <View className="w-full flex flex-row items-center justify-between">
            <View className="flex flex-col items-center border border-gray-400 border-dashed px-5 py-3">
              <Image
                source={require('../../../../assets/tomato.png')}
                className="w-12 h-12"
                resizeMode='contain'
              />
              <Text className="font-medium -mt-2">Tomato</Text>
              <View className="flex flex-row justify-center items-center h-auto mt-2">
                <Text className="font-bold text-2xl">{stocks.tomato}</Text>
                <Text className="font-light text-sm">/bundles</Text>
              </View>
            </View>
            
            <View className="flex flex-col items-center border border-gray-400 border-dashed px-5 py-3">
              <Image
                source={require('../../../../assets/cucumber.png')}
                className="w-12 h-12"
                resizeMode='contain'
              />
              <Text className="font-medium -mt-2">Cucumber</Text>
              <View className="flex flex-row justify-center items-center h-auto mt-2">
                <Text className="font-bold text-2xl">{stocks.cucumber}</Text>
                <Text className="font-light text-sm">/bundles</Text>
              </View>
            </View>

            <View className="flex flex-col items-center border border-gray-400 border-dashed px-5 py-3">
              <Image
                source={require('../../../../assets/chili.png')}
                className="w-12 h-12"
                resizeMode='contain'
              />
              <Text className="font-medium -mt-2">Chili</Text>
              <View className="flex flex-row justify-center items-center h-auto mt-2">
                <Text className="font-bold text-2xl">{stocks.chili}</Text>
                <Text className="font-light text-sm">/bundles</Text>
              </View>
            </View>
          </View>
        )}
      </View>

      <View className="w-[95%] h-1 bg-gray-300 self-center my-4"/>

      <View className="w-full h-auto flex items-center justify-center mb-4">
        <TouchableOpacity className="bg-green-500 w-1/2 flex flex-row items-center justify-center px-6 py-3 rounded-full" onPress={() => setShowAddModal(true)}>
          <Ionicons 
            name='add'
            color='white'
            size={18}
          />
          <Text className="text-white ml-3">Create New Batch</Text>
        </TouchableOpacity>
      </View>
      {/* MODAL */}
      <Modal isVisible={showAddModal}>
        <View className="w-96 h-auto bg-slate-100 flex justify-center items-center rounded-lg">
          <Text className="py-4 font-bold text-lg">Create New Batch</Text>
          <View className="w-[90%]">
            <Text className="font-semibold text-base">
              Buyer's Name
            </Text>
            <TextInput 
              className="border rounded-md py-2 px-3" 
              placeholder='Ex: Erning Store'
              value={storeName}
              onChangeText={handleInputChange}
            />
          </View>
          <View className="w-[90%] mt-5">
            <Text className="font-semibold text-base">
              Select Crop
            </Text>
            <SelectList
              setSelected={(val) => setSelected(val)} 
              data={crops} 
              search={false}
              save="value"
              placeholder='Ex: Tomato'
            />
          </View>
          <View className="w-[90%] mt-5 flex flex-row items-center">
            <Text className="font-semibold text-base mr-8">
              Quantity :
            </Text>
            <NumericInput 
              totalWidth={200}
              value={quantity}
              onChange={value => setQuantity(value)}
              minValue={1}
              totalHeight={50} 
            />
          </View>
          <View className="w-[90%] mt-5 flex flex-row items-center">
            <Text className="font-semibold text-base">
              Select Date :
            </Text>
            <TouchableOpacity onPress={() => setShowPicker(true)} className="ml-8 w-1/2 py-2 bg-gray-200 rounded-lg flex items-center justify-center">
              <Text className="font-semibold text-base ">{formattedDate}</Text>
            </TouchableOpacity>

            {showPicker && (
              <RNDateTimePicker
                value={selectedDate}
                mode="date"
                is24Hour={true}
                display="calendar"
                onChange={handleDateChange}
                className="z-10"
              />
            )}
          </View>
          <View className="w-[90%] mt-5">
            <Text className="font-semibold text-base">
              Price :
            </Text>
            <TextInput 
              className="border rounded-md py-2 px-3" 
              placeholder='Ex: ₱120'
              value={price}
              onChangeText={handlePriceChange}
            />
          </View>
          <View className="w-full mt-8 mb-5 flex flex-row justify-around">
            <TouchableOpacity className="py-3 px-8 bg-gray-200 rounded-md" onPress={() => {setShowAddModal(false)}}>
              <Text>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity className="py-3 px-9 bg-green-600 rounded-md" onPress={() => {
              handleAddDispatch(),
              setShowAddModal(false)
              }}>
              <Text className="text-white">Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* MODAL END */}

      {/* LIST */}
    
      {
        loadingList ? (
          <View className="py-5 flex flex-col justify-center items-center">
           <ActivityIndicator size="large" color="#1C64F2" />
           <Text>Fetching...</Text>
          </View>
        ) : dispatchList.length === 0 ? (
          <View className="py-5 flex flex-col justify-center items-center">
            <Text>No dispatch items found.</Text>
          </View>
        ) : (
          <FlatList
            data={dispatchList}
            renderItem={({item}) => 
              <View key={item.id} className="px-3 rounded-lg">
                <View className="flex flex-row justify-between bg-white shadow-md px-3 py-3 rounded-lg mb-5">
                  <View className="flex flex-col justify-center items-center border-r-[1px] pr-3">
                    {item.crop === 'Tomato' && (
                      <Image
                        source={require('../../../../assets/tomato.png')}
                        style={{ width: 40, height: 40 }}
                        resizeMode='contain'
                      />
                    )}
                    {item.crop === 'Cucumber' && (
                      <Image
                        source={require('../../../../assets/cucumber.png')}
                        style={{ width: 40, height: 40 }}
                        resizeMode='contain'
                      />
                    )}
                    {item.crop === 'Chili' && (
                      <Image
                        source={require('../../../../assets/chili.png')}
                        style={{ width: 40, height: 40 }}
                        resizeMode='contain'
                      />
                    )}
                    <Text className="font-bold">{item.crop}</Text>
                  </View>
                  <View className="flex flex-col border-r-[1px] pr-3">
                    <Text className="font-bold">Quantity</Text>
                    <View className="flex flex-row justify-center items-center mt-2">
                      <Text className="font-bold text-xl">{item.bundles}</Text>
                      <Text className="font-light text-md">/bundles</Text>
                    </View>
                  </View>
                  <View className="flex flex-col border-r-[1px] pr-3">
                    <Text className="font-bold">Buyer's Name</Text>
                    <Text className="font-bold text-lg mt-2">{item.buyer_name}</Text>
                  </View>
                  <View className="flex flex-col pr-3">
                    <Text className="font-bold">Price</Text>
                    <Text className="font-bold text-lg mt-2">₱{item.price}</Text>
                  </View>
                </View>
              </View>
              
            }
            keyExtractor={item => item.id}
            className="max-h-[360px]"
          />
        )
      }
      <Toast />
    </View>
  )
}

export default Inventory