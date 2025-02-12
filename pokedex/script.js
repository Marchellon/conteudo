const poke_container = document.getElementById('poke-container');
const pokemon_count = 386;
const colors = {

    // mapa das cores

    fire: '#da3f3f',
    grass: '#64cb67',
    electric: '#f8ff5b',
    water: '#3d58bd',
    ghost: '#701667',
    ground: '#96692f',
    rock: '#d5c991',
    fairy: '#fdaed8',
    poison: '#be62f6',
    bug: '#b6ff6e',
    dragon: '#007a86',
    psychic: '#c764d1',
    flying: '#97b3e6',
    fighting: '#ffa838',
    normal: '#B9B9B9',
    ice: '#81f4ff',
    steel: '#badedc',
    dark: '#525252'
};

// função pra dar fetch nos pokemon tudo

const fetchPokemons = async () => {
    const promises = [];
    for (let i = 1; i <= pokemon_count; i++) {
        promises.push(getPokemon(i));
    }
    try {
        const pokemons = await Promise.all(promises);
        pokemons.sort((a, b) => a.id - b.id);
        pokemons.forEach(pokemon => createPokemonCard(pokemon));
    } catch (error) {
        console.error('Error fetching Pokémon:', error);
    }
};

// pegar pokemon

const getPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
    } catch (error) {
        console.error('Error fetching Pokémon:', error);
        return null;
    }
};

// carta, configuação das cores

const createPokemonCard = (pokemon) => {
    if (!pokemon) return;

    const pokemonEl = document.createElement('div');
    pokemonEl.classList.add('pokemon');

    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const id = pokemon.id.toString().padStart(3, '0');

    const poke_types = pokemon.types.map(type => type.type.name);
    const typeColors = poke_types.map(type => colors[type]);

    const backgroundColor = typeColors.length > 1
        ? `linear-gradient(${typeColors.join(', ')})`
        : typeColors[0];

    pokemonEl.style.background = backgroundColor;

    const typesHTML = poke_types.map(type => `<span>${type}</span>`).join(', ');

    // html da "carta"

    const pokemonInnerHTML = `
        <div class="img-container">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="${name}">
        </div>
        <div id="${id}" class="info">
            <span class="number">#${id}</span>
            <h3 class="name">${name}</h3>
            <small class="type">Type: ${typesHTML}</small>
        </div>
    `;

    pokemonEl.setAttribute('data-id', id);
    pokemonEl.setAttribute('data-type', poke_types.join(', '));
    pokemonEl.innerHTML = pokemonInnerHTML;
    poke_container.appendChild(pokemonEl);
};

// secret

const imagem = document.querySelector('.titulo');

imagem.addEventListener('click', () => {
    imagem.classList.toggle('girar');
});

fetchPokemons();