const classMap = {
    'Alive': 'badge--success',
    'Dead': 'badge--error',
    'unknown': 'badge--warn',
};

const translationMap = {
    'Alive': 'жив',
    'Dead': 'мертв',
    'unknown': 'статус неизвестен',
};

const updateStatusElement = (element, status) => {
    const statusClass = classMap[status];
    const statusText = translationMap[status];

    element.classList.add(statusClass);
    element.textContent = statusText;
};

export { updateStatusElement };
