import { ActionContext } from 'vuex';

import * as Models from '../../models';
import * as Utils from '../../utils';

import { State as RootState } from '../state';
import { LogsState } from './logs.state';

type LogContext = ActionContext<LogsState, RootState>;

export const actions = {
  async LOGS_PRINT(context: LogContext, log: string) {
    context.commit('printLog', log);
  },

  async LOGS_CLEAR(context: LogContext) {
    context.commit('clearLog');
  },
};
