"use strict";

const test = require('ava');
const DiceCommons = require('../lib/dice-common');
const sinon = require("sinon");

var ProcessRolls;
var _RollMetadata;
var DiceMetadata

test.before( t => {
  ProcessRolls = DiceCommons.ProcessRolls;
  _RollMetadata = DiceCommons._RollMetadata;
  DiceMetadata = DiceCommons.DiceMetadata;
});

test('my passing test', t => {
  t.pass();
});

test('[2,1]', t => {
  const md = new ProcessRolls([2,1]);
  t.deepEqual( md, new _RollMetadata("Roll", [1,2], [1,2], 3) );
});

test('[3,1]', t => {
  const md = new ProcessRolls([3,1], '>');
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

test('roll 2d6', t => {
  var callback = sinon.stub();
  callback.onCall(0).returns(2);
  callback.onCall(1).returns(4);
  sinon.replace(Math, "floor", callback);
  // sinon.replace(DiceCommons, "_rolldie", callback);

  var retval = DiceCommons.RollDice(new DiceMetadata(2, 'd', 6, undefined));
  t.deepEqual(retval, new _RollMetadata("Roll", [3, 5], [3, 5], 8));

  sinon.restore();
});