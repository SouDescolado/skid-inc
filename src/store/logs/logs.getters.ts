import { ActionContext } from 'vuex';

import { State } from '../state';
import { LogsState } from './logs.state';

type LogsContext = ActionContext<LogsState, State>;

export const getters = {};
