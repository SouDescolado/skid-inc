import Vue from 'vue';
import Vuex from 'vuex';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import state from './state';

Vue.use(Vuex);

/* Initialize the store */
export default new Vuex.Store({ actions, getters, mutations, state });
