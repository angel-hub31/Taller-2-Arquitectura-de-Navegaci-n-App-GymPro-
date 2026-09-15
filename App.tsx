import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DrawerNavigator from './src/navigators/DrawerNavigator';
import ChestDetailScreen from './src/screens/ChestDetailScreen';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                
                <Stack.Screen
                    name="HomeDrawer"
                    component={DrawerNavigator}
                    options={{
                        headerShown: false,
                    }}
                />

                <Stack.Screen
                    name="ChestDetailScreen"
                    component={ChestDetailScreen}
                    options={{
                        headerShown: true,
                        title: 'Rutina de Pecho',
                    }}
                />

            </Stack.Navigator>
        </NavigationContainer>
    );
}