interface Routing {
  path: string;
}

const routing: { [key: string]: Routing } = {
  HomePage: {
    path: '/',
  },
  AccessDeniedPage: {
    path: '/access-denied',
  },
};

export default routing;
