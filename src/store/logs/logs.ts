import { LogsState, state } from './logs.state';
import { mutations } from './logs.mutations';
import { getters } from './logs.getters';
import { actions } from './logs.actions';

/** Vuex `logs` module */
export const logs = { state, actions, getters, mutations };
