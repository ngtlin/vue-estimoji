import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';
import jiraRoutes from './jira';
import homeRoutes from './home';
import { navigate } from './navigation';

Vue.use(VueRouter);

const routes = homeRoutes.concat(jiraRoutes);

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  navigate(to, from, next, router, store);
});

export default router;
