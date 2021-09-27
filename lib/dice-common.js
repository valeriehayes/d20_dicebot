"use strict";

/*
  ParseAll(str : string) : [DiceMetadata, DiceMetadata, DiceMetadata...]
  eval(metadata : DiceMetadata[]) : number //total
*/

(function () {

  const DiceGroup = function(numDice, rollType, dieType, op= null) {
      this.numDice = parseInt(numDice),
      this.rollType = rollType,
      this.dieType = parseInt(dieType),
      this.op = op
  }

  const _RollInfo = function(sorted, modified, total) {
    this.sorted = sorted,
    this.modified = modified,
    this.total = total
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

    return new _RollInfo(sorted, modified, total);
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

    return new ProcessRolls(dice, diceMetadata.op);
  }

  function _rolldie(d) {
    var roll = Math.floor(Math.random() * d) + 1;
    //console.log('**** roll (' + d + '): ' + roll)
    return roll;
  }

  module.exports = {
    DiceGroup : DiceGroup,
    ProcessRolls : ProcessRolls,
    _RollInfo : _RollInfo,
    RollDice: RollDice
  }
}());