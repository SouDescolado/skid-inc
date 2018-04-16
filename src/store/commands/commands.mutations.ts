import { CommandsState } from './commands.state';

export const mutations = {
  /** Receive a processed, trimmed command `string[]` like `['buy', 'script', '-l']` */
  submitCommand(state: CommandsState, command: string[]) {
    /* If we exceed a limit of `x` stored commands, remove the oldest one */
    if (state.history.length >= 10) {
      state.history.splice((state.history.length - 1), 1);
    }

    state.history.unshift(command.join(' '));
  },
};
