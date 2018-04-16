import * as Models from '../../models';

import { CommandsState, state } from './commands.state';
import { mutations } from './commands.mutations';
import { getters } from './commands.getters';
import { actions } from './commands.actions';

/** Vuex `commands` module */
export const commands = { state, actions, getters, mutations };
