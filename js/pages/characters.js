import { getAllCharacters } from '../api.js';

const statusMap = {
  'Alive': 'badge--success',
  'Dead': 'badge--error',
  'unknown': 'badge--warn',
};

const characters = await getAllCharacters();

const template = document.querySelector('#card-character').content;
const templateElement = template.querySelector('.card');

const createCard = (character) => {
    const cardElement = templateElement.cloneNode(true);
    const titleElement = cardElement.querySelector('.card__title');
    const statusElement = cardElement.querySelector('.card__status');
    const statusClass = statusMap[character.status];

    titleElement.textContent = character.name;
    statusElement.textContent = character.status;
    statusElement.classList.add(statusClass);

    return cardElement;
};

const renderCharacters = (characters, containerElement) => {
    const fragment = document.createDocumentFragment();

    characters.forEach((character) => {
        const cardElement = createCard(character);
        fragment.append(cardElement);
    });

    containerElement.innerHTML = '';
    containerElement.append(fragment);
};

const init = () => {
    const charactersContainer = document.querySelector('.cards');
    renderCharacters(characters, charactersContainer);
};

export { init as default };
