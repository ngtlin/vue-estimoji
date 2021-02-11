const ROUTE_JIRA_AUTH_CODE = 'jira-auth';
const ROUTE_HOME = 'HomePage';

const PUBLIC_ROUTES = [
  ROUTE_JIRA_AUTH_CODE,
];

function navigate(to, from, next, routerLocal) {
  // console.log('*** Route control ****', to.name, from.name);

  if (PUBLIC_ROUTES.includes(to.name)) {
    next();
  } else if (to.path === '/') {
    routerLocal.push({ name: ROUTE_HOME });
    next(false);
  } else {
    next();
  }
}

// eslint-disable-next-line import/prefer-default-export
export { navigate };
