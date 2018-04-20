import { ActionContext } from 'vuex';

import { State } from '../state';
import { PlayerState } from './player.state';

type PlayerContext = ActionContext<PlayerState, State>;

export const getters = {};
