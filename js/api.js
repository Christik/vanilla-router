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

const getCharactersFromPage = async (page) => getAllItems(`${ServerUrl.CHARACTER}/?page=${page}`);

const getCharactersPageQuantity = async () => {
    const data = await getData(ServerUrl.CHARACTER);
    return data.info.pages;
};

const getAllLocations = async () => getAllItems(ServerUrl.LOCATION);

const getAllEpisodes = async () => getAllItems(ServerUrl.EPISODE);

const getCharacterById = async (id) => {
    const url = `${ServerUrl.CHARACTER}/${id}`;
    return await getData(url);
};

export {
    getCharactersFromPage,
    getCharactersPageQuantity,
    getCharacterById,
    getAllLocations,
    getAllEpisodes };
