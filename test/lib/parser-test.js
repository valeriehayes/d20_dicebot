"use strict";

const test = require('ava');
const DiceParser = require('../../src/lib/parser.js');
const { DiceGroup } = require('../../src/lib/dice-common');

test('1d6', t => {
  var metadata = DiceParser.ParseDie('1d6');

  t.deepEqual(metadata, new DiceGroup(1, 'd', 6, null, "1d6"));
});

test('1D6', t => {
  var metadata = DiceParser.ParseDie('1D6');

  t.deepEqual(metadata, new DiceGroup(1, 'D', 6, null, "1D6") );
});

test('2d6', t => {
  var metadata = DiceParser.ParseDie('2d6');

  t.deepEqual(metadata, new DiceGroup(2, 'd', 6, null, "2d6") );
});

test('2d6>', t => {
  var metadata = DiceParser.ParseDie('2d6>');

  t.deepEqual(metadata, new DiceGroup(2, 'd', 6, '>', "2d6>") );
});

test('1d8 + 1d6', t => {
  var metadata = DiceParser.ParseAll('1d8 + 1d6');

  t.deepEqual(metadata,
    [new DiceGroup(1, 'd', 8, null, "1d8"),
    new DiceGroup(1, 'd', 6, null, "1d6")]
  );
});

test('1d20', t => {
  var metadata = DiceParser.ParseAll('1d20');

  t.deepEqual(metadata,
    [new DiceGroup(1, 'd', 20, null, "1d20")]
  );
});

test('2d20>', t => {
  var metadata = DiceParser.ParseAll('2d20>');

  t.deepEqual(metadata,
    [new DiceGroup(2, 'd', 20, '>', "2d20>")]
  );
});
