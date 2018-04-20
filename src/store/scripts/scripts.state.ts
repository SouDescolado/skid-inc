import * as Models from '../../models';

export interface ScriptsState {
  /** List of scripts */
  scripts: Models.Script[];
}

export const state: ScriptsState = {
  scripts: [
    {
      name: 'script-1',
      price: 0,
      income: {},
      time: 4,
      level: 1,
      autoscript: false,
      autoscriptPrice: 420,
    },
    {
      name: 'script-2',
      price: 3750,
      income: {},
      time: 4,
      level: 1,
      autoscript: false,
      autoscriptPrice: 22500,
    },
    {
      name: 'script-3',
      price: 52500,
      income: {},
      time: 4,
      level: 1,
      autoscript: false,
      autoscriptPrice: 315000,
    },
    {
      name: 'script-4',
      price: 735000,
      income: {},
      time: 4,
      level: 1,
      autoscript: false,
      autoscriptPrice: 4.410e6,
    },
    {
      name: 'script-5',
      price: 10.290e6,
      income: {},
      time: 4,
      level: 1,
      autoscript: false,
      autoscriptPrice: 61.740e6,
    },
  ],
};
