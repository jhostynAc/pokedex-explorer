import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors, spacing, radius, typography } from '../theme';

export default function CardPoke({ pokemon }) {
    const formatearId = `#${String(pokemon.id).padStart(3, '0')}`;

    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <Image source={{ uri: pokemon.image }} style={styles.image} />
                <Text style={styles.idText}>{formatearId}</Text>
                <Text style={styles.nameText}>{pokemon.name}</Text>
            </View>

            <View style={styles.typesContainer}>
                {pokemon.types.map((tipo, index) => (
                    <View key={index} style={[styles.badge,{backgroundColor:colors.tipo[tipo]||'#333'}]}>
                        <Text style={styles.badgeText}>{tipo}</Text>
                    </View>
                ))}
            </View>

            <View style={styles.medidas}>
                <Text>Altura: {pokemon.height } m</Text>
                <Text>Peso: {pokemon.weight} kg</Text>
            </View>

            <View style={styles.statsContainer}>
                <Text style={styles.statsTitle}>Estadísticas Base</Text>

                {pokemon.stats.map((stat, index) => {
                    const porcentaje = Math.min((stat.value / 255) * 100, 100);

                    let colorBarra = '#FF3B30';
                    if (stat.value >= 50) colorBarra = '#FFCC00';
                    if (stat.value >= 100) colorBarra = '#34C759';

                    return (
                        <View key={index} style={styles.statRow}>
                            <Text style={styles.statName}>{stat.name}</Text>

                            <Text style={styles.statValue}>{stat.value}</Text>
                            <View style={styles.barraFondo}>
                                <View
                                    style={[
                                        styles.barraProgreso,
                                        {
                                            width: `${porcentaje}%`,
                                            backgroundColor: colorBarra
                                        }
                                    ]}
                                />
                            </View>
                        </View>
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        padding: 20,
        margin: 16,
        borderRadius: 16,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    header: {
        alignItems: 'center',
        marginBottom: 10
    },
    image: {
        width: 150,
        height: 150,
        resizeMode: 'contain'
    },
    idText: {
        fontSize: 14,
        color: '#888',
        fontWeight: 'bold'
    },
    nameText: {
        fontSize: 24,
        fontWeight: 'bold',
        textTransform: 'capitalize'
    },

    typesContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 8,
        marginBottom: 15
    },
    badge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20
    },
    badgeText: {
        color: '#fff',
        textTransform: 'capitalize',
        fontWeight: 'bold',
        fontSize: 12
    },

    medidas: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    },

    statsContainer: {
        marginTop: 10
    },
    statsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center'
    },
    statRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    statName: {
        width: 80,
        fontSize: 12,
        textTransform: 'uppercase',
        color: '#666',
        fontWeight: 'bold',
    },
    statValue: {
        width: 35,
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'right',
        marginRight: 10,
    },
    barraFondo: {
        flex: 1,
        height: 8,
        backgroundColor: '#E5E5EA',
        borderRadius: 4,
        overflow: 'hidden',
    },
    barraProgreso: {
        height: '100%',
        borderRadius: 4,
    }
});