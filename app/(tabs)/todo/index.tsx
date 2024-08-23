import Card from '@/components/Card';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Task } from '@/models/Task';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { StyleSheet, Image, Platform, FlatList, View, ScrollView, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from '@/components/Button';
import { ThemedText } from '@/components/ThemedText';

export default function TaskListScreen() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const router = useRouter();

    const loadTasks = async () => {
        try {
            const storedTasks = await AsyncStorage.getItem('tasks');
            if (storedTasks) {
                const parsedTasks: Task[] = JSON.parse(storedTasks);
                setTasks(parsedTasks);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des tâches:', error);
        }
    };

    // Appeler loadTasks lorsque l'écran reçoit le focus
    useFocusEffect(
        useCallback(() => {
            loadTasks(); 
        }, [])
    );

    const deleteTask = async (id: number) => {
        try {
            const newTasks = tasks.filter(task => parseInt(task.id) !== id);
            await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
            setTasks(newTasks);
        } catch (error) {
            console.error('Erreur lors de la suppression de la tâche:', error);
        }
    };

    return (
        <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
        <ThemedText type='title' style={styles.title}>Liste des tâches</ThemedText>
        <FlatList
        data={tasks}
        renderItem={({ item }) => (
            <View style={styles.taskContainer}>
            <Text style={styles.taskText}>{item.title}</Text>
            <Pressable  onPress={() => deleteTask(parseInt(item.id))}>
                <Ionicons style={styles.deleteButton} name="trash-outline" size={24} color="#ffffff" />
                <Text style={styles.deleteButtonText}>Supprimer</Text>
            </Pressable>
            </View>
        )}
        keyExtractor={(item: Task) => item.id.toString()}
        />
        <Button title="Ajouter" onPress={() => router.push('/new')} />
    </SafeAreaView>
    </SafeAreaProvider>
    );
}
const styles = StyleSheet.create({
  container: {
    display: 'flex'
  },
  title: {
    color: 'black',
    textAlign: 'center',
    margin: 15
  },
  taskContainer: {
    display: 'flex',
    margin: '5%'
  },
  taskText: {
  },
  deleteButton: {
    color: 'red'
  },
  deleteButtonText: {
    color: 'red'
  },
  loadingContainer: {
  },
});