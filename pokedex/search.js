// Pesquisa por nome, id ou tipo

let input = document.getElementById('searchbar');

function searchPokemon() {
    let pesquisa = input.value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    let pokemons = document.querySelectorAll('.pokemon');

    pokemons.forEach(pokemon => {
        let pokemonNameElement = pokemon.querySelector('.name');
        let pokemonName = pokemonNameElement ? pokemonNameElement.textContent.toLowerCase() : '';

        let pokemonId = pokemon.getAttribute('data-id') || '';
        let pokemonTypes = pokemon.getAttribute('data-type') || '';

        pokemonId = pokemonId.toLowerCase();
        pokemonTypes = pokemonTypes.toLowerCase();

        if (pokemonName.includes(pesquisa) || pokemonId.includes(pesquisa) || pokemonTypes.includes(pesquisa)) {
            pokemon.style.display = "block";
        } else {
            pokemon.style.display = "none";
        }
    });
}