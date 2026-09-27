import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RoutineProvider } from './src/context/RoutineContext';

import DrawerNavigator from './src/navigators/DrawerNavigator';
import RoutineDetailScreen from './src/screens/RoutineDetailScreen';
import AddRoutineScreen from './src/screens/AddRoutineScreen';

export type RootStackParamList = {
    HomeDrawer: undefined;
    Detail: { id: string };
    AddRoutine: { id?: string } | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
    return (
        <RoutineProvider>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerStyle: {
                            backgroundColor: '#17202A',
                        },
                        headerTintColor: '#FFFFFF',
                        headerTitleStyle: {
                            fontWeight: '700',
                            fontSize: 18,
                        },
                        headerShadowVisible: false,
                    }}
                >

                    <Stack.Screen
                        name="HomeDrawer"
                        component={DrawerNavigator}
                        options={{
                            headerShown: false,
                        }}
                    />

                    <Stack.Screen
                        name="Detail"
                        component={RoutineDetailScreen}
                        options={{
                            title: 'Detalle de rutina',
                        }}
                    />

                    <Stack.Screen
                        name="AddRoutine"
                        component={AddRoutineScreen}
                        options={({ route }) => ({
                            title: route.params?.id
                                ? 'Editar rutina'
                                : 'Nueva rutina',
                        })}
                    />

                </Stack.Navigator>
            </NavigationContainer>
        </RoutineProvider>
    );
}