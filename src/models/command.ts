export interface Command {
  /** Root/name of the command */
  root: string;

  /** Description of the command, show in `help` */
  desc: string;

  /** Name of the mutation to commit */
  payload: string;

  /** If support specific arguments */
  args?: boolean;

  /** If support specific arguments */
  hasArgs?: boolean;

  /** If support arguments, set a specific type of arguments that can be passed */
  argsType?: string[];

  /** Support the `--list` or `-l` argument */
  list?: boolean;

  /** Support the `--help` or `-h` argument */
  help?: boolean;

  /** Autocomplete arguments */
  autocomplete?: string[][];

  /** Arguments available for autocomplete, up to 2 nested arguments */
  arguments?: Array<{
    /** Root argument type */
    type: 'string' | 'number';

    /** Root argument possibilities */
    possibilities: string[];

    /** Nested arguments */
    argument?: {

      /** Type of the nested argument */
      type: 'string' | 'number';

      /** Possibilities for the nested argument */
      possibilities: string[];
    };
  }>;
}
