import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import ProgressScreen from '../screens/ProgressScreen';
import RoutineListScreen from '../screens/RoutineListScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: keyof typeof Ionicons.glyphMap = 'help'; // Valor por defecto

                    if (route.name === 'Progreso') {
                        iconName = focused ? 'bar-chart' : 'bar-chart-outline';
                    } else if (route.name === 'Rutinas') {
                        iconName = focused ? 'list' : 'list-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Progreso" component={ProgressScreen} />
            <Tab.Screen name="Rutinas" component={RoutineListScreen} />
        </Tab.Navigator>
    );
}