import { View, Text, Dimensions, FlatList, ScrollView } from 'react-native'
import React from 'react'
import { BarChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const Sorted = () => {
  // const chartConfig = {
  //   backgroundGradientFrom: "#1E2923",
  //   backgroundGradientFromOpacity: 0,
  //   backgroundGradientTo: "#08130D",
  //   backgroundGradientToOpacity: 0.5,
  //   color: (opacity = 1) => `white`,
  //   strokeWidth: 2, // optional, default 3
  //   barPercentage: 0.5,
  //   useShadowColorFromDataset: false // optional
  // };

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    strokeWidth: 2, // optional, default 3
    fillShadowGradient: 'blue',
    fillShadowGradientOpacity: 1,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(230, 0, 0, ${opacity})`,
    
  };

  const data = {
    labels: ["Tomato", "Cucumber", "Chili"],
    datasets: [
      {
        data: [20, 45, 28]
      }
    ],
    barColors: ['#FF6347', '#32CD32', '#FF4500']
  };
  return (
    <View className="w-full flex flex-col justify-center items-center py-10">
      <Text className="my-5 self-start px-5 font-bold text-lg">
        Sorted Crops:
      </Text>
      <ScrollView horizontal={true} >
        <BarChart
          data={data}
          width={screenWidth - 20}
          height={350}
          // yAxisLabel="$"
          chartConfig={chartConfig}
          verticalLabelRotation={30}
          
        />
      </ScrollView>
    </View>
  )
}

export default Sorted