import { getCurrentRount } from './router/router.js';

const ACTIVE_CLASS = 'menu__link--active';

const menuElement = document.querySelector('.menu');

const setActiveLink = () => {
    const oldLink = menuElement.querySelector(`.${ACTIVE_CLASS}`);
    const currentRount = getCurrentRount();
    const currentLink = menuElement.querySelector(`[href="${currentRount}"]`);

    oldLink.classList.remove(ACTIVE_CLASS);
    currentLink.classList.add(ACTIVE_CLASS);
};

export { setActiveLink };
