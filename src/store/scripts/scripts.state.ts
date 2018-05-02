import * as Models from '../../models';

export interface ScriptsState {
  /** List of scripts */
  scripts: Models.Script[];
}

export const state: ScriptsState = {
  scripts: [
    {
      name: 'hare.ctx',
      price: 0,
      income: {
        money: 118,
        exp: 8,
      },
      time: 4,
      level: 1,
      autoscript: false,
      autoscriptPrice: 420,
      progression: 0,
      triggered: false,
      executed: 0,
    },
    {
      name: 'yerg.trj',
      price: 3750,
      income: {
        money: 1298,
        exp: 58,
      },
      time: 16,
      level: 0,
      autoscript: false,
      autoscriptPrice: 22500,
      progression: 0,
      triggered: false,
      executed: 0,
    },
    {
      name: 'acid.pl',
      price: 52500,
      income: {
        money: 14278,
        exp: 392,
      },
      time: 64,
      level: 0,
      autoscript: false,
      autoscriptPrice: 315000,
      progression: 0,
      triggered: false,
      executed: 0,
    },
    {
      name: 'memz.rsm',
      price: 735000,
      income: {
        money: 157058,
        exp: 2744,
      },
      time: 256,
      level: 0,
      autoscript: false,
      autoscriptPrice: 4.410e6,
      progression: 0,
      triggered: false,
      executed: 0,
    },
    {
      name: 'gruel.vbs',
      price: 10.290e6,
      income: {
        money: 1.727e6,
        exp: 19208,
      },
      time: 1024,
      level: 0,
      autoscript: false,
      autoscriptPrice: 61.740e6,
      progression: 0,
      triggered: false,
      executed: 0,
    },
    {
      name: 'cih.win',
      price: 144.060e6,
      income: {
        money: 19.004e6,
        exp: 134456,
      },
      time: 4096,
      level: 0,
      autoscript: false,
      autoscriptPrice: 864.360e6,
      progression: 0,
      triggered: false,
      executed: 0,
    },
    {
      name: 'worm.cs',
      price: 2.016e9,
      income: {
        money: 209.044e6,
        exp: 941192,
      },
      time: 16384,
      level: 0,
      autoscript: false,
      autoscriptPrice: 12.101e9,
      progression: 0,
      triggered: false,
      executed: 0,
    },
    {
      name: 'blazer.dos',
      price: 28.235e9,
      income: {
        money: 2.299e9,
        exp: 6588344,
      },
      time: 65536,
      level: 0,
      autoscript: false,
      autoscriptPrice: 169.415e9,
      progression: 0,
      triggered: false,
      executed: 0,
    },
  ],
};
