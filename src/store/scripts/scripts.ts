import { ScriptsState, state } from './scripts.state';
import { mutations } from './scripts.mutations';
import { getters } from './scripts.getters';
import { actions } from './scripts.actions';

/** Vuex `scripts` module */
export const scripts = { state, actions, getters, mutations };
