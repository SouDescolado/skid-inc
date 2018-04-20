export interface Script {
  /** Name of the script */
  name: string;
  /** Price of the script */
  price: number;
  /** Multiple income possible */
  income: {
    /** Money income */
    money?: number;
    /** Exp income */
    exp?: number;
  };
  /** Time for script execution in seconds */
  time: number;
  /** Level of the script */
  level: number;
  /** If autoscript is unlocked */
  autoscript: boolean;
  /** Price of the autoscript */
  autoscriptPrice: number;
}
