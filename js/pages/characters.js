import { getCharactersFromPage, getCharactersPageQuantity } from '../api.js';
import { renderPagination, getCurrentPageNumber } from '../pagination.js';
import { updateStatusElement } from '../status.js';

const template = document.querySelector('#card-character').content;
const templateElement = template.querySelector('.card');

const createCard = (character) => {
    const cardElement = templateElement.cloneNode(true);
    const titleElement = cardElement.querySelector('.card__title');
    const imgElement = cardElement.querySelector('.card__photo__img');
    const linkElement = cardElement.querySelector('.card__more a');
    const statusElement = cardElement.querySelector('.card__status');

    titleElement.textContent = character.name;
    imgElement.src = character.image;
    imgElement.alt = character.name;
    linkElement.href = `/character/${character.id}`;
    updateStatusElement(statusElement, character.status);

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

const init = async () => {
    const charactersContainerElement = document.querySelector('.cards');
    const paginationContainerElement = document.querySelector('[data-pagination]');
    const currentPageNumber = getCurrentPageNumber();
    const characters = await getCharactersFromPage(currentPageNumber);
    const pageQuantity = await getCharactersPageQuantity();

    renderCharacters(characters, charactersContainerElement);
    renderPagination(pageQuantity, currentPageNumber, paginationContainerElement);
};

export { init as default };
