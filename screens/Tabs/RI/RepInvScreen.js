import { Text, View, SafeAreaView, ScrollView, ActivityIndicator, Image, TouchableOpacity, Button  } from 'react-native';
import React, { useState, useCallback } from 'react'
import { COLORS, FONT, SIZES } from '../../../constants/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';

import styles from './repinv.style';

import Tabs from './tabs/tabs';
import Inventory from './Inventory/Inventory';
import Sorted from './Sorted/Sorted';

const tabList = ["Sorted Crops", "Invetory"];
const RepInvScreen = () => {
  const [activeTab, setActiveTab] = useState(tabList[0]);

  const displayTabContent = () => {
    switch (activeTab) {
        case "Sorted Crops":
            return <Sorted
                title='Sorted Crops'
            />
        case "Invetory":
            return <Inventory
                title='Inventory'
            />
        default:
            break;
    }
  }
  return (
    <SafeAreaView>
      <View style={styles.chatsHeader}>
        <View style={styles.titleContainer}>
          <View className="flex flex-row items-center justify-center">
            <Image
              style={{ width: 80, height: 80}}
              source={require('../../../assets/logo.png')}
            />
             <Text style={styles.headerTitle}>Crop Sort</Text>
          </View>
        </View>
        <Tabs 
          tabs={tabList}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </View>
      {displayTabContent()}
    </SafeAreaView>
  )
}

export default RepInvScreen