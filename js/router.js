const state = {
  config: {
      routes: {},
      contentContainer: null,
  },
};

const getPageContent = async (route) => {
    try {
        const response = await fetch(`/pages/${route}.html`);

        if (response.ok) {
            return await response.text();
        }

        console.error(`${response.status} – ${response.statusText}`);
    } catch (err) {
        console.error(err.message);
    }
};

const updatePageContent = (content) => (state.config.contentContainer.innerHTML = content);

const setRoute = async (path) => {
    const route = state.config.routes[path];
    const pageContent = await getPageContent(route);

    updatePageContent(pageContent);
    history.pushState({}, '', path);
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

const router = async (config) => {
    state.config = config;

    await setRoute(window.location.pathname);

    document.addEventListener('click', onLinkClick);
    window.addEventListener('popstate', onWindowPopstate);
};

export { router };
