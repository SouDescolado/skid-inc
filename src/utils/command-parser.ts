import { Command } from '../models';

export const generateErrors = (command: Command): { [s: string]: string; } => {
  return {
    HELP_NOT_SUPPORTED: `<span class="error">error</span> <span class="sub">${command.root}</span> command doesn't support <span class="sub">-h</span> or <span class="sub">--help</span> flag`,
    LIST_NOT_SUPPORTED: `<span class="error">error</span> <span class="sub">${command.root}</span> command doesn't support <span class="sub">-l</span> or <span class="sub">--list</span> flag`,
    ARGUMENTS_NOT_REQUIRED: `<span class="error">error</span> <span class="sub">${command.root}</span> command doesn't need any arguments, try to remove them`,
    ARGUMENTS_REQUIRED: `<span class="error">error</span> <span class="sub">${command.root}</span> command require arguments`,
    TOO_MUCH_ARGUMENTS: `<span class="error">error</span> too much arguments, try <span class="sub">${command.root} -l</span> or <span class="sub">${command.root} --list</span>`,
    TOO_FEW_ARGUMENTS: `<span class="error">error</span> too few arguments, try <span class="sub"${command.root} -l</span> or <span class="sub">${command.root} --list</span>`,
    MISSING_ARGUMENTS: `<span class="error">error</span> too few arguments, try <span class="sub">${command.root} -l</span> or <span class="sub">${command.root} --list</span>` ,
    INVALID_ARGUMENTS: `<span class="error">error</span> some arguments are invalid, try <span class="sub">${command.root} -l</span> or <span class="sub">${command.root} --list</span>`,
    INVALID_ARGUMENT_TYPE: `<span class="error">error</span> invalid argument(s) type`,
  };
};

/** Check a command if it is valid and can be executed */
export const parseCommand = (command: Command, input: string[]) => {
  const types = generateErrors(command);
  const args = input.slice(1, input.length);

  const flags = checkFlags(command, args);
  const argsLength = checkArgsLength(command, args);
  const argsTypes = checkArgsTypes(command, args);

  const errorMessage = (flags)
    ? types[flags]
    : (argsLength)
      ? types[argsLength]
      : (argsTypes)
        ? types[argsTypes]
        : null;

  return {
    errored: (errorMessage) ? true : false,
    errorCode: flags || argsLength || argsTypes,
    errorMessage,
  };
};

/** Check for `--help`/`-h` and `--list`/`-l` flags */
const checkFlags = (command: Command, args: string[]): string | undefined => {
  const hasHelp = args.indexOf('--help') > -1 || args.indexOf('-h') > -1;
  const hasList = args.indexOf('--list') > -1 || args.indexOf('-l') > -1;

  if (hasHelp && !command.help) {
    return 'HELP_NOT_SUPPORTED';
  }

  if (hasList && !command.list) {
    return 'LIST_NOT_SUPPORTED';
  }
};

/** Check the amount of arguments passed */
const checkArgsLength = (command: Command, args: string[]): string | undefined => {
  if (args.length && !command.args && !command.arguments) {
    return 'ARGUMENTS_NOT_REQUIRED';
  }

  if (args.length === 0 && command.args && command.arguments) {
    return 'ARGUMENTS_REQUIRED';
  }

  /**
   * - Loop on all arguments objects
   * - If the first argument matches a possibility, we have found the right argument object
   * - If the user entered a second argument but we don't have a nested-argument object, there is too much arguments
   * - If the user haven't entered a second argument but we have a nested-argument object, there is too few arguments
   * - Break the loop since we don't want to loop over other arguments objects
   */
  if (command.args && command.arguments) {
    for (const argObj of command.arguments) {
      const findPossibility = argObj.possibilities.indexOf(args[0]) > -1;

      if (findPossibility) {
        if (!argObj.argument && args[1]) {
          return 'TOO_MUCH_ARGUMENTS';
        } else if (argObj.argument && args[1] === undefined) {
          return 'TOO_FEW_ARGUMENTS';
        }

        break;
      }
    }
  }
};

/** Check the arguments types */
const checkArgsTypes = (command: Command, args: string[]) => {
  for (const arg of args) {
    if (!command.arguments) {
      return;
    }

    const argType = (isNaN(parseInt(arg, 10))) ? 'string' : 'number';

    /**
     * - Loop on all arguments
     * - Find the possibility in an argument
     * - If can't find a possibility, find another one on the nested argument
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
