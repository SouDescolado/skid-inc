import { ActionContext } from 'vuex';

import { State } from '../state';
import { CommandsState } from './commands.state';

type CommandsContext = ActionContext<CommandsState, State>;

export const getters = {
  /** Return an array of recently used commands */
  getCommandsHistory(state: CommandsState): string[] {
    return state.history.map((command) => command);
  },

  /** Return the command from the history based on `historyIndex` */
  getCommandHistory(state: CommandsState): string {
    return (state.historyIndex >= 0) ? state.history[state.historyIndex] : '';
  },

  /** Return the latest autocompleted command */
  getAutocompletedCommand(state: CommandsState): string {
    return state.autocomplete;
  },
};
