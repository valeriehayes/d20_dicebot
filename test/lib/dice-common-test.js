"use strict";

import test from 'ava';
import sinon from 'sinon';

import { ProcessRolls, _RollInfo, RollDice, DiceGroup, RollAllGroups, SumAllRolls }
   from '../../build/lib/dice-common.js';

test('my passing test', t => {
  t.pass();
});

test('[2,1]', t => {
  const md = new ProcessRolls([2,1]);
  t.deepEqual( md, new _RollInfo([1,2], [1,2], 3) );
});

test('[3,1]', t => {
  const md = new ProcessRolls([3,1], '>');
  t.deepEqual( md, new _RollInfo([1,3], [3], 3) );
});

test('mock rolldie()', t => {
  // sinon.replace(
  //     DiceCommons,
  //     "_rolldie",
  //     sinon.fake.returns(8)
  // );
  //t.is(_rolldie(6), 8);
  sinon.replace(
    Math,
    "floor",
    sinon.fake.returns(7) // we add one to this, so this will be 8
  );

  var retval = RollDice(new DiceGroup(1, 'd', 6));
  t.deepEqual(retval, new _RollInfo([8], [8], 8) );

  sinon.restore();
});

test('roll 2d6', t => {
  var callback = sinon.stub();
  callback.onCall(0).returns(2);
  callback.onCall(1).returns(4);
  sinon.replace(Math, "floor", callback);
  // sinon.replace(DiceCommons, "_rolldie", callback);

  var retval = RollDice(new DiceGroup(2, 'd', 6, undefined));
  t.deepEqual(retval, new _RollInfo([3, 5], [3, 5], 8));

  sinon.restore();
});

test('1d6 + 1d8', t => {
  var sum = SumAllRolls(
    [new _RollInfo([3], [3], 3),
    new _RollInfo([7], [7], 7)]
  );

  t.is(sum, 10);
});

test('convert list of dicegroup into list of _RollInfo', t => {
  var callback = sinon.stub();
  callback.onCall(0).returns(2);
  callback.onCall(1).returns(6);
  sinon.replace(Math, "floor", callback);

  var retval = RollAllGroups(
    [new DiceGroup(1, 'd', 6),
    new DiceGroup(1, 'd', 8)]
  )
  t.deepEqual(retval, [
    new _RollInfo([3], [3], 3),
    new _RollInfo([7], [7], 7),
  ])

  sinon.restore();
});