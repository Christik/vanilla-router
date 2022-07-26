import { getEpisodesFromPage, getEpisodesPageQuantity } from '../api.js';
import { renderSmallAvatars } from '../avatar.js';
import { renderPagination, getCurrentPageNumber } from '../pagination.js';

const templateCard = document.querySelector('#card-episode').content;
const templateCardElement = templateCard.querySelector('.card');

const createEpisode = async (episode) => {
  const episodeElement = templateCardElement.cloneNode(true);
  const titleElement = episodeElement.querySelector('.card__title');
  const numberElement = episodeElement.querySelector('.card__episode');
  const dateElement = episodeElement.querySelector('.card__date');
  const avatarsContainerElement = episodeElement.querySelector('.avatar-group');

  titleElement.textContent = episode.name;
  numberElement.textContent = episode.episode;
  dateElement.textContent = episode.air_date;

  await renderSmallAvatars(episode.characters, avatarsContainerElement);

  return episodeElement;
};

const renderEpisodes = async (episodes, containerElement) => {
    containerElement.innerHTML = '';

    for (const episode of episodes) {
        const episodeElement = await createEpisode(episode);

        containerElement.append(episodeElement);
    }
};

const init = async () => {
    const episodesContainerElement = document.querySelector('.cards');
    const paginationContainerElement = document.querySelector('[data-pagination]');
    const pageQuantity = await getEpisodesPageQuantity();
    const currentPageNumber = getCurrentPageNumber();
    const episodes = await getEpisodesFromPage(1);

    await renderEpisodes(episodes, episodesContainerElement);
    renderPagination(pageQuantity, currentPageNumber, paginationContainerElement);
}

export { init as default };
