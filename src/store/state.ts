import { CommandsState } from './commands';
import { LogsState } from './logs';
import { PlayerState } from './player';
import { ScriptsState } from './scripts';

export interface State {
  commands: CommandsState;
  logs: LogsState;
  player: PlayerState;
  scripts: ScriptsState;
}
