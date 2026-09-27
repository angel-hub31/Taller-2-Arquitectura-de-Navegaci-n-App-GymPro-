import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import TabNavigator from './TabNavigator';
import SettingsScreen from '../screens/SettingsScreen';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
    return (
        <Drawer.Navigator
            initialRouteName="Mi Entrenamiento"
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#17202A',
                },
                headerTintColor: '#FFFFFF',
                headerTitleStyle: {
                    fontWeight: '700',
                    fontSize: 19,
                },

                drawerStyle: {
                    backgroundColor: '#F5F7FA',
                    width: 285,
                },

                drawerActiveTintColor: '#17202A',
                drawerInactiveTintColor: '#7B8794',

                drawerActiveBackgroundColor: '#E8D7A8',

                drawerLabelStyle: {
                    fontSize: 15,
                    fontWeight: '600',
                    marginLeft: -10,
                },

                drawerItemStyle: {
                    borderRadius: 14,
                    marginHorizontal: 12,
                    marginVertical: 4,
                    paddingVertical: 3,
                },
            }}
        >

            <Drawer.Screen
                name="Mi Entrenamiento"
                component={TabNavigator}
                options={{
                    title: 'GymPro',
                    drawerLabel: 'Mi entrenamiento',
                    drawerIcon: ({ focused, color, size }) => (
                        <Ionicons
                            name={focused ? 'barbell' : 'barbell-outline'}
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />

            <Drawer.Screen
                name="Configuración"
                component={SettingsScreen}
                options={{
                    drawerIcon: ({ focused, color, size }) => (
                        <Ionicons
                            name={focused ? 'settings' : 'settings-outline'}
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />

        </Drawer.Navigator>
    );
}