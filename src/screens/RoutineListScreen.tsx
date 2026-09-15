import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';
const RUTINAS = [
    { id: '1', title: 'Pecho', description: '• 4 series de Press Banca\n• 3 series de Aperturas\n• 3 series de Flexiones', icon: 'body' },
    { id: '2', title: 'Espalda', description: '• 4 series de Dominadas\n• 3 series de Remo con barra\n• 3 series de Jalón al pecho', icon: 'barbell' },
    { id: '3', title: 'Pierna Completa', description: '• 4 series de Sentadillas\n• 4 series de Prensa\n• 3 series de Extensiones', icon: 'walk' },
    { id: '4', title: 'Hombros', description: '• 4 series de Press Militar\n• 3 series de Elevaciones Laterales\n• 3 series de Pájaros', icon: 'accessibility' },
    { id: '5', title: 'Brazos', description: '• 3 series de Curl de Bíceps\n• 3 series de Tríceps en polea\n• 3 series de Curl Martillo', icon: 'fitness' },

];

export default function RoutineListScreen() {
    const navigation = useNavigation<any>();

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>

                <Text style={styles.headerTitle}>Mis Rutinas</Text>
                <Text style={styles.subtitle}>Selecciona un grupo muscular</Text>

                {RUTINAS.map((rutina) => (
                    <TouchableOpacity
                        key={rutina.id}
                        style={styles.card}
                        onPress={() =>
                            navigation.navigate('ChestDetailScreen', {
                                title: rutina.title,
                                description: rutina.description,
                                icon: rutina.icon,
                            })
                        }
                    >
                        <View style={styles.iconContainer}>
                            <Ionicons name={rutina.icon as any} size={24} color="#fff" />
                        </View>
                        <Text style={styles.cardTitle}>Rutina de {rutina.title}</Text>

                        <Ionicons name="chevron-forward" size={24} color="#ccc" />
                    </TouchableOpacity>
                ))}

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
        marginBottom: 24,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 16,
        marginBottom: 12,
        borderRadius: 16,
        // Sombras para iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        // Sombra para Android
        elevation: 2,
    },
    iconContainer: {
        backgroundColor: '#FF6347',
        padding: 12,
        borderRadius: 12,
        marginRight: 16,
    },
    cardTitle: {
        flex: 1,
        fontSize: 16,
        fontWeight: '600',
        color: '#3F3F46',
    },
});