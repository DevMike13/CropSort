import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Dimensions,
  FlatList,
  ScrollView,
  Image,
} from "react-native";
import { BarChart } from "react-native-chart-kit";
import { SelectList } from "react-native-dropdown-select-list";
import firebase from "../../../../firebase";

const screenWidth = Dimensions.get("window").width;

const aggregateBundleData = (data) => {
  const aggregates = {};
  data.forEach((item) => {
    const { season_no, crop, bundle_count } = item;
    const key = `${season_no}_${crop}`;
    if (!aggregates[key]) {
      aggregates[key] = { season_no, crop, total_bundle_count: 0 };
    }
    aggregates[key].total_bundle_count += bundle_count;
  });
  return Object.values(aggregates).sort((a, b) => a.season_no - b.season_no);
};


const Sorted = () => {
  const [aggregatedData, setAggregatedData] = useState([]);
  const [filterCrop, setFilterCrop] = useState("Tomato");

  const crops = [
    { key: "1", value: "Tomato" },
    { key: "2", value: "Cucumber" },
    { key: "3", value: "Chili" },
  ];

  // Fetch data and store in state
  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("bundle_collection")
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setAggregatedData(aggregateBundleData(data));
      });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  // Filtered data
  const filteredData = aggregatedData.filter((item) =>
    filterCrop
      ? item.crop.toLowerCase().includes(filterCrop.toLowerCase())
      : true
  );

  const chartConfig = {
    backgroundColor: "#ffffff",
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    strokeWidth: 2,
    fillShadowGradient: "lightgreen",
    fillShadowGradientOpacity: 1,
    decimalPlaces: 0, // Number formatting
    color: (opacity = 1) => `rgba(0, 128, 0, ${opacity})`,
    barRadius: 5,
    borderColor: "black",
  };
  

  const data = {
    labels: filteredData.map((item) => `S${item.season_no}`),
    datasets: [
      {
        data: filteredData.map((item) => item.total_bundle_count),
        colors: filteredData.map(() => () => "lightgreen"),
      },
    ],
  };

  const chartWidth = Math.max(filteredData.length * 60, Dimensions.get("window").width - 16);

  return (
    <View className="w-full flex flex-col justify-center items-center py-10">
      <View className="w-[80%]">
        <SelectList
          setSelected={(val) => setFilterCrop(val)}
          data={crops}
          search={false}
          save="value"
          placeholder="Tomato"
        />
      </View>

      <View className="self-start flex flex-row">
        <Text className="my-5 px-5 font-bold text-lg">Sorted Crops:</Text>
        {filterCrop === "Tomato" && (
          <View className="flex flex-row items-center justify-center">
            <Image
              source={require("../../../../assets/tomato.png")}
              className="w-16 h-16"
              resizeMode="contain"
            />
            <Text className="text-sm font-normal">/ {filterCrop}</Text>
          </View>
        )}
        {filterCrop === "Cucumber" && (
          <View className="flex flex-row items-center justify-center">
            <Image
              source={require("../../../../assets/cucumber.png")}
              className="w-16 h-16"
              resizeMode="contain"
            />
            <Text className="text-sm font-normal">/ {filterCrop}</Text>
          </View>
        )}
        {filterCrop === "Chili" && (
          <View className="flex flex-row items-center justify-center">
            <Image
              source={require("../../../../assets/chili.png")}
              className="w-16 h-16"
              resizeMode="contain"
            />
            <Text className="text-sm font-normal">/ {filterCrop}</Text>
          </View>
        )}
      </View>

      <ScrollView horizontal={true}>
        <BarChart
          data={data}
          width={chartWidth}
          height={350}
          fromZero={true}
          withCustomBarColorFromData={true}
          flatColor={true}
          chartConfig={chartConfig}
          verticalLabelRotation={30}
        />
      </ScrollView>
    </View>
  );
};

export default Sorted;
