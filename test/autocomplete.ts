import test from 'ava';

import { state as commandsState } from '../src/store/commands';
import { autocompleteCommand, findCursorArgument } from '../src/utils/command-autocomplete';

const commands = commandsState.commands;

test('find proper argument at the cursor position', (t) => {
  t.plan(3);

  const inputs = ['hello world qwerty', 'i am on this arg', 'run script hare.ctx'];
  const cursorPosSimulated = [13, 9, 4];
  const expectedOutputs = ['qwerty', 'this', 'script'];

  inputs.forEach((input, i) => {
    const args = input.split(' ');
    const root = args.shift() as string;
    const cursorArgument = findCursorArgument(cursorPosSimulated[i], root, args);

    t.is(cursorArgument, expectedOutputs[i]);
  });
});

test('autocomplete a simple command', (t) => {
  t.plan(3);

  const inputs = ['hel', 'ru', 'usern'];
  const expectedOutputs = ['help ', 'run ',  'username '];

  inputs.forEach((input, i) => {
    const autocompleted = autocompleteCommand(commands, input.split(' '), input.length);

    t.is(autocompleted, expectedOutputs[i]);
  });
});

test('don\'t autocomplete a simple command that doesn\'t exists', (t) => {
  t.plan(3);

  const inputs = ['bly', 'azert', 'qwer'];

  inputs.forEach((input, i) => {
    const autocompleted = autocompleteCommand(commands, input.split(' '), input.length);

    t.is(autocompleted, inputs[i]);
  });
});

test('autocomplete the first argument', (t) => {
  t.plan(3);

  const inputs = ['buy sc', 'run mem', 'buy ser'];
  const expectedOutputs = ['buy script ', 'run memz.rsm ', 'buy server '];

  inputs.forEach((input, i) => {
    const autocompleted = autocompleteCommand(commands, input.split(' '), input.length);

    t.is(autocompleted, expectedOutputs[i]);
  });
});

test('don\'t autocomplete an unknown argument', (t) => {
  t.plan(3);

  const inputs = ['run aze', 'buy unkn', 'run har.'];

  inputs.forEach((input, i) => {
    const autocompleted = autocompleteCommand(commands, input.split(' '), input.length);

    t.is(autocompleted, inputs[i]);
  });
});

test('autocomplete a nested argument', (t) => {
  t.plan(3);

  const inputs = ['buy server teln', 'buy script har', 'buy autoscript memz'];
  const expectedOutputs = ['buy server telnet ', 'buy script hare.ctx ', 'buy autoscript memz.rsm '];

  inputs.forEach((input, i) => {
    const autocompleted = autocompleteCommand(commands, input.split(' '), input.length);

    t.is(autocompleted, expectedOutputs[i]);
  });
});

test('don\'t autocomplete a nested argument that don\'t have any arguments matched', (t) => {
  t.plan(3);

  const inputs = ['buy server hare.', 'buy autoscript vp', 'buy script tel'];

  inputs.forEach((input, i) => {
    const autocompleted = autocompleteCommand(commands, input.split(' '), input.length);

    t.is(autocompleted, inputs[i]);
  });
});
