import * as Models from '../models';

/** Return information about the command which was parsed */
export interface CheckCommandArgs {
  /** Find the command from the commands list */
  command: Models.Command;
  /** User-input entered to find the command, processed as ['hello', 'world'] */
  input: string[];
  /** If command is invalid, return an error string ready to be printed in the logs */
  error: string;
  /** Check if the command is valid and can be executed based on the input */
  valid: boolean;
}

/** Interface to loop on all `StatusTypes` */
interface CommandStatus {
  [key: string]: string;
}

/** Generate correct errors depending of the command executed */
export const generateCommandStatus = (command: Models.Command): CommandStatus => {
  return {
    HELP_NOT_SUPPORTED: `<span class="error">error</span> <span class="sub">${command.root}</span> command doesn't support <span class="sub">-h</span> or <span class="sub">--help</span> arguments`,
    LIST_NOT_SUPPORTED: `<span class="error">error</span> <span class="sub">${command.root}</span> command doesn't support <span class="sub">-l</span> or <span class="sub">--list</span> arguments`,
    ARGUMENTS_NOT_REQUIRED: `<span class="error">error</span> <span class="sub">${command.root}</span> command doesn't need any arguments, try to remove them`,
    ARGUMENTS_REQUIRED: `<span class="error">error</span> <span class="sub">${command.root}</span> command require arguments`,
    TOO_MUCH_ARGUMENTS: `<span class="error">error</span> too much arguments, try <span class="sub">${command.root} -l</span> or <span class="sub">${command.root} --list</span>`,
    MISSING_ARGUMENTS: `<span class="error">error</span> too few arguments, try <span class="sub">${command.root} -l</span> or <span class="sub">${command.root} --list</span>` ,
    INVALID_ARGUMENTS: `<span class="error">error</span> some arguments are invalid, try <span class="sub">${command.root} -l</span> or <span class="sub">${command.root} --list</span>`,
    INVALID_STRING_ARGUMENT: `<span class="error">error</span> expected a string argument and instead got a number, check your command`,
    INVALID_NUMBER_ARGUMENT: `<span class="error">error</span> expected a number argument and instead got a string, check your command`,
  };
};

/** Take a command and user input then check for valid arguments */
export const checkCommandArgs = (command: Models.Command, input: string[]): CheckCommandArgs => {
  const args: string[] = input.slice(1, input.length);
  const types = generateCommandStatus(command);
  let error: string = '';
  let valid: boolean = false;

  /* If command don't support `-h` or `--help` */
  if (!command.help && (input.indexOf('-h') > -1 || input.indexOf('--help') > -1)) {
    error = types.HELP_NOT_SUPPORTED;
    return { command, input, error, valid };
  }

  /* If command don't support `-l` or `--list` */
  if (!command.list && (input.indexOf('-l') > -1 || input.indexOf('--list') > -1)) {
    error = types.LIST_NOT_SUPPORTED;
    return { command, input, error, valid };
  }

  /* If command don't require arguments and arguments are passed */
  if (!command.args && args.length > 0) {
    error = types.ARGUMENTS_NOT_REQUIRED;
    return { command, input, error, valid };
  }

  /* If command require arguments and no arguments are passed */
  if (command.args && args.length === 0) {
    error = types.ARGUMENTS_REQUIRED;
    return { command, input, error, valid };
  }

  /* If user entered too much arguments */
  if (command.args && command.argsType && args.length > command.argsType.length) {
    error = types.TOO_MUCH_ARGUMENTS;
    return { command, input, error, valid };
  }

  /* If user entered too few arguments */
  if (command.args && command.argsType && args.length < command.argsType.length) {
    error = types.MISSING_ARGUMENTS;
    return { command, input, error, valid };
  }

  /* If arguments types doesn't match */
  if (command.args && command.argsType && args.length === command.argsType.length) {
    /* `args[i]` parsed and check its type: `isNaN` allow us to know if it's a string or number */
    command.argsType.forEach((type, i) => {
      if (type === 'number' && args[i] && isNaN(parseInt(args[i], 10))) {
        error = types.INVALID_NUMBER_ARGUMENT;
        return;
      }

      if (type === 'string' && args[i] && !isNaN(parseInt(args[i], 10))) {
        error = types.INVALID_STRING_ARGUMENT;
        return;
      }
    });

    return { command, input, error, valid };
  }

  valid = true;
  return { command, input, error, valid };
};
