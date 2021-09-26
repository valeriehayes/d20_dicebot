"use strict";

(function () {
  const DiceMetadata = function(numDice, rollType, dieType, modifier) {
      this.numDice = parseInt(numDice),
      this.rollType = rollType,
      this.dieType = parseInt(dieType),
      this.modifier = modifier
  }

  const RollMetadata = function(rolls, modifier) {
    rolls.sort((x,y) => x - y); // sort ascending
    var sorted = rolls.slice(); // copy the array
    if (modifier === '>') {
      rolls.shift();
    } else if (modifier === '<') {
      rolls.pop();
    }
    var modified = rolls.slice(); // copy the array

    var total = modified.reduce((x,y) => x + y, 0);
    const opType = "Roll";

    return new _RollMetadata(opType, sorted, modified, total);
  }

  const _RollMetadata = function(
      opType,
      sorted= undefined,
      modified= undefined,
      total= undefined,
      op= undefined) {
    this.opType = opType,
    this.op = op,
    this.sorted = sorted,
    this.modified = modified,
    this.total = total
  }

  const EvalRollMetadata = function(rolls) {
    var total = 0;

  }

  module.exports = {
    DiceMetadata : DiceMetadata,
    RollMetadata : RollMetadata,
    _RollMetadata : _RollMetadata
  }
}());