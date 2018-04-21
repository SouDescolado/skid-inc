import { ActionContext } from 'vuex';

import { State } from '../state';
import { ScriptsState } from './scripts.state';

import * as Models from '../../models';

type ScriptsContext = ActionContext<ScriptsState, State>;

export const getters = {
  getScripts(state: ScriptsState): Models.Script[] {
    return state.scripts;
  },
};
