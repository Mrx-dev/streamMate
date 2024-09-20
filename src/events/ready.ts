import { Client, Events } from 'discord.js';
import { clientLogger } from '../helpers/logger';
module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client: Client) {
    clientLogger.info(`Ready! Logged in as ${client.user?.tag}`);
  },
};
