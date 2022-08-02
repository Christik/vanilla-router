const ENABLE_ITEM_COUNT = 2;

const PageClass = {
    ACTIVE: 'pagination__link--active',
    PREV: 'pagination__link--prev',
    NEXT: 'pagination__link--next',
};

const templatePagination = document.querySelector('#pagination').content;
const templatePaginationElement = templatePagination.querySelector('.pagination');
const templatePage = document.querySelector('#pagination-item').content;
const templatePageElement = templatePage.querySelector('.pagination__item');
const templateDivider = document.querySelector('#pagination-divider').content;
const templateDividerElement = templateDivider.querySelector('.pagination__item');

const createDividerElement = () => {
    return templateDividerElement.cloneNode(true);
};

const createItemElement = (text, pageNumber, addlClass) => {
    const pageElement = templatePageElement.cloneNode(true);
    const linkElement = pageElement.querySelector('.pagination__link');

    linkElement.textContent = text;
    linkElement.href = `/?page=${pageNumber}`;

    if (addlClass) {
        linkElement.classList.add(addlClass);
    }

    return pageElement;
};

const createPageElement = (pageNumber, addlClass) => {
  return createItemElement(pageNumber, pageNumber, addlClass);
};

const createPrevElement = (currentPageNumber) => {
    const prevPageNumber = Number(currentPageNumber) - 1;

    return createItemElement('Назад', prevPageNumber, PageClass.PREV);
};

const createNextElement = (currentPageNumber) => {
    const nextPageNumber = Number(currentPageNumber) + 1;

    return createItemElement('Назад', nextPageNumber, PageClass.NEXT);
};

const renderPagination = (pageQuantity, currentPageNumber, containerElement) => {
    if (pageQuantity < 2) {
        return;
    }

    currentPageNumber = Number(currentPageNumber);

    const paginationElement = templatePaginationElement.cloneNode(true);
    const fragment = document.createDocumentFragment();
    const isNotPageFirst = currentPageNumber !== 1;
    const isNotPageLast = currentPageNumber !== pageQuantity;

    if (isNotPageFirst) {
        const prevElement = createPrevElement(currentPageNumber);
        fragment.append(prevElement);
    }

    const leftEdge = (currentPageNumber - ENABLE_ITEM_COUNT);
    const rightEdge = (currentPageNumber + ENABLE_ITEM_COUNT);
    const startPageNumber = (leftEdge > 0) ? leftEdge : 1;
    const finishPageNumber = (rightEdge >= pageQuantity) ? pageQuantity : rightEdge;

    if (startPageNumber > 1) {
        const pageElement = createPageElement(1);
        fragment.append(pageElement);

        const dividerElement = createDividerElement();
        fragment.append(dividerElement);
    }

    for (let i = startPageNumber; i <= finishPageNumber; i++) {
        const isCurrentPage = (i === currentPageNumber);
        const pageElement = isCurrentPage ? createPageElement(i, PageClass.ACTIVE) : createPageElement(i);

        fragment.append(pageElement);
    }

    if (finishPageNumber < pageQuantity - 1) {
        const dividerElement = createDividerElement();
        fragment.append(dividerElement);

        const pageElement = createPageElement(pageQuantity);
        fragment.append(pageElement);
    }

    if (isNotPageLast) {
        const nextElement = createNextElement(currentPageNumber);
        fragment.append(nextElement);
    }

    paginationElement.append(fragment);
    containerElement.append(paginationElement);
};

export { renderPagination };
