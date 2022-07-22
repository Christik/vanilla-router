import { initRouter } from './router/router.js';

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
        '/catalog/{id}': {
            template: '/templates/pages/catalog-item.html',
            script: '/js/pages/catalog-item.js',
            title: 'Catalog Item page',
            description: 'This is item of catalog',
        },
        '/about': {
            template: '/templates/pages/about.html',
            script: '/js/pages/about.js',
            title: 'About page',
            description: 'This is about page',
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
