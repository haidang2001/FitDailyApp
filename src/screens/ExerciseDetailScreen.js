import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { WebView } from 'react-native-webview';

const ExerciseDetailScreen = ({ route }) => {
    const { exercise } = route.params;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>{exercise.name}</Text>
            <WebView source={{ uri: exercise.gifUrl }} style={{ height: 300 }} />
            <Text style={styles.detail}>Body Part: {exercise.bodyPart}</Text>
            <Text style={styles.detail}>Target: {exercise.target}</Text>
            <Text style={styles.detail}>Equipment: {exercise.equipment}</Text>

            {exercise.instructions && (
                <View style={styles.instructionsContainer}>
                    <Text style={styles.instructionsTitle}>Instructions:</Text>
                    {exercise.instructions.map((step, index) => (
                        <Text key={index} style={styles.instructionStep}>
                            {index + 1}. {step}
                        </Text>
                    ))}
                </View>
            )}
        </ScrollView>
    );
};

export default ExerciseDetailScreen;

const styles = StyleSheet.create({
    container: {
        padding: 16,
        paddingBottom: 32,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    detail: {
        fontSize: 16,
        marginTop: 8,
    },
    instructionsContainer: {
        marginTop: 20,
    },
    instructionsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    instructionStep: {
        fontSize: 15,
        marginBottom: 4,
        lineHeight: 22,
    },
});
