import { ActionContext } from 'vuex';
import pluralize from 'pluralize';

import * as Models from '../../models';
import * as Utils from '../../utils';

import { State as RootState } from '../state';
import { PlayerState } from './player.state';

type PlayerContext = ActionContext<PlayerState, RootState>;

export const actions = {
  /** Change the player username */
  async PLAYER_USERNAME(context: PlayerContext, username: string) {
    context.commit('setPlayerUsername', username);
  },

  /** Check if user can levelup */
  async PLAYER_LEVELUP(context: PlayerContext) {
    let levels = 0;

    while (context.state.exp >= context.state.expReq) {
      context.commit('levelup');
      levels += 1;
    }

    if (levels) {
      context.dispatch('LOGS_PRINT', `You gained <span class="success">${levels} ${pluralize('level', levels)}</span>!`);
    }
  },

  /** Earn money */
  async PLAYER_EARN_MONEY(context: PlayerContext, amount: number) {
    context.commit('earnMoney', amount);
  },

  /** Earn experience */
  async PLAYER_EARN_EXP(context: PlayerContext, amount: number) {
    context.commit('earnExp', amount);
    context.dispatch('PLAYER_LEVELUP');
  },

  /** Update the player multipliers */
  async PLAYER_MULTIPLIER(context: PlayerContext) {
    const servers = context.rootState.servers.servers;
    const effects: Models.ServerEffects = {
      money: 1,
      exp: 1,
      time: 1,
    };

    /* Influence the effects based on servers owned */
    servers.forEach((server) => {
      Object.entries(server.effects)
        .forEach(([effectName, effect]) => effects[effectName]! += effect! * server.level);
    });

    context.commit('updateEffects', effects);
  },
};
