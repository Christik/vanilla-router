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

const getAllCharacters = async () => getAllItems(ServerUrl.CHARACTER);

const getAllLocations = async () => getAllItems(ServerUrl.LOCATION);

const getAllEpisodes = async () => getAllItems(ServerUrl.EPISODE);

const getCharacterById = async (id) => {
    const url = `${ServerUrl.CHARACTER}/${id}`;
    return await getData(url);
};

export { getAllCharacters, getCharacterById, getAllLocations, getAllEpisodes };
