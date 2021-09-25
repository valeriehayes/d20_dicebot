(function () {
  var DiceRegex = /([0-9]+)([dD])([0-9]+)([><])?/;
  var ParseDice = function(str) {
    var leaves = str.split(" "); //get leaves of parse tree
    console.log(leaves);

    // we don't need this, so get rid of it
    if (leaves[0].valueOf() === "!roll") { leaves.shift(); }

    /// TODO: prevent large numbers

    if (!isMatch(leaves[0])) { return null; }
    const matches = leaves[0].match(DiceRegex);
    console.log(`matches: ${matches}`);

    const numDice = matches[1];
    const rollType = matches[2];
    const dieType = matches[3];
    const modifier = matches[4];
    console.log(`${numDice} ${rollType} ${dieType} ${modifier}`)
  
    const diceMetadata = {
      'numDice': numDice,
      'rollType': rollType,
      'dieType': dieType,
      'modifier': modifier
    };
    return diceMetadata;
  }

  var isMatch = function(str) {
    return DiceRegex.test(str);
  }

  module.exports = {
    isMatch : isMatch,
    ParseDice: ParseDice
  }
}());