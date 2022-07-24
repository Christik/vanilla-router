console.log('home script');

const foo = () => {
    console.log('foo');
};

const init = () => {
    console.log('init home');
}

export { foo, init as default };