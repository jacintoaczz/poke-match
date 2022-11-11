/**
 * Generates an array of 8 unique numbers to use
 * as Ids in the Pokémon lookup.
 *
 * @returns {Array<number>} - An array of 8 unique numbers.
 */
export const generateRandomNumbersArray = () => {
  const randomIds = new Set();

  while (randomIds.size < 8) {
    const randomNumber = Math.ceil(Math.random() * 600);
    randomIds.add(randomNumber);
  }

  return [...randomIds];
};
