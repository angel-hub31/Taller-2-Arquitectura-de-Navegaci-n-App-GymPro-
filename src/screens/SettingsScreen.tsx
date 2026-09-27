import React, { useState } from 'react';

import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Switch,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen() {

    const [notifications, setNotifications] =
        useState(true);

    const [darkMode, setDarkMode] =
        useState(false);

    return (

        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
        >

            {/* PERFIL */}
            <View style={styles.profileCard}>

                <View style={styles.avatar}>
                    <Ionicons
                        name="person"
                        size={35}
                        color="#C69C6D"
                    />
                </View>

                <View>
                    <Text style={styles.profileName}>
                        Angel Morales
                    </Text>

                    <Text style={styles.profileEmail}>
                        Usuario GymPro
                    </Text>
                </View>

            </View>

            {/* PREFERENCIAS */}
            <Text style={styles.sectionTitle}>
                Preferencias
            </Text>

            <View style={styles.card}>

                <View style={styles.option}>

                    <View style={styles.optionIcon}>
                        <Ionicons
                            name="notifications-outline"
                            size={21}
                            color="#C69C6D"
                        />
                    </View>

                    <View style={styles.optionText}>
                        <Text style={styles.optionTitle}>
                            Notificaciones
                        </Text>

                        <Text style={styles.optionDescription}>
                            Recibir recordatorios de entrenamiento
                        </Text>
                    </View>

                    <Switch
                        value={notifications}
                        onValueChange={setNotifications}
                        trackColor={{
                            false: '#D5DADF',
                            true: '#C69C6D',
                        }}
                        thumbColor="#FFFFFF"
                    />

                </View>

                <View style={styles.separator} />

                <View style={styles.option}>

                    <View style={styles.optionIcon}>
                        <Ionicons
                            name="moon-outline"
                            size={21}
                            color="#C69C6D"
                        />
                    </View>

                    <View style={styles.optionText}>
                        <Text style={styles.optionTitle}>
                            Modo oscuro
                        </Text>

                        <Text style={styles.optionDescription}>
                            Cambiar apariencia de la aplicación
                        </Text>
                    </View>

                    <Switch
                        value={darkMode}
                        onValueChange={setDarkMode}
                        trackColor={{
                            false: '#D5DADF',
                            true: '#C69C6D',
                        }}
                        thumbColor="#FFFFFF"
                    />

                </View>

            </View>

            {/* CUENTA */}
            <Text style={styles.sectionTitle}>
                Cuenta
            </Text>

            <View style={styles.card}>

                <TouchableOpacity style={styles.option}>

                    <View style={styles.optionIcon}>
                        <Ionicons
                            name="person-outline"
                            size={21}
                            color="#C69C6D"
                        />
                    </View>

                    <View style={styles.optionText}>
                        <Text style={styles.optionTitle}>
                            Mi perfil
                        </Text>

                        <Text style={styles.optionDescription}>
                            Administrar información personal
                        </Text>
                    </View>

                    <Ionicons
                        name="chevron-forward"
                        size={20}
                        color="#A0A8AE"
                    />

                </TouchableOpacity>

                <View style={styles.separator} />

                <TouchableOpacity style={styles.option}>

                    <View
                        style={[
                            styles.optionIcon,
                            styles.logoutIcon,
                        ]}
                    >
                        <Ionicons
                            name="log-out-outline"
                            size={21}
                            color="#B44A4A"
                        />
                    </View>

                    <View style={styles.optionText}>
                        <Text
                            style={[
                                styles.optionTitle,
                                styles.logoutText,
                            ]}
                        >
                            Cerrar sesión
                        </Text>

                        <Text style={styles.optionDescription}>
                            Salir de la cuenta actual
                        </Text>
                    </View>

                    <Ionicons
                        name="chevron-forward"
                        size={20}
                        color="#A0A8AE"
                    />

                </TouchableOpacity>

            </View>

            {/* VERSION */}
            <View style={styles.version}>
                <Ionicons
                    name="barbell-outline"
                    size={17}
                    color="#A0A8AE"
                />

                <Text style={styles.versionText}>
                    GymPro · Tu entrenamiento, tu progreso
                </Text>
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

    profileCard: {
        backgroundColor: '#17202A',
        borderRadius: 24,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 27,
    },

    avatar: {
        width: 65,
        height: 65,
        borderRadius: 22,
        backgroundColor: '#273541',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },

    profileName: {
        color: '#FFFFFF',
        fontSize: 19,
        fontWeight: '900',
    },

    profileEmail: {
        color: '#AEB7BE',
        fontSize: 12,
        marginTop: 4,
    },

    sectionTitle: {
        color: '#17202A',
        fontSize: 18,
        fontWeight: '800',
        marginBottom: 11,
    },

    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 22,
        paddingHorizontal: 17,
        marginBottom: 25,
    },

    option: {
        minHeight: 72,
        flexDirection: 'row',
        alignItems: 'center',
    },

    optionIcon: {
        width: 44,
        height: 44,
        borderRadius: 14,
        backgroundColor: '#F4EEE5',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 13,
    },

    logoutIcon: {
        backgroundColor: '#F8EAEA',
    },

    optionText: {
        flex: 1,
    },

    optionTitle: {
        color: '#17202A',
        fontSize: 14,
        fontWeight: '800',
    },

    optionDescription: {
        color: '#8A949E',
        fontSize: 11,
        marginTop: 3,
    },

    logoutText: {
        color: '#B44A4A',
    },

    separator: {
        height: 1,
        backgroundColor: '#EDF0F2',
    },

    version: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
        flexDirection: 'row',
    },

    versionText: {
        color: '#A0A8AE',
        fontSize: 11,
        marginLeft: 6,
    },

});