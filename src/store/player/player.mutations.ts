import * as Models from '../../models';

import { PlayerState } from './player.state';

export const mutations = {
  /** Set player username */
  setPlayerUsername(state: PlayerState, username: string) {
    state.username = username;
  },

  /** Earn money */
  earnMoney(state: PlayerState, amount: number) {
    state.money += amount;
    state.totalMoney += amount;
  },

  /** Earn experience */
  earnExp(state: PlayerState, amount: number) {
    state.exp += amount;
    state.totalExp += amount;
  },

  /** Level-up if possible */
  levelup(state: PlayerState) {
    state.exp -= state.expReq;
    state.expReq = Math.floor(100 * Math.pow(1.5, state.level + 1));
    state.level += 1;
  },

  /** Update global player effects */
  updateEffects(state: PlayerState, multipliers: Models.ServerEffects) {
    Object.entries(multipliers)
      .forEach(([multName, multValue]) => state.multipliers[multName] = multValue!);
  },
};
