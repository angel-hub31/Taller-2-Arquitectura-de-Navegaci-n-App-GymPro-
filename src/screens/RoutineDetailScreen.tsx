// src/screens/RoutineDetailScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoutines } from '../context/RoutineContext';

export default function RoutineDetailScreen({ route }: any) {
    const { id } = route.params; 
    
    const { routines } = useRoutines();
    const routine = routines.find((r) => r.id === id);

    if (!routine) {
        return (
            <View style={styles.centerContainer}>
                <Text style={styles.errorText}>Rutina no encontrada.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{routine.name}</Text>
            
            <View style={styles.card}>
                <Text style={styles.label}>Grupo Muscular:</Text>
                <Text style={styles.value}>{routine.muscleGroup}</Text>

                <View style={styles.divider} />

                <Text style={styles.label}>Duración:</Text>
                <Text style={styles.value}>{routine.duration} minutos</Text>

                <View style={styles.divider} />

                <Text style={styles.label}>Fecha de Creación:</Text>
                <Text style={styles.value}>{routine.createdAt}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e7f3f5',
        padding: 20,
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 18,
        color: '#EF4444',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#18181B',
        marginBottom: 20,
        textAlign: 'center',
        marginTop: 10,
    },
    card: {
        backgroundColor: '#FFFFFF',
        padding: 24,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#71717A',
        textTransform: 'uppercase',
        marginBottom: 4,
    },
    value: {
        fontSize: 20,
        fontWeight: '500',
        color: '#3F3F46',
    },
    divider: {
        height: 1,
        backgroundColor: '#E4E4E7',
        marginVertical: 16,
    },
});