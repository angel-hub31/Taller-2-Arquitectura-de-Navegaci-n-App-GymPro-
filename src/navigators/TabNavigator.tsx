import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import ProgressScreen from '../screens/ProgressScreen';
import RoutineListScreen from '../screens/RoutineListScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
        <Tab.Navigator
            initialRouteName="Progreso"
            screenOptions={({ route }) => ({
                headerStyle: {
                    backgroundColor: '#17202A',
                },

                headerTintColor: '#FFFFFF',

                headerTitleStyle: {
                    fontWeight: '700',
                },

                tabBarActiveTintColor: '#C69C6D',
                tabBarInactiveTintColor: '#8A949E',

                tabBarStyle: {
                    height: 68,
                    paddingBottom: 9,
                    paddingTop: 7,
                    backgroundColor: '#FFFFFF',
                    borderTopWidth: 0,
                    elevation: 12,
                    shadowOpacity: 0.08,
                    shadowRadius: 8,
                },

                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '600',
                },

                tabBarIcon: ({ color, focused }) => {
                    let iconName: keyof typeof Ionicons.glyphMap;

                    if (route.name === 'Progreso') {
                        iconName = focused
                            ? 'stats-chart'
                            : 'stats-chart-outline';
                    } else {
                        iconName = focused
                            ? 'fitness'
                            : 'fitness-outline';
                    }

                    return (
                        <Ionicons
                            name={iconName}
                            size={23}
                            color={color}
                        />
                    );
                },
            })}
        >

            <Tab.Screen
                name="Progreso"
                component={ProgressScreen}
                options={{
                    title: 'Resumen',
                }}
            />

            <Tab.Screen
                name="Rutinas"
                component={RoutineListScreen}
                options={{
                    title: 'Mis rutinas',
                }}
            />

        </Tab.Navigator>
    );
}