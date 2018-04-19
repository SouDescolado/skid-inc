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
    HELP_NOT_SUPPORTED: `${command.root} command doesn't support -h or --help`,
    LIST_NOT_SUPPORTED: `${command.root} command doesn't support -l or --list`,
    ARGUMENTS_NOT_REQUIRED: `${command.root} command doesn't need any arguments, try to remove them`,
    ARGUMENTS_REQUIRED: `${command.root} command require arguments`,
    TOO_MUCH_ARGUMENTS: `too much arguments, try ${command.root} -h or ${command.root} -l`,
    INVALID_ARGUMENTS: `some arguments are invalid, try ${command.root} -h or ${command.root} -l`,
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

  /* If arguments types doesn't match */
  if (command.args && command.argsType && command.argsType.every((type, i) => type === typeof args[i])) {
    error = types.INVALID_ARGUMENTS;
    return { command, input, error, valid };
  }

  valid = true;
  return { command, input, error, valid };
};
