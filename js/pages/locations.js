import { getLocationsFromPage, getLocationsPageQuantity } from '../api.js';
import { renderSmallAvatars } from '../avatar.js';
import { renderPagination, getCurrentPageNumber } from '../pagination.js';

const templateCard = document.querySelector('#card-location').content;
const templateCardElement = templateCard.querySelector('.card');

const createCard = async (location) => {
    const cardElement = templateCardElement.cloneNode(true);
    const titleElement = cardElement.querySelector('.card__title');
    const typeElement = cardElement.querySelector('.card__type');
    const dimensionElement = cardElement.querySelector('.card__dimension');
    const residentsElement = cardElement.querySelector('.card__residents');
    const avatarsContainerElement = cardElement.querySelector('.avatar-group');

    titleElement.textContent = location.name;
    typeElement.textContent = location.type;
    dimensionElement.textContent = location.dimension;

    if (location.residents.length === 0) {
        residentsElement.remove();

        return cardElement;
    }

    await renderSmallAvatars(location.residents, avatarsContainerElement);

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

const init = async () => {
    const locationsContainerElement = document.querySelector('.cards');
    const paginationContainerElement = document.querySelector('[data-pagination]');
    const currentPageNumber = getCurrentPageNumber();
    const locations = await getLocationsFromPage(1);
    const pageQuantity = await getLocationsPageQuantity();

    renderLocations(locations, locationsContainerElement);
    renderPagination(pageQuantity, currentPageNumber, paginationContainerElement);
}

export { init as default };