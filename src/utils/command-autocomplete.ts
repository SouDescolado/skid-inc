import * as Models from '../models';

/** Find the argument where the cursor is */
export const findCursorArgument = (cursorPos: number, root: string, args: string[]) => {
  const cursorPositionRelativeToArgs = cursorPos - root.length;
  let argumentWhereCursorIs: string | undefined;
  let count = 1;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    /* If another argument after, +1 for the space character */
    count += (arg[i + 1]) ? arg.length + 1 : arg.length;

    /* When count reach the cursor position relative to args, we have found the argument where the cursor is */
    if (count >= cursorPositionRelativeToArgs) {
      argumentWhereCursorIs = arg;
      i = args.length;
    }
  }

  return argumentWhereCursorIs;
};

/** Return the autocompleted command depending of the user input */
export const autocompleteCommand = (commands: Models.Command[], input: string[], cursorPos: number): string => {
  const root = input[0];
  const args = input.slice(1, input.length);
  const command = commands.find((cmd) => cmd.root === root);

  let typing = input.join(' ');

  /* For a simple command without args, find the root command */
  if (args.length <= 0 && !command) {
    const cmd = commands.find((obj) => obj.root.startsWith(root));

    (cmd)
      ? typing = `${cmd.root} `
      : typing = typing;
  } else if (command && command.arguments) {
    /** Argument where the cursor is */
    const cursorArgument = findCursorArgument(cursorPos, root, args);

    /* If we can find the argument where the cursor is */
    if (cursorArgument) {
      /** Index of `cursorArgument` in the `args` array */
      const argumentIndexInArgs = args.indexOf(cursorArgument);
      /** Find if we have an argument before the `cursorArgument` */
      const argumentBefore: string | undefined = args[argumentIndexInArgs - 1];
      let arg = cursorArgument;

      for (const argumentObj of command.arguments) {
        /** Root argument already completed by the user */
        const argumentAlreadyComplete = argumentObj.possibilities.indexOf(arg);
        /** Root argument not completed by the user and found the full possibility */
        const argumentToComplete = argumentObj.possibilities.find((possibility) => possibility.startsWith(arg));

        if (argumentAlreadyComplete === -1 && argumentToComplete) {
          arg = argumentToComplete;
          args[argumentIndexInArgs] = arg;
          typing = `${root} ${args.join(' ')} `;
          break;
        } else if (argumentObj.argument && argumentBefore && argumentObj.possibilities.indexOf(argumentBefore) > -1) {
          const nestedArgumentAlreadyComplete = argumentObj.argument.possibilities.indexOf(arg);
          const nestedArgumentToComplete = argumentObj.argument.possibilities.find((possibility) => possibility.startsWith(arg));

          if (nestedArgumentAlreadyComplete === -1 && nestedArgumentToComplete) {
            arg = nestedArgumentToComplete;
            args[argumentIndexInArgs] = arg;
            typing = `${root} ${args.join(' ')} `;
            break;
          }
        }
      }
    }
  }

  return typing;
};
