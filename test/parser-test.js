const test = require('ava');
const DiceParser = require('../lib/parser.js');
const { DiceMetadata, _RollMetadata } = require('../lib/dice-common');

test('1d6', t => {
  var metadata = DiceParser.ParseDie('1d6');

  t.deepEqual(metadata, new DiceMetadata(1, 'd', 6));
});

test('1D6', t => {
  var metadata = DiceParser.ParseDie('1D6');

  t.deepEqual(metadata, new DiceMetadata(1, 'D', 6) );
});

test('2d6', t => {
  var metadata = DiceParser.ParseDie('2d6');

  t.deepEqual(metadata, new DiceMetadata(2, 'd', 6) );
});

test('2d6>', t => {
  var metadata = DiceParser.ParseDie('2d6>');

  t.deepEqual(metadata, new DiceMetadata(2, 'd', 6, '>') );
});

test('1d8 + 1d6', t=> {
  var metadata = DiceParser.ParseAll('1d8 + 1d6');

  t.deepEqual(metadata,
    [new DiceMetadata(1, 'd', 8),
    new _RollMetadata("Op", undefined, undefined, undefined, '+'),
    new DiceMetadata(1, 'd', 6)]
  );
});
