"use strict";

/*
  ParseAll(str : string) : [DiceMetadata, DiceMetadata, DiceMetadata...]

*/

(function () {
  const DiceMetadata = function(opType, numDice, rollType, dieType, modifier) {
      this.opType = opType,
      this.numDice = parseInt(numDice),
      this.rollType = rollType,
      this.dieType = parseInt(dieType),
      this.modifier = modifier
  }

  const ProcessRolls = function(rolls, modifier) {
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

  const RollDice = function(diceMetadata) {
    var dice = [];
    const isRerollMax = (diceMetadata.rollType === 'D') && (diceMetadata.dieType > 3);

    /// roll the dice
    for (var i = 0; i < diceMetadata.numDice; i++) {
      const roll = _rolldie(diceMetadata.dieType);
      dice.push(roll);

      if (isRerollMax && (roll == diceMetadata.dieType)) {
        i--; // roll and extra die
      }
    }

    return new ProcessRolls(dice, diceMetadata.modifier);
  }

  function _rolldie(d) {
    var roll = Math.floor(Math.random() * d) + 1;
    //console.log('**** roll (' + d + '): ' + roll)
    return roll;
  }

  module.exports = {
    DiceMetadata : DiceMetadata,
    ProcessRolls : ProcessRolls,
    _RollMetadata : _RollMetadata,
    RollDice: RollDice,
    _rolldie: _rolldie
  }
}());