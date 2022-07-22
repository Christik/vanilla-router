console.log('item script');

const foo = () => {
    console.log('foo');
};

const init = (data) => {
    console.log(`init ${data}`);
}

export { foo, init as default };