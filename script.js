"use strict";

// Declaración de variables
const pokemonNombre = document.querySelector(".pokemon_nombre");
const pokemonNumero = document.querySelector(".pokemon_numero");

// Atributos del Pokémon
const pokemonAltura = document.querySelector("#pokemon_altura");
const pokemonPeso = document.querySelector("#pokemon_peso");
const pokemonHp = document.querySelector("#pokemon_hp");
const pokemonAtaque = document.querySelector("#pokemon_ataque");
const pokemonAtaqueEspecial = document.querySelector("#pokemon_ataque_especial");
const pokemonDefensa = document.querySelector("#pokemon_defensa");
const pokemonDefensaEspecial = document.querySelector("#pokemon_defensa_especial");
const PokemonVelocidad = document.querySelector("#pokemon_velocidad");
const pokemonTipo1 = document.querySelector("#pokemon_tipo_1");
const pokemonTipo2 = document.querySelector("#pokemon_tipp_2");

// Imágenes
let pokemonImagen = document.querySelector(".pokemon_imagen");
let pokemonShiny = document.querySelector(".pokemon_shiny");

// Botones
const botonPrev = document.querySelector(".antes");
const botonSig = document.querySelector(".despues");
const botonVariocolor = document.querySelector(".variocolor");

// Búsqueda e input
const busqueda = document.querySelector(".busqueda");
const input = document.querySelector(".input");

// Crear contenedor para los resultados
const listaResultados = document.querySelector("#coincidencia");

let busquedaPokemon = 1;
let todos = [];

// Obtener todos los Pokémon para el filtro
const fetchTodos = async () => {
  const respuesta = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1025");
  if (respuesta.status === 200) {
    const data = await respuesta.json();
    todos = data.results.map((pokemon) => pokemon.name);
  }
};

// Obtener el Pokémon filtrado
const fetchPokemon = async (pokemon) => {
  const RespuestaPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  if (RespuestaPokemon.status === 200) {
    const data = await RespuestaPokemon.json();
    return data;
  }
};

// Cargar pokemon
const cargarPokemon = async (pokemon) => {
  pokemonNombre.innerHTML = "Cargando...";
  pokemonNumero.innerHTML = "";

  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonImagen.style.display = "block";
    pokemonShiny.style.display = "none";
    pokemonNombre.innerHTML = data.name;
    pokemonNumero.innerHTML = data.id;

    pokemonImagen.src = data["sprites"]["other"]["showdown"]["front_default"] //sprite en movimiento
      ? data["sprites"]["other"]["showdown"]["front_default"] //sprite en movimiento
      : data["sprites"]["other"]["official-artwork"]["front_default"]; //sprite estático de backup

    pokemonShiny.src = data["sprites"]["other"]["showdown"]["front_shiny"] //sprite en movimiento shiny
      ? data["sprite"]["other"]["showdown"]["front_shiny"] //sprite en movimiento shiny
      : data["sprites"]["other"]["official-artwork"]["front_shiny"]; //sprite estático shiny

    // Atributos Pokémon
    pokemonAltura.innerHTML = `Altura: ${data.height / 10} m`;
    pokemonPeso.innerHTML = `Peso: ${data.weight / 10} kg`;
    pokemonHp.innerHTML = `HP: ${data["stats"]["0"]["base_stat"]}`;
    pokemonAtaque.innerHTML = `Ataque: ${data["stats"]["1"]["base_stats"]}`;
    pokemonAtaqueEspecial.innerHTML = `Ataque Especial: ${data["stats"]["3"]["base_stat"]}`;
    pokemonDefensa.innerHTML = `Defensa: ${data["stats"]["2"]["base_stat"]}`;
    pokemonDefensaEspecial.innerHTML = `Defensa Especial: ${data["stats"]["4"]["base_stat"]}}`;
    PokemonVelocidad.innerHTML = `Velocidad: ${data["stats"]["5"]["base_stat"]}`;
    pokemonTipo1.innerHTML = `Tipo 1: ${data["types"]["0"]["type"]["name"]}`;

    if (data["types"]["1"] === undefined) {
      pokemonTipo2.innerHTML = "";
    } else {
      pokemonTipo2.innerHTML = `Tipo 2 ${data["types"]["1"]["type"]["name"]}`;
    }
  } else {
    pokemonImagen.style.display = "none";
    pokemonNombre.innerHTML = "Not found :(";
    pokemonNumero.innerHTML = "";
  }
};

// Botones
// Botón para buscar Pokémon anterior
botonPrev.addEventListener("click", () => {
  if (busquedaPokemon > 1) {
    busquedaPokemon -= 1;
    cargarPokemon(busquedaPokemon);
  }
});

// Botón para cambiar la imagen default a shiny y viceversa
botonVariocolor.addEventListener("click", () => {
  if (pokemonImagen.style.display === "block") {
    pokemonImagen.style.display = "none";
    pokemonShiny.style.display = "block";
  } else if (pokemonImagen.style.display === "none") {
    pokemonShiny.style.display = "none";
    pokemonImagen.style.display = "block";
  }
});

// Botón para buscar siguiente Pokémon
botonSig.addEventListener("click", () => {
  busquedaPokemon += 1;
  cargarPokemon(busquedaPokemon);
});

// Filtrar el input dinámicamente
input.addEventListener("input", () => {
  const filtro = input.value.toLowerCase();

  if (filtro === "") {
    listaResultados.innerHTML = "";
    listaResultados.style.display = "none";
    return;
  }

  // Filtramos coincidencias con el input
  const resultados = todos.filter((pokemon) => pokemon.includes(filtro));

  // Vaciamos el input después de filtrar
  listaResultados.innerHTML = "";

  // Si no hay coincidencias se oculta, si no se muestra
  if (resultados.length === 0) {
    listaResultados.style.display = "none";
    return;
  } else {
    listaResultados.style.display = "block";
  }

  // Creamos elementos "li" por cada coincidencia
  resultados.forEach((pokemon) => {
    const unidad = document.createElement("li");
    unidad.textContent = pokemon;
    // Accedemos a las características del Pokémon al hacer click en la lista
    // Limpia la lista y la ocultamos
    unidad.addEventListener("click", () => {
      listaResultados.innerHTML = "";
      listaResultados.style.display = "none";
      cargarPokemon(pokemon);
    });
    // Añadimos los "li" creados al "ul" coincidencias(HTML)
    listaResultados.appendChild(unidad);
  });
});

// Invocamos las funciones
fetchTodos();
cargarPokemon(busquedaPokemon);
