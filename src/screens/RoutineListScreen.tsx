import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useRoutines } from '../context/RoutineContext';

export default function RoutineListScreen() {
    const navigation = useNavigation<any>();
    const { routines, deleteRoutine } = useRoutines();

    const confirmDelete = (id: string, name: string) => {
        Alert.alert(
            "Eliminar rutina",
            `¿Estás seguro de que deseas eliminar "${name}"?`,
            [
                {
                    text: "Cancelar",
                    style: "cancel",
                },
                {
                    text: "Eliminar",
                    style: "destructive",
                    onPress: () => deleteRoutine(id),
                },

            ]
        );
    };

    const renderItem = ({ item }: { item: any }) => (
        <View style={styles.card}>
            <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text style={styles.cardSubtitle}>
                    {item.muscleGroup} • {item.duration} min
                </Text>
            </View>

            <View style={styles.actionsContainer}>


                {/* Botón Editar (Lápiz) -> Navega a AddRoutine */}
                <TouchableOpacity onPress={() => navigation.navigate('AddRoutine', { id: item.id })}>
                    <Ionicons name="pencil-outline" size={24} color="#FF8C00" style={styles.icon} />
                </TouchableOpacity>

                {/* Botón Ver Detalles (Ojo) */}
                <TouchableOpacity onPress={() => navigation.navigate('Detail', { id: item.id })}>
                    <Ionicons name="eye-outline" size={24} color="#4682B4" style={styles.icon} />
                </TouchableOpacity>

                {/* Botón Eliminar (Basurero)*/}
                <TouchableOpacity onPress={() => confirmDelete(item.id, item.name)}>
                    <Ionicons name="trash-outline" size={24} color="#EF4444" style={styles.icon} />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>Mis Rutinas</Text>
                <Text style={styles.subtitle}>Selecciona un grupo muscular</Text>
            </View>

            <FlatList
                data={routines}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.listContent}
            />

            {/* CORRECCIÓN 7: Añadir Botón Flotante (+) para crear una nueva rutina[cite: 1] */}
            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.navigate('AddRoutine')}
            >
                <Ionicons name="add" size={30} color="#FFFFFF" />
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e7f3f5',
    },
    headerContainer: {
        padding: 20,
        paddingBottom: 10,
    },
    listContent: {
        padding: 20,
        paddingTop: 0,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#18181B',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 16,
        color: '#71717A',
        marginBottom: 10,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        padding: 16,
        marginBottom: 12,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    cardContent: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#3F3F46',
    },
    cardSubtitle: {
        fontSize: 14,
        color: '#71717A',
        marginTop: 4,
    },
    actionsContainer: {
        flexDirection: 'row',
        gap: 12,
    },
    icon: {
        marginLeft: 8,
    },
    fab: {
        position: 'absolute',
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        right: 20,
        bottom: 30,
        backgroundColor: '#FF6347',
        borderRadius: 30,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
});