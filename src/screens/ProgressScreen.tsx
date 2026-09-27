import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRoutines } from '../context/RoutineContext';

export default function ProgressScreen() {

    const { routines,deleteRoutine, toggleFeatured } = useRoutines();

    const totalRoutines = routines.length;
    const totalDuration = routines.reduce((acc, curr) => acc + (Number(curr.duration) || 0), 0);
    const averageDuration = totalRoutines > 0 ? Math.round(totalDuration / totalRoutines) : 0;

    const getTopMuscleGroup = () => {

        if (routines.length === 0) return 'Ninguno';
        const counts: { [key: string]: number } = {};
        routines.forEach(r => {
            const group = r.muscleGroup.trim();
            counts[group] = (counts[group] || 0) + 1;
        });
        let topGroup = 'Ninguno';
        let maxCount = 0;
        for (const [group, count] of Object.entries(counts)) {
            if (count > maxCount) {
                maxCount = count;
                topGroup = group;
            }
        }
        return topGroup;
    };

    const featuredRoutine = routines.find(r => r.featured);

    const STATS = [
        { id: '1', title: 'Entrenamientos', value: '4/5', icon: 'barbell', color: '#FF6347' },
        { id: '2', title: 'Racha Actual', value: '3 Días', icon: 'flame', color: '#FF8C00' },
        { id: '3', title: 'Tiempo Total', value: '180 min', icon: 'time', color: '#4682B4' },
        { id: '4', title: 'Volumen', value: '3200 kg', icon: 'analytics', color: '#32CD32' },
    ];


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>

                <Text style={styles.headerTitle}>Mi Progreso</Text>
                <Text style={styles.subtitle}>Resumen dinámico de tu semana</Text>

                {/* Se ha hecho el cambio aqui: Sección visual para mostrar la rutina destacada (Actividad 4) */}
                <View style={styles.featuredCard}>
                    <View style={styles.featuredHeader}>
                        <Ionicons name="star" size={20} color="#F59E0B" />
                        <Text style={styles.featuredTitle}>Rutina Destacada Actual</Text>
                    </View>
                    {featuredRoutine ? (
                        <View>
                            <Text style={styles.featuredRoutineName}>{featuredRoutine.name}</Text>
                            <Text style={styles.featuredRoutineDetails}> {featuredRoutine.muscleGroup}  •  ⏱️ {featuredRoutine.duration} min</Text>
                        </View>
                    ) : (
                        <Text style={styles.noFeaturedText}>No hay ninguna rutina marcada como destacada.</Text>
                    )}
                </View>

                <View style={styles.goalCard}>
                    <View style={styles.goalHeader}>
                        <Text style={styles.goalTitle}>Total Registrado</Text>
                        <Text style={styles.goalPercentage}>{totalRoutines} rutinas</Text>
                    </View>

                    <View style={styles.progressBarBackground}>
                        <View style={[styles.progressBarFill, { width: `${Math.min(totalRoutines * 20, 100)}%` }]} />
                    </View>
                    <Text style={styles.goalText}>
                        {totalRoutines > 0 ? '¡Tus datos se sincronizan automáticamente con SQLite!' : 'Agrega rutinas para calcular tu progreso.'}
                    </Text>
                </View>

                <Text style={styles.sectionTitle}>Estadísticas Generales</Text>

                <View style={styles.statsGrid}>
                    {STATS.map((stat) => (
                        <View key={stat.id} style={styles.statCard}>
                            <View style={[styles.iconContainer, { backgroundColor: `${stat.color}15` }]}>
                                <Ionicons name={stat.icon as any} size={24} color={stat.color} />
                            </View>
                            <Text style={styles.statValue}>{stat.value}</Text>
                            <Text style={styles.statTitle}>{stat.title}</Text>
                        </View>
                    ))}
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e7f3f5',
    },
    scrollContent: {
        padding: 20,
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
        marginBottom: 20,
    },
    featuredCard: {
        backgroundColor: '#FFFBEB',
        borderWidth: 1.5,
        borderColor: '#F59E0B',
        padding: 16,
        borderRadius: 16,
        marginBottom: 24,
        elevation: 2,
    },
    featuredHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 8,
    },
    featuredTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#B45309',
    },
    featuredRoutineName: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1F2937',
        marginBottom: 2,
    },
    featuredRoutineDetails: {
        fontSize: 14,
        color: '#4B5563',
    },
    noFeaturedText: {
        fontSize: 14,
        color: '#71717A',
        fontStyle: 'italic',
    },
    goalCard: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderRadius: 16,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    goalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    goalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#3F3F46',
    },
    goalPercentage: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FF6347',
    },
    progressBarBackground: {
        height: 12,
        backgroundColor: '#F4F4F5',
        borderRadius: 6,
        marginBottom: 12,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#FF6347',
        borderRadius: 6,
    },
    goalText: {
        fontSize: 14,
        color: '#71717A',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#18181B',
        marginBottom: 16,
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 16,
    },
    statCard: {
        width: '47%',
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
        marginBottom: 16,
    },
    iconContainer: {
        padding: 12,
        borderRadius: 12,
        marginBottom: 12,
    },
    statValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#18181B',
        marginBottom: 4,
        textAlign: 'center',
    },
    statTitle: {
        fontSize: 14,
        color: '#71717A',
        textAlign: 'center',
    },
});