import { Text, StyleSheet, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';

export default function ChestDetailScreen() {
    const route = useRoute<any>();

    const { title, description, icon } = route.params || {
        title: 'Rutina',
        description: 'Detalles no disponibles',
        icon: 'barbell'
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>

                <View style={styles.headerCard}>
                    <View style={styles.iconCircle}>
                        <Ionicons name={icon} size={48} color="#FF6347" />
                    </View>
                    <Text style={styles.title}>Rutina de {title}</Text>
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>Día de entrenamiento</Text>
                    </View>
                </View>

                <Text style={styles.sectionTitle}>Ejercicios asignados</Text>
                <View style={styles.detailsCard}>
                    <Text style={styles.text}>
                        {description}
                    </Text>
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
    content: {
        padding: 20,
    },
    headerCard: {
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 30,
        borderRadius: 20,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
    },
    iconCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#FFE4E1',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#18181B',
        marginBottom: 12,
    },
    badge: {
        backgroundColor: '#27272A',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
    },
    badgeText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '600',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#52525B',
        marginBottom: 12,
        marginLeft: 4,
    },
    detailsCard: {
        backgroundColor: '#FFFFFF',
        padding: 24,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    text: {
        fontSize: 16,
        lineHeight: 32,
        color: '#3F3F46',
    },
});