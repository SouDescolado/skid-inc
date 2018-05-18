import { Command } from '../models';

/**
 *  Check for the --help or -h flag in the command passed by the user.
 */
export const hasHelpFlag = (args: string[]) => args.indexOf('--help') > -1 || args.indexOf('-h') > -1;

/**
 *  Check for the --list or -l flag in the command passed by the user.
 */
export const hasListFlag = (args: string[]) => args.indexOf('--list') > -1 || args.indexOf('-l') > -1;

/**
 *  Generate error message according to the specific command
 */
export const generateErrors = (command: Command): { [s: string]: string; } => {
  return {
    HELP_NOT_SUPPORTED: `<span class="error">error</span> <span class="sub">${command.root}</span> command doesn't support <span class="sub">-h</span> or <span class="sub">--help</span> flag`,
    LIST_NOT_SUPPORTED: `<span class="error">error</span> <span class="sub">${command.root}</span> command doesn't support <span class="sub">-l</span> or <span class="sub">--list</span> flag`,
    ARGUMENTS_NOT_REQUIRED: `<span class="error">error</span> <span class="sub">${command.root}</span> command doesn't need any arguments, try to remove them`,
    ARGUMENTS_REQUIRED: `<span class="error">error</span> <span class="sub">${command.root}</span> command require arguments`,
    ARGUMENT_DOESNT_EXIST: `<span class="error">error</span> argument(s) doesn't exist(s) for the <span class="sub">${command.root}</span> command`,
    TOO_MUCH_ARGUMENTS: `<span class="error">error</span> too much arguments, try <span class="sub">${command.root} -l</span> or <span class="sub">${command.root} --list</span>`,
    TOO_FEW_ARGUMENTS: `<span class="error">error</span> too few arguments, try <span class="sub"${command.root} -l</span> or <span class="sub">${command.root} --list</span>`,
    INVALID_ARGUMENT_TYPE: `<span class="error">error</span> invalid argument(s) type`,
  };
};

/**
 *  Check for a valid user input depending of the command detected.
 */
export const parseCommand = (command: Command, input: string[]) => {
  const types = generateErrors(command);
  const args = input.slice(1, input.length);

  const flags = checkFlags(command, args);
  const argsLength = checkArgsExists(command, args);
  const argsTypes = checkArgsTypes(command, args);

  let errorMessage: string | undefined;

  if (flags) {
    errorMessage = types[flags];
  } else if (!hasHelpFlag(args) && !hasListFlag(args)) {
    if (argsLength) {
      errorMessage = types[argsLength];
    } else if (argsTypes) {
      errorMessage = types[argsTypes];
    }
  }

  return {
    errored: !!errorMessage,
    errorCode: flags || argsLength || argsTypes,
    errorMessage,
  };
};

/**
 *  Check if user input contains any flags and if the command support these flags.
 */
const checkFlags = (command: Command, args: string[]): string | undefined => {
  if (hasHelpFlag(args) && !command.help) {
    return 'HELP_NOT_SUPPORTED';
  }

  if (hasListFlag(args) && !command.list) {
    return 'LIST_NOT_SUPPORTED';
  }
};

/**
 *  Check if command support arguments, arguments missing/not required. Check arguments length
 *  vs length expected and check if arguments exist for a specific command.
 *
 *  - Loop on all arguments objects
 *    - Try to find a possibility with the first user argument
 *      - If not found, argument at first potision doesn't exist for this command
 *    - Check if user passed too much arguments (nested argObj or args.length)
 *    - Check if user forgot an argument (nested argObj is present, no args at second position)
 *    - Try to find a possibility in a nested argObj
 *      - If not found, argument at second position doesn't exist for this command
 *    - Break the loop since we don't want to try on other argObj
 */
const checkArgsExists = (command: Command, args: string[]): string | undefined => {
  if (args.length && !command.args && !command.arguments) {
    return 'ARGUMENTS_NOT_REQUIRED';
  }

  if (args.length === 0 && command.args && command.arguments) {
    return 'ARGUMENTS_REQUIRED';
  }

  if (command.args && command.arguments) {
    let iterations = 0;

    for (const argObj of command.arguments) {
      const findPossibility = argObj.possibilities.indexOf(args[0]) > -1;
      iterations += 1;

      if (findPossibility) {
        if (!argObj.argument && args[1] || argObj.argument && args.length > 2) {
          return 'TOO_MUCH_ARGUMENTS';
        } else if (argObj.argument && args[1] === undefined) {
          return 'TOO_FEW_ARGUMENTS';
        } else if (argObj.argument && argObj.argument.possibilities.indexOf(args[1]) === -1) {
          return 'ARGUMENT_DOESNT_EXIST';
        }

        break;
      } else if (iterations >= command.arguments.length) {
        return 'ARGUMENT_DOESNT_EXIST';
      }
    }
  }
};

/**
 *  Check for valid arguments type, using `parseInt` and `isNaN`.
 */
const checkArgsTypes = (command: Command, args: string[]) => {
  for (const arg of args) {
    if (!command.arguments) {
      return;
    }

    const argType = (isNaN(parseInt(arg, 10))) ? 'string' : 'number';

    /**
     * - Loop on all arguments objects
     * - Find the possibility in an argObj
     * - If can't find a possibility, find another one on the nested argObj
     */
    for (const argumentObj of command.arguments) {
      const findPossibility = argumentObj.possibilities.indexOf(arg);

      if (findPossibility === -1 && argumentObj.type !== argType) {
        return 'INVALID_ARGUMENT_TYPE';
      } else if (argumentObj.argument) {
        const findNestedPossibility = argumentObj.argument.possibilities.indexOf(arg);

        if (findNestedPossibility > -1 && argumentObj.argument.type !== argType) {
          return 'INVALID_ARGUMENT_TYPE';
        }
      }
    }
  }
};
