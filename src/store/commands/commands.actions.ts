import { ActionContext } from 'vuex';

import * as Models from '../../models';
import * as Utils from '../../utils';

import { State as RootState } from '../state';
import { CommandsState } from './commands.state';

type CommandContext = ActionContext<CommandsState, RootState>;

export const actions = {
  /** Received a parsed command, parse command logic and push it to the command history */
  async COMMAND_SUBMIT(context: CommandContext, command: string[]) {
    const root = command[0];
    const cmd = context.state.commands.find((el) => el.root === root);
    const cmdCheck = (cmd) ? Utils.checkCommandArgs(cmd, command) : undefined;

    /* Submit the command to the command history */
    context.commit('submitCommandHistory', command);

    if (cmd && cmdCheck) {
      if (cmdCheck.valid) {
        // context.dispatch('COMMAND_PAYLOAD', cmdCheck.payload);
      } else {
        context.dispatch('LOGS_PRINT', cmdCheck.error);
      }
    } else {
      const error = `can't find ${root} command, try help for a list of commands`;
      context.dispatch('LOGS_PRINT', error);
    }
  },
};
