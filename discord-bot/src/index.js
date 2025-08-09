require('dotenv').config();
const { Client, GatewayIntentBits, Events, Collection } = require('discord.js');
const path = require('node:path');
const fs = require('node:fs');

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.commands = new Collection();

// Load commands dynamically from ./commands
const commandsPath = path.join(__dirname, 'commands');
if (fs.existsSync(commandsPath)) {
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((fileName) => fileName.endsWith('.js'));

  for (const fileName of commandFiles) {
    const filePath = path.join(commandsPath, fileName);
    const commandModule = require(filePath);
    if (commandModule && commandModule.data && commandModule.execute) {
      client.commands.set(commandModule.data.name, commandModule);
    }
  }
}

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Logged in as ${readyClient.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) {
    console.warn(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: 'Có lỗi xảy ra khi chạy lệnh này.',
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: 'Có lỗi xảy ra khi chạy lệnh này.',
        ephemeral: true,
      });
    }
  }
});

const token = process.env.DISCORD_TOKEN;
if (!token) {
  console.error(
    'Missing DISCORD_TOKEN in environment. Create a .env file based on .env.example'
  );
  process.exit(1);
}

client.login(token);