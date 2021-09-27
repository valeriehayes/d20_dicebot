"use strict";

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

  const RollAllGroups = function(diceGroups) { // diceGroups : DiceGroup[]
    var rollInfos = [];
    diceGroups.forEach(diceGroup => {
      rollInfos.push(RollDice(diceGroup));
    });
    return rollInfos;
  }

  const SumAllRolls = function(rollInfos) { // rollInfos : _RollInfo[]
    //return rollInfos.reduce((x,y) => x.total + y.total, 0);
    var total = 0;
    for (var i = 0; i < rollInfos.length; i++) {
      total += rollInfos[i].total;
    }
    return total;
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

  const RollDice = function(diceGroup) {
    var dice = [];
    const isRerollMax = (diceGroup.rollType === 'D') && (diceGroup.dieType > 3);

    /// roll the dice
    for (var i = 0; i < diceGroup.numDice; i++) {
      const roll = _rolldie(diceGroup.dieType);
      dice.push(roll);

      if (isRerollMax && (roll == diceGroup.dieType)) {
        i--; // roll and extra die
      }
    }

    return new ProcessRolls(dice, diceGroup.op);
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
    RollDice: RollDice,
    SumAllRolls: SumAllRolls,
    RollAllGroups : RollAllGroups
  }
}());