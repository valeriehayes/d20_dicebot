"use strict";

import { DiceGroup } from '../lib/dice-common';

const DiceRegex = /([0-9]+)([dD])([0-9]+)([><])?/;

export const ParseAll = function(str : string) {
  var leaves = str.split(" "); //get leaves of parse tree
  // console.log(leaves);

  // we don't need this, so get rid of it
  if (leaves[0].valueOf() === "!roll") { leaves.shift(); }

  var diceGroups = [];

  for (var i = 0; i < leaves.length; i++) {
    diceGroups.push(ParseDie(leaves[i]));
  }
  // console.log(diceGroups);

  for (var i = 0; i < leaves.length; i++) {
    // just assume multiple dice groups are added; get rid of '+'
    //   and all other bad text
    if (diceGroups[i] == null) {
      diceGroups.splice(i, 1);
    }
  }
  // console.log(parseTree);
  return diceGroups;
}

export const ParseDie = function(str : string) {
  /// TODO: prevent large numbers

  if ( /^[0-9]+$/.test(str)) {
    return new DiceGroup(str, 'd', '1', null, str); // constant uses 1-sided dice
  }
  if ( !isMatch(str) ) {
    // just assume multiple dice groups are added; get rid of '+' or any other junk
    return null;
  }
  const matches = str.match(DiceRegex);
  if (str.startsWith('!')) { str = str.substring(1);}

  const numDice = matches[1];
  const rollType = matches[2];
  const dieType = matches[3];
  const op = matches[4];

  return new DiceGroup(numDice, rollType, dieType, op, str);
}

export const isMatch = function(str : string ) {
  return DiceRegex.test(str);
}