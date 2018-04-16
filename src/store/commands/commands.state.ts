import * as Models from '../../models';

export interface CommandsState {
  /** List of commands */
  commands: Models.Command[];
  /** History of commands sent */
  history: string[];
  /** Current index in the command history, `-1` for empty string */
  historyIndex: number;
}

export const state: CommandsState = {
  commands: [
    {
      root: 'help',
      desc: 'print a list of all available commands',
    },
  ],

  history: [''],
  historyIndex: -1,
};
