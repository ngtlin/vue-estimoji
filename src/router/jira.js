import JiraAuthorize from '@/components/JiraAuthorize.vue';

export default [
  {
    path: '/jira-auth',
    name: 'JiraAuthorize',
    component: JiraAuthorize,
    props: (route) => {
      console.log('-route=>', route);
      return {
        code: route.query.code,
        state: route.query.state,
        token: route.query.token,
      };
    },
  },
];
