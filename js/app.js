import { initRouter } from './router.js';

const contentElement = document.querySelector('.page-content');
const routerConfig = {
    routes: {
        '/': {
            template: '/templates/pages/home.html',
            script: '/js/pages/home.js',
            title: 'Home page',
            description: 'This is home page',
        },
        '/catalog': {
            template: '/templates/pages/catalog.html',
            script: '/js/pages/catalog.js',
            title: 'Catalog page',
            description: 'This is catalog',
        },
        '/about': {
            template: '/templates/pages/about.html',
            script: '/js/pages/about.js',
            title: 'About page',
            description: 'This is about page',
        },
    },
    contentContainer: contentElement,
};

initRouter(routerConfig);
