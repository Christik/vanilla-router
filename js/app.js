import { router } from './router.js';

const contentElement = document.querySelector('.page-content');
const routerConfig = {
    routes: {
        '/': 'home',
        '/catalog': 'catalog',
        '/about': 'about',
    },
    contentContainer: contentElement,
};

await router(routerConfig);
