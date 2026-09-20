
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import 'react-native-gesture-handler';

import RoutineDetailScreen from './src/screens/RoutineDetailScreen';
import DrawerNavigator from './src/navigators/DrawerNavigator';
import AddRoutineScreen from './src/screens/AddRoutineScreen';
import { RoutineProvider } from './src/context/RoutineContext';


export type RootStackParamList = {
    HomeDrawer: undefined;
    Detail: { id: string };
    AddRoutine: { id?: string | undefined }

}

const Stack = createNativeStackNavigator<RootStackParamList>();


export default function App() {
    return (
        <RoutineProvider>
            <NavigationContainer>
                <Stack.Navigator>


                    <Stack.Screen
                        name="HomeDrawer"
                        component={DrawerNavigator}
                        options={{
                        title: ' Angel Morales'
                        }}
                    />

                    <Stack.Screen
                        name="Detail"
                        component={RoutineDetailScreen}
                        options={{
                            headerShown: true,
                            title: 'Rutina de Pecho',
                        }}
                    />

                    
                    <Stack.Screen
                        name="AddRoutine"
                        component={AddRoutineScreen}
                        options={{
                            headerShown: true,
                            title: 'Crear rutina',
                        }}
                    />


                </Stack.Navigator>
            </NavigationContainer>
        </RoutineProvider>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});