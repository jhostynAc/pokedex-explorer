const BASE_URL = 'https://pokeapi.co/api/v2/';

const mapPokemonList = (item) => {
    const urlParts = item.url.split('/');
    const id = urlParts[urlParts.length - 2];
    return {
       id:id,
       name: item.name,
       image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png `.trim()
    };
};

export const fetchPokemonList = async (offset = 0) => {
    const url = `${BASE_URL}pokemon?limit=20&offset=${offset}`; 
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data.results.map(mapPokemonList);
};

export const mapPokemonDetail = (data) =>{
    return{
        id:data.id,
        name: data.name,
        height: data.height / 10,
        weight: data.weight / 10,
        types: data.types.map(t => t.type.name),
        stats: data.stats.map(s=>({
            name: s.stat.name,
            value: s.base_stat
        })),
        image:data.sprites.other['official-artwork'].front_default
    }
}


export const searchPokemon = async (text, signal) => {
  const query = text.toLowerCase().trim();
  const url= `${BASE_URL}pokemon/${query}`;
  const response = await fetch(url,{signal});

    if (!response.ok) {
        throw new Error(`Error http ${response.status}`)
    }

    const data = await response.json();
    return mapPokemonDetail(data);
} 