"use strict";

const config = require("./config.json");
const { Client, Intents } = require("discord.js");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const DiceParser = require("./lib/parser.js");
const {RollDice, RollAllGroups, SumAllRolls} = require("./lib/dice-common.js");

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
    str = str.concat('\n !roll [x]d[n] [y]d[m]...       Roll x n-sided dice plus y m-sided dice, etc. > or < immediately after the dice will drop the lowest or highest die, respectively. Using \'D\' will cause max rolls to roll again.');
    str = str.concat('\n ![x]d[n]        same as !roll');
    str = str.concat('```');
    msg.reply(str);
  }

  if (msg.content.startsWith("!roll")
      || DiceParser.isMatch(msg.content) ) {
    /// TODO: add a 'roll in the hay' easter egg command

    const diceGroups = DiceParser.ParseAll(msg.content);
    const rollInfos = RollAllGroups(diceGroups);
    const total = SumAllRolls(rollInfos);

    const prettyPrint = PrettyPrint(total, diceGroups, rollInfos);

    msg.channel.send(prettyPrint);
  }

  return;
});

function PrettyPrint(total, diceGroups, rollInfos) {
  var str = "";
  str = str.concat("```");

  // console.log(diceGroups);
  str = str.concat(`Total: ${total}`);
  for (var i = 0; i < diceGroups.length; i++) {
    var diceGroup = diceGroups[i];
    var rollInfo = rollInfos[i];

    // console.log(diceGroup.str);
    str = str.concat(`\n${diceGroup.str}`);
    if (diceGroup.op) {
      if (diceGroup.op === '>') {
        str = str.concat(" Dropping lowest")
      } else {
        str = str.concat(" Dropping highest")
      }
    }
    str = str.concat(` : ${rollInfo.sorted}`);
  }

  str = str.concat("```");
  return str;
}

client.login(config.BOT_TOKEN);
