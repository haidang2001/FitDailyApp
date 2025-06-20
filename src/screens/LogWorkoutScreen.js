

import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs } from 'firebase/firestore';
import { db, auth } from '../services/firebase'; 
import { deleteDoc, doc } from 'firebase/firestore';
import Modal from 'react-native-modal';
import { useIsFocused } from '@react-navigation/native';
import { Swipeable } from 'react-native-gesture-handler';

const LogWorkoutScreen = () => {
    const navigation = useNavigation();
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [detailVisible, setDetailVisible] = useState(false);


    const deleteTemplate = async (templateId) => {
        const user = auth.currentUser;
        if (!user) {
            console.error("User not authenticated");
            return;
        }
    
        try {
            await deleteDoc(doc(db, 'users', user.uid, 'templates', templateId));
            fetchTemplates(user.uid); // Refresh
        } catch (error) {
            console.error("Error deleting template:", error);
        }
    };

    const openTemplate = (template) => {
        setSelectedTemplate(template);
        setDetailVisible(true);
    };
    const isFocused = useIsFocused();


    const fetchTemplates = async (uid) => {
        setLoading(true);
        try {
            const snapshot = await getDocs(collection(db, 'users', uid, 'templates'));
            const tempList = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setTemplates(tempList);
        } catch (error) {
            console.error("Error fetching templates:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            fetchTemplates(user.uid);
        }
    }, [isFocused]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Workout Templates</Text>

            {loading ? (
                <Text>Loading...</Text>
            ) : templates.length === 0 ? (
                <>
                    <Text>No templates found.</Text>
                    <Button title="Create New Template" onPress={() => navigation.navigate('NewTemplateScreen')} />
                </>
            ) : (
                <>
                    <FlatList
                        data={templates}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <Swipeable
                                renderRightActions={() => (
                                    <TouchableOpacity
                                        style={styles.deleteButton}
                                        onPress={() => deleteTemplate(item.id)}
                                    >
                                        <Text style={styles.deleteText}>Delete</Text>
                                    </TouchableOpacity>
                                )}
                            >
                                <TouchableOpacity onPress={() => openTemplate(item)} style={styles.card}>
                                    <Text style={styles.cardTitle}>{item.id}</Text>
                                    {item.exercises?.map((ex, idx) => (
                                        <Text key={idx} style={styles.cardText}>
                                            {ex.name} - {ex.sets} sets
                                        </Text>
                                    ))}
                                </TouchableOpacity>
                            </Swipeable>
                        )}
                    />
                    <Button title="Create New Template" onPress={() => navigation.navigate('NewTemplateScreen')} />
                </>
            )}
            <Modal
                isVisible={detailVisible}
                onBackdropPress={() => setDetailVisible(false)}
                useNativeDriver
            >
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>{selectedTemplate?.id}</Text>

                    <View style={styles.exerciseList}>
                        {selectedTemplate?.exercises?.map((ex, idx) => (
                            <View key={idx} style={styles.exerciseItem}>
                                <Text style={styles.exerciseName}>{ex.name}</Text>
                                <Text style={styles.exerciseDetail}>
                                    {ex.sets} sets • {ex.reps} reps • {ex.weight} kg
                                </Text>
                            </View>
                        ))}
                    </View>

                    <View style={{ marginTop: 20 }}>
                        {/* <Button title="Close" onPress={() => setDetailVisible(false)} /> */}
                        <View style={{ marginTop: 10 }}>
                            <Button title="Edit" onPress={() => {
                                setDetailVisible(false);
                                navigation.navigate('NewTemplateScreen', { editingTemplate: selectedTemplate });
                            }} />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>

    );

};

export default LogWorkoutScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    card: {
        backgroundColor: '#f0f0f0',
        padding: 12,
        marginBottom: 12,
        borderRadius: 10,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 8,
    },

    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 12,
        elevation: 4,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    deleteButton: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        borderRadius: 10,
        marginLeft: 10,
      },
      deleteText: {
        color: '#fff',
        fontWeight: 'bold',
      },
      cardText: {
        fontSize: 14,
        color: '#333',
      },
      exerciseList: {
        marginTop: 12,
      },
      exerciseItem: {
        marginBottom: 10,
      },
      exerciseName: {
        fontWeight: '600',
        fontSize: 16,
      },
      exerciseDetail: {
        fontSize: 14,
        color: '#555',
      },
      
});