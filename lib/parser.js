"use strict";

const { DiceMetadata, _RollMetadata } = require('../lib/dice-common');

(function () {
  const DiceRegex = /([0-9]+)([dD])([0-9]+)([><])?/;

  const ParseAll = function(str) {
    var leaves = str.split(" "); //get leaves of parse tree
    console.log(leaves);

    // we don't need this, so get rid of it
    if (leaves[0].valueOf() === "!roll") { leaves.shift(); }

    var parseTree = [];
    //console.log(`leaves: ${leaves}`);

    for (var i = 0; i < leaves.length; i++) {
      //console.log(`leaf: ${leaves[i]}`);
      parseTree.push(ParseDie(leaves[i]));
    }
    console.log(parseTree);
    return parseTree;
  }

  const ParseDie = function(str) {
    /// TODO: prevent large numbers

    if ( !isMatch(str) ) {
      if ( str.match(/^[+-]$/)) {
        //console.log(`op: ${str}`);
        var md = new _RollMetadata("Op", undefined, undefined, undefined, str);
        return md;
      }
      return null;
    }
    const matches = str.match(DiceRegex);
    //console.log(`matches: ${matches}`);

    const numDice = matches[1];
    const rollType = matches[2];
    const dieType = matches[3];
    const modifier = matches[4];
    //console.log(`${numDice} ${rollType} ${dieType} ${modifier}`)
  
    return new DiceMetadata(numDice, rollType, dieType, modifier);
  }

  const isMatch = function(str) {
    return DiceRegex.test(str);
  }

  const RollDice = function(diceMetadata) {
    var dice = [];
    var rollMetadata = {};
    const isRerollMax = (diceMetadata.rollType === 'D') && (diceMetadata.dieType > 3);

    /// roll the dice
    for (var i = 0; i < diceMetadata.numDice; i++) {
      const roll = rolldie(diceMetadata.dieType);
      dice.push(roll);
      ///console.log(`i: ${i} roll: ${roll} dieType: ${metadata.dieType}`);

      if (isRerollMax && (roll == diceMetadata.dieType)) {
        ///console.log(`*** extra roll!!! ***`);
        i--; // roll and extra die
      }
    }

    dice.sort((x,y) => x - y); // sort ascending
    //console.log(`sorted dice: ${dice}`)
    rollMetadata.sorted = dice.slice();

    /// apply advantage/disadvantage (first)
    if (diceMetadata.modifier === '>') {
      /// advantage, remove the lowest roll
      dice.shift();
    } else if (diceMetadata.modifier === '<') {
      /// disadvantage, remove highest (last)
      dice.pop();
    }
    //console.log(`modified dice: ${dice}`)
    rollMetadata.modified = dice;

    /// get the total
    const total = dice.reduce((x, y) => x + y, 0);
    //console.log(`total: ${total}`);
    rollMetadata.total = total;

    return rollMetadata;
  }

  function rolldie(d) {
    var roll = Math.floor(Math.random() * d) + 1;
    //console.log('**** roll (' + d + '): ' + roll)
    return roll;
  }

  module.exports = {
    isMatch : isMatch,
    ParseDie: ParseDie,
    ParseAll: ParseAll,
    RollDice: RollDice
  }

}());