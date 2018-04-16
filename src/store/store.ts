import Vue from 'vue';
import * as Vuex from 'vuex';

import { State } from './state';
import { commands } from './commands';

/* Install Vuex in Vue */
Vue.use(Vuex);

/* Initialize the store with different modules */
export const store = new Vuex.Store<State>({
  modules: { commands },
});
