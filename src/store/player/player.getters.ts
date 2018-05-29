import { ActionContext } from 'vuex';

import { State } from '../state';
import { PlayerState } from './player.state';

type PlayerContext = ActionContext<PlayerState, State>;

export const getters = {
  getPlayerState(state: PlayerState) {
    return state;
  },

  getMoney(state: PlayerState): number {
    return state.money;
  },

  getTotalMoney(state: PlayerState): number {
    return state.totalMoney;
  },

  getLevel(state: PlayerState): number {
    return state.level;
  },

  getExp(state: PlayerState): number {
    return state.exp;
  },

  getTotalExp(state: PlayerState): number {
    return state.totalExp;
  },

  getExpReq(state: PlayerState): number {
    return state.expReq;
  },

  getUsername(state: PlayerState): string {
    return state.username;
  },

  getMultipliers(state: PlayerState) {
    return state.multipliers;
  },
};
