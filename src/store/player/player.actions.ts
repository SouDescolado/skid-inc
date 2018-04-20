import { ActionContext } from 'vuex';

import * as Models from '../../models';
import * as Utils from '../../utils';

import { State as RootState } from '../state';
import { PlayerState } from './player.state';

type PlayerContext = ActionContext<PlayerState, RootState>;

export const actions = {
  async PLAYER_USERNAME(context: PlayerContext, username: string) {
    context.commit('setPlayerUsername', username);
  },
};
