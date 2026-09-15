import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen() {
    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>

                <Text style={styles.headerTitle}>Configuración</Text>

                <View style={styles.profileCard}>
                    <View style={styles.avatarCircle}>
                        <Ionicons name="person" size={40} color="#FF6347" />
                    </View>
                    <View style={styles.profileInfo}>
                        <Text style={styles.profileName}>Mi Perfil</Text>
                        <Text style={styles.profileEmail}>usuario@entrenamiento.com</Text>
                    </View>
                    <TouchableOpacity style={styles.editButton}>
                        <Ionicons name="pencil" size={20} color="#FF6347" />
                    </TouchableOpacity>
                </View>

                <Text style={styles.sectionTitle}>Preferencias</Text>
                <View style={styles.settingsCard}>

                    <View style={styles.settingItem}>
                        <View style={styles.settingLeft}>
                            <Ionicons name="notifications" size={22} color="#71717A" />
                            <Text style={styles.settingText}>Notificaciones Push</Text>
                        </View>
                        <Switch
                            value={notifications}
                            onValueChange={setNotifications}
                            trackColor={{ false: '#D4D4D8', true: '#FF6347' }}
                            thumbColor={'#FFFFFF'}
                        />
                    </View>

                    <View style={styles.separator} />

                    <View style={styles.settingItem}>
                        <View style={styles.settingLeft}>
                            <Ionicons name="moon" size={22} color="#71717A" />
                            <Text style={styles.settingText}>Modo Oscuro</Text>
                        </View>
                        <Switch
                            value={darkMode}
                            onValueChange={setDarkMode}
                            trackColor={{ false: '#D4D4D8', true: '#FF6347' }}
                            thumbColor={'#FFFFFF'}
                        />
                    </View>
                </View>

                <Text style={styles.sectionTitle}>Cuenta</Text>
                <View style={styles.settingsCard}>

                    <TouchableOpacity style={styles.settingItem}>
                        <View style={styles.settingLeft}>
                            <Ionicons name="lock-closed" size={22} color="#71717A" />
                            <Text style={styles.settingText}>Cambiar Contraseña</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={22} color="#A1A1AA" />
                    </TouchableOpacity>

                    <View style={styles.separator} />

                    <TouchableOpacity style={styles.settingItem}>
                        <View style={styles.settingLeft}>
                            <Ionicons name="shield-checkmark" size={22} color="#71717A" />
                            <Text style={styles.settingText}>Privacidad y Seguridad</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={22} color="#A1A1AA" />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.logoutButton}>
                    <Ionicons name="log-out-outline" size={22} color="#EF4444" />
                    <Text style={styles.logoutText}>Cerrar Sesión</Text>
                </TouchableOpacity>

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
        paddingBottom: 40,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#18181B',
        marginBottom: 20,
    },

    profileCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 16,
        marginBottom: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    avatarCircle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#FFE4E1',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    profileInfo: {
        flex: 1,
    },
    profileName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#18181B',
    },
    profileEmail: {
        fontSize: 14,
        color: '#71717A',
        marginTop: 4,
    },
    editButton: {
        padding: 8,
        backgroundColor: '#FFF0EE',
        borderRadius: 8,
    },

    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#A1A1AA',
        textTransform: 'uppercase',
        marginBottom: 10,
        marginLeft: 4,
    },
    settingsCard: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        marginBottom: 24,
        paddingHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
    },
    settingLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    settingText: {
        fontSize: 16,
        color: '#3F3F46',
        marginLeft: 12,
    },
    separator: {
        height: 1,
        backgroundColor: '#F4F4F5',
    },

    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FEF2F2',
        paddingVertical: 16,
        borderRadius: 16,
        marginTop: 10,
    },
    logoutText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#EF4444',
        marginLeft: 8,
    },
});