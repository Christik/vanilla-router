const hasVariable = (route) => (route.includes('{') && route.includes('}'));

const getPrefix = (route) => route.slice(0, route.indexOf('{'));

const getDynamicRoutes = (routeValues) => {
    return routeValues.reduce((routes, route) => {
        if (hasVariable(route)) {
            const currentRoute = {
                value: route,
                prefix: getPrefix(route),
            };
            
            routes.push(currentRoute);
        }
        return routes;
    }, []);
};

const getDynamicRoutByHref = (href, dynamicRoutes) => {
    for (const route of dynamicRoutes) {
        if (href.startsWith(route.prefix)) {
            return {
                value: route.value,
                variable: href.slice(route.prefix.length),
            };
        }
    }

    return null;
};

export { getDynamicRoutes, getDynamicRoutByHref };
