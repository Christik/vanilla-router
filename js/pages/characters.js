import { getAllCharacters } from '../api.js';

const characters = await getAllCharacters();

const init = () => {
    console.log(characters);
};

export { init as default };