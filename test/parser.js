const test = require('ava');
const DiceParser = require('../lib/parser.js');

test('my passing test', t => {
  t.pass();
});

test('1d6', t => {
  var metadata = DiceParser.ParseDice('1d6');

  t.deepEqual(metadata, {numDice: '1', rollType: 'd', dieType: '6', modifier: undefined} );
});

test('1D6', t => {
  var metadata = DiceParser.ParseDice('1D6');

  t.deepEqual(metadata, {numDice: '1', rollType: 'D', dieType: '6', modifier: undefined} );
});

test('2d6', t => {
  var metadata = DiceParser.ParseDice('2d6');

  t.deepEqual(metadata, {numDice: '2', rollType: 'd', dieType: '6', modifier: undefined} );
});

test('2d6>', t => {
  var metadata = DiceParser.ParseDice('2d6>');

  t.deepEqual(metadata, {numDice: '2', rollType: 'd', dieType: '6', modifier: '>'} );
});

