import react from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomenScreen';

import { colors, spacing, columns } from '../theme';
import DetallePokeScreen from '../screens/DetallesPokeScreen';

const Stack = createNativeStackNavigator();

export default function PokemonStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
            name='DetallesPokemon'
            component={DetallePokeScreen}
            
            options={{
                title: 'Informacion pokemon',headerBackTitle:'Atras'
            }}
            numColumns={columns.lg}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal: spacing.xl, flexGrow: 1, paddingBottom: spacing.xl   }}
            />
        </Stack.Navigator>
    )
}