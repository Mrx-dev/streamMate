import { Events, Interaction } from 'discord.js';
import { ExtendedClient } from '../types/ExtendedClient';
import { clientLogger } from '../helpers/logger';

module.exports = {
  name: Events.InteractionCreate,
  once: false,
  async execute(interaction: Interaction) {
    if (!interaction.isChatInputCommand()) return;

    const command = (interaction.client as ExtendedClient).commands.get(interaction.commandName);

    if (!command) {
      clientLogger.warn(`No command matching ${interaction.commandName} was found.`);
      return;
    }

    try {
      await command.execute(interaction);
      clientLogger.info(`${interaction.user.username} has execute /${interaction.commandName} command`);
    } catch (error) {
      clientLogger.error(error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
      } else {
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
      }
    }
  },
};
