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
          <article 
            class="card" 
            style="background-color: ${color}"
            id="${pokemon.name}"
            data-pokename="${pokemon.name}"
          >
            <div class="card__front"></div>
              
            <div 
              class="card__back rotated" 
              style="background-color: ${color}"
            >
              <h2>${pokemon.name}</h2> 
                    
              <img 
                src="${pokemon.sprites.front_default}" 
                alt="${pokemon.name}" 
              />  
            </div>
          </article>
      `;
    })
    .join("");
};

/**
 * Gets the HTML element reference and toggles the
 * animation class when the user clicks on it.
 *
 * @param { Event } e
 * @returns { void }
 */
const onCardClick = (e) => {
  const card = e.currentTarget;
  const [front, back] = getFrontAndBackFromCard(card);

  if (front.classList.contains("rotated")) return;

  front.classList.toggle("rotated");
  back.classList.toggle("rotated");
};

/**
 * Iterates over the queried DOM elements and adds the
 * click event listener to each one of them.
 *
 * @returns { void }
 */
const addClickListeners = () => {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.addEventListener("click", onCardClick);
  });
};

/**
 * Gets the card's front and back elements references
 * and returns them.
 *
 * @param { HTMLElement } cardElement - The '.card' element reference.
 * @returns { Array<Element> }
 */
const getFrontAndBackFromCard = (cardElement) => {
  const front = cardElement.querySelector(".card__front");
  const back = cardElement.querySelector(".card__back");

  return [front, back];
};

/**
 * Uses the API call method & the method that creates the UI elements.
 *
 * @returns {void}
 */
const resetGame = async () => {
  const pokemon = await loadPokemon();
  const duplicatedPokemonList = [...pokemon, ...pokemon];

  displayPokemon(duplicatedPokemonList);
  addClickListeners();
};

resetGame();
