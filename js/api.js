const SERVER = 'https://rickandmortyapi.com/api';

const ServerUrl = {
    CHARACTER: `${SERVER}/character`,
    LOCATION: `${SERVER}/location`,
    EPISODE: `${SERVER}/episode`,
};

const getData = async (url) => {
    try {
        const response = await fetch(url);

        if (response.ok) {
            return await response.json();
        }

        console.error('Ошибка получения данных с сервера');
    } catch (err) {
        console.error('Ошибка получения данных с сервера');
    }
};

const getAllItems = async (url) => {
    const data = await getData(url);
    return data.results;
};

const getPageQuantity = async (url) => {
    const data = await getData(url);
    return data.info.pages;
};

const getItemsFromPage = async (url, page) => getAllItems(`${url}/?page=${page}`);

const getCharactersPageQuantity = async () => await getPageQuantity(ServerUrl.CHARACTER);
const getLocationsPageQuantity = async () => await getPageQuantity(ServerUrl.LOCATION);
const getEpisodesPageQuantity = async () => await getPageQuantity(ServerUrl.EPISODE);

const getCharactersFromPage = async (page) => getItemsFromPage(ServerUrl.CHARACTER, page);
const getLocationsFromPage = async (page) => getItemsFromPage(ServerUrl.LOCATION, page);
const getEpisodesFromPage = async (page) => getItemsFromPage(ServerUrl.EPISODE, page);

const getCharacterById = async (id) => {
    const url = `${ServerUrl.CHARACTER}/${id}`;
    return await getData(url);
};

export {
    getCharactersFromPage,
    getCharactersPageQuantity,
    getCharacterById,
    getLocationsFromPage,
    getLocationsPageQuantity,
    getEpisodesFromPage,
    getEpisodesPageQuantity
};
