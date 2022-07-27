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
        onRoutChange: () => {},
    },
    currentRout: '',
    dynamicRoutes: [
        {
            value: '',
            prefix: '',
        },
    ],
};

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
    routeValue = (routeValue || path);
    const route = state.config.routes[routeValue];
    const pageContent = await getPageContent(route.template);

    updatePageContent(pageContent);
    updateMetaTags(route);
    history.pushState(null, '', `${window.location.origin}${path}`);
    state.currentRout = routeValue;
    state.config?.onRoutChange();

    if (route.script) {
        const pageScript = await import(route.script);
        await pageScript.default(data);
    }
};

const setRoute = async (path) => {
    const isPageStatic = state.config.routes.hasOwnProperty(path);
    if (isPageStatic) {
        await goToPage(path);
        return;
    }

    const dynamicRoute = getDynamicRoutByHref(path, state.dynamicRoutes);
    if (dynamicRoute) {
        await goToPage(path, dynamicRoute.value, dynamicRoute.variable);
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
