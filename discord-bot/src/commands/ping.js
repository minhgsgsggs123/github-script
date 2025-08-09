const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Kiểm tra độ trễ (latency)'),
  async execute(interaction) {
    const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
    const latencyMs = sent.createdTimestamp - interaction.createdTimestamp;
    const wsPingMs = Math.round(interaction.client.ws.ping);
    await interaction.editReply(`Pong! Latency: ${latencyMs}ms | WebSocket: ${wsPingMs}ms`);
  },
};