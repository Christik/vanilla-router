import { getDynamicRoutes, getDynamicRoutByHref } from './dynamic-routes.js';

const state = {
    config: {
        routes: {
          '/': {
              template: '',
              script: '',
              title: '',
              description: '',
          },
        },
        contentContainer: null,
        onBeforeChange: () => {},
        onAfterChange: () => {},
    },
    currentRout: '',
    dynamicRoutes: [
        {
            value: '',
            prefix: '',
        },
    ],
};

const hasGetParams = (path) => path.includes('?');

const getPathWithoutParams = (path) => path.slice(0, path.indexOf('?'));

const getCurrentRount = () => state.currentRout;

const getPageContent = async (templateUrl) => {
    try {
        const response = await fetch(templateUrl);

        if (response.ok) {
            return await response.text();
        }

        console.error(`${response.status} – ${response.statusText}`);
    } catch (err) {
        console.error(err.message);
    }
};

const updateMetaTags = (route) => {
    const metaDescriptionElement = document.head.querySelector('meta[name="description"]');

    document.title = route.title;
    metaDescriptionElement.content = route.description;
};

const updatePageContent = (content) => (state.config.contentContainer.innerHTML = content);

const goToPage = async (path, routeValue, data = null) => {
    state.config.onBeforeChange?.();

    const pathWithoutParams = hasGetParams(path) ? getPathWithoutParams(path) : path;
    routeValue = (routeValue ?? pathWithoutParams);
    const route = state.config.routes[routeValue];
    const pageContent = await getPageContent(route.template);

    updatePageContent(pageContent);
    updateMetaTags(route);
    history.pushState(null, '', `${window.location.origin}${path}`);
    state.currentRout = routeValue;

    if (route.script) {
        const pageScript = await import(route.script);
        await pageScript.default(data);
    }

    state.config.onAfterChange?.();
};

const setRoute = async (path) => {
    const pathWithoutParams = hasGetParams(path) ? getPathWithoutParams(path) : path;

    const isPageStatic = state.config.routes.hasOwnProperty(pathWithoutParams);
    if (isPageStatic) {
        await goToPage(path);
        return;
    }

    const dynamicRoute = getDynamicRoutByHref(pathWithoutParams, state.dynamicRoutes);
    if (dynamicRoute) {
        await goToPage(pathWithoutParams, dynamicRoute.value, dynamicRoute.variable);
        return;
    }

    await goToPage('/404');
};

const onLinkClick = async (evt) => {
    const linkElement = evt.target.closest('[href]');
    const isNotLink = !linkElement;
    if (isNotLink) {
        return;
    }

    const hrefValue = linkElement.getAttribute('href');
    const isLinkExternal = !hrefValue.startsWith('/');
    if (isLinkExternal) {
        return;
    }

    evt.preventDefault();
    await setRoute(hrefValue);
};

const onWindowPopstate = async () => {
    await setRoute(window.location.pathname);
};

const initRouter = async (config) => {
    state.config = config;
    state.dynamicRoutes = getDynamicRoutes(Object.keys(state.config.routes));

    await setRoute(window.location.pathname);

    document.addEventListener('click', onLinkClick);
    window.addEventListener('popstate', onWindowPopstate);
};

export { initRouter, getCurrentRount };
