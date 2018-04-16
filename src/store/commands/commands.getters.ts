import { ActionContext } from 'vuex';

import { State } from '../state';
import { CommandsState } from './commands.state';

type CommandsContext = ActionContext<CommandsState, State>;

export const getters = {
  /** Return an array of recently used commands */
  getCommandsHistory(state: CommandsState): string[] {
    return state.history.map((command) => command);
  },
};
