import { getCharacterById } from '../api.js';

const template = document.querySelector('#card-full').content;
const templateElement = template.querySelector('.card-full');

const renderFullCharacter = (character, containerElement) => {
  const fullCardElement = templateElement.cloneNode(true);
  const imgElement = fullCardElement.querySelector('.card-full__photo img');
  const titleElement = fullCardElement.querySelector('.card-full__title');
  const statusElement = fullCardElement.querySelector('.card-full__status');
  const speciesElement = fullCardElement.querySelector('.card-full__species');
  const genderElement = fullCardElement.querySelector('.card-full__gender');
  const typeElement = fullCardElement.querySelector('.card-full__type');
  const originElement = fullCardElement.querySelector('.card-full__origin');
  const locationElement = fullCardElement.querySelector('.card-full__location');

  imgElement.src = character.image;
  imgElement.alt = character.name;
  titleElement.textContent = character.name;
  statusElement.textContent = character.status;
  speciesElement.textContent = character.species;
  genderElement.textContent = character.gender;
  typeElement.textContent = character.type;
  originElement.textContent = character.origin.name;
  locationElement.textContent = character.location.name;

  containerElement.append(fullCardElement);
};

const init = async (id) => {
    const fullCharacterContainerElement = document.querySelector('[data-card-full]');

    const character = await getCharacterById(id);

    renderFullCharacter(character, fullCharacterContainerElement);
};

export { init as default };