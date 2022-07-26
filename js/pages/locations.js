import { getAllLocations, getCharacterById } from '../api.js';

const AVARAR_COUNT = 3;

const templateCard = document.querySelector('#card-location').content;
const templateCardElement = templateCard.querySelector('.card');
const templateAvatar = document.querySelector('#avatar-s').content;
const templateAvatarElement = templateAvatar.querySelector('.avatar');
const templateAvatarCount = document.querySelector('#avatar-s-count').content;
const templateAvatarCountElement = templateAvatarCount.querySelector('.avatar');

const locations = await getAllLocations();

const createAvatarCounter = (count) => {
    const countElement = templateAvatarCountElement.cloneNode(true);
    const valueElement = countElement.querySelector('.avatar__count-value');

    valueElement.textContent = count;

    return countElement;
};

const createAvatar = (character) => {
    const avatarElement = templateAvatarElement.cloneNode(true);
    const imgElement = avatarElement.querySelector('.avatar__img');

    imgElement.src = character.image;
    imgElement.alt = character.name;

    return avatarElement;
};

const getCharacterIdByUrl = (url) => {
    const indexBegin = url.lastIndexOf('/') + 1;
    const id = url.slice(indexBegin);

    return id;
};

const renderAvatars = async (urls, containerElement) => {
    const avatars = containerElement.children;

    containerElement.innerHtml = '';

    for (const url of urls) {
        const characterId = getCharacterIdByUrl(url);
        const character = await getCharacterById(characterId);
        const avatarElement = createAvatar(character);

        containerElement.append(avatarElement);

        const isAvatarLimitOver = (avatars.length >= AVARAR_COUNT);

        if (isAvatarLimitOver) {
            const recordsQuantity = urls.length;
            const isCounterNeeded = (recordsQuantity > AVARAR_COUNT);

            if (isCounterNeeded) {
                const count = recordsQuantity - avatars.length;
                const countElement = createAvatarCounter(count);

                containerElement.append(countElement);
            }

            break;
        }
    }
};

const createCard = async (location) => {
    const cardElement = templateCardElement.cloneNode(true);
    const titleElement = cardElement.querySelector('.card__title');
    const typeElement = cardElement.querySelector('.card__type');
    const dimensionElement = cardElement.querySelector('.card__dimension');
    const avatarsContainerElement = cardElement.querySelector('.avatar-group');

    titleElement.textContent = location.name;
    typeElement.textContent = location.type;
    dimensionElement.textContent = location.dimension;

    renderAvatars(location.residents, avatarsContainerElement);

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