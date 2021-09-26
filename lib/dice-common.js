"use strict";

(function () {
  const Metadata = function(numDice, rollType, dieType, modifier) {
      this.numDice = parseInt(numDice),
      this.rollType = rollType,
      this.dieType = parseInt(dieType),
      this.modifier = modifier
  }

  module.exports = {
    Metadata : Metadata
  }
}());