"use strict";

const { DiceMetadata, _RollMetadata } = require('../lib/dice-common');

(function () {
  const DiceRegex = /([0-9]+)([dD])([0-9]+)([><])?/;

  const ParseAll = function(str) {
    var leaves = str.split(" "); //get leaves of parse tree
    // console.log(leaves);

    // we don't need this, so get rid of it
    if (leaves[0].valueOf() === "!roll") { leaves.shift(); }

    var parseTree = [];

    for (var i = 0; i < leaves.length; i++) {
      parseTree.push(ParseDie(leaves[i]));
    }
    // console.log(parseTree);
    return parseTree;
  }

  const ParseDie = function(str) {
    /// TODO: prevent large numbers

    if ( !isMatch(str) ) {
      if ( str.match(/^[+-]$/)) {
        var md = new _RollMetadata("Op", undefined, undefined, undefined, str);
        return md;
      }
      return null;
    }
    const matches = str.match(DiceRegex);

    const numDice = matches[1];
    const rollType = matches[2];
    const dieType = matches[3];
    const modifier = matches[4];
  
    return new DiceMetadata(numDice, rollType, dieType, modifier);
  }

  const isMatch = function(str) {
    return DiceRegex.test(str);
  }

  module.exports = {
    isMatch : isMatch,
    ParseDie: ParseDie,
    ParseAll: ParseAll
  }

}());