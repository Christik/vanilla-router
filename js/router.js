const state = {
  config: {
      routes: {
          '/': {
              template: '',
              title: '',
              description: '',
          }
      },
      contentContainer: null,
  },
};

const getPageContent = async (route) => {
    try {
        const response = await fetch(route.template);

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

const setRoute = async (path) => {
    const route = state.config.routes[path];
    const pageContent = await getPageContent(route);
    const pageScript = await import(route.script);

    updatePageContent(pageContent);
    updateMetaTags(route);
    history.pushState({}, '', path);
    pageScript.default();
};

const onLinkClick = async (evt) => {
    const linkElement = evt.target.closest('[href]');
    const isNotLink = !linkElement;

    if (isNotLink) {
        return;
    }

    const linkHref = linkElement.getAttribute('href');
    const isLinkExternal = !state.config.routes.hasOwnProperty(linkHref);

    if (isLinkExternal) {
        return;
    }

    evt.preventDefault();
    await setRoute(linkHref);
};

const onWindowPopstate = async () => {
    await setRoute(window.location.pathname);
};

const initRouter = async (config) => {
    state.config = config;

    await setRoute(window.location.pathname);

    document.addEventListener('click', onLinkClick);
    window.addEventListener('popstate', onWindowPopstate);
};

export { initRouter };
