import * as Models from '../../models';

import { ScriptsState } from './scripts.state';

export const mutations = {
  /** Manually trigger a script by changing its `triggered` state */
  scriptStart(state: ScriptsState, scriptName: string) {
    const script = state.scripts.find((el) => el.name === scriptName);

    if (script) {
      script.triggered = true;
    }
  },

  /** Automatically restore `triggered` property once script finished */
  scriptEnd(state: ScriptsState, scriptName: string) {
    const script = state.scripts.find((el) => el.name === scriptName);

    if (script) {
      script.triggered = false;
    }
  },
};
