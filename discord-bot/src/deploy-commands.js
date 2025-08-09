require('dotenv').config();
const { REST, Routes, SlashCommandBuilder } = require('discord.js');
const path = require('node:path');
const fs = require('node:fs');

const commands = [];

const commandsPath = path.join(__dirname, 'commands');
if (fs.existsSync(commandsPath)) {
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((fileName) => fileName.endsWith('.js'));

  for (const fileName of commandFiles) {
    const filePath = path.join(commandsPath, fileName);
    const commandModule = require(filePath);
    if (commandModule && commandModule.data && commandModule.execute) {
      commands.push(commandModule.data.toJSON());
    }
  }
} else {
  commands.push(
    new SlashCommandBuilder()
      .setName('ping')
      .setDescription('Pong!')
      .toJSON()
  );
}

const token = process.env.DISCORD_TOKEN;
const applicationId = process.env.APPLICATION_ID;
const guildId = process.env.GUILD_ID;

if (!token || !applicationId || !guildId) {
  console.error(
    'Missing env. Required: DISCORD_TOKEN, APPLICATION_ID, GUILD_ID'
  );
  process.exit(1);
}

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
  try {
    console.log(
      `Refreshing ${commands.length} application (/) commands for guild ${guildId}...`
    );

    await rest.put(Routes.applicationGuildCommands(applicationId, guildId), {
      body: commands,
    });

    console.log('Successfully reloaded guild application (/) commands.');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();