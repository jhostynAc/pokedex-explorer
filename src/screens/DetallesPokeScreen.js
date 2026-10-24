import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import CardPoke from '../components/CardPoke';
import { searchPokemon } from '../services/pokeAppi'; 
import { colors } from '../theme';

export default function DetallePokeScreen({ route }) {
    const { pokemon: pokemonBasico } = route.params || {};

    const [pokemonCompleto, setPokemonCompleto] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const cargarDetalles = async () => {
            if (!pokemonBasico) return;
            
            try {
                const datosCompletos = await searchPokemon(String(pokemonBasico.id));
                setPokemonCompleto(datosCompletos);
            } catch (error) {
                console.log("Error al cargar detalles:", error);
            } finally {
                setCargando(false);
            }
        };

        cargarDetalles();
    }, [pokemonBasico]);

    if (cargando || !pokemonCompleto) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color={colors.primaria || "#000"} />
                <Text style={{ marginTop: 10 }}>Cargando estadísticas...</Text>
            </View>
        );
    }
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <CardPoke pokemon={pokemonCompleto} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.fondo || '#FAFAFA',
    },
    loaderContainer: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: colors.fondo || '#FAFAFA',
    }
});