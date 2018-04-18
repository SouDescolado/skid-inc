import { CommandsState } from './commands';
import { LogsState } from './logs';

export interface State {
  commands: CommandsState;
  logs: LogsState;
}
