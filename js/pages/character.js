console.log('catalog script');

const foo = () => {
    console.log('foo');
};

const init = () => {
    console.log('init catalog');
}

export { foo, init as default };