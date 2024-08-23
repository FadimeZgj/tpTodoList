import Button from '@/components/Button';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { StyleSheet, Image, Platform, FlatList, View, ScrollView, SafeAreaView, TextInput, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

export default function AddTaskScreen() {
    const [task, setTask] = useState('');
    const router = useRouter();

    const saveTask = async () => {
        if (task.trim().length === 0) {
            Alert.alert('Erreur', 'Veuillez entrer une tâche.');
            return;
        }

        try {
            const existingTasks = await AsyncStorage.getItem('tasks');
            const tasks = existingTasks ? JSON.parse(existingTasks) : [];

            const newTask = { id: Date.now(), title: task };
            tasks.push(newTask);

            await AsyncStorage.setItem('tasks', JSON.stringify(tasks));

            setTask('');
            router.push('/todo'); 
        } catch (e) {
            Alert.alert('Erreur', 'Impossible de sauvegarder la tâche.');
            console.error(e);
        }
    };

    return(
    <SafeAreaView>
        <ThemedText type='title' style={styles.title}>Ajout de tâche</ThemedText>
        <TextInput
            style={styles.input}
            onChangeText={setTask}
            value={task}
            placeholder="Nouvelle tâche"
        />
        <View>
                <Button title="Ajouter" onPress={saveTask} />
                <Button title="Retour" onPress={() => router.replace('/(tabs)/todo')} />
        </View>
    </SafeAreaView>)

}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    title:{
        color: 'black',
        textAlign: 'center',
        margin: 15
    }
  });