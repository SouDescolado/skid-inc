import { ActionContext } from 'vuex';

import * as Models from '../../models';
import * as Utils from '../../utils';

import { State as RootState } from '../state';
import { CommandsState } from './commands.state';

type CommandContext = ActionContext<CommandsState, RootState>;

export const actions = {
  /** Received a parsed command, parse command logic and push it to the command history */
  async COMMAND_SUBMIT(context: CommandContext, input: string[]) {
    const root = input.shift();
    const args = input.slice(0, input.length);
    const fullInput = [root as string, ...args];

    const command = context.state.commands.find((el) => el.root === root);
    const commandError = (command) ? Utils.parseCommand(command, fullInput) : undefined;

    context.commit('submitCommandHistory', fullInput);
    context.dispatch('LOGS_PRINT', `> <span class="sub">${fullInput.join(' ')}</span>`);

    if (command) {
      if (commandError && commandError.errored) {
        context.dispatch('LOGS_PRINT', commandError.errorMessage);
      } else {
        context.dispatch(command.payload, fullInput);
      }
    } else {
      context.dispatch('LOGS_PRINT', `<span class="error">error</span> can't find ${root} command, try <span class="sub">help</span> for a list of commands`);
    }
  },

  /** Find the command to autocomplete */
  async COMMAND_AUTOCOMPLETE(context: CommandContext, args: { cmd: string[], cursorPos: number }) {
    const autocompleted = Utils.autocompleteCommand(context.state.commands, args.cmd, args.cursorPos);

    context.commit('setAutocompletedCommand', autocompleted);
  },

  /** Print a list of all available commands */
  async COMMAND_HELP(context: CommandContext, input: string[]) {
    const help = Utils.generateHelp(context.state.commands);

    context.dispatch('LOGS_PRINT', help);
  },

  /** Clear console output */
  async COMMAND_CLEAR(context: CommandContext) {
    context.dispatch('LOGS_CLEAR');
  },

  /** Set player username */
  async COMMAND_USERNAME(context: CommandContext, command: string[]) {
    const username = command[1];

    context.dispatch('PLAYER_USERNAME', username);
  },

  /** Trigger a script to run */
  async COMMAND_RUN(context: CommandContext, command: string[]) {
    const args = command.slice(1, command.length);

    context.dispatch('SCRIPT_RUN', args);
  },
};
