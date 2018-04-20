import { PlayerState, state } from './player.state';
import { mutations } from './player.mutations';
import { getters } from './player.getters';
import { actions } from './player.actions';

/** Vuex `player` module */
export const player = { state, actions, getters, mutations };
