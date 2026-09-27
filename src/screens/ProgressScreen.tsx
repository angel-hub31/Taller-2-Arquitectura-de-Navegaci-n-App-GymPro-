import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useRoutines } from '../context/RoutineContext';

export default function ProgressScreen() {

    const { routines } = useRoutines();

    const totalRoutines = routines.length;

    const totalDuration = routines.reduce(
        (total, routine) => total + Number(routine.duration),
        0
    );

    const averageDuration =
        totalRoutines > 0
            ? Math.round(totalDuration / totalRoutines)
            : 0;

    const getTopMuscleGroup = () => {

        if (routines.length === 0) {
            return 'Sin datos';
        }

        const groups: { [key: string]: number } = {};

        routines.forEach((routine) => {
            const group = routine.muscleGroup;

            groups[group] = (groups[group] || 0) + 1;
        });

        return Object.keys(groups).reduce((a, b) =>
            groups[a] > groups[b] ? a : b
        );
    };

    const topMuscleGroup = getTopMuscleGroup();

    const featuredRoutine = routines.find(
        (routine) => routine.featured
    );

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
        >

            {/* ENCABEZADO */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.smallTitle}>
                        BIENVENIDO A GYMPRO
                    </Text>

                    <Text style={styles.title}>
                        Tu progreso
                    </Text>

                    <Text style={styles.subtitle}>
                        Mantén el ritmo y supera tus objetivos.
                    </Text>
                </View>

                <View style={styles.headerIcon}>
                    <Ionicons
                        name="barbell"
                        size={27}
                        color="#C69C6D"
                    />
                </View>
            </View>

            {/* TARJETA PRINCIPAL */}
            <View style={styles.heroCard}>

                <View style={styles.heroTop}>
                    <View>
                        <Text style={styles.heroLabel}>
                            ENTRENAMIENTOS
                        </Text>

                        <Text style={styles.heroNumber}>
                            {totalRoutines}
                        </Text>
                    </View>

                    <View style={styles.heroIcon}>
                        <Ionicons
                            name="fitness"
                            size={32}
                            color="#FFFFFF"
                        />
                    </View>
                </View>

                <Text style={styles.heroDescription}>
                    rutinas registradas actualmente
                </Text>

                <View style={styles.progressLine}>
                    <View
                        style={[
                            styles.progressFill,
                            {
                                width:
                                    totalRoutines === 0
                                        ? '0%'
                                        : `${Math.min(totalRoutines * 20, 100)}%`,
                            },
                        ]}
                    />
                </View>

            </View>

            {/* ESTADÍSTICAS */}
            <Text style={styles.sectionTitle}>
                Estadísticas
            </Text>

            <View style={styles.statsGrid}>

                <View style={styles.statCard}>
                    <View style={styles.statIcon}>
                        <Ionicons
                            name="time-outline"
                            size={22}
                            color="#C69C6D"
                        />
                    </View>

                    <Text style={styles.statValue}>
                        {totalDuration}
                    </Text>

                    <Text style={styles.statLabel}>
                        Minutos totales
                    </Text>
                </View>

                <View style={styles.statCard}>
                    <View style={styles.statIcon}>
                        <Ionicons
                            name="speedometer-outline"
                            size={22}
                            color="#C69C6D"
                        />
                    </View>

                    <Text style={styles.statValue}>
                        {averageDuration}
                    </Text>

                    <Text style={styles.statLabel}>
                        Promedio min.
                    </Text>
                </View>

                <View style={styles.statCard}>
                    <View style={styles.statIcon}>
                        <Ionicons
                            name="body-outline"
                            size={22}
                            color="#C69C6D"
                        />
                    </View>

                    <Text style={styles.statValueSmall}>
                        {topMuscleGroup}
                    </Text>

                    <Text style={styles.statLabel}>
                        Grupo principal
                    </Text>
                </View>

                <View style={styles.statCard}>
                    <View style={styles.statIcon}>
                        <Ionicons
                            name="star-outline"
                            size={22}
                            color="#C69C6D"
                        />
                    </View>

                    <Text style={styles.statValue}>
                        {featuredRoutine ? '1' : '0'}
                    </Text>

                    <Text style={styles.statLabel}>
                        Destacada
                    </Text>
                </View>

            </View>

            {/* RUTINA DESTACADA */}
            <Text style={styles.sectionTitle}>
                Rutina destacada
            </Text>

            {featuredRoutine ? (

                <View style={styles.featuredCard}>

                    <View style={styles.featuredIcon}>
                        <Ionicons
                            name="star"
                            size={27}
                            color="#C69C6D"
                        />
                    </View>

                    <View style={styles.featuredInfo}>

                        <Text style={styles.featuredName}>
                            {featuredRoutine.name}
                        </Text>

                        <Text style={styles.featuredMuscle}>
                            {featuredRoutine.muscleGroup}
                        </Text>

                        <View style={styles.durationRow}>
                            <Ionicons
                                name="time-outline"
                                size={16}
                                color="#7B8794"
                            />

                            <Text style={styles.durationText}>
                                {featuredRoutine.duration} minutos
                            </Text>
                        </View>

                    </View>

                </View>

            ) : (

                <View style={styles.emptyCard}>

                    <Ionicons
                        name="star-outline"
                        size={35}
                        color="#B0B8BF"
                    />

                    <Text style={styles.emptyTitle}>
                        No tienes una rutina destacada
                    </Text>

                    <Text style={styles.emptyText}>
                        Selecciona una rutina como favorita desde
                        la sección de rutinas.
                    </Text>

                </View>
            )}

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
        paddingBottom: 35,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 22,
    },

    smallTitle: {
        fontSize: 11,
        fontWeight: '800',
        letterSpacing: 1.5,
        color: '#C69C6D',
        marginBottom: 5,
    },

    title: {
        fontSize: 30,
        fontWeight: '800',
        color: '#17202A',
    },

    subtitle: {
        marginTop: 5,
        color: '#7B8794',
        fontSize: 14,
    },

    headerIcon: {
        width: 54,
        height: 54,
        borderRadius: 18,
        backgroundColor: '#17202A',
        justifyContent: 'center',
        alignItems: 'center',
    },

    heroCard: {
        backgroundColor: '#17202A',
        borderRadius: 24,
        padding: 22,
        marginBottom: 25,
        elevation: 6,
        shadowOpacity: 0.15,
        shadowRadius: 8,
    },

    heroTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    heroLabel: {
        color: '#B9C0C7',
        fontSize: 11,
        fontWeight: '700',
        letterSpacing: 1,
    },

    heroNumber: {
        color: '#FFFFFF',
        fontSize: 48,
        fontWeight: '900',
        marginTop: 2,
    },

    heroIcon: {
        width: 62,
        height: 62,
        borderRadius: 20,
        backgroundColor: '#2A3743',
        justifyContent: 'center',
        alignItems: 'center',
    },

    heroDescription: {
        color: '#B9C0C7',
        fontSize: 13,
        marginTop: 5,
    },

    progressLine: {
        height: 6,
        backgroundColor: '#35424F',
        borderRadius: 10,
        marginTop: 18,
        overflow: 'hidden',
    },

    progressFill: {
        height: '100%',
        backgroundColor: '#C69C6D',
        borderRadius: 10,
    },

    sectionTitle: {
        fontSize: 19,
        fontWeight: '800',
        color: '#17202A',
        marginBottom: 13,
    },

    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 26,
    },

    statCard: {
        width: '48%',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 16,
        marginBottom: 12,
        elevation: 3,
        shadowOpacity: 0.06,
        shadowRadius: 6,
    },

    statIcon: {
        width: 42,
        height: 42,
        borderRadius: 14,
        backgroundColor: '#F4EEE5',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },

    statValue: {
        fontSize: 25,
        fontWeight: '900',
        color: '#17202A',
    },

    statValueSmall: {
        fontSize: 17,
        fontWeight: '800',
        color: '#17202A',
        minHeight: 30,
    },

    statLabel: {
        color: '#8A949E',
        fontSize: 12,
        marginTop: 3,
    },

    featuredCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 22,
        padding: 18,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 4,
        shadowOpacity: 0.07,
        shadowRadius: 7,
    },

    featuredIcon: {
        width: 58,
        height: 58,
        borderRadius: 18,
        backgroundColor: '#F4EEE5',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },

    featuredInfo: {
        flex: 1,
    },

    featuredName: {
        fontSize: 18,
        fontWeight: '800',
        color: '#17202A',
    },

    featuredMuscle: {
        color: '#C69C6D',
        fontSize: 13,
        fontWeight: '700',
        marginTop: 4,
    },

    durationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },

    durationText: {
        color: '#7B8794',
        marginLeft: 5,
        fontSize: 13,
    },

    emptyCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 22,
        padding: 30,
        alignItems: 'center',
    },

    emptyTitle: {
        fontSize: 16,
        fontWeight: '800',
        color: '#17202A',
        marginTop: 12,
    },

    emptyText: {
        textAlign: 'center',
        color: '#8A949E',
        fontSize: 13,
        marginTop: 6,
        lineHeight: 19,
    },

});