"use strict";

const config = require("./config.json");
const { Client, Intents } = require("discord.js");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const DiceParser = require("./lib/parser.js");

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", (msg) => {
  // only look at messages that start with !
  if (msg.content[0] != '!') return;

  if (msg.content === "!quite") {
    msg.reply("You really are quite cute.");
  }

  /// TODO: better help mesage for how to format the dice
  if (msg.content === "!d20help") {
    var str = '```Commands:';
    str = str.concat('\n !d20help      This text');
    str = str.concat('\n !roll [x]d[n]        Roll x n-sided dice. > or < immediately after the dice will drop the lowest or highest die, respectively. Using \'D\' will cause max rolls to roll again.');
    str = str.concat('\n ![x]d[n]        same as !roll');
    str = str.concat('```');
    msg.reply(str);
  }

  if (msg.content.startsWith("!roll")
      || DiceParser.isMatch(msg.content) ) {
    /// TODO: add a 'roll in the hay' easter egg command

    const diceMetadata = DiceParser.ParseDice(msg.content);
    console.log(diceMetadata);

    if (diceMetadata) {
      const results = RollDice(diceMetadata);
      console.log(results);

      const prettyPrint = PrettyPrint(diceMetadata, results);
      msg.channel.send(prettyPrint);
    }
  }

  return;
});

function PrettyPrint(metadata, results) {
  var str = "";

  str = str.concat("```");
  str = str.concat(`Total: ${results.total}\n`);
  if (metadata.modifier) {
    if (metadata.modifier === '>') {
      str = str.concat("Dropping lowest")
    } else {
      str = str.concat("Dropping highest")
    }
  }
  str = str.concat(`\n${results.sorted}`);
  str = str.concat("```");

  return str;
}

function RollDice(metadata) {
  var dice = [];
  var rollMetadata = {};
  const reroll_max = (metadata.rollType === 'D') && (metadata.dieType > 3);

  /// roll the dice
  for (var i = 0; i < metadata.numDice; i++) {
    const roll = rolldie(metadata.dieType);
    dice.push(roll);
    ///console.log(`i: ${i} roll: ${roll} dieType: ${metadata.dieType}`);

    if (reroll_max && (roll == metadata.dieType)) {
      ///console.log(`*** extra roll!!! ***`);
      i--; // roll and extra die
    }
  }

  dice.sort((x,y) => x - y); // sort ascending
  console.log(`sorted dice: ${dice}`)
  rollMetadata.sorted = dice.slice();

  /// apply advantage/disadvantage (first)
  if (metadata.modifier === '>') {
    /// advantage, remove the lowest roll
    dice.shift();
  } else if (metadata.modifier === '<') {
    /// disadvantage, remove highest (last)
    dice.pop();
  }
  console.log(`modified dice: ${dice}`)
  rollMetadata.modified = dice;

  /// get the total
  const total = dice.reduce((x, y) => x + y, 0);
  console.log(`total: ${total}`);
  rollMetadata.total = total;

  return rollMetadata;
}

function rolldie(d) {
  var roll = Math.floor(Math.random() * d) + 1;
  console.log('**** roll (' + d + '): ' + roll)
  return roll;
}

client.login(config.BOT_TOKEN);
