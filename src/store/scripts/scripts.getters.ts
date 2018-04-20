import { ActionContext } from 'vuex';

import { State } from '../state';
import { ScriptsState } from './scripts.state';

type LogsContext = ActionContext<ScriptsState, State>;

export const getters = {};
