import * as Models from '../../models';

import { LogsState } from './logs.state';

export const mutations = {
  /** Append a log in the `logs` array */
  printLog(state: LogsState, log: string) {
    /* Remove the oldest log */
    if (state.logs.length > 50) {
      state.logs.splice(0, 1);
    }

    state.logs.push(log);
  },

  /** Called with the `clear` command, reset logs array */
  clearLog(state: LogsState) {
    state.logs = [];
  },
};
