import { router } from './router.js';

const contentElement = document.querySelector('.page-content');
const routerConfig = {
    routes: {
        '/': {
            template: '/pages/home.html',
            title: 'Home page',
            description: 'This is home page',
        },
        '/catalog': {
            template: '/pages/catalog.html',
            title: 'Catalog page',
            description: 'This is catalog',
        },
        '/about': {
            template: '/pages/about.html',
            title: 'About page',
            description: 'This is about page',
        },
    },
    contentContainer: contentElement,
};

await router(routerConfig);

