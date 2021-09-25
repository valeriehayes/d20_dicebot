(function () {
  var DiceRegex = /([0-9]+)([dD])([0-9]+)([><])?/;
  var ParseDice = function(str) {
    var leaves = str.split(" ");
    console.log(leaves);
    if (leaves[0].valueOf() === "!roll") { leaves.shift(); }
    /// TODO: prevent large numbers
    const regexTest = DiceRegex.test(leaves[0]);
    console.log(regexTest);
    if (!regexTest) { return null; }
  
    const matches = leaves[0].match(DiceRegex);
    console.log(`matches: ${matches}`);
    if (matches === null) { return; } /// no matches, just return
    ///if (matches == null || matches == undefined || !matches) { return; } /// no matches, just return
  
    const numDice = matches[1];
    const rollType = matches[2];
    const dieType = matches[3];
    const modifier = matches[4];
    //console.log(`${matches[1]} ${matches[2]} ${matches[3]} ${matches[4]}`)
    console.log(`${numDice} ${rollType} ${dieType} ${modifier}`)
  
    const diceMetadata = {
      'numDice': numDice,
      'rollType': rollType,
      'dieType': dieType,
      'modifier': modifier
    };
    return diceMetadata;
  }

  module.exports = {
    DiceRegex: DiceRegex,
    ParseDice: ParseDice
  }
}());