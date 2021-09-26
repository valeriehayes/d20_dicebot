"use strict";

(function () {
  const Metadata = function(numDice, rollType, dieType, modifier) {
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

    return new _RollMetadata(sorted, modified, total);
  }

  const _RollMetadata = function(sorted, modified, total) {
    this.sorted = sorted,
    this.modified = modified,
    this.total = total
  }

  module.exports = {
    Metadata : Metadata,
    RollMetadata : RollMetadata,
    _RollMetadata : _RollMetadata
  }
}());