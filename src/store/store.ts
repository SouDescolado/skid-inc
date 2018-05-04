import Vue from 'vue';
import * as Vuex from 'vuex';

import { State } from './state';

import { commands } from './commands';
import { logs } from './logs';
import { player } from './player';
import { scripts } from './scripts';
import { servers } from './servers';

/* Install Vuex in Vue */
Vue.use(Vuex);

/* Initialize the store with different modules */
export const store = new Vuex.Store<State>({
  modules: { commands, logs, player, scripts, servers },
});
