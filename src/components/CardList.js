import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { spacing, colors, radius, typography } from '../theme';

export default function CardList({pokemon,onPress}){
    const formatearId = `#${String(pokemon.id).padStart(3,'0')}`
    return(
        <Pressable style={styles.card} onPress={onPress}>
            <Image
            source={{uri: pokemon.image }}
            style={styles.image}
            />
            <Text style={styles.idText}>{formatearId}</Text>
            <Text style={styles.nameText}>{pokemon.name}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.fondo,
        borderRadius: radius.md,
        padding: spacing.md,
        margin: spacing.sm,
        alignItems: 'center',
        flex: 1, 
        borderColor: colors.border,
        borderWidth: 1,
    },
    image: {
       width: 100,  
        height: 100, 
        marginBottom: 8,
        resizeMode: 'contain'
    },
    idText: {
        fontSize: typography.subtitulo.fontSize,
        color: colors.texto,
        opacity: 0.5,
    },
    nameText: {
        fontSize: typography.titulo.fontSize,
        fontWeight: typography.titulo.fontWeight,
        color: colors.texto,
        textTransform: 'capitalize', 
    }
})