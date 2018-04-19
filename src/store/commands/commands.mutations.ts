import * as Models from '../../models';
import * as Utils from '../../utils';

import { CommandsState } from './commands.state';

export const mutations = {
  /** Push the command sent into the `history` */
  submitCommandHistory(state: CommandsState, command: string[]) {
    /* If we exceed a limit of `x` stored commands, remove the oldest one */
    if (state.history.length >= 10) {
      state.history.splice((state.history.length - 1), 1);
    }

    state.history.unshift(command.join(' '));
    /* Reset `historyIndex` when submitting a command */
    state.historyIndex = -1;
  },

  /** Browse command history using `up` and `down` arrow keys */
  browseCommandHistory(state: CommandsState, direction: 'up' | 'down') {
    if (state.historyIndex >= -1 && state.historyIndex <= 10) {
      if (direction === 'up' && state.historyIndex < 10 && state.history[state.historyIndex + 1]) {
        state.historyIndex++;
      }

      if (direction === 'down' && state.historyIndex > -1) {
        state.historyIndex--;
      }
    }
  },
};
