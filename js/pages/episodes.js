import { getAllEpisodes } from '../api.js';
import { renderSmallAvatars } from '../avatar.js';

const templateCard = document.querySelector('#card-episode').content;
const templateCardElement = templateCard.querySelector('.card');

const episodes = await getAllEpisodes();

const createEpisode = (episode) => {
  const episodeElement = templateCardElement.cloneNode(true);
  const titleElement = episodeElement.querySelector('.card__title');
  const numberElement = episodeElement.querySelector('.card__episode');
  const dateElement = episodeElement.querySelector('.card__date');
  const avatarsContainerElement = episodeElement.querySelector('.avatar-group');

  titleElement.textContent = episode.name;
  numberElement.textContent = episode.episode;
  dateElement.textContent = episode.air_date;

  renderSmallAvatars(episode.characters, avatarsContainerElement);

  return episodeElement;
};

const renderEpisodes = (episodes, containerElement) => {
    containerElement.innerHTML = '';

    for (const episode of episodes) {
        const episodeElement = createEpisode(episode);

        containerElement.append(episodeElement);
    }
};

const init = async () => {
    const episodesContainerElement = document.querySelector('.cards');

    renderEpisodes(episodes, episodesContainerElement);
}

export { init as default };
