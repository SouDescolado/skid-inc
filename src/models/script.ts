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
  /** Time elasped of the script in seconds */
  progression: number;
  /** Level of the script, 0 means not unlocked */
  level: number;
  /** Track when a script have been manually started/triggered */
  triggered: boolean;
  /** If autoscript is unlocked */
  autoscript: boolean;
  /** Price of the autoscript */
  autoscriptPrice: number;
}
