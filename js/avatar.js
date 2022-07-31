import { getCharacterById } from './api.js';

const SHOWN_AVATAR_COUNT = 3;

const templateSmallAvatar = document.querySelector('#avatar-s').content;
const templateSmallAvatarElement = templateSmallAvatar.querySelector('.avatar');
const templateAvatarCount = document.querySelector('#avatar-s-count').content;
const templateAvatarCountElement = templateAvatarCount.querySelector('.avatar');

const createAvatarCounter = (count) => {
    const countElement = templateAvatarCountElement.cloneNode(true);
    const valueElement = countElement.querySelector('.avatar__count-value');

    valueElement.textContent = count;

    return countElement;
};

const createSmallAvatar = (character) => {
    const avatarElement = templateSmallAvatarElement.cloneNode(true);
    const linkElement = avatarElement.querySelector('a');
    const imgElement = avatarElement.querySelector('.avatar__img');

    linkElement.href = `/character/${character.id}`;
    linkElement.title = character.name;
    imgElement.src = character.image;
    imgElement.alt = character.name;

    return avatarElement;
};

const getCharacterIdByUrl = (url) => {
    const indexBegin = url.lastIndexOf('/') + 1;
    const id = url.slice(indexBegin);

    return id;
};

const renderSmallAvatars = async (urls, containerElement) => {
    const avatars = containerElement.children;

    containerElement.innerHtml = '';

    for (const url of urls) {
        const characterId = getCharacterIdByUrl(url);
        const character = await getCharacterById(characterId);
        const avatarElement = createSmallAvatar(character);

        containerElement.append(avatarElement);

        const isAvatarLimitOver = (avatars.length >= SHOWN_AVATAR_COUNT);

        if (isAvatarLimitOver) {
            const recordsQuantity = urls.length;
            const isCounterNeeded = (recordsQuantity > SHOWN_AVATAR_COUNT);

            if (isCounterNeeded) {
                const count = recordsQuantity - avatars.length;
                const countElement = createAvatarCounter(count);

                containerElement.append(countElement);
            }

            break;
        }
    }
};

export { renderSmallAvatars };
