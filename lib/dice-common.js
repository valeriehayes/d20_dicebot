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

  const RollDice = function(diceMetadata) {
    var dice = [];
    var rollMetadata = {};
    const isRerollMax = (diceMetadata.rollType === 'D') && (diceMetadata.dieType > 3);

    /// roll the dice
    for (var i = 0; i < diceMetadata.numDice; i++) {
      const roll = _rolldie(diceMetadata.dieType);
      dice.push(roll);
      ///console.log(`i: ${i} roll: ${roll} dieType: ${metadata.dieType}`);

      if (isRerollMax && (roll == diceMetadata.dieType)) {
        i--; // roll and extra die
      }
    }

    dice.sort((x,y) => x - y); // sort ascending
    rollMetadata.sorted = dice.slice();

    /// apply advantage/disadvantage
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

    return new _RollMetadata("Roll", rollMetadata.sorted, rollMetadata.modified, rollMetadata.total);
  }

  var _rolldie = function(d) {
    var roll = Math.floor(Math.random() * d) + 1;
    //console.log('**** roll (' + d + '): ' + roll)
    return roll;
  }

  module.exports = {
    DiceMetadata : DiceMetadata,
    RollMetadata : RollMetadata,
    _RollMetadata : _RollMetadata,
    RollDice: RollDice,
    _rolldie: _rolldie
  }
}());