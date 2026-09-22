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
                { text: "Cancelar", style: "cancel" },
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
            {/* Fila Superior: Información e Iconos */}
            <View style={styles.cardHeader}>
                <View style={styles.cardTextContainer}>
                    <Text style={styles.cardTitle}>{item.name}</Text>
                    <Text style={styles.cardSubtitle}>
                        {item.muscleGroup} • {item.duration} min
                    </Text>
                </View>

                <View style={styles.iconRow}>
                    <TouchableOpacity 
                        style={styles.iconButton} 
                        onPress={() => navigation.navigate('AddRoutine', { id: item.id })}
                    >
                        <Ionicons name="pencil-outline" size={22} color="#F59E0B" />
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.iconButton} 
                        onPress={() => navigation.navigate('Detail', { id: item.id })}
                    >
                        <Ionicons name="eye-outline" size={22} color="#3B82F6" />
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.iconButton} 
                        onPress={() => confirmDelete(item.id, item.name)}
                    >
                        <Ionicons name="trash-outline" size={22} color="#EF4444" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Fila Inferior: Botón Principal */}
            <TouchableOpacity
                style={styles.startButton}
                onPress={() => Alert.alert("¡Éxito!", "Has iniciado la rutina de entrenamiento.")}
            >
                <Text style={styles.startButtonText}>Comenzar Rutina</Text>
            </TouchableOpacity>
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
                showsVerticalScrollIndicator={false}
            />

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
        backgroundColor: '#F3F4F6', // Un gris muy sutil para destacar las tarjetas blancas
    },
    headerContainer: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: '800',
        color: '#111827',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 16,
        color: '#6B7280',
        marginBottom: 10,
    },
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 80, // Espacio extra para que el FAB no tape la última tarjeta
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 20,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    cardTextContainer: {
        flex: 1,
        paddingRight: 10,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1F2937',
        marginBottom: 4,
        textTransform: 'capitalize',
    },
    cardSubtitle: {
        fontSize: 15,
        color: '#6B7280',
        fontWeight: '500',
    },
    iconRow: {
        flexDirection: 'row',
        gap: 8, // Espaciado moderno entre iconos
    },
    iconButton: {
        padding: 6,
        backgroundColor: '#F9FAFB',
        borderRadius: 8,
    },
    startButton: {
        backgroundColor: '#10B981',
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#10B981',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 2,
    },
    startButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    fab: {
        position: 'absolute',
        width: 64,
        height: 64,
        alignItems: 'center',
        justifyContent: 'center',
        right: 24,
        bottom: 30,
        backgroundColor: '#FF6347',
        borderRadius: 32,
        elevation: 6,
        shadowColor: '#FF6347',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
});