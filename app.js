import { POKE_API_BASE_URL } from "./js/constants.js";
import { generateRandomNumbersArray } from "./js/utils.js";

/**
 * Fetches the data of the Pokémon that we'll use to create
 * the cards in the UI.
 */
const loadPokemon = async () => {
  const ids = generateRandomNumbersArray();
  const pokePromises = ids.map((id) => fetch(`${POKE_API_BASE_URL}${id}`));

  // We use 'Promise.all' instead of a for loop just so all the promises can run concurrently.
  const responses = await Promise.all(pokePromises);
  const pokemon = await Promise.all(responses.map((res) => res.json()));
  console.log({ pokemon });
};

loadPokemon();
