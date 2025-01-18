# Visualizador de Pokémon

> Mini aplicación web que debe permitir buscar y visualizar
> datos e imágenes de Pokémon.

## Descripción

- La aplicación debe mostrar un único input que permita buscar
  Pokémon por nombre1.
- Si se introduce un nombre que coincida con varios Pokémon debe
  mostrar los resultados. Si se introduce un nombre que sea
  inequívoco debe mostrar directamente la ficha de ese Pokémon.
- La aplicación debe permitir visualizar una ficha del Pokémon
  seleccionado que muestre por lo menos los siguientes datos:
  nombre, altura, peso, puntos de vida, ataque, defensa, velocidad y
  tipos a los que pertenece.
- La Ficha también debe mostrar por lo menos una de las imágenes
  del pokémon en su versión frontal y posterior.

### Nota

La API a usar no proporciona un endpoint para buscar Pokémon por nombre
por lo que es necesario descargar la lista completa de la API antes de permitir buscar.
Este es el endpoint que muestra todos los Pokémon:
[PokeApi endpoint](https://pokeapi.co/api/v2/pokemon?limit=1126).

## Recursos

- [PokéAPI](https://pokeapi.co/)
- [Array.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/A
  rray/filter)
- [JSON](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON)
