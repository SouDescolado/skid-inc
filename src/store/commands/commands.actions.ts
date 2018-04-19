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
        context.dispatch(cmdCheck.command.payload, command);
      } else {
        context.dispatch('LOGS_PRINT', cmdCheck.error);
      }
    } else {
      const error = `<span class="error">error</span> can't find ${root} command, try <span class="sub">help</span> for a list of commands`;
      context.dispatch('LOGS_PRINT', error);
    }
  },

  async COMMAND_HELP(context: CommandContext, input: string[]) {
    let help = `For more information about a command, type <span class="sub">command-name --help</span>:<br><br>`;

    context.state.commands.forEach((command) => {
      help += `<span class="sub">${command.root}</span>: ${command.desc}`;
    });

    context.dispatch('LOGS_PRINT', help);
  },
};
