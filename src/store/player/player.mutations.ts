import * as Models from '../../models';

import { PlayerState } from './player.state';

export const mutations = {
  /** Set player username */
  setPlayerUsername(state: PlayerState, username: string) {
    state.username = username;
  },
};
