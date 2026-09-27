import React, { useEffect, useState } from 'react';

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { useRoutines } from '../context/RoutineContext';

export default function AddRoutineScreen({
    navigation,
    route,
}: any) {

    const {
        routines,
        addRoutine,
        updateRoutine,
    } = useRoutines();

    const idToEdit = route.params?.id;

    const [name, setName] = useState('');
    const [muscleGroup, setMuscleGroup] = useState('');
    const [durationString, setDurationString] = useState('');

    useEffect(() => {

        if (!idToEdit) {
            return;
        }

        const routine = routines.find(
            (item) => item.id === idToEdit
        );

        if (routine) {
            setName(routine.name);
            setMuscleGroup(routine.muscleGroup);
            setDurationString(
                routine.duration.toString()
            );
        }

    }, [idToEdit, routines]);

    const handleSave = async () => {

        if (!name.trim()) {
            Alert.alert(
                'Campo obligatorio',
                'Ingresa el nombre de la rutina.'
            );
            return;
        }

        if (!muscleGroup.trim()) {
            Alert.alert(
                'Campo obligatorio',
                'Ingresa el grupo muscular.'
            );
            return;
        }

        if (!durationString.trim()) {
            Alert.alert(
                'Campo obligatorio',
                'Ingresa la duración.'
            );
            return;
        }

        const duration = Number(durationString);

        if (isNaN(duration)) {
            Alert.alert(
                'Duración inválida',
                'La duración debe ser un número.'
            );
            return;
        }

        if (duration < 10 || duration > 180) {
            Alert.alert(
                'Duración inválida',
                'La duración debe estar entre 10 y 180 minutos.'
            );
            return;
        }

        try {

            if (idToEdit) {

                await updateRoutine(idToEdit, {
                    name: name.trim(),
                    muscleGroup: muscleGroup.trim(),
                    duration,
                });

                Alert.alert(
                    'Rutina actualizada',
                    'Los cambios se guardaron correctamente.'
                );

            } else {

                await addRoutine({
                    name: name.trim(),
                    muscleGroup: muscleGroup.trim(),
                    duration,
                });

                Alert.alert(
                    'Rutina creada',
                    'La rutina se agregó correctamente.'
                );
            }

            navigation.goBack();

        } catch (error) {

            Alert.alert(
                'Error',
                'No fue posible guardar la rutina.'
            );

        }
    };

    return (

        <KeyboardAvoidingView
            style={styles.container}
            behavior={
                Platform.OS === 'ios'
                    ? 'padding'
                    : undefined
            }
        >

            <ScrollView
                contentContainerStyle={styles.content}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >

                {/* ENCABEZADO */}
                <View style={styles.header}>

                    <View style={styles.headerIcon}>
                        <Ionicons
                            name={
                                idToEdit
                                    ? 'create-outline'
                                    : 'add'
                            }
                            size={28}
                            color="#C69C6D"
                        />
                    </View>

                    <View style={styles.headerText}>
                        <Text style={styles.smallTitle}>
                            {idToEdit
                                ? 'ACTUALIZAR'
                                : 'NUEVO ENTRENAMIENTO'}
                        </Text>

                        <Text style={styles.title}>
                            {idToEdit
                                ? 'Editar rutina'
                                : 'Crear rutina'}
                        </Text>
                    </View>

                </View>

                {/* FORMULARIO */}
                <View style={styles.formCard}>

                    {/* NOMBRE */}
                    <View style={styles.inputGroup}>

                        <Text style={styles.label}>
                            Nombre de la rutina
                        </Text>

                        <View style={styles.inputContainer}>

                            <Ionicons
                                name="fitness-outline"
                                size={20}
                                color="#9AA3AB"
                            />

                            <TextInput
                                style={styles.input}
                                placeholder="Ej. Entrenamiento de pecho"
                                placeholderTextColor="#AAB1B7"
                                value={name}
                                onChangeText={setName}
                            />

                        </View>

                    </View>

                    {/* GRUPO MUSCULAR */}
                    <View style={styles.inputGroup}>

                        <Text style={styles.label}>
                            Grupo muscular
                        </Text>

                        <View style={styles.inputContainer}>

                            <Ionicons
                                name="body-outline"
                                size={20}
                                color="#9AA3AB"
                            />

                            <TextInput
                                style={styles.input}
                                placeholder="Ej. Pecho"
                                placeholderTextColor="#AAB1B7"
                                value={muscleGroup}
                                onChangeText={setMuscleGroup}
                            />

                        </View>

                    </View>

                    {/* DURACIÓN */}
                    <View style={styles.inputGroup}>

                        <Text style={styles.label}>
                            Duración
                        </Text>

                        <View style={styles.inputContainer}>

                            <Ionicons
                                name="time-outline"
                                size={20}
                                color="#9AA3AB"
                            />

                            <TextInput
                                style={styles.input}
                                placeholder="10 - 180 minutos"
                                placeholderTextColor="#AAB1B7"
                                value={durationString}
                                onChangeText={setDurationString}
                                keyboardType="numeric"
                            />

                            <Text style={styles.unit}>
                                min
                            </Text>

                        </View>

                        <Text style={styles.helper}>
                            La duración permitida es de 10 a 180 minutos.
                        </Text>

                    </View>

                </View>

                {/* BOTÓN */}
                <TouchableOpacity
                    style={styles.saveButton}
                    activeOpacity={0.85}
                    onPress={handleSave}
                >

                    <Ionicons
                        name={
                            idToEdit
                                ? 'checkmark-circle-outline'
                                : 'add-circle-outline'
                        }
                        size={22}
                        color="#FFFFFF"
                    />

                    <Text style={styles.saveButtonText}>
                        {idToEdit
                            ? 'Guardar cambios'
                            : 'Crear rutina'}
                    </Text>

                </TouchableOpacity>

            </ScrollView>

        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#F5F7FA',
    },

    content: {
        padding: 20,
        paddingBottom: 40,
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 22,
    },

    headerIcon: {
        width: 57,
        height: 57,
        borderRadius: 19,
        backgroundColor: '#17202A',
        justifyContent: 'center',
        alignItems: 'center',
    },

    headerText: {
        marginLeft: 14,
    },

    smallTitle: {
        fontSize: 10,
        fontWeight: '800',
        letterSpacing: 1.2,
        color: '#C69C6D',
    },

    title: {
        fontSize: 27,
        fontWeight: '900',
        color: '#17202A',
        marginTop: 2,
    },

    formCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 23,
        padding: 20,
        elevation: 3,
        shadowOpacity: 0.06,
        shadowRadius: 7,
    },

    inputGroup: {
        marginBottom: 20,
    },

    label: {
        color: '#17202A',
        fontSize: 13,
        fontWeight: '800',
        marginBottom: 8,
    },

    inputContainer: {
        height: 54,
        borderRadius: 16,
        backgroundColor: '#F5F7FA',
        borderWidth: 1,
        borderColor: '#E3E7EA',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
    },

    input: {
        flex: 1,
        marginLeft: 10,
        color: '#17202A',
        fontSize: 14,
    },

    unit: {
        color: '#8A949E',
        fontSize: 12,
        fontWeight: '700',
    },

    helper: {
        color: '#8A949E',
        fontSize: 11,
        marginTop: 7,
    },

    saveButton: {
        height: 58,
        borderRadius: 19,
        backgroundColor: '#17202A',
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowOpacity: 0.12,
        shadowRadius: 7,
    },

    saveButtonText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '800',
        marginLeft: 9,
    },

});