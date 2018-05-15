import test from 'ava';

import { state as commandsState } from '../src/store/commands';
import { parseCommand } from '../src/utils/command-parser';

import { Command } from '../src/models';

const commands = commandsState.commands;

/** Process the input and return the root, args, command found and error-parser object */
const processInput = (input: string) => {
  const splitted = input.split(' ');
  const root = splitted[0];
  const args = splitted.slice(1, splitted.length);
  const cmd = commands.find((obj) => obj.root === root) as Command;
  const error = parseCommand(cmd, splitted);

  return { splitted, root, args, cmd, error };
};

test('reject a command that doesn\'t support --help/-h flags', (t) => {
  const inputs = ['help --help', 'username -h', 'clear --help'];

  inputs.forEach((input) => {
    const { error } = processInput(input);

    t.true(error.errored);
    t.is(error.errorCode, 'HELP_NOT_SUPPORTED');
  });
});

test('accept a command that supports --help/-h flags', (t) => {
  const inputs = ['buy --help', 'run --help'];

  inputs.forEach((input) => {
    const { error } = processInput(input);

    t.false(error.errored);
  });
});

test('reject a command that doesn\'t support --list/-l flags', (t) => {
  const inputs = ['help --list', 'username -l', 'clear --list'];

  inputs.forEach((input) => {
    const { error } = processInput(input);

    t.true(error.errored);
    t.is(error.errorCode, 'LIST_NOT_SUPPORTED');
  });
});

test('accept a command that support --list/-l flags', (t) => {
  const inputs = ['buy --list', 'run --list'];

  inputs.forEach((input) => {
    const processed = processInput(input);

    t.false(processed.error.errored);
  });
});

test('reject a command that have arguments where it is not required', (t) => {
  const inputs = ['help please', 'clear screen'];

  inputs.forEach((input) => {
    const { error } = processInput(input);

    t.true(error.errored);
    t.is(error.errorCode, 'ARGUMENTS_NOT_REQUIRED');
  });
});

test('reject a command that don\'t have argument where it is required', (t) => {
  const inputs = ['buy', 'run'];

  inputs.forEach((input) => {
    const { error } = processInput(input);

    t.true(error.errored);
    t.is(error.errorCode, 'ARGUMENTS_REQUIRED');
  });
});

test('reject a command that don\'t have known arguments', (t) => {
  const inputs = ['run scriptname', 'buy server servername', 'buy unknown name'];

  inputs.forEach((input) => {
    const { error } = processInput(input);

    t.true(error.errored);
    t.is(error.errorCode, 'ARGUMENT_DOESNT_EXIST');
  });
});

test('reject a command that have too much arguments', (t) => {
  const inputs = ['run hare.ctx unknown', 'buy server telnet unknown'];

  inputs.forEach((input) => {
    const { error } = processInput(input);

    t.true(error.errored);
    t.is(error.errorCode, 'TOO_MUCH_ARGUMENTS');
  });
});

test('reject a command that have too few arguments', (t) => {
  const inputs = ['buy server'];

  inputs.forEach((input) => {
    const { error } = processInput(input);

    t.true(error.errored);
    t.is(error.errorCode, 'TOO_FEW_ARGUMENTS');
  });
});
