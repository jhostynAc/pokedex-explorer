import React, { useState, useEffect } from "react";
import { View, Text, TextInput, FlatList, StyleSheet, ActivityIndicator, Button, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import CardList from '../components/CardList';
import EstadoVacio from '../components/EstadoVacio';
import { spacing, colors, typography, radius } from '../theme';

import { fetchPokemonList, searchPokemon } from '../services/pokeAppi';

export default function HomeScreen({ navigation }) {
    const insets = useSafeAreaInsets();
    
    const [pokemons, setPokemons] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [offset, setOffset] = useState(0);
    const [isSearching, setIsSearching] = useState(false); 

    const [loading, setLoading] = useState(true); 
    const [loadingMore, setLoadingMore] = useState(false); 
    const [error, setError] = useState(null); 

    const cargarLista = async (currentOffset = 0) => {
        if (currentOffset === 0) setLoading(true);
        else setLoadingMore(true);
        
        setError(null);

        try {
            const data = await fetchPokemonList(currentOffset);
            if (currentOffset === 0) {
                setPokemons(data);
            } else {
                setPokemons(prev => [...prev, ...data]);
            }
            setOffset(currentOffset + 20);
        } catch (err) {
            setError("Ocurrió un error al cargar la lista.");
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    const handleBuscar = async () => {
        if (busqueda.trim() === '') {
            limpiarBusqueda();
            return;
        }

        setLoading(true);
        setError(null);
        setIsSearching(true);

        try {
            const data = await searchPokemon(busqueda);
            setPokemons([data]); 
        } catch (err) {
            setPokemons([]);
        } finally {
            setLoading(false);
        }
    };

    const limpiarBusqueda = () => {
        setBusqueda('');
        setIsSearching(false);
        cargarLista(0);
    };

    useEffect(() => {
        cargarLista(0);
    }, []);

    if (error && !loading) {
        return (
            <View style={[styles.centrado, { paddingTop: insets.top }]}>
                <Text style={typography.subtitulo}>{error}</Text>
                <Button title="Reintentar" onPress={() => cargarLista(0)} color={colors.primaria} /> 
            </View>
        );
    }

    return (
        <View style={[styles.pantalla, { paddingTop: insets.top + spacing.md }]}>
            <View style={styles.contenido}>
                <Text style={typography.titulo}>PokéDex Explorer</Text>
                
                <View style={styles.buscadorContainer}>
                    <View style={styles.buscador}>
                        <Ionicons name="search" size={18} color={colors.texto} />
                        <TextInput 
                            style={styles.input} 
                            placeholder="Busca por nombre o número..." 
                            value={busqueda} 
                            onChangeText={setBusqueda}
                            autoCapitalize="none" 
                            autoCorrect={false} 
                            onSubmitEditing={handleBuscar}
                        />
                        {busqueda.length > 0 && (
                            <Ionicons
                                name="close-circle"
                                size={18}
                                color={colors.texto}
                                onPress={limpiarBusqueda}
                            />
                        )}
                    </View>
                    <Pressable style={styles.botonBuscar} onPress={handleBuscar}>
                        <Text style={styles.textoBoton}>Buscar</Text>
                    </Pressable>
                </View>

                {loading ? (
                    <View style={styles.centrado}>
                        <ActivityIndicator size="large" color={colors.primaria} />
                        <Text style={{ marginTop: spacing.sm }}>Cargando Pokémon...</Text>
                    </View>
                ) : (
                    <FlatList
                        data={pokemons}
                        keyExtractor={(item) => item.id.toString()}
                        numColumns={2}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.listaContenedor}
                        renderItem={({ item }) => (
                            <CardList 
                                pokemon={item} 
                                onPress={() => navigation.navigate('DetallePokemon', { id: item.id })}
                            />
                        )}
                        onEndReached={() => {
                            if (!isSearching && !loadingMore) {
                                cargarLista(offset);
                            }
                        }}
                        onEndReachedThreshold={0.5} 
                        ListFooterComponent={
                            loadingMore ? <ActivityIndicator size="small" color={colors.primaria} style={{ marginVertical: spacing.md }} /> : null
                        }
                        ListEmptyComponent={
                            <EstadoVacio
                                icono="search-outline"
                                titulo="Pokémon no encontrado"
                                mensaje="Verifica que el nombre o número esté bien escrito."
                                textoAction="Limpiar búsqueda"
                                onAction={limpiarBusqueda}
                            />
                        }
                    />
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    pantalla: { flex: 1, backgroundColor: colors.fondo },
    contenido: { flex: 1, paddingHorizontal: spacing.md }, 
    centrado: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    buscadorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
        marginVertical: spacing.lg,
    },
    buscador: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
        backgroundColor: '#FFFFFF',
        borderRadius: radius.md,
        paddingHorizontal: spacing.md,
        height: 46,
        borderWidth: 1,
        borderColor: colors.border,
    },
    input: { 
        flex: 1, 
        fontSize: 14, 
        color: colors.texto, 
        paddingVertical: 0 
    },
    botonBuscar: {
        backgroundColor: colors.primaria,
        height: 46,
        paddingHorizontal: spacing.md,
        borderRadius: radius.md,
        justifyContent: 'center',
    },
    textoBoton: {
        color: '#FFF',
        fontWeight: '600'
    },
    listaContenedor: {
        flexGrow: 1,
        paddingBottom: spacing.xl
    }
});