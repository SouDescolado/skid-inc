export interface Server {
  /** Name of the server item */
  name: string;
  /** Base price of the server, used with `inflation` */
  basePrice: number;
  /** Inflation of the price, used with `basePrice` */
  inflation: number;
  /** Max quantity of this server available */
  max: number;
  /** Effects of the server, seen as multipliers */
  effects: {
    /** Player money income multiplier */
    money?: number;
    /** Player exp income multiplier */
    exp?: number;
  };
}