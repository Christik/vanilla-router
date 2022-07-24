console.log('about script');

const foo = () => {
    console.log('foo');
};

const init = () => {
    console.log('init about');
}

export { foo, init as default };