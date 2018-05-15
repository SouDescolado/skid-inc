import * as Models from '../../models';
import { state as scriptsState } from '../scripts/scripts.state';
import { state as serversState } from '../servers/servers.state';

/** Retrieve scripts + server names from the store state */
const scriptNames = scriptsState.scripts.map((script) => script.name);
const serverNames = serversState.servers.map((server) => server.name);

export interface CommandsState {
  /** List of commands */
  commands: Models.Command[];
  /** History of commands sent */
  history: string[];
  /** Current index in the command history, `-1` for empty string */
  historyIndex: number;
  /** Contain the latest autocompleted command */
  autocomplete: string;
}

export const state: CommandsState = {
  commands: [
    {
      root: 'help',
      desc: 'print a list of all available commands',
      payload: 'COMMAND_HELP',
    },
    {
      root: 'clear',
      desc: 'clear the console output',
      payload: 'COMMAND_CLEAR',
    },
    {
      root: 'username',
      desc: 'change your username',
      payload: 'COMMAND_USERNAME',
      args: true,
    },
    {
      root: 'run',
      desc: 'run a script to earn money and exp.',
      payload: 'COMMAND_RUN',
      help: true,
      list: true,
      args: true,
      arguments: [{
        type: 'string',
        possibilities: scriptNames,
      }],
    },
    {
      root: 'buy',
      desc: 'buy/upgrade new things to progress further',
      payload: 'COMMAND_BUY',
      help: true,
      list: true,
      args: true,
      arguments: [{
        type: 'string',
        possibilities: ['autoscript', 'script'],
        argument: {
          type: 'string',
          possibilities: scriptNames,
        },
      }, {
        type: 'string',
        possibilities: ['server'],
        argument: {
          type: 'string',
          possibilities: serverNames,
        },
      }],
    },
  ],

  history: [''],
  historyIndex: -1,
  autocomplete: '',
};
