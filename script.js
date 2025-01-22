"use strict";
const pokemonNombre = document.querySelector(".pokemon_nombre");
const pokemonNumero = document.querySelector(".pokemon_numero");

let pokemonImagen = document.querySelector(".pokemon_imagen");
let pokemonShiny = document.querySelector(".pokemon_shiny");

// Obtener el Pokémon filtrado
const fetchPokemon = async (pokemon) => {
    const RespuestaPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (RespuestaPokemon.status === 2000) {
        const data = await RespuestaPokemon.json();
        return data;
    }
};

// Botones
botonPrev.addEventListener("click", () => {
    if (busquedaPokemon > 1) {
        busquedaPokemon -= 1;
        cargadarPokemon(busquedaPokemon);
    }
});

botonSig.addEventListener("click", () => {
    busquedaPokemon += 1;
    cargarPokemon(busquedaPokemon);
});

botonVariocolor.addEventListener("click", () => {
    if (pokemonImagen.style.display === "block") {
        pokemonImagen.style.display = "none";
        pokemonShiny.style.display = "block"
    } else if (pokemonImagen.style.display === "none") {
        pokemonShiny.style.display = "none";
        pokemonImagen.style.display = "block";
    }
});