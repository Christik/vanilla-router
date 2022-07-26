import { getAllLocations } from '../api.js';
import { renderSmallAvatars } from '../avatar.js';

const templateCard = document.querySelector('#card-location').content;
const templateCardElement = templateCard.querySelector('.card');

const locations = await getAllLocations();

const createCard = async (location) => {
    const cardElement = templateCardElement.cloneNode(true);
    const titleElement = cardElement.querySelector('.card__title');
    const typeElement = cardElement.querySelector('.card__type');
    const dimensionElement = cardElement.querySelector('.card__dimension');
    const avatarsContainerElement = cardElement.querySelector('.avatar-group');

    titleElement.textContent = location.name;
    typeElement.textContent = location.type;
    dimensionElement.textContent = location.dimension;

    renderSmallAvatars(location.residents, avatarsContainerElement);

    return cardElement;
};

const renderLocations = async (locations, containerElement) => {
    const fragment = document.createDocumentFragment();

    for (const location of locations) {
        const cardElement = await createCard(location);
        fragment.append(cardElement);
    }

    containerElement.innerHTML = '';
    containerElement.append(fragment);
};

const init = () => {
    const locationsContainerElement = document.querySelector('.cards');

    renderLocations(locations, locationsContainerElement)
}

export { init as default };