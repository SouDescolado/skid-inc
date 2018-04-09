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
  /** Level required to buy the script */
  levelUnlock: number;
}
