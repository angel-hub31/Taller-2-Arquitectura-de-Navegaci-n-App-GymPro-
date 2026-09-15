import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import SettingsScreen from '../screens/SettingsScreen';
import TabNavigator from './TabNavigator';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
    return (
        <Drawer.Navigator
            initialRouteName="Mi Entrenamiento"
            screenOptions={({ route }) => ({
                drawerIcon: ({ focused, color, size }) => {
                    let iconName: keyof typeof Ionicons.glyphMap =
                        'help-outline';

                    if (route.name === 'Mi Entrenamiento') {
                        iconName = focused
                            ? 'barbell'
                            : 'barbell-outline';
                    } else if (route.name === 'Configuración') {
                        iconName = focused
                            ? 'settings'
                            : 'settings-outline';
                    }

                    return (
                        <Ionicons
                            name={iconName}
                            size={size}
                            color={color}
                        />
                    );
                },
            })}
        >
            <Drawer.Screen
                name="Mi Entrenamiento"
                component={TabNavigator}
            />

            <Drawer.Screen
                name="Configuración"
                component={SettingsScreen}
            />
        </Drawer.Navigator>
    );
}