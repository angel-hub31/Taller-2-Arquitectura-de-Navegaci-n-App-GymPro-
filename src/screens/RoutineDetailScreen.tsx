import React from 'react';

import {
    View,
    Text,
    StyleSheet,
    ScrollView,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { useRoutines } from '../context/RoutineContext';

export default function RoutineDetailScreen({ route }: any) {

    const { routines } = useRoutines();

    const { id } = route.params;

    const routine = routines.find(
        (item) => item.id === id
    );

    if (!routine) {
        return (
            <View style={styles.notFound}>

                <View style={styles.notFoundIcon}>
                    <Ionicons
                        name="alert-circle-outline"
                        size={45}
                        color="#C69C6D"
                    />
                </View>

                <Text style={styles.notFoundTitle}>
                    Rutina no encontrada
                </Text>

                <Text style={styles.notFoundText}>
                    La rutina que intentas consultar
                    ya no existe.
                </Text>

            </View>
        );
    }

    return (

        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
        >

            {/* HERO */}
            <View style={styles.hero}>

                <View style={styles.heroIcon}>
                    <Ionicons
                        name="barbell"
                        size={42}
                        color="#C69C6D"
                    />
                </View>

                <Text style={styles.heroTitle}>
                    {routine.name}
                </Text>

                <View style={styles.badge}>
                    <Text style={styles.badgeText}>
                        {routine.muscleGroup}
                    </Text>
                </View>

            </View>

            {/* DURACIÓN */}
            <View style={styles.durationCard}>

                <View style={styles.durationIcon}>
                    <Ionicons
                        name="time"
                        size={27}
                        color="#C69C6D"
                    />
                </View>

                <View>
                    <Text style={styles.durationLabel}>
                        DURACIÓN
                    </Text>

                    <Text style={styles.durationValue}>
                        {routine.duration} minutos
                    </Text>
                </View>

            </View>

            {/* INFORMACIÓN */}
            <Text style={styles.sectionTitle}>
                Información
            </Text>

            <View style={styles.infoCard}>

                <View style={styles.infoRow}>

                    <View style={styles.infoIcon}>
                        <Ionicons
                            name="body-outline"
                            size={21}
                            color="#C69C6D"
                        />
                    </View>

                    <View>
                        <Text style={styles.infoLabel}>
                            Grupo muscular
                        </Text>

                        <Text style={styles.infoValue}>
                            {routine.muscleGroup}
                        </Text>
                    </View>

                </View>

                <View style={styles.line} />

                <View style={styles.infoRow}>

                    <View style={styles.infoIcon}>
                        <Ionicons
                            name="calendar-outline"
                            size={21}
                            color="#C69C6D"
                        />
                    </View>

                    <View>
                        <Text style={styles.infoLabel}>
                            Fecha de creación
                        </Text>

                        <Text style={styles.infoValue}>
                            {routine.createdAt}
                        </Text>
                    </View>

                </View>

                <View style={styles.line} />

                <View style={styles.infoRow}>

                    <View style={styles.infoIcon}>
                        <Ionicons
                            name={
                                routine.featured
                                    ? 'star'
                                    : 'star-outline'
                            }
                            size={21}
                            color="#C69C6D"
                        />
                    </View>

                    <View>
                        <Text style={styles.infoLabel}>
                            Estado
                        </Text>

                        <Text style={styles.infoValue}>
                            {routine.featured
                                ? 'Rutina destacada'
                                : 'Rutina normal'}
                        </Text>
                    </View>

                </View>

            </View>

        </ScrollView>
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

    hero: {
        backgroundColor: '#17202A',
        borderRadius: 27,
        padding: 28,
        alignItems: 'center',
        marginBottom: 18,
    },

    heroIcon: {
        width: 82,
        height: 82,
        borderRadius: 28,
        backgroundColor: '#273541',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 18,
    },

    heroTitle: {
        color: '#FFFFFF',
        fontSize: 27,
        fontWeight: '900',
        textAlign: 'center',
    },

    badge: {
        backgroundColor: '#C69C6D',
        paddingHorizontal: 17,
        paddingVertical: 7,
        borderRadius: 20,
        marginTop: 12,
    },

    badgeText: {
        color: '#FFFFFF',
        fontWeight: '800',
        fontSize: 12,
    },

    durationCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 21,
        padding: 18,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 25,
        elevation: 3,
        shadowOpacity: 0.06,
        shadowRadius: 6,
    },

    durationIcon: {
        width: 55,
        height: 55,
        borderRadius: 18,
        backgroundColor: '#F4EEE5',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },

    durationLabel: {
        color: '#8A949E',
        fontSize: 10,
        fontWeight: '800',
        letterSpacing: 1,
    },

    durationValue: {
        color: '#17202A',
        fontSize: 20,
        fontWeight: '900',
        marginTop: 3,
    },

    sectionTitle: {
        fontSize: 19,
        fontWeight: '800',
        color: '#17202A',
        marginBottom: 12,
    },

    infoCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 22,
        padding: 18,
    },

    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    infoIcon: {
        width: 45,
        height: 45,
        borderRadius: 14,
        backgroundColor: '#F4EEE5',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 13,
    },

    infoLabel: {
        color: '#8A949E',
        fontSize: 11,
    },

    infoValue: {
        color: '#17202A',
        fontSize: 15,
        fontWeight: '800',
        marginTop: 3,
    },

    line: {
        height: 1,
        backgroundColor: '#EDF0F2',
        marginVertical: 16,
    },

    notFound: {
        flex: 1,
        backgroundColor: '#F5F7FA',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
    },

    notFoundIcon: {
        width: 90,
        height: 90,
        borderRadius: 30,
        backgroundColor: '#F4EEE5',
        justifyContent: 'center',
        alignItems: 'center',
    },

    notFoundTitle: {
        fontSize: 21,
        fontWeight: '900',
        color: '#17202A',
        marginTop: 18,
    },

    notFoundText: {
        color: '#8A949E',
        textAlign: 'center',
        marginTop: 7,
    },

});