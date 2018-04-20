import { ActionContext } from 'vuex';

import * as Models from '../../models';
import * as Utils from '../../utils';

import { State as RootState } from '../state';
import { ScriptsState } from './scripts.state';

type LogContext = ActionContext<ScriptsState, RootState>;

export const actions = {};
