"use strict";

(function () {

  class DiceGroup {
    numDice : number;
    rollType : string;
    dieType : number;
    op : string;
    str : string;

    constructor(
        numDice : string,
        rollType : string,
        dieType : string,
        op : string | null = null,
        str : string | null = null) {
      this.numDice = parseInt(numDice),
      this.rollType = rollType,
      this.dieType = parseInt(dieType),
      this.op = op,
      this.str = str
    }
  }

  class _RollInfo {
    sorted : number[];
    modified : number[];
    total : number;

    constructor(sorted : number[], modified : number[], total : number) {
      this.sorted = sorted,
      this.modified = modified,
      this.total = total
    }
  }

  const RollAllGroups = function(diceGroups : DiceGroup[]) {
    var rollInfos = [];
    // diceGroups.forEach(diceGroup => {
    for (var i = 0; i < diceGroups.length; i++) {
      rollInfos.push(RollDice(diceGroups[i]));
    }
    return rollInfos;
  }

  const SumAllRolls = function(rollInfos : _RollInfo[]) {
    //return rollInfos.reduce((x,y) => x.total + y.total, 0);
    var total = 0;
    for (var i = 0; i < rollInfos.length; i++) {
      total += rollInfos[i].total;
    }
    return total;
  }

  const ProcessRolls = function(rolls : number[], modifier : string) {
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

  const RollDice = function(diceGroup : DiceGroup) {
    var dice : number[] = [];
    const isRerollMax = (diceGroup.rollType === 'D') && (diceGroup.dieType > 3);

    /// roll the dice
    for (var i = 0; i < diceGroup.numDice; i++) {
      const roll = _rolldie(diceGroup.dieType);
      dice.push(roll);

      if (isRerollMax && (roll == diceGroup.dieType)) {
        i--; // roll and extra die
      }
    }

    return ProcessRolls(dice, diceGroup.op);
  }

  function _rolldie(d : number) {
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