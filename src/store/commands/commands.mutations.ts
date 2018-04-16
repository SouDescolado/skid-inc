import { CommandsState } from './commands.state';

export const mutations = {
  /** Receive a processed, trimmed command like `['buy', 'script', '-l']` */
  submitCommand(state: CommandsState, command: string[]) {
    /* If we exceed a limit of `x` stored commands, remove the oldest one */
    if (state.history.length >= 10) {
      state.history.splice((state.history.length - 1), 1);
    }

    state.history.unshift(command.join(' '));
    /* Reset `historyIndex` when submitting a command */
    state.historyIndex = -1;
  },

  /** Browse command history using `up` and `down` arrow keys, mutate `historyIndex` */
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
