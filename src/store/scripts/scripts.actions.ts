import { ActionContext } from 'vuex';

import * as Models from '../../models';
import * as Utils from '../../utils';

import { State as RootState } from '../state';
import { ScriptsState } from './scripts.state';

type ScriptContext = ActionContext<ScriptsState, RootState>;

export const actions = {
  /** Find and start the script */
  async SCRIPT_RUN(context: ScriptContext, args: string[]) {
    const scriptName = args[0];
    const script = context.state.scripts.find((scr) => scr.name === scriptName);

    if (!script) {
      context.dispatch('LOGS_PRINT', `<span class="error">error</span> cannot find a script with name <span class="sub">${scriptName}</span>, try <span class="sub">script -l</span>`);
    } else {
      context.commit('scriptStart', scriptName);
    }
  },
};
