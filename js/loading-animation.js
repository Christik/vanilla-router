const LOADING_CLASS = 'page-content--loading';

const contentElement = document.querySelector('.page-content');

const addLoadingAnimation = () => {
    contentElement.classList.add(LOADING_CLASS);
};

const removeLoadingAnimation = () => {
    contentElement.classList.remove(LOADING_CLASS);
};

export { addLoadingAnimation, removeLoadingAnimation };