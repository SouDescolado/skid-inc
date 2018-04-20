import { CommandsState } from './commands';
import { LogsState } from './logs';
import { PlayerState } from './player';

export interface State {
  commands: CommandsState;
  logs: LogsState;
  player: PlayerState;
}
