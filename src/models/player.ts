export interface Player {
  /** Player money */
  money: number;
  /** Player total money, stack after each prestige */
  totalMoney: number;
  /** Player exp */
  exp: number;
  /** Player total exp, stack after each prestige */
  totalExp: number;
  /** Exp required */
  expReq: number;
  /** Player level */
  level: number;
  /** Botnet network amount */
  botnet: number;
  /** Player username */
  username: string;
}
