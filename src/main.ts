import Vue from 'vue';
import Tabs from 'vue-tabs-component';

import App from './App.vue';
import { store } from './store';

Vue.use(Tabs);

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
