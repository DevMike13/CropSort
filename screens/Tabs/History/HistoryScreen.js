import { View, Text, ActivityIndicator, Image, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import firebase from '../../../firebase';

const HistoryScreen = () => {
    const [data, setData] = useState([]); // Initialize as an array to match your later usage
    const [seasonInfo, setSeasonInfo] = useState('');
    const [loading, setLoading] = useState(true);

    const getCurrentSeason = () => {
        const seasonRef = firebase.database().ref('/currentSeason');

        seasonRef.on('value', (snapshot) => {
            const seasonData = snapshot.val();
            setSeasonInfo(seasonData);
        });
    };

    useEffect(() => {
        getCurrentSeason();
    }, []);
    useEffect(() => {
        // Subscribe to real-time updates from Firestore
        const unsubscribe = firebase.firestore().collection('bundle_collection')
            .onSnapshot(snapshot => {
                const result = {};

                // Loop through the fetched documents
                snapshot.forEach(doc => {
                    const { crop, bundle_count, season_no } = doc.data();

                    // Ensure each season exists in the result object
                    if (!result[season_no]) {
                        result[season_no] = { Chili: 0, Tomato: 0, Cucumber: 0 }; // Initialize crop counts
                    }

                    // Increment the count for the specific crop
                    if (crop && ['Chili', 'Tomato', 'Cucumber'].includes(crop)) {
                        result[season_no][crop] += bundle_count; // Add bundle_count for the crop
                    }
                });

                // Convert result object into an array for easy rendering
                const formattedData = Object.keys(result).map(season => ({
                    season: season,
                    counts: result[season],
                }));

                console.log('Fetched data formatted by season:', formattedData);
                setData(formattedData);
                setLoading(false); // Stop loading once data is received
            }, error => {
                console.error('Error fetching data: ', error);
                setLoading(false); // Stop loading on error
            });

        // Clean up the listener on component unmount
        return () => unsubscribe();
    }, []); // Empty dependency array means this runs once on component mount

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />; // Show loading indicator
    }

    return (
        <ScrollView>
            {data.length === 0 ? (
                <View className="w-2/3 flex flex-col justify-center items-center gap-1 py-5 border border-dashed self-center mt-5">
                    <Text className="font-bold text-gray-400 italic">No data available</Text>
                </View>
                
            ) : (
                data.map(item => (
                    <View key={item.season} className="bg-white my-3 px-5 py-3">
                        <View className="flex flex-row items-center">
                            <Text className="font-medium text-base italic text-gray-500">Season: </Text>
                            <Text className="font-bold text-lg bg-orange-300 px-2.5 rounded-full">
                                {item.season}
                            </Text>
                            {
                                item.season == seasonInfo ? (
                                    <Text className="font-semibold text-sm bg-gray-300 px-2.5 rounded-full ml-1">
                                        Current Season
                                    </Text>
                                ) : (
                                    <></>
                                )
                            }
                        </View>
                        <View>
                            <View className="flex flex-row items-center">
                                <Text className="font-semibold text-xl">Sorted Tomato: </Text>
                                <Image
                                    source={require('../../../assets/tomato.png')}
                                    className="w-11 h-11"
                                    resizeMode='contain'
                                />
                                <Text className="font-semibold text-xl">{item.counts.Tomato}</Text>
                            </View>
                            <View className="flex flex-row items-center">
                                <Text className="font-semibold text-xl">Sorted Chili: </Text>
                           
                                <Image
                                    source={require('../../../assets/chili.png')}
                                    className="w-11 h-11"
                                    resizeMode='contain'
                                />
                                <Text className="font-semibold text-xl">{item.counts.Chili}</Text>
                            </View>
                            <View className="flex flex-row items-center">
                                <Text className="font-semibold text-xl">Sorted Cucumber: </Text>
                                <Image
                                    source={require('../../../assets/cucumber.png')}
                                    className="w-11 h-11"
                                    resizeMode='contain'
                                />
                                <Text className="font-semibold text-xl">{item.counts.Cucumber}</Text>
                            </View>
                        </View>
                    </View>  
                ))
            )}
        </ScrollView>
    );
};

export default HistoryScreen;
