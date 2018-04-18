export interface Command {
  /** Root/name of the command */
  root: string;
  /** Description of the command, show in `help` */
  desc: string;
  /** If support specific arguments */
  args?: boolean;
  /** If support arguments, set a specific type of arguments that can be passed */
  argsType?: string[];
  /** Support the `--list` or `-l` argument */
  list?: boolean;
  /** Support the `--help` or `-h` argument */
  help?: boolean;
}
