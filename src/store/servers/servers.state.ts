import * as Models from '../../models';

export interface ServersState {
  /** List of servers */
  servers: Models.Server[];
}

export const state: ServersState = {
  servers: [
    {
      name: 'telnet',
      basePrice: 1e6,
      inflation: 2,
      max: 100,
      level: 0,
      effects: {
        time: 0.05,
      },
    },
    {
      name: 'vps',
      basePrice: 800,
      inflation: 1.18,
      max: Infinity,
      level: 0,
      effects: {
          money: 0.12,
          exp: 0.05,
      },
    },
  ],
};
