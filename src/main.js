import Vue from 'vue';
import { defineCustomElements } from 'sdx/dist/js/webcomponents/loader';
import * as ModalDialogs from 'vue-modal-dialogs';

import App from './App.vue';
import router from './router';
import store from './store';

require('sdx/dist/css/sdx.min.css');

Vue.config.productionTip = false;

Vue.config.ignoredElements = [/sdx-\w*/];
defineCustomElements(window);

// Install vue-modal-dialogs
Vue.use(ModalDialogs);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
