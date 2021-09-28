"use strict";

import test from 'ava';
import { DiceGroup } from '../../build/lib/dice-common.js';
import { ParseAll, ParseDie } from '../../build/lib/parser.js';

test('1d6', t => {
  var metadata = ParseDie('1d6');

  t.deepEqual(metadata, new DiceGroup(1, 'd', 6, null, "1d6"));
});

test('1D6', t => {
  var metadata = ParseDie('1D6');

  t.deepEqual(metadata, new DiceGroup(1, 'D', 6, null, "1D6") );
});

test('2d6', t => {
  var metadata = ParseDie('2d6');

  t.deepEqual(metadata, new DiceGroup(2, 'd', 6, null, "2d6") );
});

test('2d6>', t => {
  var metadata = ParseDie('2d6>');

  t.deepEqual(metadata, new DiceGroup(2, 'd', 6, '>', "2d6>") );
});

test('test constant: 2', t => {
  var diceGroup = ParseDie("2");
  t.deepEqual(diceGroup, new DiceGroup(2, 'd', 1, null, "2") );
});

test('1d8 + 1d6', t => {
  var metadata = ParseAll('1d8 + 1d6');

  t.deepEqual(metadata,
    [new DiceGroup(1, 'd', 8, null, "1d8"),
    new DiceGroup(1, 'd', 6, null, "1d6")]
  );
});

test('1d6 3', t => {
  var metadata = ParseAll('1d6 3');

  t.deepEqual(metadata,
    [new DiceGroup(1, 'd', 6, null, "1d6"),
    new DiceGroup(3, 'd', 1, null, "3")]
  );
});

test('1d20', t => {
  var metadata = ParseAll('1d20');

  t.deepEqual(metadata,
    [new DiceGroup(1, 'd', 20, null, "1d20")]
  );
});

test('2d20>', t => {
  var metadata = ParseAll('2d20>');

  t.deepEqual(metadata,
    [new DiceGroup(2, 'd', 20, '>', "2d20>")]
  );
});
