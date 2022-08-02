const PageClass = {
    ACTIVE: 'pagination__link--active',
    PREV: 'pagination__link--prev',
    NEXT: 'pagination__link--next',
};

const templatePagination = document.querySelector('#pagination').content;
const templatePaginationElement = templatePagination.querySelector('.pagination');
const templatePage = document.querySelector('#pagination-item').content;
const templatePageElement = templatePage.querySelector('.pagination__item');

const createPageElement = (pageNumber) => {
  const pageElement = templatePageElement.cloneNode(true);
  const linkElement = pageElement.querySelector('.pagination__link');

  linkElement.textContent = pageNumber;
  linkElement.href = `/?page=${pageNumber}`;

  return pageElement;
};

const renderPagination = (pageQuantity, containerElement) => {
    const paginationElement = templatePaginationElement.cloneNode(true);
    const fragment = document.createDocumentFragment();

    for (let i = 1; i <= pageQuantity; i++) {
        const pageElement = createPageElement(i);
        fragment.append(pageElement);
    }

    paginationElement.append(fragment);
    containerElement.append(paginationElement);
};

export { renderPagination };
