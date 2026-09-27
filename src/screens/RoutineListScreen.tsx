import React, { useState } from 'react';

import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Alert,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { useRoutines } from '../context/RoutineContext';

export default function RoutineListScreen({ navigation }: any) {

    const {
        routines,
        deleteRoutine,
        toggleFeatured,
    } = useRoutines();

    const [selectedFilter, setSelectedFilter] =
        useState('Todos');

    const filters = [
        'Todos',
        'Pecho',
        'Espalda',
        'Piernas',
    ];

    const filteredRoutines = routines.filter((routine) => {

        if (selectedFilter === 'Todos') {
            return true;
        }

        return (
            routine.muscleGroup.toLowerCase() ===
            selectedFilter.toLowerCase()
        );
    });

    const handleDelete = (id: string, name: string) => {

        Alert.alert(
            'Eliminar rutina',
            `¿Deseas eliminar "${name}"?`,
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Eliminar',
                    style: 'destructive',
                    onPress: () => deleteRoutine(id),
                },
            ]
        );
    };

    const renderRoutine = ({ item }: any) => (

        <View style={styles.card}>

            <View style={styles.cardHeader}>

                <View style={styles.iconContainer}>
                    <Ionicons
                        name="barbell-outline"
                        size={25}
                        color="#C69C6D"
                    />
                </View>

                <View style={styles.titleContainer}>

                    <Text
                        style={styles.routineName}
                        numberOfLines={1}
                    >
                        {item.name}
                    </Text>

                    <Text style={styles.muscleGroup}>
                        {item.muscleGroup}
                    </Text>

                </View>

                <TouchableOpacity
                    style={styles.starButton}
                    onPress={() => toggleFeatured(item.id)}
                >
                    <Ionicons
                        name={
                            item.featured
                                ? 'star'
                                : 'star-outline'
                        }
                        size={25}
                        color="#C69C6D"
                    />
                </TouchableOpacity>

            </View>

            <View style={styles.infoRow}>

                <View style={styles.infoItem}>

                    <Ionicons
                        name="time-outline"
                        size={17}
                        color="#7B8794"
                    />

                    <Text style={styles.infoText}>
                        {item.duration} min
                    </Text>

                </View>

                <View style={styles.infoItem}>

                    <Ionicons
                        name="calendar-outline"
                        size={17}
                        color="#7B8794"
                    />

                    <Text style={styles.infoText}>
                        {item.createdAt}
                    </Text>

                </View>

            </View>

            <View style={styles.separator} />

            <View style={styles.actions}>

                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() =>
                        navigation.navigate('Detail', {
                            id: item.id,
                        })
                    }
                >
                    <Ionicons
                        name="eye-outline"
                        size={18}
                        color="#17202A"
                    />

                    <Text style={styles.actionText}>
                        Ver
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() =>
                        navigation.navigate('AddRoutine', {
                            id: item.id,
                        })
                    }
                >
                    <Ionicons
                        name="create-outline"
                        size={18}
                        color="#17202A"
                    />

                    <Text style={styles.actionText}>
                        Editar
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.actionButton,
                        styles.deleteButton,
                    ]}
                    onPress={() =>
                        handleDelete(item.id, item.name)
                    }
                >
                    <Ionicons
                        name="trash-outline"
                        size={18}
                        color="#B44A4A"
                    />

                    <Text style={styles.deleteText}>
                        Eliminar
                    </Text>
                </TouchableOpacity>

            </View>

        </View>
    );

    return (

        <View style={styles.container}>

            {/* ENCABEZADO */}
            <View style={styles.header}>

                <View>
                    <Text style={styles.headerSmall}>
                        ENTRENAMIENTO
                    </Text>

                    <Text style={styles.headerTitle}>
                        Mis rutinas
                    </Text>
                </View>

                <View style={styles.counter}>
                    <Text style={styles.counterNumber}>
                        {routines.length}
                    </Text>

                    <Text style={styles.counterText}>
                        rutinas
                    </Text>
                </View>

            </View>

            {/* FILTROS */}
            <View style={styles.filterSection}>

                <Text style={styles.filterTitle}>
                    Filtrar por grupo
                </Text>

                <FlatList
                    data={filters}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (

                        <TouchableOpacity
                            style={[
                                styles.filterButton,
                                selectedFilter === item &&
                                styles.filterButtonActive,
                            ]}
                            onPress={() =>
                                setSelectedFilter(item)
                            }
                        >

                            <Text
                                style={[
                                    styles.filterText,
                                    selectedFilter === item &&
                                    styles.filterTextActive,
                                ]}
                            >
                                {item}
                            </Text>

                        </TouchableOpacity>
                    )}
                />

            </View>

            {/* LISTA */}
            <FlatList
                data={filteredRoutines}
                keyExtractor={(item) => item.id}
                renderItem={renderRoutine}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.list}
                ListEmptyComponent={

                    <View style={styles.emptyContainer}>

                        <View style={styles.emptyIcon}>
                            <Ionicons
                                name="fitness-outline"
                                size={42}
                                color="#C69C6D"
                            />
                        </View>

                        <Text style={styles.emptyTitle}>
                            No hay rutinas
                        </Text>

                        <Text style={styles.emptyText}>
                            Crea tu primera rutina para comenzar
                            a organizar tus entrenamientos.
                        </Text>

                    </View>
                }
            />

            {/* BOTÓN AGREGAR */}
            <TouchableOpacity
                style={styles.fab}
                activeOpacity={0.8}
                onPress={() =>
                    navigation.navigate('AddRoutine')
                }
            >
                <Ionicons
                    name="add"
                    size={31}
                    color="#FFFFFF"
                />
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#F5F7FA',
    },

    header: {
        paddingHorizontal: 20,
        paddingTop: 18,
        paddingBottom: 14,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    headerSmall: {
        fontSize: 11,
        color: '#C69C6D',
        fontWeight: '800',
        letterSpacing: 1.3,
    },

    headerTitle: {
        fontSize: 28,
        color: '#17202A',
        fontWeight: '900',
        marginTop: 3,
    },

    counter: {
        backgroundColor: '#17202A',
        borderRadius: 17,
        paddingHorizontal: 14,
        paddingVertical: 9,
        alignItems: 'center',
    },

    counterNumber: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '900',
    },

    counterText: {
        color: '#C5CBD0',
        fontSize: 10,
    },

    filterSection: {
        paddingLeft: 20,
        marginBottom: 5,
    },

    filterTitle: {
        color: '#687580',
        fontSize: 13,
        fontWeight: '700',
        marginBottom: 9,
    },

    filterButton: {
        paddingHorizontal: 18,
        paddingVertical: 9,
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        marginRight: 8,
        borderWidth: 1,
        borderColor: '#E2E6EA',
    },

    filterButtonActive: {
        backgroundColor: '#17202A',
        borderColor: '#17202A',
    },

    filterText: {
        color: '#687580',
        fontWeight: '700',
        fontSize: 13,
    },

    filterTextActive: {
        color: '#FFFFFF',
    },

    list: {
        padding: 20,
        paddingBottom: 100,
    },

    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 22,
        padding: 17,
        marginBottom: 14,
        elevation: 4,
        shadowOpacity: 0.06,
        shadowRadius: 7,
    },

    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    iconContainer: {
        width: 52,
        height: 52,
        borderRadius: 17,
        backgroundColor: '#F4EEE5',
        justifyContent: 'center',
        alignItems: 'center',
    },

    titleContainer: {
        flex: 1,
        marginLeft: 13,
    },

    routineName: {
        fontSize: 17,
        fontWeight: '800',
        color: '#17202A',
    },

    muscleGroup: {
        fontSize: 13,
        color: '#C69C6D',
        fontWeight: '700',
        marginTop: 4,
    },

    starButton: {
        width: 43,
        height: 43,
        borderRadius: 14,
        backgroundColor: '#F9F6F0',
        justifyContent: 'center',
        alignItems: 'center',
    },

    infoRow: {
        flexDirection: 'row',
        marginTop: 17,
    },

    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
    },

    infoText: {
        color: '#7B8794',
        fontSize: 12,
        marginLeft: 5,
    },

    separator: {
        height: 1,
        backgroundColor: '#EDF0F2',
        marginVertical: 14,
    },

    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
    },

    actionText: {
        color: '#17202A',
        fontWeight: '700',
        fontSize: 12,
        marginLeft: 5,
    },

    deleteButton: {
        paddingHorizontal: 5,
    },

    deleteText: {
        color: '#B44A4A',
        fontWeight: '700',
        fontSize: 12,
        marginLeft: 5,
    },

    emptyContainer: {
        alignItems: 'center',
        paddingTop: 70,
        paddingHorizontal: 30,
    },

    emptyIcon: {
        width: 85,
        height: 85,
        borderRadius: 28,
        backgroundColor: '#F4EEE5',
        justifyContent: 'center',
        alignItems: 'center',
    },

    emptyTitle: {
        fontSize: 19,
        fontWeight: '800',
        color: '#17202A',
        marginTop: 18,
    },

    emptyText: {
        textAlign: 'center',
        color: '#8A949E',
        marginTop: 7,
        lineHeight: 20,
    },

    fab: {
        position: 'absolute',
        right: 22,
        bottom: 22,
        width: 62,
        height: 62,
        borderRadius: 21,
        backgroundColor: '#C69C6D',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8,
        shadowOpacity: 0.18,
        shadowRadius: 8,
    },

});