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
    } else if (!script.level) {
      context.dispatch('LOGS_PRINT', `<span class="error">error</span> cannot start the <span class="sub">${script.name}</span> script because you haven't unlocked it`);
    } else if (script.autoscript) {
      context.dispatch('LOGS_PRINT', `<span class="warning">warn</span> it's useless to manually start <span class="sub">${script.name}</span> script because you have an autoscript for it`);
    } else if (script.triggered) {
      context.dispatch('LOGS_PRINT', `<span class="error">error</span> <span class="sub">${script.name}</span> script is already running, wait for it to finish`);
    } else {
      context.commit('scriptStart', scriptName);
    }
  },

  /** Logic when a script have been executed */
  async SCRIPT_EXECUTED(context: ScriptContext, scriptName: string) {
    const script = context.state.scripts.find((scr) => scr.name === scriptName) as Models.Script;

    context.commit('scriptEnd', scriptName);
    context.dispatch('LOGS_PRINT', `${script.name} successfully executed, you earned <span class="success">$${Utils.format(script.income.money)}</span> and <span class="info">${Utils.format(script.income.exp)} exp</span>.`);
    context.dispatch('PLAYER_EARN_MONEY', script.income.money);
    context.dispatch('PLAYER_EARN_EXP', script.income.exp);
  },
};
