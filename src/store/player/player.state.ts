export interface PlayerState {
  /** Current money */
  money: number;
  /** Total money, stack after each prestige */
  totalMoney: number;
  /** Current exp */
  exp: number;
  /** total exp earned, stack after each prestige */
  totalExp: number;
  /** Exp required to next level */
  expReq: number;
  /** Current level */
  level: number;
  /** Player username, can only de defined once */
  username: string;
}

export const state: PlayerState = {
  money: 0,
  totalMoney: 0,
  exp: 0,
  totalExp: 0,
  expReq: 100,
  level: 1,
  username: 'user',
};
