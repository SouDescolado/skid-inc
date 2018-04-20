import * as Models from '../models';

/** Return the autocompleted command depending */
export const autocompleteCommand = (commands: Models.Command[], input: string[]): string => {
  const root = input[0];
  const args = input.slice(1, input.length);
  const fullCmd = input.join(' ');

  /* If no arguments found, process the root only */
  if (args.length === 0) {
    /* If input is equal to nothing: return an empty string. Otherwise, find the command based on the root start */
    if (root.length) {
      const cmd = commands.find((el) => el.root.indexOf(root) === 0);
      const cmdRoot = (cmd !== undefined) ? cmd.root : fullCmd;
      return cmdRoot;
    } else {
      return fullCmd;
    }
  } else {
    return fullCmd;
  }
};
