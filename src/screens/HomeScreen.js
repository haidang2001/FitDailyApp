import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import axios from 'axios';

const HomeScreen = ({ navigation }) => {
  const [bodyParts, setBodyParts] = useState([]);

  useEffect(() => {
    const fetchBodyParts = async () => {
      try {
        const options = {
          method: 'GET',
          url: 'https://exercisedb.p.rapidapi.com/exercises/bodyPartList',
          headers: {
            'X-RapidAPI-Key': '0c77a04b07msh7b1018aea0016f9p17a509jsnaba85eae4388',
            'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
          },
        };

        const response = await axios.request(options);
        setBodyParts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBodyParts();
  }, []);

  const bodyPartImages = {
    back: require('../../assets/muscle/back.png'),
    chest: require('../../assets/muscle/chest.png'),
    lower_arms: require('../../assets/muscle/lower_arms.png'),
    lower_legs: require('../../assets/muscle/lower_legs.png'),
    neck: require('../../assets/muscle/neck.png'),
    shoulders: require('../../assets/muscle/shoulders.png'),
    upper_arms: require('../../assets/muscle/upper_arms.png'),
    upper_legs: require('../../assets/muscle/upper_legs.png'),
    waist: require('../../assets/muscle/waist.png'),
    cardio: require('../../assets/muscle/cardio.png'),
  };

  const renderItem = ({ item }) =>{
    const normalizedKey = item.toLowerCase().replace(/\s+/g, '_'); //"lower arms" -> "lower_arms"
  
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          console.log("moving to BodyPartScreen");
          navigation.navigate('BodyPartScreen', { bodyPart: item }); //route.params
        }}
      >
        <Image
          source={bodyPartImages[normalizedKey]}
          style={styles.image}
        />
        <Text style={styles.text}>{item}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Exercises</Text>
      <FlatList
        data={bodyParts}
        keyExtractor={(item) => item}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: { 
      flex: 1, 
      padding: 16 
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
    },
    card: {
      width: '48%',
      marginBottom: 16,
      padding: 12,
      borderRadius: 12,
      backgroundColor: '#f5f5f5',
      alignItems: 'center',
    },
    image: { 
      width: 100, 
      height: 100 },
    text: { 
      fontSize: 18, 
      marginTop: 8 
    },
  });
  