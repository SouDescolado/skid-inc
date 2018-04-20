import * as Models from '../models';

export const generateHelp = (commands: Models.Command[]): string => {
  const maxLength = maxRootLength(commands);
  let help = `For more information about a command, type <span class="sub">command-name --help</span>:<br><br>`;

  commands.forEach((command) => {
    const spaces = generateSpaces(command.root, maxLength);

    help += `<span class="sub">${command.root}</span>${spaces}${command.desc}<br>`;
  });

  return help;
};

/** Return the maximum, highest length of the root in the commands array */
const maxRootLength = (commands: Models.Command[]): number => {
  let maxLength = 0;

  commands.forEach((command) => {
    if (command.root.length > maxLength) {
      maxLength = command.root.length;
    }
  });

  return maxLength;
};

/** Generate the appropriate number of spaces for a perfect alignment/table of commands */
const generateSpaces = (root: string, maxLength: number): string => {
  const spaces = maxLength - root.length;
  let str = '';

  for (let i = 0; i <= spaces; i++) {
    str += '&nbsp;';
  }

  return str;
};
