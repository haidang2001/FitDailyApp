
import React, { useEffect, useState } from 'react';
import {
  View, Text, TextInput, Button, FlatList, Modal, TouchableOpacity, StyleSheet
} from 'react-native';
import axios from 'axios';
import { db, auth } from '../services/firebase';
import { collection, doc, setDoc } from 'firebase/firestore';
import { useRoute } from '@react-navigation/native';

const NewTemplateScreen = ({ navigation }) => {
  const [exerciseModalVisible, setExerciseModalVisible] = useState(false);
  const [apiExercises, setApiExercises] = useState([]);

  const route = useRoute();
  const editingTemplate = route.params?.editingTemplate;
  
  const [templateName, setTemplateName] = useState(editingTemplate?.id || '');
  const [selectedExercises, setSelectedExercises] = useState(editingTemplate?.exercises || []);
  const isEditing = !!editingTemplate;

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get('https://exercisedb.p.rapidapi.com/exercises?limit=50', {
          headers: {
            'X-RapidAPI-Key': '0c77a04b07msh7b1018aea0016f9p17a509jsnaba85eae4388',
            'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
          }
        });
        setApiExercises(response.data.slice(0, 50)); // limit for performance
      } catch (error) {
        console.error('API error:', error);
      }
    };

    fetchExercises();
  }, []);

  const handleAddExercise = (name) => {
    setSelectedExercises((prev) => [
      ...prev,
      { name, sets: '', reps: '', weight: '' }
    ]);
    setExerciseModalVisible(false);
  };

  const handleInputChange = (index, field, value) => {
    const updated = [...selectedExercises];
    updated[index][field] = value;
    setSelectedExercises(updated);
  };

  const handleRemove = (index) => {
    const updated = [...selectedExercises];
    updated.splice(index, 1);
    setSelectedExercises(updated);
  };

  const saveTemplate = async () => {
    if (!templateName.trim()) return alert('Template name required!');
    const user = auth.currentUser;
    const ref = doc(collection(db, 'users', user.uid, 'templates'), templateName.trim());

    await setDoc(ref, {
      exercises: selectedExercises,
      createdAt: new Date(),
    });

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isEditing ? 'Edit Template' : 'New Template'}</Text>

      <TextInput
        placeholder="Enter template name"
        value={templateName}
        onChangeText={setTemplateName}
        style={styles.input}
      />

      <Button title="Add Exercise" onPress={() => setExerciseModalVisible(true)} />

      <FlatList
        data={selectedExercises}
        keyExtractor={(item, index) => item.name + index}
        renderItem={({ item, index }) => (
          <View style={styles.exerciseCard}>
            <Text style={styles.exerciseTitle}>{item.name}</Text>
            <TextInput
              placeholder="Sets"
              value={item.sets}
              keyboardType="numeric"
              onChangeText={(val) => handleInputChange(index, 'sets', val)}
              style={styles.inputSmall}
            />
            <TextInput
              placeholder="Reps"
              value={item.reps}
              keyboardType="numeric"
              onChangeText={(val) => handleInputChange(index, 'reps', val)}
              style={styles.inputSmall}
            />
            <TextInput
              placeholder="Weight"
              value={item.weight}
              keyboardType="numeric"
              onChangeText={(val) => handleInputChange(index, 'weight', val)}
              style={styles.inputSmall}
            />
            <Button title="Remove" color="red" onPress={() => handleRemove(index)} />
          </View>
        )}
      />

      <Button title="Save Template" onPress={saveTemplate} />

      {/* Exercise Selection Modal */}
      <Modal visible={exerciseModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Select Exercise</Text>
          <FlatList
            data={apiExercises}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleAddExercise(item.name)}>
                <Text style={styles.modalItem}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
          <Button title="Close" onPress={() => setExerciseModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

export default NewTemplateScreen;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16 
  },
  input: { 
    borderWidth: 1, 
    marginBottom: 12, 
    padding: 8, 
    borderRadius: 6 
  },
  inputSmall: { 
    borderWidth: 1, 
    padding: 6, 
    marginVertical: 4 
  },
  title: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    marginBottom: 12 
  },
  modalContainer: { 
    flex: 1, 
    padding: 16 
  },
  modalItem: { 
    padding: 12, 
    borderBottomWidth: 1 
  },
  exerciseCard: { 
    marginVertical: 8, 
    padding: 12, 
    backgroundColor: '#eee', 
    borderRadius: 8 
  },
  exerciseTitle: { 
    fontWeight: 'bold', 
    marginBottom: 6 
  },
});
