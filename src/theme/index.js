import {plataform} from "react-native";

export const colors={
    fondo:"#F6F7FB",
    primaria:'#DC0A2D',
    texto:'#111827',
    border:'#14377e',
    
    tipo: {
        normal: '#A8A77A',
        fire: '#EE8130',
        water: '#6390F0',
        electric: '#F7D02C',
        grass: '#7AC74C',
        ice: '#96D9D6',
        fighting: '#C22E28',
        poison: '#A33EA1',
        ground: '#E2BF65',
        flying: '#A98FF3',
        psychic: '#F95587',
        bug: '#A6B91A',
        rock: '#B6A136',
        ghost: '#735797',
        dragon: '#6F35FC',
        dark: '#705746',
        steel: '#B7B7CE',
        fairy: '#D685AD',
    }
}

export const spacing={
    xs:4,
    sm:8,
    md:12,
    lg:16,
    xl:20
}

export const radius={
    sm:4,
    md:8,
    lg:12,
    full:9999
}



export const typography={
    titulo:{fontsize:26,fontweight:'700',color:colors.texto},
    subtitulo:{fontsize:18,fontweight:'600',color:colors.texto}
}

export const columns={
    xs:2,
    sm:3,
    md:4,
    lg:6
}

export default{colors,spacing,typography,radius}