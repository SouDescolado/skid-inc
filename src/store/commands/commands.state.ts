import * as Models from '../../models';

export interface CommandsState {
  commands: Models.Command[];
}

export const state: CommandsState = {
  commands: [
    {
      root: 'help',
      desc: 'print a list of all available commands',
    },
  ],
};
