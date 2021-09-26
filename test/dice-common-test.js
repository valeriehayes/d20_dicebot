const test = require('ava');
const DiceCommons = require('../lib/dice-common');
const sinon = require("sinon");

var RollMetadata;
var _RollMetadata;
var DiceMetadata

test.before( t => {
  RollMetadata = DiceCommons.RollMetadata;
  _RollMetadata = DiceCommons._RollMetadata;
  DiceMetadata = DiceCommons.DiceMetadata;
});

test('my passing test', t => {
  t.pass();
});

test('[2,1]', t => {
  const md = new RollMetadata([2,1]);
  t.deepEqual( md, new _RollMetadata("Roll", [1,2], [1,2], 3) );
});

test('[3,1]', t => {
  const md = new RollMetadata([3,1], '>');
  t.deepEqual( md, new _RollMetadata("Roll", [1,3], [3], 3) );
});

test('mock rolldie()', t => {
  // sinon.replace(
  //     DiceCommons,
  //     "_rolldie",
  //     sinon.fake.returns(8)
  // );
  //t.is(DiceCommons._rolldie(6), 8);
  sinon.replace(
    Math,
    "floor",
    sinon.fake.returns(7) // we add one to this, so this will be 8
  );

  var retval = DiceCommons.RollDice(new DiceMetadata(1, 'd', 6));
  t.deepEqual(retval, new _RollMetadata("Roll", [8], [8], 8) );

  sinon.restore();
});