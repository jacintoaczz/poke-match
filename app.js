import { POKE_API_BASE_URL, pokeColors } from "./js/constants.js";
import { generateRandomNumbersArray } from "./js/utils.js";
import { gameSelector } from "./js/selectors.js";

/**
 * Fetches the data of the Pokémon that we'll use to create
 * the cards in the UI.
 *
 * @returns {Promise<any[]>} - An Array with the found Pokémon data.
 */
const loadPokemon = async () => {
  const ids = generateRandomNumbersArray();
  const pokePromises = ids.map((id) => fetch(`${POKE_API_BASE_URL}${id}`));

  // We use 'Promise.all' instead of a for loop just so all the promises can run concurrently.
  const responses = await Promise.all(pokePromises);
  return await Promise.all(responses.map((res) => res.json()));
};

/**
 * Generates the UI elements that will be needed for the game.
 *
 * @returns {void}
 */
const displayPokemon = (pokemon) => {
  // Mutates the Pokémon array and simulates a random sort.
  pokemon.sort((_) => Math.random() - 0.5);

  gameSelector.innerHTML = pokemon
    .map((pokemon) => {
      const type = pokemon.types[0].type.name ?? "normal";
      const color = pokeColors[type];

      return `
      <article class="card" style="background-color: ${color}">
          <div class="card__front"></div>
          
          <div 
              class="card__back rotated" 
              style="background-color: ${color}"
          >
            <h2>${pokemon.name}</h2> 
            
            <img src="${pokemon.sprites.front_default}" 
                 alt="${pokemon.name}" />  
          </div>
      </article>
    `;
    })
    .join("");
};

/**
 * Uses the API call method & the method that creates the UI elements.
 *
 * @returns {void}
 */
const resetGame = async () => {
  const pokemon = await loadPokemon();
  displayPokemon([...pokemon, ...pokemon]);
};

resetGame();
