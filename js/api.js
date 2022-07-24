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

const getAllCharacters = async () => {
    const data = await getData(ServerUrl.CHARACTER);
    return data.results;
};

const getCharacterById = async (id) => {
    const url = `${ServerUrl.CHARACTER}/${id}`;
    return await getData(url);
};

export { getAllCharacters, getCharacterById };

