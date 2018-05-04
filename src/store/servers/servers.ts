import { ServersState, state } from './servers.state';
import { mutations } from './servers.mutations';
import { getters } from './servers.getters';
import { actions } from './servers.actions';

/** Vuex `servers` module */
export const servers = { state, actions, getters, mutations };
