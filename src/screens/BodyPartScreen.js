import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { WebView } from 'react-native-webview';

const BodyPartScreen = ({ route, navigation }) => {
  const { bodyPart } = route.params;
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const options = {
          method: 'GET',
          url: `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`,
          headers: {
            'X-RapidAPI-Key': '0c77a04b07msh7b1018aea0016f9p17a509jsnaba85eae4388',
            'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
          },
        };

        const response = await axios.request(options);
        setExercises(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchExercises();
  }, [bodyPart]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ExerciseDetailScreen', { exercise: item })}
    >
      <Text style={styles.name}>{item.name}</Text>
      <WebView source={{ uri: item.gifUrl }} style={{ height: 200, width: '100%' }} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{bodyPart.toUpperCase()} Exercises</Text>
      <FlatList
        data={exercises}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

export default BodyPartScreen;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16 
  },
  title: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    marginBottom: 12 
  },
  card: {
    marginVertical: 10,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#fff',
    elevation: 2,
  },
  name: { 
    fontSize: 16, 
    fontWeight: '600' 
  },
});
