const contentElement = document.querySelector('.page-content');

const routerConfig = {
    routes: {
        '/': 'home',
        '/catalog': 'catalog',
        '/about': 'about',
    },
    contentContainer: contentElement,
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

const updatePageContent = (content) => (routerConfig.contentContainer.innerHTML = content);

const onLinkClick = async (evt) => {
    const linkElement = evt.target.closest('[href]');
    const isNotLink = !linkElement;

    if (isNotLink) {
        return;
    }

    const linkHref = linkElement.getAttribute('href');
    const isLinkExternal = !routerConfig.routes.hasOwnProperty(linkHref);

    if (isLinkExternal) {
        return;
    }

    evt.preventDefault();

    const route = routerConfig.routes[linkHref];
    const pageContent = await getPageContent(route);
    updatePageContent(pageContent);
};

const init = async () => {
    document.addEventListener('click', onLinkClick);
};

init();