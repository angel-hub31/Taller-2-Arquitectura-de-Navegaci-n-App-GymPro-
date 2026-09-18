import { useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

import { useRoutines } from "../context/RoutineContext";
import { useState } from "react";


export default function AddRoutineScreen({ navigation, route }: any) {
    const { addRoutine, updateRoutine, routines } = useRoutines();

    const idToEdit = route.params?.id;

    const [name, setName] = useState('');
    const [muscleGroup, setMuscleGroup] = useState('');
    const [durationString, setDurationString] = useState('');

    useEffect(() => {
        if (idToEdit) {
            const routineFound = routines.find(r => r.id === idToEdit);
            if (routineFound) {
                setName(routineFound.name);
                setMuscleGroup(routineFound.muscleGroup);
                setDurationString(routineFound.duration.toString());
            }
        }

    },
        [idToEdit]);

    const handleSave = () => {
        if (!name.trim() || !muscleGroup.trim() || !durationString.trim()) {
            Alert.alert('Datos incompletos', "Todos los campos son obligatorios");
            return;

        }
        const durationNumber = parseFloat(durationString);
        if (isNaN(durationNumber)) {
            Alert.alert('Error', "La duración debe ser un número valido");
            return;
        }
        if (idToEdit) {
            updateRoutine(idToEdit, {
                name: name.trim(),
                muscleGroup: muscleGroup.trim(),
                duration: durationNumber
            });

            Alert.alert(
                "¡Actualizado!",
                "La rutina se actualizó correctamente.",
                [{ text: "Entendido", onPress: () => navigation.goBack() }]
            );

        } else {
            addRoutine({
                name: name.trim(),
                muscleGroup: muscleGroup.trim(),
                duration: durationNumber
            });

            Alert.alert(
                "!EXITO", "La nueva rutina se creó exitosamente",
                [
                    {
                        text: "Entendido",
                        onPress: () => navigation.goBack()
                    }
                ]
            )
        }

    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView contentContainerStyle={styles.scrollContent}>

                <Text style={styles.headerTitle}>
                    {idToEdit ? "Editar Rutina" : "Nueva Rutina"}
                </Text>

                <View style={styles.formCard}>
                    <Text style={styles.label}>Nombre de la rutina</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ej: Pecho y Tríceps"
                        placeholderTextColor="#A1A1AA"
                        value={name}
                        onChangeText={setName}
                    />

                    <Text style={styles.label}>Grupo Muscular</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ej: Pecho"
                        placeholderTextColor="#A1A1AA"
                        value={muscleGroup}
                        onChangeText={setMuscleGroup}
                    />

                    <Text style={styles.label}>Duración (minutos)</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ej: 45"
                        placeholderTextColor="#A1A1AA"
                        value={durationString}
                        onChangeText={setDurationString}
                        keyboardType="numeric"
                    />

                    <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                        <Text style={styles.saveButtonText}>Guardar Rutina</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e7f3f5', // Fondo igual a tus otras pantallas
    },
    scrollContent: {
        padding: 20,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#18181B',
        marginBottom: 20,
    },
    formCard: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderRadius: 16,
        // Sombras para iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        // Sombra para Android
        elevation: 2,
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#3F3F46',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#F4F4F5',
        borderRadius: 12,
        padding: 14,
        fontSize: 16,
        color: '#18181B',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#E4E4E7',
    },
    saveButton: {
        backgroundColor: '#FF6347',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 10,
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

