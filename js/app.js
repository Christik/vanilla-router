import { initRouter } from './router/router.js';

const contentElement = document.querySelector('.page-content');
const routerConfig = {
    routes: {
        '/': {
            template: '/templates/pages/characters.html',
            script: '/js/pages/characters.js',
            title: 'Characters page',
            description: 'This is characters page',
        },
        '/character/{id}': {
            template: '/templates/pages/character.html',
            script: '/js/pages/character.js',
            title: 'Character page',
            description: 'This is Character page',
        },
        '/locations': {
            template: '/templates/pages/locations.html',
            script: '/js/pages/locations.js',
            title: 'Locations page',
            description: 'This is locations page',
        },
        '/episodes': {
            template: '/templates/pages/episodes.html',
            script: '/js/pages/episodes.js',
            title: 'Episodes page',
            description: 'This is episodes page',
        },
        '/404': {
            template: '/templates/pages/404.html',
            title: '404 error',
            description: 'Page not found',
        },
    },
    contentContainer: contentElement,
};

initRouter(routerConfig);
